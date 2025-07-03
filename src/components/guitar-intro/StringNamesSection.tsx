
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
              {/* Diagrama das cordas */}
              <div className="bg-white p-4 rounded-lg shadow-md">
                <h4 className="text-center font-semibold mb-3">Diagrama das Cordas:</h4>
                <svg viewBox="0 0 150 200" className="w-32 h-auto mx-auto">
                  {/* Braço do violão */}
                  <rect x="50" y="20" width="50" height="160" fill="#CD853F" stroke="#8B4513" strokeWidth="2"/>
                  
                  {/* Cordas com espessuras diferentes */}
                  <line x1="55" y1="20" x2="55" y2="180" stroke="#FFD700" strokeWidth="3"/>
                  <line x1="62" y1="20" x2="62" y2="180" stroke="#FFD700" strokeWidth="2.5"/>
                  <line x1="69" y1="20" x2="69" y2="180" stroke="#FFD700" strokeWidth="2"/>
                  <line x1="76" y1="20" x2="76" y2="180" stroke="#FFD700" strokeWidth="1.5"/>
                  <line x1="83" y1="20" x2="83" y2="180" stroke="#FFD700" strokeWidth="1"/>
                  <line x1="90" y1="20" x2="90" y2="180" stroke="#FFD700" strokeWidth="0.8"/>
                  
                  {/* Numeração das cordas */}
                  <text x="55" y="15" textAnchor="middle" fontSize="12" fill="#333" fontWeight="bold">6</text>
                  <text x="62" y="15" textAnchor="middle" fontSize="12" fill="#333" fontWeight="bold">5</text>
                  <text x="69" y="15" textAnchor="middle" fontSize="12" fill="#333" fontWeight="bold">4</text>
                  <text x="76" y="15" textAnchor="middle" fontSize="12" fill="#333" fontWeight="bold">3</text>
                  <text x="83" y="15" textAnchor="middle" fontSize="12" fill="#333" fontWeight="bold">2</text>
                  <text x="90" y="15" textAnchor="middle" fontSize="12" fill="#333" fontWeight="bold">1</text>
                  
                  {/* Notas das cordas */}
                  <text x="55" y="195" textAnchor="middle" fontSize="10" fill="#D97706" fontWeight="bold">E</text>
                  <text x="62" y="195" textAnchor="middle" fontSize="10" fill="#D97706" fontWeight="bold">A</text>
                  <text x="69" y="195" textAnchor="middle" fontSize="10" fill="#D97706" fontWeight="bold">D</text>
                  <text x="76" y="195" textAnchor="middle" fontSize="10" fill="#D97706" fontWeight="bold">G</text>
                  <text x="83" y="195" textAnchor="middle" fontSize="10" fill="#D97706" fontWeight="bold">B</text>
                  <text x="90" y="195" textAnchor="middle" fontSize="10" fill="#D97706" fontWeight="bold">E</text>
                  
                  {/* Trastes */}
                  <line x1="50" y1="40" x2="100" y2="40" stroke="#C0C0C0" strokeWidth="1"/>
                  <line x1="50" y1="60" x2="100" y2="60" stroke="#C0C0C0" strokeWidth="1"/>
                  <line x1="50" y1="80" x2="100" y2="80" stroke="#C0C0C0" strokeWidth="1"/>
                  
                  {/* Setas indicando direção */}
                  <text x="20" y="50" fontSize="8" fill="#666">Mais</text>
                  <text x="20" y="60" fontSize="8" fill="#666">Grave</text>
                  <text x="20" y="140" fontSize="8" fill="#666">Mais</text>
                  <text x="20" y="150" fontSize="8" fill="#666">Aguda</text>
                </svg>
              </div>
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
