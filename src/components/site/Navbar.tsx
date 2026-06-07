import { Link } from "@tanstack/react-router";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";

const navItems = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About" },
  { to: "/services", label: "Services" },
  { to: "/blog", label: "Blog" },
  { to: "/contact", label: "Contact" },
] as const;

export function Navbar() {
  const [open, setOpen] = useState(false);
  return (
    <header className="fixed top-0 z-40 w-full border-b border-border bg-background/85 backdrop-blur supports-[backdrop-filter]:bg-background/70">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link to="/" className="flex items-center gap-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-md" style={{ background: "var(--gradient-gold)" }}>
            <span className="text-sm font-bold text-[color:var(--navy-deep)]">V</span>
          </div>
          <div className="leading-tight">
            <div className="text-sm font-bold tracking-tight text-[color:var(--navy)]">VKRTAX TECH</div>
            <div className="text-[10px] uppercase tracking-widest text-muted-foreground">Private Limited</div>
          </div>
        </Link>
        <nav className="hidden items-center gap-1 md:flex">
          {navItems.map((i) => (
            <Link
              key={i.to}
              to={i.to}
              activeOptions={{ exact: i.to === "/" }}
              className="rounded-md px-3 py-2 text-sm font-medium text-foreground/80 transition-colors hover:bg-secondary hover:text-foreground"
              activeProps={{ className: "text-[color:var(--blue)]" }}
            >
              {i.label}
            </Link>
          ))}
          <Button asChild className="ml-2" style={{ background: "var(--gradient-gold)", color: "var(--navy-deep)" }}>
            <Link to="/contact">Book Consultation</Link>
          </Button>
        </nav>
        <button className="md:hidden" onClick={() => setOpen(!open)} aria-label="Menu">
          {open ? <X /> : <Menu />}
        </button>
      </div>
      {open && (
        <div className="border-t border-border bg-background md:hidden">
          <div className="space-y-1 px-4 py-3">
            {navItems.map((i) => (
              <Link key={i.to} to={i.to} onClick={() => setOpen(false)} className="block rounded-md px-3 py-2 text-sm font-medium hover:bg-secondary">
                {i.label}
              </Link>
            ))}
            <Button asChild className="w-full" style={{ background: "var(--gradient-gold)", color: "var(--navy-deep)" }}>
              <Link to="/contact" onClick={() => setOpen(false)}>Book Consultation</Link>
            </Button>
          </div>
        </div>
      )}
    </header>
  );
}