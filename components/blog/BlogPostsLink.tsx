import React from 'react';
import Link from 'next/link';
import { getPostLink, formatDate } from '@/lib/blog-helpers';
import { BlogPost } from '@/types/Blog';

interface BlogPostsLinkProps {
  posts: BlogPost[];
  title?: string;
}

export const BlogPostsLink: React.FC<BlogPostsLinkProps> = ({
  posts,
  title = '最新の記事',
}) => {
  if (!posts || posts.length === 0) {
    return null;
  }

  return (
    <div className="blog-posts-link">
      <h3 className="sidebar-title">{title}</h3>
      <ul className="posts-list">
        {posts.map((post) => (
          <li key={post.id}>
            <Link href={getPostLink(post.slug)}>
              <span className="post-item-title">{post.title}</span>
              <time className="post-item-date" dateTime={post.publishedAt}>
                {formatDate(post.publishedAt)}
              </time>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};
