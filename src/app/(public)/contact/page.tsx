import { Mail, MapPin, Phone } from "lucide-react";

const heroImageUrl = "/hero/6.JPG"; 

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="relative min-h-[240px] flex items-center justify-center overflow-hidden">
        {/* Background Image with Overlay */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `url(${heroImageUrl})`,
          }}
        >
          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-[var(--primary)]/70 to-[var(--secondary)]/70" />
        </div>

        {/* Decorative Elements - Adjusted to use project colors */}
        <div className="absolute inset-0">
          <div className="absolute top-0 left-0 w-24 h-24 bg-[var(--accent)]/5 rounded-br-full" />
          <div className="absolute bottom-0 right-0 w-32 h-32 bg-[var(--secondary)]/5 rounded-tl-full" />
          <div className="absolute top-1/2 left-1/4 w-8 h-8 bg-[var(--primary)]/5 rounded-full transform -translate-y-1/2" />
          <div className="absolute top-1/3 right-1/3 w-12 h-12 bg-[var(--accent)]/5 rounded-full" />
        </div>

        {/* Content */}
        <div className="relative container mx-auto px-4 text-center z-10">
          <div className="max-w-3xl mx-auto">
            <h1 className="text-5xl font-bold mb-6 text-white">Contact Us</h1>
            <p className="text-xl text-white/90 font-medium">
              Get in touch with the Accountant General&apos;s Department. We&apos;re here
              to assist you with any inquiries or concerns you may have.
            </p>
            <div className="mt-8 flex justify-center gap-2">
              <div className="h-1 w-12 bg-[var(--accent)] rounded-full" />
              <div className="h-1 w-12 bg-[var(--secondary)] rounded-full" />
              <div className="h-1 w-12 bg-[var(--primary)] rounded-full" />
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-16">
        <div className="grid md:grid-cols-2 gap-12">
          {/* Contact Form */}
          <div className="bg-white rounded-xl shadow-xl p-8 relative overflow-hidden border border-gray-100">
            {/* Decorative Elements */}
            <div className="absolute top-0 right-0 w-24 h-24 bg-[var(--accent)]/5 rounded-bl-full" />
            <div className="absolute bottom-0 left-0 w-32 h-32 bg-[var(--primary)]/5 rounded-tr-full" />

            <div className="relative z-10">
              <h2 className="text-3xl font-bold text-[var(--primary)] mb-2">
                Send us a Message
              </h2>
              <div className="flex gap-2 mb-8">
                <div className="h-1.5 w-12 bg-[var(--accent)] rounded-full" />
                <div className="h-1.5 w-12 bg-[var(--secondary)] rounded-full" />
                <div className="h-1.5 w-12 bg-[var(--primary)] rounded-full" />
              </div>

              <form className="space-y-6">
                <div className="grid sm:grid-cols-2 gap-6">
                  <div className="space-y-1.5">
                    <label htmlFor="firstName" className="block text-sm font-semibold text-gray-700">
                      First Name
                    </label>
                    <input
                      type="text"
                      id="firstName"
                      name="firstName"
                      placeholder="Skanda"
                      className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:border-[var(--primary)] focus:ring-2 focus:ring-[var(--primary)]/20 transition-colors duration-200 outline-none"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label htmlFor="lastName" className="block text-sm font-semibold text-gray-700">
                      Last Name
                    </label>
                    <input
                      type="text"
                      id="lastName"
                      name="lastName"
                      placeholder="Kaunda"
                      className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:border-[var(--primary)] focus:ring-2 focus:ring-[var(--primary)]/20 transition-colors duration-200 outline-none"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label htmlFor="email" className="block text-sm font-semibold text-gray-700">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    placeholder="skandakaunda@gmail.com"
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:border-[var(--primary)] focus:ring-2 focus:ring-[var(--primary)]/20 transition-colors duration-200 outline-none"
                  />
                </div>

                <div className="space-y-1.5">
                  <label htmlFor="subject" className="block text-sm font-semibold text-gray-700">
                    Subject
                  </label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    placeholder="How can we help?"
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:border-[var(--primary)] focus:ring-2 focus:ring-[var(--primary)]/20 transition-colors duration-200 outline-none"
                  />
                </div>

                <div className="space-y-1.5">
                  <label htmlFor="message" className="block text-sm font-semibold text-gray-700">
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    placeholder="Your message..."
                    rows={5}
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:border-[var(--primary)] focus:ring-2 focus:ring-[var(--primary)]/20 resize-none transition-colors duration-200 outline-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-[var(--primary)] hover:bg-[var(--primary)]/90 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200 focus:ring-4 focus:ring-[var(--primary)]/30 focus:outline-none flex items-center justify-center gap-2"
                >
                  Send Message
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M14 5l7 7m0 0l-7 7m7-7H3"
                    />
                  </svg>
                </button>
              </form>
            </div>
          </div>

          {/* Contact Information */}
          <div className="space-y-8">
            {/* Map */}
            <div className="bg-white rounded-xl shadow-xl overflow-hidden border border-gray-100">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3741.1406887072217!2d33.78826591411573!3d-13.944794898221195!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x1921d356ab3e4239%3A0x3807e8048d647dc7!2sAccountant%20General&#39;s%20Department!5e1!3m2!1sen!2smw!4v1739352184091!5m2!1sen!2smw"
                width="100%"
                height="350" // Increased height for better proportion
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="rounded-t-xl"
              ></iframe>
            </div>

            {/* Contact Details */}
            <div className="bg-white rounded-xl shadow-xl p-8 relative overflow-hidden border border-gray-100">
              {/* Decorative Elements */}
              <div className="absolute top-0 right-0 w-24 h-24 bg-[var(--secondary)]/5 rounded-bl-full" />
              <div className="absolute bottom-0 left-0 w-32 h-32 bg-[var(--accent)]/5 rounded-tr-full" />

              <div className="relative z-10">
                <h2 className="text-3xl font-bold text-[var(--primary)] mb-2">
                  Contact Information
                </h2>
                <div className="flex gap-2 mb-8">
                  <div className="h-1.5 w-12 bg-[var(--accent)] rounded-full" />
                  <div className="h-1.5 w-12 bg-[var(--secondary)] rounded-full" />
                  <div className="h-1.5 w-12 bg-[var(--primary)] rounded-full" />
                </div>

                <div className="space-y-8">
                  {/* Address */}
                  <div className="flex items-start gap-4 group">
                    <div
                      className="w-12 h-12 rounded-lg bg-[var(--primary)]/10 flex items-center justify-center flex-shrink-0 group-hover:bg-[var(--primary)]/20 transition-colors duration-200"
                    >
                      <MapPin className="w-6 h-6 text-[var(--primary)] flex-shrink-0" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-800 text-lg mb-1">
                        Address
                      </h3>
                      <p className="text-gray-600 leading-relaxed">
                        Accountant General Department (AGD),
                        <br />
                        P.O. Box 30140,
                        <br />
                        Capital City,
                        <br />
                        Lilongwe 3,
                        <br />
                        Malawi.
                      </p>
                    </div>
                  </div>

                  {/* Phone and Email Grid for better alignment on smaller screens */}
                  <div className="grid sm:grid-cols-2 gap-x-8 gap-y-6">
                    {/* Phone */}
                    <div className="flex items-center gap-4 group">
                      <div
                        className="w-12 h-12 rounded-lg bg-[var(--secondary)]/10 flex items-center justify-center flex-shrink-0 group-hover:bg-[var(--secondary)]/20 transition-colors duration-200"
                      >
                        <Phone className="w-6 h-6 text-[var(--secondary)] flex-shrink-0" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-800 text-lg mb-1">
                          Phone
                        </h3>
                        <a
                          href="tel:+2651788533"
                          className="text-gray-600 hover:text-[var(--secondary)] transition-colors duration-200"
                        >
                          +265 1 788 533
                        </a>
                      </div>
                    </div>

                    {/* Email */}
                    <div className="flex items-center gap-4 group">
                      <div
                        className="w-12 h-12 rounded-lg bg-[var(--accent)]/10 flex items-center justify-center flex-shrink-0 group-hover:bg-[var(--accent)]/20 transition-colors duration-200"
                      >
                        <Mail className="w-6 h-6 text-[var(--accent)] flex-shrink-0" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-800 text-lg mb-1">
                          Email
                        </h3>
                        <a
                          href="mailto:ag@agd.gov.mw"
                          className="text-[var(--primary)] hover:text-[var(--primary)]/80 transition-colors duration-200"
                        >
                          ag@agd.gov.mw
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 