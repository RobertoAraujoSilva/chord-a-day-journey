
import React from 'react';
import { Volume2 } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

export const ChordDiagramsSection = () => {
  return (
    <Card className="p-6 shadow-xl border-0 bg-white/80 backdrop-blur-sm">
      <CardContent className="p-0">
        <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center gap-2">
          <Volume2 className="h-6 w-6 text-orange-600" />
          Como Ler Diagramas de Acordes
        </h2>
        
        <div className="grid md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <p className="text-gray-600">
              Os diagramas mostram onde colocar os dedos no braço do violão:
            </p>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <div className="w-2 h-2 bg-orange-400 rounded-full mt-2"></div>
                <span><strong>Linhas verticais:</strong> Representam as cordas</span>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-2 h-2 bg-orange-400 rounded-full mt-2"></div>
                <span><strong>Linhas horizontais:</strong> Representam os trastes</span>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-2 h-2 bg-orange-400 rounded-full mt-2"></div>
                <span><strong>Pontos pretos:</strong> Onde pressionar as cordas</span>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-2 h-2 bg-orange-400 rounded-full mt-2"></div>
                <span><strong>Números:</strong> Indicam qual dedo usar (1=indicador, 2=médio, 3=anelar, 4=mínimo)</span>
              </li>
            </ul>
          </div>
          
          <div className="space-y-4">
            <div className="bg-white p-4 rounded-lg shadow-md">
              <h4 className="text-center font-semibold mb-3">Exemplo de Diagrama de Acorde:</h4>
              
              {/* Diagrama de acorde ilustrativo */}
              <div className="flex justify-center mb-4">
                <svg viewBox="0 0 120 140" className="w-32 h-auto">
                  {/* Grade do diagrama */}
                  {/* Linhas verticais (cordas) */}
                  <line x1="20" y1="20" x2="20" y2="120" stroke="#333" strokeWidth="2"/>
                  <line x1="35" y1="20" x2="35" y2="120" stroke="#333" strokeWidth="2"/>
                  <line x1="50" y1="20" x2="50" y2="120" stroke="#333" strokeWidth="2"/>
                  <line x1="65" y1="20" x2="65" y2="120" stroke="#333" strokeWidth="2"/>
                  <line x1="80" y1="20" x2="80" y2="120" stroke="#333" strokeWidth="2"/>
                  <line x1="95" y1="20" x2="95" y2="120" stroke="#333" strokeWidth="2"/>
                  
                  {/* Linhas horizontais (trastes) */}
                  <line x1="20" y1="20" x2="95" y2="20" stroke="#333" strokeWidth="3"/>
                  <line x1="20" y1="40" x2="95" y2="40" stroke="#666" strokeWidth="1"/>
                  <line x1="20" y1="60" x2="95" y2="60" stroke="#666" strokeWidth="1"/>
                  <line x1="20" y1="80" x2="95" y2="80" stroke="#666" strokeWidth="1"/>
                  <line x1="20" y1="100" x2="95" y2="100" stroke="#666" strokeWidth="1"/>
                  <line x1="20" y1="120" x2="95" y2="120" stroke="#666" strokeWidth="1"/>
                  
                  {/* Pontos pretos indicando onde pressionar */}
                  <circle cx="35" cy="50" r="4" fill="#000"/>
                  <circle cx="65" cy="50" r="4" fill="#000"/>
                  <circle cx="80" cy="70" r="4" fill="#000"/>
                  
                  {/* Números dos dedos */}
                  <text x="35" y="55" textAnchor="middle" fontSize="8" fill="white" fontWeight="bold">1</text>
                  <text x="65" y="55" textAnchor="middle" fontSize="8" fill="white" fontWeight="bold">2</text>
                  <text x="80" y="75" textAnchor="middle" fontSize="8" fill="white" fontWeight="bold">3</text>
                  
                  {/* Numeração das cordas */}
                  <text x="20" y="15" textAnchor="middle" fontSize="8" fill="#666">6</text>
                  <text x="35" y="15" textAnchor="middle" fontSize="8" fill="#666">5</text>
                  <text x="50" y="15" textAnchor="middle" fontSize="8" fill="#666">4</text>
                  <text x="65" y="15" textAnchor="middle" fontSize="8" fill="#666">3</text>
                  <text x="80" y="15" textAnchor="middle" fontSize="8" fill="#666">2</text>
                  <text x="95" y="15" textAnchor="middle" fontSize="8" fill="#666">1</text>
                  
                  {/* Labels explicativos */}
                  <text x="110" y="30" fontSize="6" fill="#D97706">Cordas (linhas verticais)</text>
                  <text x="110" y="60" fontSize="6" fill="#D97706">Trastes (linhas horizontais)</text>
                  <text x="110" y="90" fontSize="6" fill="#D97706">Pontos = onde pressionar</text>
                  <text x="110" y="100" fontSize="6" fill="#D97706">Números = dedos</text>
                </svg>
              </div>
              
              <div className="text-center text-sm text-gray-600">
                <p className="mb-1"><strong>Como ler:</strong></p>
                <p>• Linhas verticais = cordas (1-6)</p>
                <p>• Linhas horizontais = trastes</p>
                <p>• Pontos pretos = pressione aqui</p>
                <p>• Números = qual dedo usar</p>
              </div>
            </div>
            
            <div className="bg-gradient-to-br from-orange-50 to-red-50 p-4 rounded-lg">
              <h3 className="text-lg font-semibold text-gray-700 mb-3">Importante:</h3>
              
              {/* Diagrama mostrando onde pressionar */}
              <div className="bg-white p-3 rounded-lg mb-3">
                <svg viewBox="0 0 100 60" className="w-full h-auto">
                  {/* Traste */}
                  <rect x="10" y="25" width="80" height="4" fill="#C0C0C0"/>
                  <text x="50" y="15" textAnchor="middle" fontSize="10" fill="#333">Traste</text>
                  
                  {/* Posição incorreta (em cima) */}
                  <circle cx="30" cy="27" r="3" fill="#EF4444"/>
                  <text x="30" y="45" textAnchor="middle" fontSize="8" fill="#EF4444">❌ Em cima</text>
                  
                  {/* Posição correta (atrás) */}
                  <circle cx="70" cy="20" r="3" fill="#059669"/>
                  <text x="70" y="45" textAnchor="middle" fontSize="8" fill="#059669">✓ Atrás</text>
                </svg>
              </div>
              
              <p className="text-gray-600 text-sm">
                Sempre pressione as cordas logo atrás do traste (não em cima dele) 
                para obter um som limpo e claro.
              </p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
