// project section

import { ProjectCard } from "./ProjectCard";
import { ProjectType, ProjectGenre } from "@/types/Project";
import { client } from "@/libs/microcms";

async function getProjects(genre?: ProjectGenre): Promise<ProjectType[]> {
  const queries: Record<string, string> = {};
  if (genre) {
    queries.filters = `genre[contains]${genre}`;
  }
  const data = await client.get({
    endpoint: "projects",
    queries,
  });
  return data.contents;
}

export default async function ProjectSection({ genre }: { genre?: ProjectGenre }) {
  const projects = await getProjects(genre);
  return (
    <div className="my-8 px-2 md:px-16">
      <div className="flex flex-col w-full gap-8">
        {projects.length === 0 ? (
          <p className="text-center text-foreground/50 py-16">プロジェクトがありません</p>
        ) : (
          projects.map((project) => (
            <ProjectCard key={project.id} project={project} className="divide-effect" />
          ))
        )}
      </div>
    </div>
  );
}
