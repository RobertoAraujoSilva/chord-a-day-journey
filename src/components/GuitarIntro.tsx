
import React from 'react';
import { Music, Hand, Eye, Volume2, Guitar } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

interface GuitarIntroProps {
  onComplete: () => void;
  isCompleted: boolean;
}

export const GuitarIntro = ({ onComplete, isCompleted }: GuitarIntroProps) => {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center">
        <div className="flex items-center justify-center gap-3 mb-4">
          <Guitar className="h-8 w-8 text-orange-600" />
          <h1 className="text-4xl font-bold bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">
            Lição 0: Fundamentos do Violão
          </h1>
        </div>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Antes de aprendermos os acordes, vamos entender o básico sobre o violão. 
          Esta lição é fundamental para seu sucesso!
        </p>
      </div>

      {/* Anatomia do Violão */}
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
                  src="/placeholder.svg" 
                  alt="Anatomia do violão mostrando suas partes principais"
                  className="w-full max-w-sm rounded-lg shadow-md"
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

      {/* Nome das Cordas */}
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
              
              {/* Imagem ilustrativa das cordas */}
              <div className="flex justify-center mb-4">
                <img 
                  src="/placeholder.svg" 
                  alt="Diagrama mostrando as cordas do violão numeradas de 1 a 6"
                  className="w-full max-w-xs rounded-lg shadow-md"
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

      {/* Posição Correta */}
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
              
              {/* Imagem da posição correta */}
              <div className="mt-4">
                <img 
                  src="/placeholder.svg" 
                  alt="Pessoa tocando violão na posição correta"
                  className="w-full rounded-lg shadow-md"
                />
              </div>
            </div>
            
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-700">Numeração dos Dedos:</h3>
              
              {/* Imagem da numeração dos dedos */}
              <div className="bg-white p-4 rounded-lg shadow-md">
                <img 
                  src="/placeholder.svg" 
                  alt="Mão mostrando a numeração dos dedos: 1-indicador, 2-médio, 3-anelar, 4-mínimo"
                  className="w-full max-w-xs mx-auto rounded-lg"
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

      {/* Como Ler Diagramas */}
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
              {/* Exemplo visual de diagrama */}
              <div className="bg-white p-4 rounded-lg shadow-md">
                <h4 className="text-center font-semibold mb-3">Exemplo de Diagrama:</h4>
                <img 
                  src="/placeholder.svg" 
                  alt="Exemplo de diagrama de acorde mostrando linhas verticais (cordas), horizontais (trastes) e pontos indicando posição dos dedos"
                  className="w-full max-w-xs mx-auto rounded-lg"
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

      {/* Botão de Conclusão */}
      <div className="text-center">
        <Button
          onClick={onComplete}
          disabled={isCompleted}
          className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white px-8 py-3 text-lg"
        >
          {isCompleted ? '✓ Lição Concluída' : 'Concluir Lição Introdutória'}
        </Button>
        
        {isCompleted && (
          <p className="text-green-600 mt-4 font-medium">
            ✅ Parabéns! Agora você pode começar a aprender os acordes.
          </p>
        )}
      </div>
    </div>
  );
};
