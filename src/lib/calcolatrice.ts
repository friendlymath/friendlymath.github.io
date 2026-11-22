/** Calcolatrice sicura: interpreta solo numeri, + − × ÷ ^ e parentesi (niente eval). */
export function calcola(testo: string): number | null {
  const s = testo.replace(/\s+/g, '').replace(/,/g, '.').replace(/[×x*]/g, '*').replace(/[÷:/]/g, '/').replace(/[−–]/g, '-');
  if (!s || /[^0-9.+\-*/^()]/.test(s)) return null;
  let i = 0;
  const leggiNumero = (): number | null => {
    const m = /^\d+(\.\d+)?|^\.\d+/.exec(s.slice(i));
    if (!m) return null;
    i += m[0].length;
    return Number(m[0]);
  };
  // grammatica: somma := prodotto (('+'|'-') prodotto)* ; prodotto := potenza (('*'|'/') potenza)* ;
  // unario := '-' unario | potenza ; potenza := primario ('^' unario)? ; primario := numero | '(' somma ')'
  // (così -3^2 = -(3^2) = -9, come nella notazione matematica)
  const somma = (): number | null => {
    let v = prodotto(); if (v === null) return null;
    while (s[i] === '+' || s[i] === '-') { const op = s[i++]; const w = prodotto(); if (w === null) return null; v = op === '+' ? v + w : v - w; }
    return v;
  };
  const prodotto = (): number | null => {
    let v = unario(); if (v === null) return null;
    while (s[i] === '*' || s[i] === '/') { const op = s[i++]; const w = unario(); if (w === null) return null; if (op === '/' && w === 0) return null; v = op === '*' ? v * w : v / w; }
    return v;
  };
  const potenza = (): number | null => {
    const b = primario(); if (b === null) return null;
    if (s[i] === '^') { i++; const e = unario(); if (e === null) return null; return b ** e; }
    return b;
  };
  const unario = (): number | null => {
    if (s[i] === '-') { i++; const v = unario(); return v === null ? null : -v; }
    if (s[i] === '+') { i++; return unario(); }
    return potenza();
  };
  const primario = (): number | null => {
    if (s[i] === '(') { i++; const v = somma(); if (v === null || s[i] !== ')') return null; i++; return v; }
    return leggiNumero();
  };
  const v = somma();
  if (v === null || i !== s.length || !Number.isFinite(v)) return null;
  return Math.round(v * 1e10) / 1e10;
}
