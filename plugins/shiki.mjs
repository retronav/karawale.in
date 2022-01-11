import { map } from 'unist-util-map';
import { select } from 'hast-util-select';
import { raw } from 'hast-util-raw';
import { toText } from 'hast-util-to-text';
// import { unified } from 'unified';
// import rehypeParse from 'rehype-parse';

// const hastParser = unified().use(rehypeParse, { fragment: true });

export default function shiki({ highlighter }) {
  return (tree) =>
    map(tree, (node) => {
      if (node.type === 'raw') {
        const pre = select('pre', raw(node));
        if (pre && pre.tagName === 'pre') {
          let lang = pre?.properties?.className
            .find((c) => c.startsWith('language-'))
            ?.split('-')[1];
          if (!!lang) {
            // Support plaintext
            if (lang === 'null') lang = 'plaintext';
            const code = toText(pre, { whitespace: 'pre' });
            const highlightedCode = highlighter.codeToHtml(code, { lang });
            const newNode = raw({ type: 'raw', value: highlightedCode });
            return newNode;
          }
        }
      }
      return node;
    });
}
