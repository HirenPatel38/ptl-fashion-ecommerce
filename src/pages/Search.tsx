import { useMemo, useState } from "react";
import { Link, useSearchParams } from "react-router";
import { motion } from "framer-motion";
import { ArrowUpRight, Search as SearchIcon } from "lucide-react";
import Layout from "@/components/Layout";
import { searchProducts } from "@/data/products";
import { searchPosts } from "@/data/community";

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] } },
};

export default function SearchPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get("q") || "";
  const [activeTab, setActiveTab] = useState<"products" | "community">("products");
  const [localQuery, setLocalQuery] = useState(query);

  const productResults = useMemo(() => searchProducts(query), [query]);
  const postResults = useMemo(() => searchPosts(query), [query]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (localQuery.trim()) {
      setSearchParams({ q: localQuery.trim() });
    }
  };

  return (
    <Layout>
      {/* Header */}
      <section className="bg-[#0a0a0a] pt-32 pb-16">
        <div className="mx-auto max-w-3xl px-5 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          >
            <h1
              className="text-3xl font-light tracking-tight text-white sm:text-4xl"
              style={{ fontFamily: "'Georgia', 'Times New Roman', serif" }}
            >
              {query ? `Results for "${query}"` : "Search PTL"}
            </h1>
          </motion.div>

          {/* Search bar */}
          <form onSubmit={handleSearch} className="mt-8 flex items-center gap-3">
            <div className="relative flex-1">
              <SearchIcon className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-white/30" />
              <input
                value={localQuery}
                onChange={(e) => setLocalQuery(e.target.value)}
                placeholder="Search products, categories, styles…"
                className="w-full rounded-lg border border-white/15 bg-white/5 py-3 pl-11 pr-4 text-sm text-white placeholder:text-white/30 outline-none transition-colors focus:border-white/30"
                autoFocus
              />
            </div>
            <button
              type="submit"
              className="rounded-lg bg-white px-6 py-3 text-xs font-medium uppercase tracking-wider text-black transition-all hover:bg-white/90"
            >
              Search
            </button>
          </form>
        </div>
      </section>

      {/* Results */}
      <section className="mx-auto max-w-7xl px-5 py-12 lg:px-8">
        {query ? (
          <>
            {/* Tabs */}
            <div className="flex items-center gap-6 border-b border-black/10">
              <button
                onClick={() => setActiveTab("products")}
                className={`border-b-2 pb-3 text-sm font-medium transition-all ${
                  activeTab === "products"
                    ? "border-black text-black"
                    : "border-transparent text-black/40 hover:text-black/60"
                }`}
              >
                Products ({productResults.length})
              </button>
              <button
                onClick={() => setActiveTab("community")}
                className={`border-b-2 pb-3 text-sm font-medium transition-all ${
                  activeTab === "community"
                    ? "border-black text-black"
                    : "border-transparent text-black/40 hover:text-black/60"
                }`}
              >
                Community ({postResults.length})
              </button>
            </div>

            {/* Product results */}
            {activeTab === "products" && (
              <motion.div
                key="products"
                initial="hidden"
                animate="visible"
                variants={{
                  hidden: {},
                  visible: { transition: { staggerChildren: 0.06 } },
                }}
                className="mt-8 grid grid-cols-2 gap-x-5 gap-y-10 md:grid-cols-3 lg:grid-cols-4"
              >
                {productResults.map((product) => (
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
                      </div>
                      <div className="mt-4">
                        <h3 className="text-sm font-medium text-black">
                          {product.name}
                        </h3>
                        <div className="mt-1 flex items-center gap-2">
                          <span className="text-sm text-black/50">
                            ${product.price}
                          </span>
                          <span className="text-xs capitalize text-black/30">
                            {product.category}
                          </span>
                        </div>
                      </div>
                    </Link>
                  </motion.div>
                ))}
              </motion.div>
            )}

            {/* Community results */}
            {activeTab === "community" && (
              <motion.div
                key="community"
                initial="hidden"
                animate="visible"
                variants={{
                  hidden: {},
                  visible: { transition: { staggerChildren: 0.08 } },
                }}
                className="mt-8 grid gap-6 md:grid-cols-2"
              >
                {postResults.map((post) => (
                  <motion.div key={post.id} variants={fadeUp}>
                    <Link
                      to={`/community/${post.id}`}
                      className="group block rounded-xl border border-black/5 bg-white p-6 transition-all duration-300 hover:shadow-[0_8px_30px_rgba(0,0,0,0.06)]"
                    >
                      <div className="flex items-center gap-3">
                        <img
                          src={post.author.avatar}
                          alt={post.author.name}
                          className="h-10 w-10 rounded-full object-cover"
                        />
                        <div>
                          <p className="text-sm font-medium">{post.author.name}</p>
                          <p className="text-xs text-black/40">{post.author.handle}</p>
                        </div>
                      </div>
                      <h3 className="mt-4 text-base font-medium leading-snug">
                        {post.title}
                      </h3>
                      <p className="mt-2 text-sm leading-relaxed text-black/55 line-clamp-2">
                        {post.body}
                      </p>
                      <div className="mt-4 flex flex-wrap gap-2">
                        {post.tags.map((tag) => (
                          <span
                            key={tag}
                            className="rounded-full bg-stone-100 px-3 py-1 text-[10px] font-medium uppercase tracking-wider text-black/50"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </Link>
                  </motion.div>
                ))}
              </motion.div>
            )}

            {/* Empty state */}
            {((activeTab === "products" && productResults.length === 0) ||
              (activeTab === "community" && postResults.length === 0)) && (
              <div className="py-20 text-center">
                <p className="text-lg text-black/40">
                  No {activeTab} found for "{query}"
                </p>
                <p className="mt-2 text-sm text-black/30">
                  Try a different search term or browse our full collection.
                </p>
                <Link
                  to={activeTab === "products" ? "/shop" : "/community"}
                  className="mt-6 inline-flex items-center gap-2 text-sm font-medium uppercase tracking-wider text-black underline underline-offset-4 hover:text-black/60"
                >
                  Browse All
                </Link>
              </div>
            )}
          </>
        ) : (
          <div className="py-20 text-center">
            <SearchIcon className="mx-auto h-12 w-12 text-black/10" />
            <p className="mt-4 text-lg text-black/40">
              Enter a search term to find products and community posts
            </p>
          </div>
        )}
      </section>
    </Layout>
  );
}
