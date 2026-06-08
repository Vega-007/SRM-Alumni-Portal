"use client";

import Link from "next/link";
import { useState } from "react";
import { GraduationCap, ArrowUpRight, Send } from "lucide-react";

// Custom inline SVG icons for brand logos
const InstagramIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
  </svg>
);

const LinkedinIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect width="4" height="12" x="2" y="9" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

const TwitterIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
  </svg>
);

const YoutubeIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.55 49.55 0 0 1-16.2 0A2 2 0 0 1 2.5 17z" />
    <polygon points="10 15 15 12 10 9" />
  </svg>
);

export default function Footer() {

  const [emailInput, setEmailInput] = useState("");
  const [newsletterSubscribed, setNewsletterSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!emailInput) return;
    setNewsletterSubscribed(true);
    setTimeout(() => {
      setEmailInput("");
      setNewsletterSubscribed(false);
    }, 3000);
  };

  return (
    <>
      <footer className="w-full bg-transparent border-t border-slate-250 dark:border-slate-900 pt-16 pb-8 text-slate-650 dark:text-slate-400">
        <div className="mx-auto max-w-7xl px-6 md:px-8">
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
            
            {/* Column 1: Info and Brand */}
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-slate-900 dark:text-slate-50">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-srm-yellow/10 border border-srm-yellow/30 text-srm-yellow">
                  <GraduationCap className="h-5 w-5" />
                </div>
                <span className="font-display text-lg font-bold tracking-tight">
                  SRMIST <span className="text-srm-yellow font-black">Ramapuram</span>
                </span>
              </div>
              <p className="text-sm leading-relaxed text-slate-500 dark:text-slate-400">
                Establishing excellence in technology, science, and management education. Empowering our global alumni network to innovate and lead.
              </p>
              
              {/* Social links */}
              <div className="flex items-center gap-3 pt-2">
                {[
                  { icon: LinkedinIcon, href: "https://linkedin.com", label: "LinkedIn" },
                  { icon: TwitterIcon, href: "https://twitter.com", label: "Twitter" },
                  { icon: InstagramIcon, href: "https://instagram.com", label: "Instagram" },
                  { icon: YoutubeIcon, href: "https://youtube.com", label: "YouTube" }
                ].map((social, i) => (
                  <a
                    key={i}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.label}
                    className="flex h-9 w-9 items-center justify-center rounded-lg bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-500 dark:text-slate-400 hover:text-srm-yellow hover:border-srm-yellow/30 transition-all hover:scale-105"
                  >
                    <social.icon className="h-4.5 w-4.5" />
                  </a>
                ))}
              </div>
            </div>

            {/* Column 2: Quick Links */}
            <div>
              <h4 className="text-sm font-semibold text-slate-900 dark:text-slate-50 uppercase tracking-wider mb-5">
                Portal Sitemap
              </h4>
              <ul className="space-y-3 text-sm">
                <li>
                  <Link href="/" className="hover:text-srm-yellow transition-colors flex items-center gap-1">
                    Home Page
                  </Link>
                </li>
                <li>
                  <Link href="/directory" className="hover:text-srm-yellow transition-colors flex items-center gap-1">
                    Alumni Directory
                  </Link>
                </li>
                <li>
                  <Link href="/success-stories" className="hover:text-srm-yellow transition-colors flex items-center gap-1">
                    Success Stories
                  </Link>
                </li>
                <li>
                  <a
                    href="https://srmrmp.edu.in"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-srm-yellow transition-colors flex items-center gap-1 group"
                  >
                    Campus Website
                    <ArrowUpRight className="h-3 w-3 opacity-50 group-hover:opacity-100 transition-opacity" />
                  </a>
                </li>
              </ul>
            </div>

            {/* Column 3: Institutional Links */}
            <div>
              <h4 className="text-sm font-semibold text-slate-900 dark:text-slate-50 uppercase tracking-wider mb-5">
                Support & Info
              </h4>
              <ul className="space-y-3 text-sm">
                <li>
                  <a href="#" className="hover:text-srm-yellow transition-colors">
                    Career Development Cell
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-srm-yellow transition-colors">
                    Research & Development
                  </a>
                </li>
                <li>
                  <Link
                    href="/contact"
                    className="hover:text-srm-yellow transition-colors text-left font-medium text-srm-red dark:text-srm-yellow hover:underline cursor-pointer"
                  >
                    Update Information Form
                  </Link>
                </li>
                <li>
                  <a href="#" className="hover:text-srm-yellow transition-colors">
                    Privacy Policy
                  </a>
                </li>
              </ul>
            </div>

            {/* Column 4: Newsletter & Micro-form */}
            <div>
              <h4 className="text-sm font-semibold text-slate-900 dark:text-slate-50 uppercase tracking-wider mb-5">
                Newsletter
              </h4>
              <p className="text-sm leading-relaxed mb-4 text-slate-500 dark:text-slate-400">
                Receive job opportunities, networking details, and event invites.
              </p>
              {newsletterSubscribed ? (
                <div className="text-sm text-srm-yellow font-medium py-2">
                  ✓ Subscribed successfully!
                </div>
              ) : (
                <form onSubmit={handleSubscribe} className="flex gap-2">
                  <input
                    type="email"
                    required
                    value={emailInput}
                    onChange={(e) => setEmailInput(e.target.value)}
                    placeholder="alumni@srmist.edu.in"
                    className="w-full rounded-lg border border-slate-250 dark:border-slate-800 bg-slate-100 dark:bg-slate-900/60 py-2 px-3 text-sm text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 outline-none focus:border-srm-yellow/50"
                  />
                  <button
                    type="submit"
                    className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-srm-yellow hover:bg-srm-yellow/90 text-slate-950 transition-colors cursor-pointer"
                    aria-label="Subscribe"
                  >
                    <Send className="h-4 w-4" />
                  </button>
                </form>
              )}
              <div className="pt-4">
                <Link
                  href="/contact"
                  className="w-full inline-flex justify-center items-center gap-2 rounded-lg bg-slate-100 hover:bg-slate-200/80 dark:bg-slate-900/60 dark:hover:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-srm-yellow/30 py-2 px-4 text-xs font-semibold text-slate-700 dark:text-slate-200 transition-all hover:text-slate-900 dark:hover:text-white cursor-pointer"
                >
                  Change Email / Contact details
                </Link>
              </div>
            </div>
            
          </div>

          <div className="border-t border-slate-200 dark:border-slate-900 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
            <p className="text-slate-500 dark:text-slate-500 text-center sm:text-left">
              &copy; {new Date().getFullYear()} SRMIST Ramapuram Alumni Association. All rights reserved.
            </p>
            <p className="text-slate-500 dark:text-slate-600">
              Designed with Precision for SRMIST Ramapuram
            </p>
          </div>

        </div>
      </footer>

    </>
  );
}
