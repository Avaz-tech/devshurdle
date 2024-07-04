"use client";

import { useEffect } from "react";
// import Highlight.js and the languages you need
import hljs from "highlight.js/lib/core";
import typescript from "highlight.js/lib/languages/typescript";
// Import a theme from the package
import "highlight.js/styles/night-owl.css";

//register the language
hljs.registerLanguage("typescript", typescript);

const HighlightCode = ({ content }: any) => {
  useEffect(() => {
    hljs.highlightAll();
  }, []);

  return (
    <pre className="rounded-md my-4 overflow-hidden">
      <code className="rounded-md overflow-auto">{content}</code>
    </pre>
  );
};

export default HighlightCode;
