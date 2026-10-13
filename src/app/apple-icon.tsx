import { ImageResponse } from "next/og";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

// Home-screen icon for iOS. Matches app/icon.svg.
export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "linear-gradient(135deg, #0b1a1c 0%, #05070b 55%, #10122a 100%)",
          color: "#5eead4",
          fontSize: 76,
          fontWeight: 700,
          letterSpacing: -2,
          fontFamily: "monospace",
        }}
      >
        SG
      </div>
    ),
    size,
  );
}
