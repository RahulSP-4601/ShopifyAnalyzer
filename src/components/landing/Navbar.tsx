"use client";

import Link from "next/link";

export function Navbar() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/70 backdrop-blur-xl border-b border-slate-200/50 shadow-sm">
      <div className="mx-auto flex h-18 max-w-6xl items-center justify-between px-6 py-2">
        {/* Logo Section */}
        <Link href="/" className="flex items-center gap-3 group cursor-pointer">
          <div className="relative">
            <img
              src="/logo.png"
              alt="ShopIQ Logo"
              className="h-12 w-12 object-contain transition-all duration-300 group-hover:scale-105"
            />
          </div>
          <div className="flex flex-col">
            <span className="text-xl font-bold bg-gradient-to-r from-emerald-600 to-teal-500 bg-clip-text text-transparent">
              ShopIQ
            </span>
            <span className="text-[10px] text-slate-400 font-medium tracking-wider uppercase">
              AI Analytics
            </span>
          </div>
        </Link>

        {/* Navigation Links */}
        <div className="hidden md:flex items-center gap-1">
          <a
            href="#features"
            className="px-4 py-2 text-sm font-medium text-slate-600 rounded-lg transition-all duration-200 hover:text-emerald-600 hover:bg-emerald-50"
          >
            Features
          </a>
          <a
            href="#how-it-works"
            className="px-4 py-2 text-sm font-medium text-slate-600 rounded-lg transition-all duration-200 hover:text-emerald-600 hover:bg-emerald-50"
          >
            How it Works
          </a>
          <a
            href="#questions"
            className="px-4 py-2 text-sm font-medium text-slate-600 rounded-lg transition-all duration-200 hover:text-emerald-600 hover:bg-emerald-50"
          >
            Examples
          </a>
        </div>

        {/* CTA Button */}
        <div className="flex items-center gap-3">
          <Link
            href="/connect"
            className="hidden sm:inline-flex items-center gap-2 px-5 py-2.5 text-sm font-semibold text-white bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full shadow-md shadow-emerald-500/25 transition-all duration-300 hover:shadow-lg hover:shadow-emerald-500/30 hover:scale-105"
          >
            Book a Demo
            <svg
              className="w-4 h-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M13 7l5 5m0 0l-5 5m5-5H6"
              />
            </svg>
          </Link>
        </div>
      </div>
    </nav>
  );
}
