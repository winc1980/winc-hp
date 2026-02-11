import React from 'react';
import Link from 'next/link';
import { getPostLink } from '@/lib/blog-helpers';
import { BlogPost } from '@/types/Blog';

interface PostRelativeLinkProps {
  prevPost?: BlogPost;
  nextPost?: BlogPost;
}

export const PostRelativeLink: React.FC<PostRelativeLinkProps> = ({
  prevPost,
  nextPost,
}) => {
  return (
    <nav className="post-relative-link">
      <div className="prev-post">
        {prevPost ? (
          <Link href={getPostLink(prevPost.slug)}>
            <span className="label">← 前の記事</span>
            <span className="title">{prevPost.title}</span>
          </Link>
        ) : (
          <div className="empty" />
        )}
      </div>
      <div className="next-post">
        {nextPost ? (
          <Link href={getPostLink(nextPost.slug)}>
            <span className="label">次の記事 →</span>
            <span className="title">{nextPost.title}</span>
          </Link>
        ) : (
          <div className="empty" />
        )}
      </div>
    </nav>
  );
};
