import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { QrCode, CheckCircle2, Sparkles, ArrowRight, Camera, ShieldCheck } from 'lucide-react';
import { useMoment } from '../context/MomentContext';

export const CheckInPage: React.FC = () => {
  const navigate = useNavigate();
  const { event, checkIn } = useMoment();
  const [scanned, setScanned] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleDemoCheckIn = async () => {
    setLoading(true);
    await checkIn(true);
    setScanned(true);
    setLoading(false);
  };

  return (
    <div className="max-w-xl mx-auto px-4 py-12 text-center space-y-8">
      <div>
        <span className="text-xs font-bold uppercase tracking-widest text-[#7B8062]">
          Physical Presence Verification
        </span>
        <h1 className="text-3xl sm:text-4xl font-black text-[#202020] tracking-tight mt-1">
          Check Into {event.name}
        </h1>
        <p className="text-sm text-[#686661] mt-2">
          MOMENT connects people who are physically here right now. Scan the gate QR code or use Instant Demo check-in.
        </p>
      </div>

      {!scanned ? (
        <div className="bg-[#EFE8DC] border border-[#DFD8CB] rounded-3xl p-8 shadow-soft space-y-6">
          {/* Simulated Scanner Viewport */}
          <div className="relative w-64 h-64 mx-auto rounded-2xl bg-[#202020] border-4 border-dashed border-[#C66A45]/70 flex flex-col items-center justify-center text-white overflow-hidden shadow-inner">
            <div className="absolute inset-x-0 h-1 bg-[#DE835F] shadow-lg animate-bounce" />
            <QrCode size={80} className="text-[#EFE8DC]/80" />
            <span className="text-xs font-bold text-[#EFE8DC] mt-4 tracking-wide">
              Scan TechFest Gate Code
            </span>
            <span className="text-[10px] text-[#A3A3A3] mt-0.5">
              Approximate geofence verified
            </span>
          </div>

          <div className="space-y-3 pt-2">
            <button
              onClick={handleDemoCheckIn}
              disabled={loading}
              className="w-full py-4 px-6 rounded-2xl bg-[#C66A45] hover:bg-[#A65230] text-white font-extrabold text-base shadow-medium hover:shadow-elevated transition-all flex items-center justify-center gap-2 transform active:scale-98"
            >
              <Sparkles size={18} />
              {loading ? 'Verifying...' : 'Use Demo Event (Instant Check-In)'}
            </button>

            <p className="text-xs text-[#7B8062] flex items-center justify-center gap-1 font-semibold">
              <ShieldCheck size={14} /> One-click evaluator verification enabled
            </p>
          </div>
        </div>
      ) : (
        /* Verified Welcome Screen */
        <div className="bg-[#EFE8DC] border-2 border-[#7B8062] rounded-3xl p-8 shadow-elevated space-y-6 animate-scaleUp">
          <div className="w-16 h-16 rounded-full bg-[#7B8062]/20 text-[#7B8062] mx-auto flex items-center justify-center font-bold">
            <CheckCircle2 size={36} />
          </div>

          <div className="space-y-1">
            <span className="text-xs font-bold text-[#7B8062] uppercase tracking-wider">
              Event Verified ✓
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-[#202020] tracking-tight">
              WELCOME TO {event.name.toUpperCase()}!
            </h2>
            <p className="text-xs sm:text-sm text-[#686661]">
              You are checked in with 2,304 active attendees at {event.venue}.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-white/70 border border-[#DFD8CB] text-left text-xs space-y-1.5 text-[#202020]">
            <div className="flex justify-between font-bold">
              <span>Current Zone:</span>
              <span className="text-[#C66A45]">Photography Zone</span>
            </div>
            <div className="flex justify-between font-bold">
              <span>Radar Status:</span>
              <span className="text-[#7B8062]">Active & Discoverable</span>
            </div>
          </div>

          <button
            onClick={() => navigate('/intent')}
            className="w-full py-4 px-6 rounded-2xl bg-[#202020] hover:bg-[#151515] text-[#F7F3EA] font-extrabold text-base shadow-medium flex items-center justify-center gap-2 transform active:scale-98 transition-all"
          >
            <span>SET YOUR MOMENT INTENT</span>
            <ArrowRight size={18} />
          </button>
        </div>
      )}
    </div>
  );
};
