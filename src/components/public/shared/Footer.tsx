import Link from 'next/link';

export default function Footer() {
  const currentYear = new Date().getFullYear();
  
  const quickLinks = [
    { name: 'About Us', href: '/about' },
    { name: 'Services', href: '/services' },
    { name: 'Divisions', href: '/divisions' },
    { name: 'Projects', href: '/projects' },
    { name: 'Media', href: '/media' },
  ];
  
  const socialLinks = [
    { name: 'Facebook', icon: 'FB', href: '#' },
    { name: 'Twitter', icon: 'TW', href: '#' },
    { name: 'Instagram', icon: 'IG', href: '#' },
  ];

  return (
    <footer className="bg-accent text-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Contact Information */}
          <div>
            <h3 className="text-lg font-bold mb-4">Contact Us</h3>
            <address className="not-italic">
              <p className="mb-2">Accountant General Department</p>
              <p className="mb-2">Capital Hill, Lilongwe</p>
              <p className="mb-2">Malawi</p>
              <p className="mb-2">
                <span className="font-medium">Email:</span>{' '}
                <a href="mailto:info@agd.gov.mw" className="hover:underline">
                  info@agd.gov.mw
                </a>
              </p>
              <p>
                <span className="font-medium">Phone:</span> +265 xxx xxxx
              </p>
            </address>
          </div>
          
          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-bold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <Link href={link.href} className="hover:underline">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          
          {/* Social Media & Newsletter */}
          <div>
            <h3 className="text-lg font-bold mb-4">Connect With Us</h3>
            <div className="flex gap-4 mb-6">
              {socialLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  aria-label={link.name}
                  className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors"
                >
                  {link.icon}
                </a>
              ))}
            </div>
            
            <h3 className="text-lg font-bold mb-4">Subscribe to Updates</h3>
            <form className="flex flex-col sm:flex-row gap-2">
              <input
                type="email"
                placeholder="Your email address"
                className="px-4 py-2 rounded-md bg-white/10 text-white placeholder:text-white/60 focus:outline-none focus:ring-2 focus:ring-white/30"
                required
              />
              <button
                type="submit"
                className="px-4 py-2 bg-primary text-white rounded-md hover:bg-primary/90 transition-colors"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>
        
        {/* Copyright */}
        <div className="mt-12 pt-6 border-t border-white/20 text-center">
          <p>© {currentYear} Accountant General Department, Government of Malawi. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
} 