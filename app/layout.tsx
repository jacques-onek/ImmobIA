import type { Metadata } from "next";
import "./globals.css";



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
        className={`antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
