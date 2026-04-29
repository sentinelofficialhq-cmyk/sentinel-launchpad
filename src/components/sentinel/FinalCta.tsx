import { WaitlistForm } from "./WaitlistForm";

export const FinalCta = () => {
  return (
    <section className="relative py-20 sm:py-28">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 mx-auto h-px max-w-3xl bg-gradient-to-r from-transparent via-primary/40 to-transparent"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 mx-auto h-40 max-w-xl bg-primary/10 blur-3xl"
      />

      <div className="container relative">
        <div className="mx-auto max-w-md text-center">
          <h2 className="text-balance text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
            Get notified when{" "}
            <span className="text-gradient-green">Sentinel launches.</span>
          </h2>
          <p className="mt-4 text-sm text-muted-foreground sm:text-base">
            Be first in line on release day.
          </p>

          <div className="mt-8">
            <WaitlistForm variant="compact" formId="cta" />
          </div>
        </div>
      </div>
    </section>
  );
};
