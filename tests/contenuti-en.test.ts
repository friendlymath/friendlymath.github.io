import { describe, it, expect } from 'vitest';
import { readdirSync, readFileSync, existsSync } from 'node:fs';
import { join } from 'node:path';

const elenca = (dir: string): string[] => readdirSync(dir, { withFileTypes: true })
  .flatMap((d) => d.isDirectory() ? elenca(join(dir, d.name)).map((f) => join(d.name, f)) : d.name.endsWith('.mdx') ? [d.name] : []);
const campi = ['macroargomento', 'grado', 'regione', 'stanza', 'guardiano', 'distrattore'];
const valore = (testo: string, campo: string) => testo.match(new RegExp(`^${campo}:\\s*(.*)$`, 'm'))?.[1]?.trim();
const risposte = (testo: string) => [...testo.matchAll(/risposta:\s*([\d.]+)/g)].map((m) => m[1]);

describe('ogni contenuto italiano ha la sua versione inglese', () => {
  for (const c of ['lezioni', 'curiosita', 'storia', 'esperimenti']) {
    const it_ = `src/content/${c}/it`;
    for (const f of elenca(it_)) {
      it(`${c}/${f}`, () => {
        const en = `src/content/${c}/en/${f}`;
        expect(existsSync(en), `manca ${en}`).toBe(true);
        const a = readFileSync(join(it_, f), 'utf8'), b = readFileSync(en, 'utf8');
        for (const k of campi) expect(valore(b, k), `${f}: ${k}`).toBe(valore(a, k));
        expect(risposte(b), `${f}: risposte delle sfide`).toEqual(risposte(a));
      });
    }
  }
});
