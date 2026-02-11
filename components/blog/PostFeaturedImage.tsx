import React from 'react';
import Image from 'next/image';

interface PostFeaturedImageProps {
  imageUrl?: string;
  alt?: string;
  title: string;
}

export const PostFeaturedImage: React.FC<PostFeaturedImageProps> = ({
  imageUrl,
  alt,
  title,
}) => {
  if (!imageUrl) {
    return null;
  }

  return (
    <div className="post-featured-image">
      <Image
        src={imageUrl}
        alt={alt || title}
        width={800}
        height={450}
        priority
        quality={80}
      />
    </div>
  );
};
