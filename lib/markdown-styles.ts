// lib/markdown-styles.ts

export const markdownStyles = {
  wrapper: 'prose dark:prose-invert prose-sm sm:prose-base lg:prose-lg xl:prose-xl max-w-none',
  h1: 'text-4xl font-bold mt-8 mb-4',
  h2: 'text-3xl font-semibold mt-6 mb-3',
  h3: 'text-2xl font-medium mt-4 mb-2',
  h4: 'text-xl font-medium mt-3 mb-1',
  p: 'mb-4',
  ul: 'list-disc list-inside mb-4',
  ol: 'list-decimal list-inside mb-4',
  li: 'mb-1',
  blockquote: 'border-l-4 border-muted pl-4 italic my-4',
  a: 'text-primary hover:underline',
  code: 'bg-muted rounded px-1 py-0.5',
  pre: 'bg-muted rounded p-4 mb-4 overflow-x-auto',
  footnoteRef: 'text-xs text-primary hover:underline ml-0.5',
  footnotes: 'text-sm mt-8',
  footnoteHr: 'my-4 border-t border-muted',
}