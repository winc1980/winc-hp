import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import {
  getPostBySlug,
  getAllBlocksByBlockId,
  getPostBySlug as getPostBySlugFromClient,
  getTitleProperty,
  getDateProperty,
  getTagsProperty,
} from '@/lib/notion/client';
import { PostTitle } from '@/components/blog/PostTitle';
import { PostDate } from '@/components/blog/PostDate';
import { PostTags } from '@/components/blog/PostTags';
import { PostBody } from '@/components/blog/PostBody';
import { BlogPostDetail } from '@/types/Blog';
import { extractHeadingsForTOC } from '@/lib/blog-helpers';

interface BlogPostPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateMetadata(
  { params }: BlogPostPageProps
): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) {
    return {
      title: '記事が見つかりません',
    };
  }

  const title = getTitleProperty(post);
  const description = ''; // TODO: excerpt を取得

  return {
    title,
    description,
    openGraph: {
      type: 'article',
      title,
      description,
      publishedTime: post.created_time,
      modifiedTime: post.last_edited_time,
    },
  };
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;

  const post = await getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  // ブロック（本文）を取得
  let blocks = [];
  try {
    blocks = await getAllBlocksByBlockId(post.id);
  } catch (error) {
    console.error('Failed to fetch post blocks:', error);
  }

  // ページプロパティから情報を抽出
  const title = getTitleProperty(post);
  const publishedAt = getDateProperty(post);
  const tags = getTagsProperty(post);

  // 目次を生成
  const headings = extractHeadingsForTOC(blocks);

  const blogPost: BlogPostDetail = {
    id: post.id,
    title,
    slug,
    publishedAt: publishedAt || new Date().toISOString(),
    updatedAt: post.last_edited_time,
    tags,
    published: true,
    blocks,
    toc: headings.map((h, idx) => ({
      id: h.id,
      title: h.title,
      level: h.level,
      children: [],
    })),
  };

  return (
    <main className="blog-post-page">
      <article className="blog-post">
        <header className="post-header">
          <PostTitle title={blogPost.title} />
          <PostDate date={blogPost.publishedAt} updated={blogPost.updatedAt} />
          <PostTags tags={blogPost.tags} />
        </header>

        <div className="post-content">
          <PostBody blocks={blogPost.blocks} />
        </div>
      </article>
    </main>
  );
}

// 静的生成の対象となるスラッグを事前生成
export async function generateStaticParams() {
  const posts = await getPostBySlugFromClient('');
  // Note: 実装の簡略化のため、ここでは何も返さない
  // 必要に応じて、全投稿を取得して事前生成することもできます
  return [];
}
