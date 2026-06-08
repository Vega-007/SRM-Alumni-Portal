"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, User, GraduationCap, Briefcase, Link as LinkIcon, Mail, MapPin, CheckCircle } from "lucide-react";
import { useState } from "react";

interface UpdateInfoModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function UpdateInfoModal({ isOpen, onClose }: UpdateInfoModalProps) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    degree: "B.Tech CSE",
    batch: "2023",
    company: "",
    role: "",
    location: "",
    linkedin: ""
  });
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    // Simulate database record update
    setTimeout(() => {
      setIsLoading(false);
      setIsSuccess(true);
      setTimeout(() => {
        setIsSuccess(false);
        setFormData({
          name: "",
          email: "",
          degree: "B.Tech CSE",
          batch: "2023",
          company: "",
          role: "",
          location: "",
          linkedin: ""
        });
        onClose();
      }, 2000);
    }, 1500);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto">
          {/* Backdrop overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-slate-950/80 backdrop-blur-sm"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ scale: 0.95, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.95, opacity: 0, y: 20 }}
            transition={{ type: "spring" as const, duration: 0.5 }}
            className="relative w-full max-w-lg rounded-2xl border border-slate-800/80 bg-slate-950 p-6 sm:p-8 shadow-2xl glass-panel z-10"
          >
            {/* Top Gold bar */}
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-yellow-500 via-yellow-400 to-yellow-600" />

            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 text-slate-400 hover:text-white transition-colors duration-200"
              aria-label="Close form"
            >
              <X className="h-5 w-5" />
            </button>

            {/* Header */}
            <div className="mb-6">
              <h3 className="font-display text-2xl font-semibold text-white tracking-tight">
                Update Professional Info
              </h3>
              <p className="text-sm text-slate-400 mt-1">
                Help us keep our records accurate and showcase your achievements.
              </p>
            </div>

            {isSuccess ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex flex-col items-center justify-center py-10 text-center"
              >
                <div className="h-16 w-16 rounded-full bg-yellow-500/10 border border-yellow-500/20 text-yellow-500 flex items-center justify-center mb-4">
                  <CheckCircle className="h-8 w-8" />
                </div>
                <h4 className="text-xl font-medium text-white">Information Submitted!</h4>
                <p className="text-sm text-slate-400 max-w-sm mt-2">
                  Thank you! Your details will be reviewed and updated in the directory shortly.
                </p>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
                      Full Name
                    </label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" />
                      <input
                        type="text"
                        name="name"
                        required
                        value={formData.name}
                        onChange={handleInputChange}
                        placeholder="John Doe"
                        className="w-full rounded-xl border border-slate-800 bg-slate-900/60 py-2.5 pl-9 pr-4 text-sm text-white placeholder-slate-500 outline-none transition-all duration-200 focus:border-yellow-500/50"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
                      Email Address
                    </label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" />
                      <input
                        type="email"
                        name="email"
                        required
                        value={formData.email}
                        onChange={handleInputChange}
                        placeholder="john.doe@example.com"
                        className="w-full rounded-xl border border-slate-800 bg-slate-900/60 py-2.5 pl-9 pr-4 text-sm text-white placeholder-slate-500 outline-none transition-all duration-200 focus:border-yellow-500/50"
                      />
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
                      Degree
                    </label>
                    <div className="relative">
                      <GraduationCap className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" />
                      <select
                        name="degree"
                        value={formData.degree}
                        onChange={handleInputChange}
                        className="w-full rounded-xl border border-slate-800 bg-slate-900/60 py-2.5 pl-9 pr-4 text-sm text-white outline-none transition-all duration-200 focus:border-yellow-500/50 appearance-none"
                      >
                        <option value="B.Tech CSE">B.Tech CSE</option>
                        <option value="B.Tech IT">B.Tech IT</option>
                        <option value="B.Tech ECE">B.Tech ECE</option>
                        <option value="B.Tech ME">B.Tech ME</option>
                        <option value="MBA">MBA</option>
                        <option value="M.Tech CSE">M.Tech CSE</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
                      Graduation Batch
                    </label>
                    <select
                      name="batch"
                      value={formData.batch}
                      onChange={handleInputChange}
                      className="w-full rounded-xl border border-slate-800 bg-slate-900/60 py-2.5 px-4 text-sm text-white outline-none transition-all duration-200 focus:border-yellow-500/50 appearance-none"
                    >
                      {Array.from({ length: 8 }, (_, i) => 2018 + i).map((year) => (
                        <option key={year} value={year.toString()}>
                          Class of {year}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
                      Current Company
                    </label>
                    <div className="relative">
                      <Briefcase className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" />
                      <input
                        type="text"
                        name="company"
                        required
                        value={formData.company}
                        onChange={handleInputChange}
                        placeholder="Google"
                        className="w-full rounded-xl border border-slate-800 bg-slate-900/60 py-2.5 pl-9 pr-4 text-sm text-white placeholder-slate-500 outline-none transition-all duration-200 focus:border-yellow-500/50"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
                      Current Job Title
                    </label>
                    <input
                      type="text"
                      name="role"
                      required
                      value={formData.role}
                      onChange={handleInputChange}
                      placeholder="Software Engineer"
                      className="w-full rounded-xl border border-slate-800 bg-slate-900/60 py-2.5 px-4 text-sm text-white placeholder-slate-500 outline-none transition-all duration-200 focus:border-yellow-500/50"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
                      City & Country
                    </label>
                    <div className="relative">
                      <MapPin className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" />
                      <input
                        type="text"
                        name="location"
                        required
                        value={formData.location}
                        onChange={handleInputChange}
                        placeholder="San Francisco, USA"
                        className="w-full rounded-xl border border-slate-800 bg-slate-900/60 py-2.5 pl-9 pr-4 text-sm text-white placeholder-slate-500 outline-none transition-all duration-200 focus:border-yellow-500/50"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
                      LinkedIn URL
                    </label>
                    <div className="relative">
                      <LinkIcon className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" />
                      <input
                        type="url"
                        name="linkedin"
                        required
                        value={formData.linkedin}
                        onChange={handleInputChange}
                        placeholder="https://linkedin.com/in/username"
                        className="w-full rounded-xl border border-slate-800 bg-slate-900/60 py-2.5 pl-9 pr-4 text-sm text-white placeholder-slate-500 outline-none transition-all duration-200 focus:border-yellow-500/50"
                      />
                    </div>
                  </div>
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full inline-flex items-center justify-center rounded-xl bg-gradient-to-r from-yellow-500 to-yellow-600 hover:from-yellow-400 hover:to-yellow-500 py-3 text-sm font-semibold text-slate-950 transition-all duration-200 focus:outline-none disabled:opacity-50 cursor-pointer hover:shadow-lg hover:shadow-yellow-500/20 active:scale-[0.98]"
                  >
                    {isLoading ? (
                      <span className="flex items-center gap-2">
                        <svg className="animate-spin h-4 w-4 text-slate-950" viewBox="0 0 24 24" fill="none">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                        </svg>
                        Submitting Update...
                      </span>
                    ) : (
                      "Submit Profile Update"
                    )}
                  </button>
                </div>
              </form>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
