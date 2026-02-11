import type { BlockWithChildren } from "@/lib/notion/types";
import Paragraph from "./Paragraph";
import Heading from "./Heading";
import ImageBlock from "./ImageBlock";
import CodeBlock from "./CodeBlock";
import Quote from "./Quote";
import { BulletedListItem, NumberedListItem, TodoItem } from "./ListBlock";
import Callout from "./Callout";
import Bookmark from "./Bookmark";
import Divider from "./Divider";
import Toggle from "./Toggle";
import Table from "./Table";
import Video from "./Video";

interface NotionBlocksProps {
  blocks: BlockWithChildren[];
}

export default function NotionBlocks({ blocks }: NotionBlocksProps) {
  return (
    <>
      {blocks.map((block) => (
        <NotionBlock key={block.id} block={block} />
      ))}
    </>
  );
}

function NotionBlock({ block }: { block: BlockWithChildren }) {
  switch (block.type) {
    case "paragraph":
      return <Paragraph block={block} />;

    case "heading_1":
    case "heading_2":
    case "heading_3":
      return <Heading block={block} />;

    case "image":
      return <ImageBlock block={block} />;

    case "code":
      return <CodeBlock block={block} />;

    case "quote":
      return <Quote block={block} />;

    case "bulleted_list_item":
      return <BulletedListItem block={block} />;

    case "numbered_list_item":
      return <NumberedListItem block={block} />;

    case "to_do":
      return <TodoItem block={block} />;

    case "callout":
      return <Callout block={block} />;

    case "bookmark":
      return <Bookmark block={block} />;

    case "divider":
      return <Divider />;

    case "toggle":
      return <Toggle block={block} />;

    case "table":
      return <Table block={block} />;

    case "video":
      return <Video block={block} />;

    case "column_list":
      return (
        <div className="flex gap-4 my-4 max-md:flex-col">
          {block.children?.map((column) => (
            <div key={column.id} className="flex-1 min-w-0">
              {column.children && <NotionBlocks blocks={column.children} />}
            </div>
          ))}
        </div>
      );

    case "embed":
      if ("embed" in block) {
        return (
          <div className="my-4">
            <iframe
              src={(block as BlockWithChildren & { embed: { url: string } }).embed.url}
              className="w-full aspect-video rounded-lg border border-foreground/10"
              allowFullScreen
              loading="lazy"
            />
          </div>
        );
      }
      return null;

    default:
      // Unsupported block type - render nothing
      return null;
  }
}
