/** Public asset path that respects GitHub Pages basePath. */
export function asset(path: string): string {
  const base = process.env.NEXT_PUBLIC_BASE_PATH?.replace(/\/$/, "") || "";
  const clean = path.startsWith("/") ? path : `/${path}`;
  return `${base}${clean}`;
}
