import { format, differenceInDays } from "date-fns";

export interface GstDueDate {
  form: string;
  desc: string;
  nextDue: Date;
  nextDueLabel: string;
  daysLeft: number;
  isUrgent: boolean;
  isOverdue: boolean;
}

function nextMonthlyDue(dayOfMonth: number, today: Date): Date {
  if (today.getDate() >= dayOfMonth) {
    return new Date(today.getFullYear(), today.getMonth() + 1, dayOfMonth);
  }
  return new Date(today.getFullYear(), today.getMonth(), dayOfMonth);
}

function nextQuarterlyDue(today: Date): Date {
  // CMP-08: 18th of month after quarter end
  // Quarters end: Mar, Jun, Sep, Dec → due Apr 18, Jul 18, Oct 18, Jan 18
  const candidateDates = [
    new Date(today.getFullYear(), 0, 18),  // Jan 18
    new Date(today.getFullYear(), 3, 18),  // Apr 18
    new Date(today.getFullYear(), 6, 18),  // Jul 18
    new Date(today.getFullYear(), 9, 18),  // Oct 18
    new Date(today.getFullYear() + 1, 0, 18), // Jan 18 next year
  ];
  return candidateDates.find((d) => differenceInDays(d, today) >= 0) ?? candidateDates[candidateDates.length - 1];
}

function nextAnnualDue(today: Date): Date {
  const thisYearDec31 = new Date(today.getFullYear(), 11, 31);
  if (differenceInDays(thisYearDec31, today) >= 0) return thisYearDec31;
  return new Date(today.getFullYear() + 1, 11, 31);
}

export function computeGstDueDates(today: Date = new Date()): GstDueDate[] {
  const forms = [
    { form: "GSTR-1", desc: "Monthly outward supplies", getNext: () => nextMonthlyDue(11, today) },
    { form: "GSTR-3B", desc: "Monthly summary return", getNext: () => nextMonthlyDue(20, today) },
    { form: "CMP-08", desc: "Composition scheme payment", getNext: () => nextQuarterlyDue(today) },
    { form: "GSTR-9", desc: "Annual return", getNext: () => nextAnnualDue(today) },
  ];

  return forms.map(({ form, desc, getNext }) => {
    const nextDue = getNext();
    const daysLeft = differenceInDays(nextDue, today);
    return {
      form,
      desc,
      nextDue,
      nextDueLabel: format(nextDue, "d MMM yyyy"),
      daysLeft,
      isUrgent: daysLeft <= 7 && daysLeft >= 0,
      isOverdue: daysLeft < 0,
    };
  });
}

export function computeGstr3bSnapshot(today: Date = new Date()): {
  dueLabel: string;
  progressPct: number;
  daysLeft: number;
} {
  // Billing period: 21st of prev month → 20th of current month
  // After the 20th, period shifts to 21st this month → 20th next month
  const dayOfMonth = today.getDate();

  let periodStart: Date;
  let periodEnd: Date;

  if (dayOfMonth <= 20) {
    periodStart = new Date(today.getFullYear(), today.getMonth() - 1, 21);
    periodEnd = new Date(today.getFullYear(), today.getMonth(), 20);
  } else {
    periodStart = new Date(today.getFullYear(), today.getMonth(), 21);
    periodEnd = new Date(today.getFullYear(), today.getMonth() + 1, 20);
  }

  const totalDays = differenceInDays(periodEnd, periodStart);
  const elapsed = differenceInDays(today, periodStart);
  const progressPct = Math.min(100, Math.max(2, Math.round((elapsed / totalDays) * 100)));
  const daysLeft = differenceInDays(periodEnd, today);

  return {
    dueLabel: format(periodEnd, "do 'of' MMMM"),
    progressPct,
    daysLeft,
  };
}

export function todayLabel(): string {
  return format(new Date(), "d MMM yyyy");
}

export interface ImportantDate {
  id: string;
  category: "GST" | "Income Tax";
  title: string;
  subtitle: string;
  details: [string, string, string]; // [who, penalty, note]
  dueDateLabel: string;
  daysLeft: number;
  isUrgent: boolean;
}

function nextFixedDate(month: number, day: number, today: Date): Date {
  const candidate = new Date(today.getFullYear(), month, day);
  if (differenceInDays(candidate, today) >= 0) return candidate;
  return new Date(today.getFullYear() + 1, month, day);
}

type RawEntry = {
  id: string;
  category: ImportantDate["category"];
  title: string;
  subtitle: string;
  details: [string, string, string];
  due: Date;
};

export function computeAllImportantDates(today: Date = new Date()): ImportantDate[] {
  const raw: RawEntry[] = [
    // ── GST ──────────────────────────────────────────────────────────────────
    {
      id: "gstr1", category: "GST", title: "GSTR-1",
      subtitle: "Monthly outward supplies statement",
      details: [
        "All regular GST-registered taxpayers (monthly filers)",
        "Late fee ₹50/day (₹20 for nil return), max ₹5,000",
        "Declare all sales invoices, debit/credit notes & exports",
      ],
      due: nextMonthlyDue(11, today),
    },
    {
      id: "gstr3b", category: "GST", title: "GSTR-3B",
      subtitle: "Monthly summary return & tax payment",
      details: [
        "All regular GST-registered taxpayers",
        "Late fee ₹50/day + 18% interest p.a. on unpaid tax",
        "Pay net GST liability & claim eligible ITC before filing",
      ],
      due: nextMonthlyDue(20, today),
    },
    {
      id: "gstr9", category: "GST", title: "GSTR-9",
      subtitle: "Annual GST return for regular taxpayers",
      details: [
        "Regular taxpayers with annual turnover > ₹2 crore",
        "Late fee ₹200/day (₹100 CGST + ₹100 SGST), max 0.25% of turnover",
        "Reconcile all monthly/quarterly returns for the full financial year",
      ],
      due: nextAnnualDue(today),
    },

    // ── Income Tax — Advance Tax ──────────────────────────────────────────────
    {
      id: "adv-q1", category: "Income Tax", title: "Advance Tax — Q1",
      subtitle: "Pay 15% of estimated annual tax liability",
      details: [
        "Taxpayers with total tax liability exceeding ₹10,000 in a year",
        "Interest @ 1% per month u/s 234C for shortfall in instalment",
        "Estimate total income for FY; senior citizens without business income are exempt",
      ],
      due: nextFixedDate(5, 15, today),
    },
    {
      id: "adv-q2", category: "Income Tax", title: "Advance Tax — Q2",
      subtitle: "Cumulative 45% of estimated annual tax",
      details: [
        "All assessees liable to pay advance tax",
        "Interest @ 1% per month u/s 234C on shortfall from 45%",
        "Revise estimate based on actual income earned Apr–Sep",
      ],
      due: nextFixedDate(8, 15, today),
    },
    {
      id: "adv-q3", category: "Income Tax", title: "Advance Tax — Q3",
      subtitle: "Cumulative 75% of estimated annual tax",
      details: [
        "All assessees liable to pay advance tax",
        "Interest @ 1% per month u/s 234C on shortfall from 75%",
        "Revise estimate if actual income differs from projections",
      ],
      due: nextFixedDate(11, 15, today),
    },
    {
      id: "adv-q4", category: "Income Tax", title: "Advance Tax — Q4",
      subtitle: "100% of total annual tax liability",
      details: [
        "All taxpayers; senior citizens (no business income) are exempt",
        "Interest u/s 234B (1%/month) if less than 90% paid by Mar 31",
        "Final instalment — any balance carried over attracts interest till payment",
      ],
      due: nextFixedDate(2, 15, today),
    },

    // ── Income Tax — ITR Filing ───────────────────────────────────────────────
    {
      id: "itr-na", category: "Income Tax", title: "ITR Filing",
      subtitle: "Individuals, HUF & non-audit entities",
      details: [
        "Individuals, HUF, partnership firms not subject to tax audit",
        "Late fee up to ₹5,000 u/s 234F (₹1,000 if income ≤ ₹5 lakh)",
        "Mandatory for income > basic exemption limit; carry-forward of losses allowed only if filed on time",
      ],
      due: nextFixedDate(6, 31, today),
    },
    {
      id: "itr-au", category: "Income Tax", title: "ITR — Audit Cases",
      subtitle: "Companies, LLPs & tax-audit-required assesses",
      details: [
        "Companies, LLPs, firms & professionals with high turnover (tax audit u/s 44AB)",
        "Late fee ₹5,000 u/s 234F + disallowance of deductions",
        "Tax Audit Report (Form 3CD) must be filed before submitting ITR",
      ],
      due: nextFixedDate(9, 31, today),
    },

    // ── Income Tax — TDS Returns ──────────────────────────────────────────────
    {
      id: "tds-q1", category: "Income Tax", title: "TDS Return — Q1",
      subtitle: "TDS deductions for Apr–Jun quarter",
      details: [
        "All deductors: employers, companies, banks & individuals (if applicable)",
        "Late fee ₹200/day u/s 234E (min ₹10,000) + penalty u/s 271H",
        "File Form 24Q (salary) / 26Q (non-salary) / 27Q (foreign payments)",
      ],
      due: nextFixedDate(6, 31, today),
    },
    {
      id: "tds-q2", category: "Income Tax", title: "TDS Return — Q2",
      subtitle: "TDS deductions for Jul–Sep quarter",
      details: [
        "All tax deductors registered with TRACES",
        "Late fee ₹200/day u/s 234E; interest on late deposit @ 1.5%/month",
        "Ensure TDS challans (OLTAS) are correctly mapped before filing",
      ],
      due: nextFixedDate(9, 31, today),
    },
    {
      id: "tds-q3", category: "Income Tax", title: "TDS Return — Q3",
      subtitle: "TDS deductions for Oct–Dec quarter",
      details: [
        "All tax deductors registered with TRACES",
        "Late fee ₹200/day u/s 234E + possible prosecution for habitual default",
        "PAN of deductees must be validated; wrong PAN attracts 20% TDS rate",
      ],
      due: nextFixedDate(0, 31, today),
    },
    {
      id: "tds-q4", category: "Income Tax", title: "TDS Return — Q4",
      subtitle: "TDS deductions for Jan–Mar quarter",
      details: [
        "All tax deductors; also triggers issuance of Form 16 / 16A to deductees",
        "Late fee ₹200/day u/s 234E; Form 16 must be issued by 15 Jun",
        "Reconcile with books of accounts before filing to avoid mismatches",
      ],
      due: nextFixedDate(4, 31, today),
    },
  ];

  return raw
    .map((r) => ({
      id: r.id,
      category: r.category,
      title: r.title,
      subtitle: r.subtitle,
      details: r.details,
      dueDateLabel: format(r.due, "d MMM yyyy"),
      daysLeft: differenceInDays(r.due, today),
      isUrgent: differenceInDays(r.due, today) <= 7,
    }))
    .filter((r) => r.daysLeft >= 0)
    .sort((a, b) => a.daysLeft - b.daysLeft)
    .slice(0, 10);
}
