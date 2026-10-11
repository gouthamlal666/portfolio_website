import { Reveal } from "@/components/Reveal";
import { Section } from "@/components/Section";
import { Stagger, StaggerItem } from "@/components/motion";
import { education, languages, profile, strengths } from "@/data/cv";

export const About = () => (
  <Section
    id="about"
    index="01"
    eyebrow="About"
    title={
      <>
        End-to-end ownership, <span className="font-normal text-champagne">from schema to server.</span>
      </>
    }
  >
    <div className="grid gap-12 lg:grid-cols-12 lg:gap-10">
      <div className="space-y-6 lg:col-span-6 lg:col-start-4">
        {profile.summary.map((p, i) => (
          <Reveal key={i} delay={i * 0.08}>
            <p
              className={
                i === 0
                  ? "text-[clamp(1.15rem,1rem+0.7vw,1.5rem)] font-light leading-[1.6] text-foreground"
                  : "body-lg"
              }
            >
              {p}
            </p>
          </Reveal>
        ))}
      </div>

      <Reveal delay={0.15} className="lg:col-span-3">
        <dl className="grid gap-8 sm:grid-cols-3 lg:grid-cols-1">
          <div>
            <dt className="eyebrow mb-4">Education</dt>
            <dd className="text-sm font-medium leading-relaxed">{education.title}</dd>
            <dd className="mt-1.5 text-[13px] leading-relaxed text-muted-foreground">{education.detail}</dd>
          </div>
          <div>
            <dt className="eyebrow mb-4">Languages</dt>
            {languages.map((l) => (
              <dd key={l.name} className="flex justify-between border-b border-border py-2 text-sm first:pt-0">
                <span className="font-medium">{l.name}</span>
                <span className="text-muted-foreground">{l.level}</span>
              </dd>
            ))}
          </div>
          <div>
            <dt className="eyebrow mb-4">Based in</dt>
            <dd className="text-sm font-medium">{profile.location}</dd>
          </div>
        </dl>
      </Reveal>
    </div>

    <Reveal className="mt-20 lg:mt-28">
      <div className="mb-8 flex items-end justify-between gap-6">
        <h3 className="eyebrow">Key strengths</h3>
        <span className="eyebrow hidden sm:block">{String(strengths.length).padStart(2, "0")} areas</span>
      </div>
      <Stagger as="ul" stagger={0.06} className="hairline-grid grid-cols-1 rounded-[var(--radius)] sm:grid-cols-2 lg:grid-cols-4">
        {strengths.map((s, i) => (
          <li key={s} className="group transition-colors duration-500 hover:!bg-card">
            <StaggerItem className="flex min-h-[112px] flex-col justify-between gap-6 p-6 sm:min-h-[150px]">
              <span className="text-[11px] font-semibold tracking-[0.2em] text-primary">
                {String(i + 1).padStart(2, "0")}
              </span>
              <span className="text-[15px] font-medium leading-snug transition-transform duration-500 group-hover:translate-x-1 sm:text-base">
                {s}
              </span>
            </StaggerItem>
          </li>
        ))}
      </Stagger>
    </Reveal>
  </Section>
);
