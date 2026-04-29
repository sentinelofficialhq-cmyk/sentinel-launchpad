export const Footer = () => {
  return (
    <footer className="border-t border-border/60 py-10">
      <div className="container flex flex-col items-center justify-between gap-3 text-xs text-muted-foreground sm:flex-row">
        <p>© {new Date().getFullYear()} Sentinel. All rights reserved.</p>
        <p className="text-muted-foreground/70">
          Built for fans. Not a sportsbook.
        </p>
      </div>
    </footer>
  );
};
