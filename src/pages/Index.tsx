import { MotionConfig } from "framer-motion";
import { Navbar } from "@/components/Navbar";
import { ScrollProgress } from "@/components/ScrollProgress";
import { SmoothScroll } from "@/components/SmoothScroll";
import { TechMarquee } from "@/components/TechMarquee";
import { Hero } from "@/components/sections/Hero";
import { About } from "@/components/sections/About";
import { Experience } from "@/components/sections/Experience";
import { Projects } from "@/components/sections/Projects";
import { Skills } from "@/components/sections/Skills";
import { Contact } from "@/components/sections/Contact";
import { Footer } from "@/components/Footer";

const Index = () => (
  <MotionConfig reducedMotion="user">
    <a
      href="#about"
      className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[80] focus:rounded-full focus:bg-primary focus:px-5 focus:py-3 focus:text-xs focus:font-semibold focus:uppercase focus:tracking-[0.2em] focus:text-primary-foreground"
    >
      Skip to content
    </a>
    <SmoothScroll />
    <ScrollProgress />
    <Navbar />
    <main className="relative overflow-x-clip">
      <Hero />
      <TechMarquee />
      <About />
      <Experience />
      <Projects />
      <Skills />
      <Contact />
    </main>
    <Footer />
  </MotionConfig>
);

export default Index;
