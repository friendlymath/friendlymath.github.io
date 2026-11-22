import { getCollection, type CollectionEntry } from 'astro:content';
import type { StanzaRif } from './progresso';

export type Lezione = CollectionEntry<'lezioni'>;

const pubblicata = (e: { data: { stato: string } }) => import.meta.env.DEV || e.data.stato === 'pubblicata';

export async function lezioniPubblicate(): Promise<Lezione[]> {
  return (await getCollection('lezioni', pubblicata)).sort(
    (a, b) => a.data.grado - b.data.grado || a.data.titolo.localeCompare(b.data.titolo, 'it'),
  );
}

/** Le lezioni che sono anche stanze del Cammino, in ordine di regione e stanza. */
export async function stanzeDelCammino(): Promise<Lezione[]> {
  return (await lezioniPubblicate())
    .filter((l) => l.data.regione !== undefined)
    .sort((a, b) => a.data.regione! - b.data.regione! || a.data.stanza! - b.data.stanza!);
}

export function riferimentiStanze(stanze: Lezione[]): StanzaRif[] {
  return stanze.map((s) => ({ slug: s.id, grado: s.data.regione!, ordine: s.data.stanza!, guardiano: s.data.guardiano }));
}

export async function pubblicati<C extends 'curiosita' | 'storia' | 'esperimenti'>(c: C) {
  return getCollection(c, pubblicata as any) as Promise<CollectionEntry<C>[]>;
}
