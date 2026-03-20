import PageHeader from "@/components/page-header";
import ProjectSection from "@/components/projects/ProjectSection";
import Script from "next/script";
import { ProjectType } from "@/types/Project";
import { client } from "@/libs/microcms";

async function getAllProjects(): Promise<ProjectType[]> {
  const data = await client.get({
    endpoint: "projects",
  });
  return data.contents;
}

export default async function Home() {
  const projects = await getAllProjects();

  return (
    <main className="flex flex-col items-center">
      <PageHeader
        titleJa="プロジェクト一覧"
        titleEn="Our.projects();"
        desc="WINCアプリチームの制作実績と、進行中のプロジェクトをお伝えします"
      />
      <section className="w-full flex flex-col items-center divide-effect bg-background">
        <div className="w-full max-w-[1440px] flex flex-row items-stretch relative">
          <div className="grow-[1] border-x border-x-(--pattern-fg) bg-[image:repeating-linear-gradient(315deg,_var(--pattern-fg)_0,_var(--pattern-fg)_1px,_transparent_0,_transparent_50%)] bg-[size:10px_10px] bg-fixed max-lg:hidden [--pattern-fg:var(--foreground)]/10"></div>
          <div className="w-full max-w-7xl">
            <div className="min-h-[80vh] divide-effect flex flex-col justify-start">
              <ProjectSection projects={projects} />
            </div>
          </div>
          <div className="grow-[1] border-x border-x-(--pattern-fg) bg-[image:repeating-linear-gradient(315deg,_var(--pattern-fg)_0,_var(--pattern-fg)_1px,_transparent_0,_transparent_50%)] bg-[size:10px_10px] bg-fixed max-lg:hidden [--pattern-fg:var(--foreground)]/10"></div>
        </div>
      </section>
    </main>
  );
}
