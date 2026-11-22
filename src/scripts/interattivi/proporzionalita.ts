/** Proporzionalità diretta (y = kx) e inversa (y = k/x) a confronto, con il punto che si muove. */
const it = (x: number) => x.toLocaleString('it-IT', { maximumFractionDigits: 2 });
export function monta(area: HTMLElement) {
  let x = 4, tipo: 'diretta' | 'inversa' = 'diretta';
  area.innerHTML = `<div class="pr">
    <div class="scelta-pr" role="group"><button type="button" class="btn" data-t="diretta">Diretta: farina e biscotti</button><button type="button" class="btn vuoto" data-t="inversa">Inversa: operai e giorni</button></div>
    <label><span data-lx></span> = <b data-vx></b><input type="range" min="1" max="12" step="1" value="4" data-x></label>
    <svg viewBox="0 0 320 230" data-svg role="img" aria-label="Grafico di proporzionalità"></svg>
    <p class="esito-pr" aria-live="polite" data-esito></p></div>`;
  const st = document.createElement('style');
  st.textContent = `.scelta-pr{display:flex;flex-wrap:wrap;gap:.4rem;margin-bottom:.6rem}.pr label{display:flex;gap:.6rem;align-items:center;font-weight:700}.pr input{flex:1}.pr svg{width:100%;max-width:420px;display:block;margin:.5rem auto;background:var(--superficie-2);border-radius:12px}.esito-pr{text-align:center;font-weight:800}`;
  area.appendChild(st);
  const X = (v: number) => 30 + v * 22, Y = (v: number) => 205 - v * 6.5;
  const disegna = () => {
    const f = tipo === 'diretta' ? (v: number) => 2.5 * v : (v: number) => 24 / v;
    let pts = '';
    for (let v = tipo === 'diretta' ? 0 : 0.8; v <= 12.01; v += 0.1) pts += `${X(v).toFixed(1)},${Y(Math.min(f(v), 31)).toFixed(1)} `;
    const y = f(x);
    area.querySelector('[data-svg]')!.innerHTML = `
      <line x1="30" y1="205" x2="300" y2="205" stroke="var(--testo)" stroke-width="2"/><line x1="30" y1="205" x2="30" y2="5" stroke="var(--testo)" stroke-width="2"/>
      <polyline points="${pts}" fill="none" stroke="${tipo === 'diretta' ? 'var(--fiducia)' : 'var(--gioco)'}" stroke-width="3.5"/>
      <rect x="30" y="${Y(y)}" width="${X(x) - 30}" height="${205 - Y(y)}" fill="${tipo === 'inversa' ? 'var(--gioco)' : 'none'}" opacity=".18"/>
      <line x1="${X(x)}" y1="205" x2="${X(x)}" y2="${Y(y)}" stroke="var(--testo-tenue)" stroke-dasharray="4 4"/>
      <line x1="30" y1="${Y(y)}" x2="${X(x)}" y2="${Y(y)}" stroke="var(--testo-tenue)" stroke-dasharray="4 4"/>
      <circle cx="${X(x)}" cy="${Y(y)}" r="8" fill="var(--sole)" stroke="var(--testo)" stroke-width="2"/>`;
    area.querySelector('[data-lx]')!.textContent = tipo === 'diretta' ? 'Etti di farina' : 'Operai';
    area.querySelector('[data-vx]')!.textContent = String(x);
    area.querySelector('[data-esito]')!.textContent = tipo === 'diretta'
      ? `${x} etti → ${it(y)} biscotti. Il rapporto biscotti/farina resta sempre ${it(y / x)}: è una retta che passa per l'origine.`
      : `${x} operai → ${it(y)} giorni. Il prodotto operai × giorni resta sempre ${it(x * y)} (l'area del rettangolo): è un'iperbole.`;
  };
  area.querySelectorAll<HTMLButtonElement>('[data-t]').forEach((b) => b.addEventListener('click', () => {
    tipo = b.dataset.t as typeof tipo;
    area.querySelectorAll<HTMLButtonElement>('[data-t]').forEach((x) => x.classList.toggle('vuoto', x !== b));
    disegna();
  }));
  area.querySelector<HTMLInputElement>('[data-x]')!.addEventListener('input', (e) => { x = Number((e.target as HTMLInputElement).value); disegna(); });
  disegna();
}
