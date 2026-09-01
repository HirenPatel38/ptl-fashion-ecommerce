import { useRef } from "react";
import { Link } from "react-router";
import { motion, useInView } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Layout from "@/components/Layout";

function AnimatedSection({
  children,
  className = "",
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export default function About() {
  return (
    <Layout>
      {/* Hero */}
      <section className="relative bg-[#0a0a0a] pt-32 pb-24">
        <div className="mx-auto max-w-7xl px-5 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="max-w-3xl"
          >
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.3em] text-white/40">
              Our Story
            </p>
            <h1
              className="text-4xl font-light tracking-tight text-white sm:text-5xl md:text-6xl"
              style={{ fontFamily: "'Georgia', 'Times New Roman', serif" }}
            >
              Crafted with
              <br />
              <span className="italic">intention.</span>
            </h1>
            <p className="mt-8 max-w-lg text-sm leading-relaxed text-white/50">
              PTL was born from a simple belief: menswear should be built to
              last, designed to stand out, and made with respect for the
              materials and people involved at every stage.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Editorial image */}
      <section className="mx-auto max-w-7xl px-5 py-16 lg:px-8">
        <AnimatedSection>
          <div className="overflow-hidden rounded-xl">
            <img
              src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1200&q=80"
              alt="Workshop"
              className="h-[500px] w-full object-cover"
              loading="lazy"
            />
          </div>
        </AnimatedSection>
      </section>

      {/* Values */}
      <section className="mx-auto max-w-7xl px-5 py-16 lg:px-8">
        <AnimatedSection className="mb-16 text-center">
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.3em] text-black/40">
            What We Stand For
          </p>
          <h2
            className="text-3xl font-light tracking-tight sm:text-4xl"
            style={{ fontFamily: "'Georgia', 'Times New Roman', serif" }}
          >
            Our Principles
          </h2>
        </AnimatedSection>

        <div className="grid gap-12 md:grid-cols-3">
          {[
            {
              title: "Material Excellence",
              body: "We source the finest fabrics from mills in Italy, Japan, and Portugal. Egyptian cotton, Japanese selvedge denim, vegetable-tanned leather — every material earns its place.",
              number: "01",
            },
            {
              title: "Built to Last",
              body: "Goodyear-welted boots, reinforced seams, pre-shrunk fabrics. We design for years of wear, not a single season. Every garment should age gracefully alongside its owner.",
              number: "02",
            },
            {
              title: "Minimal Impact",
              body: "Responsible sourcing, European manufacturing, and no overproduction. We make what matters, skip what doesn't, and keep our footprint as small as our collections.",
              number: "03",
            },
          ].map((value, i) => (
            <AnimatedSection key={value.number} delay={i * 0.1}>
              <div className="border-t border-black/10 pt-8">
                <span className="text-xs font-semibold tracking-[0.2em] text-black/25">
                  {value.number}
                </span>
                <h3
                  className="mt-4 text-xl font-light"
                  style={{ fontFamily: "'Georgia', 'Times New Roman', serif" }}
                >
                  {value.title}
                </h3>
                <p className="mt-4 text-sm leading-relaxed text-black/55">
                  {value.body}
                </p>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </section>

      {/* Split editorial */}
      <section className="bg-stone-50">
        <div className="mx-auto grid max-w-7xl lg:grid-cols-2">
          <AnimatedSection className="relative aspect-[4/5] overflow-hidden">
            <img
              src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&q=80"
              alt="Team"
              className="h-full w-full object-cover"
              loading="lazy"
            />
          </AnimatedSection>
          <AnimatedSection delay={0.2} className="flex items-center px-8 py-16 lg:px-16">
            <div className="max-w-md">
              <p className="mb-4 text-xs font-semibold uppercase tracking-[0.3em] text-black/40">
                The People Behind PTL
              </p>
              <h2
                className="text-3xl font-light leading-snug tracking-tight sm:text-4xl"
                style={{ fontFamily: "'Georgia', 'Times New Roman', serif" }}
              >
                A small team with
                <br />
                <span className="italic">big standards.</span>
              </h2>
              <p className="mt-6 text-sm leading-relaxed text-black/60">
                We&apos;re a tight-knit group of designers, craftspeople, and
                obsessives who believe that getting the details right is the
                only detail that matters. Every decision — from fabric weight
                to button placement — is debated, tested, and refined.
              </p>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-7xl px-5 py-24 text-center lg:px-8">
        <AnimatedSection>
          <h2
            className="text-3xl font-light tracking-tight sm:text-4xl"
            style={{ fontFamily: "'Georgia', 'Times New Roman', serif" }}
          >
            Experience the collection
          </h2>
          <p className="mx-auto mt-4 max-w-md text-sm text-black/50">
            Every piece in the PTL collection is designed to work together.
            Build your wardrobe with intention.
          </p>
          <Link
            to="/shop"
            className="group mt-8 inline-flex items-center gap-2 bg-black px-8 py-3.5 text-sm font-medium uppercase tracking-widest text-white transition-all duration-300 hover:bg-black/85"
          >
            Shop the Collection
            <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
        </AnimatedSection>
      </section>
    </Layout>
  );
}
