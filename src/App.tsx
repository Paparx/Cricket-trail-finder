import React, { useState, useEffect } from 'react';
import { PlayerProfile } from './types';
import ProfileForm from './components/ProfileForm';
import Dashboard from './components/Dashboard';
import NotificationDrawer from './components/NotificationDrawer';
import { LogOut, LayoutDashboard, UserCircle, Bell } from 'lucide-react';

const App: React.FC = () => {
  const [player, setPlayer] = useState<PlayerProfile | null>(null);
  const [view, setView] = useState<'onboarding' | 'dashboard' | 'profile'>('onboarding');
  const [isLoading, setIsLoading] = useState(true);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);

  useEffect(() => {
    // Check local storage for existing profile
    const savedProfile = localStorage.getItem('cricket_player_profile');
    if (savedProfile) {
      setPlayer(JSON.parse(savedProfile));
      setView('dashboard');
    }
    setIsLoading(false);
  }, []);

  const handleProfileSubmit = (profile: PlayerProfile) => {
    setPlayer(profile);
    localStorage.setItem('cricket_player_profile', JSON.stringify(profile));
    setView('dashboard');
    window.scrollTo(0, 0);
  };

  const handleLogout = () => {
    localStorage.removeItem('cricket_player_profile');
    setPlayer(null);
    setView('onboarding');
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900">
      {/* Navigation */}
      {player && (
        <nav className="bg-white border-b border-slate-200 sticky top-0 z-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between h-16 items-center">
              <div className="flex items-center gap-2">
                <img src="/logo.png" alt="Cricket Trials Finder" className="h-10 w-auto" />
              </div>

              <div className="flex items-center gap-1 sm:gap-4">
                <button 
                  onClick={() => setView('dashboard')}
                  className={`p-2 rounded-lg flex items-center gap-2 text-sm font-bold transition-colors ${view === 'dashboard' ? 'text-primary bg-primary-light' : 'text-slate-500 hover:bg-slate-50'}`}
                >
                  <LayoutDashboard className="w-5 h-5" />
                  <span className="hidden md:inline">Dashboard</span>
                </button>
                <button 
                  onClick={() => setView('profile')}
                  className={`p-2 rounded-lg flex items-center gap-2 text-sm font-bold transition-colors ${view === 'profile' ? 'text-primary bg-primary-light' : 'text-slate-500 hover:bg-slate-50'}`}
                >
                  <UserCircle className="w-5 h-5" />
                  <span className="hidden md:inline">Profile</span>
                </button>
                <div className="w-px h-6 bg-slate-200 mx-2 hidden sm:block"></div>
                <button 
                  onClick={() => setIsNotificationsOpen(true)}
                  className="p-2 text-slate-400 hover:text-primary transition-colors relative"
                >
                  <Bell className="w-5 h-5" />
                  <span className="absolute top-2 right-2 w-2 h-2 bg-rose-500 rounded-full border-2 border-white"></span>
                </button>
                <button 
                  onClick={handleLogout}
                  className="p-2 text-slate-400 hover:text-rose-600 transition-colors"
                  title="Logout"
                >
                  <LogOut className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        </nav>
      )}

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {!player && view === 'onboarding' && (
          <div className="py-12 flex flex-col items-center">
            <div className="text-center mb-12 space-y-4">
              <div className="inline-flex items-center justify-center mb-6">
                <img src="/logo.png" alt="Cricket Trials Finder" className="h-32 w-auto shadow-2xl rounded-3xl" />
              </div>
              <h1 className="text-4xl md:text-5xl font-black text-slate-900">Discover Your Next Big Break</h1>
              <p className="text-lg text-slate-600 max-w-2xl">
                The only eligibility engine for Indian cricketers. Create your profile once and get matched with verified trials across India.
              </p>
            </div>
            <ProfileForm onSubmit={handleProfileSubmit} />
          </div>
        )}

        {player && view === 'dashboard' && (
          <Dashboard player={player} onEditProfile={() => setView('profile')} />
        )}

        {player && view === 'profile' && (
          <div className="max-w-2xl mx-auto py-8">
            <h2 className="text-2xl font-bold mb-6 text-slate-900">Update Your Player Profile</h2>
            <ProfileForm 
              initialData={player} 
              onSubmit={handleProfileSubmit} 
            />
            <button 
              onClick={() => setView('dashboard')}
              className="mt-6 w-full py-3 text-slate-500 font-bold hover:text-slate-700 transition-colors"
            >
              Cancel and Return to Dashboard
            </button>
          </div>
        )}
      </main>

      <NotificationDrawer 
        isOpen={isNotificationsOpen} 
        onClose={() => setIsNotificationsOpen(false)} 
      />

      {/* Footer */}
      <footer className="bg-white border-t border-slate-200 py-12 mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-8">
            <div className="flex items-center gap-2">
              <img src="/logo.png" alt="Cricket Trials Finder" className="h-8 w-auto opacity-80" />
            </div>
            <div className="flex gap-8 text-sm font-semibold text-slate-500">
              <a href="#" className="hover:text-primary transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-primary transition-colors">Terms of Service</a>
              <a href="#" className="hover:text-primary transition-colors">Contact Support</a>
            </div>
            <p className="text-sm text-slate-400 font-medium">
              © 2024 Cricket Trials Finder. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;
