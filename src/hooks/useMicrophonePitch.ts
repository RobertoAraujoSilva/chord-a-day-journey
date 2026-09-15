import { useCallback, useEffect, useRef, useState } from "react";
import { frequencyToNote, type PitchReading } from "@/data/tuning";

const BUFFER_SIZE = 2048;
const MIN_RMS = 0.01;
const MIN_FREQ = 60;
const MAX_FREQ = 1200;
const SMOOTHING = 5;

/** Detecção de altura por autocorrelação. Retorna -1 quando não há sinal claro. */
function detectPitch(buffer: Float32Array, sampleRate: number): number {
  let rms = 0;
  for (let i = 0; i < buffer.length; i++) rms += buffer[i] * buffer[i];
  rms = Math.sqrt(rms / buffer.length);
  if (rms < MIN_RMS) return -1;

  const minLag = Math.floor(sampleRate / MAX_FREQ);
  const maxLag = Math.floor(sampleRate / MIN_FREQ);

  let bestLag = -1;
  let bestCorrelation = 0;

  for (let lag = minLag; lag <= maxLag; lag++) {
    let correlation = 0;
    for (let i = 0; i < buffer.length - lag; i++) {
      correlation += buffer[i] * buffer[i + lag];
    }
    correlation /= buffer.length - lag;

    if (correlation > bestCorrelation) {
      bestCorrelation = correlation;
      bestLag = lag;
    }
  }

  if (bestLag < 0 || bestCorrelation < rms * rms * 0.3) return -1;

  // Interpolação parabólica para refinar o período encontrado
  const shift = (lag: number) => {
    let sum = 0;
    for (let i = 0; i < buffer.length - lag; i++) sum += buffer[i] * buffer[i + lag];
    return sum / (buffer.length - lag);
  };
  const prev = bestLag > minLag ? shift(bestLag - 1) : bestCorrelation;
  const next = bestLag < maxLag ? shift(bestLag + 1) : bestCorrelation;
  const denominator = 2 * (2 * bestCorrelation - prev - next);
  const refinedLag = denominator !== 0 ? bestLag + (next - prev) / denominator : bestLag;

  return sampleRate / refinedLag;
}

export type MicError = "denied" | "unsupported" | null;

export interface MicrophonePitchState {
  reading: PitchReading | null;
  frequency: number | null;
  listening: boolean;
  error: MicError;
  start: () => Promise<void>;
  stop: () => void;
}

export function useMicrophonePitch(): MicrophonePitchState {
  const [reading, setReading] = useState<PitchReading | null>(null);
  const [frequency, setFrequency] = useState<number | null>(null);
  const [listening, setListening] = useState(false);
  const [error, setError] = useState<MicError>(null);

  const contextRef = useRef<AudioContext | null>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const rafRef = useRef<number | null>(null);
  const historyRef = useRef<number[]>([]);

  const stop = useCallback(() => {
    if (rafRef.current !== null) {
      cancelAnimationFrame(rafRef.current);
      rafRef.current = null;
    }
    streamRef.current?.getTracks().forEach((track) => track.stop());
    streamRef.current = null;
    if (contextRef.current) {
      void contextRef.current.close();
      contextRef.current = null;
    }
    historyRef.current = [];
    setListening(false);
    setReading(null);
    setFrequency(null);
  }, []);

  const start = useCallback(async () => {
    if (!navigator.mediaDevices?.getUserMedia) {
      setError("unsupported");
      return;
    }

    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        audio: {
          echoCancellation: false,
          noiseSuppression: false,
          autoGainControl: false,
        },
      });

      const ctx = new (window.AudioContext ||
        (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext)();
      const source = ctx.createMediaStreamSource(stream);
      const analyser = ctx.createAnalyser();
      analyser.fftSize = BUFFER_SIZE;
      source.connect(analyser);

      streamRef.current = stream;
      contextRef.current = ctx;
      setError(null);
      setListening(true);

      const buffer = new Float32Array(analyser.fftSize);

      const loop = () => {
        analyser.getFloatTimeDomainData(buffer);
        const detected = detectPitch(buffer, ctx.sampleRate);

        if (detected > 0) {
          const history = historyRef.current;
          history.push(detected);
          if (history.length > SMOOTHING) history.shift();
          const average = history.reduce((a, b) => a + b, 0) / history.length;
          setFrequency(average);
          setReading(frequencyToNote(average));
        } else {
          historyRef.current = [];
        }

        rafRef.current = requestAnimationFrame(loop);
      };

      rafRef.current = requestAnimationFrame(loop);
    } catch {
      setError("denied");
      setListening(false);
    }
  }, []);

  useEffect(() => stop, [stop]);

  return { reading, frequency, listening, error, start, stop };
}
