
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
            <h3 className="text-lg font-semibold text-gray-700 mb-3">Imagem do Violão:</h3>
            <div className="flex justify-center">
              <img 
                src="https://images.unsplash.com/photo-1564186763535-ebb21ef5277f?w=400&h=600&fit=crop&crop=center" 
                alt="Violão acústico mostrando claramente suas partes principais: corpo, braço, cabeça, cavalete e trastes"
                className="w-full max-w-sm rounded-lg shadow-md object-cover"
              />
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
