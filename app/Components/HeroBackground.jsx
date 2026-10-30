"use client";

import dynamic from "next/dynamic";
import { heroAmbientConfig } from "../../remotion/HeroAmbient";

const Player = dynamic(
  () => import("@remotion/player").then((mod) => mod.Player),
  { ssr: false }
);

const HeroAmbient = dynamic(
  () =>
    import("../../remotion/HeroAmbient").then((mod) => mod.HeroAmbient),
  { ssr: false }
);

export default function HeroBackground() {
  return (
    <div className="absolute inset-0 -z-10 overflow-hidden" aria-hidden>
      <Player
        component={HeroAmbient}
        durationInFrames={heroAmbientConfig.durationInFrames}
        fps={heroAmbientConfig.fps}
        compositionWidth={heroAmbientConfig.width}
        compositionHeight={heroAmbientConfig.height}
        loop
        autoPlay
        muted
        controls={false}
        style={{
          width: "100%",
          height: "100%",
        }}
        className="[&_video]:object-cover [&_video]:h-full [&_video]:w-full"
      />
    </div>
  );
}
