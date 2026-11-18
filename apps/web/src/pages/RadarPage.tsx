import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Compass,
  Sparkles,
  Users,
  EyeOff,
  Flame,
  Hand,
  Clock,
  MapPin,
  Heart,
  HelpCircle,
} from 'lucide-react';
import { RadarUser } from '@moment/types';
import { useMoment } from '../context/MomentContext';
import { PersonCardModal } from '../components/PersonCardModal';
import { WaveSuccessModal } from '../components/WaveSuccessModal';

export const RadarPage: React.FC = () => {
  const {
    currentUser,
    radarUsers,
    activeFilter,
    setActiveFilter,
    ghostMode,
    toggleGhostMode,
    selectedPerson,
    selectPerson,
    sendWave,
    waveStatusMap,
    mutualMatchedUser,
    dismissMutualMatch,
  } = useMoment();

  const [showSerendipityBanner, setShowSerendipityBanner] = useState(false);

  const filters = [
    'People',
    'Nearby',
    'Best Match',
    'Surprise Me',
    'Activities',
    'Live Moments',
  ];

  // Specific coordinates around the center for the 4 key attendees
  // (Center is 50%, 50%)
  const nodePositions: Record<string, { x: string; y: string; delay: number }> = {
    'u-rahul': { x: '26%', y: '28%', delay: 0 },
    'u-priya': { x: '72%', y: '32%', delay: 0.5 },
    'u-ananya': { x: '75%', y: '70%', delay: 1 },
    'u-arjun': { x: '24%', y: '74%', delay: 1.5 },
  };

  const handleFilterClick = (f: string) => {
    setActiveFilter(f);
    if (f === 'Surprise Me') {
      setShowSerendipityBanner(true);
    } else {
      setShowSerendipityBanner(false);
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-6 sm:py-8 space-y-6">
      {/* Top Controls & Status */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold uppercase tracking-widest text-[#7B8062]">
              Social Compass
            </span>
            {ghostMode && (
              <span className="text-[11px] font-bold bg-[#202020] text-[#F7F3EA] px-2 py-0.5 rounded-full flex items-center gap-1">
                <EyeOff size={11} /> Ghost Mode Active
              </span>
            )}
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-[#202020] tracking-tight mt-0.5">
            Moment Radar
          </h1>
          <p className="text-xs sm:text-sm text-[#686661]">
            Tap any avatar to inspect vibes and send a friendly Wave 👋
          </p>
        </div>

        {/* Filter Selector */}
        <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-1">
          {filters.map((f) => (
            <button
              key={f}
              onClick={() => handleFilterClick(f)}
              className={`px-3.5 py-1.5 rounded-full text-xs font-bold whitespace-nowrap transition-all border ${
                activeFilter === f
                  ? 'bg-[#202020] text-[#F7F3EA] border-[#202020] shadow-soft'
                  : 'bg-[#EFE8DC] text-[#686661] border-[#DFD8CB] hover:border-[#7B8062]'
              }`}
            >
              {f === 'Surprise Me' ? '✨ Surprise Me' : f}
            </button>
          ))}
        </div>
      </div>

      {/* Serendipity Mode Notification */}
      {showSerendipityBanner && (
        <div className="p-4 rounded-2xl bg-[#7B8062]/20 border border-[#7B8062] flex items-start justify-between gap-3 animate-fadeIn">
          <div>
            <h4 className="text-sm font-bold text-[#202020] flex items-center gap-1.5">
              <Sparkles size={16} className="text-[#C66A45]" /> Serendipity Mode Active
            </h4>
            <p className="text-xs text-[#202020] mt-0.5">
              You usually match with coders. But here is <strong>Ananya</strong> (indie acoustic music) with matching free time and small-group energy!
            </p>
          </div>
          <button
            onClick={() => setShowSerendipityBanner(false)}
            className="text-xs text-[#686661] hover:text-[#202020]"
          >
            Dismiss
          </button>
        </div>
      )}

      {/* Signature Radar Container */}
      <div className="relative w-full h-[540px] sm:h-[620px] rounded-3xl bg-[#EFE8DC] border border-[#DFD8CB] overflow-hidden shadow-soft flex items-center justify-center select-none">
        {/* Soft Concentric Social Compass Rings */}
        <div className="absolute w-[220px] h-[220px] sm:w-[280px] sm:h-[280px] rounded-full border border-[#D5CCBD] pointer-events-none" />
        <div className="absolute w-[360px] h-[360px] sm:w-[440px] sm:h-[440px] rounded-full border border-[#D5CCBD]/70 pointer-events-none" />
        <div className="absolute w-[480px] h-[480px] sm:w-[580px] sm:h-[580px] rounded-full border border-[#D5CCBD]/40 pointer-events-none" />

        {/* Pulsing gentle radar ping wave */}
        <div className="absolute w-[300px] h-[300px] sm:w-[400px] sm:h-[400px] rounded-full border-2 border-[#C66A45]/30 animate-radar-ring pointer-events-none" />

        {/* Center Node: YOU */}
        <div className="relative z-20 flex flex-col items-center">
          <div className="relative">
            <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full p-1 bg-[#202020] shadow-elevated">
              <img
                src={currentUser.avatar}
                alt={currentUser.name}
                className="w-full h-full rounded-full object-cover border-2 border-white"
              />
            </div>
            <span className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 px-2.5 py-0.5 rounded-full bg-[#C66A45] text-white text-[10px] font-black uppercase tracking-wider shadow-sm">
              YOU
            </span>
          </div>
          <span className="text-xs font-bold text-[#202020] mt-2">
            Photography Zone
          </span>
          <span className="text-[10px] text-[#7B8062] font-semibold">
            {currentUser.interests.slice(0, 2).join(' • ')}
          </span>
        </div>

        {/* Ambient Zone Tags */}
        <div className="absolute top-6 left-6 text-xs font-bold text-[#7B8062] bg-white/60 px-3 py-1.5 rounded-full border border-[#DFD8CB]">
          📸 Photo Installation
        </div>
        <div className="absolute top-6 right-6 text-xs font-bold text-[#7B8062] bg-white/60 px-3 py-1.5 rounded-full border border-[#DFD8CB]">
          🍕 Food Court Courtyard
        </div>
        <div className="absolute bottom-6 left-6 text-xs font-bold text-[#7B8062] bg-white/60 px-3 py-1.5 rounded-full border border-[#DFD8CB]">
          💻 Hackathon Arena
        </div>
        <div className="absolute bottom-6 right-6 text-xs font-bold text-[#7B8062] bg-white/60 px-3 py-1.5 rounded-full border border-[#DFD8CB]">
          🎤 Main Stage Amphitheatre
        </div>

        {/* Floating People Nodes */}
        {radarUsers.map((user) => {
          const pos = nodePositions[user.userId] || { x: '50%', y: '20%', delay: 0 };
          const waveStatus = waveStatusMap[user.userId] || user.waveStatus;

          return (
            <motion.div
              key={user.userId}
              style={{ left: pos.x, top: pos.y }}
              initial={{ scale: 0, opacity: 0 }}
              animate={{
                scale: 1,
                opacity: 1,
                y: [0, -8, 0],
              }}
              transition={{
                scale: { duration: 0.4 },
                y: {
                  duration: 3 + pos.delay,
                  repeat: Infinity,
                  ease: 'easeInOut',
                },
              }}
              onClick={() => selectPerson(user)}
              className="absolute z-20 -translate-x-1/2 -translate-y-1/2 cursor-pointer group"
            >
              <div className="flex flex-col items-center">
                {/* Avatar with chemistry pill */}
                <div className="relative">
                  <div
                    className={`w-14 h-14 sm:w-16 sm:h-16 rounded-full p-0.5 border-2 transition-transform group-hover:scale-110 shadow-medium ${
                      user.isSerendipityMatch
                        ? 'border-[#7B8062] bg-[#7B8062]/20'
                        : 'border-[#C66A45] bg-[#C66A45]/20'
                    }`}
                  >
                    <img
                      src={user.profile.avatar}
                      alt={user.profile.name}
                      className="w-full h-full rounded-full object-cover"
                    />
                  </div>

                  {/* Chemistry Badge */}
                  <span
                    className={`absolute -top-1 -right-2 px-1.5 py-0.5 rounded-full text-[10px] font-black shadow-sm ${
                      user.isSerendipityMatch
                        ? 'bg-[#7B8062] text-white'
                        : 'bg-[#C66A45] text-white'
                    }`}
                  >
                    {user.chemistryScore}%
                  </span>

                  {/* Wave Status Badge */}
                  {waveStatus === 'mutual' ? (
                    <span className="absolute -bottom-1 -left-1 text-sm bg-white rounded-full p-0.5 shadow-sm">
                      🤝
                    </span>
                  ) : waveStatus === 'sent' ? (
                    <span className="absolute -bottom-1 -left-1 text-sm bg-white rounded-full p-0.5 shadow-sm animate-pulse">
                      👋
                    </span>
                  ) : null}
                </div>

                {/* Name & Approx Proximity Label */}
                <div className="mt-1 text-center bg-[#F7F3EA]/90 px-2 py-0.5 rounded-lg border border-[#DFD8CB] shadow-xs group-hover:border-[#C66A45] transition-colors">
                  <div className="text-xs font-black text-[#202020] leading-none">
                    {user.profile.name}
                  </div>
                  <div className="text-[10px] font-semibold text-[#7B8062]">
                    {user.proximityLabel}
                  </div>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Quick Action Helper Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <div
          onClick={() => {
            const rahul = radarUsers.find((u) => u.userId === 'u-rahul');
            if (rahul) selectPerson(rahul);
          }}
          className="p-4 rounded-2xl bg-[#EFE8DC] border border-[#DFD8CB] hover:border-[#C66A45] transition-all cursor-pointer shadow-soft flex items-center justify-between"
        >
          <div>
            <span className="text-[10px] font-bold uppercase text-[#7B8062]">
              Top Match
            </span>
            <h4 className="text-sm font-bold text-[#202020]">Rahul (84% Chemistry)</h4>
            <p className="text-xs text-[#686661]">Nearby in Photography Zone</p>
          </div>
          <button className="px-3 py-1.5 rounded-full bg-[#C66A45] text-white text-xs font-bold">
            Wave 👋
          </button>
        </div>

        <div
          onClick={() => {
            const ananya = radarUsers.find((u) => u.userId === 'u-ananya');
            if (ananya) selectPerson(ananya);
          }}
          className="p-4 rounded-2xl bg-[#EFE8DC] border border-[#DFD8CB] hover:border-[#7B8062] transition-all cursor-pointer shadow-soft flex items-center justify-between"
        >
          <div>
            <span className="text-[10px] font-bold uppercase text-[#7B8062]">
              Serendipity
            </span>
            <h4 className="text-sm font-bold text-[#202020]">Ananya (Music Vibe)</h4>
            <p className="text-xs text-[#686661]">Try something unexpected</p>
          </div>
          <button className="px-3 py-1.5 rounded-full bg-[#7B8062] text-white text-xs font-bold">
            View ✨
          </button>
        </div>

        <div
          onClick={toggleGhostMode}
          className="p-4 rounded-2xl bg-[#EFE8DC] border border-[#DFD8CB] hover:border-[#202020] transition-all cursor-pointer shadow-soft flex items-center justify-between"
        >
          <div>
            <span className="text-[10px] font-bold uppercase text-[#7B8062]">
              Privacy Control
            </span>
            <h4 className="text-sm font-bold text-[#202020]">
              {ghostMode ? 'Ghost Mode Active' : 'Public Discovery'}
            </h4>
            <p className="text-xs text-[#686661]">
              {ghostMode ? 'Hidden from nearby radars' : 'Visible to compatible peers'}
            </p>
          </div>
          <span className="text-xs font-bold underline text-[#202020]">Toggle</span>
        </div>
      </div>

      {/* Person Detail Sheet Modal */}
      {selectedPerson && (
        <PersonCardModal
          person={selectedPerson}
          onClose={() => selectPerson(null)}
        />
      )}

      {/* Mutual Wave Established Modal */}
      {mutualMatchedUser && (
        <WaveSuccessModal
          matchedUser={mutualMatchedUser}
          onClose={dismissMutualMatch}
        />
      )}
    </div>
  );
};
