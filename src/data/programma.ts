/**
 * Il programma di matematica anno per anno.
 *
 * Fonti della struttura (consultate il 2026-11-22):
 * - Indicazioni nazionali per il curricolo del primo ciclo (DM 254/2012; nuove Indicazioni DM 221/2025, in vigore dall'11/02/2026):
 *   obiettivi al termine della 3ª e della 5ª primaria e della 3ª secondaria di primo grado.
 * - Indicazioni nazionali per i licei (DM 211/2010), liceo scientifico: primo biennio, secondo biennio, quinto anno.
 * - Indice dell'opera Bergamini, Trifone, Barozzi, «Matematica.verde», Zanichelli (volumetti A–P del primo biennio).
 * - Programmazioni pubblicate dalle scuole (curricoli verticali e programmazioni di dipartimento) per la ripartizione per classe,
 *   che le Indicazioni non fissano anno per anno.
 * La ripartizione è quindi una distribuzione tipica: ogni scuola può anticipare o posticipare alcuni argomenti.
 */

export type Argomento = { titolo: string; macro: string; lezione?: string };
export type Anno = { id: string; ciclo: string; classe: string; grado: number; nota?: string; argomenti: Argomento[] };

const a = (titolo: string, macro: string, lezione?: string): Argomento => ({ titolo, macro, lezione });

export const PROGRAMMA: Anno[] = [
  // ——— Scuola primaria ———
  { id: 'primaria-1', ciclo: 'Scuola primaria', classe: '1ª elementare', grado: 1, argomenti: [
    a('Contare in avanti e all’indietro', 'numeri'), a('I numeri fino a 20', 'numeri'), a('Maggiore, minore, uguale', 'numeri'),
    a('Addizioni e sottrazioni entro il 20', 'numeri'), a('Sopra, sotto, destra, sinistra: orientarsi nello spazio', 'geometria'),
    a('Riconoscere forme e figure', 'geometria'), a('Classificare e mettere in ordine', 'logica-insiemi'), a('Ritmi e sequenze', 'logica-insiemi'),
  ] },
  { id: 'primaria-2', ciclo: 'Scuola primaria', classe: '2ª elementare', grado: 1, argomenti: [
    a('I numeri fino a 100', 'numeri'), a('Unità e decine: il valore posizionale', 'numeri', 'numeri/valore-posizionale'),
    a('Addizioni e sottrazioni con il cambio', 'numeri', 'numeri/guardiano-villaggio'), a('La moltiplicazione come addizione ripetuta', 'numeri', 'numeri/tabelline'),
    a('Prime tabelline', 'numeri', 'numeri/tabelline'), a('Linee aperte, chiuse, rette e curve', 'geometria'), a('La simmetria', 'geometria'),
    a('Tabelle e grafici semplici', 'probabilita-statistica'), a('Certo, possibile, impossibile', 'probabilita-statistica'),
  ] },
  { id: 'primaria-3', ciclo: 'Scuola primaria', classe: '3ª elementare', grado: 1, argomenti: [
    a('Le migliaia', 'numeri', 'numeri/valore-posizionale'), a('Le quattro operazioni in colonna', 'numeri', 'numeri/guardiano-villaggio'),
    a('Tutte le tabelline', 'numeri', 'numeri/tabelline'), a('La divisione con il resto', 'numeri'), a('Prime frazioni', 'numeri', 'numeri/frazioni-equivalenti'),
    a('Numeri decimali e euro', 'numeri'), a('Figure piane e solidi', 'geometria'), a('Il perimetro', 'geometria'),
    a('Misure: metro, litro, chilogrammo', 'geometria'), a('Istogrammi e ideogrammi', 'probabilita-statistica'),
  ] },
  { id: 'primaria-4', ciclo: 'Scuola primaria', classe: '4ª elementare', grado: 1, argomenti: [
    a('I grandi numeri', 'numeri', 'numeri/valore-posizionale'), a('Proprietà delle operazioni', 'numeri'), a('Multipli e divisori', 'numeri'),
    a('Frazioni proprie, improprie, apparenti', 'numeri'), a('Frazioni equivalenti', 'numeri', 'numeri/frazioni-equivalenti'), a('La frazione di un numero', 'numeri'),
    a('Numeri decimali', 'numeri'), a('Equivalenze tra misure', 'geometria'), a('Poligoni e angoli', 'geometria'),
    a('Traslazioni, rotazioni, simmetrie', 'geometria'), a('Moda e media', 'probabilita-statistica'),
  ] },
  { id: 'primaria-5', ciclo: 'Scuola primaria', classe: '5ª elementare', grado: 1, argomenti: [
    a('Oltre il milione', 'numeri'), a('Le potenze', 'numeri', 'numeri/potenze'), a('I numeri negativi', 'numeri'),
    a('Le percentuali', 'numeri', 'numeri/percentuali'), a('Divisioni con i decimali', 'numeri'), a('Le aree dei poligoni', 'geometria'),
    a('Circonferenza e cerchio', 'geometria', 'geometria/cerchio-e-pi'), a('Il piano cartesiano', 'geometria'), a('Media, moda e mediana', 'probabilita-statistica'),
    a('Prime probabilità', 'probabilita-statistica', 'probabilita-statistica/probabilita-classica'), a('Numeri di altri popoli e tempi', 'numeri'),
  ] },
  // ——— Scuola secondaria di primo grado ———
  { id: 'medie-1', ciclo: 'Scuola media', classe: '1ª media', grado: 2, argomenti: [
    a('Insiemi', 'logica-insiemi'), a('Il sistema di numerazione decimale', 'numeri', 'numeri/valore-posizionale'), a('Le quattro operazioni e le espressioni', 'numeri'),
    a('Le potenze e le loro proprietà', 'numeri', 'numeri/potenze'), a('Criteri di divisibilità', 'numeri'), a('Numeri primi e scomposizione', 'numeri'),
    a('MCD e mcm', 'numeri'), a('Le frazioni e le loro operazioni', 'numeri', 'numeri/frazioni-equivalenti'),
    a('Punti, rette, piani, segmenti, angoli', 'geometria'), a('Triangoli e quadrilateri', 'geometria'), a('Indagini statistiche', 'probabilita-statistica'),
  ] },
  { id: 'medie-2', ciclo: 'Scuola media', classe: '2ª media', grado: 2, argomenti: [
    a('Dalle frazioni ai numeri decimali', 'numeri'), a('La radice quadrata', 'numeri'), a('Rapporti e proporzioni', 'numeri', 'numeri/proporzioni'),
    a('Proporzionalità diretta e inversa', 'funzioni-analisi', 'numeri/proporzioni'), a('Percentuali, sconti e interessi', 'numeri', 'numeri/percentuali'),
    a('Le aree dei poligoni', 'geometria'), a('Il teorema di Pitagora', 'geometria', 'geometria/teorema-di-pitagora'),
    a('Similitudine e teorema di Talete', 'geometria'), a('Le trasformazioni geometriche', 'geometria'),
  ] },
  { id: 'medie-3', ciclo: 'Scuola media', classe: '3ª media', grado: 2, argomenti: [
    a('I numeri relativi', 'numeri'), a('Il calcolo letterale: monomi e polinomi', 'algebra'), a('Equazioni di primo grado', 'algebra', 'algebra/equazioni-primo-grado'),
    a('Funzioni e piano cartesiano: y = ax e y = a/x', 'funzioni-analisi'), a('Circonferenza e cerchio: lunghezza e area', 'geometria', 'geometria/cerchio-e-pi'),
    a('Solidi: superfici e volumi', 'geometria'), a('Probabilità', 'probabilita-statistica', 'probabilita-statistica/probabilita-classica'),
    a('Media, moda, mediana', 'probabilita-statistica'),
  ] },
  // ——— Scuola secondaria di secondo grado (riferimento: liceo scientifico) ———
  { id: 'superiori-1', ciclo: 'Scuola superiore', classe: '1ª superiore', grado: 3, nota: 'Riferimento: liceo scientifico. Altri indirizzi trattano gli stessi temi con meno approfondimento.', argomenti: [
    a('Insiemi e logica', 'logica-insiemi'), a('Numeri naturali, interi, razionali', 'numeri'), a('Monomi e polinomi', 'algebra'),
    a('Prodotti notevoli', 'algebra', 'algebra/prodotti-notevoli'), a('Scomposizione in fattori', 'algebra'), a('Frazioni algebriche', 'algebra'),
    a('Equazioni di primo grado', 'algebra', 'algebra/equazioni-primo-grado'), a('Disequazioni di primo grado', 'algebra'),
    a('Geometria euclidea: triangoli e congruenza', 'geometria'), a('Rette parallele e perpendicolari', 'geometria'), a('Statistica descrittiva', 'probabilita-statistica'),
  ] },
  { id: 'superiori-2', ciclo: 'Scuola superiore', classe: '2ª superiore', grado: 3, argomenti: [
    a('Sistemi lineari', 'algebra'), a('La retta nel piano cartesiano', 'funzioni-analisi'), a('I radicali', 'numeri'),
    a('Equazioni di secondo grado', 'algebra', 'algebra/equazioni-secondo-grado'), a('Disequazioni di secondo grado', 'algebra'), a('La parabola', 'funzioni-analisi'),
    a('Circonferenza e poligoni inscritti', 'geometria'), a('Equivalenza, teoremi di Pitagora ed Euclide', 'geometria', 'geometria/teorema-di-pitagora'),
    a('Similitudine e Talete', 'geometria'), a('Probabilità classica', 'probabilita-statistica', 'probabilita-statistica/probabilita-classica'),
  ] },
  { id: 'superiori-3', ciclo: 'Scuola superiore', classe: '3ª superiore', grado: 4, argomenti: [
    a('Equazioni e disequazioni con modulo e irrazionali', 'algebra'), a('Le funzioni e le loro proprietà', 'funzioni-analisi'),
    a('Geometria analitica: retta e parabola', 'funzioni-analisi'), a('Circonferenza, ellisse, iperbole', 'geometria'),
    a('Successioni e progressioni', 'funzioni-analisi'), a('Statistica: correlazione e regressione', 'probabilita-statistica'),
  ] },
  { id: 'superiori-4', ciclo: 'Scuola superiore', classe: '4ª superiore', grado: 4, argomenti: [
    a('Esponenziali e logaritmi', 'funzioni-analisi'), a('Goniometria', 'geometria'), a('Trigonometria', 'geometria'),
    a('Numeri complessi', 'strutture-avanzate'), a('Geometria nello spazio', 'geometria'), a('Calcolo combinatorio', 'probabilita-statistica'),
    a('Probabilità condizionata e formula di Bayes', 'probabilita-statistica'),
  ] },
  { id: 'superiori-5', ciclo: 'Scuola superiore', classe: '5ª superiore', grado: 4, argomenti: [
    a('Limiti e continuità', 'funzioni-analisi'), a('Derivate', 'funzioni-analisi'), a('Studio di funzione', 'funzioni-analisi'),
    a('Integrali', 'funzioni-analisi'), a('Equazioni differenziali', 'funzioni-analisi'), a('Distribuzioni di probabilità', 'probabilita-statistica'),
    a('Geometria analitica nello spazio', 'geometria'),
  ] },
  // ——— Università e oltre ———
  { id: 'universita', ciclo: 'Università', classe: 'Primi anni', grado: 5, nota: 'Corsi tipici di Analisi, Algebra lineare e Probabilità nelle lauree scientifiche e di ingegneria.', argomenti: [
    a('Successioni e serie', 'funzioni-analisi'), a('Limiti, derivate e integrali (rigore)', 'funzioni-analisi'), a('Vettori e spazi vettoriali', 'algebra-lineare'),
    a('Matrici, determinanti e sistemi lineari', 'algebra-lineare'), a('Autovalori e autovettori', 'algebra-lineare'), a('Funzioni di più variabili', 'funzioni-analisi'),
    a('Probabilità e variabili aleatorie', 'probabilita-statistica'),
  ] },
  { id: 'avanzato', ciclo: 'Matematica avanzata', classe: 'Oltre', grado: 6, argomenti: [
    a('Numeri complessi e piano di Gauss', 'strutture-avanzate'), a('Quaternioni e rotazioni nello spazio', 'strutture-avanzate'),
    a('Gruppi e simmetrie', 'strutture-avanzate'), a('Topologia: la forma senza misure', 'strutture-avanzate'), a('Teoria dei numeri', 'numeri'),
  ] },
];

export const FONTI_PROGRAMMA = [
  { titolo: 'Indicazioni nazionali per il curricolo della scuola dell’infanzia e del primo ciclo d’istruzione (2012)', url: 'https://www.mim.gov.it/documents/20182/51310/DM+254_2012.pdf', editore: 'Ministero dell’Istruzione e del Merito' },
  { titolo: 'Nuove Indicazioni nazionali per il curricolo, primo ciclo (2025)', url: 'https://www.mim.gov.it/documents/20182/10554370/curricolo_web.pdf/', editore: 'Ministero dell’Istruzione e del Merito' },
  { titolo: 'Indicazioni curricolari e normativa (licei: DM 211/2010)', url: 'https://umi.dm.unibo.it/indicazioni-nazionali-prima-del-2026/', editore: 'Unione Matematica Italiana' },
  { titolo: 'Matematica nei licei: le Indicazioni nazionali in sintesi', url: 'https://www.zanichelli.it/assets/download/media-pds-sup-materie_matematica_licei-pdf', editore: 'Zanichelli' },
  { titolo: 'Bergamini, Trifone, Barozzi – Matematica.verde, primo biennio: indice dei volumetti', url: 'https://online.scuola.zanichelli.it/bergaminiverde/bergaminiverde-primo-biennio/i-tuoi-contenuti/', editore: 'Zanichelli' },
];
