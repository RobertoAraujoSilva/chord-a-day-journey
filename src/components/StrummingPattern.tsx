import { useState } from 'react';
import { Metronome } from '@/components/Metronome';
import { useTranslation } from '@/i18n/context';

type ArrowType = 'down' | 'up' | 'down-muted' | 'up-muted' | 'down-p' | 'down-i';

interface Arrow {
  type: ArrowType;
  spacing?: boolean; // Maior espaçamento antes desta seta
}

interface StrummingPatternProps {
  title: string;
  arrows: Arrow[];
  bpmSuggestion?: number;
  description?: string;
  showMetronome?: boolean;
  showOr?: { afterIndex: number }; // Mostra "OU" após o índice especificado
}

const ARROW_IMAGES: Record<ArrowType, string> = {
  'down': '/setas/seta_baixo.png',
  'up': '/setas/seta_cima.png',
  'down-muted': '/setas/seta_baixo_ab.png',
  'up-muted': '/setas/seta_cima_ab.png',
  'down-p': '/setas/seta_baixo_p.png',
  'down-i': '/setas/seta_baixo_i.png',
};

export const StrummingPattern = ({
  title,
  arrows,
  bpmSuggestion,
  description,
  showMetronome = true,
  showOr,
}: StrummingPatternProps) => {
  const [metronomeActive, setMetronomeActive] = useState(false);
  const { t } = useTranslation();

  const getAltText = (type: ArrowType): string => {
    switch (type) {
      case 'down':
        return t('rythm.common.down');
      case 'up':
        return t('rythm.common.up');
      case 'down-muted':
        return t('rythm.common.muted_down');
      case 'up-muted':
        return t('rythm.common.muted_up');
      case 'down-p':
        return t('rythm.common.thumb_down');
      case 'down-i':
        return t('rythm.common.index_down');
      default:
        return '';
    }
  };

  return (
    <div className="flex flex-col gap-4 py-4">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
        <h2 className="font-bold text-xl text-foreground">{title}</h2>
        {bpmSuggestion && (
          <span className="text-sm text-muted-foreground">
            {t('rythm.common.bpm_suggestion')}: <strong>{bpmSuggestion}</strong>
          </span>
        )}
      </div>

      {/* Description */}
      {description && (
        <p className="text-muted-foreground">{description}</p>
      )}

      {/* Arrows */}
      <ul className="flex flex-wrap justify-center items-center gap-2 sm:gap-4">
        {arrows.map((arrow, index) => (
          <li
            key={index}
            className={`flex items-center ${arrow.spacing ? 'ml-4 sm:ml-8' : ''}`}
          >
            {/* Show OR separator if configured */}
            {showOr && showOr.afterIndex === index - 1 && (
              <span className="font-bold text-xl text-foreground mx-2 sm:mx-4">
                {t('rythm.common.or')}
              </span>
            )}
            <img
              className="w-16 h-16 sm:w-24 sm:h-24 lg:w-[120px] lg:h-[120px] object-contain"
              src={ARROW_IMAGES[arrow.type]}
              alt={getAltText(arrow.type)}
            />
          </li>
        ))}
      </ul>

      {/* Metronome */}
      {showMetronome && (
        <div className="mt-4 flex flex-col items-center gap-2">
          <p className="text-sm text-muted-foreground">
            {t('rythm.common.practice_with_metronome')}
          </p>
          <Metronome
            isActive={metronomeActive}
            onToggle={() => setMetronomeActive(!metronomeActive)}
            labels={{
              metronome_on: t('rythm.metronome.metronome_on'),
              metronome_off: t('rythm.metronome.metronome_off'),
              bpm: t('rythm.metronome.bpm'),
            }}
          />
        </div>
      )}
    </div>
  );
};
