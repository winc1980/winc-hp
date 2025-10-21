"use client";
import { useRef, useState } from "react";
import gsap from "gsap";
import TextPlugin from "gsap/TextPlugin";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/all";
import Image from "next/image";
import { MicroCMSImage } from "microcms-js-sdk";

export default function LearnSection({description,image}: {description:string,image:MicroCMSImage}) {
  gsap.registerPlugin(TextPlugin);
  gsap.registerPlugin(ScrollTrigger);
  gsap.registerPlugin(SplitText);
  const scope = useRef(null);
  const [tabIndex, setTabIndex] = useState(0);

  useGSAP(
    () => {
      const splitChars = SplitText.create(".gsap-chars", { type: "chars" });
      const tlChars = gsap.timeline({
        scrollTrigger: {
          trigger: ".gsap-chars",
          start: "top bottom",
          end: "+=66.6%", // end after scrolling 500px beyond the start
          scrub: true,
        },
      });
      tlChars.from(splitChars.chars, {
        duration: 0.8,
        y: 100,
        autoAlpha: 0,
        stagger: 0.05,
      });

      const splitLines = SplitText.create(".gsap-lines", {
        type: "lines",
        mask: "lines",
      });
      const tlLines = gsap.timeline({
        scrollTrigger: {
          trigger: ".gsap-lines",
          start: "top bottom",
          end: "+=50%", // end after scrolling 500px beyond the start
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
          end: "+=50%", // end after scrolling 500px beyond the start
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
    <div className="divide-effect flex flex-col justify-center" ref={scope}>
      <section className="gsap-trigger w-full max-w-7xl py-32 relative">
        <div className="divide-effect">
          <h2 className="overflow-hidden text-6xl lg:text-7xl font-light w-full">
            <div className="gsap gsap-chars uppercase font-bold palt">
              The Joy of Creating
            </div>
          </h2>
        </div>
        <div className="divide-effect">
          <div className="relative overflow-hidden text-lg text-foreground py-8">
            <div className="relative z-10 gsap gsap-lines text-sm/8 lg:text-base/12 font-bold [&>span]:inline-b lock [&_span]:bg-background">
              <p className="text-4xl/16 *:inline-block *:break-keep">
                <span className="palt">「創る」を</span>
                <span className="palt">楽しむ。</span>
              </p>
              <div className="lg:hidden mask-[url(/masks/brushes/1.png)] mask-no-repeat mask-center mask-contain">
                <Image
                  src={image.url}
                  alt={image.alt || "活動イメージ画像"}
                  width={image.width}
                  height={image.height}
                  className="h-full w-fit aspect-video object-cover"
                />
              </div>
              {description.split("\n\n").map((block: string, index: number) => (
                <div key={index}>
                  {block.split("\n").map((line: string, lineIndex: number) => (
                    <span key={lineIndex} className="reveal-on-scroll">
                      {line}
                    </span>
                  ))}
                  <br />
                </div>
              ))}
            </div>
            <div className="hidden lg:block mask-[url(/masks/brushes/1.png)] mask-no-repeat mask-center mask-contain h-full absolute right-0 bottom-1/2 translate-y-1/2">
              <Image
                src={image.url}
                alt={image.alt || "活動イメージ画像"}
                width={image.width}
                height={image.height}
                className="h-full w-fit aspect-video object-cover"
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
