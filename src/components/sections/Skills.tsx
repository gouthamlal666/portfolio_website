import { Reveal } from "@/components/Reveal";
import { Section } from "@/components/Section";
import { Stagger, StaggerItem } from "@/components/motion";
import { alsoExperienced, qualities, skillGroups } from "@/data/cv";
import { cn } from "@/lib/utils";

// Bento layout on large screens: rows of 3+3, 2+4, 3+3 on a 6-column grid.
const spans = ["lg:col-span-3", "lg:col-span-3", "lg:col-span-2", "lg:col-span-4", "lg:col-span-3", "lg:col-span-3"];

export const Skills = () => (
  <Section
    id="expertise"
    index="04"
    eyebrow="Expertise"
    title={
      <>
        A full-stack toolkit, <span className="font-normal text-champagne">cloud-ready.</span>
      </>
    }
    intro="Deep in the Laravel and PHP ecosystem, fluent across the frontend, and building out multi-cloud infrastructure with Docker, Kubernetes and Terraform."
  >
    <Stagger stagger={0.08} className="grid gap-4 md:grid-cols-2 lg:grid-cols-6">
      {skillGroups.map((g, i) => (
        <StaggerItem key={g.label} className={cn("h-full", spans[i])}>
          <div className="card-surface h-full p-6 transition-colors duration-500 hover:border-primary/30 sm:p-7">
            <div className="mb-6 flex items-center justify-between gap-4">
              <h3 className="text-[13px] font-semibold uppercase tracking-[0.18em]">{g.label}</h3>
              <span className="text-[11px] font-semibold tracking-[0.2em] text-primary">
                {String(g.items.length).padStart(2, "0")}
              </span>
            </div>
            <Stagger as="ul" stagger={0.025} delay={0.2} className="flex flex-wrap gap-2">
              {g.items.map((s) => (
                <StaggerItem as="li" key={s} className="chip">
                  {s}
                </StaggerItem>
              ))}
            </Stagger>
          </div>
        </StaggerItem>
      ))}
    </Stagger>

    <div className="mt-16 grid gap-12 md:grid-cols-2 md:gap-10 lg:mt-24 lg:gap-16">
      {[
        { title: "Also experienced in", items: alsoExperienced },
        { title: "Professional qualities", items: qualities },
      ].map((col, ci) => (
        <Reveal key={col.title} delay={ci * 0.08}>
          <h3 className="eyebrow mb-5">{col.title}</h3>
          <ul className="border-t border-border">
            {col.items.map((item) => (
              <li
                key={item}
                className="flex items-center justify-between gap-4 border-b border-border py-4 text-sm font-medium text-foreground/85 transition-colors duration-300 hover:text-foreground"
              >
                {item}
                <span className="h-1.5 w-1.5 shrink-0 rotate-45 bg-primary/70" />
              </li>
            ))}
          </ul>
        </Reveal>
      ))}
    </div>
  </Section>
);
