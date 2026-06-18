'use client';

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const CAPABILITIES = [
  {
    index: "01",
    name: "Computer vision",
    description:
      "Custom vision models for medical imaging, industrial inspection, and visual quality control â€” built from your data, not a generic API.",
  },
  {
    index: "02",
    name: "Predictive analytics",
    description:
      "Forecasting and anomaly detection that turns historical data into decisions you can act on before a problem happens, not after.",
  },
  {
    index: "03",
    name: "AI strategy advisory",
    description:
      "Independent, vendor-neutral guidance for teams deciding what to build, what to buy, and what to skip entirely.",
  },
  {
    index: "04",
    name: "Generative AI integration",
    description:
      "LLM and generative AI features wired into real products and workflows â€” with the evaluation work to know if they actually help.",
  },
];

export default function Capabilities() {
  const sectionRef = useRef(null);
  const inView = useInView(sectionRef, { once: true, margin: "-80px" });

  return (
    <section
      id="capabilities"
      ref={sectionRef}
      className="relative bg-[#0B1120] px-6 py-24 sm:px-10 sm:py-32"
    >
      <div className="mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="mb-14 sm:mb-20"
        >
          <p className="mb-3 font-mono text-[11px] tracking-[0.22em] text-[#5EFFB8]/90">
            [ CAPABILITIES ]
          </p>
          <h2 className="max-w-xl font-display text-[2rem] font-medium tracking-tight text-[#E8EAED] sm:text-[2.6rem]">
            What we build with.
          </h2>
        </motion.div>

        <div className="border-t border-[#1B1F27]">
          {CAPABILITIES.map((cap, i) => (
            <CapabilityRow key={cap.index} cap={cap} index={i} inView={inView} />
          ))}
        </div>
      </div>
    </section>
  );
}

function CapabilityRow({ cap, index, inView }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.08, ease: "easeOut" }}
      className="group grid grid-cols-1 gap-4 border-b border-[#1B1F27] py-7 sm:grid-cols-[100px_1fr_1.4fr] sm:items-center sm:gap-8 sm:py-9"
    >
      <div className="flex items-center gap-3">
        <span className="relative flex h-2 w-2">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#5EFFB8] opacity-40" />
          <span className="relative inline-flex h-2 w-2 rounded-full bg-[#5EFFB8]" />
        </span>
        <span className="font-mono text-[12px] tracking-[0.1em] text-[#5B6270]">
          {cap.index}
        </span>
      </div>

      <h3 className="font-display text-[1.3rem] font-medium tracking-tight text-[#E8EAED] transition-colors group-hover:text-[#5EFFB8] sm:text-[1.5rem]">
        {cap.name}
      </h3>

      <p className="font-sans text-[14px] leading-relaxed text-[#9AA2AD] sm:text-[15px]">
        {cap.description}
      </p>
    </motion.div>
  );
}

