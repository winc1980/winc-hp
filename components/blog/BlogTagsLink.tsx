import React from 'react';
import Link from 'next/link';
import { getTagLink } from '@/lib/blog-helpers';
import { BlogTag } from '@/types/Blog';

interface BlogTagsLinkProps {
  tags: BlogTag[];
  title?: string;
}

export const BlogTagsLink: React.FC<BlogTagsLinkProps> = ({
  tags,
  title = 'タグ',
}) => {
  if (!tags || tags.length === 0) {
    return null;
  }

  return (
    <div className="blog-tags-link">
      <h3 className="sidebar-title">{title}</h3>
      <div className="tags-cloud">
        {tags.map((tag) => (
          <Link
            key={tag.name}
            href={getTagLink(tag.name)}
            className="tag-item"
            style={{
              fontSize: `${0.8 + (tag.count / Math.max(...tags.map((t) => t.count))) * 0.4}rem`,
            }}
          >
            {tag.name}
            <span className="tag-count">({tag.count})</span>
          </Link>
        ))}
      </div>
    </div>
  );
};
