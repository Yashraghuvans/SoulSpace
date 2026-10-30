"use client";

import NavBar from "./NavBar";
import Footer from "./footer";

export default function PageShell({
  children,
  className = "",
  withFooter = true,
  mainClassName = "pt-24 sm:pt-28 pb-16 min-h-screen",
}) {
  return (
    <div className={`min-h-screen bg-surface text-text ${className}`}>
      <NavBar />
      <main className={mainClassName}>{children}</main>
      {withFooter ? <Footer compact /> : null}
    </div>
  );
}
