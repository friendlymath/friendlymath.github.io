/**
 * La Palestra: formule spiegate membro per membro ed esercizi generati.
 * I generatori sono funzioni pure (stesso seme → stessi esercizi), così le schede si possono ristampare uguali.
 */

export type Membro = { tex: string; nome?: string; significato?: string };
export type Esercizio = { testo: string; risposta: number; tolleranza: number; passaggi: string[]; unita?: string };
export type Formula = {
  slug: string;
  titolo: string;
  grado: number;
  macro: string;
  lezione?: string;
  membri: Membro[];
  lettura: string;
  quando: string;
  attenzione: string;
  genera: (r: Rng) => Esercizio;
};

export type Rng = { intero: (min: number, max: number) => number; scegli: <T>(xs: readonly T[]) => T };

/** Generatore pseudo-casuale con seme (mulberry32). */
export function creaRng(seme: number): Rng {
  let s = seme >>> 0;
  const next = () => {
    s = (s + 0x6d2b79f5) >>> 0;
    let t = s;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
  return {
    intero: (min, max) => min + Math.floor(next() * (max - min + 1)),
    scegli: (xs) => xs[Math.floor(next() * xs.length)],
  };
}

const n = (x: number, d = 2) => x.toLocaleString('it-IT', { maximumFractionDigits: d });
const segno = (x: number) => (x < 0 ? `− ${-x}` : `+ ${x}`);

export const FORMULE: Formula[] = [
  {
    slug: 'area-rettangolo', titolo: 'Area del rettangolo', grado: 1, macro: 'geometria',
    membri: [
      { tex: 'A', nome: 'Area', significato: 'Quanti quadratini da 1 × 1 servono per coprire il rettangolo. Si misura in unità al quadrato (cm², m²).' },
      { tex: '=' },
      { tex: 'b', nome: 'Base', significato: 'Quanti quadratini stanno in una riga.' },
      { tex: '\\cdot' },
      { tex: 'h', nome: 'Altezza', significato: 'Quante righe di quadratini ci sono.' },
    ],
    lettura: 'L’area è uguale alla base per l’altezza: righe di quadratini per quadratini in ogni riga.',
    quando: 'Per pavimenti, pareti da dipingere, campi, fogli: ogni volta che devi «coprire» un rettangolo.',
    attenzione: 'Base e altezza devono avere la stessa unità di misura: se una è in metri e l’altra in centimetri, converti prima.',
    genera: (r) => {
      const b = r.intero(2, 15), h = r.intero(2, 12);
      return { testo: `Una stanza rettangolare misura ${b} m per ${h} m. Quanti m² di pavimento servono?`, risposta: b * h, tolleranza: 0, unita: 'm²',
        passaggi: [`A = b · h`, `A = ${b} · ${h}`, `A = ${b * h} m²`] };
    },
  },
  {
    slug: 'percentuale', titolo: 'La percentuale di un numero', grado: 2, macro: 'numeri', lezione: 'numeri/percentuali',
    membri: [
      { tex: 'x', nome: 'Il risultato', significato: 'La parte che cerchi: lo sconto, la quota, il pezzo.' },
      { tex: '=' },
      { tex: '\\dfrac{p}{100}', nome: 'La percentuale', significato: 'p su 100: quante parti prendi ogni 100. Il 25% è 25/100 = 0,25.' },
      { tex: '\\cdot' },
      { tex: 'N', nome: 'Il totale', significato: 'Il numero intero da cui prendi la percentuale: il prezzo pieno, la classe intera, la popolazione.' },
    ],
    lettura: 'Il p per cento di N è p centesimi di N.',
    quando: 'Sconti, interessi, statistiche, voti, ricette ridotte.',
    attenzione: 'Due sconti successivi non si sommano: il secondo si calcola sul prezzo già scontato.',
    genera: (r) => {
      const p = r.scegli([5, 10, 15, 20, 25, 30, 40, 50, 75] as const), N = r.intero(2, 40) * 20;
      const x = (p / 100) * N;
      return { testo: `Quanto è il ${p}% di ${N}?`, risposta: x, tolleranza: 0.001,
        passaggi: [`x = p/100 · N`, `x = ${p}/100 · ${N}`, `x = ${n(p / 100)} · ${N} = ${n(x)}`] };
    },
  },
  {
    slug: 'proporzione', titolo: 'Il termine mancante di una proporzione', grado: 2, macro: 'numeri', lezione: 'numeri/proporzioni',
    membri: [
      { tex: 'a', nome: 'Primo estremo', significato: 'Il primo termine: per esempio le persone della ricetta originale.' },
      { tex: ':' },
      { tex: 'b', nome: 'Primo medio', significato: 'Ciò che corrisponde ad a: la farina per quelle persone.' },
      { tex: '=' },
      { tex: 'c', nome: 'Secondo medio', significato: 'La nuova situazione: le persone di stasera.' },
      { tex: ':' },
      { tex: 'x', nome: 'Secondo estremo (incognito)', significato: 'Quello che cerchi: la farina per stasera.' },
    ],
    lettura: 'a sta a b come c sta a x. Prodotto dei medi = prodotto degli estremi: a · x = b · c, quindi x = b · c / a.',
    quando: 'Ricette, scale delle mappe, cambi di valuta, ogni volta che due grandezze sono direttamente proporzionali.',
    attenzione: 'Prima chiediti se la proporzionalità è diretta o inversa: più operai significa meno giorni, non di più.',
    genera: (r) => {
      const a = r.intero(2, 9), k = r.intero(2, 12), c = r.intero(2, 9) * a;
      const b = a * k, x = (b * c) / a;
      return { testo: `Trova x: ${a} : ${b} = ${c} : x`, risposta: x, tolleranza: 0,
        passaggi: [`${a} · x = ${b} · ${c}`, `${a} · x = ${b * c}`, `x = ${b * c} : ${a} = ${x}`] };
    },
  },
  {
    slug: 'pitagora', titolo: 'Teorema di Pitagora', grado: 2, macro: 'geometria', lezione: 'geometria/teorema-di-pitagora',
    membri: [
      { tex: 'c^2', nome: 'Ipotenusa al quadrato', significato: 'L’area del quadrato costruito sul lato più lungo, quello opposto all’angolo retto.' },
      { tex: '=' },
      { tex: 'a^2', nome: 'Primo cateto al quadrato', significato: 'L’area del quadrato costruito su uno dei due lati che formano l’angolo retto.' },
      { tex: '+' },
      { tex: 'b^2', nome: 'Secondo cateto al quadrato', significato: 'L’area del quadrato sull’altro lato dell’angolo retto.' },
    ],
    lettura: 'In un triangolo rettangolo il quadrato sull’ipotenusa è grande quanto i due quadrati sui cateti messi insieme.',
    quando: 'Distanze in diagonale: la scala contro il muro, lo schermo in pollici, la distanza tra due punti del piano.',
    attenzione: 'Vale solo per i triangoli rettangoli. E la radice di una somma non è la somma delle radici: √(9 + 16) = 5, non 3 + 4.',
    genera: (r) => {
      const [p, q, h] = r.scegli([[3, 4, 5], [5, 12, 13], [8, 15, 17], [7, 24, 25], [20, 21, 29]] as const);
      const k = r.intero(1, 3);
      const a = p * k, b = q * k, c = h * k;
      if (r.intero(0, 1) === 0) {
        return { testo: `I cateti di un triangolo rettangolo misurano ${a} cm e ${b} cm. Quanto misura l’ipotenusa?`, risposta: c, tolleranza: 0, unita: 'cm',
          passaggi: [`c = √(a² + b²)`, `c = √(${a * a} + ${b * b})`, `c = √${c * c} = ${c} cm`] };
      }
      return { testo: `L’ipotenusa misura ${c} cm e un cateto ${a} cm. Quanto misura l’altro cateto?`, risposta: b, tolleranza: 0, unita: 'cm',
        passaggi: [`b = √(c² − a²)`, `b = √(${c * c} − ${a * a})`, `b = √${b * b} = ${b} cm`] };
    },
  },
  {
    slug: 'area-cerchio', titolo: 'Area del cerchio', grado: 2, macro: 'geometria', lezione: 'geometria/cerchio-e-pi',
    membri: [
      { tex: 'A', nome: 'Area', significato: 'La superficie racchiusa dalla circonferenza.' },
      { tex: '=' },
      { tex: '\\pi', nome: 'Pi greco', significato: 'Circa 3,14: quante volte il diametro sta nella circonferenza. È lo stesso per ogni cerchio.' },
      { tex: '\\cdot' },
      { tex: 'r^2', nome: 'Raggio al quadrato', significato: 'L’area del quadrato che ha per lato il raggio. Il cerchio ne contiene circa 3,14.' },
    ],
    lettura: 'L’area del cerchio è pi greco per il raggio al quadrato.',
    quando: 'Pizze, tavoli rotondi, aiuole, sezioni di tubi.',
    attenzione: 'Si usa il raggio, non il diametro: se ti danno il diametro, dividilo per 2.',
    genera: (r) => {
      const usaDiametro = r.intero(0, 1) === 1;
      const raggio = r.intero(1, 12);
      const A = Math.round(3.14 * raggio * raggio * 100) / 100;
      return { testo: usaDiametro ? `Un cerchio ha diametro ${2 * raggio} cm. Calcola l’area (usa π = 3,14).` : `Un cerchio ha raggio ${raggio} cm. Calcola l’area (usa π = 3,14).`,
        risposta: A, tolleranza: 0.01, unita: 'cm²',
        passaggi: [...(usaDiametro ? [`r = d : 2 = ${2 * raggio} : 2 = ${raggio} cm`] : []), `A = π · r²`, `A = 3,14 · ${raggio}² = 3,14 · ${raggio * raggio}`, `A = ${n(A)} cm²`] };
    },
  },
  {
    slug: 'equazione-primo-grado', titolo: 'Equazione di primo grado', grado: 3, macro: 'algebra', lezione: 'algebra/equazioni-primo-grado',
    membri: [
      { tex: 'a', nome: 'Coefficiente', significato: 'Quante volte compare la x: «tre volte un numero» → a = 3.' },
      { tex: 'x', nome: 'Incognita', significato: 'Il numero misterioso da trovare.' },
      { tex: '+' },
      { tex: 'b', nome: 'Termine noto a sinistra', significato: 'Un numero già conosciuto che sta insieme alla x.' },
      { tex: '=' },
      { tex: 'c', nome: 'Secondo membro', significato: 'Il valore che deve avere tutto il primo membro.' },
    ],
    lettura: 'a volte un numero, più b, fa c. Si toglie b da entrambe le parti, poi si divide per a: x = (c − b) : a.',
    quando: 'Ogni problema del tipo «c’è un costo fisso più un costo per ogni…».',
    attenzione: 'Quello che fai a un membro lo fai anche all’altro. Un termine che «passa» dall’altra parte cambia segno.',
    genera: (r) => {
      const a = r.intero(2, 9), x = r.intero(-9, 12), b = r.intero(-15, 15) || 3, c = a * x + b;
      return { testo: `Risolvi: ${a}x ${segno(b)} = ${c}`, risposta: x, tolleranza: 0,
        passaggi: [`${a}x = ${c} ${segno(-b)}`, `${a}x = ${c - b}`, `x = ${c - b} : ${a} = ${x}`, `Verifica: ${a} · ${x} ${segno(b)} = ${c} ✔`] };
    },
  },
  {
    slug: 'quadrato-binomio', titolo: 'Quadrato del binomio', grado: 3, macro: 'algebra', lezione: 'algebra/prodotti-notevoli',
    membri: [
      { tex: '(a+b)^2', nome: 'Il quadrato del binomio', significato: 'L’area di un quadrato di lato a + b.' },
      { tex: '=' },
      { tex: 'a^2', nome: 'Quadrato del primo', significato: 'Il quadrato grande di lato a.' },
      { tex: '+' },
      { tex: '2ab', nome: 'Doppio prodotto', significato: 'I due rettangoli a × b: è il pezzo che tutti dimenticano!' },
      { tex: '+' },
      { tex: 'b^2', nome: 'Quadrato del secondo', significato: 'Il quadrato piccolo di lato b.' },
    ],
    lettura: 'Quadrato del primo, più il doppio prodotto, più il quadrato del secondo.',
    quando: 'Calcoli a mente (31² = 900 + 60 + 1), semplificazioni, completamento del quadrato.',
    attenzione: '(a + b)² non è a² + b²: mancano i due rettangoli 2ab.',
    genera: (r) => {
      const t = r.intero(2, 9) * 10, u = r.intero(1, 4), meno = r.intero(0, 1) === 1;
      const v = meno ? t - u : t + u;
      return { testo: `Calcola a mente ${v}² usando il quadrato del binomio.`, risposta: v * v, tolleranza: 0,
        passaggi: [`${v} = ${t} ${meno ? '−' : '+'} ${u}`, `${v}² = ${t}² ${meno ? '−' : '+'} 2 · ${t} · ${u} + ${u}²`, `= ${t * t} ${meno ? '−' : '+'} ${2 * t * u} + ${u * u}`, `= ${v * v}`] };
    },
  },
  {
    slug: 'formula-risolutiva', titolo: 'Formula risolutiva di secondo grado', grado: 3, macro: 'algebra', lezione: 'algebra/equazioni-secondo-grado',
    membri: [
      { tex: 'x', nome: 'Le soluzioni', significato: 'I valori che rendono vera ax² + bx + c = 0: dove la parabola tocca l’asse x.' },
      { tex: '=' },
      { tex: '\\dfrac{-b \\pm \\sqrt{\\Delta}}{2a}', nome: 'La formula', significato: '−b: il coefficiente di x cambiato di segno. ±: una volta con +, una con −, per le due soluzioni. 2a: il doppio del coefficiente di x².' },
      { tex: '\\quad \\Delta = b^2 - 4ac', nome: 'Il discriminante', significato: 'Se è positivo ci sono due soluzioni, se è zero una, se è negativo nessuna (nei numeri reali).' },
    ],
    lettura: 'x uguale meno b più o meno radice di delta, tutto fratto due a.',
    quando: 'Traiettorie, aree con un lato incognito, problemi di massimo e minimo.',
    attenzione: 'Leggi a, b, c con il loro segno: in x² − 5x + 6 = 0 è b = −5, quindi −b = +5.',
    genera: (r) => {
      let r1 = r.intero(-6, 8), r2 = r.intero(-6, 8);
      if (r1 === r2) r2 = r1 + 1;
      const b = -(r1 + r2), c = r1 * r2, D = b * b - 4 * c;
      const grande = Math.max(r1, r2), piccola = Math.min(r1, r2);
      return { testo: `Risolvi x² ${b === 0 ? '' : segno(b) + 'x '}${segno(c)} = 0. Scrivi la soluzione più grande.`, risposta: grande, tolleranza: 0,
        passaggi: [`a = 1, b = ${b}, c = ${c}`, `Δ = (${b})² − 4 · 1 · (${c}) = ${D}`, `x = (${-b} ± √${D}) / 2 = (${-b} ± ${Math.sqrt(D)}) / 2`, `x₁ = ${piccola}, x₂ = ${grande}`] };
    },
  },
  {
    slug: 'probabilita', titolo: 'Probabilità classica', grado: 2, macro: 'probabilita-statistica', lezione: 'probabilita-statistica/probabilita-classica',
    membri: [
      { tex: 'P', nome: 'Probabilità', significato: 'Un numero tra 0 (impossibile) e 1 (certo).' },
      { tex: '=' },
      { tex: '\\dfrac{f}{n}', nome: 'Favorevoli su possibili', significato: 'f: i casi che ti vanno bene. n: tutti i casi possibili, purché ugualmente probabili.' },
    ],
    lettura: 'La probabilità è il numero dei casi favorevoli diviso il numero dei casi possibili.',
    quando: 'Dadi, carte, estrazioni, sondaggi: quando tutti i risultati hanno la stessa chance.',
    attenzione: 'Funziona solo se i casi sono ugualmente probabili. E il caso non ha memoria.',
    genera: (r) => {
      const rosse = r.intero(1, 9), blu = r.intero(1, 11), tot = rosse + blu;
      return { testo: `In un sacchetto ci sono ${rosse} palline rosse e ${blu} blu. Qual è la probabilità di pescare una rossa? (scrivi un decimale, max 3 cifre)`,
        risposta: Math.round((rosse / tot) * 1000) / 1000, tolleranza: 0.001,
        passaggi: [`f = ${rosse} (le rosse)`, `n = ${rosse} + ${blu} = ${tot}`, `P = ${rosse}/${tot} ≈ ${n(rosse / tot, 3)}`] };
    },
  },
];

export const formula = (slug: string) => FORMULE.find((f) => f.slug === slug);

export function serie(f: Formula, seme: number, quanti = 6): Esercizio[] {
  const r = creaRng(seme);
  const visti = new Set<string>();
  return Array.from({ length: quanti }, () => {
    let e = f.genera(r);
    for (let i = 0; i < 12 && visti.has(e.testo); i++) e = f.genera(r);
    visti.add(e.testo);
    return e;
  });
}

export function corretta(e: Esercizio, risposta: string): boolean {
  const v = Number(risposta.trim().replace(/\s/g, '').replace(',', '.'));
  return Number.isFinite(v) && Math.abs(v - e.risposta) <= e.tolleranza + 1e-9;
}
