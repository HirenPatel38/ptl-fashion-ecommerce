import { useState, useEffect, useCallback } from "react";
import { Link, useLocation, useNavigate } from "react-router";
import { motion, AnimatePresence } from "framer-motion";
import { Search, ShoppingBag, Heart, User, Menu, X } from "lucide-react";
import { useAuth } from "@/hooks/use-auth";
import { cn } from "@/lib/utils";

const navLinks = [
  { label: "Shop", href: "/shop" },
  { label: "New Arrivals", href: "/shop?filter=new" },
  { label: "Collections", href: "/shop" },
  { label: "Community", href: "/community" },
  { label: "About", href: "/about" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const location = useLocation();
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();

  const isLanding = location.pathname === "/";

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
    setSearchOpen(false);
  }, [location.pathname]);

  const handleSearch = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      if (searchQuery.trim()) {
        navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
        setSearchOpen(false);
        setSearchQuery("");
      }
    },
    [searchQuery, navigate]
  );

  const showSolid = scrolled || !isLanding;

  return (
    <>
      <header
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-500",
          showSolid
            ? "bg-white/90 backdrop-blur-md shadow-[0_1px_0_0_rgba(0,0,0,0.06)]"
            : "bg-transparent"
        )}
      >
        <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between px-5 lg:px-8">
          {/* Logo */}
          <Link
            to="/"
            className="relative z-10 text-xl font-bold tracking-[0.25em] transition-colors"
            style={{ fontFamily: "'Georgia', 'Times New Roman', serif" }}
          >
            <span className={showSolid ? "text-black" : "text-white"}>
              PTL
            </span>
          </Link>

          {/* Desktop nav */}
          <ul className="hidden items-center gap-8 lg:flex">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  to={link.href}
                  className={cn(
                    "text-[13px] font-medium uppercase tracking-[0.12em] transition-colors duration-300 hover:opacity-70",
                    showSolid
                      ? "text-black"
                      : "text-white",
                    location.pathname === link.href && "opacity-60"
                  )}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>

          {/* Right icons */}
          <div className="flex items-center gap-1">
            <button
              onClick={() => setSearchOpen(!searchOpen)}
              className={cn(
                "relative flex h-10 w-10 items-center justify-center rounded-full transition-colors hover:bg-black/5",
                showSolid ? "text-black" : "text-white"
              )}
              aria-label="Search"
            >
              <Search className="h-[18px] w-[18px]" strokeWidth={1.5} />
            </button>

            <Link
              to={isAuthenticated ? "/dashboard" : "/auth?returnTo=/dashboard"}
              className={cn(
                "relative hidden h-10 w-10 items-center justify-center rounded-full transition-colors hover:bg-black/5 sm:flex",
                showSolid ? "text-black" : "text-white"
              )}
              aria-label="Account"
            >
              <User className="h-[18px] w-[18px]" strokeWidth={1.5} />
            </Link>

            <button
              className={cn(
                "relative hidden h-10 w-10 items-center justify-center rounded-full transition-colors hover:bg-black/5 sm:flex",
                showSolid ? "text-black" : "text-white"
              )}
              aria-label="Wishlist"
            >
              <Heart className="h-[18px] w-[18px]" strokeWidth={1.5} />
            </button>

            <button
              className={cn(
                "relative hidden h-10 w-10 items-center justify-center rounded-full transition-colors hover:bg-black/5 sm:flex",
                showSolid ? "text-black" : "text-white"
              )}
              aria-label="Cart"
            >
              <ShoppingBag className="h-[18px] w-[18px]" strokeWidth={1.5} />
            </button>

            {/* Mobile menu toggle */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className={cn(
                "relative flex h-10 w-10 items-center justify-center rounded-full transition-colors hover:bg-black/5 lg:hidden",
                showSolid ? "text-black" : "text-white"
              )}
              aria-label="Menu"
            >
              {mobileOpen ? (
                <X className="h-5 w-5" strokeWidth={1.5} />
              ) : (
                <Menu className="h-5 w-5" strokeWidth={1.5} />
              )}
            </button>
          </div>
        </nav>

        {/* Search overlay */}
        <AnimatePresence>
          {searchOpen && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="absolute top-full left-0 right-0 border-t border-black/5 bg-white shadow-lg"
            >
              <form
                onSubmit={handleSearch}
                className="mx-auto flex max-w-3xl items-center gap-4 px-5 py-4 lg:px-8"
              >
                <Search className="h-5 w-5 shrink-0 text-black/40" strokeWidth={1.5} />
                <input
                  autoFocus
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search products, categories, community posts…"
                  className="flex-1 bg-transparent text-sm text-black outline-none placeholder:text-black/40"
                />
                <button
                  type="button"
                  onClick={() => {
                    setSearchOpen(false);
                    setSearchQuery("");
                  }}
                  className="text-xs uppercase tracking-widest text-black/50 hover:text-black"
                >
                  Close
                </button>
              </form>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* Mobile drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm lg:hidden"
              onClick={() => setMobileOpen(false)}
            />
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 30, stiffness: 300 }}
              className="fixed right-0 top-0 bottom-0 z-50 w-[300px] bg-white lg:hidden"
            >
              <div className="flex h-16 items-center justify-between px-5">
                <span
                  className="text-xl font-bold tracking-[0.25em] text-black"
                  style={{ fontFamily: "'Georgia', 'Times New Roman', serif" }}
                >
                  PTL
                </span>
                <button
                  onClick={() => setMobileOpen(false)}
                  className="flex h-10 w-10 items-center justify-center rounded-full hover:bg-black/5"
                >
                  <X className="h-5 w-5" strokeWidth={1.5} />
                </button>
              </div>
              <div className="flex flex-col gap-1 px-5">
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    to={link.href}
                    className="py-3 text-sm font-medium uppercase tracking-[0.1em] text-black transition-opacity hover:opacity-60"
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
              <div className="mx-5 my-6 h-px bg-black/10" />
              <div className="flex flex-col gap-1 px-5">
                <Link
                  to={isAuthenticated ? "/dashboard" : "/auth?returnTo=/dashboard"}
                  className="flex items-center gap-3 py-3 text-sm text-black"
                >
                  <User className="h-4 w-4" strokeWidth={1.5} />
                  {isAuthenticated ? "My Account" : "Sign In"}
                </Link>
                <button className="flex items-center gap-3 py-3 text-sm text-black">
                  <Heart className="h-4 w-4" strokeWidth={1.5} />
                  Wishlist
                </button>
                <button className="flex items-center gap-3 py-3 text-sm text-black">
                  <ShoppingBag className="h-4 w-4" strokeWidth={1.5} />
                  Cart
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
