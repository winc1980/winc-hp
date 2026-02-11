// project section

import { ProjectCard } from "./ProjectCard";
import { ProjectType } from "@/types/Project";
import { client } from "@/lib/microcms";

async function getProjects(): Promise<ProjectType[]> {
  const data = await client.get({
    endpoint: "projects",
  });
  return data.contents;
}
export default async function ProjectSection() {
  const projects = await getProjects();
  return (
    <div className="my-8 px-2 md:px-16">
      <div className="flex flex-col w-full gap-8">
        {projects.map((project) => (
          <ProjectCard key={project.id} project={project} className="divide-effect" />
        ))}
      </div>
    </div>
  );
}
