import { SectionHeading } from "./SectionHeading";
import { GraduationCap, Briefcase, User } from "lucide-react";

type Member = {
  name: string;
  role: string;
  quals: string;
  experience: string;
  image?: string;
  bio: string;
  initials: string;
};

const founder: Member = {
  name: "Vattikulla Krishna Rao",
  role: "Founder & CEO",
  quals: "M.Com, LL.B, MBA, (CA, CMA, CS)",
  experience: "14+ Years",
  image: "/TeamImg/Krishna Rao.png",
  initials: "VK",
  bio: "A multi-disciplinary professional qualified in M.Com, LL.B and MBA with advanced studies in CA, CMA and CS, Vattikulla Krishna Rao brings 14+ years of leadership in Direct & Indirect Taxation, GST, Income Tax, International Taxation, Corporate Law, Statutory & Internal Audit, Company Incorporation, ROC compliance, FEMA, and Business Advisory. As Founder & CEO of VKRTAX TECH, he has guided 500+ businesses, startups, MSMEs, HNIs and salaried professionals across India through complex tax planning, GST litigation, departmental representations, fundraising and corporate restructuring. Known for combining sharp legal insight with practical business strategy, he is a trusted advisor for end-to-end tax, legal and financial solutions — committed to integrity, accuracy and long-term client growth.",
};

const team: Member[] = [
  {
    name: "Polam Reddy Koti Reddy",
    role: "Senior Partner – Audit & Corporate Compliance",
    quals: "B.Com, CA, CS, FCMA",
    experience: "10+ Years",
    image: "/TeamImg/KOTI (1).jpeg",
    initials: "PK",
    bio: "Triple-qualified professional specialising in Statutory Audit, Cost Audit, Company Law, ROC compliance and corporate restructuring for SMEs and listed entities.",
  },
  {
    name: "Sreenu Bathula",
    role: "Senior Partner – Audit & TAX Export",
    quals: "CA, CMA",
    experience: "5+ Years",
    image: "/TeamImg/SRINU.jpeg",
    initials: "SB",
    bio: "Expertise in Statutory Audit, Tax Audit, Internal Audit and Management Reporting with a strong focus on cost optimisation and process controls.",
  },
  {
    name: "Maheswara Reddy",
    role: "Associate – Costing & MIS",
    quals: "B.Com, CMA",
    experience: "6+ Years",
    image: "/TeamImg/MAHESH.jpeg",
    initials: "MR",
    bio: "Specialist in Cost Accounting, Budgeting, MIS reporting and financial analytics — helping businesses make data-driven decisions.",
  },
  {
    name: "Kallutla Hussain Vali",
    role: "Associate – Direct Tax & Audit",
    quals: "B.Com, FCA",
    experience: "8+ Years",
    image: "/TeamImg/Basha.jpeg",
    initials: "KH",
    bio: "Fellow Chartered Accountant with strong expertise in Income Tax assessments, Tax Audit, GST advisory and representation before tax authorities.",
  },
  {
    name: "V. Venkata Reddy",
    role: "Associate – Corporate Secretarial",
    quals: "CMA, CS",
    experience: "5+ Years",
    image: "/TeamImg/venkata reddy cma.jpeg",
    initials: "VR",
    bio: "Handles ROC filings, secretarial compliance, board governance and FEMA matters for private limited companies and LLPs.",
  },
  {
    name: "Preetham Mandal",
    role: "Senior Partner – TAX Export & Advisory",
    quals: "FCA",
    experience: "15+ Years",
    initials: "PM",
    bio: "Seasoned Fellow Chartered Accountant with 15+ years across Statutory Audit, Due Diligence, Valuations and Business Advisory for mid-market clients.",
  },
  {
    name: "Ashok Kumar Reddy",
    role: "Associate – Corporate & Legal",
    quals: "CS, (CA, LL.B)",
    experience: "6+ Years",
    image: "/TeamImg/ASHOK.jpeg",
    initials: "AK",
    bio: "Company Secretary with legal acumen — handles corporate law, secretarial audit, drafting of agreements and NCLT matters.",
  },
  {
    name: "Vidyadhar Penumala",
    role: "Legal Advisor – Supreme Court of India",
    quals: "Supreme Court Advocate",
    experience: "6+ Years",
    image: "/TeamImg/vidydhar.png",
    initials: "VP",
    bio: "Practising Advocate at the Supreme Court of India. Specialises in tax litigation, civil & corporate matters and constitutional law representation.",
  },
];

function Avatar({ m, className }: { m: Member; className?: string }) {
  if (m.image) {
    return (
      <img
        src={m.image}
        alt={`${m.name} – ${m.role}`}
        loading="lazy"
        decoding="async"
        width={400}
        height={400}
        className={className ?? "h-full w-full object-cover object-center transition-transform duration-500 group-hover:scale-105"}
      />
    );
  }
  return (
    <div className="flex h-full w-full items-center justify-center bg-[color:var(--navy)] text-4xl font-bold tracking-wide text-white">
      {m.initials}
    </div>
  );
}

export function TeamSection() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
      <SectionHeading
        center
        eyebrow="Leadership & Team"
        title="Meet the experts behind VKRTAX TECH"
        subtitle="A multi-disciplinary team of Chartered Accountants, Cost Accountants, Company Secretaries and Advocates serving clients across India."
      />

      {/* Founder — compact two-column card */}
      <div className="mt-12 overflow-hidden rounded-2xl shadow-[var(--shadow-elegant)]" style={{ background: "var(--gradient-hero)" }}>
        <div className="flex flex-col sm:flex-row">
          {/* Image — fixed height, doesn't stretch vertically */}
          <div className="h-64 w-full shrink-0 overflow-hidden sm:h-auto sm:w-56 md:w-64">
            <img
              src={founder.image}
              alt={`${founder.name} – ${founder.role}`}
              loading="eager"
              decoding="async"
              fetchPriority="high"
              width={400}
              height={500}
              className="h-full w-full object-cover object-center"
            />
          </div>
          {/* Content */}
          <div className="flex flex-col justify-center gap-3 p-6 text-white sm:p-8">
            <span
              className="w-fit rounded-full px-3 py-1 text-xs font-semibold text-[color:var(--navy-deep)]"
              style={{ background: "var(--gradient-gold)" }}
            >
              Founder & CEO
            </span>
            <div>
              <h3 className="text-xl font-bold sm:text-2xl">{founder.name}</h3>
              <p className="mt-0.5 text-xs text-[color:var(--gold)]">{founder.quals}</p>
            </div>
            <div className="flex flex-wrap gap-2">
              <span className="inline-flex items-center gap-1 rounded-full bg-white/10 px-2.5 py-1 text-[11px]">
                <GraduationCap className="h-3 w-3" /> {founder.quals}
              </span>
              <span className="inline-flex items-center gap-1 rounded-full bg-white/10 px-2.5 py-1 text-[11px]">
                <Briefcase className="h-3 w-3" /> {founder.experience}
              </span>
            </div>
            <p className="text-xs leading-relaxed text-white/80 sm:text-sm">{founder.bio}</p>
          </div>
        </div>
      </div>

      {/* Team grid */}
      <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {team.map((m) => (
          <article
            key={m.name}
            className="group overflow-hidden rounded-xl border border-border bg-card shadow-[var(--shadow-card)] transition-shadow duration-300 hover:shadow-[var(--shadow-elegant)]"
          >
            {/* Gold top accent */}
            <div className="h-1 w-full" style={{ background: "var(--gradient-gold)" }} />
            {/* Square image */}
            <div className="aspect-square w-full overflow-hidden bg-secondary">
              <Avatar m={m} />
            </div>
            <div className="p-4">
              <h3 className="text-sm font-bold leading-tight text-[color:var(--navy)]">{m.name}</h3>
              <p className="mt-0.5 text-[11px] font-medium text-[color:var(--blue)]">{m.role}</p>
              <div className="mt-2 flex flex-wrap gap-1.5">
                <span className="inline-flex items-center gap-1 rounded-full bg-secondary px-2 py-0.5 text-[10px] font-medium text-[color:var(--navy)]">
                  <GraduationCap className="h-2.5 w-2.5" /> {m.quals}
                </span>
                <span className="inline-flex items-center gap-1 rounded-full bg-[color:var(--gold)]/15 px-2 py-0.5 text-[10px] font-medium text-[color:var(--gold-deep)]">
                  <Briefcase className="h-2.5 w-2.5" /> {m.experience}
                </span>
              </div>
              <p className="mt-2 text-[11px] leading-relaxed text-muted-foreground">{m.bio}</p>
            </div>
          </article>
        ))}
      </div>

      <p className="mt-8 flex items-center justify-center gap-2 text-sm text-muted-foreground">
        <User className="h-4 w-4" /> Backed by 25+ associates across accounting, GST, compliance and documentation.
      </p>
    </section>
  );
}