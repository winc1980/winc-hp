"use client";
import { useRef } from "react";
import gsap from "gsap";
import TextPlugin from "gsap/TextPlugin";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/all";

export default function About() {
  gsap.registerPlugin(TextPlugin);
  gsap.registerPlugin(ScrollTrigger);
  gsap.registerPlugin(SplitText);
  const scope = useRef(null);

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
      <section className="gsap-trigger border-t border-b border-foreground/10 w-full max-w-7xl py-32 relative">
        <h2 className="overflow-hidden text-5xl lg:text-7xl font-light w-full divide-effect">
          <p className="font-mono text-sm opacity-60 px-1">About(us);</p>
          <div className="gsap gsap-chars">
            code{" "}
            <span className="to-text-gradient-child *:bg-linear-to-r *:from-rose-600 *:to-fuchsia-600">
              =
            </span>{" "}
            <p className="lg:inline">
              <span className="to-text-gradient-child *:bg-linear-to-r *:from-yellow-400 *:to-orange-400">
                new
              </span>{" "}
              Vision
              <span className="to-text-gradient-child *:bg-linear-to-b *:from-cyan-600 *:to-indigo-600">
                ()
              </span>
              ;
            </p>
          </div>
        </h2>
        <div className="overflow-hidden text-lg text-foreground my-8 divide-effect">
          <div className="gsap gsap-lines text-sm/8 lg:text-base/12 [&>span]:inline-block">
            <p className="text-4xl/16 font-light *:inline-block *:break-keep">
              <span>コードを書いて、</span><span>未来をえがく。</span>
            </p>
            <span>アプリチームでは起業やビジネス創出を目標として</span><span>最先端技術を用いたアプリ開発を行います。</span>
            <br />
            <span>実際のシステム開発現場で用いられる</span><span>プロジェクト管理の方法を採用し、</span><span>3〜5人のチームでアプリ開発を行います。</span>
            <br />
            <span>プロジェクトに関わるメンバーのマネジメントが、</span><span>あなたにとってエンジニア以外の進路にも</span><span>活きる経験を生みます。</span>
            <br />
            <span>ユーザー体験の向上やコスト削減を目指し、</span><span>ステークホルダーとの交渉や</span><span>関係性の構築にも取り組みます。</span>
            <br />
            <span>その過程で得た知見が、</span><span>経営者的視点の獲得につながります。</span>
            <br />
            <span>個人開発では得られないチーム開発のノウハウを学び、</span><span>就職後にも生きる経験と繋がりを得ることができます。</span>
          </div>
        </div>
        <svg
          id="Layer_2"
          data-name="Layer 2"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 371.32 748.29"
          width={300}
          height={800}
          className="hidden lg:block absolute right-0 bottom-1/2 translate-y-1/2 mr-16 opacity-50 svg-animate reveal-on-scroll"
        >
          <g id="Layer_1-2" data-name="Layer 1">
            <g id="Graphic_Elements" data-name="Graphic Elements">
              <g>
                <g>
                  <path
                    className="cls-1"
                    d="M364.73,50.87v646.56c0,2.27-.17,4.51-.5,6.7-.09.54-.18,1.09-.28,1.61-.52,2.72-1.29,5.35-2.28,7.87-.19.52-.41,1.04-.63,1.54-1.4,3.18-3.17,6.17-5.24,8.92-.2.25-.41.53-.61.78-1.43,1.83-3.03,3.52-4.72,5.11-.69.64-1.4,1.25-2.13,1.84-.25.22-.52.43-.78.62-.78.61-1.58,1.19-2.41,1.75-.05.04-.1.08-.15.11-.51.33-1.02.65-1.52.96-.57.34-1.15.68-1.73,1.01-.59.32-1.18.63-1.78.92-.29.14-.6.29-.89.43-.3.15-.61.29-.91.42-.92.41-1.86.77-2.81,1.12-.63.23-1.27.45-1.91.64-.33.1-.65.2-.97.29-.98.26-1.98.52-2.98.72-.33.07-.66.14-1.01.2-.34.06-.68.12-1.02.17-.68.11-1.37.21-2.06.28-.49.07-.97.1-1.46.14-.41.03-.81.05-1.22.07-.76.04-1.51.06-2.28.06H50.89c-.78,0-1.54-.02-2.3-.06-.41-.02-.81-.04-1.22-.07-.79-.06-1.57-.13-2.37-.22.3.03.6.05.9.08-22.09-2.49-39.32-21.28-39.32-44.02V50.87C6.58,27.22,25.21,7.84,48.58,6.63h.03c.75-.04,1.5-.06,2.27-.06h269.55c.77,0,1.51.02,2.27.06h.01c.41.02.81.04,1.22.07.39.03.79.07,1.19.1,22.22,2.36,39.61,21.22,39.61,44.06Z"
                  />
                  <path
                    className="cls-1"
                    d="M320.44.5H50.88C23.06.5.5,23.05.5,50.87v646.56c0,27.82,22.56,50.37,50.38,50.37h269.56c27.82,0,50.38-22.55,50.38-50.37V50.87c0-27.82-22.56-50.37-50.38-50.37ZM350.47,729.96c-.69.64-1.4,1.25-2.13,1.84-.25.22-.52.43-.78.62-.78.61-1.58,1.19-2.41,1.75-.05.04-.1.08-.15.11-.51.33-1.02.65-1.52.96-.57.34-1.15.68-1.73,1.01-.59.32-1.18.63-1.78.92-.29.14-.6.29-.89.43-.3.15-.61.29-.91.42-.92.41-1.86.77-2.81,1.12-.63.23-1.27.45-1.91.64-.33.1-.65.2-.97.29-.98.26-1.98.52-2.98.72-.33.07-.66.14-1.01.2-.34.06-.68.12-1.02.17-.68.11-1.37.21-2.06.28-.49.07-.97.1-1.46.14-.41.03-.81.05-1.22.07-.76.04-1.51.06-2.28.06H50.89c-.78,0-1.54-.02-2.3-.06-.41-.02-.81-.04-1.22-.07-.79-.06-1.57-.13-2.37-.22.3.03.6.05.9.08-22.09-2.49-39.32-21.28-39.32-44.02V50.87C6.58,27.22,25.21,7.84,48.58,6.63h.03c.75-.04,1.5-.06,2.27-.06h269.55c.77,0,1.51.02,2.27.06h.01c.41.02.81.04,1.22.07.39.03.79.07,1.19.1,22.22,2.36,39.61,21.22,39.61,44.06v646.56c0,2.27-.17,4.51-.5,6.7-.09.54-.18,1.09-.28,1.61-.52,2.72-1.29,5.35-2.28,7.87-.19.52-.41,1.04-.63,1.54-1.4,3.18-3.17,6.17-5.24,8.92-.2.25-.41.53-.61.78-1.43,1.83-3.03,3.52-4.72,5.11Z"
                  />
                </g>
                <path
                  className="cls-1"
                  d="M204.26,31.3h-39.48c-.98,0-1.77-.79-1.77-1.77v-.98c0-.98.79-1.77,1.77-1.77h39.48c.98,0,1.77.79,1.77,1.77v.98c0,.98-.79,1.77-1.77,1.77Z"
                />
                <path
                  className="cls-1"
                  d="M322.23,23.93h-.24l-.36-.04c-.43-.02-.82-.02-1.19-.02h-38.89c-2.23.11-4.02,1.83-4.24,4.03,0,.15-.02.3-.02.46v.06c-.53,11.4-9.94,20.47-21.46,20.47H115.5c-11.52,0-20.93-9.07-21.46-20.47v-.06c0-.16,0-.31-.02-.46-.22-2.2-2.02-3.92-4.24-4.03h-38.89c-.36,0-.76,0-1.19.02l-.36.04h-.24c-14.16.93-25.21,12.71-25.21,26.94v646.55c0,13.99,10.92,25.82,24.86,26.91.14,0,.25.02.36.03h.17s.16,0,.16,0h.06c.47.03.93.05,1.4.05h269.54c.47,0,.93-.02,1.4-.04h.06s.16,0,.16,0h.08s.09,0,.09,0c.11,0,.22-.02.36-.03,13.93-1.09,24.86-12.92,24.86-26.91V50.88c0-14.23-11.05-26.02-25.21-26.94Z"
                />
              </g>
            </g>
          </g>
        </svg>
      </section>
    </div>
  );
}
