import type { BlockWithChildren } from "@/lib/notion/types";
import RichText from "./RichText";

export default function Bookmark({ block }: { block: BlockWithChildren }) {
  if (block.type !== "bookmark") return null;

  const url = block.bookmark.url;
  const caption = block.bookmark.caption;

  return (
    <div className="my-4">
      <a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        className="block border border-foreground/10 rounded-lg p-4 hover:bg-muted/50 transition-colors no-underline"
      >
        <span className="text-sm text-foreground font-medium break-all">
          {url}
        </span>
      </a>
      {caption.length > 0 && (
        <p className="text-sm text-muted-foreground mt-1">
          <RichText richTexts={caption} />
        </p>
      )}
    </div>
  );
}
