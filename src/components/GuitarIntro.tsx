

import { Music, Hand, Eye, Volume2, Guitar } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useTranslation } from '@/i18n/context';

interface GuitarIntroProps {
  onComplete: () => void;
  isCompleted: boolean;
}

export const GuitarIntro = ({ onComplete, isCompleted }: GuitarIntroProps) => {
  const { t } = useTranslation();
  
  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center">
        <div className="flex items-center justify-center gap-3 mb-4">
          <Guitar className="h-8 w-8 text-orange-600" />
          <h1 className="text-4xl font-bold bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">
            {t('lessons.intro.lesson_title')}
          </h1>
        </div>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          {t('lessons.intro.lesson_description')}
        </p>
      </div>

      {/* Anatomia do Violão */}
      <Card className="p-6 shadow-xl border-0 bg-white/80 backdrop-blur-sm">
        <CardContent className="p-0">
          <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center gap-2">
            <Eye className="h-6 w-6 text-orange-600" />
            {t('lessons.intro.anatomy_title')}
          </h2>
          
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-700">{t('lessons.intro.anatomy_parts')}</h3>
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-orange-400 rounded-full mt-2"></div>
                  <div>
                    {t('lessons.intro.body')}
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-orange-400 rounded-full mt-2"></div>
                  <div>
                    {t('lessons.intro.neck')}
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-orange-400 rounded-full mt-2"></div>
                  <div>
                    {t('lessons.intro.bridge')}
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-orange-400 rounded-full mt-2"></div>
                  <div>
                    {t('lessons.intro.headstock')}
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-orange-400 rounded-full mt-2"></div>
                  <div>
                    {t('lessons.intro.frets')}
                  </div>
                </div>
              </div>
            </div>
            
            <div className="bg-gradient-to-br from-orange-50 to-red-50 p-4 rounded-lg">
              <h3 className="text-lg font-semibold text-gray-700 mb-3">{t('ui.labels.important_tip')}</h3>
              <p className="text-gray-600">
                {t('lessons.intro.anatomy_tip')}
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
            {t('lessons.intro.strings_title')}
          </h2>
          
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-700 mb-4">
                {t('lessons.intro.strings_description')}
              </h3>
              
              <div className="space-y-3">
                <div className="flex items-center gap-4 p-3 bg-gray-50 rounded-lg">
                  <span className="text-2xl font-bold text-gray-800 w-8">6ª</span>
                  <span className="text-xl font-semibold text-orange-600">E</span>
                  <span className="text-gray-600">{t('lessons.intro.string_6')}</span>
                </div>
                <div className="flex items-center gap-4 p-3 bg-gray-50 rounded-lg">
                  <span className="text-2xl font-bold text-gray-800 w-8">5ª</span>
                  <span className="text-xl font-semibold text-orange-600">A</span>
                  <span className="text-gray-600">{t('lessons.intro.string_5')}</span>
                </div>
                <div className="flex items-center gap-4 p-3 bg-gray-50 rounded-lg">
                  <span className="text-2xl font-bold text-gray-800 w-8">4ª</span>
                  <span className="text-xl font-semibold text-orange-600">D</span>
                  <span className="text-gray-600">{t('lessons.intro.string_4')}</span>
                </div>
                <div className="flex items-center gap-4 p-3 bg-gray-50 rounded-lg">
                  <span className="text-2xl font-bold text-gray-800 w-8">3ª</span>
                  <span className="text-xl font-semibold text-orange-600">G</span>
                  <span className="text-gray-600">{t('lessons.intro.string_3')}</span>
                </div>
                <div className="flex items-center gap-4 p-3 bg-gray-50 rounded-lg">
                  <span className="text-2xl font-bold text-gray-800 w-8">2ª</span>
                  <span className="text-xl font-semibold text-orange-600">B</span>
                  <span className="text-gray-600">{t('lessons.intro.string_2')}</span>
                </div>
                <div className="flex items-center gap-4 p-3 bg-gray-50 rounded-lg">
                  <span className="text-2xl font-bold text-gray-800 w-8">1ª</span>
                  <span className="text-xl font-semibold text-orange-600">E</span>
                  <span className="text-gray-600">{t('lessons.intro.string_1')}</span>
                </div>
              </div>
            </div>
            
            <div className="bg-gradient-to-br from-orange-50 to-red-50 p-4 rounded-lg">
              <h3 className="text-lg font-semibold text-gray-700 mb-3">{t('lessons.intro.strings_mnemonic')}</h3>
              <p className="text-gray-600 mb-3">
                <strong>{t('lessons.intro.strings_phrase')}</strong>
              </p>
              <p className="text-sm text-gray-500">
                (E-A-D-G-B-E)
              </p>
              <div className="mt-4 p-3 bg-white rounded border">
                <p className="text-sm text-gray-600">
                  💡 <strong>{t('ui.labels.important_tip').replace(':', '')}:</strong> {t('lessons.intro.strings_tip')}
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
            {t('lessons.intro.position_title')}
          </h2>
          
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-700">{t('lessons.intro.position_how')}</h3>
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-orange-400 rounded-full mt-2"></div>
                  <span>{t('lessons.intro.position_sit')}</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-orange-400 rounded-full mt-2"></div>
                  <span>{t('lessons.intro.position_leg')}</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-orange-400 rounded-full mt-2"></div>
                  <span>{t('lessons.intro.position_right_arm')}</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-orange-400 rounded-full mt-2"></div>
                  <span>{t('lessons.intro.position_left_hand')}</span>
                </li>
              </ul>
            </div>
            
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-700">{t('lessons.intro.position_hands')}</h3>
              <div className="bg-gradient-to-br from-orange-50 to-red-50 p-4 rounded-lg">
                <p className="text-sm text-gray-600 mb-2">
                  <strong>{t('lessons.intro.position_left_desc')}</strong>
                </p>
                <p className="text-sm text-gray-600">
                  <strong>{t('lessons.intro.position_right_desc')}</strong>
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
            {t('lessons.intro.diagrams_title')}
          </h2>
          
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <p className="text-gray-600">
                {t('lessons.intro.diagrams_description')}
              </p>
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-orange-400 rounded-full mt-2"></div>
                  <span><strong>{t('lessons.intro.diagrams_vertical')}</strong></span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-orange-400 rounded-full mt-2"></div>
                  <span><strong>{t('lessons.intro.diagrams_horizontal')}</strong></span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-orange-400 rounded-full mt-2"></div>
                  <span><strong>{t('lessons.intro.diagrams_dots')}</strong></span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-orange-400 rounded-full mt-2"></div>
                  <span><strong>{t('lessons.intro.diagrams_numbers')}</strong></span>
                </li>
              </ul>
            </div>
            
            <div className="bg-gradient-to-br from-orange-50 to-red-50 p-4 rounded-lg">
              <h3 className="text-lg font-semibold text-gray-700 mb-3">{t('ui.labels.important_tip').replace(':', '')}:</h3>
              <p className="text-gray-600 text-sm">
                {t('lessons.intro.diagrams_tip')}
              </p>
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
          {isCompleted ? t('ui.buttons.intro_completed') : t('ui.buttons.complete_intro')}
        </Button>
        
        {isCompleted && (
          <p className="text-green-600 mt-4 font-medium">
            ✅ {t('lessons.intro.congratulations')}
          </p>
        )}
      </div>
    </div>
  );
};
