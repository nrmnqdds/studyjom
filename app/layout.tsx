import QueryProvider from "@/contexts/query-provider";
import type { Metadata } from "next";
import { Bricolage_Grotesque } from "next/font/google";
import { Toaster } from "react-hot-toast";
import "./globals.css";

// const inter = Inter({ subsets: ['latin'] })
const bricolageGrotesk = Bricolage_Grotesque({
  subsets: ["latin"],
  weight: "700",
  display: "swap",
});

export const metadata: Metadata = {
  title: "StudyJom",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`scroll-smooth scrollbar-hide ${bricolageGrotesk.className}`}
      >
        <QueryProvider>
          {children}
          <Toaster reverseOrder={false} />
        </QueryProvider>
      </body>
    </html>
  );
}
