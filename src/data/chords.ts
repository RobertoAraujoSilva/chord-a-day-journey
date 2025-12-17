
export interface Chord {
  name: string;
  fingering: string[];
  fingers: string[];
  commonSongs?: string[];
}

export const chords: Chord[] = [
  {
    name: 'Em',
    fingering: ['0', '2', '2', '0', '0', '0'],
    fingers: ['', '2', '3', '', '', ''],
    commonSongs: ['Wonderwall - Oasis', 'Creep - Radiohead', 'Wish You Were Here - Pink Floyd']
  },
  {
    name: 'Am',
    fingering: ['x', '0', '2', '2', '1', '0'],
    fingers: ['', '', '2', '3', '1', ''],
    commonSongs: ['House of the Rising Sun - The Animals', 'Stairway to Heaven - Led Zeppelin']
  },
  {
    name: 'C',
    fingering: ['x', '3', '2', '0', '1', '0'],
    fingers: ['', '3', '2', '', '1', ''],
    commonSongs: ['Let It Be - The Beatles', 'Imagine - John Lennon', 'Hallelujah - Leonard Cohen']
  },
  {
    name: 'G',
    fingering: ['3', '2', '0', '0', '3', '3'],
    fingers: ['2', '1', '', '', '3', '4'],
    commonSongs: ['Good Riddance - Green Day', 'Wonderwall - Oasis', 'Wish You Were Here - Pink Floyd']
  },
  {
    name: 'D',
    fingering: ['x', 'x', '0', '2', '3', '2'],
    fingers: ['', '', '', '1', '3', '2'],
    commonSongs: ['Wonderwall - Oasis', 'Free Fallin\' - Tom Petty', 'Good Riddance - Green Day']
  },
  {
    name: 'E',
    fingering: ['0', '2', '2', '1', '0', '0'],
    fingers: ['', '2', '3', '1', '', ''],
    commonSongs: ['Wild Thing', 'Twist and Shout - The Beatles', 'Gloria']
  },
  {
    name: 'A',
    fingering: ['x', '0', '2', '2', '2', '0'],
    fingers: ['', '', '1', '2', '3', ''],
    commonSongs: ['Free Fallin\' - Tom Petty', 'Wonderwall - Oasis', 'Love Me Do - The Beatles']
  },
  {
    name: 'Dm',
    fingering: ['x', 'x', '0', '2', '3', '1'],
    fingers: ['', '', '', '2', '3', '1'],
    commonSongs: ['Scarborough Fair', 'Eleanor Rigby - The Beatles', 'Mad World']
  },
  {
    name: 'F',
    fingering: ['1', '3', '3', '2', '1', '1'],
    fingers: ['1', '3', '4', '2', '1', '1'],
    commonSongs: ['Here Comes the Sun - The Beatles', 'Hey Jude - The Beatles']
  },
  {
    name: 'B7',
    fingering: ['x', '2', '1', '2', '0', '2'],
    fingers: ['', '2', '1', '3', '', '4'],
    commonSongs: ['Love Me Tender - Elvis', 'Blue Suede Shoes', 'Stand By Me']
  },
  {
    name: 'Bm',
    fingering: ['x', '2', '4', '4', '3', '2'],
    fingers: ['', '1', '3', '4', '2', '1'],
    commonSongs: ['The Sound of Silence - Simon & Garfunkel', 'Nothing Else Matters - Metallica']
  },
  {
    name: 'G7',
    fingering: ['3', '2', '0', '0', '0', '1'],
    fingers: ['3', '2', '', '', '', '1'],
    commonSongs: ['Margaritaville - Jimmy Buffett', 'Sweet Home Alabama - Lynyrd Skynyrd']
  },
  {
    name: 'C7',
    fingering: ['x', '3', '2', '3', '1', '0'],
    fingers: ['', '3', '2', '4', '1', ''],
    commonSongs: ['Blue Suede Shoes - Elvis', 'Johnny B. Goode - Chuck Berry']
  },
  {
    name: 'A7',
    fingering: ['x', '0', '2', '0', '2', '0'],
    fingers: ['', '', '2', '', '3', ''],
    commonSongs: ['Dead or Alive - Bon Jovi', 'Folsom Prison Blues - Johnny Cash']
  },
  {
    name: 'D7',
    fingering: ['x', 'x', '0', '2', '1', '2'],
    fingers: ['', '', '', '2', '1', '3'],
    commonSongs: ['Cripple Creek', 'Old Joe Clark', 'Will the Circle Be Unbroken']
  },
  {
    name: 'E7',
    fingering: ['0', '2', '0', '1', '0', '0'],
    fingers: ['', '2', '', '1', '', ''],
    commonSongs: ['Crossroads - Robert Johnson', 'Pride and Joy - Stevie Ray Vaughan']
  },
  {
    name: 'Am7',
    fingering: ['x', '0', '2', '0', '1', '0'],
    fingers: ['', '', '2', '', '1', ''],
    commonSongs: ['Girl from Ipanema', 'Autumn Leaves', 'Fly Me to the Moon']
  },
  {
    name: 'Em7',
    fingering: ['0', '2', '0', '0', '0', '0'],
    fingers: ['', '2', '', '', '', ''],
    commonSongs: ['Blackbird - The Beatles', 'The Scientist - Coldplay']
  },
  {
    name: 'Dm7',
    fingering: ['x', 'x', '0', '2', '1', '1'],
    fingers: ['', '', '', '2', '1', '1'],
    commonSongs: ['Fly Me to the Moon', 'Autumn Leaves', 'Summertime']
  },
  {
    name: 'Cmaj7',
    fingering: ['x', '3', '2', '0', '0', '0'],
    fingers: ['', '2', '1', '', '', ''],
    commonSongs: ['Imagine - John Lennon', 'The Girl from Ipanema', 'Wonderwall - Oasis']
  },
  {
    name: 'Fmaj7',
    fingering: ['1', '3', '3', '2', '1', '0'],
    fingers: ['1', '3', '4', '2', '1', ''],
    commonSongs: ['Here Comes the Sun - The Beatles', 'Just the Way You Are - Billy Joel']
  },
  {
    name: 'Gsus4',
    fingering: ['3', '3', '0', '0', '1', '3'],
    fingers: ['2', '3', '', '', '1', '4'],
    commonSongs: ['Pinball Wizard - The Who', 'Behind Blue Eyes - The Who']
  },
  {
    name: 'Dsus4',
    fingering: ['x', 'x', '0', '2', '3', '3'],
    fingers: ['', '', '', '1', '2', '3'],
    commonSongs: ['Blackbird - The Beatles', 'Dust in the Wind - Kansas']
  },
  {
    name: 'Cadd9',
    fingering: ['x', '3', '2', '0', '3', '0'],
    fingers: ['', '2', '1', '', '3', ''],
    commonSongs: ['High and Dry - Radiohead', 'Champagne Supernova - Oasis']
  },
  {
    name: 'G/B',
    fingering: ['x', '2', '0', '0', '3', '3'],
    fingers: ['', '1', '', '', '2', '3'],
    commonSongs: ['Wonderwall - Oasis', 'Good Riddance - Green Day']
  },
  {
    name: 'F#m',
    fingering: ['2', '4', '4', '2', '2', '2'],
    fingers: ['1', '3', '4', '1', '1', '1'],
    commonSongs: ['Hotel California - Eagles', 'Stairway to Heaven - Led Zeppelin']
  },
  {
    name: 'Bb',
    fingering: ['x', '1', '3', '3', '3', '1'],
    fingers: ['', '1', '2', '3', '4', '1'],
    commonSongs: ['Let It Be - The Beatles', 'Hey Jude - The Beatles']
  },
  {
    name: 'A#dim',
    fingering: ['x', '1', '2', '0', '2', '0'],
    fingers: ['', '1', '2', '', '3', ''],
    commonSongs: ['Cry Me a River', 'As Time Goes By', 'Yesterday - The Beatles']
  },
  {
    name: 'Esus4',
    fingering: ['0', '2', '2', '2', '0', '0'],
    fingers: ['', '1', '2', '3', '', ''],
    commonSongs: ['The Who - Pinball Wizard', 'Pink Floyd - Wish You Were Here']
  },
  {
    name: 'Asus4',
    fingering: ['x', '0', '2', '2', '3', '0'],
    fingers: ['', '', '1', '2', '3', ''],
    commonSongs: ['Free Fallin\' - Tom Petty', 'Wonderwall - Oasis', 'Champagne Supernova - Oasis']
  }
];
