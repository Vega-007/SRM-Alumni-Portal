"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, SlidersHorizontal, RefreshCw, GraduationCap, Briefcase } from "lucide-react";
import { MOCK_ALUMNI } from "@/data/mockData";

const LinkedinIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect width="4" height="12" x="2" y="9" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

export default function DirectoryPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedBatch, setSelectedBatch] = useState("All");
  const [selectedCompany, setSelectedCompany] = useState("All");
  const [visibleCount, setVisibleCount] = useState(6);

  // Extract unique batches and companies for filter lists
  const batchOptions = useMemo(() => {
    const batches = MOCK_ALUMNI.map((a) => a.batch);
    return ["All", ...Array.from(new Set(batches))].sort();
  }, []);

  const companyOptions = useMemo(() => {
    const companies = MOCK_ALUMNI.map((a) => a.company);
    return ["All", ...Array.from(new Set(companies))].sort();
  }, []);

  // Filtered list
  const filteredAlumni = useMemo(() => {
    return MOCK_ALUMNI.filter((alumni) => {
      const matchesSearch = alumni.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                            alumni.role.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesBatch = selectedBatch === "All" || alumni.batch === selectedBatch;
      const matchesCompany = selectedCompany === "All" || alumni.company === selectedCompany;
      return matchesSearch && matchesBatch && matchesCompany;
    });
  }, [searchQuery, selectedBatch, selectedCompany]);

  const displayedAlumni = useMemo(() => {
    return filteredAlumni.slice(0, visibleCount);
  }, [filteredAlumni, visibleCount]);

  const handleResetFilters = () => {
    setSearchQuery("");
    setSelectedBatch("All");
    setSelectedCompany("All");
    setVisibleCount(6);
  };

  const handleLoadMore = () => {
    setVisibleCount((prev) => prev + 6);
  };

  return (
    <div className="w-full min-h-screen bg-transparent py-12 px-6 md:px-8 overflow-x-hidden">
      <div className="mx-auto max-w-7xl">
        
        {/* Header Section */}
        <div className="mb-12 text-left">
          <h1 className="font-display text-4xl font-extrabold tracking-tight text-slate-900 dark:text-slate-50 sm:text-5xl">
            Alumni <span className="text-srm-yellow font-extrabold">Directory</span>
          </h1>
          <p className="mt-3 text-base text-slate-600 dark:text-slate-400 max-w-xl">
            Connect and network with fellow SRMIST Ramapuram graduates. Filter by graduation year, industry, or search by name.
          </p>
        </div>

        {/* Directory Layout: Sidebar + Grid */}
        <div className="flex flex-col gap-6 w-full lg:flex-row items-start">
          
          {/* Sidebar filter pane (col-span-3) */}
          <div className="w-full lg:w-72 shrink-0 rounded-2xl border border-slate-200/80 dark:border-slate-800/60 bg-white/60 dark:bg-slate-950/60 backdrop-blur-md p-6 lg:sticky lg:top-24 shadow-sm relative clear-both mb-6">
            <div className="flex items-center justify-between mb-6 pb-4 border-b border-slate-200 dark:border-slate-900">
              <span className="font-display font-bold text-slate-900 dark:text-slate-50 flex items-center gap-2">
                <SlidersHorizontal className="h-4.5 w-4.5 text-srm-yellow" />
                Refine Search
              </span>
              <button
                onClick={handleResetFilters}
                className="text-xs font-semibold text-slate-500 hover:text-srm-yellow transition-colors flex items-center gap-1 cursor-pointer"
              >
                <RefreshCw className="h-3 w-3" />
                Reset
              </button>
            </div>

            <div className="space-y-6">
              {/* Name/Keyword search */}
              <div>
                <label className="block text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-2">
                  Keyword Search
                </label>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => {
                      setSearchQuery(e.target.value);
                      setVisibleCount(6);
                    }}
                    placeholder="Search name, role..."
                    className="w-full rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-100 dark:bg-slate-900 py-2.5 pl-9 pr-4 text-sm text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 outline-none focus:border-srm-yellow/50"
                  />
                </div>
              </div>

              {/* Batch Dropdown */}
              <div>
                <label className="block text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-2">
                  Graduation Year
                </label>
                <select
                  value={selectedBatch}
                  onChange={(e) => {
                    setSelectedBatch(e.target.value);
                    setVisibleCount(6);
                  }}
                  className="w-full rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-100 dark:bg-slate-900 py-2.5 px-4 text-sm text-slate-900 dark:text-white outline-none focus:border-srm-yellow/50 appearance-none cursor-pointer"
                >
                  <option value="All">All Graduation Years</option>
                  {batchOptions.filter((b) => b !== "All").map((batch) => (
                    <option key={batch} value={batch}>
                      Class of {batch}
                    </option>
                  ))}
                </select>
              </div>

              {/* Company Dropdown */}
              <div>
                <label className="block text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-2">
                  Company / Organization
                </label>
                <select
                  value={selectedCompany}
                  onChange={(e) => {
                    setSelectedCompany(e.target.value);
                    setVisibleCount(6);
                  }}
                  className="w-full rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-100 dark:bg-slate-900 py-2.5 px-4 text-sm text-slate-900 dark:text-white outline-none focus:border-srm-yellow/50 appearance-none cursor-pointer"
                >
                  <option value="All">All Companies</option>
                  {companyOptions.filter((c) => c !== "All").map((company) => (
                    <option key={company} value={company}>
                      {company}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Matching results info */}
            <div className="mt-8 pt-4 border-t border-slate-200 dark:border-slate-900 text-xs text-slate-500 dark:text-slate-400">
              Showing <span className="text-slate-900 dark:text-white font-semibold">{Math.min(filteredAlumni.length, visibleCount)}</span> of{" "}
              <span className="text-slate-900 dark:text-white font-semibold">{filteredAlumni.length}</span> matching profiles.
            </div>
          </div>

          {/* Results grid pane (col-span-9) */}
          <div className="flex-1 w-full space-y-8">
            
            {filteredAlumni.length === 0 ? (
              <div className="rounded-2xl border border-slate-200/80 dark:border-slate-800/60 bg-white/60 dark:bg-slate-950/60 backdrop-blur-md py-20 text-center flex flex-col items-center justify-center shadow-sm">
                <div className="h-12 w-12 rounded-xl bg-slate-200 dark:bg-slate-900 border border-slate-300 dark:border-slate-800 text-slate-500 flex items-center justify-center mb-4 text-xl font-bold">
                  ?
                </div>
                <h3 className="font-display text-lg font-bold text-slate-900 dark:text-white">No Profiles Found</h3>
                <p className="text-sm text-slate-550 max-w-sm mt-1">
                  We couldn&apos;t find any alumni matching your search filters. Try resetting the sidebar criteria.
                </p>
                <button
                  onClick={handleResetFilters}
                  className="mt-4 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-srm-yellow/30 py-2.5 px-5 text-xs font-semibold text-slate-700 dark:text-slate-200 hover:text-slate-900 dark:hover:text-white transition-all cursor-pointer"
                >
                  Reset Filters
                </button>
              </div>
            ) : (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {displayedAlumni.map((alumni) => (
                    <div
                      key={alumni.id}
                      className="group relative overflow-hidden rounded-2xl border border-slate-200/80 dark:border-slate-800/60 bg-white/60 dark:bg-slate-950/60 backdrop-blur-md p-5 flex flex-col justify-between hover:border-srm-yellow/20 hover:shadow-xl hover:shadow-srm-yellow/2"
                    >
                      <div>
                        {/* Avatar & Basic Credentials */}
                        <div className="flex items-center gap-4">
                          <div className="h-12 w-12 rounded-xl overflow-hidden bg-slate-200 dark:bg-slate-900 border border-slate-300 dark:border-slate-800 shrink-0">
                            <img
                              src={alumni.imageUrl}
                              alt={alumni.name}
                              className="h-full w-full object-cover"
                            />
                          </div>
                          <div>
                            <h4 className="font-display font-bold text-slate-900 dark:text-white text-base group-hover:text-srm-yellow transition-colors duration-200">
                              {alumni.name}
                            </h4>
                            <div className="flex items-center gap-1.5 text-slate-500 dark:text-slate-400 text-xs mt-0.5">
                              <GraduationCap className="h-3.5 w-3.5" />
                              <span>Class of {alumni.batch}</span>
                            </div>
                          </div>
                        </div>

                        {/* Profession */}
                        <div className="mt-4 pt-3 border-t border-slate-200 dark:border-slate-900/60 flex items-start gap-2.5 text-sm text-slate-600 dark:text-slate-300">
                          <Briefcase className="h-4 w-4 text-slate-400 mt-0.5 shrink-0" />
                          <div className="flex flex-col">
                            <span className="font-semibold text-slate-900 dark:text-slate-100 leading-tight">{alumni.role}</span>
                            <span className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">{alumni.company}</span>
                          </div>
                        </div>
                      </div>

                      {/* Footer Info & LinkedIn */}
                      <div className="flex items-center justify-between mt-5 pt-3 border-t border-slate-200 dark:border-slate-900/60">
                        <div className="flex items-center gap-2">
                          <div className="h-6 w-6 rounded bg-srm-yellow/10 border border-srm-yellow/20 text-srm-yellow text-[10px] font-bold font-display flex items-center justify-center uppercase">
                            {alumni.companyLogoText.slice(0, 3)}
                          </div>
                          <span className="text-[11px] text-slate-550 dark:text-slate-400 font-medium">{alumni.city}</span>
                        </div>

                        <div className="flex items-center gap-3">
                          {alumni.featured && (
                            <span className="bg-srm-yellow/10 border border-srm-yellow/20 text-[10px] text-srm-yellow/90 font-bold uppercase tracking-wider rounded-md px-1.5 py-0.5 animate-pulse">
                              Featured
                            </span>
                          )}
                          <a
                            href={alumni.linkedin}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-srm-yellow hover:text-srm-red"
                          >
                            <LinkedinIcon className="h-4 w-4" />
                          </a>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Paginated Loader trigger */}
                {filteredAlumni.length > visibleCount && (
                  <div className="flex justify-center pt-4">
                    <button
                      onClick={handleLoadMore}
                      className="rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-100 dark:bg-slate-900/40 hover:bg-slate-200 dark:hover:bg-slate-900 hover:border-srm-yellow/30 py-3.5 px-8 text-sm font-bold text-slate-700 dark:text-slate-200 hover:text-slate-900 dark:hover:text-white transition-all cursor-pointer active:scale-[0.98]"
                    >
                      Load More Profiles
                    </button>
                  </div>
                )}
              </>
            )}

          </div>

        </div>

      </div>
    </div>
  );
}
