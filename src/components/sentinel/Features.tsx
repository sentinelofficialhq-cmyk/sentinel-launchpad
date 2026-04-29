import { Activity, LineChart, Sparkles, type LucideIcon } from "lucide-react";

interface Feature {
  icon: LucideIcon;
  title: string;
  description: string;
}

const features: Feature[] = [
  {
    icon: Sparkles,
    title: "Daily AI Picks",
    description: "High-confidence picks delivered every morning.",
  },
  {
    icon: Activity,
    title: "Live Game Insights",
    description: "Real-time edges as games unfold.",
  },
  {
    icon: LineChart,
    title: "Predictive Analysis",
    description: "Models trained on millions of data points.",
  },
];

export const Features = () => {
  return (
    <section className="relative py-20 sm:py-28">
      <div className="container">
        <div className="mx-auto mb-12 max-w-2xl text-center sm:mb-16">
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-primary">
            Inside Sentinel
          </p>
          <h2 className="text-balance text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
            Built for fans who take the game seriously.
          </h2>
        </div>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 lg:gap-6">
          {features.map(({ icon: Icon, title, description }) => (
            <div
              key={title}
              className="glass-card group relative overflow-hidden p-6 transition-all duration-300 hover:-translate-y-1 hover:border-primary/30 sm:p-7"
            >
              <div className="mb-5 flex h-11 w-11 items-center justify-center rounded-xl border border-primary/30 bg-primary/10 text-primary transition-colors group-hover:bg-primary/15">
                <Icon className="h-5 w-5" strokeWidth={2.25} />
              </div>
              <h3 className="text-lg font-semibold tracking-tight text-foreground">
                {title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                {description}
              </p>

              <div
                aria-hidden="true"
                className="pointer-events-none absolute -right-16 -top-16 h-40 w-40 rounded-full bg-primary/10 opacity-0 blur-3xl transition-opacity duration-500 group-hover:opacity-100"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
