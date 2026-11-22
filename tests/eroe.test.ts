import { describe, it, expect } from 'vitest';
import { eroePredefinito, cambiaCar, puntiRimasti, validaEroe, eroeCasuale, avatarSvg, nomeClasse, PUNTI_BASE, CAR_MAX } from '../src/lib/eroe';
import { esportaPergamena, importaPergamena, progressoVuoto } from '../src/lib/progresso';

describe('eroe', () => {
  it('il predefinito ha i punti tutti distribuiti', () => {
    expect(puntiRimasti(eroePredefinito())).toBe(0);
  });
  it('non si superano i punti né i limiti', () => {
    let e = eroePredefinito();
    expect(cambiaCar(e, 'logica', 1)).toBe(e); // nessun punto libero
    e = cambiaCar(e, 'pazienza', -1);
    expect(puntiRimasti(e)).toBe(1);
    e = cambiaCar(e, 'logica', 1);
    expect(e.car.logica).toBe(4);
    let x = { ...eroePredefinito(), car: { logica: PUNTI_BASE, intuizione: PUNTI_BASE, pazienza: PUNTI_BASE, curiosita: PUNTI_BASE } };
    expect(cambiaCar(x, 'logica', -1)).toBe(x);
    for (let i = 0; i < 10; i++) x = cambiaCar(x, 'logica', 1);
    expect(x.car.logica).toBe(CAR_MAX);
  });
  it('validaEroe rifiuta spazzatura e ripulisce il nome', () => {
    expect(validaEroe(null)).toBeNull();
    expect(validaEroe({ corpo: 'alieno', classe: 'mago' })).toBeNull();
    const e = validaEroe({ ...eroePredefinito(), nome: '<script>Ada</script> Lovelace ma molto molto lungo', pelle: 99 })!;
    expect(e.nome).not.toContain('<');
    expect(e.nome.length).toBeLessThanOrEqual(24);
    expect(e.pelle).toBe(0);
  });
  it('validaEroe riporta al predefinito caratteristiche truccate', () => {
    const e = validaEroe({ ...eroePredefinito(), car: { logica: 6, intuizione: 6, pazienza: 6, curiosita: 6 } })!;
    expect(puntiRimasti(e)).toBeGreaterThanOrEqual(0);
  });
  it('eroeCasuale è sempre valido', () => {
    for (let i = 0; i < 50; i++) {
      const e = eroeCasuale();
      expect(validaEroe(e)).toEqual(e);
      expect(puntiRimasti(e)).toBe(0);
    }
  });
  it('nomi di classe secondo il corpo', () => {
    expect(nomeClasse({ ...eroePredefinito(), corpo: 'femminile', classe: 'mago' })).toBe('Maga delle Formule');
    expect(nomeClasse({ ...eroePredefinito(), corpo: 'maschile', classe: 'mago' })).toBe('Mago delle Formule');
  });
  it('avatar è un svg', () => {
    expect(avatarSvg(eroePredefinito(), 4)).toMatch(/^<svg[\s\S]*<\/svg>$/);
  });
  it('la Pergamena trasporta l’eroe e ignora un eroe rovinato', () => {
    const p = { ...progressoVuoto(), eroe: { ...eroePredefinito(), nome: 'Ada' } };
    const r = importaPergamena(esportaPergamena(p));
    expect(r.ok && r.progresso.eroe?.nome).toBe('Ada');
    const rotta = JSON.parse(esportaPergamena(progressoVuoto()));
    rotta.eroe = { corpo: 'boh' };
    const r2 = importaPergamena(JSON.stringify(rotta));
    expect(r2.ok).toBe(true);
    expect(r2.ok && r2.progresso.eroe).toBeUndefined();
  });
});
