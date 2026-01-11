import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ChordDiagram } from "@/components/ChordDiagram";
import { AudioPlayer } from "@/components/AudioPlayer";
import { Music, Sparkles, ArrowLeft, Play } from "lucide-react";
import { useTranslation } from "@/i18n/context";
import { Chord } from "@/data/chords";
import lovemedoChordG from "@/assets/lovemedo-chord-g.png";
import lovemedoChordC from "@/assets/lovemedo-chord-c.png";
import lovemedoChordD from "@/assets/lovemedo-chord-d.png";

interface LoveMeDoLessonProps {
  onBack: () => void;
}

// Chord data for G, C, D
const GChord: Chord = {
  name: "G",
  fingering: ["3", "2", "0", "0", "3", "3"],
  fingers: ["2", "1", "", "", "3", "4"],
};

const CChord: Chord = {
  name: "C",
  fingering: ["x", "3", "2", "0", "1", "0"],
  fingers: ["", "3", "2", "", "1", ""],
};

const DChord: Chord = {
  name: "D",
  fingering: ["x", "x", "0", "2", "3", "2"],
  fingers: ["", "", "", "1", "3", "2"],
};

export const LoveMeDoLesson = ({ onBack }: LoveMeDoLessonProps) => {
  const { t } = useTranslation();
  const [showConfetti, setShowConfetti] = useState(true);

  useEffect(() => {
    // Show confetti on mount
    setShowConfetti(true);
    const timer = setTimeout(() => setShowConfetti(false), 5000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-red-50">
      {/* Confetti Effect */}
      {showConfetti && (
        <div className="fixed inset-0 pointer-events-none z-50">
          {Array.from({ length: 50 }).map((_, i) => (
            <div
              key={i}
              className="absolute animate-confetti"
              style={{
                left: `${Math.random() * 100}%`,
                top: "-10%",
                animationDelay: `${Math.random() * 2}s`,
                animationDuration: `${2 + Math.random() * 2}s`,
              }}
            >
              <div
                className="w-2 h-2 rounded-full"
                style={{
                  backgroundColor: [
                    "#f59e0b",
                    "#ef4444",
                    "#10b981",
                    "#3b82f6",
                    "#8b5cf6",
                  ][Math.floor(Math.random() * 5)],
                }}
              />
            </div>
          ))}
        </div>
      )}

      <div className="container mx-auto px-4 md:px-8 lg:px-16 2xl:px-24 3xl:px-32 py-8 2xl:py-12 3xl:py-16">
        {/* Back Button */}
        <div className="mb-6 2xl:mb-8 3xl:mb-12">
          <Button
            variant="outline"
            onClick={onBack}
            className="flex items-center gap-2"
          >
            <ArrowLeft className="h-4 w-4" />
            {t("ui.navigation.back_to_chords")}
          </Button>
        </div>

        {/* Title Section */}
        <div className="text-center mb-8 2xl:mb-12 3xl:mb-16">
          <div className="flex justify-center mb-4">
            <div className="relative">
              <Music className="h-16 w-16 2xl:h-20 2xl:w-20 3xl:h-24 3xl:w-24 text-orange-600 animate-bounce" />
              <Sparkles className="h-8 w-8 2xl:h-10 2xl:w-10 text-yellow-500 absolute -top-2 -right-2 animate-pulse" />
            </div>
          </div>
          <h1 className="text-4xl 2xl:text-5xl 3xl:text-6xl font-bold bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent mb-4 2xl:mb-6">
            {t("content.bonus.title")}
          </h1>
          <p className="text-xl 2xl:text-2xl 3xl:text-3xl text-gray-700 mb-2 2xl:mb-3">
            {t("content.bonus.subtitle")}
          </p>
          <p className="text-lg 2xl:text-xl 3xl:text-2xl text-gray-600 max-w-4xl mx-auto">
            {t("content.bonus.description")}
          </p>
        </div>

        {/* Why Perfect Section */}
        <Card className="p-6 2xl:p-8 3xl:p-10 shadow-xl border-2 border-orange-200 bg-white/90 backdrop-blur-sm mb-8 2xl:mb-12 3xl:mb-16">
          <CardContent className="p-0">
            <p className="text-base 2xl:text-lg 3xl:text-xl text-gray-700 leading-relaxed">
              {t("content.bonus.why_perfect")}
            </p>
          </CardContent>
        </Card>

        {/* Chord Review Diagrams */}
        <Card className="p-6 2xl:p-8 3xl:p-10 shadow-xl border-2 border-orange-200 bg-white/90 backdrop-blur-sm mb-8 2xl:mb-12 3xl:mb-16">
          <CardContent className="p-0">
            <h2 className="text-2xl 2xl:text-3xl 3xl:text-4xl font-bold text-gray-800 mb-4 2xl:mb-6 text-center">
              {t("content.bonus.chord_review")}
            </h2>
            <p className="text-center text-gray-600 mb-6 2xl:mb-8 text-base 2xl:text-lg 3xl:text-xl">
              {t("content.bonus.chord_review_desc")}
            </p>

            {/* Chord Diagrams Grid */}
            <div className="grid md:grid-cols-3 gap-6 2xl:gap-8 3xl:gap-12 mb-6 2xl:mb-8">
              <div className="flex flex-col items-center">
                <h3 className="text-xl 2xl:text-2xl 3xl:text-3xl font-bold text-gray-800 mb-4">
                  G
                </h3>
                <ChordDiagram chord={GChord} />
                <p className="mt-4 text-sm 2xl:text-base 3xl:text-lg text-gray-600 font-mono">
                  {t("content.bonus.chord_g")}
                </p>
              </div>
              <div className="flex flex-col items-center">
                <h3 className="text-xl 2xl:text-2xl 3xl:text-3xl font-bold text-gray-800 mb-4">
                  C
                </h3>
                <ChordDiagram chord={CChord} />
                <p className="mt-4 text-sm 2xl:text-base 3xl:text-lg text-gray-600 font-mono">
                  {t("content.bonus.chord_c")}
                </p>
              </div>
              <div className="flex flex-col items-center">
                <h3 className="text-xl 2xl:text-2xl 3xl:text-3xl font-bold text-gray-800 mb-4">
                  D
                </h3>
                <ChordDiagram chord={DChord} />
                <p className="mt-4 text-sm 2xl:text-base 3xl:text-lg text-gray-600 font-mono">
                  {t("content.bonus.chord_d")}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Images Section */}
        <div className="grid md:grid-cols-3 gap-4 2xl:gap-6 3xl:gap-8 mb-8 2xl:mb-12 3xl:mb-16">
          <img
            src={lovemedoChordG}
            alt="Love Me Do - G Chord"
            className="w-full rounded-lg shadow-xl border-2 border-orange-200"
          />
          <img
            src={lovemedoChordC}
            alt="Love Me Do - C Chord"
            className="w-full rounded-lg shadow-xl border-2 border-orange-200"
          />
          <img
            src={lovemedoChordD}
            alt="Love Me Do - D Chord"
            className="w-full rounded-lg shadow-xl border-2 border-orange-200"
          />
        </div>

        {/* How to Play Section */}
        <Card className="p-6 2xl:p-8 3xl:p-10 shadow-xl border-2 border-orange-200 bg-white/90 backdrop-blur-sm mb-8 2xl:mb-12 3xl:mb-16">
          <CardContent className="p-0">
            <h2 className="text-2xl 2xl:text-3xl 3xl:text-4xl font-bold text-gray-800 mb-4 2xl:mb-6">
              {t("content.bonus.how_to_play")}
            </h2>

            <div className="space-y-4 2xl:space-y-6 3xl:space-y-8">
              <div>
                <p className="text-base 2xl:text-lg 3xl:text-xl text-gray-700 mb-2">
                  <strong>{t("content.bonus.no_capo")}</strong>
                </p>
              </div>

              <div>
                <p className="text-base 2xl:text-lg 3xl:text-xl text-gray-700 mb-2">
                  <strong>{t("content.bonus.strumming_pattern")}</strong>{" "}
                  {t("content.bonus.strumming_pattern_desc")}
                </p>
              </div>

              <div>
                <p className="text-base 2xl:text-lg 3xl:text-xl text-gray-700">
                  <strong>{t("content.bonus.structure")}</strong>
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Verse/Chorus Section */}
        <Card className="p-6 2xl:p-8 3xl:p-10 shadow-xl border-2 border-orange-200 bg-white/90 backdrop-blur-sm mb-8 2xl:mb-12 3xl:mb-16">
          <CardContent className="p-0">
            <h3 className="text-xl 2xl:text-2xl 3xl:text-3xl font-bold text-gray-800 mb-4 2xl:mb-6">
              {t("content.bonus.verse_chorus")}
            </h3>
            <div className="bg-gray-50 p-6 2xl:p-8 3xl:p-10 rounded-lg font-mono text-sm 2xl:text-base 3xl:text-lg leading-relaxed whitespace-pre-line">
              {`G          C
Love, love me do
G             C
You know I love you
G            C
I'll always be true
   C             G     C  G
So please... love me do

(Repeat for verses)`}
            </div>
          </CardContent>
        </Card>

        {/* Bridge Section */}
        <Card className="p-6 2xl:p-8 3xl:p-10 shadow-xl border-2 border-orange-200 bg-white/90 backdrop-blur-sm mb-8 2xl:mb-12 3xl:mb-16">
          <CardContent className="p-0">
            <h3 className="text-xl 2xl:text-2xl 3xl:text-3xl font-bold text-gray-800 mb-4 2xl:mb-6">
              {t("content.bonus.bridge")}
            </h3>
            <div className="bg-gray-50 p-6 2xl:p-8 3xl:p-10 rounded-lg font-mono text-sm 2xl:text-base 3xl:text-lg leading-relaxed whitespace-pre-line">
              {`D          C
Someone to love
G
Somebody new...`}
            </div>
          </CardContent>
        </Card>

        {/* Harmonica Riff Section */}
        <Card className="p-6 2xl:p-8 3xl:p-10 shadow-xl border-2 border-orange-200 bg-white/90 backdrop-blur-sm mb-8 2xl:mb-12 3xl:mb-16">
          <CardContent className="p-0">
            <h3 className="text-xl 2xl:text-2xl 3xl:text-3xl font-bold text-gray-800 mb-4 2xl:mb-6">
              {t("content.bonus.harmonica_riff")}
            </h3>
            <p className="text-base 2xl:text-lg 3xl:text-xl text-gray-700 leading-relaxed">
              {t("content.bonus.harmonica_riff_desc")}
            </p>
          </CardContent>
        </Card>

        {/* Important Tips Section */}
        <Card className="p-6 2xl:p-8 3xl:p-10 shadow-xl border-2 border-orange-200 bg-white/90 backdrop-blur-sm mb-8 2xl:mb-12 3xl:mb-16">
          <CardContent className="p-0">
            <h2 className="text-2xl 2xl:text-3xl 3xl:text-4xl font-bold text-gray-800 mb-4 2xl:mb-6">
              {t("content.bonus.important_tips")}
            </h2>
            <ul className="space-y-3 2xl:space-y-4 3xl:space-y-5">
              <li className="flex items-start gap-3">
                <span className="text-orange-600 font-bold text-xl">•</span>
                <p className="text-base 2xl:text-lg 3xl:text-xl text-gray-700">
                  {t("content.bonus.tip_1")}
                </p>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-orange-600 font-bold text-xl">•</span>
                <p className="text-base 2xl:text-lg 3xl:text-xl text-gray-700">
                  {t("content.bonus.tip_2")}
                </p>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-orange-600 font-bold text-xl">•</span>
                <p className="text-base 2xl:text-lg 3xl:text-xl text-gray-700">
                  {t("content.bonus.tip_3")}
                </p>
              </li>
            </ul>
          </CardContent>
        </Card>

        {/* Audio Player Section */}
        <Card className="p-6 2xl:p-8 3xl:p-10 shadow-xl border-2 border-orange-200 bg-white/90 backdrop-blur-sm mb-8 2xl:mb-12 3xl:mb-16">
          <CardContent className="p-0">
            <h3 className="text-xl 2xl:text-2xl 3xl:text-3xl font-bold text-gray-800 mb-4 2xl:mb-6 text-center">
              {t("content.bonus.play_audio")}
            </h3>
            <div className="flex justify-center gap-4 2xl:gap-6">
              <div className="flex flex-col items-center">
                <AudioPlayer chordName="G" className="mb-2" />
                <span className="text-sm 2xl:text-base text-gray-600">G</span>
              </div>
              <div className="flex flex-col items-center">
                <AudioPlayer chordName="C" className="mb-2" />
                <span className="text-sm 2xl:text-base text-gray-600">C</span>
              </div>
              <div className="flex flex-col items-center">
                <AudioPlayer chordName="D" className="mb-2" />
                <span className="text-sm 2xl:text-base text-gray-600">D</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Final Message */}
        <Card className="p-6 2xl:p-8 3xl:p-10 shadow-xl border-4 border-green-400 bg-gradient-to-br from-green-50 to-yellow-50 backdrop-blur-sm">
          <CardContent className="p-0 text-center">
            <p className="text-xl 2xl:text-2xl 3xl:text-3xl font-bold text-gray-800 leading-relaxed">
              {t("content.bonus.final_message")}
            </p>
          </CardContent>
        </Card>
      </div>

      <style>{`
        @keyframes confetti {
          0% {
            transform: translateY(0) rotate(0deg);
            opacity: 1;
          }
          100% {
            transform: translateY(100vh) rotate(720deg);
            opacity: 0;
          }
        }
        
        .animate-confetti {
          animation: confetti linear forwards;
        }
      `}</style>
    </div>
  );
};
