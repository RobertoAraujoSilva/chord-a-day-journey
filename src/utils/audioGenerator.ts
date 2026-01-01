// Frequências base dos acordes de violão (em Hz)
// Calculadas com base nas notas reais de cada acorde em afinação padrão (E2-B4)
const CHORD_FREQUENCIES: Record<string, number[]> = {
  // Acordes menores abertos
  'em': [82.41, 123.47, 164.81, 196.00, 246.94, 329.63],   // E2, B2, E3, G3, B3, E4
  'am': [110.00, 164.81, 220.00, 261.63, 329.63],           // A2, E3, A3, C4, E4 (corda 6 muda)
  'dm': [146.83, 220.00, 293.66, 349.23, 440.00],           // D3, A3, D4, F4, A4 (cordas 5-6 mudas)
  
  // Acordes maiores abertos
  'c': [130.81, 164.81, 196.00, 261.63, 329.63],            // C3, E3, G3, C4, E4 (corda 6 muda)
  'g': [98.00, 123.47, 146.83, 196.00, 246.94, 392.00],     // G2, B2, D3, G3, B3, G4
  'd': [146.83, 220.00, 293.66, 369.99, 440.00],            // D3, A3, D4, F#4, A4 (cordas 5-6 mudas)
  'e': [82.41, 123.47, 164.81, 207.65, 246.94, 329.63],     // E2, B2, E3, G#3, B3, E4
  'a': [110.00, 164.81, 220.00, 277.18, 329.63],            // A2, E3, A3, C#4, E4 (corda 6 muda)
  'f': [87.31, 130.81, 174.61, 220.00, 261.63, 349.23],     // F2, C3, F3, A3, C4, F4 (pestana)
  
  // Acordes com sétima dominante
  'a7': [110.00, 164.81, 196.00, 277.18, 329.63],           // A2, E3, G3, C#4, E4
  'e7': [82.41, 123.47, 146.83, 207.65, 246.94, 329.63],    // E2, B2, D3, G#3, B3, E4
  'd7': [146.83, 220.00, 261.63, 369.99, 440.00],           // D3, A3, C4, F#4, A4
  'g7': [98.00, 123.47, 146.83, 174.61, 246.94, 349.23],    // G2, B2, D3, F3, B3, F4
  'c7': [130.81, 164.81, 233.08, 261.63, 329.63],           // C3, E3, Bb3, C4, E4
  'b7': [123.47, 184.99, 220.00, 293.66, 369.99],           // B2, F#3, A3, D4, F#4
  
  // Acordes menores com sétima
  'em7': [82.41, 123.47, 146.83, 196.00, 246.94, 329.63],   // E2, B2, D3, G3, B3, E4
  'am7': [110.00, 164.81, 196.00, 261.63, 329.63],          // A2, E3, G3, C4, E4
  'dm7': [146.83, 220.00, 261.63, 349.23, 440.00],          // D3, A3, C4, F4, A4
  
  // Acordes menores com barra/pestana
  'bm': [123.47, 184.99, 246.94, 293.66, 369.99, 493.88],   // B2, F#3, B3, D4, F#4, B4
  'f_m': [92.50, 138.59, 184.99, 220.00, 277.18, 369.99],   // F#2, C#3, F#3, A3, C#4, F#4
  
  // Acordes maiores com 7ª maior
  'cmaj7': [130.81, 164.81, 196.00, 246.94, 329.63],        // C3, E3, G3, B3, E4
  'fmaj7': [87.31, 130.81, 174.61, 220.00, 261.63, 329.63], // F2, C3, F3, A3, C4, E4
  
  // Acordes sus4 (suspensão)
  'gsus4': [98.00, 130.81, 146.83, 196.00, 261.63, 392.00], // G2, C3, D3, G3, C4, G4
  'dsus4': [146.83, 220.00, 293.66, 392.00, 440.00],        // D3, A3, D4, G4, A4
  'esus4': [82.41, 123.47, 164.81, 220.00, 246.94, 329.63], // E2, B2, E3, A3, B3, E4
  'asus4': [110.00, 164.81, 220.00, 293.66, 329.63],        // A2, E3, A3, D4, E4
  
  // Acordes add9
  'cadd9': [130.81, 164.81, 196.00, 293.66, 329.63],        // C3, E3, G3, D4, E4
  
  // Acordes com baixo invertido
  'g_b': [123.47, 146.83, 196.00, 246.94, 392.00],          // B2, D3, G3, B3, G4
  
  // Acordes barra maiores
  'bb': [116.54, 174.61, 233.08, 293.66, 349.23, 466.16],   // Bb2, F3, Bb3, D4, F4, Bb4
  
  // Acordes diminutos
  'a_dim': [116.54, 146.83, 207.65, 293.66, 329.63],        // A#2, D3, G#3, D4, E4 (A#dim)
};

const DEFAULT_FREQUENCIES = [110.00, 164.81, 220.00, 261.63, 329.63];

let audioContext: AudioContext | null = null;

function getAudioContext(): AudioContext {
  if (!audioContext) {
    audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
  }
  return audioContext;
}

export function normalizeChordName(name: string): string {
  return name.toLowerCase().replace(/[^a-z0-9]/g, '_');
}

function getChordFrequencies(chordName: string): number[] {
  const normalized = normalizeChordName(chordName);
  
  // Mapeamento especial para acordes com caracteres especiais
  const chordMap: Record<string, string> = {
    'f_m': 'f_m',       // F#m
    'g_b': 'g_b',       // G/B
    'a_dim': 'a_dim',   // A#dim
  };
  
  // Tentar o nome normalizado diretamente
  if (CHORD_FREQUENCIES[normalized]) {
    return CHORD_FREQUENCIES[normalized];
  }
  
  // Tentar sem underscores para acordes simples
  const withoutUnderscores = normalized.replace(/_/g, '');
  if (CHORD_FREQUENCIES[withoutUnderscores]) {
    return CHORD_FREQUENCIES[withoutUnderscores];
  }
  
  // Mapeamento especial
  if (chordMap[normalized] && CHORD_FREQUENCIES[chordMap[normalized]]) {
    return CHORD_FREQUENCIES[chordMap[normalized]];
  }
  
  console.warn(`Chord "${name}" (normalized: "${normalized}") not found, using default frequencies`);
  return DEFAULT_FREQUENCIES;
}

// Algoritmo Karplus-Strong para simular corda dedilhada
function createPluckedString(
  ctx: AudioContext,
  frequency: number,
  startTime: number,
  duration: number,
  destination: AudioNode
): void {
  const sampleRate = ctx.sampleRate;
  const bufferSize = Math.round(sampleRate / frequency);
  const noiseBuffer = ctx.createBuffer(1, bufferSize, sampleRate);
  const noiseData = noiseBuffer.getChannelData(0);
  
  // Preencher com ruído branco filtrado (simula o "pluck" inicial)
  for (let i = 0; i < bufferSize; i++) {
    noiseData[i] = Math.random() * 2 - 1;
  }
  
  // Criar buffer longo para a corda vibrando
  const outputDuration = duration + 0.5;
  const outputBuffer = ctx.createBuffer(1, Math.round(sampleRate * outputDuration), sampleRate);
  const outputData = outputBuffer.getChannelData(0);
  
  // Copiar ruído inicial
  for (let i = 0; i < bufferSize; i++) {
    outputData[i] = noiseData[i] * 0.5;
  }
  
  // Aplicar Karplus-Strong: média dos samples anteriores com decay
  const decayFactor = 0.996; // Controla quanto tempo a corda vibra
  const dampingFactor = 0.5; // Simula amortecimento da corda
  
  for (let i = bufferSize; i < outputData.length; i++) {
    const prev1 = outputData[i - bufferSize];
    const prev2 = outputData[i - bufferSize + 1] || prev1;
    outputData[i] = decayFactor * dampingFactor * (prev1 + prev2);
  }
  
  // Criar source e conectar
  const source = ctx.createBufferSource();
  source.buffer = outputBuffer;
  
  // Filtro passa-baixa para simular corpo do violão
  const filter = ctx.createBiquadFilter();
  filter.type = 'lowpass';
  filter.frequency.setValueAtTime(2500, startTime);
  filter.Q.setValueAtTime(1, startTime);
  
  // Envelope de amplitude
  const gainNode = ctx.createGain();
  gainNode.gain.setValueAtTime(0, startTime);
  gainNode.gain.linearRampToValueAtTime(0.3, startTime + 0.005); // Attack rápido
  gainNode.gain.exponentialRampToValueAtTime(0.15, startTime + 0.1); // Decay
  gainNode.gain.exponentialRampToValueAtTime(0.001, startTime + duration);
  
  source.connect(filter);
  filter.connect(gainNode);
  gainNode.connect(destination);
  
  source.start(startTime);
  source.stop(startTime + duration + 0.1);
}

// Adiciona harmônicos para enriquecer o timbre
function createHarmonics(
  ctx: AudioContext,
  frequency: number,
  startTime: number,
  duration: number,
  destination: AudioNode
): void {
  const harmonics = [
    { ratio: 1, gain: 0.5 },      // Fundamental
    { ratio: 2, gain: 0.25 },     // 2º harmônico
    { ratio: 3, gain: 0.125 },    // 3º harmônico
    { ratio: 4, gain: 0.0625 },   // 4º harmônico
  ];
  
  harmonics.forEach(({ ratio, gain: harmonicGain }) => {
    const osc = ctx.createOscillator();
    const gainNode = ctx.createGain();
    
    osc.type = 'triangle'; // Triangle soa mais suave que sine
    osc.frequency.setValueAtTime(frequency * ratio, startTime);
    
    // Envelope percussivo
    gainNode.gain.setValueAtTime(0, startTime);
    gainNode.gain.linearRampToValueAtTime(harmonicGain * 0.15, startTime + 0.003);
    gainNode.gain.exponentialRampToValueAtTime(harmonicGain * 0.05, startTime + 0.05);
    gainNode.gain.exponentialRampToValueAtTime(0.001, startTime + duration * 0.7);
    
    osc.connect(gainNode);
    gainNode.connect(destination);
    
    osc.start(startTime);
    osc.stop(startTime + duration);
  });
}

export async function playGeneratedChord(chordName: string, duration: number = 2.5): Promise<void> {
  const ctx = getAudioContext();
  
  if (ctx.state === 'suspended') {
    await ctx.resume();
  }
  
  const frequencies = getChordFrequencies(chordName);
  const now = ctx.currentTime;
  
  // Master gain e compressor para balancear o som
  const compressor = ctx.createDynamicsCompressor();
  compressor.threshold.setValueAtTime(-20, now);
  compressor.knee.setValueAtTime(10, now);
  compressor.ratio.setValueAtTime(4, now);
  compressor.attack.setValueAtTime(0.003, now);
  compressor.release.setValueAtTime(0.25, now);
  
  const masterGain = ctx.createGain();
  masterGain.gain.setValueAtTime(0.6, now);
  
  // Reverb simples usando delay
  const delayNode = ctx.createDelay();
  delayNode.delayTime.setValueAtTime(0.03, now);
  const feedbackGain = ctx.createGain();
  feedbackGain.gain.setValueAtTime(0.2, now);
  
  delayNode.connect(feedbackGain);
  feedbackGain.connect(delayNode);
  delayNode.connect(masterGain);
  
  masterGain.connect(compressor);
  compressor.connect(ctx.destination);
  
  // Simular dedilhada (strum) - delay progressivo entre cordas
  const strumDelay = 0.025; // 25ms entre cada corda
  
  frequencies.forEach((freq, index) => {
    const stringStartTime = now + (index * strumDelay);
    
    // Karplus-Strong para o som principal da corda
    createPluckedString(ctx, freq, stringStartTime, duration, masterGain);
    
    // Harmônicos adicionais para riqueza
    createHarmonics(ctx, freq, stringStartTime, duration, delayNode);
  });
  
  return new Promise((resolve) => {
    setTimeout(resolve, (duration + 0.3) * 1000);
  });
}

export function stopAllAudio(): void {
  if (audioContext) {
    audioContext.close();
    audioContext = null;
  }
}
