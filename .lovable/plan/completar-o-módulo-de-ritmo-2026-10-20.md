# Completar o Módulo de Ritmo

## O que está faltando hoje
- O fim da página mostra "Vou adicionar o vídeo aqui" — um espaço vazio.
- O metrônomo de cada batida começa em 80, mesmo quando o sugerido é 100 ou 60.
- Não há a estrutura diária do projeto: "O que praticar hoje", "Erro comum" e "Dica prática".
- Não há exercício guiado nem desafio opcional, nem uma conclusão / próximo passo.
- Topo da página sem o cabeçalho padrão (eyebrow + título dourado) usado nas outras páginas.

## O que vou fazer
1. **Cabeçalho padrão** no topo (mesmo estilo das outras páginas).
2. **Metrônomo começa no BPM sugerido** de cada batida (Rock 100, Sertanejo 80, Reggae 60, Bolero 60).
3. **Contagem visual "1 2 3 4"** junto ao metrônomo, acendendo no tempo, para o iniciante ver onde encaixar a primeira batida.
4. **Em cada batida:** um "Erro comum" e uma "Dica prática" curtos.
5. **Troca do vídeo vazio** por um guia passo a passo ilustrado ("como sincronizar com o metrônomo"): 4 passos curtos com ícones — sem o texto de placeholder. Quando você tiver o vídeo, ele entra no mesmo lugar.
6. **Nova seção final "Treino de hoje"**: exercício de 1–3 min (ex.: Rock/Pop em G → C a 60 BPM), desafio opcional (subir para 100 BPM), frase motivadora ("Se doer, pare. Dor não é progresso.") e botão para voltar às lições.
7. Tudo em português e inglês, responsivo do celular à TV.

## Detalhes técnicos
- `Metronome`: nova prop `initialBpm` e callback de batida atual; `StrummingPattern` passa `bpmSuggestion` e mostra contagem de 4 tempos.
- `StrummingPattern`: props opcionais `mistake` e `tip`.
- Novo componente `RhythmPracticeSteps` para o guia de sincronização; reutilizar `PageHeader`.
- Novas chaves em `rythm.json` (pt-BR / en-US): `page.*`, `tips.<estilo>.mistake/tip`, `sync-steps.*`, `daily-practice.*`; remover `video-placeholder`.
- Teste simples garantindo que o metrônomo inicia no BPM sugerido.
