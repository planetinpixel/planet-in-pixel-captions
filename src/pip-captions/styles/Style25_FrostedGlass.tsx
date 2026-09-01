import React from "react";
import { StyleRendererProps } from "../types";

export const FrostedGlassStyle: React.FC<StyleRendererProps> = ({
  line,
  fontSize = 54,
}) => {
  return (
    <div
      style={{
        display: "inline-flex",
        flexWrap: "wrap",
        justifyContent: "center",
        alignItems: "center",
        textAlign: "center",
        fontFamily: "'Inter', system-ui, -apple-system, sans-serif",
        fontWeight: 700,
        fontSize: `${fontSize}px`,
        lineHeight: 1.3,
        padding: "16px 36px",
        borderRadius: "18px",
        background: "rgba(255, 255, 255, 0.12)",
        border: "1px solid rgba(255, 255, 255, 0.25)",
        boxShadow:
          "0 20px 40px rgba(0, 0, 0, 0.5), inset 0 1px 1px rgba(255, 255, 255, 0.3)",
        backdropFilter: "blur(24px)",
        maxWidth: "96%",
        color: "#FFFFFF",
        textShadow: "0 2px 10px rgba(0, 0, 0, 0.7)",
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
