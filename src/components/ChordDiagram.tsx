
import { Chord } from '@/data/chords';
import { useTranslation } from '@/i18n/context';

interface ChordDiagramProps {
  chord: Chord;
}

export const ChordDiagram = ({ chord }: ChordDiagramProps) => {
  const { t } = useTranslation();
  const frets = 5;
  const strings = 6;

  return (
    <div className="flex flex-col items-center">
      {/* String names */}
      <div className="flex justify-between w-64 2xl:w-96 3xl:w-[480px] mb-2 text-sm 2xl:text-base 3xl:text-lg font-medium text-gray-600">
        {['E', 'A', 'D', 'G', 'B', 'E'].map((string, index) => (
          <span key={index} className="text-center w-8 2xl:w-12 3xl:w-16">
            {string}
          </span>
        ))}
      </div>
      
      {/* Fretboard */}
      <div className="relative bg-amber-100 p-4 2xl:p-6 3xl:p-8 rounded-lg border-2 border-amber-200">
        <svg 
          viewBox="0 0 240 200" 
          className="w-60 2xl:w-96 3xl:w-[480px] h-auto overflow-visible"
        >
          {/* Frets */}
          {Array.from({ length: frets + 1 }, (_, fret) => (
            <line
              key={`fret-${fret}`}
              x1="20"
              y1={20 + fret * 30}
              x2="220"
              y2={20 + fret * 30}
              stroke="#8B4513"
              strokeWidth={fret === 0 ? "4" : "2"}
            />
          ))}
          
          {/* Strings */}
          {Array.from({ length: strings }, (_, string) => (
            <line
              key={`string-${string}`}
              x1={20 + string * 33.33}
              y1="20"
              x2={20 + string * 33.33}
              y2="170"
              stroke="#C0C0C0"
              strokeWidth="2"
            />
          ))}
          
          {/* Finger positions */}
          {chord.fingering.map((fret, string) => {
            if (fret === 'x') return null;
            if (fret === '0') {
              return (
                <circle
                  key={`open-${string}`}
                  cx={20 + string * 33.33}
                  cy="5"
                  r="8"
                  fill="none"
                  stroke="#22C55E"
                  strokeWidth="3"
                />
              );
            }
            return (
              <circle
                key={`finger-${string}`}
                cx={20 + string * 33.33}
                cy={20 + (parseInt(fret) - 0.5) * 30}
                r="12"
                fill="#EF4444"
                stroke="#DC2626"
                strokeWidth="2"
              />
            );
          })}
          
          {/* X marks for muted strings */}
          {chord.fingering.map((fret, string) => {
            if (fret === 'x') {
              return (
                <g key={`muted-${string}`}>
                  <line
                    x1={20 + string * 33.33 - 6}
                    y1="-1"
                    x2={20 + string * 33.33 + 6}
                    y2="11"
                    stroke="#EF4444"
                    strokeWidth="3"
                    strokeLinecap="round"
                  />
                  <line
                    x1={20 + string * 33.33 + 6}
                    y1="-1"
                    x2={20 + string * 33.33 - 6}
                    y2="11"
                    stroke="#EF4444"
                    strokeWidth="3"
                    strokeLinecap="round"
                  />
                </g>
              );
            }
            return null;
          })}
          
          {/* Finger numbers */}
          {chord.fingering.map((fret, string) => {
            if (fret === 'x' || fret === '0') return null;
            return (
              <text
                key={`number-${string}`}
                x={20 + string * 33.33}
                y={20 + (parseInt(fret) - 0.5) * 30 + 5}
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
      
      {/* Legend */}
      <div className="mt-4 2xl:mt-6 3xl:mt-8 flex gap-4 2xl:gap-6 3xl:gap-8 text-sm 2xl:text-base 3xl:text-lg text-gray-600">
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
