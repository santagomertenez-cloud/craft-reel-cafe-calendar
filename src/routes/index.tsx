import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Agenda de eventos — Café Reciclado" },
      { name: "description", content: "Calendario mensual: talleres de manualidades con material reciclado y cine los fines de semana." },
      { property: "og:title", content: "Agenda de eventos — Café Reciclado" },
      { property: "og:description", content: "Talleres de reciclaje entre semana y proyecciones de películas sábados y domingos." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: Index,
});

const DAYS = ["Lun", "Mar", "Mié", "Jue", "Vie", "Sáb", "Dom"];
const MONTHS = ["Enero","Febrero","Marzo","Abril","Mayo","Junio","Julio","Agosto","Septiembre","Octubre","Noviembre","Diciembre"];

const CRAFTS: Record<number, string[]> = {
  1: ["Macetas con botellas PET", "Organizadores de cartón", "Lámparas de frascos"],
  3: ["Bolsas con remeras viejas", "Juguetes con tapitas", "Cuadernos de papel reutilizado"],
  5: ["Portavelas de latas", "Mosaicos con vidrio", "Bijouterie con cápsulas y alambre"],
};
const MOVIES = ["Wall·E", "El viaje de Chihiro", "Amélie", "La invención de Hugo", "Big Fish", "Paddington", "Coco", "Ratatouille", "El gran hotel Budapest", "Mi vecino Totoro"];

type Ev = { kind: "craft" | "movie"; title: string; time: string };

function eventFor(date: Date): Ev | null {
  const wd = (date.getDay() + 6) % 7; // 0=Lun
  const d = date.getDate();
  if (wd === 5 || wd === 6) return { kind: "movie", title: MOVIES[(d + wd) % MOVIES.length], time: wd === 5 ? "20:00" : "18:00" };
  const list = CRAFTS[wd + 1 === 1 ? 1 : wd === 2 ? 3 : wd === 4 ? 5 : 0];
  if (list) return { kind: "craft", title: list[d % list.length], time: "17:30" };
  return null;
}

function Index() {
  const now = new Date();
  const [ym, setYm] = useState({ y: now.getFullYear(), m: now.getMonth() });
  const first = new Date(ym.y, ym.m, 1);
  const offset = (first.getDay() + 6) % 7;
  const total = new Date(ym.y, ym.m + 1, 0).getDate();
  const cells: (number | null)[] = [...Array(offset).fill(null), ...Array.from({ length: total }, (_, i) => i + 1)];
  while (cells.length % 7) cells.push(null);
  const shift = (n: number) => setYm(({ y, m }) => { const d = new Date(y, m + n, 1); return { y: d.getFullYear(), m: d.getMonth() }; });

  return (
    <main className="min-h-screen bg-background px-4 py-10 text-foreground">
      <div className="mx-auto max-w-6xl">
        <header className="mb-8 text-center">
          <p className="text-sm uppercase tracking-[0.3em] text-primary">Café Reciclado</p>
          <h1 className="font-display mt-2 text-5xl md:text-6xl">Agenda de eventos</h1>
          <div className="mt-6 flex flex-wrap justify-center gap-4 text-sm">
            <span className="flex items-center gap-2"><span className="h-3 w-3 rounded-full bg-craft" />Manualidades con reciclaje · Lun, Mié, Vie</span>
            <span className="flex items-center gap-2"><span className="h-3 w-3 rounded-full bg-movie" />Cine · Sáb y Dom</span>
          </div>
        </header>

        <div className="mb-4 flex items-center justify-between">
          <button onClick={() => shift(-1)} className="rounded-full border border-border px-4 py-2 hover:bg-secondary">← Anterior</button>
          <h2 className="font-display text-3xl">{MONTHS[ym.m]} {ym.y}</h2>
          <button onClick={() => shift(1)} className="rounded-full border border-border px-4 py-2 hover:bg-secondary">Siguiente →</button>
        </div>

        <div className="overflow-x-auto">
          <div className="grid min-w-[720px] grid-cols-7 gap-2">
            {DAYS.map((d, i) => (
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
    </main>
  );
}
