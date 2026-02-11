import React from 'react';
import { NotionBlock } from '@/lib/notion/responses';
import NotionBlocks from '@/components/blog/NotionBlocks';

interface PostBodyProps {
  blocks: NotionBlock[];
}

export const PostBody: React.FC<PostBodyProps> = ({ blocks }) => {
  return (
    <article className="post-body">
      <NotionBlocks blocks={blocks} />
    </article>
  );
};
