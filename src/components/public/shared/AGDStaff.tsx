import { User, Mail, Phone, Building } from 'lucide-react';

interface StaffMember {
  id: number;
  name: string;
  position: string;
  department: string;
  image: string;
  email?: string;
  phone?: string;
}

const staffMembers: StaffMember[] = [
  {
    id: 1,
    name: "Accountant General",
    position: "Accountant General",
    department: "AGD Leadership",
    image: "/images/staff/ag.jpg", // Placeholder - replace with actual image
    email: "ag@agd.gov.mw",
    phone: "+265 1 788 533"
  },
  {
    id: 2,
    name: "Principal Secretary (Finance)",
    position: "Principal Secretary",
    department: "Ministry of Finance",
    image: "/images/staff/ps-finance.jpg", // Placeholder - replace with actual image
    email: "ps.finance@finance.gov.mw"
  },
  {
    id: 3,
    name: "Director of Banking & Asset Management",
    position: "Director",
    department: "Banking & Asset Management",
    image: "/images/staff/director-banking.jpg", // Placeholder - replace with actual image
    email: "director.banking@agd.gov.mw"
  },
  {
    id: 4,
    name: "IFMIS Director",
    position: "Director",
    department: "IFMIS",
    image: "/images/staff/director-ifmis.jpg", // Placeholder - replace with actual image
    email: "director.ifmis@agd.gov.mw"
  },
  {
    id: 5,
    name: "Director of Pay Services",
    position: "Director",
    department: "Pay Services",
    image: "/images/staff/director-pay.jpg", // Placeholder - replace with actual image
    email: "director.pay@agd.gov.mw"
  },
  {
    id: 6,
    name: "Director of Accounting Services",
    position: "Director",
    department: "Accounting Services",
    image: "/images/staff/director-accounting.jpg", // Placeholder - replace with actual image
    email: "director.accounting@agd.gov.mw"
  },
  {
    id: 7,
    name: "Deputy Director of Human Resource",
    position: "Deputy Director",
    department: "Human Resource",
    image: "/images/staff/deputy-director-hr.jpg", // Placeholder - replace with actual image
    email: "deputy.hr@agd.gov.mw"
  }
];

export function AGDStaff() {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center">
        <h2 className="text-3xl font-bold text-[var(--accent)] mb-4">AGD Leadership Team</h2>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Meet the dedicated professionals leading the Accountant General&apos;s Department in delivering 
          excellent financial management services to the people of Malawi.
        </p>
        <div className="flex justify-center gap-2 mt-4">
          <div className="h-1 w-12 bg-[var(--accent)] rounded-full" />
          <div className="h-1 w-12 bg-[var(--secondary)] rounded-full" />
          <div className="h-1 w-12 bg-[var(--primary)] rounded-full" />
        </div>
      </div>

      {/* Staff Grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {staffMembers.map((staff) => (
          <div
            key={staff.id}
            className="bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-100 group"
          >
            {/* Profile Image */}
            <div className="relative h-64 bg-gradient-to-br from-[var(--primary)]/10 to-[var(--secondary)]/10 flex items-center justify-center">
              {/* Placeholder for when actual images are available */}
              <div className="w-24 h-24 bg-[var(--primary)]/20 rounded-full flex items-center justify-center">
                <User className="w-12 h-12 text-[var(--primary)]" />
              </div>
              
              {/* Uncomment when actual staff images are available */}
              {/* <Image
                src={staff.image}
                alt={staff.name}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-300"
              /> */}
              
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </div>

            {/* Staff Information */}
            <div className="p-6 space-y-4">
              <div className="text-center">
                <h3 className="text-xl font-bold text-[var(--accent)] mb-1">{staff.name}</h3>
                <p className="text-[var(--primary)] font-semibold">{staff.position}</p>
                <p className="text-gray-600 text-sm">{staff.department}</p>
              </div>

              {/* Contact Information */}
              <div className="space-y-3 pt-3 border-t border-gray-100">
                {staff.email && (
                  <div className="flex items-center gap-3 text-sm">
                    <div className="w-8 h-8 bg-[var(--primary)]/10 rounded-lg flex items-center justify-center">
                      <Mail className="w-4 h-4 text-[var(--primary)]" />
                    </div>
                    <a
                      href={`mailto:${staff.email}`}
                      className="text-gray-600 hover:text-[var(--primary)] transition-colors duration-200 flex-1 truncate"
                    >
                      {staff.email}
                    </a>
                  </div>
                )}
                
                {staff.phone && (
                  <div className="flex items-center gap-3 text-sm">
                    <div className="w-8 h-8 bg-[var(--secondary)]/10 rounded-lg flex items-center justify-center">
                      <Phone className="w-4 h-4 text-[var(--secondary)]" />
                    </div>
                    <a
                      href={`tel:${staff.phone}`}
                      className="text-gray-600 hover:text-[var(--secondary)] transition-colors duration-200"
                    >
                      {staff.phone}
                    </a>
                  </div>
                )}
                
                <div className="flex items-center gap-3 text-sm">
                  <div className="w-8 h-8 bg-[var(--accent)]/10 rounded-lg flex items-center justify-center">
                    <Building className="w-4 h-4 text-[var(--accent)]" />
                  </div>
                  <span className="text-gray-600">{staff.department}</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Contact Note */}
      <div className="bg-gradient-to-r from-[var(--primary)]/5 to-[var(--secondary)]/5 rounded-xl p-6 text-center border border-gray-100">
        <p className="text-gray-700 leading-relaxed">
          For general inquiries or to schedule appointments with our leadership team, 
          please contact our main office at{' '}
          <a href="tel:+2651788533" className="text-[var(--primary)] font-semibold hover:underline">
            +265 1 788 533
          </a>{' '}
          or email{' '}
          <a href="mailto:ag@agd.gov.mw" className="text-[var(--primary)] font-semibold hover:underline">
            ag@agd.gov.mw
          </a>
        </p>
      </div>
    </div>
  );
} 