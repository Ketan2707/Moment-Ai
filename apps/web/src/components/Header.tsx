import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import {
  Compass,
  Users,
  Sparkles,
  MapPin,
  Trophy,
  BarChart3,
  User,
  EyeOff,
  Flame,
} from 'lucide-react';
import { useMoment } from '../context/MomentContext';

export const Header: React.FC = () => {
  const { currentUser, event, activeMoment, ghostMode, toggleGhostMode } = useMoment();
  const navigate = useNavigate();

  const navItems = [
    { name: 'Event', path: '/' },
    { name: 'Intent', path: '/intent' },
    { name: 'Radar', path: '/radar', icon: Compass },
    {
      name: 'Moment',
      path: '/active-moment',
      hasBadge: Boolean(activeMoment),
      badgeText: 'Active',
    },
    { name: 'Live Board', path: '/live-moments', icon: Users },
    { name: 'Social Map', path: '/map', icon: MapPin },
    { name: 'Memories', path: '/memories', icon: Trophy },
    { name: 'Organizer', path: '/organizer', icon: BarChart3 },
  ];

  return (
    <header className="sticky top-0 z-40 bg-[#F7F3EA]/90 backdrop-blur-md border-b border-[#DFD8CB] transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo & Tagline */}
          <div
            onClick={() => navigate('/')}
            className="flex items-center gap-3 cursor-pointer group"
          >
            <div className="w-10 h-10 rounded-full bg-[#202020] text-[#F7F3EA] flex items-center justify-center font-extrabold text-xl tracking-tight shadow-soft transition-transform group-hover:scale-105">
              M<span className="text-[#C66A45]">.</span>
            </div>
            <div>
              <span className="text-xl font-extrabold tracking-tight text-[#202020]">
                MOMENT
              </span>
              <p className="hidden md:block text-[11px] font-medium text-[#7B8062] -mt-1 tracking-tight">
                Don't find people. Find your moment.
              </p>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-1">
            {navItems.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) =>
                  `relative px-3.5 py-1.5 rounded-full text-sm font-semibold transition-all duration-150 flex items-center gap-1.5 ${
                    isActive
                      ? 'bg-[#202020] text-[#F7F3EA] shadow-soft'
                      : 'text-[#686661] hover:text-[#202020] hover:bg-[#EFE8DC]'
                  }`
                }
              >
                {item.name}
                {item.hasBadge && (
                  <span className="flex h-2 w-2 relative">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#C66A45] opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-[#C66A45]"></span>
                  </span>
                )}
              </NavLink>
            ))}
          </nav>

          {/* User & Controls */}
          <div className="flex items-center gap-3">
            {/* Ghost Mode Toggle */}
            <button
              onClick={toggleGhostMode}
              title={ghostMode ? 'Ghost Mode ON (Hidden on Radar)' : 'Ghost Mode OFF (Visible)'}
              className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold transition-all border ${
                ghostMode
                  ? 'bg-[#202020] text-[#F7F3EA] border-[#202020]'
                  : 'bg-[#EFE8DC] text-[#686661] border-[#DFD8CB] hover:border-[#7B8062]'
              }`}
            >
              <EyeOff size={13} />
              <span className="hidden sm:inline">
                {ghostMode ? 'Ghost On' : 'Visible'}
              </span>
            </button>

            {/* Level / XP Pill */}
            <div
              onClick={() => navigate('/profile')}
              className="flex items-center gap-2 px-3 py-1 bg-[#EFE8DC] rounded-full border border-[#DFD8CB] cursor-pointer hover:border-[#C66A45] transition-all"
            >
              <span className="text-xs font-bold text-[#C66A45]">
                Lvl {currentUser.momentLevel}
              </span>
              <span className="text-xs font-semibold text-[#202020] hidden sm:inline">
                {currentUser.xp} XP
              </span>
              <img
                src={currentUser.avatar}
                alt={currentUser.name}
                className="w-6 h-6 rounded-full object-cover border border-[#DFD8CB]"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Nav Bar */}
      <div className="lg:hidden flex overflow-x-auto px-4 py-2 gap-2 border-t border-[#DFD8CB]/60 bg-[#F7F3EA] no-scrollbar">
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              `px-3 py-1 rounded-full text-xs font-semibold whitespace-nowrap transition-all ${
                isActive
                  ? 'bg-[#202020] text-[#F7F3EA]'
                  : 'bg-[#EFE8DC] text-[#686661] hover:text-[#202020]'
              }`
            }
          >
            {item.name}
            {item.hasBadge && (
              <span className="ml-1 inline-block w-1.5 h-1.5 rounded-full bg-[#C66A45]" />
            )}
          </NavLink>
        ))}
      </div>
    </header>
  );
};
