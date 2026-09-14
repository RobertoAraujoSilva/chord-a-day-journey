import { defineTool } from "@lovable.dev/mcp-js";
import { z } from "zod";
import { allChords, chordCopy, totalDays, type Locale } from "../content";

export default defineTool({
  name: "list_chords",
  title: "List the 30-day chord journey",
  description:
    "List every guitar chord in the 30-day journey, in learning order, with its day number, full name and difficulty.",
  inputSchema: {
    locale: z
      .enum(["en-US", "pt-BR"])
      .optional()
      .describe("Language of the chord names and difficulty labels. Defaults to en-US."),
  },
  annotations: { readOnlyHint: true, idempotentHint: true, openWorldHint: false },
  handler: ({ locale }) => {
    const lang = (locale ?? "en-US") as Locale;
    const items = allChords().map((chord, index) => {
      const copy = chordCopy(chord.name, lang);
      return {
        day: index + 1,
        name: chord.name,
        fullName: copy.fullName ?? chord.name,
        difficulty: copy.difficulty ?? null,
      };
    });
    const text = items
      .map((c) => `Day ${c.day}: ${c.name} (${c.fullName})${c.difficulty ? ` — ${c.difficulty}` : ""}`)
      .join("\n");
    return {
      content: [{ type: "text", text }],
      structuredContent: { totalDays: totalDays(), chords: items },
    };
  },
});
