import { ImageResponse } from "next/og";
import { site } from "@/content";

export const alt = `${site.name}: robots, software, and the math underneath`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// Link-preview image shown when the site is shared (iMessage, Slack, LinkedIn, etc.).
export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px 80px",
          background:
            "radial-gradient(circle at 15% 0%, rgba(94,234,212,0.22), transparent 45%), radial-gradient(circle at 95% 10%, rgba(129,140,248,0.25), transparent 45%), #05070b",
          color: "#e6ebf2",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: 64,
              height: 64,
              borderRadius: 14,
              border: "2px solid rgba(94,234,212,0.5)",
              color: "#5eead4",
              fontSize: 26,
              fontWeight: 700,
              fontFamily: "monospace",
            }}
          >
            SG
          </div>
          <div style={{ fontSize: 30, fontWeight: 600 }}>{site.name}</div>
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          {site.headline.map((line, i) => (
            <div
              key={line}
              style={{
                fontSize: 76,
                fontWeight: 700,
                letterSpacing: -2,
                lineHeight: 1.05,
                color: i === site.headline.length - 1 ? "#5eead4" : "#e6ebf2",
              }}
            >
              {line}
            </div>
          ))}
        </div>

        <div style={{ display: "flex", gap: 28, fontSize: 24, color: "#8b95a7", fontFamily: "monospace" }}>
          <span>FTC 26936</span>
          <span>·</span>
          <span>SafeSpace</span>
          <span>·</span>
          <span>Quantum ML</span>
          <span>·</span>
          <span>{site.classOf}</span>
        </div>
      </div>
    ),
    size,
  );
}
