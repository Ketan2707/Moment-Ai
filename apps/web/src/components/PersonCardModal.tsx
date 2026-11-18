import React, { useState } from 'react';
import { X, Hand, ShieldAlert, Sparkles, MapPin, Clock, Users } from 'lucide-react';
import { RadarUser } from '@moment/types';
import { useMoment } from '../context/MomentContext';

interface Props {
  person: RadarUser;
  onClose: () => void;
}

export const PersonCardModal: React.FC<Props> = ({ person, onClose }) => {
  const { sendWave, waveStatusMap } = useMoment();
  const [reported, setReported] = useState(false);

  const waveStatus = waveStatusMap[person.userId] || person.waveStatus || 'none';

  const handleWave = async () => {
    await sendWave(person.userId);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-charcoal-900/60 backdrop-blur-sm animate-fadeIn">
      <div className="relative w-full max-w-md bg-[#F7F3EA] rounded-3xl border border-[#DFD8CB] shadow-elevated overflow-hidden animate-scaleUp">
        {/* Header with avatar & close */}
        <div className="relative bg-[#EFE8DC] p-6 pb-5 border-b border-[#DFD8CB]">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 rounded-full bg-[#F7F3EA] text-[#686661] hover:text-[#202020] transition-colors"
          >
            <X size={18} />
          </button>

          <div className="flex items-start gap-4">
            <div className="relative">
              <img
                src={person.profile.avatar}
                alt={person.profile.name}
                className="w-16 h-16 rounded-2xl object-cover border-2 border-white shadow-soft"
              />
              <span className="absolute -bottom-1 -right-1 px-1.5 py-0.5 rounded-full bg-[#202020] text-white text-[10px] font-bold">
                Lvl {person.profile.momentLevel}
              </span>
            </div>

            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-xl font-extrabold text-[#202020] tracking-tight">
                  {person.profile.name}
                </h3>
                <span className="text-xs font-semibold text-[#7B8062]">
                  {person.profile.username}
                </span>
              </div>
              <p className="text-xs text-[#686661] mt-0.5 line-clamp-1">
                {person.profile.bio}
              </p>
              <div className="flex items-center gap-2 mt-2">
                <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-[#7B8062] bg-[#E4DDD0] px-2 py-0.5 rounded-full">
                  <MapPin size={11} /> {person.proximityLabel}
                </span>
                <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-[#202020] bg-white/70 px-2 py-0.5 rounded-full">
                  <Clock size={11} /> {person.intent.timeAvailableMinutes} min
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Chemistry Score & Match Rationale */}
        <div className="p-6 space-y-4">
          <div className="bg-[#EFE8DC] rounded-2xl p-4 border border-[#DFD8CB]/80">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-[11px] font-bold uppercase tracking-wider text-[#7B8062]">
                  Compatibility
                </span>
                <h4 className="text-2xl font-black text-[#C66A45] tracking-tight">
                  {person.chemistryScore}% Moment Chemistry
                </h4>
              </div>
              <div className="w-10 h-10 rounded-full bg-[#C66A45]/15 text-[#C66A45] flex items-center justify-center font-bold">
                <Sparkles size={20} />
              </div>
            </div>

            <div className="mt-3 pt-3 border-t border-[#DFD8CB]/60">
              <span className="text-xs font-bold text-[#202020]">Why you match:</span>
              <ul className="mt-1.5 space-y-1">
                {person.matchReasons.map((reason, idx) => (
                  <li key={idx} className="text-xs text-[#686661] flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#C66A45]" />
                    {reason}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Interests & Social Rhythm */}
          <div className="space-y-2">
            <span className="text-xs font-bold text-[#202020]">Current Vibe & Interests</span>
            <div className="flex flex-wrap gap-1.5">
              {person.profile.interests.map((interest, i) => (
                <span
                  key={i}
                  className="px-2.5 py-1 rounded-full text-xs font-medium bg-[#EFE8DC] text-[#202020] border border-[#DFD8CB]"
                >
                  {interest}
                </span>
              ))}
            </div>
          </div>

          {/* Serendipity Note if applicable */}
          {person.isSerendipityMatch && person.serendipityNote && (
            <div className="p-3 rounded-xl bg-[#7B8062]/15 border border-[#7B8062]/30 text-xs text-[#202020]">
              <span className="font-bold text-[#7B8062] block mb-0.5">✨ Serendipity Match:</span>
              {person.serendipityNote}
            </div>
          )}

          {/* Action Buttons */}
          <div className="pt-2 flex flex-col gap-2">
            {waveStatus === 'mutual' ? (
              <div className="w-full py-3 px-4 rounded-2xl bg-[#7B8062] text-white font-bold text-center text-sm shadow-soft">
                Mutual Connection Established 👋
              </div>
            ) : waveStatus === 'sent' ? (
              <div className="w-full py-3 px-4 rounded-2xl bg-[#202020] text-white font-bold text-center text-sm flex items-center justify-center gap-2 shadow-soft">
                <span className="animate-spin text-lg">⏳</span> Wave sent! Waiting for wave back...
              </div>
            ) : (
              <button
                onClick={handleWave}
                className="w-full py-3.5 px-4 rounded-2xl bg-[#C66A45] hover:bg-[#A65230] text-white font-bold text-base shadow-medium hover:shadow-elevated transition-all flex items-center justify-center gap-2 transform active:scale-98"
              >
                <Hand size={18} />
                Send Wave 👋
              </button>
            )}

            <div className="flex items-center justify-between px-2 pt-1">
              <button
                onClick={onClose}
                className="text-xs font-semibold text-[#686661] hover:text-[#202020]"
              >
                Maybe Later
              </button>

              <button
                onClick={() => setReported(true)}
                disabled={reported}
                className="text-xs text-[#686661] hover:text-red-700 flex items-center gap-1 transition-colors"
              >
                <ShieldAlert size={12} />
                {reported ? 'Reported' : 'Report'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
