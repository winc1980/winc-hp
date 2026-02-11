import { Metadata } from 'next';
import Link from 'next/link';
import { getAllPosts, getTitleProperty, getDateProperty, getSlug, getTagsProperty } from '@/lib/notion/client';
import { getPostLink, formatDate } from '@/lib/blog-helpers';
import { BLOG_CONFIG } from '@/lib/constants';

export const metadata: Metadata = {
  title: 'ブログ',
  description: 'ブログ記事一覧',
};

export default async function BlogPage() {
  let posts = [];
  let error = null;

  try {
    const allPosts = await getAllPosts();
    posts = allPosts.slice(0, BLOG_CONFIG.MAX_POSTS).map((notionPage) => ({
      id: notionPage.id,
      title: getTitleProperty(notionPage),
      slug: getSlug(notionPage),
      publishedAt: getDateProperty(notionPage) || new Date().toISOString(),
      updatedAt: notionPage.last_edited_time,
      tags: getTagsProperty(notionPage),
      published: true,
    }));
  } catch (err) {
    console.error('Failed to fetch blog posts:', err);
    error = 'ブログ記事の取得に失敗しました。';
  }

  return (
    <main className="blog-page blog-index">
      <div className="container">
        <div className="blog-header">
          <h1>ブログ</h1>
          <p>最新のニュースと記事</p>
        </div>

        {error ? (
          <div className="error-message" role="alert">
            {error}
          </div>
        ) : posts.length > 0 ? (
          <div className="blog-posts-list">
            {posts.map((post) => (
              <article key={post.id} className="blog-post-card">
                <header>
                  <h2>
                    <Link href={getPostLink(post.slug)}>{post.title}</Link>
                  </h2>
                  <time dateTime={post.publishedAt} className="post-date">
                    {formatDate(post.publishedAt)}
                  </time>
                </header>
                {post.tags.length > 0 && (
                  <div className="post-tags">
                    {post.tags.map((tag) => (
                      <Link
                        key={tag}
                        href={`/blog/tag/${encodeURIComponent(tag)}`}
                        className="post-tag-link"
                      >
                        #{tag}
                      </Link>
                    ))}
                  </div>
                )}
              </article>
            ))}
          </div>
        ) : (
          <div className="empty-state">
            <p>ブログ記事がまだありません。</p>
          </div>
        )}
      </div>
    </main>
  );
}
