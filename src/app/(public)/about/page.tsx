import { Award, Briefcase, CheckCircle2, Clock, Target } from "lucide-react";

// Define image paths assuming they are in the public/assets directory
const flagImageUrl = "/flag.jpg";
const heroImageUrl = "/hero/6.JPG";

export default function AboutAgdPage() {
  const coreValues = [
    "Excellent Customer care",
    "Efficiency and Effectiveness",
    "Team Work",
    "Staff Development",
    "Transparency and Accountability",
    "Prudence",
    "Professionalism",
  ];

  const goals = [
    "To ensure quality accounting and financial management information systems is rendered to the government in line with national and international standards through the use of modern technology",
    "To foster development of accounting and financial management systems within the public sector",
    "To offer Technical Advice and supply/second to the Public Sector qualified, multi skilled, well-motivated Accounting Officers through Provision of Training Services",
  ];

  const timelineEvents = [
    {
      year: "1892",
      text: "Financial and accounting work undertaken by Chief Accountant",
    },
    { year: "1903", text: "Office of Treasury instituted" },
    {
      year: "1921",
      text: "Treasury took over Income Tax administration",
    },
    { year: "1939", text: "Financial Secretary appointed" },
    {
      year: "1948",
      text: "Title reverted to Accountant General's Department",
    },
  ];

  return (
    <div className="bg-gray-50">
      {/* Hero Section */}
      <div className="relative min-h-[240px] flex items-center justify-center overflow-hidden">
        {/* Background Image with Overlay */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `url(${heroImageUrl})`,
          }}
        >
          {/* Lighter overlay with reduced opacity */}
          <div className="absolute inset-0 bg-gradient-to-r from-[var(--primary)]/70 to-[var(--secondary)]/70" />
        </div>

        {/* Decorative Elements - reduced opacity */}
        <div className="absolute inset-0">
          <div className="absolute top-0 left-0 w-24 h-24 bg-[var(--accent)]/5 rounded-br-full" />
          <div className="absolute bottom-0 right-0 w-32 h-32 bg-[var(--secondary)]/5 rounded-tl-full" />
          <div className="absolute top-1/2 left-1/4 w-8 h-8 bg-[var(--primary)]/5 rounded-full transform -translate-y-1/2" />
          <div className="absolute top-1/3 right-1/3 w-12 h-12 bg-[var(--accent)]/5 rounded-full" />
        </div>

        {/* Content */}
        <div className="relative container mx-auto px-4 text-center z-10">
          <div className="max-w-3xl mx-auto">
            <h1 className="text-5xl font-bold mb-6 text-white">About AGD</h1>
            <p className="text-xl text-white/90 font-medium">
              Serving Malawi&apos;s Public Financial Management Since 1890
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
        {/* History Section */}
        <section className="bg-white rounded-xl shadow-xl p-8 mb-12 border border-gray-100">
          <div className="flex flex-col md:flex-row gap-12">
            {/* Text Content - Left Side */}
            <div className="flex-1 space-y-8">
              <div className="border-l-4 border-[var(--accent)] pl-6">
                <h2 className="text-3xl font-bold text-[var(--accent)]">
                  Evolution of AGD
                </h2>
                <div className="mt-3 flex gap-2">
                  <div className="h-1.5 w-12 bg-[var(--accent)] rounded-full" />
                  <div className="h-1.5 w-12 bg-[var(--secondary)] rounded-full" />
                  <div className="h-1.5 w-12 bg-[var(--primary)] rounded-full" />
                </div>
              </div>

              <div className="space-y-6 text-gray-700 leading-relaxed">
                <div className="bg-gray-50 p-6 rounded-lg border-l-4 border-[var(--primary)] shadow-sm">
                  <p className="text-lg">
                    The Establishment of the Accountant General&apos;s Department
                    dates back to as early as 1890s when the country became a
                    British Protectorate. At the commencement of the
                    Protectorate in 1891, Sir H.H. Johnstone, Governor of
                    Nyasaland, was the sole Accountant.
                  </p>
                </div>

                {/* Timeline */}
                <div className="relative border-l-2 border-[var(--primary)]/20 pl-10 space-y-10 my-12">
                  {timelineEvents.map((event, index) => (
                    <div key={index} className="relative">
                      <div className="absolute -left-[48px] top-1 bg-[var(--primary)] text-white rounded-full p-2.5 shadow-md">
                        <Clock className="h-5 w-5" />
                      </div>
                      <div className="font-bold text-lg text-[var(--primary)] mb-1">
                        {event.year}
                      </div>
                      <div className="text-gray-600 leading-normal">
                        {event.text}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Image - Right Side */}
            <div className="flex-1 md:max-w-[40%]">
              <div className="sticky top-24 space-y-6">
                <div className="relative h-[500px] overflow-hidden rounded-xl shadow-xl border border-gray-100">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={heroImageUrl}
                    alt="AGD Historical Building"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                    <h3 className="text-xl font-semibold mb-2">
                      AGD Through Time
                    </h3>
                    <p className="text-sm text-white/90">
                      From its humble beginnings in 1890 to the present day, AGD
                      has evolved to meet Malawi&apos;s changing financial management
                      needs.
                    </p>
                  </div>
                </div>

                {/* Decorative Elements */}
                <div className="hidden md:flex justify-end gap-2 pt-2">
                  <div className="h-1.5 w-12 bg-[var(--accent)] rounded-full" />
                  <div className="h-1.5 w-12 bg-[var(--secondary)] rounded-full" />
                  <div className="h-1.5 w-12 bg-[var(--primary)] rounded-full" />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Vision & Mission */}
        <div className="grid md:grid-cols-2 gap-8 mb-12">
          <div className="bg-white rounded-xl shadow-xl p-8 relative overflow-hidden group hover:shadow-2xl transition-shadow duration-300 border border-gray-100">
            <div className="absolute top-0 right-0 w-32 h-32 bg-[var(--primary)]/5 rounded-bl-full transition-transform duration-500 group-hover:scale-125" />
            <div className="absolute bottom-0 left-0 w-24 h-24 bg-[var(--accent)]/5 rounded-tr-full transition-transform duration-500 group-hover:scale-125" />

            <div className="relative z-10">
              <div className="flex items-center gap-4 mb-6">
                <div className="bg-[var(--primary)]/10 p-4 rounded-lg group-hover:bg-[var(--primary)]/20 transition-colors duration-300">
                  <Target className="h-8 w-8 text-[var(--primary)]" />
                </div>
                <div>
                  <h2 className="text-3xl font-bold text-[var(--accent)]">
                    Vision
                  </h2>
                  <div className="flex gap-2 mt-2">
                    <div className="h-1.5 w-12 bg-[var(--accent)] rounded-full" />
                    <div className="h-1.5 w-8 bg-[var(--secondary)]/70 rounded-full" />
                    <div className="h-1.5 w-6 bg-[var(--primary)]/70 rounded-full" />
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 p-6 rounded-lg border-l-4 border-[var(--primary)] shadow-sm">
                <p className="text-gray-700 leading-relaxed text-lg">
                  To be a leading designer of high quality financial management
                  information services, developer and provider of accounting
                  policies and guidelines to the public sector in Malawi.
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-xl p-8 relative overflow-hidden group hover:shadow-2xl transition-shadow duration-300 border border-gray-100">
            <div className="absolute top-0 right-0 w-32 h-32 bg-[var(--secondary)]/5 rounded-bl-full transition-transform duration-500 group-hover:scale-125" />
            <div className="absolute bottom-0 left-0 w-24 h-24 bg-[var(--primary)]/5 rounded-tr-full transition-transform duration-500 group-hover:scale-125" />

            <div className="relative z-10">
              <div className="flex items-center gap-4 mb-6">
                <div className="bg-[var(--secondary)]/10 p-4 rounded-lg group-hover:bg-[var(--secondary)]/20 transition-colors duration-300">
                  <Award className="h-8 w-8 text-[var(--secondary)]" />
                </div>
                <div>
                  <h2 className="text-3xl font-bold text-[var(--accent)]">
                    Mission
                  </h2>
                  <div className="flex gap-2 mt-2">
                    <div className="h-1.5 w-12 bg-[var(--secondary)] rounded-full" />
                    <div className="h-1.5 w-8 bg-[var(--accent)]/70 rounded-full" />
                    <div className="h-1.5 w-6 bg-[var(--primary)]/70 rounded-full" />
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 p-6 rounded-lg border-l-4 border-[var(--secondary)] shadow-sm">
                <p className="text-gray-700 leading-relaxed text-lg">
                  To design, develop and provide high quality financial
                  management services to the public sector in line with national
                  and international accounting standards by using state of the
                  art technology.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Core Values */}
        <section className="bg-white rounded-xl shadow-xl p-8 mb-12 relative overflow-hidden border border-gray-100">
          <div className="absolute top-0 right-0 w-40 h-40 bg-[var(--primary)]/5 rounded-bl-full opacity-70" />
          <div className="absolute bottom-0 left-0 w-32 h-32 bg-[var(--accent)]/5 rounded-tr-full opacity-70" />

          <div className="relative z-10">
            <div className="flex items-center gap-4 mb-8">
              <div className="bg-[var(--primary)]/10 p-4 rounded-lg">
                <Briefcase className="h-8 w-8 text-[var(--primary)]" />
              </div>
              <div>
                <h2 className="text-3xl font-bold text-[var(--accent)]">
                  Core Values
                </h2>
                <div className="flex gap-2 mt-2">
                  <div className="h-1.5 w-12 bg-[var(--accent)] rounded-full" />
                  <div className="h-1.5 w-12 bg-[var(--secondary)] rounded-full" />
                  <div className="h-1.5 w-12 bg-[var(--primary)] rounded-full" />
                </div>
              </div>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {coreValues.map((value, index) => (
                <div
                  key={index}
                  className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg hover:shadow-lg transition-shadow duration-300 group border border-gray-200 hover:border-[var(--primary)]/50"
                >
                  <div className="bg-[var(--primary)]/10 p-3 rounded-lg group-hover:bg-[var(--primary)]/20 transition-colors duration-300">
                    <CheckCircle2 className="h-6 w-6 text-[var(--primary)] flex-shrink-0" />
                  </div>
                  <span className="text-gray-700 font-medium text-md">
                    {value}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Goals and Objectives */}
        <section className="bg-white rounded-xl shadow-xl p-8 mb-12 relative overflow-hidden border border-gray-100">
          <div className="absolute top-0 right-0 w-40 h-40 bg-[var(--secondary)]/5 rounded-bl-full opacity-70" />
          <div className="absolute bottom-0 left-0 w-32 h-32 bg-[var(--primary)]/5 rounded-tr-full opacity-70" />

          <div className="relative z-10">
            <div className="flex items-center gap-4 mb-8">
              <div className="bg-[var(--secondary)]/10 p-4 rounded-lg">
                <Target className="h-8 w-8 text-[var(--secondary)]" />
              </div>
              <div>
                <h2 className="text-3xl font-bold text-[var(--accent)]">
                  Goals and Objectives
                </h2>
                <div className="flex gap-2 mt-2">
                  <div className="h-1.5 w-12 bg-[var(--accent)] rounded-full" />
                  <div className="h-1.5 w-12 bg-[var(--secondary)] rounded-full" />
                  <div className="h-1.5 w-12 bg-[var(--primary)] rounded-full" />
                </div>
              </div>
            </div>
            <div className="space-y-6">
              {goals.map((goal, index) => (
                <div
                  key={index}
                  className="flex items-start gap-4 p-6 bg-gray-50 rounded-lg hover:shadow-lg transition-shadow duration-300 border border-gray-200 hover:border-[var(--secondary)]/50"
                >
                  <div className="flex-shrink-0 mt-1 w-8 h-8 bg-[var(--secondary)]/10 rounded-full flex items-center justify-center text-[var(--secondary)] font-bold text-lg shadow-sm">
                    {index + 1}
                  </div>
                  <p className="text-gray-700 leading-relaxed">
                    {goal}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Mandate Section */}
        <section className="bg-white rounded-xl shadow-xl p-8 relative overflow-hidden border border-gray-100">
          <div className="absolute top-0 right-0 w-40 h-40 bg-[var(--accent)]/5 rounded-bl-full opacity-70" />
          <div className="absolute bottom-0 left-0 w-32 h-32 bg-[var(--primary)]/5 rounded-tr-full opacity-70" />

          <div className="relative z-10">
            <div className="flex items-center gap-4 mb-8">
              <div className="bg-[var(--accent)]/10 p-4 rounded-lg">
                <svg
                  className="h-8 w-8 text-[var(--accent)]"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                  />
                </svg>
              </div>
              <div>
                <h2 className="text-3xl font-bold text-[var(--accent)]">
                  Our Mandate
                </h2>
                <div className="flex gap-2 mt-2">
                  <div className="h-1.5 w-12 bg-[var(--accent)] rounded-full" />
                  <div className="h-1.5 w-12 bg-[var(--secondary)] rounded-full" />
                  <div className="h-1.5 w-12 bg-[var(--primary)] rounded-full" />
                </div>
              </div>
            </div>

            <div className="flex flex-col lg:flex-row gap-8 items-stretch">
              {/* Flag Image - Left Side */}
              <div className="lg:w-1/3 flex">
                <div className="relative w-full h-[300px] lg:h-full overflow-hidden rounded-xl shadow-lg border border-gray-100">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={flagImageUrl}
                    alt="Malawi Flag"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent rounded-xl" />
                  <div className="absolute bottom-4 left-4 right-4">
                    <div className="flex gap-2">
                      <div className="h-1.5 w-10 bg-white rounded-full shadow-md" />
                      <div className="h-1.5 w-16 bg-white/80 rounded-full shadow-md" />
                    </div>
                  </div>
                </div>
              </div>

              {/* Mandate Text - Right Side */}
              <div className="lg:w-2/3 flex">
                <div className="bg-gray-50 p-8 rounded-lg border-l-4 border-[var(--accent)] shadow-sm h-full flex flex-col justify-center">
                  <p className="text-gray-700 leading-relaxed text-lg">
                    AGD derives its mandate from the Constitution of the
                    Republic of Malawi and the Public Finance Management Act,
                    2003 &quot;to account for government revenue and expenditure,
                    manage all government accounts, achieve appropriate
                    financial controls and accountability of public funds,
                    produce national financial statements, payment of personnel
                    emoluments, setting, maintaining and monitoring the
                    implementation of effective financial management and
                    procedures in government.&quot;
                  </p>
                  <div className="mt-6 flex gap-2">
                    <div className="h-1.5 w-12 bg-[var(--accent)] rounded-full" />
                    <div className="h-1.5 w-12 bg-[var(--secondary)]/80 rounded-full" />
                    <div className="h-1.5 w-12 bg-[var(--primary)]/80 rounded-full" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
} 