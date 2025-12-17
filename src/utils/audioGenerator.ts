// Frequências base dos acordes de violão (em Hz)
const CHORD_FREQUENCIES: Record<string, number[]> = {
  // Acordes menores
  'em': [82.41, 123.47, 164.81, 196.00, 246.94, 329.63],
  'am': [110.00, 164.81, 220.00, 261.63, 329.63, 440.00],
  'dm': [146.83, 220.00, 293.66, 349.23, 440.00],
  
  // Acordes maiores
  'c': [130.81, 164.81, 196.00, 261.63, 329.63],
  'g': [98.00, 123.47, 146.83, 196.00, 246.94, 392.00],
  'd': [146.83, 220.00, 293.66, 369.99, 440.00],
  'e': [82.41, 123.47, 164.81, 207.65, 246.94, 329.63],
  'a': [110.00, 164.81, 220.00, 277.18, 329.63],
  'f': [87.31, 130.81, 174.61, 220.00, 261.63, 349.23],
  
  // Acordes com sétima
  'a7': [110.00, 164.81, 220.00, 277.18, 329.63, 392.00],
  'e7': [82.41, 123.47, 164.81, 196.00, 246.94, 329.63],
  'd7': [146.83, 220.00, 261.63, 369.99, 440.00],
  'g7': [98.00, 123.47, 146.83, 196.00, 246.94, 349.23],
  'c7': [130.81, 164.81, 196.00, 233.08, 329.63],
  'b7': [123.47, 184.99, 246.94, 293.66, 369.99],
  
  // Acordes menores com sétima
  'em7': [82.41, 123.47, 164.81, 196.00, 246.94, 293.66],
  'am7': [110.00, 164.81, 196.00, 261.63, 329.63],
  'dm7': [146.83, 220.00, 261.63, 349.23, 440.00],
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
  const normalized = normalizeChordName(chordName).replace(/_/g, '');
  return CHORD_FREQUENCIES[normalized] || DEFAULT_FREQUENCIES;
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
