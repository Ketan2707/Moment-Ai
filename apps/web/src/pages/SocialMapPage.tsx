import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  MapPin,
  Users,
  Camera,
  Utensils,
  Music,
  Gamepad2,
  Code,
  Coffee,
  Sparkles,
} from 'lucide-react';
import { useMoment } from '../context/MomentContext';

export const SocialMapPage: React.FC = () => {
  const navigate = useNavigate();
  const { event } = useMoment();

  const getCrowdBadge = (level: string) => {
    switch (level) {
      case 'peak':
        return 'bg-[#C66A45] text-white';
      case 'high':
        return 'bg-[#DE835F] text-white';
      case 'moderate':
        return 'bg-[#7B8062] text-white';
      default:
        return 'bg-[#E4DDD0] text-[#202020]';
    }
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-8 sm:py-12 space-y-8 animate-fadeIn">
      <div>
        <span className="text-xs font-bold uppercase tracking-widest text-[#7B8062]">
          Physical Presence & Zones
        </span>
        <h1 className="text-3xl sm:text-4xl font-black text-[#202020] tracking-tight mt-1">
          Event Social Map
        </h1>
        <p className="text-xs sm:text-sm text-[#686661] mt-1">
          Real-time zone densities across {event.venue}. Approximate geofences preserve attendee privacy.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {event.zones.map((zone) => {
          const Icon =
            zone.icon === 'Camera'
              ? Camera
              : zone.icon === 'Utensils'
              ? Utensils
              : zone.icon === 'Music'
              ? Music
              : zone.icon === 'Code'
              ? Code
              : zone.icon === 'Coffee'
              ? Coffee
              : Gamepad2;

          return (
            <div
              key={zone.id}
              className="p-6 rounded-3xl bg-[#EFE8DC] border border-[#DFD8CB] hover:border-[#C66A45] transition-all shadow-soft flex flex-col justify-between space-y-4"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="w-12 h-12 rounded-2xl bg-[#F7F3EA] text-[#C66A45] flex items-center justify-center font-bold shadow-xs">
                    <Icon size={24} />
                  </div>
                  <span
                    className={`px-3 py-1 rounded-full text-[11px] font-black uppercase tracking-wider ${getCrowdBadge(
                      zone.crowdLevel
                    )}`}
                  >
                    {zone.crowdLevel} crowd
                  </span>
                </div>

                <div>
                  <h3 className="text-lg font-black text-[#202020] tracking-tight">
                    {zone.name}
                  </h3>
                  <span className="text-xs font-semibold text-[#7B8062] flex items-center gap-1 mt-0.5">
                    <MapPin size={12} /> {zone.approxDistance}
                  </span>
                </div>

                <p className="text-xs text-[#686661] leading-relaxed">
                  {zone.description}
                </p>

                <div className="pt-2 border-t border-[#DFD8CB]">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-[#7B8062] block mb-1.5">
                    Current Activities
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {zone.activeActivities.map((act, i) => (
                      <span
                        key={i}
                        className="px-2.5 py-1 rounded-lg bg-[#F7F3EA] text-[11px] font-bold text-[#202020] border border-[#DFD8CB]"
                      >
                        {act}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <button
                onClick={() => navigate('/radar')}
                className="w-full py-2.5 rounded-xl bg-[#202020] hover:bg-[#151515] text-[#F7F3EA] text-xs font-bold transition-all shadow-xs"
              >
                Find People In This Zone →
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
};
