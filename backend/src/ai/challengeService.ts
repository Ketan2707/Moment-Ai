import { MomentChallenge } from '@moment/types';
import { callGeminiStructured } from './geminiClient';
import { v4 as uuidv4 } from 'uuid';

export async function generateCategoryChallenge(
  category: 'photo' | 'food' | 'hackathon' | 'gaming' | 'music'
): Promise<MomentChallenge> {
  const fallbacks: Record<string, { title: string; description: string }> = {
    photo: {
      title: 'College Life Silhouette',
      description: 'Take one creative group photo that represents college life without showing faces.',
    },
    food: {
      title: 'Flavors of Fest',
      description: 'Find the most unusual food item at the food court and rank it as a group.',
    },
    hackathon: {
      title: 'Cross-Disciplinary Spark',
      description: 'Find one person from a different skill background and sketch an app concept in 3 minutes.',
    },
    gaming: {
      title: 'Arcade Teamup',
      description: 'Challenge another group or post a joint high score on the retro arcade booth.',
    },
    music: {
      title: 'Tune Match',
      description: 'Find a song that at least two of you can sing the chorus to without checking lyrics.',
    },
  };

  const selected = fallbacks[category] || fallbacks.photo;

  return {
    id: uuidv4(),
    title: selected.title,
    description: selected.description,
    category,
    completed: false,
    rewardXP: 250,
  };
}
