import analyze from "@/assets/sentinel/analyze.png";
import games from "@/assets/sentinel/games.png";
import inDepth from "@/assets/sentinel/in-depth.png";
import picks from "@/assets/sentinel/picks.png";
import profit from "@/assets/sentinel/profit.png";
import todaysEdge from "@/assets/sentinel/todays-edge.png";
import { cn } from "@/lib/utils";

interface PreviewCard {
  src: string;
  alt: string;
  className: string;
  mobile?: boolean;
  animation?: string;
}

const cards: PreviewCard[] = [
  {
    src: todaysEdge,
    alt: "Sentinel today's edge preview",
    className:
      "left-[-6%] top-[6%] w-[210px] -rotate-[10deg] sm:w-[260px] lg:left-[2%] lg:top-[10%] lg:w-[320px]",
    mobile: true,
    animation: "animate-float-slow",
  },
  {
    src: analyze,
    alt: "Sentinel matchup analysis preview",
    className:
      "right-[-8%] top-[2%] w-[200px] rotate-[8deg] sm:w-[260px] lg:right-[3%] lg:top-[6%] lg:w-[310px]",
    mobile: true,
    animation: "animate-float-slower",
  },
  {
    src: picks,
    alt: "Sentinel picks tab preview",
    className:
      "left-[-10%] bottom-[6%] hidden w-[260px] -rotate-[6deg] sm:block lg:left-[1%] lg:bottom-[4%] lg:w-[320px]",
    animation: "animate-float-slower",
  },
  {
    src: profit,
    alt: "Sentinel profit tracking preview",
    className:
      "right-[-8%] bottom-[4%] hidden w-[260px] rotate-[10deg] sm:block lg:right-[2%] lg:bottom-[2%] lg:w-[330px]",
    animation: "animate-float-slow",
  },
  {
    src: games,
    alt: "Sentinel games board preview",
    className:
      "left-[42%] top-[-6%] hidden w-[220px] -rotate-[4deg] xl:block xl:w-[280px]",
    animation: "animate-float-slow",
  },
  {
    src: inDepth,
    alt: "Sentinel in-depth analysis preview",
    className:
      "right-[40%] bottom-[-8%] hidden w-[220px] rotate-[6deg] xl:block xl:w-[280px]",
    animation: "animate-float-slower",
  },
];

export const FloatingPreviews = () => {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 overflow-hidden"
    >
      {/* Hero radial glow */}
      <div className="absolute inset-0 bg-hero-glow" />

      {cards.map((card, i) => (
        <div
          key={i}
          className={cn(
            "absolute will-change-transform",
            card.className,
            card.animation,
            !card.mobile && "hidden sm:block",
          )}
        >
          <div className="overflow-hidden rounded-[22px] border border-border/60 shadow-card opacity-50 sm:opacity-60 lg:opacity-70">
            <img
              src={card.src}
              alt={card.alt}
              loading="lazy"
              className="block w-full select-none blur-[1.5px] saturate-[0.9] sm:blur-[1px]"
              draggable={false}
            />
          </div>
        </div>
      ))}

      {/* Vignette to keep form readable */}
      <div className="absolute inset-0 bg-gradient-to-b from-background/40 via-background/70 to-background" />
      <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-background to-transparent" />
    </div>
  );
};
