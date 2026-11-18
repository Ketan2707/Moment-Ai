import {
  Event,
  UserProfile,
  UserIntent,
  RadarUser,
  MomentPlan,
  MomentMemory,
  LiveMoment,
} from '@moment/types';
import {
  DEMO_EVENT,
  DEMO_USER_KETAN,
  DEMO_RADAR_PEOPLE,
  DEMO_LIVE_MOMENTS,
  calculateChemistry,
} from '@moment/shared';

// For local Android development: 10.0.2.2 points to host localhost, or customizable via env
const API_BASE = 'http://10.0.2.2:4000/api';

async function fetchMobileWithFallback<T>(url: string, options?: RequestInit, fallback?: T): Promise<T> {
  try {
    const res = await fetch(url, options);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    return await res.json();
  } catch {
    if (fallback !== undefined) {
      return fallback;
    }
    throw new Error('Network error');
  }
}

export const mobileApi = {
  getEvent: async (): Promise<Event> => {
    return fetchMobileWithFallback(`${API_BASE}/events/techfest-2026`, undefined, DEMO_EVENT);
  },

  checkIn: async () => {
    return fetchMobileWithFallback(
      `${API_BASE}/events/techfest-2026/checkin`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ isDemo: true }),
      },
      { success: true, message: 'Checked into TechFest 2026!' }
    );
  },

  getRadar: async (filter = 'People'): Promise<RadarUser[]> => {
    const users: RadarUser[] = DEMO_RADAR_PEOPLE.map((p) => {
      const pIntent: UserIntent = {
        userId: p.id,
        eventId: 'techfest-2026',
        primaryIntent: p.id === 'u-rahul' ? 'photo' : 'food',
        timeAvailableMinutes: 45,
        socialEnergy: 'small_groups',
        interests: p.interests,
        timestamp: new Date().toISOString(),
      };
      const chem = calculateChemistry(
        {
          userId: 'u-ketan',
          eventId: 'techfest-2026',
          primaryIntent: 'explore',
          timeAvailableMinutes: 45,
          socialEnergy: 'small_groups',
          interests: ['Photography', 'Music', 'Coding'],
          timestamp: new Date().toISOString(),
        },
        p,
        pIntent,
        'Photography Zone',
        'Photography Zone'
      );
      return {
        userId: p.id,
        profile: p,
        intent: pIntent,
        currentZone: p.id === 'u-rahul' ? 'Photography Zone' : 'Food Court',
        proximityLabel: chem.proximityLabel,
        chemistryScore: chem.score,
        matchReasons: chem.reasons,
        waveStatus: 'none',
        isSerendipityMatch: p.id === 'u-ananya',
        serendipityNote: p.id === 'u-ananya' ? 'You usually match with coders. Try indie acoustic music!' : undefined,
      };
    });
    return users;
  },

  sendWave: async (receiverId: string) => {
    return fetchMobileWithFallback(`${API_BASE}/waves`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ receiverId }),
    }, { success: true, message: 'Wave sent 👋' });
  },

  buildMoment: async (): Promise<MomentPlan> => {
    const members = [DEMO_USER_KETAN, ...DEMO_RADAR_PEOPLE.slice(0, 3)];
    return {
      id: `m-mobile-${Date.now()}`,
      title: 'Photography + Food Hunt',
      durationMinutes: 43,
      remainingSeconds: 43 * 60,
      members,
      sharedInterests: ['Photography', 'Food', 'Music'],
      stops: [
        {
          id: 'ms-1',
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
          id: 'ms-2',
          order: 2,
          zoneName: 'Food Court & Market',
          icon: 'Utensils',
          walkTimeMinutes: 4,
          estimatedDurationMinutes: 15,
          title: 'Street Treat Crawl',
          description: 'Head to the courtyard for cold brew & fusion corn dogs.',
          status: 'pending',
        },
        {
          id: 'ms-3',
          order: 3,
          zoneName: 'Main Stage Amphitheatre',
          icon: 'Music',
          walkTimeMinutes: 3,
          estimatedDurationMinutes: 13,
          title: 'Acoustic Sunset Vibe',
          description: 'Settle on the amphitheatre grass for the live student set.',
          status: 'pending',
        },
      ],
      challenge: {
        id: 'mch-1',
        title: 'College Life Without Faces',
        description: 'Take one creative group photo representing college life without showing faces.',
        category: 'photo',
        completed: false,
        rewardXP: 250,
      },
      conversationPrompts: [
        "What's the coolest project or hobby you worked on this year?",
        'Pick one song to be the soundtrack of today.',
      ],
      nextAction: 'Head to Photography Zone (3 min walk)',
      activeStopIndex: 0,
      status: 'active',
      createdAt: new Date().toISOString(),
    };
  },
};
