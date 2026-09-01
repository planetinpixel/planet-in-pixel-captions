import React from "react";
import { StyleRendererProps } from "../types";

export const StaticBroadcastCleanStyle: React.FC<StyleRendererProps> = ({
  line,
  fontSize = 58,
}) => {
  return (
    <div
      style={{
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "center",
        alignItems: "center",
        textAlign: "center",
        fontFamily: "'DM Sans', sans-serif",
        fontWeight: 800,
        fontSize: `${fontSize}px`,
        lineHeight: 1.3,
        maxWidth: "92%",
      }}
    >
      {line.tokens.map((token, i) => (
        <span
          key={`${token.text}-${i}`}
          style={{
            display: "inline-block",
            margin: "4px 8px",
            verticalAlign: "middle",
            color: "#FFD200",
            WebkitTextStroke: "3px #000000",
            paintOrder: "stroke fill",
            textShadow:
              "0 4px 14px rgba(0, 0, 0, 0.95), 0 2px 4px rgba(0, 0, 0, 0.9)",
            whiteSpace: "nowrap",
          }}
        >
          {token.text}
        </span>
      ))}
    </div>
  );
};
