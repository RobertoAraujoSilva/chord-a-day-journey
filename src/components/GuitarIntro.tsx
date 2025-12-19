

import { Music, Hand, Eye, Volume2, Guitar, Play, CheckCircle2, ArrowRight } from 'lucide-react';
import guitarAnatomyImg from '@/assets/guitar-anatomy.webp';
import postureSittingImg from '@/assets/posture-sitting.png';
import leftHandPositionImg from '@/assets/left-hand-position.png';
import chordDiagramGuideImg from '@/assets/chord-diagram-guide.png';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Progress } from '@/components/ui/progress';
import { useTranslation } from '@/i18n/context';
import { useState } from 'react';
import { LabeledImage } from '@/components/LabeledImage';
import type { ImageLabel } from '@/components/LabeledImage';

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

  // ============================================================================
  // LABEL DEFINITIONS FOR MULTILINGUAL IMAGES
  // ============================================================================
  // NOTE: Current images have embedded English text labels. The dynamic label system
  // is designed to work with CLEAN BASE IMAGES (no embedded text).
  //
  // OPTIONS:
  // 1. Generate new clean base images without text, then enable and position labels
  // 2. Keep labels disabled (empty arrays) until clean images are available
  // 3. Use minimal labels positioned to avoid overlap (current approach)
  //
  // To generate clean base images, see: docs/MULTILINGUAL_IMAGE_LABELS.md
  // ============================================================================

  // Guitar Anatomy Labels - Using The-Parts-of-an-Acoustic-Guitar.webp
  // Initial positions - will adjust based on actual image layout
  const anatomyLabels: ImageLabel[] = [
    { key: 'lessons.intro.anatomy_labels.headstock', position: { top: '5%', right: '15%' } },
    { key: 'lessons.intro.anatomy_labels.tuning_pegs', position: { top: '10%', right: '5%' } },
    { key: 'lessons.intro.anatomy_labels.nut', position: { top: '16%', left: '32%' } },
    { key: 'lessons.intro.anatomy_labels.neck', position: { bottom: '8%', right: '25%' } },
    { key: 'lessons.intro.anatomy_labels.frets', position: { top: '40%', right: '35%' } },
    { key: 'lessons.intro.anatomy_labels.body', position: { top: '55%', left: '8%' } },
    { key: 'lessons.intro.anatomy_labels.sound_hole', position: { top: '50%', left: '30%' } },
    { key: 'lessons.intro.anatomy_labels.bridge', position: { top: '28%', right: '10%' } },
    { key: 'lessons.intro.anatomy_labels.strings', position: { bottom: '35%', right: '15%' } },
  ];

  // Posture Sitting Labels - Positioned around the edges
  const postureSittingLabels: ImageLabel[] = [
    // Uncomment and adjust based on actual image content
    // { key: 'lessons.intro.posture_labels.back_straight', position: { top: '10%', right: '5%' } },
    // { key: 'lessons.intro.posture_labels.relaxed_shoulders', position: { top: '22%', left: '5%' } },
    // { key: 'lessons.intro.posture_labels.guitar_on_leg', position: { top: '55%', right: '5%' } },
    // { key: 'lessons.intro.posture_labels.feet_flat', position: { bottom: '8%', left: '15%' } },
  ];

  // Left Hand Position Labels
  const leftHandLabels: ImageLabel[] = [
    // Uncomment and adjust based on actual image content
    // { key: 'lessons.intro.posture_labels.thumb_behind', position: { top: '35%', left: '5%' } },
    // { key: 'lessons.intro.posture_labels.fingertips', position: { top: '25%', right: '5%' } },
    // { key: 'lessons.intro.posture_labels.wrist_straight', position: { bottom: '15%', left: '10%' } },
  ];

  // Chord Diagram Labels - Positioned around the diagram
  const chordDiagramLabels: ImageLabel[] = [
    // Uncomment and adjust based on actual image content
    // { key: 'lessons.intro.diagram_labels.nut', position: { top: '5%', left: '8%' } },
    // { key: 'lessons.intro.diagram_labels.strings', position: { top: '12%', right: '8%' } },
    // { key: 'lessons.intro.diagram_labels.frets', position: { top: '35%', left: '3%' } },
    // { key: 'lessons.intro.diagram_labels.finger_position', position: { top: '50%', right: '8%' } },
    // { key: 'lessons.intro.diagram_labels.open_string', position: { top: '3%', left: '28%' } },
    // { key: 'lessons.intro.diagram_labels.muted_string', position: { top: '3%', right: '28%' } },
  ];

  // Karplus-Strong algorithm for realistic plucked string sound
  const createPluckedString = (
    audioContext: AudioContext,
    frequency: number,
    duration: number = 2.0,
    volume: number = 0.4
  ) => {
    const sampleRate = audioContext.sampleRate;
    const bufferSize = Math.round(sampleRate / frequency);
    const outputSamples = Math.round(sampleRate * duration);
    
    // Create buffer for the plucked string
    const buffer = audioContext.createBuffer(1, outputSamples, sampleRate);
    const data = buffer.getChannelData(0);
    
    // Initialize with noise burst (simulates the pluck)
    const noiseBuffer = new Float32Array(bufferSize);
    for (let i = 0; i < bufferSize; i++) {
      noiseBuffer[i] = Math.random() * 2 - 1;
    }
    
    // Karplus-Strong synthesis with low-pass filtering
    let prevSample = 0;
    const decay = 0.996; // Decay factor for string vibration
    const smoothing = 0.5; // Low-pass filter coefficient
    
    for (let i = 0; i < outputSamples; i++) {
      if (i < bufferSize) {
        data[i] = noiseBuffer[i];
      } else {
        // Average current and previous sample (low-pass filter) with decay
        const current = data[i - bufferSize];
        const averaged = smoothing * current + (1 - smoothing) * prevSample;
        data[i] = averaged * decay;
        prevSample = current;
      }
    }
    
    return buffer;
  };

  // Add harmonics for richer guitar tone
  const createHarmonics = (
    audioContext: AudioContext,
    frequency: number,
    startTime: number,
    duration: number = 1.5
  ) => {
    const harmonicRatios = [1, 2, 3, 4]; // Fundamental + overtones
    const harmonicGains = [0.25, 0.12, 0.06, 0.03]; // Decreasing volume
    
    harmonicRatios.forEach((ratio, index) => {
      const oscillator = audioContext.createOscillator();
      const gainNode = audioContext.createGain();
      const filterNode = audioContext.createBiquadFilter();
      
      // Use triangle wave for warmer sound
      oscillator.type = 'triangle';
      oscillator.frequency.setValueAtTime(frequency * ratio, startTime);
      
      // Low-pass filter to simulate guitar body resonance
      filterNode.type = 'lowpass';
      filterNode.frequency.setValueAtTime(2500, startTime);
      filterNode.Q.setValueAtTime(1, startTime);
      
      // Envelope for natural attack and decay
      const gain = harmonicGains[index];
      gainNode.gain.setValueAtTime(0, startTime);
      gainNode.gain.linearRampToValueAtTime(gain, startTime + 0.003);
      gainNode.gain.exponentialRampToValueAtTime(0.001, startTime + duration);
      
      oscillator.connect(filterNode);
      filterNode.connect(gainNode);
      gainNode.connect(audioContext.destination);
      
      oscillator.start(startTime);
      oscillator.stop(startTime + duration);
    });
  };

  const playString = async (stringName: string, frequency: number) => {
    setPlayingString(stringName);
    
    try {
      const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
      const startTime = audioContext.currentTime;
      const duration = 2.0;
      
      // Create master gain
      const masterGain = audioContext.createGain();
      masterGain.gain.setValueAtTime(0.6, startTime);
      masterGain.connect(audioContext.destination);
      
      // Play Karplus-Strong plucked string
      const pluckBuffer = createPluckedString(audioContext, frequency, duration, 0.5);
      const pluckSource = audioContext.createBufferSource();
      pluckSource.buffer = pluckBuffer;
      
      // Add body resonance filter
      const bodyFilter = audioContext.createBiquadFilter();
      bodyFilter.type = 'peaking';
      bodyFilter.frequency.setValueAtTime(200, startTime); // Guitar body resonance
      bodyFilter.Q.setValueAtTime(2, startTime);
      bodyFilter.gain.setValueAtTime(3, startTime);
      
      pluckSource.connect(bodyFilter);
      bodyFilter.connect(masterGain);
      pluckSource.start(startTime);
      
      // Add harmonics for richness
      createHarmonics(audioContext, frequency, startTime, duration);
      
      setTimeout(() => {
        setPlayingString(null);
        audioContext.close();
      }, duration * 1000);
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
          
          {/* Guitar Anatomy Image with Dynamic Labels */}
          <div className="mb-6 2xl:mb-8 max-w-3xl mx-auto">
            <LabeledImage
              src={guitarAnatomyImg}
              alt={t('lessons.intro.anatomy_title')}
              imageClassName="w-full rounded-lg shadow-lg"
              labels={anatomyLabels}
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
          
          {/* Posture Images with Dynamic Labels */}
          <div className="grid md:grid-cols-2 gap-6 2xl:gap-8 mb-6">
            <div>
              <LabeledImage
                src={postureSittingImg}
                alt={t('lessons.intro.position_sit')}
                imageClassName="w-full rounded-lg shadow-lg"
                labels={postureSittingLabels}
              />
              <p className="text-center text-sm 2xl:text-base text-gray-600 mt-2">✔️ {t('lessons.intro.position_sit')}</p>
            </div>
            <div>
              <LabeledImage
                src={leftHandPositionImg}
                alt={t('lessons.intro.position_left_hand')}
                imageClassName="w-full rounded-lg shadow-lg"
                labels={leftHandLabels}
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
          
          {/* Diagram Example Image with Dynamic Labels */}
          <div className="mb-6 2xl:mb-8 max-w-md mx-auto">
            <LabeledImage
              src={chordDiagramGuideImg}
              alt={t('lessons.intro.diagrams_title')}
              imageClassName="w-full rounded-lg shadow-lg"
              labels={chordDiagramLabels}
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
