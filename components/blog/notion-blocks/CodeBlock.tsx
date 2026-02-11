"use client";

import { useEffect, useRef } from "react";
import type { BlockWithChildren } from "@/lib/notion/types";
import RichText from "./RichText";
import Prism from "prismjs";
import "prismjs/components/prism-typescript";
import "prismjs/components/prism-javascript";
import "prismjs/components/prism-jsx";
import "prismjs/components/prism-tsx";
import "prismjs/components/prism-css";
import "prismjs/components/prism-python";
import "prismjs/components/prism-bash";
import "prismjs/components/prism-json";
import "prismjs/components/prism-markdown";
import "prismjs/components/prism-yaml";
import "prismjs/components/prism-go";
import "prismjs/components/prism-rust";
import "prismjs/components/prism-java";
import "prismjs/components/prism-c";
import "prismjs/components/prism-cpp";
import "prismjs/components/prism-sql";

// Map Notion language names to Prism language names
const languageMap: Record<string, string> = {
  "plain text": "plaintext",
  "c++": "cpp",
  "c#": "csharp",
  "objective-c": "objectivec",
  shell: "bash",
  sh: "bash",
  zsh: "bash",
};

export default function CodeBlock({ block }: { block: BlockWithChildren }) {
  const codeRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (codeRef.current) {
      Prism.highlightElement(codeRef.current);
    }
  }, []);

  if (block.type !== "code") return null;

  const code = block.code;
  const text = code.rich_text.map((t) => t.plain_text).join("");
  const language = languageMap[code.language] || code.language;

  return (
    <div className="my-4">
      <div className="notion-code-header">
        <span className="text-xs text-muted-foreground font-mono">
          {code.language}
        </span>
      </div>
      <pre className="notion-code-block !mt-0 rounded-t-none">
        <code ref={codeRef} className={`language-${language}`}>
          {text}
        </code>
      </pre>
      {code.caption.length > 0 && (
        <p className="text-sm text-muted-foreground mt-1">
          <RichText richTexts={code.caption} />
        </p>
      )}
    </div>
  );
}
