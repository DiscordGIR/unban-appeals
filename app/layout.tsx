import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Header from "@/components/header";
import { Toaster } from "@/components/ui/toaster";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "r/Jailbreak Unban Appeals",
  description:
    "This form is to be filled out if you were banned from the r/Jailbreak discord server and you are looking to get unbanned. It is not recommended to appeal within 3 months of your ban. Also, you cannot fill this out on behalf of someone else.",
};

export default function RootLayout({ children }: React.PropsWithChildren) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="flex flex-col justify-between w-full h-full min-h-screen">
          <Header />
          <main className="flex-auto w-full max-w-3xl px-4 py-4 mx-auto sm:px-6 md:py-6">
            {children}
          </main>
          <Toaster />
        </div>
      </body>
    </html>
  );
}
