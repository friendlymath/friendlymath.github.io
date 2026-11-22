import { describe, it, expect } from 'vitest';
import { mini } from '../src/lib/mini';

describe('mini', () => {
  it('rende grassetto e formule', () => {
    const h = mini('Il **rapporto** è $a:b$');
    expect(h).toContain('<b>rapporto</b>');
    expect(h).toContain('katex');
  });
  it('non lascia passare HTML', () => {
    expect(mini('<script>alert(1)</script>')).not.toContain('<script>');
  });
});
