"use client";

import { FormEvent, useState } from "react";
import { motion } from "framer-motion";

type Errors = Partial<Record<"name" | "email" | "projectType" | "message", string>>;

const projectTypes = ["Film", "Photography", "Fashion", "Installation", "Other"];

export default function ContactForm() {
  const [values, setValues] = useState({
    name: "",
    email: "",
    projectType: "",
    message: "",
  });
  const [errors, setErrors] = useState<Errors>({});
  const [submitted, setSubmitted] = useState(false);

  function validate() {
    const next: Errors = {};
    if (!values.name.trim()) next.name = "Please enter your name.";
    if (!values.email.trim()) {
      next.email = "Please enter your email.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) {
      next.email = "Please enter a valid email address.";
    }
    if (!values.projectType) next.projectType = "Please select a project type.";
    if (!values.message.trim()) next.message = "Please enter a message.";
    setErrors(next);
    return Object.keys(next).length === 0;
  }

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (validate()) {
      setSubmitted(true);
    }
  }

  if (submitted) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="border border-[var(--line)] p-10 text-center"
      >
        <p className="font-display text-2xl text-[var(--text)]">
          Thank you, {values.name.split(" ")[0]}.
        </p>
        <p className="mt-3 font-sans text-sm text-[var(--text-muted)]">
          Your message has been received. A reply will follow shortly.
        </p>
      </motion.div>
    );
  }

  const inputClass =
    "w-full border-b border-[var(--line)] bg-transparent py-3 font-sans text-sm text-[var(--text)] outline-none transition-colors placeholder:text-[var(--text-muted)] focus:border-[var(--text)]";

  return (
    <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-8">
      <div>
        <label htmlFor="name" className="mb-2 block font-sans text-[11px] uppercase tracking-widest2 text-[var(--text-muted)]">
          Name
        </label>
        <input
          id="name"
          type="text"
          value={values.name}
          onChange={(e) => setValues((v) => ({ ...v, name: e.target.value }))}
          className={inputClass}
          placeholder="Your full name"
          aria-invalid={!!errors.name}
          aria-describedby={errors.name ? "name-error" : undefined}
        />
        {errors.name && (
          <p id="name-error" className="mt-2 font-sans text-xs text-red-500">
            {errors.name}
          </p>
        )}
      </div>

      <div>
        <label htmlFor="email" className="mb-2 block font-sans text-[11px] uppercase tracking-widest2 text-[var(--text-muted)]">
          Email
        </label>
        <input
          id="email"
          type="email"
          value={values.email}
          onChange={(e) => setValues((v) => ({ ...v, email: e.target.value }))}
          className={inputClass}
          placeholder="you@studio.com"
          aria-invalid={!!errors.email}
          aria-describedby={errors.email ? "email-error" : undefined}
        />
        {errors.email && (
          <p id="email-error" className="mt-2 font-sans text-xs text-red-500">
            {errors.email}
          </p>
        )}
      </div>

      <div>
        <label htmlFor="projectType" className="mb-2 block font-sans text-[11px] uppercase tracking-widest2 text-[var(--text-muted)]">
          Project Type
        </label>
        <select
          id="projectType"
          value={values.projectType}
          onChange={(e) =>
            setValues((v) => ({ ...v, projectType: e.target.value }))
          }
          className={`${inputClass} appearance-none`}
          aria-invalid={!!errors.projectType}
          aria-describedby={errors.projectType ? "type-error" : undefined}
        >
          <option value="">Select a project type</option>
          {projectTypes.map((t) => (
            <option key={t} value={t}>
              {t}
            </option>
          ))}
        </select>
        {errors.projectType && (
          <p id="type-error" className="mt-2 font-sans text-xs text-red-500">
            {errors.projectType}
          </p>
        )}
      </div>

      <div>
        <label htmlFor="message" className="mb-2 block font-sans text-[11px] uppercase tracking-widest2 text-[var(--text-muted)]">
          Message
        </label>
        <textarea
          id="message"
          rows={5}
          value={values.message}
          onChange={(e) => setValues((v) => ({ ...v, message: e.target.value }))}
          className={`${inputClass} resize-none`}
          placeholder="Tell me about the project..."
          aria-invalid={!!errors.message}
          aria-describedby={errors.message ? "message-error" : undefined}
        />
        {errors.message && (
          <p id="message-error" className="mt-2 font-sans text-xs text-red-500">
            {errors.message}
          </p>
        )}
      </div>

      <button
        type="submit"
        className="mt-4 self-start rounded-full bg-[var(--text)] px-8 py-4 font-sans text-xs uppercase tracking-widest2 text-[var(--bg)] transition-opacity hover:opacity-85"
      >
        Send Message
      </button>
    </form>
  );
}
