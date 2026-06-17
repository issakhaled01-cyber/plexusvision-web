'use client';

import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";

export default function Contact() {
  const sectionRef = useRef(null);
  const inView = useInView(sectionRef, { once: true, margin: "-80px" });

  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState("idle"); // idle | submitting | sent | error

  function handleChange(e) {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setStatus("submitting");
    try {
      // Replace with your real endpoint, e.g.:
      // await fetch("/api/contact", {
      //   method: "POST",
      //   headers: { "Content-Type": "application/json" },
      //   body: JSON.stringify(form),
      // });
      await new Promise((resolve) => setTimeout(resolve, 600)); // placeholder
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
      className="relative bg-[#0A0C10] px-6 py-24 sm:px-10 sm:py-32"
    >
      <div className="mx-auto max-w-7xl">
        <div className="grid grid-cols-1 gap-16 lg:grid-cols-2 lg:gap-24">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <p className="mb-3 font-mono text-[11px] tracking-[0.22em] text-[#5EFFB8]/90">
              [ START A PROJECT ]
            </p>
            <h2 className="max-w-md font-display text-[2rem] font-medium tracking-tight text-[#E8EAED] sm:text-[2.6rem]">
              Tell us what you&rsquo;re trying to see.
            </h2>
            <p className="mt-6 max-w-md font-sans text-[15px] leading-relaxed text-[#9AA2AD]">
              PleaxusVision Ltd. is led by Khaled Issa, Ph.D. — a computer
              vision researcher with a background spanning medical imaging
              (retinal OCT, ophthalmic imaging at Schepens Eye Research
              Institute / Harvard Medical School), enterprise AI, and a
              Ph.D. from Tokyo Institute of Technology. We take on a small
              number of projects at a time.
            </p>

            <div className="mt-10 space-y-3 font-mono text-[13px] text-[#9AA2AD]">
              <ContactLine label="Email" value="info@plexusvision.com" href="mailto:info@plexusvision.com" />
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
              <div className="flex h-full min-h-[320px] flex-col items-center justify-center rounded-2xl border border-[#1B1F27] bg-[#13161D] text-center">
                <p className="font-display text-[1.3rem] font-medium text-[#E8EAED]">
                  Message sent.
                </p>
                <p className="mt-2 max-w-xs font-sans text-[14px] text-[#9AA2AD]">
                  We&rsquo;ll get back to you within two business days.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <Field
                  label="Name"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  required
                />
                <Field
                  label="Email"
                  name="email"
                  type="email"
                  value={form.email}
                  onChange={handleChange}
                  required
                />
                <div>
                  <label
                    htmlFor="message"
                    className="mb-2 block font-mono text-[11px] tracking-[0.12em] text-[#5B6270]"
                  >
                    MESSAGE
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={5}
                    required
                    value={form.message}
                    onChange={handleChange}
                    className="w-full resize-none rounded-xl border border-[#2A2F38] bg-[#13161D] px-4 py-3 font-sans text-[14px] text-[#E8EAED] outline-none transition-colors placeholder:text-[#5B6270] focus:border-[#5EFFB8]/60"
                    placeholder="What are you working on?"
                  />
                </div>

                <button
                  type="submit"
                  disabled={status === "submitting"}
                  className="group relative inline-flex w-full items-center justify-center gap-2 overflow-hidden rounded-full bg-[#E8EAED] px-6 py-3.5 font-sans text-[14px] font-medium text-[#0A0C10] transition-opacity disabled:opacity-60 sm:w-auto"
                >
                  <span className="relative z-10">
                    {status === "submitting" ? "Sending…" : "Send message"}
                  </span>
                  {status !== "submitting" && (
                    <span className="relative z-10 transition-transform group-hover:translate-x-1">
                      →
                    </span>
                  )}
                  <span className="absolute inset-0 -z-0 bg-[#5EFFB8] opacity-0 transition-opacity group-hover:opacity-100" />
                </button>

                {status === "error" && (
                  <p className="font-sans text-[13px] text-[#FF6B6B]">
                    Something went wrong. Try again, or email us directly.
                  </p>
                )}
              </form>
            )}
          </motion.div>
        </div>

        <div className="mt-24 flex flex-col items-center justify-between gap-4 border-t border-[#1B1F27] pt-8 font-mono text-[11px] tracking-wide text-[#5B6270] sm:flex-row">
          <span>© {new Date().getFullYear()} PleaxusVision Ltd.</span>
          <span>Mississauga, Ontario, Canada</span>
        </div>
      </div>
    </section>
  );
}

function ContactLine({ label, value, href }) {
  return (
    <div className="flex items-baseline gap-3">
      <span className="w-28 shrink-0 text-[#5B6270]">{label}</span>
      {href ? (
        <a href={href} className="text-[#E8EAED] transition-colors hover:text-[#5EFFB8]">
          {value}
        </a>
      ) : (
        <span className="text-[#E8EAED]">{value}</span>
      )}
    </div>
  );
}

function Field({ label, name, value, onChange, type = "text", required }) {
  return (
    <div>
      <label
        htmlFor={name}
        className="mb-2 block font-mono text-[11px] tracking-[0.12em] text-[#5B6270]"
      >
        {label.toUpperCase()}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        required={required}
        value={value}
        onChange={onChange}
        className="w-full rounded-xl border border-[#2A2F38] bg-[#13161D] px-4 py-3 font-sans text-[14px] text-[#E8EAED] outline-none transition-colors placeholder:text-[#5B6270] focus:border-[#5EFFB8]/60"
      />
    </div>
  );
}
