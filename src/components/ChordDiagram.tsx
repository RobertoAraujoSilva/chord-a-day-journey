
import { Chord } from '@/data/chords';
import { useTranslation } from '@/i18n/context';

interface ChordDiagramProps {
  chord: Chord;
}

export const ChordDiagram = ({ chord }: ChordDiagramProps) => {
  const { t } = useTranslation();
  const frets = 5;
  const strings = 6;
  const stringNames = ['E', 'A', 'D', 'G', 'B', 'e'];

  return (
    <div className="flex flex-col items-center">
      {/* Fretboard with string labels */}
      <div className="flex items-center gap-2">
        {/* String names - vertical on the left */}
        <div className="flex flex-col justify-between h-48 2xl:h-72 3xl:h-96 text-sm 2xl:text-base 3xl:text-lg font-medium text-gray-600">
          {stringNames.map((name, index) => (
            <span key={index} className="text-right w-4 2xl:w-6">
              {name}
            </span>
          ))}
        </div>

        {/* Fretboard */}
        <div className="relative bg-amber-100 p-4 2xl:p-6 3xl:p-8 rounded-lg border-2 border-amber-200">
          <svg 
            viewBox="0 0 220 180" 
            className="w-72 2xl:w-[400px] 3xl:w-[500px] h-48 2xl:h-72 3xl:h-96 overflow-visible"
          >
            {/* Nut (first fret - thick line on left) */}
            <line
              x1="20"
              y1="10"
              x2="20"
              y2="170"
              stroke="#8B4513"
              strokeWidth="6"
            />
            
            {/* Frets - vertical lines */}
            {Array.from({ length: frets }, (_, fret) => (
              <line
                key={`fret-${fret}`}
                x1={50 + fret * 35}
                y1="10"
                x2={50 + fret * 35}
                y2="170"
                stroke="#8B4513"
                strokeWidth="2"
              />
            ))}
            
            {/* Strings - horizontal lines */}
            {Array.from({ length: strings }, (_, string) => (
              <line
                key={`string-${string}`}
                x1="20"
                y1={10 + string * 32}
                x2="200"
                y2={10 + string * 32}
                stroke="#C0C0C0"
                strokeWidth={3 - string * 0.3}
              />
            ))}
            
            {/* Open strings (O) - to the left of nut */}
            {chord.fingering.map((fret, string) => {
              if (fret === '0') {
                return (
                  <circle
                    key={`open-${string}`}
                    cx="8"
                    cy={10 + string * 32}
                    r="7"
                    fill="none"
                    stroke="#22C55E"
                    strokeWidth="3"
                  />
                );
              }
              return null;
            })}
            
            {/* X marks for muted strings - to the left of nut */}
            {chord.fingering.map((fret, string) => {
              if (fret === 'x') {
                return (
                  <g key={`muted-${string}`}>
                    <line
                      x1="2"
                      y1={10 + string * 32 - 5}
                      x2="14"
                      y2={10 + string * 32 + 5}
                      stroke="#EF4444"
                      strokeWidth="3"
                      strokeLinecap="round"
                    />
                    <line
                      x1="14"
                      y1={10 + string * 32 - 5}
                      x2="2"
                      y2={10 + string * 32 + 5}
                      stroke="#EF4444"
                      strokeWidth="3"
                      strokeLinecap="round"
                    />
                  </g>
                );
              }
              return null;
            })}
            
            {/* Finger positions */}
            {chord.fingering.map((fret, string) => {
              if (fret === 'x' || fret === '0') return null;
              const fretNum = parseInt(fret);
              return (
                <circle
                  key={`finger-${string}`}
                  cx={20 + (fretNum - 0.5) * 35}
                  cy={10 + string * 32}
                  r="12"
                  fill="#EF4444"
                  stroke="#DC2626"
                  strokeWidth="2"
                />
              );
            })}
            
            {/* Finger numbers */}
            {chord.fingering.map((fret, string) => {
              if (fret === 'x' || fret === '0') return null;
              const fretNum = parseInt(fret);
              return (
                <text
                  key={`number-${string}`}
                  x={20 + (fretNum - 0.5) * 35}
                  y={10 + string * 32 + 5}
                  textAnchor="middle"
                  fill="white"
                  fontSize="12"
                  fontWeight="bold"
                >
                  {chord.fingers[string]}
                </text>
              );
            })}
          </svg>
        </div>
      </div>
      
      {/* Legend */}
      <div className="mt-4 2xl:mt-6 3xl:mt-8 flex flex-wrap justify-center gap-4 2xl:gap-6 3xl:gap-8 text-sm 2xl:text-base 3xl:text-lg text-gray-600">
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 2xl:w-6 2xl:h-6 3xl:w-8 3xl:h-8 rounded-full bg-red-500"></div>
          <span>{t('ui.labels.finger_pressed')}</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 2xl:w-6 2xl:h-6 3xl:w-8 3xl:h-8 rounded-full border-2 2xl:border-3 3xl:border-4 border-green-500"></div>
          <span>{t('ui.labels.open_string')}</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 2xl:w-6 2xl:h-6 3xl:w-8 3xl:h-8 flex items-center justify-center text-red-500 font-bold text-lg 2xl:text-xl 3xl:text-2xl">×</div>
          <span>{t('ui.labels.do_not_play')}</span>
        </div>
      </div>
    </div>
  );
};
