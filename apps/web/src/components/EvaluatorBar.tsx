import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Sparkles, RotateCcw, ChevronRight, Play } from 'lucide-react';
import { useMoment } from '../context/MomentContext';

export const EvaluatorBar: React.FC = () => {
  const navigate = useNavigate();
  const {
    checkIn,
    sendWave,
    buildMomentExperience,
    concludeMoment,
    resetDemoState,
    radarUsers,
  } = useMoment();

  const handleStepWave = async () => {
    navigate('/radar');
    // wave to Rahul (u-rahul)
    await sendWave('u-rahul');
  };

  const handleStepGroup = async () => {
    await buildMomentExperience();
    navigate('/active-moment');
  };

  const handleStepMemory = async () => {
    await concludeMoment();
    navigate('/memories');
  };

  return (
    <div className="bg-[#202020] text-[#F7F3EA] border-b border-[#2A2A2A] px-4 py-2 text-xs">
      <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <span className="inline-flex items-center gap-1 font-bold text-[#DE835F] uppercase tracking-wider text-[10px] bg-[#C66A45]/20 px-2 py-0.5 rounded-full border border-[#C66A45]/40">
            <Sparkles size={11} /> Hackathon Evaluator Quick-Play
          </span>
          <span className="text-[#A3A3A3] hidden sm:inline">
            Fast-forward through the core 7-step loop:
          </span>
        </div>

        <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-0.5">
          <button
            onClick={() => {
              checkIn(true);
              navigate('/checkin');
            }}
            className="px-2.5 py-1 rounded bg-[#2A2A2A] hover:bg-[#383838] text-[#F7F3EA] font-medium transition-colors whitespace-nowrap"
          >
            1. Check-In
          </button>
          <span className="text-[#525252]">›</span>
          <button
            onClick={() => navigate('/intent')}
            className="px-2.5 py-1 rounded bg-[#2A2A2A] hover:bg-[#383838] text-[#F7F3EA] font-medium transition-colors whitespace-nowrap"
          >
            2. Intent
          </button>
          <span className="text-[#525252]">›</span>
          <button
            onClick={() => navigate('/radar')}
            className="px-2.5 py-1 rounded bg-[#2A2A2A] hover:bg-[#383838] text-[#F7F3EA] font-medium transition-colors whitespace-nowrap"
          >
            3. Radar
          </button>
          <span className="text-[#525252]">›</span>
          <button
            onClick={handleStepWave}
            className="px-2.5 py-1 rounded bg-[#C66A45] hover:bg-[#A65230] text-white font-semibold transition-colors whitespace-nowrap flex items-center gap-1 shadow-sm"
          >
            <Play size={10} fill="currentColor" /> 4. Wave Rahul 👋
          </button>
          <span className="text-[#525252]">›</span>
          <button
            onClick={handleStepGroup}
            className="px-2.5 py-1 rounded bg-[#2A2A2A] hover:bg-[#383838] text-[#F7F3EA] font-medium transition-colors whitespace-nowrap"
          >
            5. Group (4)
          </button>
          <span className="text-[#525252]">›</span>
          <button
            onClick={() => navigate('/active-moment')}
            className="px-2.5 py-1 rounded bg-[#2A2A2A] hover:bg-[#383838] text-[#F7F3EA] font-medium transition-colors whitespace-nowrap"
          >
            6. Moment
          </button>
          <span className="text-[#525252]">›</span>
          <button
            onClick={handleStepMemory}
            className="px-2.5 py-1 rounded bg-[#2A2A2A] hover:bg-[#383838] text-[#F7F3EA] font-medium transition-colors whitespace-nowrap"
          >
            7. Memory
          </button>

          <button
            onClick={resetDemoState}
            title="Reset to fresh demo state"
            className="ml-2 px-2 py-1 rounded bg-[#151515] hover:bg-[#2A2A2A] text-[#A3A3A3] hover:text-[#F7F3EA] transition-colors flex items-center gap-1 border border-[#383838]"
          >
            <RotateCcw size={11} /> Reset
          </button>
        </div>
      </div>
    </div>
  );
};
