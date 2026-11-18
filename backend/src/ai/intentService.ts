import { UserIntent } from '@moment/types';
import { callGeminiStructured } from './geminiClient';

export interface IntentAnalysisResult {
  vibeSummary: string;
  recommendedZones: string[];
  suggestedTags: string[];
}

export async function analyzeUserIntent(intent: UserIntent): Promise<IntentAnalysisResult> {
  const prompt = `
You are MOMENT AI, an event social assistant. Analyze the user's intent:
- Primary Intent: ${intent.primaryIntent}
- Time Available: ${intent.timeAvailableMinutes} minutes
- Social Energy: ${intent.socialEnergy}
- Interests: ${intent.interests.join(', ')}

Return JSON with format:
{
  "vibeSummary": "Short 1-sentence vibe statement (e.g. 'Chill photographic wanderer looking for casual creative banter')",
  "recommendedZones": ["Photography Zone", "Food Court & Market"],
  "suggestedTags": ["#SunsetPortraits", "#CandidWander"]
}
`;

  const fallback: IntentAnalysisResult = {
    vibeSummary: `Curious explorer with ${intent.timeAvailableMinutes} minutes looking for small group experiences.`,
    recommendedZones: ['Photography Zone', 'Food Court & Market', 'Main Stage Amphitheatre'],
    suggestedTags: ['#LiveMoments', '#CampusExplore', '#TechFest2026'],
  };

  return callGeminiStructured<IntentAnalysisResult>(prompt, fallback);
}
