import type { BlockWithChildren } from "@/lib/notion/types";
import RichText from "./RichText";
import NotionBlocks from "./NotionBlocks";

export default function Callout({ block }: { block: BlockWithChildren }) {
  if (block.type !== "callout") return null;

  const icon = block.callout.icon;
  let emoji = "";
  if (icon?.type === "emoji") emoji = icon.emoji;

  return (
    <div className="notion-callout my-4 flex gap-3 rounded-lg border border-foreground/10 bg-muted/50 p-4">
      {emoji && <span className="text-xl shrink-0">{emoji}</span>}
      <div className="min-w-0">
        <RichText richTexts={block.callout.rich_text} />
        {block.children && <NotionBlocks blocks={block.children} />}
      </div>
    </div>
  );
}
