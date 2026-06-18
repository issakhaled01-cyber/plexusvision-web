'use client';

import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";

export default function Contact() {
  const sectionRef = useRef(null);
  const inView = useInView(sectionRef, { once: true, margin: "-80px" });

  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState("idle");

  function handleChange(e) {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setStatus("submitting");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error("Failed");
      setStatus("sent");
      setForm({ name: "", email: "", message: "" });
    } catch (err) {
      setStatus("error");
    }
  }

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="relative bg-[#FFFFFF] px-6 py-24 sm:px-10 sm:py-32"
    >
      <div className="mx-auto max-w-7xl">
        <div className="grid grid-cols-1 gap-16 lg:grid-cols-2 lg:gap-24">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <p className="mb-3 font-mono text-[11px] tracking-[0.22em] text-[#059669]/90">
              [ START A PROJECT ]
            </p>
            <h2 className="max-w-md font-display text-[2rem] font-medium tracking-tight text-[#111827] sm:text-[2.6rem]">
              Ready to Transform Your Business with AI?
            </h2>
            <p className="mt-6 max-w-md font-sans text-[15px] leading-relaxed text-[#6B7280]">
              Accelerate your enterprise innovation with bespoke computer vision and AI solutions built for precision, scale, and impact. PlexusVision Ltd. engineers custom AI platforms and advanced vision software that automate intricate workflows and unlock new capabilities from your visual data. Whether deploying high-performance enterprise AI or developing specialized imaging algorithms, we deliver elite R&amp;D execution. Backed by deep expertise in advanced medical imaging and enterprise AI, we operate on a highly selective basis, accepting a limited number of specialized engagements at a time to ensure uncompromised technical excellence and dedicated engineering partnership.
            </p>

            <div className="mt-10 space-y-3 font-mono text-[13px] text-[#6B7280]">
              <ContactLine label="Email" value="contact@plexusvision.com" href="mailto:contact@plexusvision.com" />
              <ContactLine label="Based in" value="Mississauga, Ontario, Canada" />
              <ContactLine label="Response time" value="Within 2 business days" />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
          >
            {status === "sent" ? (
              <div className="flex h-full min-h-[320px] flex-col items-center justify-center rounded-2xl border border-[#E5E7EB] bg-[#F8FAFC] text-center">
                <p className="font-display text-[1.3rem] font-medium text-[#111827]">
                  Message sent.
                </p>
                <p className="mt-2 max-w-xs font-sans text-[14px] text-[#6B7280]">
                  We&rsquo;ll get back to you within two business days.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <Field label="Name" name="name" value={form.name} onChange={handleChange} required />
                <Field label="Email" name="email" type="email" value={form.email} onChange={handleChange} required />
                <div>
                  <label htmlFor="message" className="mb-2 block font-mono text-[11px] tracking-[0.12em] text-[#9CA3AF]">
                    MESSAGE
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={5}
                    required
                    value={form.message}
                    onChange={handleChange}
                    className="w-full resize-none rounded-xl border border-[#D1D5DB] bg-[#F9FAFB] px-4 py-3 font-sans text-[14px] text-[#111827] outline-none transition-colors placeholder:text-[#9CA3AF] focus:border-[#059669]/60"
                    placeholder="What are you working on?"
                  />
                </div>

                <button
                  type="submit"
                  disabled={status === "submitting"}
                  className="group relative inline-flex w-full items-center justify-center gap-2 overflow-hidden rounded-full bg-[#111827] px-6 py-3.5 font-sans text-[14px] font-medium text-white transition-opacity disabled:opacity-60 sm:w-auto"
                >
                  <span className="relative z-10">
                    {status === "submitting" ? "Sending..." : "Send message"}
                  </span>
                  {status !== "submitting" && (
                    <span className="relative z-10 transition-transform group-hover:translate-x-1">&rarr;</span>
                  )}
                  <span className="absolute inset-0 -z-0 bg-[#059669] opacity-0 transition-opacity group-hover:opacity-100" />
                </button>

                {status === "error" && (
                  <p className="font-sans text-[13px] text-red-500">
                    Something went wrong. Try again, or email us directly.
                  </p>
                )}
              </form>
            )}
          </motion.div>
        </div>

        <div className="mt-24 flex flex-col items-center justify-between gap-4 border-t border-[#E5E7EB] pt-8 font-mono text-[11px] tracking-wide text-[#9CA3AF] sm:flex-row">
          <span>&copy; {new Date().getFullYear()} PleaxusVision Ltd.</span>
          <span>Mississauga, Ontario, Canada</span>
        </div>
      </div>
    </section>
  );
}

function ContactLine({ label, value, href }) {
  return (
    <div className="flex items-baseline gap-3">
      <span className="w-28 shrink-0 text-[#9CA3AF]">{label}</span>
      {href ? (
        <a href={href} className="text-[#111827] transition-colors hover:text-[#059669]">{value}</a>
      ) : (
        <span className="text-[#111827]">{value}</span>
      )}
    </div>
  );
}

function Field({ label, name, value, onChange, type = "text", required }) {
  return (
    <div>
      <label htmlFor={name} className="mb-2 block font-mono text-[11px] tracking-[0.12em] text-[#9CA3AF]">
        {label.toUpperCase()}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        required={required}
        value={value}
        onChange={onChange}
        className="w-full rounded-xl border border-[#D1D5DB] bg-[#F9FAFB] px-4 py-3 font-sans text-[14px] text-[#111827] outline-none transition-colors placeholder:text-[#9CA3AF] focus:border-[#059669]/60"
      />
    </div>
  );
}
