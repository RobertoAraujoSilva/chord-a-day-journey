import { useState, useEffect, useCallback, useRef } from 'react';
import { Timer, TimerOff } from 'lucide-react';
import { Button } from '@/components/ui/button';

const BPM_OPTIONS = [40, 60, 80, 100, 120, 140, 160];

interface MetronomeProps {
  isActive: boolean;
  onToggle: () => void;
  beatsPerMeasure?: number;
  labels?: {
    metronome_on: string;
    metronome_off: string;
    bpm: string;
  };
}

// Create audio context for metronome clicks
let audioContext: AudioContext | null = null;

const getAudioContext = (): AudioContext => {
  if (!audioContext) {
    audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
  }
  return audioContext;
};

const playClick = (isAccent: boolean = false) => {
  try {
    const ctx = getAudioContext();
    const oscillator = ctx.createOscillator();
    const gainNode = ctx.createGain();
    
    oscillator.connect(gainNode);
    gainNode.connect(ctx.destination);
    
    // Higher pitch for accent beat (first beat of measure)
    oscillator.frequency.value = isAccent ? 1000 : 800;
    oscillator.type = 'sine';
    
    gainNode.gain.setValueAtTime(isAccent ? 0.3 : 0.2, ctx.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.1);
    
    oscillator.start(ctx.currentTime);
    oscillator.stop(ctx.currentTime + 0.1);
  } catch (error) {
    console.error('Error playing metronome click:', error);
  }
};

export const Metronome = ({ isActive, onToggle, beatsPerMeasure = 4, labels }: MetronomeProps) => {
  const defaultLabels = {
    metronome_on: 'Metronome on',
    metronome_off: 'Metronome off',
    bpm: 'BPM'
  };
  const l = labels || defaultLabels;
  const [bpmIndex, setBpmIndex] = useState(2); // Default: 80 BPM
  const [currentBeat, setCurrentBeat] = useState(0);
  const [isFlashing, setIsFlashing] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  
  const bpm = BPM_OPTIONS[bpmIndex];

  // Metronome tick logic
  const tick = useCallback(() => {
    setCurrentBeat((prev) => {
      const nextBeat = (prev + 1) % beatsPerMeasure;
      const isAccent = nextBeat === 0;
      playClick(isAccent);
      return nextBeat;
    });
    
    // Visual flash
    setIsFlashing(true);
    setTimeout(() => setIsFlashing(false), 100);
  }, [beatsPerMeasure]);

  // Start/stop metronome
  useEffect(() => {
    if (isActive) {
      // Resume audio context if suspended (browser autoplay policy)
      const ctx = getAudioContext();
      if (ctx.state === 'suspended') {
        ctx.resume();
      }
      
      // Initial tick
      setCurrentBeat(0);
      playClick(true);
      setIsFlashing(true);
      setTimeout(() => setIsFlashing(false), 100);
      
      // Set interval based on BPM
      const intervalMs = (60 / bpm) * 1000;
      intervalRef.current = setInterval(tick, intervalMs);
    } else {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
      setCurrentBeat(0);
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isActive, bpm, tick]);

  const decreaseBpm = () => {
    setBpmIndex((prev) => Math.max(0, prev - 1));
  };

  const increaseBpm = () => {
    setBpmIndex((prev) => Math.min(BPM_OPTIONS.length - 1, prev + 1));
  };

  return (
    <div className="flex flex-col items-center gap-3">
      {/* Visual Beat Indicator */}
      <div className="flex items-center gap-2">
        {Array.from({ length: beatsPerMeasure }).map((_, index) => (
          <div
            key={index}
            className={`w-4 h-4 rounded-full transition-all duration-100 ${
              isActive && currentBeat === index
                ? index === 0
                  ? 'bg-orange-500 scale-125 shadow-lg shadow-orange-500/50'
                  : 'bg-orange-400 scale-110'
                : 'bg-gray-300'
            } ${isActive && isFlashing && currentBeat === index ? 'ring-2 ring-orange-300' : ''}`}
          />
        ))}
      </div>

      {/* Controls */}
      <div className="flex items-center gap-3 bg-secondary/50 rounded-full px-4 py-2">
        <Button
          variant={isActive ? "default" : "ghost"}
          size="icon"
          onClick={onToggle}
          className={`h-10 w-10 ${isActive ? 'bg-orange-500 hover:bg-orange-600 text-white' : ''}`}
          title={isActive ? l.metronome_on : l.metronome_off}
        >
          {isActive ? <Timer className="h-5 w-5" /> : <TimerOff className="h-5 w-5" />}
        </Button>
        
        <span className="text-sm font-medium text-muted-foreground">
          {l.bpm}:
        </span>
        
        <Button
          variant="ghost"
          size="sm"
          onClick={decreaseBpm}
          disabled={bpmIndex === 0}
          className="h-8 w-8 p-0"
        >
          -
        </Button>
        
        <span className="w-12 text-center font-bold text-foreground">
          {bpm}
        </span>
        
        <Button
          variant="ghost"
          size="sm"
          onClick={increaseBpm}
          disabled={bpmIndex === BPM_OPTIONS.length - 1}
          className="h-8 w-8 p-0"
        >
          +
        </Button>
      </div>
    </div>
  );
};
