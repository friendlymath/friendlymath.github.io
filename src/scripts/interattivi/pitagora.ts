/** Teorema di Pitagora con JSXGraph: trascina i vertici, i quadrati sui lati si aggiornano. */
import JXG from 'jsxgraph';
import '../../../node_modules/jsxgraph/distrib/jsxgraph.css';

const it = (x: number, d: number) => x.toLocaleString(LOC(), { minimumFractionDigits: d, maximumFractionDigits: d });

import { linguaPagina } from '../../lib/lingua';
const T = (it: string, en: string) => (linguaPagina() === 'en' ? en : it);
const LOC = () => (linguaPagina() === 'en' ? 'en-GB' : 'it-IT');
export function monta(area: HTMLElement) {
  const id = `jxg-${Math.random().toString(36).slice(2, 8)}`;
  area.innerHTML = `<div id="${id}" class="jxgbox" style="width:100%;aspect-ratio:1/1;max-height:440px;border-radius:12px;border:0"></div>
    <p class="esito-pitagora" aria-live="polite" style="text-align:center;font-weight:800;margin:.6rem 0 0"></p>`;
  const css = getComputedStyle(document.documentElement);
  const col = (v: string) => css.getPropertyValue(v).trim() || '#888';
  const b = JXG.JSXGraph.initBoard(id, { boundingbox: [-7, 9, 9, -7], axis: false, showCopyright: false, showNavigation: false, keepaspectratio: true, pan: { enabled: false }, zoom: { enabled: false } } as any);
  const C = b.create('point', [0, 0], { name: 'C', fixed: true, size: 4, color: col('--testo') });
  const A = b.create('glider', [3, 0, b.create('line', [[0, 0], [1, 0]], { visible: false })], { name: 'A', size: 6, color: col('--gioco') });
  const B = b.create('glider', [0, 4, b.create('line', [[0, 0], [0, 1]], { visible: false })], { name: 'B', size: 6, color: col('--gioco') });
  b.create('polygon', [C, A, B], { fillColor: col('--sole'), fillOpacity: .5, borders: { strokeColor: col('--testo'), strokeWidth: 2 }, vertices: { visible: false } } as any);
  const quadrato = (P: any, Q: any, colore: string) => {
    // quadrato costruito sul segmento PQ, verso l'esterno del triangolo
    const R = b.create('point', [() => Q.X() - (Q.Y() - P.Y()) * segno(P, Q), () => Q.Y() + (Q.X() - P.X()) * segno(P, Q)], { visible: false });
    const S = b.create('point', [() => P.X() - (Q.Y() - P.Y()) * segno(P, Q), () => P.Y() + (Q.X() - P.X()) * segno(P, Q)], { visible: false });
    b.create('polygon', [P, Q, R, S], { fillColor: colore, fillOpacity: .35, borders: { strokeColor: colore }, vertices: { visible: false }, hasInnerPoints: false } as any);
  };
  // sceglie il verso esterno: il centro del triangolo deve stare dall'altra parte
  const segno = (P: any, Q: any) => {
    const gx = (A.X() + B.X() + C.X()) / 3, gy = (A.Y() + B.Y() + C.Y()) / 3;
    const cross = (Q.X() - P.X()) * (gy - P.Y()) - (Q.Y() - P.Y()) * (gx - P.X());
    return cross > 0 ? -1 : 1;
  };
  quadrato(C, A, col('--fiducia'));
  quadrato(B, C, col('--successo'));
  quadrato(A, B, col('--magia'));
  const esito = area.querySelector<HTMLElement>('.esito-pitagora')!;
  const aggiorna = () => {
    const a = Math.abs(A.X()), bb = Math.abs(B.Y());
    const c2 = a * a + bb * bb;
    esito.innerHTML = `<span style="color:${col('--fiducia')}">${it(a * a, 1)}</span> + <span style="color:${col('--successo')}">${it(bb * bb, 1)}</span> = <span style="color:${col('--magia')}">${it(c2, 1)}</span> &nbsp;·&nbsp; ${T('cateti', 'legs')} ${it(a, 1)} ${T('e', 'and')} ${it(bb, 1)}, ${T('ipotenusa', 'hypotenuse')} ${it(Math.sqrt(c2), 2)}`;
  };
  b.on('update', aggiorna);
  aggiorna();
}
