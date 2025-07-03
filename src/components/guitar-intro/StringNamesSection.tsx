
import React from 'react';
import { Music } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

export const StringNamesSection = () => {
  return (
    <Card className="p-6 shadow-xl border-0 bg-white/80 backdrop-blur-sm">
      <CardContent className="p-0">
        <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center gap-2">
          <Music className="h-6 w-6 text-orange-600" />
          Nome das Cordas
        </h2>
        
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <h3 className="text-lg font-semibold text-gray-700 mb-4">
              Da mais grave (grossa) para a mais aguda (fina):
            </h3>
            
            <div className="space-y-3">
              <div className="flex items-center gap-4 p-3 bg-gray-50 rounded-lg">
                <span className="text-2xl font-bold text-gray-800 w-8">6ª</span>
                <span className="text-xl font-semibold text-orange-600">E</span>
                <span className="text-gray-600">(Mi) - Mais grave</span>
              </div>
              <div className="flex items-center gap-4 p-3 bg-gray-50 rounded-lg">
                <span className="text-2xl font-bold text-gray-800 w-8">5ª</span>
                <span className="text-xl font-semibold text-orange-600">A</span>
                <span className="text-gray-600">(Lá)</span>
              </div>
              <div className="flex items-center gap-4 p-3 bg-gray-50 rounded-lg">
                <span className="text-2xl font-bold text-gray-800 w-8">4ª</span>
                <span className="text-xl font-semibold text-orange-600">D</span>
                <span className="text-gray-600">(Ré)</span>
              </div>
              <div className="flex items-center gap-4 p-3 bg-gray-50 rounded-lg">
                <span className="text-2xl font-bold text-gray-800 w-8">3ª</span>
                <span className="text-xl font-semibold text-orange-600">G</span>
                <span className="text-gray-600">(Sol)</span>
              </div>
              <div className="flex items-center gap-4 p-3 bg-gray-50 rounded-lg">
                <span className="text-2xl font-bold text-gray-800 w-8">2ª</span>
                <span className="text-xl font-semibold text-orange-600">B</span>
                <span className="text-gray-600">(Si)</span>
              </div>
              <div className="flex items-center gap-4 p-3 bg-gray-50 rounded-lg">
                <span className="text-2xl font-bold text-gray-800 w-8">1ª</span>
                <span className="text-xl font-semibold text-orange-600">E</span>
                <span className="text-gray-600">(Mi) - Mais aguda</span>
              </div>
            </div>
          </div>
          
          <div className="bg-gradient-to-br from-orange-50 to-red-50 p-4 rounded-lg">
            <h3 className="text-lg font-semibold text-gray-700 mb-3">Macete para Decorar:</h3>
            <p className="text-gray-600 mb-3">
              <strong>"Eu Aprendo Depois Guitarra, Baixo, Então"</strong>
            </p>
            <p className="text-sm text-gray-500 mb-4">
              (E-A-D-G-B-E)
            </p>
            
            <div className="flex justify-center mb-4">
              <img 
                src="https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=300&h=200&fit=crop&crop=center" 
                alt="Diagrama mostrando as cordas do violão numeradas de 1 a 6"
                className="w-full max-w-xs rounded-lg shadow-md object-cover"
              />
            </div>
            
            <div className="p-3 bg-white rounded border">
              <p className="text-sm text-gray-600">
                💡 <strong>Dica:</strong> As cordas são contadas de baixo para cima 
                quando você está segurando o violão normalmente.
              </p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
