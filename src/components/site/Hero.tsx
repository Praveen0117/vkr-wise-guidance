import { Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { ArrowRight, MessageCircle, Phone, ShieldCheck, Sparkles } from "lucide-react";

export function Hero() {
  return (
    <section className="relative overflow-hidden text-white" style={{ background: "var(--gradient-hero)" }}>
      <div className="pointer-events-none absolute inset-0 opacity-20"
        style={{ backgroundImage: "radial-gradient(circle at 20% 20%, rgba(255,215,128,0.4), transparent 40%), radial-gradient(circle at 80% 70%, rgba(120,180,255,0.35), transparent 45%)" }}
      />
      <div className="mx-auto grid max-w-7xl gap-12 px-4 py-20 sm:px-6 lg:grid-cols-2 lg:gap-8 lg:px-8 lg:py-28">
        <div className="relative animate-fade-in">
          <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-3 py-1 text-xs font-medium backdrop-blur">
            <Sparkles className="h-3.5 w-3.5 text-[color:var(--gold)]" />
            Trusted Tax, Legal & Compliance Partner
          </div>
          <h1 className="mt-5 text-4xl font-bold leading-tight tracking-tight sm:text-5xl lg:text-6xl">
            Complete <span className="text-[color:var(--gold)]">Tax & Legal</span> Solutions with Trusted Guidance
          </h1>
          <p className="mt-5 max-w-xl text-base text-white/85 sm:text-lg">
            Complete ROC, GST, Income Tax & Legal Compliance Services Under One Roof — expert consultancy for businesses and individuals across India.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button asChild size="lg" style={{ background: "var(--gradient-gold)", color: "var(--navy-deep)" }}>
              <Link to="/contact">Book Consultation <ArrowRight className="h-4 w-4" /></Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="border-white/30 bg-white/5 text-white hover:bg-white/15 hover:text-white">
              <Link to="/contact"><Phone className="h-4 w-4" /> Contact Us</Link>
            </Button>
            <Button asChild size="lg" className="bg-[#25D366] text-white hover:bg-[#1ebe57]">
              <a href="https://wa.me/919876543210" target="_blank" rel="noopener noreferrer"><MessageCircle className="h-4 w-4" /> WhatsApp Chat</a>
            </Button>
          </div>
          <div className="mt-10 grid grid-cols-3 gap-4 border-t border-white/10 pt-6 text-center">
            {[["15+", "Years Experience"], ["2,500+", "Happy Clients"], ["50+", "Service Areas"]].map(([n, l]) => (
              <div key={l}>
                <div className="text-2xl font-bold text-[color:var(--gold)] sm:text-3xl">{n}</div>
                <div className="text-xs uppercase tracking-wider text-white/70">{l}</div>
              </div>
            ))}
          </div>
        </div>
        <div className="relative hidden lg:block">
          <div className="absolute -inset-4 rounded-3xl bg-white/5 blur-2xl" />
          <div className="relative rounded-2xl border border-white/15 bg-white/5 p-6 backdrop-blur-xl shadow-2xl">
            <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-[color:var(--gold)]">
              <ShieldCheck className="h-4 w-4" /> Compliance Snapshot
            </div>
            <div className="mt-4 grid grid-cols-2 gap-3">
              {[
                { k: "GST Filing", v: "On Time", c: "var(--gold)" },
                { k: "ROC Filing", v: "Active", c: "#7be3a5" },
                { k: "ITR Status", v: "Filed", c: "#7bc6ff" },
                { k: "Audit", v: "Scheduled", c: "var(--gold)" },
              ].map((i) => (
                <div key={i.k} className="rounded-xl border border-white/10 bg-white/5 p-4">
                  <div className="text-xs text-white/70">{i.k}</div>
                  <div className="mt-1 text-lg font-semibold" style={{ color: i.c as string }}>{i.v}</div>
                </div>
              ))}
            </div>
            <div className="mt-5 rounded-xl bg-white/10 p-4">
              <div className="flex items-center justify-between text-xs text-white/70"><span>Next Due</span><span>GSTR-3B</span></div>
              <div className="mt-1 text-lg font-semibold">20th of this month</div>
              <div className="mt-3 h-2 w-full rounded-full bg-white/10">
                <div className="h-2 rounded-full" style={{ width: "65%", background: "var(--gradient-gold)" }} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}