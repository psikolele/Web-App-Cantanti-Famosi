import { Character } from './types';

// NOTE: Please ensure you save the provided images in your public folder with these filenames:
// 1. angelina.jpg
// 2. ronaldo.jpg
// 3. geolier.jpg
// 4. anna.jpg
// If local files are missing, the UI will handle it gracefully.

export const CHARACTERS: Character[] = [
  {
    id: 'angelina',
    name: 'Angelina Mango',
    role: 'Artist / Performer',
    // Updated to .jpg per user request
    imageUrl: '/angelina.jpg', 
    description: 'Vocal powerhouse with eclectic style.'
  },
  {
    id: 'ronaldo',
    name: 'Cristiano Ronaldo',
    role: 'Football Legend',
    imageUrl: '/ronaldo.jpg',
    description: 'Global icon of determination and skill.'
  },
  {
    id: 'geolier',
    name: 'Geolier',
    role: 'Rapper / Artist',
    imageUrl: '/geolier.jpg',
    description: 'The voice of the new generation.'
  },
  {
    id: 'anna',
    name: 'Anna Pepe',
    role: 'Rapper / Icon',
    imageUrl: '/anna.jpg',
    description: 'Setting trends and breaking records.'
  }
];

export const COLORS = {
  primary: '#00ffaa',
  secondary: '#00a3ff',
  bg: '#0a0a0a',
  glass: 'rgba(10, 12, 18, 0.6)',
};