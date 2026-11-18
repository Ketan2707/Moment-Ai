import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Trophy,
  CheckCircle2,
  Users,
  Clock,
  Sparkles,
  Share2,
  Bookmark,
  ArrowRight,
  MessageCircle,
} from 'lucide-react';
import { useMoment } from '../context/MomentContext';

export const MemoryPage: React.FC = () => {
  const navigate = useNavigate();
  const { memories, saveSquad, currentUser } = useMoment();
  const [squadSavedId, setSquadSavedId] = useState<string | null>(null);

  const activeMemory = memories[0] || {
    id: 'demo-mem',
    momentId: 'm-1',
    eventName: 'TechFest 2026',
    durationMinutes: 43,
    participants: [
      currentUser,
      {
        id: 'u-rahul',
        name: 'Rahul',
        username: '@rahul_clicks',
        avatar:
          'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&auto=format&fit=crop&q=80',
        momentLevel: 9,
        xp: 2200,
        badges: [],
        interests: ['Photography'],
        stats: { momentsCount: 14, challengesCount: 11, connectionsCount: 20 },
      },
      {
        id: 'u-priya',
        name: 'Priya',
        username: '@priya_eats',
        avatar:
          'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&auto=format&fit=crop&q=80',
        momentLevel: 14,
        xp: 4100,
        badges: [],
        interests: ['Food'],
        stats: { momentsCount: 31, challengesCount: 26, connectionsCount: 42 },
      },
      {
        id: 'u-ananya',
        name: 'Ananya',
        username: '@ananya_sound',
        avatar:
          'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=200&auto=format&fit=crop&q=80',
        momentLevel: 8,
        xp: 1950,
        badges: [],
        interests: ['Music'],
        stats: { momentsCount: 12, challengesCount: 8, connectionsCount: 16 },
      },
    ],
    stops: ['Photography Zone', 'Food Court & Market', 'Main Stage Amphitheatre'],
    challengeTitle: 'College Life Silhouette Challenge',
    challengeCompleted: true,
    aiRecap:
      'You started with a photography challenge, discovered the food zone together, and ended the evening catching the acoustic sunset performance.',
    photos: [
      'https://images.unsplash.com/photo-1523580494863-6f3031224c94?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=800&auto=format&fit=crop&q=80',
    ],
    createdAt: new Date().toISOString(),
  };

  const handleKeepSquad = async (memId: string) => {
    await saveSquad(memId);
    setSquadSavedId(memId);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 sm:py-12 space-y-8 animate-fadeIn">
      {/* Title */}
      <div>
        <span className="text-xs font-bold uppercase tracking-widest text-[#7B8062]">
          Experience Completed
        </span>
        <h1 className="text-3xl sm:text-4xl font-black text-[#202020] tracking-tight mt-1">
          Your Moment Keepsake
        </h1>
        <p className="text-xs sm:text-sm text-[#686661] mt-1">
          Temporary shared connection transformed into a permanent memory artifact.
        </p>
      </div>

      {/* Main Memory Keepsake Card */}
      <div className="bg-[#EFE8DC] border border-[#DFD8CB] rounded-3xl p-6 sm:p-10 shadow-elevated space-y-6">
        {/* Event & Duration Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[#DFD8CB]">
          <div>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#C66A45]/15 text-[#C66A45] text-xs font-black uppercase tracking-wider">
              <Sparkles size={13} /> {activeMemory.eventName}
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-[#202020] mt-2 tracking-tight">
              Photography + Food Hunt
            </h2>
          </div>

          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white text-[#202020] text-xs font-bold border border-[#DFD8CB]">
              <Clock size={13} /> {activeMemory.durationMinutes} minutes
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#7B8062] text-white text-xs font-bold">
              <CheckCircle2 size={13} /> Challenge Completed
            </span>
          </div>
        </div>

        {/* Participants Row */}
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-[#7B8062] block mb-2">
            Participants ({activeMemory.participants.length})
          </span>
          <div className="flex flex-wrap gap-3">
            {activeMemory.participants.map((p, idx) => (
              <div
                key={idx}
                className="flex items-center gap-2 bg-white/80 px-3 py-1.5 rounded-full border border-[#DFD8CB] shadow-xs"
              >
                <img
                  src={p.avatar}
                  alt={p.name}
                  className="w-7 h-7 rounded-full object-cover"
                />
                <span className="text-xs font-bold text-[#202020]">
                  {p.id === currentUser.id ? 'You' : p.name}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Stops Visited */}
        <div className="bg-[#F7F3EA] rounded-2xl p-4 border border-[#DFD8CB]">
          <span className="text-xs font-bold uppercase tracking-wider text-[#7B8062] block mb-2">
            Route Journey
          </span>
          <div className="flex flex-wrap items-center gap-2 text-xs font-extrabold text-[#202020]">
            {activeMemory.stops.map((stop, idx) => (
              <React.Fragment key={idx}>
                <span className="px-3 py-1 bg-white rounded-lg border border-[#DFD8CB]">
                  {stop}
                </span>
                {idx < activeMemory.stops.length - 1 && (
                  <span className="text-[#C66A45]">→</span>
                )}
              </React.Fragment>
            ))}
          </div>
        </div>

        {/* Photo Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {activeMemory.photos.map((photo, idx) => (
            <div
              key={idx}
              className="relative h-56 rounded-2xl overflow-hidden border border-[#DFD8CB] shadow-soft group"
            >
              <img
                src={photo}
                alt="Moment Memory"
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-4">
                <span className="text-xs font-bold text-white">
                  {idx === 0
                    ? '📸 Creative College Life Challenge Photo'
                    : '🎤 Sunset Acoustic Gathering'}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* AI Recap Narrative */}
        <div className="p-5 rounded-2xl bg-[#E4DDD0] border border-[#DFD8CB] space-y-1.5">
          <span className="text-xs font-bold uppercase tracking-wide text-[#7B8062]">
            AI Moment Recap
          </span>
          <p className="text-sm sm:text-base font-semibold text-[#202020] leading-relaxed">
            "{activeMemory.aiRecap}"
          </p>
        </div>

        {/* Action Row: Keep Squad vs End Moment */}
        <div className="pt-4 flex flex-col sm:flex-row items-center justify-between gap-3 border-t border-[#DFD8CB]">
          <div className="flex flex-wrap items-center gap-2 w-full sm:w-auto">
            <button
              onClick={() => handleKeepSquad(activeMemory.id)}
              className={`flex-1 sm:flex-none px-6 py-3.5 rounded-2xl font-bold text-sm transition-all flex items-center justify-center gap-2 shadow-soft ${
                squadSavedId === activeMemory.id || activeMemory.squadCreated
                  ? 'bg-[#7B8062] text-white'
                  : 'bg-[#C66A45] hover:bg-[#A65230] text-white'
              }`}
            >
              <Users size={16} />
              {squadSavedId === activeMemory.id || activeMemory.squadCreated
                ? 'Squad Saved ✓ (Chat Enabled)'
                : 'KEEP SQUAD'}
            </button>

            <button
              onClick={() => navigate('/radar')}
              className="flex-1 sm:flex-none px-6 py-3.5 rounded-2xl bg-[#202020] hover:bg-[#151515] text-[#F7F3EA] font-bold text-sm shadow-soft transition-all"
            >
              End Moment
            </button>
          </div>

          <button
            onClick={() => navigate('/radar')}
            className="text-xs font-bold text-[#686661] hover:text-[#202020] flex items-center gap-1"
          >
            Find Another Moment <ArrowRight size={14} />
          </button>
        </div>
      </div>
    </div>
  );
};
