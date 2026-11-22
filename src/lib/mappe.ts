import { MACROARGOMENTI } from './mondo';

export type NodoMappa = { id: string; topic: string; link?: string; expanded?: boolean; direction?: string; children?: NodoMappa[] };
export type Mappa = { meta: { name: string }; format: 'node_tree'; data: NodoMappa };

const file = import.meta.glob<Mappa>('../data/mappe/*.json', { eager: true, import: 'default' });

export function mappaDi(slug: string): Mappa | undefined {
  return file[`../data/mappe/${slug}.json`];
}

export const elencoMappe = () => MACROARGOMENTI.map((m) => ({ ...m, mappa: mappaDi(m.slug) }));
