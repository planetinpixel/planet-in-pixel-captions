import React from "react";
import { StyleRendererProps } from "../types";

export const StaticEditorialVogueStyle: React.FC<StyleRendererProps> = ({
  line,
  fontSize = 54,
}) => {
  return (
    <div
      style={{
        position: "relative",
        display: "inline-flex",
        flexDirection: "column",
        alignItems: "center",
        maxWidth: "92%",
      }}
    >
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          alignItems: "center",
          textAlign: "center",
          fontFamily: "'Cormorant Garamond', Georgia, serif",
          fontWeight: 600,
          fontSize: `${fontSize}px`,
          textTransform: "uppercase",
          letterSpacing: "0.14em",
          lineHeight: 1.35,
          color: "#F5EBE0",
          textShadow:
            "0 2px 8px rgba(0, 0, 0, 0.95), 0 4px 20px rgba(0, 0, 0, 0.8)",
          paddingBottom: "8px",
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

      {/* Fine Golden Underline Hairline Accent */}
      <div
        style={{
          width: "70%",
          height: "1px",
          background:
            "linear-gradient(90deg, transparent 0%, rgba(245, 235, 224, 0.7) 50%, transparent 100%)",
        }}
      />
    </div>
  );
};
