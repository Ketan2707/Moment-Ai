import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { MomentProvider } from './context/MomentContext';
import { Header } from './components/Header';
import { EvaluatorBar } from './components/EvaluatorBar';
import { HomePage } from './pages/HomePage';
import { CheckInPage } from './pages/CheckInPage';
import { IntentPage } from './pages/IntentPage';
import { RadarPage } from './pages/RadarPage';
import { ActiveMomentPage } from './pages/ActiveMomentPage';
import { MemoryPage } from './pages/MemoryPage';
import { LiveMomentsPage } from './pages/LiveMomentsPage';
import { SocialMapPage } from './pages/SocialMapPage';
import { OrganizerPage } from './pages/OrganizerPage';
import { ProfilePage } from './pages/ProfilePage';

export const App: React.FC = () => {
  return (
    <MomentProvider>
      <BrowserRouter>
        <div className="min-h-screen bg-[#F7F3EA] text-[#202020] flex flex-col font-sans">
          {/* Hackathon Evaluator Bar at top */}
          <EvaluatorBar />

          {/* Main Navigation Header */}
          <Header />

          {/* Page Routing */}
          <main className="flex-1 pb-16">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/checkin" element={<CheckInPage />} />
              <Route path="/intent" element={<IntentPage />} />
              <Route path="/radar" element={<RadarPage />} />
              <Route path="/active-moment" element={<ActiveMomentPage />} />
              <Route path="/memories" element={<MemoryPage />} />
              <Route path="/live-moments" element={<LiveMomentsPage />} />
              <Route path="/map" element={<SocialMapPage />} />
              <Route path="/organizer" element={<OrganizerPage />} />
              <Route path="/profile" element={<ProfilePage />} />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </main>

          {/* Footer */}
          <footer className="border-t border-[#DFD8CB] bg-[#F7F3EA] py-6 text-center text-xs text-[#7B8062] font-semibold">
            <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                <span className="font-extrabold text-[#202020]">MOMENT</span>
                <span>•</span>
                <span>AI-Powered Real-World Social Companion</span>
              </div>
              <div>
                Don't find people. Find your moment.
              </div>
            </div>
          </footer>
        </div>
      </BrowserRouter>
    </MomentProvider>
  );
};
