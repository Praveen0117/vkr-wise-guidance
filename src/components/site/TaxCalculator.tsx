import { useMemo, useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Calculator } from "lucide-react";

function newRegimeTax(income: number) {
  let i = Math.max(0, income - 75000); // standard deduction
  const slabs = [
    [300000, 0], [700000, 0.05], [1000000, 0.1],
    [1200000, 0.15], [1500000, 0.2], [Infinity, 0.3],
  ] as const;
  let prev = 0, tax = 0;
  for (const [upper, rate] of slabs) {
    if (i <= prev) break;
    const slice = Math.min(i, upper) - prev;
    tax += slice * rate;
    prev = upper;
  }
  // Rebate 87A up to 7L taxable
  if (i <= 700000) tax = 0;
  return Math.round(tax * 1.04); // 4% cess
}

export function TaxCalculator() {
  const [income, setIncome] = useState(1200000);
  const tax = useMemo(() => newRegimeTax(Number(income) || 0), [income]);
  const net = (Number(income) || 0) - tax;
  return (
    <div className="rounded-2xl border border-border bg-card p-6 shadow-[var(--shadow-card)]">
      <div className="flex items-center gap-2">
        <Calculator className="h-5 w-5 text-[color:var(--blue)]" />
        <h3 className="text-lg font-semibold text-[color:var(--navy)]">Income Tax Calculator (New Regime FY 2025-26)</h3>
      </div>
      <div className="mt-5 space-y-3">
        <Label htmlFor="income">Annual Income (₹)</Label>
        <Input id="income" type="number" min={0} value={income} onChange={(e) => setIncome(Number(e.target.value))} />
        <input type="range" min={0} max={5000000} step={50000} value={income} onChange={(e) => setIncome(Number(e.target.value))} className="w-full accent-[color:var(--blue)]" />
      </div>
      <div className="mt-6 grid grid-cols-2 gap-3 text-center">
        <div className="rounded-xl bg-secondary p-4">
          <div className="text-xs uppercase tracking-wider text-muted-foreground">Estimated Tax</div>
          <div className="mt-1 text-2xl font-bold text-[color:var(--navy)]">₹{tax.toLocaleString("en-IN")}</div>
        </div>
        <div className="rounded-xl p-4 text-[color:var(--navy-deep)]" style={{ background: "var(--gradient-gold)" }}>
          <div className="text-xs uppercase tracking-wider opacity-80">Take-home</div>
          <div className="mt-1 text-2xl font-bold">₹{net.toLocaleString("en-IN")}</div>
        </div>
      </div>
      <p className="mt-3 text-xs text-muted-foreground">*Indicative calculation. Consult our experts for exact tax liability.</p>
    </div>
  );
}