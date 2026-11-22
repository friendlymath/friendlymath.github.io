/** Abaco a mattoncini: unità, decine, centinaia con riporto automatico. */
export function monta(area: HTMLElement) {
  let n = 23;
  area.innerHTML = `
    <div class="abaco">
      <div class="colonne">
        <div class="col" data-col="h"><p class="tit">Centinaia</p><div class="pezzi"></div><p class="cifra"></p></div>
        <div class="col" data-col="da"><p class="tit">Decine</p><div class="pezzi"></div><p class="cifra"></p></div>
        <div class="col" data-col="u"><p class="tit">Unità</p><div class="pezzi"></div><p class="cifra"></p></div>
      </div>
      <p class="totale" aria-live="polite"></p>
      <div class="comandi">
        <button type="button" class="btn" data-d="1">+1</button>
        <button type="button" class="btn" data-d="10">+10</button>
        <button type="button" class="btn" data-d="100">+100</button>
        <button type="button" class="btn vuoto" data-d="-1">−1</button>
        <button type="button" class="btn vuoto" data-zero>Azzera</button>
      </div>
    </div>`;
  const stile = document.createElement('style');
  stile.textContent = `
    .abaco .colonne{display:grid;grid-template-columns:repeat(3,1fr);gap:.5rem}
    .abaco .col{background:var(--superficie-2);border-radius:12px;padding:.5rem;text-align:center;min-width:0}
    .abaco .tit{margin:0;font-weight:800;font-size:.85rem}
    .abaco .pezzi{display:flex;flex-wrap:wrap;gap:3px;justify-content:center;align-content:flex-end;min-height:96px;padding:.3rem 0}
    .abaco .cifra{margin:0;font-size:2rem;font-weight:800;font-family:var(--font-titoli)}
    .abaco .u .p{width:14px;height:14px;background:var(--gioco);border-radius:3px}
    .abaco [data-col=u] .p{width:14px;height:14px;background:var(--gioco);border-radius:3px}
    .abaco [data-col=da] .p{width:10px;height:56px;background:var(--fiducia);border-radius:3px}
    .abaco [data-col=h] .p{width:40px;height:40px;background:var(--magia);border-radius:4px}
    .abaco .totale{text-align:center;font-size:1.15rem;margin:.6rem 0}
    .abaco .comandi{display:flex;flex-wrap:wrap;gap:.4rem;justify-content:center}
    .abaco .p{animation:entra .25s ease-out}
    @keyframes entra{from{transform:scale(.3);opacity:0}to{transform:none;opacity:1}}`;
  area.appendChild(stile);

  const disegna = () => {
    const h = Math.floor(n / 100) % 10, da = Math.floor(n / 10) % 10, u = n % 10;
    const valori: Record<string, number> = { h, da, u };
    for (const col of area.querySelectorAll<HTMLElement>('[data-col]')) {
      const k = col.dataset.col!;
      col.querySelector('.pezzi')!.innerHTML = '<span class="p"></span>'.repeat(valori[k]);
      col.querySelector('.cifra')!.textContent = String(valori[k]);
    }
    area.querySelector('.totale')!.innerHTML = `<b>${n}</b> = ${h} × 100 + ${da} × 10 + ${u} × 1`;
  };
  area.querySelectorAll<HTMLButtonElement>('[data-d]').forEach((b) =>
    b.addEventListener('click', () => { n = Math.min(999, Math.max(0, n + Number(b.dataset.d))); disegna(); }));
  area.querySelector('[data-zero]')!.addEventListener('click', () => { n = 0; disegna(); });
  disegna();
}
