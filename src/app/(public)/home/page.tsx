import Image from "next/image";

export default function HomePage() {
  return ( 
    <div className="container mx-auto py-8">
      {/* Hero Section */}
      <section className="relative h-[500px] rounded-xl overflow-hidden mb-12">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/80 to-transparent z-10" />
        <div className="absolute inset-0 flex items-center z-20">
          <div className="text-white max-w-2xl px-8">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Accountant General Department
            </h1>
            <p className="text-xl mb-8">
              Ensuring financial accountability and transparency in public service
            </p>
            <button className="bg-white text-primary px-6 py-3 rounded-md font-medium hover:bg-white/90 transition-colors">
              Learn More
            </button>
          </div>
        </div>
        {/* Placeholder for hero image - replace with actual image */}
        <div className="absolute inset-0 bg-gray-800 z-0">
          {/* Will be replaced with actual image */}
          {/* <Image src="/images/hero.jpg" alt="AGD Office" fill className="object-cover" /> */}
        </div>
      </section>

      {/* Services Preview */}
      <section className="mb-16">
        <h2 className="text-3xl font-bold mb-8 text-center">Our Services</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              title: "Financial Reporting",
              description: "Comprehensive financial reporting for government entities",
              icon: "📊"
            },
            {
              title: "Treasury Management",
              description: "Efficient management of government funds and assets",
              icon: "💰"
            },
            {
              title: "Audit Services",
              description: "Internal audits to ensure compliance with regulations",
              icon: "✓"
            }
          ].map((service, index) => (
            <div key={index} className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
              <div className="text-4xl mb-4">{service.icon}</div>
              <h3 className="text-xl font-bold mb-2">{service.title}</h3>
              <p className="text-gray-600">{service.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Latest News */}
      <section className="mb-16">
        <h2 className="text-3xl font-bold mb-8 text-center">Latest News</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3].map((item) => (
            <div key={item} className="border rounded-lg overflow-hidden hover:shadow-md transition-shadow">
              <div className="h-48 bg-gray-200 relative">
                {/* Will be replaced with actual image */}
                {/* <Image src={`/images/news-${item}.jpg`} alt={`News ${item}`} fill className="object-cover" /> */}
              </div>
              <div className="p-4">
                <p className="text-sm text-gray-500 mb-2">May {item + 10}, 2023</p>
                <h3 className="text-xl font-bold mb-2">AGD Launches New Financial System</h3>
                <p className="text-gray-600 mb-4">
                  The Accountant General Department has launched a new financial management system to improve efficiency...
                </p>
                <a href="#" className="text-primary font-medium hover:underline">Read More</a>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Quick Stats */}
      <section className="bg-secondary/10 py-12 px-4 rounded-xl mb-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {[
            { value: "50+", label: "Years of Service" },
            { value: "1000+", label: "Staff Members" },
            { value: "28", label: "Districts Covered" },
            { value: "100%", label: "Accountability" }
          ].map((stat, index) => (
            <div key={index}>
              <div className="text-3xl md:text-4xl font-bold text-primary mb-2">{stat.value}</div>
              <div className="text-gray-600">{stat.label}</div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
} 