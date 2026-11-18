import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Clock,
  MapPin,
  CheckCircle2,
  Sparkles,
  RefreshCw,
  MessageSquare,
  Users,
  Camera,
  Utensils,
  Music,
  ArrowRight,
  AlertCircle,
  Trophy,
} from 'lucide-react';
import { useMoment } from '../context/MomentContext';

export const ActiveMomentPage: React.FC = () => {
  const navigate = useNavigate();
  const {
    activeMoment,
    replanMoment,
    getConversationRescue,
    completeChallenge,
    concludeMoment,
    currentUser,
  } = useMoment();

  const [secondsRemaining, setSecondsRemaining] = useState(32 * 60 + 14); // 32:14
  const [rescuePrompt, setRescuePrompt] = useState<string | null>(null);
  const [replanning, setReplanning] = useState(false);
  const [concluding, setConcluding] = useState(false);
  const [crowdAlert, setCrowdAlert] = useState<string | null>(
    'The Food Court is getting busy with live dinner queues. Want to route to the express tasting stalls?'
  );

  useEffect(() => {
    const timer = setInterval(() => {
      setSecondsRemaining((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTimer = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  const handleRescue = async () => {
    const prompt = await getConversationRescue();
    setRescuePrompt(prompt);
  };

  const handleReplan = async () => {
    setReplanning(true);
    await replanMoment();
    setCrowdAlert(null);
    setReplanning(false);
  };

  const handleConclude = async () => {
    setConcluding(true);
    const memory = await concludeMoment();
    setConcluding(false);
    navigate('/memories');
  };

  if (!activeMoment) {
    return (
      <div className="max-w-xl mx-auto px-4 py-16 text-center space-y-6">
        <div className="w-16 h-16 rounded-full bg-[#EFE8DC] text-[#7B8062] mx-auto flex items-center justify-center font-bold">
          <Clock size={32} />
        </div>
        <h2 className="text-2xl font-black text-[#202020]">
          No Moment Currently Active
        </h2>
        <p className="text-sm text-[#686661]">
          Head over to the Radar to connect with someone nearby and build a custom experience!
        </p>
        <button
          onClick={() => navigate('/radar')}
          className="px-6 py-3 rounded-2xl bg-[#C66A45] text-white font-bold text-sm shadow-soft hover:shadow-medium transition-all"
        >
          Open Moment Radar
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-6 sm:py-10 space-y-8 animate-fadeIn">
      {/* Header Banner */}
      <div className="bg-[#202020] text-[#F7F3EA] rounded-3xl p-6 sm:p-8 shadow-elevated relative overflow-hidden">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[#DE835F] animate-ping" />
              <span className="text-xs font-bold uppercase tracking-widest text-[#DE835F]">
                Moment In Progress
              </span>
            </div>
            <h1 className="text-2xl sm:text-4xl font-black mt-1 tracking-tight">
              {activeMoment.title}
            </h1>
            <p className="text-xs sm:text-sm text-[#A3A3A3] mt-1">
              Quiet AI social director is keeping everyone in flow.
            </p>
          </div>

          {/* Countdown Clock */}
          <div className="bg-[#151515] border border-[#2A2A2A] rounded-2xl px-5 py-3 text-center sm:text-right shadow-inner">
            <span className="text-[10px] font-bold text-[#A3A3A3] uppercase tracking-wider block">
              Time Remaining
            </span>
            <span className="text-3xl font-black text-[#F7F3EA] tracking-mono font-mono">
              {formatTimer(secondsRemaining)}
            </span>
          </div>
        </div>

        {/* Group Participants */}
        <div className="mt-6 pt-5 border-t border-[#2A2A2A] flex flex-wrap items-center gap-3">
          <span className="text-xs font-bold text-[#A3A3A3]">Moment Squad:</span>
          {activeMoment.members.map((m, idx) => (
            <div
              key={idx}
              className="flex items-center gap-1.5 bg-[#2A2A2A] px-2.5 py-1 rounded-full text-xs font-medium"
            >
              <img
                src={m.avatar}
                alt={m.name}
                className="w-5 h-5 rounded-full object-cover"
              />
              <span>{m.id === currentUser.id ? 'You' : m.name}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Dynamic AI Crowd Alert / Replanning */}
      {crowdAlert && (
        <div className="bg-[#EFE8DC] border-2 border-[#C66A45] rounded-2xl p-5 shadow-soft flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-start gap-3">
            <div className="p-2 rounded-xl bg-[#C66A45]/15 text-[#C66A45] mt-0.5">
              <AlertCircle size={20} />
            </div>
            <div>
              <span className="text-xs font-bold text-[#C66A45] uppercase tracking-wide">
                Live Zone Intelligence
              </span>
              <p className="text-sm font-bold text-[#202020] mt-0.5">
                {crowdAlert}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 self-end sm:self-auto">
            <button
              onClick={handleReplan}
              disabled={replanning}
              className="px-4 py-2 rounded-xl bg-[#C66A45] hover:bg-[#A65230] text-white text-xs font-bold transition-all flex items-center gap-1 shadow-soft"
            >
              <RefreshCw size={12} className={replanning ? 'animate-spin' : ''} />
              {replanning ? 'Adapting...' : "Let's Go (Replan Route)"}
            </button>
            <button
              onClick={() => setCrowdAlert(null)}
              className="px-3 py-2 rounded-xl bg-white text-[#686661] text-xs font-bold hover:text-[#202020]"
            >
              Stay on Track
            </button>
          </div>
        </div>
      )}

      {/* Route Stops Progression */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-xl font-black text-[#202020] tracking-tight">
            Experience Route
          </h3>
          <span className="text-xs font-semibold text-[#7B8062]">
            Adaptive micro-stops
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {activeMoment.stops.map((stop, index) => {
            const isCurrent = stop.status === 'current';
            const isCompleted = stop.status === 'completed';

            return (
              <div
                key={stop.id}
                className={`p-5 rounded-2xl border transition-all ${
                  isCurrent
                    ? 'bg-[#EFE8DC] border-2 border-[#C66A45] shadow-medium'
                    : 'bg-[#F7F3EA] border-[#DFD8CB]'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <span
                    className={`text-[11px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full ${
                      isCurrent
                        ? 'bg-[#C66A45] text-white'
                        : 'bg-[#DFD8CB] text-[#686661]'
                    }`}
                  >
                    Stop {index + 1} • {stop.walkTimeMinutes}m walk
                  </span>
                  {isCurrent && (
                    <span className="text-xs font-bold text-[#C66A45] animate-pulse">
                      Live Stop
                    </span>
                  )}
                </div>

                <h4 className="text-base font-extrabold text-[#202020]">{stop.title}</h4>
                <div className="flex items-center gap-1 text-xs font-bold text-[#7B8062] mt-1">
                  <MapPin size={12} /> {stop.zoneName}
                </div>
                <p className="text-xs text-[#686661] mt-2 line-clamp-2">
                  {stop.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>

      {/* Group Challenge Card */}
      <div className="bg-[#EFE8DC] border border-[#DFD8CB] rounded-3xl p-6 sm:p-8 shadow-soft space-y-4">
        <div className="flex items-start justify-between gap-4">
          <div>
            <span className="inline-flex items-center gap-1 text-xs font-bold text-[#C66A45] uppercase tracking-wider">
              <Trophy size={14} /> Today's Shared Challenge
            </span>
            <h3 className="text-2xl font-black text-[#202020] tracking-tight mt-1">
              {activeMoment.challenge.title}
            </h3>
            <p className="text-sm text-[#686661] mt-1">
              {activeMoment.challenge.description}
            </p>
          </div>

          <div className="text-right">
            <span className="inline-block px-3 py-1 rounded-full bg-[#7B8062]/20 text-[#7B8062] text-xs font-bold">
              +{activeMoment.challenge.rewardXP} XP
            </span>
          </div>
        </div>

        <div className="pt-2 flex flex-wrap items-center gap-3">
          {activeMoment.challenge.completed ? (
            <div className="inline-flex items-center gap-2 px-5 py-3 rounded-2xl bg-[#7B8062] text-white font-bold text-sm shadow-soft">
              <CheckCircle2 size={18} /> Challenge Completed! (+250 XP Awarded)
            </div>
          ) : (
            <button
              onClick={completeChallenge}
              className="px-6 py-3.5 rounded-2xl bg-[#202020] hover:bg-[#151515] text-[#F7F3EA] font-bold text-sm shadow-soft hover:shadow-medium transition-all flex items-center gap-2 transform active:scale-98"
            >
              <Camera size={16} className="text-[#DE835F]" />
              Snap & Mark Challenge Done
            </button>
          )}

          {/* Conversation Rescue Button */}
          <button
            onClick={handleRescue}
            className="px-4 py-3 rounded-2xl bg-[#F7F3EA] hover:bg-white text-[#202020] font-bold text-sm border border-[#DFD8CB] transition-all flex items-center gap-2"
          >
            <MessageSquare size={16} className="text-[#7B8062]" />
            Conversation Rescue
          </button>
        </div>

        {/* Conversation Rescue Popover */}
        {rescuePrompt && (
          <div className="mt-4 p-4 rounded-2xl bg-white border border-[#DFD8CB] text-sm text-[#202020] shadow-soft animate-fadeIn flex items-center justify-between gap-4">
            <div>
              <span className="text-[10px] font-bold text-[#7B8062] uppercase tracking-wide block">
                Non-Awkward Topic Prompt:
              </span>
              <p className="font-bold text-[#202020] mt-0.5">"{rescuePrompt}"</p>
            </div>
            <button
              onClick={() => setRescuePrompt(null)}
              className="text-xs text-[#686661] hover:text-[#202020]"
            >
              Got it
            </button>
          </div>
        )}
      </div>

      {/* Conclude Moment Action */}
      <div className="pt-4 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-[#DFD8CB]">
        <div className="text-xs text-[#686661]">
          Ready to wrap up? AI will synthesize photos, stops, and challenges into a lasting recap.
        </div>

        <button
          onClick={handleConclude}
          disabled={concluding}
          className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-[#C66A45] hover:bg-[#A65230] text-white font-extrabold text-base shadow-medium hover:shadow-elevated transition-all flex items-center justify-center gap-2 transform active:scale-98"
        >
          <Sparkles size={18} />
          {concluding ? 'Crafting Memory...' : 'CONCLUDE MOMENT & VIEW MEMORY'}
          <ArrowRight size={18} />
        </button>
      </div>
    </div>
  );
};
