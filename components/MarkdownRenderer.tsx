
import React, { useMemo } from 'react';

interface MarkdownRendererProps {
  content: string;
}

// A simple and safe markdown to HTML converter
const parseMarkdown = (text: string) => {
  let html = text
    // Escape HTML to prevent XSS
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');

  // Bold (**text** or __text__)
  html = html.replace(/\*\*(.*?)\*\*|__(.*?)__/g, '<strong>$1$2</strong>');
  
  // Italic (*text* or _text_)
  html = html.replace(/\*(.*?)\*|_(.*?)_/g, '<em>$1$2</em>');

  // Strikethrough (~~text~~)
  html = html.replace(/~~(.*?)~~/g, '<del>$1</del>');

  // Code blocks (```...```)
  html = html.replace(/```(\w*)\n([\s\S]*?)\n```/g, (match, lang, code) => {
    return `<pre class="bg-gemini-dark p-3 rounded-md my-2 overflow-x-auto"><code class="language-${lang}">${code}</code></pre>`;
  });

  // Inline code (`text`)
  html = html.replace(/`(.*?)`/g, '<code class="bg-gemini-dark rounded px-1 py-0.5 text-sm">$1</code>');
  
  // Unordered lists (*, -, +)
  html = html.replace(/^\s*([*+-])\s+(.*)/gm, '<ul><li>$2</li></ul>');
  html = html.replace(/<\/ul>\n<ul>/g, ''); // Merge consecutive lists

  // Ordered lists (1., 2.)
  html = html.replace(/^\s*(\d+)\.\s+(.*)/gm, '<ol><li>$2</li></ol>');
  html = html.replace(/<\/ol>\n<ol>/g, ''); // Merge consecutive lists

  // Newlines
  html = html.replace(/\n/g, '<br />');

  return html;
};

const MarkdownRenderer: React.FC<MarkdownRendererProps> = ({ content }) => {
  const processedContent = useMemo(() => parseMarkdown(content), [content]);

  return (
    <div
      className="prose prose-invert max-w-none"
      dangerouslySetInnerHTML={{ __html: processedContent }}
    />
  );
};

export default MarkdownRenderer;
