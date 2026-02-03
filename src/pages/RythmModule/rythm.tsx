import { useTranslation } from "@/i18n/context";
import { NavigationPanel } from "@/components/NavigationPanel";
import { StrummingPattern } from "@/components/StrummingPattern";
import st from "./rythm.module.css";

export default function RythmModule() {
  const { t } = useTranslation();

  return (
    <main className="flex flex-col gap-6 sm:gap-8">
      <NavigationPanel />

      {/* Seção 1: Introdução */}
      <section className={st.content}>
        <h1 className="font-bold text-xl">{t("rythm.introduction.title")}</h1>
        <p className="mt-4">
          {t("rythm.introduction.concept-1")}
          <br />
          {t("rythm.introduction.concept-2")}
          <br />
          <strong>{t("rythm.introduction.title")}</strong>{" "}
          {t("rythm.introduction.concept-3")}
        </p>

        <h2 className="font-bold text-xl mt-6">{t("rythm.get-start.title")}</h2>
        <p className="mt-2">{t("rythm.get-start.concept-1")}</p>

        <ul className="font-bold mt-4 space-y-1">
          <li>{t("rythm.finger-notation.thumb")}</li>
          <li>{t("rythm.finger-notation.index")}</li>
          <li>{t("rythm.finger-notation.middle")}</li>
          <li>{t("rythm.finger-notation.ring")}</li>
        </ul>

        <p className="mt-4">
          {t("rythm.hand-terminology.attack-hand")} <br />
          {t("rythm.hand-terminology.chord-hand")}
        </p>

        <p className="mt-4">
          {t("rythm.basic-movements.title")} <br />
          {t("rythm.basic-movements.description")}
        </p>

        {/* Setas básicas */}
        <ul className={st.setas}>
          <li className="flex gap-2 items-center">
            <h3 className="font-bold text-lg sm:text-2xl">
              {t("rythm.strumming-directions.down-title")}
            </h3>
            <img
              className="w-20 h-20 sm:w-[120px] sm:h-[120px] object-contain"
              src="/setas/seta_baixo.png"
              alt={t("rythm.strumming-directions.down-alt")}
            />
          </li>
          <li className="flex gap-2 items-center">
            <h3 className="font-bold text-lg sm:text-2xl">
              {t("rythm.strumming-directions.up-title")}
            </h3>
            <img
              className="w-20 h-20 sm:w-[120px] sm:h-[120px] object-contain"
              src="/setas/seta_cima.png"
              alt={t("rythm.strumming-directions.up-alt")}
            />
          </li>
        </ul>

        <p className="mt-6">{t("rythm.muted-strumming.explanation")}</p>

        {/* Setas abafadas */}
        <ul className={st.setas}>
          <li className="flex gap-2 items-center">
            <h3 className="font-bold text-lg sm:text-2xl">
              {t("rythm.muted-strumming.down-muted-title")}
            </h3>
            <img
              className="w-20 h-20 sm:w-[120px] sm:h-[120px] object-contain"
              src="/setas/seta_baixo_ab.png"
              alt={t("rythm.muted-strumming.down-muted-alt")}
            />
          </li>
          <li className="flex gap-2 items-center">
            <h3 className="font-bold text-lg sm:text-2xl">
              {t("rythm.muted-strumming.up-muted-title")}
            </h3>
            <img
              className="w-20 h-20 sm:w-[120px] sm:h-[120px] object-contain"
              src="/setas/seta_cima_ab.png"
              alt={t("rythm.muted-strumming.up-muted-alt")}
            />
          </li>
        </ul>

        <p className="mt-6">{t("rythm.muted-strumming.technique-note")}</p>
        <p className="mt-2">{t("rythm.muted-strumming.conclusion")}</p>
      </section>

      {/* Seção 2: Sequências Rítmicas */}
      <section className={st.content}>
        <h1 className="font-bold text-xl">
          {t("rythm.rhythmic-sequences.title")}
        </h1>
        <p className="mt-2">{t("rythm.rhythmic-sequences.intro")}</p>
        <p className="mt-2">{t("rythm.rhythmic-sequences.styles")}</p>
        <p className="mt-2">{t("rythm.rhythmic-sequences.practice")}</p>

        {/* Rock/Pop */}
        <div className="mt-6 border-t pt-6">
          <StrummingPattern
            title={t("rythm.music-styles.rock-pop")}
            bpmSuggestion={100}
            arrows={[
              { type: "down" },
              { type: "down" },
              { type: "up", spacing: true },
              { type: "up" },
              { type: "down" },
              { type: "up" },
            ]}
          />
        </div>

        {/* Sertanejo/Country */}
        <div className="mt-6 border-t pt-6">
          <StrummingPattern
            title={t("rythm.music-styles.sertanejo")}
            bpmSuggestion={80}
            arrows={[
              { type: "down" },
              { type: "up" },
              { type: "down" },
              { type: "up" },
              { type: "down" },
            ]}
          />
        </div>

        {/* Reggae */}
        <div className="mt-6 border-t pt-6">
          <StrummingPattern
            title={t("rythm.music-styles.reggae")}
            bpmSuggestion={60}
            arrows={[
              { type: "down-muted" },
              { type: "down" },
              { type: "down-muted", spacing: true },
              { type: "up" },
            ]}
            showOr={{ afterIndex: 1 }}
          />
        </div>

        {/* Bolero */}
        <div className="mt-6 border-t pt-6">
          <StrummingPattern
            title={t("rythm.music-styles.bolero")}
            description={t("rythm.music-styles.bolero-intro")}
            bpmSuggestion={60}
            arrows={[
              { type: "down-p", spacing: true },
              { type: "down-i" },
              { type: "down-p" },
              { type: "down-i" },
            ]}
          />
        </div>

        <p className="flex justify-center mt-6 text-center">
          <strong>{t("rythm.music-styles.spacing-note")}</strong>
        </p>
      </section>

      {/* Seção 3: Metrônomo */}
      <section className={st.content}>
        <h1 className="font-bold text-xl">{t("rythm.metronome.title")}</h1>
        <p className="mt-4">{t("rythm.metronome.definition")}</p>
        <p className="mt-2">{t("rythm.metronome.function")}</p>
        <p className="mt-4">{t("rythm.metronome.problem")}</p>
        <p className="mt-4">{t("rythm.metronome.measurement")}</p>
        <p className="mt-4">{t("rythm.metronome.importance")}</p>
        <p className="mt-4">{t("rythm.metronome.practice-instructions")}</p>
        <p className="mt-4">{t("rythm.metronome.video-instruction")}</p>
        <div className={st.caixavideo}>
          {t("rythm.metronome.video-placeholder")}
        </div>
      </section>
    </main>
  );
}
