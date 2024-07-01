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
  console.log(content);
  useEffect(() => {
    hljs.highlightAll();
  }, []);

  return (
    <div>
      <div
        dangerouslySetInnerHTML={{
          __html: content,
        }}
      />
    </div>
  );
};

export default HighlightCode;
