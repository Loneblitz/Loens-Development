import type { Metadata } from "next";
import "./globals.css";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
export const metadata: Metadata = {
  title: "Lones Development | FiveM Assets",
  description: "Premium FiveM scripts, MLO interiors, and vehicle packs."
};
export default function RootLayout({ children }: Readonly<{children:React.ReactNode}>) {
  return <html lang="en"><body><Navbar />{children}<Footer /></body></html>;
}
