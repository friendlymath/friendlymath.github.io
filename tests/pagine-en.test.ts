import { describe, it, expect } from 'vitest';
import { readdirSync, existsSync } from 'node:fs';
import { join } from 'node:path';

const elenca = (dir: string, rel = ''): string[] => readdirSync(join(dir, rel), { withFileTypes: true }).flatMap((d) =>
  d.isDirectory() ? (rel === '' && d.name === 'en' ? [] : elenca(dir, join(rel, d.name))) : d.name.endsWith('.astro') ? [join(rel, d.name)] : []);

describe('ogni pagina italiana ha la versione inglese', () => {
  for (const p of elenca('src/pages').filter((p) => p !== '404.astro')) {
    it(p, () => expect(existsSync(join('src/pages/en', p)), `manca src/pages/en/${p}`).toBe(true));
  }
});
