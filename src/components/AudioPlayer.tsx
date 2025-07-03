
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
  const [error, setError] = useState<string | null>(null);
  const audioRef = useRef<HTMLAudioElement>(null);

  // Normalize chord name for file path
  const normalizeChordName = (name: string) => {
    return name.toLowerCase().replace(/[^a-z0-9]/g, '_');
  };

  useEffect(() => {
    const loadAudio = async () => {
      try {
        const fileName = `${normalizeChordName(chordName)}.mp3`;
        console.log('Tentando carregar áudio:', fileName);
        
        const { data } = supabase.storage
          .from('chord-audio')
          .getPublicUrl(fileName);
        
        console.log('URL gerada:', data?.publicUrl);
        
        if (data?.publicUrl) {
          setAudioUrl(data.publicUrl);
          setError(null);
          
          // Testar se o arquivo existe
          try {
            const response = await fetch(data.publicUrl, { method: 'HEAD' });
            console.log('Status do arquivo:', response.status);
            if (!response.ok) {
              setError(`Arquivo de áudio não encontrado (${response.status})`);
            }
          } catch (fetchError) {
            console.error('Erro ao verificar arquivo:', fetchError);
            setError('Erro ao verificar arquivo de áudio');
          }
        }
      } catch (error) {
        console.error('Erro ao carregar áudio:', error);
        setError('Erro ao carregar áudio');
      }
    };

    loadAudio();
  }, [chordName]);

  const togglePlay = async () => {
    if (!audioRef.current || !audioUrl) {
      console.log('Áudio não disponível');
      return;
    }

    setIsLoading(true);
    
    try {
      console.log('Tentando tocar áudio...');
      
      if (isPlaying) {
        audioRef.current.pause();
        setIsPlaying(false);
        console.log('Áudio pausado');
      } else {
        // Resetar o áudio para o início
        audioRef.current.currentTime = 0;
        
        // Definir volume
        audioRef.current.volume = isMuted ? 0 : 0.7;
        
        await audioRef.current.play();
        setIsPlaying(true);
        console.log('Áudio iniciado');
      }
    } catch (error) {
      console.error('Erro ao tocar áudio:', error);
      setError('Erro ao reproduzir áudio');
    } finally {
      setIsLoading(false);
    }
  };

  const toggleMute = () => {
    if (audioRef.current) {
      const newMuted = !isMuted;
      audioRef.current.muted = newMuted;
      setIsMuted(newMuted);
      console.log('Mute alterado para:', newMuted);
    }
  };

  const handleAudioEnd = () => {
    setIsPlaying(false);
    console.log('Áudio finalizado');
  };

  const handleAudioError = (e: any) => {
    console.error('Erro no elemento audio:', e);
    setError('Erro ao carregar arquivo de áudio');
    setIsPlaying(false);
  };

  const handleCanPlay = () => {
    console.log('Áudio pronto para tocar');
    setError(null);
  };

  if (error) {
    return (
      <div className={`text-red-500 text-sm ${className}`}>
        {error}
        <div className="text-xs text-gray-500 mt-1">
          Arquivo esperado: {normalizeChordName(chordName)}.mp3
        </div>
      </div>
    );
  }

  if (!audioUrl) {
    return (
      <div className={`text-gray-400 text-sm ${className}`}>
        Carregando áudio...
      </div>
    );
  }

  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <audio
        ref={audioRef}
        src={audioUrl}
        onEnded={handleAudioEnd}
        onError={handleAudioError}
        onCanPlay={handleCanPlay}
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
      
      <div className="text-xs text-gray-400">
        {normalizeChordName(chordName)}.mp3
      </div>
    </div>
  );
};
