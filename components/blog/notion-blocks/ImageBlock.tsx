import type { BlockWithChildren } from "@/lib/notion/types";
import { getNotionFileUrl } from "@/lib/notion/utils";
import RichText from "./RichText";

export default function ImageBlock({ block }: { block: BlockWithChildren }) {
  if (block.type !== "image") return null;

  const image = block.image;
  const url = getNotionFileUrl(image);
  const caption = image.caption;

  return (
    <figure className="my-6">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={url}
        alt={caption.map((c) => c.plain_text).join("") || "Blog image"}
        className="rounded-lg w-full max-w-2xl mx-auto"
        loading="lazy"
      />
      {caption.length > 0 && (
        <figcaption className="text-center text-sm text-muted-foreground mt-2">
          <RichText richTexts={caption} />
        </figcaption>
      )}
    </figure>
  );
}
