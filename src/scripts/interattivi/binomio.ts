/** Quadrato del binomio: (a+b)² = a² + 2ab + b² con quattro pezzi colorati. */
const it = (x: number) => x.toLocaleString(LOC());
import { linguaPagina } from '../../lib/lingua';
const T = (it: string, en: string) => (linguaPagina() === 'en' ? en : it);
const LOC = () => (linguaPagina() === 'en' ? 'en-GB' : 'it-IT');
export function monta(area: HTMLElement) {
  let a = 3, b = 2;
  area.innerHTML = `<div class="bin">
    <label>a = <b data-va>3</b> <input type="range" min="1" max="6" value="3" data-a></label>
    <label>b = <b data-vb>2</b> <input type="range" min="1" max="6" value="2" data-b></label>
    <svg viewBox="0 0 240 240" data-svg role="img" aria-label="${T('Quadrato di lato a più b diviso in quattro parti', 'Square with side a plus b split into four parts')}"></svg>
    <p class="bin-esito" aria-live="polite" data-esito></p></div>`;
  const st = document.createElement('style');
  st.textContent = `.bin label{display:flex;gap:.6rem;align-items:center;font-weight:700}.bin input{flex:1}.bin svg{display:block;width:100%;max-width:280px;margin:.6rem auto}.bin-esito{text-align:center;font-weight:800;font-size:1.1rem}`;
  area.appendChild(st);
  const disegna = () => {
    const L = 220, u = L / (a + b), A = a * u, B = b * u, o = 10;
    area.querySelector('[data-svg]')!.innerHTML = `
      <rect x="${o}" y="${o}" width="${A}" height="${A}" fill="var(--fiducia)" opacity=".75"/><text x="${o + A / 2}" y="${o + A / 2 + 6}" text-anchor="middle" fill="#fff" font-weight="900">a²</text>
      <rect x="${o + A}" y="${o}" width="${B}" height="${A}" fill="var(--gioco)" opacity=".75"/><text x="${o + A + B / 2}" y="${o + A / 2 + 6}" text-anchor="middle" fill="#fff" font-weight="900">ab</text>
      <rect x="${o}" y="${o + A}" width="${A}" height="${B}" fill="var(--gioco)" opacity=".75"/><text x="${o + A / 2}" y="${o + A + B / 2 + 6}" text-anchor="middle" fill="#fff" font-weight="900">ab</text>
      <rect x="${o + A}" y="${o + A}" width="${B}" height="${B}" fill="var(--successo)" opacity=".8"/><text x="${o + A + B / 2}" y="${o + A + B / 2 + 6}" text-anchor="middle" fill="#fff" font-weight="900">b²</text>
      <rect x="${o}" y="${o}" width="${L}" height="${L}" fill="none" stroke="var(--testo)" stroke-width="3"/>`;
    area.querySelector('[data-va]')!.textContent = String(a); area.querySelector('[data-vb]')!.textContent = String(b);
    area.querySelector('[data-esito]')!.textContent = `(${a} + ${b})² = ${it(a * a)} + 2·${a}·${b} + ${it(b * b)} = ${it((a + b) ** 2)}`;
  };
  area.querySelector<HTMLInputElement>('[data-a]')!.addEventListener('input', (e) => { a = Number((e.target as HTMLInputElement).value); disegna(); });
  area.querySelector<HTMLInputElement>('[data-b]')!.addEventListener('input', (e) => { b = Number((e.target as HTMLInputElement).value); disegna(); });
  disegna();
}
