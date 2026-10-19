import { useState } from "react";

import {
  MONTH_NAMES,
  WEEKDAY_LABELS,
  eventFor,
} from "@/lib/events";

/**
 * Monthly event calendar. Drop `<EventCalendar />` into any route or page:
 * it reads its data from src/lib/events.ts and needs no props.
 */
export function EventCalendar() {
  const now = new Date();
  const [ym, setYm] = useState({ y: now.getFullYear(), m: now.getMonth() });

  const first = new Date(ym.y, ym.m, 1);
  const offset = (first.getDay() + 6) % 7;
  const total = new Date(ym.y, ym.m + 1, 0).getDate();
  const cells: (number | null)[] = [
    ...Array(offset).fill(null),
    ...Array.from({ length: total }, (_, i) => i + 1),
  ];
  while (cells.length % 7) cells.push(null);

  const shift = (n: number) =>
    setYm(({ y, m }) => {
      const d = new Date(y, m + n, 1);
      return { y: d.getFullYear(), m: d.getMonth() };
    });

  return (
    <div>
      <div className="mb-4 flex items-center justify-between">
        <button onClick={() => shift(-1)} className="rounded-full border border-border px-4 py-2 hover:bg-secondary">← Anterior</button>
        <h2 className="font-display text-3xl">{MONTH_NAMES[ym.m]} {ym.y}</h2>
        <button onClick={() => shift(1)} className="rounded-full border border-border px-4 py-2 hover:bg-secondary">Siguiente →</button>
      </div>

      <div className="overflow-x-auto">
        <div className="grid min-w-[720px] grid-cols-7 gap-2">
          {WEEKDAY_LABELS.map((d, i) => (
            <div key={d} className={`py-2 text-center text-xs font-semibold uppercase tracking-widest ${i > 4 ? "text-primary" : "text-muted-foreground"}`}>{d}</div>
          ))}
          {cells.map((day, i) => {
            if (!day) return <div key={i} className="min-h-32 rounded-xl" />;
            const ev = eventFor(new Date(ym.y, ym.m, day));
            const today = day === now.getDate() && ym.m === now.getMonth() && ym.y === now.getFullYear();
            return (
              <div key={i} className={`min-h-32 rounded-xl border bg-card p-2 transition hover:-translate-y-0.5 hover:shadow-lg ${today ? "border-primary ring-2 ring-primary" : "border-border"}`}>
                <div className="text-sm font-bold">{day}</div>
                {ev && (
                  <div className={`mt-2 rounded-lg p-2 text-xs ${ev.kind === "movie" ? "bg-movie text-movie-foreground" : "bg-craft text-craft-foreground"}`}>
                    <div className="font-semibold uppercase tracking-wide opacity-80">{ev.kind === "movie" ? "🎬 Cine" : "♻️ Taller"} · {ev.time}</div>
                    <div className="mt-1 leading-snug">{ev.title}</div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
