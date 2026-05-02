import React, { useState, useMemo } from 'react';
import { PlayerProfile, RankedTrial } from '../types';
import { mockTrials } from '../data/mockTrials';
import { rankTrials } from '../utils/engine';
import TrialCard from './TrialCard';
import TrialDetailModal from './TrialDetailModal';
import { Search, Trophy, MapPin, Calendar, User } from 'lucide-react';

interface DashboardProps {
  player: PlayerProfile;
  onEditProfile: () => void;
}

const Dashboard: React.FC<DashboardProps> = ({ player, onEditProfile }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterLocation, setFilterLocation] = useState('All');
  const [filterMatch, setFilterMatch] = useState('All');
  const [selectedTrial, setSelectedTrial] = useState<RankedTrial | null>(null);
  
  const rankedTrials = useMemo(() => rankTrials(player, mockTrials), [player]);
  
  const filteredTrials = useMemo(() => {
    return rankedTrials.filter(trial => {
      const matchesSearch = trial.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          trial.organizer.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          trial.city.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesLocation = filterLocation === 'All' || 
                             (filterLocation === 'My State' && trial.state === player.state) ||
                             (filterLocation === 'All India' && trial.isAllIndia);
      
      const matchesFit = filterMatch === 'All' || trial.fit === filterMatch;

      return matchesSearch && matchesLocation && matchesFit;
    });
  }, [rankedTrials, searchTerm, filterLocation, filterMatch, player.state]);

  const stats = {
    totalEligible: rankedTrials.length,
    perfectFits: rankedTrials.filter(t => t.fit === 'Perfect').length,
    topPick: rankedTrials[0]
  };

  return (
    <div className="space-y-8 pb-20">
      {/* Header / Stats Section */}
      <section className="bg-primary-dark text-white p-8 rounded-3xl shadow-xl overflow-hidden relative">
        <div className="relative z-10 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="space-y-2">
            <h1 className="text-3xl md:text-4xl font-extrabold">Welcome, {player.fullName.split(' ')[0]}!</h1>
            <p className="text-primary-light/80 text-lg flex items-center font-medium">
              <MapPin className="w-4 h-4 mr-2" />
              {player.city}, {player.state} • {player.playingRole}
            </p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 w-full md:w-auto">
            <div className="bg-white/10 backdrop-blur-md p-4 rounded-2xl border border-white/10 text-center">
              <span className="text-2xl font-bold block">{stats.totalEligible}</span>
              <span className="text-[10px] text-primary-light/70 uppercase tracking-wider font-bold">Trials Found</span>
            </div>
            <div className="bg-emerald-500/20 backdrop-blur-md p-4 rounded-2xl border border-emerald-500/20 text-center">
              <span className="text-2xl font-bold block text-emerald-400">{stats.perfectFits}</span>
              <span className="text-[10px] text-emerald-300 uppercase tracking-wider font-bold">Perfect Fits</span>
            </div>
            <button 
              onClick={onEditProfile}
              className="bg-white text-primary-dark p-4 rounded-2xl font-bold flex flex-col items-center justify-center hover:bg-primary-light transition-colors"
            >
              <User className="w-5 h-5 mb-1" />
              <span className="text-[10px] uppercase">Edit Profile</span>
            </button>
          </div>
        </div>
        
        {/* Decorative elements */}
        <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 w-64 h-64 bg-primary/20 rounded-full blur-3xl"></div>
      </section>

      {/* Recommended Section */}
      {stats.topPick && (
        <section className="space-y-4">
          <div className="flex items-center gap-2">
            <Trophy className="text-amber-500 w-6 h-6" />
            <h2 className="text-2xl font-bold text-gray-900">Best Trial For You This Month</h2>
          </div>
          <div className="bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-200 rounded-3xl p-6 md:p-8 relative overflow-hidden group">
            <div className="relative z-10 flex flex-col lg:flex-row gap-8 items-center">
              <div className="flex-grow space-y-4">
                <div className="flex flex-wrap gap-2">
                  <span className="px-3 py-1 bg-amber-500 text-white rounded-full text-xs font-bold">TOP PICK</span>
                  <span className="px-3 py-1 bg-white/80 border border-amber-200 text-amber-700 rounded-full text-xs font-bold">PERFECT ELIGIBILITY</span>
                </div>
                <h3 className="text-3xl font-black text-gray-900">{stats.topPick.name}</h3>
                <p className="text-gray-600 max-w-xl">
                  Based on your profile as a {player.playingRole} from {player.city}, this is the most recommended trial with high verified rating and matching role requirements.
                </p>
                <div className="flex flex-wrap gap-4 text-sm font-semibold text-gray-700">
                  <span className="flex items-center"><Calendar className="w-4 h-4 mr-1 text-amber-500" /> Deadline: {stats.topPick.deadline}</span>
                  <span className="flex items-center"><MapPin className="w-4 h-4 mr-1 text-amber-500" /> {stats.topPick.city}</span>
                </div>
                <button 
                  onClick={() => setSelectedTrial(stats.topPick)}
                  className="bg-gray-900 text-white px-8 py-3 rounded-xl font-bold hover:bg-gray-800 transition-colors shadow-lg"
                >
                  View Detailed Opportunity
                </button>
              </div>
              <div className="w-full lg:w-72 h-48 bg-white/50 backdrop-blur rounded-2xl flex items-center justify-center border border-white">
                <div className="text-center">
                  <span className="text-5xl font-black text-amber-500">98%</span>
                  <span className="block text-sm font-bold text-gray-500 uppercase">Match Score</span>
                </div>
              </div>
            </div>
            {/* Background design */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-amber-400/10 rounded-full -mr-16 -mt-16 group-hover:scale-150 transition-transform duration-700"></div>
          </div>
        </section>
      )}

      {/* Search & Filters */}
      <section className="space-y-6">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="relative flex-grow">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input 
              type="text" 
              placeholder="Search by trial name, organizer, or city..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-4 bg-white border border-gray-200 rounded-2xl shadow-sm focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all"
            />
          </div>
          <div className="flex flex-wrap gap-3">
            <div className="relative">
              <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
              <select 
                value={filterLocation}
                onChange={(e) => setFilterLocation(e.target.value)}
                className="pl-10 pr-8 py-4 bg-white border border-gray-200 rounded-2xl shadow-sm appearance-none focus:ring-2 focus:ring-primary focus:border-primary outline-none font-semibold text-gray-700 text-sm"
              >
                <option value="All">Any Location</option>
                <option value="My State">My State ({player.state})</option>
                <option value="All India">All India Trials</option>
              </select>
            </div>

            <div className="relative">
              <Trophy className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
              <select 
                value={filterMatch}
                onChange={(e) => setFilterMatch(e.target.value)}
                className="pl-10 pr-8 py-4 bg-white border border-gray-200 rounded-2xl shadow-sm appearance-none focus:ring-2 focus:ring-primary focus:border-primary outline-none font-semibold text-gray-700 text-sm"
              >
                <option value="All">All Matches</option>
                <option value="Perfect">Perfect Fit</option>
                <option value="Good">Good Fit</option>
                <option value="Partial">Partial Fit</option>
              </select>
            </div>
          </div>
        </div>

        {/* Results Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTrials.map(trial => (
            <TrialCard 
              key={trial.id} 
              trial={trial} 
              onApply={() => setSelectedTrial(trial)}
            />
          ))}
          {filteredTrials.length === 0 && (
            <div className="col-span-full py-20 text-center space-y-4">
              <div className="bg-gray-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto text-gray-400">
                <Search className="w-10 h-10" />
              </div>
              <h3 className="text-xl font-bold text-gray-900">No trials found matching your search.</h3>
              <p className="text-gray-500">Try adjusting your filters or search keywords.</p>
            </div>
          )}
        </div>
      </section>

      <TrialDetailModal 
        trial={selectedTrial} 
        onClose={() => setSelectedTrial(null)} 
      />
    </div>
  );
};

export default Dashboard;
