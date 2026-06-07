import {
  Receipt, FileText, Building2, ScrollText, Briefcase, ShieldCheck,
  Stamp, Calculator, BookOpen, Scale, Gavel, BadgeCheck, TrendingUp, Landmark,Medal 
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

export type ServiceCategory = {
  slug: string;
  title: string;
  icon: LucideIcon;
  short: string;
  items: string[];
};

export const services: ServiceCategory[] = [
  { slug: "gst", title: "GST Services", icon: Receipt, short: "Registration, returns, audits & notice handling.",
    items: ["GST Registration", "GST Return Filing", "GST Annual Return (GSTR-9 & 9C)", "GST Notice Handling", "LUT Filing", "GST Amendment", "GST Revocation", "E-Invoice & E-Way Bill Support", "GST Audit Support", "GSTR-10 Filing","GST Appellate Tribunal (GSTAT)"] },
  { slug: "income-tax", title: "Income Tax Services", icon: FileText, short: "ITR filing, planning, TDS & notice support.",
    items: ["ITR Filing", "Tax Planning", "TDS Filing", "Advance Tax", "Capital Gain Tax", "Notice Reply Support","Iconme Tax Appellate Tribunal"] },
  { slug: "registration", title: "Business Registration", icon: Building2, short: "Company, LLP, Partnership, NGO & MSME.",
    items: ["Company Registration", "LLP Registration", "Partnership Firm", "Proprietorship", "NGO Registration", "Section 8 Registration", "MSME Registration"] },
  { slug: "roc", title: "ROC & LLP Compliance", icon: ScrollText, short: "Annual filings, KYC, amendments & winding up.",
    items: ["DIN KYC", "DPT-3", "ADT-1", "INC-20A", "LLP Form 11", "Company Compliance", "Director Change", "Share Transfer", "MOA/AOA Amendment", "Winding Up Services"] },
  { slug: "licenses", title: "Licenses & Registrations", icon: BadgeCheck, short: "FSSAI, IEC, Udyam, Startup India & more.",
    items: ["FSSAI", "IEC Registration", "Trade License", "PF & ESI", "Professional Tax", "Startup India", "Udyam Registration", "LEI Code", "ISO Registration","12A and 80G Registration","Darpan Registration","TG RERA Registration for Agents","Digital Signature (DSC)","Labor Certificate Registration","Trust Registration","Socity Registration"] },
  { slug: "trademark", title: "Trademark & IP", icon: Stamp, short: "Trademark, copyright, patent & design.",
    items: ["Trademark Registration", "Trademark Objection", "Trademark Hearing", "Trademark Renewal", "Copyright Registration", "Patent Registration", "Design Registration"] },
  { slug: "accounting", title: "Accounting & Payroll", icon: Calculator, short: "Bookkeeping, payroll & financial statements.",
    items: ["Bookkeeping", "Payroll Processing", "Accounting Outsourcing", "Financial Statements", "Compliance Support"] },
  { slug: "audit", title: "Audit & Assurance", icon: ShieldCheck, short: "Statutory, tax, internal & stock audits.",
    items: ["Tax Audit", "GST Audit", "Internal Audit", "Statutory Audit", "Stock Audit", "Concurrent Audit", "Due Diligence Audit","Inventory Verfication","Bank Audit Support","Financial Audit"] },
  { slug: "nclt", title: "NCLT & Corporate Legal", icon: Gavel, short: "Insolvency, disputes & company revival.",
    items: ["Insolvency Matters", "Shareholder Disputes", "Company Revival", "Corporate Litigation","NCLT Case Filing","Company Law Matters","Oppression & Mismanagement Cases","Insolvency & Bankruptcy Matters (IBC)","Company Winding Up Matters","Shareholder Disputes","Director Disqualification Matters","Revival of Company Petitions","Compounding of Offences","Merger & Amalgamation Matters"] },
  { slug: "legal", title: "Legal Services", icon: Scale, short: "Civil, criminal, property & cyber law.",
    items: ["Civil Litigation", "Criminal Defence", "Matrimonial Disputes", "Property Verification", "Cyber Law", "Arbitration", "Consumer Disputes"] },
  { slug: "ca-certification", title: "CA Certification", icon: BookOpen, short: "Turnover, net worth & VISA certificates.",
    items: ["Turnover Certificate", "Net Worth Certificate", "VISA Financial Certificate", "Valuation Reports"] },
  { slug: "valuation", title: "Valuation Services", icon: TrendingUp, short: "Business, property, share & FEMA valuations.",
    items: ["Business Valuation", "Property Valuation", "Share Valuation", "Startup Valuation", "FEMA Valuation"] },
  { slug: "advisory", title: "Business Advisory", icon: Briefcase, short: "Strategic consulting for growth & compliance.",
    items: ["Business Strategy", "Financial Advisory", "Compliance Advisory", "Investment Planning"] },
  { slug: "secretarial", title: "Secretarial Services", icon: Landmark, short: "End-to-end corporate secretarial support.",
    items: ["Board Meetings", "AGM Compliance", "Minutes & Resolutions", "Statutory Registers"] },
  {
    slug: "income-tax-training",
    title: "Training & Placement",
    icon: Medal,
    short: "Practical tax training with placement support in accounting and compliance roles.",
    items: [
      "Income Tax Return Filing (ITR)",
      "TDS / TCS Compliance",
      "GST Basics & Filing",
      "Tax Audit Procedures",
      "Practical Accounting Software Training (Tally / Excel)",
      "Interview Preparation & Placement Support",
      "CMA Articleship",
      "CA Articleship","Paid Articleship"
    ]
  }
];

export const blogPosts = [
  { slug: "gst-annual-return-2026", title: "GST Annual Return Filing – Key Changes for FY 2025-26", date: "Mar 12, 2026", category: "GST Updates", excerpt: "Latest amendments in GSTR-9 and GSTR-9C, who needs to file, due dates and penalties." },
  { slug: "itr-deductions-guide", title: "ITR Filing 2026: Maximize Your Deductions Legally", date: "Mar 02, 2026", category: "Income Tax", excerpt: "Section 80C, 80D, HRA, NPS — a complete planning guide for salaried & self-employed." },
  { slug: "roc-due-dates", title: "ROC Compliance Calendar – All Due Dates at a Glance", date: "Feb 22, 2026", category: "ROC Compliance", excerpt: "AOC-4, MGT-7, DIR-3 KYC, DPT-3 – never miss a deadline again." },
  { slug: "startup-registration", title: "How to Register a Startup in India in 7 Days", date: "Feb 10, 2026", category: "Startup", excerpt: "Step-by-step process for Pvt Ltd, DPIIT recognition and tax benefits." },
  { slug: "trademark-objection", title: "Received a Trademark Objection? Here's What to Do", date: "Jan 28, 2026", category: "Trademark", excerpt: "Understanding Section 9 & 11 objections and how to respond effectively." },
  { slug: "gst-notice", title: "How to Reply to GST Notices (ASMT-10, DRC-01)", date: "Jan 15, 2026", category: "Legal Advisory", excerpt: "A practical framework to draft accurate replies and avoid demand orders." },
];

export const gstDueDates = [
  { form: "GSTR-1", desc: "Monthly outward supplies", date: "11th of every month" },
  { form: "GSTR-3B", desc: "Monthly summary return", date: "20th of every month" },
  { form: "CMP-08", desc: "Composition scheme payment", date: "18th of next quarter" },
  { form: "GSTR-9", desc: "Annual return", date: "31st December" },
];