"use client";

import { useState, useRef, DragEvent } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  MapPin,
  Phone,
  Mail,
  Building,
  GraduationCap,
  Briefcase,
  DollarSign,
  User,
  UploadCloud,
  FileText,
  CheckCircle2,
  AlertCircle,
  ChevronRight,
  ChevronLeft,
  Loader2,
  Trash2
} from "lucide-react";

interface FormData {
  fullName: string;
  batch: string;
  degree: string;
  company: string;
  jobTitle: string;
  ctc: string;
}

interface FormErrors {
  fullName?: string;
  batch?: string;
  degree?: string;
  company?: string;
  jobTitle?: string;
  ctc?: string;
  file?: string;
}

export default function ContactPage() {
  // Multistep Stepper State: 1 = Academic, 2 = Professional, 3 = Verification & Submit
  const [step, setStep] = useState<number>(1);
  const [formData, setFormData] = useState<FormData>({
    fullName: "",
    batch: "",
    degree: "",
    company: "",
    jobTitle: "",
    ctc: "",
  });
  
  const [errors, setErrors] = useState<FormErrors>({});
  
  // File Uploader states
  const [file, setFile] = useState<File | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [uploadProgress, setUploadProgress] = useState<number>(0);
  const [isUploading, setIsUploading] = useState<boolean>(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Form submission states
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [submitSuccess, setSubmitSuccess] = useState<boolean>(false);
  const [ticketId, setTicketId] = useState<string>("");

  // Year choices for batch select
  const currentYear = new Date().getFullYear();
  const batchYears = Array.from({ length: currentYear - 1999 }, (_, i) => String(currentYear - i));

  // Input Handlers
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  // Step Validation
  const validateStep = (currentStep: number): boolean => {
    const newErrors: FormErrors = {};
    
    if (currentStep === 1) {
      if (!formData.fullName.trim()) newErrors.fullName = "Full name is required.";
      else if (formData.fullName.trim().length < 3) newErrors.fullName = "Name must be at least 3 characters.";
      
      if (!formData.batch) newErrors.batch = "Graduation batch year is required.";
      
      if (!formData.degree.trim()) newErrors.degree = "Degree / Branch is required.";
    } 
    else if (currentStep === 2) {
      if (!formData.company.trim()) newErrors.company = "Company / Corporation name is required.";
      if (!formData.jobTitle.trim()) newErrors.jobTitle = "Job title is required.";
      if (!formData.ctc.trim()) newErrors.ctc = "CTC package value is required.";
      else if (isNaN(Number(formData.ctc)) || Number(formData.ctc) <= 0) {
        newErrors.ctc = "Please enter a valid numeric CTC package.";
      }
    } 
    else if (currentStep === 3) {
      if (!file) {
        newErrors.file = "Please upload a verification document (marksheet/degree proof).";
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateStep(step)) {
      setStep((prev) => prev + 1);
    }
  };

  const handleBack = () => {
    setStep((prev) => prev - 1);
  };

  // Drag and drop handlers
  const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const simulateProgress = (uploadedFile: File) => {
    setIsUploading(true);
    setUploadProgress(0);
    const interval = setInterval(() => {
      setUploadProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsUploading(false);
          setFile(uploadedFile);
          if (errors.file) {
            setErrors((prevErr) => ({ ...prevErr, file: "" }));
          }
          return 100;
        }
        return prev + 10;
      });
    }, 150);
  };

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const droppedFile = e.dataTransfer.files[0];
      const validTypes = ["image/jpeg", "image/png", "application/pdf"];
      
      if (!validTypes.includes(droppedFile.type)) {
        setErrors((prev) => ({ ...prev, file: "Invalid file format. Upload PDF, PNG, or JPEG." }));
        return;
      }
      
      if (droppedFile.size > 5 * 1024 * 1024) {
        setErrors((prev) => ({ ...prev, file: "File exceeds 5MB limit." }));
        return;
      }

      simulateProgress(droppedFile);
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0];
      simulateProgress(selectedFile);
    }
  };

  const handleRemoveFile = () => {
    setFile(null);
    setUploadProgress(0);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  // Submit Handler
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateStep(3)) return;

    setIsSubmitting(true);
    
    // Simulate API request to register / verify
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitSuccess(true);
      // Generate a mock registration/verification ticket ID
      const randomTicket = `SRM-ALUM-${Math.floor(100000 + Math.random() * 900000)}`;
      setTicketId(randomTicket);
    }, 2000);
  };

  const handleReset = () => {
    setFormData({
      fullName: "",
      batch: "",
      degree: "",
      company: "",
      jobTitle: "",
      ctc: "",
    });
    setFile(null);
    setUploadProgress(0);
    setStep(1);
    setSubmitSuccess(false);
    setTicketId("");
  };

  return (
    <div className="mx-auto w-full max-w-7xl px-6 py-12 md:py-20 md:px-8 overflow-x-hidden">
      {/* Title Header */}
      <div className="mb-12 text-center md:mb-16">
        <h1 className="font-display text-4xl font-extrabold tracking-tight text-slate-900 dark:text-slate-50 md:text-5xl">
          Alumni <span className="text-srm-red dark:text-srm-yellow">Contact & Info Gateway</span>
        </h1>
        <p className="mx-auto mt-4 max-w-2xl text-base text-slate-600 dark:text-slate-400">
          Reach out to the SRMIST Ramapuram Alumni Association or update your corporate profile to maintain credentials and active verification on the portal.
        </p>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
        
        {/* Left Column - Contact Details & Campus Map */}
        <div className="lg:col-span-5 space-y-8">
          
          {/* Institutional Info Card */}
          <div className="rounded-2xl border border-slate-200/80 dark:border-slate-800/60 bg-white/60 dark:bg-slate-950/60 backdrop-blur-md p-6 md:p-8 shadow-sm">
            <h2 className="font-display text-xl font-bold text-slate-900 dark:text-slate-50 mb-6 flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-srm-red" />
              Institutional Directory
            </h2>
            
            <div className="space-y-6">
              {/* Address */}
              <div className="flex gap-4">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-srm-blue/10 dark:bg-srm-yellow/10 text-srm-blue dark:text-srm-yellow">
                  <MapPin className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-slate-900 dark:text-slate-100">Campuses & Office Address</h3>
                  <p className="mt-1 text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                    SRMIST Ramapuram Campus,<br />
                    Bharathi Salai, Ramapuram,<br />
                    Chennai, Tamil Nadu 600089.
                  </p>
                </div>
              </div>

              {/* Direct Emails */}
              <div className="flex gap-4">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-srm-blue/10 dark:bg-srm-yellow/10 text-srm-blue dark:text-srm-yellow">
                  <Mail className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-slate-900 dark:text-slate-100">Alumni Desk Directories</h3>
                  <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">
                    <a href="mailto:alumni.association@srmist.edu.in" className="hover:text-srm-lightBlue hover:underline transition-colors block">
                      alumni.association@srmist.edu.in
                    </a>
                    <a href="mailto:admin.alumni@srmist.edu.in" className="hover:text-srm-lightBlue hover:underline transition-colors block mt-0.5">
                      admin.alumni@srmist.edu.in
                    </a>
                  </p>
                </div>
              </div>

              {/* Phone Line */}
              <div className="flex gap-4">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-srm-blue/10 dark:bg-srm-yellow/10 text-srm-blue dark:text-srm-yellow">
                  <Phone className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-slate-900 dark:text-slate-100">Direct Hotline Contact</h3>
                  <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">
                    +91 (44) 4392 3047 (Alumni Coordinator Desk)<br />
                    +91 (44) 4392 3048 (Support & Queries)
                  </p>
                </div>
              </div>
            </div>

            {/* Quick Note */}
            <div className="mt-8 border-t border-slate-100 dark:border-slate-800/60 pt-6">
              <div className="flex items-start gap-3 rounded-lg bg-srm-blue/5 dark:bg-srm-blue/20 p-4 border border-srm-blue/10">
                <AlertCircle className="h-5 w-5 text-srm-blue dark:text-srm-lightBlue shrink-0 mt-0.5" />
                <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                  Verification status requests take 2-3 working days. Updates require uploading copies of academic transcripts or alumni membership credentials.
                </p>
              </div>
            </div>
          </div>

          {/* Styled Campus Map Container */}
          <div className="rounded-2xl border border-slate-200/80 dark:border-slate-800/60 bg-white/60 dark:bg-slate-950/60 backdrop-blur-md p-4 shadow-sm overflow-hidden">
            <div className="relative h-64 w-full rounded-xl overflow-hidden bg-slate-100 dark:bg-slate-950">
              <iframe
                title="SRMIST Ramapuram Campus Map"
                src="https://maps.google.com/maps?q=SRM%20University%20Ramapuram%20Campus%20Chennai&t=&z=15&ie=UTF8&iwloc=&output=embed"
                width="100%"
                height="100%"
                className="border-0 filter grayscale dark:invert-[0.9] dark:opacity-85"
                allowFullScreen={false}
                loading="lazy"
              ></iframe>
            </div>
            <div className="mt-3 text-center">
              <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 dark:text-slate-400">
                <MapPin className="h-3.5 w-3.5 text-srm-red" />
                Official Geo Location: SRMIST Ramapuram, Chennai
              </span>
            </div>
          </div>

        </div>

        {/* Right Column - Profile Update & Contact Form */}
        <div className="lg:col-span-7">
          
          <div className="rounded-2xl border border-slate-200/80 dark:border-slate-800/60 bg-white/60 dark:bg-slate-950/60 backdrop-blur-md p-6 md:p-8 shadow-sm relative">
            
            {/* Form Success View */}
            {submitSuccess ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="py-8 text-center"
              >
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-400 mb-6">
                  <CheckCircle2 className="h-10 w-10" />
                </div>
                
                <h3 className="font-display text-2xl font-bold text-slate-900 dark:text-slate-50">
                  Update Request Received!
                </h3>
                
                <p className="mt-3 text-sm text-slate-600 dark:text-slate-400 max-w-md mx-auto">
                  Thank you for updating your profile, <strong className="text-slate-800 dark:text-slate-200">{formData.fullName}</strong>. The Alumni Office will review your verification file and notify you via email once approved.
                </p>

                <div className="mt-8 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 p-5 max-w-sm mx-auto">
                  <span className="block text-xs font-semibold text-slate-500 uppercase tracking-widest">
                    Verification Ticket ID
                  </span>
                  <span className="block mt-1 font-mono text-lg font-bold text-srm-blue dark:text-srm-yellow">
                    {ticketId}
                  </span>
                  <span className="block mt-2 text-[11px] text-slate-500 dark:text-slate-400">
                    Keep this ticket reference for verification follow-ups.
                  </span>
                </div>

                <div className="mt-8">
                  <button
                    onClick={handleReset}
                    className="inline-flex items-center gap-2 rounded-xl bg-srm-blue text-white hover:bg-srm-blue/90 px-6 py-2.5 text-sm font-semibold transition-all shadow-md active:scale-95 cursor-pointer"
                  >
                    Submit Another Profile Update
                  </button>
                </div>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                
                {/* Steps Navigator Header */}
                <div className="mb-8">
                  <div className="flex items-center justify-between text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-4">
                    <span>Progress Tracker</span>
                    <span className="text-srm-blue dark:text-srm-lightBlue">Step {step} of 3</span>
                  </div>
                  
                  {/* Progress Line */}
                  <div className="h-2 w-full rounded-full bg-slate-100 dark:bg-slate-950 overflow-hidden flex">
                    <div 
                      className="h-full bg-srm-red dark:bg-srm-yellow transition-all duration-300 ease-out" 
                      style={{ width: `${((step - 1) / 2) * 100}%` }}
                    />
                  </div>

                  {/* Icon Nav Steps */}
                  <div className="grid grid-cols-3 gap-2 mt-4 text-center">
                    <button
                      type="button"
                      onClick={() => step > 1 && setStep(1)}
                      disabled={isSubmitting}
                      className={`text-xs font-semibold pb-1 border-b-2 transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
                        step === 1 
                          ? "border-srm-red dark:border-srm-yellow text-slate-900 dark:text-slate-50 font-bold" 
                          : step > 1 
                            ? "border-emerald-500 text-emerald-600 dark:text-emerald-400" 
                            : "border-transparent text-slate-400"
                      }`}
                    >
                      <GraduationCap className="h-4 w-4" />
                      Academic
                    </button>
                    <button
                      type="button"
                      onClick={() => step > 2 && setStep(2)}
                      disabled={step < 2 || isSubmitting}
                      className={`text-xs font-semibold pb-1 border-b-2 transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
                        step === 2 
                          ? "border-srm-red dark:border-srm-yellow text-slate-900 dark:text-slate-50 font-bold" 
                          : step > 2 
                            ? "border-emerald-500 text-emerald-600 dark:text-emerald-400" 
                            : "border-transparent text-slate-400"
                      }`}
                    >
                      <Briefcase className="h-4 w-4" />
                      Corporate
                    </button>
                    <button
                      type="button"
                      disabled={step < 3 || isSubmitting}
                      className={`text-xs font-semibold pb-1 border-b-2 transition-all flex items-center justify-center gap-1.5 ${
                        step === 3 
                          ? "border-srm-red dark:border-srm-yellow text-slate-900 dark:text-slate-50 font-bold" 
                          : "border-transparent text-slate-400"
                      }`}
                    >
                      <CheckCircle2 className="h-4 w-4" />
                      Verify
                    </button>
                  </div>
                </div>

                {/* Form Steps Animation Container */}
                <div className="min-h-[280px]">
                  <AnimatePresence mode="wait">
                    
                    {/* STEP 1: Academic Data */}
                    {step === 1 && (
                      <motion.div
                        key="step-1"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        transition={{ duration: 0.2 }}
                        className="space-y-5"
                      >
                        <div>
                          <h3 className="text-lg font-bold text-slate-900 dark:text-slate-50 mb-1">Academic Profile Details</h3>
                          <p className="text-xs text-slate-500 dark:text-slate-400">Provide your official graduation details to confirm your college status.</p>
                        </div>

                        {/* Full Name */}
                        <div className="space-y-1.5">
                          <label htmlFor="fullName" className="text-xs font-bold text-slate-800 dark:text-slate-200 uppercase tracking-wider flex items-center gap-1">
                            <User className="h-3.5 w-3.5 text-srm-blue dark:text-srm-lightBlue" />
                            Full Name (as per SRM records)
                          </label>
                          <input
                            type="text"
                            id="fullName"
                            name="fullName"
                            value={formData.fullName}
                            onChange={handleInputChange}
                            placeholder="e.g. Adithya Varadhan"
                            className={`w-full rounded-xl bg-slate-50 dark:bg-slate-950/60 border ${
                              errors.fullName ? "border-rose-500 focus:ring-rose-500/30" : "border-slate-200 dark:border-slate-800 focus:ring-srm-blue/30 dark:focus:ring-srm-yellow/30"
                            } px-4 py-3 text-sm text-slate-900 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-500 outline-none focus:ring-4 transition-all`}
                          />
                          {errors.fullName && (
                            <p className="text-xs text-rose-500 font-semibold flex items-center gap-1">
                              <AlertCircle className="h-3 w-3" /> {errors.fullName}
                            </p>
                          )}
                        </div>

                        {/* Two Columns for Batch & Branch */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                          {/* Batch Year */}
                          <div className="space-y-1.5">
                            <label htmlFor="batch" className="text-xs font-bold text-slate-800 dark:text-slate-200 uppercase tracking-wider flex items-center gap-1">
                              <GraduationCap className="h-3.5 w-3.5 text-srm-blue dark:text-srm-lightBlue" />
                              Graduation Batch
                            </label>
                            <select
                              id="batch"
                              name="batch"
                              value={formData.batch}
                              onChange={handleInputChange}
                              className={`w-full rounded-xl bg-slate-50 dark:bg-slate-950/60 border ${
                                errors.batch ? "border-rose-500 focus:ring-rose-500/30" : "border-slate-200 dark:border-slate-800 focus:ring-srm-blue/30 dark:focus:ring-srm-yellow/30"
                              } px-4 py-3 text-sm text-slate-900 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-500 outline-none focus:ring-4 transition-all appearance-none`}
                            >
                              <option value="">Select Year</option>
                              {batchYears.map((year) => (
                                <option key={year} value={year}>{year}</option>
                              ))}
                            </select>
                            {errors.batch && (
                              <p className="text-xs text-rose-500 font-semibold flex items-center gap-1">
                                <AlertCircle className="h-3 w-3" /> {errors.batch}
                              </p>
                            )}
                          </div>

                          {/* Degree / Branch */}
                          <div className="space-y-1.5">
                            <label htmlFor="degree" className="text-xs font-bold text-slate-800 dark:text-slate-200 uppercase tracking-wider flex items-center gap-1">
                              <Building className="h-3.5 w-3.5 text-srm-blue dark:text-srm-lightBlue" />
                              Degree & Branch
                            </label>
                            <input
                              type="text"
                              id="degree"
                              name="degree"
                              value={formData.degree}
                              onChange={handleInputChange}
                              placeholder="e.g. B.Tech CSE"
                              className={`w-full rounded-xl bg-slate-50 dark:bg-slate-950/60 border ${
                                errors.degree ? "border-rose-500 focus:ring-rose-500/30" : "border-slate-200 dark:border-slate-800 focus:ring-srm-blue/30 dark:focus:ring-srm-yellow/30"
                              } px-4 py-3 text-sm text-slate-900 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-500 outline-none focus:ring-4 transition-all`}
                            />
                            {errors.degree && (
                              <p className="text-xs text-rose-500 font-semibold flex items-center gap-1">
                                <AlertCircle className="h-3 w-3" /> {errors.degree}
                              </p>
                            )}
                          </div>
                        </div>
                      </motion.div>
                    )}

                    {/* STEP 2: Corporate Profile */}
                    {step === 2 && (
                      <motion.div
                        key="step-2"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        transition={{ duration: 0.2 }}
                        className="space-y-5"
                      >
                        <div>
                          <h3 className="text-lg font-bold text-slate-900 dark:text-slate-50 mb-1">Corporate Details</h3>
                          <p className="text-xs text-slate-500 dark:text-slate-400">Update your current career standings to display matching salary milestones.</p>
                        </div>

                        {/* Employing Corporation */}
                        <div className="space-y-1.5">
                          <label htmlFor="company" className="text-xs font-bold text-slate-800 dark:text-slate-200 uppercase tracking-wider flex items-center gap-1">
                            <Building className="h-3.5 w-3.5 text-srm-blue dark:text-srm-lightBlue" />
                            Employing Company / Corporation
                          </label>
                          <input
                            type="text"
                            id="company"
                            name="company"
                            value={formData.company}
                            onChange={handleInputChange}
                            placeholder="e.g. Google India / Zoho"
                            className={`w-full rounded-xl bg-slate-50 dark:bg-slate-950/60 border ${
                              errors.company ? "border-rose-500 focus:ring-rose-500/30" : "border-slate-200 dark:border-slate-800 focus:ring-srm-blue/30 dark:focus:ring-srm-yellow/30"
                            } px-4 py-3 text-sm text-slate-900 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-500 outline-none focus:ring-4 transition-all`}
                          />
                          {errors.company && (
                            <p className="text-xs text-rose-500 font-semibold flex items-center gap-1">
                              <AlertCircle className="h-3 w-3" /> {errors.company}
                            </p>
                          )}
                        </div>

                        {/* Job Title & CTC */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                          {/* Job Title */}
                          <div className="space-y-1.5">
                            <label htmlFor="jobTitle" className="text-xs font-bold text-slate-800 dark:text-slate-200 uppercase tracking-wider flex items-center gap-1">
                              <Briefcase className="h-3.5 w-3.5 text-srm-blue dark:text-srm-lightBlue" />
                              Job Designation
                            </label>
                            <input
                              type="text"
                              id="jobTitle"
                              name="jobTitle"
                              value={formData.jobTitle}
                              onChange={handleInputChange}
                              placeholder="e.g. Senior Software Engineer"
                              className={`w-full rounded-xl bg-slate-50 dark:bg-slate-950/60 border ${
                                errors.jobTitle ? "border-rose-500 focus:ring-rose-500/30" : "border-slate-200 dark:border-slate-800 focus:ring-srm-blue/30 dark:focus:ring-srm-yellow/30"
                              } px-4 py-3 text-sm text-slate-900 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-500 outline-none focus:ring-4 transition-all`}
                            />
                            {errors.jobTitle && (
                              <p className="text-xs text-rose-500 font-semibold flex items-center gap-1">
                                <AlertCircle className="h-3 w-3" /> {errors.jobTitle}
                              </p>
                            )}
                          </div>

                          {/* CTC Package */}
                          <div className="space-y-1.5">
                            <label htmlFor="ctc" className="text-xs font-bold text-slate-800 dark:text-slate-200 uppercase tracking-wider flex items-center gap-1">
                              <DollarSign className="h-3.5 w-3.5 text-srm-blue dark:text-srm-lightBlue" />
                              Annual Package (CTC in LPA)
                            </label>
                            <input
                              type="text"
                              id="ctc"
                              name="ctc"
                              value={formData.ctc}
                              onChange={handleInputChange}
                              placeholder="e.g. 18.5"
                              className={`w-full rounded-xl bg-slate-50 dark:bg-slate-950/60 border ${
                                errors.ctc ? "border-rose-500 focus:ring-rose-500/30" : "border-slate-200 dark:border-slate-800 focus:ring-srm-blue/30 dark:focus:ring-srm-yellow/30"
                              } px-4 py-3 text-sm text-slate-900 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-500 outline-none focus:ring-4 transition-all`}
                            />
                            {errors.ctc && (
                              <p className="text-xs text-rose-500 font-semibold flex items-center gap-1">
                                <AlertCircle className="h-3 w-3" /> {errors.ctc}
                              </p>
                            )}
                          </div>
                        </div>
                      </motion.div>
                    )}

                    {/* STEP 3: Verification & File Uploader */}
                    {step === 3 && (
                      <motion.div
                        key="step-3"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        transition={{ duration: 0.2 }}
                        className="space-y-5"
                      >
                        <div>
                          <h3 className="text-lg font-bold text-slate-900 dark:text-slate-50 mb-1">Verify and Upload Credentials</h3>
                          <p className="text-xs text-slate-500 dark:text-slate-400">Provide a scanned copy of your Degree Certificate, Official Marksheet or Alumni ID Card.</p>
                        </div>

                        {/* Drag and Drop Box */}
                        <div
                          onDragOver={handleDragOver}
                          onDragLeave={handleDragLeave}
                          onDrop={handleDrop}
                          onClick={() => !file && !isUploading && fileInputRef.current?.click()}
                          className={`relative rounded-xl border-2 border-dashed p-8 text-center transition-all duration-200 ${
                            isDragging
                              ? "border-srm-yellow bg-srm-yellow/5 dark:bg-srm-yellow/10 scale-[1.01]"
                              : file
                                ? "border-emerald-500/50 bg-emerald-50/10 dark:bg-emerald-950/10"
                                : "border-slate-300 dark:border-slate-800 hover:border-srm-blue dark:hover:border-srm-yellow hover:bg-slate-50 dark:hover:bg-slate-950/20 cursor-pointer"
                          }`}
                        >
                          <input
                            type="file"
                            ref={fileInputRef}
                            onChange={handleFileSelect}
                            accept=".pdf, .png, .jpg, .jpeg"
                            className="hidden"
                            disabled={isUploading || !!file}
                          />

                          {/* Uploading progress overlay */}
                          {isUploading ? (
                            <div className="space-y-3 py-4">
                              <Loader2 className="h-10 w-10 text-srm-blue dark:text-srm-lightBlue animate-spin mx-auto" />
                              <span className="text-sm font-semibold text-slate-800 dark:text-slate-200 block">Uploading verification file...</span>
                              <div className="w-full max-w-xs bg-slate-200 dark:bg-slate-800 h-2 rounded-full mx-auto overflow-hidden">
                                <div className="bg-srm-blue dark:bg-srm-lightBlue h-full transition-all duration-150" style={{ width: `${uploadProgress}%` }} />
                              </div>
                              <span className="text-xs text-slate-500">{uploadProgress}% Complete</span>
                            </div>
                          ) : file ? (
                            /* File Received Visual */
                            <div className="space-y-4 py-2">
                              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-400">
                                <FileText className="h-7 w-7" />
                              </div>
                              <div>
                                <span className="text-sm font-bold text-slate-800 dark:text-slate-200 block truncate max-w-sm mx-auto">{file.name}</span>
                                <span className="text-xs text-slate-500 block mt-0.5">{(file.size / (1024 * 1024)).toFixed(2)} MB</span>
                              </div>
                              <button
                                type="button"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleRemoveFile();
                                }}
                                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-rose-200 dark:border-rose-900 bg-rose-50 dark:bg-rose-950/50 text-rose-600 dark:text-rose-400 text-xs font-semibold hover:bg-rose-100 dark:hover:bg-rose-900 transition-colors shadow-sm cursor-pointer"
                              >
                                <Trash2 className="h-3.5 w-3.5" />
                                Remove File
                              </button>
                            </div>
                          ) : (
                            /* Default Drag & Drop state */
                            <div className="space-y-4 py-4">
                              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-xl bg-slate-100 dark:bg-slate-900 text-slate-500 dark:text-slate-400 border border-slate-200 dark:border-slate-800">
                                <UploadCloud className="h-7 w-7 text-srm-blue dark:text-srm-lightBlue" />
                              </div>
                              <div>
                                <span className="text-sm font-bold text-slate-800 dark:text-slate-200 block">Drag & Drop verification document</span>
                                <span className="text-xs text-slate-500 block mt-1">or click to browse from folder</span>
                              </div>
                              <span className="inline-block px-3 py-1 rounded bg-slate-100 dark:bg-slate-950 text-[10px] font-bold text-slate-500 uppercase tracking-wide">
                                PDF, PNG or JPEG up to 5MB
                              </span>
                            </div>
                          )}
                        </div>

                        {errors.file && (
                          <p className="text-xs text-rose-500 font-semibold flex items-center gap-1 mt-1">
                            <AlertCircle className="h-3 w-3" /> {errors.file}
                          </p>
                        )}

                        {/* Review Confirmation details checklist */}
                        <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950/30 p-4 space-y-2.5">
                          <h4 className="text-xs font-extrabold text-slate-500 uppercase tracking-widest block">Summary Review</h4>
                          <div className="grid grid-cols-2 gap-y-2 gap-x-4 text-xs">
                            <div>
                              <span className="text-slate-500 block">Full Name:</span>
                              <strong className="text-slate-900 dark:text-slate-200">{formData.fullName || "—"}</strong>
                            </div>
                            <div>
                              <span className="text-slate-500 block">Academic Path:</span>
                              <strong className="text-slate-900 dark:text-slate-200">{formData.degree || "—"} ({formData.batch || "—"})</strong>
                            </div>
                            <div>
                              <span className="text-slate-500 block">Employment Status:</span>
                              <strong className="text-slate-900 dark:text-slate-200">{formData.company || "—"} ({formData.jobTitle || "—"})</strong>
                            </div>
                            <div>
                              <span className="text-slate-500 block">Reported Package:</span>
                              <strong className="text-srm-blue dark:text-srm-yellow font-bold">{formData.ctc ? `${formData.ctc} LPA` : "—"}</strong>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    )}

                  </AnimatePresence>
                </div>

                {/* Form Controls Footer */}
                <div className="flex justify-between items-center border-t border-slate-100 dark:border-slate-800/60 pt-6 mt-6">
                  {step > 1 ? (
                    <button
                      type="button"
                      onClick={handleBack}
                      disabled={isSubmitting || isUploading}
                      className="inline-flex items-center gap-1.5 rounded-xl border border-slate-200 dark:border-slate-800 hover:border-slate-400 px-5 py-2.5 text-sm font-semibold text-slate-800 dark:text-slate-200 transition-all shadow-sm active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
                    >
                      <ChevronLeft className="h-4 w-4" />
                      Back
                    </button>
                  ) : (
                    <div />
                  )}

                  {step < 3 ? (
                    <button
                      type="button"
                      onClick={handleNext}
                      className="inline-flex items-center gap-1.5 rounded-xl bg-[#004684] hover:bg-[#003c73] text-white px-6 py-2.5 text-sm font-semibold transition-all shadow-md active:scale-95 cursor-pointer ml-auto"
                    >
                      Next Step
                      <ChevronRight className="h-4 w-4" />
                    </button>
                  ) : (
                    <button
                      type="submit"
                      disabled={isSubmitting || isUploading || !file}
                      className="inline-flex items-center gap-2 rounded-xl bg-srm-red hover:bg-[#72180c] text-white px-7 py-3 text-sm font-bold transition-all shadow-md active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer ml-auto"
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 className="h-4 w-4 animate-spin" />
                          Submitting Updates...
                        </>
                      ) : (
                        <>
                          Submit Profile Update
                        </>
                      )}
                    </button>
                  )}
                </div>

              </form>
            )}

          </div>

        </div>

      </div>

    </div>
  );
}
