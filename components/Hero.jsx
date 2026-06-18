'use client';

import { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useSpring, useReducedMotion } from "framer-motion";
import Image from "next/image";

const GRID_COLS = 26;
const GRID_ROWS = 16;

const DETECTIONS = [
  { x: 0.18, y: 0.32, w: 0.16, h: 0.22, label: "STRUCTURE", confidence: 98.2 },
  { x: 0.58, y: 0.18, w: 0.22, h: 0.3, label: "ANOMALY", confidence: 94.6 },
  { x: 0.42, y: 0.58, w: 0.18, h: 0.24, label: "PATTERN", confidence: 99.1 },
  { x: 0.72, y: 0.55, w: 0.14, h: 0.18, label: "EDGE", confidence: 91.8 },
];

function PointField({ mouseX, mouseY, prefersReducedMotion }) {
  const points = [];
  for (let row = 0; row < GRID_ROWS; row++) {
    for (let col = 0; col < GRID_COLS; col++) {
      const xPct = (col + 0.5) / GRID_COLS;
      const yPct = (row + 0.5) / GRID_ROWS;
      points.push({ id: `${row}-${col}`, xPct, yPct });
    }
  }
  return (
    <svg className="absolute inset-0 h-full w-full" preserveAspectRatio="none" aria-hidden="true">
      {points.map((p) => (
        <Point key={p.id} xPct={p.xPct} yPct={p.yPct} mouseX={mouseX} mouseY={mouseY} prefersReducedMotion={prefersReducedMotion} />
      ))}
    </svg>
  );
}

function Point({ xPct, yPct, mouseX, mouseY, prefersReducedMotion }) {
  const ref = useRef(null);
  const [active, setActive] = useState(false);

  useEffect(() => {
    if (prefersReducedMotion) return;
    const unsubX = mouseX.on("change", check);
    const unsubY = mouseY.on("change", check);
    function check() {
      if (!ref.current) return;
      const rect = ref.current.ownerSVGElement.getBoundingClientRect();
      const px = xPct * rect.width;
      const py = yPct * rect.height;
      const dx = mouseX.get() - px;
      const dy = mouseY.get() - py;
      setActive(Math.sqrt(dx * dx + dy * dy) < 140);
    }
    return () => { unsubX(); unsubY(); };
  }, [mouseX, mouseY, xPct, yPct, prefersReducedMotion]);

  return (
    <circle
      ref={ref}
      cx={`${xPct * 100}%`}
      cy={`${yPct * 100}%`}
      r={active ? 2.2 : 1.1}
      fill={active ? "#059669" : "#CBD5E1"}
      opacity={active ? 0.9 : 0.5}
      style={{ transition: "r 220ms ease, fill 220ms ease, opacity 220ms ease" }}
    />
  );
}

function DetectionFrame({ d, delay }) {
  return (
    <motion.div
      className="pointer-events-none absolute border border-[#059669]/40"
      style={{ left: `${d.x * 100}%`, top: `${d.y * 100}%`, width: `${d.w * 100}%`, height: `${d.h * 100}%` }}
      initial={{ opacity: 0, scale: 0.96 }}
      animate={{ opacity: [0, 1, 1, 0], scale: 1 }}
      transition={{ duration: 4.5, delay, repeat: Infinity, repeatDelay: 3, times: [0, 0.12, 0.82, 1], ease: "easeInOut" }}
    >
      <span className="absolute -top-6 left-0 whitespace-nowrap font-mono text-[10px] tracking-[0.18em] text-[#059669]/80">
        {d.label} &middot; {d.confidence}%
      </span>
      <span className="absolute -left-px -top-px h-2 w-2 border-l border-t border-[#059669]" />
      <span className="absolute -right-px -top-px h-2 w-2 border-r border-t border-[#059669]" />
      <span className="absolute -bottom-px -left-px h-2 w-2 border-b border-l border-[#059669]" />
      <span className="absolute -bottom-px -right-px h-2 w-2 border-b border-r border-[#059669]" />
    </motion.div>
  );
}

export default function Hero() {
  const containerRef = useRef(null);
  const prefersReducedMotion = useReducedMotion();

  const rawX = useMotionValue(-1000);
  const rawY = useMotionValue(-1000);
  const mouseX = useSpring(rawX, { stiffness: 120, damping: 20 });
  const mouseY = useSpring(rawY, { stiffness: 120, damping: 20 });

  function handleMouseMove(e) {
    const rect = containerRef.current.getBoundingClientRect();
    rawX.set(e.clientX - rect.left);
    rawY.set(e.clientY - rect.top);
  }

  function handleMouseLeave() {
    rawX.set(-1000);
    rawY.set(-1000);
  }

  return (
    <section
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative isolate flex min-h-[92vh] w-full flex-col overflow-hidden bg-[#F8FAFC]"
    >
      <div className="absolute inset-0">
        <PointField mouseX={mouseX} mouseY={mouseY} prefersReducedMotion={prefersReducedMotion} />
      </div>

      {!prefersReducedMotion && (
        <motion.div
          aria-hidden="true"
          className="absolute inset-x-0 h-px bg-gradient-to-r from-transparent via-[#059669]/50 to-transparent"
          style={{ boxShadow: "0 0 18px 1px rgba(5,150,105,0.2)" }}
          initial={{ top: "0%" }}
          animate={{ top: "100%" }}
          transition={{ duration: 7, repeat: Infinity, ease: "linear" }}
        />
      )}

      <div className="absolute inset-0 hidden sm:block">
        {DETECTIONS.map((d, i) => (
          <DetectionFrame key={d.label} d={d} delay={i * 1.1} />
        ))}
      </div>

      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-[#F8FAFC] via-transparent to-[#F8FAFC]" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_30%,#F8FAFC_85%)]" />

      {/* Nav */}
      <div className="relative z-10 mx-auto flex w-full max-w-7xl items-center justify-between px-6 pt-7 sm:px-10">
        <span className="flex items-center gap-2.5">
          <Image src="/plexusvision-logo-2.png" alt="PlexusVision" width={36} height={36} />
          <span className="font-display text-[20px] font-semibold tracking-tight text-[#111827]">
            Pleaxus<span className="text-[#059669]">Vision</span>
          </span>
        </span>
        <nav className="hidden items-center gap-9 font-sans text-[13px] text-[#6B7280] sm:flex">
          <a href="#work" className="transition-colors hover:text-[#111827]">Work</a>
          <a href="#capabilities" className="transition-colors hover:text-[#111827]">Capabilities</a>
          <a href="#contact" className="rounded-full border border-[#D1D5DB] px-4 py-1.5 text-[#111827] transition-colors hover:border-[#059669]/60 hover:text-[#059669]">
            Start a project
          </a>
        </nav>
      </div>

      {/* Hero copy */}
      <div className="relative z-10 mx-auto flex w-full max-w-7xl flex-1 flex-col justify-center px-6 sm:px-10">
        <motion.p
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="mb-5 font-mono text-[11px] tracking-[0.22em] text-[#059669]/90"
        >
          [ ADVANCED AI SOLUTIONS FOR MODERN ENTERPRISES ]
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.08, ease: "easeOut" }}
          className="max-w-3xl font-display text-[2.6rem] font-medium leading-[1.05] tracking-tight text-[#111827] sm:text-[3.6rem] lg:text-[4.4rem]"
        >
          See what your
          <br />
          data is actually
          <br />
          <span className="text-[#059669]">telling you.</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.18, ease: "easeOut" }}
          className="mt-6 max-w-md font-sans text-[15px] leading-relaxed text-[#6B7280] sm:text-base"
        >
          PleaxusVision builds production computer vision and applied AI
          systems for healthcare, industrial, and enterprise teams &mdash; from
          first prototype to deployed model.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.28, ease: "easeOut" }}
          className="mt-9 flex items-center gap-5"
        >
          <MagneticButton href="#work">View work</MagneticButton>
          <a href="#contact" className="font-sans text-[14px] text-[#6B7280] underline-offset-4 transition-colors hover:text-[#111827] hover:underline">
            Start a conversation &rarr;
          </a>
        </motion.div>
      </div>

      {/* Scroll cue */}
      <div className="relative z-10 mx-auto w-full max-w-7xl px-6 pb-8 sm:px-10">
        <div className="flex items-center gap-3 font-mono text-[10px] tracking-[0.18em] text-[#9CA3AF]">
          <span className="h-px w-8 bg-[#9CA3AF]" />
          SCROLL
        </div>
      </div>
    </section>
  );
}

function MagneticButton({ href, children }) {
  const ref = useRef(null);
  const x = useSpring(0, { stiffness: 150, damping: 15 });
  const y = useSpring(0, { stiffness: 150, damping: 15 });

  function handleMove(e) {
    const rect = ref.current.getBoundingClientRect();
    x.set((e.clientX - (rect.left + rect.width / 2)) * 0.25);
    y.set((e.clientY - (rect.top + rect.height / 2)) * 0.25);
  }

  function handleLeave() { x.set(0); y.set(0); }

  return (
    <motion.a
      ref={ref}
      href={href}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      style={{ x, y }}
      className="group relative inline-flex items-center gap-2 overflow-hidden rounded-full bg-[#111827] px-6 py-3 font-sans text-[14px] font-medium text-white transition-colors"
    >
      <span className="relative z-10">{children}</span>
      <span className="relative z-10 transition-transform group-hover:translate-x-1">&rarr;</span>
      <span className="absolute inset-0 -z-0 bg-[#059669] opacity-0 transition-opacity group-hover:opacity-100" />
    </motion.a>
  );
}
