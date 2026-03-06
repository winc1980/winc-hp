"use client";
import { useRef } from "react";
import gsap from "gsap";
import TextPlugin from "gsap/TextPlugin";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/all";
import { Carousel, CarouselContent, CarouselItem } from "../ui/carousel";
import { MicroCMSImage } from "microcms-js-sdk";
import Image from "next/image";
import Autoplay from "embla-carousel-autoplay";

export default function Hero({images}:{images: MicroCMSImage[]}) {
  gsap.registerPlugin(TextPlugin);
  gsap.registerPlugin(ScrollTrigger);
  gsap.registerPlugin(SplitText);
  const scope = useRef(null);
  const typoTexts = [
    ["Learn", "together."],
    ["Build", "together."],
    ["Change", "together."],
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
        {
          "border-right-color": "var(--foreground)",
        },
        {
          duration: 1,
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
      className="flex flex-col w-full max-w-7xl justify-stretch lg:justify-center items-center lg:items-start lg:gap-12 min-h-screen py-16 relative"
      ref={scope}
    >
      <div className="relative z-10 mt-24 lg:mt-8 mx-4 px-4 flex flex-col grow lg:grow-0 w-full lg:w-auto">
        <div className="flex flex-col gap-3 lg:gap-6 text-start items-start justify-end grow">
          <span className="font-extrabold text-md">
            <p>早稲田大学コンピューター研究会</p>
          </span>
          <div
            id="hero-main-typo"
            className="w-fit flex flex-wrap justify-start"
          >
            <span
              id="hero-main-typo-1"
              className="break-keep text-5xl lg:text-7xl font-bold palt uppercase mr-5 text-secondary"
            ></span>
            <span
              id="hero-main-typo-2"
              className="break-keep text-5xl lg:text-7xl font-bold palt uppercase"
            ></span>
            <div
              id="hero-main-typo-cursor"
              className="inline-block text-5xl lg:text-7xl border-r-12"
            >
              <span className="opacity-0">I</span>
            </div>
          </div>
          <span className="break-keep font-extrabold text-xl flex flex-wrap gap-3 justify-start">
            <p>学ぶ</p>×<p>創る</p>×<p>変える</p>
          </span>
        </div>
      </div>
      <Carousel
        orientation="vertical"
        className="hidden lg:block absolute w-[40%] h-full max-h-screen right-0 top-0 mask-t-from-60% mask-t-to-[calc(100%-64px)] mask-b-from-90% mask-b-to-100%"
        opts={{
          loop: true,
        }}
        plugins={[
          Autoplay({
            delay: 2000,
          }),
        ]}
      >
        <CarouselContent className="h-screen">
          {images.map((image, index) => {
            const mask = (() => {
              switch (index % 3) {
                case 0:
                  return "aspect-square mask-[url(/masks/brushes/4.webp)]";
                case 1:
                  return "aspect-square mask-[url(/masks/brushes/2.webp)]";
                case 2:
                  return "aspect-video mask-[url(/masks/brushes/1.webp)]";
              }
            })();
            return (
              <CarouselItem key={index} className={`p-0 basis-auto `}>
                <Image
                  src={image.url}
                  alt={image.alt ?? `WINCの活動 ${index + 1}`}
                  width={image.width}
                  height={image.height}
                  sizes="40vw"
                  priority={index === 0}
                  className={`object-cover ${mask} mask-no-repeat mask-center mask-contain`}
                />
              </CarouselItem>
            );
          })}
        </CarouselContent>
      </Carousel>
      <Carousel
        orientation="horizontal"
        className="lg:hidden absolute w-full top-[50%] left-[50%] -translate-x-[50%] -translate-y-[50%]"
        opts={{
          loop: true,
        }}
        plugins={[
          Autoplay({
            delay: 2000,
          }),
        ]}
      >
        <CarouselContent className="items-center">
          {images.map((image, index) => {
            const mask = (() => {
              switch (index % 3) {
                case 0:
                  return "aspect-square mask-[url(/masks/brushes/4.png)]";
                case 1:
                  return "aspect-square mask-[url(/masks/brushes/2.png)]";
                case 2:
                  return "aspect-video mask-[url(/masks/brushes/1.png)]";
              }
            })();
            return (
              <CarouselItem key={index} className="p-0">
                <Image
                  src={image.url}
                  alt={image.alt ?? `WINCの活動 ${index + 1}`}
                  width={image.width}
                  height={image.height}
                  sizes="100vw"
                  priority={index === 0}
                  className={`object-cover ${mask} mask-no-repeat mask-center mask-contain`}
                />
              </CarouselItem>
            );
          })}
        </CarouselContent>
      </Carousel>
    </section>
  );
}
