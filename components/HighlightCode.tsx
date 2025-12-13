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

// Language color mapping
const languageColors: { [key: string]: string } = {
  typescript: "from-blue-500 to-blue-600",
  javascript: "from-yellow-500 to-yellow-600",
  python: "from-blue-400 to-blue-500",
  java: "from-red-500 to-red-600",
  bash: "from-gray-600 to-gray-700",
  json: "from-green-500 to-green-600",
  css: "from-indigo-500 to-indigo-600",
  html: "from-orange-500 to-orange-600",
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

  const gradientColor = languageColors[language?.toLowerCase()] || "from-gray-600 to-gray-700";

  return (
    <div className="w-full rounded-xl overflow-hidden border border-border shadow-lg bg-card">
      {/* Header */}
      <div className={`bg-gradient-to-r ${gradientColor} px-6 py-4 flex justify-between items-center`}>
        <div className="flex items-center gap-3">
          <span className="text-white font-bold text-sm uppercase tracking-wider">{language || "code"}</span>
        </div>
        <button
          onClick={handleCopy}
          title={copied ? "Copied!" : "Copy to clipboard"}
          className="relative flex items-center gap-2 px-3 py-1.5 bg-white/20 hover:bg-white/30 text-white rounded-lg transition-all duration-200 text-sm font-medium group"
        >
          {copied ? (
            <>
              <LuCopyCheck className="w-4 h-4" />
              <span className="text-xs">Copied!</span>
            </>
          ) : (
            <>
              <LuCopy className="w-4 h-4" />
              <span className="text-xs">Copy</span>
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
