import { SectionHeading } from "./SectionHeading";
import { GraduationCap, Briefcase, User } from "lucide-react";
import krishna from "@/assets/team/krishna-rao.png.asset.json";
import koti from "@/assets/team/koti.jpg.asset.json";
import srinu from "@/assets/team/srinu.jpg.asset.json";
import mahesh from "@/assets/team/mahesh.jpg.asset.json";
import venkata from "@/assets/team/venkata-reddy.jpg.asset.json";
import ashok from "@/assets/team/ashok.jpg.asset.json";
import vidyadhar from "@/assets/team/vidyadhar.png.asset.json";
import hussain from "@/assets/team/hussain.jpg.asset.json";

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
  image: krishna.url,
  initials: "VK",
  bio: "A multi-disciplinary professional qualified in M.Com, LL.B and MBA with advanced studies in CA, CMA and CS, Vattikulla Krishna Rao brings 14+ years of leadership in Direct & Indirect Taxation, GST, Income Tax, International Taxation, Corporate Law, Statutory & Internal Audit, Company Incorporation, ROC compliance, FEMA, and Business Advisory. As Founder & CEO of VKRTAX TECH, he has guided 500+ businesses, startups, MSMEs, HNIs and salaried professionals across India through complex tax planning, GST litigation, departmental representations, fundraising and corporate restructuring. Known for combining sharp legal insight with practical business strategy, he is a trusted advisor for end-to-end tax, legal and financial solutions — committed to integrity, accuracy and long-term client growth.",
};

const team: Member[] = [
  {
    name: "Polam Reddy Koti Reddy",
    role: "Senior Partner – Audit & Corporate Compliance",
    quals: "B.Com, CA, CS, FCMA",
    experience: "10+ Years",
    image: koti.url,
    initials: "PK",
    bio: "Triple-qualified professional specialising in Statutory Audit, Cost Audit, Company Law, ROC compliance and corporate restructuring for SMEs and listed entities.",
  },
  {
    name: "Sreenu Bathula",
    role: "Manager – Audit & Assurance",
    quals: "CA, CMA",
    experience: "5+ Years",
    image: srinu.url,
    initials: "SB",
    bio: "Expertise in Statutory Audit, Tax Audit, Internal Audit and Management Reporting with a strong focus on cost optimisation and process controls.",
  },
  {
    name: "Maheswara Reddy",
    role: "Manager – Costing & MIS",
    quals: "B.Com, CMA",
    experience: "6+ Years",
    image: mahesh.url,
    initials: "MR",
    bio: "Specialist in Cost Accounting, Budgeting, MIS reporting and financial analytics — helping businesses make data-driven decisions.",
  },
  {
    name: "Kallutla Hussain Vali",
    role: "Partner – Direct Tax & Audit",
    quals: "B.Com, FCA",
    experience: "8+ Years",
    image: hussain.url,
    initials: "KH",
    bio: "Fellow Chartered Accountant with strong expertise in Income Tax assessments, Tax Audit, GST advisory and representation before tax authorities.",
  },
  {
    name: "V. Venkata Reddy",
    role: "Associate – Corporate Secretarial",
    quals: "CMA, CS",
    experience: "5+ Years",
    image: venkata.url,
    initials: "VR",
    bio: "Handles ROC filings, secretarial compliance, board governance and FEMA matters for private limited companies and LLPs.",
  },
  {
    name: "Preetham Mandal",
    role: "Senior Partner – Assurance & Advisory",
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
    image: ashok.url,
    initials: "AK",
    bio: "Company Secretary with legal acumen — handles corporate law, secretarial audit, drafting of agreements and NCLT matters.",
  },
  {
    name: "Vidyadhar Penumala",
    role: "Legal Advisor – Supreme Court of India",
    quals: "Supreme Court Advocate",
    experience: "6+ Years",
    image: vidyadhar.url,
    initials: "VP",
    bio: "Practising Advocate at the Supreme Court of India. Specialises in tax litigation, civil & corporate matters and constitutional law representation.",
  },
];

function Avatar({ m }: { m: Member }) {
  if (m.image) {
    return (
      <img
        src={m.image}
        alt={`${m.name} – ${m.role}`}
        loading="lazy"
        decoding="async"
        width={400}
        height={500}
        className="h-full w-full object-cover"
      />
    );
  }
  return (
    <div className="flex h-full w-full items-center justify-center bg-[color:var(--navy)] text-3xl font-bold text-white">
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

      {/* Founder */}
      <div className="mt-12 overflow-hidden rounded-3xl shadow-[var(--shadow-elegant)]" style={{ background: "var(--gradient-hero)" }}>
        <div className="grid gap-0 md:grid-cols-5">
          <div className="md:col-span-2">
            <div className="aspect-[4/5] w-full overflow-hidden bg-white/10">
              <img src={founder.image} alt={`${founder.name} – ${founder.role}`} loading="eager" decoding="async" fetchPriority="high" width={600} height={750} className="h-full w-full object-cover" />
            </div>
          </div>
          <div className="p-8 text-white md:col-span-3 md:p-10">
            <span className="inline-block rounded-full px-3 py-1 text-xs font-semibold text-[color:var(--navy-deep)]" style={{ background: "var(--gradient-gold)" }}>
              Founder & CEO
            </span>
            <h3 className="mt-4 text-3xl font-bold">{founder.name}</h3>
            <p className="mt-1 text-sm text-[color:var(--gold)]">{founder.quals}</p>
            <div className="mt-3 flex flex-wrap gap-2">
              <span className="inline-flex items-center gap-1 rounded-full bg-white/10 px-3 py-1 text-xs"><GraduationCap className="h-3.5 w-3.5" /> {founder.quals}</span>
              <span className="inline-flex items-center gap-1 rounded-full bg-white/10 px-3 py-1 text-xs"><Briefcase className="h-3.5 w-3.5" /> {founder.experience}</span>
            </div>
            <p className="mt-5 text-sm leading-relaxed text-white/85">{founder.bio}</p>
          </div>
        </div>
      </div>

      {/* Team grid */}
      <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {team.map((m) => (
          <article key={m.name} className="group overflow-hidden rounded-2xl border border-border bg-card shadow-[var(--shadow-card)] transition hover:shadow-[var(--shadow-elegant)]">
            <div className="aspect-[4/5] w-full overflow-hidden bg-secondary">
              <Avatar m={m} />
            </div>
            <div className="p-5">
              <h3 className="text-base font-bold text-[color:var(--navy)]">{m.name}</h3>
              <p className="text-sm text-[color:var(--blue)]">{m.role}</p>
              <div className="mt-3 flex flex-wrap gap-2">
                <span className="inline-flex items-center gap-1 rounded-full bg-secondary px-2.5 py-1 text-[11px] font-medium text-[color:var(--navy)]">
                  <GraduationCap className="h-3 w-3" /> {m.quals}
                </span>
                <span className="inline-flex items-center gap-1 rounded-full bg-[color:var(--gold)]/15 px-2.5 py-1 text-[11px] font-medium text-[color:var(--gold-deep)]">
                  <Briefcase className="h-3 w-3" /> {m.experience}
                </span>
              </div>
              <p className="mt-3 text-xs leading-relaxed text-muted-foreground">{m.bio}</p>
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