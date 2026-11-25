import { macroargomentiL } from './mondo';
import type { Lingua } from './lingua';

export type NodoMappa = { id: string; topic: string; link?: string; expanded?: boolean; direction?: string; children?: NodoMappa[] };
export type Mappa = { meta: { name: string }; format: 'node_tree'; data: NodoMappa };

const file = import.meta.glob<Mappa>(['../data/mappe/*.json', '../data/mappe/en/*.json'], { eager: true, import: 'default' });

export function mappaDi(slug: string, l: Lingua = 'it'): Mappa | undefined {
  return file[l === 'en' ? `../data/mappe/en/${slug}.json` : `../data/mappe/${slug}.json`];
}

export const elencoMappe = (l: Lingua = 'it') => macroargomentiL(l).map((m) => ({ ...m, mappa: mappaDi(m.slug, l) }));
