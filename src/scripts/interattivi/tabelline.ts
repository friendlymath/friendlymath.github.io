/** Tavola pitagorica interattiva: evidenzia il rettangolo r × c. */
import { linguaPagina } from '../../lib/lingua';
const T = (it: string, en: string) => (linguaPagina() === 'en' ? en : it);
const LOC = () => (linguaPagina() === 'en' ? 'en-GB' : 'it-IT');
export function monta(area: HTMLElement) {
  const n = 10;
  area.innerHTML = `<div class="tp"><div class="griglia-tp" role="grid" aria-label="${T('Tavola pitagorica', 'Multiplication grid')}"></div><p class="tp-esito" aria-live="polite">${T('Tocca una casella', 'Tap a square')}</p></div>`;
  const st = document.createElement('style');
  st.textContent = `.tp .griglia-tp{display:grid;grid-template-columns:repeat(${n + 1},1fr);gap:2px;max-width:480px;margin:0 auto}
  .tp button{aspect-ratio:1;border:0;border-radius:6px;font:inherit;font-weight:800;font-size:clamp(.6rem,2.4vw,.95rem);background:var(--superficie-2);color:var(--testo);cursor:pointer;padding:0}
  .tp .int{background:var(--fiducia);color:#fff}.tp .in{background:var(--esempio-bg)}.tp .sel{background:var(--gioco);color:#fff}.tp .quad{outline:2px solid var(--magia);outline-offset:-2px}
  .tp-esito{text-align:center;font-size:1.3rem;font-weight:800;margin:.6rem 0 0}`;
  area.appendChild(st);
  const g = area.querySelector<HTMLElement>('.griglia-tp')!;
  const celle: HTMLButtonElement[][] = [];
  for (let r = 0; r <= n; r++) {
    celle[r] = [];
    for (let c = 0; c <= n; c++) {
      const b = document.createElement('button');
      b.type = 'button';
      if (r === 0 && c === 0) { b.textContent = '×'; b.className = 'int'; b.tabIndex = -1; }
      else if (r === 0 || c === 0) { b.textContent = String(r || c); b.className = 'int'; b.tabIndex = -1; }
      else { b.textContent = String(r * c); if (r === c) b.classList.add('quad'); b.setAttribute('aria-label', T(`${r} per ${c} uguale ${r * c}`, `${r} times ${c} equals ${r * c}`)); }
      g.appendChild(b); celle[r][c] = b;
      if (r && c) {
        const mostra = () => {
          for (let i = 1; i <= n; i++) for (let j = 1; j <= n; j++) celle[i][j].classList.toggle('in', i <= r && j <= c), celle[i][j].classList.remove('sel');
          b.classList.add('sel');
          area.querySelector('.tp-esito')!.textContent = T(`${r} × ${c} = ${r * c}  ·  ${r} righe da ${c} caselle`, `${r} × ${c} = ${r * c}  ·  ${r} rows of ${c} squares`);
        };
        b.addEventListener('mouseenter', mostra); b.addEventListener('focus', mostra); b.addEventListener('click', mostra);
      }
    }
  }
}
