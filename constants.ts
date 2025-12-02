import { Character } from './types';

// NOTE: Please ensure you save the provided images in your public folder with these filenames:
// 1. angelina.png (Angelina Mango)
// 2. ronaldo.png (Cristiano Ronaldo)
// 3. geolier.png (Geolier)
// 4. anna.png (Anna Pepe)

export const CHARACTERS: Character[] = [
  {
    id: 'angelina',
    name: 'Angelina Mango',
    role: 'Artist / Performer',
    imageUrl: '/angelina.png', 
    description: 'Vocal powerhouse with eclectic style.'
  },
  {
    id: 'ronaldo',
    name: 'Cristiano Ronaldo',
    role: 'Football Legend',
    imageUrl: '/ronaldo.png',
    description: 'Global icon of determination and skill.'
  },
  {
    id: 'geolier',
    name: 'Geolier',
    role: 'Rapper / Artist',
    imageUrl: '/geolier.png',
    description: 'The voice of the new generation.'
  },
  {
    id: 'anna',
    name: 'Anna Pepe',
    role: 'Rapper / Icon',
    imageUrl: '/anna.png',
    description: 'Setting trends and breaking records.'
  }
];

export const COLORS = {
  primary: '#00ffaa',
  secondary: '#00a3ff',
  bg: '#0a0a0a',
  glass: 'rgba(10, 12, 18, 0.6)',
};