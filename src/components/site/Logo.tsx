import { Link } from "@tanstack/react-router";
import { images, siteConfig } from "@/config";
import { cn } from "@/lib/utils";

export function Logo({ className, size = 44 }: { className?: string; size?: number }) {
  return (
    <Link to="/" className={cn("flex items-center gap-3", className)} aria-label={`${siteConfig.name} — Home`}>
      <img
        src={images.logo.src}
        alt=""
        width={size}
        height={size}
        className="rounded-full bg-foreground object-contain p-0.5"
        loading="eager"
      />
      <span className="font-display text-sm font-bold uppercase tracking-[0.22em] leading-none">
        Wave<span className="text-gold">Barbershop</span>
      </span>
    </Link>
  );
}
