import { useRef, useState } from "react";
import { AnimatePresence, motion, useScroll, useSpring } from "framer-motion";
import { ArrowUpRight, Plus } from "lucide-react";
import { Reveal } from "@/components/Reveal";
import { Section } from "@/components/Section";
import { experience, type Role } from "@/data/cv";
import { cn } from "@/lib/utils";

const PREVIEW = 4;

const Bullet = ({ text }: { text: string }) => (
  <li className="flex gap-4">
    <span className="mt-[0.72em] h-px w-3 shrink-0 bg-primary" />
    <span>{text}</span>
  </li>
);

const RoleRow = ({ role, index }: { role: Role; index: number }) => {
  const [expanded, setExpanded] = useState(false);
  const limit = role.showAllHighlights ? role.highlights.length : PREVIEW;
  const shown = role.highlights.slice(0, limit);
  const rest = role.highlights.slice(limit);

  return (
    <Reveal delay={index * 0.08}>
      <article className="relative grid gap-6 border-t border-border py-10 sm:py-14 lg:grid-cols-12 lg:gap-10 lg:py-16">
        {/* timeline node */}
        {/* The wrapper is observed (a scale-0 element has no area, so it would never intersect). */}
        <motion.span
          aria-hidden
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-120px 0px" }}
          className="absolute -left-[29px] top-[4.25rem] hidden h-[11px] w-[11px] lg:block"
        >
          <motion.span
            variants={{ hidden: { scale: 0 }, show: { scale: 1 } }}
            transition={{ type: "spring", stiffness: 260, damping: 18, delay: 0.2 }}
            className="block h-full w-full rounded-full border-2 border-background bg-primary shadow-[0_0_0_4px_hsl(var(--primary)/0.15)]"
          />
        </motion.span>
        <header className="flex flex-wrap items-start justify-between gap-4 lg:col-span-3 lg:block">
          <div>
            {role.current && (
              <span className="mb-4 inline-flex items-center gap-2 rounded-full border border-emerald-400/30 bg-emerald-400/[0.06] px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.2em] text-emerald-300">
                <span className="relative flex h-1.5 w-1.5">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400/70" />
                  <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-400" />
                </span>
                Current role
              </span>
            )}
            {role.companyUrl ? (
              <a
                href={role.companyUrl}
                target="_blank"
                rel="noreferrer"
                className="group flex items-center gap-1.5 text-lg font-semibold tracking-[-0.01em] sm:text-xl"
              >
                <span className="text-champagne">{role.company}</span>
                <ArrowUpRight className="h-4 w-4 text-primary transition-transform duration-500 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </a>
            ) : (
              <p className="text-lg font-semibold tracking-[-0.01em] text-champagne sm:text-xl">{role.company}</p>
            )}
            <p className="mt-1 text-[13px] text-muted-foreground">{role.companyType}</p>
          </div>
          {role.period && (
            <p className="eyebrow rounded-full border border-border px-3 py-2 lg:mt-6 lg:inline-block">{role.period}</p>
          )}
          {role.facts && (
            <dl className="w-full space-y-4 border-t border-border pt-5 lg:mt-8 lg:pt-6">
              {role.facts.map((f) => (
                <div key={f.label}>
                  <dt className="eyebrow mb-1.5">{f.label}</dt>
                  <dd className="text-[13px] leading-relaxed text-foreground/80">
                    {f.href ? (
                      <a href={f.href} target="_blank" rel="noreferrer" className="link-underline hover:text-primary">
                        {f.value}
                      </a>
                    ) : (
                      f.value
                    )}
                  </dd>
                </div>
              ))}
            </dl>
          )}
        </header>

        <div className="lg:col-span-9">
          <h3 className="heading-lg">{role.title}</h3>
          {role.about && <p className="body mt-5 max-w-3xl">{role.about}</p>}

          <ul className="body mt-7 grid gap-x-10 gap-y-4 md:grid-cols-2">
            {shown.map((h) => (
              <Bullet key={h} text={h} />
            ))}
          </ul>

          <AnimatePresence initial={false}>
            {expanded && (
              <motion.ul
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                className="body grid gap-x-10 gap-y-4 overflow-hidden pt-4 md:grid-cols-2"
              >
                {rest.map((h) => (
                  <Bullet key={h} text={h} />
                ))}
              </motion.ul>
            )}
          </AnimatePresence>

          {rest.length > 0 && (
            <button
              onClick={() => setExpanded((e) => !e)}
              className="mt-6 inline-flex min-h-[44px] items-center gap-2.5 text-[11px] font-semibold uppercase tracking-[0.2em] text-foreground/80 transition-colors hover:text-primary"
              aria-expanded={expanded}
            >
              <span className="grid h-7 w-7 place-items-center rounded-full border border-border">
                <Plus className={cn("h-3.5 w-3.5 transition-transform duration-500", expanded && "rotate-45")} />
              </span>
              {expanded ? "Show less" : `${rest.length} more responsibilities`}
            </button>
          )}

          {role.focus && (
            <div className="mt-9 grid gap-x-10 gap-y-8 md:grid-cols-2">
              {role.focus.map((area) => (
                <div key={area.title}>
                  <h4 className="eyebrow mb-4 !text-foreground/90">{area.title}</h4>
                  <ul className="body grid gap-3">
                    {area.items.map((item) => (
                      <Bullet key={item} text={item} />
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          )}

          {role.stack.length > 0 && (
            <div className="mt-7 flex flex-wrap gap-2">
              {role.stack.map((s) => (
                <span key={s} className="chip">
                  {s}
                </span>
              ))}
            </div>
          )}
        </div>
      </article>
    </Reveal>
  );
};

const Timeline = () => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 75%", "end 60%"] });
  const scaleY = useSpring(scrollYProgress, { stiffness: 120, damping: 30, restDelta: 0.001 });

  return (
    <div ref={ref} className="relative border-b border-border">
      {/* rail + progress line (desktop) */}
      <span aria-hidden className="absolute -left-6 bottom-0 top-0 hidden w-px bg-border lg:block" />
      <motion.span
        aria-hidden
        style={{ scaleY }}
        className="absolute -left-6 bottom-0 top-0 hidden w-px origin-top bg-gradient-to-b from-primary via-primary to-primary/0 lg:block"
      />
      {experience.map((role, i) => (
        <RoleRow key={`${role.company}-${role.title}`} role={role} index={i} />
      ))}
    </div>
  );
};

export const Experience = () => (
  <Section
    id="experience"
    index="02"
    eyebrow="Experience"
    title={
      <>
        Agency-tested, <span className="font-normal text-champagne">production-proven.</span>
      </>
    }
    intro="Currently building and hosting client projects at a UK design agency — after two agencies of shipping features to production and keeping them running."
  >
    <Timeline />
  </Section>
);
