import type {
  PageObjectResponse,
  BlockObjectResponse,
  RichTextItemResponse,
} from "@notionhq/client/build/src/api-endpoints";

// 
export type { RichTextItemResponse, BlockObjectResponse };

export type NotionPage = PageObjectResponse;

// ブログ型
export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  date: string;
  tags: Tag[];
  excerpt: string;
  coverImage: string | null;
  published: boolean;
}

export interface Tag {
  id: string;
  name: string;
  color: string;
}

export type BlockWithChildren = BlockObjectResponse & {
  children?: BlockWithChildren[];
};

// Notionの色
export type NotionColor =
  | "default"
  | "gray"
  | "brown"
  | "orange"
  | "yellow"
  | "green"
  | "blue"
  | "purple"
  | "pink"
  | "red"
  | "gray_background"
  | "brown_background"
  | "orange_background"
  | "yellow_background"
  | "green_background"
  | "blue_background"
  | "purple_background"
  | "pink_background"
  | "red_background";
