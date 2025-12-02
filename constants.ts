import { Character } from './types';

// NOTE: In a real scenario, you would import local images. 
// For this demo, we use high-quality placeholders that match the requested vibes.
export const CHARACTERS: Character[] = [
  {
    id: 'angelina',
    name: 'Angelina Mango',
    role: 'Artist / Performer',
    // Placeholder: Female Performer vibe
    imageUrl: 'https://images.unsplash.com/photo-1516280440614-6697288d5d38?q=80&w=1000&auto=format&fit=crop', 
    description: 'Vocal powerhouse with eclectic style.'
  },
  {
    id: 'ronaldo',
    name: 'Cristiano Ronaldo',
    role: 'Football Legend',
    // Placeholder: Athlete/Sport vibe
    imageUrl: 'https://images.unsplash.com/photo-1522778119026-d647f0565c6a?q=80&w=1000&auto=format&fit=crop',
    description: 'Global icon of determination and skill.'
  },
  {
    id: 'geolier',
    name: 'Geolier',
    role: 'Rapper / Artist',
    // Placeholder: Urban/Streetwear vibe
    imageUrl: 'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?q=80&w=1000&auto=format&fit=crop',
    description: ' The voice of the new generation.'
  },
  {
    id: 'anna',
    name: 'Anna Pepe',
    role: 'Rapper / Icon',
    // Placeholder: Stylish Female vibe
    imageUrl: 'https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?q=80&w=1000&auto=format&fit=crop',
    description: 'Setting trends and breaking records.'
  }
];

export const COLORS = {
  primary: '#00ffaa',
  secondary: '#00a3ff',
  bg: '#0a0a0a',
  glass: 'rgba(10, 12, 18, 0.6)',
};
