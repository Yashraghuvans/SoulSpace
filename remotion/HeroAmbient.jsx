import {
  AbsoluteFill,
  interpolate,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";

const ORBS = [
  { x: 0.22, y: 0.35, size: 420, delay: 0, hue: 160 },
  { x: 0.78, y: 0.55, size: 360, delay: 40, hue: 200 },
  { x: 0.5, y: 0.72, size: 280, delay: 80, hue: 140 },
];

export const HeroAmbient = () => {
  const frame = useCurrentFrame();
  const { durationInFrames } = useVideoConfig();

  return (
    <AbsoluteFill
      style={{
        background:
          "radial-gradient(ellipse 120% 80% at 50% 0%, #141c26 0%, #0b0f14 55%, #080a0e 100%)",
      }}
    >
      {ORBS.map((orb, i) => {
        const breathe = interpolate(
          (frame + orb.delay) % durationInFrames,
          [0, durationInFrames / 2, durationInFrames],
          [0.85, 1.08, 0.85],
          { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
        );
        const driftX =
          Math.sin((frame + orb.delay * 2) / 90) * 24;
        const driftY =
          Math.cos((frame + orb.delay * 3) / 110) * 18;
        const opacity = interpolate(
          frame,
          [0, 30],
          [0, 0.35 + i * 0.05],
          { extrapolateRight: "clamp" }
        );

        return (
          <div
            key={i}
            style={{
              position: "absolute",
              left: `${orb.x * 100}%`,
              top: `${orb.y * 100}%`,
              width: orb.size * breathe,
              height: orb.size * breathe,
              transform: `translate(-50%, -50%) translate(${driftX}px, ${driftY}px)`,
              borderRadius: "50%",
              background: `radial-gradient(circle, hsla(${orb.hue}, 35%, 55%, 0.45) 0%, transparent 70%)`,
              opacity,
              filter: "blur(40px)",
            }}
          />
        );
      })}
      <AbsoluteFill
        style={{
          background:
            "linear-gradient(to bottom, transparent 40%, rgba(11, 15, 20, 0.85) 100%)",
        }}
      />
    </AbsoluteFill>
  );
};

export const heroAmbientConfig = {
  id: "HeroAmbient",
  durationInFrames: 240,
  fps: 30,
  width: 1920,
  height: 1080,
};
