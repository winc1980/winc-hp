import PageHeader from "@/components/page-header";
import ProjectSection from "@/components/projects/ProjectSection";
import Script from "next/script";

export default function Home() {
  return (
    <>
      <div>
        <div id="homepage-background" className="fixed h-screen w-screen -z-1"></div>
        <Script
          src="https://cdnjs.cloudflare.com/ajax/libs/three.js/r134/three.min.js"
          strategy="beforeInteractive"
        />
        <Script
          src="https://cdn.jsdelivr.net/npm/vanta@latest/dist/vanta.net.min.js"
          strategy="beforeInteractive"
        />
        <Script id="script">
          {`VANTA.NET({
              el: "#homepage-background",
              mouseControls: true,
              touchControls: true,
              gyroControls: false,
              minHeight: 200.00,
              minWidth: 200.00,
              scale: 1.00,
              scaleMobile: 1.00,
              color: 0x69ff,
              backgroundColor: 0x0
            });`}
        </Script>
      </div>
      <main className="flex flex-col items-center">
        <PageHeader titleJa="プロジェクト一覧" titleEn="Our.projects();" desc="WINCアプリチームの制作実績と、進行中のプロジェクトをお伝えします" />
        <section className="w-full flex flex-col items-center divide-effect bg-background">
          <div className="w-full max-w-[1440px] flex flex-row items-stretch relative">
            <div className="grow-[1] border-x border-x-(--pattern-fg) bg-[image:repeating-linear-gradient(315deg,_var(--pattern-fg)_0,_var(--pattern-fg)_1px,_transparent_0,_transparent_50%)] bg-[size:10px_10px] bg-fixed max-lg:hidden [--pattern-fg:var(--foreground)]/10"></div>
            <div className="w-full max-w-7xl">
              <div className="min-h-[80vh] divide-effect flex flex-col justify-start">
                <ProjectSection />
              </div>
            </div>
            <div className="grow-[1] border-x border-x-(--pattern-fg) bg-[image:repeating-linear-gradient(315deg,_var(--pattern-fg)_0,_var(--pattern-fg)_1px,_transparent_0,_transparent_50%)] bg-[size:10px_10px] bg-fixed max-lg:hidden [--pattern-fg:var(--foreground)]/10"></div>
          </div>
        </section>

        {/* <section className="w-full flex flex-col items-center divide-effect">
          <div className="w-full max-w-[1440px] flex flex-row items-stretch relative">
            <div className="grow-[1] border-x border-x-(--pattern-fg) bg-[image:repeating-linear-gradient(315deg,_var(--pattern-fg)_0,_var(--pattern-fg)_1px,_transparent_0,_transparent_50%)] bg-[size:10px_10px] bg-fixed max-lg:hidden [--pattern-fg:var(--foreground)]/10">
              <div className="mt-24 lg:mt-8 mx-2 px-2">
                <div className="flex flex-col gap-6 text-center lg:text-start">
                  <ProjectSection sectionName="進行中のプロジェクト" />
                  <ProjectSection sectionName="過去のプロジェクト" />
                </div>
              </div>
            </div>
          </div>
        </section> */}
      </main>

    </>
  );
}
