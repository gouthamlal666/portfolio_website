import { ArrowUp } from "lucide-react";
import { profile } from "@/data/cv";

const links = [
  { label: "Résumé", href: profile.cvUrl, download: true },
  { label: "GitHub", href: profile.socials.github },
  { label: "LinkedIn", href: profile.socials.linkedin },
];

export const Footer = () => (
  <footer className="border-t border-border">
    <div className="container-x flex flex-col-reverse gap-6 py-8 sm:flex-row sm:items-center sm:justify-between sm:py-10">
      <p className="max-w-xl text-xs leading-relaxed text-muted-foreground">
        © {new Date().getFullYear()} {profile.firstName} {profile.lastName}{" "}
        <span className="mx-1 text-primary/60">·</span> Fast, secure websites and web apps that help{" "}
        <span className="text-foreground">your business grow</span> — built, launched and looked after for clients in the
        UK, India and beyond.{" "}
        <a
          href={`mailto:${profile.email}?subject=${encodeURIComponent("New project enquiry")}`}
          className="link-underline whitespace-nowrap font-medium text-champagne"
        >
          Let's build yours →
        </a>
      </p>
      <div className="flex items-center justify-between gap-6 sm:justify-end">
        <nav className="flex items-center gap-5 sm:gap-6" aria-label="Footer">
          {links.map((l) => (
            <a
              key={l.label}
              href={l.href}
              {...(l.download ? { download: true } : { target: "_blank", rel: "noreferrer" })}
              className="link-underline text-[10.5px] font-semibold uppercase tracking-[0.2em] text-muted-foreground transition-colors hover:text-foreground"
            >
              {l.label}
            </a>
          ))}
        </nav>
        <a
          href="#top"
          aria-label="Back to top"
          className="grid h-10 w-10 shrink-0 place-items-center rounded-full border border-border transition-colors hover:border-primary/60 hover:text-primary"
        >
          <ArrowUp className="h-4 w-4" />
        </a>
      </div>
    </div>
  </footer>
);
