import React from "react";
import { StyleRendererProps } from "../types";

export const StaticNeonCyanPillStyle: React.FC<StyleRendererProps> = ({
  line,
  fontSize = 50,
}) => {
  return (
    <div
      style={{
        display: "inline-flex",
        flexWrap: "wrap",
        justifyContent: "center",
        alignItems: "center",
        textAlign: "center",
        padding: "16px 36px",
        borderRadius: "18px",
        background: "rgba(6, 30, 45, 0.92)",
        border: "2px solid rgba(0, 240, 255, 0.55)",
        boxShadow:
          "0 18px 45px rgba(0, 0, 0, 0.8), 0 0 25px rgba(0, 240, 255, 0.25)",
        backdropFilter: "blur(20px)",
        maxWidth: "94%",
        fontFamily: "'Orbitron', sans-serif",
        fontWeight: 800,
        fontSize: `${fontSize}px`,
        textTransform: "uppercase",
        letterSpacing: "0.06em",
        lineHeight: 1.3,
        color: "#00F0FF",
        textShadow:
          "0 0 16px rgba(0, 240, 255, 0.8), 0 2px 10px rgba(0, 0, 0, 0.9)",
      }}
    >
      {line.tokens.map((token, i) => (
        <span
          key={`${token.text}-${i}`}
          style={{
            display: "inline-block",
            margin: "4px 8px",
            verticalAlign: "middle",
            whiteSpace: "nowrap",
          }}
        >
          {token.text}
        </span>
      ))}
    </div>
  );
};
