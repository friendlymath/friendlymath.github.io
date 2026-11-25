import { movimentoRidotto } from '../../lib/studio';
/** Serie di Fourier: un'onda quadra costruita sommando sinusoidi, con gli epicicli che girano. */
import { linguaPagina } from '../../lib/lingua';
const T = (it: string, en: string) => (linguaPagina() === 'en' ? en : it);
const LOC = () => (linguaPagina() === 'en' ? 'en-GB' : 'it-IT');
export function monta(area: HTMLElement) {
  let N = 3, t = 0, anim = 0;
  area.innerHTML = `<div class="fo"><label>${T('Onde sommate', 'Waves added')}: <b data-vn>3</b><input type="range" min="1" max="25" value="3" data-n></label>
    <canvas width="760" height="300" aria-label="${T("Cerchi rotanti che disegnano un'onda quadra", 'Rotating circles drawing a square wave')}"></canvas>
    <p class="tenue" data-esito></p></div>`;
  const st = document.createElement('style');
  st.textContent = `.fo label{display:flex;gap:.6rem;align-items:center;font-weight:700}.fo input{flex:1}.fo canvas{width:100%;height:auto;display:block;background:#141826;border-radius:14px;margin:.6rem 0}`;
  area.appendChild(st);
  const cv = area.querySelector('canvas')!, ctx = cv.getContext('2d')!;
  const scia: number[] = [];
  const disegna = () => {
    ctx.fillStyle = '#141826'; ctx.fillRect(0, 0, cv.width, cv.height);
    let x = 170, y = 150;
    for (let i = 0; i < N; i++) {
      const k = 2 * i + 1, R = 80 * (4 / (k * Math.PI));
      const px = x, py = y;
      x += R * Math.cos(k * t); y += R * Math.sin(k * t);
      ctx.strokeStyle = 'rgba(143,180,255,.35)'; ctx.lineWidth = 1.5;
      ctx.beginPath(); ctx.arc(px, py, R, 0, Math.PI * 2); ctx.stroke();
      ctx.strokeStyle = '#ffd66b'; ctx.lineWidth = 2;
      ctx.beginPath(); ctx.moveTo(px, py); ctx.lineTo(x, y); ctx.stroke();
    }
    scia.unshift(y); if (scia.length > 380) scia.pop();
    ctx.strokeStyle = 'rgba(255,255,255,.25)'; ctx.setLineDash([4, 4]);
    ctx.beginPath(); ctx.moveTo(x, y); ctx.lineTo(360, scia[0]); ctx.stroke(); ctx.setLineDash([]);
    ctx.strokeStyle = '#ffa266'; ctx.lineWidth = 3; ctx.beginPath();
    scia.forEach((v, i) => (i ? ctx.lineTo(360 + i, v) : ctx.moveTo(360, v))); ctx.stroke();
    ctx.fillStyle = '#ffd66b'; ctx.beginPath(); ctx.arc(x, y, 5, 0, Math.PI * 2); ctx.fill();
  };
  const ciclo = () => { t += 0.025; disegna(); anim = requestAnimationFrame(ciclo); };
  const inp = area.querySelector<HTMLInputElement>('[data-n]')!;
  const testo = () => {
    area.querySelector('[data-vn]')!.textContent = String(N);
    area.querySelector('[data-esito]')!.textContent = T(`Stai sommando ${N} sinusoidi (frequenze 1, 3, 5, … con ampiezze sempre più piccole). Più onde aggiungi, più la curva arancione assomiglia a un'onda quadra.`, `You are adding ${N} sine waves (frequencies 1, 3, 5, … with ever smaller amplitudes). The more waves you add, the more the orange curve looks like a square wave.`);
  };
  inp.addEventListener('input', () => { N = Number(inp.value); scia.length = 0; testo(); });
  testo();
  if (movimentoRidotto()) { for (let i = 0; i < 380; i++) { t += 0.025; disegna(); } }
  else {
    const io = new IntersectionObserver(([e]) => { cancelAnimationFrame(anim); if (e.isIntersecting) anim = requestAnimationFrame(ciclo); });
    io.observe(cv);
  }
}
