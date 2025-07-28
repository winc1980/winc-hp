"use client";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { useRef } from "react";
import gsap from "gsap";
import TextPlugin from "gsap/TextPlugin";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/all";

export default function Hero() {
  gsap.registerPlugin(TextPlugin);
  gsap.registerPlugin(ScrollTrigger);
  gsap.registerPlugin(SplitText);
  const scope = useRef(null);
  const typoTexts = [
    [ "アプリで、", "世界を変えよう。" ],
    [ "アイデアで、", "世界を変えよう。" ],
    [ "デザインで、", "世界を変えよう。" ],
  ];
  useGSAP(
    () => {
      const typoTL = gsap.timeline({
        repeat: -1,
        repeatDelay: 2,
      });
      typoTexts.forEach((texts, index) => {
        typoTL
          .from(
            ["#hero-main-typo-1", "#hero-main-typo-2"],
            {
              text: "",
              delay: index === 0 ? 0 : 2,
              duration: 0.01,
            }
          )
          .to(
            "#hero-main-typo-1",
            {
              autoAlpha: 1,
              text: texts[0],
              duration: texts[0].length * 0.15,
           }
          )
          .to(
           "#hero-main-typo-2",
            {
              autoAlpha: 1,
              text: texts[1],
              duration: texts[1].length * 0.15,
            }
          );
      });
      const cursorTL = gsap.timeline();
      cursorTL.fromTo(
        "#hero-main-typo-cursor",
        1,
        {
          "border-right-color": "var(--foreground)",
        },
        {
          "border-right-color": "rgba(0,0,0,0)",
          repeat: -1,
          ease: "steps(1)",
        },
        0
      );
    },
    { scope: scope }
  );

  return (
    <section
      className="flex flex-col w-full max-w-7xl justify-stretch lg:justify-center items-center lg:items-start lg:gap-12 min-h-screen py-16"
      ref={scope}
    >
      <div className="mt-24 lg:mt-8 mx-2 px-2 flex flex-col grow lg:grow-0">
        <div className="flex flex-col gap-6 text-center justify-center lg:text-start grow">
          <div
            id="hero-main-typo"
            className="w-fit flex flex-wrap justify-center"
          >
            <span
              id="hero-main-typo-1"
              className="break-keep text-5xl lg:text-7xl font-medium palt "
            ></span>
            <span
              id="hero-main-typo-2"
              className="break-keep text-5xl lg:text-7xl font-medium palt "
            ></span>
            <div
              id="hero-main-typo-cursor"
              className="inline-block text-5xl lg:text-7xl border-r-8"
            >
              <span className="opacity-0">I</span>
            </div>
          </div>
          <span className="break-keep font-mono">
            Realise Your Vision in Waseda with{" "}
            <span className="bg-linear-to-r from-cyan-500 to-blue-500 to-text-gradient">
              Code
            </span>
            .
          </span>
        </div>
        <div className="flex flex-wrap gap-4 my-6 justify-start">
          <Link href="https://secure.register.winc.ne.jp/">
            <div className="flex gap-1 p-4 border border-foreground/10 hover:border-foreground/0 transition-colors duration-300 ease-in-out text-background button-slider from-purple-500 to-purple-500">
              新入生向け情報
              <ArrowRight />
            </div>
          </Link>
        </div>
      </div>
    </section>
  );
}
