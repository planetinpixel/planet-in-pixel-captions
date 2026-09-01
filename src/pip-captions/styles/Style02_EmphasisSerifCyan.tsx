import React from "react";
import { interpolate, Easing } from "remotion";
import { StyleRendererProps } from "../types";

export interface EmphasisSerifCyanProps extends StyleRendererProps {
  /**
   * Optional custom list of words/phrases to apply the cyan italic serif emphasis to.
   * Case-insensitive matching. e.g. ["Planet in Pixel", "Content creators", "one word"]
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

export const EmphasisSerifCyanStyle: React.FC<EmphasisSerifCyanProps> = ({
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

  // Determines which words receive the cyan italic serif emphasis
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
            }}
          >
            {isHighlight ? (
              // Highlighted words in Cyan Italic Serif (Image 2 style) with exact baseline match
              <span
                style={{
                  display: "inline-block",
                  fontFamily: "'Playfair Display', Georgia, serif",
                  fontStyle: "italic",
                  fontWeight: 600,
                  fontSize: `${fontSize}px`,
                  lineHeight: 1.2,
                  color: "#00C2FF",
                  textShadow:
                    "0 0 18px rgba(0, 194, 255, 0.75), 0 4px 10px rgba(0,0,0,0.9)",
                  whiteSpace: "nowrap",
                  verticalAlign: "baseline",
                }}
              >
                {token.text}
              </span>
            ) : (
              // Base words in Bold Sans White (Image 2 style) with exact baseline match
              <span
                style={{
                  display: "inline-block",
                  fontFamily: "'Inter', sans-serif",
                  fontWeight: 800,
                  fontSize: `${fontSize}px`,
                  lineHeight: 1.2,
                  color: "#FFFFFF",
                  textShadow: "0 4px 10px rgba(0,0,0,0.9)",
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
