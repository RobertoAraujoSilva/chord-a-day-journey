

import { Music, Hand, Eye, Volume2, Guitar, Play, CheckCircle2, ArrowRight } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Progress } from '@/components/ui/progress';
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
    const newChecklist = { ...checklist, [item]: !checklist[item] };
    setChecklist(newChecklist);
    console.log('Checklist atualizado:', newChecklist);
    console.log('Todos marcados?', Object.values(newChecklist).every(v => v));
  };

  const allChecked = Object.values(checklist).every(v => v);
  const checkedCount = Object.values(checklist).filter(v => v).length;
  
  return (
    <div className="space-y-10 2xl:space-y-14 3xl:space-y-16">
      {/* Header */}
      <div className="text-center px-4">
        <div className="flex items-center justify-center gap-3 2xl:gap-4 mb-4 2xl:mb-6">
          <Guitar className="h-8 w-8 2xl:h-10 2xl:w-10 3xl:h-12 3xl:w-12 text-orange-600" />
          <h1 className="text-4xl 2xl:text-5xl 3xl:text-6xl font-bold bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">
            {t('lessons.intro.lesson_title')}
          </h1>
        </div>
        <p className="text-lg 2xl:text-xl 3xl:text-2xl text-gray-700 max-w-3xl mx-auto font-medium">
          {t('lessons.intro.lesson_description')}
        </p>
      </div>

      {/* Anatomia do Violão */}
      <Card className="p-8 2xl:p-10 3xl:p-14 shadow-xl border-2 border-orange-100 bg-white/90 backdrop-blur-sm hover:shadow-2xl transition-shadow">
        <CardContent className="p-0">
          <h2 className="text-2xl 2xl:text-3xl 3xl:text-4xl font-bold text-gray-900 mb-6 2xl:mb-8 flex items-center gap-3">
            <Eye className="h-7 w-7 2xl:h-8 2xl:w-8 3xl:h-10 3xl:w-10 text-orange-600" />
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
          
          <div className="grid md:grid-cols-2 gap-8 2xl:gap-10">
            <div className="space-y-5 2xl:space-y-7">
              <h3 className="text-xl 2xl:text-2xl 3xl:text-3xl font-semibold text-gray-900">{t('lessons.intro.anatomy_parts')}</h3>
              <div className="space-y-4 2xl:space-y-5">
                <div className="flex items-start gap-4 p-4 2xl:p-5 bg-gray-50 rounded-lg hover:bg-orange-50 transition-colors border border-gray-200 hover:border-orange-200">
                  <CheckCircle2 className="h-6 w-6 2xl:h-7 2xl:w-7 text-orange-600 flex-shrink-0 mt-0.5" />
                  <div className="text-base 2xl:text-lg 3xl:text-xl">
                    <strong className="text-gray-900">{t('lessons.intro.body').split(':')[0]}:</strong>
                    <span className="text-gray-700"> {t('lessons.intro.body').split(':')[1]}</span>
                  </div>
                </div>
                <div className="flex items-start gap-4 p-4 2xl:p-5 bg-gray-50 rounded-lg hover:bg-orange-50 transition-colors border border-gray-200 hover:border-orange-200">
                  <CheckCircle2 className="h-6 w-6 2xl:h-7 2xl:w-7 text-orange-600 flex-shrink-0 mt-0.5" />
                  <div className="text-base 2xl:text-lg 3xl:text-xl">
                    <strong className="text-gray-900">{t('lessons.intro.neck').split(':')[0]}:</strong>
                    <span className="text-gray-700"> {t('lessons.intro.neck').split(':')[1]}</span>
                  </div>
                </div>
                <div className="flex items-start gap-4 p-4 2xl:p-5 bg-gray-50 rounded-lg hover:bg-orange-50 transition-colors border border-gray-200 hover:border-orange-200">
                  <CheckCircle2 className="h-6 w-6 2xl:h-7 2xl:w-7 text-orange-600 flex-shrink-0 mt-0.5" />
                  <div className="text-base 2xl:text-lg 3xl:text-xl">
                    <strong className="text-gray-900">{t('lessons.intro.bridge').split(':')[0]}:</strong>
                    <span className="text-gray-700"> {t('lessons.intro.bridge').split(':')[1]}</span>
                  </div>
                </div>
                <div className="flex items-start gap-4 p-4 2xl:p-5 bg-gray-50 rounded-lg hover:bg-orange-50 transition-colors border border-gray-200 hover:border-orange-200">
                  <CheckCircle2 className="h-6 w-6 2xl:h-7 2xl:w-7 text-orange-600 flex-shrink-0 mt-0.5" />
                  <div className="text-base 2xl:text-lg 3xl:text-xl">
                    <strong className="text-gray-900">{t('lessons.intro.headstock').split(':')[0]}:</strong>
                    <span className="text-gray-700"> {t('lessons.intro.headstock').split(':')[1]}</span>
                  </div>
                </div>
                <div className="flex items-start gap-4 p-4 2xl:p-5 bg-gray-50 rounded-lg hover:bg-orange-50 transition-colors border border-gray-200 hover:border-orange-200">
                  <CheckCircle2 className="h-6 w-6 2xl:h-7 2xl:w-7 text-orange-600 flex-shrink-0 mt-0.5" />
                  <div className="text-base 2xl:text-lg 3xl:text-xl">
                    <strong className="text-gray-900">{t('lessons.intro.frets').split(':')[0]}:</strong>
                    <span className="text-gray-700"> {t('lessons.intro.frets').split(':')[1]}</span>
                  </div>
                </div>
              </div>
              
              {/* Checklist item */}
              <div className="flex items-center gap-4 p-5 2xl:p-6 bg-orange-50 rounded-lg border-2 border-orange-300 hover:bg-orange-100 transition-colors">
                <Checkbox 
                  id="anatomy-check"
                  checked={checklist.anatomy}
                  onCheckedChange={() => toggleChecklistItem('anatomy')}
                  className="h-5 w-5 2xl:h-6 2xl:w-6"
                />
                <label htmlFor="anatomy-check" className="text-base 2xl:text-lg 3xl:text-xl font-semibold text-gray-900 cursor-pointer flex-1">
                  {t('lessons.intro.checklist_anatomy')}
                </label>
              </div>
            </div>
            
            <div className="bg-gradient-to-br from-orange-50 to-red-50 p-6 2xl:p-8 rounded-lg border-2 border-orange-200">
              <h3 className="text-xl 2xl:text-2xl 3xl:text-3xl font-semibold text-gray-900 mb-4">{t('ui.labels.important_tip')}</h3>
              <p className="text-gray-800 text-base 2xl:text-lg 3xl:text-xl leading-relaxed">
                {t('lessons.intro.anatomy_tip')}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Nome das Cordas */}
      <Card className="p-8 2xl:p-10 3xl:p-14 shadow-xl border-2 border-orange-100 bg-white/90 backdrop-blur-sm hover:shadow-2xl transition-shadow">
        <CardContent className="p-0">
          <h2 className="text-2xl 2xl:text-3xl 3xl:text-4xl font-bold text-gray-900 mb-6 2xl:mb-8 flex items-center gap-3">
            <Music className="h-7 w-7 2xl:h-8 2xl:w-8 3xl:h-10 3xl:w-10 text-orange-600" />
            {t('lessons.intro.strings_title')}
          </h2>
          
          <div className="grid md:grid-cols-2 gap-8 2xl:gap-10">
            <div>
              <h3 className="text-xl 2xl:text-2xl 3xl:text-3xl font-semibold text-gray-900 mb-5 2xl:mb-7">
                {t('lessons.intro.strings_description')}
              </h3>
              
              <div className="space-y-4 2xl:space-y-5">
                {/* String 6 - E */}
                <div className="flex items-center justify-between gap-4 p-4 2xl:p-5 bg-gray-50 rounded-lg hover:bg-orange-50 transition-colors border border-gray-200 hover:border-orange-300">
                  <div className="flex items-center gap-4 flex-1">
                    <span className="text-2xl 2xl:text-3xl 3xl:text-4xl font-bold text-gray-900 w-10 2xl:w-14">6ª</span>
                    <span className="text-2xl 2xl:text-3xl 3xl:text-4xl font-bold text-orange-600 w-10">E</span>
                    <span className="text-gray-800 text-base 2xl:text-lg 3xl:text-xl font-medium">{t('lessons.intro.string_6')}</span>
                  </div>
                  <Button
                    size="lg"
                    variant="default"
                    onClick={() => playString('E6', STRING_FREQUENCIES.E6)}
                    disabled={playingString === 'E6'}
                    className="flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white border-0 shadow-md hover:shadow-lg transition-all"
                  >
                    <Play className="h-4 w-4 2xl:h-5 2xl:w-5" fill="currentColor" />
                    <span className="text-sm 2xl:text-base font-semibold">{playingString === 'E6' ? '...' : t('ui.labels.play')}</span>
                  </Button>
                </div>

                {/* String 5 - A */}
                <div className="flex items-center justify-between gap-4 p-4 2xl:p-5 bg-gray-50 rounded-lg hover:bg-orange-50 transition-colors border border-gray-200 hover:border-orange-300">
                  <div className="flex items-center gap-4 flex-1">
                    <span className="text-2xl 2xl:text-3xl 3xl:text-4xl font-bold text-gray-900 w-10 2xl:w-14">5ª</span>
                    <span className="text-2xl 2xl:text-3xl 3xl:text-4xl font-bold text-orange-600 w-10">A</span>
                    <span className="text-gray-800 text-base 2xl:text-lg 3xl:text-xl font-medium">{t('lessons.intro.string_5')}</span>
                  </div>
                  <Button
                    size="lg"
                    variant="default"
                    onClick={() => playString('A5', STRING_FREQUENCIES.A5)}
                    disabled={playingString === 'A5'}
                    className="flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white border-0 shadow-md hover:shadow-lg transition-all"
                  >
                    <Play className="h-4 w-4 2xl:h-5 2xl:w-5" fill="currentColor" />
                    <span className="text-sm 2xl:text-base font-semibold">{playingString === 'A5' ? '...' : t('ui.labels.play')}</span>
                  </Button>
                </div>

                {/* String 4 - D */}
                <div className="flex items-center justify-between gap-4 p-4 2xl:p-5 bg-gray-50 rounded-lg hover:bg-orange-50 transition-colors border border-gray-200 hover:border-orange-300">
                  <div className="flex items-center gap-4 flex-1">
                    <span className="text-2xl 2xl:text-3xl 3xl:text-4xl font-bold text-gray-900 w-10 2xl:w-14">4ª</span>
                    <span className="text-2xl 2xl:text-3xl 3xl:text-4xl font-bold text-orange-600 w-10">D</span>
                    <span className="text-gray-800 text-base 2xl:text-lg 3xl:text-xl font-medium">{t('lessons.intro.string_4')}</span>
                  </div>
                  <Button
                    size="lg"
                    variant="default"
                    onClick={() => playString('D4', STRING_FREQUENCIES.D4)}
                    disabled={playingString === 'D4'}
                    className="flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white border-0 shadow-md hover:shadow-lg transition-all"
                  >
                    <Play className="h-4 w-4 2xl:h-5 2xl:w-5" fill="currentColor" />
                    <span className="text-sm 2xl:text-base font-semibold">{playingString === 'D4' ? '...' : t('ui.labels.play')}</span>
                  </Button>
                </div>

                {/* String 3 - G */}
                <div className="flex items-center justify-between gap-4 p-4 2xl:p-5 bg-gray-50 rounded-lg hover:bg-orange-50 transition-colors border border-gray-200 hover:border-orange-300">
                  <div className="flex items-center gap-4 flex-1">
                    <span className="text-2xl 2xl:text-3xl 3xl:text-4xl font-bold text-gray-900 w-10 2xl:w-14">3ª</span>
                    <span className="text-2xl 2xl:text-3xl 3xl:text-4xl font-bold text-orange-600 w-10">G</span>
                    <span className="text-gray-800 text-base 2xl:text-lg 3xl:text-xl font-medium">{t('lessons.intro.string_3')}</span>
                  </div>
                  <Button
                    size="lg"
                    variant="default"
                    onClick={() => playString('G3', STRING_FREQUENCIES.G3)}
                    disabled={playingString === 'G3'}
                    className="flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white border-0 shadow-md hover:shadow-lg transition-all"
                  >
                    <Play className="h-4 w-4 2xl:h-5 2xl:w-5" fill="currentColor" />
                    <span className="text-sm 2xl:text-base font-semibold">{playingString === 'G3' ? '...' : t('ui.labels.play')}</span>
                  </Button>
                </div>

                {/* String 2 - B */}
                <div className="flex items-center justify-between gap-4 p-4 2xl:p-5 bg-gray-50 rounded-lg hover:bg-orange-50 transition-colors border border-gray-200 hover:border-orange-300">
                  <div className="flex items-center gap-4 flex-1">
                    <span className="text-2xl 2xl:text-3xl 3xl:text-4xl font-bold text-gray-900 w-10 2xl:w-14">2ª</span>
                    <span className="text-2xl 2xl:text-3xl 3xl:text-4xl font-bold text-orange-600 w-10">B</span>
                    <span className="text-gray-800 text-base 2xl:text-lg 3xl:text-xl font-medium">{t('lessons.intro.string_2')}</span>
                  </div>
                  <Button
                    size="lg"
                    variant="default"
                    onClick={() => playString('B2', STRING_FREQUENCIES.B2)}
                    disabled={playingString === 'B2'}
                    className="flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white border-0 shadow-md hover:shadow-lg transition-all"
                  >
                    <Play className="h-4 w-4 2xl:h-5 2xl:w-5" fill="currentColor" />
                    <span className="text-sm 2xl:text-base font-semibold">{playingString === 'B2' ? '...' : t('ui.labels.play')}</span>
                  </Button>
                </div>

                {/* String 1 - E */}
                <div className="flex items-center justify-between gap-4 p-4 2xl:p-5 bg-gray-50 rounded-lg hover:bg-orange-50 transition-colors border border-gray-200 hover:border-orange-300">
                  <div className="flex items-center gap-4 flex-1">
                    <span className="text-2xl 2xl:text-3xl 3xl:text-4xl font-bold text-gray-900 w-10 2xl:w-14">1ª</span>
                    <span className="text-2xl 2xl:text-3xl 3xl:text-4xl font-bold text-orange-600 w-10">E</span>
                    <span className="text-gray-800 text-base 2xl:text-lg 3xl:text-xl font-medium">{t('lessons.intro.string_1')}</span>
                  </div>
                  <Button
                    size="lg"
                    variant="default"
                    onClick={() => playString('E1', STRING_FREQUENCIES.E1)}
                    disabled={playingString === 'E1'}
                    className="flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white border-0 shadow-md hover:shadow-lg transition-all"
                  >
                    <Play className="h-4 w-4 2xl:h-5 2xl:w-5" fill="currentColor" />
                    <span className="text-sm 2xl:text-base font-semibold">{playingString === 'E1' ? '...' : t('ui.labels.play')}</span>
                  </Button>
                </div>
              </div>
              
              {/* Checklist item */}
              <div className="flex items-center gap-4 p-5 2xl:p-6 bg-orange-50 rounded-lg border-2 border-orange-300 hover:bg-orange-100 transition-colors mt-5">
                <Checkbox 
                  id="strings-check"
                  checked={checklist.strings}
                  onCheckedChange={() => toggleChecklistItem('strings')}
                  className="h-5 w-5 2xl:h-6 2xl:w-6"
                />
                <label htmlFor="strings-check" className="text-base 2xl:text-lg 3xl:text-xl font-semibold text-gray-900 cursor-pointer flex-1">
                  {t('lessons.intro.checklist_strings')}
                </label>
              </div>
            </div>
            
            <div className="bg-gradient-to-br from-orange-50 to-red-50 p-6 2xl:p-8 rounded-lg border-2 border-orange-200">
              <h3 className="text-xl 2xl:text-2xl 3xl:text-3xl font-semibold text-gray-900 mb-4">{t('lessons.intro.strings_mnemonic')}</h3>
              <p className="text-gray-800 text-base 2xl:text-lg 3xl:text-xl mb-4">
                <strong>{t('lessons.intro.strings_phrase')}</strong>
              </p>
              <p className="text-base 2xl:text-lg text-gray-700 mb-5">
                (E-A-D-G-B-E)
              </p>
              <div className="mt-4 p-4 2xl:p-5 bg-white rounded-lg border-2 border-orange-200">
                <p className="text-base 2xl:text-lg 3xl:text-xl text-gray-800 leading-relaxed">
                  💡 <strong>{t('ui.labels.important_tip').replace(':', '')}:</strong> {t('lessons.intro.strings_tip')}
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Posição Correta */}
      <Card className="p-8 2xl:p-10 3xl:p-14 shadow-xl border-2 border-orange-100 bg-white/90 backdrop-blur-sm hover:shadow-2xl transition-shadow">
        <CardContent className="p-0">
          <h2 className="text-2xl 2xl:text-3xl 3xl:text-4xl font-bold text-gray-900 mb-6 2xl:mb-8 flex items-center gap-3">
            <Hand className="h-7 w-7 2xl:h-8 2xl:w-8 3xl:h-10 3xl:w-10 text-orange-600" />
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
      <Card className="p-8 2xl:p-10 3xl:p-14 shadow-xl border-2 border-orange-100 bg-white/90 backdrop-blur-sm hover:shadow-2xl transition-shadow">
        <CardContent className="p-0">
          <h2 className="text-2xl 2xl:text-3xl 3xl:text-4xl font-bold text-gray-900 mb-6 2xl:mb-8 flex items-center gap-3">
            <Volume2 className="h-7 w-7 2xl:h-8 2xl:w-8 3xl:h-10 3xl:w-10 text-orange-600" />
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
        {/* Progress Indicator */}
        {!isCompleted && (
          <Card className="max-w-2xl mx-auto bg-gradient-to-br from-orange-50 to-amber-50 border-2 border-orange-300 shadow-lg">
            <CardContent className="p-6 2xl:p-8">
              <div className="flex items-center justify-between mb-4">
                <span className="text-base 2xl:text-lg font-bold text-gray-900">📋 Progresso da Lição:</span>
                <span className="text-2xl 2xl:text-3xl font-bold text-orange-600">
                  {checkedCount}/4
                </span>
              </div>
              <Progress 
                value={(checkedCount / 4) * 100} 
                className="h-3 2xl:h-4 mb-4"
              />
              
              {/* Checklist Summary */}
              <div className="grid grid-cols-2 gap-3 mb-4">
                <div className={`flex items-center gap-2 text-sm 2xl:text-base ${checklist.anatomy ? 'text-green-700' : 'text-gray-500'}`}>
                  {checklist.anatomy ? '✅' : '⬜'} Anatomia do Violão
                </div>
                <div className={`flex items-center gap-2 text-sm 2xl:text-base ${checklist.strings ? 'text-green-700' : 'text-gray-500'}`}>
                  {checklist.strings ? '✅' : '⬜'} Nome das Cordas
                </div>
                <div className={`flex items-center gap-2 text-sm 2xl:text-base ${checklist.position ? 'text-green-700' : 'text-gray-500'}`}>
                  {checklist.position ? '✅' : '⬜'} Posição Correta
                </div>
                <div className={`flex items-center gap-2 text-sm 2xl:text-base ${checklist.diagrams ? 'text-green-700' : 'text-gray-500'}`}>
                  {checklist.diagrams ? '✅' : '⬜'} Ler Diagramas
                </div>
              </div>
              
              <div className={`p-4 rounded-lg border-2 ${allChecked ? 'bg-green-50 border-green-300' : 'bg-amber-50 border-amber-300'}`}>
                <p className="text-sm 2xl:text-base font-semibold text-gray-900">
                  {allChecked 
                    ? "🎉 Tudo pronto! Clique no botão abaixo para continuar." 
                    : `⚠️ Marque ${4 - checkedCount} ${4 - checkedCount === 1 ? 'checkbox' : 'checkboxes'} restante${4 - checkedCount === 1 ? '' : 's'} para desbloquear o botão.`}
                </p>
              </div>
            </CardContent>
          </Card>
        )}
        
        <div className="relative">
          <Button
            onClick={onComplete}
            disabled={isCompleted || !allChecked}
            className={`px-8 2xl:px-12 py-6 2xl:py-8 text-lg 2xl:text-xl 3xl:text-2xl font-bold transition-all shadow-lg ${
              allChecked && !isCompleted
                ? 'bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white hover:shadow-xl hover:scale-105 cursor-pointer'
                : 'bg-gray-300 text-gray-500 cursor-not-allowed opacity-60'
            }`}
          >
            {isCompleted ? t('ui.buttons.intro_completed') : t('ui.buttons.complete_intro')}
          </Button>
          {!allChecked && !isCompleted && (
            <div className="absolute -top-3 -right-3 bg-red-500 text-white text-xs font-bold px-3 py-1 rounded-full animate-pulse">
              🔒 Bloqueado
            </div>
          )}
        </div>
        
        {!allChecked && !isCompleted && (
          <p className="text-sm 2xl:text-base text-amber-700 bg-amber-50 border border-amber-200 rounded-lg p-4 max-w-lg mx-auto">
            💡 <strong>Dica:</strong> {t('lessons.intro.checklist_hint')}
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
