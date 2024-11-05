import React, { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism";
import remarkGfm from "remark-gfm";
import { markdownStyles } from "@/lib/markdown-styles";

export function StreamingMarkdown({ content }: { content: string }) {
  const [parsed, setParsed] = useState("");

  const renderMessageContent = (content: string) => {
    return content.replace(/【.*?】/g, '')
  }

  useEffect(() => {
    let isMounted = true;
    const parseChunk = async () => {
      if (isMounted) {
        setParsed(renderMessageContent(content));
      }
    };
    parseChunk();
    return () => {
      isMounted = false;
    };
  }, [content]);

  return (
    <div className={markdownStyles.wrapper}>
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          h1: ({ node, ...props }) => (
            <h1 className={markdownStyles.h1} {...props} />
          ),
          h2: ({ node, ...props }) => (
            <h2 className={markdownStyles.h2} {...props} />
          ),
          h3: ({ node, ...props }) => (
            <h3 className={markdownStyles.h3} {...props} />
          ),
          h4: ({ node, ...props }) => (
            <h4 className={markdownStyles.h4} {...props} />
          ),
          p: ({ node, ...props }) => (
            <p className={markdownStyles.p} {...props} />
          ),
          ul: ({ node, ...props }) => (
            <ul className={markdownStyles.ul} {...props} />
          ),
          ol: ({ node, ...props }) => (
            <ol className={markdownStyles.ol} {...props} />
          ),
          li: ({ node, ...props }) => (
            <li className={markdownStyles.li} {...props} />
          ),
          blockquote: ({ node, ...props }) => (
            <blockquote className={markdownStyles.blockquote} {...props} />
          ),
          a: ({ node, ...props }) => (
            <a className={markdownStyles.a} {...props} />
          ),
          code: ({ node, className, children, ...props }) => {
            const match = /language-(\w+)/.exec(className || "");
            return match ? (
              <SyntaxHighlighter
                style={vscDarkPlus}
                language={match[1]}
                PreTag="div"
                className={markdownStyles.pre}
              >
                {String(children).replace(/\n$/, "")}
              </SyntaxHighlighter>
            ) : (
              <code className={markdownStyles.code} {...props}>
                {children}
              </code>
            );
          },
        }}
      >
        {parsed}
      </ReactMarkdown>
    </div>
  );
}