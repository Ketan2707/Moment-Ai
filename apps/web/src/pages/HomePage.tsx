import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Compass,
  QrCode,
  Sparkles,
  Users,
  MapPin,
  Clock,
  ArrowRight,
  Camera,
  Utensils,
  Music,
  Gamepad2,
} from 'lucide-react';
import { useMoment } from '../context/MomentContext';

export const HomePage: React.FC = () => {
  const navigate = useNavigate();
  const { currentUser, event, isCheckedIn, activeMoment } = useMoment();

  return (
    <div className="max-w-5xl mx-auto px-4 py-8 sm:py-12 space-y-10">
      {/* Greeting */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-bold uppercase tracking-widest text-[#7B8062]">
            Welcome Back
          </span>
          <h1 className="text-3xl sm:text-4xl font-black text-[#202020] tracking-tight">
            Hey {currentUser.name} 👋
          </h1>
          <p className="text-sm sm:text-base text-[#686661] mt-1 font-medium">
            What's happening today? You're surrounded by 2,300+ people ready to connect.
          </p>
        </div>

        {activeMoment && (
          <button
            onClick={() => navigate('/active-moment')}
            className="flex items-center gap-3 px-5 py-3 rounded-2xl bg-[#C66A45] text-white font-bold text-sm shadow-medium hover:shadow-elevated transition-all animate-bounce"
          >
            <span className="w-2.5 h-2.5 rounded-full bg-white animate-ping" />
            Moment In Progress ({activeMoment.durationMinutes}m)
            <ArrowRight size={16} />
          </button>
        )}
      </div>

      {/* Featured Event Card: TechFest 2026 */}
      <div className="relative rounded-3xl bg-[#EFE8DC] border border-[#DFD8CB] p-6 sm:p-10 shadow-soft overflow-hidden group">
        <div className="absolute top-0 right-0 w-80 h-80 bg-[#C66A45]/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-2xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#202020] text-[#F7F3EA] text-xs font-bold">
            <span className="w-2 h-2 rounded-full bg-[#7B8062] animate-pulse" />
            LIVE PHYSICAL EVENT
          </div>

          <div>
            <h2 className="text-3xl sm:text-5xl font-black text-[#202020] tracking-tight">
              {event.name}
            </h2>
            <div className="flex flex-wrap items-center gap-3 mt-2 text-sm font-semibold text-[#686661]">
              <span className="flex items-center gap-1">
                <MapPin size={15} className="text-[#C66A45]" /> {event.venue}
              </span>
              <span>•</span>
              <span className="flex items-center gap-1">
                <Users size={15} className="text-[#7B8062]" /> {event.totalCheckedIn.toLocaleString()} people here
              </span>
            </div>
          </div>

          <p className="text-sm sm:text-base text-[#686661] leading-relaxed">
            {event.description}
          </p>

          <div className="pt-4 flex flex-wrap items-center gap-3">
            <button
              onClick={() => navigate(isCheckedIn ? '/intent' : '/checkin')}
              className="px-8 py-4 rounded-2xl bg-[#202020] hover:bg-[#151515] text-[#F7F3EA] font-extrabold text-base shadow-medium hover:shadow-elevated transition-all flex items-center gap-2 transform active:scale-98"
            >
              <span>{isCheckedIn ? 'ENTER EVENT' : 'CHECK IN WITH QR'}</span>
              <ArrowRight size={18} />
            </button>

            <button
              onClick={() => navigate('/radar')}
              className="px-6 py-4 rounded-2xl bg-[#F7F3EA] hover:bg-white text-[#202020] font-bold text-base border border-[#DFD8CB] shadow-soft transition-all flex items-center gap-2"
            >
              <Compass size={18} className="text-[#C66A45]" />
              Open Radar
            </button>
          </div>
        </div>
      </div>

      {/* Live Now Activities */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-xl sm:text-2xl font-black text-[#202020] tracking-tight">
              LIVE NOW
            </h3>
            <p className="text-xs sm:text-sm text-[#7B8062] font-semibold">
              Hotspots happening across campus right this second
            </p>
          </div>
          <button
            onClick={() => navigate('/map')}
            className="text-xs font-bold text-[#C66A45] hover:underline"
          >
            View Map & Zones →
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {event.activities.map((act) => {
            const Icon =
              act.icon === 'Camera'
                ? Camera
                : act.icon === 'Utensils'
                ? Utensils
                : act.icon === 'Music' || act.icon === 'Mic'
                ? Music
                : Gamepad2;

            return (
              <div
                key={act.id}
                onClick={() => navigate('/intent')}
                className="p-5 rounded-2xl bg-[#EFE8DC] border border-[#DFD8CB] hover:border-[#C66A45] transition-all cursor-pointer group shadow-soft hover:shadow-medium"
              >
                <div className="w-10 h-10 rounded-xl bg-[#F7F3EA] text-[#C66A45] flex items-center justify-center font-bold mb-3 group-hover:scale-105 transition-transform">
                  <Icon size={20} />
                </div>
                <div className="flex items-center justify-between text-[11px] font-bold text-[#7B8062] uppercase tracking-wider mb-1">
                  <span>{act.timeSlot}</span>
                  <span>{act.currentCount} joined</span>
                </div>
                <h4 className="text-base font-bold text-[#202020] group-hover:text-[#C66A45] transition-colors leading-snug">
                  {act.title}
                </h4>
                <p className="text-xs text-[#686661] mt-1.5 line-clamp-2">
                  {act.description}
                </p>
                {act.isSponsored && (
                  <span className="mt-3 inline-block text-[10px] font-bold text-[#DE835F] bg-[#C66A45]/15 px-2 py-0.5 rounded-full">
                    Sponsored by {act.sponsorName}
                  </span>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Core Philosophy Banner */}
      <div className="rounded-2xl bg-[#202020] text-[#F7F3EA] p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-6 shadow-medium">
        <div className="space-y-1 text-center md:text-left">
          <span className="text-xs font-bold uppercase tracking-widest text-[#DE835F]">
            The MOMENT Difference
          </span>
          <h4 className="text-xl sm:text-2xl font-black">
            Don't find people. Find your moment.
          </h4>
          <p className="text-xs sm:text-sm text-[#A3A3A3] max-w-xl">
            Intent → Context → People → Group → Experience → Memory. No awkward endless chatting, just real shared experiences in physical space.
          </p>
        </div>

        <button
          onClick={() => navigate('/intent')}
          className="px-6 py-3 rounded-full bg-[#C66A45] hover:bg-[#DE835F] text-white font-bold text-sm whitespace-nowrap transition-all shadow-soft"
        >
          Set My Current Intent
        </button>
      </div>
    </div>
  );
};
