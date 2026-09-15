export interface GuitarString {
  /** 6 = corda mais grave (E grave), 1 = corda mais aguda (E aguda) */
  number: 1 | 2 | 3 | 4 | 5 | 6;
  /** Nota sem oitava, ex.: "E" */
  note: string;
  /** Nota com oitava, ex.: "E2" */
  label: string;
  frequency: number;
  /** Chave de tradução do nome popular da corda */
  i18nKey: string;
}

/** Afinação padrão, da corda mais grave para a mais aguda. */
export const STANDARD_TUNING: GuitarString[] = [
  { number: 6, note: "E", label: "E2", frequency: 82.41, i18nKey: "string_6" },
  { number: 5, note: "A", label: "A2", frequency: 110.0, i18nKey: "string_5" },
  { number: 4, note: "D", label: "D3", frequency: 146.83, i18nKey: "string_4" },
  { number: 3, note: "G", label: "G3", frequency: 196.0, i18nKey: "string_3" },
  { number: 2, note: "B", label: "B3", frequency: 246.94, i18nKey: "string_2" },
  { number: 1, note: "E", label: "E4", frequency: 329.63, i18nKey: "string_1" },
];

const NOTE_NAMES = ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"];
const A4 = 440;

export interface PitchReading {
  /** Nota mais próxima, ex.: "E2" */
  note: string;
  /** Nome sem oitava */
  noteName: string;
  octave: number;
  /** Desvio em cents (-50 a +50). Negativo = grave, positivo = agudo */
  cents: number;
  /** Frequência exata da nota mais próxima */
  targetFrequency: number;
}

/** Converte uma frequência na nota mais próxima e no desvio em cents. */
export function frequencyToNote(frequency: number): PitchReading {
  const midi = 69 + 12 * Math.log2(frequency / A4);
  const rounded = Math.round(midi);
  const targetFrequency = A4 * Math.pow(2, (rounded - 69) / 12);
  const cents = Math.round(1200 * Math.log2(frequency / targetFrequency));
  const noteName = NOTE_NAMES[((rounded % 12) + 12) % 12];
  const octave = Math.floor(rounded / 12) - 1;

  return {
    note: `${noteName}${octave}`,
    noteName,
    octave,
    cents,
    targetFrequency,
  };
}

/** Corda da afinação padrão mais próxima da frequência ouvida. */
export function closestString(frequency: number): GuitarString {
  return STANDARD_TUNING.reduce((best, current) => {
    const bestDiff = Math.abs(Math.log2(frequency / best.frequency));
    const currentDiff = Math.abs(Math.log2(frequency / current.frequency));
    return currentDiff < bestDiff ? current : best;
  }, STANDARD_TUNING[0]);
}

export const IN_TUNE_CENTS = 5;
export const CLOSE_CENTS = 25;

export type TuneStatus = "in_tune" | "close" | "off";

export function tuneStatus(cents: number): TuneStatus {
  const abs = Math.abs(cents);
  if (abs <= IN_TUNE_CENTS) return "in_tune";
  if (abs <= CLOSE_CENTS) return "close";
  return "off";
}
