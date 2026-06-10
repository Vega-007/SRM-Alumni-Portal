import type { Metadata } from "next";
import { IBM_Plex_Sans } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const ibmPlexSans = IBM_Plex_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-ibm-plex-sans",
});

export const metadata: Metadata = {
  title: "SRMIST Ramapuram Alumni Portal",
  description: "Connect, explore, and grow with the global network of SRMIST Ramapuram alumni.",
  keywords: ["SRMIST", "SRM Ramapuram", "Alumni Portal", "Alumni Directory", "SRM Alumni"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`h-full antialiased dark ${ibmPlexSans.variable}`}
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col bg-background text-slate-800 dark:text-slate-200 font-sans selection:bg-srm-yellow/20 selection:text-srm-yellow">
        <Script id="theme-script" strategy="beforeInteractive">
          {`
            (function() {
              try {
                const savedTheme = localStorage.getItem('theme');
                if (savedTheme === 'light') {
                  document.documentElement.classList.remove('dark');
                } else {
                  document.documentElement.classList.add('dark');
                }
              } catch (e) {}
            })();
          `}
        </Script>
        <Navbar />
        <main className="flex-1 flex flex-col">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
