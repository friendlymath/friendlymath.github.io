import { z } from 'astro/zod';
import { SLUG_MACRO, DISTRATTORI } from './mondo';

export const schemaFonte = z.object({
  titolo: z.string().min(1),
  url: z.url(),
  editore: z.string().min(1),
  autore: z.string().optional(),
  consultato: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
});

const fontiObbligatorie = z.array(schemaFonte).min(1, 'Servono fonti verificabili.');

export const schemaLezione = z
  .object({
    titolo: z.string().min(1),
    descrizione: z.string().min(1),
    macroargomento: z.enum(SLUG_MACRO),
    sottoargomento: z.string().min(1),
    grado: z.number().int().min(1).max(6),
    /** campi del Cammino: facoltativi, ma regione e stanza vanno insieme */
    regione: z.number().int().min(1).max(6).optional(),
    stanza: z.number().int().min(1).optional(),
    guardiano: z.boolean().default(false),
    distrattore: z.enum(Object.keys(DISTRATTORI) as [keyof typeof DISTRATTORI]).optional(),
    nomeStanza: z.string().optional(),
    prerequisiti: z.array(z.string()).default([]),
    fonti: z.array(schemaFonte).default([]),
    ispirazione: z.array(z.url()).default([]),
    stato: z.enum(['bozza', 'pubblicata']).default('pubblicata'),
  })
  .refine((l) => (l.regione === undefined) === (l.stanza === undefined), {
    message: 'regione e stanza vanno indicate insieme',
  });

const base = {
  titolo: z.string().min(1),
  descrizione: z.string().min(1),
  fonti: fontiObbligatorie,
  stato: z.enum(['bozza', 'pubblicata']).default('pubblicata'),
};

export const schemaCuriosita = z.object({ ...base, macroargomento: z.enum(SLUG_MACRO).optional(), icona: z.string().default('✨') });
export const schemaStoria = z.object({ ...base, personaggio: z.string().optional(), epoca: z.string().optional(), ordine: z.number().default(0) });
export const schemaEsperimento = z.object({ ...base, lezioniCollegate: z.array(z.string()).default([]), icona: z.string().default('🧪') });
