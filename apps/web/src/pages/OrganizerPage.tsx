import React, { useState, useEffect } from 'react';
import {
  Users,
  Sparkles,
  Trophy,
  Flame,
  Clock,
  MapPin,
  Plus,
  CheckCircle2,
  BarChart3,
  QrCode,
  ShieldCheck,
} from 'lucide-react';
import { OrganizerAnalytics } from '@moment/types';
import { momentApi } from '../services/api';

export const OrganizerPage: React.FC = () => {
  const [analytics, setAnalytics] = useState<OrganizerAnalytics | null>(null);
  const [showAddActivityModal, setShowAddActivityModal] = useState(false);
  const [activityTitle, setActivityTitle] = useState('');
  const [sponsorName, setSponsorName] = useState('');
  const [sponsorReward, setSponsorReward] = useState('');

  useEffect(() => {
    momentApi.getOrganizerAnalytics().then((res) => setAnalytics(res.analytics));
  }, []);

  const handleCreateActivity = (e: React.FormEvent) => {
    e.preventDefault();
    alert('Activity created! Propagated to all attendee feeds.');
    setShowAddActivityModal(false);
  };

  if (!analytics) return null;

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 sm:py-12 space-y-8 animate-fadeIn">
      {/* Title */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-bold uppercase tracking-widest text-[#7B8062]">
            Event Operations Portal
          </span>
          <h1 className="text-3xl sm:text-4xl font-black text-[#202020] tracking-tight mt-1">
            Organizer Dashboard — {analytics.eventName}
          </h1>
          <p className="text-xs sm:text-sm text-[#686661] mt-1">
            Live attendee velocity, zone telemetry, and sponsored experience orchestration.
          </p>
        </div>

        <button
          onClick={() => setShowAddActivityModal(true)}
          className="px-5 py-3 rounded-2xl bg-[#C66A45] hover:bg-[#A65230] text-white font-bold text-sm shadow-soft hover:shadow-medium transition-all flex items-center gap-2 self-start sm:self-auto"
        >
          <Plus size={16} /> Add Zone Activity
        </button>
      </div>

      {/* Top Metric Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
        <div className="p-5 rounded-2xl bg-[#EFE8DC] border border-[#DFD8CB] shadow-soft">
          <span className="text-[11px] font-bold uppercase tracking-wider text-[#7B8062] block">
            Total Checked In
          </span>
          <span className="text-2xl sm:text-3xl font-black text-[#202020] mt-1 block">
            {analytics.checkedIn.toLocaleString()}
          </span>
          <span className="text-[10px] font-bold text-[#7B8062] mt-0.5 block">
            Gate verified QR
          </span>
        </div>

        <div className="p-5 rounded-2xl bg-[#EFE8DC] border border-[#DFD8CB] shadow-soft">
          <span className="text-[11px] font-bold uppercase tracking-wider text-[#7B8062] block">
            Active Right Now
          </span>
          <span className="text-2xl sm:text-3xl font-black text-[#C66A45] mt-1 block">
            {analytics.activeNow.toLocaleString()}
          </span>
          <span className="text-[10px] font-bold text-[#DE835F] mt-0.5 block flex items-center gap-1">
            <Flame size={11} fill="currentColor" /> Peak: {analytics.peakTime}
          </span>
        </div>

        <div className="p-5 rounded-2xl bg-[#EFE8DC] border border-[#DFD8CB] shadow-soft">
          <span className="text-[11px] font-bold uppercase tracking-wider text-[#7B8062] block">
            Connections Made
          </span>
          <span className="text-2xl sm:text-3xl font-black text-[#202020] mt-1 block">
            {analytics.connectionsCount.toLocaleString()}
          </span>
          <span className="text-[10px] font-semibold text-[#686661] mt-0.5 block">
            Mutual waves accepted
          </span>
        </div>

        <div className="p-5 rounded-2xl bg-[#EFE8DC] border border-[#DFD8CB] shadow-soft">
          <span className="text-[11px] font-bold uppercase tracking-wider text-[#7B8062] block">
            Moments Formed
          </span>
          <span className="text-2xl sm:text-3xl font-black text-[#202020] mt-1 block">
            {analytics.momentsFormed}
          </span>
          <span className="text-[10px] font-semibold text-[#686661] mt-0.5 block">
            Avg size: 3.2 people
          </span>
        </div>

        <div className="p-5 rounded-2xl bg-[#EFE8DC] border border-[#DFD8CB] shadow-soft">
          <span className="text-[11px] font-bold uppercase tracking-wider text-[#7B8062] block">
            Challenges Done
          </span>
          <span className="text-2xl sm:text-3xl font-black text-[#7B8062] mt-1 block">
            {analytics.challengesCompleted}
          </span>
          <span className="text-[10px] font-semibold text-[#686661] mt-0.5 block">
            Photo & task solves
          </span>
        </div>
      </div>

      {/* Zone Crowd Distribution Breakdown */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-[#EFE8DC] rounded-3xl p-6 sm:p-8 border border-[#DFD8CB] shadow-soft space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-xl font-black text-[#202020] tracking-tight">
                Real-Time Zone Density
              </h3>
              <p className="text-xs text-[#686661]">
                Attendee distribution without individual GPS tracking
              </p>
            </div>
            <span className="text-xs font-bold text-[#C66A45] bg-[#C66A45]/15 px-3 py-1 rounded-full">
              Hottest: {analytics.mostActiveZone}
            </span>
          </div>

          <div className="space-y-3 pt-2">
            {analytics.zoneActivity.map((z, idx) => (
              <div key={idx} className="space-y-1">
                <div className="flex items-center justify-between text-xs font-bold text-[#202020]">
                  <span>{z.zone}</span>
                  <span className="text-[#686661]">
                    {z.count} attendees ({z.crowdLevel})
                  </span>
                </div>
                <div className="w-full h-3 rounded-full bg-[#DFD8CB] overflow-hidden">
                  <div
                    className="h-full rounded-full bg-[#C66A45]"
                    style={{ width: `${Math.min(100, (z.count / 700) * 100)}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Sponsor Experience Card */}
        <div className="bg-[#202020] text-[#F7F3EA] rounded-3xl p-6 sm:p-8 shadow-soft flex flex-col justify-between space-y-4">
          <div>
            <span className="text-[11px] font-bold text-[#DE835F] uppercase tracking-wider block">
              Sponsor Moment Engine
            </span>
            <h4 className="text-xl font-black mt-1">
              Active Sponsor: GitHub Campus
            </h4>
            <p className="text-xs text-[#A3A3A3] mt-2 leading-relaxed">
              "Find 3 people with different skillsets and build a 5-minute prototype concept. Reward: Exclusive Dev Kits & Credits."
            </p>
          </div>

          <div className="bg-[#151515] p-4 rounded-2xl border border-[#2A2A2A] text-xs space-y-1">
            <div className="flex justify-between">
              <span className="text-[#A3A3A3]">Teams Completed:</span>
              <span className="font-bold text-[#F7F3EA]">38 teams</span>
            </div>
            <div className="flex justify-between">
              <span className="text-[#A3A3A3]">Merchandise Claimed:</span>
              <span className="font-bold text-[#DE835F]">114 items</span>
            </div>
          </div>

          <button
            onClick={() => setShowAddActivityModal(true)}
            className="w-full py-3 rounded-xl bg-[#C66A45] hover:bg-[#A65230] text-white text-xs font-bold transition-all shadow-soft"
          >
            Create New Sponsor Challenge
          </button>
        </div>
      </div>

      {/* Add Activity Modal */}
      {showAddActivityModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-charcoal-900/60 backdrop-blur-sm animate-fadeIn">
          <div className="w-full max-w-md bg-[#F7F3EA] rounded-3xl border border-[#DFD8CB] p-6 shadow-elevated space-y-4">
            <h3 className="text-xl font-black text-[#202020]">
              Deploy Zone Flash Activity
            </h3>

            <form onSubmit={handleCreateActivity} className="space-y-4">
              <div>
                <label className="text-xs font-bold text-[#686661] block mb-1">
                  Activity Title
                </label>
                <input
                  type="text"
                  placeholder="e.g. Red Bull VR Speed Run"
                  value={activityTitle}
                  onChange={(e) => setActivityTitle(e.target.value)}
                  className="w-full px-4 py-3 rounded-2xl bg-[#EFE8DC] border border-[#DFD8CB] text-sm text-[#202020]"
                  required
                />
              </div>

              <div>
                <label className="text-xs font-bold text-[#686661] block mb-1">
                  Sponsor Name (Optional)
                </label>
                <input
                  type="text"
                  placeholder="e.g. Red Bull / Spotify"
                  value={sponsorName}
                  onChange={(e) => setSponsorName(e.target.value)}
                  className="w-full px-4 py-3 rounded-2xl bg-[#EFE8DC] border border-[#DFD8CB] text-sm text-[#202020]"
                />
              </div>

              <div className="flex gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowAddActivityModal(false)}
                  className="flex-1 py-3 rounded-xl bg-[#EFE8DC] text-[#686661] font-bold text-xs"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 py-3 rounded-xl bg-[#C66A45] text-white font-bold text-xs shadow-soft"
                >
                  Publish Flash Activity
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
