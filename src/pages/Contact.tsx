import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, MapPin, Clock, Send, CheckCircle } from "lucide-react";
import Layout from "@/components/Layout";

export default function Contact() {
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <Layout>
      {/* Hero */}
      <section className="relative bg-[#0a0a0a] pt-32 pb-20">
        <div className="mx-auto max-w-7xl px-5 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          >
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.3em] text-white/40">
              Get in Touch
            </p>
            <h1
              className="text-4xl font-light tracking-tight text-white sm:text-5xl md:text-6xl"
              style={{ fontFamily: "'Georgia', 'Times New Roman', serif" }}
            >
              We&apos;d love to
              <br />
              <span className="italic">hear from you.</span>
            </h1>
          </motion.div>
        </div>
      </section>

      {/* Content */}
      <section className="mx-auto max-w-7xl px-5 py-16 lg:px-8">
        <div className="grid gap-16 lg:grid-cols-2">
          {/* Form */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          >
            {submitted ? (
              <div className="flex flex-col items-start py-12">
                <CheckCircle className="h-12 w-12 text-green-600" />
                <h2
                  className="mt-6 text-2xl font-light"
                  style={{ fontFamily: "'Georgia', 'Times New Roman', serif" }}
                >
                  Message sent.
                </h2>
                <p className="mt-3 text-sm text-black/50">
                  We&apos;ll get back to you within one business day. Thank you
                  for reaching out.
                </p>
                <button
                  onClick={() => {
                    setSubmitted(false);
                    setForm({ name: "", email: "", subject: "", message: "" });
                  }}
                  className="mt-6 text-sm font-medium uppercase tracking-wider text-black/40 hover:text-black"
                >
                  Send another message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <h2
                  className="text-2xl font-light"
                  style={{ fontFamily: "'Georgia', 'Times New Roman', serif" }}
                >
                  Send Us a Message
                </h2>

                <div className="grid gap-6 sm:grid-cols-2">
                  <div>
                    <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-black/50">
                      Name
                    </label>
                    <input
                      value={form.name}
                      onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
                      placeholder="Your name"
                      className="w-full rounded-lg border border-black/10 px-4 py-3 text-sm outline-none transition-colors focus:border-black/30"
                      required
                    />
                  </div>
                  <div>
                    <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-black/50">
                      Email
                    </label>
                    <input
                      type="email"
                      value={form.email}
                      onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
                      placeholder="you@example.com"
                      className="w-full rounded-lg border border-black/10 px-4 py-3 text-sm outline-none transition-colors focus:border-black/30"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-black/50">
                    Subject
                  </label>
                  <input
                    value={form.subject}
                    onChange={(e) => setForm((f) => ({ ...f, subject: e.target.value }))}
                    placeholder="How can we help?"
                    className="w-full rounded-lg border border-black/10 px-4 py-3 text-sm outline-none transition-colors focus:border-black/30"
                    required
                  />
                </div>

                <div>
                  <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-black/50">
                    Message
                  </label>
                  <textarea
                    value={form.message}
                    onChange={(e) => setForm((f) => ({ ...f, message: e.target.value }))}
                    placeholder="Tell us what's on your mind…"
                    rows={5}
                    className="w-full resize-none rounded-lg border border-black/10 px-4 py-3 text-sm outline-none transition-colors focus:border-black/30"
                    required
                  />
                </div>

                <button
                  type="submit"
                  className="flex items-center gap-2 rounded-lg bg-black px-8 py-3.5 text-sm font-medium uppercase tracking-wider text-white transition-all hover:bg-black/85"
                >
                  <Send className="h-4 w-4" />
                  Send Message
                </button>
              </form>
            )}
          </motion.div>

          {/* Info */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="space-y-10"
          >
            <div>
              <h2
                className="text-2xl font-light mb-6"
                style={{ fontFamily: "'Georgia', 'Times New Roman', serif" }}
              >
                Visit Us
              </h2>

              <div className="space-y-6">
                <div className="flex gap-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-stone-100">
                    <MapPin className="h-4 w-4 text-black/50" />
                  </div>
                  <div>
                    <p className="text-sm font-medium">Flagship Store</p>
                    <p className="mt-1 text-sm text-black/50">
                      47 Savile Row
                      <br />
                      London W1S 3PR
                      <br />
                      United Kingdom
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-stone-100">
                    <Mail className="h-4 w-4 text-black/50" />
                  </div>
                  <div>
                    <p className="text-sm font-medium">Email</p>
                    <p className="mt-1 text-sm text-black/50">
                      hello@ptl-fashion.com
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-stone-100">
                    <Clock className="h-4 w-4 text-black/50" />
                  </div>
                  <div>
                    <p className="text-sm font-medium">Store Hours</p>
                    <p className="mt-1 text-sm text-black/50">
                      Monday – Saturday: 10:00 – 19:00
                      <br />
                      Sunday: 11:00 – 17:00
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="border-t border-black/10 pt-8">
              <h3 className="text-sm font-semibold uppercase tracking-wider text-black/50 mb-4">
                Common Questions
              </h3>
              <div className="space-y-4">
                {[
                  {
                    q: "What is your return policy?",
                    a: "We offer free returns within 30 days of purchase. Items must be unworn with tags attached.",
                  },
                  {
                    q: "Do you ship internationally?",
                    a: "Yes. We ship to over 40 countries with express delivery available. Orders over $200 ship free.",
                  },
                  {
                    q: "How do I find my size?",
                    a: "Each product page includes a detailed size guide. Our team is also available for personal styling advice.",
                  },
                ].map((faq) => (
                  <div key={faq.q}>
                    <p className="text-sm font-medium">{faq.q}</p>
                    <p className="mt-1 text-sm text-black/50">{faq.a}</p>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
}
