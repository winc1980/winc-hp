"use client";
import { ProjectType } from "@/types/Project";
import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import gsap from "gsap";
import TextPlugin from "gsap/TextPlugin";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/all";

export const ProjectCard = ({ project, className }: { project: ProjectType, className?: string }) => {
  gsap.registerPlugin(TextPlugin);
  gsap.registerPlugin(ScrollTrigger);
  gsap.registerPlugin(SplitText);
  const scope = useRef(null);

  useGSAP(
    () => {
      const splitLines = SplitText.create(".gsap-lines", {
        type: "lines",
        mask: "lines",
      });
      const tlLines = gsap.timeline({
        scrollTrigger: {
          trigger: ".gsap-lines",
          start: "top bottom",
          end: "+=50%",
          scrub: true,
        },
      });
      tlLines.from(splitLines.lines, {
        duration: 1,
        y: 100,
        autoAlpha: 0,
        stagger: 0.05,
      });

      const tlObjects = gsap.timeline({
        scrollTrigger: {
          trigger: ".reveal-on-scroll",
          start: "top bottom",
          end: "+=50%",
          scrub: true,
        },
      });
      tlObjects.from(".reveal-on-scroll", {
        duration: 1,
        y: 100,
        autoAlpha: 0,
      });
    },
    { scope: scope }
  );

  return (
    <Link href={`/projects/${project.id}`} className={className} ref={scope}>
      <article className="bg-foreground/10 border border-foreground/10 w-full @container p-2 h-full transition-all duration-300">
        <div className="flex flex-col items-start bg-background hover:bg-foreground/80 hover:backdrop-blur hover:text-background transition-all duration-300 rounded-2xl gap-4 p-4 h-full">
          <Image
            src={project.images[0].url ?? ""}
            alt={project.title}
            className="h-auto w-full aspect-video object-cover transition-all duration-300 rounded-xl"
            width={800}
            height={450}
          />
          <div className="w-full">
            <h3 className="text-3xl font-light gsap-lines">
              <p className="font-mono text-sm opacity-60">
                {project.completeDate != null ? "Released" : "In development"}
                {project.technologies[0]?` / ${typeof project.technologies[0] === "string" ? project.technologies[0] : (project.technologies[0] as { name: string }).name}`:''}
              </p>
              <span className="gsap-lines">{project.title}</span>
            </h3>
            <div
              dangerouslySetInnerHTML={{ __html: project.description }}
              className="text-md py-4 reveal-on-scroll line-clamp-3" />
          </div>
        </div>
      </article>
    </Link>
  );
};
