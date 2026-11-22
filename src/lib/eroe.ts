/**
 * Il personaggio dell'eroe, in stile gioco di ruolo: corpo, classe, aspetto e caratteristiche.
 * Resta solo nel browser (e nella Pergamena, se la salvi). Il nome è facoltativo.
 */

export const CHIAVE_EROE = 'friendlymath:eroe';

export type Corpo = 'femminile' | 'maschile' | 'neutro';
export type Classe = 'guerriero' | 'mago' | 'esploratore' | 'bardo' | 'veggente';
export type Caratteristica = 'logica' | 'intuizione' | 'pazienza' | 'curiosita';

export type Eroe = {
  nome: string;
  corpo: Corpo;
  classe: Classe;
  pelle: number;
  capelli: number;
  coloreCapelli: number;
  mantello: number;
  car: Record<Caratteristica, number>;
};

export const CORPI: { id: Corpo; nome: string }[] = [
  { id: 'femminile', nome: 'Eroina' },
  { id: 'maschile', nome: 'Eroe' },
  { id: 'neutro', nome: 'Né l’uno né l’altra' },
];

export const CLASSI: Record<Classe, { nomi: Record<Corpo, string>; oggetto: string; affinita: string; descrizione: string; icona: string }> = {
  guerriero: { nomi: { femminile: 'Guerriera dei Numeri', maschile: 'Guerriero dei Numeri', neutro: 'Guardia dei Numeri' }, oggetto: 'spada', icona: '⚔️',
    affinita: 'Numeri e aritmetica', descrizione: 'Affronta i calcoli a viso aperto. Non teme le colonne di cifre né i riporti.' },
  mago: { nomi: { femminile: 'Maga delle Formule', maschile: 'Mago delle Formule', neutro: 'Alchimista delle Formule' }, oggetto: 'bacchetta', icona: '🪄',
    affinita: 'Algebra', descrizione: 'Trasforma le lettere in numeri e le equazioni in soluzioni. Ama le regole che funzionano sempre.' },
  esploratore: { nomi: { femminile: 'Esploratrice delle Forme', maschile: 'Esploratore delle Forme', neutro: 'Guida delle Forme' }, oggetto: 'compasso', icona: '🧭',
    affinita: 'Geometria', descrizione: 'Misura, disegna, costruisce. Vede triangoli dove gli altri vedono tetti e scale.' },
  bardo: { nomi: { femminile: 'Barda dei Problemi', maschile: 'Bardo dei Problemi', neutro: 'Cantastorie dei Problemi' }, oggetto: 'liuto', icona: '🎶',
    affinita: 'Logica e problemi', descrizione: 'Trasforma ogni storia in un problema e ogni problema in una storia. Spiega bene agli altri.' },
  veggente: { nomi: { femminile: 'Veggente del Caso', maschile: 'Veggente del Caso', neutro: 'Veggente del Caso' }, oggetto: 'dado', icona: '🎲',
    affinita: 'Probabilità e statistica', descrizione: 'Non prevede il futuro: ne calcola le probabilità. Molto più utile.' },
};

export const CARATTERISTICHE: { id: Caratteristica; nome: string; icona: string; spiega: string }[] = [
  { id: 'logica', nome: 'Logica', icona: '🧠', spiega: 'Seguire un ragionamento passo dopo passo.' },
  { id: 'intuizione', nome: 'Intuizione', icona: '💡', spiega: 'Intravedere la strada prima di percorrerla.' },
  { id: 'pazienza', nome: 'Pazienza', icona: '🐢', spiega: 'Non arrendersi al primo errore. La più sottovalutata.' },
  { id: 'curiosita', nome: 'Curiosità', icona: '🔍', spiega: 'Chiedersi «e se…?». Il motore di tutta la matematica.' },
];

export const PELLI = ['#f9d7b5', '#f2c29b', '#d9a070', '#a86b45', '#6e4429'];
export const COLORI_CAPELLI = ['#2b1d14', '#6b4226', '#b5651d', '#e8c25a', '#c0392b', '#7b5cd6'];
export const MANTELLI = ['#1f4e9c', '#f07a2c', '#1f9d5c', '#7b5cd6', '#d64545', '#c9a24a'];
export const STILI_CAPELLI = ['Corti', 'Lunghi', 'Raccolti', 'Ricci'];

export const PUNTI_BASE = 2;
export const PUNTI_DA_DISTRIBUIRE = 6;
export const CAR_MAX = 6;

export function eroePredefinito(): Eroe {
  return { nome: '', corpo: 'neutro', classe: 'esploratore', pelle: 1, capelli: 0, coloreCapelli: 1, mantello: 0,
    car: { logica: 3, intuizione: 3, pazienza: 4, curiosita: 4 } };
}

export const puntiUsati = (e: Eroe) => Object.values(e.car).reduce((a, b) => a + b - PUNTI_BASE, 0);
export const puntiRimasti = (e: Eroe) => PUNTI_DA_DISTRIBUIRE - puntiUsati(e);

/** Cambia una caratteristica rispettando i limiti; restituisce l'eroe (invariato se non si può). */
export function cambiaCar(e: Eroe, c: Caratteristica, delta: 1 | -1): Eroe {
  const v = e.car[c] + delta;
  if (v < PUNTI_BASE || v > CAR_MAX) return e;
  if (delta > 0 && puntiRimasti(e) <= 0) return e;
  return { ...e, car: { ...e.car, [c]: v } };
}

export const nomeClasse = (e: Eroe) => CLASSI[e.classe].nomi[e.corpo];

const intIn = (x: unknown, max: number) => (Number.isInteger(x) && (x as number) >= 0 && (x as number) < max ? (x as number) : 0);

/** Valida un eroe letto da storage o Pergamena. Restituisce null se non è riconoscibile. */
export function validaEroe(o: unknown): Eroe | null {
  if (typeof o !== 'object' || o === null || Array.isArray(o)) return null;
  const r = o as Record<string, unknown>;
  if (!['femminile', 'maschile', 'neutro'].includes(r.corpo as string)) return null;
  if (!(r.classe as string in CLASSI)) return null;
  const base = eroePredefinito();
  const carIn = (typeof r.car === 'object' && r.car) ? r.car as Record<string, unknown> : {};
  const car = { ...base.car };
  for (const k of Object.keys(car) as Caratteristica[]) {
    const v = carIn[k];
    if (Number.isInteger(v) && (v as number) >= PUNTI_BASE && (v as number) <= CAR_MAX) car[k] = v as number;
  }
  const e: Eroe = {
    nome: typeof r.nome === 'string' ? r.nome.replace(/[<>]/g, '').trim().slice(0, 24) : '',
    corpo: r.corpo as Corpo, classe: r.classe as Classe,
    pelle: intIn(r.pelle, PELLI.length), capelli: intIn(r.capelli, STILI_CAPELLI.length),
    coloreCapelli: intIn(r.coloreCapelli, COLORI_CAPELLI.length), mantello: intIn(r.mantello, MANTELLI.length), car,
  };
  if (puntiRimasti(e) < 0) e.car = base.car;
  return e;
}

export function caricaEroe(storage: Storage | null = (() => { try { return localStorage; } catch { return null; } })()): Eroe | null {
  try { const t = storage?.getItem(CHIAVE_EROE); return t ? validaEroe(JSON.parse(t)) : null; } catch { return null; }
}
export function salvaEroe(e: Eroe, storage: Storage | null = (() => { try { return localStorage; } catch { return null; } })()): boolean {
  try { storage!.setItem(CHIAVE_EROE, JSON.stringify(e)); return true; } catch { return false; }
}

/** Disegno dell'avatar (coordinate 0..100 × 0..130, piedi a y=124). Restituisce il contenuto SVG, senza il tag <svg>. */
export function avatarInterno(e: Eroe, grado = 1): string {
  const pelle = PELLI[e.pelle], cap = COLORI_CAPELLI[e.coloreCapelli], mant = MANTELLI[e.mantello];
  const f = e.corpo === 'femminile', m = e.corpo === 'maschile';
  const capelliDietro = [
    '',
    `<path d="M31 40c-4 18 -2 34 4 44h30c6 -10 8 -26 4 -44z" fill="${cap}"/>`,
    `<circle cx="50" cy="16" r="9" fill="${cap}"/>`,
    `<g fill="${cap}"><circle cx="32" cy="38" r="9"/><circle cx="68" cy="38" r="9"/><circle cx="34" cy="54" r="8"/><circle cx="66" cy="54" r="8"/></g>`,
  ][e.capelli];
  const capelliDavanti = [
    `<path d="M32 36q2 -18 18 -18t18 18q-8 -6 -18 -6t-18 6z" fill="${cap}"/>`,
    `<path d="M31 40q0 -22 19 -22t19 22q-4 -10 -19 -11t-19 11z" fill="${cap}"/>`,
    `<path d="M32 36q2 -18 18 -18t18 18q-8 -8 -18 -8t-18 8z" fill="${cap}"/>`,
    `<g fill="${cap}"><circle cx="38" cy="26" r="8"/><circle cx="50" cy="21" r="9"/><circle cx="62" cy="26" r="8"/></g>`,
  ][e.capelli];
  const corpo = f
    ? `<path d="M34 62h32l10 54H24z" fill="${mant}"/><path d="M38 62h24l4 20H34z" fill="rgba(255,255,255,.18)"/>`
    : m
      ? `<path d="M32 62h36l4 54H28z" fill="${mant}"/><path d="M32 62h36v10H32z" fill="rgba(0,0,0,.15)"/>`
      : `<path d="M33 62h34l7 54H26z" fill="${mant}"/><path d="M50 62v54" stroke="rgba(0,0,0,.15)" stroke-width="3"/>`;
  const oggetto = {
    spada: `<g transform="rotate(20 80 80)"><rect x="78" y="44" width="5" height="46" rx="2" fill="#dfe6ee" stroke="#7a8394"/><rect x="72" y="88" width="17" height="5" rx="2" fill="#c9a24a"/><rect x="78.5" y="92" width="4" height="12" fill="#6e4429"/></g>`,
    bacchetta: `<rect x="78" y="60" width="4" height="44" rx="2" fill="#6e4429" transform="rotate(15 80 80)"/><path d="M86 54l2 5 5 1-4 3 1 5-4-3-4 3 1-5-4-3 5-1z" fill="#ffc93c"/>`,
    compasso: `<path d="M80 54l-8 44M80 54l8 44" stroke="#7a8394" stroke-width="3.5" stroke-linecap="round"/><circle cx="80" cy="54" r="4" fill="#c9a24a"/>`,
    liuto: `<ellipse cx="80" cy="92" rx="11" ry="14" fill="#b5651d" stroke="#6e4429" stroke-width="2"/><rect x="77" y="58" width="6" height="26" fill="#6e4429"/><circle cx="80" cy="92" r="3.5" fill="#3a2516"/>`,
    dado: `<rect x="70" y="80" width="20" height="20" rx="4" fill="#fff" stroke="#1f2333" stroke-width="2.5"/><circle cx="75" cy="85" r="2" fill="#1f2333"/><circle cx="80" cy="90" r="2" fill="#1f2333"/><circle cx="85" cy="95" r="2" fill="#1f2333"/>`,
  }[CLASSI[e.classe].oggetto];
  const corona = grado >= 4 ? `<path d="M38 18l4 -8 4 6 4 -9 4 9 4 -6 4 8z" fill="#ffc93c" stroke="#c9a24a"/>` : '';
  const scudo = grado >= 2 ? `<path d="M14 76h18v14c0 8 -9 12 -9 12s-9 -4 -9 -12z" fill="#fff8ea" stroke="${mant}" stroke-width="3"/>` : '';
  return `
    <ellipse cx="50" cy="124" rx="26" ry="5" fill="rgba(0,0,0,.2)"/>
    ${capelliDietro}
    ${corpo}
    <rect x="38" y="112" width="9" height="12" rx="3" fill="#3a2516"/><rect x="53" y="112" width="9" height="12" rx="3" fill="#3a2516"/>
    <rect x="45" y="54" width="10" height="10" fill="${pelle}"/>
    <circle cx="50" cy="40" r="18" fill="${pelle}"/>
    ${capelliDavanti}
    <circle cx="44" cy="42" r="2.6" fill="#1f2333"/><circle cx="56" cy="42" r="2.6" fill="#1f2333"/>
    <path d="M45 49q5 4 10 0" stroke="#7a3f12" stroke-width="2" fill="none" stroke-linecap="round"/>
    <circle cx="40" cy="47" r="3" fill="#f08a8a" opacity=".45"/><circle cx="60" cy="47" r="3" fill="#f08a8a" opacity=".45"/>
    ${corona}
    ${scudo}
    ${oggetto}`;
}

export const avatarSvg = (e: Eroe, grado = 1, lato = 120) =>
  `<svg viewBox="0 0 100 130" width="${lato}" height="${Math.round(lato * 1.3)}" role="img" aria-label="${nomeClasse(e)}">${avatarInterno(e, grado)}</svg>`;

/** Un personaggio a caso, come tirare i dadi. */
export function eroeCasuale(caso: () => number = Math.random): Eroe {
  const scegli = <T,>(xs: readonly T[]) => xs[Math.floor(caso() * xs.length)];
  const e: Eroe = { ...eroePredefinito(), car: { logica: 2, intuizione: 2, pazienza: 2, curiosita: 2 } };
  e.corpo = scegli(['femminile', 'maschile', 'neutro'] as const);
  e.classe = scegli(Object.keys(CLASSI) as Classe[]);
  e.pelle = Math.floor(caso() * PELLI.length); e.capelli = Math.floor(caso() * STILI_CAPELLI.length);
  e.coloreCapelli = Math.floor(caso() * COLORI_CAPELLI.length); e.mantello = Math.floor(caso() * MANTELLI.length);
  let e2 = e;
  for (let i = 0; i < 40 && puntiRimasti(e2) > 0; i++) e2 = cambiaCar(e2, scegli(['logica', 'intuizione', 'pazienza', 'curiosita'] as const), 1);
  return e2;
}
