import { notFound } from "next/navigation";
import Link from "next/link";
import { getAllPosts, getPostBySlug, getPostBlocks } from "@/lib/notion";
import PostHeader from "@/components/blog/PostHeader";
import NotionBlocks from "@/components/blog/notion-blocks/NotionBlocks";
import type { Metadata } from "next";

interface Props {
  params: Promise<{ slug: string }>;
}

export const revalidate = 60;

export async function generateStaticParams() {
  const posts = await getAllPosts();
  return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) return { title: "Not Found - WINC" };

  return {
    title: `${post.title} - WINC Blog`,
    description: post.excerpt || `${post.title} - WINCブログ`,
  };
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) notFound();

  const blocks = await getPostBlocks(post.id);

  return (
    <main className="flex flex-col items-center">
      <section className="w-full flex flex-col items-center bg-background mt-24">
        <div className="w-full max-w-[1440px] flex flex-row items-stretch relative">
          <div className="grow-[1] border-x border-x-(--pattern-fg) bg-[image:repeating-linear-gradient(315deg,_var(--pattern-fg)_0,_var(--pattern-fg)_1px,_transparent_0,_transparent_50%)] bg-[size:10px_10px] bg-fixed max-lg:hidden [--pattern-fg:var(--foreground)]/10"></div>
          <div className="w-full max-w-3xl px-6 py-12">
            <PostHeader post={post} />
            {post.coverImage && (
              <div className="mb-8">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={post.coverImage}
                  alt={post.title}
                  className="w-full rounded-lg"
                />
              </div>
            )}
            <article className="notion-content">
              <NotionBlocks blocks={blocks} />
            </article>
            <nav className="mt-12 pt-8 border-t border-foreground/10">
              <Link
                href="/blog"
                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                &larr; ブログ一覧に戻る
              </Link>
            </nav>
          </div>
          <div className="grow-[1] border-x border-x-(--pattern-fg) bg-[image:repeating-linear-gradient(315deg,_var(--pattern-fg)_0,_var(--pattern-fg)_1px,_transparent_0,_transparent_50%)] bg-[size:10px_10px] bg-fixed max-lg:hidden [--pattern-fg:var(--foreground)]/10"></div>
        </div>
      </section>
    </main>
  );
}
