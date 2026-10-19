# Welcome to your Lovable project

This project was built with [Lovable](https://lovable.dev).

## Build with Lovable

Open your project in the [Lovable editor](https://lovable.dev) and keep building.

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: connect the project to GitHub and every change made in Lovable is committed straight to your repository.
- **Full ownership**: this code is yours. Push to your repository and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```

## Estructura del proyecto

- `src/routes/index.tsx` — página de inicio con el calendario.
- `src/components/event-calendar.tsx` — componente `<EventCalendar />` reutilizable; puede agregarse a cualquier página sin props.
- `src/lib/events.ts` — datos y reglas del calendario (talleres, películas y horarios). Editar aquí cambia el calendario en toda la app.
- `src/test/event-schedule.test.ts` — tests de las reglas: talleres lun/mié/vie 17:30, cine sáb 20:00 y dom 18:00, martes y jueves libres.

Para mostrar el calendario en otra página:

```tsx
import { EventCalendar } from "@/components/event-calendar";

export function OtraPagina() {
  return <EventCalendar />;
}
```

## Comandos

```sh
npm run dev     # servidor de desarrollo
npm run build   # build de producción
npm run test    # corre los tests
```

## Built with

- TanStack Start
- TypeScript
- React
- Tailwind CSS
