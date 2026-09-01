import { useState, useRef } from "react";
import { Link } from "react-router";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { ArrowRight, Heart, MessageCircle, X, Upload, Send, Tag } from "lucide-react";
import Layout from "@/components/Layout";
import { communityPosts, communityUsers } from "@/data/community";
import type { CommunityPost } from "@/data/types";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] } },
};

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

function PostCard({ post }: { post: CommunityPost }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });

  return (
    <motion.div ref={ref} variants={fadeUp}>
      <Link
        to={`/community/${post.id}`}
        className="group block rounded-xl border border-black/5 bg-white p-6 transition-all duration-300 hover:shadow-[0_8px_30px_rgba(0,0,0,0.06)] hover:border-black/10"
      >
        {/* Author */}
        <div className="flex items-center gap-3">
          <img
            src={post.author.avatar}
            alt={post.author.name}
            className="h-10 w-10 rounded-full object-cover"
          />
          <div>
            <p className="text-sm font-medium text-black">{post.author.name}</p>
            <p className="text-xs text-black/40">
              {post.author.handle} · {formatTime(post.createdAt)}
            </p>
          </div>
        </div>

        {/* Content */}
        <h3 className="mt-4 text-base font-medium text-black leading-snug">
          {post.title}
        </h3>
        <p className="mt-2 text-sm leading-relaxed text-black/55 line-clamp-3">
          {post.body}
        </p>

        {/* Image preview */}
        {post.images.length > 0 && (
          <div className="mt-4 overflow-hidden rounded-lg">
            <img
              src={post.images[0]}
              alt=""
              className="h-48 w-full object-cover transition-transform duration-500 group-hover:scale-[1.02]"
              loading="lazy"
            />
          </div>
        )}

        {/* Tags & actions */}
        <div className="mt-4 flex items-center justify-between">
          <div className="flex flex-wrap gap-2">
            {post.tags.slice(0, 3).map((tag) => (
              <span
                key={tag}
                className="rounded-full bg-stone-100 px-3 py-1 text-[10px] font-medium uppercase tracking-wider text-black/50"
              >
                {tag}
              </span>
            ))}
          </div>
          <div className="flex items-center gap-4 text-xs text-black/40">
            <span className="flex items-center gap-1">
              <Heart className="h-3.5 w-3.5" />
              {post.likes}
            </span>
            <span className="flex items-center gap-1">
              <MessageCircle className="h-3.5 w-3.5" />
              {post.comments.length}
            </span>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}

function formatTime(iso: string) {
  const diff = Date.now() - new Date(iso).getTime();
  const days = Math.floor(diff / 86400000);
  if (days === 0) return "Today";
  if (days === 1) return "Yesterday";
  if (days < 7) return `${days} days ago`;
  return `${Math.floor(days / 7)} weeks ago`;
}

export default function Community() {
  const [activeTag, setActiveTag] = useState<string | null>(null);
  const [createOpen, setCreateOpen] = useState(false);
  const [newPost, setNewPost] = useState({ title: "", body: "", tag: "" });
  const [localPosts, setLocalPosts] = useState<CommunityPost[]>([]);
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });

  const allTags = Array.from(
    new Set(communityPosts.flatMap((p) => p.tags))
  );

  const allPosts = [...localPosts, ...communityPosts];
  const displayPosts = activeTag
    ? allPosts.filter((p) => p.tags.includes(activeTag))
    : allPosts;

  const handleSubmitPost = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPost.title.trim() || !newPost.body.trim()) return;
    const post: CommunityPost = {
      id: `local-${Date.now()}`,
      author: communityUsers[0],
      title: newPost.title.trim(),
      body: newPost.body.trim(),
      images: [],
      tags: newPost.tag.trim()
        ? newPost.tag.split(",").map((t) => t.trim().toLowerCase())
        : [],
      createdAt: new Date().toISOString(),
      likes: 0,
      liked: false,
      comments: [],
    };
    setLocalPosts((prev) => [post, ...prev]);
    setNewPost({ title: "", body: "", tag: "" });
    setCreateOpen(false);
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
              PTL Community
            </p>
            <h1
              className="text-4xl font-light tracking-tight text-white sm:text-5xl md:text-6xl"
              style={{ fontFamily: "'Georgia', 'Times New Roman', serif" }}
            >
              Styled by You
            </h1>
            <p className="mt-6 max-w-lg text-sm leading-relaxed text-white/50">
              Share your fits, discover new combinations, and connect with
              others who care about craft and style.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Controls */}
      <section className="sticky top-16 z-30 border-b border-black/5 bg-white">
        <div className="mx-auto flex max-w-7xl items-center gap-4 px-5 py-4 lg:px-8">
          {/* Tags */}
          <div className="flex flex-1 flex-wrap items-center gap-2 overflow-x-auto">
            <button
              onClick={() => setActiveTag(null)}
              className={`whitespace-nowrap rounded-full px-4 py-2 text-xs font-medium uppercase tracking-wider transition-all ${
                !activeTag
                  ? "bg-black text-white"
                  : "bg-stone-100 text-black/60 hover:bg-stone-200"
              }`}
            >
              All Posts
            </button>
            {allTags.map((tag) => (
              <button
                key={tag}
                onClick={() => setActiveTag(activeTag === tag ? null : tag)}
                className={`whitespace-nowrap rounded-full px-4 py-2 text-xs font-medium uppercase tracking-wider transition-all ${
                  activeTag === tag
                    ? "bg-black text-white"
                    : "bg-stone-100 text-black/60 hover:bg-stone-200"
                }`}
              >
                {tag}
              </button>
            ))}
          </div>

          {/* Create post */}
          <button
            onClick={() => setCreateOpen(true)}
            className="flex shrink-0 items-center gap-2 rounded-full bg-black px-5 py-2.5 text-xs font-medium uppercase tracking-wider text-white transition-all hover:bg-black/85"
          >
            <Upload className="h-3.5 w-3.5" />
            Post
          </button>
        </div>
      </section>

      {/* Posts grid */}
      <section className="mx-auto max-w-7xl px-5 py-12 lg:px-8">
        <motion.div
          variants={stagger}
          initial="hidden"
          animate="visible"
          className="grid gap-6 md:grid-cols-2"
        >
          {displayPosts.map((post) => (
            <PostCard key={post.id} post={post} />
          ))}
        </motion.div>

        {displayPosts.length === 0 && (
          <div className="py-32 text-center">
            <p className="text-lg text-black/40">No posts yet for this topic.</p>
            <p className="mt-2 text-sm text-black/30">
              Be the first to share something.
            </p>
          </div>
        )}
      </section>

      {/* Create Post Modal */}
      <AnimatePresence>
        {createOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm"
              onClick={() => setCreateOpen(false)}
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="fixed inset-x-4 top-[10%] z-50 mx-auto max-w-lg rounded-2xl bg-white p-6 shadow-2xl md:inset-x-auto"
            >
              <div className="flex items-center justify-between mb-6">
                <h3
                  className="text-xl font-light"
                  style={{ fontFamily: "'Georgia', 'Times New Roman', serif" }}
                >
                  Share with the Community
                </h3>
                <button
                  onClick={() => setCreateOpen(false)}
                  className="rounded-full p-2 hover:bg-stone-100"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>

              <form onSubmit={handleSubmitPost} className="space-y-4">
                <div>
                  <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-black/50">
                    Title
                  </label>
                  <input
                    value={newPost.title}
                    onChange={(e) => setNewPost((p) => ({ ...p, title: e.target.value }))}
                    placeholder="Give your post a title"
                    className="w-full rounded-lg border border-black/10 px-4 py-2.5 text-sm outline-none transition-colors focus:border-black/30"
                    required
                  />
                </div>
                <div>
                  <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-black/50">
                    What&apos;s on your mind?
                  </label>
                  <textarea
                    value={newPost.body}
                    onChange={(e) => setNewPost((p) => ({ ...p, body: e.target.value }))}
                    placeholder="Share your style, ask a question, or start a conversation…"
                    rows={5}
                    className="w-full resize-none rounded-lg border border-black/10 px-4 py-2.5 text-sm outline-none transition-colors focus:border-black/30"
                    required
                  />
                </div>
                <div>
                  <label className="mb-1.5 flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-black/50">
                    <Tag className="h-3 w-3" />
                    Tags (comma separated)
                  </label>
                  <input
                    value={newPost.tag}
                    onChange={(e) => setNewPost((p) => ({ ...p, tag: e.target.value }))}
                    placeholder="e.g. jackets, layering"
                    className="w-full rounded-lg border border-black/10 px-4 py-2.5 text-sm outline-none transition-colors focus:border-black/30"
                  />
                </div>

                {/* Image upload area */}
                <div className="rounded-lg border-2 border-dashed border-black/10 p-8 text-center transition-colors hover:border-black/20">
                  <Upload className="mx-auto h-6 w-6 text-black/20" />
                  <p className="mt-2 text-xs text-black/40">
                    Drag photos here or tap to upload
                  </p>
                </div>

                <button
                  type="submit"
                  disabled={!newPost.title.trim() || !newPost.body.trim()}
                  className="flex w-full items-center justify-center gap-2 rounded-lg bg-black py-3 text-sm font-medium uppercase tracking-wider text-white transition-all hover:bg-black/85 disabled:opacity-40"
                >
                  <Send className="h-4 w-4" />
                  Publish Post
                </button>
              </form>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </Layout>
  );
}
