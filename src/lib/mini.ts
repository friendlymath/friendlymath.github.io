import katex from 'katex';

const escape = (s: string) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

/** Mini-markdown per testi brevi del frontmatter: $formula$ con KaTeX e **grassetto**. Tutto il resto è testo. */
export function mini(testo: string): string {
  return testo
    .split(/(\$[^$]+\$)/g)
    .map((pezzo) => (pezzo.startsWith('$') && pezzo.endsWith('$') && pezzo.length > 2
      ? katex.renderToString(pezzo.slice(1, -1), { throwOnError: false })
      : escape(pezzo).replace(/\*\*([^*]+)\*\*/g, '<b>$1</b>')))
    .join('');
}
