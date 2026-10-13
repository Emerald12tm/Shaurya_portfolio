import type { NextConfig } from "next";

const isDev = process.env.NODE_ENV === "development";

// Only this site may load scripts, styles, images, and fonts. Nonces aren't used
// because they would force every request to render dynamically and break the
// hourly ISR caching; 'unsafe-inline' is needed for Next's inline bootstrap script.
const csp = [
  "default-src 'self'",
  `script-src 'self' 'unsafe-inline'${isDev ? " 'unsafe-eval'" : ""}`,
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' blob: data:",
  "font-src 'self'",
  "connect-src 'self'",
  "object-src 'none'",
  "base-uri 'self'",
  "form-action 'self'",
  "frame-ancestors 'none'",
  ...(isDev ? [] : ["upgrade-insecure-requests"]),
].join("; ");

const securityHeaders = [
  { key: "Content-Security-Policy", value: csp },
  // Block other sites from embedding this one in a frame (clickjacking).
  { key: "X-Frame-Options", value: "DENY" },
  // Stop browsers from guessing file types (MIME sniffing).
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "Strict-Transport-Security", value: "max-age=63072000; includeSubDomains; preload" },
  { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=(), browsing-topics=()" },
  { key: "Cross-Origin-Opener-Policy", value: "same-origin" },
];

const nextConfig: NextConfig = {
  // Don't advertise the framework in an `X-Powered-By` response header.
  poweredByHeader: false,
  images: {
    // Only optimize images that ship with the site; never fetch arbitrary remote URLs.
    remotePatterns: [],
    dangerouslyAllowSVG: false,
  },
  async headers() {
    return [{ source: "/:path*", headers: securityHeaders }];
  },
};

export default nextConfig;
