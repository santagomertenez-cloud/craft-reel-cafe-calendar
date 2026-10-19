import { describe, expect, it } from "vitest";

import { eventFor } from "@/lib/events";

// Reference week: Oct 19 2026 is a Monday.
const d = (day: number) => new Date(2026, 9, day);

describe("Event schedule rules", () => {
  it("schedules craft workshops on Monday, Wednesday and Friday at 17:30", () => {
    for (const day of [19, 21, 23]) {
      const ev = eventFor(d(day));
      expect(ev).not.toBeNull();
      expect(ev!.kind).toBe("craft");
      expect(ev!.time).toBe("17:30");
      expect(ev!.title.length).toBeGreaterThan(0);
    }
  });

  it("leaves Tuesday and Thursday free", () => {
    expect(eventFor(d(20))).toBeNull();
    expect(eventFor(d(22))).toBeNull();
  });

  it("schedules movie screenings on Saturday at 20:00 and Sunday at 18:00", () => {
    const sat = eventFor(d(24));
    expect(sat).not.toBeNull();
    expect(sat!.kind).toBe("movie");
    expect(sat!.time).toBe("20:00");

    const sun = eventFor(d(25));
    expect(sun).not.toBeNull();
    expect(sun!.kind).toBe("movie");
    expect(sun!.time).toBe("18:00");
  });
});
