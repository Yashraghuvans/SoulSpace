import FadeIn from "./FadeIn";

export default function SectionHeading({
  eyebrow,
  title,
  description,
  align = "center",
}) {
  const alignClass =
    align === "left" ? "text-left items-start" : "text-center items-center";

  return (
    <FadeIn className={`flex flex-col gap-3 mb-12 sm:mb-16 max-w-2xl ${align === "center" ? "mx-auto" : ""} ${alignClass}`}>
      {eyebrow ? (
        <span className="text-xs sm:text-sm font-medium tracking-[0.2em] uppercase text-accent">
          {eyebrow}
        </span>
      ) : null}
      <h2 className="text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-tight text-text">
        {title}
      </h2>
      {description ? (
        <p className="text-base sm:text-lg text-text-muted leading-relaxed">
          {description}
        </p>
      ) : null}
    </FadeIn>
  );
}
