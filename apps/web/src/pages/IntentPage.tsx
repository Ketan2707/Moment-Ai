import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Users,
  Compass,
  Camera,
  Utensils,
  Gamepad2,
  Tv,
  Briefcase,
  MessageCircle,
  Clock,
  BatteryCharging,
  Sparkles,
  ArrowRight,
  ArrowLeft,
  Check,
} from 'lucide-react';
import { PrimaryIntent, SocialEnergy } from '@moment/types';
import { useMoment } from '../context/MomentContext';

export const IntentPage: React.FC = () => {
  const navigate = useNavigate();
  const { updateIntent } = useMoment();

  const [step, setStep] = useState(1);
  const [selectedIntent, setSelectedIntent] = useState<PrimaryIntent>('explore');
  const [selectedTime, setSelectedTime] = useState<number>(45);
  const [selectedEnergy, setSelectedEnergy] = useState<SocialEnergy>('small_groups');
  const [selectedInterests, setSelectedInterests] = useState<string[]>([
    'Photography',
    'Music',
    'Coding',
  ]);

  const intentCards: { id: PrimaryIntent; label: string; icon: any; desc: string }[] = [
    { id: 'explore', label: 'Explore', icon: Compass, desc: 'Wander and discover hidden spots' },
    { id: 'photo', label: 'Photo Walk', icon: Camera, desc: 'Capture angles & take group shots' },
    { id: 'food', label: 'Grab Food', icon: Utensils, desc: 'Hit food trucks & taste treats' },
    { id: 'meet', label: 'Meet People', icon: Users, desc: 'Make new friends and connect' },
    { id: 'play', label: 'Play / Games', icon: Gamepad2, desc: 'Arcade, board games & fun' },
    { id: 'watch', label: 'Watch Shows', icon: Tv, desc: 'Acoustic acts & stage concerts' },
    { id: 'team', label: 'Find Team', icon: Briefcase, desc: 'Hackathon & project partners' },
    { id: 'talk', label: 'Just Talk', icon: MessageCircle, desc: 'Low-pressure casual conversation' },
    { id: 'network', label: 'Network', icon: Sparkles, desc: 'Career, tech & startup chats' },
  ];

  const timeOptions = [
    { value: 15, label: '15 min', desc: 'Quick coffee / photo sprint' },
    { value: 30, label: '30 min', desc: 'Solid single activity' },
    { value: 45, label: '45 min', desc: 'Full micro-experience (Recommended)' },
    { value: 60, label: '1 hour', desc: 'Multi-zone adventure' },
    { value: 120, label: '2+ hours', desc: 'Open-ended festival day' },
  ];

  const energyOptions: { id: SocialEnergy; label: string; desc: string; icon: string }[] = [
    { id: 'very_social', label: 'Very Social', desc: 'Hyped, loud, open to everyone', icon: '⚡' },
    { id: 'comfortable', label: 'Comfortable', desc: 'Easygoing, friendly, casual vibes', icon: '😊' },
    { id: 'small_groups', label: 'Small Groups', desc: 'Prefers 2-4 people max (Recommended)', icon: '👥' },
    { id: 'low_key', label: 'Low-key Chill', desc: 'Relaxed pacing, comfortable pauses', icon: '☕' },
    { id: 'observing', label: 'Mostly Observing', desc: 'Happy to tag along and watch', icon: '👀' },
  ];

  const availableInterests = [
    'Photography',
    'Music',
    'Gaming',
    'Coding',
    'Startups',
    'Food',
    'Travel',
    'Art',
    'Movies',
    'Design',
    'Anime',
    'Sports',
  ];

  const toggleInterest = (interest: string) => {
    if (selectedInterests.includes(interest)) {
      if (selectedInterests.length > 1) {
        setSelectedInterests(selectedInterests.filter((i) => i !== interest));
      }
    } else {
      setSelectedInterests([...selectedInterests, interest]);
    }
  };

  const handleFinish = async () => {
    await updateIntent({
      primaryIntent: selectedIntent,
      timeAvailableMinutes: selectedTime,
      socialEnergy: selectedEnergy,
      interests: selectedInterests,
    });
    navigate('/radar');
  };

  return (
    <div className="max-w-2xl mx-auto px-4 py-8 sm:py-12">
      {/* Progress Pills */}
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-2">
          {[1, 2, 3, 4].map((s) => (
            <div
              key={s}
              className={`h-2 rounded-full transition-all duration-300 ${
                s === step
                  ? 'w-8 bg-[#C66A45]'
                  : s < step
                  ? 'w-4 bg-[#7B8062]'
                  : 'w-4 bg-[#DFD8CB]'
              }`}
            />
          ))}
        </div>
        <span className="text-xs font-bold text-[#686661] uppercase tracking-wider">
          Step {step} of 4
        </span>
      </div>

      {/* Step 1: Intent */}
      {step === 1 && (
        <div className="space-y-6 animate-fadeIn">
          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-[#7B8062]">
              Current Intention
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-[#202020] tracking-tight mt-1">
              What do you feel like doing right now?
            </h2>
            <p className="text-xs sm:text-sm text-[#686661] mt-1">
              Choose your present focus. MOMENT matches you with people in sync right this minute.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {intentCards.map((card) => {
              const Icon = card.icon;
              const isSelected = selectedIntent === card.id;
              return (
                <div
                  key={card.id}
                  onClick={() => setSelectedIntent(card.id)}
                  className={`p-4 rounded-2xl border cursor-pointer transition-all ${
                    isSelected
                      ? 'bg-[#202020] text-[#F7F3EA] border-[#202020] shadow-medium scale-[1.02]'
                      : 'bg-[#EFE8DC] text-[#202020] border-[#DFD8CB] hover:border-[#C66A45]'
                  }`}
                >
                  <div
                    className={`w-9 h-9 rounded-xl flex items-center justify-center font-bold mb-2.5 ${
                      isSelected
                        ? 'bg-[#C66A45] text-white'
                        : 'bg-[#F7F3EA] text-[#C66A45]'
                    }`}
                  >
                    <Icon size={18} />
                  </div>
                  <h4 className="font-extrabold text-sm tracking-tight">{card.label}</h4>
                  <p
                    className={`text-[11px] mt-0.5 line-clamp-1 ${
                      isSelected ? 'text-[#EFE8DC]' : 'text-[#686661]'
                    }`}
                  >
                    {card.desc}
                  </p>
                </div>
              );
            })}
          </div>

          <button
            onClick={() => setStep(2)}
            className="w-full py-4 rounded-2xl bg-[#C66A45] hover:bg-[#A65230] text-white font-extrabold text-base shadow-medium flex items-center justify-center gap-2 transform active:scale-98 transition-all"
          >
            <span>Next: Available Time</span>
            <ArrowRight size={18} />
          </button>
        </div>
      )}

      {/* Step 2: Time */}
      {step === 2 && (
        <div className="space-y-6 animate-fadeIn">
          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-[#7B8062]">
              Time Budget
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-[#202020] tracking-tight mt-1">
              How much time do you have?
            </h2>
            <p className="text-xs sm:text-sm text-[#686661] mt-1">
              Experiences automatically calibrate their duration to avoid disrupting your schedule.
            </p>
          </div>

          <div className="space-y-3">
            {timeOptions.map((opt) => {
              const isSelected = selectedTime === opt.value;
              return (
                <div
                  key={opt.value}
                  onClick={() => setSelectedTime(opt.value)}
                  className={`p-4 rounded-2xl border cursor-pointer flex items-center justify-between transition-all ${
                    isSelected
                      ? 'bg-[#202020] text-[#F7F3EA] border-[#202020] shadow-medium scale-[1.01]'
                      : 'bg-[#EFE8DC] text-[#202020] border-[#DFD8CB] hover:border-[#C66A45]'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-10 h-10 rounded-xl flex items-center justify-center font-bold ${
                        isSelected
                          ? 'bg-[#C66A45] text-white'
                          : 'bg-[#F7F3EA] text-[#202020]'
                      }`}
                    >
                      <Clock size={18} />
                    </div>
                    <div>
                      <h4 className="font-extrabold text-base">{opt.label}</h4>
                      <p
                        className={`text-xs ${
                          isSelected ? 'text-[#EFE8DC]' : 'text-[#686661]'
                        }`}
                      >
                        {opt.desc}
                      </p>
                    </div>
                  </div>
                  {isSelected && (
                    <div className="w-6 h-6 rounded-full bg-[#C66A45] text-white flex items-center justify-center">
                      <Check size={14} />
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          <div className="flex gap-3">
            <button
              onClick={() => setStep(1)}
              className="py-4 px-6 rounded-2xl bg-[#EFE8DC] hover:bg-[#E4DDD0] text-[#202020] font-bold text-sm border border-[#DFD8CB] transition-all flex items-center gap-1"
            >
              <ArrowLeft size={16} /> Back
            </button>
            <button
              onClick={() => setStep(3)}
              className="flex-1 py-4 rounded-2xl bg-[#C66A45] hover:bg-[#A65230] text-white font-extrabold text-base shadow-medium flex items-center justify-center gap-2 transform active:scale-98 transition-all"
            >
              <span>Next: Social Energy</span>
              <ArrowRight size={18} />
            </button>
          </div>
        </div>
      )}

      {/* Step 3: Social Energy */}
      {step === 3 && (
        <div className="space-y-6 animate-fadeIn">
          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-[#7B8062]">
              Social Bandwidth
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-[#202020] tracking-tight mt-1">
              What's your social energy right now?
            </h2>
            <p className="text-xs sm:text-sm text-[#686661] mt-1">
              No pressure to perform. MOMENT groups you with people whose social rhythm aligns with yours.
            </p>
          </div>

          <div className="space-y-3">
            {energyOptions.map((opt) => {
              const isSelected = selectedEnergy === opt.id;
              return (
                <div
                  key={opt.id}
                  onClick={() => setSelectedEnergy(opt.id)}
                  className={`p-4 rounded-2xl border cursor-pointer flex items-center justify-between transition-all ${
                    isSelected
                      ? 'bg-[#202020] text-[#F7F3EA] border-[#202020] shadow-medium scale-[1.01]'
                      : 'bg-[#EFE8DC] text-[#202020] border-[#DFD8CB] hover:border-[#C66A45]'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">{opt.icon}</span>
                    <div>
                      <h4 className="font-extrabold text-base">{opt.label}</h4>
                      <p
                        className={`text-xs ${
                          isSelected ? 'text-[#EFE8DC]' : 'text-[#686661]'
                        }`}
                      >
                        {opt.desc}
                      </p>
                    </div>
                  </div>
                  {isSelected && (
                    <div className="w-6 h-6 rounded-full bg-[#C66A45] text-white flex items-center justify-center">
                      <Check size={14} />
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          <div className="flex gap-3">
            <button
              onClick={() => setStep(2)}
              className="py-4 px-6 rounded-2xl bg-[#EFE8DC] hover:bg-[#E4DDD0] text-[#202020] font-bold text-sm border border-[#DFD8CB] transition-all flex items-center gap-1"
            >
              <ArrowLeft size={16} /> Back
            </button>
            <button
              onClick={() => setStep(4)}
              className="flex-1 py-4 rounded-2xl bg-[#C66A45] hover:bg-[#A65230] text-white font-extrabold text-base shadow-medium flex items-center justify-center gap-2 transform active:scale-98 transition-all"
            >
              <span>Next: Your Interests</span>
              <ArrowRight size={18} />
            </button>
          </div>
        </div>
      )}

      {/* Step 4: Interests */}
      {step === 4 && (
        <div className="space-y-6 animate-fadeIn">
          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-[#7B8062]">
              Shared Passion Points
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-[#202020] tracking-tight mt-1">
              What are you into today?
            </h2>
            <p className="text-xs sm:text-sm text-[#686661] mt-1">
              Select 2-4 topics for conversation starters and route planning.
            </p>
          </div>

          <div className="flex flex-wrap gap-2.5">
            {availableInterests.map((interest) => {
              const isSelected = selectedInterests.includes(interest);
              return (
                <button
                  key={interest}
                  type="button"
                  onClick={() => toggleInterest(interest)}
                  className={`px-4 py-2.5 rounded-full text-sm font-bold border transition-all ${
                    isSelected
                      ? 'bg-[#202020] text-[#F7F3EA] border-[#202020] shadow-soft scale-105'
                      : 'bg-[#EFE8DC] text-[#202020] border-[#DFD8CB] hover:border-[#C66A45]'
                  }`}
                >
                  {interest} {isSelected && '✓'}
                </button>
              );
            })}
          </div>

          <div className="flex gap-3 pt-4">
            <button
              onClick={() => setStep(3)}
              className="py-4 px-6 rounded-2xl bg-[#EFE8DC] hover:bg-[#E4DDD0] text-[#202020] font-bold text-sm border border-[#DFD8CB] transition-all flex items-center gap-1"
            >
              <ArrowLeft size={16} /> Back
            </button>
            <button
              onClick={handleFinish}
              className="flex-1 py-4 rounded-2xl bg-[#C66A45] hover:bg-[#A65230] text-white font-extrabold text-base shadow-medium flex items-center justify-center gap-2 transform active:scale-98 transition-all"
            >
              <Sparkles size={18} />
              <span>LAUNCH RADAR DISCOVERY</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
