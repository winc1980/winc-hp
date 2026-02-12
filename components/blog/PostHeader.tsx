import type { BlogPost } from "@/lib/notion/types";
import { formatDate, getTagColorClass } from "@/lib/notion/utils";

export default function PostHeader({ post }: { post: BlogPost }) {
  return (
    <header className="mb-8 pb-6 border-b border-foreground/10">
      {post.tags.length > 0 && (
        <div className="flex gap-2 flex-wrap mb-4">
          {post.tags.map((tag) => (
            <span
              key={tag.id}
              className={`text-xs px-2.5 py-1 rounded-full ${getTagColorClass(tag.color)}`}
            >
              {tag.name}
            </span>
          ))}
        </div>
      )}
      <h1 className="text-3xl lg:text-4xl font-bold leading-tight mb-4">
        {post.title}
      </h1>
      <time className="text-sm text-muted-foreground font-mono">
        {formatDate(post.date)}
      </time>
    </header>
  );
}
