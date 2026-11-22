/** Lancia due dadi tante volte: l'istogramma delle somme si avvicina alla teoria (il 7 vince). */
export function monta(area: HTMLElement) {
  const conta = Array(13).fill(0);
  let lanci = 0;
  const teorici = [0, 0, 1, 2, 3, 4, 5, 6, 5, 4, 3, 2, 1];
  area.innerHTML = `<div class="da"><div class="comandi-da">
    <button type="button" class="btn" data-n="1">🎲 Lancia</button><button type="button" class="btn" data-n="100">×100</button><button type="button" class="btn gioco" data-n="1000">×1000</button><button type="button" class="btn vuoto" data-reset>↺</button></div>
    <p class="ultimo" data-ultimo aria-live="polite"></p>
    <svg viewBox="0 0 440 220" data-svg role="img" aria-label="Istogramma delle somme dei due dadi"></svg>
    <p class="tenue legenda-da">Barre: frequenza osservata · Linea tratteggiata: probabilità teorica (6 modi su 36 per il 7)</p></div>`;
  const st = document.createElement('style');
  st.textContent = `.comandi-da{display:flex;flex-wrap:wrap;gap:.4rem}.da svg{width:100%;display:block;background:var(--superficie-2);border-radius:12px;margin:.5rem 0}.ultimo{font-weight:800;min-height:1.5em;font-size:1.2rem}.legenda-da{font-size:.85rem}`;
  area.appendChild(st);
  const facce = ['', '⚀', '⚁', '⚂', '⚃', '⚄', '⚅'];
  const disegna = (a?: number, b?: number) => {
    const max = Math.max(1 / 6, ...conta.map((c) => (lanci ? c / lanci : 0)));
    let s = '';
    for (let k = 2; k <= 12; k++) {
      const x = 20 + (k - 2) * 37, f = lanci ? conta[k] / lanci : 0, h = (f / max) * 170;
      s += `<rect x="${x}" y="${195 - h}" width="28" height="${h}" rx="4" fill="${k === 7 ? 'var(--gioco)' : 'var(--fiducia)'}"/><text x="${x + 14}" y="212" text-anchor="middle" font-size="12" font-weight="800" fill="var(--testo)">${k}</text>`;
      const ht = (teorici[k] / 36 / max) * 170;
      s += `<line x1="${x - 2}" x2="${x + 30}" y1="${195 - ht}" y2="${195 - ht}" stroke="var(--testo)" stroke-width="2" stroke-dasharray="4 3"/>`;
    }
    area.querySelector('[data-svg]')!.innerHTML = s;
    area.querySelector('[data-ultimo]')!.textContent = a ? `${facce[a]} ${facce[b!]}  → ${a + b!}  · lanci: ${lanci.toLocaleString('it-IT')} · il 7 è uscito il ${lanci ? ((conta[7] / lanci) * 100).toFixed(1).replace('.', ',') : 0}% delle volte (teoria: 16,7%)` : 'Premi «Lancia»';
  };
  area.querySelectorAll<HTMLButtonElement>('[data-n]').forEach((btn) => btn.addEventListener('click', () => {
    let a = 1, b = 1;
    for (let i = 0; i < Number(btn.dataset.n); i++) { a = 1 + Math.floor(Math.random() * 6); b = 1 + Math.floor(Math.random() * 6); conta[a + b]++; lanci++; }
    disegna(a, b);
  }));
  area.querySelector('[data-reset]')!.addEventListener('click', () => { conta.fill(0); lanci = 0; disegna(); });
  disegna();
}
