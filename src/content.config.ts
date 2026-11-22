import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { schemaLezione, schemaCuriosita, schemaStoria, schemaEsperimento } from './lib/schemi';

const da = (cartella: string) => glob({ pattern: '**/*.mdx', base: `./src/content/${cartella}/it` });

export const collections = {
  lezioni: defineCollection({ loader: da('lezioni'), schema: schemaLezione }),
  curiosita: defineCollection({ loader: da('curiosita'), schema: schemaCuriosita }),
  storia: defineCollection({ loader: da('storia'), schema: schemaStoria }),
  esperimenti: defineCollection({ loader: da('esperimenti'), schema: schemaEsperimento }),
};
