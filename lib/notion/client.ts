/**
 * Notion APIクライアント
 */

// Note: @notionhq/client はまだインストールされていないため、
// package.json への追加が必要です

import { Client } from '@notionhq/client';
import {
  NotionPage,
  NotionQueryDatabaseResponse,
  NotionBlock,
  NotionBlockChildrenResponse,
  TitleProperty,
  DateProperty,
  MultiSelectProperty,
  CheckboxProperty,
  RelationProperty,
} from './responses';

// 環境変数の検証
if (!process.env.NOTION_API_SECRET) {
  throw new Error('NOTION_API_SECRET is required');
}

if (!process.env.NOTION_DATABASE_ID) {
  throw new Error('NOTION_DATABASE_ID is required');
}

// Notion APIクライアントの初期化
const notionClient = new Client({
  auth: process.env.NOTION_API_SECRET,
});

/**
 * ブログ投稿用データベースのクエリ
 */
export async function queryBlogDatabase(
  filter?: any,
  sorts?: any,
  pageSize: number = 100,
  startCursor?: string,
): Promise<NotionQueryDatabaseResponse> {
  return (await notionClient.databases.query({
    database_id: process.env.NOTION_DATABASE_ID!,
    filter: filter || {
      and: [
        {
          property: 'Published',
          checkbox: {
            equals: true,
          },
        },
        {
          property: 'Date',
          date: {
            on_or_before: new Date().toISOString().split('T')[0],
          },
        },
      ],
    },
    sorts: sorts || [
      {
        property: 'Date',
        direction: 'descending',
      },
    ],
    page_size: pageSize,
    start_cursor: startCursor,
  })) as NotionQueryDatabaseResponse;
}

/**
 * 全投稿を取得（Published=true、公開日が今日以前のもの）
 */
export async function getAllPosts(): Promise<NotionPage[]> {
  const allPages: NotionPage[] = [];
  let cursor: string | null = null;

  while (true) {
    const response = await queryBlogDatabase(undefined, undefined, 100, cursor);
    allPages.push(...response.results);

    if (!response.has_more) {
      break;
    }
    cursor = response.next_cursor!;
  }

  return allPages;
}

/**
 * 指定件数の投稿を取得
 */
export async function getPosts(number: number = 10): Promise<NotionPage[]> {
  const response = await queryBlogDatabase(undefined, undefined, number);
  return response.results;
}

/**
 * スラッグで個別記事を取得
 */
export async function getPostBySlug(slug: string): Promise<NotionPage | null> {
  const response = await queryBlogDatabase({
    and: [
      {
        property: 'Published',
        checkbox: {
          equals: true,
        },
      },
      {
        property: 'Slug',
        rich_text: {
          equals: slug,
        },
      },
    ],
  });

  return response.results.length > 0 ? response.results[0] : null;
}

/**
 * タグ別投稿を取得
 */
export async function getPostsByTag(
  tag: string,
  number: number = 10,
): Promise<NotionPage[]> {
  const response = await queryBlogDatabase(
    {
      and: [
        {
          property: 'Published',
          checkbox: {
            equals: true,
          },
        },
        {
          property: 'Tags',
          multi_select: {
            contains: tag,
          },
        },
      ],
    },
    undefined,
    number,
  );

  return response.results;
}

/**
 * ページネーション付き投稿取得
 */
export async function getPostsByPage(
  page: number = 1,
  pageSize: number = 10,
): Promise<{
  posts: NotionPage[];
  hasNext: boolean;
  nextCursor: string | null;
}> {
  let cursor: string | null = null;
  let currentPage = 1;

  while (currentPage < page) {
    const response = await queryBlogDatabase(undefined, undefined, pageSize, cursor);
    if (!response.has_more) {
      return {
        posts: [],
        hasNext: false,
        nextCursor: null,
      };
    }
    cursor = response.next_cursor!;
    currentPage++;
  }

  const response = await queryBlogDatabase(undefined, undefined, pageSize, cursor);
  return {
    posts: response.results,
    hasNext: response.has_more,
    nextCursor: response.next_cursor,
  };
}

/**
 * 記事のブロック（本文）を全取得
 */
export async function getAllBlocksByBlockId(blockId: string): Promise<NotionBlock[]> {
  const allBlocks: NotionBlock[] = [];
  let cursor: string | null = null;

  while (true) {
    const response = (await notionClient.blocks.children.list({
      block_id: blockId,
      page_size: 100,
      start_cursor: cursor,
    })) as NotionBlockChildrenResponse;

    allBlocks.push(...response.results);

    if (!response.has_more) {
      break;
    }
    cursor = response.next_cursor!;
  }

  return allBlocks;
}

/**
 * 個別ブロック取得
 */
export async function getBlock(blockId: string): Promise<NotionBlock | null> {
  try {
    return (await notionClient.blocks.retrieve({
      block_id: blockId,
    })) as NotionBlock;
  } catch (error) {
    console.error(`Failed to retrieve block: ${blockId}`, error);
    return null;
  }
}

/**
 * 全タグ取得
 */
export async function getAllTags(): Promise<string[]> {
  const posts = await getAllPosts();
  const tags = new Set<string>();

  posts.forEach((post) => {
    const tagsProperty = post.properties.Tags as MultiSelectProperty | undefined;
    if (tagsProperty && tagsProperty.type === 'multi_select') {
      tagsProperty.multi_select.forEach((tag) => {
        tags.add(tag.name);
      });
    }
  });

  return Array.from(tags).sort();
}

/**
 * 著者情報を取得（別データベースから）
 */
export async function getAuthors(
  databaseId?: string,
): Promise<NotionPage[]> {
  if (!databaseId) {
    throw new Error('Author database ID is required');
  }

  const response = (await notionClient.databases.query({
    database_id: databaseId,
  })) as NotionQueryDatabaseResponse;

  return response.results;
}

/**
 * ファイルをダウンロード
 * Note: 実装は別のユーティリティファイルで行う
 */
export async function downloadFile(url: string): Promise<Buffer> {
  // 実装はutils.tsで行う
  throw new Error('Use downloadFile from utils.ts');
}

/**
 * ページプロパティのヘルパー関数
 */
export function getTitleProperty(page: NotionPage, propertyName: string = 'Title'): string {
  const property = page.properties[propertyName] as TitleProperty | undefined;
  return property?.title?.[0]?.plain_text || '';
}

export function getDateProperty(page: NotionPage, propertyName: string = 'Date'): string | null {
  const property = page.properties[propertyName] as DateProperty | undefined;
  return property?.date?.start || null;
}

export function getTagsProperty(page: NotionPage, propertyName: string = 'Tags'): string[] {
  const property = page.properties[propertyName] as MultiSelectProperty | undefined;
  return property?.multi_select?.map((tag) => tag.name) || [];
}

export function getSlug(page: NotionPage, propertyName: string = 'Slug'): string {
  const property = page.properties[propertyName] as any;
  return property?.rich_text?.[0]?.plain_text || '';
}

export function isPublished(page: NotionPage, propertyName: string = 'Published'): boolean {
  const property = page.properties[propertyName] as CheckboxProperty | undefined;
  return property?.checkbox || false;
}

export function getRelations(page: NotionPage, propertyName: string): string[] {
  const property = page.properties[propertyName] as RelationProperty | undefined;
  return property?.relation?.map((rel) => rel.id) || [];
}
