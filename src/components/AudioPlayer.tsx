
import { useState, useRef, useEffect } from 'react';
import { Play, Pause, Volume2, VolumeX } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { supabase } from '@/integrations/supabase/client';

interface AudioPlayerProps {
  chordName: string;
  className?: string;
}

export const AudioPlayer = ({ chordName, className = '' }: AudioPlayerProps) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const audioRef = useRef<HTMLAudioElement>(null);

  // Normalize chord name for file path
  const normalizeChordName = (name: string) => {
    return name.toLowerCase().replace(/[^a-z0-9]/g, '_');
  };

  useEffect(() => {
    const loadAudio = async () => {
      try {
        const fileName = `${normalizeChordName(chordName)}.mp3`;
        const { data } = supabase.storage
          .from('chord-audio')
          .getPublicUrl(fileName);
        
        if (data?.publicUrl) {
          setAudioUrl(data.publicUrl);
        }
      } catch (error) {
        console.log('Audio file not found for chord:', chordName);
      }
    };

    loadAudio();
  }, [chordName]);

  const togglePlay = async () => {
    if (!audioRef.current || !audioUrl) return;

    setIsLoading(true);
    
    try {
      if (isPlaying) {
        audioRef.current.pause();
        setIsPlaying(false);
      } else {
        await audioRef.current.play();
        setIsPlaying(true);
      }
    } catch (error) {
      console.error('Error playing audio:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const toggleMute = () => {
    if (audioRef.current) {
      audioRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  const handleAudioEnd = () => {
    setIsPlaying(false);
  };

  if (!audioUrl) {
    return (
      <div className={`text-gray-400 text-sm ${className}`}>
        Áudio não disponível para este acorde
      </div>
    );
  }

  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <audio
        ref={audioRef}
        src={audioUrl}
        onEnded={handleAudioEnd}
        preload="metadata"
      />
      
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

      <Button
        variant="ghost"
        size="sm"
        onClick={toggleMute}
        className="text-gray-500 hover:text-gray-700"
      >
        {isMuted ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
      </Button>
    </div>
  );
};
