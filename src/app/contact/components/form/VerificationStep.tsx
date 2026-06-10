"use client";

import { m, useReducedMotion } from "framer-motion";
import { FileText, Trash2, UploadCloud, Loader2 } from "lucide-react";
import { DragEvent, ChangeEvent, RefObject } from "react";

interface VerificationStepProps {
  file: File | null;
  isUploading: boolean;
  isDragging: boolean;
  uploadProgress: number;
  formData: {
    fullName: string;
    degree: string;
    batch: string;
    company: string;
    ctc: string;
  };
  fileInputRef: RefObject<HTMLInputElement | null>;
  onDragOver: (e: DragEvent<HTMLButtonElement>) => void;
  onDragLeave: (e: DragEvent<HTMLButtonElement>) => void;
  onDrop: (e: DragEvent<HTMLButtonElement>) => void;
  onFileSelect: (e: ChangeEvent<HTMLInputElement>) => void;
  onRemoveFile: () => void;
}

export function VerificationStep({
  file,
  isUploading,
  isDragging,
  uploadProgress,
  formData,
  fileInputRef,
  onDragOver,
  onDragLeave,
  onDrop,
  onFileSelect,
  onRemoveFile,
}: VerificationStepProps) {
  const shouldReduceMotion = useReducedMotion();

  return (
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

      {file ? (
        <div
          className={`relative rounded-xl border-2 border-dashed p-8 text-center transition-all duration-200 border-emerald-500/50 bg-emerald-50/10`}
        >
          <div className="space-y-4 py-2">
            <FileText className="h-10 w-10 mx-auto text-emerald-600" />
            <span className="text-sm font-bold block">{file.name}</span>
            <button
              type="button"
              onClick={(e) => { e.stopPropagation(); onRemoveFile(); }}
              className="text-rose-600 text-xs font-semibold flex items-center gap-1 mx-auto cursor-pointer"
              aria-label="Remove uploaded file"
            >
              <Trash2 className="h-3.5 w-3.5" /> Remove
            </button>
          </div>
        </div>
      ) : (
        <button
          type="button"
          onDragOver={onDragOver}
          onDragLeave={onDragLeave}
          onDrop={onDrop}
          onClick={() => !isUploading && fileInputRef.current?.click()}
          aria-label="Upload verification document"
          className={`relative w-full rounded-xl border-2 border-dashed p-8 text-center transition-all duration-200 ${
            isDragging
              ? "border-srm-yellow bg-srm-yellow/5 scale-[1.01]"
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
            onChange={onFileSelect}
            accept=".pdf, .png, .jpg, .jpeg"
            className="hidden"
            disabled={isUploading}
          />

          {isUploading ? (
            <div className="space-y-3 py-4">
              <Loader2 className="h-10 w-10 text-srm-blue animate-spin mx-auto" />
              <span className="text-sm font-semibold">Uploading...</span>
              <div className="w-full max-w-xs bg-slate-200 h-2 rounded-full mx-auto overflow-hidden">
                <div className="bg-srm-blue h-full" style={{ width: `${uploadProgress}%` }} />
              </div>
            </div>
          ) : (
            <div className="space-y-4 py-4">
              <UploadCloud className="h-10 w-10 mx-auto text-srm-blue" />
              <span className="text-sm font-bold block">Drag & Drop or Click to Upload</span>
              <span className="text-[10px] uppercase font-bold text-slate-500">PDF, PNG, JPEG up to 5MB</span>
            </div>
          )}
        </button>
      )}

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
  );
}
