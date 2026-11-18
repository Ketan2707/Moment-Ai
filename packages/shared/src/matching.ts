import { UserIntent, UserProfile, RadarUser } from '@moment/types';

export function calculateChemistry(
  myIntent: UserIntent,
  otherProfile: UserProfile,
  otherIntent: UserIntent,
  otherZone: string,
  myZone: string
): {
  score: number;
  reasons: string[];
  proximityLabel: 'Nearby' | 'In your area' | 'Close by' | 'Around the zone';
} {
  let score = 50; // baseline
  const reasons: string[] = [];

  // 1. Intent compatibility
  if (myIntent.primaryIntent === otherIntent.primaryIntent) {
    score += 15;
    reasons.push(`Both want to ${myIntent.primaryIntent}`);
  } else {
    // Cross-compatible intents
    const complementaryPairs: Record<string, string[]> = {
      explore: ['photo', 'food', 'watch', 'meet'],
      photo: ['explore', 'meet', 'art'],
      food: ['explore', 'talk', 'meet'],
      team: ['network', 'play', 'talk'],
      talk: ['meet', 'food', 'explore'],
    };
    if (complementaryPairs[myIntent.primaryIntent]?.includes(otherIntent.primaryIntent)) {
      score += 10;
      reasons.push(`Compatible vibes: ${myIntent.primaryIntent} & ${otherIntent.primaryIntent}`);
    }
  }

  // 2. Time overlap
  const timeDiff = Math.abs(myIntent.timeAvailableMinutes - otherIntent.timeAvailableMinutes);
  if (timeDiff <= 15) {
    score += 12;
    reasons.push(`Both have around ${myIntent.timeAvailableMinutes} minutes`);
  } else if (timeDiff <= 30) {
    score += 8;
    reasons.push('Comfortable time window match');
  }

  // 3. Shared interests
  const commonInterests = myIntent.interests.filter(i =>
    otherProfile.interests.includes(i) || otherIntent.interests.includes(i)
  );
  if (commonInterests.length > 0) {
    score += Math.min(18, commonInterests.length * 6);
    reasons.push(`Shared interests: ${commonInterests.slice(0, 2).join(' & ')}`);
  }

  // 4. Social Energy compatibility
  if (myIntent.socialEnergy === otherIntent.socialEnergy) {
    score += 8;
    reasons.push(`Matched social rhythm: ${formatEnergy(myIntent.socialEnergy)}`);
  } else if (
    (myIntent.socialEnergy === 'small_groups' && otherIntent.socialEnergy === 'comfortable') ||
    (myIntent.socialEnergy === 'comfortable' && otherIntent.socialEnergy === 'very_social')
  ) {
    score += 5;
  }

  // 5. Zone proximity
  let proximityLabel: 'Nearby' | 'In your area' | 'Close by' | 'Around the zone' = 'Around the zone';
  if (myZone === otherZone) {
    score += 10;
    proximityLabel = 'Nearby';
    reasons.push(`Currently in same zone (${myZone})`);
  } else {
    proximityLabel = 'In your area';
    reasons.push(`Close by in adjacent zone`);
  }

  // Cap between 60 and 96
  const finalScore = Math.min(96, Math.max(62, Math.round(score)));

  return {
    score: finalScore,
    reasons: reasons.slice(0, 4),
    proximityLabel,
  };
}

function formatEnergy(energy: string): string {
  switch (energy) {
    case 'very_social':
      return 'High social energy';
    case 'comfortable':
      return 'Comfortable & open';
    case 'small_groups':
      return 'Small groups';
    case 'low_key':
      return 'Low-key chill';
    case 'observing':
      return 'Observing & relaxed';
    default:
      return energy;
  }
}
