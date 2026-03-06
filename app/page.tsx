import News from "@/components/index/news";
import Blog from "@/components/index/blog";
import Projects from "@/components/index/projects";
import Join from "@/components/index/join";
import Hero from "@/components/index/hero";
import Sponsors from "@/components/index/sponsor";
import LearnSection from "@/components/index/learn";
import { client } from "@/libs/microcms";
import { BasicSettingsType } from "@/types/basics";
import type { Metadata } from "next";
import Script from "next/script";

export const metadata: Metadata = {
  title: "WINC - 早稲田大学公認 ITサークル | アプリ・Web開発",
  description:
    "WINC（早稲田コンピューター研究会）は早稲田大学公認のITサークルです。アプリ開発・Web制作・プログラミング学習を通じてエンジニアを目指す学生が集まっています。新入生大歓迎・企業のWeb制作依頼も受付中。",
  alternates: { canonical: "/" },
  openGraph: {
    url: "https://winc.ne.jp",
    title: "WINC - 早稲田大学公認 ITサークル | アプリ・Web開発",
    description:
      "早稲田大学公認のITサークル。アプリ開発・Web制作・プログラミング学習。「早稲田 ITサークル」「アプリ開発 サークル」「Web制作 依頼」を探している方はぜひ。",
  },
};

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "WINC（早稲田コンピューター研究会）",
  alternateName: ["WINC", "早稲田コンピューター研究会", "早稲田 ITサークル"],
  url: "https://winc.ne.jp",
  description:
    "早稲田大学公認のITサークル。アプリ開発・Web制作・プログラミング学習を通じてエンジニアを育成。",
  foundingLocation: {
    "@type": "Place",
    name: "早稲田大学",
    address: {
      "@type": "PostalAddress",
      addressLocality: "新宿区",
      addressRegion: "東京都",
      addressCountry: "JP",
    },
  },
  knowsAbout: ["アプリ開発", "Web制作", "プログラミング", "React", "Next.js", "Flutter", "AI"],
};

export default async function Home() {
  const basicSettings = await client.getObject<BasicSettingsType>({
    endpoint: "basics",
  });
  return (
    <>
      <Script
        id="organization-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
      />
      <main className="flex flex-col items-center gap-20">
        <Hero images={basicSettings['hero_images']} />
        <section className="w-full flex flex-col items-center divide-effect px-4 lg:px-0 bg-background/70">
          <div className="w-full max-w-[1440px] flex flex-row items-stretch relative">
            <div className="grow-[1] border-x border-x-(--pattern-fg) bg-[image:repeating-linear-gradient(315deg,_var(--pattern-fg)_0,_var(--pattern-fg)_1px,_transparent_0,_transparent_50%)] bg-[size:10px_10px] bg-fixed max-lg:hidden [--pattern-fg:var(--foreground)]/10"></div>
            <div className="w-full max-w-7xl">
              <LearnSection description={basicSettings['about_description']} image={basicSettings['about_image']} />
              {/* <Activities basicSettings={basicSettings} /> */}
              <Sponsors />
              <Projects />
              {/* 【TODO】Instagramのアカウント設定 */}
              {/* <Instagram /> */}
              <Join heading={basicSettings['join_heading']} body={basicSettings['join_body']} />
              <News />
              <Blog />
            </div>
            <div className="grow-[1] border-x border-x-(--pattern-fg) bg-[image:repeating-linear-gradient(315deg,_var(--pattern-fg)_0,_var(--pattern-fg)_1px,_transparent_0,_transparent_50%)] bg-[size:10px_10px] bg-fixed max-lg:hidden [--pattern-fg:var(--foreground)]/10"></div>
          </div>
        </section>
      </main>
    </>
  );
}
