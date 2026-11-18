import {
  Event,
  UserProfile,
  UserIntent,
  RadarUser,
  MomentPlan,
  MomentMemory,
  LiveMoment,
  OrganizerAnalytics,
} from '@moment/types';
import {
  DEMO_EVENT,
  DEMO_USER_KETAN,
  DEMO_RADAR_PEOPLE,
  DEMO_LIVE_MOMENTS,
  calculateChemistry,
} from '@moment/shared';

const API_BASE = '/api';

// Resilience helper: tries fetch, falls back gracefully to in-memory demo data
async function fetchWithFallback<T>(url: string, options?: RequestInit, fallback?: T): Promise<T> {
  try {
    const res = await fetch(url, options);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    return await res.json();
  } catch (err) {
    if (fallback !== undefined) {
      console.warn(`[MOMENT API] Server unreachable at ${url}. Using local fallback.`, err);
      return fallback;
    }
    throw err;
  }
}

export const momentApi = {
  // Event
  async getEvent(id = 'techfest-2026'): Promise<Event> {
    return fetchWithFallback<Event>(`${API_BASE}/events/${id}`, undefined, DEMO_EVENT);
  },

  async checkIn(eventId: string, qrCode?: string, isDemo = true) {
    return fetchWithFallback(
      `${API_BASE}/events/${eventId}/checkin`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ qrCode, isDemo }),
      },
      { success: true, message: 'Checked into TechFest 2026!', event: DEMO_EVENT, user: DEMO_USER_KETAN }
    );
  },

  async submitIntent(intent: Partial<UserIntent>) {
    return fetchWithFallback(
      `${API_BASE}/events/intent`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(intent),
      },
      {
        success: true,
        intent: {
          userId: DEMO_USER_KETAN.id,
          eventId: DEMO_EVENT.id,
          primaryIntent: intent.primaryIntent || 'explore',
          timeAvailableMinutes: intent.timeAvailableMinutes || 45,
          socialEnergy: intent.socialEnergy || 'small_groups',
          interests: intent.interests || ['Photography', 'Music', 'Coding'],
          timestamp: new Date().toISOString(),
        },
      }
    );
  },

  // Radar
  async getRadar(filter = 'People'): Promise<{ users: RadarUser[]; activeZone: string; ghostMode: boolean }> {
    const defaultRadarUsers: RadarUser[] = DEMO_RADAR_PEOPLE.map((p) => {
      const pIntent: UserIntent = {
        userId: p.id,
        eventId: 'techfest-2026',
        primaryIntent: p.id === 'u-rahul' ? 'photo' : p.id === 'u-priya' ? 'food' : 'watch',
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
        p.id === 'u-rahul' ? 'Photography Zone' : 'Food Court & Market',
        'Photography Zone'
      );
      return {
        userId: p.id,
        profile: p,
        intent: pIntent,
        currentZone: p.id === 'u-rahul' ? 'Photography Zone' : 'Food Court & Market',
        proximityLabel: chem.proximityLabel,
        chemistryScore: chem.score,
        matchReasons: chem.reasons,
        waveStatus: 'none',
        isSerendipityMatch: p.id === 'u-ananya',
        serendipityNote: p.id === 'u-ananya' ? 'You usually match with coders. But here is someone into indie music & stage performances with identical free time!' : undefined,
      };
    });

    return fetchWithFallback(
      `${API_BASE}/radar?filter=${encodeURIComponent(filter)}`,
      undefined,
      { users: defaultRadarUsers, activeZone: 'Photography Zone', ghostMode: false }
    );
  },

  async toggleGhostMode(enabled: boolean) {
    return fetchWithFallback(
      `${API_BASE}/radar/ghost-mode`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ enabled }),
      },
      { success: true, ghostMode: enabled }
    );
  },

  // Waves
  async sendWave(receiverId: string) {
    return fetchWithFallback(
      `${API_BASE}/waves`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ receiverId }),
      },
      {
        success: true,
        message: 'Wave sent 👋',
        wave: {
          id: `w-${Date.now()}`,
          senderId: 'u-ketan',
          receiverId,
          eventId: 'techfest-2026',
          status: 'pending',
          createdAt: new Date().toISOString(),
        },
      }
    );
  },

  async respondWave(waveId: string, action: 'accept' | 'decline') {
    return fetchWithFallback(
      `${API_BASE}/waves/${waveId}/respond`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action }),
      },
      { success: true }
    );
  },

  // Moments
  async buildMoment(): Promise<{ groupChemistry: any; moment: MomentPlan }> {
    return fetchWithFallback(`${API_BASE}/moments/build`, { method: 'POST' });
  },

  async replanMoment(momentId: string): Promise<{ success: boolean; moment: MomentPlan }> {
    return fetchWithFallback(`${API_BASE}/moments/${momentId}/replan`, { method: 'POST' });
  },

  async getConversationRescue(momentId: string): Promise<{ rescue: { prompt: string; category: string } }> {
    return fetchWithFallback(`${API_BASE}/moments/${momentId}/rescue`, undefined, {
      rescue: {
        prompt: "What's the coolest project or hobby you've worked on this year?",
        category: 'icebreaker',
      },
    });
  },

  async completeChallenge(momentId: string) {
    return fetchWithFallback(`${API_BASE}/moments/${momentId}/challenge/complete`, { method: 'POST' });
  },

  async completeMoment(momentId: string): Promise<{ success: boolean; memory: MomentMemory }> {
    return fetchWithFallback(`${API_BASE}/moments/${momentId}/complete`, { method: 'POST' });
  },

  // Memories & Squads
  async getMemories(): Promise<{ memories: MomentMemory[] }> {
    return fetchWithFallback(`${API_BASE}/memories`, undefined, { memories: [] });
  },

  async saveSquad(memoryId: string) {
    return fetchWithFallback(`${API_BASE}/memories/${memoryId}/squad`, { method: 'POST' });
  },

  // Live Moments
  async getLiveMoments(): Promise<{ liveMoments: LiveMoment[] }> {
    return fetchWithFallback(`${API_BASE}/live-moments`, undefined, { liveMoments: DEMO_LIVE_MOMENTS });
  },

  async createLiveMoment(data: Partial<LiveMoment>) {
    return fetchWithFallback(`${API_BASE}/live-moments`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
  },

  async joinLiveMoment(id: string) {
    return fetchWithFallback(`${API_BASE}/live-moments/${id}/join`, { method: 'POST' });
  },

  // Organizer
  async getOrganizerAnalytics(eventId = 'techfest-2026'): Promise<{ analytics: OrganizerAnalytics }> {
    return fetchWithFallback(`${API_BASE}/organizer/${eventId}/analytics`, undefined, {
      analytics: {
        eventName: 'TechFest 2026',
        checkedIn: 4821,
        activeNow: 2304,
        connectionsCount: 1184,
        momentsFormed: 387,
        challengesCompleted: 921,
        mostActiveZone: 'Gaming Zone',
        peakTime: '5:40 PM',
        zoneActivity: [
          { zone: 'Gaming Zone', count: 642, crowdLevel: 'Peak (94%)' },
          { zone: 'Food Court', count: 520, crowdLevel: 'High (82%)' },
          { zone: 'Main Stage', count: 480, crowdLevel: 'High (78%)' },
          { zone: 'Photography Zone', count: 340, crowdLevel: 'Moderate (55%)' },
          { zone: 'Hackathon Arena', count: 210, crowdLevel: 'Moderate (48%)' },
          { zone: 'Chill Lawn', count: 112, crowdLevel: 'Low (25%)' },
        ],
      },
    });
  },

  // Demo Reset
  async resetDemo() {
    return fetchWithFallback(`${API_BASE}/demo/reset`, { method: 'POST' });
  },
};
