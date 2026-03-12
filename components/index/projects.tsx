import { Plus } from "lucide-react";
import Link from "next/link";
import { ProjectCard } from "../projects/ProjectCard";
import { ProjectType } from "@/types/Project";
import { client } from "@/libs/microcms";
import SectionHeading from "./section-heading";
import { PrimaryButton } from "../buttons/PrimaryButton";

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
      <section className="border-t border-b border-foreground/10 w-full max-w-7xl py-16 lg:py-32 flex flex-col gap-12 lg:gap-20">
        <SectionHeading titleEn="Featured projects" titleJa="注目のプロジェクト" />
        <div className="divide-effect">
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-0 max-w-7xl">
            {/* 上位3件を表示 */}
            {projects.slice(0, 3).map((project) => (
              <ProjectCard
                key={project.id}
                project={project}
              />
            ))}
          </div>
        </div>
        <div className="divide-effect">
          <Link
            href="/projects/"
          >
            <PrimaryButton>
              もっと見る
              <Plus />
            </PrimaryButton>
          </Link>
        </div>
      </section>
    </div>
  );
}
