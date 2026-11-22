/**
 * Geografia della mappa del Cammino (coordinate nel viewBox 1600×1000).
 * Ogni regione ha un centro, le posizioni delle stanze (in ordine) e la "porta" dove sta il Guardiano.
 */
export type Punto = [number, number];
export type RegioneMappa = {
  numero: number;
  centro: Punto;
  raggioNebbia: number;
  testoNebbia: Punto;
  etichetta: Punto;
  posti: Punto[];
  porta: Punto;
};

export const LARGHEZZA = 1600;
export const ALTEZZA = 1000;

export const REGIONI_MAPPA: RegioneMappa[] = [
  { numero: 1, centro: [270, 790], raggioNebbia: 160, testoNebbia: [270, 790], etichetta: [250, 965], porta: [455, 700],
    posti: [[150, 880], [250, 820], [345, 860], [205, 735], [315, 745], [400, 800]] },
  { numero: 2, centro: [585, 660], raggioNebbia: 160, testoNebbia: [625, 690], etichetta: [590, 860], porta: [745, 540],
    posti: [[505, 770], [585, 705], [665, 760], [520, 625], [625, 610], [700, 680]] },
  { numero: 3, centro: [860, 420], raggioNebbia: 165, testoNebbia: [860, 430], etichetta: [860, 205], porta: [1010, 560],
    posti: [[800, 520], [870, 470], [945, 505], [775, 395], [880, 345], [960, 420]] },
  { numero: 4, centro: [1130, 720], raggioNebbia: 165, testoNebbia: [1130, 730], etichetta: [1130, 955], porta: [1290, 590],
    posti: [[1060, 650], [1110, 740], [1200, 790], [1040, 810], [1205, 690], [1290, 760]] },
  { numero: 5, centro: [1340, 410], raggioNebbia: 150, testoNebbia: [1340, 410], etichetta: [1345, 570], porta: [1440, 245],
    posti: [[1250, 470], [1320, 420], [1400, 460], [1275, 350], [1370, 320], [1460, 380]] },
  { numero: 6, centro: [1420, 120], raggioNebbia: 150, testoNebbia: [1420, 125], etichetta: [1430, 250], porta: [1555, 70],
    posti: [[1310, 160], [1390, 110], [1470, 150], [1345, 60], [1450, 45], [1540, 170]] },
];

/** Il sentiero principale: dalla spiaggia del Villaggio fino ai Cieli. */
export const SENTIERO =
  'M60 960 C140 930 160 880 250 820 S380 780 455 700 S560 700 585 660 S700 600 745 540 ' +
  'S820 470 860 420 S960 470 1010 560 S1080 700 1130 720 S1250 650 1290 590 S1320 470 1340 410 ' +
  'S1410 300 1440 245 S1430 150 1420 120 S1500 70 1555 70';

export const regioneMappa = (n: number) => REGIONI_MAPPA.find((r) => r.numero === n)!;
