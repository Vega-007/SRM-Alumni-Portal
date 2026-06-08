"use client";

import React, { Component, ErrorInfo, ReactNode } from "react";
import { AlertTriangle } from "lucide-react";

interface Props {
  children?: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("ErrorBoundary caught an error:", error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }
      return (
        <div className="flex flex-col items-center justify-center p-6 rounded-2xl border border-rose-200 dark:border-rose-900 bg-rose-50/50 dark:bg-rose-950/20 text-center space-y-3 w-full h-full min-h-[300px]">
          <AlertTriangle className="h-8 w-8 text-rose-500 shrink-0" />
          <h3 className="text-sm font-bold text-slate-800 dark:text-slate-200">Map Rendering Failed</h3>
          <p className="text-xs text-slate-500 dark:text-slate-400 max-w-xs">
            There was an error loading the interactive map element.
          </p>
        </div>
      );
    }

    return this.props.children;
  }
}
