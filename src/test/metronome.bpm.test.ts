import { describe, it, expect } from 'vitest';
import { bpmAt, bpmIndexFor } from '@/components/Metronome';

describe('Metronome starts at the suggested BPM', () => {
  it.each([100, 80, 60])('starts at %i BPM', (bpm) => {
    expect(bpmAt(bpmIndexFor(bpm))).toBe(bpm);
  });

  it('defaults to 80 BPM when no suggestion is given', () => {
    expect(bpmAt(bpmIndexFor())).toBe(80);
  });
});
