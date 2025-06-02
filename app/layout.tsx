import { cn } from "@/lib/utils";
import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Toaster } from "@/components/ui/sonner";
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Roster Portfolio Uploader",
  description: "Showcase creative work with structured data from portfolios.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={cn(inter.className, "bg-gray-50 text-gray-900 min-h-screen")}
      >
        {children}
        <Toaster />
      </body>
    </html>
  );
}
