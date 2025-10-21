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
        <div className="flex flex-col @xl:flex-row items-center bg-background hover:bg-foreground/80 hover:backdrop-blur hover:text-background @xl:hover:[&>img]:aspect-[calc(sqrt(2)/1)] transition-all duration-300 rounded-2xl gap-4 @xl:gap-8 p-4 @xl:p-8 h-full">
          <Image
            src={project.images[0].url ?? ""}
            alt={project.title}
            className="h-auto w-full aspect-[16/9] @xl:max-w-[max(40%,20vw)] max-w-lg object-cover transition-all duration-300 rounded-xl"
            width={320 * Math.sqrt(2)}
            height={320}
          />
          <div className="@xl:w-1/2">
            <h3 className="text-3xl font-light gsap-lines">
              <p className="font-mono text-sm opacity-60">
                {project.completeDate != null ? "Released" : "In development"}
                {project.technologies[0]?` / ${project.technologies[0].name}`:''}
              </p>
              <span className="gsap-lines">{project.title}</span>
            </h3>
            <p className="text-md py-4 reveal-on-scroll">{project.description}</p>
          </div>
        </div>
      </article>
    </Link>
  );
};
