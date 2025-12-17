import { useState, useRef, useEffect } from 'react';
import { Play, Pause, Volume2, VolumeX } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { supabase } from '@/integrations/supabase/client';
import { playGeneratedChord, normalizeChordName } from '@/utils/audioGenerator';

interface AudioPlayerProps {
  chordName: string;
  className?: string;
}

export const AudioPlayer = ({ chordName, className = '' }: AudioPlayerProps) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const [useGenerated, setUseGenerated] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    const loadAudio = async () => {
      try {
        const fileName = `${normalizeChordName(chordName)}.mp3`;
        
        const { data } = supabase.storage
          .from('chord-audio')
          .getPublicUrl(fileName);
        
        if (data?.publicUrl) {
          // Verificar se o arquivo existe
          const response = await fetch(data.publicUrl, { method: 'HEAD' });
          if (response.ok) {
            setAudioUrl(data.publicUrl);
            setUseGenerated(false);
          } else {
            setUseGenerated(true);
          }
        } else {
          setUseGenerated(true);
        }
      } catch {
        setUseGenerated(true);
      }
    };

    loadAudio();
  }, [chordName]);

  const togglePlay = async () => {
    setIsLoading(true);
    
    try {
      if (isPlaying) {
        if (audioRef.current) {
          audioRef.current.pause();
        }
        setIsPlaying(false);
      } else {
        if (useGenerated) {
          setIsPlaying(true);
          await playGeneratedChord(chordName, 2);
          setIsPlaying(false);
        } else if (audioRef.current && audioUrl) {
          audioRef.current.currentTime = 0;
          audioRef.current.volume = isMuted ? 0 : 0.7;
          await audioRef.current.play();
          setIsPlaying(true);
        }
      }
    } catch (error) {
      console.error('Erro ao tocar áudio:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const toggleMute = () => {
    if (audioRef.current) {
      const newMuted = !isMuted;
      audioRef.current.muted = newMuted;
      setIsMuted(newMuted);
    }
  };

  const handleAudioEnd = () => {
    setIsPlaying(false);
  };

  return (
    <div className={`flex items-center gap-2 ${className}`}>
      {!useGenerated && audioUrl && (
        <audio
          ref={audioRef}
          src={audioUrl}
          onEnded={handleAudioEnd}
          preload="metadata"
        />
      )}
      
      <Button
        variant="outline"
        size="sm"
        onClick={togglePlay}
        disabled={isLoading}
        className="flex items-center gap-2 bg-orange-50 hover:bg-orange-100 text-orange-700 border-orange-200"
      >
        {isLoading ? (
          <div className="w-4 h-4 border-2 border-orange-400 border-t-transparent rounded-full animate-spin" />
        ) : isPlaying ? (
          <Pause className="h-4 w-4" />
        ) : (
          <Play className="h-4 w-4" />
        )}
        {isPlaying ? 'Pausar' : 'Tocar Acorde'}
      </Button>

      {!useGenerated && (
        <Button
          variant="ghost"
          size="sm"
          onClick={toggleMute}
          className="text-gray-500 hover:text-gray-700"
        >
          {isMuted ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
        </Button>
      )}
      
      <span className="text-xs text-muted-foreground">
        {useGenerated ? '🔊 Áudio gerado' : '🎵 Áudio real'}
      </span>
    </div>
  );
};