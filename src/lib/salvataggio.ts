/** Tiene traccia di quando la Pergamena è stata salvata (scaricata) l'ultima volta, per ricordarlo a chi gioca. */
import { carica } from './progresso';

const CHIAVE_EXPORT = 'friendlymath:ultimo-salvataggio';

export function segnaSalvato(): void {
  try { localStorage.setItem(CHIAVE_EXPORT, new Date().toISOString()); } catch {}
}

export function ultimoSalvataggio(): Date | null {
  try { const v = localStorage.getItem(CHIAVE_EXPORT); return v ? new Date(v) : null; } catch { return null; }
}

/** Ci sono progressi non ancora salvati nella Pergamena? */
export function daSalvare(): boolean {
  const p = carica();
  if (!p.completate.length && !p.guardiani.length) return false;
  const u = ultimoSalvataggio();
  if (!u) return true;
  return !!p.aggiornato && new Date(p.aggiornato) > u;
}
