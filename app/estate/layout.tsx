import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import SideBar from "@/components/SideBar";


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
        <main className="flex w-full justify-between gap-6 bg-sky-50 min-h-screen">
          <section className=" bg-red-600 w-[17vw] h-fit">
            <SideBar/>
          </section>
          <section className="flex flex-col  w-[99vw]">
            <Navbar/>
            {children}
          </section>
        </main>
  );
}
