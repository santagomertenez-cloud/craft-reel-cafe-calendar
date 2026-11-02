// ============= Calendar data & logic =============
// Edit this file to change the event schedule. No UI lives here.

export type EventKind = "craft" | "movie";

export type MovieInfo = {
  title: string;
  year: number;
  director: string;
  durationMin: number;
  synopsis: string;
};

export type WorkshopInfo = {
  title: string;
  durationMin: number;
  description: string;
  materials: string[];
};

export type CalendarEvent =
  | { kind: "movie"; title: string; time: string; durationMin: number; movie: MovieInfo }
  | { kind: "craft"; title: string; time: string; durationMin: number; workshop: WorkshopInfo };

export const WEEKDAY_LABELS = ["Lun", "Mar", "Mié", "Jue", "Vie", "Sáb", "Dom"] as const;

export const MONTH_NAMES = [
  "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
  "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre",
] as const;

const w = (title: string, durationMin: number, description: string, materials: string[]): WorkshopInfo => ({
  title, durationMin, description, materials,
});

/**
 * Craft workshops (manualidades con material reciclado) keyed by weekday,
 * 0 = Lunes ... 6 = Domingo. Add a weekday here to schedule workshops on it.
 */
export const CRAFT_WORKSHOPS: Record<number, WorkshopInfo[]> = {
  0: [
    w("Macetas con botellas PET", 90, "Cortamos y decoramos botellas para crear macetas colgantes.", ["Botellas PET", "Pintura acrílica", "Cuerda"]),
    w("Organizadores de cartón", 120, "Armamos organizadores de escritorio con cajas y tubos de cartón.", ["Cajas de cartón", "Tubos de papel", "Cola vinílica"]),
    w("Lámparas de frascos", 120, "Transformamos frascos de vidrio en lámparas con luces LED.", ["Frascos de vidrio", "Guirnalda LED", "Alambre"]),
  ],
  2: [
    w("Bolsas con remeras viejas", 60, "Convertimos remeras en bolsas reutilizables sin coser.", ["Remeras viejas", "Tijera"]),
    w("Juguetes con tapitas", 90, "Creamos juguetes y juegos de mesa con tapitas plásticas.", ["Tapitas", "Cartón", "Marcadores"]),
    w("Cuadernos de papel reutilizado", 90, "Encuadernamos cuadernos con hojas usadas de un solo lado.", ["Papel usado", "Hilo", "Cartón"]),
  ],
  4: [
    w("Portavelas de latas", 60, "Perforamos latas para crear portavelas con diseños de luz.", ["Latas", "Clavos", "Velas"]),
    w("Mosaicos con vidrio", 150, "Armamos mosaicos decorativos con restos de vidrio y azulejos.", ["Vidrio", "Azulejos", "Pastina"]),
    w("Bijouterie con cápsulas y alambre", 90, "Diseñamos aros y colgantes con cápsulas de café y alambre.", ["Cápsulas", "Alambre", "Pinzas"]),
  ],
};

export const CRAFT_TIME = "17:30";

const m = (title: string, year: number, director: string, durationMin: number, synopsis: string): MovieInfo => ({
  title, year, director, durationMin, synopsis,
});

export const MOVIES: MovieInfo[] = [
  m("Wall·E", 2008, "Andrew Stanton", 98, "Un pequeño robot limpia una Tierra abandonada hasta que un encuentro cambia su destino."),
  m("El viaje de Chihiro", 2001, "Hayao Miyazaki", 125, "Una niña queda atrapada en un mundo de espíritus y debe trabajar para salvar a sus padres."),
  m("Amélie", 2001, "Jean-Pierre Jeunet", 122, "Una joven parisina decide cambiar en secreto la vida de quienes la rodean."),
  m("La invención de Hugo", 2011, "Martin Scorsese", 126, "Un huérfano que vive en una estación de tren descubre un misterio ligado al cine."),
  m("Big Fish", 2003, "Tim Burton", 125, "Un hijo intenta separar la verdad de las fantásticas historias de su padre."),
  m("Paddington", 2014, "Paul King", 95, "Un oso peruano llega a Londres en busca de un nuevo hogar."),
  m("Coco", 2017, "Lee Unkrich", 105, "Miguel viaja a la Tierra de los Muertos para descubrir la historia de su familia."),
  m("Ratatouille", 2007, "Brad Bird", 111, "Una rata con talento culinario sueña con ser chef en París."),
  m("El gran hotel Budapest", 2014, "Wes Anderson", 99, "Las aventuras de un conserje legendario y su joven botones."),
  m("Mi vecino Totoro", 1988, "Hayao Miyazaki", 86, "Dos hermanas descubren criaturas mágicas en el bosque junto a su nueva casa."),
  m("Buscando a Nemo", 2003, "Andrew Stanton", 100, "Un pez payaso cruza el océano para rescatar a su hijo."),
  m("Los Increíbles", 2004, "Brad Bird", 115, "Una familia de superhéroes retirados vuelve a la acción."),
  m("El castillo ambulante", 2004, "Hayao Miyazaki", 119, "Una joven hechizada encuentra refugio en el castillo móvil de un mago."),
  m("Pequeña Miss Sunshine", 2006, "Jonathan Dayton y Valerie Faris", 101, "Una familia caótica viaja en una vieja combi hacia un concurso infantil."),
  m("Shrek", 2001, "Andrew Adamson y Vicky Jenson", 90, "Un ogro gruñón emprende un viaje para rescatar a una princesa."),
  m("Up", 2009, "Pete Docter", 96, "Un anciano ata globos a su casa para cumplir el sueño de su vida."),
  m("Juno", 2007, "Jason Reitman", 96, "Una adolescente ingeniosa enfrenta un embarazo inesperado."),
  m("Escuela de rock", 2003, "Richard Linklater", 109, "Un músico fracasado forma una banda con sus alumnos de primaria."),
  m("Eterno resplandor de una mente sin recuerdos", 2004, "Michel Gondry", 108, "Una pareja se somete a un procedimiento para borrarse mutuamente de la memoria."),
  m("Ponyo", 2008, "Hayao Miyazaki", 101, "Una pececita quiere convertirse en humana tras conocer a un niño."),
  m("El laberinto del fauno", 2006, "Guillermo del Toro", 118, "En la España de posguerra, una niña descubre un mundo mágico y peligroso."),
  m("Monsters, Inc.", 2001, "Pete Docter", 92, "Dos monstruos descubren que los niños no son tan peligrosos como creían."),
  m("Lost in Translation", 2003, "Sofia Coppola", 102, "Dos estadounidenses solitarios entablan una amistad en Tokio."),
  m("El secreto de sus ojos", 2009, "Juan José Campanella", 129, "Un exempleado judicial revive un caso sin resolver que lo marcó."),
];

/** Movie screening times keyed by weekday, 5 = Sábado, 6 = Domingo. */
export const MOVIE_TIMES: Record<number, string> = {
  5: "20:00",
  6: "18:00",
};

/** Formats minutes as "1 h 30 min". */
export function formatDuration(min: number): string {
  const h = Math.floor(min / 60);
  const r = min % 60;
  if (!h) return `${r} min`;
  return r ? `${h} h ${r} min` : `${h} h`;
}

/** Returns the event scheduled for a given date, or null on free days. */
export function eventFor(date: Date): CalendarEvent | null {
  const weekday = (date.getDay() + 6) % 7; // 0 = Lunes
  const movieTime = MOVIE_TIMES[weekday];
  if (movieTime) {
    const movie = MOVIES[(date.getDate() + weekday) % MOVIES.length]!;
    return { kind: "movie", title: movie.title, time: movieTime, durationMin: movie.durationMin, movie };
  }
  const list = CRAFT_WORKSHOPS[weekday];
  if (list) {
    const workshop = list[date.getDate() % list.length]!;
    return { kind: "craft", title: workshop.title, time: CRAFT_TIME, durationMin: workshop.durationMin, workshop };
  }
  return null;
}
