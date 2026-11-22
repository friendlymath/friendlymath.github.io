/**
 * Texture procedurali: piccole tessere SVG con rumore frattale (feTurbulence), rasterizzate una volta dal browser
 * e ripetute come motivo. Pesano pochi byte e non richiedono immagini esterne.
 */
const tessera = (lato: number, filtro: string, colore: string) =>
  `data:image/svg+xml,${encodeURIComponent(
    `<svg xmlns='http://www.w3.org/2000/svg' width='${lato}' height='${lato}'><filter id='f' x='0' y='0'>${filtro}</filter><rect width='100%' height='100%' fill='${colore}' filter='url(#f)'/></svg>`,
  )}`;

const rumore = (freq: string, ottave: number, seme: number) =>
  `<feTurbulence type='fractalNoise' baseFrequency='${freq}' numOctaves='${ottave}' seed='${seme}' stitchTiles='stitch'/>`;

/** valori della matrice: porta il rumore a toni di grigio con trasparenza controllata */
const grigio = (alfa: number, offset = 0) =>
  `<feColorMatrix values='0 0 0 0 ${offset}  0 0 0 0 ${offset}  0 0 0 0 ${offset}  0 0 0 ${alfa} 0'/>`;

export const TEXTURE = {
  /** grana di carta: puntinatura fine */
  carta: tessera(220, rumore('0.9', 3, 3) + `<feColorMatrix type='saturate' values='0'/><feComponentTransfer><feFuncA type='table' tableValues='0 0.09'/></feComponentTransfer>`, '#000'),
  /** pergamena: macchie larghe e morbide */
  pergamena: tessera(320, rumore('0.012', 4, 8) + grigio(0.9, 0.35) + `<feComponentTransfer><feFuncA type='table' tableValues='0 0.32'/></feComponentTransfer>`, '#000'),
  /** venature del legno: rumore stirato in orizzontale */
  legno: tessera(256, rumore('0.006 0.18', 3, 11) + `<feColorMatrix values='0 0 0 0 0.18  0 0 0 0 0.09  0 0 0 0 0.03  0 0 0 1.4 -0.35'/>`, '#000'),
  /** pietra: rumore granuloso a più scale */
  pietra: tessera(240, rumore('0.08', 5, 21) + `<feColorMatrix values='0 0 0 0 0.1  0 0 0 0 0.1  0 0 0 0 0.12  0 0 0 1.5 -0.55'/>`, '#000'),
  /** erba: grana verde scura */
  erba: tessera(200, rumore('0.25', 3, 5) + `<feColorMatrix values='0 0 0 0 0.05  0 0 0 0 0.22  0 0 0 0 0.04  0 0 0 1.3 -0.45'/>`, '#000'),
  /** acqua: increspature allungate */
  acqua: tessera(260, rumore('0.012 0.06', 3, 9) + `<feColorMatrix values='0 0 0 0 1  0 0 0 0 1  0 0 0 0 1  0 0 0 1.6 -0.75'/>`, '#000'),
} as const;

export type NomeTexture = keyof typeof TEXTURE;
