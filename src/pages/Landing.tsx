import { useRef } from "react";
import { Link } from "react-router";
import { motion, useScroll, useTransform, useInView } from "framer-motion";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import Layout from "@/components/Layout";
import { categories } from "@/data/products";
import { getFeaturedProducts, getNewArrivals } from "@/data/products";

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] } },
};

const staggerContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
};

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
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      variants={{
        hidden: { opacity: 0, y: 50 },
        visible: {
          opacity: 1,
          y: 0,
          transition: { duration: 0.8, delay, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] },
        },
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

function ProductCard({ product, index }: { product: ReturnType<typeof getFeaturedProducts>[0]; index: number }) {
  return (
    <motion.div variants={fadeUp}>
      <Link
        to={`/product/${product.slug}`}
        className="group block"
      >
        <div className="relative aspect-[3/4] overflow-hidden rounded-lg bg-stone-100">
          <img
            src={product.images[0]}
            alt={product.name}
            className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
          <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between opacity-0 transition-all duration-500 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0">
            <span className="text-xs font-medium uppercase tracking-wider text-white/90">
              Quick View
            </span>
            <ArrowUpRight className="h-4 w-4 text-white/90" />
          </div>
        </div>
        <div className="mt-4">
          <h3 className="text-sm font-medium text-black">{product.name}</h3>
          <p className="mt-1 text-sm text-black/50">${product.price}</p>
        </div>
      </Link>
    </motion.div>
  );
}

export default function Landing() {
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const heroY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  const featured = getFeaturedProducts().slice(0, 4);
  const newArrivals = getNewArrivals();

  return (
    <Layout>
      {/* ─── Hero ─── */}
      <section
        ref={heroRef}
        className="relative flex h-screen min-h-[700px] items-center justify-center overflow-hidden bg-[#0a0a0a]"
      >
        {/* Background image with parallax */}
        <motion.div
          style={{ y: heroY }}
          className="absolute inset-0"
        >
          <img
            src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=1600&q=80"
            alt="Fashion editorial"
            className="h-full w-full object-cover opacity-40"
          />
        </motion.div>

        {/* Gradient overlays */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/20 to-black/70" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/30 to-transparent" />

        {/* Content */}
        <motion.div
          style={{ opacity: heroOpacity }}
          className="relative z-10 mx-auto max-w-7xl px-5 text-center lg:px-8"
        >
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          >
            <p className="mb-6 text-xs font-semibold uppercase tracking-[0.35em] text-white/50">
              Contemporary Menswear
            </p>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="text-5xl font-light leading-[0.95] tracking-tight text-white sm:text-7xl md:text-8xl lg:text-9xl"
            style={{ fontFamily: "'Georgia', 'Times New Roman', serif" }}
          >
            DEFINE YOUR
            <br />
            <span className="italic font-light">Everyday.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="mx-auto mt-8 max-w-lg text-base text-white/60 leading-relaxed"
          >
            Thoughtfully designed menswear for those who move differently.
            Built to last, made to stand out.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 1, ease: [0.22, 1, 0.36, 1] }}
            className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center"
          >
            <Link
              to="/shop"
              className="group flex items-center gap-2 bg-white px-8 py-3.5 text-sm font-medium uppercase tracking-widest text-black transition-all duration-300 hover:bg-white/90"
            >
              Shop Collection
              <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
            <Link
              to="/shop?filter=new"
              className="flex items-center gap-2 border border-white/30 px-8 py-3.5 text-sm font-medium uppercase tracking-widest text-white transition-all duration-300 hover:border-white/60 hover:bg-white/5"
            >
              New Arrivals
            </Link>
          </motion.div>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="h-[1px] w-[1px] rounded-full bg-white/40"
            style={{ boxShadow: "0 0 0 4px rgba(255,255,255,0.1)" }}
          />
        </motion.div>
      </section>

      {/* ─── Marquee ─── */}
      <div className="overflow-hidden border-y border-black/5 bg-stone-50 py-4">
        <motion.div
          animate={{ x: ["0%", "-50%"] }}
          transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
          className="flex whitespace-nowrap"
        >
          {[...Array(2)].map((_, i) => (
            <div key={i} className="flex items-center gap-12 pr-12">
              {["Free Shipping Over $200", "New Season Now Live", "Handcrafted in Europe", "Premium Materials Only", "Community First"].map(
                (text) => (
                  <span key={`${i}-${text}`} className="text-xs uppercase tracking-[0.2em] text-black/30">
                    {text}
                    <span className="ml-12 inline-block h-[3px] w-[3px] rounded-full bg-black/20" />
                  </span>
                )
              )}
            </div>
          ))}
        </motion.div>
      </div>

      {/* ─── Featured Categories ─── */}
      <section className="mx-auto max-w-7xl px-5 py-24 lg:px-8">
        <AnimatedSection className="mb-12">
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.3em] text-black/40">
            Explore
          </p>
          <h2
            className="text-4xl font-light tracking-tight sm:text-5xl"
            style={{ fontFamily: "'Georgia', 'Times New Roman', serif" }}
          >
            Shop by Category
          </h2>
        </AnimatedSection>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          className="grid grid-cols-2 gap-4 md:grid-cols-3"
        >
          {categories.map((cat, i) => (
            <motion.div key={cat.key} variants={fadeUp}>
              <Link
                to={`/shop?category=${cat.key}`}
                className="group relative block aspect-[4/5] overflow-hidden rounded-lg"
              >
                <img
                  src={cat.image}
                  alt={cat.label}
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-black/20 transition-colors duration-500 group-hover:bg-black/40" />
                <div className="absolute inset-0 flex flex-col items-start justify-end p-5 md:p-7">
                  <span className="text-xs uppercase tracking-[0.2em] text-white/60 mb-1">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h3 className="text-xl font-medium text-white sm:text-2xl">
                    {cat.label}
                  </h3>
                  <p className="mt-1 text-xs text-white/60">{cat.description}</p>
                  <div className="mt-3 flex items-center gap-1.5 text-xs font-medium uppercase tracking-wider text-white opacity-0 transition-all duration-500 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0">
                    Explore
                    <ArrowRight className="h-3 w-3 transition-transform duration-300 group-hover:translate-x-1" />
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* ─── Editorial Split ─── */}
      <section className="bg-stone-50">
        <div className="mx-auto grid max-w-7xl lg:grid-cols-2">
          <AnimatedSection className="relative aspect-[4/5] overflow-hidden lg:aspect-auto">
            <img
              src="https://images.unsplash.com/photo-1551028719-00167b16eac5?w=1000&q=80"
              alt="Fashion editorial"
              className="h-full w-full object-cover"
              loading="lazy"
            />
          </AnimatedSection>
          <AnimatedSection delay={0.2} className="flex items-center px-8 py-16 lg:px-16">
            <div className="max-w-md">
              <p className="mb-4 text-xs font-semibold uppercase tracking-[0.3em] text-black/40">
                The PTL Philosophy
              </p>
              <h2
                className="text-3xl font-light leading-snug tracking-tight sm:text-4xl"
                style={{ fontFamily: "'Georgia', 'Times New Roman', serif" }}
              >
                Built to last.
                <br />
                Made to stand out.
              </h2>
              <p className="mt-6 text-sm leading-relaxed text-black/60">
                Every PTL piece is designed with intention. We source the finest
                materials from mills and workshops across Europe, then craft each
                garment to exacting standards. No shortcuts, no compromises —
                just clothing that earns its place in your wardrobe.
              </p>
              <Link
                to="/about"
                className="group mt-8 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-black transition-opacity hover:opacity-60"
              >
                Learn Our Story
                <ArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* ─── Featured Products ─── */}
      <section className="mx-auto max-w-7xl px-5 py-24 lg:px-8">
        <AnimatedSection className="mb-12 flex items-end justify-between">
          <div>
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.3em] text-black/40">
              Curated
            </p>
            <h2
              className="text-4xl font-light tracking-tight sm:text-5xl"
              style={{ fontFamily: "'Georgia', 'Times New Roman', serif" }}
            >
              Editor&apos;s Picks
            </h2>
          </div>
          <Link
            to="/shop"
            className="hidden items-center gap-2 text-xs font-semibold uppercase tracking-[0.15em] text-black/50 transition-colors hover:text-black sm:flex"
          >
            View All
            <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </AnimatedSection>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          className="grid grid-cols-2 gap-x-5 gap-y-10 md:grid-cols-4"
        >
          {featured.map((product, i) => (
            <ProductCard key={product.id} product={product} index={i} />
          ))}
        </motion.div>
      </section>

      {/* ─── Full-width statement ─── */}
      <section className="relative overflow-hidden bg-[#0a0a0a] py-32">
        <div className="absolute inset-0 opacity-10">
          <img
            src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1600&q=60"
            alt=""
            className="h-full w-full object-cover"
            loading="lazy"
          />
        </div>
        <AnimatedSection className="relative z-10 mx-auto max-w-4xl px-5 text-center lg:px-8">
          <p className="mb-6 text-xs font-semibold uppercase tracking-[0.35em] text-white/40">
            Premium Menswear
          </p>
          <h2
            className="text-4xl font-light leading-snug tracking-tight text-white sm:text-6xl md:text-7xl"
            style={{ fontFamily: "'Georgia', 'Times New Roman', serif" }}
          >
            Clothing that speaks
            <br />
            <span className="italic">before you do.</span>
          </h2>
          <p className="mx-auto mt-8 max-w-lg text-sm leading-relaxed text-white/50">
            From the mill to your wardrobe — every stitch, every cut, every
            detail considered. This is menswear without compromise.
          </p>
          <Link
            to="/shop"
            className="group mt-10 inline-flex items-center gap-2 border border-white/30 px-8 py-3.5 text-sm font-medium uppercase tracking-widest text-white transition-all duration-300 hover:border-white/60 hover:bg-white/5"
          >
            Shop Now
            <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
        </AnimatedSection>
      </section>

      {/* ─── New Arrivals ─── */}
      {newArrivals.length > 0 && (
        <section className="mx-auto max-w-7xl px-5 py-24 lg:px-8">
          <AnimatedSection className="mb-12 flex items-end justify-between">
            <div>
              <p className="mb-3 text-xs font-semibold uppercase tracking-[0.3em] text-black/40">
                Just Dropped
              </p>
              <h2
                className="text-4xl font-light tracking-tight sm:text-5xl"
                style={{ fontFamily: "'Georgia', 'Times New Roman', serif" }}
              >
                New Arrivals
              </h2>
            </div>
            <Link
              to="/shop?filter=new"
              className="hidden items-center gap-2 text-xs font-semibold uppercase tracking-[0.15em] text-black/50 transition-colors hover:text-black sm:flex"
            >
              See All
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </AnimatedSection>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            className="grid grid-cols-2 gap-x-5 gap-y-10 md:grid-cols-3"
          >
            {newArrivals.slice(0, 3).map((product, i) => (
              <ProductCard key={product.id} product={product} index={i} />
            ))}
          </motion.div>
        </section>
      )}

      {/* ─── Community CTA ─── */}
      <section className="bg-stone-50">
        <div className="mx-auto max-w-7xl px-5 py-24 lg:px-8">
          <AnimatedSection className="text-center">
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.3em] text-black/40">
              Community
            </p>
            <h2
              className="text-3xl font-light tracking-tight sm:text-4xl md:text-5xl"
              style={{ fontFamily: "'Georgia', 'Times New Roman', serif" }}
            >
              Styled by You
            </h2>
            <p className="mx-auto mt-6 max-w-lg text-sm leading-relaxed text-black/50">
              The PTL community shares how they wear their pieces. Post your own
              fits, discover inspiration, and connect with others who care about
              how they dress.
            </p>
            <Link
              to="/community"
              className="group mt-8 inline-flex items-center gap-2 bg-black px-8 py-3.5 text-sm font-medium uppercase tracking-widest text-white transition-all duration-300 hover:bg-black/80"
            >
              Join the Community
              <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
          </AnimatedSection>
        </div>
      </section>
    </Layout>
  );
}
