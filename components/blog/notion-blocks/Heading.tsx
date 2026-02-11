import type { BlockWithChildren } from "@/lib/notion/types";
import RichText from "./RichText";

export default function Heading({ block }: { block: BlockWithChildren }) {
  if (block.type === "heading_1") {
    return (
      <h1 className="text-3xl font-bold mt-10 mb-4" id={block.id}>
        <RichText richTexts={block.heading_1.rich_text} />
      </h1>
    );
  }

  if (block.type === "heading_2") {
    return (
      <h2 className="text-2xl font-bold mt-8 mb-3 border-b border-foreground/10 pb-2" id={block.id}>
        <RichText richTexts={block.heading_2.rich_text} />
      </h2>
    );
  }

  if (block.type === "heading_3") {
    return (
      <h3 className="text-xl font-semibold mt-6 mb-2" id={block.id}>
        <RichText richTexts={block.heading_3.rich_text} />
      </h3>
    );
  }

  return null;
}
