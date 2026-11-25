/** La bilancia delle equazioni: 3x + 2 = 11. Togli lo stesso peso da entrambi i piatti. */
import { linguaPagina } from '../../lib/lingua';
const T = (it: string, en: string) => (linguaPagina() === 'en' ? en : it);
const LOC = () => (linguaPagina() === 'en' ? 'en-GB' : 'it-IT');
export function monta(area: HTMLElement) {
  type Stato = { xs: number; uL: number; uR: number; div: number };
  const inizio: Stato = { xs: 3, uL: 2, uR: 11, div: 1 };
  let s: Stato = { ...inizio };
  area.innerHTML = `
    <div class="bil">
      <svg viewBox="0 0 400 200" role="img" aria-label="${T('Bilancia in equilibrio', 'Balanced scales')}" data-svg></svg>
      <p class="eq" aria-live="polite" data-eq></p>
      <div class="comandi">
        <button type="button" class="btn" data-a="togli1">${T('Togli 1 da entrambi i piatti', 'Take 1 from both pans')}</button>
        <button type="button" class="btn" data-a="dividi">${T('Dividi entrambi per il numero di x', 'Divide both by the number of x’s')}</button>
        <button type="button" class="btn vuoto" data-a="reset">${T('Ricomincia', 'Start again')}</button>
      </div>
      <p class="tenue msg" data-msg></p>
    </div>`;
  const st = document.createElement('style');
  st.textContent = `.bil svg{width:100%;max-height:220px}.bil .eq{text-align:center;font-size:1.5rem;font-weight:800;margin:.3rem 0}.bil .comandi{display:flex;flex-wrap:wrap;gap:.4rem;justify-content:center}.bil .msg{text-align:center;min-height:1.5em}`;
  area.appendChild(st);
  const svg = area.querySelector<SVGElement>('[data-svg]')!;
  const pezzi = (x0: number, xs: number, u: number) => {
    let out = '', i = 0;
    const tot = xs + u;
    const per = Math.min(6, Math.max(1, tot));
    const pos = (k: number) => ({ x: x0 + (k % per) * 22 - (per * 22) / 2 + 11, y: 92 - Math.floor(k / per) * 22 });
    for (let k = 0; k < xs; k++, i++) { const p = pos(i); out += `<rect x="${p.x - 10}" y="${p.y - 20}" width="20" height="20" rx="4" fill="var(--magia)"/><text x="${p.x}" y="${p.y - 5}" text-anchor="middle" font-size="13" font-weight="800" fill="#fff">x</text>`; }
    for (let k = 0; k < u; k++, i++) { const p = pos(i); out += `<circle cx="${p.x}" cy="${p.y - 10}" r="9" fill="var(--gioco)"/>`; }
    return out;
  };
  const disegna = (msg = '') => {
    svg.innerHTML = `
      <polygon points="200,190 180,150 220,150" fill="var(--testo-tenue)"/>
      <rect x="196" y="40" width="8" height="112" fill="var(--testo-tenue)"/>
      <rect x="40" y="96" width="320" height="8" rx="4" fill="var(--testo)"/>
      <rect x="40" y="100" width="130" height="10" rx="5" fill="var(--fiducia)"/>
      <rect x="230" y="100" width="130" height="10" rx="5" fill="var(--fiducia)"/>
      ${pezzi(105, s.xs, s.uL)}${pezzi(295, 0, s.uR)}`;
    const sx = `${s.xs > 1 ? s.xs : ''}x${s.uL ? ` + ${s.uL}` : ''}`;
    area.querySelector('[data-eq]')!.textContent = `${sx} = ${s.uR}`;
    area.querySelector('[data-msg]')!.textContent = msg;
  };
  area.querySelectorAll<HTMLButtonElement>('[data-a]').forEach((b) => b.addEventListener('click', () => {
    const a = b.dataset.a;
    if (a === 'reset') { s = { ...inizio }; return disegna(); }
    if (a === 'togli1') {
      if (s.uL === 0) return disegna(T('A sinistra ci sono solo x: ora conviene dividere!', 'Only x’s are left on the left: now it’s time to divide!'));
      s.uL--; s.uR--; return disegna(s.uL === 0 ? T('Ottimo: a sinistra restano solo le x.', 'Great: only the x’s are left on the left.') : T('La bilancia resta in equilibrio: hai tolto lo stesso peso da entrambe le parti.', 'The scales stay balanced: you took the same weight from both sides.'));
    }
    if (a === 'dividi') {
      if (s.uL > 0) return disegna(T('Prima togli le palline da sinistra, altrimenti dividi anche loro e ti complichi la vita.', 'First remove the balls from the left, or you’ll divide them too and make life hard for yourself.'));
      if (s.xs === 1) return disegna(T('Hai già trovato x!', 'You’ve already found x!'));
      if (s.uR % s.xs !== 0) return disegna(T('Non si divide in parti intere: controlla i passaggi.', 'It doesn’t divide into whole parts: check your steps.'));
      s.uR = s.uR / s.xs; s.xs = 1; return disegna(`🎉 x = ${s.uR}. ${T('Verifica', 'Check')}: 3 × ${s.uR} + 2 = ${3 * s.uR + 2}.`);
    }
  }));
  disegna();
}
