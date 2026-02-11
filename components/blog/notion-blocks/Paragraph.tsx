import type { BlockWithChildren } from "@/lib/notion/types";
import RichText from "./RichText";
import NotionBlocks from "./NotionBlocks";

export default function Paragraph({ block }: { block: BlockWithChildren }) {
  if (block.type !== "paragraph") return null;

  return (
    <p className="mb-4 leading-relaxed">
      <RichText richTexts={block.paragraph.rich_text} />
      {block.children && <NotionBlocks blocks={block.children} />}
    </p>
  );
}
