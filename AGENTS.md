<!-- LOVABLE:BEGIN -->
> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.
<!-- LOVABLE:END -->

- The event calendar is modular: schedule data and `eventFor()` live in `src/lib/events.ts`, the UI in `src/components/event-calendar.tsx`; routes compose them and must not duplicate the logic, so the calendar can be embedded on any page.
