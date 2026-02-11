import UsedTechnologySection from "./technology/UsedTechnologySection";
import Overview from "./overview/Overview";
import ContributorsSection from "./contributors/ContributorsSection";
import { ProjectType } from "@/types/Project";
import { ImageCarousel } from "./carousel/carousel";

interface ProjectDetailContainerProps {
  project: ProjectType;
}

export default function ProjectDetailContainer({
  project,
}: ProjectDetailContainerProps) {
  const validImages = project.images.filter(
    (img) => img.height !== undefined
  );

  return (
    <div className="w-full max-w-7xl">
      {/* 画像 */}
      <ImageCarousel images={validImages} />
      <div className="w-full max-w-7xl px-8">
        {/* 概要 */}
        <Overview project={project} />

        {/* 使用技術 */}
        <UsedTechnologySection project={project} />

        {/* 貢献者 */}
        <ContributorsSection project={project} />
      </div>
    </div>
  );
}
