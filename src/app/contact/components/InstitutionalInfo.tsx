import { MapPin, Mail, Phone, AlertCircle } from "lucide-react";

export function InstitutionalInfo() {
  return (
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
  );
}
