import { Link } from "@tanstack/react-router";
import { Instagram, Facebook, MapPin, Phone } from "lucide-react";
import { Logo } from "@/components/site/Logo";
import { fullAddress, isConfigured, locationList, siteConfig } from "@/config";
import { telHref } from "@/lib/links";
import { navLinks } from "./Navbar";

export function Footer() {
  const year = new Date().getFullYear();
  const socials = [
    { label: "Instagram", href: siteConfig.social.instagram, Icon: Instagram },
    { label: "Facebook", href: siteConfig.social.facebook, Icon: Facebook },
  ].filter((s) => isConfigured(s.href));

  return (
    <footer className="border-t border-border bg-surface pb-safe-bar">
      <div className="container-site grid gap-10 py-14 md:grid-cols-[1.3fr_1fr_1fr_1fr]">
        <div className="space-y-4">
          <Logo />
          <p className="max-w-xs text-sm leading-relaxed text-muted-foreground">
            Barberia dal {siteConfig.since}. Due sedi in Toscana, un'unica cura per il dettaglio.
          </p>
          {socials.length > 0 && (
            <ul className="flex gap-2">
              {socials.map(({ label, href, Icon }) => (
                <li key={label}>
                  <a
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={label}
                    className="flex size-11 items-center justify-center rounded-full border border-border text-muted-foreground hover:border-gold hover:text-gold"
                  >
                    <Icon className="size-4" aria-hidden="true" />
                  </a>
                </li>
              ))}
            </ul>
          )}
        </div>

        {locationList.map((l) => (
          <div key={l.id}>
            <h3 className="eyebrow mb-4">{l.city}</h3>
            <ul className="space-y-2.5 text-sm text-muted-foreground">
              <li className="flex gap-2">
                <MapPin className="mt-0.5 size-4 shrink-0 text-gold" aria-hidden="true" />
                {fullAddress(l)}
              </li>
              <li className="flex gap-2">
                <Phone className="mt-0.5 size-4 shrink-0 text-gold" aria-hidden="true" />
                <a href={telHref(l.phoneE164)} className="hover:text-gold">
                  {l.phone}
                </a>
              </li>
              {l.hoursLabel.map((h) => (
                <li key={h} className="pl-6 text-xs">
                  {h}
                </li>
              ))}
            </ul>
          </div>
        ))}

        <div>
          <h3 className="eyebrow mb-4">Naviga</h3>
          <ul className="grid grid-cols-2 gap-2 text-sm text-muted-foreground md:grid-cols-1">
            {navLinks.slice(1).map((l) => (
              <li key={l.to}>
                <Link to={l.to} className="hover:text-gold">
                  {l.label}
                </Link>
              </li>
            ))}
            <li>
              <Link to="/login" className="hover:text-gold">
                Area clienti
              </Link>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-border">
        <div className="container-site flex flex-col gap-3 py-5 text-xs text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {year} {siteConfig.name}
            {isConfigured(siteConfig.legal.vatNumber) && ` · P.IVA ${siteConfig.legal.vatNumber}`}
          </p>
          <ul className="flex flex-wrap gap-x-5 gap-y-1">
            <li>
              <Link to="/privacy" className="hover:text-gold">
                Privacy
              </Link>
            </li>
            <li>
              <Link to="/cookie-policy" className="hover:text-gold">
                Cookie
              </Link>
            </li>
            <li>
              <Link to="/termini" className="hover:text-gold">
                Termini
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
}
