"use client";

export function Footer() {
  return (
    <footer className="border-t border-slate-100 bg-white py-12">
      <div className="mx-auto max-w-6xl px-6">
        <div className="flex flex-col items-center justify-between gap-6 md:flex-row">
          <div className="flex items-center gap-2 group">
            <img
              src="/logo.png"
              alt="ShopIQ Logo"
              className="h-15 w-15 object-contain transition-transform duration-300 group-hover:scale-110"
            />
            <span className="text-xl font-bold bg-gradient-to-r from-slate-900 to-slate-700 bg-clip-text text-transparent">
              ShopIQ
            </span>
          </div>
          <div className="flex items-center gap-8 text-sm text-slate-500">
            <a href="/privacy" className="transition-colors duration-200 hover:text-slate-900">
              Privacy
            </a>
            <a href="/terms" className="transition-colors duration-200 hover:text-slate-900">
              Terms
            </a>
            <a href="/contact" className="transition-colors duration-200 hover:text-slate-900">
              Contact
            </a>
          </div>
          <p className="text-sm text-slate-400">
            &copy; 2025 ShopIQ. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
