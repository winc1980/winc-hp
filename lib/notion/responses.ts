/**
 * Notion API レスポンスの型定義
 */

// 基本的なプロパティタイプ
export interface NotionRichText {
  type: 'text' | 'mention' | 'equation';
  text?: {
    content: string;
    link: {
      url: string;
    } | null;
  };
  mention?: {
    type: string;
    user?: {
      id: string;
      name?: string;
      avatar_url?: string;
    };
  };
  equation?: {
    expression: string;
  };
  annotations: {
    bold: boolean;
    italic: boolean;
    strikethrough: boolean;
    underline: boolean;
    code: boolean;
    color: string;
  };
  plain_text: string;
  href: string | null;
}

export interface NotionFile {
  type: 'file' | 'external';
  file?: {
    url: string;
    expiry_time: string;
  };
  external?: {
    url: string;
  };
}

// ブロックの型定義
export interface NotionBlockBase {
  object: 'block';
  id: string;
  parent: {
    type: string;
    page_id?: string;
  };
  created_time: string;
  last_edited_time: string;
  created_by: {
    object: string;
    id: string;
  };
  last_edited_by: {
    object: string;
    id: string;
  };
  has_children: boolean;
  archived: boolean;
  type: string;
}

export interface ParagraphBlock extends NotionBlockBase {
  type: 'paragraph';
  paragraph: {
    rich_text: NotionRichText[];
    color: string;
  };
}

export interface Heading1Block extends NotionBlockBase {
  type: 'heading_1';
  heading_1: {
    rich_text: NotionRichText[];
    is_toggleable: boolean;
    color: string;
  };
}

export interface Heading2Block extends NotionBlockBase {
  type: 'heading_2';
  heading_2: {
    rich_text: NotionRichText[];
    is_toggleable: boolean;
    color: string;
  };
}

export interface Heading3Block extends NotionBlockBase {
  type: 'heading_3';
  heading_3: {
    rich_text: NotionRichText[];
    is_toggleable: boolean;
    color: string;
  };
}

export interface ImageBlock extends NotionBlockBase {
  type: 'image';
  image: NotionFile & {
    caption: NotionRichText[];
  };
}

export interface CodeBlock extends NotionBlockBase {
  type: 'code';
  code: {
    rich_text: NotionRichText[];
    language: string;
    caption: NotionRichText[];
  };
}

export interface QuoteBlock extends NotionBlockBase {
  type: 'quote';
  quote: {
    rich_text: NotionRichText[];
    color: string;
  };
}

export interface CalloutBlock extends NotionBlockBase {
  type: 'callout';
  callout: {
    rich_text: NotionRichText[];
    icon: {
      type: 'emoji' | 'external' | 'file';
      emoji?: string;
      external?: { url: string };
      file?: { url: string };
    };
    color: string;
  };
}

export interface EmbedBlock extends NotionBlockBase {
  type: 'embed';
  embed: {
    url: string;
  };
}

export interface BookmarkBlock extends NotionBlockBase {
  type: 'bookmark';
  bookmark: {
    url: string;
    caption: NotionRichText[];
  };
}

export interface BulletedListItemBlock extends NotionBlockBase {
  type: 'bulleted_list_item';
  bulleted_list_item: {
    rich_text: NotionRichText[];
    color: string;
  };
}

export interface NumberedListItemBlock extends NotionBlockBase {
  type: 'numbered_list_item';
  numbered_list_item: {
    rich_text: NotionRichText[];
    color: string;
  };
}

export interface ToDoBlock extends NotionBlockBase {
  type: 'to_do';
  to_do: {
    rich_text: NotionRichText[];
    checked: boolean;
    color: string;
  };
}

export interface ToggleBlock extends NotionBlockBase {
  type: 'toggle';
  toggle: {
    rich_text: NotionRichText[];
    color: string;
  };
}

export interface TableOfContentsBlock extends NotionBlockBase {
  type: 'table_of_contents';
  table_of_contents: {
    color: string;
  };
}

export interface DividerBlock extends NotionBlockBase {
  type: 'divider';
  divider: object;
}

export interface VideoBlock extends NotionBlockBase {
  type: 'video';
  video: NotionFile & {
    caption: NotionRichText[];
  };
}

export interface FileBlock extends NotionBlockBase {
  type: 'file';
  file: NotionFile & {
    caption: NotionRichText[];
  };
}

export interface EquationBlock extends NotionBlockBase {
  type: 'equation';
  equation: {
    expression: string;
  };
}

export interface ColumnListBlock extends NotionBlockBase {
  type: 'column_list';
  column_list: object;
}

export interface ColumnBlock extends NotionBlockBase {
  type: 'column';
  column: object;
}

export interface TableBlock extends NotionBlockBase {
  type: 'table';
  table: {
    table_width: number;
    has_column_header: boolean;
    has_row_header: boolean;
  };
}

export interface TableRowBlock extends NotionBlockBase {
  type: 'table_row';
  table_row: {
    cells: NotionRichText[][];
  };
}

export type NotionBlock =
  | ParagraphBlock
  | Heading1Block
  | Heading2Block
  | Heading3Block
  | ImageBlock
  | CodeBlock
  | QuoteBlock
  | CalloutBlock
  | EmbedBlock
  | BookmarkBlock
  | BulletedListItemBlock
  | NumberedListItemBlock
  | ToDoBlock
  | ToggleBlock
  | TableOfContentsBlock
  | DividerBlock
  | VideoBlock
  | FileBlock
  | EquationBlock
  | ColumnListBlock
  | ColumnBlock
  | TableBlock
  | TableRowBlock;

// ページプロパティの型定義
export interface NotionPageProperty {
  id: string;
  type: string;
  [key: string]: any;
}

export interface TitleProperty extends NotionPageProperty {
  type: 'title';
  title: NotionRichText[];
}

export interface RichTextProperty extends NotionPageProperty {
  type: 'rich_text';
  rich_text: NotionRichText[];
}

export interface SelectProperty extends NotionPageProperty {
  type: 'select';
  select: {
    id: string;
    name: string;
    color: string;
  } | null;
}

export interface MultiSelectProperty extends NotionPageProperty {
  type: 'multi_select';
  multi_select: Array<{
    id: string;
    name: string;
    color: string;
  }>;
}

export interface DateProperty extends NotionPageProperty {
  type: 'date';
  date: {
    start: string;
    end: string | null;
    time_zone: string | null;
  } | null;
}

export interface CheckboxProperty extends NotionPageProperty {
  type: 'checkbox';
  checkbox: boolean;
}

export interface RelationProperty extends NotionPageProperty {
  type: 'relation';
  relation: Array<{
    id: string;
  }>;
}

export interface RollupProperty extends NotionPageProperty {
  type: 'rollup';
  rollup: {
    type: string;
    number?: number;
    array?: any[];
  } | null;
}

// ページレスポンス
export interface NotionPage {
  object: 'page';
  id: string;
  created_time: string;
  last_edited_time: string;
  created_by: {
    object: string;
    id: string;
  };
  last_edited_by: {
    object: string;
    id: string;
  };
  cover: NotionFile | null;
  icon: {
    type: 'emoji' | 'external' | 'file';
    emoji?: string;
    external?: { url: string };
    file?: { url: string };
  } | null;
  parent: {
    type: string;
    database_id?: string;
  };
  archived: boolean;
  properties: Record<string, NotionPageProperty>;
  url: string;
  public_url: string | null;
}

// データベースクエリレスポンス
export interface NotionQueryDatabaseResponse {
  object: 'list';
  results: NotionPage[];
  next_cursor: string | null;
  has_more: boolean;
  type: 'page_or_database';
  page_or_database: object;
}

// ブロック子要素レスポンス
export interface NotionBlockChildrenResponse {
  object: 'list';
  results: NotionBlock[];
  next_cursor: string | null;
  has_more: boolean;
}
