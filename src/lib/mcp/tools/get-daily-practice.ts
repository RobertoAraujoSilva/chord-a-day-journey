import { defineTool, ToolError } from "@lovable.dev/mcp-js";
import { z } from "zod";
import { chordCopy, chordForDay, stringByString, totalDays, type Locale } from "../content";

const PATTERNS = [
  { name: "Down only", notation: "D D D D", bpm: 60 },
  { name: "Down, down-up", notation: "D  D U", bpm: 70 },
  { name: "Down down-up up-down-up", notation: "D D U U D U", bpm: 80 },
];

export default defineTool({
  name: "get_daily_practice",
  title: "Get a day's practice routine",
  description:
    "Get the 5-10 minute routine for one day of the journey: today's chord, the chords to review, a strumming pattern with a suggested BPM, and a common mistake to avoid.",
  inputSchema: {
    day: z.number().int().describe("Day of the journey, from 1 to 30."),
    locale: z
      .enum(["en-US", "pt-BR"])
      .optional()
      .describe("Language of the explanation text. Defaults to en-US."),
  },
  annotations: { readOnlyHint: true, idempotentHint: true, openWorldHint: false },
  handler: ({ day, locale }) => {
    const total = totalDays();
    if (day < 1 || day > total) {
      throw new ToolError(`Day must be between 1 and ${total}.`);
    }
    const chord = chordForDay(day);
    if (!chord) throw new ToolError(`No chord found for day ${day}.`);
    const lang = (locale ?? "en-US") as Locale;
    const copy = chordCopy(chord.name, lang);
    const review = Array.from({ length: Math.min(3, day - 1) }, (_, i) =>
      chordForDay(day - 1 - i)?.name,
    ).filter((n): n is string => Boolean(n));
    const pattern = PATTERNS[Math.min(PATTERNS.length - 1, Math.floor((day - 1) / 10))];

    const routine = {
      day,
      chord: chord.name,
      fullName: copy.fullName ?? chord.name,
      difficulty: copy.difficulty ?? null,
      placement: stringByString(chord),
      practiceToday: `Play ${chord.name} slowly until every string rings clean, then switch between ${chord.name}${review.length ? ` and ${review.join(", ")}` : ""} without stopping the strum.`,
      review,
      strumming: pattern,
      commonMistake:
        "Pressing with the flat pad of the finger or too far from the fret, which makes strings buzz or sound muted.",
      tip: copy.tip ?? "Short and daily beats long and rare. If it hurts, stop — pain is not progress.",
    };

    const text = [
      `Day ${day} — ${routine.chord} (${routine.fullName})`,
      "",
      `What to practice: ${routine.practiceToday}`,
      `Strumming: ${pattern.notation} at about ${pattern.bpm} BPM (${pattern.name})`,
      `Common mistake: ${routine.commonMistake}`,
      `Tip: ${routine.tip}`,
      "",
      ...routine.placement,
    ].join("\n");

    return { content: [{ type: "text", text }], structuredContent: routine };
  },
});
