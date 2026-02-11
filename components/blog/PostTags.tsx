import React from 'react';
import Link from 'next/link';
import { getTagLink } from '@/lib/blog-helpers';

interface PostTagsProps {
  tags: string[];
}

export const PostTags: React.FC<PostTagsProps> = ({ tags }) => {
  if (!tags || tags.length === 0) {
    return null;
  }

  return (
    <div className="post-tags">
      {tags.map((tag) => (
        <Link
          key={tag}
          href={getTagLink(tag)}
          className="post-tag"
        >
          #{tag}
        </Link>
      ))}
    </div>
  );
};
