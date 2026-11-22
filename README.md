# FriendlyMath

La matematica per chiunque, dalle elementari ai quaternioni. Un **Libro** da consultare liberamente e un **Cammino** a tappe
nel Regno di Numeria, con stanze, Guardiani e una Pergamena per salvare i progressi senza account.

Sito statico costruito con [Astro](https://astro.build), pubblicato su GitHub Pages: <https://friendlymath.github.io>.

## Comandi

| Comando | Cosa fa |
|---|---|
| `npm install` | installa le dipendenze |
| `npm run dev` | anteprima locale su http://localhost:4321 |
| `npm test` | esegue i test (progressi, schemi dei contenuti) |
| `npm run build` | costruisce il sito in `dist/` |

## Dove stanno le cose

- `src/content/lezioni/it/<macroargomento>/*.mdx`: le lezioni. Ogni file compare nel Libro; se ha `regione` e `stanza` è anche una stanza del Cammino.
- `src/content/curiosita|storia|esperimenti/it/*.mdx`: schede con **fonti obbligatorie** (la build fallisce senza).
- `src/data/mappe/*.json`: mappe mentali in formato jsMind (`node_tree`).
- `src/components/didattica/`: i blocchi usabili nelle lezioni senza import: `<Scena>`, `<Esempio>`, `<Curiosita>`, `<Storia>`, `<Attenzione distrattore="...">`, `<Interattivo tipo="...">`, `<Sfida domande={[...]}>`.
- `src/scripts/interattivi/<tipo>.ts`: animazioni ed esperimenti (ognuno esporta `monta(area)`).
- `src/lib/progresso.ts`: logica dei progressi e della Pergamena (testata in `tests/`).
- `docs/superpowers/`: documento di progetto e piano.

## Scrivere una nuova lezione

```mdx
---
titolo: "Titolo"
descrizione: "Una riga"
macroargomento: numeri        # numeri, geometria, algebra, funzioni-analisi, probabilita-statistica, logica-insiemi, algebra-lineare, strutture-avanzate
sottoargomento: "Frazioni"
grado: 2                      # 1 Recluta … 6 Cavaliere alato
regione: 2                    # facoltativo: solo per le stanze del Cammino
stanza: 3                     # ordine nella regione
guardiano: false              # true per l'ultima stanza della regione
distrattore: mercante         # mercante, menestrello, gnomo, barone, sirena
---
```

Le domande di `<Sfida>` hanno `testo`, `risposta` (indice dell'opzione giusta, oppure il numero atteso), `opzioni` facoltative e `spiegazione`.

## Pubblicazione

Il workflow `.github/workflows/deploy.yml` pubblica a ogni push su `main`. Una tantum: **Settings → Pages → Source: GitHub Actions**.
