import { useRef, type ReactNode } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowDownRight, Download } from "lucide-react";
import portrait from "@/assets/portrait.jpg";
import { profile, stats } from "@/data/cv";
import { CountUp, Stagger, StaggerItem } from "@/components/motion";

const ease = [0.22, 1, 0.36, 1] as const;

const fadeUp = (delay: number) => ({
  initial: { opacity: 0, y: 18 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 1, delay, ease },
});

const Mask = ({ children, delay, className }: { children: ReactNode; delay: number; className?: string }) => (
  <span className={`overflow-hidden align-bottom ${className ?? ""}`}>
    <motion.span className="inline-block" initial={{ y: "105%" }} animate={{ y: 0 }} transition={{ duration: 1.2, delay, ease }}>
      {children}
    </motion.span>
  </span>
);

export const Hero = () => {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  // The photo layer is 120% tall and starts 10% above its frame, so drifting it down by
  // up to 8% of its own height (~9.6% of the frame) never exposes an edge.
  const photoY = useTransform(scrollYProgress, [0, 1], ["0%", "8%"]);
  const contentY = useTransform(scrollYProgress, [0, 1], ["0%", "-6%"]);
  const fade = useTransform(scrollYProgress, [0, 0.75], [1, 0]);

  return (
    <>
      <section
        id="top"
        ref={ref}
        className="relative isolate flex min-h-[100svh] flex-col overflow-hidden pt-16 sm:pt-[72px]"
      >
        {/* Portrait backdrop — full-width banner on mobile/tablet, right half on desktop */}
        <motion.div
          initial={{ opacity: 0, scale: 1.04 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.8, ease }}
          className="absolute inset-x-0 top-0 -z-10 h-[70svh] overflow-hidden md:h-[78svh] lg:inset-y-0 lg:left-auto lg:right-0 lg:h-full lg:w-[54%]"
        >
          <motion.div style={{ y: photoY }} className="absolute inset-x-0 top-[-10%] h-[120%] overflow-hidden">
            <img
              src={portrait}
              alt={`Portrait of ${profile.firstName} ${profile.lastName}`}
              fetchPriority="high"
              className="h-full w-full origin-[50%_16%] scale-[1.55] object-cover object-[50%_12%] saturate-[0.72] md:scale-[1.35] lg:scale-[1.3] lg:object-[50%_20%]"
            />
          </motion.div>
          {/* tonal overlays that melt the photo into the page */}
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/55 to-background/30 lg:via-background/10 lg:to-transparent" />
          <div className="absolute inset-0 hidden bg-gradient-to-r from-background via-background/50 to-transparent lg:block" />
          <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-background/80 to-transparent" />
          <div
            className="absolute inset-0 mix-blend-soft-light"
            style={{ background: "linear-gradient(160deg, hsl(38 60% 60% / 0.35), transparent 60%)" }}
          />
        </motion.div>

        <motion.div style={{ y: contentY, opacity: fade }} className="container-x relative flex flex-1 flex-col">
          <div className="flex flex-1 flex-col">
            {/* Intro — below the name on mobile, top-left on desktop */}
            <div className="order-2 pb-12 pt-8 lg:order-1 lg:max-w-[50%] lg:pb-0 lg:pt-[13vh] xl:max-w-[44%]">
              <motion.p {...fadeUp(0.5)} className="eyebrow mb-6 flex flex-wrap items-center gap-x-4 gap-y-3">
                <span className="!text-primary">{profile.role}</span>
                <span className="h-px w-6 bg-primary/40" />
                <span>{profile.focus.join(" · ")}</span>
              </motion.p>

              <motion.h2 {...fadeUp(0.6)} className="heading-lg max-w-md !leading-[1.2]">
                Crafting production web apps — <span className="font-normal text-champagne">from schema to server.</span>
              </motion.h2>

              <motion.p {...fadeUp(0.72)} className="body mt-5 max-w-md">
                Laravel, Vue.js and MySQL on the build side; Linux, Docker, CI/CD and cloud on the ship side. I own
                features end-to-end — and keep them running in production.
              </motion.p>

              <motion.div {...fadeUp(0.85)} className="mt-8 flex flex-col gap-3 sm:flex-row">
                <a href="#work" className="btn-primary">
                  View selected work <ArrowDownRight className="h-4 w-4" />
                </a>
                <a href={profile.cvUrl} download className="btn-ghost backdrop-blur-sm">
                  <Download className="h-4 w-4" /> Download CV
                </a>
              </motion.div>
            </div>

            {/* Signature name — sits on the photo on mobile, spans the bottom on desktop */}
            <div className="order-1 mt-[42svh] md:mt-[50svh] lg:order-2 lg:mt-auto lg:pt-12">
              <h1 className="fit uppercase">
                <span className="sr-only">
                  {profile.firstName} {profile.lastName}, {profile.role}
                </span>
                <span
                  aria-hidden
                  className="block whitespace-nowrap text-[length:18.6cqw] leading-[0.9] tracking-[-0.045em] lg:text-[length:11.3cqw]"
                >
                  <Mask delay={0.25} className="block lg:inline-block">
                    <span className="font-extralight">{profile.firstName}</span>
                  </Mask>
                  <span className="hidden lg:inline"> </span>
                  <Mask delay={0.38} className="block lg:inline-block">
                    <span className="font-semibold text-champagne">{profile.lastName}</span>
                    <span className="font-extralight text-primary">.</span>
                  </Mask>
                </span>
              </h1>

              <motion.div
                {...fadeUp(1)}
                className="hidden items-center justify-between border-t border-foreground/10 py-6 lg:mt-4 lg:flex"
              >
                <p className="eyebrow">{profile.location}</p>
                <a href="#about" className="eyebrow inline-flex items-center gap-4 transition-colors hover:!text-foreground">
                  Scroll to explore
                  <span className="relative h-10 w-px overflow-hidden bg-foreground/15">
                    <motion.span
                      className="absolute inset-x-0 top-0 h-1/2 bg-primary"
                      animate={{ y: ["-100%", "200%"] }}
                      transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
                    />
                  </span>
                </a>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </section>

      {/* stats strip */}
      <div className="container-x pb-16 pt-4 sm:pb-20 lg:pt-8">
        <Stagger stagger={0.1} className="hairline-grid grid-cols-2 rounded-[var(--radius)] lg:grid-cols-4">
          {stats.map((s) => (
            <div key={s.label}>
              <StaggerItem className="flex flex-col gap-4 p-5 sm:p-7">
                <p className="stat-num">
                  <CountUp value={s.value} />
                </p>
                <p className="text-[11px] font-medium uppercase leading-snug tracking-[0.14em] text-muted-foreground sm:text-xs">
                  {s.label}
                </p>
              </StaggerItem>
            </div>
          ))}
        </Stagger>
      </div>
    </>
  );
};
