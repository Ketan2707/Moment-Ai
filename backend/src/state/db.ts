import {
  Event,
  UserProfile,
  UserIntent,
  RadarUser,
  Wave,
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
import { v4 as uuidv4 } from 'uuid';

export class DatabaseStore {
  public event: Event = JSON.parse(JSON.stringify(DEMO_EVENT));
  public currentUser: UserProfile = JSON.parse(JSON.stringify(DEMO_USER_KETAN));
  public radarPeople: UserProfile[] = JSON.parse(JSON.stringify(DEMO_RADAR_PEOPLE));
  public liveMoments: LiveMoment[] = JSON.parse(JSON.stringify(DEMO_LIVE_MOMENTS));

  public currentUserIntent: UserIntent = {
    userId: DEMO_USER_KETAN.id,
    eventId: DEMO_EVENT.id,
    primaryIntent: 'explore',
    timeAvailableMinutes: 45,
    socialEnergy: 'small_groups',
    interests: ['Photography', 'Music', 'Coding'],
    timestamp: new Date().toISOString(),
  };

  public simulatedIntents: Record<string, UserIntent> = {
    'u-rahul': {
      userId: 'u-rahul',
      eventId: 'techfest-2026',
      primaryIntent: 'photo',
      timeAvailableMinutes: 45,
      socialEnergy: 'small_groups',
      interests: ['Photography', 'Music'],
      timestamp: new Date().toISOString(),
    },
    'u-priya': {
      userId: 'u-priya',
      eventId: 'techfest-2026',
      primaryIntent: 'explore',
      timeAvailableMinutes: 30,
      socialEnergy: 'comfortable',
      interests: ['Food', 'Gaming'],
      timestamp: new Date().toISOString(),
    },
    'u-ananya': {
      userId: 'u-ananya',
      eventId: 'techfest-2026',
      primaryIntent: 'watch',
      timeAvailableMinutes: 45,
      socialEnergy: 'small_groups',
      interests: ['Music', 'Photography'],
      timestamp: new Date().toISOString(),
    },
    'u-arjun': {
      userId: 'u-arjun',
      eventId: 'techfest-2026',
      primaryIntent: 'team',
      timeAvailableMinutes: 60,
      socialEnergy: 'very_social',
      interests: ['Coding', 'Networking'],
      timestamp: new Date().toISOString(),
    },
  };

  public simulatedZones: Record<string, string> = {
    'u-ketan': 'Photography Zone',
    'u-rahul': 'Photography Zone',
    'u-priya': 'Food Court & Market',
    'u-ananya': 'Main Stage Amphitheatre',
    'u-arjun': 'Hackathon Arena',
  };

  public waves: Wave[] = [];
  public activeMoment: MomentPlan | null = null;
  public memories: MomentMemory[] = [];
  public mutualConnectionCreated = false;

  public resetToDemo(): void {
    this.event = JSON.parse(JSON.stringify(DEMO_EVENT));
    this.currentUser = JSON.parse(JSON.stringify(DEMO_USER_KETAN));
    this.radarPeople = JSON.parse(JSON.stringify(DEMO_RADAR_PEOPLE));
    this.liveMoments = JSON.parse(JSON.stringify(DEMO_LIVE_MOMENTS));
    this.waves = [];
    this.activeMoment = null;
    this.memories = [];
    this.mutualConnectionCreated = false;
  }

  public getRadarUsers(filter?: string): RadarUser[] {
    const list: RadarUser[] = [];

    for (const person of this.radarPeople) {
      const intent = this.simulatedIntents[person.id] || {
        userId: person.id,
        eventId: this.event.id,
        primaryIntent: 'explore',
        timeAvailableMinutes: 45,
        socialEnergy: 'comfortable',
        interests: person.interests,
        timestamp: new Date().toISOString(),
      };

      const zone = this.simulatedZones[person.id] || 'Food Court & Market';
      const myZone = this.simulatedZones[this.currentUser.id] || 'Photography Zone';
      const chemistry = calculateChemistry(this.currentUserIntent, person, intent, zone, myZone);

      // Check wave status
      const outgoingWave = this.waves.find(
        (w) => w.senderId === this.currentUser.id && w.receiverId === person.id
      );
      const incomingWave = this.waves.find(
        (w) => w.senderId === person.id && w.receiverId === this.currentUser.id
      );

      let waveStatus: 'none' | 'sent' | 'received' | 'mutual' = 'none';
      if (outgoingWave?.status === 'accepted' || incomingWave?.status === 'accepted') {
        waveStatus = 'mutual';
      } else if (outgoingWave) {
        waveStatus = 'sent';
      } else if (incomingWave) {
        waveStatus = 'received';
      }

      const radarUser: RadarUser = {
        userId: person.id,
        profile: person,
        intent,
        currentZone: zone,
        proximityLabel: chemistry.proximityLabel,
        chemistryScore: chemistry.score,
        matchReasons: chemistry.reasons,
        waveStatus,
      };

      // Serendipity for Ananya if requested
      if (person.id === 'u-ananya') {
        radarUser.isSerendipityMatch = true;
        radarUser.serendipityNote =
          'You usually match with coders. But here is someone into indie music & stage performances with identical free time!';
      }

      list.push(radarUser);
    }

    // Apply filters
    if (filter === 'Best Match') {
      return [...list].sort((a, b) => b.chemistryScore - a.chemistryScore);
    }
    if (filter === 'Nearby') {
      return list.filter((u) => u.proximityLabel === 'Nearby');
    }
    if (filter === 'Surprise Me') {
      return list.filter((u) => u.isSerendipityMatch);
    }

    return list;
  }

  public getOrganizerAnalytics(): OrganizerAnalytics {
    return {
      eventName: this.event.name,
      checkedIn: this.event.totalCheckedIn,
      activeNow: this.event.activeAttendees,
      connectionsCount: 1184 + (this.waves.filter((w) => w.status === 'accepted').length * 2),
      momentsFormed: 387 + (this.activeMoment ? 1 : 0) + this.memories.length,
      challengesCompleted: 921 + (this.memories.filter((m) => m.challengeCompleted).length),
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
    };
  }
}

export const db = new DatabaseStore();
