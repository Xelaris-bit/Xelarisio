import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { Toaster } from "@/components/ui/toaster";
import BackToTopButton from "@/components/layout/back-to-top-button";
import ScrollProgressBar from "@/components/layout/scroll-progress-bar";

const inter = Inter({ subsets: ["latin"], variable: "--font-body" });

export const metadata: Metadata = {
  title: "Xelaris - Digital Solutions for Excellence",
  description:
    "Your partner in innovation. We deliver cutting-edge solutions in Software, eLearning, 3D & Multimedia, Digital Marketing, and Data Analysis.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="!scroll-smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className={cn("font-body antialiased relative", inter.variable)}>
        <ScrollProgressBar />
        {children}
        <Toaster />
        <BackToTopButton />
      </body>
    </html>
  );
}
