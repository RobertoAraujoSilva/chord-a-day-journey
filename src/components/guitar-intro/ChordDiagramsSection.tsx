
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
              <h4 className="text-center font-semibold mb-3">Exemplo de Diagrama:</h4>
              <img 
                src="https://images.unsplash.com/photo-1520637836862-4d197d17c0a4?w=300&h=200&fit=crop&crop=center" 
                alt="Exemplo de diagrama de acorde mostrando linhas verticais (cordas), horizontais (trastes) e pontos indicando posição dos dedos"
                className="w-full max-w-xs mx-auto rounded-lg object-cover"
              />
            </div>
            
            <div className="bg-gradient-to-br from-orange-50 to-red-50 p-4 rounded-lg">
              <h3 className="text-lg font-semibold text-gray-700 mb-3">Importante:</h3>
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
