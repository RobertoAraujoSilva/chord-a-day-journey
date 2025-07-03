
import React from 'react';
import { Eye } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

export const AnatomySection = () => {
  return (
    <Card className="p-6 shadow-xl border-0 bg-white/80 backdrop-blur-sm">
      <CardContent className="p-0">
        <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center gap-2">
          <Eye className="h-6 w-6 text-orange-600" />
          Anatomia do Violão
        </h2>
        
        <div className="grid md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-700">Partes Principais:</h3>
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 bg-orange-400 rounded-full mt-2"></div>
                <div>
                  <strong>Corpo (Body):</strong> A parte maior que amplifica o som
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 bg-orange-400 rounded-full mt-2"></div>
                <div>
                  <strong>Braço (Neck):</strong> Onde você pressiona as cordas
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 bg-orange-400 rounded-full mt-2"></div>
                <div>
                  <strong>Cavalete (Bridge):</strong> Onde as cordas se fixam no corpo
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 bg-orange-400 rounded-full mt-2"></div>
                <div>
                  <strong>Cabeça (Headstock):</strong> Onde ficam as tarraxas
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 bg-orange-400 rounded-full mt-2"></div>
                <div>
                  <strong>Trastes (Frets):</strong> As divisões metálicas no braço
                </div>
              </div>
            </div>
          </div>
          
          <div className="bg-gradient-to-br from-orange-50 to-red-50 p-4 rounded-lg">
            <h3 className="text-lg font-semibold text-gray-700 mb-3">Diagrama do Violão:</h3>
            <div className="flex justify-center">
              {/* Diagrama ilustrativo das partes do violão */}
              <div className="w-full max-w-sm">
                <svg viewBox="0 0 200 300" className="w-full h-auto">
                  {/* Corpo do violão */}
                  <ellipse cx="100" cy="200" rx="60" ry="80" fill="#D4A574" stroke="#8B4513" strokeWidth="2"/>
                  
                  {/* Braço */}
                  <rect x="85" y="50" width="30" height="120" fill="#CD853F" stroke="#8B4513" strokeWidth="1"/>
                  
                  {/* Cabeça */}
                  <rect x="80" y="20" width="40" height="40" fill="#CD853F" stroke="#8B4513" strokeWidth="1"/>
                  
                  {/* Trastes */}
                  <line x1="85" y1="60" x2="115" y2="60" stroke="#C0C0C0" strokeWidth="2"/>
                  <line x1="85" y1="80" x2="115" y2="80" stroke="#C0C0C0" strokeWidth="2"/>
                  <line x1="85" y1="100" x2="115" y2="100" stroke="#C0C0C0" strokeWidth="2"/>
                  <line x1="85" y1="120" x2="115" y2="120" stroke="#C0C0C0" strokeWidth="2"/>
                  <line x1="85" y1="140" x2="115" y2="140" stroke="#C0C0C0" strokeWidth="2"/>
                  
                  {/* Cordas */}
                  <line x1="90" y1="40" x2="90" y2="260" stroke="#FFD700" strokeWidth="1"/>
                  <line x1="94" y1="40" x2="94" y2="260" stroke="#FFD700" strokeWidth="1"/>
                  <line x1="98" y1="40" x2="98" y2="260" stroke="#FFD700" strokeWidth="1"/>
                  <line x1="102" y1="40" x2="102" y2="260" stroke="#FFD700" strokeWidth="1"/>
                  <line x1="106" y1="40" x2="106" y2="260" stroke="#FFD700" strokeWidth="1"/>
                  <line x1="110" y1="40" x2="110" y2="260" stroke="#FFD700" strokeWidth="1"/>
                  
                  {/* Cavalete */}
                  <rect x="85" y="250" width="30" height="8" fill="#8B4513"/>
                  
                  {/* Boca do violão */}
                  <circle cx="100" cy="180" r="20" fill="#654321" stroke="#8B4513" strokeWidth="2"/>
                  
                  {/* Labels */}
                  <text x="20" y="40" fontSize="10" fill="#333">Cabeça</text>
                  <text x="20" y="110" fontSize="10" fill="#333">Braço</text>
                  <text x="130" y="80" fontSize="10" fill="#333">Trastes</text>
                  <text x="130" y="200" fontSize="10" fill="#333">Corpo</text>
                  <text x="130" y="260" fontSize="10" fill="#333">Cavalete</text>
                </svg>
              </div>
            </div>
            <p className="text-gray-600 text-center mt-3 text-sm">
              Familiarize-se com essas partes. Cada uma tem um papel importante 
              na produção do som e na sua técnica de tocar.
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
