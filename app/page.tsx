import News from "@/components/index/news";
import Blog from "@/components/index/blog";
import Projects from "@/components/index/projects";
import Join from "@/components/index/join";
import Activities from "@/components/index/activities";
import Hero from "@/components/index/hero";
import LearnSection from "@/components/index/learn";
import { client } from "@/libs/microcms";
import { BasicSettingsType } from "@/types/basics";
export default async function Home() {
  const basicSettings = await client.getObject<BasicSettingsType>({
    endpoint: "basics",
  });
  return (
    <>
      <main className="flex flex-col items-center gap-20">
        <Hero images={basicSettings['hero_images']} />
        <section className="w-full flex flex-col items-center divide-effect px-4 lg:px-0 bg-background/70">
          <div className="w-full max-w-[1440px] flex flex-row items-stretch relative">
            <div className="grow-[1] border-x border-x-(--pattern-fg) bg-[image:repeating-linear-gradient(315deg,_var(--pattern-fg)_0,_var(--pattern-fg)_1px,_transparent_0,_transparent_50%)] bg-[size:10px_10px] bg-fixed max-lg:hidden [--pattern-fg:var(--foreground)]/10"></div>
            <div className="w-full max-w-7xl">
              <LearnSection description={basicSettings['about_description']} image={basicSettings['about_image']} />
              <Activities basicSettings={basicSettings} />
              <Projects />
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
