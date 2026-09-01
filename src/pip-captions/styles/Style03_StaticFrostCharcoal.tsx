import React from "react";
import { StyleRendererProps } from "../types";

export const StaticFrostCharcoalPillStyle: React.FC<StyleRendererProps> = ({
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
        background: "rgba(18, 22, 30, 0.88)",
        border: "1px solid rgba(56, 189, 248, 0.45)",
        boxShadow:
          "0 18px 45px rgba(0, 0, 0, 0.8), 0 0 20px rgba(56, 189, 248, 0.18)",
        backdropFilter: "blur(20px)",
        maxWidth: "94%",
        fontFamily: "'Sora', sans-serif",
        fontWeight: 600,
        fontSize: `${fontSize}px`,
        color: "#E2E8F0",
        textShadow: "0 2px 10px rgba(0, 0, 0, 0.85)",
        lineHeight: 1.35,
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
