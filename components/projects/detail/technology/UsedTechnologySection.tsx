import Image from "next/image";
import { ProjectType } from "@/types/Project";
interface UsedTechnologySectionProps {
    project: ProjectType;
}

export default function UsedTechnologySection({ project }: UsedTechnologySectionProps) {
    return (
      <div className="my-4">
        <h2 className="font-extralight text-2xl palt lg:divide-effect">
          <p className="font-mono text-sm opacity-60">Technologies</p>
          使用技術
        </h2>
        <div className="flex gap-4 items-center py-4">
          {project.technologies.map((tech, index) => (
            <p
              key={index}
            >
              <Image
                src={tech.icon.url}
                alt={tech.name}
                width={tech.icon.width}
                height={tech.icon.height}
                className="h-4 w-fit"
              />
            </p>
          ))}
        </div>
      </div>
    );
}