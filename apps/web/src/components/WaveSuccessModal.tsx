import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Sparkles, Users, ArrowRight, X } from 'lucide-react';
import { RadarUser } from '@moment/types';
import { useMoment } from '../context/MomentContext';
import { DEMO_RADAR_PEOPLE } from '@moment/shared';

interface Props {
  matchedUser: RadarUser;
  onClose: () => void;
}

export const WaveSuccessModal: React.FC<Props> = ({ matchedUser, onClose }) => {
  const navigate = useNavigate();
  const { currentUser, buildMomentExperience } = useMoment();
  const [showGroupPreview, setShowGroupPreview] = useState(false);
  const [loading, setLoading] = useState(false);

  const groupMembers = [
    currentUser,
    matchedUser.profile,
    ...DEMO_RADAR_PEOPLE.filter((p) => p.id === 'u-priya' || p.id === 'u-ananya'),
  ];

  const handleBuildMoment = async () => {
    setLoading(true);
    await buildMomentExperience();
    setLoading(false);
    onClose();
    navigate('/active-moment');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-charcoal-900/70 backdrop-blur-md animate-fadeIn">
      <div className="relative w-full max-w-lg bg-[#F7F3EA] rounded-3xl border border-[#DFD8CB] shadow-elevated overflow-hidden text-center p-8">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full bg-[#EFE8DC] text-[#686661] hover:text-[#202020] transition-colors"
        >
          <X size={18} />
        </button>

        {!showGroupPreview ? (
          <div>
            {/* Mutual connection avatars */}
            <div className="flex items-center justify-center -space-x-4 mb-6">
              <div className="relative">
                <img
                  src={currentUser.avatar}
                  alt={currentUser.name}
                  className="w-20 h-20 rounded-full object-cover border-4 border-[#F7F3EA] shadow-medium"
                />
                <span className="absolute -bottom-1 -left-1 text-2xl">👋</span>
              </div>
              <div className="w-10 h-10 rounded-full bg-[#C66A45] text-white flex items-center justify-center font-black z-10 shadow-medium text-xs">
                AI
              </div>
              <div className="relative">
                <img
                  src={matchedUser.profile.avatar}
                  alt={matchedUser.profile.name}
                  className="w-20 h-20 rounded-full object-cover border-4 border-[#F7F3EA] shadow-medium"
                />
                <span className="absolute -bottom-1 -right-1 text-2xl">🤝</span>
              </div>
            </div>

            <span className="text-xs font-bold uppercase tracking-widest text-[#7B8062]">
              Mutual Connection Established
            </span>
            <h2 className="text-3xl font-black text-[#202020] mt-1 tracking-tight">
              YOU FOUND EACH OTHER!
            </h2>
            <p className="text-sm text-[#686661] mt-2 max-w-sm mx-auto">
              You and <span className="font-bold text-[#202020]">{matchedUser.profile.name}</span> both waved. MOMENT AI has identified compatible attendees nearby to form an optimal micro-group.
            </p>

            <div className="mt-6 flex flex-col gap-3">
              <button
                onClick={() => setShowGroupPreview(true)}
                className="w-full py-4 px-6 rounded-2xl bg-[#C66A45] hover:bg-[#A65230] text-white font-extrabold text-base shadow-medium hover:shadow-elevated transition-all flex items-center justify-center gap-2 transform active:scale-98"
              >
                <Users size={18} />
                Explore Group Chemistry (4 people)
                <ArrowRight size={16} />
              </button>

              <button
                onClick={handleBuildMoment}
                disabled={loading}
                className="w-full py-3 px-4 rounded-2xl bg-[#202020] hover:bg-[#151515] text-[#F7F3EA] font-bold text-sm shadow-soft transition-all"
              >
                {loading ? 'Crafting Experience...' : 'Build 1-on-1 Moment Directly'}
              </button>
            </div>
          </div>
        ) : (
          /* Group Chemistry Screen */
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#C66A45]/15 text-[#C66A45] text-xs font-bold mb-3">
              <Sparkles size={13} /> AI Group Formation
            </div>

            <h2 className="text-2xl font-black text-[#202020] tracking-tight">
              Your Recommended Moment Squad
            </h2>

            {/* Member Avatars */}
            <div className="grid grid-cols-4 gap-3 my-6">
              {groupMembers.map((m, idx) => (
                <div key={idx} className="flex flex-col items-center">
                  <img
                    src={m.avatar}
                    alt={m.name}
                    className="w-14 h-14 rounded-2xl object-cover border-2 border-white shadow-soft"
                  />
                  <span className="text-xs font-bold text-[#202020] mt-1.5">
                    {m.id === currentUser.id ? 'You' : m.name}
                  </span>
                  <span className="text-[10px] text-[#7B8062] font-semibold">
                    {m.interests[0]}
                  </span>
                </div>
              ))}
            </div>

            {/* Chemistry Card */}
            <div className="bg-[#EFE8DC] p-4 rounded-2xl text-left border border-[#DFD8CB] space-y-2 mb-6">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-[#7B8062]">Group Chemistry</span>
                <span className="text-xl font-black text-[#C66A45]">91% Match</span>
              </div>
              <p className="text-xs text-[#686661]">
                Shared interests: <strong className="text-[#202020]">📸 Photography, 🍕 Food, 🎵 Music</strong>
              </p>
              <p className="text-xs text-[#686661]">
                Ideal duration: <strong className="text-[#202020]">43 minutes</strong> (aligned with everyone's schedule)
              </p>
            </div>

            <button
              onClick={handleBuildMoment}
              disabled={loading}
              className="w-full py-4 px-6 rounded-2xl bg-[#C66A45] hover:bg-[#A65230] text-white font-extrabold text-base shadow-medium hover:shadow-elevated transition-all flex items-center justify-center gap-2 transform active:scale-98"
            >
              <Sparkles size={18} />
              {loading ? 'Generating Experience...' : 'BUILD THIS MOMENT'}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
