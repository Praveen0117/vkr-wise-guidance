import { Link } from "@tanstack/react-router";
import { Facebook, Linkedin, Twitter, Instagram, Mail, Phone, MapPin, Youtube } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export function Footer() {
  return (
    <footer className="mt-24 text-[color:var(--primary-foreground)]" style={{ background: "var(--navy-deep)" }}>
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-16 sm:px-6 md:grid-cols-2 lg:grid-cols-4 lg:px-8">
        <div>
          <div className="flex items-center gap-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-md" style={{ background: "var(--gradient-gold)" }}>
              <span className="font-bold text-[color:var(--navy-deep)]">V</span>
            </div>
            <div>
              <div className="text-base font-bold">VKRTAX TECH</div>
              <div className="text-[10px] uppercase tracking-widest opacity-70">Private Limited</div>
            </div>
          </div>
          <p className="mt-4 text-sm opacity-80">
            Complete Tax, Legal & Compliance solutions for businesses and individuals across India.
          </p>
          <div className="mt-5 flex gap-3">
            {[
              { Icon: Facebook, url: "https://www.facebook.com/share/1B8NAKpdw5/" },
              { Icon: Linkedin, url: "https://www.youtube.com/@gsttelugu" },
              { Icon: Twitter, url: "https://www.youtube.com/@gsttelugu" },
              { Icon: Instagram, url: "https://www.instagram.com/krishna_gsttelugu?igsh=aW1rc3dqYXFqanV2" },
              { Icon: Youtube, url: "https://www.youtube.com/@gsttelugu" },
            ].map(({ Icon, url }, i) => (
              <a
                key={i}
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-full border border-white/15 p-2 transition-colors hover:bg-white/10"
                aria-label="social"
              >
                <Icon className="h-4 w-4" />
              </a>
            ))}
          </div>
        </div>

        <div>
          <h4 className="text-sm font-semibold uppercase tracking-wider text-[color:var(--gold)]">Quick Links</h4>
          <ul className="mt-4 space-y-2 text-sm opacity-85">
            <li><Link to="/" className="hover:text-[color:var(--gold)]">Home</Link></li>
            <li><Link to="/about" className="hover:text-[color:var(--gold)]">About</Link></li>
            <li><Link to="/services" className="hover:text-[color:var(--gold)]">Services</Link></li>
            <li><Link to="/blog" className="hover:text-[color:var(--gold)]">Blog</Link></li>
            <li><Link to="/contact" className="hover:text-[color:var(--gold)]">Contact</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="text-sm font-semibold uppercase tracking-wider text-[color:var(--gold)]">Services</h4>
          <ul className="mt-4 space-y-2 text-sm opacity-85">
            <li>GST Services</li>
            <li>Income Tax Filing</li>
            <li>Company Registration</li>
            <li>ROC Compliance</li>
            <li>Trademark Registration</li>
            <li>Audit & Assurance</li>
          </ul>
        </div>

        <div>
          <h4 className="text-sm font-semibold uppercase tracking-wider text-[color:var(--gold)]">Stay Updated</h4>
          <p className="mt-4 text-sm opacity-80">GST due dates, tax updates and legal news in your inbox.</p>
          <form className="mt-4 flex gap-2" onSubmit={(e) => e.preventDefault()}>
            <Input type="email" required placeholder="Your email" className="border-white/20 bg-white/10 text-white placeholder:text-white/50" />
            <Button type="submit" style={{ background: "var(--gradient-gold)", color: "var(--navy-deep)" }}>Join</Button>
          </form>
          <div className="mt-6 space-y-2 text-sm opacity-85">
            <div className="flex items-center gap-2"><Phone className="h-4 w-4 text-[color:var(--gold)]" /> <a href="tel:+918500103363" className="hover:text-[color:var(--gold)]">+91 85001 03363</a></div>
            <div className="flex items-center gap-2"><Phone className="h-4 w-4 text-[color:var(--gold)]" /> <a href="tel:+918688841152" className="hover:text-[color:var(--gold)]">+91 86888 41152</a></div>
            <div className="flex items-center gap-2"><Mail className="h-4 w-4 text-[color:var(--gold)]" /> <a href="mailto:vkrtaxtech@gmail.com" className="hover:text-[color:var(--gold)]">vkrtaxtech@gmail.com</a></div>
            <div className="flex items-start gap-2"><MapPin className="mt-0.5 h-4 w-4 text-[color:var(--gold)]" /> Flat No.301, Sai Asitha Kasturi Residency, H.No.176/C, Vengalrao Nagar, S.R. Nagar, Hyderabad - 500038</div>
          </div>
        </div>
      </div>
      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-2 px-4 py-5 text-xs opacity-70 sm:flex-row sm:px-6 lg:px-8">
          <p>© 2026 VKRTAX TECH PRIVATE LIMITED. All Rights Reserved.</p>
          <p>Professional Tax, Legal & Compliance Consultancy Services.</p>
        </div>
      </div>
    </footer>
  );
}