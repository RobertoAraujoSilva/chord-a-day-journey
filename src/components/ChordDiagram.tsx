
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

  // Spacing configuration
  const stringSpacing = 28;
  const fretSpacing = 32;
  const startX = 30;
  const startY = 40;

  return (
    <div className="flex flex-col items-center">
      {/* Fretboard */}
      <div className="relative bg-amber-100 p-4 2xl:p-6 3xl:p-8 rounded-lg border-2 border-amber-200">
        <svg 
          viewBox="0 0 200 220" 
          className="w-64 2xl:w-80 3xl:w-96 h-56 2xl:h-72 3xl:h-80 overflow-visible"
        >
          {/* String names at the top */}
          {stringNames.map((name, index) => (
            <text
              key={`name-${index}`}
              x={startX + index * stringSpacing}
              y="12"
              textAnchor="middle"
              fontSize="12"
              fontWeight="600"
              fill="#4B5563"
            >
              {name}
            </text>
          ))}

          {/* Open strings (O) and muted strings (X) - above the nut */}
          {chord.fingering.map((fret, string) => {
            if (fret === '0') {
              return (
                <circle
                  key={`open-${string}`}
                  cx={startX + string * stringSpacing}
                  cy="26"
                  r="6"
                  fill="none"
                  stroke="#22C55E"
                  strokeWidth="2"
                />
              );
            }
            if (fret === 'x') {
              return (
                <g key={`muted-${string}`}>
                  <line
                    x1={startX + string * stringSpacing - 5}
                    y1="21"
                    x2={startX + string * stringSpacing + 5}
                    y2="31"
                    stroke="#EF4444"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                  <line
                    x1={startX + string * stringSpacing + 5}
                    y1="21"
                    x2={startX + string * stringSpacing - 5}
                    y2="31"
                    stroke="#EF4444"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                </g>
              );
            }
            return null;
          })}

          {/* Nut (pestana) - thick horizontal line at top */}
          <line
            x1={startX - 10}
            y1={startY}
            x2={startX + (strings - 1) * stringSpacing + 10}
            y2={startY}
            stroke="#8B4513"
            strokeWidth="6"
          />
          
          {/* Frets - horizontal lines */}
          {Array.from({ length: frets }, (_, fret) => (
            <line
              key={`fret-${fret}`}
              x1={startX - 10}
              y1={startY + (fret + 1) * fretSpacing}
              x2={startX + (strings - 1) * stringSpacing + 10}
              y2={startY + (fret + 1) * fretSpacing}
              stroke="#8B4513"
              strokeWidth="2"
            />
          ))}
          
          {/* Strings - vertical lines */}
          {Array.from({ length: strings }, (_, string) => (
            <line
              key={`string-${string}`}
              x1={startX + string * stringSpacing}
              y1={startY}
              x2={startX + string * stringSpacing}
              y2={startY + frets * fretSpacing}
              stroke="#C0C0C0"
              strokeWidth={3 - string * 0.4}
            />
          ))}
          
          {/* Finger positions */}
          {chord.fingering.map((fret, string) => {
            if (fret === 'x' || fret === '0') return null;
            const fretNum = parseInt(fret);
            return (
              <circle
                key={`finger-${string}`}
                cx={startX + string * stringSpacing}
                cy={startY + (fretNum - 0.5) * fretSpacing}
                r="10"
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
                x={startX + string * stringSpacing}
                y={startY + (fretNum - 0.5) * fretSpacing + 4}
                textAnchor="middle"
                fill="white"
                fontSize="11"
                fontWeight="bold"
              >
                {chord.fingers[string]}
              </text>
            );
          })}

          {/* Fret numbers on the left */}
          {Array.from({ length: frets }, (_, fret) => (
            <text
              key={`fret-num-${fret}`}
              x="10"
              y={startY + (fret + 0.5) * fretSpacing + 4}
              textAnchor="middle"
              fontSize="10"
              fill="#6B7280"
            >
              {fret + 1}
            </text>
          ))}
        </svg>
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
