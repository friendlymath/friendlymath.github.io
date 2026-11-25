/** Barra delle percentuali: prezzo, sconto e quanto paghi. */
const eur = (x: number) => x.toLocaleString(LOC(), { style: 'currency', currency: 'EUR' });
import { linguaPagina } from '../../lib/lingua';
const T = (it: string, en: string) => (linguaPagina() === 'en' ? en : it);
const LOC = () => (linguaPagina() === 'en' ? 'en-GB' : 'it-IT');
export function monta(area: HTMLElement) {
  let prezzo = 80, p = 25;
  area.innerHTML = `<div class="sc">
    <label>${T('Prezzo', 'Price')} <b data-vp></b><input type="range" min="10" max="200" step="5" value="80" data-prezzo></label>
    <label>${T('Sconto', 'Discount')} <b data-vs></b><input type="range" min="0" max="90" step="5" value="25" data-sconto></label>
    <div class="barra-sc" aria-hidden="true"><div class="paghi" data-paghi></div><div class="risparmi" data-risp></div></div>
    <div class="centesimi" data-centesimi aria-hidden="true"></div>
    <p class="esito-sc" aria-live="polite" data-esito></p></div>`;
  const st = document.createElement('style');
  st.textContent = `.sc label{display:flex;gap:.6rem;align-items:center;font-weight:700}.sc input{flex:1}
  .barra-sc{display:flex;height:46px;border-radius:12px;overflow:hidden;border:3px solid var(--testo);margin:.8rem 0}
  .barra-sc div{transition:width .35s ease;display:flex;align-items:center;justify-content:center;color:#fff;font-weight:800;white-space:nowrap;overflow:hidden}
  .paghi{background:var(--fiducia)}.risparmi{background:var(--successo)}
  .centesimi{display:grid;grid-template-columns:repeat(20,1fr);gap:2px;max-width:420px;margin:.4rem auto}
  .centesimi i{aspect-ratio:1;border-radius:3px;background:var(--fiducia);transition:background .3s}.centesimi i.via{background:var(--successo)}
  .esito-sc{text-align:center;font-weight:800;font-size:1.1rem}`;
  area.appendChild(st);
  const c = area.querySelector<HTMLElement>('[data-centesimi]')!;
  c.innerHTML = '<i></i>'.repeat(100);
  const disegna = () => {
    const risp = (prezzo * p) / 100, paghi = prezzo - risp;
    area.querySelector('[data-vp]')!.textContent = eur(prezzo);
    area.querySelector('[data-vs]')!.textContent = `${p}%`;
    const pa = area.querySelector<HTMLElement>('[data-paghi]')!, ri = area.querySelector<HTMLElement>('[data-risp]')!;
    pa.style.width = `${100 - p}%`; ri.style.width = `${p}%`;
    pa.textContent = p < 90 ? `${T('paghi', 'you pay')} ${eur(paghi)}` : ''; ri.textContent = p > 12 ? `−${eur(risp)}` : '';
    c.querySelectorAll('i').forEach((q, i) => q.classList.toggle('via', i >= 100 - p));
    area.querySelector('[data-esito]')!.textContent = T(`${p}% di ${eur(prezzo)} = ${p}/100 × ${prezzo} = ${eur(risp)} di sconto → paghi ${eur(paghi)} (cioè × ${((100 - p) / 100).toLocaleString('it-IT')})`, `${p}% of ${eur(prezzo)} = ${p}/100 × ${prezzo} = ${eur(risp)} off → you pay ${eur(paghi)} (that is × ${((100 - p) / 100).toLocaleString('en-GB')})`);
  };
  area.querySelector<HTMLInputElement>('[data-prezzo]')!.addEventListener('input', (e) => { prezzo = Number((e.target as HTMLInputElement).value); disegna(); });
  area.querySelector<HTMLInputElement>('[data-sconto]')!.addEventListener('input', (e) => { p = Number((e.target as HTMLInputElement).value); disegna(); });
  disegna();
}
