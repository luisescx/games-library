import "@/styles/globals.css";

import type { Metadata } from "next";
import { Inter } from "next/font/google";
import clsx from "clsx";
import { cookies } from "next/headers";

import { TRPCReactProvider } from "@/trpc/react";
import { NavBar } from "./_components/nav-bar";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={clsx(
        "m-0 box-border h-full scroll-smooth bg-white p-0 antialiased",
        inter.className,
      )}
    >
      <body className="m-0 box-border flex h-full flex-col bg-slate-800 p-0">
        <TRPCReactProvider cookies={cookies().toString()}>
          <NavBar />
          {children}
        </TRPCReactProvider>
      </body>
    </html>
  );
}
