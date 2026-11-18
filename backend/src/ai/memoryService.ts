import { MomentMemory, MomentPlan } from '@moment/types';
import { callGeminiStructured } from './geminiClient';
import { v4 as uuidv4 } from 'uuid';

export async function generateMomentMemory(plan: MomentPlan): Promise<MomentMemory> {
  const memberNames = plan.members.map((m) => m.name).join(', ');
  const stopsList = plan.stops.map((s) => s.zoneName);

  const fallbackRecap =
    'You started with a photography challenge, discovered the food zone together, and ended the evening catching the acoustic sunset performance.';

  const prompt = `
Create a warm, nostalgic, concise 2-sentence recap for this completed moment experience at TechFest 2026:
Participants: ${memberNames}
Stops visited: ${stopsList.join(' -> ')}
Challenge completed: ${plan.challenge.title}

Return JSON format:
{
  "aiRecap": "You started with a photography challenge, discovered the food zone, and ended the evening watching the acoustic performance together."
}
`;

  const result = await callGeminiStructured<{ aiRecap: string }>(prompt, {
    aiRecap: fallbackRecap,
  });

  return {
    id: uuidv4(),
    momentId: plan.id,
    eventName: 'TechFest 2026',
    durationMinutes: plan.durationMinutes,
    participants: plan.members,
    stops: stopsList,
    challengeTitle: plan.challenge.title,
    challengeCompleted: true,
    aiRecap: result.aiRecap || fallbackRecap,
    photos: [
      'https://images.unsplash.com/photo-1523580494863-6f3031224c94?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=800&auto=format&fit=crop&q=80',
    ],
    createdAt: new Date().toISOString(),
  };
}
