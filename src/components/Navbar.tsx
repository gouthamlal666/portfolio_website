import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { profile } from "@/data/cv";
import { cn } from "@/lib/utils";

const links = [
  { id: "about", label: "About" },
  { id: "experience", label: "Experience" },
  { id: "work", label: "Work" },
  { id: "expertise", label: "Expertise" },
  { id: "contact", label: "Contact" },
];

const ease = [0.22, 1, 0.36, 1] as const;

export const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState("");
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(e.target.id);
          else setActive((cur) => (cur === e.target.id ? "" : cur));
        });
      },
      { rootMargin: "-45% 0px -50% 0px" },
    );
    links.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  // Lock scroll while the mobile menu is open; close it on Escape or when resizing to desktop.
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    const mq = window.matchMedia("(min-width: 1024px)");
    const onMq = () => mq.matches && setOpen(false);
    window.addEventListener("keydown", onKey);
    mq.addEventListener("change", onMq);
    return () => {
      window.removeEventListener("keydown", onKey);
      mq.removeEventListener("change", onMq);
    };
  }, [open]);

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <div
        className={cn(
          "transition-[background-color,border-color,backdrop-filter] duration-700",
          scrolled || open
            ? "border-b border-border/80 bg-background/80 backdrop-blur-xl"
            : "border-b border-transparent",
        )}
      >
        <nav className="container-x flex h-16 items-center justify-between sm:h-[72px]" aria-label="Primary">
          <a href="#top" className="group flex items-center gap-3" aria-label="Back to top" onClick={() => setOpen(false)}>
            <span className="grid h-9 w-9 place-items-center rounded-full border border-primary/40 text-[11px] font-semibold tracking-[0.08em] text-primary transition-colors duration-500 group-hover:bg-primary group-hover:text-primary-foreground">
              GL
            </span>
            <span className="hidden text-[11px] font-semibold uppercase tracking-[0.3em] sm:block">
              {profile.firstName} {profile.lastName}
            </span>
          </a>

          <ul className="hidden items-center gap-1 lg:flex">
            {links.map((l) => (
              <li key={l.id}>
                <a
                  href={`#${l.id}`}
                  className={cn(
                    "relative block rounded-full px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.2em] transition-colors duration-300",
                    active === l.id ? "text-foreground" : "text-muted-foreground hover:text-foreground",
                  )}
                >
                  {active === l.id && (
                    <motion.span
                      layoutId="nav-dot"
                      className="absolute -bottom-0.5 left-1/2 h-1 w-1 -translate-x-1/2 rounded-full bg-primary"
                      transition={{ type: "spring", stiffness: 380, damping: 32 }}
                    />
                  )}
                  {l.label}
                </a>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-3">
            <a href={`mailto:${profile.email}`} className="btn-ghost hidden !min-h-[40px] !px-5 lg:inline-flex">
              Let's talk <ArrowUpRight className="h-3.5 w-3.5" />
            </a>
            <button
              onClick={() => setOpen((o) => !o)}
              className="relative grid h-11 w-11 place-items-center rounded-full border border-border transition-colors hover:border-primary/50 lg:hidden"
              aria-label={open ? "Close menu" : "Open menu"}
              aria-expanded={open}
              aria-controls="mobile-menu"
            >
              <span
                className={cn(
                  "absolute h-px w-[18px] bg-foreground transition-transform duration-500",
                  open ? "rotate-45" : "-translate-y-[4px]",
                )}
              />
              <span
                className={cn(
                  "absolute h-px w-[18px] bg-foreground transition-transform duration-500",
                  open ? "-rotate-45" : "translate-y-[4px]",
                )}
              />
            </button>
          </div>
        </nav>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35 }}
            className="fixed inset-x-0 bottom-0 top-16 flex flex-col overflow-y-auto bg-background sm:top-[72px] lg:hidden"
          >
            <ul className="container-x flex flex-col pt-6">
              {links.map((l, i) => (
                <motion.li
                  key={l.id}
                  initial={{ opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.04 * i, duration: 0.6, ease }}
                  className="border-b border-border"
                >
                  <a
                    href={`#${l.id}`}
                    onClick={() => setOpen(false)}
                    className="flex items-center justify-between py-5"
                  >
                    <span
                      className={cn(
                        "text-[clamp(1.6rem,7vw,2.5rem)] font-light tracking-[-0.02em]",
                        active === l.id && "text-primary",
                      )}
                    >
                      {l.label}
                    </span>
                    <span className="eyebrow">0{i + 1}</span>
                  </a>
                </motion.li>
              ))}
            </ul>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="container-x mt-auto space-y-4 pb-10 pt-10"
            >
              <a href={`mailto:${profile.email}`} className="btn-primary w-full">
                Start a conversation <ArrowUpRight className="h-4 w-4" />
              </a>
              <p className="text-center text-xs text-muted-foreground">{profile.email}</p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};
