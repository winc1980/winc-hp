"use client";
import React, { useCallback } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { CmsImageType } from "@/types/CmsImage";
import Image from "next/image";
import { DotButton, useDotButton } from "./carouselDotButton";
import { ChevronLeft, ChevronRight } from "lucide-react";

export function ImageCarousel({ images }: { images?: CmsImageType[] }) {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true });
  const { selectedIndex, scrollSnaps, onDotButtonClick } =
    useDotButton(emblaApi);
  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  if (!images || images.length === 0) return null;

  return (
    <>
      <div className="relative overflow-hidden mt-8 lg:mx-8">
        <div className="absolute top-0 left-0 lg:w-[16%] h-[60vh] z-1 lg:bg-gradient-to-r from-background to-transparent"></div>
        <div className="absolute top-0 right-0 lg:w-[16%] h-[60vh] z-1 lg:bg-gradient-to-l from-background to-transparent"></div>
        <div className="embla bg-background" ref={emblaRef}>
          <div className="embla__container">
            {images.map((image: CmsImageType, index) => (
              <div
                className={`embla__slide flex basis-[90%] ${
                  images.length > 3 ? "lg:basis-1/2" : ""
                } min-w-0 justify-center items-center px-1 lg:px-3`}
                key={index}
              >
                <Image
                  src={image.url}
                  alt={`${index}枚目のスクリーンショット`}
                  width={image.width}
                  height={image.height}
                  className="max-h-[50vh] lg:h-[70vh] w-auto rounded-2xl"
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="flex justify-between mx-4 py-4">
        <div className="flex items-center">
          <button className="embla__prev" onClick={scrollPrev}>
            <ChevronLeft className="h-8 w-8 m-2 [&_path]:stroke-1 [&_path]:stroke-foreground/50 hover:cursor-pointer hover:[&_path]:stroke-foreground" />
          </button>
          <button className="embla__next" onClick={scrollNext}>
            <ChevronRight className="h-8 w-8 m-2 [&_path]:stroke-1 [&_path]:stroke-foreground/50 hover:cursor-pointer hover:[&_path]:stroke-foreground" />
          </button>
        </div>
        <div className="flex justify-end items-center gap-2 mx-4">
          {scrollSnaps.map((_, index) => (
            <DotButton
              key={index}
              onClick={() => onDotButtonClick(index)}
              className={`${
                index === selectedIndex ? "bg-foreground" : "bg-foreground/50"
              } w-2 h-2 cursor-pointer rounded-xl`}
            />
          ))}
        </div>
      </div>
    </>
  );
}
