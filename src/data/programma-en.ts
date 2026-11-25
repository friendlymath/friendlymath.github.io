/** English labels for the year-by-year curriculum (the structure is the Italian school system, with ages). */
import { PROGRAMMA, type Anno } from './programma';

const CICLI: Record<string, string> = {
  'Scuola primaria': 'Primary school (ages 6–11)', 'Scuola media': 'Lower secondary school (ages 11–14)',
  'Scuola superiore': 'Upper secondary school (ages 14–19)', 'Università': 'University', 'Matematica avanzata': 'Advanced mathematics',
};
const CLASSI: Record<string, string> = {
  'primaria-1': 'Primary, year 1 · age 6–7', 'primaria-2': 'Primary, year 2 · age 7–8', 'primaria-3': 'Primary, year 3 · age 8–9',
  'primaria-4': 'Primary, year 4 · age 9–10', 'primaria-5': 'Primary, year 5 · age 10–11',
  'medie-1': 'Lower secondary, year 1 · age 11–12', 'medie-2': 'Lower secondary, year 2 · age 12–13', 'medie-3': 'Lower secondary, year 3 · age 13–14',
  'superiori-1': 'Upper secondary, year 1 · age 14–15', 'superiori-2': 'Upper secondary, year 2 · age 15–16', 'superiori-3': 'Upper secondary, year 3 · age 16–17',
  'superiori-4': 'Upper secondary, year 4 · age 17–18', 'superiori-5': 'Upper secondary, year 5 · age 18–19',
  universita: 'First years', avanzato: 'Beyond',
};
const NOTE: Record<string, string> = {
  'superiori-1': 'Reference: Italian scientific lyceum. Other upper secondary schools cover the same topics in less depth.',
  universita: 'Typical Calculus, Linear algebra and Probability courses in science and engineering degrees.',
};
const TITOLI: Record<string, string> = {
  'Contare in avanti e all’indietro': 'Counting forwards and backwards', 'I numeri fino a 20': 'Numbers up to 20', 'Maggiore, minore, uguale': 'Greater than, less than, equal to',
  'Addizioni e sottrazioni entro il 20': 'Adding and subtracting within 20', 'Sopra, sotto, destra, sinistra: orientarsi nello spazio': 'Above, below, right, left: finding your way in space',
  'Riconoscere forme e figure': 'Recognising shapes and figures', 'Classificare e mettere in ordine': 'Sorting and ordering', 'Ritmi e sequenze': 'Patterns and sequences',
  'I numeri fino a 100': 'Numbers up to 100', 'Unità e decine: il valore posizionale': 'Ones and tens: place value',
  'Addizioni e sottrazioni con il cambio': 'Adding and subtracting with carrying and borrowing', 'La moltiplicazione come addizione ripetuta': 'Multiplication as repeated addition',
  'Prime tabelline': 'First times tables', 'Linee aperte, chiuse, rette e curve': 'Open, closed, straight and curved lines', 'La simmetria': 'Symmetry',
  'Tabelle e grafici semplici': 'Simple tables and charts', 'Certo, possibile, impossibile': 'Certain, possible, impossible',
  'Le migliaia': 'Thousands', 'Le quattro operazioni in colonna': 'The four operations in columns', 'Tutte le tabelline': 'All the times tables',
  'La divisione con il resto': 'Division with remainder', 'Prime frazioni': 'First fractions', 'Numeri decimali e euro': 'Decimal numbers and money',
  'Figure piane e solidi': 'Flat shapes and solids', 'Il perimetro': 'Perimeter', 'Misure: metro, litro, chilogrammo': 'Measures: metre, litre, kilogram',
  'Istogrammi e ideogrammi': 'Bar charts and pictograms', 'I grandi numeri': 'Large numbers', 'Proprietà delle operazioni': 'Properties of operations',
  'Multipli e divisori': 'Multiples and divisors', 'Frazioni proprie, improprie, apparenti': 'Proper, improper and whole-number fractions',
  'Frazioni equivalenti': 'Equivalent fractions', 'La frazione di un numero': 'A fraction of a number', 'Numeri decimali': 'Decimal numbers',
  'Equivalenze tra misure': 'Converting between units', 'Poligoni e angoli': 'Polygons and angles', 'Traslazioni, rotazioni, simmetrie': 'Translations, rotations, reflections',
  'Moda e media': 'Mode and mean', 'Oltre il milione': 'Beyond a million', 'Le potenze': 'Powers', 'I numeri negativi': 'Negative numbers',
  'Le percentuali': 'Percentages', 'Divisioni con i decimali': 'Dividing with decimals', 'Le aree dei poligoni': 'Areas of polygons',
  'Circonferenza e cerchio': 'Circumference and circle', 'Il piano cartesiano': 'The Cartesian plane', 'Media, moda e mediana': 'Mean, mode and median',
  'Prime probabilità': 'First steps in probability', 'Numeri di altri popoli e tempi': 'Numbers from other peoples and times',
  'Insiemi': 'Sets', 'Il sistema di numerazione decimale': 'The decimal number system', 'Le quattro operazioni e le espressioni': 'The four operations and expressions',
  'Le potenze e le loro proprietà': 'Powers and their properties', 'Criteri di divisibilità': 'Divisibility rules', 'Numeri primi e scomposizione': 'Prime numbers and factorisation',
  'MCD e mcm': 'GCD and LCM', 'Le frazioni e le loro operazioni': 'Fractions and their operations', 'Punti, rette, piani, segmenti, angoli': 'Points, lines, planes, segments, angles',
  'Triangoli e quadrilateri': 'Triangles and quadrilaterals', 'Indagini statistiche': 'Statistical surveys', 'Dalle frazioni ai numeri decimali': 'From fractions to decimals',
  'La radice quadrata': 'Square roots', 'Rapporti e proporzioni': 'Ratios and proportions', 'Proporzionalità diretta e inversa': 'Direct and inverse proportion',
  'Percentuali, sconti e interessi': 'Percentages, discounts and interest', 'Il teorema di Pitagora': 'Pythagoras’ theorem',
  'Similitudine e teorema di Talete': 'Similarity and Thales’ theorem', 'Le trasformazioni geometriche': 'Geometric transformations',
  'I numeri relativi': 'Positive and negative numbers', 'Il calcolo letterale: monomi e polinomi': 'Algebraic expressions: monomials and polynomials',
  'Equazioni di primo grado': 'Linear equations', 'Funzioni e piano cartesiano: y = ax e y = a/x': 'Functions and the Cartesian plane: y = ax and y = a/x',
  'Circonferenza e cerchio: lunghezza e area': 'Circumference and circle: length and area', 'Solidi: superfici e volumi': 'Solids: surface areas and volumes',
  'Probabilità': 'Probability', 'Media, moda, mediana': 'Mean, mode, median', 'Insiemi e logica': 'Sets and logic',
  'Numeri naturali, interi, razionali': 'Natural numbers, integers, rationals', 'Monomi e polinomi': 'Monomials and polynomials', 'Prodotti notevoli': 'Special products',
  'Scomposizione in fattori': 'Factorisation', 'Frazioni algebriche': 'Algebraic fractions', 'Disequazioni di primo grado': 'Linear inequalities',
  'Geometria euclidea: triangoli e congruenza': 'Euclidean geometry: triangles and congruence', 'Rette parallele e perpendicolari': 'Parallel and perpendicular lines',
  'Statistica descrittiva': 'Descriptive statistics', 'Sistemi lineari': 'Systems of linear equations', 'La retta nel piano cartesiano': 'The straight line in the Cartesian plane',
  'I radicali': 'Surds and radicals', 'Equazioni di secondo grado': 'Quadratic equations', 'Disequazioni di secondo grado': 'Quadratic inequalities', 'La parabola': 'The parabola',
  'Circonferenza e poligoni inscritti': 'Circles and inscribed polygons', 'Equivalenza, teoremi di Pitagora ed Euclide': 'Equal areas, Pythagoras’ and Euclid’s theorems',
  'Similitudine e Talete': 'Similarity and Thales', 'Probabilità classica': 'Classical probability',
  'Equazioni e disequazioni con modulo e irrazionali': 'Equations and inequalities with absolute values and roots', 'Le funzioni e le loro proprietà': 'Functions and their properties',
  'Geometria analitica: retta e parabola': 'Coordinate geometry: line and parabola', 'Circonferenza, ellisse, iperbole': 'Circle, ellipse, hyperbola',
  'Successioni e progressioni': 'Sequences and progressions', 'Statistica: correlazione e regressione': 'Statistics: correlation and regression',
  'Esponenziali e logaritmi': 'Exponentials and logarithms', 'Goniometria': 'Trigonometric functions', 'Trigonometria': 'Trigonometry', 'Numeri complessi': 'Complex numbers',
  'Geometria nello spazio': 'Solid geometry', 'Calcolo combinatorio': 'Combinatorics', 'Probabilità condizionata e formula di Bayes': 'Conditional probability and Bayes’ formula',
  'Limiti e continuità': 'Limits and continuity', 'Derivate': 'Derivatives', 'Studio di funzione': 'Curve sketching', 'Integrali': 'Integrals',
  'Equazioni differenziali': 'Differential equations', 'Distribuzioni di probabilità': 'Probability distributions', 'Geometria analitica nello spazio': 'Coordinate geometry in space',
  'Successioni e serie': 'Sequences and series', 'Limiti, derivate e integrali (rigore)': 'Limits, derivatives and integrals (with rigour)',
  'Vettori e spazi vettoriali': 'Vectors and vector spaces', 'Matrici, determinanti e sistemi lineari': 'Matrices, determinants and linear systems',
  'Autovalori e autovettori': 'Eigenvalues and eigenvectors', 'Funzioni di più variabili': 'Functions of several variables',
  'Probabilità e variabili aleatorie': 'Probability and random variables', 'Numeri complessi e piano di Gauss': 'Complex numbers and the complex plane',
  'Quaternioni e rotazioni nello spazio': 'Quaternions and rotations in space', 'Gruppi e simmetrie': 'Groups and symmetries',
  'Topologia: la forma senza misure': 'Topology: shape without measurement', 'Teoria dei numeri': 'Number theory',
};

export const titoloEn = (t: string) => TITOLI[t] ?? t;
export const PROGRAMMA_EN: Anno[] = PROGRAMMA.map((a) => ({
  ...a, ciclo: CICLI[a.ciclo] ?? a.ciclo, classe: CLASSI[a.id] ?? a.classe, nota: a.nota ? NOTE[a.id] ?? a.nota : undefined,
  argomenti: a.argomenti.map((x) => ({ ...x, titolo: titoloEn(x.titolo) })),
}));
/** Titoli senza traduzione: usato dai test per non lasciare buchi. */
export const titoliMancanti = () => PROGRAMMA.flatMap((a) => a.argomenti).filter((x) => !(x.titolo in TITOLI)).map((x) => x.titolo);
