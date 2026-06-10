"use client";

import { useReducer, useRef, DragEvent, ChangeEvent, FormEvent } from "react";
import { AnimatePresence } from "framer-motion";
import { Loader2, ChevronLeft, ChevronRight } from "lucide-react";
import { SuccessView } from "./form/SuccessView";
import { FormStepper } from "./form/FormStepper";
import { AcademicStep } from "./form/AcademicStep";
import { CorporateStep } from "./form/CorporateStep";
import { VerificationStep } from "./form/VerificationStep";

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

  const handleDragOver = (e: DragEvent<HTMLButtonElement>) => {
    e.preventDefault();
    dispatch({ type: "SET_DRAGGING", isDragging: true });
  };

  const handleDragLeave = (e: DragEvent<HTMLButtonElement>) => {
    e.preventDefault();
    dispatch({ type: "SET_DRAGGING", isDragging: false });
  };

  const handleDrop = (e: DragEvent<HTMLButtonElement>) => {
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
      <SuccessView
        fullName={formData.fullName}
        ticketId={ticketId}
        onReset={handleReset}
      />
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <FormStepper
        step={step}
        isSubmitting={isSubmitting}
        onStepClick={(s) => dispatch({ type: "SET_STEP", step: s })}
      />

      <div className="min-h-[280px]">
        <AnimatePresence mode="wait">
          {step === 1 && (
            <AcademicStep
              formData={formData}
              errors={errors}
              onInputChange={handleInputChange}
            />
          )}

          {step === 2 && (
            <CorporateStep
              formData={formData}
              onInputChange={handleInputChange}
            />
          )}

          {step === 3 && (
            <VerificationStep
              file={file}
              isUploading={isUploading}
              isDragging={isDragging}
              uploadProgress={uploadProgress}
              formData={formData}
              fileInputRef={fileInputRef}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
              onFileSelect={handleFileSelect}
              onRemoveFile={handleRemoveFile}
            />
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
