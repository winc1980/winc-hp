import { Plus } from "lucide-react";
import Link from "next/link";
import { ProjectCard } from "../projects/ProjectCard";
import { ProjectType } from "@/types/Project";
import { client } from "@/libs/microcms";
import SectionHeading from "./section-heading";

async function getProjects(): Promise<ProjectType[]> {
  const data = await client.get({
    endpoint: 'projects',
  });
  return data.contents;
}

export default async function Projects() {
  const projects = await getProjects();
  return (
    <div className="divide-effect flex flex-col justify-center">
      <section className="border-t border-b border-foreground/10 w-full max-w-7xl py-32 flex flex-col gap-20">
        <SectionHeading titleEn="Featured projects" titleJa="注目のプロジェクト" />
        <div className="divide-effect">
          <div className="flex flex-wrap max-w-7xl">
            {/* 上位3件を表示 */}
            {projects.slice(0, 3).map((project) => (
              <ProjectCard
                key={project.id}
                project={project}
                className='grow min-w-[300]'
              />
            ))}
          </div>
        </div>
        <div className="divide-effect">
          <Link
            href="/projects/"
            className="flex gap-1 p-4 border-2 w-fit bg-foreground text-white hover:bg-transparent hover:text-foreground transition duration-300"
          >
            もっと見る
            <Plus />
          </Link>
        </div>
      </section>
    </div>
  );
}
