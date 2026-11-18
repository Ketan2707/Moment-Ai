import { callGeminiStructured } from './geminiClient';

export interface RescuePromptResult {
  prompt: string;
  category: 'icebreaker' | 'fun' | 'music' | 'deep';
}

const DEFAULT_PROMPTS: RescuePromptResult[] = [
  { prompt: "What's the coolest thing you've seen here so far?", category: 'icebreaker' },
  { prompt: "Pick one song for the group to listen to.", category: 'music' },
  { prompt: "Everyone show their most-used emoji right now.", category: 'fun' },
  { prompt: "What's one event or concert you'd attend again in a heartbeat?", category: 'deep' },
  { prompt: "If you could instantly master any instrument or skill today, what would it be?", category: 'fun' },
];

export async function getRandomConversationRescue(
  interests: string[]
): Promise<RescuePromptResult> {
  const fallback = DEFAULT_PROMPTS[Math.floor(Math.random() * DEFAULT_PROMPTS.length)];

  const prompt = `
Generate a quick, non-cringe social conversation rescue prompt for a small group of college students at an event who like: ${interests.join(', ')}.
Return JSON:
{
  "prompt": "Pick one song for the group.",
  "category": "music"
}
`;

  return callGeminiStructured<RescuePromptResult>(prompt, fallback);
}
