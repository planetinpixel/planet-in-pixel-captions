import React from "react";
import { AbsoluteFill, Series, interpolate, useCurrentFrame } from "remotion";
import { CaptionRenderer } from "./CaptionRenderer";
import { CAPTION_STYLES_META, TOTAL_DURATION_FRAMES } from "./sampleData";

export const CinematicCaptionsShowcase: React.FC = () => {
  const cinematicStyles = CAPTION_STYLES_META.filter(
    (s) => s.category === "Cinematic"
  );

  return (
    <AbsoluteFill
      style={{
        backgroundColor: "#05070B",
        color: "#FFFFFF",
        fontFamily: "'Cinzel', serif",
        overflow: "hidden",
      }}
    >
      {/* Volumetric Cinema Vignette */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "radial-gradient(circle at 50% 50%, rgba(20, 24, 33, 0.9) 0%, rgba(5, 7, 11, 1) 100%)",
        }}
      />

      {/* Film Letterbox Header */}
      <div
        style={{
          position: "absolute",
          top: "40px",
          left: "60px",
          right: "60px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          zIndex: 50,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
          <div
            style={{
              padding: "4px 12px",
              border: "1px solid rgba(245, 158, 11, 0.6)",
              borderRadius: "4px",
              color: "#F59E0B",
              fontSize: "13px",
              fontWeight: 800,
              letterSpacing: "0.2em",
            }}
          >
            CINEMATIC SUITE
          </div>
          <div>
            <div
              style={{
                fontSize: "18px",
                fontWeight: 700,
                letterSpacing: "0.1em",
                color: "#F8FAFC",
              }}
            >
              PLANET IN PIXEL
            </div>
          </div>
        </div>
      </div>

      {/* Sequential Series for the 5 Cinematic Styles */}
      <Series>
        {cinematicStyles.map((meta, index) => {
          return (
            <Series.Sequence
              key={meta.id}
              durationInFrames={TOTAL_DURATION_FRAMES}
            >
              <CinematicShowcaseSlide
                meta={meta}
                index={index}
                total={cinematicStyles.length}
              />
            </Series.Sequence>
          );
        })}
      </Series>
    </AbsoluteFill>
  );
};

const CinematicShowcaseSlide: React.FC<{
  meta: (typeof CAPTION_STYLES_META)[0];
  index: number;
  total: number;
}> = ({ meta, index, total }) => {
  const frame = useCurrentFrame();

  const enterOpacity = interpolate(frame, [0, 15], [0, 1], {
    extrapolateRight: "clamp",
  });
  const enterSlideY = interpolate(frame, [0, 18], [15, 0], {
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill
      style={{
        opacity: enterOpacity,
        transform: `translateY(${enterSlideY}px)`,
      }}
    >
      {/* Title Header Card (Clean - No subtitle description) */}
      <div
        style={{
          position: "absolute",
          top: "160px",
          left: "50%",
          transform: "translateX(-50%)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "8px",
          textAlign: "center",
          maxWidth: "85%",
        }}
      >
        <span
          style={{
            fontSize: "12px",
            letterSpacing: "0.25em",
            color: meta.badgeColor,
            fontWeight: 700,
            textTransform: "uppercase",
            fontFamily: "'Space Grotesk', sans-serif",
          }}
        >
          CINEMATIC STYLE {String(index + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
        </span>

        <h2
          style={{
            fontSize: "36px",
            fontWeight: 700,
            color: "#FFFFFF",
            margin: "2px 0",
            letterSpacing: "0.06em",
          }}
        >
          {meta.name}
        </h2>
      </div>

      {/* Render the Cinematic Caption */}
      <CaptionRenderer styleId={meta.id} bottomPosition="34%" />
    </AbsoluteFill>
  );
};
