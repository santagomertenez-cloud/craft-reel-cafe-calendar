import { useState } from "react";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  MONTH_NAMES,
  WEEKDAY_LABELS,
  eventFor,
  formatDuration,
  type CalendarEvent,
} from "@/lib/events";

/**
 * Monthly event calendar. Drop `<EventCalendar />` into any route or page:
 * it reads its data from src/lib/events.ts and needs no props.
 * Clicking a day with an event opens a detail dialog.
 */
export function EventCalendar() {
  const now = new Date();
  const [ym, setYm] = useState({ y: now.getFullYear(), m: now.getMonth() });
  const [selected, setSelected] = useState<{ date: Date; ev: CalendarEvent } | null>(null);

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
            const date = new Date(ym.y, ym.m, day);
            const ev = eventFor(date);
            const today = day === now.getDate() && ym.m === now.getMonth() && ym.y === now.getFullYear();
            const cls = `min-h-32 rounded-xl border bg-card p-2 text-left transition ${today ? "border-primary ring-2 ring-primary" : "border-border"}`;
            if (!ev) {
              return (
                <div key={i} className={cls}>
                  <div className="text-sm font-bold">{day}</div>
                </div>
              );
            }
            return (
              <button key={i} type="button" onClick={() => setSelected({ date, ev })} className={`${cls} cursor-pointer hover:-translate-y-0.5 hover:shadow-lg`}>
                <div className="text-sm font-bold">{day}</div>
                <div className={`mt-2 rounded-lg p-2 text-xs ${ev.kind === "movie" ? "bg-movie text-movie-foreground" : "bg-craft text-craft-foreground"}`}>
                  <div className="font-semibold uppercase tracking-wide opacity-80">{ev.kind === "movie" ? "🎬 Cine" : "♻️ Taller"} · {ev.time}</div>
                  <div className="mt-1 leading-snug">{ev.title}</div>
                  <div className="mt-1 opacity-80">⏱ {formatDuration(ev.durationMin)}</div>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      <Dialog open={!!selected} onOpenChange={(o) => !o && setSelected(null)}>
        <DialogContent>
          {selected && (
            <>
              <DialogHeader>
                <p className="text-xs uppercase tracking-widest text-primary">
                  {selected.ev.kind === "movie" ? "🎬 Proyección" : "♻️ Taller de reciclaje"} ·{" "}
                  {selected.date.toLocaleDateString("es-AR", { weekday: "long", day: "numeric", month: "long" })}
                </p>
                <DialogTitle className="font-display text-2xl">{selected.ev.title}</DialogTitle>
                <DialogDescription>
                  {selected.ev.kind === "movie" ? selected.ev.movie.synopsis : selected.ev.workshop.description}
                </DialogDescription>
              </DialogHeader>
              <dl className="grid grid-cols-2 gap-3 text-sm">
                <div><dt className="text-muted-foreground">Horario</dt><dd className="font-semibold">{selected.ev.time}</dd></div>
                <div><dt className="text-muted-foreground">Duración</dt><dd className="font-semibold">{formatDuration(selected.ev.durationMin)}</dd></div>
                {selected.ev.kind === "movie" ? (
                  <>
                    <div><dt className="text-muted-foreground">Director</dt><dd className="font-semibold">{selected.ev.movie.director}</dd></div>
                    <div><dt className="text-muted-foreground">Año</dt><dd className="font-semibold">{selected.ev.movie.year}</dd></div>
                  </>
                ) : (
                  <div className="col-span-2"><dt className="text-muted-foreground">Materiales</dt><dd className="font-semibold">{selected.ev.workshop.materials.join(", ")}</dd></div>
                )}
              </dl>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
