"use client";

import { useEffect, useState } from "react";
import hljs from "highlight.js/lib/core";
import typescript from "highlight.js/lib/languages/typescript";
import "highlight.js/styles/night-owl.css";
import { LuCopy, LuCopyCheck } from "react-icons/lu";

// Register the language
hljs.registerLanguage("typescript", typescript);

const HighlightCode = ({ content, language }: any) => {
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    hljs.highlightAll();
  }, []);

  const handleCopy = () => {
    navigator.clipboard.writeText(content).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000); // Reset the "copied" state after 2 seconds
    });
  };

  return (
    <div>
      <pre className="relative rounded-2xl my-4 overflow-hidden border">
        <div className="py-3 px-4 flex justify-between">
          <p>{language}</p>
          <button onClick={handleCopy} className="" title="Copy to clipboard">
            {copied ? <LuCopyCheck /> : <LuCopy />}
          </button>
        </div>
        <code className="overflow-auto">{content}</code>
      </pre>
    </div>
  );
};

export default HighlightCode;
