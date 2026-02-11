import React from 'react';
import { formatDate } from '@/lib/blog-helpers';

interface PostDateProps {
  date: string;
  updated?: string;
}

export const PostDate: React.FC<PostDateProps> = ({ date, updated }) => {
  return (
    <div className="post-date">
      <time dateTime={date}>{formatDate(date)}</time>
      {updated && updated !== date && (
        <span className="post-updated">
          更新: <time dateTime={updated}>{formatDate(updated)}</time>
        </span>
      )}
    </div>
  );
};
