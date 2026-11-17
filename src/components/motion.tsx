"use client";
import {
  LazyMotion,
  MotionConfig,
  m,
  useReducedMotion,
  useMotionValue,
  useSpring,
  useScroll,
} from "motion/react";
import { useRef } from "react";
const features = () =>
  import("./motion-features").then((module) => module.default);
export function MotionProvider({ children }: { children: React.ReactNode }) {
  return (
    <MotionConfig reducedMotion="user">
      <LazyMotion features={features} strict>
        {children}
      </LazyMotion>
    </MotionConfig>
  );
}
export function Reveal({
  children,
  className = "",
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) {
  const reduced = useReducedMotion();
  return (
    <m.div
      className={className}
      initial={false}
      whileInView={reduced ? undefined : { y: [22, 0] }}
      viewport={{ once: true, amount: 0.12 }}
      transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </m.div>
  );
}
export function Headline({ lines }: { lines: string[] }) {
  const reduced = useReducedMotion();
  return (
    <h1 className="cinema-title">
      {lines.map((line, i) => (
        <span className="headline-mask" key={line}>
          <m.span
            initial={false}
            animate={reduced ? undefined : { y: [35, 0] }}
            transition={{
              duration: 0.9,
              delay: i * 0.13,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            {line}
          </m.span>
          {i < lines.length - 1 ? " " : ""}
        </span>
      ))}
    </h1>
  );
}
export function Magnetic({ children }: { children: React.ReactNode }) {
  const reduced = useReducedMotion();
  const x = useMotionValue(0),
    y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 220, damping: 24 }),
    sy = useSpring(y, { stiffness: 220, damping: 24 });
  return (
    <m.span
      className="magnetic"
      style={{ x: reduced ? 0 : sx, y: reduced ? 0 : sy }}
      onPointerMove={(e) => {
        if (reduced || e.pointerType !== "mouse") return;
        const rect = e.currentTarget.getBoundingClientRect();
        x.set((e.clientX - rect.left - rect.width / 2) * 0.09);
        y.set((e.clientY - rect.top - rect.height / 2) * 0.12);
      }}
      onPointerLeave={() => {
        x.set(0);
        y.set(0);
      }}
    >
      {children}
    </m.span>
  );
}
export function PageProgress() {
  const { scrollYProgress } = useScroll();
  return (
    <m.div
      className="page-progress"
      style={{ scaleX: scrollYProgress }}
      aria-hidden="true"
    />
  );
}
export function ReadingProgress({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });
  return (
    <div ref={ref} className="reading-progress-target">
      <m.div
        className="reading-progress"
        style={{ scaleX: scrollYProgress }}
        aria-hidden="true"
      />
      {children}
    </div>
  );
}
