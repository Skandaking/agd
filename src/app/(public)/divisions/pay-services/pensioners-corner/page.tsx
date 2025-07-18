import { Users, FileText, Clock, Award, Shield, AlertCircle, Heart, DollarSign } from 'lucide-react';

export default function PensionersCornerPage() {
  const benefitTypes = [
    {
      title: "GRATUITIES (NORMAL RETIREMENT BENEFITS)/VOLUNTARY",
      icon: <Award className="w-6 h-6" />,
      color: "bg-[var(--primary)]",
      description: "These are benefits given to those who have retired mandatory or voluntarily. The person must have served for 30 years and reached the mandatory age of 60 years according to Malawi Government Public Service Regulations.",
      requirements: ["30 years of service", "Mandatory age of 60 years", "According to Public Service Regulations"]
    },
    {
      title: "VOLUNTARY RETIREMENT",
      icon: <Clock className="w-6 h-6" />,
      color: "bg-[var(--secondary)]",
      description: "Those who voluntary retired before reaching the age of 60 due to other reasons. For them to be allowed to retire, they need to serve 20 years or above.",
      requirements: ["20+ years of service", "Before age 60", "Valid retirement reasons"]
    },
    {
      title: "DEATH GRATUITY",
      icon: <Heart className="w-6 h-6" />,
      color: "bg-[var(--accent)]",
      description: "Apply to those who served for 20 years or above and died while in service. These people receive both normal and death benefits.",
      requirements: ["20+ years of service", "Death while in service", "Both normal and death benefits"]
    },
    {
      title: "TRANSFERRED PENSION",
      icon: <Shield className="w-6 h-6" />,
      color: "bg-gradient-to-r from-[var(--primary)] to-[var(--secondary)]",
      description: "This is applicable to those pensioners who died while on Pension (those who were receiving on the 14th). Government appreciates them in a special way.",
      requirements: ["Was receiving pension", "Died while on pension", "Special government appreciation"]
    },
    {
      title: "EX-GRATIAS",
      icon: <AlertCircle className="w-6 h-6" />,
      color: "bg-gray-600",
      description: "This applies to all those who did not meet all the requirements. These people will be given a death gratuity known as Ex-gratias. These are the ones who served less than 2 years for instance.",
      requirements: ["Did not meet standard requirements", "Less than 2 years service", "Special consideration cases"]
    },
    {
      title: "CONTRACT PENSION",
      icon: <DollarSign className="w-6 h-6" />,
      color: "bg-gradient-to-r from-[var(--secondary)] to-[var(--accent)]",
      description: "This applies to those who are working under a government contract. They receive a certain percent of the total contract amount.",
      requirements: ["Government contract workers", "Percentage of contract amount", "Contract-based calculation"]
    }
  ];

  return (
    <div className="bg-gray-50">
      {/* Hero Section */}
      <div className="relative min-h-[260px] flex items-center justify-center overflow-hidden py-8 px-2 sm:px-4 md:py-0 md:h-[300px]">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(/hero/6.JPG)` }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-[var(--primary)]/70 to-[var(--secondary)]/70" />
        </div>

        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-0 w-16 h-16 bg-[var(--accent)]/5 rounded-br-full" />
          <div className="absolute bottom-0 right-0 w-20 h-20 bg-[var(--secondary)]/5 rounded-tl-full" />
          <div className="absolute top-1/2 left-1/4 w-6 h-6 bg-[var(--primary)]/5 rounded-full -translate-y-1/2" />
          <div className="absolute top-1/3 right-1/3 w-8 h-8 bg-[var(--accent)]/5 rounded-full" />
        </div>

        <div className="relative w-full max-w-4xl mx-auto text-center z-10 flex flex-col items-center justify-center">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 text-white leading-tight">
            Pensioners&apos; Corner
          </h1>
          <p className="text-base sm:text-lg md:text-xl text-white/90 font-medium mb-4 px-2 sm:px-0">
            Understanding Terminal Benefits and Pension Services for Government Employees
          </p>
          <div className="flex flex-wrap justify-center gap-2 w-full mb-2">
            <div className="flex items-center gap-2 bg-[var(--accent)]/70 px-3 py-1 rounded-full min-w-[120px] justify-center">
              <Users className="w-4 h-4 text-white" />
              <span className="text-xs text-white">Pensioner Support</span>
            </div>
            <div className="flex items-center gap-2 bg-[var(--secondary)]/70 px-3 py-1 rounded-full min-w-[120px] justify-center">
              <Shield className="w-4 h-4 text-white" />
              <span className="text-xs text-white">Government Benefits</span>
            </div>
            <div className="flex items-center gap-2 bg-[var(--primary)]/70 px-3 py-1 rounded-full min-w-[120px] justify-center">
              <FileText className="w-4 h-4 text-white" />
              <span className="text-xs text-white">Comprehensive Guide</span>
            </div>
          </div>
          <div className="mt-4 flex justify-center gap-2">
            <div className="h-1 w-8 bg-[var(--accent)] rounded-full" />
            <div className="h-1 w-8 bg-[var(--secondary)] rounded-full" />
            <div className="h-1 w-8 bg-[var(--primary)] rounded-full" />
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-12">
        {/* Introduction Section */}
        <section className="bg-white rounded-xl shadow-xl p-8 mb-8 border border-gray-100">
          <div className="text-center mb-8">
            <div className="flex items-center justify-center gap-4 mb-6">
              <div className="bg-[var(--primary)]/10 p-4 rounded-lg">
                <Users className="h-8 w-8 text-[var(--primary)]" />
              </div>
              <div>
                <h2 className="text-3xl font-bold text-[var(--accent)]">Forms of Terminal Benefits</h2>
                <div className="flex gap-2 mt-2 justify-center">
                  <div className="h-1.5 w-12 bg-[var(--accent)] rounded-full" />
                  <div className="h-1.5 w-12 bg-[var(--secondary)] rounded-full" />
                  <div className="h-1.5 w-12 bg-[var(--primary)] rounded-full" />
                </div>
              </div>
            </div>
            <p className="text-lg text-gray-600 leading-relaxed max-w-3xl mx-auto">
              The Government of Malawi provides various forms of terminal benefits to public servants who have dedicated their service to the nation. 
              Below are the different categories of benefits available to government employees and their beneficiaries.
            </p>
          </div>
        </section>

        {/* Benefits Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          {benefitTypes.map((benefit, index) => (
            <div key={index} className="bg-white rounded-xl shadow-xl overflow-hidden border border-gray-100 hover:shadow-2xl transition-shadow duration-300">
              {/* Header */}
              <div className={`${benefit.color} p-6 text-white`}>
                <div className="flex items-center gap-4">
                  <div className="bg-white/20 p-3 rounded-lg">
                    {benefit.icon}
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-bold leading-tight">{benefit.title}</h3>
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className="p-6 space-y-6">
                <p className="text-gray-700 leading-relaxed">{benefit.description}</p>
                
                <div>
                  <h4 className="font-semibold text-[var(--accent)] mb-3 flex items-center gap-2">
                    <FileText className="w-4 h-4" />
                    Key Requirements:
                  </h4>
                  <ul className="space-y-2">
                    {benefit.requirements.map((req, reqIndex) => (
                      <li key={reqIndex} className="flex items-start gap-2">
                        <div className="w-2 h-2 bg-[var(--primary)] rounded-full mt-2 flex-shrink-0" />
                        <span className="text-gray-600 text-sm">{req}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Important Notice */}
        <section className="bg-gradient-to-r from-[var(--primary)] to-[var(--secondary)] rounded-xl p-8 text-white mb-8">
          <div className="flex items-start gap-4">
            <div className="bg-white/20 p-3 rounded-lg flex-shrink-0">
              <AlertCircle className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-2xl font-bold mb-3">Important Notice</h3>
              <p className="text-white/90 leading-relaxed">
                All pension and terminal benefit calculations are based on the Malawi Government Public Service Regulations. 
                For specific inquiries about your pension status or benefits, please contact the Pay Services Division directly. 
                Processing times may vary depending on the type of benefit and completeness of documentation provided.
              </p>
            </div>
          </div>
        </section>

        {/* Contact Information */}
        <section className="bg-white rounded-xl shadow-xl p-8 border border-gray-100">
          <div className="text-center">
            <h3 className="text-2xl font-bold text-[var(--accent)] mb-4">Need Assistance?</h3>
            <p className="text-gray-600 mb-6">
              Contact the Pay Services Division for more information about your pension benefits and terminal gratuities.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="/contact"
                className="inline-flex items-center gap-2 bg-[var(--primary)] hover:bg-[var(--primary)]/90 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
              >
                Contact Pay Services
                <FileText className="w-4 h-4" />
              </a>
              <a
                href="/divisions/pay-services"
                className="inline-flex items-center gap-2 bg-[var(--secondary)] hover:bg-[var(--secondary)]/90 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
              >
                Learn More About Pay Services
                <Users className="w-4 h-4" />
              </a>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
} 