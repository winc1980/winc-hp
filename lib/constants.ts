/**
 * ブログ機能の定数定義
 */

// Notion API 関連
export const NOTION_API_SECRET = process.env.NOTION_API_SECRET;
export const NOTION_DATABASE_ID = process.env.NOTION_DATABASE_ID;
export const NOTION_DATABASE_ID_AUTHOR = process.env.NOTION_DATABASE_ID_AUTHOR;

// カスタム設定
export const CUSTOM_DOMAIN = process.env.CUSTOM_DOMAIN || 'http://localhost:3000';
export const BASE_PATH = process.env.BASE_PATH || '/blog';
export const REQUEST_TIMEOUT_MS = parseInt(process.env.REQUEST_TIMEOUT_MS || '30000');

// Google Analytics
export const GA_TRACKING_ID = process.env.NEXT_PUBLIC_GA_TRACKING_ID;

// ライトボックス設定
export const ENABLE_LIGHTBOX = process.env.NEXT_PUBLIC_ENABLE_LIGHTBOX !== 'false';

// ブログ設定
export const BLOG_CONFIG = {
  // 1ページあたりの投稿数
  PAGE_SIZE: 10,

  // タグページの投稿数
  TAG_PAGE_SIZE: 10,

  // 一覧ページで表示する投稿の最大数
  MAX_POSTS: 100,

  // OGP画像のサイズ
  OGP_IMAGE_WIDTH: 1200,
  OGP_IMAGE_HEIGHT: 630,

  // アイキャッチ画像のサイズ
  FEATURED_IMAGE_WIDTH: 800,
  FEATURED_IMAGE_HEIGHT: 450,

  // 著者アバター画像のサイズ
  AUTHOR_AVATAR_SIZE: 64,

  // キャッシュの有効期限（秒）
  // ISRで使用
  REVALIDATE_SECONDS: 60 * 60 * 24, // 24時間
};

// Notionプロパティ名の定義
export const NOTION_PROPERTIES = {
  // ブログ投稿データベースのプロパティ
  TITLE: 'Title',
  SLUG: 'Slug',
  EXCERPT: 'Excerpt',
  FEATURED_IMAGE: 'Featured Image',
  DATE: 'Date',
  PUBLISHED: 'Published',
  TAGS: 'Tags',
  AUTHOR: 'Author',
  CONTENT: 'Content', // テキストプロパティ
  VIEWS: 'Views',

  // 著者データベースのプロパティ
  AUTHOR_NAME: 'Name',
  AUTHOR_BIO: 'Bio',
  AUTHOR_AVATAR: 'Avatar',
  AUTHOR_ROLE: 'Role',
};

// ブロックタイプの定義
export const NOTION_BLOCK_TYPES = {
  PARAGRAPH: 'paragraph',
  HEADING_1: 'heading_1',
  HEADING_2: 'heading_2',
  HEADING_3: 'heading_3',
  IMAGE: 'image',
  CODE: 'code',
  QUOTE: 'quote',
  CALLOUT: 'callout',
  EMBED: 'embed',
  BOOKMARK: 'bookmark',
  BULLETED_LIST_ITEM: 'bulleted_list_item',
  NUMBERED_LIST_ITEM: 'numbered_list_item',
  TODO: 'to_do',
  TOGGLE: 'toggle',
  TABLE_OF_CONTENTS: 'table_of_contents',
  DIVIDER: 'divider',
  VIDEO: 'video',
  FILE: 'file',
  EQUATION: 'equation',
  COLUMN_LIST: 'column_list',
  COLUMN: 'column',
  TABLE: 'table',
  TABLE_ROW: 'table_row',
};

// キャッシュ用のファイルパス
export const CACHE_PATHS = {
  BLOG_POSTS: '.cache/blog-posts.json',
  BLOG_TAGS: '.cache/blog-tags.json',
  BLOG_BLOCKS: '.cache/blog-blocks',
};

// テンプレートのパス
export const COMPONENT_PATHS = {
  LAYOUTS: '/components/blog/layouts',
  COMPONENTS: '/components/blog',
  NOTION_BLOCKS: '/components/blog/blocks',
};
