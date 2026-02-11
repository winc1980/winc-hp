import type { BlockWithChildren } from "@/lib/notion/types";
import { getNotionFileUrl } from "@/lib/notion/utils";
import RichText from "./RichText";

export default function Video({ block }: { block: BlockWithChildren }) {
  if (block.type !== "video") return null;

  const video = block.video;
  const caption = video.caption;

  if (video.type === "external") {
    const url = video.external.url;
    // YouTube embed
    const youtubeId = extractYouTubeId(url);
    if (youtubeId) {
      return (
        <figure className="my-6">
          <div className="relative w-full aspect-video rounded-lg overflow-hidden">
            <iframe
              src={`https://www.youtube.com/embed/${youtubeId}`}
              className="absolute inset-0 w-full h-full"
              allowFullScreen
              loading="lazy"
            />
          </div>
          {caption.length > 0 && (
            <figcaption className="text-center text-sm text-muted-foreground mt-2">
              <RichText richTexts={caption} />
            </figcaption>
          )}
        </figure>
      );
    }

    return (
      <figure className="my-6">
        <video src={url} controls className="w-full rounded-lg" />
        {caption.length > 0 && (
          <figcaption className="text-center text-sm text-muted-foreground mt-2">
            <RichText richTexts={caption} />
          </figcaption>
        )}
      </figure>
    );
  }

  const url = getNotionFileUrl(video);
  return (
    <figure className="my-6">
      <video src={url} controls className="w-full rounded-lg" />
      {caption.length > 0 && (
        <figcaption className="text-center text-sm text-muted-foreground mt-2">
          <RichText richTexts={caption} />
        </figcaption>
      )}
    </figure>
  );
}

function extractYouTubeId(url: string): string | null {
  const match = url.match(
    /(?:youtube\.com\/(?:watch\?v=|embed\/)|youtu\.be\/)([a-zA-Z0-9_-]{11})/
  );
  return match ? match[1] : null;
}
