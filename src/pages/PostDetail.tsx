import { useState } from "react";
import { Link, useParams } from "react-router";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  Heart,
  MessageCircle,
  Share2,
  ChevronRight,
  Send,
} from "lucide-react";
import Layout from "@/components/Layout";
import { getPostById, communityUsers } from "@/data/community";
import type { Comment } from "@/data/types";

export default function PostDetail() {
  const { postId } = useParams<{ postId: string }>();
  const post = postId ? getPostById(postId) : undefined;
  const [liked, setLiked] = useState(post?.liked ?? false);
  const [likes, setLikes] = useState(post?.likes ?? 0);
  const [commentText, setCommentText] = useState("");
  const [comments, setComments] = useState<Comment[]>(
    post?.comments ?? []
  );

  if (!post) {
    return (
      <Layout>
        <div className="flex min-h-screen items-center justify-center">
          <div className="text-center">
            <h1
              className="text-4xl font-light text-black"
              style={{ fontFamily: "'Georgia', 'Times New Roman', serif" }}
            >
              Post Not Found
            </h1>
            <Link
              to="/community"
              className="mt-6 inline-flex items-center gap-2 text-sm font-medium uppercase tracking-wider text-black/60 hover:text-black"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Community
            </Link>
          </div>
        </div>
      </Layout>
    );
  }

  const handleLike = () => {
    setLiked(!liked);
    setLikes((prev) => (liked ? prev - 1 : prev + 1));
  };

  const handleComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!commentText.trim()) return;
    const newComment: Comment = {
      id: `new-${Date.now()}`,
      author: communityUsers[0],
      body: commentText.trim(),
      createdAt: new Date().toISOString(),
      likes: 0,
    };
    setComments((prev) => [...prev, newComment]);
    setCommentText("");
  };

  const formatTime = (iso: string) => {
    const diff = Date.now() - new Date(iso).getTime();
    const mins = Math.floor(diff / 60000);
    if (mins < 1) return "Just now";
    if (mins < 60) return `${mins}m ago`;
    const hours = Math.floor(mins / 60);
    if (hours < 24) return `${hours}h ago`;
    const days = Math.floor(hours / 24);
    return `${days}d ago`;
  };

  return (
    <Layout>
      {/* Breadcrumb */}
      <div className="bg-white pt-20">
        <div className="mx-auto max-w-3xl px-5 py-4">
          <nav className="flex items-center gap-2 text-xs text-black/40">
            <Link to="/" className="hover:text-black transition-colors">Home</Link>
            <ChevronRight className="h-3 w-3" />
            <Link to="/community" className="hover:text-black transition-colors">Community</Link>
            <ChevronRight className="h-3 w-3" />
            <span className="text-black/70 truncate">{post.title}</span>
          </nav>
        </div>
      </div>

      {/* Post content */}
      <section className="mx-auto max-w-3xl px-5 pb-24">
        <motion.article
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          {/* Author */}
          <div className="flex items-center gap-3">
            <img
              src={post.author.avatar}
              alt={post.author.name}
              className="h-12 w-12 rounded-full object-cover"
            />
            <div>
              <p className="text-sm font-medium text-black">{post.author.name}</p>
              <p className="text-xs text-black/40">
                {post.author.handle} · {formatTime(post.createdAt)}
              </p>
            </div>
          </div>

          {/* Title */}
          <h1
            className="mt-6 text-3xl font-light tracking-tight leading-snug sm:text-4xl"
            style={{ fontFamily: "'Georgia', 'Times New Roman', serif" }}
          >
            {post.title}
          </h1>

          {/* Body */}
          <div className="mt-6 text-[15px] leading-relaxed text-black/65">
            {post.body}
          </div>

          {/* Images */}
          {post.images.length > 0 && (
            <div className="mt-8 space-y-4">
              {post.images.map((img, i) => (
                <div key={i} className="overflow-hidden rounded-xl">
                  <img
                    src={img}
                    alt=""
                    className="w-full object-cover"
                    loading="lazy"
                  />
                </div>
              ))}
            </div>
          )}

          {/* Tags */}
          <div className="mt-8 flex flex-wrap gap-2">
            {post.tags.map((tag) => (
              <span
                key={tag}
                className="rounded-full bg-stone-100 px-3 py-1.5 text-[10px] font-medium uppercase tracking-wider text-black/50"
              >
                {tag}
              </span>
            ))}
          </div>

          {/* Actions */}
          <div className="mt-8 flex items-center gap-6 border-y border-black/10 py-5">
            <button
              onClick={handleLike}
              className="flex items-center gap-2 text-sm transition-colors"
            >
              <Heart
                className={`h-5 w-5 transition-all ${
                  liked ? "fill-red-500 text-red-500" : "text-black/40"
                }`}
              />
              <span className={liked ? "text-black font-medium" : "text-black/50"}>
                {likes}
              </span>
            </button>
            <button className="flex items-center gap-2 text-sm text-black/40">
              <MessageCircle className="h-5 w-5" />
              <span>{comments.length}</span>
            </button>
            <button className="ml-auto flex items-center gap-2 text-sm text-black/40 transition-colors hover:text-black">
              <Share2 className="h-5 w-5" />
              Share
            </button>
          </div>
        </motion.article>

        {/* Comments */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          className="mt-10"
        >
          <h2
            className="text-xl font-light"
            style={{ fontFamily: "'Georgia', 'Times New Roman', serif" }}
          >
            {comments.length} {comments.length === 1 ? "Comment" : "Comments"}
          </h2>

          {/* Comment form */}
          <form onSubmit={handleComment} className="mt-6 flex items-start gap-3">
            <div className="h-9 w-9 shrink-0 rounded-full bg-stone-200 overflow-hidden">
              <img
                src={communityUsers[0].avatar}
                alt=""
                className="h-full w-full object-cover"
              />
            </div>
            <div className="flex-1">
              <textarea
                value={commentText}
                onChange={(e) => setCommentText(e.target.value)}
                placeholder="Join the discussion…"
                rows={2}
                className="w-full resize-none rounded-xl border border-black/10 bg-stone-50 px-4 py-3 text-sm outline-none transition-colors focus:border-black/30"
              />
              <div className="mt-2 flex justify-end">
                <button
                  type="submit"
                  disabled={!commentText.trim()}
                  className="flex items-center gap-2 rounded-full bg-black px-5 py-2 text-xs font-medium uppercase tracking-wider text-white transition-all hover:bg-black/85 disabled:opacity-30"
                >
                  <Send className="h-3.5 w-3.5" />
                  Reply
                </button>
              </div>
            </div>
          </form>

          {/* Comments list */}
          <div className="mt-10 space-y-6">
            {comments.map((comment) => (
              <motion.div
                key={comment.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex gap-3"
              >
                <img
                  src={comment.author.avatar}
                  alt={comment.author.name}
                  className="h-8 w-8 shrink-0 rounded-full object-cover"
                />
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium">{comment.author.name}</span>
                    <span className="text-xs text-black/30">
                      {formatTime(comment.createdAt)}
                    </span>
                  </div>
                  <p className="mt-1 text-sm leading-relaxed text-black/60">
                    {comment.body}
                  </p>
                  <div className="mt-2 flex items-center gap-4">
                    <button className="flex items-center gap-1 text-xs text-black/30 transition-colors hover:text-black/60">
                      <Heart className="h-3 w-3" />
                      {comment.likes}
                    </button>
                    <button className="text-xs text-black/30 transition-colors hover:text-black/60">
                      Reply
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.section>
      </section>
    </Layout>
  );
}
