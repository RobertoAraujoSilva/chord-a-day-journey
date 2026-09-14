import { defineMcp } from "@lovable.dev/mcp-js";
import listChordsTool from "./tools/list-chords";
import getChordTool from "./tools/get-chord";
import getDailyPracticeTool from "./tools/get-daily-practice";

export default defineMcp({
  name: "chord-a-day-journey",
  title: "chord-a-day-journey",
  version: "0.1.0",
  instructions:
    "Tools for the 30-day beginner guitar journey. Use `list_chords` to see the chord order, `get_chord` for how to play one chord, and `get_daily_practice` for a day's 5-10 minute routine. Content is public and available in English (en-US) and Brazilian Portuguese (pt-BR).",
  tools: [listChordsTool, getChordTool, getDailyPracticeTool],
});
