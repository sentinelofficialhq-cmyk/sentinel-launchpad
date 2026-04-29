import { useEffect } from "react";
import { Features } from "@/components/sentinel/Features";
import { FinalCta } from "@/components/sentinel/FinalCta";
import { Footer } from "@/components/sentinel/Footer";
import { Hero } from "@/components/sentinel/Hero";
import { Nav } from "@/components/sentinel/Nav";
import { persistUtmParams } from "@/lib/utm";

const Index = () => {
  useEffect(() => {
    persistUtmParams();
  }, []);

  return (
    <div className="min-h-screen bg-background font-sans">
      <Nav />
      <main>
        <Hero />
        <Features />
        <FinalCta />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
