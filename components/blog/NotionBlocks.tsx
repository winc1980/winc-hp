'use client';

import React from 'react';
import { NotionBlock } from '@/lib/notion/responses';

interface NotionBlocksProps {
  blocks: NotionBlock[];
}

/**
 * Notionブロックのオーケストレーター
 * ブロック型ごとに適切なコンポーネントを呼び分ける
 */
export const NotionBlocks: React.FC<NotionBlocksProps> = ({ blocks }) => {
  if (!blocks || blocks.length === 0) {
    return <div className="blog-content empty">コンテンツがありません</div>;
  }

  return (
    <div className="blog-content notion-blocks">
      {blocks.map((block, index) => (
        <NotionBlockRenderer key={block.id} block={block} index={index} />
      ))}
    </div>
  );
};

interface NotionBlockRendererProps {
  block: NotionBlock;
  index: number;
}

/**
 * 個別ブロックのレンダラー
 */
const NotionBlockRenderer: React.FC<NotionBlockRendererProps> = ({ block, index }) => {
  try {
    switch (block.type) {
      case 'paragraph':
        return <ParagraphBlock block={block as any} />;

      case 'heading_1':
        return <Heading1Block block={block as any} />;

      case 'heading_2':
        return <Heading2Block block={block as any} />;

      case 'heading_3':
        return <Heading3Block block={block as any} />;

      case 'image':
        return <ImageBlock block={block as any} />;

      case 'code':
        return <CodeBlock block={block as any} />;

      case 'quote':
        return <QuoteBlock block={block as any} />;

      case 'callout':
        return <CalloutBlock block={block as any} />;

      case 'embed':
        return <EmbedBlock block={block as any} />;

      case 'bookmark':
        return <BookmarkBlock block={block as any} />;

      case 'bulleted_list_item':
        return <BulletedListItemBlock block={block as any} />;

      case 'numbered_list_item':
        return <NumberedListItemBlock block={block as any} />;

      case 'to_do':
        return <ToDoBlock block={block as any} />;

      case 'toggle':
        return <ToggleBlock block={block as any} />;

      case 'table_of_contents':
        return <TableOfContentsBlock block={block as any} />;

      case 'divider':
        return <DividerBlock block={block as any} />;

      case 'video':
        return <VideoBlock block={block as any} />;

      case 'file':
        return <FileBlock block={block as any} />;

      case 'equation':
        return <EquationBlock block={block as any} />;

      case 'table':
        return <TableBlock block={block as any} />;

      case 'column_list':
        return <ColumnListBlock block={block as any} />;

      case 'divider':
        return <DividerBlock block={block as any} />;

      default:
        console.warn(`Unknown block type: ${block.type}`);
        return <UnknownBlock block={block} />;
    }
  } catch (error) {
    console.error(`Error rendering block ${block.type}:`, error);
    return (
      <div className="block-error" role="alert">
        ブロックのレンダリングに失敗しました
      </div>
    );
  }
};

// =====================
// ブロックコンポーネント
// =====================

// 段落
const ParagraphBlock: React.FC<{ block: any }> = ({ block }) => {
  const text = block.paragraph.rich_text
    .map((rt: any) => rt.plain_text)
    .join('');

  if (!text.trim()) {
    return <div className="block-paragraph empty" />;
  }

  return (
    <p className="block-paragraph">
      <RichText richTexts={block.paragraph.rich_text} />
    </p>
  );
};

// 見出し1
const Heading1Block: React.FC<{ block: any }> = ({ block }) => {
  return (
    <h1 className="block-heading-1">
      <RichText richTexts={block.heading_1.rich_text} />
    </h1>
  );
};

// 見出し2
const Heading2Block: React.FC<{ block: any }> = ({ block }) => {
  return (
    <h2 className="block-heading-2">
      <RichText richTexts={block.heading_2.rich_text} />
    </h2>
  );
};

// 見出し3
const Heading3Block: React.FC<{ block: any }> = ({ block }) => {
  return (
    <h3 className="block-heading-3">
      <RichText richTexts={block.heading_3.rich_text} />
    </h3>
  );
};

// 画像
const ImageBlock: React.FC<{ block: any }> = ({ block }) => {
  const imageUrl =
    block.image.type === 'external'
      ? block.image.external?.url
      : block.image.file?.url;

  if (!imageUrl) {
    return <div className="block-image placeholder">画像が利用できません</div>;
  }

  const caption = block.image.caption
    .map((rt: any) => rt.plain_text)
    .join('');

  return (
    <figure className="block-image">
      <img src={imageUrl} alt={caption || '画像'} />
      {caption && <figcaption>{caption}</figcaption>}
    </figure>
  );
};

// コードブロック
const CodeBlock: React.FC<{ block: any }> = ({ block }) => {
  const code = block.code.rich_text.map((rt: any) => rt.plain_text).join('');
  const language = block.code.language || 'plaintext';
  const caption = block.code.caption
    .map((rt: any) => rt.plain_text)
    .join('');

  return (
    <div className="block-code">
      {caption && <div className="code-caption">{caption}</div>}
      <pre className={`language-${language}`}>
        <code>{code}</code>
      </pre>
    </div>
  );
};

// 引用
const QuoteBlock: React.FC<{ block: any }> = ({ block }) => {
  return (
    <blockquote className="block-quote">
      <RichText richTexts={block.quote.rich_text} />
    </blockquote>
  );
};

// コールアウト
const CalloutBlock: React.FC<{ block: any }> = ({ block }) => {
  const icon = block.callout.icon;
  const emoji = icon?.emoji;

  return (
    <div className={`block-callout callout-${block.callout.color}`}>
      {emoji && <span className="callout-icon">{emoji}</span>}
      <div className="callout-content">
        <RichText richTexts={block.callout.rich_text} />
      </div>
    </div>
  );
};

// 埋め込み
const EmbedBlock: React.FC<{ block: any }> = ({ block }) => {
  const url = block.embed.url;

  return (
    <div className="block-embed">
      <iframe
        src={url}
        title="Embedded content"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      />
    </div>
  );
};

// ブックマーク
const BookmarkBlock: React.FC<{ block: any }> = ({ block }) => {
  const url = block.bookmark.url;
  const caption = block.bookmark.caption
    .map((rt: any) => rt.plain_text)
    .join('');

  return (
    <div className="block-bookmark">
      <a href={url} target="_blank" rel="noopener noreferrer">
        <div className="bookmark-url">{url}</div>
        {caption && <div className="bookmark-caption">{caption}</div>}
      </a>
    </div>
  );
};

// 箇条書きリスト
const BulletedListItemBlock: React.FC<{ block: any }> = ({ block }) => {
  return (
    <li className="block-bulleted-list-item">
      <RichText richTexts={block.bulleted_list_item.rich_text} />
    </li>
  );
};

// 番号付きリスト
const NumberedListItemBlock: React.FC<{ block: any }> = ({ block }) => {
  return (
    <li className="block-numbered-list-item">
      <RichText richTexts={block.numbered_list_item.rich_text} />
    </li>
  );
};

// チェックボックス
const ToDoBlock: React.FC<{ block: any }> = ({ block }) => {
  return (
    <div className="block-todo">
      <input
        type="checkbox"
        checked={block.to_do.checked}
        disabled
        aria-label="todo"
      />
      <span className={block.to_do.checked ? 'checked' : ''}>
        <RichText richTexts={block.to_do.rich_text} />
      </span>
    </div>
  );
};

// トグル
const ToggleBlock: React.FC<{ block: any }> = ({ block }) => {
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <details className="block-toggle" open={isOpen} onToggle={(e) => setIsOpen(e.currentTarget.open)}>
      <summary>
        <RichText richTexts={block.toggle.rich_text} />
      </summary>
      <div className="toggle-content">{/* 子ブロックは別途実装 */}</div>
    </details>
  );
};

// 目次
const TableOfContentsBlock: React.FC<{ block: any }> = ({ block }) => {
  return (
    <div className="block-table-of-contents">
      <h3>目次</h3>
      {/* 目次の内容はクライアント側で生成 */}
    </div>
  );
};

// 区切り線
const DividerBlock: React.FC<{ block: any }> = ({ block }) => {
  return <hr className="block-divider" />;
};

// 動画
const VideoBlock: React.FC<{ block: any }> = ({ block }) => {
  const videoUrl =
    block.video.type === 'external'
      ? block.video.external?.url
      : block.video.file?.url;

  if (!videoUrl) {
    return <div className="block-video placeholder">動画が利用できません</div>;
  }

  const caption = block.video.caption
    .map((rt: any) => rt.plain_text)
    .join('');

  return (
    <figure className="block-video">
      <video controls>
        <source src={videoUrl} />
        お使いのブラウザは動画タグをサポートしていません。
      </video>
      {caption && <figcaption>{caption}</figcaption>}
    </figure>
  );
};

// ファイル
const FileBlock: React.FC<{ block: any }> = ({ block }) => {
  const fileUrl =
    block.file.type === 'external' ? block.file.external?.url : block.file.file?.url;
  const caption = block.file.caption
    .map((rt: any) => rt.plain_text)
    .join('');

  if (!fileUrl) {
    return <div className="block-file placeholder">ファイルが利用できません</div>;
  }

  return (
    <div className="block-file">
      <a href={fileUrl} download>
        📎 {caption || 'ファイルをダウンロード'}
      </a>
    </div>
  );
};

// 数式
const EquationBlock: React.FC<{ block: any }> = ({ block }) => {
  const expression = block.equation.expression;

  return (
    <div className="block-equation">
      <pre>{expression}</pre>
      {/* KaTeXでのレンダリングはクライアント側に委譲 */}
    </div>
  );
};

// テーブル
const TableBlock: React.FC<{ block: any }> = ({ block }) => {
  return (
    <div className="block-table">
      <table>{/* テーブル行は別途実装 */}</table>
    </div>
  );
};

// カラムリスト
const ColumnListBlock: React.FC<{ block: any }> = ({ block }) => {
  return (
    <div className="block-column-list">
      {/* カラムは別途実装 */}
    </div>
  );
};

// 不明なブロック
const UnknownBlock: React.FC<{ block: NotionBlock }> = ({ block }) => {
  return (
    <div className="block-unknown" style={{ opacity: 0.5 }}>
      <small>未対応のブロック型: {block.type}</small>
    </div>
  );
};

// =====================
// ユーティリティコンポーネント
// =====================

interface RichTextProps {
  richTexts: any[];
}

/**
 * リッチテキストレンダラー
 */
const RichText: React.FC<RichTextProps> = ({ richTexts }) => {
  return (
    <>
      {richTexts.map((rt, index) => (
        <TextAnnotation key={index} richText={rt} />
      ))}
    </>
  );
};

interface TextAnnotationProps {
  richText: any;
}

/**
 * テキスト装飾レンダラー
 */
const TextAnnotation: React.FC<TextAnnotationProps> = ({ richText }) => {
  let element: React.ReactNode = richText.plain_text;

  // リンク処理
  if (richText.href) {
    element = (
      <a href={richText.href} target="_blank" rel="noopener noreferrer">
        {element}
      </a>
    );
  }

  // 装飾処理
  const { bold, italic, strikethrough, underline, code, color } = richText.annotations;

  if (bold) {
    element = <strong>{element}</strong>;
  }
  if (italic) {
    element = <em>{element}</em>;
  }
  if (code) {
    element = <code>{element}</code>;
  }
  if (strikethrough) {
    element = <del>{element}</del>;
  }
  if (underline) {
    element = <u>{element}</u>;
  }
  if (color && color !== 'default') {
    element = <span className={`color-${color}`}>{element}</span>;
  }

  return <>{element}</>;
};

export default NotionBlocks;
