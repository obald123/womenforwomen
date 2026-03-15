const API_URL = process.env.NEXT_PUBLIC_API_BASE_URL;
if (!API_URL) {
  throw new Error("NEXT_PUBLIC_API_BASE_URL is not set");
}

export function resolveImageUrl(url?: string) {
  if (!url) return url;
  if (url.startsWith("http://") || url.startsWith("https://")) return url;
  return `${API_URL}${url}`;
}

export async function publicFetch<T>(path: string): Promise<T> {
  const res = await fetch(`${API_URL}${path}`, { cache: "no-store" });
  if (!res.ok) throw new Error(await res.text());
  return res.json();
}
