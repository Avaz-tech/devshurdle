"use client";

import { useEffect, useState } from "react";
import hljs from "highlight.js/lib/core";
import typescript from "highlight.js/lib/languages/typescript";
import javascript from "highlight.js/lib/languages/javascript";
import python from "highlight.js/lib/languages/python";
import java from "highlight.js/lib/languages/java";
import bash from "highlight.js/lib/languages/bash";
import json from "highlight.js/lib/languages/json";
import css from "highlight.js/lib/languages/css";
import "highlight.js/styles/atom-one-dark.css";
import { LuCopy, LuCopyCheck } from "react-icons/lu";

// Register languages
hljs.registerLanguage("typescript", typescript);
hljs.registerLanguage("javascript", javascript);
hljs.registerLanguage("python", python);
hljs.registerLanguage("java", java);
hljs.registerLanguage("bash", bash);
hljs.registerLanguage("json", json);
hljs.registerLanguage("css", css);

// Consistent dark theme for all languages
const languageColors: { [key: string]: string } = {
  typescript: "bg-[#2d3748]",
  javascript: "bg-[#2d3748]",
  python: "bg-[#2d3748]",
  java: "bg-[#2d3748]",
  bash: "bg-[#2d3748]",
  json: "bg-[#2d3748]",
  css: "bg-[#2d3748]",
  html: "bg-[#2d3748]",
};

const HighlightCode = ({ content, language = "javascript" }: any) => {
  const [copied, setCopied] = useState(false);
  const [highlighted, setHighlighted] = useState("");

  useEffect(() => {
    try {
      const code = hljs.highlight(content, { language: language || "javascript", ignoreIllegals: true }).value;
      setHighlighted(code);
    } catch (error) {
      setHighlighted(content);
    }
  }, [content, language]);

  const handleCopy = () => {
    navigator.clipboard.writeText(content).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  const gradientColor = languageColors[language?.toLowerCase()] || "bg-[#2d3748]";

  return (
    <div className="w-full rounded-lg overflow-hidden border border-border shadow-sm bg-card">
      {/* Header - Smaller and consistent */}
      <div className={`${gradientColor} px-4 py-2 flex justify-between items-center`}>
        <div className="flex items-center gap-2">
          <span className="text-white font-medium text-xs uppercase tracking-wide">{language || "code"}</span>
        </div>
        <button
          onClick={handleCopy}
          title={copied ? "Copied!" : "Copy to clipboard"}
          className="relative flex items-center gap-1.5 px-2.5 py-1 bg-white/20 hover:bg-white/30 text-white rounded-md transition-all duration-200 text-xs font-medium group"
        >
          {copied ? (
            <>
              <LuCopyCheck className="w-3.5 h-3.5" />
              <span>Copied!</span>
            </>
          ) : (
            <>
              <LuCopy className="w-3.5 h-3.5" />
              <span>Copy</span>
            </>
          )}
        </button>
      </div>

      {/* Code Block */}
      <div className="overflow-x-auto bg-[#282c34]">
        <pre className="p-6 text-sm leading-relaxed">
          <code className="font-mono text-[#abb2bf]" dangerouslySetInnerHTML={{ __html: highlighted }} />
        </pre>
      </div>
    </div>
  );
};

export default HighlightCode;
