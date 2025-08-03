"use client";
import { useRef, useState } from "react";
import gsap from "gsap";
import TextPlugin from "gsap/TextPlugin";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/all";
import Image from "next/image";

export default function LearnSection() {
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
      <section className="gsap-trigger w-full max-w-7xl py-8 relative">
        <div className="flex flex-wrap gap-5 justify-center py-8">
          <p
            className={`uppercase text-xl font-bold ${
              tabIndex === 0 && "border-b-2"
            }`}
            onClick={() => setTabIndex(0)}
          >
            Learn
          </p>
          <p
            className={`uppercase text-xl font-bold ${
              tabIndex === 1 && "border-b-2"
            }`}
            onClick={() => setTabIndex(1)}
          >
            Build
          </p>
          <p
            className={`uppercase text-xl font-bold ${
              tabIndex === 2 && "border-b-2"
            }`}
            onClick={() => setTabIndex(2)}
          >
            Change
          </p>
        </div>
        {tabIndex === 0 && (
          <>
            <h2 className="overflow-hidden text-5xl lg:text-7xl font-light w-full divide-effect">
              <p className="font-extrabold text-xl px-1">ともに学ぶ</p>
              <div className="gsap gsap-chars uppercase text-7xl font-bold palt">
                Learn together
              </div>
            </h2>
            <div className="relative overflow-hidden text-lg text-foreground my-8 divide-effect overflow-hidden">
              <div className="relative z-10 gsap gsap-lines text-sm/8 lg:text-base/12 font-bold [&>span]:inline-b lock [&_span]:bg-background">
                <p className="text-4xl/16 *:inline-block *:break-keep">
                  <span>コードを書いて、</span>
                  <span>未来をえがく。</span>
                </p>
                <span>アプリチームでは起業やビジネス創出を目標として</span>
                <span>最先端技術を用いたアプリ開発を行います。</span>
                <br />
                <span>実際のシステム開発現場で用いられる</span>
                <span>プロジェクト管理の方法を採用し、</span>
                <span>3〜5人のチームでアプリ開発を行います。</span>
                <br />
                <span>プロジェクトに関わるメンバーのマネジメントが、</span>
                <span>あなたにとってエンジニア以外の進路にも</span>
                <span>活きる経験を生みます。</span>
                <br />
                <span>ユーザー体験の向上やコスト削減を目指し、</span>
                <span>ステークホルダーとの交渉や</span>
                <span>関係性の構築にも取り組みます。</span>
                <br />
                <span>その過程で得た知見が、</span>
                <span>経営者的視点の獲得につながります。</span>
                <br />
                <span>個人開発では得られないチーム開発のノウハウを学び、</span>
                <span>就職後にも生きる経験と繋がりを得ることができます。</span>
              </div>
              <div className="border-10 h-full absolute right-0 bottom-1/2 translate-y-1/2">
                <Image
                  src="/test-images/Gemini_Generated_Image_b0pgxyb0pgxyb0pg.png"
                  alt="Learn Section Image"
                  width={600}
                  height={600}
                  className="h-full object-cover"
                />
              </div>
            </div>
          </>
        )}

        {tabIndex === 1 && (
          <>
            <h2 className="overflow-hidden text-5xl lg:text-7xl font-light w-full divide-effect">
              <p className="font-extrabold text-xl px-1">ともに創る</p>
              <div className="gsap gsap-chars uppercase text-7xl font-bold palt">
                Build together
              </div>
            </h2>
            <div className="relative overflow-hidden text-lg text-foreground my-8 divide-effect overflow-hidden">
              <div className="relative z-10 gsap gsap-lines text-sm/8 lg:text-base/12 font-bold [&>span]:inline-b lock [&_span]:bg-background">
                <p className="text-4xl/16 *:inline-block *:break-keep">
                  <span>コードを書いて、</span>
                  <span>未来をえがく。</span>
                </p>
                <span>アプリチームでは起業やビジネス創出を目標として</span>
                <span>最先端技術を用いたアプリ開発を行います。</span>
                <br />
                <span>実際のシステム開発現場で用いられる</span>
                <span>プロジェクト管理の方法を採用し、</span>
                <span>3〜5人のチームでアプリ開発を行います。</span>
                <br />
                <span>プロジェクトに関わるメンバーのマネジメントが、</span>
                <span>あなたにとってエンジニア以外の進路にも</span>
                <span>活きる経験を生みます。</span>
                <br />
                <span>ユーザー体験の向上やコスト削減を目指し、</span>
                <span>ステークホルダーとの交渉や</span>
                <span>関係性の構築にも取り組みます。</span>
                <br />
                <span>その過程で得た知見が、</span>
                <span>経営者的視点の獲得につながります。</span>
                <br />
                <span>個人開発では得られないチーム開発のノウハウを学び、</span>
                <span>就職後にも生きる経験と繋がりを得ることができます。</span>
              </div>
              <div className="border-10 h-full absolute right-0 bottom-1/2 translate-y-1/2">
                <Image
                  src="/test-images/Gemini_Generated_Image_b0pgxyb0pgxyb0pg.png"
                  alt="Learn Section Image"
                  width={600}
                  height={600}
                  className="h-full object-cover"
                />
              </div>
            </div>
          </>
        )}

        {tabIndex === 2 && (
          <>
            <h2 className="overflow-hidden text-5xl lg:text-7xl font-light w-full divide-effect">
              <p className="font-extrabold text-xl px-1">ともに変える</p>
              <div className="gsap gsap-chars uppercase text-7xl font-bold palt">
                Change together
              </div>
            </h2>
            <div className="relative overflow-hidden text-lg text-foreground my-8 divide-effect overflow-hidden">
              <div className="relative z-10 gsap gsap-lines text-sm/8 lg:text-base/12 font-bold [&>span]:inline-b lock [&_span]:bg-background">
                <p className="text-4xl/16 *:inline-block *:break-keep">
                  <span>コードを書いて、</span>
                  <span>未来をえがく。</span>
                </p>
                <span>アプリチームでは起業やビジネス創出を目標として</span>
                <span>最先端技術を用いたアプリ開発を行います。</span>
                <br />
                <span>実際のシステム開発現場で用いられる</span>
                <span>プロジェクト管理の方法を採用し、</span>
                <span>3〜5人のチームでアプリ開発を行います。</span>
                <br />
                <span>プロジェクトに関わるメンバーのマネジメントが、</span>
                <span>あなたにとってエンジニア以外の進路にも</span>
                <span>活きる経験を生みます。</span>
                <br />
                <span>ユーザー体験の向上やコスト削減を目指し、</span>
                <span>ステークホルダーとの交渉や</span>
                <span>関係性の構築にも取り組みます。</span>
                <br />
                <span>その過程で得た知見が、</span>
                <span>経営者的視点の獲得につながります。</span>
                <br />
                <span>個人開発では得られないチーム開発のノウハウを学び、</span>
                <span>就職後にも生きる経験と繋がりを得ることができます。</span>
              </div>
              <div className="border-10 h-full absolute right-0 bottom-1/2 translate-y-1/2">
                <Image
                  src="/test-images/Gemini_Generated_Image_b0pgxyb0pgxyb0pg.png"
                  alt="Learn Section Image"
                  width={600}
                  height={600}
                  className="h-full object-cover"
                />
              </div>
            </div>
          </>
        )}
      </section>
    </div>
  );
}
