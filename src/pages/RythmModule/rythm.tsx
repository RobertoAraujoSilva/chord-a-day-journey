import { Metronome } from "@/components/Metronome";
import { useState } from "react";
import { useTranslation } from "@/i18n/context";
import { NavigationPanel } from "@/components/NavigationPanel";
import st from "./rythm.module.css";

export default function RythmModule() {
  const [metronomeEnabled, setMetronomeEnabled] = useState(false);
  const { t } = useTranslation();

  return (
    <main className="flex flex-col gap-[2rem]">
      <NavigationPanel />
      <br />
      <section className={st.content}>
        <h1 className="font-bold text-xl">Batidas Rítmicas</h1>
        <p>
          Agora que você já dominou a mão esquerda com a montagem de acordes.
          Está na hora de ir para a função da mão direita. A mão direita no
          violão cumpre o papel de realizar as Batidas Rítmicas e Arpejos.
          <br />
          <strong>Batida Rítmica</strong> é o nome dado as sequencias de
          movimentos na mão direita (ou a mão oposta a que você monta acordes).
        </p>
        <br />
        <h1 className="font-bold text-xl">
          Antes de começarmos a ação, precisamos entender alguns conceitos
        </h1>
        <p>
          Durante esse módulo, iremos usar indicações com letras de seus dedos.
          Eles são representados da seguinte forma:
        </p>
        <br />
        <ul className="font-bold">
          <li>P = Polegar</li>
          <li>I = Indicador</li>
          <li>M = Médio</li>
          <li>A = Anelar</li>
        </ul>
        <br />
        <p>
          Além disso, a mão que você usa para tocar as cordas (não montar
          acordes) será chamada de <strong>Mão de Ataque.</strong> <br />
          Enquanto a mão que você usa para montar um acorde será chamada de
          <strong> Mão de Acordes.</strong> <br />
        </p>
        <br />
        <p>
          Os dois movimentos principais são a “Descida” e “Subida” que vão ser
          identificadas simplesmente como “Para baixo” ou “Para cima”. <br /> E
          representadas por setas em cada momento que deverá ser aplicada.
        </p>
        <ul className={st.setas}>
          <li className="flex gap-2">
            <h2 className="font-bold text-2xl flex-1">Batida para Baixo</h2>
            <img
              className="size-[120px] object-contain "
              src="/setas/seta_baixo.png"
              alt="Seta para baixo"
            />
          </li>
          <li className="flex gap-2">
            <h2 className="font-bold text-2xl">Batida para Cima</h2>
            <img
              className="size-[120px] object-contain "
              src="/setas/seta_cima.png"
              alt="Seta para cima"
            />
          </li>
        </ul>
        <br />
        <p>
          Além dessas duas indicações também poderemos encontrar a batida
          abafada. Que você realiza uma batida em para cima ou para baixo, mas
          afrouxando a mão de acordes, sem tirar completamente, deixando ela
          levemente sobre as cordas. Dessa forma, o som das cordas não vai sair
          e você realizar uma batida percussiva. Essa batida especial é
          representada por:
        </p>
        <br />
        <ul className={st.setas}>
          <li className="flex gap-2">
            <h2 className="font-bold text-2xl flex-1">
              Batida para Baixo Abafada
            </h2>
            <img
              className="size-[120px] object-contain "
              src="/setas/seta_baixo_ab.png"
              alt="Seta para baixo abafada"
            />
          </li>
          <li className="flex gap-2">
            <h2 className="font-bold text-2xl">Batida para Cima Abafada</h2>
            <img
              className="size-[120px] object-contain "
              src="/setas/seta_cima_ab.png"
              alt="Seta para cima abafada"
            />
          </li>
        </ul>
        <br />
        <p>
          Sendo que normalmente para uma batida para baixo, você normalmente
          deve usar a unha do Indicador, Médio e Anelar (I, M, A) e em batidas
          para cima a Unha do Polegar (P), embora isso possa variar em alguns
          casos.
        </p>
        <br />
        <p>
          Existem outras técnicas, mas vamos nos ater a essas nesse primeiro
          momento.
        </p>
      </section>
      <section className={st.content}>
        <h1 className="font-bold text-xl">Sequências Rítmicas</h1>
        <p>
          Finalmente, vamos ver alguma ação. Embora o ideal seja você dominar
          essas técnicas de batidas e deixar sua criatividade interpretar a
          música, existem alguns <i>“templates”</i> aos quais você pode se
          apegar nesse início.
        </p>
        <br />
        <p>
          Existem inúmeras sequências rítmicas que são usadas em diversos
          estilos de música. Como no Rock, Sertanejo, Reggae e Bolero.
        </p>
        <br />
        <p>Vamos ver e praticar essas sequências.</p>
        <br />
        <h1 className="font-bold text-xl mb-[2rem]">Rock/Pop</h1>
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
          Sertanejo (Guarânia)
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
        <h1 className="font-bold text-xl mt-[2rem] mb-[2rem]">Reggae</h1>
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
          Esse é um pouco diferente dos outros. Você vai fazer o ataque, mas
          usando o polegar (dessa vez com a parte debaixo) e as unhas dos dedos
          I, M, A (que irei resumir usando apenas I). Isso estará indicado acima
          das setas.
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
            Note que entre algumas setas temos um espaçamento maior. Isso indica
            uma pausa maior entre as batidas.
          </strong>
        </p>
      </section>
      <section className={st.content}>
        <h1 className="font-bold text-xl">
          Uso do metrônomo para batidas rítmicas
        </h1>
        <br />
        <p>
          O metrônomo funciona como uma espécie de
          <strong> relógio musical</strong>.
        </p>
        <p>
          Ele emite pulsos sonoros (cliques ou bipes) em intervalos
          perfeitamente regulares para ajudar o músico a manter uma velocidade
          constante.
        </p>
        <br />
        <p>
          Sem essa referência, é natural que a gente acelere ou atrase o ritmo
          involuntariamente, dependendo da empolgação ou da dificuldade de uma
          parte da música.
        </p>
        <br />
        <p>
          Na prática, ele mede as <strong>Batidas Por Minuto (BPM)</strong>. Se
          você configurar para 60 BPM, ele soará exatamente uma vez por segundo;
          se aumentar para 120 BPM, ele soará duas vezes mais rápido.
        </p>
        <br />
        <p>
          Usá-lo é essencial para treinar a precisão e garantir que todos os
          músicos de uma banda estejam "falando a mesma língua" rítmica, criando
          uma base sólida para qualquer batida.
        </p>
        <br />
        <p>
          Em cada exercício, vai estar a indicação de quantos BPM você por o
          metrônomo. Seu objetivo vai ser encaixar todos os movimentos dentro
          dos 4 bips do metrônomo, sempre se concentrando em encaixar a primeira
          batida com o primeiro Bip. Comece sempre treinando as batidas (sem o
          metrônomo) e quando se sentir confortável ative o metrônomo e tente
          sincronizar.
        </p>
        <br />
        <p>Veja o vídeo de como sincronizar o metrônomo com a sua batida.</p>
        <div className={st.caixavideo}>Vou adicionar o vídeo aqui</div>
      </section>
    </main>
  );
}
