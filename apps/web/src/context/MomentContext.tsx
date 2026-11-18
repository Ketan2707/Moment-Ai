import React, { createContext, useContext, useState, useEffect } from 'react';
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
} from '@moment/shared';
import { momentApi } from '../services/api';

interface MomentContextType {
  currentUser: UserProfile;
  event: Event;
  isCheckedIn: boolean;
  intent: UserIntent;
  radarUsers: RadarUser[];
  activeFilter: string;
  ghostMode: boolean;
  selectedPerson: RadarUser | null;
  waveStatusMap: Record<string, 'none' | 'sent' | 'mutual'>;
  mutualMatchedUser: RadarUser | null;
  activeMoment: MomentPlan | null;
  memories: MomentMemory[];
  liveMoments: LiveMoment[];
  isLoading: boolean;
  // Actions
  checkIn: (isDemo?: boolean) => Promise<void>;
  updateIntent: (newIntent: Partial<UserIntent>) => Promise<void>;
  setActiveFilter: (filter: string) => void;
  toggleGhostMode: () => Promise<void>;
  selectPerson: (person: RadarUser | null) => void;
  sendWave: (receiverId: string) => Promise<void>;
  dismissMutualMatch: () => void;
  buildMomentExperience: () => Promise<void>;
  replanMoment: () => Promise<void>;
  getConversationRescue: () => Promise<string>;
  completeChallenge: () => Promise<void>;
  concludeMoment: () => Promise<MomentMemory | null>;
  saveSquad: (memoryId: string) => Promise<void>;
  createLiveMoment: (title: string, category: string, zone: string) => Promise<void>;
  joinLiveMoment: (id: string) => Promise<void>;
  resetDemoState: () => Promise<void>;
}

const defaultIntent: UserIntent = {
  userId: DEMO_USER_KETAN.id,
  eventId: DEMO_EVENT.id,
  primaryIntent: 'explore',
  timeAvailableMinutes: 45,
  socialEnergy: 'small_groups',
  interests: ['Photography', 'Music', 'Coding'],
  timestamp: new Date().toISOString(),
};

const MomentContext = createContext<MomentContextType | undefined>(undefined);

export const MomentProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<UserProfile>(DEMO_USER_KETAN);
  const [event, setEvent] = useState<Event>(DEMO_EVENT);
  const [isCheckedIn, setIsCheckedIn] = useState<boolean>(true);
  const [intent, setIntent] = useState<UserIntent>(defaultIntent);
  const [radarUsers, setRadarUsers] = useState<RadarUser[]>([]);
  const [activeFilter, setActiveFilterState] = useState<string>('People');
  const [ghostMode, setGhostMode] = useState<boolean>(false);
  const [selectedPerson, setSelectedPerson] = useState<RadarUser | null>(null);
  const [waveStatusMap, setWaveStatusMap] = useState<Record<string, 'none' | 'sent' | 'mutual'>>({});
  const [mutualMatchedUser, setMutualMatchedUser] = useState<RadarUser | null>(null);
  const [activeMoment, setActiveMoment] = useState<MomentPlan | null>(null);
  const [memories, setMemories] = useState<MomentMemory[]>([]);
  const [liveMoments, setLiveMoments] = useState<LiveMoment[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  // Load initial radar users
  const refreshRadar = async (filter = activeFilter) => {
    try {
      const data = await momentApi.getRadar(filter);
      setRadarUsers(data.users || []);
    } catch {
      // API fallback handles it
    }
  };

  useEffect(() => {
    refreshRadar(activeFilter);
    momentApi.getLiveMoments().then((res) => setLiveMoments(res.liveMoments));
    momentApi.getMemories().then((res) => setMemories(res.memories));
  }, [activeFilter]);

  const checkIn = async (isDemo = true) => {
    setIsLoading(true);
    try {
      await momentApi.checkIn(event.id, undefined, isDemo);
      setIsCheckedIn(true);
    } finally {
      setIsLoading(false);
    }
  };

  const updateIntent = async (newIntent: Partial<UserIntent>) => {
    const merged = { ...intent, ...newIntent };
    setIntent(merged);
    await momentApi.submitIntent(merged);
    await refreshRadar();
  };

  const setActiveFilter = (filter: string) => {
    setActiveFilterState(filter);
    refreshRadar(filter);
  };

  const toggleGhostMode = async () => {
    const next = !ghostMode;
    setGhostMode(next);
    await momentApi.toggleGhostMode(next);
  };

  const selectPerson = (person: RadarUser | null) => {
    setSelectedPerson(person);
  };

  const sendWave = async (receiverId: string) => {
    setWaveStatusMap((prev) => ({ ...prev, [receiverId]: 'sent' }));
    await momentApi.sendWave(receiverId);

    // In demo flow: the other user waves back after 1.2s
    setTimeout(() => {
      setWaveStatusMap((prev) => ({ ...prev, [receiverId]: 'mutual' }));
      const matched = radarUsers.find((u) => u.userId === receiverId);
      if (matched) {
        setMutualMatchedUser(matched);
      }
    }, 1400);
  };

  const dismissMutualMatch = () => {
    setMutualMatchedUser(null);
  };

  const buildMomentExperience = async () => {
    setIsLoading(true);
    try {
      setMutualMatchedUser(null);
      setSelectedPerson(null);
      const res = await momentApi.buildMoment();
      setActiveMoment(res.moment);
    } catch (err) {
      // fallback
      const fallbackMembers = [
        currentUser,
        ...DEMO_RADAR_PEOPLE.slice(0, 3),
      ];
      setActiveMoment({
        id: `m-${Date.now()}`,
        title: 'Photography + Food Hunt',
        durationMinutes: 43,
        remainingSeconds: 43 * 60,
        members: fallbackMembers,
        sharedInterests: ['Photography', 'Food', 'Music'],
        stops: [
          {
            id: 's-1',
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
            id: 's-2',
            order: 2,
            zoneName: 'Food Court & Market',
            icon: 'Utensils',
            walkTimeMinutes: 4,
            estimatedDurationMinutes: 15,
            title: 'Street Treat Crawl',
            description: 'Head to the courtyard for cold brew & fusion corn dogs before the rush.',
            status: 'pending',
          },
          {
            id: 's-3',
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
          id: 'ch-1',
          title: 'College Life Without Faces',
          description: 'Take one creative group photo that represents college fest energy without showing any faces.',
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
      });
    } finally {
      setIsLoading(false);
    }
  };

  const replanMoment = async () => {
    if (!activeMoment) return;
    try {
      const res = await momentApi.replanMoment(activeMoment.id);
      if (res?.moment) {
        setActiveMoment(res.moment);
      }
    } catch {
      setActiveMoment((prev) =>
        prev
          ? {
              ...prev,
              nextAction: 'Plan changed: Food Court Express → Acoustic Performance (27 min remaining)',
            }
          : null
      );
    }
  };

  const getConversationRescue = async (): Promise<string> => {
    if (!activeMoment) return "What's the coolest thing you've seen here today?";
    const res = await momentApi.getConversationRescue(activeMoment.id);
    return res.rescue.prompt;
  };

  const completeChallenge = async () => {
    if (!activeMoment) return;
    setActiveMoment((prev) =>
      prev
        ? {
            ...prev,
            challenge: { ...prev.challenge, completed: true, completedAt: new Date().toISOString() },
          }
        : null
    );
    setCurrentUser((prev) => ({
      ...prev,
      xp: prev.xp + 250,
      stats: { ...prev.stats, challengesCount: prev.stats.challengesCount + 1 },
    }));
    await momentApi.completeChallenge(activeMoment.id);
  };

  const concludeMoment = async (): Promise<MomentMemory | null> => {
    if (!activeMoment) return null;
    const res = await momentApi.completeMoment(activeMoment.id);
    const newMemory: MomentMemory = res.memory || {
      id: `mem-${Date.now()}`,
      momentId: activeMoment.id,
      eventName: 'TechFest 2026',
      durationMinutes: activeMoment.durationMinutes,
      participants: activeMoment.members,
      stops: activeMoment.stops.map((s) => s.zoneName),
      challengeTitle: activeMoment.challenge.title,
      challengeCompleted: true,
      aiRecap:
        'You started with a photography challenge, discovered the food zone together, and ended the evening catching the acoustic sunset performance.',
      photos: [
        'https://images.unsplash.com/photo-1523580494863-6f3031224c94?w=800&auto=format&fit=crop&q=80',
        'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=800&auto=format&fit=crop&q=80',
      ],
      createdAt: new Date().toISOString(),
    };

    setMemories((prev) => [newMemory, ...prev]);
    setActiveMoment(null);
    setCurrentUser((prev) => ({
      ...prev,
      xp: prev.xp + 300,
      stats: { ...prev.stats, momentsCount: prev.stats.momentsCount + 1 },
    }));
    return newMemory;
  };

  const saveSquad = async (memoryId: string) => {
    setMemories((prev) =>
      prev.map((m) => (m.id === memoryId ? { ...m, squadCreated: true } : m))
    );
    await momentApi.saveSquad(memoryId);
  };

  const createLiveMoment = async (title: string, category: string, zone: string) => {
    await momentApi.createLiveMoment({
      title,
      category,
      approximateZone: zone,
      targetCount: 3,
    });
    const refreshed = await momentApi.getLiveMoments();
    setLiveMoments(refreshed.liveMoments);
  };

  const joinLiveMoment = async (id: string) => {
    await momentApi.joinLiveMoment(id);
    const refreshed = await momentApi.getLiveMoments();
    setLiveMoments(refreshed.liveMoments);
  };

  const resetDemoState = async () => {
    await momentApi.resetDemo();
    setCurrentUser(JSON.parse(JSON.stringify(DEMO_USER_KETAN)));
    setEvent(JSON.parse(JSON.stringify(DEMO_EVENT)));
    setIntent(defaultIntent);
    setActiveMoment(null);
    setWaveStatusMap({});
    setMutualMatchedUser(null);
    setSelectedPerson(null);
    setIsCheckedIn(true);
    await refreshRadar();
  };

  return (
    <MomentContext.Provider
      value={{
        currentUser,
        event,
        isCheckedIn,
        intent,
        radarUsers,
        activeFilter,
        ghostMode,
        selectedPerson,
        waveStatusMap,
        mutualMatchedUser,
        activeMoment,
        memories,
        liveMoments,
        isLoading,
        checkIn,
        updateIntent,
        setActiveFilter,
        toggleGhostMode,
        selectPerson,
        sendWave,
        dismissMutualMatch,
        buildMomentExperience,
        replanMoment,
        getConversationRescue,
        completeChallenge,
        concludeMoment,
        saveSquad,
        createLiveMoment,
        joinLiveMoment,
        resetDemoState,
      }}
    >
      {children}
    </MomentContext.Provider>
  );
};

export const useMoment = () => {
  const context = useContext(MomentContext);
  if (!context) {
    throw new Error('useMoment must be used within a MomentProvider');
  }
  return context;
};
