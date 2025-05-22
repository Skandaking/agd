import type { Metadata } from "next";

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
      {/* Header */}
      <header className="sticky top-0 z-10 border-b bg-background">
        <div className="container flex h-16 items-center justify-between">
          <div className="font-bold text-primary">AGD</div>
          <nav className="hidden md:flex gap-6">
            <a href="/home" className="hover:text-primary transition-colors">Home</a>
            <a href="/about" className="hover:text-primary transition-colors">About Us</a>
            <a href="/services" className="hover:text-primary transition-colors">Services</a>
            <a href="/divisions" className="hover:text-primary transition-colors">Divisions</a>
            <a href="/projects" className="hover:text-primary transition-colors">Projects</a>
            <a href="/media" className="hover:text-primary transition-colors">Media</a>
          </nav>
          <div>
            <a 
              href="/dashboard" 
              className="rounded-md px-4 py-2 bg-primary text-white hover:opacity-90"
            >
              Admin
            </a>
          </div>
        </div>
      </header>
      
      {/* Main content */}
      <main className="flex-1">{children}</main>
      
      {/* Footer */}
      <footer className="bg-accent text-white py-8">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-lg font-bold mb-4">Contact Us</h3>
              <p>Capital Hill, Lilongwe</p>
              <p>Malawi</p>
              <p>Email: info@agd.gov.mw</p>
            </div>
            <div>
              <h3 className="text-lg font-bold mb-4">Quick Links</h3>
              <ul className="space-y-2">
                <li><a href="/about" className="hover:underline">About Us</a></li>
                <li><a href="/services" className="hover:underline">Services</a></li>
                <li><a href="/media" className="hover:underline">Media</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-bold mb-4">Follow Us</h3>
              <div className="flex gap-4">
                <a href="#" className="hover:opacity-80">FB</a>
                <a href="#" className="hover:opacity-80">TW</a>
                <a href="#" className="hover:opacity-80">IG</a>
              </div>
            </div>
          </div>
          <div className="mt-8 pt-4 border-t border-white/20 text-center">
            <p>© {new Date().getFullYear()} Accountant General Department. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}