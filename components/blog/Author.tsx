import React from 'react';
import Image from 'next/image';
import { BlogAuthor } from '@/types/Blog';

interface AuthorProps {
  author?: BlogAuthor;
}

export const Author: React.FC<AuthorProps> = ({ author }) => {
  if (!author) {
    return null;
  }

  return (
    <div className="post-author">
      {author.avatar_url && (
        <div className="author-avatar">
          <Image
            src={author.avatar_url}
            alt={author.name}
            width={64}
            height={64}
            quality={80}
          />
        </div>
      )}
      <div className="author-info">
        <div className="author-name">{author.name}</div>
        {author.role && <div className="author-role">{author.role}</div>}
        {author.bio && <div className="author-bio">{author.bio}</div>}
      </div>
    </div>
  );
};
