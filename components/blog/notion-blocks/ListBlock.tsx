import type { BlockWithChildren } from "@/lib/notion/types";
import RichText from "./RichText";
import NotionBlocks from "./NotionBlocks";

export function BulletedListItem({ block }: { block: BlockWithChildren }) {
  if (block.type !== "bulleted_list_item") return null;

  return (
    <li className="ml-6 list-disc mb-1">
      <RichText richTexts={block.bulleted_list_item.rich_text} />
      {block.children && (
        <ul>
          <NotionBlocks blocks={block.children} />
        </ul>
      )}
    </li>
  );
}

export function NumberedListItem({ block }: { block: BlockWithChildren }) {
  if (block.type !== "numbered_list_item") return null;

  return (
    <li className="ml-6 list-decimal mb-1">
      <RichText richTexts={block.numbered_list_item.rich_text} />
      {block.children && (
        <ol>
          <NotionBlocks blocks={block.children} />
        </ol>
      )}
    </li>
  );
}

export function TodoItem({ block }: { block: BlockWithChildren }) {
  if (block.type !== "to_do") return null;

  const checked = block.to_do.checked;

  return (
    <li className="ml-6 list-none flex items-start gap-2 mb-1">
      <input
        type="checkbox"
        checked={checked}
        readOnly
        className="mt-1.5 accent-foreground"
      />
      <span className={checked ? "line-through text-muted-foreground" : ""}>
        <RichText richTexts={block.to_do.rich_text} />
      </span>
    </li>
  );
}
