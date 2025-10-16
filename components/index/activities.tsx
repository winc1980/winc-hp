'use client';
import Image from "next/image";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useRef } from "react";


export default function Activities() {
  gsap.registerPlugin(useGSAP);
  gsap.registerPlugin(ScrollTrigger);
  const scope = useRef(null);

  useGSAP(
    () => {
      gsap.fromTo(".gsap-container", {
        paddingRight: "64px",
        paddingLeft: "64px",
      }, {
        paddingRight: "0",
        paddingLeft: "0",
        scrollTrigger: {
          trigger: scope.current,
          start: "top center",
          end: "top top",
          scrub: true,
        }
      });
      gsap.fromTo(".gsap-image", {
        borderRadius: "64px",
      }, {
        borderRadius: "0",
        scrollTrigger: {
          trigger: scope.current,
          start: "top center",
          end: "top top",
          scrub: true,
        },
      });
      gsap.fromTo(
        ".gsap-container",
        {
          paddingRight: "0",
          paddingLeft: "0",
        },
        {
          paddingRight: "0",
          paddingLeft: "0",
          scrollTrigger: {
            trigger: ".gsap-container",
            pin: true,
            scrub: true,
            start: "top top",
            end: "bottom top",
          },
        }
      );
    },
    [scope]
  );
  return (
    <div className="w-full" ref={scope}>
      <div className="gsap-container w-full h-screen relative overflow-hidden">
        <Image
          src="/test-images/test.jpg"
          alt="Hero Background"
          width={1920}
          height={1080}
          className="gsap-image h-screen w-[100vw] object-cover"
        />
        <div className="absolute top-0 left-0 w-full h-full flex flex-col items-center justify-center">
          <h2 className="text-7xl font-bold text-white mb-4">楽しむ</h2>
        </div>
      </div>
      <div className="w-full h-screen relative overflow-hidden">
        <Image
          src="/test-images/test2.jpg"
          alt="Hero Background"
          width={1920}
          height={1080}
          className="gsap-image h-screen w-[100vw] object-cover"
        />
        <div className="absolute top-0 left-0 w-full h-full flex flex-col items-center justify-center">
          <h2 className="text-7xl font-bold text-white mb-4">つくる</h2>
        </div>
      </div>
    </div>
  );
}
