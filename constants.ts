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
    imageUrl: 'https://ui-avatars.com/api/?name=Angelina+Mango&size=400&background=00ffaa&color=0a0a0a&bold=true&font-size=0.4',
    description: 'Vocal powerhouse with eclectic style.'
  },
  {
    id: 'ronaldo',
    name: 'Cristiano Ronaldo',
    role: 'Football Legend',
    imageUrl: 'https://ui-avatars.com/api/?name=Cristiano+Ronaldo&size=400&background=00a3ff&color=0a0a0a&bold=true&font-size=0.4',
    description: 'Global icon of determination and skill.'
  },
  {
    id: 'geolier',
    name: 'Geolier',
    role: 'Rapper / Artist',
    imageUrl: 'https://ui-avatars.com/api/?name=Geolier&size=400&background=00ffaa&color=0a0a0a&bold=true&font-size=0.4',
    description: 'The voice of the new generation.'
  },
  {
    id: 'anna',
    name: 'Anna Pepe',
    role: 'Rapper / Icon',
    imageUrl: 'https://ui-avatars.com/api/?name=Anna+Pepe&size=400&background=00a3ff&color=0a0a0a&bold=true&font-size=0.4',
    description: 'Setting trends and breaking records.'
  }
];

export const COLORS = {
  primary: '#00ffaa',
  secondary: '#00a3ff',
  bg: '#0a0a0a',
  glass: 'rgba(10, 12, 18, 0.6)',
};