import { UserIntent, UserProfile } from '@moment/types';
import { calculateChemistry } from '@moment/shared';

export interface SemanticMatchResult {
  chemistryScore: number;
  matchReasons: string[];
  proximityLabel: 'Nearby' | 'In your area' | 'Close by' | 'Around the zone';
}

export function evaluatePairCompatibility(
  myIntent: UserIntent,
  otherProfile: UserProfile,
  otherIntent: UserIntent,
  otherZone: string,
  myZone: string
): SemanticMatchResult {
  const result = calculateChemistry(myIntent, otherProfile, otherIntent, otherZone, myZone);
  return {
    chemistryScore: result.score,
    matchReasons: result.reasons,
    proximityLabel: result.proximityLabel,
  };
}
