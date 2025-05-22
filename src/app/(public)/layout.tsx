import type { Metadata } from "next";
import Header from "@/components/public/shared/Header";
import Footer from "@/components/public/shared/Footer";
import Topbar from "@/components/public/shared/Topbar";

export const metadata: Metadata = {
  title: "Accountant General Department | Malawi",
  description: "Official website of the Accountant General Department of Malawi",
};

export default function PublicLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex min-h-screen flex-col">
      <Topbar />
      <Header />
      
      {/* Main content */}
      <main className="flex-1">{children}</main>
      
      <Footer />
    </div>
  );
}