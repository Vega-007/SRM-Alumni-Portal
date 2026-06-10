"use client";

import { useReducer, useRef, DragEvent, ChangeEvent, FormEvent } from "react";
import { m, AnimatePresence, useReducedMotion } from "framer-motion";
import {
  GraduationCap,
  Briefcase,
  User,
  Building,
  DollarSign,
  UploadCloud,
  FileText,
  Trash2,
  Loader2,
  CheckCircle2,
  ChevronLeft,
  ChevronRight
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

type State = {
  step: number;
  formData: FormData;
  errors: FormErrors;
  file: File | null;
  isDragging: boolean;
  uploadProgress: number;
  isUploading: boolean;
  isSubmitting: boolean;
  submitSuccess: boolean;
  ticketId: string;
};

type Action =
  | { type: "SET_STEP"; step: number }
  | { type: "UPDATE_FORM"; name: keyof FormData; value: string }
  | { type: "SET_ERRORS"; errors: FormErrors }
  | { type: "SET_FILE"; file: File | null }
  | { type: "SET_DRAGGING"; isDragging: boolean }
  | { type: "SET_UPLOAD_PROGRESS"; progress: number }
  | { type: "SET_UPLOADING"; isUploading: boolean }
  | { type: "SET_SUBMITTING"; isSubmitting: boolean }
  | { type: "SET_SUBMIT_SUCCESS"; success: boolean; ticketId?: string }
  | { type: "RESET_FORM" };

const initialState: State = {
  step: 1,
  formData: {
    fullName: "",
    batch: "",
    degree: "",
    company: "",
    jobTitle: "",
    ctc: "",
  },
  errors: {},
  file: null,
  isDragging: false,
  uploadProgress: 0,
  isUploading: false,
  isSubmitting: false,
  submitSuccess: false,
  ticketId: "",
};

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case "SET_STEP":
      return { ...state, step: action.step };
    case "UPDATE_FORM":
      return {
        ...state,
        formData: { ...state.formData, [action.name]: action.value },
        errors: { ...state.errors, [action.name]: "" },
      };
    case "SET_ERRORS":
      return { ...state, errors: action.errors };
    case "SET_FILE":
      return { ...state, file: action.file, errors: { ...state.errors, file: "" } };
    case "SET_DRAGGING":
      return { ...state, isDragging: action.isDragging };
    case "SET_UPLOAD_PROGRESS":
      return { ...state, uploadProgress: action.progress };
    case "SET_UPLOADING":
      return { ...state, isUploading: action.isUploading };
    case "SET_SUBMITTING":
      return { ...state, isSubmitting: action.isSubmitting };
    case "SET_SUBMIT_SUCCESS":
      return {
        ...state,
        submitSuccess: action.success,
        ticketId: action.ticketId || "",
      };
    case "RESET_FORM":
      return initialState;
    default:
      return state;
  }
}

export function ProfileUpdateForm() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const shouldReduceMotion = useReducedMotion();

  const {
    step,
    formData,
    errors,
    file,
    isDragging,
    uploadProgress,
    isUploading,
    isSubmitting,
    submitSuccess,
    ticketId,
  } = state;

  const currentYear = new Date().getFullYear();
  const batchYears = Array.from({ length: currentYear - 1999 }, (_, i) => String(currentYear - i));

  const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    dispatch({ type: "UPDATE_FORM", name: name as keyof FormData, value });
  };

  const validateStep = (currentStep: number): boolean => {
    const newErrors: FormErrors = {};
    if (currentStep === 1) {
      if (!formData.fullName.trim()) newErrors.fullName = "Full name is required.";
      else if (formData.fullName.trim().length < 3) newErrors.fullName = "Name must be at least 3 characters.";
      if (!formData.batch) newErrors.batch = "Graduation batch year is required.";
      if (!formData.degree.trim()) newErrors.degree = "Degree / Branch is required.";
    } else if (currentStep === 2) {
      if (!formData.company.trim()) newErrors.company = "Company / Corporation name is required.";
      if (!formData.jobTitle.trim()) newErrors.jobTitle = "Job title is required.";
      if (!formData.ctc.trim()) newErrors.ctc = "CTC package value is required.";
      else if (isNaN(Number(formData.ctc)) || Number(formData.ctc) <= 0) {
        newErrors.ctc = "Please enter a valid numeric CTC package.";
      }
    } else if (currentStep === 3) {
      if (!file) newErrors.file = "Please upload a verification document.";
    }
    dispatch({ type: "SET_ERRORS", errors: newErrors });
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateStep(step)) dispatch({ type: "SET_STEP", step: step + 1 });
  };

  const handleBack = () => {
    dispatch({ type: "SET_STEP", step: step - 1 });
  };

  const simulateProgress = (uploadedFile: File) => {
    dispatch({ type: "SET_UPLOADING", isUploading: true });
    dispatch({ type: "SET_UPLOAD_PROGRESS", progress: 0 });
    let progress = 0;
    const interval = setInterval(() => {
      progress += 10;
      dispatch({ type: "SET_UPLOAD_PROGRESS", progress });
      if (progress >= 100) {
        clearInterval(interval);
        dispatch({ type: "SET_UPLOADING", isUploading: false });
        dispatch({ type: "SET_FILE", file: uploadedFile });
      }
    }, 150);
  };

  const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    dispatch({ type: "SET_DRAGGING", isDragging: true });
  };

  const handleDragLeave = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    dispatch({ type: "SET_DRAGGING", isDragging: false });
  };

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    dispatch({ type: "SET_DRAGGING", isDragging: false });
    if (e.dataTransfer.files?.[0]) {
      const droppedFile = e.dataTransfer.files[0];
      const validTypes = ["image/jpeg", "image/png", "application/pdf"];
      if (!validTypes.includes(droppedFile.type)) {
        dispatch({ type: "SET_ERRORS", errors: { ...errors, file: "Invalid file format. Upload PDF, PNG, or JPEG." } });
        return;
      }
      if (droppedFile.size > 5 * 1024 * 1024) {
        dispatch({ type: "SET_ERRORS", errors: { ...errors, file: "File exceeds 5MB limit." } });
        return;
      }
      simulateProgress(droppedFile);
    }
  };

  const handleFileSelect = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) simulateProgress(e.target.files[0]);
  };

  const handleRemoveFile = () => {
    dispatch({ type: "SET_FILE", file: null });
    dispatch({ type: "SET_UPLOAD_PROGRESS", progress: 0 });
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!validateStep(3)) return;
    dispatch({ type: "SET_SUBMITTING", isSubmitting: true });
    setTimeout(() => {
      const ticketId = `SRM-ALUM-${Math.floor(100000 + Math.random() * 900000)}`;
      dispatch({ type: "SET_SUBMITTING", isSubmitting: false });
      dispatch({ type: "SET_SUBMIT_SUCCESS", success: true, ticketId });
    }, 2000);
  };

  const handleReset = () => dispatch({ type: "RESET_FORM" });

  if (submitSuccess) {
    return (
      <m.div
        initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, scale: 0.95 }}
        animate={shouldReduceMotion ? { opacity: 1 } : { opacity: 1, scale: 1 }}
        className="py-8 text-center"
      >
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-400 mb-6">
          <CheckCircle2 className="h-10 w-10" />
        </div>
        <h3 className="font-display text-2xl font-bold text-slate-900 dark:text-slate-50">Update Request Received!</h3>
        <p className="mt-3 text-sm text-slate-600 dark:text-slate-400 max-w-md mx-auto">
          Thank you for updating your profile, <strong className="text-slate-800 dark:text-slate-200">{formData.fullName}</strong>.
        </p>
        <div className="mt-8 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 p-5 max-w-sm mx-auto">
          <span className="block text-xs font-semibold text-slate-500 uppercase tracking-widest">Verification Ticket ID</span>
          <span className="block mt-1 font-mono text-lg font-bold text-srm-blue dark:text-srm-yellow">{ticketId}</span>
        </div>
        <div className="mt-8">
          <button
            type="button"
            onClick={handleReset}
            className="inline-flex items-center gap-2 rounded-xl bg-srm-blue text-white hover:bg-srm-blue/90 px-6 py-2.5 text-sm font-semibold transition-all shadow-md active:scale-95 cursor-pointer"
          >
            Submit Another Profile Update
          </button>
        </div>
      </m.div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Steps Navigator */}
      <div className="mb-8">
        <div className="flex items-center justify-between text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-4">
          <span>Progress Tracker</span>
          <span className="text-srm-blue dark:text-srm-lightBlue">Step {step} of 3</span>
        </div>
        <div className="h-2 w-full rounded-full bg-slate-100 dark:bg-slate-950 overflow-hidden flex">
          <div
            className="h-full bg-srm-red dark:bg-srm-yellow transition-all duration-300 ease-out"
            style={{ width: `${((step - 1) / 2) * 100}%` }}
          />
        </div>
        <div className="grid grid-cols-3 gap-2 mt-4 text-center">
          {[
            { id: 1, label: "Academic", icon: GraduationCap },
            { id: 2, label: "Corporate", icon: Briefcase },
            { id: 3, label: "Verify", icon: CheckCircle2 },
          ].map((s) => (
            <button
              key={s.id}
              type="button"
              onClick={() => s.id < step && dispatch({ type: "SET_STEP", step: s.id })}
              disabled={s.id > step || isSubmitting}
              className={`text-xs font-semibold pb-1 border-b-2 transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
                step === s.id
                  ? "border-srm-red dark:border-srm-yellow text-slate-900 dark:text-slate-50 font-bold"
                  : step > s.id
                  ? "border-emerald-500 text-emerald-600 dark:text-emerald-400"
                  : "border-transparent text-slate-400"
              }`}
            >
              <s.icon className="h-4 w-4" />
              {s.label}
            </button>
          ))}
        </div>
      </div>

      <div className="min-h-[280px]">
        <AnimatePresence mode="wait">
          {step === 1 && (
            <m.div
              key="step-1"
              initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, x: -20 }}
              transition={{ duration: 0.2 }}
              className="space-y-5"
            >
              <div>
                <h3 className="text-lg font-bold text-slate-900 dark:text-slate-50 mb-1">Academic Profile Details</h3>
                <p className="text-xs text-slate-500 dark:text-slate-400">Official graduation details.</p>
              </div>
              <div className="space-y-1.5">
                <label htmlFor="fullName" className="text-xs font-bold text-slate-800 dark:text-slate-200 uppercase tracking-wider flex items-center gap-1">
                  <User className="h-3.5 w-3.5 text-srm-blue dark:text-srm-lightBlue" />
                  Full Name
                </label>
                <input
                  type="text"
                  id="fullName"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleInputChange}
                  placeholder="e.g. Adithya Varadhan"
                  className={`w-full rounded-xl bg-slate-50 dark:bg-slate-950/60 border ${
                    errors.fullName ? "border-rose-500" : "border-slate-200 dark:border-slate-800"
                  } px-4 py-3 text-sm outline-none focus:ring-4 transition-all`}
                />
                {errors.fullName && <p className="text-xs text-rose-500 font-semibold">{errors.fullName}</p>}
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div className="space-y-1.5">
                  <label htmlFor="batch" className="text-xs font-bold text-slate-800 dark:text-slate-200 uppercase tracking-wider flex items-center gap-1">
                    <GraduationCap className="h-3.5 w-3.5 text-srm-blue dark:text-srm-lightBlue" />
                    Batch
                  </label>
                  <select
                    id="batch"
                    name="batch"
                    value={formData.batch}
                    onChange={handleInputChange}
                    className="w-full rounded-xl bg-slate-50 dark:bg-slate-950/60 border border-slate-200 dark:border-slate-800 px-4 py-3 text-sm outline-none"
                  >
                    <option value="">Select Year</option>
                    {batchYears.map((y) => <option key={y} value={y}>{y}</option>)}
                  </select>
                </div>
                <div className="space-y-1.5">
                  <label htmlFor="degree" className="text-xs font-bold text-slate-800 dark:text-slate-200 uppercase tracking-wider flex items-center gap-1">
                    <Building className="h-3.5 w-3.5 text-srm-blue dark:text-srm-lightBlue" />
                    Degree
                  </label>
                  <input
                    type="text"
                    id="degree"
                    name="degree"
                    value={formData.degree}
                    onChange={handleInputChange}
                    placeholder="e.g. B.Tech CSE"
                    className="w-full rounded-xl bg-slate-50 dark:bg-slate-950/60 border border-slate-200 dark:border-slate-800 px-4 py-3 text-sm outline-none"
                  />
                </div>
              </div>
            </m.div>
          )}

          {step === 2 && (
            <m.div
              key="step-2"
              initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, x: -20 }}
              transition={{ duration: 0.2 }}
              className="space-y-5"
            >
              <div>
                <h3 className="text-lg font-bold text-slate-900 dark:text-slate-50 mb-1">Corporate Details</h3>
                <p className="text-xs text-slate-500 dark:text-slate-400">Current career standings.</p>
              </div>
              <div className="space-y-1.5">
                <label htmlFor="company" className="text-xs font-bold text-slate-800 dark:text-slate-200 uppercase tracking-wider flex items-center gap-1">
                  <Building className="h-3.5 w-3.5 text-srm-blue dark:text-srm-lightBlue" />
                  Company
                </label>
                <input
                  type="text"
                  id="company"
                  name="company"
                  value={formData.company}
                  onChange={handleInputChange}
                  placeholder="e.g. Google India"
                  className="w-full rounded-xl bg-slate-50 dark:bg-slate-950/60 border border-slate-200 dark:border-slate-800 px-4 py-3 text-sm outline-none"
                />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div className="space-y-1.5">
                  <label htmlFor="jobTitle" className="text-xs font-bold text-slate-800 dark:text-slate-200 uppercase tracking-wider flex items-center gap-1">
                    <Briefcase className="h-3.5 w-3.5 text-srm-blue dark:text-srm-lightBlue" />
                    Job Title
                  </label>
                  <input
                    type="text"
                    id="jobTitle"
                    name="jobTitle"
                    value={formData.jobTitle}
                    onChange={handleInputChange}
                    placeholder="e.g. Software Engineer"
                    className="w-full rounded-xl bg-slate-50 dark:bg-slate-950/60 border border-slate-200 dark:border-slate-800 px-4 py-3 text-sm outline-none"
                  />
                </div>
                <div className="space-y-1.5">
                  <label htmlFor="ctc" className="text-xs font-bold text-slate-800 dark:text-slate-200 uppercase tracking-wider flex items-center gap-1">
                    <DollarSign className="h-3.5 w-3.5 text-srm-blue dark:text-srm-lightBlue" />
                    CTC (LPA)
                  </label>
                  <input
                    type="text"
                    id="ctc"
                    name="ctc"
                    value={formData.ctc}
                    onChange={handleInputChange}
                    placeholder="e.g. 18.5"
                    className="w-full rounded-xl bg-slate-50 dark:bg-slate-950/60 border border-slate-200 dark:border-slate-800 px-4 py-3 text-sm outline-none"
                  />
                </div>
              </div>
            </m.div>
          )}

          {step === 3 && (
            <m.div
              key="step-3"
              initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, x: -20 }}
              transition={{ duration: 0.2 }}
              className="space-y-5"
            >
              <div>
                <h3 className="text-lg font-bold text-slate-900 dark:text-slate-50 mb-1">Verify and Upload</h3>
                <p className="text-xs text-slate-500 dark:text-slate-400">Scanned copy of Degree/Marksheet.</p>
              </div>

              <div
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                onClick={() => !file && !isUploading && fileInputRef.current?.click()}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    if (!file && !isUploading) fileInputRef.current?.click();
                  }
                }}
                role="button"
                tabIndex={0}
                aria-label="Upload verification document"
                className={`relative rounded-xl border-2 border-dashed p-8 text-center transition-all duration-200 ${
                  isDragging
                    ? "border-srm-yellow bg-srm-yellow/5 scale-[1.01]"
                    : file
                    ? "border-emerald-500/50 bg-emerald-50/10"
                    : "border-slate-300 dark:border-slate-800 hover:border-srm-blue cursor-pointer"
                }`}
              >
                <label htmlFor="file-upload" className="sr-only">
                  Upload verification document
                </label>
                <input
                  type="file"
                  id="file-upload"
                  ref={fileInputRef}
                  onChange={handleFileSelect}
                  accept=".pdf, .png, .jpg, .jpeg"
                  className="hidden"
                  disabled={isUploading || !!file}
                />

                {isUploading ? (
                  <div className="space-y-3 py-4">
                    <Loader2 className="h-10 w-10 text-srm-blue animate-spin mx-auto" />
                    <span className="text-sm font-semibold">Uploading...</span>
                    <div className="w-full max-w-xs bg-slate-200 h-2 rounded-full mx-auto overflow-hidden">
                      <div className="bg-srm-blue h-full" style={{ width: `${uploadProgress}%` }} />
                    </div>
                  </div>
                ) : file ? (
                  <div className="space-y-4 py-2">
                    <FileText className="h-10 w-10 mx-auto text-emerald-600" />
                    <span className="text-sm font-bold block">{file.name}</span>
                    <button
                      type="button"
                      onClick={(e) => { e.stopPropagation(); handleRemoveFile(); }}
                      className="text-rose-600 text-xs font-semibold flex items-center gap-1 mx-auto"
                      aria-label="Remove uploaded file"
                    >
                      <Trash2 className="h-3.5 w-3.5" /> Remove
                    </button>
                  </div>
                ) : (
                  <div className="space-y-4 py-4">
                    <UploadCloud className="h-10 w-10 mx-auto text-srm-blue" />
                    <span className="text-sm font-bold block">Drag & Drop or Click to Upload</span>
                    <span className="text-[10px] uppercase font-bold text-slate-500">PDF, PNG, JPEG up to 5MB</span>
                  </div>
                )}
              </div>
              {errors.file && <p className="text-xs text-rose-500 font-semibold">{errors.file}</p>}

              <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950/30 p-4">
                <h4 className="text-xs font-extrabold text-slate-500 uppercase tracking-widest mb-2">Summary</h4>
                <div className="grid grid-cols-2 gap-2 text-xs">
                   <div><span className="text-slate-500">Name:</span> <strong>{formData.fullName || "—"}</strong></div>
                   <div><span className="text-slate-500">Degree:</span> <strong>{formData.degree || "—"} ({formData.batch || "—"})</strong></div>
                   <div><span className="text-slate-500">Company:</span> <strong>{formData.company || "—"}</strong></div>
                   <div><span className="text-slate-500">CTC:</span> <strong>{formData.ctc ? `${formData.ctc} LPA` : "—"}</strong></div>
                </div>
              </div>
            </m.div>
          )}
        </AnimatePresence>
      </div>

      <div className="flex justify-between items-center pt-6 border-t border-slate-100 dark:border-slate-800/60 mt-6">
        {step > 1 ? (
          <button
            type="button"
            onClick={handleBack}
            disabled={isSubmitting || isUploading}
            className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-xl border border-slate-200 text-sm font-semibold disabled:opacity-50"
          >
            <ChevronLeft className="h-4 w-4" /> Back
          </button>
        ) : <div />}

        {step < 3 ? (
          <button
            type="button"
            onClick={handleNext}
            className="bg-srm-blue text-white px-6 py-2.5 rounded-xl text-sm font-semibold"
          >
            Next Step <ChevronRight className="h-4 w-4" />
          </button>
        ) : (
          <button
            type="submit"
            disabled={isSubmitting || isUploading || !file}
            className="bg-srm-red text-white px-7 py-3 rounded-xl text-sm font-bold disabled:opacity-50"
          >
            {isSubmitting ? (
              <span className="flex items-center gap-2">
                <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
                Submitting...
              </span>
            ) : "Submit Profile Update"}
          </button>
        )}
      </div>
    </form>
  );
}
