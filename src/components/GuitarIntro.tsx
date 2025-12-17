

import { Music, Hand, Eye, Volume2, Guitar, Play, CheckCircle2, ArrowRight } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { useTranslation } from '@/i18n/context';
import { useState } from 'react';

interface GuitarIntroProps {
  onComplete: () => void;
  isCompleted: boolean;
}

// String frequencies for audio playback
const STRING_FREQUENCIES = {
  E6: 82.41,   // 6th string - Low E
  A5: 110.00,  // 5th string - A
  D4: 146.83,  // 4th string - D
  G3: 196.00,  // 3rd string - G
  B2: 246.94,  // 2nd string - B
  E1: 329.63,  // 1st string - High E
};

export const GuitarIntro = ({ onComplete, isCompleted }: GuitarIntroProps) => {
  const { t } = useTranslation();
  const [playingString, setPlayingString] = useState<string | null>(null);
  const [checklist, setChecklist] = useState({
    anatomy: false,
    strings: false,
    position: false,
    diagrams: false,
  });

  const playString = async (stringName: string, frequency: number) => {
    setPlayingString(stringName);
    
    try {
      const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
      
      // Create oscillator for the string sound
      const oscillator = audioContext.createOscillator();
      const gainNode = audioContext.createGain();
      
      oscillator.connect(gainNode);
      gainNode.connect(audioContext.destination);
      
      oscillator.frequency.setValueAtTime(frequency, audioContext.currentTime);
      oscillator.type = 'triangle'; // Softer sound
      
      // Envelope for plucked string effect
      gainNode.gain.setValueAtTime(0, audioContext.currentTime);
      gainNode.gain.linearRampToValueAtTime(0.3, audioContext.currentTime + 0.01);
      gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 1.5);
      
      oscillator.start(audioContext.currentTime);
      oscillator.stop(audioContext.currentTime + 1.5);
      
      setTimeout(() => setPlayingString(null), 1500);
    } catch (error) {
      console.error('Error playing string sound:', error);
      setPlayingString(null);
    }
  };

  const toggleChecklistItem = (item: keyof typeof checklist) => {
    setChecklist(prev => ({ ...prev, [item]: !prev[item] }));
  };

  const allChecked = Object.values(checklist).every(v => v);
  
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
      <Card className="p-6 2xl:p-8 3xl:p-12 shadow-xl border-0 bg-white/80 backdrop-blur-sm">
        <CardContent className="p-0">
          <h2 className="text-2xl 2xl:text-3xl 3xl:text-4xl font-bold text-gray-800 mb-4 2xl:mb-6 flex items-center gap-2">
            <Eye className="h-6 w-6 2xl:h-7 2xl:w-7 3xl:h-9 3xl:w-9 text-orange-600" />
            {t('lessons.intro.anatomy_title')}
          </h2>
          
          {/* Guitar Anatomy Image */}
          <div className="mb-6 2xl:mb-8">
            <img 
              src="/The-Parts-of-an-Acoustic-Guitar.jpg" 
              alt="Guitar Anatomy Diagram"
              className="w-full max-w-3xl mx-auto rounded-lg shadow-lg"
            />
          </div>
          
          <div className="grid md:grid-cols-2 gap-6 2xl:gap-8">
            <div className="space-y-4 2xl:space-y-6">
              <h3 className="text-lg 2xl:text-xl 3xl:text-2xl font-semibold text-gray-700">{t('lessons.intro.anatomy_parts')}</h3>
              <div className="space-y-3 2xl:space-y-4">
                <div className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                  <CheckCircle2 className="h-5 w-5 2xl:h-6 2xl:w-6 text-orange-500 flex-shrink-0 mt-0.5" />
                  <div className="text-sm 2xl:text-base 3xl:text-lg">
                    <strong className="text-gray-800">{t('lessons.intro.body').split(':')[0]}:</strong>
                    <span className="text-gray-600"> {t('lessons.intro.body').split(':')[1]}</span>
                  </div>
                </div>
                <div className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                  <CheckCircle2 className="h-5 w-5 2xl:h-6 2xl:w-6 text-orange-500 flex-shrink-0 mt-0.5" />
                  <div className="text-sm 2xl:text-base 3xl:text-lg">
                    <strong className="text-gray-800">{t('lessons.intro.neck').split(':')[0]}:</strong>
                    <span className="text-gray-600"> {t('lessons.intro.neck').split(':')[1]}</span>
                  </div>
                </div>
                <div className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                  <CheckCircle2 className="h-5 w-5 2xl:h-6 2xl:w-6 text-orange-500 flex-shrink-0 mt-0.5" />
                  <div className="text-sm 2xl:text-base 3xl:text-lg">
                    <strong className="text-gray-800">{t('lessons.intro.bridge').split(':')[0]}:</strong>
                    <span className="text-gray-600"> {t('lessons.intro.bridge').split(':')[1]}</span>
                  </div>
                </div>
                <div className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                  <CheckCircle2 className="h-5 w-5 2xl:h-6 2xl:w-6 text-orange-500 flex-shrink-0 mt-0.5" />
                  <div className="text-sm 2xl:text-base 3xl:text-lg">
                    <strong className="text-gray-800">{t('lessons.intro.headstock').split(':')[0]}:</strong>
                    <span className="text-gray-600"> {t('lessons.intro.headstock').split(':')[1]}</span>
                  </div>
                </div>
                <div className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                  <CheckCircle2 className="h-5 w-5 2xl:h-6 2xl:w-6 text-orange-500 flex-shrink-0 mt-0.5" />
                  <div className="text-sm 2xl:text-base 3xl:text-lg">
                    <strong className="text-gray-800">{t('lessons.intro.frets').split(':')[0]}:</strong>
                    <span className="text-gray-600"> {t('lessons.intro.frets').split(':')[1]}</span>
                  </div>
                </div>
              </div>
              
              {/* Checklist item */}
              <div className="flex items-center gap-3 p-4 bg-orange-50 rounded-lg border-2 border-orange-200">
                <Checkbox 
                  id="anatomy-check"
                  checked={checklist.anatomy}
                  onCheckedChange={() => toggleChecklistItem('anatomy')}
                />
                <label htmlFor="anatomy-check" className="text-sm 2xl:text-base font-medium text-gray-700 cursor-pointer">
                  ✓ {t('lessons.intro.checklist_anatomy')}
                </label>
              </div>
            </div>
            
            <div className="bg-gradient-to-br from-orange-50 to-red-50 p-4 2xl:p-6 rounded-lg">
              <h3 className="text-lg 2xl:text-xl 3xl:text-2xl font-semibold text-gray-700 mb-3">{t('ui.labels.important_tip')}</h3>
              <p className="text-gray-600 text-sm 2xl:text-base 3xl:text-lg">
                {t('lessons.intro.anatomy_tip')}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Nome das Cordas */}
      <Card className="p-6 2xl:p-8 3xl:p-12 shadow-xl border-0 bg-white/80 backdrop-blur-sm">
        <CardContent className="p-0">
          <h2 className="text-2xl 2xl:text-3xl 3xl:text-4xl font-bold text-gray-800 mb-4 2xl:mb-6 flex items-center gap-2">
            <Music className="h-6 w-6 2xl:h-7 2xl:w-7 3xl:h-9 3xl:w-9 text-orange-600" />
            {t('lessons.intro.strings_title')}
          </h2>
          
          <div className="grid md:grid-cols-2 gap-6 2xl:gap-8">
            <div>
              <h3 className="text-lg 2xl:text-xl 3xl:text-2xl font-semibold text-gray-700 mb-4 2xl:mb-6">
                {t('lessons.intro.strings_description')}
              </h3>
              
              <div className="space-y-3 2xl:space-y-4">
                {/* String 6 - E */}
                <div className="flex items-center justify-between gap-4 p-3 2xl:p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                  <div className="flex items-center gap-4 flex-1">
                    <span className="text-2xl 2xl:text-3xl font-bold text-gray-800 w-8 2xl:w-12">6ª</span>
                    <span className="text-xl 2xl:text-2xl font-semibold text-orange-600 w-8">E</span>
                    <span className="text-gray-600 text-sm 2xl:text-base">{t('lessons.intro.string_6')}</span>
                  </div>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => playString('E6', STRING_FREQUENCIES.E6)}
                    disabled={playingString === 'E6'}
                    className="flex items-center gap-2 bg-orange-50 hover:bg-orange-100 border-orange-200"
                  >
                    <Play className="h-3 w-3 2xl:h-4 2xl:w-4" />
                    <span className="text-xs 2xl:text-sm">{playingString === 'E6' ? '...' : t('ui.labels.play')}</span>
                  </Button>
                </div>

                {/* String 5 - A */}
                <div className="flex items-center justify-between gap-4 p-3 2xl:p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                  <div className="flex items-center gap-4 flex-1">
                    <span className="text-2xl 2xl:text-3xl font-bold text-gray-800 w-8 2xl:w-12">5ª</span>
                    <span className="text-xl 2xl:text-2xl font-semibold text-orange-600 w-8">A</span>
                    <span className="text-gray-600 text-sm 2xl:text-base">{t('lessons.intro.string_5')}</span>
                  </div>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => playString('A5', STRING_FREQUENCIES.A5)}
                    disabled={playingString === 'A5'}
                    className="flex items-center gap-2 bg-orange-50 hover:bg-orange-100 border-orange-200"
                  >
                    <Play className="h-3 w-3 2xl:h-4 2xl:w-4" />
                    <span className="text-xs 2xl:text-sm">{playingString === 'A5' ? '...' : t('ui.labels.play')}</span>
                  </Button>
                </div>

                {/* String 4 - D */}
                <div className="flex items-center justify-between gap-4 p-3 2xl:p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                  <div className="flex items-center gap-4 flex-1">
                    <span className="text-2xl 2xl:text-3xl font-bold text-gray-800 w-8 2xl:w-12">4ª</span>
                    <span className="text-xl 2xl:text-2xl font-semibold text-orange-600 w-8">D</span>
                    <span className="text-gray-600 text-sm 2xl:text-base">{t('lessons.intro.string_4')}</span>
                  </div>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => playString('D4', STRING_FREQUENCIES.D4)}
                    disabled={playingString === 'D4'}
                    className="flex items-center gap-2 bg-orange-50 hover:bg-orange-100 border-orange-200"
                  >
                    <Play className="h-3 w-3 2xl:h-4 2xl:w-4" />
                    <span className="text-xs 2xl:text-sm">{playingString === 'D4' ? '...' : t('ui.labels.play')}</span>
                  </Button>
                </div>

                {/* String 3 - G */}
                <div className="flex items-center justify-between gap-4 p-3 2xl:p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                  <div className="flex items-center gap-4 flex-1">
                    <span className="text-2xl 2xl:text-3xl font-bold text-gray-800 w-8 2xl:w-12">3ª</span>
                    <span className="text-xl 2xl:text-2xl font-semibold text-orange-600 w-8">G</span>
                    <span className="text-gray-600 text-sm 2xl:text-base">{t('lessons.intro.string_3')}</span>
                  </div>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => playString('G3', STRING_FREQUENCIES.G3)}
                    disabled={playingString === 'G3'}
                    className="flex items-center gap-2 bg-orange-50 hover:bg-orange-100 border-orange-200"
                  >
                    <Play className="h-3 w-3 2xl:h-4 2xl:w-4" />
                    <span className="text-xs 2xl:text-sm">{playingString === 'G3' ? '...' : t('ui.labels.play')}</span>
                  </Button>
                </div>

                {/* String 2 - B */}
                <div className="flex items-center justify-between gap-4 p-3 2xl:p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                  <div className="flex items-center gap-4 flex-1">
                    <span className="text-2xl 2xl:text-3xl font-bold text-gray-800 w-8 2xl:w-12">2ª</span>
                    <span className="text-xl 2xl:text-2xl font-semibold text-orange-600 w-8">B</span>
                    <span className="text-gray-600 text-sm 2xl:text-base">{t('lessons.intro.string_2')}</span>
                  </div>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => playString('B2', STRING_FREQUENCIES.B2)}
                    disabled={playingString === 'B2'}
                    className="flex items-center gap-2 bg-orange-50 hover:bg-orange-100 border-orange-200"
                  >
                    <Play className="h-3 w-3 2xl:h-4 2xl:w-4" />
                    <span className="text-xs 2xl:text-sm">{playingString === 'B2' ? '...' : t('ui.labels.play')}</span>
                  </Button>
                </div>

                {/* String 1 - E */}
                <div className="flex items-center justify-between gap-4 p-3 2xl:p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                  <div className="flex items-center gap-4 flex-1">
                    <span className="text-2xl 2xl:text-3xl font-bold text-gray-800 w-8 2xl:w-12">1ª</span>
                    <span className="text-xl 2xl:text-2xl font-semibold text-orange-600 w-8">E</span>
                    <span className="text-gray-600 text-sm 2xl:text-base">{t('lessons.intro.string_1')}</span>
                  </div>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => playString('E1', STRING_FREQUENCIES.E1)}
                    disabled={playingString === 'E1'}
                    className="flex items-center gap-2 bg-orange-50 hover:bg-orange-100 border-orange-200"
                  >
                    <Play className="h-3 w-3 2xl:h-4 2xl:w-4" />
                    <span className="text-xs 2xl:text-sm">{playingString === 'E1' ? '...' : t('ui.labels.play')}</span>
                  </Button>
                </div>
              </div>
              
              {/* Checklist item */}
              <div className="flex items-center gap-3 p-4 bg-orange-50 rounded-lg border-2 border-orange-200 mt-4">
                <Checkbox 
                  id="strings-check"
                  checked={checklist.strings}
                  onCheckedChange={() => toggleChecklistItem('strings')}
                />
                <label htmlFor="strings-check" className="text-sm 2xl:text-base font-medium text-gray-700 cursor-pointer">
                  ✓ {t('lessons.intro.checklist_strings')}
                </label>
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
      <Card className="p-6 2xl:p-8 3xl:p-12 shadow-xl border-0 bg-white/80 backdrop-blur-sm">
        <CardContent className="p-0">
          <h2 className="text-2xl 2xl:text-3xl 3xl:text-4xl font-bold text-gray-800 mb-4 2xl:mb-6 flex items-center gap-2">
            <Hand className="h-6 w-6 2xl:h-7 2xl:w-7 3xl:h-9 3xl:w-9 text-orange-600" />
            {t('lessons.intro.position_title')}
          </h2>
          
          {/* Posture Images */}
          <div className="grid md:grid-cols-2 gap-6 2xl:gap-8 mb-6">
            <div>
              <img 
                src="/Playing-the-guitar-while-sitting-scaled.jpg" 
                alt="Correct sitting posture"
                className="w-full rounded-lg shadow-lg"
              />
              <p className="text-center text-sm 2xl:text-base text-gray-600 mt-2">✔️ {t('lessons.intro.position_sit')}</p>
            </div>
            <div>
              <img 
                src="/brad-left-3-diagram-2016.jpg" 
                alt="Left hand position"
                className="w-full rounded-lg shadow-lg"
              />
              <p className="text-center text-sm 2xl:text-base text-gray-600 mt-2">✔️ {t('lessons.intro.position_left_hand')}</p>
            </div>
          </div>
          
          <div className="grid md:grid-cols-2 gap-6 2xl:gap-8">
            <div className="space-y-4 2xl:space-y-6">
              <h3 className="text-lg 2xl:text-xl 3xl:text-2xl font-semibold text-gray-700">{t('lessons.intro.position_how')}</h3>
              <ul className="space-y-3 2xl:space-y-4">
                <li className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                  <CheckCircle2 className="h-5 w-5 2xl:h-6 2xl:w-6 text-orange-500 flex-shrink-0 mt-0.5" />
                  <span className="text-sm 2xl:text-base 3xl:text-lg">{t('lessons.intro.position_sit')}</span>
                </li>
                <li className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                  <CheckCircle2 className="h-5 w-5 2xl:h-6 2xl:w-6 text-orange-500 flex-shrink-0 mt-0.5" />
                  <span className="text-sm 2xl:text-base 3xl:text-lg">{t('lessons.intro.position_leg')}</span>
                </li>
                <li className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                  <CheckCircle2 className="h-5 w-5 2xl:h-6 2xl:w-6 text-orange-500 flex-shrink-0 mt-0.5" />
                  <span className="text-sm 2xl:text-base 3xl:text-lg">{t('lessons.intro.position_right_arm')}</span>
                </li>
                <li className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                  <CheckCircle2 className="h-5 w-5 2xl:h-6 2xl:w-6 text-orange-500 flex-shrink-0 mt-0.5" />
                  <span className="text-sm 2xl:text-base 3xl:text-lg">{t('lessons.intro.position_left_hand')}</span>
                </li>
              </ul>
              
              {/* Checklist item */}
              <div className="flex items-center gap-3 p-4 bg-orange-50 rounded-lg border-2 border-orange-200">
                <Checkbox 
                  id="position-check"
                  checked={checklist.position}
                  onCheckedChange={() => toggleChecklistItem('position')}
                />
                <label htmlFor="position-check" className="text-sm 2xl:text-base font-medium text-gray-700 cursor-pointer">
                  ✓ {t('lessons.intro.checklist_position')}
                </label>
              </div>
            </div>
            
            <div className="space-y-4 2xl:space-y-6">
              <h3 className="text-lg 2xl:text-xl 3xl:text-2xl font-semibold text-gray-700">{t('lessons.intro.position_hands')}</h3>
              <div className="bg-gradient-to-br from-orange-50 to-red-50 p-4 2xl:p-6 rounded-lg">
                <p className="text-sm 2xl:text-base 3xl:text-lg text-gray-600 mb-3">
                  <strong>{t('lessons.intro.position_left_desc')}</strong>
                </p>
                <p className="text-sm 2xl:text-base 3xl:text-lg text-gray-600">
                  <strong>{t('lessons.intro.position_right_desc')}</strong>
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Como Ler Diagramas */}
      <Card className="p-6 2xl:p-8 3xl:p-12 shadow-xl border-0 bg-white/80 backdrop-blur-sm">
        <CardContent className="p-0">
          <h2 className="text-2xl 2xl:text-3xl 3xl:text-4xl font-bold text-gray-800 mb-4 2xl:mb-6 flex items-center gap-2">
            <Volume2 className="h-6 w-6 2xl:h-7 2xl:w-7 3xl:h-9 3xl:w-9 text-orange-600" />
            {t('lessons.intro.diagrams_title')}
          </h2>
          
          {/* Diagram Example Image */}
          <div className="mb-6 2xl:mb-8">
            <img 
              src="/ow_haley-blog_tab_AM-v2.webp" 
              alt="Chord Diagram Example"
              className="w-full max-w-md mx-auto rounded-lg shadow-lg"
            />
          </div>
          
          <div className="grid md:grid-cols-2 gap-6 2xl:gap-8">
            <div className="space-y-4 2xl:space-y-6">
              <p className="text-gray-600 text-sm 2xl:text-base 3xl:text-lg">
                {t('lessons.intro.diagrams_description')}
              </p>
              <ul className="space-y-3 2xl:space-y-4">
                <li className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                  <CheckCircle2 className="h-5 w-5 2xl:h-6 2xl:w-6 text-orange-500 flex-shrink-0 mt-0.5" />
                  <span className="text-sm 2xl:text-base 3xl:text-lg"><strong>{t('lessons.intro.diagrams_vertical')}</strong></span>
                </li>
                <li className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                  <CheckCircle2 className="h-5 w-5 2xl:h-6 2xl:w-6 text-orange-500 flex-shrink-0 mt-0.5" />
                  <span className="text-sm 2xl:text-base 3xl:text-lg"><strong>{t('lessons.intro.diagrams_horizontal')}</strong></span>
                </li>
                <li className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                  <CheckCircle2 className="h-5 w-5 2xl:h-6 2xl:w-6 text-orange-500 flex-shrink-0 mt-0.5" />
                  <span className="text-sm 2xl:text-base 3xl:text-lg"><strong>{t('lessons.intro.diagrams_dots')}</strong></span>
                </li>
                <li className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                  <CheckCircle2 className="h-5 w-5 2xl:h-6 2xl:w-6 text-orange-500 flex-shrink-0 mt-0.5" />
                  <span className="text-sm 2xl:text-base 3xl:text-lg"><strong>{t('lessons.intro.diagrams_numbers')}</strong></span>
                </li>
              </ul>
              
              {/* Checklist item */}
              <div className="flex items-center gap-3 p-4 bg-orange-50 rounded-lg border-2 border-orange-200">
                <Checkbox 
                  id="diagrams-check"
                  checked={checklist.diagrams}
                  onCheckedChange={() => toggleChecklistItem('diagrams')}
                />
                <label htmlFor="diagrams-check" className="text-sm 2xl:text-base font-medium text-gray-700 cursor-pointer">
                  ✓ {t('lessons.intro.checklist_diagrams')}
                </label>
              </div>
            </div>
            
            <div className="bg-gradient-to-br from-orange-50 to-red-50 p-4 2xl:p-6 rounded-lg">
              <h3 className="text-lg 2xl:text-xl 3xl:text-2xl font-semibold text-gray-700 mb-3">{t('ui.labels.important_tip').replace(':', '')}:</h3>
              <p className="text-gray-600 text-sm 2xl:text-base 3xl:text-lg">
                {t('lessons.intro.diagrams_tip')}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Completion Section with Next Lesson Preview */}
      <div className="text-center space-y-6 2xl:space-y-8">
        <Button
          onClick={onComplete}
          disabled={isCompleted || !allChecked}
          className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white px-8 2xl:px-12 py-3 2xl:py-4 text-lg 2xl:text-xl 3xl:text-2xl disabled:opacity-50"
        >
          {isCompleted ? t('ui.buttons.intro_completed') : t('ui.buttons.complete_intro')}
        </Button>
        
        {!allChecked && !isCompleted && (
          <p className="text-sm 2xl:text-base text-gray-500">
            💡 {t('lessons.intro.checklist_hint') || 'Complete all checkboxes above to finish the lesson'}
          </p>
        )}
        
        {isCompleted && (
          <div className="space-y-4 2xl:space-y-6">
            <p className="text-green-600 text-lg 2xl:text-xl font-medium">
              ✅ {t('lessons.intro.congratulations')}
            </p>
            
            {/* Next Lesson Preview */}
            <Card className="max-w-md mx-auto bg-gradient-to-br from-blue-50 to-purple-50 border-2 border-blue-200">
              <CardContent className="p-6 2xl:p-8">
                <div className="flex items-center gap-3 mb-3">
                  <ArrowRight className="h-6 w-6 2xl:h-7 2xl:w-7 text-blue-600" />
                  <h3 className="text-xl 2xl:text-2xl font-bold text-gray-800">{t('lessons.intro.next_lesson_title')}</h3>
                </div>
                <p className="text-gray-700 text-base 2xl:text-lg">
                  {t('lessons.intro.next_lesson_preview')}
                </p>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
};
