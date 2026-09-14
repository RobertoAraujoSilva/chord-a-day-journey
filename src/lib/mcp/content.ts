import { chords, type Chord } from "../../data/chords";
import enContent from "../../i18n/locales/en-US/content.json";
import ptContent from "../../i18n/locales/pt-BR/content.json";

export type Locale = "en-US" | "pt-BR";

type ChordCopy = {
  fullName?: string;
  difficulty?: string;
  instructions?: string;
  tip?: string;
};

const copyByLocale: Record<Locale, Record<string, ChordCopy>> = {
  "en-US": (enContent as { chords?: Record<string, ChordCopy> }).chords ?? {},
  "pt-BR": (ptContent as { chords?: Record<string, ChordCopy> }).chords ?? {},
};

const STRINGS = ["6 (E low)", "5 (A)", "4 (D)", "3 (G)", "2 (B)", "1 (E high)"];
const FINGER_NAMES: Record<string, string> = {
  "1": "index",
  "2": "middle",
  "3": "ring",
  "4": "pinky",
};

export function chordCopy(name: string, locale: Locale): ChordCopy {
  return copyByLocale[locale][name] ?? {};
}

export function findChord(name: string): { chord: Chord; day: number } | undefined {
  const index = chords.findIndex(
    (c) => c.name.toLowerCase() === name.trim().toLowerCase(),
  );
  return index < 0 ? undefined : { chord: chords[index], day: index + 1 };
}

export function chordForDay(day: number): Chord | undefined {
  return chords[day - 1];
}

export function totalDays(): number {
  return chords.length;
}

export function allChords(): Chord[] {
  return chords;
}

/** Per-string placement in plain words, so a beginner needs no diagram literacy. */
export function stringByString(chord: Chord): string[] {
  return chord.fingering.map((fret, i) => {
    const label = `String ${STRINGS[i]}`;
    if (fret === "x") return `${label}: do not play (muted)`;
    if (fret === "0") return `${label}: open string (do not press)`;
    const finger = FINGER_NAMES[chord.fingers[i]];
    return `${label}: press fret ${fret}${finger ? ` with the ${finger} finger` : ""}`;
  });
}

/** ASCII diagram: strings left to right from 6th to 1st, frets top to bottom. */
export function asciiDiagram(chord: Chord): string {
  const header = chord.fingering
    .map((fret) => (fret === "x" ? "x" : fret === "0" ? "o" : " "))
    .join("--");
  const pressed = chord.fingering
    .map((f) => (f === "x" || f === "0" ? 0 : Number(f)))
    .filter((f) => f > 0);
  const maxFret = pressed.length ? Math.max(...pressed) : 3;
  const rows = [header, "=================="];
  for (let fret = 1; fret <= Math.max(3, maxFret); fret++) {
    const line = chord.fingering
      .map((f, i) => (Number(f) === fret ? chord.fingers[i] || "*" : "|"))
      .join("--");
    rows.push(`${line}  ${fret}`);
  }
  return rows.join("\n");
}

export function chordSummary(name: string, locale: Locale) {
  const found = findChord(name);
  if (!found) return undefined;
  const copy = chordCopy(found.chord.name, locale);
  return {
    name: found.chord.name,
    day: found.day,
    fullName: copy.fullName ?? found.chord.name,
    difficulty: copy.difficulty ?? null,
    fingering: found.chord.fingering,
    fingers: found.chord.fingers,
    placement: stringByString(found.chord),
    diagram: asciiDiagram(found.chord),
    instructions: copy.instructions ?? null,
    tip: copy.tip ?? null,
    commonSongs: found.chord.commonSongs ?? [],
  };
}
