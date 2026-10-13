// Guards for URLs that come from outside the codebase (GitHub API responses)
// before they're rendered as links. No framework imports, so it's unit-testable.

/**
 * Returns the URL only if it is an absolute http(s) URL, otherwise null.
 * Blocks `javascript:`, `data:`, `vbscript:` and other schemes that could run
 * code when clicked. A bare domain like "example.com" is upgraded to https.
 */
export function safeHttpUrl(raw: string | null | undefined): string | null {
  if (!raw) return null;
  const trimmed = raw.trim();
  if (!trimmed) return null;
  const candidate = /^[a-z][a-z0-9+.-]*:/i.test(trimmed) ? trimmed : `https://${trimmed}`;
  try {
    const url = new URL(candidate);
    if (url.protocol !== "https:" && url.protocol !== "http:") return null;
    if (!url.hostname || url.username || url.password) return null;
    return url.href;
  } catch {
    return null;
  }
}

/** Same as safeHttpUrl, but also requires the host to be in `hosts`. */
export function safeUrlOnHost(raw: string | null | undefined, hosts: string[]): string | null {
  const url = safeHttpUrl(raw);
  if (!url) return null;
  return hosts.includes(new URL(url).hostname) ? url : null;
}

/** Trims untrusted free text to a sane length so it can't blow up the layout. */
export function clampText(raw: string | null | undefined, max = 300): string | null {
  if (!raw) return null;
  const text = raw.trim();
  if (!text) return null;
  return text.length > max ? `${text.slice(0, max - 1).trimEnd()}…` : text;
}
