import type {
  PageObjectResponse,
  BlockObjectResponse,
  RichTextItemResponse,
} from "@notionhq/client/build/src/api-endpoints";

// Re-export useful Notion SDK types
export type { RichTextItemResponse, BlockObjectResponse };

export type NotionPage = PageObjectResponse;

// Blog post type extracted from Notion page properties
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

// Block with children for nested blocks (toggle, lists, etc.)
// BlockObjectResponse is a discriminated union, so we use intersection type
export type BlockWithChildren = BlockObjectResponse & {
  children?: BlockWithChildren[];
};

// Notion color type
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
