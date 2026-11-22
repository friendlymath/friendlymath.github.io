# FriendlyMath — documento di progetto

Data: 2026-11-22 · Stato: bozza da approvare

## 1. Intento

Un sito di matematica **per chiunque**, dalle elementari alla matematica avanzata (fino a numeri complessi, quaternioni, gruppi, topologia). Deve togliere la paura della matematica: niente spiegazioni noiose, molta gamification, tanti esempi pratici, animazioni ed esperimenti. Grafica colorata e simpatica che però trasmetta sicurezza (affidabilità, chiarezza), non seriosa.

Il cuore è una **scelta in homepage** tra due modi di studiare gli stessi contenuti:

- **Il Libro** (sinistra): indice classico per argomenti e sottoargomenti, come un manuale.
- **Il Cammino** (destra): percorso a tappe narrativo ("viaggio dell'eroe"), fatto di **stanze** — sfrutta il metodo dei loci: ogni concetto è legato a un luogo.

Pubblicato su GitHub Pages (`https://friendlymath.github.io`), costo zero, nessun dato personale raccolto.

## 2. Obiettivi, non-obiettivi, anti-obiettivi

**Obiettivi**
- Struttura che regga centinaia di lezioni, riempite a ondate nel tempo.
- Ogni argomento scritto **una sola volta**, mostrato sia nel Libro sia nel Cammino.
- Progressi salvati senza account; trasferibili con un file (la Pergamena).
- Italiano ora; architettura già pronta per l'inglese (traduzioni dopo).
- Mappe mentali in JSON per ogni macroargomento, apribili ed esplorabili.
- Sezioni dedicate: Curiosità (sempre con fonte citata), Storia della matematica, Esperimenti/animazioni.

**Non-obiettivi (per ora)**
- Traduzione inglese dei contenuti (solo predisposizione).
- Account, login, classifiche, backend, analytics.
- Copertura completa degli argomenti nella prima consegna.

**Anti-obiettivi (sarebbe un fallimento anche se "funziona")**
- Contenuti copiati dai siti di riferimento (matepratica.it, youmath.it, matematika.it): sono **solo ispirazione** per struttura ed esempi; i testi sono originali; si linkano come approfondimento e si citano quando se ne prende un'idea.
- Curiosità o fatti storici senza fonte verificabile, o fonti inventate.
- Tono che fa sentire stupido chi non sa (il nemico è la confusione, non la persona).
- Grafica infantile o, all'opposto, accademica e fredda.
- Raccolta di qualsiasi dato dell'utente.

## 3. Mondo narrativo

**Tono**: epico ma ironico, alla maniera di un film d'animazione che prende in giro i propri cliché; simpatico, mai ingenuo. Personaggi e mondo originali.

**Il Regno di Numeria** è invaso dalla **Nebbia**: dove passa, si dimentica come contare, misurare, ragionare. L'eroe libera una regione per grado.

| Grado | Equipaggiamento | Regione | Fase di studio |
|---|---|---|---|
| 1 Recluta | bastone | Villaggio delle Cifre | elementari |
| 2 Scudiero | fionda e scudo di legno | Bosco delle Frazioni | medie |
| 3 Guerriero | spada corta | Montagne dell'Algebra | biennio superiori |
| 4 Cavaliere | armatura e cavallo | Valle delle Funzioni (+ Torre dell'Infinito) | triennio / maturità |
| 5 Paladino | spada lunga e stendardo | Città dei Vettori | primi anni università |
| 6 Cavaliere alato | cavallo alato | Cieli Immaginari | avanzato |

**Aiutanti**: la Civetta guida (saggia ma pasticciona, sbaglia e si corregge), il Fabbro brontolone (forgia formule e trucchi), i matematici storici (fatti reali, con fonte).

**Distrattori** — ognuno incarna un errore tipico o un atteggiamento che blocca: Mercante di Scorciatoie (regole sbagliate comode), Menestrello del "Non sono portato", Gnomo Copione (soluzione pronta), Barone del Panico (problema che sembra enorme), Sirena del Dopo (procrastinazione).

**Struttura di una stanza**: scena (poche righe) → lezione con esempi e animazioni → un distrattore propone l'errore tipico dell'argomento, l'eroe lo smaschera → sfida finale (quiz, mini-gioco o esercizio travestito). Superata la sfida, la stanza è conquistata.

## 4. Approcci considerati

| Approccio | Pro | Contro | Esito |
|---|---|---|---|
| HTML/CSS/JS scritto a mano | zero strumenti | ingestibile con centinaia di pagine e due lingue | scartato |
| Jekyll nativo GitHub Pages | zero configurazione | componenti interattivi nelle lezioni scomodi, i18n macchinoso | scartato |
| **Astro + MDX, build con GitHub Actions** | contenuti come file di testo con metadati, componenti interattivi nelle lezioni, i18n nativo, sito statico gratuito | un passaggio di build (automatico) | **scelto** (scelta di Claude: l'utente ha delegato la parte tecnica) |

## 5. Architettura

- **Generatore**: Astro (ultima versione stabile), output statico, pubblicato da GitHub Actions su GitHub Pages.
- **Contenuti**: Content Collections di Astro.
  - `src/content/lezioni/it/<macroargomento>/<slug>.mdx` — una lezione = un file. Frontmatter: `titolo`, `macroargomento`, `sottoargomento`, `grado` (1–6), `regione`, `stanza` (ordine nel Cammino), `prerequisiti` (slug), `distrattore`, `fonti` (lista di riferimenti per idee prese altrove), `stato` (`bozza`/`pubblicata`).
  - `src/content/curiosita/it/*.mdx` — ogni curiosità ha `fonti` **obbligatorie** (titolo, URL, autore/editore, data di consultazione). La validazione dello schema fa fallire la build se mancano.
  - `src/content/storia/it/*.mdx` — schede storiche (personaggio/epoca), stesse regole sulle fonti.
  - `src/data/mappe/<macroargomento>.json` — mappe mentali in formato jsMind (`node_tree`).
- **Il Libro** e **il Cammino** sono due viste generate dalla stessa collezione: il Libro ordina per macroargomento → sottoargomento; il Cammino per grado → regione → stanza.
- **Componenti MDX riutilizzabili** (inseribili in qualunque lezione): `Esempio` (riquadro colorato esempio pratico), `Curiosita` (box), `Attenzione` (errore tipico / distrattore), `Scena` (testo narrativo con personaggio), `Sfida` (quiz a risposta multipla o numerica, con feedback), `Grafico` (JSXGraph), `Animazione` (SVG + JS), `Formula` (KaTeX).
- **Formule**: KaTeX via remark-math/rehype-katex.
- **Progressi** (solo client): `localStorage` con chiave unica. Struttura: `{ versione, stanzeConquistate: [slug], badge: [id], grado, aggiornato }`. Nessun dato personale.
  - **Pergamena**: pulsanti "Salva la Pergamena" (scarica `.json`) e "Riprendi il cammino" (carica e valida il file, con unione o sostituzione). Sempre accessibili dallo **Zaino dell'eroe** in alto a destra; spiegati in FAQ; promemoria discreto al passaggio di grado.
  - Limite accettato: il file è modificabile a mano (nessuna classifica, quindi irrilevante).
- **i18n**: routing Astro con `it` predefinita; struttura cartelle per lingua già pronta; testi dell'interfaccia in un file di dizionario.
- **Accessibilità**: contrasto AA, navigazione da tastiera, `prefers-reduced-motion` rispettato dalle animazioni, testi alternativi.

### 5.1 Decisioni di dettaglio (scelte di Claude, da verificare)

- **Macroargomenti** (lista fissa, determina cartelle, URL e mappe mentali): `numeri` (Numeri e aritmetica), `geometria`, `algebra`, `funzioni-analisi`, `probabilita-statistica`, `logica-insiemi`, `algebra-lineare`, `strutture-avanzate` (complessi, quaternioni, gruppi, topologia). Un macroargomento può attraversare più regioni/gradi (es. geometria va dal grado 1 al 5); il grado è della singola lezione, non del macroargomento.
- **Stanza = una lezione.** I campi del Cammino (`regione`, `stanza`, `distrattore`) sono **facoltativi**: una lezione senza questi campi compare solo nel Libro. Il Cammino è quindi una selezione curata di lezioni-stanza per regione; `grado` è invece obbligatorio per tutte (serve anche al Libro per indicare il livello).
- **Libro vs Cammino, stesso file**: nel Libro la `Scena` è nascosta; `Attenzione`/distrattore è mostrato come box neutro "Errore tipico"; la `Sfida` è mostrata come "Mettiti alla prova".

### 5.2 Accesso e avanzamento (deciso dall'utente)

- **Il Libro è completamente libero**: ogni lezione di ogni grado è sempre accessibile, senza blocchi.
- **Il Cammino è ordinato, con prova d'ingresso** (opzione B):
  - dentro ogni regione le stanze si affrontano in ordine (`stanza`); la successiva si apre conquistando la precedente;
  - l'ultima stanza di ogni regione è il **Guardiano**: una sfida riassuntiva della regione. Batterlo fa salire di grado e apre la regione successiva;
  - all'inizio chi è già avanti può scegliere la regione di partenza; per entrarvi deve battere il Guardiano della regione precedente. Le regioni saltate risultano "attraversate" ma le loro stanze restano rigiocabili;
  - il campo `grado` del progresso è il grado più alto il cui Guardiano precedente è stato battuto.
- **Libro e Cammino si parlano senza scorciatoie** (scelta di Claude): una sfida superata nel Libro segna la lezione come *completata*; quando l'eroe arriva a quella stanza nel Cammino, la trova già conquistata. Il Guardiano esiste solo nel Cammino, quindi il Libro non fa salire di grado.
- **Unione della Pergamena**: si uniscono le stanze/lezioni completate e i badge; il grado è il massimo dei due.
- **Esperimenti**: collezione separata `src/content/esperimenti/it/*.mdx` (animazione o simulazione interattiva con breve spiegazione, campo `lezioniCollegate`), stesse regole sulle fonti se riporta fatti.
- **Prima consegna**: "primi gradi" = gradi 1, 2 e 3 (una stanza completa ciascuno); i gradi 4–6 visibili sulla mappa "nella Nebbia". Almeno 1 esperimento.

## 6. Grafica

Scelta di Claude (delegata dall'utente): palette vivace ma rassicurante — un blu profondo come colore di fiducia, accenti caldi (arancio/giallo) per gioco ed esempi, verde per successi, viola per il mondo fantastico; un colore per ciascun tipo di box (Esempio, Curiosità, Attenzione, Storia). Tipografia arrotondata e leggibile. Illustrazioni in SVG originali e semplici. Tema chiaro e scuro.

## 7. Pagine della prima consegna

1. Homepage con la scelta Libro / Cammino e presentazione del mondo.
2. Indice del Libro e mappa del Cammino (6 regioni; quelle senza contenuti mostrate "nella Nebbia").
3. Pagina lezione (stesso file in due contesti: Libro con navigazione per argomento, Cammino con scena/sfida e avanzamento).
4. Mappe mentali: elenco e visualizzatore.
5. Curiosità, Storia, Esperimenti: elenchi e pagine singole.
6. FAQ (inclusa la Pergamena e la privacy), pagina Fonti e crediti.
7. Zaino dell'eroe (progressi, badge, Pergamena).

**Contenuto iniziale** (per dimostrare il modello, non per completezza): 1 stanza completa per ciascuno dei primi gradi, almeno una lezione con grafico interattivo e una con animazione, 1 mappa mentale, 3 curiosità e 2 schede storiche con fonti verificate (es. Hamilton e i quaternioni, 16 ottobre 1843, Broom Bridge).

## 8. Lasciato al costruttore

Nomi esatti dei file e dei componenti, dettagli di layout, numero di domande per sfida, scelta dei badge, contenuti delle lezioni iniziali (purché rispettino le regole sulle fonti).

## 9. Azioni dell'utente

- Nelle impostazioni del repository su GitHub: *Settings → Pages → Source: GitHub Actions* (necessario perché il sito venga pubblicato).
- Il sito si pubblica dal branch predefinito: il lavoro su branch `claude/...` va unito (pull request) per andare online.
