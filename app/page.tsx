import News from "@/components/index/news";
import Projects from "@/components/index/projects";
import Join from "@/components/index/join";
import Activities from "@/components/index/activities";
import Hero from "@/components/index/hero";
import LearnSection from "@/components/index/learn";
import Image from "next/image";
export default function Home() {
  return (
    <>
      <main className="flex flex-col items-center">
        <Hero />
        <Activities />
      </main>
    </>
  );
}
