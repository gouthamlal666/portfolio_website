import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight, Github } from "lucide-react";
import { Reveal } from "@/components/Reveal";
import { archiveProjects, type ArchiveProject, type ProjectCategory } from "@/data/cv";
import { cn } from "@/lib/utils";

type Filter = "All" | ProjectCategory;

const categories: ProjectCategory[] = ["SaaS & Apps", "E-commerce & Trade", "Hospitality", "Business Websites"];

const ArchiveCard = ({ project }: { project: ArchiveProject }) => (
  <article className="card-surface group flex h-full flex-col p-6 transition-colors duration-500 hover:border-primary/35 sm:p-7">
    <div className="flex items-start justify-between gap-4">
      <span className="eyebrow leading-relaxed !text-primary">{project.category}</span>
      {project.url && (
        <span className="inline-flex shrink-0 items-center gap-1.5 text-[10px] font-semibold uppercase tracking-[0.18em] text-emerald-400/90">
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" /> Live
        </span>
      )}
    </div>

    <h4 className="mt-6 text-xl font-normal tracking-[-0.015em] sm:text-[1.35rem]">{project.name}</h4>
    <p className="mt-1 text-[12.5px] font-medium text-muted-foreground">{project.client}</p>
    {project.builtAt && (
      <p className="mt-3 inline-flex w-fit items-center gap-2 rounded-full border border-primary/25 bg-primary/[0.06] px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.16em] text-primary">
        Built at {project.builtAt}
      </p>
    )}

    <p className="body mt-4">{project.summary}</p>

    <ul className="mt-5 space-y-2 text-[13px] text-foreground/80">
      {project.highlights.map((h) => (
        <li key={h} className="flex gap-3">
          <span className="mt-[0.6em] h-1 w-1 shrink-0 rotate-45 bg-primary/80" />
          {h}
        </li>
      ))}
    </ul>

    <div className="mt-auto pt-6">
      <p className="border-t border-border pt-4 text-[12px] leading-relaxed text-muted-foreground">
        {project.stack.join(" · ")}
      </p>
      {(project.url || project.repo) && (
        <div className="mt-4 flex flex-wrap gap-2">
          {project.url && (
            <a
              href={project.url}
              target="_blank"
              rel="noreferrer"
              className="inline-flex min-h-[36px] items-center gap-1.5 rounded-full border border-primary/40 px-4 text-[10.5px] font-semibold uppercase tracking-[0.16em] text-primary transition-colors hover:bg-primary hover:text-primary-foreground"
            >
              Live site <ArrowUpRight className="h-3.5 w-3.5" />
            </a>
          )}
          {project.repo && (
            <a
              href={project.repo}
              target="_blank"
              rel="noreferrer"
              className="inline-flex min-h-[36px] items-center gap-1.5 rounded-full border border-border px-4 text-[10.5px] font-semibold uppercase tracking-[0.16em] text-foreground/80 transition-colors hover:border-foreground/40 hover:text-foreground"
            >
              <Github className="h-3.5 w-3.5" /> Code
            </a>
          )}
        </div>
      )}
    </div>
  </article>
);

export const ProjectArchive = () => {
  const [filter, setFilter] = useState<Filter>("All");

  const counts = useMemo(() => {
    const c: Record<string, number> = { All: archiveProjects.length };
    archiveProjects.forEach((p) => (c[p.category] = (c[p.category] ?? 0) + 1));
    return c;
  }, []);

  const visible = filter === "All" ? archiveProjects : archiveProjects.filter((p) => p.category === filter);

  return (
    <div className="mt-20 sm:mt-28">
      <Reveal className="mb-8 flex flex-col gap-7 lg:mb-10">
        <div>
          <p className="eyebrow mb-4">More work</p>
          <h3 className="heading-lg">
            Client sites, platforms <span className="font-normal text-champagne">& products.</span>
          </h3>
        </div>

        {/* Filters — horizontally scrollable on small screens */}
        <div
          role="tablist"
          aria-label="Filter projects by category"
          className="-mx-5 flex gap-2 overflow-x-auto px-5 pb-1 [scrollbar-width:none] sm:mx-0 sm:flex-wrap sm:px-0 [&::-webkit-scrollbar]:hidden"
        >
          {(["All", ...categories] as Filter[]).map((c) => (
            <button
              key={c}
              role="tab"
              aria-selected={filter === c}
              onClick={() => setFilter(c)}
              className={cn(
                "inline-flex min-h-[40px] shrink-0 items-center gap-2 rounded-full border px-4 text-[11px] font-semibold uppercase tracking-[0.14em] transition-colors duration-300",
                filter === c
                  ? "border-primary bg-primary text-primary-foreground"
                  : "border-border text-muted-foreground hover:border-foreground/30 hover:text-foreground",
              )}
            >
              {c}
              <span className={cn("text-[10px]", filter === c ? "text-primary-foreground/70" : "text-primary")}>
                {counts[c] ?? 0}
              </span>
            </button>
          ))}
        </div>
      </Reveal>

      <motion.ul layout className="grid gap-4 md:grid-cols-2 md:gap-5 xl:grid-cols-3">
        <AnimatePresence mode="popLayout" initial={false}>
          {visible.map((p) => (
            <motion.li
              key={p.name}
              layout
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.97 }}
              transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            >
              <ArchiveCard project={p} />
            </motion.li>
          ))}
        </AnimatePresence>
      </motion.ul>
    </div>
  );
};
