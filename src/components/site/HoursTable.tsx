import type { Location } from "@/config";
import { dayName, formatDayHours, weekOrder } from "@/lib/hours";
import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";

export function HoursTable({ location, className }: { location: Location; className?: string }) {
  const [today, setToday] = useState<number | null>(null);
  useEffect(() => {
    const wd = new Intl.DateTimeFormat("en-US", { timeZone: "Europe/Rome", weekday: "short" }).format(new Date());
    setToday(["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].indexOf(wd));
  }, []);

  return (
    <table className={cn("w-full text-sm", className)}>
      <caption className="sr-only">Orari di apertura {location.name}</caption>
      <tbody>
        {weekOrder.map((d) => {
          const h = location.hours.find((x) => x.day === d)!;
          const isToday = today === d;
          return (
            <tr key={d} className={cn("border-b border-border/60 last:border-0", isToday && "text-gold")}>
              <th scope="row" className="py-2.5 text-left font-medium">
                {dayName(d)}
                {isToday && <span className="ml-2 text-[10px] uppercase tracking-widest">oggi</span>}
              </th>
              <td className={cn("py-2.5 text-right tabular-nums", !h.open && !isToday && "text-muted-foreground")}>
                {formatDayHours(h)}
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}
