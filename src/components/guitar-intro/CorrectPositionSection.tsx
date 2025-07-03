
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
            
            <div className="mt-4">
              <img 
                src="https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=300&fit=crop&crop=center" 
                alt="Pessoa tocando violão na posição correta"
                className="w-full rounded-lg shadow-md object-cover"
              />
            </div>
          </div>
          
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-700">Numeração dos Dedos:</h3>
            
            <div className="bg-white p-4 rounded-lg shadow-md">
              <img 
                src="https://images.unsplash.com/photo-1584464491033-06628f3a6b7b?w=300&h=200&fit=crop&crop=center" 
                alt="Mão mostrando a numeração dos dedos: 1-indicador, 2-médio, 3-anelar, 4-mínimo"
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
              <h4 className="text-md font-semibold text-gray-700 mb-2">Posição das Mãos:</h4>
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
