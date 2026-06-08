"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { Menu, X, ShieldAlert, Sun, Moon } from "lucide-react";
import AdminLoginModal from "./AdminLoginModal";

export default function Navbar() {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isAdminModalOpen, setIsAdminModalOpen] = useState(false);
  const [theme, setTheme] = useState<"dark" | "light">("dark");

  useEffect(() => {
    try {
      const savedTheme = localStorage.getItem("theme") as "dark" | "light" | null;
      const initialTheme = savedTheme || (document.documentElement.classList.contains("dark") ? "dark" : "light");
      setTheme(initialTheme);
      if (initialTheme === "dark") {
        document.documentElement.classList.add("dark");
      } else {
        document.documentElement.classList.remove("dark");
      }
    } catch (e) {}
  }, []);

  const toggleTheme = () => {
    const nextTheme = theme === "dark" ? "light" : "dark";
    setTheme(nextTheme);
    try {
      localStorage.setItem("theme", nextTheme);
      if (nextTheme === "dark") {
        document.documentElement.classList.add("dark");
      } else {
        document.documentElement.classList.remove("dark");
      }
    } catch (e) {}
  };

  const navLinks = [
    { label: "Home", href: "/" },
    { label: "Alumni Directory", href: "/directory" },
    { label: "Success Stories", href: "/success-stories" },
    { label: "Contact", href: "/contact" }
  ];

  return (
    <>
      <header className="sticky top-0 z-40 w-full border-b border-white/10 bg-srm-blue text-white transition-all duration-300">
        <div className="mx-auto flex max-w-7xl h-20 items-center justify-between px-6 md:px-8">
          
          {/* Logo Container featuring Official SRMIST seal & typography */}
          <Link href="/" className="flex items-center gap-3 group select-none">
            <svg viewBox="0 0 240 55" className="h-14 w-auto fill-none transition-transform duration-300 group-hover:scale-[1.02]" xmlns="http://www.w3.org/2000/svg">
              {/* Circular SRMIST seal */}
              <circle cx="28" cy="27" r="24" fill="#004684" stroke="#FFD200" strokeWidth="1.5" />
              <circle cx="28" cy="27" r="20" fill="#0b1e36" />
              
              {/* Seal Book representation */}
              <path d="M19 31 C22 34, 25 32, 28 34 C31 32, 34 34, 37 31" stroke="#FFD200" strokeWidth="1.5" fill="none" />
              {/* Flame representing learning */}
              <path d="M28 12 L28 26" stroke="#FFD200" strokeWidth="1.5" />
              <circle cx="28" cy="11" r="2" fill="#FFD200" />
              
              {/* Star-like learning beams */}
              <path d="M21 16 L23 18 M35 16 L33 18 M17 23 L20 23 M39 23 L36 23" stroke="#FFD200" strokeWidth="1" />

              {/* Official SRMIST typography layout */}
              <text x="60" y="21" className="fill-white font-serif font-black text-2xl tracking-tighter">SRM</text>
              <text x="60" y="32" className="fill-slate-200 font-sans font-bold text-[8px] tracking-[0.03em] uppercase">Institute of Science & Tech</text>
              <text x="60" y="42" className="fill-srm-yellow font-sans font-extrabold text-[9px] tracking-[0.06em] uppercase">RAMAPURAM CAMPUS</text>
            </svg>
          </Link>

          {/* Desktop Nav Links */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`text-sm font-semibold tracking-wide transition-all duration-200 hover:text-srm-yellow ${
                    isActive
                      ? "text-srm-yellow border-b-2 border-srm-yellow pb-1"
                      : "text-slate-200 hover:text-srm-yellow"
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>

          {/* Desktop Admin Login CTA & Theme Toggle */}
          <div className="hidden md:flex items-center gap-3">
            <button
              onClick={toggleTheme}
              className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-srm-blue border border-white/20 hover:bg-srm-blue/80 hover:border-srm-yellow text-slate-200 hover:text-white transition-all duration-200 cursor-pointer shadow-sm"
              aria-label="Toggle theme"
              title={theme === "dark" ? "Switch to Light Mode" : "Switch to Dark Mode"}
            >
              {theme === "dark" ? (
                <Sun className="h-5 w-5 text-srm-yellow hover:scale-110 transition-transform duration-200" />
              ) : (
                <Moon className="h-5 w-5 text-srm-yellow hover:scale-110 transition-transform duration-200" />
              )}
            </button>
            <button
              onClick={() => setIsAdminModalOpen(true)}
              className="inline-flex items-center gap-2 rounded-xl bg-srm-blue border border-white/20 hover:border-srm-yellow hover:bg-srm-blue/80 py-2.5 px-5 text-sm font-semibold text-slate-200 transition-all duration-200 cursor-pointer shadow-sm hover:text-white"
            >
              <ShieldAlert className="h-4 w-4 text-srm-yellow" />
              Admin Portal
            </button>
          </div>

          {/* Mobile Actions Container */}
          <div className="flex items-center gap-2 md:hidden">
            <button
              onClick={toggleTheme}
              className="flex h-10 w-10 items-center justify-center rounded-lg border border-white/20 text-slate-200 hover:bg-srm-blue/80 hover:text-white transition-colors"
              aria-label="Toggle theme"
            >
              {theme === "dark" ? (
                <Sun className="h-5 w-5 text-srm-yellow" />
              ) : (
                <Moon className="h-5 w-5 text-srm-yellow" />
              )}
            </button>
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="flex h-10 w-10 items-center justify-center rounded-lg border border-white/20 text-slate-200 hover:bg-srm-blue/80 hover:text-white transition-colors"
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {isMobileMenuOpen && (
          <div className="border-b border-white/10 bg-srm-blue px-6 py-6 md:hidden">
            <nav className="flex flex-col gap-4">
              {navLinks.map((link) => {
                const isActive = pathname === link.href;
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={`text-base font-semibold tracking-wide py-2 transition-colors ${
                      isActive ? "text-srm-yellow" : "text-slate-200 hover:text-srm-yellow"
                    }`}
                  >
                    {link.label}
                  </Link>
                );
              })}
              <button
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  setIsAdminModalOpen(true);
                }}
                className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-srm-blue/80 border border-white/20 py-3 text-sm font-semibold text-slate-200 transition-all active:scale-[0.98] hover:text-srm-yellow"
              >
                <ShieldAlert className="h-4 w-4 text-srm-yellow" />
                Admin Portal
              </button>
            </nav>
          </div>
        )}
      </header>

      {/* Admin Login Modal Overlay */}
      <AdminLoginModal isOpen={isAdminModalOpen} onClose={() => setIsAdminModalOpen(false)} />
    </>
  );
}
