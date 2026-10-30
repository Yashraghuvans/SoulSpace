"use client";

import FadeIn from "./FadeIn";

export default function Footer({ compact = false }) {
  return (
    <footer
      id="contact"
      className={`border-t border-border bg-surface ${compact ? "py-10" : "section-pad"}`}
    >
      <div className="container-wide">
        <div
          className={`grid gap-10 ${compact ? "lg:grid-cols-[1fr_auto]" : "lg:grid-cols-2"} lg:items-start`}
        >
          <FadeIn>
            <p className="text-xs font-medium tracking-[0.2em] uppercase text-accent">
              Soul Space
            </p>
            <h2 className="mt-3 text-2xl sm:text-3xl font-semibold tracking-tight text-text">
              {compact ? "Here when you need a pause" : "Contact us"}
            </h2>
            <p className="mt-3 max-w-md text-sm sm:text-base leading-relaxed text-text-muted">
              A quiet corner for mental wellness — tools that meet you where you
              are, on phone, tablet, or desktop.
            </p>
          </FadeIn>

          <FadeIn delay={0.08}>
            <form
              className="glass-panel rounded-2xl p-5 sm:p-6 space-y-4"
              onSubmit={(e) => e.preventDefault()}
            >
              <div className="grid gap-4 sm:grid-cols-2">
                <label className="block text-sm">
                  <span className="mb-1.5 block text-text-muted">Name</span>
                  <input
                    type="text"
                    required
                    className="w-full rounded-xl border border-border bg-surface px-3 py-2.5 text-sm text-text outline-none transition-[border-color,box-shadow] focus:border-accent/50 focus:ring-2 focus:ring-accent/20"
                    placeholder="Your name"
                  />
                </label>
                <label className="block text-sm">
                  <span className="mb-1.5 block text-text-muted">Email</span>
                  <input
                    type="email"
                    required
                    className="w-full rounded-xl border border-border bg-surface px-3 py-2.5 text-sm text-text outline-none transition-[border-color,box-shadow] focus:border-accent/50 focus:ring-2 focus:ring-accent/20"
                    placeholder="you@email.com"
                  />
                </label>
              </div>
              <label className="block text-sm">
                <span className="mb-1.5 block text-text-muted">Message</span>
                <textarea
                  required
                  rows={4}
                  className="w-full resize-y rounded-xl border border-border bg-surface px-3 py-2.5 text-sm text-text outline-none transition-[border-color,box-shadow] focus:border-accent/50 focus:ring-2 focus:ring-accent/20"
                  placeholder="How can we help?"
                  defaultValue=""
                />
              </label>
              <button
                type="submit"
                className="w-full sm:w-auto rounded-full bg-accent px-6 py-3 text-sm font-medium text-surface transition-colors hover:bg-accent-hover"
              >
                Send message
              </button>
            </form>
          </FadeIn>
        </div>

        <p className="mt-10 text-center text-xs text-text-muted">
          © {new Date().getFullYear()} Soul Space. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
