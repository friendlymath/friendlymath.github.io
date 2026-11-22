/**
 * «Il tuo modo di studiare»: profili e regolazioni di accessibilità.
 * Fonti: British Dyslexia Association, Dyslexia Style Guide (2023); Legge 170/2010 e Linee guida DSA (DM 12/07/2011)
 * per strumenti compensativi e misure dispensative.
 * Sono dati sensibili (salute): restano SOLO nel browser, non entrano nella Pergamena e non vengono mai inviati.
 */

export const CHIAVE_STUDIO = 'friendlymath:studio';

export type Regolazione =
  | 'leggibile'   // carattere senza grazie, più grande, spaziature BDA, sfondo crema senza texture
  | 'leggimi'     // pulsante di sintesi vocale
  | 'righello'    // righello di lettura
  | 'strumenti'   // calcolatrice, tavola pitagorica, formulario sempre a portata
  | 'sfideBrevi'  // meno domande per sfida (stesso obiettivo)
  | 'tastierino'  // tastierino numerico grande nelle risposte
  | 'focus'       // lezione divisa in passi, uno alla volta
  | 'calmo'       // niente animazioni né effetti a sorpresa
  | 'letterale'   // niente scene narrative né ironia, con «cosa farai» all'inizio
  | 'essenziale'; // apre le lezioni nella versione essenziale

export type Profilo = 'dislessia' | 'discalculia' | 'disgrafia' | 'adhd' | 'autismo';

export const REGOLAZIONI: { id: Regolazione; nome: string; spiega: string }[] = [
  { id: 'leggibile', nome: 'Testo ad alta leggibilità', spiega: 'Carattere senza grazie e più grande, lettere e righe più distanziate, sfondo crema uniforme, niente corsivo né maiuscolo continuo.' },
  { id: 'leggimi', nome: 'Leggimi ad alta voce', spiega: 'Un pulsante legge la lezione con la voce del tuo dispositivo.' },
  { id: 'righello', nome: 'Righello di lettura', spiega: 'Una banda evidenzia la riga che stai leggendo e oscura il resto.' },
  { id: 'strumenti', nome: 'Strumenti di calcolo', spiega: 'Calcolatrice, tavola pitagorica e formulario sempre a portata di mano, anche durante le sfide.' },
  { id: 'sfideBrevi', nome: 'Sfide più brevi', spiega: 'Meno domande per sfida, stesso obiettivo: si riduce la quantità, non la qualità.' },
  { id: 'tastierino', nome: 'Tastierino grande', spiega: 'Per rispondere tocchi grandi tasti numerici invece di scrivere.' },
  { id: 'focus', nome: 'Modalità focus', spiega: 'La lezione si divide in passi brevi, uno alla volta, con una barra di avanzamento.' },
  { id: 'calmo', nome: 'Niente movimenti a sorpresa', spiega: 'Spegne animazioni automatiche, coriandoli e voli della mappa. Gli esperimenti partono solo se li avvii tu.' },
  { id: 'letterale', nome: 'Linguaggio diretto', spiega: 'Nasconde le scene di storia e l’ironia, e mostra all’inizio di ogni lezione cosa farai.' },
  { id: 'essenziale', nome: 'Lezioni essenziali', spiega: 'Le lezioni si aprono nella versione breve: idee chiave, un esempio, la sfida. La versione completa resta a un clic.' },
];

export const PROFILI: { id: Profilo; nome: string; descrizione: string; regolazioni: Regolazione[] }[] = [
  { id: 'dislessia', nome: 'Dislessia', descrizione: 'Leggere è faticoso o lento.', regolazioni: ['leggibile', 'leggimi', 'righello'] },
  { id: 'discalculia', nome: 'Discalculia', descrizione: 'I calcoli e i numeri non diventano automatici.', regolazioni: ['strumenti', 'sfideBrevi'] },
  { id: 'disgrafia', nome: 'Disgrafia e disortografia', descrizione: 'Scrivere a mano o digitare è difficile.', regolazioni: ['tastierino', 'leggibile'] },
  { id: 'adhd', nome: 'Attenzione (ADHD)', descrizione: 'Restare concentrati a lungo è difficile.', regolazioni: ['focus', 'calmo', 'sfideBrevi', 'essenziale'] },
  { id: 'autismo', nome: 'Autismo', descrizione: 'Preferisco istruzioni chiare, prevedibili e senza sorprese.', regolazioni: ['letterale', 'calmo'] },
];

export type ImpostazioniStudio = { profili: Profilo[]; regolazioni: Regolazione[] };

export const studioVuoto = (): ImpostazioniStudio => ({ profili: [], regolazioni: [] });

const regValide = new Set(REGOLAZIONI.map((r) => r.id));
const profValidi = new Set(PROFILI.map((p) => p.id));

export function validaStudio(o: unknown): ImpostazioniStudio {
  if (typeof o !== 'object' || o === null) return studioVuoto();
  const r = o as Record<string, unknown>;
  const profili = Array.isArray(r.profili) ? [...new Set(r.profili.filter((x): x is Profilo => profValidi.has(x as Profilo)))] : [];
  const regolazioni = Array.isArray(r.regolazioni) ? [...new Set(r.regolazioni.filter((x): x is Regolazione => regValide.has(x as Regolazione)))] : [];
  return { profili, regolazioni };
}

/** Attiva o disattiva un profilo: aggiunge le sue regolazioni (o toglie quelle che nessun altro profilo attivo richiede). */
export function cambiaProfilo(s: ImpostazioniStudio, p: Profilo, attivo: boolean): ImpostazioniStudio {
  const profili = attivo ? [...new Set([...s.profili, p])] : s.profili.filter((x) => x !== p);
  const daProfilo = (id: Profilo) => PROFILI.find((x) => x.id === id)!.regolazioni;
  let regolazioni: Regolazione[];
  if (attivo) regolazioni = [...new Set([...s.regolazioni, ...daProfilo(p)])];
  else {
    const ancoraRichieste = new Set(profili.flatMap(daProfilo));
    regolazioni = s.regolazioni.filter((r) => !daProfilo(p).includes(r) || ancoraRichieste.has(r));
  }
  return { profili, regolazioni };
}

export function cambiaRegolazione(s: ImpostazioniStudio, r: Regolazione, attiva: boolean): ImpostazioniStudio {
  return { ...s, regolazioni: attiva ? [...new Set([...s.regolazioni, r])] : s.regolazioni.filter((x) => x !== r) };
}

const storage = () => { try { return localStorage; } catch { return null; } };

export function caricaStudio(st: Storage | null = storage()): ImpostazioniStudio {
  try { const t = st?.getItem(CHIAVE_STUDIO); return t ? validaStudio(JSON.parse(t)) : studioVuoto(); } catch { return studioVuoto(); }
}

export function salvaStudio(s: ImpostazioniStudio, st: Storage | null = storage()): boolean {
  try { st!.setItem(CHIAVE_STUDIO, JSON.stringify(s)); return true; } catch { return false; }
}

export const ha = (r: Regolazione) => typeof document !== 'undefined' && document.documentElement.hasAttribute(`data-a-${r.toLowerCase()}`);

/** Movimento ridotto: preferenza di sistema oppure regolazione «calmo». */
export const movimentoRidotto = () =>
  (typeof matchMedia !== 'undefined' && matchMedia('(prefers-reduced-motion: reduce)').matches) || ha('calmo');

/** Applica le regolazioni come attributi su <html> (usato anche dallo script inline in <head>). */
export function applicaStudio(s: ImpostazioniStudio, el: HTMLElement = document.documentElement) {
  for (const r of REGOLAZIONI) el.toggleAttribute(`data-a-${r.id.toLowerCase()}`, s.regolazioni.includes(r.id));
}
