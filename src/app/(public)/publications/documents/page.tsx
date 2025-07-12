import Image from 'next/image';
import Link from 'next/link';
import { FileText, Download, Calendar, Search, Filter, Eye, File } from 'lucide-react';

export default function DocumentsPage() {
  const documents = [
    {
      id: 1,
      title: "Annual Financial Statement 2023",
      slug: "annual-financial-statement-2023",
      date: "June 10, 2024",
      category: "Financial Reports",
      fileSize: "2.4 MB",
      fileType: "PDF",
      downloadCount: 1247,
      description: "Comprehensive financial statement for the fiscal year 2023, including revenue, expenditure, and asset management reports.",
      image: "/hero/3.jpg",
      featured: true
    },
    {
      id: 2,
      title: "Budget Implementation Report 2024",
      slug: "budget-implementation-report-2024",
      date: "May 22, 2024",
      category: "Budget Reports",
      fileSize: "3.7 MB",
      fileType: "PDF",
      downloadCount: 892,
      description: "Detailed analysis of budget implementation and financial performance for the year 2024.",
      image: "/hero/1.JPG",
      featured: true
    },
    {
      id: 3,
      title: "Procurement Guidelines 2024",
      slug: "procurement-guidelines-2024",
      date: "April 15, 2024",
      category: "Guidelines",
      fileSize: "1.8 MB",
      fileType: "PDF",
      downloadCount: 2156,
      description: "Updated guidelines for government procurement processes, ensuring transparency and compliance.",
      image: "/hero/6.jpg",
      featured: false
    },
    {
      id: 4,
      title: "IFMIS User Manual v3.2",
      slug: "ifmis-user-manual-v3-2",
      date: "March 30, 2024",
      category: "Manuals",
      fileSize: "5.2 MB",
      fileType: "PDF",
      downloadCount: 3421,
      description: "Complete user manual for the IFMIS system version 3.2, including step-by-step instructions and troubleshooting guides.",
      image: "/hero/2.JPG",
      featured: false
    },
    {
      id: 5,
      title: "Public Finance Management Act",
      slug: "public-finance-management-act",
      date: "January 15, 2024",
      category: "Legal Documents",
      fileSize: "892 KB",
      fileType: "PDF",
      downloadCount: 1876,
      description: "The complete Public Finance Management Act governing financial management in the public sector.",
      image: "/hero/4.jpg",
      featured: false
    },
    {
      id: 6,
      title: "Quarterly Performance Report Q1 2024",
      slug: "quarterly-performance-report-q1-2024",
      date: "April 30, 2024",
      category: "Performance Reports",
      fileSize: "1.3 MB",
      fileType: "PDF",
      downloadCount: 654,
      description: "First quarter performance report highlighting key achievements and challenges in financial management.",
      image: "/hero/5.jpg",
      featured: false
    },
    {
      id: 7,
      title: "Asset Management Policy",
      slug: "asset-management-policy",
      date: "February 20, 2024",
      category: "Policies",
      fileSize: "967 KB",
      fileType: "PDF",
      downloadCount: 1234,
      description: "Comprehensive policy document outlining asset management procedures and best practices.",
      image: "/hero/7.JPG",
      featured: false
    },
    {
      id: 8,
      title: "Training Manual - Financial Reporting",
      slug: "training-manual-financial-reporting",
      date: "March 10, 2024",
      category: "Training Materials",
      fileSize: "2.1 MB",
      fileType: "PDF",
      downloadCount: 987,
      description: "Training manual for government accountants on modern financial reporting standards and practices.",
      image: "/hero/6.jpg",
      featured: false
    },
    {
      id: 9,
      title: "Audit Report 2023",
      slug: "audit-report-2023",
      date: "May 5, 2024",
      category: "Audit Reports",
      fileSize: "4.1 MB",
      fileType: "PDF",
      downloadCount: 1567,
      description: "Independent audit report for the fiscal year 2023, including findings and recommendations.",
      image: "/hero/1.JPG",
      featured: false
    }
  ];

  const categories = ["All", "Financial Reports", "Budget Reports", "Guidelines", "Manuals", "Legal Documents", "Performance Reports", "Policies", "Training Materials", "Audit Reports"];

  return (
    <div className="bg-gray-50">
      {/* Hero Section */}
      <div className="relative min-h-[260px] flex items-center justify-center overflow-hidden py-8 px-2 sm:px-4 md:py-0 md:h-[300px]">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(/hero/3.JPG)` }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-[var(--primary)]/70 to-[var(--secondary)]/70" />
        </div>

        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-0 w-16 h-16 bg-[var(--accent)]/5 rounded-br-full" />
          <div className="absolute bottom-0 right-0 w-20 h-20 bg-[var(--secondary)]/5 rounded-tl-full" />
          <div className="absolute top-1/2 left-1/4 w-6 h-6 bg-[var(--primary)]/5 rounded-full -translate-y-1/2" />
          <div className="absolute top-1/3 right-1/3 w-8 h-8 bg-[var(--accent)]/5 rounded-full" />
        </div>

        <div className="relative w-full max-w-3xl mx-auto text-center z-10 flex flex-col items-center justify-center">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 text-white leading-tight">Documents & Publications</h1>
          <p className="text-base sm:text-lg md:text-xl text-white/90 font-medium mb-4 px-2 sm:px-0">
            Access official documents, reports, guidelines, and publications from the AGD.
          </p>
          <div className="mt-4 flex justify-center gap-2">
            <div className="h-1 w-8 bg-[var(--accent)] rounded-full" />
            <div className="h-1 w-8 bg-[var(--secondary)] rounded-full" />
            <div className="h-1 w-8 bg-[var(--primary)] rounded-full" />
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-12">
        
        {/* Search and Filter Section */}
        <section className="bg-white rounded-xl shadow-lg p-6 mb-8 border border-gray-100">
          <div className="flex flex-col lg:flex-row gap-6 items-center justify-between">
            <div className="flex-1 w-full lg:max-w-md">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                <input
                  type="text"
                  placeholder="Search documents..."
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--primary)]/50 focus:border-[var(--primary)]"
                />
              </div>
            </div>
            
            <div className="flex flex-wrap gap-2">
              <div className="flex items-center gap-2 mr-4">
                <Filter className="h-5 w-5 text-gray-500" />
                <span className="text-sm font-medium text-gray-700">Filter by:</span>
              </div>
              {categories.slice(0, 5).map((category) => (
                <button
                  key={category}
                  className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                    category === "All"
                      ? "bg-[var(--primary)] text-white"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* Featured Documents */}
        <section className="mb-12">
          <div className="flex items-center gap-4 mb-6">
            <div className="h-8 w-1 bg-[var(--accent)] rounded-full" />
            <h2 className="text-3xl font-bold text-[var(--accent)]">Featured Documents</h2>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {documents.filter(doc => doc.featured).map((document) => (
              <div key={document.id} className="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden hover:shadow-xl transition-shadow">
                <div className="relative h-48 overflow-hidden">
                  <Image
                    src={document.image}
                    alt={document.title}
                    fill
                    className="object-cover hover:scale-105 transition-transform duration-300"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                  />
                  <div className="absolute top-4 left-4">
                    <span className="px-3 py-1 bg-[var(--accent)] text-white text-xs font-medium rounded-full">
                      {document.category}
                    </span>
                  </div>
                  <div className="absolute top-4 right-4">
                    <span className="px-3 py-1 bg-red-500 text-white text-xs font-medium rounded-full">
                      Featured
                    </span>
                  </div>
                  <div className="absolute bottom-4 left-4 right-4">
                    <div className="flex items-center gap-2 text-white text-sm">
                      <File className="h-4 w-4" />
                      {document.fileType} • {document.fileSize}
                    </div>
                  </div>
                </div>
                
                <div className="p-6">
                  <div className="flex items-center gap-4 text-sm text-gray-500 mb-3">
                    <div className="flex items-center gap-1">
                      <Calendar className="h-4 w-4" />
                      {document.date}
                    </div>
                    <div className="flex items-center gap-1">
                      <Download className="h-4 w-4" />
                      {document.downloadCount.toLocaleString()} downloads
                    </div>
                  </div>
                  
                  <h3 className="text-xl font-bold text-gray-800 mb-3 hover:text-[var(--accent)] transition-colors">
                    {document.title}
                  </h3>
                  
                  <p className="text-gray-600 mb-4 line-clamp-3">
                    {document.description}
                  </p>
                  
                  <div className="flex items-center gap-3">
                    <button className="flex items-center gap-2 bg-[var(--primary)] text-white px-4 py-2 rounded-lg font-semibold hover:bg-[var(--primary)]/90 transition-colors">
                      <Download className="h-4 w-4" />
                      Download
                    </button>
                    <button className="flex items-center gap-2 text-[var(--secondary)] font-semibold hover:text-[var(--accent)] transition-colors">
                      <Eye className="h-4 w-4" />
                      Preview
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* All Documents */}
        <section className="mb-12">
          <div className="flex items-center gap-4 mb-6">
            <div className="h-8 w-1 bg-[var(--primary)] rounded-full" />
            <h2 className="text-3xl font-bold text-[var(--accent)]">All Documents</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {documents.map((document) => (
              <div key={document.id} className="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden hover:shadow-xl transition-shadow">
                <div className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="p-3 bg-[var(--secondary)]/10 rounded-lg flex-shrink-0">
                      <FileText className="h-8 w-8 text-[var(--secondary)]" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="px-2 py-1 bg-[var(--accent)]/10 text-[var(--accent)] text-xs font-medium rounded-full">
                          {document.category}
                        </span>
                        {document.featured && (
                          <span className="px-2 py-1 bg-red-100 text-red-800 text-xs font-medium rounded-full">
                            Featured
                          </span>
                        )}
                      </div>
                      
                      <h3 className="text-lg font-bold text-gray-800 mb-2 hover:text-[var(--accent)] transition-colors line-clamp-2">
                        {document.title}
                      </h3>
                      
                      <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                        {document.description}
                      </p>
                      
                      <div className="flex items-center gap-4 text-sm text-gray-500 mb-4">
                        <div className="flex items-center gap-1">
                          <Calendar className="h-4 w-4" />
                          {document.date}
                        </div>
                        <div className="flex items-center gap-1">
                          <File className="h-4 w-4" />
                          {document.fileSize}
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-2">
                        <button className="flex items-center gap-1 bg-[var(--primary)] text-white px-3 py-1 rounded-lg text-sm font-semibold hover:bg-[var(--primary)]/90 transition-colors">
                          <Download className="h-3 w-3" />
                          Download
                        </button>
                        <button className="flex items-center gap-1 text-[var(--secondary)] text-sm font-semibold hover:text-[var(--accent)] transition-colors">
                          <Eye className="h-3 w-3" />
                          Preview
                        </button>
                      </div>
                      
                      <div className="mt-2 text-xs text-gray-400">
                        {document.downloadCount.toLocaleString()} downloads
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Categories Overview */}
        <section className="mb-12">
          <div className="flex items-center gap-4 mb-6">
            <div className="h-8 w-1 bg-[var(--secondary)] rounded-full" />
            <h2 className="text-3xl font-bold text-[var(--accent)]">Browse by Category</h2>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {categories.slice(1).map((category) => (
              <button
                key={category}
                className="bg-white rounded-xl shadow-lg border border-gray-100 p-4 hover:shadow-xl transition-shadow text-center"
              >
                <div className="p-3 bg-[var(--primary)]/10 rounded-lg mx-auto w-fit mb-3">
                  <FileText className="h-6 w-6 text-[var(--primary)]" />
                </div>
                <h3 className="font-semibold text-gray-800 text-sm">{category}</h3>
                <p className="text-xs text-gray-500 mt-1">
                  {documents.filter(doc => doc.category === category).length} documents
                </p>
              </button>
            ))}
          </div>
        </section>

        {/* Pagination */}
        <section className="flex justify-center">
          <div className="flex items-center gap-2">
            <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
              Previous
            </button>
            <button className="px-4 py-2 bg-[var(--primary)] text-white rounded-lg">
              1
            </button>
            <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
              2
            </button>
            <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
              3
            </button>
            <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
              Next
            </button>
          </div>
        </section>
      </div>
    </div>
  );
} 