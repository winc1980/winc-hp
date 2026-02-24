"use client";

import { ProjectGenre } from "@/types/Project";

const GENRE_LABELS: Record<string, string> = {
  all: "All",
  web: "Web",
  app: "App",
  other: "Other",
};

const GENRES = ["all", "web", "app", "other"] as const;

export default function GenreTabs({
  current,
  onChange,
}: {
  current?: ProjectGenre;
  onChange: (genre: ProjectGenre | undefined) => void;
}) {
  return (
    <div className="flex gap-2 px-2 md:px-16 pt-8">
      {GENRES.map((genre) => {
        const isActive = genre === "all" ? !current : current === genre;
        return (
          <button
            key={genre}
            onClick={() => onChange(genre === "all" ? undefined : (genre as ProjectGenre))}
            className={`px-4 py-2 text-sm font-mono border transition-all duration-200 ${
              isActive
                ? "bg-foreground text-background border-foreground"
                : "bg-transparent text-foreground/70 border-foreground/20 hover:border-foreground/50"
            }`}
          >
            {GENRE_LABELS[genre]}
          </button>
        );
      })}
    </div>
  );
}
