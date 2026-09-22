import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface Props {
  eyebrow?: string;
  title: ReactNode;
  description?: ReactNode;
  align?: "left" | "center";
  className?: string;
  as?: "h1" | "h2";
}

export function SectionHeading({ eyebrow, title, description, align = "left", className, as: Tag = "h2" }: Props) {
  return (
    <div className={cn("max-w-2xl", align === "center" && "mx-auto text-center", className)}>
      {eyebrow && <p className="eyebrow mb-3">{eyebrow}</p>}
      <Tag className={cn("font-display font-semibold leading-[1.1]", Tag === "h1" ? "text-4xl sm:text-5xl lg:text-6xl" : "text-3xl sm:text-4xl")}>
        {title}
      </Tag>
      <div className={cn("gold-rule mt-5", align === "center" && "mx-auto")} aria-hidden="true" />
      {description && <p className="mt-5 text-base leading-relaxed text-muted-foreground sm:text-lg">{description}</p>}
    </div>
  );
}
