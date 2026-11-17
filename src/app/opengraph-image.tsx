import { ImageResponse } from "next/og";
export const alt =
  "The Maverick Builder — Build. Envision. Challenge. Empower.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export default function Image() {
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        padding: 70,
        background: "#101419",
        color: "#f7f8fa",
        fontFamily: "sans-serif",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          fontSize: 25,
        }}
      >
        <span>nMaverick ↗</span>
        <span style={{ color: "#b5bdc9", fontSize: 18 }}>
          THE MAVERICK BUILDER
        </span>
      </div>
      <div
        style={{
          fontSize: 76,
          lineHeight: 1.05,
          letterSpacing: -3,
          display: "flex",
          flexDirection: "column",
        }}
      >
        <span>I build technology.</span>
        <span>I question its impact.</span>
        <span style={{ color: "#789bff" }}>I shape what comes next.</span>
      </div>
      <div style={{ fontSize: 19, color: "#b5bdc9" }}>
        BUILD. ENVISION. CHALLENGE. EMPOWER.
      </div>
    </div>,
    size,
  );
}
