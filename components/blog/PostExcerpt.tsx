import React from 'react';
import { truncate } from '@/lib/blog-helpers';

interface PostExcerptProps {
  excerpt?: string;
}

export const PostExcerpt: React.FC<PostExcerptProps> = ({ excerpt }) => {
  if (!excerpt) {
    return null;
  }

  return <p className="post-excerpt">{excerpt}</p>;
};
