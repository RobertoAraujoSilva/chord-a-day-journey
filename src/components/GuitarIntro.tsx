
import React from 'react';
import { Guitar, BookOpen } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { AnatomySection } from './guitar-intro/AnatomySection';
import { StringNamesSection } from './guitar-intro/StringNamesSection';
import { CorrectPositionSection } from './guitar-intro/CorrectPositionSection';
import { ChordDiagramsSection } from './guitar-intro/ChordDiagramsSection';

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

      {/* Sections */}
      <AnatomySection />
      <StringNamesSection />
      <CorrectPositionSection />
      <ChordDiagramsSection />

      {/* Completion Button */}
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
