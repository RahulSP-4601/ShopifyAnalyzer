"use client";

import Link from "next/link";
import Image from "next/image";
import { useCookieConsent } from "@/hooks/useCookieConsent";

export default function CookiePolicyPage() {
  const { openPreferences } = useCookieConsent();

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto max-w-4xl px-6 py-4">
          <Link href="/" className="flex items-center gap-2">
            <Image
              src="/logo.png"
              alt="ShopIQ"
              width={40}
              height={40}
              className="object-contain"
            />
            <span className="text-lg font-semibold text-slate-900">ShopIQ</span>
          </Link>
        </div>
      </header>

      {/* Content */}
      <main className="mx-auto max-w-4xl px-6 py-12">
        <h1 className="text-3xl font-bold text-slate-900 mb-2">Cookie Policy</h1>
        <p className="text-sm text-slate-500 mb-8">
          Last updated: {new Date().toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}
        </p>

        <div className="prose prose-slate max-w-none">
          <section className="mb-8">
            <h2 className="text-xl font-semibold text-slate-900 mb-4">
              What Are Cookies?
            </h2>
            <p className="text-slate-600 leading-relaxed mb-4">
              Cookies are small text files that are placed on your computer or mobile device when you visit a website.
              They are widely used to make websites work more efficiently and to provide information to website owners.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold text-slate-900 mb-4">
              How We Use Cookies
            </h2>
            <p className="text-slate-600 leading-relaxed mb-4">
              ShopIQ uses cookies to improve your experience, understand how you use our platform, and to personalize content and ads.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold text-slate-900 mb-4">
              Types of Cookies We Use
            </h2>

            <div className="space-y-6">
              <div className="p-4 rounded-lg border border-slate-200 bg-slate-50">
                <h3 className="font-semibold text-slate-900 mb-2">
                  Necessary Cookies
                </h3>
                <p className="text-sm text-slate-600 mb-2">
                  These cookies are essential for the website to function properly. They enable core functionality such as
                  security, authentication, and session management. You cannot disable these cookies.
                </p>
                <ul className="text-sm text-slate-600 list-disc list-inside space-y-1">
                  <li>Session cookies for authentication</li>
                  <li>Security cookies to prevent fraud</li>
                  <li>Load balancing cookies</li>
                </ul>
              </div>

              <div className="p-4 rounded-lg border border-slate-200 bg-slate-50">
                <h3 className="font-semibold text-slate-900 mb-2">
                  Analytics Cookies
                </h3>
                <p className="text-sm text-slate-600 mb-2">
                  These cookies help us understand how visitors interact with our website by collecting and reporting
                  information anonymously. This helps us improve our platform.
                </p>
                <ul className="text-sm text-slate-600 list-disc list-inside space-y-1">
                  <li>Page view tracking</li>
                  <li>Feature usage analytics</li>
                  <li>Performance monitoring</li>
                  <li>Error tracking</li>
                </ul>
              </div>

              <div className="p-4 rounded-lg border border-slate-200 bg-slate-50">
                <h3 className="font-semibold text-slate-900 mb-2">
                  Marketing Cookies
                </h3>
                <p className="text-sm text-slate-600 mb-2">
                  These cookies are used to track visitors across websites to display relevant advertisements.
                  They help us measure the effectiveness of our marketing campaigns.
                </p>
                <ul className="text-sm text-slate-600 list-disc list-inside space-y-1">
                  <li>Ad targeting and retargeting</li>
                  <li>Conversion tracking</li>
                  <li>Social media integration</li>
                </ul>
              </div>
            </div>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold text-slate-900 mb-4">
              Managing Your Preferences
            </h2>
            <p className="text-slate-600 leading-relaxed mb-4">
              You can change your cookie preferences at any time by clicking the button below.
              You can also manage cookies through your browser settings.
            </p>
            <button
              onClick={openPreferences}
              className="px-6 py-2.5 text-sm font-medium text-white bg-gradient-to-r from-teal-500 to-emerald-500 rounded-lg hover:from-teal-600 hover:to-emerald-600 shadow-lg shadow-teal-500/25 transition-all"
            >
              Manage Cookie Preferences
            </button>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold text-slate-900 mb-4">
              Browser Cookie Settings
            </h2>
            <p className="text-slate-600 leading-relaxed mb-4">
              Most web browsers allow you to control cookies through their settings. You can usually find these settings
              in the &quot;Options&quot; or &quot;Preferences&quot; menu of your browser. The following links may be helpful:
            </p>
            <ul className="text-sm text-slate-600 list-disc list-inside space-y-2">
              <li>
                <a href="https://support.google.com/chrome/answer/95647" target="_blank" rel="noopener noreferrer" className="text-teal-600 hover:underline">
                  Google Chrome
                </a>
              </li>
              <li>
                <a href="https://support.mozilla.org/en-US/kb/cookies-information-websites-store-on-your-computer" target="_blank" rel="noopener noreferrer" className="text-teal-600 hover:underline">
                  Mozilla Firefox
                </a>
              </li>
              <li>
                <a href="https://support.apple.com/guide/safari/manage-cookies-sfri11471/mac" target="_blank" rel="noopener noreferrer" className="text-teal-600 hover:underline">
                  Safari
                </a>
              </li>
              <li>
                <a href="https://support.microsoft.com/en-us/microsoft-edge/delete-cookies-in-microsoft-edge-63947406-40ac-c3b8-57b9-2a946a29ae09" target="_blank" rel="noopener noreferrer" className="text-teal-600 hover:underline">
                  Microsoft Edge
                </a>
              </li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold text-slate-900 mb-4">
              Contact Us
            </h2>
            <p className="text-slate-600 leading-relaxed">
              If you have any questions about our use of cookies, please contact us at{" "}
              <a href="mailto:privacy@shopiq.com" className="text-teal-600 hover:underline">
                privacy@shopiq.com
              </a>
            </p>
          </section>
        </div>

        {/* Back link */}
        <div className="mt-12 pt-8 border-t border-slate-200">
          <Link
            href="/"
            className="text-sm text-teal-600 hover:text-teal-700 flex items-center gap-2"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Back to Home
          </Link>
        </div>
      </main>
    </div>
  );
}
