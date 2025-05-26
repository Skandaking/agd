import { cn } from "@/lib/utils";

const logoImageUrl = "/logo.png"; // Assuming logo is in public/assets/

interface DepartmentProps {
  title: string;
  units?: string[];
  borderColorClass?: string; // Changed from color to borderColorClass for clarity
}

const ArrowDown = ({ className = "" }) => (
  <svg
    className={cn("w-5 h-10 text-gray-400", className)} // Default muted color for connectors
    viewBox="0 0 24 48"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M12 2 V38 M12 38 L6 30 M12 38 L18 30" // Slightly narrower arrow head
      stroke="currentColor"
      strokeWidth="2.5" // Slightly thicker stroke for visibility
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const HorizontalLine = ({ width = "w-full" }) => (
  <div className={cn("h-0.5 bg-gray-400", width)} /> // Muted color for line
);

// Updated DepartmentCard to use borderColorClass for the left border
const DepartmentCard = ({
  title,
  units = [],
  borderColorClass = "border-l-[var(--secondary)]", // Default to secondary color (assuming yellowish/orange)
}: DepartmentProps) => (
  <div className="flex flex-col gap-2.5 w-full h-full"> {/* Ensure cards can grow to fill height if needed */}
    {/* Department Title Card */}
    <div
      className={cn(
        "border border-gray-300 bg-white p-3 rounded-md shadow-sm",
        "border-l-4", // Prominent left border
        borderColorClass
      )}
    >
      <h3 className="text-sm font-semibold text-gray-700 text-left">{title}</h3>
    </div>
    {/* Unit Cards */}
    {units.map((unit, index) => (
      <div
        key={index}
        className={cn(
          "border border-gray-200 bg-white p-2.5 rounded-md shadow-xs text-xs text-gray-600",
          "border-l-4", // Prominent left border for units too
          borderColorClass, // Match department color
          "text-left"
        )}
      >
        {unit}
      </div>
    ))}
  </div>
);

export default function OrganizationStructurePage() {
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
      borderColorClass: "border-l-[var(--secondary)]", // Explicitly using secondary,
    },
    {
      title: "IFMIS",
      units: [
        "IFMIS Application Services",
        "Information Systems",
        "Systems and Database Unit",
        "ICT Infrastructure",
      ],
      borderColorClass: "border-l-[var(--secondary)]",
    },
    {
      title: "Pay Services",
      units: ["Pensions", "Losses and Compensation", "Salaries"],
      borderColorClass: "border-l-[var(--secondary)]",
    },
    {
      title: "Accounting Services",
      units: [
        "Front Office",
        "Pre-Audit",
        "Central Payment Office",
        "Reporting",
      ],
      borderColorClass: "border-l-[var(--secondary)]",
    },
    {
      title: "Administration",
      units: ["Procurement", "Planning", "Support Services"],
      borderColorClass: "border-l-[var(--secondary)]",
    },
    {
      title: "Human Resource",
      units: ["Registry", "Confidential Registry", "Training"],
      borderColorClass: "border-l-[var(--secondary)]",
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
        <div className="bg-white rounded-xl shadow-2xl p-4 sm:p-6 md:p-10">
          <div className="flex flex-col items-center text-center w-full">
            {/* Accountant General */}
            <div className="mb-2">
              <div className="inline-block border-2 border-[var(--accent)] bg-white p-3 rounded-md shadow-md w-60 sm:w-72">
                <h2 className="font-semibold text-base sm:text-lg text-[var(--accent)]">
                  Accountant General
                </h2>
              </div>
            </div>
            <ArrowDown className="mx-auto text-gray-500" />

            {/* Principal Secretary (Finance) */}
            <div className="my-2">
              <div className="inline-block border-2 border-[var(--primary)] bg-white p-3 rounded-md shadow-md w-60 sm:w-72">
                <h2 className="font-semibold text-base sm:text-lg text-[var(--primary)]">
                  Principal Secretary (Finance)
                </h2>
              </div>
            </div>
            <ArrowDown className="mx-auto text-gray-500" />

            {/* Main Horizontal Line for Departments */}
            <HorizontalLine width="w-full max-w-5xl mx-auto my-4" />

            {/* Departments Container - Flex row with horizontal scrolling */} 
            <div className="w-full overflow-x-auto pb-4">
              <div className="flex flex-row justify-start sm:justify-center items-start gap-x-4 md:gap-x-5 lg:gap-x-6 pt-2" style={{ minWidth: `${departments.length * 200}px` }}> {/* Heuristic min-width */} 
                {departments.map((dept, index) => (
                  <div key={index} className="flex flex-col items-center flex-shrink-0 pt-0" style={{ width: '180px' }}> {/* Consistent width for department columns */}
                    <ArrowDown className="h-8 mb-0 text-gray-500 transform scale-90" /> {/* Arrow from H-line to card */}
                    <DepartmentCard
                      title={dept.title}
                      units={dept.units}
                      borderColorClass={dept.borderColorClass} 
                    />
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
} 