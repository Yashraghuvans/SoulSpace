"use client";

import { useEffect, useRef, useState } from "react";
import { Player } from "@remotion/player";
import {
  DashboardPreview,
  dashboardPreviewConfig,
} from "../../remotion/DashboardPreview";

function DashboardSkeleton() {
  return (
    <div className="absolute inset-0 animate-pulse bg-[#121820]" aria-hidden>
      <div className="flex h-full gap-2 p-3 opacity-60">
        <div className="w-[22%] rounded-lg bg-[#1a222d]" />
        <div className="flex flex-1 flex-col gap-2">
          <div className="h-8 rounded-lg bg-[#1a222d]" />
          <div className="grid flex-1 grid-cols-4 gap-2">
            {[0, 1, 2, 3].map((i) => (
              <div key={i} className="rounded-lg bg-[#1a222d]" />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function RemotionDashboardPlayer({
  className = "",
  initialFrame = 45,
  showControls = false,
}) {
  const containerRef = useRef(null);
  const [canPlay, setCanPlay] = useState(false);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const update = () => {
      const { width, height } = el.getBoundingClientRect();
      setCanPlay(width >= 48 && height >= 48);
    };

    update();
    const ro = new ResizeObserver(update);
    ro.observe(el);
    window.addEventListener("resize", update);

    return () => {
      ro.disconnect();
      window.removeEventListener("resize", update);
    };
  }, []);

  return (
    <div ref={containerRef} className={`relative h-full w-full ${className}`}>
      {!canPlay ? <DashboardSkeleton /> : null}
      {canPlay ? (
        <Player
          component={DashboardPreview}
          durationInFrames={dashboardPreviewConfig.durationInFrames}
          fps={dashboardPreviewConfig.fps}
          compositionWidth={dashboardPreviewConfig.width}
          compositionHeight={dashboardPreviewConfig.height}
          initialFrame={initialFrame}
          loop
          autoPlay
          muted
          controls={showControls}
          clickToPlay={false}
          spaceKeyToPlayOrPause={false}
          overflowVisible={false}
          style={{
            width: "100%",
            height: "100%",
            display: "block",
          }}
        />
      ) : null}
    </div>
  );
}
