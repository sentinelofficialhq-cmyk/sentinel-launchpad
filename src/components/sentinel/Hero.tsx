import { Sparkles } from "lucide-react";
import { FloatingPreviews } from "./FloatingPreviews";
import { WaitlistForm } from "./WaitlistForm";

export const Hero = () => {
  return (
    <section
      id="top"
      className="relative isolate overflow-hidden pb-20 pt-10 sm:pb-28 sm:pt-14 lg:pb-36 lg:pt-20"
    >
      <FloatingPreviews />

      <div className="container relative z-10">
        <div className="mx-auto max-w-2xl text-center">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-border/70 bg-secondary/40 px-3.5 py-1.5 text-xs font-medium text-muted-foreground backdrop-blur">
            <Sparkles
              className="h-3.5 w-3.5 text-primary"
              strokeWidth={2.5}
            />
            <span>AI-powered sports intelligence</span>
          </div>

          <h1 className="text-balance text-4xl font-semibold leading-[1.05] tracking-tight text-foreground sm:text-5xl lg:text-6xl">
            Smarter Sports Insights.
            <br />
            <span className="text-gradient-green">Gain Your Edge.</span>
          </h1>

          <p className="mx-auto mt-5 max-w-xl text-balance text-base leading-relaxed text-muted-foreground sm:mt-6 sm:text-lg">
            Join the Sentinel waitlist for early access, launch updates, and
            AI-powered picks built for serious sports fans.
          </p>

          <div
            id="waitlist"
            className="mx-auto mt-9 max-w-md scroll-mt-24 sm:mt-11"
          >
            <WaitlistForm variant="hero" formId="hero" />
          </div>
        </div>
      </div>
    </section>
  );
};
