import lockIcon from "@/assets/sentinel/lock.jpg";

export const Nav = () => {
  return (
    <header className="relative z-30">
      <nav className="container flex items-center justify-between py-5 sm:py-7">
        <a
          href="#top"
          className="flex items-center gap-2.5 transition-opacity hover:opacity-90"
          aria-label="Sentinel home"
        >
          <span className="flex h-9 w-9 items-center justify-center overflow-hidden rounded-xl border border-border/70 bg-card shadow-soft">
            <img
              src={lockIcon}
              alt=""
              aria-hidden="true"
              className="h-full w-full object-cover"
            />
          </span>
          <span className="text-base font-semibold tracking-tight text-foreground">
            Sentinel
          </span>
        </a>

        <a
          href="#waitlist"
          className="hidden rounded-full border border-border/70 bg-secondary/40 px-4 py-2 text-xs font-medium text-foreground/90 backdrop-blur transition-colors hover:bg-secondary/70 sm:inline-flex"
        >
          Join waitlist
        </a>
      </nav>
    </header>
  );
};
