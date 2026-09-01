import { useMemo } from "react";
import { Link, useSearchParams } from "react-router";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import Layout from "@/components/Layout";
import { products, categories, getNewArrivals, getProductsByCategory } from "@/data/products";
import type { Category } from "@/data/types";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] } },
};

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
};

export default function Shop() {
  const [searchParams, setSearchParams] = useSearchParams();
  const activeCategory = searchParams.get("category") as Category | null;
  const filter = searchParams.get("filter");
  const sortBy = searchParams.get("sort") || "featured";

  const displayProducts = useMemo(() => {
    let result = [...products];

    if (activeCategory) {
      result = getProductsByCategory(activeCategory);
    } else if (filter === "new") {
      result = getNewArrivals();
    }

    switch (sortBy) {
      case "price-asc":
        result.sort((a, b) => a.price - b.price);
        break;
      case "price-desc":
        result.sort((a, b) => b.price - a.price);
        break;
      case "newest":
        result.sort((a, b) => (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0));
        break;
      default:
        result.sort((a, b) => (b.isFeatured ? 1 : 0) - (a.isFeatured ? 1 : 0));
    }

    return result;
  }, [activeCategory, filter, sortBy]);

  const setCategory = (cat: Category | null) => {
    const params = new URLSearchParams(searchParams);
    if (cat) {
      params.set("category", cat);
      params.delete("filter");
    } else {
      params.delete("category");
      params.delete("filter");
    }
    setSearchParams(params);
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
              {activeCategory
                ? categories.find((c) => c.key === activeCategory)?.label
                : filter === "new"
                ? "Just Arrived"
                : "The Collection"}
            </p>
            <h1
              className="text-4xl font-light tracking-tight text-white sm:text-5xl md:text-6xl"
              style={{ fontFamily: "'Georgia', 'Times New Roman', serif" }}
            >
              {activeCategory
                ? categories.find((c) => c.key === activeCategory)?.label
                : filter === "new"
                ? "New Arrivals"
                : "Shop All"}
            </h1>
          </motion.div>
        </div>
      </section>

      {/* Filters */}
      <section className="border-b border-black/5 bg-white sticky top-16 z-30">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center gap-3 px-5 py-4 lg:px-8">
          <button
            onClick={() => setCategory(null)}
            className={`rounded-full px-4 py-2 text-xs font-medium uppercase tracking-wider transition-all ${
              !activeCategory && !filter
                ? "bg-black text-white"
                : "bg-stone-100 text-black/60 hover:bg-stone-200"
            }`}
          >
            All
          </button>
          {categories.map((cat) => (
            <button
              key={cat.key}
              onClick={() => setCategory(cat.key)}
              className={`rounded-full px-4 py-2 text-xs font-medium uppercase tracking-wider transition-all ${
                activeCategory === cat.key
                  ? "bg-black text-white"
                  : "bg-stone-100 text-black/60 hover:bg-stone-200"
              }`}
            >
              {cat.label}
            </button>
          ))}
          <button
            onClick={() => {
              const params = new URLSearchParams(searchParams);
              params.set("filter", "new");
              params.delete("category");
              setSearchParams(params);
            }}
            className={`rounded-full px-4 py-2 text-xs font-medium uppercase tracking-wider transition-all ${
              filter === "new"
                ? "bg-black text-white"
                : "bg-stone-100 text-black/60 hover:bg-stone-200"
            }`}
          >
            New
          </button>

          <div className="ml-auto">
            <select
              value={sortBy}
              onChange={(e) => {
                const params = new URLSearchParams(searchParams);
                params.set("sort", e.target.value);
                setSearchParams(params);
              }}
              className="rounded-full border border-black/10 bg-white px-4 py-2 text-xs text-black/60 outline-none"
            >
              <option value="featured">Featured</option>
              <option value="newest">Newest</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
            </select>
          </div>
        </div>
      </section>

      {/* Product grid */}
      <section className="mx-auto max-w-7xl px-5 py-12 lg:px-8">
        {displayProducts.length === 0 ? (
          <div className="py-32 text-center">
            <p className="text-lg text-black/40">No products found.</p>
            <button
              onClick={() => setCategory(null)}
              className="mt-4 text-sm font-medium uppercase tracking-wider text-black underline underline-offset-4 hover:text-black/60"
            >
              View all products
            </button>
          </div>
        ) : (
          <motion.div
            key={`${activeCategory || ""}-${filter || ""}`}
            variants={stagger}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-2 gap-x-5 gap-y-10 md:grid-cols-3 lg:grid-cols-4"
          >
            {displayProducts.map((product) => (
              <motion.div key={product.id} variants={fadeUp}>
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
                    <div className="absolute bottom-4 right-4 opacity-0 transition-all duration-500 group-hover:opacity-100">
                      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-white">
                        <ArrowUpRight className="h-3.5 w-3.5 text-black" />
                      </div>
                    </div>
                    {product.isNew && (
                      <span className="absolute top-3 left-3 rounded-full bg-black px-3 py-1 text-[10px] font-semibold uppercase tracking-wider text-white">
                        New
                      </span>
                    )}
                  </div>
                  <div className="mt-4">
                    <h3 className="text-sm font-medium text-black">{product.name}</h3>
                    <div className="mt-1 flex items-center gap-2">
                      <span className="text-sm text-black/60">${product.price}</span>
                      {product.originalPrice && (
                        <span className="text-xs text-black/30 line-through">
                          ${product.originalPrice}
                        </span>
                      )}
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        )}
      </section>
    </Layout>
  );
}
