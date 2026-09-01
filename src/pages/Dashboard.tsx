import { Link } from "react-router";
import { motion } from "framer-motion";
import {
  Package,
  Heart,
  MessageCircle,
  Settings,
  LogOut,
  ArrowRight,
  ShoppingBag,
  User,
} from "lucide-react";
import { useAuth } from "@/hooks/use-auth";
import Layout from "@/components/Layout";
import { communityPosts } from "@/data/community";
import { getFeaturedProducts } from "@/data/products";
import { useNavigate } from "react-router";

export default function Dashboard() {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();
  const recentPosts = communityPosts.slice(0, 2);
  const recommended = getFeaturedProducts().slice(0, 3);

  const handleSignOut = async () => {
    await signOut();
    navigate("/");
  };

  return (
    <Layout>
      {/* Header */}
      <section className="bg-[#0a0a0a] pt-32 pb-16">
        <div className="mx-auto max-w-7xl px-5 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="flex items-center justify-between"
          >
            <div>
              <p className="mb-2 text-xs font-semibold uppercase tracking-[0.3em] text-white/40">
                Welcome back
              </p>
              <h1
                className="text-3xl font-light tracking-tight text-white sm:text-4xl"
                style={{ fontFamily: "'Georgia', 'Times New Roman', serif" }}
              >
                {user?.name ? user.name : "Your Account"}
              </h1>
            </div>
            <button
              onClick={handleSignOut}
              className="flex items-center gap-2 rounded-full border border-white/20 px-5 py-2.5 text-xs font-medium uppercase tracking-wider text-white/60 transition-all hover:border-white/40 hover:text-white"
            >
              <LogOut className="h-3.5 w-3.5" />
              Sign Out
            </button>
          </motion.div>
        </div>
      </section>

      {/* Content */}
      <section className="mx-auto max-w-7xl px-5 py-12 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-3">
          {/* Sidebar */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="space-y-2"
          >
            {[
              { icon: User, label: "Profile", active: true },
              { icon: Package, label: "Orders", active: false },
              { icon: Heart, label: "Wishlist", active: false },
              { icon: MessageCircle, label: "My Posts", active: false },
              { icon: Settings, label: "Settings", active: false },
            ].map((item) => (
              <button
                key={item.label}
                className={`flex w-full items-center gap-3 rounded-lg px-4 py-3 text-sm transition-all ${
                  item.active
                    ? "bg-black text-white"
                    : "text-black/50 hover:bg-stone-50 hover:text-black"
                }`}
              >
                <item.icon className="h-4 w-4" strokeWidth={1.5} />
                {item.label}
              </button>
            ))}
          </motion.div>

          {/* Main content */}
          <div className="lg:col-span-2 space-y-10">
            {/* Quick stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
              className="grid grid-cols-3 gap-4"
            >
              {[
                { label: "Orders", value: "0", icon: ShoppingBag },
                { label: "Wishlist", value: "0", icon: Heart },
                { label: "Posts", value: "0", icon: MessageCircle },
              ].map((stat) => (
                <div
                  key={stat.label}
                  className="rounded-xl border border-black/5 bg-white p-5"
                >
                  <stat.icon className="h-5 w-5 text-black/20" strokeWidth={1.5} />
                  <p className="mt-3 text-2xl font-light">{stat.value}</p>
                  <p className="mt-1 text-xs text-black/40 uppercase tracking-wider">
                    {stat.label}
                  </p>
                </div>
              ))}
            </motion.div>

            {/* Recent community activity */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="flex items-center justify-between mb-4">
                <h2
                  className="text-lg font-light"
                  style={{ fontFamily: "'Georgia', 'Times New Roman', serif" }}
                >
                  Community Activity
                </h2>
                <Link
                  to="/community"
                  className="flex items-center gap-1 text-xs font-medium uppercase tracking-wider text-black/40 hover:text-black"
                >
                  View All
                  <ArrowRight className="h-3 w-3" />
                </Link>
              </div>
              <div className="space-y-3">
                {recentPosts.map((post) => (
                  <Link
                    key={post.id}
                    to={`/community/${post.id}`}
                    className="group flex items-start gap-4 rounded-xl border border-black/5 bg-white p-5 transition-all hover:shadow-[0_4px_20px_rgba(0,0,0,0.04)]"
                  >
                    <img
                      src={post.author.avatar}
                      alt={post.author.name}
                      className="h-10 w-10 rounded-full object-cover"
                    />
                    <div className="flex-1">
                      <p className="text-sm font-medium group-hover:underline">
                        {post.title}
                      </p>
                      <p className="mt-1 text-xs text-black/40">
                        {post.author.name} · {post.likes} likes ·{" "}
                        {post.comments.length} comments
                      </p>
                    </div>
                  </Link>
                ))}
              </div>
            </motion.div>

            {/* Recommended */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="flex items-center justify-between mb-4">
                <h2
                  className="text-lg font-light"
                  style={{ fontFamily: "'Georgia', 'Times New Roman', serif" }}
                >
                  Recommended for You
                </h2>
                <Link
                  to="/shop"
                  className="flex items-center gap-1 text-xs font-medium uppercase tracking-wider text-black/40 hover:text-black"
                >
                  Shop All
                  <ArrowRight className="h-3 w-3" />
                </Link>
              </div>
              <div className="grid grid-cols-3 gap-4">
                {recommended.map((product) => (
                  <Link
                    key={product.id}
                    to={`/product/${product.slug}`}
                    className="group block"
                  >
                    <div className="aspect-[3/4] overflow-hidden rounded-lg bg-stone-100">
                      <img
                        src={product.images[0]}
                        alt={product.name}
                        className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                        loading="lazy"
                      />
                    </div>
                    <div className="mt-3">
                      <p className="text-sm font-medium">{product.name}</p>
                      <p className="mt-1 text-sm text-black/50">${product.price}</p>
                    </div>
                  </Link>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
