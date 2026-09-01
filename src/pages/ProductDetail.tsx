import { useState, useRef } from "react";
import { Link, useParams } from "react-router";
import { motion, useInView } from "framer-motion";
import { ArrowLeft, Heart, ShoppingBag, Star, ChevronRight, Send } from "lucide-react";
import Layout from "@/components/Layout";
import { getProductBySlug, getFeaturedProducts } from "@/data/products";
import { communityUsers } from "@/data/community";

export default function ProductDetail() {
  const { slug } = useParams<{ slug: string }>();
  const product = slug ? getProductBySlug(slug) : undefined;
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [selectedColor, setSelectedColor] = useState(0);
  const [commentText, setCommentText] = useState("");
  const [comments, setComments] = useState<
    { author: string; body: string; time: string }[]
  >([
    {
      author: "James Thornton",
      body: "Just received mine — the quality is outstanding. Fits true to size.",
      time: "2 days ago",
    },
    {
      author: "Daniel Park",
      body: "Can anyone compare this to the previous season? I'm curious about the updated fit.",
      time: "5 days ago",
    },
  ]);
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });

  if (!product) {
    return (
      <Layout>
        <div className="flex min-h-screen items-center justify-center">
          <div className="text-center">
            <h1
              className="text-4xl font-light text-black"
              style={{ fontFamily: "'Georgia', 'Times New Roman', serif" }}
            >
              Product Not Found
            </h1>
            <Link
              to="/shop"
              className="mt-6 inline-flex items-center gap-2 text-sm font-medium uppercase tracking-wider text-black/60 hover:text-black"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Shop
            </Link>
          </div>
        </div>
      </Layout>
    );
  }

  const relatedProducts = getFeaturedProducts()
    .filter((p) => p.id !== product.id)
    .slice(0, 4);

  const handleComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!commentText.trim()) return;
    setComments((prev) => [
      { author: "You", body: commentText.trim(), time: "Just now" },
      ...prev,
    ]);
    setCommentText("");
  };

  return (
    <Layout>
      {/* Breadcrumb */}
      <div className="bg-white pt-20">
        <div className="mx-auto max-w-7xl px-5 py-4 lg:px-8">
          <nav className="flex items-center gap-2 text-xs text-black/40">
            <Link to="/" className="hover:text-black transition-colors">Home</Link>
            <ChevronRight className="h-3 w-3" />
            <Link to="/shop" className="hover:text-black transition-colors">Shop</Link>
            <ChevronRight className="h-3 w-3" />
            <Link
              to={`/shop?category=${product.category}`}
              className="hover:text-black transition-colors capitalize"
            >
              {product.category}
            </Link>
            <ChevronRight className="h-3 w-3" />
            <span className="text-black/70">{product.name}</span>
          </nav>
        </div>
      </div>

      {/* Product */}
      <section className="mx-auto max-w-7xl px-5 pb-24 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-2 lg:gap-16">
          {/* Images */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="relative aspect-[3/4] overflow-hidden rounded-lg bg-stone-100">
              <img
                src={product.images[selectedImage]}
                alt={product.name}
                className="h-full w-full object-cover"
              />
            </div>
            {product.images.length > 1 && (
              <div className="mt-3 flex gap-3">
                {product.images.map((img, i) => (
                  <button
                    key={i}
                    onClick={() => setSelectedImage(i)}
                    className={`h-20 w-20 overflow-hidden rounded-md border-2 transition-all ${
                      selectedImage === i
                        ? "border-black"
                        : "border-transparent opacity-60 hover:opacity-100"
                    }`}
                  >
                    <img src={img} alt="" className="h-full w-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </motion.div>

          {/* Details */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-col"
          >
            <div className="flex items-start justify-between">
              <div>
                <p className="mb-2 text-xs font-semibold uppercase tracking-[0.2em] text-black/40 capitalize">
                  {product.category}
                </p>
                <h1
                  className="text-3xl font-light tracking-tight sm:text-4xl"
                  style={{ fontFamily: "'Georgia', 'Times New Roman', serif" }}
                >
                  {product.name}
                </h1>
              </div>
              <button className="flex h-10 w-10 items-center justify-center rounded-full border border-black/10 transition-colors hover:border-black/30 hover:bg-stone-50">
                <Heart className="h-4 w-4" strokeWidth={1.5} />
              </button>
            </div>

            {/* Rating */}
            <div className="mt-4 flex items-center gap-2">
              <div className="flex items-center gap-0.5">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    className={`h-3.5 w-3.5 ${
                      i < Math.floor(product.rating)
                        ? "fill-black text-black"
                        : "text-black/20"
                    }`}
                  />
                ))}
              </div>
              <span className="text-xs text-black/50">
                {product.rating} ({product.reviewCount} reviews)
              </span>
            </div>

            {/* Price */}
            <div className="mt-6 flex items-baseline gap-3">
              <span className="text-2xl font-light">${product.price}</span>
              {product.originalPrice && (
                <span className="text-sm text-black/30 line-through">
                  ${product.originalPrice}
                </span>
              )}
            </div>

            {/* Description */}
            <p className="mt-6 text-sm leading-relaxed text-black/60">
              {product.description}
            </p>

            {/* Colors */}
            <div className="mt-8">
              <p className="mb-3 text-xs font-semibold uppercase tracking-[0.15em] text-black/50">
                Color — {product.colors[selectedColor]}
              </p>
              <div className="flex gap-2">
                {product.colors.map((color, i) => (
                  <button
                    key={color}
                    onClick={() => setSelectedColor(i)}
                    className={`h-10 w-10 rounded-full border-2 transition-all ${
                      selectedColor === i
                        ? "border-black scale-110"
                        : "border-black/10 hover:border-black/30"
                    }`}
                    style={{
                      backgroundColor:
                        color.toLowerCase() === "white"
                          ? "#fafafa"
                          : color.toLowerCase() === "black"
                          ? "#111"
                          : color.toLowerCase() === "navy"
                          ? "#1a1a3e"
                          : color.toLowerCase() === "charcoal"
                          ? "#36454f"
                          : color.toLowerCase() === "sage"
                          ? "#9cad8b"
                          : color.toLowerCase() === "ivory"
                          ? "#fffff0"
                          : color.toLowerCase() === "olive"
                          ? "#556b2f"
                          : color.toLowerCase() === "camel"
                          ? "#c19a6b"
                          : color.toLowerCase() === "indigo"
                          ? "#3f51b5"
                          : color.toLowerCase() === "sand"
                          ? "#c2b280"
                          : color.toLowerCase() === "slate"
                          ? "#708090"
                          : color.toLowerCase() === "brown"
                          ? "#6b4226"
                          : color.toLowerCase() === "tan"
                          ? "#d2b48c"
                          : color.toLowerCase() === "dark brown"
                          ? "#3e2723"
                          : color.toLowerCase() === "khaki"
                          ? "#c3b091"
                          : color.toLowerCase() === "heather grey"
                          ? "#9a9a9a"
                          : color.toLowerCase() === "washed black"
                          ? "#2a2a2a"
                          : "#ccc",
                    }}
                    title={color}
                  />
                ))}
              </div>
            </div>

            {/* Sizes */}
            <div className="mt-8">
              <p className="mb-3 text-xs font-semibold uppercase tracking-[0.15em] text-black/50">
                Size
              </p>
              <div className="flex flex-wrap gap-2">
                {product.sizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`min-w-[44px] rounded-md border px-4 py-2.5 text-xs font-medium transition-all ${
                      selectedSize === size
                        ? "border-black bg-black text-white"
                        : "border-black/15 text-black/70 hover:border-black/40"
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Add to cart */}
            <div className="mt-10 flex gap-3">
              <button className="flex flex-1 items-center justify-center gap-2 bg-black py-3.5 text-sm font-medium uppercase tracking-widest text-white transition-all hover:bg-black/85">
                <ShoppingBag className="h-4 w-4" />
                Add to Cart
              </button>
            </div>

            {/* Details list */}
            <div className="mt-10 border-t border-black/10 pt-8">
              <p className="mb-4 text-xs font-semibold uppercase tracking-[0.15em] text-black/50">
                Details
              </p>
              <ul className="space-y-2">
                {product.details.map((detail, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-black/60">
                    <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-black/20" />
                    {detail}
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        </div>

        {/* Comments section */}
        <div ref={ref} className="mt-24 border-t border-black/10 pt-16">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          >
            <h2
              className="text-2xl font-light tracking-tight"
              style={{ fontFamily: "'Georgia', 'Times New Roman', serif" }}
            >
              Customer Reviews & Discussion
            </h2>
          </motion.div>

          {/* Comment form */}
          <motion.form
            onSubmit={handleComment}
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="mt-8 flex items-center gap-3"
          >
            <div className="h-9 w-9 shrink-0 rounded-full bg-stone-200" />
            <div className="relative flex-1">
              <input
                value={commentText}
                onChange={(e) => setCommentText(e.target.value)}
                placeholder="Add a comment or question…"
                className="w-full rounded-full border border-black/10 bg-stone-50 py-2.5 pl-4 pr-12 text-sm outline-none transition-colors focus:border-black/30"
              />
              <button
                type="submit"
                disabled={!commentText.trim()}
                className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full p-1.5 text-black/30 transition-colors hover:text-black disabled:opacity-30"
              >
                <Send className="h-4 w-4" />
              </button>
            </div>
          </motion.form>

          {/* Comments list */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mt-8 space-y-6"
          >
            {comments.map((comment, i) => (
              <div key={i} className="flex gap-3">
                <div className="h-8 w-8 shrink-0 rounded-full bg-stone-200 overflow-hidden">
                  {i < communityUsers.length && (
                    <img
                      src={communityUsers[i % communityUsers.length].avatar}
                      alt=""
                      className="h-full w-full object-cover"
                    />
                  )}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium">{comment.author}</span>
                    <span className="text-xs text-black/30">{comment.time}</span>
                  </div>
                  <p className="mt-1 text-sm leading-relaxed text-black/60">
                    {comment.body}
                  </p>
                </div>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Related products */}
        {relatedProducts.length > 0 && (
          <div className="mt-24">
            <h2
              className="text-2xl font-light tracking-tight mb-10"
              style={{ fontFamily: "'Georgia', 'Times New Roman', serif" }}
            >
              You May Also Like
            </h2>
            <div className="grid grid-cols-2 gap-x-5 gap-y-10 md:grid-cols-4">
              {relatedProducts.map((p) => (
                <Link
                  key={p.id}
                  to={`/product/${p.slug}`}
                  className="group block"
                >
                  <div className="aspect-[3/4] overflow-hidden rounded-lg bg-stone-100">
                    <img
                      src={p.images[0]}
                      alt={p.name}
                      className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                      loading="lazy"
                    />
                  </div>
                  <div className="mt-4">
                    <h3 className="text-sm font-medium text-black">{p.name}</h3>
                    <p className="mt-1 text-sm text-black/50">${p.price}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </section>
    </Layout>
  );
}
