import type { ReactNode } from "react";
import { motion } from "framer-motion";
import { Reveal } from "@/components/Reveal";
import { SplitReveal, ease } from "@/components/motion";
import { cn } from "@/lib/utils";

type SectionProps = {
  id: string;
  index: string;
  eyebrow: string;
  title: ReactNode;
  intro?: ReactNode;
  children: ReactNode;
  className?: string;
};

export const SectionLabel = ({ index, eyebrow }: { index: string; eyebrow: string }) => (
  <div className="flex items-center gap-4">
    <span className="eyebrow !text-primary">{index}</span>
    <motion.span
      className="h-px w-8 origin-left bg-primary/50"
      initial={{ scaleX: 0 }}
      whileInView={{ scaleX: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 1, ease, delay: 0.15 }}
    />
    <span className="eyebrow">{eyebrow}</span>
  </div>
);

export const Section = ({ id, index, eyebrow, title, intro, children, className }: SectionProps) => (
  <section id={id} className={cn("relative scroll-mt-20 py-20 sm:py-24 lg:py-32", className)}>
    <div className="container-x">
      <div className="mb-12 grid gap-6 sm:mb-16 lg:mb-20 lg:grid-cols-12 lg:gap-10">
        <Reveal className="lg:col-span-3 lg:pt-3">
          <SectionLabel index={index} eyebrow={eyebrow} />
        </Reveal>
        <div className="lg:col-span-9">
          <h2 className="heading-xl max-w-4xl">
            <SplitReveal>{title}</SplitReveal>
          </h2>
          {intro && (
            <Reveal delay={0.25}>
              <p className="body-lg mt-5 max-w-2xl sm:mt-6">{intro}</p>
            </Reveal>
          )}
        </div>
      </div>
      {children}
    </div>
  </section>
);
