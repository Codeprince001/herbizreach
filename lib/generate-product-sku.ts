/** Offline fallback: uppercase slug from name + short random suffix (max 80 chars). */
export function generateProductSkuFromName(name: string): string {
  const base = name
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-zA-Z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .toUpperCase()
    .slice(0, 40);
  const suffix = Math.random().toString(36).slice(2, 6).toUpperCase();
  const core = base.length >= 2 ? base : "ITEM";
  return `${core}-${suffix}`.slice(0, 80);
}
