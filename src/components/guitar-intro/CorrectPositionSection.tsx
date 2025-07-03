
import React from 'react';
import { Hand } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

export const CorrectPositionSection = () => {
  return (
    <Card className="p-6 shadow-xl border-0 bg-white/80 backdrop-blur-sm">
      <CardContent className="p-0">
        <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center gap-2">
          <Hand className="h-6 w-6 text-orange-600" />
          Posição Correta
        </h2>
        
        <div className="grid md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-700">Como Segurar o Violão:</h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <div className="w-2 h-2 bg-orange-400 rounded-full mt-2"></div>
                <span>Sente-se com as costas retas</span>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-2 h-2 bg-orange-400 rounded-full mt-2"></div>
                <span>Apoie o violão na perna direita (ou use uma banqueta)</span>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-2 h-2 bg-orange-400 rounded-full mt-2"></div>
                <span>Braço direito sobre o corpo do violão</span>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-2 h-2 bg-orange-400 rounded-full mt-2"></div>
                <span>Mão esquerda no braço, polegar atrás</span>
              </li>
            </ul>
            
            <div className="mt-4 bg-white p-4 rounded-lg shadow-md">
              <h4 className="text-center font-semibold mb-3">Postura Correta:</h4>
              {/* Diagrama da postura */}
              <svg viewBox="0 0 200 250" className="w-full max-w-xs mx-auto">
                {/* Pessoa sentada */}
                <circle cx="100" cy="50" r="15" fill="#FBBF24" stroke="#D97706" strokeWidth="2"/>
                
                {/* Corpo */}
                <rect x="85" y="65" width="30" height="60" fill="#3B82F6" stroke="#1D4ED8" strokeWidth="2" rx="5"/>
                
                {/* Braços */}
                <rect x="60" y="75" width="20" height="40" fill="#3B82F6" stroke="#1D4ED8" strokeWidth="2" rx="3"/>
                <rect x="120" y="75" width="20" height="40" fill="#3B82F6" stroke="#1D4ED8" strokeWidth="2" rx="3"/>
                
                {/* Pernas */}
                <rect x="80" y="125" width="15" height="50" fill="#1F2937" stroke="#111827" strokeWidth="2" rx="3"/>
                <rect x="105" y="125" width="15" height="50" fill="#1F2937" stroke="#111827" strokeWidth="2" rx="3"/>
                
                {/* Cadeira */}
                <rect x="70" y="120" width="60" height="5" fill="#8B4513"/>
                <rect x="70" y="125" width="5" height="30" fill="#8B4513"/>
                <rect x="125" y="125" width="5" height="30" fill="#8B4513"/>
                <rect x="75" y="90" width="5" height="35" fill="#8B4513"/>
                
                {/* Violão */}
                <ellipse cx="115" cy="140" rx="25" ry="35" fill="#D4A574" stroke="#8B4513" strokeWidth="2"/>
                <rect x="105" y="80" width="12" height="60" fill="#CD853F" stroke="#8B4513" strokeWidth="1"/>
                
                {/* Cordas do violão */}
                <line x1="108" y1="80" x2="108" y2="175" stroke="#FFD700" strokeWidth="0.5"/>
                <line x1="110" y1="80" x2="110" y2="175" stroke="#FFD700" strokeWidth="0.5"/>
                <line x1="112" y1="80" x2="112" y2="175" stroke="#FFD700" strokeWidth="0.5"/>
                <line x1="114" y1="80" x2="114" y2="175" stroke="#FFD700" strokeWidth="0.5"/>
                
                {/* Setas e indicações */}
                <text x="20" y="60" fontSize="8" fill="#EF4444">Costas</text>
                <text x="20" y="70" fontSize="8" fill="#EF4444">Retas</text>
                <line x1="40" y1="65" x2="80" y2="80" stroke="#EF4444" strokeWidth="1" markerEnd="url(#arrowhead)"/>
                
                <text x="150" y="120" fontSize="8" fill="#EF4444">Violão na</text>
                <text x="150" y="130" fontSize="8" fill="#EF4444">perna direita</text>
                <line x1="145" y1="125" x2="125" y2="135" stroke="#EF4444" strokeWidth="1"/>
                
                {/* Definir seta */}
                <defs>
                  <marker id="arrowhead" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
                    <polygon points="0 0, 10 3.5, 0 7" fill="#EF4444"/>
                  </marker>
                </defs>
              </svg>
            </div>
          </div>
          
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-700">Numeração dos Dedos:</h3>
            
            <div className="bg-white p-4 rounded-lg shadow-md">
              <img 
                src="/lovable-uploads/3b7e2e69-17b7-46ed-b5d7-177487c7a007.png" 
                alt="Mão esquerda mostrando a numeração dos dedos: 1-indicador, 2-médio, 3-anelar, 4-mínimo"
                className="w-full max-w-xs mx-auto rounded-lg object-cover"
              />
              <div className="mt-3 text-center">
                <p className="text-sm font-semibold text-gray-700">Numeração dos Dedos:</p>
                <div className="grid grid-cols-2 gap-2 mt-2 text-sm">
                  <div className="flex items-center gap-2">
                    <span className="w-6 h-6 bg-orange-500 text-white rounded-full flex items-center justify-center text-xs font-bold">1</span>
                    <span>Indicador</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-6 h-6 bg-orange-500 text-white rounded-full flex items-center justify-center text-xs font-bold">2</span>
                    <span>Médio</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-6 h-6 bg-orange-500 text-white rounded-full flex items-center justify-center text-xs font-bold">3</span>
                    <span>Anelar</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-6 h-6 bg-orange-500 text-white rounded-full flex items-center justify-center text-xs font-bold">4</span>
                    <span>Mínimo</span>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="bg-gradient-to-br from-orange-50 to-red-50 p-4 rounded-lg">
              <h4 className="text-md font-semibold text-gray-700 mb-3">Posição das Mãos:</h4>
              
              {/* Diagrama da posição das mãos */}
              <div className="bg-white p-3 rounded-lg mb-3">
                <svg viewBox="0 0 200 100" className="w-full h-auto">
                  {/* Mão esquerda - formato C */}
                  <path d="M 30 30 Q 20 20 20 40 Q 20 60 30 70 Q 40 75 50 70 Q 60 65 60 50" 
                        fill="none" stroke="#D97706" strokeWidth="3" strokeLinecap="round"/>
                  <text x="25" y="85" fontSize="10" fill="#D97706" fontWeight="bold">Mão Esquerda - Forma "C"</text>
                  
                  {/* Braço do violão */}
                  <rect x="80" y="35" width="40" height="30" fill="#CD853F" stroke="#8B4513" strokeWidth="2" rx="3"/>
                  
                  {/* Polegar atrás */}
                  <circle cx="85" cy="50" r="4" fill="#FBBF24"/>
                  <text x="70" y="30" fontSize="8" fill="#D97706">Polegar atrás</text>
                  
                  {/* Mão direita */}
                  <path d="M 140 40 Q 150 35 160 40 Q 170 45 170 55 Q 165 65 155 65 Q 145 65 140 55" 
                        fill="none" stroke="#059669" strokeWidth="3" strokeLinecap="round"/>
                  <text x="135" y="85" fontSize="10" fill="#059669" fontWeight="bold">Mão Direita - Relaxada</text>
                </svg>
              </div>
              
              <p className="text-sm text-gray-600 mb-2">
                <strong>Mão Esquerda:</strong> Forma um "C" com polegar atrás do braço
              </p>
              <p className="text-sm text-gray-600">
                <strong>Mão Direita:</strong> Relaxada, dedos curvados sobre as cordas
              </p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
