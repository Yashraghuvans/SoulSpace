"use client";

import Link from "next/link";
import RemotionDashboardPlayer from "./RemotionDashboardPlayer";

export default function DashboardBrowserFrame({
  url = "app.soulspace.dev/dashboard",
  initialFrame = 45,
  compact = false,
  className = "",
}) {
  return (
    <div
      className={`overflow-hidden rounded-2xl border border-border bg-surface-elevated shadow-[0_24px_80px_rgba(0,0,0,0.4)] ${className}`}
    >
      <div
        className={`flex items-center gap-2 border-b border-border bg-surface-muted/50 ${
          compact ? "px-2.5 py-2" : "px-3 py-2.5"
        }`}
      >
        <span className="h-2 w-2 rounded-full bg-red-500/80 sm:h-2.5 sm:w-2.5" aria-hidden />
        <span className="h-2 w-2 rounded-full bg-amber-400/80 sm:h-2.5 sm:w-2.5" aria-hidden />
        <span className="h-2 w-2 rounded-full bg-emerald-500/80 sm:h-2.5 sm:w-2.5" aria-hidden />
        <span
          className={`ml-2 flex-1 truncate rounded-md border border-border bg-surface text-text-muted ${
            compact ? "px-2 py-0.5 text-[10px]" : "px-3 py-1 text-xs"
          }`}
        >
          {url}
        </span>
      </div>
      <div
        className={`relative w-full overflow-hidden bg-[#0b0f14] ${
          compact ? "h-[220px] sm:h-[260px]" : "aspect-video min-h-[280px]"
        }`}
      >
        <RemotionDashboardPlayer initialFrame={initialFrame} />
      </div>
      {compact ? (
        <Link
          href="#dashboard-preview"
          className="block border-t border-border py-2.5 text-center text-xs font-medium text-accent transition-colors hover:text-accent-hover"
        >
          Open full preview ↓
        </Link>
      ) : null}
    </div>
  );
}
