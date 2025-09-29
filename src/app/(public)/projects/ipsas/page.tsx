import { CheckCircle2, FileText, Layers, LineChart, ListChecks, Map, Target } from "lucide-react";

// Hero background
const heroImageUrl = "/hero/6.JPG";

export default function IPSASProjectPage() {
  return (
    <div className="bg-white">
      {/* Hero Section */}
      <div className="relative min-h-[240px] flex items-center justify-center overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${heroImageUrl})` }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-[var(--primary)]/80 to-[var(--secondary)]/80" />
        </div>

        <div className="relative container mx-auto px-4 text-center z-10">
          <div className="max-w-3xl mx-auto">
            <h1 className="text-4xl font-bold mb-4 text-white">IPSAS Project</h1>
            <p className="text-white/90 text-lg">
              Malawi is transitioning to full adoption of accrual-based IPSAS in stages to
              strengthen transparency, accountability, and decision-making in public financial
              management.
            </p>
            <div className="mt-6 flex justify-center gap-2">
              <div className="h-1 w-12 bg-[var(--accent)] rounded-full" />
              <div className="h-1 w-12 bg-[var(--secondary)] rounded-full" />
              <div className="h-1 w-12 bg-[var(--primary)] rounded-full" />
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        {/* Intro */}
        <section className="bg-white rounded-xl shadow-xl p-8 mb-10 border border-gray-100">
          <div className="flex items-start gap-4 mb-4">
            <Target className="h-6 w-6 text-[var(--accent)]" />
            <div>
              <h2 className="text-2xl font-bold text-[var(--accent)]">Project Overview</h2>
              <p className="text-gray-700 mt-2 leading-relaxed">
                Malawi adopted cash-based IPSAS in 2011 under the Public Finance Management Act.
                The country is now working towards full adoption of accrual-based IPSAS through a
                phased roadmap, improving how public finances are recorded, managed, and reported.
              </p>
            </div>
          </div>
        </section>

        {/* Roadmap */}
        <section className="bg-white rounded-xl shadow-xl p-8 mb-10 border border-gray-100">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <Map className="h-5 w-5 text-[var(--secondary)]" />
              <h3 className="text-xl font-semibold text-[var(--secondary)]">IPSAS Implementation Roadmap</h3>
            </div>
          </div>

          <div className="relative">
            {/* stylized progress line */}
            <div className="absolute left-0 right-0 top-6 h-1 bg-gradient-to-r from-[var(--primary)]/30 via-[var(--secondary)]/30 to-[var(--accent)]/30 rounded-full" />

            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4 relative">
              <div className="bg-gray-50 border rounded-lg p-5 shadow-sm">
                <div className="flex items-center gap-2 mb-2">
                  <div className="h-3 w-3 rounded-full bg-[var(--primary)]" />
                  <span className="text-xs uppercase tracking-wide text-gray-500">Stage 1</span>
                </div>
                <div className="font-semibold">IPSAS Cash-Up</div>
                <div className="text-sm text-gray-600">Completed by 2018</div>
              </div>

              <div className="bg-gray-50 border rounded-lg p-5 shadow-sm">
                <div className="flex items-center gap-2 mb-2">
                  <div className="h-3 w-3 rounded-full bg-[var(--secondary)]" />
                  <span className="text-xs uppercase tracking-wide text-gray-500">Stage 2</span>
                </div>
                <div className="font-semibold">Incorporating Financial Assets & Liabilities</div>
                <div className="text-sm text-gray-600">2019 – 2024</div>
              </div>

              <div className="bg-gray-50 border rounded-lg p-5 shadow-sm">
                <div className="flex items-center gap-2 mb-2">
                  <div className="h-3 w-3 rounded-full bg-[var(--accent)]" />
                  <span className="text-xs uppercase tracking-wide text-gray-500">Stage 3</span>
                </div>
                <div className="font-semibold">Simplified Accrual Accounting</div>
                <div className="text-sm text-gray-600">2024 – 2026</div>
              </div>

              <div className="bg-gray-50 border rounded-lg p-5 shadow-sm">
                <div className="flex items-center gap-2 mb-2">
                  <div className="h-3 w-3 rounded-full bg-[var(--primary)]" />
                  <span className="text-xs uppercase tracking-wide text-gray-500">Stage 4</span>
                </div>
                <div className="font-semibold">Full Accrual</div>
                <div className="text-sm text-gray-600">2026 – 2027</div>
              </div>
            </div>
          </div>
        </section>

        {/* Stage 3 Statements */}
        <section className="bg-white rounded-xl shadow-xl p-8 mb-10 border border-gray-100">
          <div className="flex items-center gap-3 mb-6">
            <FileText className="h-5 w-5 text-[var(--primary)]" />
            <h3 className="text-xl font-semibold text-[var(--primary)]">Composition of Financial Statements at Stage 3 (Simplified Accrual)</h3>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h4 className="font-semibold mb-2">Reports and Disclosures</h4>
              <ul className="list-disc pl-5 space-y-1 text-gray-700">
                <li>Supreme Audit Institution’s Opinion on Fair Presentation</li>
                <li>Financial Statement Discussion and Analysis</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-2">Financial Statements</h4>
              <ul className="list-disc pl-5 space-y-1 text-gray-700">
                <li>Statement of Financial Position</li>
                <li>Statement of Financial Performance</li>
                <li>Statement of Changes in Net Assets/Equity</li>
                <li>Comparative Statement of Budget and Actual Amounts</li>
                <li>Statement of Cash Flows</li>
                <li>Notes and Accounting Policies to the Financial Statements</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Benefits */}
        <section className="bg-white rounded-xl shadow-xl p-8 border border-gray-100">
          <div className="flex items-center gap-3 mb-6">
            <Layers className="h-5 w-5 text-[var(--accent)]" />
            <h3 className="text-xl font-semibold text-[var(--accent)]">Key Benefits Cited</h3>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            {[
              "Better transparency and accountability",
              "Improved financial management information for decision-making",
              "Improved comparability across MDAs, over time, and with other countries",
              "Better management of government assets",
              "Better decision-making",
              "Performance measurement",
              "Sustainability",
              "Donor confidence",
            ].map((item, idx) => (
              <div key={idx} className="flex items-start gap-3 bg-gray-50 border rounded-lg p-4">
                <CheckCircle2 className="h-5 w-5 text-[var(--primary)] mt-0.5" />
                <p className="text-gray-700">{item}</p>
              </div>
            ))}
          </div>

          <div className="mt-6 flex items-center gap-2 text-sm text-gray-600">
            <LineChart className="h-4 w-4 text-[var(--secondary)]" />
            <span>
              The IPSAS project advances credible reporting and strengthens Malawi’s public
              financial management framework.
            </span>
          </div>
        </section>
      </div>
    </div>
  );
}


