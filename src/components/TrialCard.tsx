import React from 'react';
import { RankedTrial } from '../types';
import { MapPin, Calendar, ExternalLink, ShieldCheck, Info, CheckCircle2 } from 'lucide-react';

interface TrialCardProps {
  trial: RankedTrial;
  onApply?: () => void;
}

const TrialCard: React.FC<TrialCardProps> = ({ trial, onApply }) => {
  const getFitColor = (fit: string) => {
    switch (fit) {
      case 'Perfect': return 'bg-emerald-100 text-emerald-700 border-emerald-200';
      case 'Good': return 'bg-blue-100 text-blue-700 border-blue-200';
      case 'Partial': return 'bg-amber-100 text-amber-700 border-amber-200';
      default: return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow border border-gray-100 overflow-hidden flex flex-col h-full">
      <div className="p-5 flex-grow">
        <div className="flex justify-between items-start mb-3">
          <div className="flex items-center gap-2">
            <span className={`px-3 py-1 rounded-full text-xs font-bold border ${getFitColor(trial.fit)}`}>
              {trial.fit} Match
            </span>
            {trial.isVerified && (
              <span className="flex items-center text-[10px] font-bold text-indigo-600 bg-indigo-50 px-2 py-1 rounded-full border border-indigo-100">
                <ShieldCheck className="w-3 h-3 mr-1" />
                VERIFIED
              </span>
            )}
          </div>
          <span className="text-xs font-bold text-gray-400">ID: #{trial.id}</span>
        </div>

        <h3 className="text-xl font-bold text-gray-900 mb-1 leading-tight">{trial.name}</h3>
        <p className="text-sm font-medium text-primary mb-4">{trial.organizer}</p>

        <div className="space-y-2 mb-6">
          <div className="flex items-center text-gray-600 text-sm">
            <MapPin className="w-4 h-4 mr-2 flex-shrink-0" />
            <span>{trial.city}, {trial.state} {trial.isAllIndia && '(All India)'}</span>
          </div>
          <div className="flex items-center text-gray-600 text-sm">
            <Calendar className="w-4 h-4 mr-2 flex-shrink-0" />
            <span>Deadline: {new Date(trial.deadline).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}</span>
          </div>
          <div className="flex items-center text-gray-600 text-sm">
            <Info className="w-4 h-4 mr-2 flex-shrink-0" />
            <span>Age: {trial.minAge}-{trial.maxAge} years</span>
          </div>
        </div>

        <div className="space-y-1">
          {trial.reasons.slice(0, 2).map((reason, idx) => (
            <div key={idx} className="flex items-start text-xs text-emerald-600 bg-emerald-50/50 p-1.5 rounded">
              <CheckCircle2 className="w-3.5 h-3.5 mr-2 mt-0.5 flex-shrink-0" />
              <span>{reason}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="p-5 pt-0 mt-auto border-t border-gray-50 bg-gray-50/50">
        <div className="flex items-center justify-between mb-4 mt-4">
          <div>
            <span className="text-xs text-gray-500 block">Registration Fee</span>
            <span className="text-sm font-bold text-gray-900">{trial.fees}</span>
          </div>
          <a
            href={trial.website}
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 text-primary hover:bg-primary-light rounded-lg transition-colors"
          >
            <ExternalLink className="w-5 h-5" />
          </a>
        </div>
        <button
          onClick={() => onApply?.()}
          className="w-full bg-primary hover:bg-primary-dark text-white font-bold py-2.5 rounded-lg transition-colors shadow-sm"
        >
          View & Apply
        </button>
      </div>
    </div>
  );
};

export default TrialCard;
