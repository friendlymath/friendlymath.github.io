import { describe, it, expect } from 'vitest';
import { existsSync } from 'node:fs';
import { PROGRAMMA } from '../src/data/programma';
import { MACROARGOMENTI } from '../src/lib/mondo';

describe('programma per anno', () => {
  it('ogni lezione citata esiste', () => {
    for (const anno of PROGRAMMA) for (const a of anno.argomenti) {
      if (a.lezione) expect(existsSync(`src/content/lezioni/it/${a.lezione}.mdx`), a.lezione).toBe(true);
    }
  });
  it('ogni macroargomento è valido e gli id sono unici', () => {
    const validi = MACROARGOMENTI.map((m) => m.slug as string);
    for (const anno of PROGRAMMA) for (const a of anno.argomenti) expect(validi, a.titolo).toContain(a.macro);
    expect(new Set(PROGRAMMA.map((a) => a.id)).size).toBe(PROGRAMMA.length);
  });
});
