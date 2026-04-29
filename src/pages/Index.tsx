import { Features } from "@/components/sentinel/Features";
import { FinalCta } from "@/components/sentinel/FinalCta";
import { Footer } from "@/components/sentinel/Footer";
import { Hero } from "@/components/sentinel/Hero";
import { Nav } from "@/components/sentinel/Nav";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
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
