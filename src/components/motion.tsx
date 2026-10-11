import {
  Children,
  cloneElement,
  isValidElement,
  useEffect,
  useRef,
  useState,
  type ReactElement,
  type ReactNode,
} from "react";
import { animate, motion, useInView, useReducedMotion, type Variants } from "framer-motion";
import { cn } from "@/lib/utils";

export const ease = [0.22, 1, 0.36, 1] as const;

/* ------------------------------------------------------------------ */
/* Word-by-word reveal. Accepts plain text or text with styled spans:  */
/* each word inherits the className of the span it came from, so       */
/* gradient text (background-clip) keeps working per word.             */
/* ------------------------------------------------------------------ */

const wordVariants: Variants = {
  hidden: { y: "110%" },
  show: { y: "0%", transition: { duration: 0.9, ease } },
};

const splitNode = (node: ReactNode, className = ""): ReactNode[] => {
  if (typeof node === "string" || typeof node === "number") {
    return String(node)
      .split(/(\s+)/)
      .filter(Boolean)
      .map((part, i) =>
        /^\s+$/.test(part) ? (
          " "
        ) : (
          <span key={`${part}-${i}`} className="inline-block overflow-hidden pb-[0.1em] align-top">
            <motion.span variants={wordVariants} className={cn("inline-block", className)}>
              {part}
            </motion.span>
          </span>
        ),
      );
  }
  if (isValidElement(node)) {
    const el = node as ReactElement<{ className?: string; children?: ReactNode }>;
    return Children.toArray(el.props.children).flatMap((child) =>
      splitNode(child, cn(className, el.props.className)),
    );
  }
  if (Array.isArray(node)) return node.flatMap((n) => splitNode(n, className));
  return [];
};

export const SplitReveal = ({
  children,
  className,
  stagger = 0.045,
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  stagger?: number;
  delay?: number;
}) => (
  <motion.span
    className={cn("block", className)}
    initial="hidden"
    whileInView="show"
    viewport={{ once: true, margin: "-60px" }}
    variants={{ show: { transition: { staggerChildren: stagger, delayChildren: delay } } }}
  >
    {Children.toArray(children).flatMap((c) => splitNode(c)).map((n, i) =>
      isValidElement(n) ? cloneElement(n, { key: i }) : n,
    )}
  </motion.span>
);

/* ------------------------------------------------------------------ */
/* Staggered children                                                   */
/* ------------------------------------------------------------------ */

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 22 },
  show: { opacity: 1, y: 0, transition: { duration: 0.8, ease } },
};

type StaggerProps = {
  as?: "div" | "ul" | "dl" | "ol";
  children: ReactNode;
  className?: string;
  stagger?: number;
  delay?: number;
};

export const Stagger = ({ as = "div", children, className, stagger = 0.07, delay = 0 }: StaggerProps) => {
  const Comp = motion[as];
  return (
    <Comp
      className={className}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-60px" }}
      variants={{ show: { transition: { staggerChildren: stagger, delayChildren: delay } } }}
    >
      {children}
    </Comp>
  );
};

export const StaggerItem = ({
  as = "div",
  children,
  className,
}: {
  as?: "div" | "li";
  children: ReactNode;
  className?: string;
}) => {
  const Comp = motion[as];
  return (
    <Comp variants={itemVariants} className={className}>
      {children}
    </Comp>
  );
};

/* ------------------------------------------------------------------ */
/* Count-up numbers: "2,283" / "1,100+" / "20+" / "1.5+"                */
/* ------------------------------------------------------------------ */

export const CountUp = ({ value, className }: { value: string; className?: string }) => {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const reduce = useReducedMotion();
  const match = value.match(/^([\d.,]+)(.*)$/);
  const target = match ? parseFloat(match[1].replace(/,/g, "")) : NaN;
  const decimals = match?.[1].includes(".") ? match[1].split(".")[1].length : 0;
  const suffix = match?.[2] ?? "";
  const [display, setDisplay] = useState(Number.isNaN(target) ? value : `0${suffix}`);

  useEffect(() => {
    if (!inView || Number.isNaN(target)) return;
    const format = (n: number) =>
      n.toLocaleString("en-GB", { minimumFractionDigits: decimals, maximumFractionDigits: decimals }) + suffix;
    if (reduce) {
      setDisplay(format(target));
      return;
    }
    const controls = animate(0, target, {
      duration: 1.8,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (v) => setDisplay(format(v)),
    });
    return () => controls.stop();
  }, [inView, target, decimals, suffix, reduce]);

  return (
    <span ref={ref} className={cn("tabular-nums", className)} aria-label={value}>
      {display}
    </span>
  );
};
