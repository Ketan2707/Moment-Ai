import { MomentPlan, MomentStop, MomentChallenge, UserProfile } from '@moment/types';
import { callGeminiStructured } from './geminiClient';
import { v4 as uuidv4 } from 'uuid';

export interface PlanGenerationInput {
  members: UserProfile[];
  sharedInterests: string[];
  totalTimeMinutes: number;
}

export async function generateMomentPlan(input: PlanGenerationInput): Promise<MomentPlan> {
  const memberNames = input.members.map((m) => m.name).join(', ');

  const fallbackStops: MomentStop[] = [
    {
      id: 'stop-1',
      order: 1,
      zoneName: 'Photography Zone',
      icon: 'Camera',
      walkTimeMinutes: 3,
      estimatedDurationMinutes: 15,
      title: 'Golden Hour Silhouette Challenge',
      description: 'Meet at the light installation and snap a unique campus silhouette photo.',
      status: 'current',
    },
    {
      id: 'stop-2',
      order: 2,
      zoneName: 'Food Court & Market',
      icon: 'Utensils',
      walkTimeMinutes: 4,
      estimatedDurationMinutes: 15,
      title: 'Street Treat Crawl',
      description: 'Head to the courtyard for cold brew & fusion corn dogs before the rush.',
      status: 'pending',
    },
    {
      id: 'stop-3',
      order: 3,
      zoneName: 'Main Stage Amphitheatre',
      icon: 'Music',
      walkTimeMinutes: 3,
      estimatedDurationMinutes: 13,
      title: 'Acoustic Sunset Vibe',
      description: 'Settle on the amphitheatre grass for the live student set.',
      status: 'pending',
    },
  ];

  const fallbackChallenge: MomentChallenge = {
    id: 'ch-demo-1',
    title: 'College Life Without Faces',
    description: 'Take one creative group photo that represents college fest energy without showing any faces.',
    category: 'photo',
    completed: false,
    rewardXP: 250,
  };

  const fallbackPlan: MomentPlan = {
    id: uuidv4(),
    title: 'Photography + Food Hunt',
    durationMinutes: input.totalTimeMinutes || 43,
    remainingSeconds: (input.totalTimeMinutes || 43) * 60,
    members: input.members,
    sharedInterests: input.sharedInterests,
    stops: fallbackStops,
    challenge: fallbackChallenge,
    conversationPrompts: [
      "What's the coolest project or hobby you worked on this year?",
      'Pick one song to be the soundtrack of today.',
      'Show your top 3 most used emojis.',
    ],
    nextAction: 'Head to Photography Zone (3 min walk)',
    activeStopIndex: 0,
    status: 'active',
    createdAt: new Date().toISOString(),
  };

  const prompt = `
Generate a structured Moment Experience plan for attendees at TechFest 2026:
Members: ${memberNames}
Interests: ${input.sharedInterests.join(', ')}
Available time: ${input.totalTimeMinutes} minutes

Return strict JSON:
{
  "title": "Photography + Food Hunt",
  "durationMinutes": 43,
  "stops": [
    {
      "id": "stop-1",
      "order": 1,
      "zoneName": "Photography Zone",
      "icon": "Camera",
      "walkTimeMinutes": 3,
      "estimatedDurationMinutes": 15,
      "title": "Golden Hour Silhouette",
      "description": "Meet by the neon frames"
    },
    {
      "id": "stop-2",
      "order": 2,
      "zoneName": "Food Court & Market",
      "icon": "Utensils",
      "walkTimeMinutes": 4,
      "estimatedDurationMinutes": 15,
      "title": "Bite & Chill",
      "description": "Grab snacks together"
    },
    {
      "id": "stop-3",
      "order": 3,
      "zoneName": "Main Stage Amphitheatre",
      "icon": "Music",
      "walkTimeMinutes": 3,
      "estimatedDurationMinutes": 13,
      "title": "Sunset Acoustic Jam",
      "description": "Watch live performance"
    }
  ],
  "challenge": {
    "title": "College Life Without Faces",
    "description": "Take one creative group photo representing college life without showing faces.",
    "category": "photo"
  },
  "conversationPrompts": [
    "What's the coolest thing you've seen here today?",
    "Pick one song that matches today's vibe."
  ],
  "nextAction": "Head to Photography Zone (3 min walk)"
}
`;

  const aiResult = await callGeminiStructured<Partial<MomentPlan>>(prompt, fallbackPlan);

  return {
    ...fallbackPlan,
    ...aiResult,
    id: fallbackPlan.id,
    members: input.members,
    status: 'active',
    remainingSeconds: ((aiResult.durationMinutes || 43) * 60),
    activeStopIndex: 0,
  };
}

export async function replanActiveMoment(
  currentPlan: MomentPlan,
  reason: string
): Promise<MomentPlan> {
  const updatedPlan = { ...currentPlan };
  // Modify stops to reflect adaptive replanning (e.g. food court -> acoustic performance)
  updatedPlan.stops = updatedPlan.stops.map((stop, idx) => {
    if (idx === 1) {
      return {
        ...stop,
        title: 'Food Court Express',
        description: 'Bypassed crowded queue! Heading straight to quick-grab desserts & teas.',
      };
    }
    return stop;
  });

  updatedPlan.nextAction = 'Route updated: 🍕 Food Court Express → 🎤 Sunset Acoustic Set (27 min remaining)';
  return updatedPlan;
}
