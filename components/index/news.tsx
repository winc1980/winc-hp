import NewsArticle from "@/components/news-article";
import { client } from "@/libs/microcms";
import { NewsType } from "@/types/News";
import { Plus } from "lucide-react";
import Link from "next/link";
import SectionHeading from "./section-heading";

async function getNews() {
  const data = await client.get({
    endpoint: "news",
  });
  return data.contents;
}

export default async function News() {
  const news = await getNews();

  return (
    <>
      <div className="divide-effect flex flex-col justify-center">
        <section className="border-t border-b border-foreground/10 w-full max-w-7xl py-32 flex flex-col gap-20">
          <SectionHeading titleEn="news" titleJa="新着情報" />
          <div className="min-h-[80vh] divide-effect flex flex-col items-center">
            {news.map((newsContent: NewsType, i: number) => {
              if (i < 3)
                return (
                  <NewsArticle newsContent={newsContent} key={newsContent.id} />
                );
            })}
            <Link
              href="/news/"
              className="flex gap-1 p-4 border-2 w-fit bg-foreground text-white hover:bg-transparent hover:text-foreground transition duration-300"
            >
              もっと見る
              <Plus />
            </Link>
          </div>
        </section>
      </div>
    </>
  );
}
