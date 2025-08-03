import News from "@/components/index/news";
import Projects from "@/components/index/projects";
import Join from "@/components/index/join";
import Activities from "@/components/index/activities";
import Message from "@/components/index/message";
import About from "@/components/index/about";
import Hero from "@/components/index/hero";
import LearnSection from "@/components/index/learn";
export default function Home() {
  return (
    <>
      <main className="flex flex-col items-center gap-20">
        <Hero />
        <section className="w-full flex flex-col items-center divide-effect px-4 lg:px-0 bg-background/70">
          <div className="w-full max-w-[1440px] flex flex-row items-stretch relative">
            <div className="grow-[1] border-x border-x-(--pattern-fg) bg-[image:repeating-linear-gradient(315deg,_var(--pattern-fg)_0,_var(--pattern-fg)_1px,_transparent_0,_transparent_50%)] bg-[size:10px_10px] bg-fixed max-lg:hidden [--pattern-fg:var(--foreground)]/10"></div>
            <div className="w-full max-w-7xl">
              <LearnSection />
              <Activities />
              <Projects />
              <Join />
              <News />
              <Message />
            </div>
            <div className="grow-[1] border-x border-x-(--pattern-fg) bg-[image:repeating-linear-gradient(315deg,_var(--pattern-fg)_0,_var(--pattern-fg)_1px,_transparent_0,_transparent_50%)] bg-[size:10px_10px] bg-fixed max-lg:hidden [--pattern-fg:var(--foreground)]/10"></div>
          </div>
        </section>
      </main>
    </>
  );
}
