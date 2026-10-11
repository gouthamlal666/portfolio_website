import { useRef, useState, type FormEvent } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowUpRight, Check, Copy } from "lucide-react";
import { Reveal } from "@/components/Reveal";
import { SectionLabel } from "@/components/Section";
import { profile } from "@/data/cv";

const channels = [
  { label: "Phone", value: profile.phone, href: profile.phoneHref },
  { label: "LinkedIn", value: "goutham-lal", href: profile.socials.linkedin },
  { label: "GitHub", value: "gouthamlal666", href: profile.socials.github },
  { label: "Instagram", value: "geek._.zz", href: profile.socials.instagram },
];

const Field = ({
  label,
  name,
  type = "text",
  textarea,
  autoComplete,
}: {
  label: string;
  name: string;
  type?: string;
  textarea?: boolean;
  autoComplete?: string;
}) => {
  const cls =
    "mt-3 w-full rounded-none border-0 border-b border-border bg-transparent pb-3 text-base text-foreground outline-none transition-colors duration-500 focus:border-primary focus-visible:outline-none";
  return (
    <label className="block">
      <span className="eyebrow">{label}</span>
      {textarea ? (
        <textarea name={name} required rows={4} className={`${cls} resize-none`} />
      ) : (
        <input name={name} type={type} required autoComplete={autoComplete} className={cls} />
      )}
    </label>
  );
};

export const Contact = () => {
  const [copied, setCopied] = useState(false);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const { scrollYProgress } = useScroll({ target: headingRef, offset: ["start end", "center 55%"] });
  const line1X = useTransform(scrollYProgress, [0, 1], ["-18%", "0%"]);
  const line2X = useTransform(scrollYProgress, [0, 1], ["18%", "0%"]);
  const headingOpacity = useTransform(scrollYProgress, [0, 0.6], [0, 1]);

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(profile.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      window.location.href = `mailto:${profile.email}`;
    }
  };

  // No backend: compose the message in the visitor's mail client.
  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const subject = `Project enquiry from ${data.get("name")}`;
    const body = `${data.get("message")}\n\n— ${data.get("name")} (${data.get("email")})`;
    window.location.href = `mailto:${profile.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  };

  return (
    <section id="contact" className="relative scroll-mt-20 overflow-hidden py-20 sm:py-24 lg:py-32">
      <div
        aria-hidden
        className="pointer-events-none absolute bottom-0 left-1/2 h-[520px] w-[min(1100px,140vw)] -translate-x-1/2 translate-y-1/2 rounded-full blur-3xl"
        style={{ background: "radial-gradient(closest-side, hsl(38 46% 64% / 0.12), transparent)" }}
      />
      <div className="container-x relative">
        <Reveal>
          <SectionLabel index="05" eyebrow="Contact" />
        </Reveal>

        <h2 ref={headingRef} className="fit mt-10 overflow-hidden uppercase sm:mt-14">
          <motion.span
            style={{ x: line1X, opacity: headingOpacity }}
            className="block text-[length:10.4cqw] font-extralight leading-[0.98] tracking-[-0.045em]"
          >
            Let's build
          </motion.span>
          <motion.span
            style={{ x: line2X, opacity: headingOpacity }}
            className="block text-[length:10.4cqw] font-semibold leading-[0.98] tracking-[-0.045em] text-champagne"
          >
            something real.
          </motion.span>
        </h2>

        <Reveal delay={0.1} className="mt-10 flex flex-col items-start gap-4 sm:mt-14 sm:flex-row sm:items-center sm:gap-6">
          <a
            href={`mailto:${profile.email}`}
            className="group inline-flex max-w-full items-center gap-3 text-[clamp(1.05rem,0.7rem+2.2vw,2.25rem)] font-light tracking-[-0.02em]"
          >
            <span className="link-underline truncate">{profile.email}</span>
            <ArrowUpRight className="h-[1em] w-[1em] shrink-0 text-primary transition-transform duration-500 group-hover:-translate-y-1 group-hover:translate-x-1" />
          </a>
          <button
            onClick={copyEmail}
            className="inline-flex min-h-[40px] items-center gap-2 rounded-full border border-border px-4 text-[10.5px] font-semibold uppercase tracking-[0.2em] text-muted-foreground transition-colors hover:border-primary/50 hover:text-primary"
            aria-live="polite"
          >
            {copied ? <Check className="h-3.5 w-3.5 text-emerald-400" /> : <Copy className="h-3.5 w-3.5" />}
            {copied ? "Copied" : "Copy email"}
          </button>
        </Reveal>

        <div className="mt-16 grid gap-14 sm:mt-20 lg:grid-cols-12 lg:gap-10">
          <Reveal className="lg:col-span-5">
            <ul className="border-t border-border">
              {channels.map((c) => (
                <li key={c.label}>
                  <a
                    href={c.href}
                    target={c.href.startsWith("http") ? "_blank" : undefined}
                    rel="noreferrer"
                    className="group flex min-h-[60px] items-center justify-between gap-4 border-b border-border py-4"
                  >
                    <span className="eyebrow">{c.label}</span>
                    <span className="flex items-center gap-2 text-sm font-medium transition-colors group-hover:text-primary">
                      {c.value}
                      <ArrowUpRight className="h-4 w-4 opacity-40 transition-opacity group-hover:opacity-100" />
                    </span>
                  </a>
                </li>
              ))}
              <li className="flex min-h-[60px] items-center justify-between gap-4 border-b border-border py-4">
                <span className="eyebrow">Location</span>
                <span className="text-right text-sm font-medium">{profile.location}</span>
              </li>
            </ul>
          </Reveal>

          <Reveal delay={0.1} className="lg:col-span-6 lg:col-start-7">
            <form onSubmit={onSubmit} className="card-surface space-y-9 p-6 sm:p-9">
              <div className="grid gap-9 sm:grid-cols-2 sm:gap-6">
                <Field label="Your name" name="name" autoComplete="name" />
                <Field label="Email" name="email" type="email" autoComplete="email" />
              </div>
              <Field label="Tell me about the project" name="message" textarea />
              <button type="submit" className="btn-primary w-full sm:w-auto">
                Send message <ArrowUpRight className="h-4 w-4" />
              </button>
            </form>
          </Reveal>
        </div>
      </div>
    </section>
  );
};
