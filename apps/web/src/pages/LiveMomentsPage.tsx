import React, { useState } from 'react';
import { Users, Clock, MapPin, Plus, Sparkles, Check } from 'lucide-react';
import { useMoment } from '../context/MomentContext';

export const LiveMomentsPage: React.FC = () => {
  const { liveMoments, joinLiveMoment, createLiveMoment, currentUser } = useMoment();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newCategory, setNewCategory] = useState('Photography');
  const [newZone, setNewZone] = useState('Photography Zone');

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim()) return;
    await createLiveMoment(newTitle, newCategory, newZone);
    setNewTitle('');
    setIsModalOpen(false);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 sm:py-12 space-y-8 animate-fadeIn">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-bold uppercase tracking-widest text-[#7B8062]">
            Ephemeral Public Requests
          </span>
          <h1 className="text-3xl sm:text-4xl font-black text-[#202020] tracking-tight mt-1">
            Live Moments Board
          </h1>
          <p className="text-xs sm:text-sm text-[#686661] mt-1">
            Broadcast a quick 30-minute invite to anyone in your zone. Auto-expires when done.
          </p>
        </div>

        <button
          onClick={() => setIsModalOpen(true)}
          className="px-5 py-3 rounded-2xl bg-[#C66A45] hover:bg-[#A65230] text-white font-bold text-sm shadow-soft hover:shadow-medium transition-all flex items-center gap-2 self-start sm:self-auto"
        >
          <Plus size={16} /> Post Live Request
        </button>
      </div>

      {/* Board List */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {liveMoments.map((item) => {
          const hasJoined = item.participants.includes(currentUser.name);

          return (
            <div
              key={item.id}
              className="p-6 rounded-3xl bg-[#EFE8DC] border border-[#DFD8CB] hover:border-[#C66A45] transition-all shadow-soft flex flex-col justify-between space-y-4"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <img
                      src={item.creatorAvatar}
                      alt={item.creatorName}
                      className="w-8 h-8 rounded-full object-cover border border-[#DFD8CB]"
                    />
                    <div>
                      <span className="text-xs font-bold text-[#202020]">
                        {item.creatorName}
                      </span>
                      <span className="text-[10px] text-[#7B8062] font-semibold block">
                        {item.category}
                      </span>
                    </div>
                  </div>

                  <span className="inline-flex items-center gap-1 text-[11px] font-bold text-[#DE835F] bg-[#C66A45]/15 px-2.5 py-1 rounded-full">
                    <Clock size={11} /> {item.expiresInMinutes}m left
                  </span>
                </div>

                <h3 className="text-base font-extrabold text-[#202020] leading-snug">
                  {item.title}
                </h3>

                <div className="flex items-center gap-2 text-xs font-semibold text-[#686661]">
                  <span className="flex items-center gap-1">
                    <MapPin size={12} className="text-[#C66A45]" /> {item.approximateZone}
                  </span>
                  <span>•</span>
                  <span className="flex items-center gap-1">
                    <Users size={12} className="text-[#7B8062]" /> {item.currentCount}/{item.targetCount} people
                  </span>
                </div>
              </div>

              <div className="pt-2 flex items-center justify-between border-t border-[#DFD8CB]">
                <div className="flex -space-x-1.5 overflow-hidden">
                  {item.participants.map((name, i) => (
                    <span
                      key={i}
                      className="inline-block w-6 h-6 rounded-full bg-[#202020] text-white text-[9px] font-black leading-6 text-center border-2 border-[#EFE8DC]"
                    >
                      {name[0]}
                    </span>
                  ))}
                </div>

                <button
                  onClick={() => joinLiveMoment(item.id)}
                  disabled={hasJoined}
                  className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                    hasJoined
                      ? 'bg-[#7B8062] text-white'
                      : 'bg-[#202020] hover:bg-[#151515] text-[#F7F3EA] shadow-soft'
                  }`}
                >
                  {hasJoined ? (
                    <>
                      <Check size={12} /> Joined
                    </>
                  ) : (
                    'Join Moment'
                  )}
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Create Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-charcoal-900/60 backdrop-blur-sm animate-fadeIn">
          <div className="w-full max-w-md bg-[#F7F3EA] rounded-3xl border border-[#DFD8CB] p-6 shadow-elevated space-y-4">
            <h3 className="text-xl font-black text-[#202020]">
              Create Ephemeral Live Moment
            </h3>

            <form onSubmit={handleCreate} className="space-y-4">
              <div>
                <label className="text-xs font-bold text-[#686661] block mb-1">
                  What are you looking for?
                </label>
                <input
                  type="text"
                  placeholder="e.g. Need 2 people for a photo walk"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  className="w-full px-4 py-3 rounded-2xl bg-[#EFE8DC] border border-[#DFD8CB] text-sm text-[#202020] focus:outline-none focus:border-[#C66A45]"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-bold text-[#686661] block mb-1">
                    Category
                  </label>
                  <select
                    value={newCategory}
                    onChange={(e) => setNewCategory(e.target.value)}
                    className="w-full px-3 py-2.5 rounded-xl bg-[#EFE8DC] border border-[#DFD8CB] text-xs text-[#202020]"
                  >
                    <option>Photography</option>
                    <option>Food</option>
                    <option>Music</option>
                    <option>Hackathon</option>
                    <option>Gaming</option>
                  </select>
                </div>

                <div>
                  <label className="text-xs font-bold text-[#686661] block mb-1">
                    Zone
                  </label>
                  <select
                    value={newZone}
                    onChange={(e) => setNewZone(e.target.value)}
                    className="w-full px-3 py-2.5 rounded-xl bg-[#EFE8DC] border border-[#DFD8CB] text-xs text-[#202020]"
                  >
                    <option>Photography Zone</option>
                    <option>Food Court & Market</option>
                    <option>Main Stage Amphitheatre</option>
                    <option>Gaming Arena</option>
                    <option>Hackathon Arena</option>
                  </select>
                </div>
              </div>

              <div className="flex gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="flex-1 py-3 rounded-xl bg-[#EFE8DC] text-[#686661] font-bold text-xs"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 py-3 rounded-xl bg-[#C66A45] hover:bg-[#A65230] text-white font-bold text-xs shadow-soft"
                >
                  Broadcast Request
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
