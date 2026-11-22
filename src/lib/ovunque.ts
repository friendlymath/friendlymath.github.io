/** Piccoli algoritmi della matematica di tutti i giorni (usati dagli interattivi e testati). */

/** Algoritmo di Luhn: la cifra di controllo dei numeri delle carte di pagamento. */
export function luhnValido(numero: string): boolean {
  const cifre = numero.replace(/\s|-/g, '');
  if (!/^\d{2,19}$/.test(cifre)) return false;
  let somma = 0;
  for (let i = 0; i < cifre.length; i++) {
    let d = Number(cifre[cifre.length - 1 - i]);
    if (i % 2 === 1) { d *= 2; if (d > 9) d -= 9; }
    somma += d;
  }
  return somma % 10 === 0;
}

/** Passaggi dell'algoritmo, per mostrarli: ogni cifra (da destra), raddoppiata o no, e il valore contato. */
export function luhnPassaggi(numero: string): { cifra: number; raddoppia: boolean; vale: number }[] {
  const cifre = numero.replace(/\D/g, '');
  return [...cifre].reverse().map((c, i) => {
    const d = Number(c);
    const raddoppia = i % 2 === 1;
    const v = raddoppia ? (d * 2 > 9 ? d * 2 - 9 : d * 2) : d;
    return { cifra: d, raddoppia, vale: v };
  }).reverse();
}

export type Grafo = Record<string, Record<string, number>>;

/** Algoritmo di Dijkstra: il percorso più breve (in minuti) su una rete di fermate. */
export function percorsoMinimo(g: Grafo, da: string, a: string): { percorso: string[]; minuti: number } | null {
  const dist: Record<string, number> = {}, prec: Record<string, string | null> = {};
  const daVisitare = new Set(Object.keys(g));
  for (const n of daVisitare) { dist[n] = Infinity; prec[n] = null; }
  if (!(da in g) || !(a in g)) return null;
  dist[da] = 0;
  while (daVisitare.size) {
    let u: string | null = null;
    for (const n of daVisitare) if (u === null || dist[n] < dist[u]) u = n;
    if (u === null || dist[u] === Infinity) break;
    daVisitare.delete(u);
    if (u === a) break;
    for (const [v, w] of Object.entries(g[u])) {
      if (dist[u] + w < dist[v]) { dist[v] = dist[u] + w; prec[v] = u; }
    }
  }
  if (dist[a] === Infinity) return null;
  const percorso: string[] = [];
  for (let n: string | null = a; n; n = prec[n]) percorso.unshift(n);
  return { percorso, minuti: dist[a] };
}

export const mcd = (a: number, b: number): number => (b === 0 ? Math.abs(a) : mcd(b, a % b));
export const mcm = (a: number, b: number) => (a / mcd(a, b)) * b;
