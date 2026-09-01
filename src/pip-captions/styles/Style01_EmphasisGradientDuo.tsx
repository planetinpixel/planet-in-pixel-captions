import React from "react";
import { interpolate, Easing } from "remotion";
import { StyleRendererProps } from "../types";

export interface EmphasisGradientDuoProps extends StyleRendererProps {
  /**
   * Optional custom list of words/phrases to apply the gradient to.
   * Case-insensitive matching. e.g. ["Planet in Pixel", "Content creators", "One click"]
   */
  highlightWords?: string[];
  /**
   * Optional custom predicate function to decide if a word is highlighted.
   */
  isWordHighlighted?: (
    text: string,
    index: number,
    lineId?: string
  ) => boolean;
}

export const EmphasisGradientDuoStyle: React.FC<EmphasisGradientDuoProps> = ({
  line,
  absoluteTimeMs,
  fps,
  fontSize = 62,
  highlightWords,
  isWordHighlighted,
}) => {
  const framesSinceLineStart = Math.max(
    0,
    ((absoluteTimeMs - line.startMs) / 1000) * fps
  );

  const lineOpacity = interpolate(framesSinceLineStart, [0, 8], [0, 1], {
    easing: Easing.out(Easing.quad),
    extrapolateRight: "clamp",
  });

  const lineTranslateY = interpolate(framesSinceLineStart, [0, 10], [12, 0], {
    easing: Easing.bezier(0.16, 1, 0.3, 1),
    extrapolateRight: "clamp",
  });

  // Determines which words receive the vibrant italic gradient emphasis
  const checkEmphasis = (tokenText: string, index: number): boolean => {
    // 1. Custom predicate function if provided
    if (isWordHighlighted) {
      return isWordHighlighted(tokenText, index, line.id);
    }

    const clean = tokenText.replace(/[^a-zA-Z]/g, "").toLowerCase();

    // 2. Explicit custom highlight words array if provided
    if (highlightWords && highlightWords.length > 0) {
      const normalizedTargets = highlightWords.flatMap((w) =>
        w.toLowerCase().split(/\s+/)
      );
      return normalizedTargets.includes(clean);
    }

    // 3. Default sentence-level emphasis mapping
    if (line.id === "line-1") {
      return clean === "planet" || clean === "in" || clean === "pixel";
    }
    if (line.id === "line-2") {
      return clean === "video" || clean === "editing" || clean === "school";
    }
    if (line.id === "line-3") {
      return clean === "content" || clean === "creators";
    }
    return false;
  };

  return (
    <div
      style={{
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "center",
        alignItems: "baseline",
        textAlign: "center",
        fontFamily: "'Inter', 'Montserrat', sans-serif",
        fontWeight: 900,
        fontSize: `${fontSize}px`,
        letterSpacing: "-0.02em",
        lineHeight: 1.2,
        opacity: lineOpacity,
        transform: `translateY(${lineTranslateY}px)`,
        maxWidth: "96%",
      }}
    >
      {line.tokens.map((token, i) => {
        const isHighlight = checkEmphasis(token.text, i);

        return (
          <span
            key={`${token.text}-${i}`}
            style={{
              display: "inline-block",
              margin: "0 8px",
              verticalAlign: "baseline",
              // Safe drop shadow placement on wrapper
              filter: isHighlight
                ? "drop-shadow(0 0 16px rgba(236, 72, 153, 0.5)) drop-shadow(0 4px 10px rgba(0,0,0,0.9))"
                : "drop-shadow(0 4px 10px rgba(0,0,0,0.9))",
            }}
          >
            {isHighlight ? (
              <span
                style={{
                  display: "inline-block",
                  fontStyle: "italic",
                  background:
                    "linear-gradient(135deg, #F43F5E 0%, #EC4899 25%, #A855F7 65%, #3B82F6 100%)",
                  WebkitBackgroundClip: "text",
                  backgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  color: "transparent",
                  whiteSpace: "nowrap",
                  verticalAlign: "baseline",
                }}
              >
                {token.text}
              </span>
            ) : (
              <span
                style={{
                  display: "inline-block",
                  color: "#FFFFFF",
                  whiteSpace: "nowrap",
                  verticalAlign: "baseline",
                }}
              >
                {token.text}
              </span>
            )}
          </span>
        );
      })}
    </div>
  );
};
