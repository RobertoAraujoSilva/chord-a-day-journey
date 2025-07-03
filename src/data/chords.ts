
export interface Chord {
  name: string;
  fullName: string;
  fingering: string[];
  fingers: string[];
  difficulty: 'Fácil' | 'Médio' | 'Difícil';
  instructions: string;
  tip: string;
  commonSongs?: string[];
}

export const chords: Chord[] = [
  {
    name: 'Em',
    fullName: 'Mi menor',
    fingering: ['0', '2', '2', '0', '0', '0'],
    fingers: ['', '2', '3', '', '', ''],
    difficulty: 'Fácil',
    instructions: 'Coloque o dedo 2 na segunda casa da corda A (5ª corda) e o dedo 3 na segunda casa da corda D (4ª corda). As outras cordas ficam soltas.',
    tip: 'Este é um dos acordes mais fáceis! Certifique-se de que os dedos estão curvados e não tocam nas outras cordas.',
    commonSongs: ['Wonderwall - Oasis', 'Creep - Radiohead', 'Wish You Were Here - Pink Floyd']
  },
  {
    name: 'Am',
    fullName: 'Lá menor',
    fingering: ['x', '0', '2', '2', '1', '0'],
    fingers: ['', '', '2', '3', '1', ''],
    difficulty: 'Fácil',
    instructions: 'Coloque o dedo 1 na primeira casa da corda B, dedo 2 na segunda casa da corda D, e dedo 3 na segunda casa da corda G. Não toque a corda E grave.',
    tip: 'Mantenha o polegar atrás do braço do violão para ter melhor apoio. Este acorde aparece em milhares de músicas!',
    commonSongs: ['House of the Rising Sun - The Animals', 'Stairway to Heaven - Led Zeppelin']
  },
  {
    name: 'C',
    fullName: 'Dó maior',
    fingering: ['x', '3', '2', '0', '1', '0'],
    fingers: ['', '3', '2', '', '1', ''],
    difficulty: 'Médio',
    instructions: 'Dedo 1 na primeira casa da corda B, dedo 2 na segunda casa da corda D, dedo 3 na terceira casa da corda A. Corda G e E aguda ficam soltas.',
    tip: 'Este acorde pode ser um pouco desafiador no início. Certifique-se de pressionar bem as cordas e que cada nota soe limpa.',
    commonSongs: ['Let It Be - The Beatles', 'Imagine - John Lennon', 'Hallelujah - Leonard Cohen']
  },
  {
    name: 'G',
    fullName: 'Sol maior',
    fingering: ['3', '2', '0', '0', '3', '3'],
    fingers: ['2', '1', '', '', '3', '4'],
    difficulty: 'Médio',
    instructions: 'Dedo 1 na segunda casa da corda A, dedo 2 na terceira casa da corda E grave, dedo 3 na terceira casa da corda B, dedo 4 na terceira casa da corda E aguda.',
    tip: 'Use a ponta dos dedos e mantenha-os curvados. É normal este acorde ser difícil no começo, mas com prática fica natural.',
    commonSongs: ['Good Riddance - Green Day', 'Wonderwall - Oasis', 'Wish You Were Here - Pink Floyd']
  },
  {
    name: 'D',
    fullName: 'Ré maior',
    fingering: ['x', 'x', '0', '2', '3', '2'],
    fingers: ['', '', '', '1', '3', '2'],
    difficulty: 'Médio',
    instructions: 'Dedo 1 na segunda casa da corda G, dedo 2 na segunda casa da corda E aguda, dedo 3 na terceira casa da corda B. Só toque as 4 cordas mais agudas.',
    tip: 'Concentre-se em tocar apenas as cordas que devem soar. As duas cordas mais graves (E e A) não devem ser tocadas neste acorde.',
    commonSongs: ['Wonderwall - Oasis', 'Free Fallin\' - Tom Petty', 'Good Riddance - Green Day']
  },
  {
    name: 'E',
    fullName: 'Mi maior',
    fingering: ['0', '2', '2', '1', '0', '0'],
    fingers: ['', '2', '3', '1', '', ''],
    difficulty: 'Fácil',
    instructions: 'Dedo 1 na primeira casa da corda G, dedo 2 na segunda casa da corda A, dedo 3 na segunda casa da corda D. As cordas E ficam soltas.',
    tip: 'Este é um acorde fundamental! Certifique-se de que o dedo 1 não toque na corda B acidentalmente.',
    commonSongs: ['Wild Thing', 'Twist and Shout - The Beatles', 'Gloria']
  },
  {
    name: 'A',
    fullName: 'Lá maior',
    fingering: ['x', '0', '2', '2', '2', '0'],
    fingers: ['', '', '1', '2', '3', ''],
    difficulty: 'Médio',
    instructions: 'Coloque os dedos 1, 2 e 3 todos na segunda casa das cordas D, G e B respectivamente. A corda A fica solta, E aguda solta.',
    tip: 'Tente usar apenas um dedo (como uma pestana) para pressionar as três cordas na segunda casa - isso facilitará a transição para outros acordes.',
    commonSongs: ['Free Fallin\' - Tom Petty', 'Wonderwall - Oasis', 'Love Me Do - The Beatles']
  },
  {
    name: 'Dm',
    fullName: 'Ré menor',
    fingering: ['x', 'x', '0', '2', '3', '1'],
    fingers: ['', '', '', '2', '3', '1'],
    difficulty: 'Médio',
    instructions: 'Dedo 1 na primeira casa da corda E aguda, dedo 2 na segunda casa da corda G, dedo 3 na terceira casa da corda B. Toque apenas as 4 cordas mais agudas.',
    tip: 'Como o acorde de D maior, evite tocar as cordas E grave e A. O som deve ser mais melancólico que o D maior.',
    commonSongs: ['Scarborough Fair', 'Eleanor Rigby - The Beatles', 'Mad World']
  },
  {
    name: 'F',
    fullName: 'Fá maior',
    fingering: ['1', '3', '3', '2', '1', '1'],
    fingers: ['1', '3', '4', '2', '1', '1'],
    difficulty: 'Difícil',
    instructions: 'Este é um acorde com pestana. Use o dedo 1 para pressionar todas as cordas na primeira casa, depois coloque os outros dedos: dedo 2 na segunda casa da corda G, dedos 3 e 4 na terceira casa das cordas A e D.',
    tip: 'Este é o primeiro acorde realmente desafiador! A pestana requer força e prática. Comece praticando apenas a pestana, depois adicione os outros dedos.',
    commonSongs: ['Here Comes the Sun - The Beatles', 'Hey Jude - The Beatles']
  },
  {
    name: 'B7',
    fullName: 'Si com sétima',
    fingering: ['x', '2', '1', '2', '0', '2'],
    fingers: ['', '2', '1', '3', '', '4'],
    difficulty: 'Médio',
    instructions: 'Dedo 1 na primeira casa da corda D, dedo 2 na segunda casa da corda A, dedo 3 na segunda casa da corda G, dedo 4 na segunda casa da corda E aguda.',
    tip: 'Este acorde tem uma sonoridade jazzy e é muito usado em blues. A corda B fica solta, criando um som interessante.',
    commonSongs: ['Love Me Tender - Elvis', 'Blue Suede Shoes', 'Stand By Me']
  },
  {
    name: 'Bm',
    fullName: 'Si menor',
    fingering: ['x', '2', '4', '4', '3', '2'],
    fingers: ['', '1', '3', '4', '2', '1'],
    difficulty: 'Difícil',
    instructions: 'Use uma mini-pestana com o dedo 1 na segunda casa (cordas A e E aguda), dedo 2 na terceira casa da corda B, dedos 3 e 4 na quarta casa das cordas D e G.',
    tip: 'Este é outro acorde desafiador. Você pode usar uma pestana completa na segunda casa se for mais confortável.',
    commonSongs: ['The Sound of Silence - Simon & Garfunkel', 'Nothing Else Matters - Metallica']
  },
  {
    name: 'G7',
    fullName: 'Sol com sétima',
    fingering: ['3', '2', '0', '0', '0', '1'],
    fingers: ['3', '2', '', '', '', '1'],
    difficulty: 'Fácil',
    instructions: 'Dedo 1 na primeira casa da corda E aguda, dedo 2 na segunda casa da corda A, dedo 3 na terceira casa da corda E grave. As cordas D, G e B ficam soltas.',
    tip: 'Este acorde é muito parecido com o G maior, mas com o dedo mindinho na primeira casa da corda E aguda. Dá um som mais bluesy.',
    commonSongs: ['Margaritaville - Jimmy Buffett', 'Sweet Home Alabama - Lynyrd Skynyrd']
  },
  {
    name: 'C7',
    fullName: 'Dó com sétima',
    fingering: ['x', '3', '2', '3', '1', '0'],
    fingers: ['', '3', '2', '4', '1', ''],
    difficulty: 'Médio',
    instructions: 'Dedo 1 na primeira casa da corda B, dedo 2 na segunda casa da corda D, dedo 3 na terceira casa da corda A, dedo 4 na terceira casa da corda G.',
    tip: 'Baseado no acorde C maior, mas com uma nota adicional que cria tensão. Muito usado em progressões que vão para F.',
    commonSongs: ['Blue Suede Shoes - Elvis', 'Johnny B. Goode - Chuck Berry']
  },
  {
    name: 'A7',
    fullName: 'Lá com sétima',
    fingering: ['x', '0', '2', '0', '2', '0'],
    fingers: ['', '', '2', '', '3', ''],
    difficulty: 'Fácil',
    instructions: 'Dedo 2 na segunda casa da corda D, dedo 3 na segunda casa da corda B. As cordas A, G e E ficam soltas.',
    tip: 'Um dos acordes de sétima mais fáceis! Muito usado em blues e country. Tem um som aberto e resoluto.',
    commonSongs: ['Dead or Alive - Bon Jovi', 'Folsom Prison Blues - Johnny Cash']
  },
  {
    name: 'D7',
    fullName: 'Ré com sétima',
    fingering: ['x', 'x', '0', '2', '1', '2'],
    fingers: ['', '', '', '2', '1', '3'],
    difficulty: 'Fácil',
    instructions: 'Dedo 1 na primeira casa da corda B, dedo 2 na segunda casa da corda G, dedo 3 na segunda casa da corda E aguda. Corda D fica solta.',
    tip: 'Muito similar ao D maior, mas com o dedo 1 na primeira casa da corda B. Cria uma tensão que resolve bem no G.',
    commonSongs: ['Cripple Creek', 'Old Joe Clark', 'Will the Circle Be Unbroken']
  },
  {
    name: 'E7',
    fullName: 'Mi com sétima',
    fingering: ['0', '2', '0', '1', '0', '0'],
    fingers: ['', '2', '', '1', '', ''],
    difficulty: 'Fácil',
    instructions: 'Dedo 1 na primeira casa da corda G, dedo 2 na segunda casa da corda A. Todas as outras cordas ficam soltas.',
    tip: 'Ainda mais fácil que o E maior! Remove apenas um dedo do acorde de E. Muito usado em blues e rock.',
    commonSongs: ['Crossroads - Robert Johnson', 'Pride and Joy - Stevie Ray Vaughan']
  },
  {
    name: 'Am7',
    fullName: 'Lá menor com sétima',
    fingering: ['x', '0', '2', '0', '1', '0'],
    fingers: ['', '', '2', '', '1', ''],
    difficulty: 'Fácil',
    instructions: 'Dedo 1 na primeira casa da corda B, dedo 2 na segunda casa da corda D. As cordas A, G e E ficam soltas.',
    tip: 'Uma versão mais suave do Am. Muito usado em jazz e bossa nova. Tem um som mais sofisticado e relaxante.',
    commonSongs: ['Girl from Ipanema', 'Autumn Leaves', 'Fly Me to the Moon']
  },
  {
    name: 'Em7',
    fullName: 'Mi menor com sétima',
    fingering: ['0', '2', '0', '0', '0', '0'],
    fingers: ['', '2', '', '', '', ''],
    difficulty: 'Fácil',
    instructions: 'Apenas o dedo 2 na segunda casa da corda A. Todas as outras cordas ficam soltas.',
    tip: 'O acorde mais fácil de todos! Apenas um dedo. Tem um som muito aberto e etéreo, perfeito para baladas.',
    commonSongs: ['Blackbird - The Beatles', 'The Scientist - Coldplay']
  },
  {
    name: 'Dm7',
    fullName: 'Ré menor com sétima',
    fingering: ['x', 'x', '0', '2', '1', '1'],
    fingers: ['', '', '', '2', '1', '1'],
    difficulty: 'Médio',
    instructions: 'Use o dedo 1 para fazer uma mini-pestana na primeira casa (cordas B e E aguda), dedo 2 na segunda casa da corda G.',
    tip: 'Uma sonoridade jazzy e sofisticada. A mini-pestana pode ser desafiadora no início, mas é muito útil de dominar.',
    commonSongs: ['Fly Me to the Moon', 'Autumn Leaves', 'Summertime']
  },
  {
    name: 'Cmaj7',
    fullName: 'Dó maior com sétima maior',
    fingering: ['x', '3', '2', '0', '0', '0'],
    fingers: ['', '2', '1', '', '', ''],
    difficulty: 'Fácil',
    instructions: 'Dedo 1 na segunda casa da corda D, dedo 2 na terceira casa da corda A. As cordas G, B e E ficam soltas.',
    tip: 'Um acorde muito bonito e sofisticado. Mais suave que o C7, tem uma sonoridade dreamy perfeita para baladas.',
    commonSongs: ['Imagine - John Lennon', 'The Girl from Ipanema', 'Wonderwall - Oasis']
  },
  {
    name: 'Fmaj7',
    fullName: 'Fá maior com sétima maior',
    fingering: ['1', '3', '3', '2', '1', '0'],
    fingers: ['1', '3', '4', '2', '1', ''],
    difficulty: 'Difícil',
    instructions: 'Pestana com dedo 1 na primeira casa (cordas E grave e B), dedo 2 na segunda casa da corda G, dedos 3 e 4 na terceira casa das cordas A e D.',
    tip: 'Similar ao F maior, mas sem pressionar a corda E aguda na pestana. Cria um som mais aberto e jazz.',
    commonSongs: ['Here Comes the Sun - The Beatles', 'Just the Way You Are - Billy Joel']
  },
  {
    name: 'Gsus4',
    fullName: 'Sol suspenso quarta',
    fingering: ['3', '3', '0', '0', '1', '3'],
    fingers: ['2', '3', '', '', '1', '4'],
    difficulty: 'Médio',
    instructions: 'Dedo 1 na primeira casa da corda B, dedo 2 na terceira casa da corda E grave, dedo 3 na terceira casa da corda A, dedo 4 na terceira casa da corda E aguda.',
    tip: 'Acorde de passagem muito usado. Cria suspense e tensão que resolve bem no G maior. Muito usado no rock.',
    commonSongs: ['Pinball Wizard - The Who', 'Behind Blue Eyes - The Who']
  },
  {
    name: 'Dsus4',
    fullName: 'Ré suspenso quarta',
    fingering: ['x', 'x', '0', '2', '3', '3'],
    fingers: ['', '', '', '1', '2', '3'],
    difficulty: 'Médio',
    instructions: 'Dedo 1 na segunda casa da corda G, dedo 2 na terceira casa da corda B, dedo 3 na terceira casa da corda E aguda.',
    tip: 'Cria uma bela tensão que resolve no D maior. Muito usado em músicas folk e country para adicionar movimento.',
    commonSongs: ['Blackbird - The Beatles', 'Dust in the Wind - Kansas']
  },
  {
    name: 'Cadd9',
    fullName: 'Dó maior com nona adicionada',
    fingering: ['x', '3', '2', '0', '3', '0'],
    fingers: ['', '2', '1', '', '3', ''],
    difficulty: 'Médio',
    instructions: 'Dedo 1 na segunda casa da corda D, dedo 2 na terceira casa da corda A, dedo 3 na terceira casa da corda B.',
    tip: 'Uma versão mais colorida do C maior. Adiciona uma nota que dá um som mais moderno e interessante.',
    commonSongs: ['High and Dry - Radiohead', 'Champagne Supernova - Oasis']
  },
  {
    name: 'G/B',
    fullName: 'Sol com baixo em Si',
    fingering: ['x', '2', '0', '0', '3', '3'],
    fingers: ['', '1', '', '', '2', '3'],
    difficulty: 'Médio',
    instructions: 'Dedo 1 na segunda casa da corda A, dedo 2 na terceira casa da corda B, dedo 3 na terceira casa da corda E aguda.',
    tip: 'Acorde de passagem muito útil. O baixo diferente cria uma linha melódica no baixo, muito usado em progressões descendentes.',
    commonSongs: ['Wonderwall - Oasis', 'Good Riddance - Green Day']
  },
  {
    name: 'F#m',
    fullName: 'Fá sustenido menor',
    fingering: ['2', '4', '4', '2', '2', '2'],
    fingers: ['1', '3', '4', '1', '1', '1'],
    difficulty: 'Difícil',
    instructions: 'Pestana completa com dedo 1 na segunda casa, dedo 3 na quarta casa da corda A, dedo 4 na quarta casa da corda D.',
    tip: 'Baseado na forma do Em, mas com pestana na segunda casa. Este é um bom exercício para dominar pestanas.',
    commonSongs: ['Hotel California - Eagles', 'Stairway to Heaven - Led Zeppelin']
  },
  {
    name: 'Bb',
    fullName: 'Si bemol maior',
    fingering: ['x', '1', '3', '3', '3', '1'],
    fingers: ['', '1', '2', '3', '4', '1'],
    difficulty: 'Difícil',
    instructions: 'Pestana com dedo 1 na primeira casa (cordas A e E aguda), dedo 2 na terceira casa da corda D, dedos 3 e 4 na terceira casa das cordas G e B.',
    tip: 'Outro acorde com pestana. Muito comum em músicas em tonalidades com bemóis. Pratique a pestana separadamente primeiro.',
    commonSongs: ['Let It Be - The Beatles', 'Hey Jude - The Beatles']
  },
  {
    name: 'A#dim',
    fullName: 'Lá sustenido diminuto',
    fingering: ['x', '1', '2', '0', '2', '0'],
    fingers: ['', '1', '2', '', '3', ''],
    difficulty: 'Médio',
    instructions: 'Dedo 1 na primeira casa da corda A, dedo 2 na segunda casa da corda D, dedo 3 na segunda casa da corda B.',
    tip: 'Acorde de passagem com sonoridade única e misteriosa. Muito usado para criar tensão e movimento harmônico interessante.',
    commonSongs: ['Cry Me a River', 'As Time Goes By', 'Yesterday - The Beatles']
  },
  {
    name: 'Esus4',
    fullName: 'Mi suspenso quarta',
    fingering: ['0', '2', '2', '2', '0', '0'],
    fingers: ['', '1', '2', '3', '', ''],
    difficulty: 'Fácil',
    instructions: 'Dedo 1 na segunda casa da corda A, dedo 2 na segunda casa da corda D, dedo 3 na segunda casa da corda G.',
    tip: 'Cria uma bela tensão que resolve no E maior. Muito usado no final de frases musicais para adicionar drama.',
    commonSongs: ['The Who - Pinball Wizard', 'Pink Floyd - Wish You Were Here']
  }
];
