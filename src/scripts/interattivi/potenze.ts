import { movimentoRidotto } from '../../lib/studio';
/** Crescita esplosiva: 2ⁿ contro 2·n, con le colonne che crescono. */
import { linguaPagina } from '../../lib/lingua';
const T = (it: string, en: string) => (linguaPagina() === 'en' ? en : it);
const LOC = () => (linguaPagina() === 'en' ? 'en-GB' : 'it-IT');
export function monta(area: HTMLElement) {
  let n = 5;
  area.innerHTML = `<div class="pw">
    <label>n = <b data-vn></b><input type="range" min="1" max="20" value="5" data-n></label>
    <div class="colonne-pw" data-col aria-hidden="true"></div>
    <p class="esito-pw" aria-live="polite" data-esito></p>
    <button type="button" class="btn vuoto" data-anima>▶ ${T('Guarda crescere da 1 a 20', 'Watch it grow from 1 to 20')}</button></div>`;
  const st = document.createElement('style');
  st.textContent = `.pw label{display:flex;gap:.6rem;align-items:center;font-weight:700}.pw input{flex:1}
  .colonne-pw{display:flex;align-items:flex-end;gap:3px;height:220px;padding:.5rem;background:var(--superficie-2);border-radius:12px;margin:.6rem 0}
  .colonne-pw div{flex:1;border-radius:4px 4px 0 0;background:var(--magia);transition:height .3s ease;min-height:2px;position:relative}
  .colonne-pw div.lin{background:var(--gioco)}
  .esito-pw{font-weight:800;text-align:center}`;
  area.appendChild(st);
  const disegna = () => {
    const max = 2 ** n;
    area.querySelector('[data-vn]')!.textContent = String(n);
    area.querySelector('[data-col]')!.innerHTML = Array.from({ length: n }, (_, i) =>
      `<div class="lin" style="height:${Math.max(1, (2 * (i + 1) / max) * 100)}%" title="2·${i + 1}"></div><div style="height:${(2 ** (i + 1) / max) * 100}%" title="2^${i + 1}"></div>`).join('');
    area.querySelector('[data-esito]')!.innerHTML = `<span style="color:var(--gioco)">2 · ${n} = ${(2 * n).toLocaleString(LOC())}</span> &nbsp;${T('contro', 'versus')}&nbsp; <span style="color:var(--magia)">2<sup>${n}</sup> = ${(2 ** n).toLocaleString(LOC())}</span>`;
  };
  const inp = area.querySelector<HTMLInputElement>('[data-n]')!;
  inp.addEventListener('input', () => { n = Number(inp.value); disegna(); });
  area.querySelector('[data-anima]')!.addEventListener('click', () => {
    n = 1; let t = setInterval(() => { inp.value = String(n); disegna(); if (++n > 20) clearInterval(t); }, movimentoRidotto() ? 0 : 280);
  });
  disegna();
}
