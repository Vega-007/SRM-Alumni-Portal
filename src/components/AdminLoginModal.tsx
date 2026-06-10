"use client";

import { m, AnimatePresence, LazyMotion, domAnimation } from "framer-motion";
import { X, Lock, Mail, Loader2 } from "lucide-react";
import { useState, useTransition } from "react";

interface AdminLoginModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function AdminLoginModal({ isOpen, onClose }: AdminLoginModalProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isPending, startTransition] = useTransition();
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) return;
    
    startTransition(() => {
      // Simulate API auth call
      setTimeout(() => {
        setIsSuccess(true);
        setTimeout(() => {
          setIsSuccess(false);
          setEmail("");
          setPassword("");
          onClose();
        }, 1500);
      }, 2000);
    });
  };

  return (
    <LazyMotion features={domAnimation}>
      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Backdrop overlay */}
            <m.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={onClose}
              className="absolute inset-0 bg-slate-950/80 backdrop-blur-sm"
            />

            {/* Modal Container */}
            <m.div
              initial={{ scale: 0.95, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 20 }}
              transition={{ type: "spring" as const, duration: 0.5 }}
              className="relative w-full max-w-md overflow-hidden rounded-2xl border border-slate-800/80 bg-slate-950 p-8 shadow-2xl shadow-yellow-500/5 glass-panel z-10"
            >
              {/* Top Glow bar */}
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-yellow-500 via-yellow-400 to-yellow-600" />

              {/* Close Button */}
              <button
                type="button"
                onClick={onClose}
                className="absolute top-4 right-4 text-slate-400 hover:text-white transition-colors duration-200"
                aria-label="Close Admin Login"
              >
                <X className="h-5 w-5" />
              </button>

              {/* Header */}
              <div className="mb-6 text-center">
                <div className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-yellow-500/10 text-yellow-500 mb-3 border border-yellow-500/20">
                  <Lock className="h-5 w-5" />
                </div>
                <h3 className="font-display text-2xl font-semibold text-white tracking-tight">
                  Portal Administration
                </h3>
                <p className="text-sm text-slate-400 mt-1">
                  Secure access for SRMIST Ramapuram coordinators
                </p>
              </div>

              {/* Form */}
              {isSuccess ? (
                <m.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex flex-col items-center justify-center py-6 text-center"
                >
                  <div className="h-10 w-10 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mb-3">
                    ✓
                  </div>
                  <h4 className="text-lg font-medium text-white">Access Granted</h4>
                  <p className="text-sm text-slate-400 mt-1">Redirecting to admin dashboard...</p>
                </m.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label htmlFor="admin-email" className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
                      Administrator Email
                    </label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" />
                      <input
                        id="admin-email"
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="admin@srmist.edu.in"
                        className="w-full rounded-xl border border-slate-800 bg-slate-900/60 py-3 pl-10 pr-4 text-sm text-white placeholder-slate-500 outline-none transition-all duration-200 focus:border-yellow-500/50 focus:ring-1 focus:ring-yellow-500/50"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="admin-password" className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
                      Password
                    </label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" />
                      <input
                        id="admin-password"
                        type="password"
                        required
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="••••••••••••"
                        className="w-full rounded-xl border border-slate-800 bg-slate-900/60 py-3 pl-10 pr-4 text-sm text-white placeholder-slate-500 outline-none transition-all duration-200 focus:border-yellow-500/50 focus:ring-1 focus:ring-yellow-500/50"
                      />
                    </div>
                  </div>

                  <div className="flex items-center justify-between text-xs pt-1">
                    <label className="flex items-center gap-2 text-slate-400 cursor-pointer">
                      <input
                        type="checkbox"
                        className="rounded border-slate-800 bg-slate-900 text-yellow-500 focus:ring-0"
                      />
                      Remember session
                    </label>
                    <button type="button" className="text-yellow-500 hover:underline bg-transparent border-none p-0 cursor-pointer text-xs font-medium">
                      Forgot password?
                    </button>
                  </div>

                  <button
                    type="submit"
                    disabled={isPending}
                    className="w-full mt-2 inline-flex items-center justify-center rounded-xl bg-gradient-to-r from-yellow-500 to-yellow-600 hover:from-yellow-400 hover:to-yellow-500 py-3 text-sm font-semibold text-slate-950 transition-all duration-200 focus:outline-none disabled:opacity-50 cursor-pointer hover:shadow-lg hover:shadow-yellow-500/20 active:scale-[0.98]"
                  >
                    {isPending ? (
                      <>
                        <Loader2 className="h-4 w-4 animate-spin mr-2" />
                        Verifying credentials...
                      </>
                    ) : (
                      "Authorize & Log In"
                    )}
                  </button>
                </form>
              )}
            </m.div>
          </div>
        )}
      </AnimatePresence>
    </LazyMotion>
  );
}
