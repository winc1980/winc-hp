"use client";

import { useState } from "react";
import { ProjectCard } from "./ProjectCard";
import { ProjectType, ProjectGenre } from "@/types/Project";
import GenreTabs from "./GenreTabs";

export default function ProjectSection({ projects }: { projects: ProjectType[] }) {
  const [currentGenre, setCurrentGenre] = useState<ProjectGenre | undefined>(undefined);

  const filtered = currentGenre
    ? projects.filter((p) => p.genre?.includes(currentGenre))
    : projects;

  return (
    <>
      <GenreTabs current={currentGenre} onChange={setCurrentGenre} />
      <div className="my-8 px-2 md:px-16">
        <div className="flex flex-col w-full gap-8">
          {filtered.length === 0 ? (
            <p className="text-center text-foreground/50 py-16">プロジェクトがありません</p>
          ) : (
            filtered.map((project) => (
              <ProjectCard key={project.id} project={project} className="divide-effect" />
            ))
          )}
        </div>
      </div>
    </>
  );
}
