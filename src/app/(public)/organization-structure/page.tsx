import { cn } from "@/lib/utils";


const logoImageUrl = "/logo.png";

interface DepartmentProps {
  title: string;
  units?: string[];
  color?: string; // Will use project theme colors
}

const ArrowDown = ({ className = "" }) => (
  <svg
    className={cn("w-6 h-12 text-[var(--primary)]", className)} // Using primary color for arrows
    viewBox="0 0 24 48"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M12 2 V38 M12 38 L4 30 M12 38 L20 30"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const HorizontalLine = ({ width = "w-full" }) => (
  <div className={cn("h-0.5 bg-gray-300", width)} /> // Slightly thicker line
);

const DepartmentCard = ({
  title,
  units = [],
  color = "before:bg-[var(--primary)]", // Default to primary color
}: DepartmentProps) => (
  <div className="flex flex-col gap-3 h-full">
    <div
      className={cn(
        "border border-gray-300 p-4 rounded-lg relative shadow-sm hover:shadow-md transition-shadow",
        "before:absolute before:left-0 before:top-0 before:bottom-0",
        "before:w-1.5", // Slightly thicker color bar
        color
      )}
    >
      <h3 className="text-md font-semibold text-gray-800">{title}</h3>
    </div>
    {units.length > 0 && (
      <div className="space-y-2 pl-3 border-l-2 border-gray-200 ml-2">
        {units.map((unit, index) => (
          <div
            key={index}
            className={cn(
              "border border-gray-200 p-2.5 rounded-md text-sm text-gray-600 bg-gray-50/50 shadow-xs hover:bg-gray-100 transition-colors"
            )}
          >
            {unit}
          </div>
        ))}
      </div>
    )}
  </div>
);

export default function OrganizationStructurePage() {
  // Department colors will cycle through primary, secondary, accent for variety
  const departmentColors = [
    "before:bg-[var(--primary)]",
    "before:bg-[var(--secondary)]",
    "before:bg-[var(--accent)]",
  ];

  const departments: DepartmentProps[] = [
    {
      title: "Banking & Asset Management",
      units: [
        "Revenue",
        "Banking",
        "Asset Management",
        "Inventory Unit",
        "Funding Unit",
        "Treasury Clearing Unit",
      ],
    },
    {
      title: "IFMIS",
      units: [
        "IFMIS Application Services",
        "Information Systems",
        "Systems and Database Unit",
        "ICT Infrastructure",
      ],
    },
    {
      title: "Pay Services",
      units: ["Pensions", "Losses and Compensation", "Salaries"],
    },
    {
      title: "Accounting Services",
      units: [
        "Front Office",
        "Pre-Audit",
        "Central Payment Office",
        "Reporting",
      ],
    },
    {
      title: "Administration",
      units: ["Procurement", "Planning", "Support Services"],
    },
    {
      title: "Human Resource",
      units: ["Registry", "Confidential Registry", "Training"],
    },
  ];

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Hero Section */}
      <div className="relative bg-white shadow-lg">
        {/* Background Pattern */}
        <div className="absolute inset-0 overflow-hidden opacity-50">
          <div className="absolute inset-y-0 right-0 w-1/2 bg-[var(--secondary)]/10" />
          <div className="absolute top-0 right-0 w-96 h-96 -translate-y-1/2 translate-x-1/2">
            <div className="absolute inset-0 rotate-45 transform origin-center scale-150 bg-[var(--accent)]/10" />
          </div>
          <div className="absolute bottom-0 left-0 w-96 h-96 translate-y-1/2 -translate-x-1/2">
            <div className="absolute inset-0 rotate-45 transform origin-center scale-150 bg-[var(--primary)]/5" />
          </div>
        </div>

        <div className="relative container mx-auto px-4 py-20">
          <div className="max-w-5xl mx-auto">
            <div className="flex flex-col md:flex-row items-center gap-12">
              {/* Text Content */}
              <div className="flex-1 text-center md:text-left">
                <div className="inline-block">
                  <h1 className="text-5xl font-bold text-[var(--primary)] mb-4">
                    Organizational Structure
                  </h1>
                  <div className="flex gap-2.5 mb-8">
                    <div className="h-1.5 w-24 bg-[var(--accent)] rounded-full" />
                    <div className="h-1.5 w-16 bg-[var(--secondary)] rounded-full" />
                    <div className="h-1.5 w-10 bg-[var(--primary)] rounded-full" />
                  </div>
                </div>
                <p className="text-gray-700 text-lg leading-relaxed mb-8">
                  Explore the hierarchical structure of the Accountant General&apos;s
                  Department, showcasing our organizational framework and
                  departmental divisions.
                </p>
              </div>

              {/* Logo Section */}
              <div className="flex-1 flex justify-center md:justify-end">
                <div className="relative">
                  {/* Background decorative elements */}
                  <div className="absolute inset-0 -left-5 -right-5 -top-5 -bottom-5">
                    <div className="absolute inset-0 bg-[var(--secondary)]/10 rounded-full animate-pulse" />
                    <div
                      className="absolute inset-4 bg-[var(--accent)]/10 rounded-full animate-pulse"
                      style={{ animationDelay: "0.2s" }}
                    />
                  </div>

                  {/* Logo */}
                  <div className="relative bg-white p-4 rounded-full shadow-2xl">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={logoImageUrl}
                      alt="AGD Logo"
                      className="w-40 h-40 object-contain"
                    />
                    <div className="absolute -bottom-3 left-1/2 transform -translate-x-1/2">
                      <div className="flex gap-1.5">
                        <div className="h-1 w-10 bg-[var(--accent)] rounded-full" />
                        <div className="h-1 w-8 bg-[var(--secondary)] rounded-full" />
                        <div className="h-1 w-5 bg-[var(--primary)] rounded-full" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Navigation Breadcrumb - Simplified, assuming this is a top-level page under About */}
            <div className="mt-12 flex items-center justify-center md:justify-start gap-2 text-sm text-gray-500">
              <span>About</span>
              <svg
                className="w-4 h-4 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
              <span className="text-[var(--primary)] font-medium">
                Organization Structure
              </span>
            </div>
          </div>
        </div>

        {/* Bottom Wave */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg
            className="w-full h-16 fill-gray-100 transform translate-y-px"
            viewBox="0 0 1200 120"
            preserveAspectRatio="none"
          >
            <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z" />
          </svg>
        </div>
      </div>

      {/* Main Chart Content */}
      <div className="container mx-auto px-4 py-16">
        <div className="bg-white rounded-xl shadow-2xl p-6 sm:p-8 md:p-12">
          <div className="flex flex-col items-center text-center">
            {/* Accountant General */}
            <div className="mb-6">
              <div className="inline-block border-2 border-[var(--accent)] bg-[var(--accent)]/5 p-4 rounded-lg shadow-lg w-72">
                <h2 className="font-bold text-xl text-[var(--accent)]">
                  Accountant General
                </h2>
              </div>
              <ArrowDown className="mx-auto mt-2" />
            </div>

            {/* Horizontal Line connecting to Principal Secretary (Finance) if needed, or directly to departments */}
            {/* This example connects AG directly to Deputy AGs / Directors based on common structures */}
            <HorizontalLine width="w-1/2 sm:w-1/3 md:w-1/4 mx-auto mb-6" />
            
            {/* Departments Grid */}
            {/* Grid layout will be responsive. For 6 departments, it might be 1, 2, or 3 columns depending on screen size */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12 w-full max-w-6xl">
              {departments.map((dept, index) => (
                <div key={index} className="flex flex-col items-center">
                  {/* Arrow from horizontal line to each department card */}
                  <div className="w-px h-8 bg-gray-300" /> 
                  <ArrowDown className="h-8 mb-1" /> 
                  <DepartmentCard
                    title={dept.title}
                    units={dept.units}
                    color={departmentColors[index % departmentColors.length]} // Cycle through defined colors
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 