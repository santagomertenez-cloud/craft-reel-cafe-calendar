import { createFileRoute } from "@tanstack/react-router";

import { EventCalendar } from "@/components/event-calendar";

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

function Index() {
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

        <EventCalendar />
      </div>
    </main>
  );
}
