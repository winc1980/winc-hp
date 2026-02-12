"use client";

import Link from "next/link";
import { ProjectGenre } from "@/types/Project";

const GENRE_LABELS: Record<string, string> = {
  all: "All",
  web: "Web",
  app: "App",
  other: "Other",
};

const GENRES = ["all", "web", "app", "other"] as const;

export default function GenreTabs({ current }: { current?: ProjectGenre }) {
  return (
    <div className="flex gap-2 px-2 md:px-16 pt-8">
      {GENRES.map((genre) => {
        const isActive = genre === "all" ? !current : current === genre;
        return (
          <Link
            key={genre}
            href={genre === "all" ? "/projects" : `/projects?genre=${genre}`}
            className={`px-4 py-2 text-sm font-mono border transition-all duration-200 ${
              isActive
                ? "bg-foreground text-background border-foreground"
                : "bg-transparent text-foreground/70 border-foreground/20 hover:border-foreground/50"
            }`}
          >
            {GENRE_LABELS[genre]}
          </Link>
        );
      })}
    </div>
  );
}
