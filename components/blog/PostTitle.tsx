import React from 'react';
import { formatDate } from '@/lib/blog-helpers';
import { BlogPost } from '@/types/Blog';

interface PostTitleProps {
  title: string;
}

export const PostTitle: React.FC<PostTitleProps> = ({ title }) => {
  return <h1 className="post-title">{title}</h1>;
};
