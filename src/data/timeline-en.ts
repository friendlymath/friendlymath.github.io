/** English texts for the timeline, keyed by the entry's year (same facts and sources as the Italian version). */
import { TIMELINE, type Tappa } from './timeline';

export const ERE_EN: Record<Tappa['era'], string> = {
  Preistoria: 'Prehistory', 'Antichità': 'Antiquity', Medioevo: 'Middle Ages', Rinascimento: 'Renaissance',
  'Età moderna': 'Early modern', Ottocento: '19th century', Novecento: '20th century', Oggi: 'Today',
};
type T = { quando: string; luogo: string; chi?: string; titolo: string; testo: string };
const EN: Record<number, T> = {
  [-20000]: { quando: 'about 20,000 years ago', luogo: 'Ishango (Congo)', titolo: 'The Ishango bone', testo: 'A bone with grouped notches, perhaps a counting tool. Its dating is debated (between about 20,000 and 25,000 years ago), but it is among the oldest objects connected with numbers.' },
  [-1800]: { quando: 'about 1800 BC', luogo: 'Babylon', titolo: 'The Babylonian tablets', testo: 'Babylonian scribes use a base-60 place-value system (we still use it for minutes and seconds) and know the triples we now call “Pythagorean”, about a thousand years before Pythagoras.' },
  [-1650]: { quando: 'about 1650 BC', luogo: 'Egypt', chi: 'Ahmes', titolo: 'The Rhind papyrus', testo: 'The scribe Ahmes copies 87 problems on fractions, equations, areas and the volumes of granaries. It is our main source on Egyptian mathematics.' },
  [-530]: { quando: '6th century BC', luogo: 'Samos and Croton', chi: 'Pythagoras', titolo: 'Pythagoras and his school', testo: 'The theorem was known before, but Pythagoras or his school may have been the first to prove it. The Pythagoreans also studied numerical ratios in music.' },
  [-300]: { quando: 'about 300 BC', luogo: 'Alexandria, Egypt', chi: 'Euclid', titolo: 'Euclid’s Elements', testo: 'Definitions, axioms, theorems and proofs: a model of reasoning that shaped mathematics for more than two thousand years.' },
  [-250]: { quando: '3rd century BC', luogo: 'Syracuse', chi: 'Archimedes', titolo: 'Archimedes and infinity', testo: 'He calculates areas and volumes with methods that anticipate calculus, and traps π between two polygons.' },
  [-240]: { quando: '3rd century BC', luogo: 'Alexandria, Egypt', chi: 'Eratosthenes', titolo: 'Measuring the Earth', testo: 'Eratosthenes estimates the size of the Earth using shadows and geometry, and invents a “sieve” for finding prime numbers.' },
  250: { quando: '3rd century', luogo: 'Alexandria, Egypt', chi: 'Diophantus', titolo: 'Diophantus’ Arithmetica', testo: 'Problems solved with numbers and an early use of algebraic abbreviations. Centuries later, in the margin of a copy of this very book, Fermat would write his “last theorem”.' },
  400: { quando: 'about 400', luogo: 'Alexandria, Egypt', chi: 'Hypatia', titolo: 'Hypatia of Alexandria', testo: 'She leads the Platonist school of Alexandria: the first woman whose important contribution to mathematics we know of. She dies in 415, killed by fanatics.' },
  480: { quando: '5th century', luogo: 'China', chi: 'Zu Chongzhi', titolo: 'π to six decimals', testo: 'Zu Chongzhi finds the approximation 355/113, correct to six decimal places.' },
  628: { quando: '628', luogo: 'India', chi: 'Brahmagupta', titolo: 'The rules of zero', testo: 'In the Brahmasphutasiddhanta he defines zero as a number minus itself and gives the rules for calculating with zero, “fortunes” (positives) and “debts” (negatives).' },
  820: { quando: '9th century', luogo: 'Baghdad', chi: 'al-Khwarizmi', titolo: 'Algebra is born', testo: 'His treatise al-jabr gives algebra its name; his Latinised name gives us the word “algorithm”.' },
  1202: { quando: '1202', luogo: 'Pisa', chi: 'Fibonacci', titolo: 'The Liber abaci', testo: 'Leonardo of Pisa brings Hindu-Arabic numerals and the place-value system to Europe. The book also contains the famous rabbit problem.' },
  1494: { quando: '1494', luogo: 'Venice', chi: 'Luca Pacioli', titolo: 'Pacioli’s Summa', testo: 'A summary of all the mathematics known at the time, which also helps spread double-entry bookkeeping.' },
  1545: { quando: '1545', luogo: 'Italy', chi: 'Gerolamo Cardano', titolo: 'The Ars Magna', testo: 'The first Latin treatise devoted entirely to algebra: it publishes the formulas for cubic and quartic equations (learned partly from Tartaglia).' },
  1614: { quando: '1614', luogo: 'Edinburgh', chi: 'John Napier', titolo: 'Logarithms', testo: 'They turn multiplications into additions: for centuries they make the great calculations of astronomers and navigators possible.' },
  1637: { quando: '1637', luogo: 'France', chi: 'René Descartes', titolo: 'Algebra meets geometry', testo: 'With La Géométrie shapes become equations and equations become shapes: coordinate geometry (the Cartesian plane) is born.' },
  1654: { quando: '1654', luogo: 'France', chi: 'Pascal and Fermat', titolo: 'Probability is born', testo: 'In a series of letters about a gambling problem, Pascal and Fermat lay the foundations of probability theory.' },
  1687: { quando: '1684–1687', luogo: 'England and Germany', chi: 'Newton and Leibniz', titolo: 'Calculus', testo: 'Leibniz publishes his differential calculus in 1684; Newton the Principia in 1687. Derivatives and integrals become the language of physics.' },
  1748: { quando: '1748', luogo: 'Berlin', chi: 'Leonhard Euler', titolo: 'Euler and functions', testo: 'The most prolific mathematician in history. In the Introductio in analysin infinitorum he puts the concept of function at the centre and links exponentials and trigonometry.' },
  1801: { quando: '1801', luogo: 'Germany', chi: 'Carl Friedrich Gauss', titolo: 'The “prince of mathematicians”', testo: 'He publishes the Disquisitiones arithmeticae, the foundation of modern number theory; later he also studies the method of least squares.' },
  1832: { quando: '1832', luogo: 'Paris', chi: 'Évariste Galois', titolo: 'Group theory', testo: 'Killed in a duel at twenty, he leaves the ideas that explain when an equation can be solved with roots: the study of symmetry is born.' },
  1843: { quando: '1843', luogo: 'Dublin and London', chi: 'Hamilton and Ada Lovelace', titolo: 'Quaternions and the first program', testo: 'Hamilton carves the quaternion formula on a bridge. In the same year Ada Lovelace publishes her notes on Babbage’s Analytical Engine, with what is considered a first program.' },
  1854: { quando: '1854', luogo: 'Ireland', chi: 'George Boole', titolo: 'Logic becomes algebra', testo: 'With The Laws of Thought reasoning becomes calculation with true and false: the basis of the circuits in every computer.' },
  1874: { quando: '1874', luogo: 'Germany', chi: 'Georg Cantor', titolo: 'Different infinities', testo: 'He founds set theory and discovers that some infinities are “bigger” than others.' },
  1900: { quando: '1900', luogo: 'Paris', chi: 'David Hilbert', titolo: 'The 23 problems', testo: 'At the International Congress in Paris he proposes a list of open problems that will steer research for the whole century.' },
  1918: { quando: '1918', luogo: 'Göttingen', chi: 'Emmy Noether', titolo: 'Symmetries and conservation laws', testo: 'Noether’s theorem links every symmetry in physics to a quantity that is conserved; then she revolutionises abstract algebra.' },
  1931: { quando: '1931', luogo: 'Vienna', chi: 'Kurt Gödel', titolo: 'The limits of proof', testo: 'The incompleteness theorems show that in any sufficiently rich system there are truths that cannot be proved within it.' },
  1936: { quando: '1936', luogo: 'Cambridge', chi: 'Alan Turing', titolo: 'The Turing machine', testo: 'He describes in the abstract what a machine can compute, before modern computers existed.' },
  1948: { quando: '1948', luogo: 'United States', chi: 'Claude Shannon', titolo: 'Information theory', testo: 'He measures information in bits and founds the mathematics of communication: Wi-Fi, phones and the internet start here.' },
  1976: { quando: '1976', luogo: 'United States', chi: 'Appel and Haken', titolo: 'Four colours are enough', testo: 'They prove that four colours are enough to colour any map: the first major theorem proved with the decisive help of a computer.' },
  1995: { quando: '1994–1995', luogo: 'Princeton', chi: 'Andrew Wiles', titolo: 'Fermat’s Last Theorem', testo: 'After more than 350 years, Wiles proves that xⁿ + yⁿ = zⁿ has no positive whole-number solutions for n > 2.' },
  2002: { quando: '2002–2003', luogo: 'St Petersburg', chi: 'Grigori Perelman', titolo: 'The Poincaré conjecture', testo: 'He solves one of the Millennium Prize Problems and turns down both the Fields Medal and the million-dollar prize.' },
  2014: { quando: '2014', luogo: 'Seoul', chi: 'Maryam Mirzakhani', titolo: 'The first Fields Medal awarded to a woman', testo: 'Awarded for her work on the geometry and dynamics of curved surfaces.' },
  2022: { quando: '2022', luogo: 'Helsinki', chi: 'Maryna Viazovska', titolo: 'Packing spheres in 8 dimensions', testo: 'The second woman to receive the Fields Medal, for proving the densest way to pack spheres in 8 dimensions (and, with colleagues, in 24).' },
};
export const TIMELINE_EN: Tappa[] = TIMELINE.map((t) => ({ ...t, ...EN[t.anno], link: t.link ? `/en${t.link}` : undefined }));
export const tappeSenzaTraduzione = () => TIMELINE.filter((t) => !EN[t.anno]).map((t) => t.anno);
