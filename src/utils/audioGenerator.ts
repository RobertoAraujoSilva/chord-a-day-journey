// Frequências base dos acordes de violão (em Hz)
const CHORD_FREQUENCIES: Record<string, number[]> = {
  // Acordes menores
  'em': [82.41, 123.47, 164.81, 196.00, 246.94, 329.63], // Mi menor
  'am': [110.00, 164.81, 220.00, 261.63, 329.63, 440.00], // Lá menor
  'dm': [146.83, 220.00, 293.66, 349.23, 440.00], // Ré menor
  
  // Acordes maiores
  'c': [130.81, 164.81, 196.00, 261.63, 329.63], // Dó maior
  'g': [98.00, 123.47, 146.83, 196.00, 246.94, 392.00], // Sol maior
  'd': [146.83, 220.00, 293.66, 369.99, 440.00], // Ré maior
  'e': [82.41, 123.47, 164.81, 207.65, 246.94, 329.63], // Mi maior
  'a': [110.00, 164.81, 220.00, 277.18, 329.63], // Lá maior
  'f': [87.31, 130.81, 174.61, 220.00, 261.63, 349.23], // Fá maior
  
  // Acordes com sétima
  'a7': [110.00, 164.81, 220.00, 277.18, 329.63, 392.00], // Lá com sétima
  'e7': [82.41, 123.47, 164.81, 196.00, 246.94, 329.63], // Mi com sétima
  'd7': [146.83, 220.00, 261.63, 369.99, 440.00], // Ré com sétima
  'g7': [98.00, 123.47, 146.83, 196.00, 246.94, 349.23], // Sol com sétima
  'c7': [130.81, 164.81, 196.00, 233.08, 329.63], // Dó com sétima
  'b7': [123.47, 184.99, 246.94, 293.66, 369.99], // Si com sétima
  
  // Acordes menores com sétima
  'em7': [82.41, 123.47, 164.81, 196.00, 246.94, 293.66], // Mi menor com sétima
  'am7': [110.00, 164.81, 196.00, 261.63, 329.63], // Lá menor com sétima
  'dm7': [146.83, 220.00, 261.63, 349.23, 440.00], // Ré menor com sétima
};

// Frequência padrão para acordes não mapeados
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

export async function playGeneratedChord(chordName: string, duration: number = 2): Promise<void> {
  const ctx = getAudioContext();
  
  // Resumir contexto se estiver suspenso (necessário em alguns navegadores)
  if (ctx.state === 'suspended') {
    await ctx.resume();
  }
  
  const frequencies = getChordFrequencies(chordName);
  const now = ctx.currentTime;
  const attackTime = 0.02;
  const decayTime = 0.1;
  const sustainLevel = 0.3;
  const releaseTime = 0.5;
  
  const masterGain = ctx.createGain();
  masterGain.connect(ctx.destination);
  masterGain.gain.setValueAtTime(0.4, now);
  
  // Criar osciladores para cada nota do acorde
  frequencies.forEach((freq, index) => {
    const oscillator = ctx.createOscillator();
    const gainNode = ctx.createGain();
    
    // Usar uma mistura de ondas para som mais rico
    oscillator.type = index % 2 === 0 ? 'triangle' : 'sine';
    oscillator.frequency.setValueAtTime(freq, now);
    
    // Envelope ADSR
    gainNode.gain.setValueAtTime(0, now);
    gainNode.gain.linearRampToValueAtTime(0.15, now + attackTime);
    gainNode.gain.linearRampToValueAtTime(sustainLevel * 0.15, now + attackTime + decayTime);
    gainNode.gain.setValueAtTime(sustainLevel * 0.15, now + duration - releaseTime);
    gainNode.gain.linearRampToValueAtTime(0, now + duration);
    
    oscillator.connect(gainNode);
    gainNode.connect(masterGain);
    
    oscillator.start(now);
    oscillator.stop(now + duration);
  });
  
  return new Promise((resolve) => {
    setTimeout(resolve, duration * 1000);
  });
}

export function stopAllAudio(): void {
  if (audioContext) {
    audioContext.close();
    audioContext = null;
  }
}
