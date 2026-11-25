/** Parabola y = ax² + bx + c: discriminante e intersezioni con l'asse x. */
const it = (x: number, d = 2) => x.toLocaleString(LOC(), { maximumFractionDigits: d });
import { linguaPagina } from '../../lib/lingua';
const T = (it: string, en: string) => (linguaPagina() === 'en' ? en : it);
const LOC = () => (linguaPagina() === 'en' ? 'en-GB' : 'it-IT');
export function monta(area: HTMLElement) {
  let a = 1, b = -5, c = 6;
  area.innerHTML = `<div class="par">
    <div class="cursori">
      <label>a = <b data-v="a"></b><input type="range" min="-3" max="3" step="0.5" value="1" data-k="a"></label>
      <label>b = <b data-v="b"></b><input type="range" min="-8" max="8" step="1" value="-5" data-k="b"></label>
      <label>c = <b data-v="c"></b><input type="range" min="-8" max="8" step="1" value="6" data-k="c"></label>
    </div>
    <svg viewBox="0 0 320 240" data-svg role="img" aria-label="${T('Grafico della parabola', 'Graph of the parabola')}"></svg>
    <p class="par-esito" aria-live="polite" data-esito></p></div>`;
  const st = document.createElement('style');
  st.textContent = `.par .cursori{display:grid;gap:.3rem}.par label{display:flex;gap:.6rem;align-items:center;font-weight:700}.par input{flex:1}.par svg{display:block;width:100%;max-width:420px;margin:.6rem auto;background:var(--superficie-2);border-radius:12px}.par-esito{text-align:center;font-weight:800}`;
  area.appendChild(st);
  const X = (x: number) => 160 + x * 20, Y = (y: number) => 120 - y * 20;
  const disegna = () => {
    if (a === 0) a = 0.5;
    const d = b * b - 4 * a * c;
    let pts = '';
    for (let x = -8; x <= 8; x += 0.1) { const y = a * x * x + b * x + c; if (Math.abs(y) < 20) pts += `${X(x).toFixed(1)},${Y(y).toFixed(1)} `; else pts += ' '; }
    const segmenti = pts.split('  ').filter((s) => s.trim().split(' ').length > 1).map((s) => `<polyline points="${s.trim()}" fill="none" stroke="var(--magia)" stroke-width="3"/>`).join('');
    let radici = '';
    const sol: number[] = [];
    if (d > 0) sol.push((-b - Math.sqrt(d)) / (2 * a), (-b + Math.sqrt(d)) / (2 * a)); else if (d === 0) sol.push(-b / (2 * a));
    for (const s of sol) radici += `<circle cx="${X(s)}" cy="${Y(0)}" r="6" fill="var(--gioco)" stroke="#fff" stroke-width="2"/>`;
    let griglia = '';
    for (let i = -8; i <= 8; i++) griglia += `<line x1="${X(i)}" y1="0" x2="${X(i)}" y2="240" stroke="var(--bordo)" stroke-width="1"/>`;
    for (let j = -6; j <= 6; j++) griglia += `<line x1="0" y1="${Y(j)}" x2="320" y2="${Y(j)}" stroke="var(--bordo)" stroke-width="1"/>`;
    area.querySelector('[data-svg]')!.innerHTML = `${griglia}<line x1="0" y1="${Y(0)}" x2="320" y2="${Y(0)}" stroke="var(--testo)" stroke-width="2"/><line x1="${X(0)}" y1="0" x2="${X(0)}" y2="240" stroke="var(--testo)" stroke-width="2"/>${segmenti}${radici}`;
    for (const k of ['a', 'b', 'c'] as const) area.querySelector(`[data-v="${k}"]`)!.textContent = it({ a, b, c }[k]);
    const quante = d > 0 ? T(`due soluzioni: x = ${it(sol[0])} e x = ${it(sol[1])}`, `two solutions: x = ${it(sol[0])} and x = ${it(sol[1])}`) : d === 0 ? T(`una soluzione: x = ${it(sol[0])}`, `one solution: x = ${it(sol[0])}`) : T('nessuna soluzione reale', 'no real solutions');
    area.querySelector('[data-esito]')!.textContent = `Δ = ${it(d)} → ${quante}`;
  };
  area.querySelectorAll<HTMLInputElement>('[data-k]').forEach((inp) => inp.addEventListener('input', () => {
    const v = Number(inp.value);
    if (inp.dataset.k === 'a') a = v || 0.5; else if (inp.dataset.k === 'b') b = v; else c = v;
    disegna();
  }));
  disegna();
}
