import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { schemaLezione, schemaCuriosita, schemaStoria, schemaEsperimento } from './lib/schemi';

const da = (cartella: string, lingua = 'it') => glob({ pattern: '**/*.mdx', base: `./src/content/${cartella}/${lingua}` });

export const collections = {
  lezioni: defineCollection({ loader: da('lezioni'), schema: schemaLezione }),
  curiosita: defineCollection({ loader: da('curiosita'), schema: schemaCuriosita }),
  storia: defineCollection({ loader: da('storia'), schema: schemaStoria }),
  esperimenti: defineCollection({ loader: da('esperimenti'), schema: schemaEsperimento }),
  // versioni inglesi: stessi slug (così progressi e Pergamena valgono in entrambe le lingue)
  lezioni_en: defineCollection({ loader: da('lezioni', 'en'), schema: schemaLezione }),
  curiosita_en: defineCollection({ loader: da('curiosita', 'en'), schema: schemaCuriosita }),
  storia_en: defineCollection({ loader: da('storia', 'en'), schema: schemaStoria }),
  esperimenti_en: defineCollection({ loader: da('esperimenti', 'en'), schema: schemaEsperimento }),
};
