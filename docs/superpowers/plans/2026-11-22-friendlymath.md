# FriendlyMath — piano di implementazione

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** prima consegna del sito FriendlyMath (Libro + Cammino, progressi con Pergamena, mappe mentali, curiosità, storia, esperimenti) pubblicabile su GitHub Pages.

**Architecture:** sito statico Astro; contenuti MDX in Content Collections validate da schemi Zod; logica dei progressi in un modulo TypeScript puro e testato, usato da script client; componenti MDX per i blocchi didattici; JSXGraph/jsMind caricati solo nelle pagine che li usano.

**Tech Stack:** Astro 7, @astrojs/mdx, remark-math + rehype-katex (KaTeX), JSXGraph, jsMind, Vitest, Playwright (verifica finale), GitHub Actions → Pages.

**Spec:** `docs/superpowers/specs/2026-11-22-friendlymath-design.md`

## Global Constraints

- Lingua dei contenuti: italiano; URL senza prefisso per `it` (predefinita), i18n Astro configurato con `locales: ["it","en"]`, `defaultLocale: "it"`.
- Nessun dato personale; nessuna richiesta a servizi esterni a runtime (librerie impacchettate, niente CDN, niente font remoti).
- Curiosità, storia, esperimenti: `fonti` con almeno 1 voce `{titolo, url, editore, consultato}`; la build fallisce se mancano.
- Testi originali; i tre siti di riferimento solo come link di approfondimento.
- Accessibilità: contrasto AA, `prefers-reduced-motion` rispettato, tutto usabile da tastiera.
- Chiave localStorage: `friendlymath:progresso`; formato Pergamena `{ app: "friendlymath", versione: 1, completate: string[], guardiani: number[], badge: string[], aggiornato: string }`.
- `site: "https://friendlymath.github.io"`, `base` assente (sito utente).

## Review Focus

1. localStorage assente/bloccato o con JSON corrotto → il sito funziona, progresso vuoto, nessun errore in console che rompa la pagina (test in Task 2).
2. File Pergamena non valido (altro JSON, campi sbagliati, versione futura, file non JSON) → messaggio chiaro, progresso attuale intatto (test in Task 2).
3. Utente avanzato che sceglie una regione di partenza → stanze della regione aperte solo dopo il Guardiano precedente; regioni saltate rigiocabili (test in Task 2).
4. Regione senza contenuti (gradi 4–6) → mostrata "nella Nebbia", nessun link rotto (verifica in Task 8).
5. JavaScript disattivato → lezioni del Libro leggibili; sfide mostrano un avviso (verifica in Task 8).

---

### Task 1: Scaffold, tema grafico, layout, deploy

**Files:** `package.json`, `astro.config.mjs`, `tsconfig.json`, `src/styles/tema.css`, `src/layouts/Base.astro`, `src/components/Intestazione.astro`, `src/components/PiePagina.astro`, `src/pages/index.astro` (provvisoria), `.github/workflows/deploy.yml`, `.gitignore`, `vitest.config.ts`.

- [ ] Installare astro, @astrojs/mdx, remark-math, rehype-katex, katex, jsxgraph, jsmind, vitest.
- [ ] `tema.css`: token colore su `:root` (fiducia `#1f4e9c`, gioco `#ff8a3d`, sole `#ffc93c`, successo `#2bb673`, magia `#7b5cd6`, box Esempio/Curiosità/Attenzione/Storia), tema scuro con `prefers-color-scheme` e `[data-theme]`, tipografia di sistema arrotondata.
- [ ] `Base.astro(props: {titolo: string, descrizione?: string})` con intestazione (Libro, Cammino, Mappe, Curiosità, Storia, Esperimenti, FAQ, Zaino).
- [ ] Workflow Pages con `withastro/action` + `actions/deploy-pages`.
- [ ] Verifica: `npm run build` esce con 0. Commit.

### Task 2: Modulo progressi (TDD)

**Files:** `src/lib/mondo.ts`, `src/lib/progresso.ts`, `tests/progresso.test.ts`

**Interfaces (Produces):**
- `mondo.ts`: `GRADI: {numero: 1..6, nome, equipaggiamento, regione, slugRegione, fase, colore}[]`; `MACROARGOMENTI: {slug, nome, descrizione}[]` (8 voci dello spec).
- `progresso.ts`:
  - `type Progresso = {completate: string[]; guardiani: number[]; badge: string[]; aggiornato: string}`
  - `progressoVuoto(): Progresso`
  - `carica(storage?: Storage|null): Progresso` — mai eccezioni.
  - `salva(p: Progresso, storage?: Storage|null): boolean`
  - `completa(p, slug): Progresso`; `battiGuardiano(p, grado): Progresso` (aggiunge badge `grado-N`)
  - `gradoAttuale(p): number` = 1 + max grado in `guardiani` (min 1, max 6)
  - `regioneAperta(p, grado): boolean` = grado 1, oppure `guardiani` include grado-1
  - `statoStanza(p, stanze: {slug, grado, ordine}[], slug): "bloccata"|"aperta"|"conquistata"`
  - `esportaPergamena(p): string`; `importaPergamena(testo): {ok: true, progresso} | {ok: false, errore: string}`; `unisci(a, b): Progresso`

- [ ] Test: carica con storage null / JSON corrotto / oggetto valido; completa idempotente; gradoAttuale; regioneAperta; statoStanza (prima stanza di regione aperta aperta, successiva bloccata finché la precedente non è conquistata, lezione completata nel Libro = conquistata, regione chiusa → bloccata); import di testo non JSON, `app` diverso, versione 2, campi di tipo sbagliato → `ok:false`; round-trip export/import; unisci = unione insiemi.
- [ ] Verificare che falliscano, implementare, `npx vitest run` verde. Commit.

### Task 3: Schemi dei contenuti

**Files:** `src/lib/schemi.ts`, `src/content.config.ts`, `tests/schemi.test.ts`

- [ ] `schemi.ts` esporta Zod: `fonte`, `lezione` (titolo, descrizione, macroargomento enum, sottoargomento, grado 1–6, regione?/stanza?/guardiano?/distrattore?, prerequisiti[], fonti[], stato), `curiosita`/`storia`/`esperimento` con `fonti.min(1)`.
- [ ] Test: curiosità senza fonti → errore; lezione con grado 7 → errore; macroargomento sconosciuto → errore.
- [ ] `content.config.ts` con loader `glob` su `src/content/<collezione>/it`. Commit.

### Task 4: Componenti didattici MDX

**Files:** `src/components/didattica/{Scena,Esempio,Curiosita,Attenzione,Sfida,Grafico,Animazione}.astro`, `src/scripts/sfida.ts`

- [ ] `Scena(personaggio)`, `Esempio(titolo)`, `Curiosita`, `Attenzione(distrattore)`: riquadri colorati; `Scena` ha classe `solo-cammino`; `Attenzione` mostra nome del distrattore nel Cammino, "Errore tipico" nel Libro (CSS su `[data-contesto]`).
- [ ] `Sfida(domande: {testo, opzioni?, risposta, spiegazione}[], slug, guardiano?: number)`: lo script valuta, mostra feedback, a tutte corrette chiama `completa` (e `battiGuardiano` se guardiano) e salva; `<noscript>` con avviso.
- [ ] `Grafico(tipo)` monta JSXGraph; `Animazione` con rispetto di reduced-motion. Commit.

### Task 5: Libro e Cammino

**Files:** `src/lib/contenuti.ts`, `src/layouts/Lezione.astro`, `src/pages/libro/index.astro`, `src/pages/libro/[...slug].astro`, `src/pages/cammino/index.astro`, `src/pages/cammino/[...slug].astro`, `src/scripts/cammino.ts`

- [ ] `contenuti.ts`: `lezioniPubblicate()`, `stanzeDelCammino()` ordinate per grado e `stanza`.
- [ ] Libro: indice per macroargomento → sottoargomento, badge grado, tutto accessibile; pagina con `data-contesto="libro"`.
- [ ] Cammino: mappa con 6 regioni; regioni senza stanze "nella Nebbia"; script applica `statoStanza`; scelta regione di partenza (porta al Guardiano della regione precedente); pagina stanza con `data-contesto="cammino"` e avanti/indietro. Commit.

### Task 6: Zaino, Pergamena, FAQ

**Files:** `src/pages/zaino.astro`, `src/scripts/zaino.ts`, `src/pages/faq.astro`, `src/components/Promemoria.astro`

- [ ] Zaino: grado ed equipaggiamento, stanze conquistate, badge, "Salva la Pergamena" (download `pergamena-friendlymath.json`), "Riprendi il cammino" (file input; unisci/sostituisci; errori leggibili), "Ricomincia".
- [ ] Promemoria al passaggio di grado. FAQ con Pergamena e privacy. Commit.

### Task 7: Mappe, Curiosità, Storia, Esperimenti, Fonti

**Files:** `src/data/mappe/*.json`, `src/pages/mappe/index.astro`, `src/pages/mappe/[slug].astro`, pagine indice+dettaglio per `curiosita`, `storia`, `esperimenti`, `src/pages/fonti.astro`.

- [ ] Mappe in formato jsMind `node_tree`; visualizzatore con espandi/comprimi; fallback elenco annidato senza JS.
- [ ] Pagina Fonti: raccolta automatica di tutte le fonti + siti di ispirazione. Commit.

### Task 8: Contenuti iniziali, homepage, verifica

- [ ] Gradi 1–3: per ciascuno 1 stanza-lezione + 1 Guardiano; 1 lezione solo-Libro con grafico interattivo (Pitagora); mappa mentale `numeri` (+ `geometria`); 3 curiosità, 2 schede storiche (Hamilton, al-Khwarizmi), 1 esperimento (ago di Buffon) con fonti verificate via web.
- [ ] Homepage con la scelta Libro / Cammino; 404; README.
- [ ] Verifica: `npx vitest run`, `npm run build`, controllo Playwright (home, Libro, Cammino, sfida → conquista, Zaino export/import, mappa, larghezza 375px senza scroll orizzontale, JS disattivato). Commit e push.
