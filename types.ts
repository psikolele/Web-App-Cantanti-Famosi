export interface Character {
  id: string;
  name: string;
  imageUrl: string;
  role: string;
  description: string;
}

export type ViewState = 'portal' | 'tunnel' | 'selection';
