import { defineTool, ToolError } from "@lovable.dev/mcp-js";
import { z } from "zod";
import { chordSummary, type Locale } from "../content";

export default defineTool({
  name: "get_chord",
  title: "Get how to play a chord",
  description:
    "Get everything needed to play one chord: which string each finger presses, an ASCII diagram, a beginner tip and famous songs that use it.",
  inputSchema: {
    name: z.string().describe("Chord name as shown in the app, e.g. Em, Am, C, G, Dm."),
    locale: z
      .enum(["en-US", "pt-BR"])
      .optional()
      .describe("Language of the explanation text. Defaults to en-US."),
  },
  annotations: { readOnlyHint: true, idempotentHint: true, openWorldHint: false },
  handler: ({ name, locale }) => {
    const summary = chordSummary(name, (locale ?? "en-US") as Locale);
    if (!summary) {
      throw new ToolError(
        `Unknown chord "${name}". Use list_chords to see the 30 chords in the journey.`,
      );
    }
    const lines = [
      `${summary.name} — ${summary.fullName} (day ${summary.day}${summary.difficulty ? `, ${summary.difficulty}` : ""})`,
      "",
      ...summary.placement,
      "",
      summary.diagram,
    ];
    if (summary.instructions) lines.push("", summary.instructions);
    if (summary.tip) lines.push("", `Tip: ${summary.tip}`);
    if (summary.commonSongs.length) lines.push("", `Songs: ${summary.commonSongs.join("; ")}`);
    return {
      content: [{ type: "text", text: lines.join("\n") }],
      structuredContent: summary,
    };
  },
});
