import { ProjectType } from "@/types/Project";

interface OverviewProps {
    project: ProjectType;
}

export default function Overview({ project }: OverviewProps) {
    return (
      <div
        className="flex flex-col gap-2 text-sm lg:text-base items-start my-8 rich-text"
        dangerouslySetInnerHTML={{ __html: project.description }}
      />
    )
}