import { useRef } from "react";
import {
  motion,
  useAnimationFrame,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
  useVelocity,
  wrap,
} from "framer-motion";

const items = [
  "Laravel",
  "PHP",
  "Vue.js",
  "Livewire",
  "MySQL",
  "REST APIs",
  "Docker",
  "Kubernetes",
  "Terraform",
  "AWS",
  "Azure",
  "GCP",
  "GitHub Actions",
  "Cloudflare",
  "Stripe",
  "Linux",
];

const BASE_SPEED = 2.2; // % of one copy per second

const Row = ({ ariaHidden }: { ariaHidden?: boolean }) => (
  <ul className="flex shrink-0 items-center" aria-hidden={ariaHidden}>
    {items.map((item) => (
      <li key={item} className="flex items-center">
        <span className="px-6 text-lg font-extralight uppercase tracking-[0.18em] text-foreground/70 sm:px-9 sm:text-2xl">
          {item}
        </span>
        <span className="h-1.5 w-1.5 rotate-45 bg-primary/80" />
      </li>
    ))}
  </ul>
);

/** Infinite marquee whose speed and direction follow the visitor's scroll velocity. */
export const TechMarquee = () => {
  const reduce = useReducedMotion();
  const baseX = useMotionValue(0);
  const { scrollY } = useScroll();
  const velocity = useSpring(useVelocity(scrollY), { damping: 50, stiffness: 400 });
  const velocityFactor = useTransform(velocity, [0, 1000], [0, 5], { clamp: false });
  const direction = useRef(1);
  const paused = useRef(false);

  // Two identical copies; wrapping at -50% makes the loop seamless.
  const x = useTransform(baseX, (v) => `${wrap(-50, 0, v)}%`);

  useAnimationFrame((_, delta) => {
    if (reduce || paused.current) return;
    const vf = velocityFactor.get();
    if (vf < 0) direction.current = -1;
    else if (vf > 0) direction.current = 1;
    const move = direction.current * BASE_SPEED * (delta / 1000) * (1 + Math.abs(vf));
    baseX.set(baseX.get() - move / 2);
  });

  return (
    <div
      className="relative overflow-hidden border-y border-border py-5 sm:py-7"
      style={{ maskImage: "linear-gradient(90deg, transparent, #000 10%, #000 90%, transparent)" }}
      aria-label="Technologies I work with"
      onMouseEnter={() => (paused.current = true)}
      onMouseLeave={() => (paused.current = false)}
    >
      <motion.div className="flex w-max" style={{ x }}>
        <Row />
        <Row ariaHidden />
      </motion.div>
    </div>
  );
};
