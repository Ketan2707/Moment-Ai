import { UserProfile, UserIntent } from '@moment/types';
import { callGeminiStructured } from './geminiClient';

export interface GroupFormationResult {
  groupChemistryScore: number;
  sharedInterests: string[];
  suggestedDurationMinutes: number;
  chemistryNarrative: string;
}

export async function formGroupChemistry(
  members: UserProfile[],
  intents: UserIntent[]
): Promise<GroupFormationResult> {
  const memberNames = members.map((m) => m.name).join(', ');
  const allInterests = members.flatMap((m) => m.interests);
  const interestCounts: Record<string, number> = {};
  allInterests.forEach((i) => {
    interestCounts[i] = (interestCounts[i] || 0) + 1;
  });

  const common = Object.entries(interestCounts)
    .filter(([_, count]) => count >= 2)
    .map(([interest]) => interest);

  const fallback: GroupFormationResult = {
    groupChemistryScore: 91,
    sharedInterests: common.length ? common.slice(0, 3) : ['Photography', 'Food', 'Music'],
    suggestedDurationMinutes: 43,
    chemistryNarrative:
      'High balance: creative photographic interest, relaxed social pacing, and mutual curiosity for campus food trucks.',
  };

  const prompt = `
Form a micro-group chemistry summary for physical event attendees:
Members: ${memberNames}
Member Interests: ${JSON.stringify(members.map((m) => ({ name: m.name, interests: m.interests })))}

Return JSON with format:
{
  "groupChemistryScore": 91,
  "sharedInterests": ["Photography", "Food", "Music"],
  "suggestedDurationMinutes": 43,
  "chemistryNarrative": "One sentence explaining why this group dynamic works"
}
`;

  return callGeminiStructured<GroupFormationResult>(prompt, fallback);
}
