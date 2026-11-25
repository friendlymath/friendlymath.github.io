import { getCollection, type CollectionEntry } from 'astro:content';
import type { StanzaRif } from './progresso';
import type { Lingua } from './lingua';

export type Lezione = CollectionEntry<'lezioni'>;

const pubblicata = (e: { data: { stato: string } }) => import.meta.env.DEV || e.data.stato === 'pubblicata';

export async function lezioniPubblicate(l: Lingua = 'it'): Promise<Lezione[]> {
  const tutte = (l === 'en' ? await getCollection('lezioni_en', pubblicata) : await getCollection('lezioni', pubblicata)) as Lezione[];
  return tutte.sort((a, b) => a.data.grado - b.data.grado || a.data.titolo.localeCompare(b.data.titolo, l));
}

/** Le lezioni che sono anche stanze del Cammino, in ordine di regione e stanza. */
export async function stanzeDelCammino(l: Lingua = 'it'): Promise<Lezione[]> {
  return (await lezioniPubblicate(l))
    .filter((l) => l.data.regione !== undefined)
    .sort((a, b) => a.data.regione! - b.data.regione! || a.data.stanza! - b.data.stanza!);
}

export function riferimentiStanze(stanze: Lezione[]): StanzaRif[] {
  return stanze.map((s) => ({ slug: s.id, grado: s.data.regione!, ordine: s.data.stanza!, guardiano: s.data.guardiano }));
}

export async function pubblicati<C extends 'curiosita' | 'storia' | 'esperimenti'>(c: C, l: Lingua = 'it') {
  const nome = (l === 'en' ? `${c}_en` : c) as C;
  return getCollection(nome, pubblicata as any) as Promise<CollectionEntry<C>[]>;
}
