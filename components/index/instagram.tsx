import { client } from "@/libs/microcms";
import { InstagramPostType } from "@/types/Instagram";
import SectionHeading from "./section-heading";
import InstagramCard from "./instagram-card";

async function getInstagramPosts(): Promise<InstagramPostType[]> {
  try {
    const data = await client.get({
      endpoint: "instagram",
      queries: {
        limit: 6,
        orders: "-posted_at",
      },
    });
    return data.contents;
  } catch {
    return [];
  }
}

export default async function Instagram() {
  const posts = await getInstagramPosts();

  if (posts.length === 0) return null;

  return (
    <div className="divide-effect flex flex-col justify-center">
      <section className="border-t border-b border-foreground/10 w-full max-w-7xl py-32 flex flex-col gap-20">
        <SectionHeading titleEn="instagram" titleJa="Instagram" />
        <div className="divide-effect">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-7xl">
            {posts.map((post) => (
              <InstagramCard key={post.id} post={post} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
