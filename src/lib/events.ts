// ============= Calendar data & logic =============
// Edit this file to change the event schedule. No UI lives here.

export type EventKind = "craft" | "movie";
export type CalendarEvent = { kind: EventKind; title: string; time: string };

export const WEEKDAY_LABELS = ["Lun", "Mar", "Mié", "Jue", "Vie", "Sáb", "Dom"] as const;

export const MONTH_NAMES = [
  "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
  "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre",
] as const;

/**
 * Craft workshops (manualidades con material reciclado) keyed by weekday,
 * 0 = Lunes ... 6 = Domingo. Add a weekday here to schedule workshops on it.
 */
export const CRAFT_WORKSHOPS: Record<number, string[]> = {
  0: ["Macetas con botellas PET", "Organizadores de cartón", "Lámparas de frascos"],
  2: ["Bolsas con remeras viejas", "Juguetes con tapitas", "Cuadernos de papel reutilizado"],
  4: ["Portavelas de latas", "Mosaicos con vidrio", "Bijouterie con cápsulas y alambre"],
};

export const CRAFT_TIME = "17:30";

export const MOVIES = [
  "Wall·E", "El viaje de Chihiro", "Amélie", "La invención de Hugo", "Big Fish",
  "Paddington", "Coco", "Ratatouille", "El gran hotel Budapest", "Mi vecino Totoro",
];

/** Movie screening times keyed by weekday, 5 = Sábado, 6 = Domingo. */
export const MOVIE_TIMES: Record<number, string> = {
  5: "20:00",
  6: "18:00",
};

/** Returns the event scheduled for a given date, or null on free days. */
export function eventFor(date: Date): CalendarEvent | null {
  const weekday = (date.getDay() + 6) % 7; // 0 = Lunes
  const movieTime = MOVIE_TIMES[weekday];
  if (movieTime) {
    return {
      kind: "movie",
      title: MOVIES[(date.getDate() + weekday) % MOVIES.length]!,
      time: movieTime,
    };
  }
  const list = CRAFT_WORKSHOPS[weekday];
  if (list) {
    return { kind: "craft", title: list[date.getDate() % list.length]!, time: CRAFT_TIME };
  }
  return null;
}
