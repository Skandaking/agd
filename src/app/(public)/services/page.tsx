import { 
  Heart, 
  MessageSquare, 
  Scale, 
  Eye, 
  TrendingUp,
  Settings,
  CheckCircle,
  Users,
  Target
} from "lucide-react";

const heroImageUrl = "/hero/6.JPG";

export default function ServicesPage() {
  const serviceCharter = [
    {
      title: "RESPECT",
      description: "We will treat you with courtesy and respect at every stage of the process and we expect you to treat our staff in the same way.",
      icon: Heart,
      color: "text-red-600",
      bgColor: "bg-red-50",
      borderColor: "border-red-200"
    },
    {
      title: "COMMUNICATION", 
      description: "We will always ensure that the information we provide is clear and easy to understand. This includes information about our role and what we can and cannot do. We expect you to provide the information we ask for and to be honest in your communications with us.",
      icon: MessageSquare,
      color: "text-teal-600",
      bgColor: "bg-teal-50", 
      borderColor: "border-teal-200"
    },
    {
      title: "IMPARTIALITY",
      description: "We will undertake all aspects of our work fairly and impartially as an independent body.",
      icon: Scale,
      color: "text-gray-600",
      bgColor: "bg-gray-50",
      borderColor: "border-gray-200"
    },
    {
      title: "TRANSPARENCY",
      description: "We will always act openly and transparently and will publish information about our work and the Service complaints system. In doing this we will never compromise confidentiality.",
      icon: Eye,
      color: "text-orange-600", 
      bgColor: "bg-orange-50",
      borderColor: "border-orange-200"
    },
    {
      title: "IMPROVEMENT",
      description: "We will continually look to improve the service we offer and listen to the feedback you provide. We hope that you will help us achieve this by responding to our requests for feedback at the end of the process.",
      icon: TrendingUp,
      color: "text-blue-600",
      bgColor: "bg-blue-50",
      borderColor: "border-blue-200"
    }
  ];

  return (
    <div className="bg-gray-50">
      {/* Hero Section */}
      <div className="relative h-[300px] flex items-center justify-center overflow-hidden">
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

        {/* Decorative Elements */}
        <div className="absolute inset-0">
          <div className="absolute top-0 left-0 w-24 h-24 bg-[var(--accent)]/5 rounded-br-full" />
          <div className="absolute bottom-0 right-0 w-32 h-32 bg-[var(--secondary)]/5 rounded-tl-full" />
          <div className="absolute top-1/2 left-1/4 w-8 h-8 bg-[var(--primary)]/5 rounded-full transform -translate-y-1/2" />
          <div className="absolute top-1/3 right-1/3 w-12 h-12 bg-[var(--accent)]/5 rounded-full" />
        </div>

        {/* Content */}
        <div className="relative container mx-auto px-4 text-center z-10">
          <div className="max-w-3xl mx-auto">
            <h1 className="text-5xl font-bold mb-6 text-white">Our Services</h1>
            <p className="text-xl text-white/90 font-medium">
              Committed to delivering excellence through our comprehensive service charter and professional standards.
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
        {/* Service Charter Introduction */}
        <section className="bg-white rounded-xl shadow-xl p-8 mb-12 border border-gray-100">
          <div className="text-center mb-8">
            <div className="flex items-center justify-center gap-4 mb-6">
              <div className="bg-[var(--primary)]/10 p-4 rounded-lg">
                <Settings className="h-8 w-8 text-[var(--primary)]" />
              </div>
              <div>
                <h2 className="text-3xl font-bold text-[var(--accent)]">Service Charter</h2>
                <div className="flex gap-2 mt-2">
                  <div className="h-1.5 w-12 bg-[var(--accent)] rounded-full" />
                  <div className="h-1.5 w-12 bg-[var(--secondary)] rounded-full" />
                  <div className="h-1.5 w-12 bg-[var(--primary)] rounded-full" />
                </div>
              </div>
            </div>
            <p className="text-gray-600 text-lg max-w-3xl mx-auto leading-relaxed">
              Our service charter outlines our commitment to providing high-quality, professional services 
              to all our clients. These principles guide every interaction and ensure consistent excellence 
              in all our operations.
            </p>
          </div>
        </section>

        {/* Service Charter Principles */}
        <section className="space-y-12 mb-12">
          {serviceCharter.map((principle, index) => {
            const IconComponent = principle.icon;
            const isEven = index % 2 === 1;
            
            return (
              <div 
                key={index} 
                className={`flex ${isEven ? 'justify-end' : 'justify-start'}`}
              >
                <div className="w-full max-w-5xl bg-white rounded-xl shadow-xl overflow-hidden border border-gray-100 hover:shadow-2xl transition-shadow duration-300">
                  <div className={`flex flex-col lg:flex-row ${isEven ? 'lg:flex-row-reverse' : ''}`}>
                    {/* Icon Section */}
                    <div className={`lg:w-2/5 ${principle.bgColor} p-8 flex flex-col items-center justify-center relative`}>
                      {/* Decorative abstract pattern background */}
                      <div className="absolute inset-0 opacity-10">
                        {/* Abstract geometric pattern */}
                        <div className="absolute top-4 left-4 w-8 h-8 border-2 border-gray-400 rounded-full"></div>
                        <div className="absolute top-8 right-6 w-6 h-6 bg-gray-400 transform rotate-45"></div>
                        <div className="absolute bottom-8 left-8 w-12 h-2 bg-gray-400 rounded-full"></div>
                        <div className="absolute bottom-4 right-4 w-10 h-10 border-2 border-gray-400 transform rotate-12"></div>
                        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                          <div className="w-20 h-20 border border-gray-400 rounded-full"></div>
                          <div className="absolute top-2 left-2 w-16 h-16 border border-gray-400 rounded-full"></div>
                          <div className="absolute top-4 left-4 w-12 h-12 border border-gray-400 rounded-full"></div>
                        </div>
                        {/* Additional decorative elements */}
                        <div className="absolute top-1/4 right-1/4 w-4 h-16 bg-gray-400 opacity-30 transform rotate-45 rounded-full"></div>
                        <div className="absolute bottom-1/4 left-1/4 w-4 h-12 bg-gray-400 opacity-30 transform -rotate-45 rounded-full"></div>
                      </div>
                      
                      <div className={`relative z-10 ${principle.bgColor} p-6 rounded-full shadow-lg border-4 ${principle.borderColor}`}>
                        <IconComponent className={`h-12 w-12 ${principle.color}`} />
                      </div>
                      <h3 className={`text-2xl font-bold mt-4 ${principle.color} relative z-10 text-center`}>
                        {principle.title}
                      </h3>
                    </div>
                    
                    {/* Content Section */}
                    <div className="lg:w-3/5 p-8 flex items-center">
                      <div className="w-full">
                        <p className="text-gray-700 text-lg leading-relaxed">
                          {principle.description}
                        </p>
                        {/* Optional: Add a small decorative line */}
                        <div className={`mt-4 h-1 w-16 ${principle.bgColor} rounded-full`}></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </section>

        {/* Our Commitment */}
        <section className="bg-white rounded-xl shadow-xl p-8 mb-12 border border-gray-100">
          <div className="flex items-center gap-4 mb-6">
            <div className="bg-[var(--secondary)]/10 p-4 rounded-lg">
              <CheckCircle className="h-8 w-8 text-[var(--secondary)]" />
            </div>
            <div>
              <h2 className="text-3xl font-bold text-[var(--accent)]">Our Commitment</h2>
              <div className="flex gap-2 mt-2">
                <div className="h-1.5 w-12 bg-[var(--accent)] rounded-full" />
                <div className="h-1.5 w-12 bg-[var(--secondary)] rounded-full" />
                <div className="h-1.5 w-12 bg-[var(--primary)] rounded-full" />
              </div>
            </div>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <CheckCircle className="w-6 h-6 text-[var(--primary)] mt-1 flex-shrink-0" />
                <div>
                  <h4 className="font-semibold text-gray-800 mb-2">Quality Assurance</h4>
                  <p className="text-gray-600">We maintain the highest standards in all our financial management and reporting services.</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle className="w-6 h-6 text-[var(--primary)] mt-1 flex-shrink-0" />
                <div>
                  <h4 className="font-semibold text-gray-800 mb-2">Professional Excellence</h4>
                  <p className="text-gray-600">Our team consists of qualified professionals committed to delivering exceptional service.</p>
                </div>
              </div>
            </div>
            
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <CheckCircle className="w-6 h-6 text-[var(--primary)] mt-1 flex-shrink-0" />
                <div>
                  <h4 className="font-semibold text-gray-800 mb-2">Continuous Innovation</h4>
                  <p className="text-gray-600">We constantly seek new ways to improve our processes and service delivery.</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle className="w-6 h-6 text-[var(--primary)] mt-1 flex-shrink-0" />
                <div>
                  <h4 className="font-semibold text-gray-800 mb-2">Client Satisfaction</h4>
                  <p className="text-gray-600">Your satisfaction is our priority, and we work tirelessly to exceed your expectations.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section className="text-center">
          <div className="bg-gradient-to-r from-[var(--primary)] to-[var(--secondary)] rounded-xl p-8 text-white">
            <div className="flex items-center justify-center gap-4 mb-4">
              <Users className="h-8 w-8" />
              <h2 className="text-2xl font-bold">Need Our Services?</h2>
            </div>
            <p className="text-white/90 mb-6 max-w-2xl mx-auto">
              Contact us to learn more about how we can assist you with your financial management needs. 
              We&apos;re here to serve with excellence and integrity.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="/contact"
                className="inline-flex items-center gap-2 bg-white text-[var(--primary)] px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
              >
                <Target className="w-5 h-5" />
                Contact Us
              </a>
              <a
                href="tel:+2651788533"
                className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 text-white px-6 py-3 rounded-lg font-semibold hover:bg-white/20 transition-colors"
              >
                Call: +265 1 788 533
              </a>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
} 