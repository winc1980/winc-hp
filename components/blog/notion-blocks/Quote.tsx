import type { BlockWithChildren } from "@/lib/notion/types";
import RichText from "./RichText";
import NotionBlocks from "./NotionBlocks";

export default function Quote({ block }: { block: BlockWithChildren }) {
  if (block.type !== "quote") return null;

  return (
    <blockquote className="border-l-4 border-foreground/20 pl-4 my-4 text-muted-foreground italic">
      <RichText richTexts={block.quote.rich_text} />
      {block.children && <NotionBlocks blocks={block.children} />}
    </blockquote>
  );
}
