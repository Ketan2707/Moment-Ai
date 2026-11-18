import React from 'react';
import {
  Trophy,
  Award,
  Sparkles,
  Users,
  Shield,
  EyeOff,
  Flame,
  CheckCircle2,
} from 'lucide-react';
import { useMoment } from '../context/MomentContext';

export const ProfilePage: React.FC = () => {
  const { currentUser, ghostMode, toggleGhostMode } = useMoment();

  return (
    <div className="max-w-3xl mx-auto px-4 py-8 sm:py-12 space-y-8 animate-fadeIn">
      {/* Profile Header */}
      <div className="bg-[#EFE8DC] border border-[#DFD8CB] rounded-3xl p-6 sm:p-10 shadow-soft">
        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 text-center sm:text-left">
          <div className="relative">
            <img
              src={currentUser.avatar}
              alt={currentUser.name}
              className="w-24 h-24 sm:w-28 sm:h-28 rounded-3xl object-cover border-4 border-white shadow-medium"
            />
            <span className="absolute -bottom-2 -right-2 px-2.5 py-0.5 rounded-full bg-[#202020] text-white text-xs font-black">
              Lvl {currentUser.momentLevel}
            </span>
          </div>

          <div className="space-y-2 flex-1">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div>
                <h1 className="text-3xl font-black text-[#202020] tracking-tight">
                  {currentUser.name}
                </h1>
                <span className="text-sm font-semibold text-[#7B8062]">
                  {currentUser.username}
                </span>
              </div>

              <div className="flex items-center gap-2 self-center sm:self-auto">
                <span className="px-3.5 py-1.5 rounded-full bg-[#C66A45] text-white font-black text-xs shadow-soft">
                  {currentUser.xp} Experience XP
                </span>
              </div>
            </div>

            <p className="text-sm text-[#686661] max-w-lg leading-relaxed">
              {currentUser.bio}
            </p>

            {/* Badges */}
            <div className="pt-2 flex flex-wrap gap-2 justify-center sm:justify-start">
              {currentUser.badges.map((b, i) => (
                <span
                  key={i}
                  className="px-3 py-1 rounded-full bg-white/80 border border-[#DFD8CB] text-xs font-bold text-[#202020] shadow-xs"
                >
                  {b}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Experience Stats (No follower counts!) */}
      <div className="grid grid-cols-3 gap-4 text-center">
        <div className="p-5 rounded-2xl bg-[#EFE8DC] border border-[#DFD8CB] shadow-soft">
          <span className="text-[11px] font-bold uppercase tracking-wider text-[#7B8062] block">
            Moments Built
          </span>
          <span className="text-3xl font-black text-[#202020] mt-1 block">
            {currentUser.stats.momentsCount}
          </span>
          <span className="text-[10px] text-[#686661]">Physical meetups</span>
        </div>

        <div className="p-5 rounded-2xl bg-[#EFE8DC] border border-[#DFD8CB] shadow-soft">
          <span className="text-[11px] font-bold uppercase tracking-wider text-[#7B8062] block">
            Challenges Won
          </span>
          <span className="text-3xl font-black text-[#C66A45] mt-1 block">
            {currentUser.stats.challengesCount}
          </span>
          <span className="text-[10px] text-[#686661]">Campus objectives</span>
        </div>

        <div className="p-5 rounded-2xl bg-[#EFE8DC] border border-[#DFD8CB] shadow-soft">
          <span className="text-[11px] font-bold uppercase tracking-wider text-[#7B8062] block">
            Mutual Waves
          </span>
          <span className="text-3xl font-black text-[#7B8062] mt-1 block">
            {currentUser.stats.connectionsCount}
          </span>
          <span className="text-[10px] text-[#686661]">Real connections</span>
        </div>
      </div>

      {/* Interests */}
      <div className="bg-[#EFE8DC] border border-[#DFD8CB] rounded-3xl p-6 sm:p-8 space-y-3">
        <h3 className="text-lg font-black text-[#202020]">
          Active Passions
        </h3>
        <div className="flex flex-wrap gap-2">
          {currentUser.interests.map((interest, i) => (
            <span
              key={i}
              className="px-4 py-2 rounded-xl bg-white text-xs font-bold text-[#202020] border border-[#DFD8CB]"
            >
              {interest}
            </span>
          ))}
        </div>
      </div>

      {/* Privacy & Safety Settings */}
      <div className="bg-[#EFE8DC] border border-[#DFD8CB] rounded-3xl p-6 sm:p-8 space-y-4">
        <h3 className="text-lg font-black text-[#202020]">
          Privacy & Visibility
        </h3>

        <div className="flex items-center justify-between p-4 rounded-2xl bg-white/80 border border-[#DFD8CB]">
          <div>
            <h4 className="text-sm font-bold text-[#202020] flex items-center gap-1.5">
              <EyeOff size={16} /> Ghost Mode
            </h4>
            <p className="text-xs text-[#686661] mt-0.5">
              Browse events and join public live moments without appearing on nearby radars.
            </p>
          </div>
          <button
            onClick={toggleGhostMode}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
              ghostMode
                ? 'bg-[#202020] text-white'
                : 'bg-[#DFD8CB] text-[#202020]'
            }`}
          >
            {ghostMode ? 'Ghost ON' : 'Visible'}
          </button>
        </div>

        <div className="p-4 rounded-2xl bg-white/80 border border-[#DFD8CB] text-xs text-[#686661] space-y-1">
          <span className="font-bold text-[#202020] block">
            🛡️ Privacy Gradient Guarantee:
          </span>
          <p>
            Your exact latitude/longitude coordinates are never exposed or stored. Only zone-level proximity labels (e.g. "Nearby") and mutual opt-in handshakes are used.
          </p>
        </div>
      </div>
    </div>
  );
};
