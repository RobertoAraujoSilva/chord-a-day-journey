import { Metronome } from "@/components/Metronome";
import { useState } from "react";
import { useTranslation } from "@/i18n/context";
import { NavigationPanel } from "@/components/NavigationPanel";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";
import st from "./rythm.module.css";

export default function RythmModule() {
  const [metronomeEnabled, setMetronomeEnabled] = useState(false);
  const { t } = useTranslation();

  return (
    <main className="flex flex-col gap-[2rem]">
      <div style={{ display: 'flex', justifyContent: 'flex-end', padding: '10px' }}>
        <LanguageSwitcher />
      </div>
      <NavigationPanel />
      <br />
      <section className={st.content}>
        <h1 className="font-bold text-xl">{t("rythm.introduction.title")}</h1>
        <p>
          {t("rythm.introduction.concept-1")}
          <br />
          {t("rythm.introduction.concept-2")}
          <br />
          <strong>{t("rythm.introduction.title")}</strong> {t("rythm.introduction.concept-3")}
        </p>
        <br />
        <h1 className="font-bold text-xl">{t("rythm.get-start.title")}</h1>
        <p>
          {t("rythm.get-start.concept-1")}
        </p>
        <br />
        <ul className="font-bold">
          <li>{t("rythm.finger-notation.thumb")}</li>
          <li>{t("rythm.finger-notation.index")}</li>
          <li>{t("rythm.finger-notation.middle")}</li>
          <li>{t("rythm.finger-notation.ring")}</li>
        </ul>
        <br />
        <p>
          {t("rythm.hand-terminology.attack-hand")} <br />
          {t("rythm.hand-terminology.chord-hand")} <br />
        </p>
        <br />
        <p>
          {t("rythm.basic-movements.title")} <br /> {t("rythm.basic-movements.description")}
        </p>
        <ul className={st.setas}>
          <li className="flex gap-2">
            <h2 className="font-bold text-2xl flex-1">{t("rythm.strumming-directions.down-title")}</h2>
            <img
              className="size-[120px] object-contain "
              src="/setas/seta_baixo.png"
              alt={t("rythm.strumming-directions.down-alt")}
            />
          </li>
          <li className="flex gap-2">
            <h2 className="font-bold text-2xl">{t("rythm.strumming-directions.up-title")}</h2>
            <img
              className="size-[120px] object-contain "
              src="/setas/seta_cima.png"
              alt={t("rythm.strumming-directions.up-alt")}
            />
          </li>
        </ul>
        <br />
        <p>
          {t("rythm.muted-strumming.explanation")}
        </p>
        <br />
        <ul className={st.setas}>
          <li className="flex gap-2">
            <h2 className="font-bold text-2xl flex-1">
{t("rythm.muted-strumming.down-muted-title")}
            </h2>
            <img
              className="size-[120px] object-contain "
              src="/setas/seta_baixo_ab.png"
              alt={t("rythm.muted-strumming.down-muted-alt")}
            />
          </li>
          <li className="flex gap-2">
            <h2 className="font-bold text-2xl">Batida para Cima Abafada</h2>
            <img
              className="size-[120px] object-contain "
              src="/setas/seta_cima_ab.png"
              alt={t("rythm.muted-strumming.up-muted-alt")}
            />
          </li>
        </ul>
        <br />
        <p>
          {t("rythm.muted-strumming.technique-note")}
        </p>
        <br />
        <p>
          {t("rythm.muted-strumming.conclusion")}
        </p>
      </section>
      <section className={st.content}>
        <h1 className="font-bold text-xl">{t("rythm.rhythmic-sequences.title")}</h1>
        <p>
          {t("rythm.rhythmic-sequences.intro")}
        </p>
        <br />
        <p>
          {t("rythm.rhythmic-sequences.styles")}
        </p>
        <br />
        <p>{t("rythm.rhythmic-sequences.practice")}</p>
        <br />
        <h1 className="font-bold text-xl mb-[2rem]">{t("rythm.music-styles.rock-pop")}</h1>
        <ul className="flex justify-center">
          <li className="mr-[1.5rem]">
            <img
              className="size-[120px] object-contain "
              src="/setas/seta_baixo.png"
              alt=""
            />
          </li>
          <li>
            <img
              className="size-[120px] object-contain "
              src="/setas/seta_baixo.png"
              alt=""
            />
          </li>
          <li className="mr-[1.5rem]">
            <img
              className="size-[120px] object-contain "
              src="/setas/seta_cima.png"
              alt=""
            />
          </li>
          <li>
            <img
              className="size-[120px] object-contain "
              src="/setas/seta_cima.png"
              alt=""
            />
          </li>
          <li>
            <img
              className="size-[120px] object-contain "
              src="/setas/seta_baixo.png"
              alt=""
            />
          </li>
          <li>
            <img
              className="size-[120px] object-contain "
              src="/setas/seta_cima.png"
              alt=""
            />
          </li>
        </ul>
        <h1 className="font-bold text-xl mt-[2rem] mb-[2rem]">
          {t("rythm.music-styles.sertanejo")}
        </h1>
        <ul className="flex justify-center">
          <li className="">
            <img
              className="size-[120px] object-contain "
              src="/setas/seta_baixo.png"
              alt=""
            />
          </li>
          <li>
            <img
              className="size-[120px] object-contain "
              src="/setas/seta_cima.png"
              alt=""
            />
          </li>
          <li className="">
            <img
              className="size-[120px] object-contain "
              src="/setas/seta_baixo.png"
              alt=""
            />
          </li>
          <li>
            <img
              className="size-[120px] object-contain "
              src="/setas/seta_cima.png"
              alt=""
            />
          </li>
          <li>
            <img
              className="size-[120px] object-contain "
              src="/setas/seta_baixo.png"
              alt=""
            />
          </li>
        </ul>
        <h1 className="font-bold text-xl mt-[2rem] mb-[2rem]">{t("rythm.music-styles.reggae")}</h1>
        <ul className="flex justify-center">
          <li className="">
            <img
              className="size-[120px] object-contain "
              src="/setas/seta_baixo_ab.png"
              alt=""
            />
          </li>
          <li>
            <img
              className="size-[120px] object-contain "
              src="/setas/seta_baixo.png"
              alt=""
            />
          </li>
          <li className="font-bold text-xl">OU</li>
          <li>
            <img
              className="size-[120px] object-contain "
              src="/setas/seta_baixo_ab.png"
              alt=""
            />
          </li>
          <li>
            <img
              className="size-[120px] object-contain "
              src="/setas/seta_cima.png"
              alt=""
            />
          </li>
        </ul>
        <h1 className="font-bold text-xl mt-[2rem] mb-[15px]">Bolero</h1>
        <p className="mb-[2rem]">
          {t("rythm.music-styles.bolero-intro")}
        </p>
        <ul className="flex justify-center">
          <li className="mr-[2rem]">
            <img
              className="size-[150px] object-contain "
              src="/setas/seta_baixo_p.png"
              alt=""
            />
          </li>
          <li className="mr-[-3rem]">
            <img
              className="size-[150px] object-contain "
              src="/setas/seta_baixo_i.png"
              alt=""
            />
          </li>
          <li>
            <img
              className="size-[150px] object-contain "
              src="/setas/seta_baixo_p.png"
              alt=""
            />
          </li>
          <li>
            <img
              className="size-[150px] object-contain "
              src="/setas/seta_baixo_i.png"
              alt=""
            />
          </li>
        </ul>
        <br />
        <p className="flex justify-center mt-[2rem]">
          <strong>
            {t("rythm.music-styles.spacing-note")}
          </strong>
        </p>
      </section>
      <section className={st.content}>
        <h1 className="font-bold text-xl">
          {t("rythm.metronome.title")}
        </h1>
        <br />
        <p>
          {t("rythm.metronome.definition")}
        </p>
        <p>
          {t("rythm.metronome.function")}
        </p>
        <br />
        <p>
          {t("rythm.metronome.problem")}
        </p>
        <br />
        <p>
          {t("rythm.metronome.measurement")}
        </p>
        <br />
        <p>
          {t("rythm.metronome.importance")}
        </p>
        <br />
        <p>
          {t("rythm.metronome.practice-instructions")}
        </p>
        <br />
        <p>{t("rythm.metronome.video-instruction")}</p>
        <div className={st.caixavideo}>{t("rythm.metronome.video-placeholder")}</div>
      </section>
    </main>
  );
}
