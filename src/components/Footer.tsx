import { Link } from "react-router";
import { ArrowRight } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-[#111] text-white">
      {/* Newsletter */}
      <div className="border-b border-white/10">
        <div className="mx-auto max-w-7xl px-5 py-16 lg:px-8">
          <div className="flex flex-col items-start gap-6 md:flex-row md:items-center md:justify-between">
            <div>
              <h3 className="text-2xl font-light tracking-wide">
                Stay in the know
              </h3>
              <p className="mt-2 text-sm text-white/50">
                New arrivals, exclusive offers, and style insight — delivered weekly.
              </p>
            </div>
            <form
              className="flex w-full max-w-md items-center gap-2"
              onSubmit={(e) => e.preventDefault()}
            >
              <input
                type="email"
                placeholder="Your email address"
                className="flex-1 border-b border-white/20 bg-transparent py-3 text-sm text-white placeholder:text-white/30 outline-none transition-colors focus:border-white/60"
              />
              <button
                type="submit"
                className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-white/20 transition-colors hover:bg-white hover:text-black"
              >
                <ArrowRight className="h-4 w-4" />
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Links */}
      <div className="mx-auto max-w-7xl px-5 py-12 lg:px-8">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
          <div>
            <h4 className="mb-4 text-xs font-semibold uppercase tracking-[0.15em] text-white/40">
              Shop
            </h4>
            <ul className="space-y-3">
              {["Shirts", "T-Shirts", "Jackets", "Trousers", "Jeans", "Accessories"].map(
                (item) => (
                  <li key={item}>
                    <Link
                      to={`/shop?category=${item.toLowerCase()}`}
                      className="text-sm text-white/60 transition-colors hover:text-white"
                    >
                      {item}
                    </Link>
                  </li>
                )
              )}
            </ul>
          </div>

          <div>
            <h4 className="mb-4 text-xs font-semibold uppercase tracking-[0.15em] text-white/40">
              Company
            </h4>
            <ul className="space-y-3">
              {[
                { label: "About PTL", href: "/about" },
                { label: "Community", href: "/community" },
                { label: "Contact", href: "/contact" },
                { label: "Careers", href: "/about" },
              ].map((item) => (
                <li key={item.label}>
                  <Link
                    to={item.href}
                    className="text-sm text-white/60 transition-colors hover:text-white"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="mb-4 text-xs font-semibold uppercase tracking-[0.15em] text-white/40">
              Support
            </h4>
            <ul className="space-y-3">
              {["Shipping & Returns", "Size Guide", "FAQ", "Privacy Policy"].map(
                (item) => (
                  <li key={item}>
                    <span className="text-sm text-white/60 transition-colors hover:text-white cursor-pointer">
                      {item}
                    </span>
                  </li>
                )
              )}
            </ul>
          </div>

          <div>
            <h4 className="mb-4 text-xs font-semibold uppercase tracking-[0.15em] text-white/40">
              Follow Us
            </h4>
            <ul className="space-y-3">
              {["Instagram", "Twitter / X", "Pinterest", "TikTok"].map(
                (item) => (
                  <li key={item}>
                    <span className="text-sm text-white/60 transition-colors hover:text-white cursor-pointer">
                      {item}
                    </span>
                  </li>
                )
              )}
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-5 py-6 md:flex-row lg:px-8">
          <span
            className="text-lg font-bold tracking-[0.3em] text-white/30"
            style={{ fontFamily: "'Georgia', 'Times New Roman', serif" }}
          >
            PTL
          </span>
          <p className="text-xs text-white/30">
            © 2026 PTL. All rights reserved. Crafted with intention.
          </p>
        </div>
      </div>
    </footer>
  );
}
