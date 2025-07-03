
import { Chord } from '@/data/chords';

interface ChordDiagramProps {
  chord: Chord;
}

export const ChordDiagram = ({ chord }: ChordDiagramProps) => {
  const frets = 5;
  const strings = 6;

  return (
    <div className="flex flex-col items-center">
      {/* String names */}
      <div className="flex justify-between w-64 mb-2 text-sm font-medium text-gray-600">
        {['E', 'A', 'D', 'G', 'B', 'E'].map((string, index) => (
          <span key={index} className="text-center w-8">
            {string}
          </span>
        ))}
      </div>
      
      {/* Fretboard */}
      <div className="relative bg-amber-100 p-4 rounded-lg border-2 border-amber-200">
        <svg width="240" height="200" className="overflow-visible">
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
      <div className="mt-4 flex gap-6 text-sm text-gray-600">
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded-full bg-red-500"></div>
          <span>Dedo pressionado</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded-full border-2 border-green-500"></div>
          <span>Corda solta</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 flex items-center justify-center text-red-500 font-bold">×</div>
          <span>Não tocar</span>
        </div>
      </div>
    </div>
  );
};
