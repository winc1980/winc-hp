/**
 * ブログアプリケーション用の型定義
 */

import { NotionBlock } from '@/lib/notion/responses';

/**
 * ブログ投稿のメタデータ
 */
export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt?: string;
  content?: string;
  publishedAt: string;
  updatedAt: string;
  featured_image?: {
    url: string;
    alt?: string;
  };
  author?: BlogAuthor;
  tags: string[];
  published: boolean;
}

/**
 * ブログ投稿の詳細版（本文ブロック付き）
 */
export interface BlogPostDetail extends BlogPost {
  blocks: NotionBlock[];
  toc?: TableOfContentsItem[];
}

/**
 * 著者情報
 */
export interface BlogAuthor {
  id: string;
  name: string;
  bio?: string;
  avatar_url?: string;
  role?: string;
}

/**
 * 目次アイテム
 */
export interface TableOfContentsItem {
  id: string;
  title: string;
  level: 1 | 2 | 3;
  children: TableOfContentsItem[];
}

/**
 * ブログ一覧ページのレスポンス
 */
export interface BlogPostsResponse {
  posts: BlogPost[];
  total: number;
  pageSize: number;
  currentPage: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
}

/**
 * ブログタグ
 */
export interface BlogTag {
  name: string;
  count: number;
}

/**
 * ブログ検索結果
 */
export interface BlogSearchResult {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  publishedAt: string;
  tags: string[];
  score?: number;
}
