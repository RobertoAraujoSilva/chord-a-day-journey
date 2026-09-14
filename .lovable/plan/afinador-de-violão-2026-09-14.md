# Afinador de Violão

Nova página com um afinador completo para iniciantes: ele escuta a corda pelo microfone e mostra ao vivo se está grave ou aguda, e também toca o som certo de cada corda para afinar de ouvido.

Afinação: padrão (E A D G B E).

## O que o usuário vai ver

1. **Seis botões de corda** (6ª E grave → 1ª E aguda), com número, nome da nota e o dedo/ordem de afinação. Toque em um botão para ouvir o som correto daquela corda.
2. **Modo microfone**: um botão "Ouvir minha corda". Ao permitir o microfone, aparece:
   - a nota detectada em destaque,
   - uma agulha/barra que vai da esquerda (grave) para a direita (aguda), verde no centro quando está afinada,
   - texto simples: "Aperte a tarraxa para apertar" / "Solte um pouco" / "Afinada!".
3. **Instruções curtas** para iniciantes: onde ficam as tarraxas, tocar uma corda por vez, apertar devagar, ambiente silencioso.
4. **Aviso claro** se o microfone for negado ou indisponível, com o modo de referência continuando a funcionar.

## Estrutura

- Rota nova `/afinador` (link no menu principal, ao lado do Módulo de Ritmo).
- Página segue o visual Noir & Gold já existente: `PageHeader`, `surface-card`, tipografia `font-display text-gold-light`.
- Layout responsivo do celular à TV (grid flexível, unidades relativas, sem larguras fixas).
- Todo texto vem dos arquivos de idioma (PT-BR e EN-US), nada escrito direto no componente.
- SEO com o componente `SEO` já existente.

## Detalhes técnicos

- `src/pages/Tuner.tsx` — página, monta cabeçalho, navegação, instruções e os dois modos.
- `src/components/tuner/StringButtons.tsx` — botões de referência; reutiliza o `AudioContext` de `src/utils/audioGenerator.ts` acrescentando um export `playNote(frequency, duration)` (Karplus-Strong já existente, sem duplicar lógica de síntese).
- `src/components/tuner/PitchMeter.tsx` — agulha/indicador de desvio em cents, puramente apresentacional.
- `src/hooks/useMicrophonePitch.ts` — `getUserMedia` + `AnalyserNode`, detecção de altura por autocorrelação (float time-domain, buffer 2048, gate de volume RMS para ignorar silêncio/ruído), média móvel curta para estabilizar; retorna `{ frequency, note, cents, listening, error, start, stop }`. Para o stream e fecha o contexto ao desmontar.
- `src/data/tuning.ts` — cordas padrão: E2 82.41, A2 110.00, D3 146.83, G3 196.00, B3 246.94, E4 329.63; helper para converter frequência → nota mais próxima + cents.
- Rota registrada em `src/App.tsx` dentro do `MainLayout`; item novo em `src/components/NavigationPanel.tsx`.
- i18n: nova seção `tuner` em `src/i18n/locales/{pt-BR,en-US}/ui.json` e `tuner: Record<string, string>` em `ui` dentro de `src/i18n/types.ts` (sem `as any`).
- Tolerância de afinado: ±5 cents (verde), ±5–25 amarelo, acima disso vermelho.
