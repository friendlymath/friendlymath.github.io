import type { Lingua } from './lingua';

/**
 * La Palestra: formule spiegate membro per membro ed esercizi generati.
 * I generatori sono funzioni pure (stesso seme → stessi esercizi), così le schede si possono ristampare uguali.
 */

export type Membro = { tex: string; nome?: string; significato?: string };
export type Esercizio = { testo: string; risposta: number; tolleranza: number; passaggi: string[]; unita?: string };
/** Testi inglesi di una formula: nomi e significati nell'ordine dei membri che li hanno. */
export type TestiEn = { titolo: string; membri: { nome: string; significato: string }[]; lettura: string; quando: string; attenzione: string };
export type Formula = {
  slug: string;
  titolo: string;
  en: TestiEn;
  grado: number;
  macro: string;
  lezione?: string;
  membri: Membro[];
  lettura: string;
  quando: string;
  attenzione: string;
  genera: (r: Rng, l?: Lingua) => Esercizio;
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

let LINGUA: Lingua = 'it';
const n = (x: number, d = 2) => x.toLocaleString(LINGUA === 'en' ? 'en-GB' : 'it-IT', { maximumFractionDigits: d });
const T = (it: string, en: string) => (LINGUA === 'en' ? en : it);
const segno = (x: number) => (x < 0 ? `− ${-x}` : `+ ${x}`);

export const FORMULE: Formula[] = [
  {
    slug: 'area-rettangolo', titolo: 'Area del rettangolo', grado: 1, macro: 'geometria',
    en: { titolo: "Area of a rectangle", membri: [{ nome: "Area", significato: "How many 1 × 1 squares you need to cover the rectangle. It is measured in square units (cm², m²)." }, { nome: "Base", significato: "How many squares fit in one row." }, { nome: "Height", significato: "How many rows of squares there are." }],
      lettura: "The area equals the base times the height: rows of squares times squares in each row.",
      quando: "For floors, walls to paint, fields, sheets of paper: whenever you need to “cover” a rectangle.",
      attenzione: "Base and height must use the same unit: if one is in metres and the other in centimetres, convert first." },
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
    genera: (r, l: Lingua = 'it') => { LINGUA = l;
      const b = r.intero(2, 15), h = r.intero(2, 12);
      return { testo: T(`Una stanza rettangolare misura ${b} m per ${h} m. Quanti m² di pavimento servono?`, `A rectangular room measures ${b} m by ${h} m. How many m² of flooring are needed?`), risposta: b * h, tolleranza: 0, unita: 'm²',
        passaggi: [`A = b · h`, `A = ${b} · ${h}`, `A = ${b * h} m²`] };
    },
  },
  {
    slug: 'percentuale', titolo: 'La percentuale di un numero', grado: 2, macro: 'numeri', lezione: 'numeri/percentuali',
    en: { titolo: "A percentage of a number", membri: [{ nome: "The result", significato: "The part you are looking for: the discount, the share, the piece." }, { nome: "The percentage", significato: "p out of 100: how many parts you take for every 100. 25% is 25/100 = 0.25." }, { nome: "The total", significato: "The whole number you take the percentage of: the full price, the whole class, the population." }],
      lettura: "p per cent of N is p hundredths of N.",
      quando: "Discounts, interest, statistics, marks, scaled-down recipes.",
      attenzione: "Two discounts in a row don’t add up: the second is worked out on the already discounted price." },
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
    genera: (r, l: Lingua = 'it') => { LINGUA = l;
      const p = r.scegli([5, 10, 15, 20, 25, 30, 40, 50, 75] as const), N = r.intero(2, 40) * 20;
      const x = (p / 100) * N;
      return { testo: T(`Quanto è il ${p}% di ${N}?`, `What is ${p}% of ${N}?`), risposta: x, tolleranza: 0.001,
        passaggi: [`x = p/100 · N`, `x = ${p}/100 · ${N}`, `x = ${n(p / 100)} · ${N} = ${n(x)}`] };
    },
  },
  {
    slug: 'proporzione', titolo: 'Il termine mancante di una proporzione', grado: 2, macro: 'numeri', lezione: 'numeri/proporzioni',
    en: { titolo: "The missing term of a proportion", membri: [{ nome: "First extreme", significato: "The first term: for example the number of people in the original recipe." }, { nome: "First mean", significato: "What corresponds to a: the flour for those people." }, { nome: "Second mean", significato: "The new situation: tonight’s guests." }, { nome: "Second extreme (unknown)", significato: "What you are looking for: the flour for tonight." }],
      lettura: "a is to b as c is to x. Product of the means = product of the extremes: a · x = b · c, so x = b · c / a.",
      quando: "Recipes, map scales, currency exchange: whenever two quantities are directly proportional.",
      attenzione: "First ask yourself whether the proportion is direct or inverse: more workers means fewer days, not more." },
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
    genera: (r, l: Lingua = 'it') => { LINGUA = l;
      const a = r.intero(2, 9), k = r.intero(2, 12), c = r.intero(2, 9) * a;
      const b = a * k, x = (b * c) / a;
      return { testo: T(`Trova x: ${a} : ${b} = ${c} : x`, `Find x: ${a} : ${b} = ${c} : x`), risposta: x, tolleranza: 0,
        passaggi: [`${a} · x = ${b} · ${c}`, `${a} · x = ${b * c}`, `x = ${b * c} ${T(':', '÷')} ${a} = ${x}`] };
    },
  },
  {
    slug: 'pitagora', titolo: 'Teorema di Pitagora', grado: 2, macro: 'geometria', lezione: 'geometria/teorema-di-pitagora',
    en: { titolo: "Pythagoras’ theorem", membri: [{ nome: "Hypotenuse squared", significato: "The area of the square built on the longest side, the one opposite the right angle." }, { nome: "First leg squared", significato: "The area of the square built on one of the two sides forming the right angle." }, { nome: "Second leg squared", significato: "The area of the square on the other side of the right angle." }],
      lettura: "In a right-angled triangle the square on the hypotenuse is as big as the two squares on the legs put together.",
      quando: "Diagonal distances: a ladder against a wall, a screen in inches, the distance between two points on a plane.",
      attenzione: "It only works for right-angled triangles. And the root of a sum is not the sum of the roots: √(9 + 16) = 5, not 3 + 4." },
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
    genera: (r, l: Lingua = 'it') => { LINGUA = l;
      const [p, q, h] = r.scegli([[3, 4, 5], [5, 12, 13], [8, 15, 17], [7, 24, 25], [20, 21, 29]] as const);
      const k = r.intero(1, 3);
      const a = p * k, b = q * k, c = h * k;
      if (r.intero(0, 1) === 0) {
        return { testo: T(`I cateti di un triangolo rettangolo misurano ${a} cm e ${b} cm. Quanto misura l’ipotenusa?`, `The legs of a right-angled triangle measure ${a} cm and ${b} cm. How long is the hypotenuse?`), risposta: c, tolleranza: 0, unita: 'cm',
          passaggi: [`c = √(a² + b²)`, `c = √(${a * a} + ${b * b})`, `c = √${c * c} = ${c} cm`] };
      }
      return { testo: T(`L’ipotenusa misura ${c} cm e un cateto ${a} cm. Quanto misura l’altro cateto?`, `The hypotenuse measures ${c} cm and one leg ${a} cm. How long is the other leg?`), risposta: b, tolleranza: 0, unita: 'cm',
        passaggi: [`b = √(c² − a²)`, `b = √(${c * c} − ${a * a})`, `b = √${b * b} = ${b} cm`] };
    },
  },
  {
    slug: 'area-cerchio', titolo: 'Area del cerchio', grado: 2, macro: 'geometria', lezione: 'geometria/cerchio-e-pi',
    en: { titolo: "Area of a circle", membri: [{ nome: "Area", significato: "The surface enclosed by the circumference." }, { nome: "Pi", significato: "About 3.14: how many times the diameter fits into the circumference. It’s the same for every circle." }, { nome: "Radius squared", significato: "The area of the square whose side is the radius. The circle holds about 3.14 of them." }],
      lettura: "The area of a circle is pi times the radius squared.",
      quando: "Pizzas, round tables, flower beds, pipe cross-sections.",
      attenzione: "Use the radius, not the diameter: if you’re given the diameter, divide it by 2." },
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
    genera: (r, l: Lingua = 'it') => { LINGUA = l;
      const usaDiametro = r.intero(0, 1) === 1;
      const raggio = r.intero(1, 12);
      const A = Math.round(3.14 * raggio * raggio * 100) / 100;
      const pi = T('3,14', '3.14'), div = T(':', '÷');
      return { testo: usaDiametro ? T(`Un cerchio ha diametro ${2 * raggio} cm. Calcola l’area (usa π = 3,14).`, `A circle has a diameter of ${2 * raggio} cm. Work out its area (use π = 3.14).`) : T(`Un cerchio ha raggio ${raggio} cm. Calcola l’area (usa π = 3,14).`, `A circle has a radius of ${raggio} cm. Work out its area (use π = 3.14).`),
        risposta: A, tolleranza: 0.01, unita: 'cm²',
        passaggi: [...(usaDiametro ? [`r = d ${div} 2 = ${2 * raggio} ${div} 2 = ${raggio} cm`] : []), `A = π · r²`, `A = ${pi} · ${raggio}² = ${pi} · ${raggio * raggio}`, `A = ${n(A)} cm²`] };
    },
  },
  {
    slug: 'equazione-primo-grado', titolo: 'Equazione di primo grado', grado: 3, macro: 'algebra', lezione: 'algebra/equazioni-primo-grado',
    en: { titolo: "Linear equation", membri: [{ nome: "Coefficient", significato: "How many times x appears: “three times a number” → a = 3." }, { nome: "Unknown", significato: "The mystery number to find." }, { nome: "Known term on the left", significato: "A number you already know that sits next to x." }, { nome: "Right-hand side", significato: "The value the whole left-hand side must have." }],
      lettura: "a times a number, plus b, makes c. Take b away from both sides, then divide by a: x = (c − b) ÷ a.",
      quando: "Any problem like “there’s a fixed cost plus a cost for each…”.",
      attenzione: "Whatever you do to one side you do to the other. A term that “moves across” changes sign." },
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
    genera: (r, l: Lingua = 'it') => { LINGUA = l;
      const a = r.intero(2, 9), x = r.intero(-9, 12), b = r.intero(-15, 15) || 3, c = a * x + b;
      return { testo: `${T('Risolvi', 'Solve')}: ${a}x ${segno(b)} = ${c}`, risposta: x, tolleranza: 0,
        passaggi: [`${a}x = ${c} ${segno(-b)}`, `${a}x = ${c - b}`, `x = ${c - b} ${T(':', '÷')} ${a} = ${x}`, `${T('Verifica', 'Check')}: ${a} · ${x} ${segno(b)} = ${c} ✔`] };
    },
  },
  {
    slug: 'quadrato-binomio', titolo: 'Quadrato del binomio', grado: 3, macro: 'algebra', lezione: 'algebra/prodotti-notevoli',
    en: { titolo: "Square of a binomial", membri: [{ nome: "The square of the binomial", significato: "The area of a square with side a + b." }, { nome: "Square of the first", significato: "The big square with side a." }, { nome: "Double product", significato: "The two a × b rectangles: the piece everyone forgets!" }, { nome: "Square of the second", significato: "The small square with side b." }],
      lettura: "Square of the first, plus twice the product, plus square of the second.",
      quando: "Mental arithmetic (31² = 900 + 60 + 1), simplifying, completing the square.",
      attenzione: "(a + b)² is not a² + b²: the two 2ab rectangles are missing." },
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
    genera: (r, l: Lingua = 'it') => { LINGUA = l;
      const t = r.intero(2, 9) * 10, u = r.intero(1, 4), meno = r.intero(0, 1) === 1;
      const v = meno ? t - u : t + u;
      return { testo: T(`Calcola a mente ${v}² usando il quadrato del binomio.`, `Work out ${v}² in your head using the square of a binomial.`), risposta: v * v, tolleranza: 0,
        passaggi: [`${v} = ${t} ${meno ? '−' : '+'} ${u}`, `${v}² = ${t}² ${meno ? '−' : '+'} 2 · ${t} · ${u} + ${u}²`, `= ${t * t} ${meno ? '−' : '+'} ${2 * t * u} + ${u * u}`, `= ${v * v}`] };
    },
  },
  {
    slug: 'formula-risolutiva', titolo: 'Formula risolutiva di secondo grado', grado: 3, macro: 'algebra', lezione: 'algebra/equazioni-secondo-grado',
    en: { titolo: "The quadratic formula", membri: [{ nome: "The solutions", significato: "The values that make ax² + bx + c = 0 true: where the parabola touches the x-axis." }, { nome: "The formula", significato: "−b: the coefficient of x with its sign changed. ±: once with +, once with −, for the two solutions. 2a: twice the coefficient of x²." }, { nome: "The discriminant", significato: "If it’s positive there are two solutions, if it’s zero one, if it’s negative none (among real numbers)." }],
      lettura: "x equals minus b plus or minus the square root of delta, all over two a.",
      quando: "Trajectories, areas with an unknown side, maximum and minimum problems.",
      attenzione: "Read a, b, c with their signs: in x² − 5x + 6 = 0, b = −5, so −b = +5." },
    membri: [
      { tex: 'x', nome: 'Le soluzioni', significato: 'I valori che rendono vera ax² + bx + c = 0: dove la parabola tocca l’asse x.' },
      { tex: '=' },
      { tex: '\\dfrac{-b \\pm \\sqrt{\\Delta}}{2a}', nome: 'La formula', significato: '−b: il coefficiente di x cambiato di segno. ±: una volta con +, una con −, per le due soluzioni. 2a: il doppio del coefficiente di x².' },
      { tex: '\\quad \\Delta = b^2 - 4ac', nome: 'Il discriminante', significato: 'Se è positivo ci sono due soluzioni, se è zero una, se è negativo nessuna (nei numeri reali).' },
    ],
    lettura: 'x uguale meno b più o meno radice di delta, tutto fratto due a.',
    quando: 'Traiettorie, aree con un lato incognito, problemi di massimo e minimo.',
    attenzione: 'Leggi a, b, c con il loro segno: in x² − 5x + 6 = 0 è b = −5, quindi −b = +5.',
    genera: (r, l: Lingua = 'it') => { LINGUA = l;
      let r1 = r.intero(-6, 8), r2 = r.intero(-6, 8);
      if (r1 === r2) r2 = r1 + 1;
      const b = -(r1 + r2), c = r1 * r2, D = b * b - 4 * c;
      const grande = Math.max(r1, r2), piccola = Math.min(r1, r2);
      return { testo: `${T('Risolvi', 'Solve')} x² ${b === 0 ? '' : segno(b) + 'x '}${segno(c)} = 0. ${T('Scrivi la soluzione più grande.', 'Write the larger solution.')}`, risposta: grande, tolleranza: 0,
        passaggi: [`a = 1, b = ${b}, c = ${c}`, `Δ = (${b})² − 4 · 1 · (${c}) = ${D}`, `x = (${-b} ± √${D}) / 2 = (${-b} ± ${Math.sqrt(D)}) / 2`, `x₁ = ${piccola}, x₂ = ${grande}`] };
    },
  },
  {
    slug: 'probabilita', titolo: 'Probabilità classica', grado: 2, macro: 'probabilita-statistica', lezione: 'probabilita-statistica/probabilita-classica',
    en: { titolo: "Classical probability", membri: [{ nome: "Probability", significato: "A number between 0 (impossible) and 1 (certain)." }, { nome: "Favourable over possible", significato: "f: the outcomes that suit you. n: all possible outcomes, as long as they are equally likely." }],
      lettura: "Probability is the number of favourable outcomes divided by the number of possible outcomes.",
      quando: "Dice, cards, draws, polls: whenever every outcome has the same chance.",
      attenzione: "It only works if the outcomes are equally likely. And chance has no memory." },
    membri: [
      { tex: 'P', nome: 'Probabilità', significato: 'Un numero tra 0 (impossibile) e 1 (certo).' },
      { tex: '=' },
      { tex: '\\dfrac{f}{n}', nome: 'Favorevoli su possibili', significato: 'f: i casi che ti vanno bene. n: tutti i casi possibili, purché ugualmente probabili.' },
    ],
    lettura: 'La probabilità è il numero dei casi favorevoli diviso il numero dei casi possibili.',
    quando: 'Dadi, carte, estrazioni, sondaggi: quando tutti i risultati hanno la stessa chance.',
    attenzione: 'Funziona solo se i casi sono ugualmente probabili. E il caso non ha memoria.',
    genera: (r, l: Lingua = 'it') => { LINGUA = l;
      const rosse = r.intero(1, 9), blu = r.intero(1, 11), tot = rosse + blu;
      return { testo: T(`In un sacchetto ci sono ${rosse} palline rosse e ${blu} blu. Qual è la probabilità di pescare una rossa? (scrivi un decimale, max 3 cifre)`, `A bag holds ${rosse} red balls and ${blu} blue ones. What is the probability of drawing a red one? (write a decimal, up to 3 digits)`),
        risposta: Math.round((rosse / tot) * 1000) / 1000, tolleranza: 0.001,
        passaggi: [`f = ${rosse} ${T('(le rosse)', '(the red ones)')}`, `n = ${rosse} + ${blu} = ${tot}`, `P = ${rosse}/${tot} ≈ ${n(rosse / tot, 3)}`] };
    },
  },
];

export const formula = (slug: string) => FORMULE.find((f) => f.slug === slug);

/** La formula con i testi nella lingua richiesta (i membri senza nome restano simboli). */
export function formulaL(f: Formula, l: Lingua): Formula {
  if (l === 'it') return f;
  let k = 0;
  const membri = f.membri.map((m) => (m.nome ? { ...m, ...f.en.membri[k++] } : m));
  const genera = (r: Rng) => { const prima = LINGUA; LINGUA = 'en'; try { return f.genera(r, 'en'); } finally { LINGUA = prima; } };
  return { ...f, titolo: f.en.titolo, membri, lettura: f.en.lettura, quando: f.en.quando, attenzione: f.en.attenzione, genera };
}
export const formuleL = (l: Lingua) => FORMULE.map((f) => formulaL(f, l));

export function serie(f: Formula, seme: number, quanti = 6, l: Lingua = 'it'): Esercizio[] {
  const r = creaRng(seme);
  LINGUA = l;
  const visti = new Set<string>();
  return Array.from({ length: quanti }, () => {
    let e = f.genera(r, l);
    for (let i = 0; i < 12 && visti.has(e.testo); i++) e = f.genera(r, l);
    visti.add(e.testo);
    return e;
  });
}

export function corretta(e: Esercizio, risposta: string): boolean {
  const v = Number(risposta.trim().replace(/\s/g, '').replace(',', '.'));
  return Number.isFinite(v) && Math.abs(v - e.risposta) <= e.tolleranza + 1e-9;
}
