import { useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowUpRight, Github } from "lucide-react";
import { ProjectArchive } from "@/components/ProjectArchive";
import { Reveal } from "@/components/Reveal";
import { Section } from "@/components/Section";
import { featuredProjects, type Project } from "@/data/cv";
import { cn } from "@/lib/utils";

const FEATURE_PREVIEW = 6;
const pad = (n: number) => String(n).padStart(2, "0");

const ProjectVisual = ({ project, index }: { project: Project; index: number }) => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const scale = useTransform(scrollYProgress, [0, 0.35], [0.9, 1]);
  const nameY = useTransform(scrollYProgress, [0, 1], ["35%", "-35%"]);
  const glowX = useTransform(scrollYProgress, [0, 1], ["-20%", "20%"]);

  return (
    <motion.div
      ref={ref}
      style={{ scale }}
      className="card-surface group/visual relative flex aspect-[4/3] flex-col overflow-hidden sm:aspect-[16/11]"
    >
      {/* window chrome */}
      <div className="flex items-center gap-3 border-b border-border px-4 py-3 sm:px-5">
        <div className="flex gap-1.5">
          {[0, 1, 2].map((d) => (
            <span key={d} className="h-2 w-2 rounded-full bg-foreground/10 sm:h-2.5 sm:w-2.5" />
          ))}
        </div>
        <span className="mx-auto max-w-[70%] truncate rounded-full bg-foreground/[0.04] px-4 py-1 text-[10.5px] font-medium tracking-[0.04em] text-muted-foreground">
          {project.domain ?? (project.repo ? project.repo.replace("https://", "") : "private build")}
        </span>
        <span className="w-[30px] sm:w-[42px]" />
      </div>

      <div className="relative flex flex-1 flex-col justify-between p-5 sm:p-8">
        <motion.div
          aria-hidden
          className="pointer-events-none absolute -right-16 -top-16 h-72 w-72 rounded-full opacity-70 blur-3xl transition-opacity duration-1000 group-hover/visual:opacity-100"
          style={{
            x: glowX,
            background: "radial-gradient(closest-side, hsl(38 46% 64% / 0.2), transparent)",
          }}
        />
        <div className="flex items-start justify-between gap-4">
          <span className="eyebrow leading-relaxed">{project.kind}</span>
          <span className="text-[11px] font-semibold tracking-[0.2em] text-primary">{pad(index + 1)}</span>
        </div>

        <motion.p className="fit" style={{ y: nameY }}>
          <span className="block truncate text-[length:11cqw] font-extralight uppercase leading-none tracking-[-0.03em] text-foreground/90 transition-transform duration-1000 group-hover/visual:-translate-y-1">
            {project.name}
          </span>
        </motion.p>

        <dl className="grid grid-cols-3 gap-3 border-t border-border pt-4 sm:pt-5">
          {(project.metrics ?? []).slice(0, 2).map((m) => (
            <div key={m.label} className="flex flex-col-reverse justify-end gap-1.5">
              <dt className="text-[9.5px] font-semibold uppercase tracking-[0.16em] text-muted-foreground sm:text-[10px]">
                {m.label}
              </dt>
              <dd className="text-xl font-light tracking-[-0.03em] sm:text-3xl">{m.value}</dd>
            </div>
          ))}
          <div className="flex flex-col-reverse justify-end gap-1.5">
            <dt className="text-[9.5px] font-semibold uppercase tracking-[0.16em] text-muted-foreground sm:text-[10px]">
              Features
            </dt>
            <dd className="text-xl font-light tracking-[-0.03em] sm:text-3xl">{project.features.length}</dd>
          </div>
        </dl>
      </div>
    </motion.div>
  );
};

const FeaturedProject = ({ project, index }: { project: Project; index: number }) => {
  const [showAll, setShowAll] = useState(false);
  const flip = index % 2 === 1;
  const features = showAll ? project.features : project.features.slice(0, FEATURE_PREVIEW);
  const hidden = project.features.length - FEATURE_PREVIEW;

  return (
    <article className="grid grid-cols-1 items-center gap-8 border-t border-border py-12 sm:gap-10 sm:py-16 lg:grid-cols-12 lg:gap-14 lg:py-20">
      <Reveal className={cn("min-w-0 lg:col-span-7", flip && "lg:order-2")}>
        <ProjectVisual project={project} index={index} />
      </Reveal>

      <Reveal delay={0.1} className={cn("min-w-0 lg:col-span-5", flip && "lg:order-1")}>
        <p className="eyebrow mb-4 !text-primary">{project.tagline}</p>
        <h3 className="heading-lg !font-normal">{project.name}</h3>
        <p className="body mt-5">{project.description}</p>

        {project.metrics && project.metrics.length > 2 && (
          <ul className="mt-6 flex flex-wrap gap-x-5 gap-y-2 border-l border-primary/50 pl-4">
            {project.metrics.map((m) => (
              <li key={m.label} className="text-[13px]">
                <span className="font-semibold text-foreground">{m.value}</span>{" "}
                <span className="text-muted-foreground">{m.label.toLowerCase()}</span>
              </li>
            ))}
          </ul>
        )}

        <ul className="mt-7 flex flex-wrap gap-2">
          {features.map((f) => (
            <li key={f} className="chip">
              {f}
            </li>
          ))}
          {hidden > 0 && (
            <li>
              <button
                onClick={() => setShowAll((s) => !s)}
                className="chip !border-primary/40 !text-primary hover:!bg-primary/10"
                aria-expanded={showAll}
              >
                {showAll ? "Show less" : `+${hidden} more`}
              </button>
            </li>
          )}
        </ul>

        <div className="mt-8 flex flex-col gap-5 border-t border-border pt-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-[12.5px] leading-relaxed text-muted-foreground">{project.stack.join(" · ")}</p>
          {(project.url || project.repo) && (
            <div className="flex shrink-0 flex-wrap gap-2">
              {project.url && (
                <a href={project.url} target="_blank" rel="noreferrer" className="btn-ghost !min-h-[42px] !px-5">
                  Visit site <ArrowUpRight className="h-3.5 w-3.5" />
                </a>
              )}
              {project.repo && (
                <a href={project.repo} target="_blank" rel="noreferrer" className="btn-ghost !min-h-[42px] !px-5">
                  <Github className="h-3.5 w-3.5" /> Code
                </a>
              )}
            </div>
          )}
        </div>
      </Reveal>
    </article>
  );
};

export const Projects = () => (
  <Section
    id="work"
    index="03"
    eyebrow="Selected work"
    title={
      <>
        Platforms that <span className="font-normal text-champagne">run real businesses.</span>
      </>
    }
    intro="SaaS platforms, e-commerce and trade portals, restaurant systems and business websites — each built, deployed and maintained end-to-end."
  >
    <div>
      {featuredProjects.map((p, i) => (
        <FeaturedProject key={p.name} project={p} index={i} />
      ))}
    </div>

    <ProjectArchive />
  </Section>
);
