'use client';

import { useMemo, useRef, useState } from "react";
import { AnimatePresence, motion, useInView } from "framer-motion";

const PROJECTS = [
  {
    id: "wind-turbine",
    title: "Wind turbine inspection",
    domain: "Industrial",
    summary:
      "Drone-mounted vision system that inspects turbine blades for damage without grounding the turbine.",
    metric: "99.9% uptime",
    stack: ["Computer vision", "Edge deployment", "Kubernetes"],
    image: "https://www.plexusvision.com/wind-turbines-blue-sky.jpg",
  },
  {
    id: "medvision",
    title: "MedVision diagnostic support",
    domain: "Healthcare",
    summary:
      "Retinal and radiology imaging analysis that flags findings for clinician review, cutting time-to-read.",
    metric: "60% faster reads",
    stack: ["Medical imaging", "Deep learning", "Clinical workflow"],
    image: "https://www.plexusvision.com/medical-brain-scan-imaging.jpg",
  },
  {
    id: "financebot",
    title: "Document risk classification",
    domain: "Finance",
    summary:
      "Automated financial document parsing that classifies risk and routes exceptions to analysts.",
    metric: "95% classification accuracy",
    stack: ["NLP", "Document AI", "Automation"],
    image: "https://www.plexusvision.com/laptop-dashboard-analytics-financial.jpg",
  },
  {
    id: "security-monitor",
    title: "Real-time threat detection",
    domain: "Security",
    summary:
      "Anomaly detection across network traffic, tuned to cut false positives without missing real threats.",
    metric: "85% fewer false positives",
    stack: ["Anomaly detection", "Streaming inference", "MLOps"],
    image: "https://www.plexusvision.com/cybersecurity-circuit-board.jpg",
  },
  {
    id: "retailflow",
    title: "Demand forecasting",
    domain: "Retail",
    summary:
      "Inventory forecasting model that learns seasonal and regional demand patterns per SKU.",
    metric: "35% lower inventory cost",
    stack: ["Time series", "Forecasting", "Predictive analytics"],
    image: "https://www.plexusvision.com/predictive-analysis-dashboard.png",
  },
  {
    id: "logistics",
    title: "Route and load optimization",
    domain: "Industrial",
    summary:
      "Supply-chain optimization engine balancing delivery cost against service-level targets.",
    metric: "25% cost reduction",
    stack: ["Optimization", "Logistics", "Cloud infrastructure"],
    image: "https://www.plexusvision.com/logistics-warehouse-optimization.png",
  },
];

const FILTERS = ["All", "Healthcare", "Industrial", "Finance", "Security", "Retail"];

export default function ProjectShowcase() {
  const [filter, setFilter] = useState("All");
  const sectionRef = useRef(null);
  const inView = useInView(sectionRef, { once: true, margin: "-80px" });

  const filtered = useMemo(
    () =>
      filter === "All"
        ? PROJECTS
        : PROJECTS.filter((p) => p.domain === filter),
    [filter]
  );

  return (
    <section
      id="work"
      ref={sectionRef}
      className="relative bg-[#0A0C10] px-6 py-24 sm:px-10 sm:py-32"
    >
      <div className="mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="mb-12 flex flex-col gap-6 sm:mb-16 sm:flex-row sm:items-end sm:justify-between"
        >
          <div>
            <p className="mb-3 font-mono text-[11px] tracking-[0.22em] text-[#5EFFB8]/90">
              [ SELECTED WORK ]
            </p>
            <h2 className="font-display text-[2rem] font-medium tracking-tight text-[#E8EAED] sm:text-[2.6rem]">
              Systems we&rsquo;ve shipped.
            </h2>
          </div>

          <div className="flex flex-wrap gap-2">
            {FILTERS.map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`rounded-full border px-4 py-1.5 font-mono text-[11px] tracking-wide transition-colors ${
                  filter === f
                    ? "border-[#5EFFB8] text-[#5EFFB8]"
                    : "border-[#2A2F38] text-[#9AA2AD] hover:border-[#3A4250] hover:text-[#E8EAED]"
                }`}
              >
                {f}
              </button>
            ))}
          </div>
        </motion.div>

        <motion.div
          layout
          className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3"
        >
          <AnimatePresence mode="popLayout">
            {filtered.map((project, i) => (
              <ProjectCard key={project.id} project={project} index={i} inView={inView} />
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}

function ProjectCard({ project, index, inView }) {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      exit={{ opacity: 0, scale: 0.96 }}
      transition={{ duration: 0.5, delay: inView ? index * 0.06 : 0, ease: "easeOut" }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="group relative aspect-[4/3] cursor-pointer overflow-hidden rounded-2xl bg-[#13161D]"
    >
      <motion.img
        src={project.image}
        alt={project.title}
        animate={{ scale: hovered ? 1.06 : 1, filter: hovered ? "brightness(0.55)" : "brightness(0.85)" }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="absolute inset-0 h-full w-full object-cover"
      />

      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#0A0C10] via-[#0A0C10]/10 to-transparent" />

      <AnimatePresence>
        {hovered && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="pointer-events-none absolute inset-3 border border-[#5EFFB8]/60"
          >
            <span className="absolute -left-px -top-px h-3 w-3 border-l border-t border-[#5EFFB8]" />
            <span className="absolute -right-px -top-px h-3 w-3 border-r border-t border-[#5EFFB8]" />
            <span className="absolute -bottom-px -left-px h-3 w-3 border-b border-l border-[#5EFFB8]" />
            <span className="absolute -bottom-px -right-px h-3 w-3 border-b border-r border-[#5EFFB8]" />
            <span className="absolute -top-6 left-0 font-mono text-[10px] tracking-[0.16em] text-[#5EFFB8]">
              {project.domain.toUpperCase()} · {project.metric}
            </span>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="absolute inset-x-0 bottom-0 p-5">
        <motion.p
          animate={{ y: hovered ? -2 : 0 }}
          className="font-display text-[1.1rem] font-medium tracking-tight text-[#E8EAED]"
        >
          {project.title}
        </motion.p>

        <AnimatePresence>
          {hovered && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
              className="overflow-hidden"
            >
              <p className="mt-2 font-sans text-[13px] leading-relaxed text-[#9AA2AD]">
                {project.summary}
              </p>
              <div className="mt-3 flex flex-wrap gap-1.5">
                {project.stack.map((s) => (
                  <span
                    key={s}
                    className="rounded-full border border-[#2A2F38] px-2.5 py-1 font-mono text-[10px] text-[#9AA2AD]"
                  >
                    {s}
                  </span>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}
