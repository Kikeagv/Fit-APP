export interface Exercise {
  id: string;
  name: string;
  sets: number;
  reps: number;
  weight: number;
}

export interface TrainingSession {
  id: string;
  date: string;
  time: string;
  tag: string;
  exercises: Exercise[];
}

export type TagColor = {
  backgroundColor: string;
  textColor: string;
};

export const tagColors: Record<string, TagColor> = {
  'Brazo': { backgroundColor: '#29B568', textColor: '#FFFFFF' },
  'Pierna': { backgroundColor: '#2976B5', textColor: '#FFFFFF' },
  'Pecho': { backgroundColor: '#E3D53C', textColor: '#000000' },
  'Espalda': { backgroundColor: '#FF6B35', textColor: '#FFFFFF' },
  'Hombro': { backgroundColor: '#8A2BE2', textColor: '#FFFFFF' },
  'Cardio': { backgroundColor: '#00BFFF', textColor: '#FFFFFF' },
  'Abdomen': { backgroundColor: '#32CD32', textColor: '#FFFFFF' },
  'default': { backgroundColor: '#6E4CB0', textColor: '#FFFFFF' }
};
