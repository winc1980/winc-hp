import PageHeader from "@/components/page-header";
import PageSteper from "@/components/projects/detail/PageSteper";
import ProjectDetailContainer from "@/components/projects/detail/ProjectDetailContainer";
import { client } from "@/libs/microcms";
import { ProjectType } from "@/types/Project";

async function getProject(id: string): Promise<ProjectType> {
  const data = await client.get({
    endpoint: `projects`,
    contentId: id,
  });
  return data;
}

export default async function ProjectDetail({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const id = (await params).id;
  const project = await getProject(id);

  return (
    <>
      <main className="flex flex-col items-center">
        <PageHeader
          titleJa={project.title}
          titleEn={
            (project.completeDate != null ? "Released" : "In development") +
            (project.technologies[0] ? ` / ${project.technologies[0]}` : '')
          }
          desc={<PageSteper pageTitle={project.title} className="my-4" />}
        />
        <section className="w-full flex flex-col items-center divide-effect bg-background">
          <div className="w-full max-w-[1440px] flex flex-row items-stretch relative">
            <div className="grow-[1] border-x border-x-(--pattern-fg) bg-[image:repeating-linear-gradient(315deg,_var(--pattern-fg)_0,_var(--pattern-fg)_1px,_transparent_0,_transparent_50%)] bg-[size:10px_10px] bg-fixed max-lg:hidden [--pattern-fg:var(--foreground)]/10"></div>
            <ProjectDetailContainer project={project} />
            <div className="grow-[1] border-x border-x-(--pattern-fg) bg-[image:repeating-linear-gradient(315deg,_var(--pattern-fg)_0,_var(--pattern-fg)_1px,_transparent_0,_transparent_50%)] bg-[size:10px_10px] bg-fixed max-lg:hidden [--pattern-fg:var(--foreground)]/10"></div>
          </div>
        </section>
      </main>
    </>
  );
}
