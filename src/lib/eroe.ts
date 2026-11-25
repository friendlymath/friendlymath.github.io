import type { Lingua } from './lingua';
/**
 * Il personaggio dell'eroe, in stile gioco di ruolo: corpo, classe, aspetto e caratteristiche.
 * Resta solo nel browser (e nella Pergamena, se la salvi). Il nome è facoltativo.
 */

export const CHIAVE_EROE = 'friendlymath:eroe';

export type Corpo = 'femminile' | 'maschile' | 'neutro';
export type Classe = 'guerriero' | 'mago' | 'esploratore' | 'bardo' | 'veggente' | 'scaltro';
export type Stirpe = 'umano' | 'elfo' | 'nano' | 'halfling' | 'mezzelfo';
/** il dono che una stirpe porta nelle sfide (il Mezzelfo ne sceglie uno fra gli altri) */
export type Dono = Exclude<Stirpe, 'mezzelfo'>;
export type Caratteristica = 'logica' | 'intuizione' | 'pazienza' | 'curiosita';

export type Eroe = {
  nome: string;
  corpo: Corpo;
  stirpe: Stirpe;
  /** solo per il Mezzelfo: il dono scelto fra quelli delle altre stirpi */
  donoMezzelfo?: Dono;
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
  scaltro: { nomi: { femminile: 'Scaltra dei Trucchi', maschile: 'Scaltro dei Trucchi', neutro: 'Mente Scaltra' }, oggetto: 'chiave', icona: '🗝️',
    affinita: 'Calcolo mentale e scorciatoie', descrizione: 'Trova la porta di servizio di ogni calcolo: scorciatoie oneste, mai imbrogli.' },
};

export const STIRPI: Record<Stirpe, { nomi: Record<Corpo, string>; icona: string; descrizione: string }> = {
  umano: { nomi: { femminile: 'Umana', maschile: 'Umano', neutro: 'Umano' }, icona: '🧑', descrizione: 'Versatile e adattabile: impara un po’ di tutto.' },
  elfo: { nomi: { femminile: 'Elfa', maschile: 'Elfo', neutro: 'Elfo' }, icona: '🧝', descrizione: 'Occhi acuti e memoria lunga: nota i dettagli che sfuggono agli altri.' },
  nano: { nomi: { femminile: 'Nana', maschile: 'Nano', neutro: 'Nano' }, icona: '⛏️', descrizione: 'Testardaggine leggendaria: scava finché non trova la soluzione.' },
  halfling: { nomi: { femminile: 'Halfling', maschile: 'Halfling', neutro: 'Halfling' }, icona: '🍀', descrizione: 'Piccolo di statura, grande di fortuna e di buonumore.' },
  mezzelfo: { nomi: { femminile: 'Mezzelfa', maschile: 'Mezzelfo', neutro: 'Mezzelfo' }, icona: '🌗', descrizione: 'Figlio di due mondi: sceglie il dono di un’altra stirpe.' },
};

export const DONI: Record<Dono, { nome: string; effetto: string }> = {
  umano: { nome: 'Versatilità', effetto: 'Una carica di abilità in più in ogni sfida (non con i Guardiani).' },
  elfo: { nome: 'Occhio acuto', effetto: 'Nelle domande i numeri sono evidenziati, così non ti sfuggono.' },
  nano: { nome: 'Tenacia', effetto: 'Se superi una sfida dopo almeno un errore, guadagni il distintivo della Tenacia.' },
  halfling: { nome: 'Fortuna', effetto: 'Una volta per sfida, il primo errore non ti fa perdere stelle.' },
};

/** Le abilità di classe: aiuti nelle sfide. Le cariche dipendono dalla caratteristica collegata. */
export const ABILITA: Record<Classe, { nome: string; icona: string; car: Caratteristica; spiega: string }> = {
  guerriero: { nome: 'Secondo assalto', icona: '🛡️', car: 'pazienza', spiega: 'Controlla le risposte senza consumare un tentativo: le stelle restano intatte.' },
  mago: { nome: 'Indizio arcano', icona: '✨', car: 'logica', spiega: 'Rivela il primo passo del ragionamento per la prima domanda non ancora risolta.' },
  esploratore: { nome: 'Mappa del sapere', icona: '🗺️', car: 'curiosita', spiega: 'Mostra le idee chiave della lezione, proprio accanto alla sfida.' },
  bardo: { nome: 'Racconta di nuovo', icona: '🎶', car: 'curiosita', spiega: 'Racconta di nuovo l’esempio svolto della lezione, accanto alla sfida.' },
  veggente: { nome: 'Sguardo del caso', icona: '🔮', car: 'intuizione', spiega: 'Elimina una risposta sbagliata, oppure ti dice se il tuo numero è troppo alto o troppo basso.' },
  scaltro: { nome: 'Scorciatoia onesta', icona: '🗝️', car: 'intuizione', spiega: 'Ti svela con che cifra comincia la risposta e quanto è grande, oppure restringe la scelta a due risposte.' },
};

export const dono = (e: Eroe): Dono => (e.stirpe === 'mezzelfo' ? e.donoMezzelfo ?? 'umano' : e.stirpe);
export const nomeStirpe = (e: Eroe) => STIRPI[e.stirpe].nomi[e.corpo];

/** Cariche di abilità per una sfida: 1, +1 con la caratteristica di classe a 5 o più, +1 col dono umano. I Guardiani: sempre 1. */
export function cariche(e: Eroe, guardiano = false): number {
  if (guardiano) return 1;
  return 1 + (e.car[ABILITA[e.classe].car] >= 5 ? 1 : 0) + (dono(e) === 'umano' ? 1 : 0);
}

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
  return { nome: '', corpo: 'neutro', stirpe: 'umano', classe: 'esploratore', pelle: 1, capelli: 0, coloreCapelli: 1, mantello: 0,
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
  const stirpe: Stirpe = (r.stirpe as string) in STIRPI ? r.stirpe as Stirpe : 'umano';
  const e: Eroe = {
    nome: typeof r.nome === 'string' ? r.nome.replace(/[<>]/g, '').trim().slice(0, 24) : '',
    corpo: r.corpo as Corpo, stirpe, classe: r.classe as Classe,
    ...(stirpe === 'mezzelfo' && (r.donoMezzelfo as string) in DONI ? { donoMezzelfo: r.donoMezzelfo as Dono } : {}),
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
    chiave: `<g transform="rotate(-25 80 80)"><circle cx="80" cy="62" r="7" fill="none" stroke="#c9a24a" stroke-width="4"/><rect x="78" y="68" width="4" height="30" fill="#c9a24a"/><rect x="82" y="88" width="7" height="4" fill="#c9a24a"/><rect x="82" y="94" width="5" height="4" fill="#c9a24a"/></g>`,
    dado: `<rect x="70" y="80" width="20" height="20" rx="4" fill="#fff" stroke="#1f2333" stroke-width="2.5"/><circle cx="75" cy="85" r="2" fill="#1f2333"/><circle cx="80" cy="90" r="2" fill="#1f2333"/><circle cx="85" cy="95" r="2" fill="#1f2333"/>`,
  }[CLASSI[e.classe].oggetto];
  const corona = grado >= 4 ? `<path d="M38 18l4 -8 4 6 4 -9 4 9 4 -6 4 8z" fill="#ffc93c" stroke="#c9a24a"/>` : '';
  const scudo = grado >= 2 ? `<path d="M14 76h18v14c0 8 -9 12 -9 12s-9 -4 -9 -12z" fill="#fff8ea" stroke="${mant}" stroke-width="3"/>` : '';
  const orecchie = e.stirpe === 'elfo' || e.stirpe === 'mezzelfo'
    ? `<path d="M33 38l-${e.stirpe === 'elfo' ? 12 : 8} -9 6 15z" fill="${pelle}"/><path d="M67 38l${e.stirpe === 'elfo' ? 12 : 8} -9 -6 15z" fill="${pelle}"/>` : '';
  const barba = e.stirpe === 'nano' && m ? `<path d="M36 46q14 22 28 0q-2 16 -14 18q-12 -2 -14 -18z" fill="${cap}"/>` : '';
  // statura: nani robusti e bassi, halfling piccoli (scala attorno ai piedi)
  const scala = e.stirpe === 'nano' ? '1.1 0.86' : e.stirpe === 'halfling' ? '0.86 0.84' : '';
  const apri = scala ? `<g transform="translate(50 124) scale(${scala}) translate(-50 -124)">` : '<g>';
  return `
    <ellipse cx="50" cy="124" rx="26" ry="5" fill="rgba(0,0,0,.2)"/>
    ${apri}
    ${capelliDietro}
    ${corpo}
    <rect x="38" y="112" width="9" height="12" rx="3" fill="#3a2516"/><rect x="53" y="112" width="9" height="12" rx="3" fill="#3a2516"/>
    <rect x="45" y="54" width="10" height="10" fill="${pelle}"/>
    ${orecchie}
    <circle cx="50" cy="40" r="18" fill="${pelle}"/>
    ${capelliDavanti}
    <circle cx="44" cy="42" r="2.6" fill="#1f2333"/><circle cx="56" cy="42" r="2.6" fill="#1f2333"/>
    <path d="M45 49q5 4 10 0" stroke="#7a3f12" stroke-width="2" fill="none" stroke-linecap="round"/>
    <circle cx="40" cy="47" r="3" fill="#f08a8a" opacity=".45"/><circle cx="60" cy="47" r="3" fill="#f08a8a" opacity=".45"/>
    ${barba}
    ${corona}
    ${scudo}
    ${oggetto}
    </g>`;
}

export const avatarSvg = (e: Eroe, grado = 1, lato = 120, l: 'it' | 'en' = typeof document !== 'undefined' && document.documentElement.lang === 'en' ? 'en' : 'it') =>
  `<svg viewBox="0 0 100 130" width="${lato}" height="${Math.round(lato * 1.3)}" role="img" aria-label="${l === 'en' ? CLASSI_EN[e.classe].nomi[e.corpo] : nomeClasse(e)}">${avatarInterno(e, grado)}</svg>`;

/** Un personaggio a caso, come tirare i dadi. */
export function eroeCasuale(caso: () => number = Math.random): Eroe {
  const scegli = <T,>(xs: readonly T[]) => xs[Math.floor(caso() * xs.length)];
  const e: Eroe = { ...eroePredefinito(), car: { logica: 2, intuizione: 2, pazienza: 2, curiosita: 2 } };
  e.corpo = scegli(['femminile', 'maschile', 'neutro'] as const);
  e.classe = scegli(Object.keys(CLASSI) as Classe[]);
  e.stirpe = scegli(Object.keys(STIRPI) as Stirpe[]);
  if (e.stirpe === 'mezzelfo') e.donoMezzelfo = scegli(Object.keys(DONI) as Dono[]);
  e.pelle = Math.floor(caso() * PELLI.length); e.capelli = Math.floor(caso() * STILI_CAPELLI.length);
  e.coloreCapelli = Math.floor(caso() * COLORI_CAPELLI.length); e.mantello = Math.floor(caso() * MANTELLI.length);
  let e2 = e;
  for (let i = 0; i < 40 && puntiRimasti(e2) > 0; i++) e2 = cambiaCar(e2, scegli(['logica', 'intuizione', 'pazienza', 'curiosita'] as const), 1);
  return e2;
}

/* ---------- English ---------- */
export const CORPI_EN: Record<Corpo, string> = { femminile: 'Heroine', maschile: 'Hero', neutro: 'Neither' };
export const CLASSI_EN: Record<Classe, { nomi: Record<Corpo, string>; affinita: string; descrizione: string }> = {
  guerriero: { nomi: { femminile: 'Warrior of Numbers', maschile: 'Warrior of Numbers', neutro: 'Guard of Numbers' }, affinita: 'Numbers and arithmetic', descrizione: 'Faces calculations head-on. Fears neither columns of digits nor carrying.' },
  mago: { nomi: { femminile: 'Sorceress of Formulas', maschile: 'Wizard of Formulas', neutro: 'Alchemist of Formulas' }, affinita: 'Algebra', descrizione: 'Turns letters into numbers and equations into solutions. Loves rules that always work.' },
  esploratore: { nomi: { femminile: 'Explorer of Shapes', maschile: 'Explorer of Shapes', neutro: 'Guide of Shapes' }, affinita: 'Geometry', descrizione: 'Measures, draws, builds. Sees triangles where others see roofs and ladders.' },
  bardo: { nomi: { femminile: 'Bard of Problems', maschile: 'Bard of Problems', neutro: 'Storyteller of Problems' }, affinita: 'Logic and problems', descrizione: 'Turns every story into a problem and every problem into a story. Good at explaining to others.' },
  veggente: { nomi: { femminile: 'Seer of Chance', maschile: 'Seer of Chance', neutro: 'Seer of Chance' }, affinita: 'Probability and statistics', descrizione: 'Doesn’t predict the future: calculates its probabilities. Much more useful.' },
  scaltro: { nomi: { femminile: 'Trickster of Shortcuts', maschile: 'Trickster of Shortcuts', neutro: 'Clever Mind' }, affinita: 'Mental arithmetic and shortcuts', descrizione: 'Finds the side door of every calculation: honest shortcuts, never cheating.' },
};
export const STIRPI_EN: Record<Stirpe, { nomi: Record<Corpo, string>; descrizione: string }> = {
  umano: { nomi: { femminile: 'Human', maschile: 'Human', neutro: 'Human' }, descrizione: 'Versatile and adaptable: learns a bit of everything.' },
  elfo: { nomi: { femminile: 'Elf', maschile: 'Elf', neutro: 'Elf' }, descrizione: 'Sharp eyes and a long memory: notices the details others miss.' },
  nano: { nomi: { femminile: 'Dwarf', maschile: 'Dwarf', neutro: 'Dwarf' }, descrizione: 'Legendary stubbornness: keeps digging until the answer turns up.' },
  halfling: { nomi: { femminile: 'Halfling', maschile: 'Halfling', neutro: 'Halfling' }, descrizione: 'Small in stature, big in luck and good humour.' },
  mezzelfo: { nomi: { femminile: 'Half-elf', maschile: 'Half-elf', neutro: 'Half-elf' }, descrizione: 'Child of two worlds: chooses the gift of another lineage.' },
};
export const DONI_EN: Record<Dono, { nome: string; effetto: string }> = {
  umano: { nome: 'Versatility', effetto: 'One extra ability charge in every challenge (not against Guardians).' },
  elfo: { nome: 'Keen eye', effetto: 'Numbers in the questions are highlighted, so you don’t miss them.' },
  nano: { nome: 'Tenacity', effetto: 'If you complete a challenge after at least one mistake, you earn the Tenacity badge.' },
  halfling: { nome: 'Luck', effetto: 'Once per challenge, your first mistake doesn’t cost you stars.' },
};
export const ABILITA_EN: Record<Classe, { nome: string; spiega: string }> = {
  guerriero: { nome: 'Second assault', spiega: 'Check your answers without using up an attempt: your stars stay intact.' },
  mago: { nome: 'Arcane hint', spiega: 'Reveals the first step of the reasoning for the first unsolved question.' },
  esploratore: { nome: 'Map of knowledge', spiega: 'Shows the lesson’s key ideas, right next to the challenge.' },
  bardo: { nome: 'Tell it again', spiega: 'Retells the lesson’s worked example, next to the challenge.' },
  veggente: { nome: 'Glimpse of chance', spiega: 'Removes a wrong answer, or tells you whether your number is too high or too low.' },
  scaltro: { nome: 'Honest shortcut', spiega: 'Reveals the first digit of the answer and how big it is, or narrows the choice down to two answers.' },
};
export const CARATTERISTICHE_EN: Record<Caratteristica, { nome: string; spiega: string }> = {
  logica: { nome: 'Logic', spiega: 'Following a line of reasoning step by step.' },
  intuizione: { nome: 'Intuition', spiega: 'Glimpsing the road before walking it.' },
  pazienza: { nome: 'Patience', spiega: 'Not giving up at the first mistake. The most underrated.' },
  curiosita: { nome: 'Curiosity', spiega: 'Asking “what if…?”. The engine of all mathematics.' },
};
export const STILI_CAPELLI_EN = ['Short', 'Long', 'Tied up', 'Curly'];

export const classiL = (l: Lingua) => (l === 'en'
  ? Object.fromEntries(Object.entries(CLASSI).map(([k, c]) => [k, { ...c, ...CLASSI_EN[k as Classe] }])) as typeof CLASSI : CLASSI);
export const stirpiL = (l: Lingua) => (l === 'en'
  ? Object.fromEntries(Object.entries(STIRPI).map(([k, c]) => [k, { ...c, ...STIRPI_EN[k as Stirpe] }])) as typeof STIRPI : STIRPI);
export const doniL = (l: Lingua) => (l === 'en' ? DONI_EN : DONI);
export const abilitaL = (l: Lingua) => (l === 'en'
  ? Object.fromEntries(Object.entries(ABILITA).map(([k, a]) => [k, { ...a, ...ABILITA_EN[k as Classe] }])) as typeof ABILITA : ABILITA);
export const caratteristicheL = (l: Lingua) => (l === 'en' ? CARATTERISTICHE.map((c) => ({ ...c, ...CARATTERISTICHE_EN[c.id] })) : CARATTERISTICHE);
export const corpiL = (l: Lingua) => (l === 'en' ? CORPI.map((c) => ({ ...c, nome: CORPI_EN[c.id] })) : CORPI);
export const stiliCapelliL = (l: Lingua) => (l === 'en' ? STILI_CAPELLI_EN : STILI_CAPELLI);
export const nomeClasseL = (e: Eroe, l: Lingua) => classiL(l)[e.classe].nomi[e.corpo];
export const nomeStirpeL = (e: Eroe, l: Lingua) => stirpiL(l)[e.stirpe].nomi[e.corpo];
