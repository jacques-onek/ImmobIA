import type { Metadata } from "next";
import "./globals.css";
import { Toaster } from "sonner";
import { Inter, Manrope } from 'next/font/google'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter', 
})

const manrope = Manrope({
  subsets: ['latin'],
  variable: '--font-manrope', 
})
export const metadata: Metadata = {
  title: "ImmobIA",
  description: "A real state plateform for finding , selling, renting ",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.variable} ${manrope.variable} `}>
          
            {children}
        <Toaster />
      </body>
    </html>
  );
}
