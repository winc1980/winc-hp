import type { RichTextItemResponse } from "@notionhq/client/build/src/api-endpoints";
import { getColorClass } from "@/lib/notion/utils";
import type { NotionColor } from "@/lib/notion/types";

interface RichTextProps {
  richTexts: RichTextItemResponse[];
}

export default function RichText({ richTexts }: RichTextProps) {
  if (!richTexts || richTexts.length === 0) return null;

  return (
    <>
      {richTexts.map((text, i) => (
        <RichTextItem key={i} text={text} />
      ))}
    </>
  );
}

function RichTextItem({ text }: { text: RichTextItemResponse }) {
  if (text.type !== "text" && text.type !== "equation") {
    return <span>{text.plain_text}</span>;
  }

  const annotations = text.annotations;
  let content: React.ReactNode = text.plain_text;

  // Apply annotations
  if (annotations.bold) {
    content = <strong>{content}</strong>;
  }
  if (annotations.italic) {
    content = <em>{content}</em>;
  }
  if (annotations.strikethrough) {
    content = <s>{content}</s>;
  }
  if (annotations.underline) {
    content = <u>{content}</u>;
  }
  if (annotations.code) {
    content = <code className="notion-inline-code">{content}</code>;
  }

  // Apply color
  const colorClass = getColorClass(annotations.color as NotionColor);

  // Apply link
  if (text.type === "text" && text.text.link) {
    return (
      <a
        href={text.text.link.url}
        className={`underline underline-offset-2 hover:opacity-70 transition-opacity ${colorClass}`}
        target={text.text.link.url.startsWith("/") ? undefined : "_blank"}
        rel={text.text.link.url.startsWith("/") ? undefined : "noopener noreferrer"}
      >
        {content}
      </a>
    );
  }

  if (colorClass) {
    return <span className={colorClass}>{content}</span>;
  }

  return <>{content}</>;
}
