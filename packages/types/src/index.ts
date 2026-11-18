export type UserRole = 'attendee' | 'organizer' | 'admin';

export interface UserProfile {
  id: string;
  name: string;
  username: string;
  avatar: string;
  bio?: string;
  momentLevel: number;
  xp: number;
  badges: string[];
  interests: string[];
  stats: {
    momentsCount: number;
    challengesCount: number;
    connectionsCount: number;
  };
  ghostMode?: boolean;
}

export interface EventZone {
  id: string;
  eventId: string;
  name: string;
  description: string;
  crowdLevel: 'low' | 'moderate' | 'high' | 'peak';
  activeActivities: string[];
  icon: string;
  approxDistance: string;
}

export interface Activity {
  id: string;
  eventId: string;
  zoneId: string;
  title: string;
  description: string;
  timeSlot: string;
  icon: string;
  capacity: number;
  currentCount: number;
  isSponsored?: boolean;
  sponsorName?: string;
  sponsorReward?: string;
}

export interface Event {
  id: string;
  name: string;
  venue: string;
  organization: string;
  description: string;
  date: string;
  totalCheckedIn: number;
  activeAttendees: number;
  zones: EventZone[];
  activities: Activity[];
}

export type PrimaryIntent =
  | 'meet'
  | 'explore'
  | 'photo'
  | 'food'
  | 'play'
  | 'watch'
  | 'team'
  | 'talk'
  | 'network';

export type SocialEnergy =
  | 'very_social'
  | 'comfortable'
  | 'small_groups'
  | 'low_key'
  | 'observing';

export interface UserIntent {
  userId: string;
  eventId: string;
  primaryIntent: PrimaryIntent;
  timeAvailableMinutes: number;
  socialEnergy: SocialEnergy;
  interests: string[];
  timestamp: string;
}

export type ProximityLabel = 'Nearby' | 'In your area' | 'Close by' | 'Around the zone';

export interface RadarUser {
  userId: string;
  profile: UserProfile;
  intent: UserIntent;
  currentZone: string;
  proximityLabel: ProximityLabel;
  chemistryScore: number;
  matchReasons: string[];
  waveStatus: 'none' | 'sent' | 'received' | 'mutual';
  isSerendipityMatch?: boolean;
  serendipityNote?: string;
}

export interface Wave {
  id: string;
  senderId: string;
  receiverId: string;
  eventId: string;
  status: 'pending' | 'accepted' | 'declined';
  createdAt: string;
}

export interface MomentStop {
  id: string;
  order: number;
  zoneName: string;
  icon: string;
  walkTimeMinutes: number;
  estimatedDurationMinutes: number;
  title: string;
  description: string;
  status: 'pending' | 'current' | 'completed';
}

export interface MomentChallenge {
  id: string;
  title: string;
  description: string;
  category: 'photo' | 'food' | 'hackathon' | 'gaming' | 'music' | 'social';
  completed: boolean;
  completedAt?: string;
  rewardXP: number;
}

export interface MomentPlan {
  id: string;
  title: string;
  durationMinutes: number;
  remainingSeconds: number;
  members: UserProfile[];
  sharedInterests: string[];
  stops: MomentStop[];
  challenge: MomentChallenge;
  conversationPrompts: string[];
  nextAction: string;
  activeStopIndex: number;
  status: 'active' | 'completed' | 'abandoned';
  createdAt: string;
}

export interface MomentMemory {
  id: string;
  momentId: string;
  eventName: string;
  durationMinutes: number;
  participants: UserProfile[];
  stops: string[];
  challengeTitle: string;
  challengeCompleted: boolean;
  aiRecap: string;
  photos: string[];
  createdAt: string;
  squadCreated?: boolean;
}

export interface LiveMoment {
  id: string;
  creatorId: string;
  creatorName: string;
  creatorAvatar: string;
  title: string;
  category: string;
  approximateZone: string;
  targetCount: number;
  currentCount: number;
  expiresInMinutes: number;
  participants: string[];
}

export interface OrganizerAnalytics {
  eventName: string;
  checkedIn: number;
  activeNow: number;
  connectionsCount: number;
  momentsFormed: number;
  challengesCompleted: number;
  mostActiveZone: string;
  peakTime: string;
  zoneActivity: {
    zone: string;
    count: number;
    crowdLevel: string;
  }[];
}
