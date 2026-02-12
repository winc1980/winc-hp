import { notion, DATABASE_ID } from "./client";
import type { BlogPost, BlockWithChildren, Tag } from "./types";
import type {
  PageObjectResponse,
  BlockObjectResponse,
} from "@notionhq/client/build/src/api-endpoints";

// ブログすべてをfetch
export async function getAllPosts(): Promise<BlogPost[]> {
  const response = await notion.dataSources.query({
    data_source_id: DATABASE_ID,
    filter: {
      property: "Published",
      checkbox: { equals: true },
    },
    sorts: [{ property: "Date", direction: "descending" }],
  });

  return response.results
    .filter((page): page is PageObjectResponse => "properties" in page)
    .map(extractPost);
}

// 単一ポストをslugによりfetch
export async function getPostBySlug(
  slug: string
): Promise<BlogPost | undefined> {
  const response = await notion.dataSources.query({
    data_source_id: DATABASE_ID,
    filter: {
      and: [
        { property: "Slug", rich_text: { equals: slug } },
        { property: "Published", checkbox: { equals: true } },
      ],
    },
  });

  const page = response.results[0];
  if (!page || !("properties" in page)) return undefined;
  return extractPost(page as PageObjectResponse);
}

// Fetch all blocks for a page (with children)
export async function getPostBlocks(
  pageId: string
): Promise<BlockWithChildren[]> {
  const blocks: BlockObjectResponse[] = [];
  let cursor: string | undefined;

  do {
    const response = await notion.blocks.children.list({
      block_id: pageId,
      start_cursor: cursor,
      page_size: 100,
    });
    blocks.push(
      ...response.results.filter(
        (b): b is BlockObjectResponse => "type" in b
      )
    );
    cursor = response.has_more ? response.next_cursor ?? undefined : undefined;
  } while (cursor);

  // Recursively fetch children for blocks that have them
  const blocksWithChildren: BlockWithChildren[] = await Promise.all(
    blocks.map(async (block) => {
      if (block.has_children) {
        const children = await getPostBlocks(block.id);
        return { ...block, children } as BlockWithChildren;
      }
      return block as BlockWithChildren;
    })
  );

  return blocksWithChildren;
}

// Get all unique tags
export async function getAllTags(): Promise<Tag[]> {
  const posts = await getAllPosts();
  const tagMap = new Map<string, Tag>();
  for (const post of posts) {
    for (const tag of post.tags) {
      tagMap.set(tag.name, tag);
    }
  }
  return Array.from(tagMap.values());
}

// Extract blog post data from Notion page
function extractPost(page: PageObjectResponse): BlogPost {
  const props = page.properties;

  const title = getTitle(props);
  const slug = getRichTextValue(props, "Slug") || page.id;
  const date = getDate(props);
  const tags = getTags(props);
  const excerpt = getRichTextValue(props, "Excerpt") || "";
  const published = getCheckbox(props, "Published");
  const coverImage = getCover(page);

  return { id: page.id, title, slug, date, tags, excerpt, coverImage, published };
}

// Property extractors
function getTitle(props: PageObjectResponse["properties"]): string {
  for (const prop of Object.values(props)) {
    if (prop.type === "title") {
      return prop.title.map((t) => t.plain_text).join("") || "Untitled";
    }
  }
  return "Untitled";
}

function getRichTextValue(
  props: PageObjectResponse["properties"],
  name: string
): string {
  const prop = props[name];
  if (prop?.type === "rich_text") {
    return prop.rich_text.map((t) => t.plain_text).join("");
  }
  return "";
}

function getDate(props: PageObjectResponse["properties"]): string {
  const prop = props["Date"];
  if (prop?.type === "date" && prop.date) {
    return prop.date.start;
  }
  return new Date().toISOString().split("T")[0];
}

function getTags(props: PageObjectResponse["properties"]): Tag[] {
  const prop = props["Tags"];
  if (prop?.type === "multi_select") {
    return prop.multi_select.map((tag) => ({
      id: tag.id,
      name: tag.name,
      color: tag.color,
    }));
  }
  return [];
}

function getCheckbox(
  props: PageObjectResponse["properties"],
  name: string
): boolean {
  const prop = props[name];
  if (prop?.type === "checkbox") {
    return prop.checkbox;
  }
  return false;
}

function getCover(page: PageObjectResponse): string | null {
  if (page.cover) {
    if (page.cover.type === "external") return page.cover.external.url;
    if (page.cover.type === "file") return page.cover.file.url;
  }
  return null;
}
