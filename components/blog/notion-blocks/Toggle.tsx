"use client";

import type { BlockWithChildren } from "@/lib/notion/types";
import RichText from "./RichText";
import NotionBlocks from "./NotionBlocks";

export default function Toggle({ block }: { block: BlockWithChildren }) {
  if (block.type !== "toggle") return null;

  return (
    <details className="my-2 group">
      <summary className="cursor-pointer font-medium hover:opacity-70 transition-opacity list-none flex items-center gap-1">
        <span className="text-xs transition-transform group-open:rotate-90">&#9654;</span>
        <RichText richTexts={block.toggle.rich_text} />
      </summary>
      <div className="pl-5 mt-2">
        {block.children && <NotionBlocks blocks={block.children} />}
      </div>
    </details>
  );
}
