import React from 'react';
import { RankedTrial } from '../types';
import { X, MapPin, Calendar, ExternalLink, ShieldCheck, CheckCircle2, Info, Trophy, Wallet } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface TrialDetailModalProps {
  trial: RankedTrial | null;
  onClose: () => void;
}

const TrialDetailModal: React.FC<TrialDetailModalProps> = ({ trial, onClose }) => {
  if (!trial) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 sm:p-6">
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
        />
        
        <motion.div 
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="relative bg-white w-full max-w-2xl rounded-3xl shadow-2xl overflow-hidden max-h-[90vh] flex flex-col"
        >
          {/* Header */}
          <div className="relative h-48 bg-primary p-8 flex flex-col justify-end text-white">
            <button 
              onClick={onClose}
              className="absolute top-4 right-4 p-2 bg-white/10 hover:bg-white/20 rounded-full transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
            <div className="flex gap-2 mb-3">
              <span className="px-3 py-1 bg-white/20 backdrop-blur-md rounded-full text-xs font-bold border border-white/20">
                {trial.fit} Match
              </span>
              {trial.isVerified && (
                <span className="flex items-center text-xs font-bold bg-emerald-500 px-3 py-1 rounded-full">
                  <ShieldCheck className="w-4 h-4 mr-1" />
                  VERIFIED
                </span>
              )}
            </div>
            <h2 className="text-3xl font-black leading-none mb-1">{trial.name}</h2>
            <p className="text-primary-light font-bold opacity-90">{trial.organizer}</p>
          </div>

          {/* Content */}
          <div className="p-8 overflow-y-auto space-y-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="bg-slate-50 p-3 rounded-2xl">
                <Calendar className="w-5 h-5 text-primary mb-1" />
                <span className="block text-[10px] text-slate-400 font-bold uppercase">Deadline</span>
                <span className="text-sm font-bold text-slate-900">{trial.deadline}</span>
              </div>
              <div className="bg-slate-50 p-3 rounded-2xl">
                <MapPin className="w-5 h-5 text-primary mb-1" />
                <span className="block text-[10px] text-slate-400 font-bold uppercase">Location</span>
                <span className="text-sm font-bold text-slate-900">{trial.city}</span>
              </div>
              <div className="bg-slate-50 p-3 rounded-2xl">
                <Info className="w-5 h-5 text-primary mb-1" />
                <span className="block text-[10px] text-slate-400 font-bold uppercase">Age</span>
                <span className="text-sm font-bold text-slate-900">{trial.minAge}-{trial.maxAge}</span>
              </div>
              <div className="bg-slate-50 p-3 rounded-2xl">
                <Wallet className="w-5 h-5 text-primary mb-1" />
                <span className="block text-[10px] text-slate-400 font-bold uppercase">Fees</span>
                <span className="text-sm font-bold text-slate-900">{trial.fees}</span>
              </div>
            </div>

            <div className="space-y-3">
              <h3 className="text-lg font-bold text-slate-900 flex items-center">
                <Trophy className="w-5 h-5 mr-2 text-amber-500" />
                Why this matches you
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {trial.reasons.map((reason, idx) => (
                  <div key={idx} className="flex items-center text-sm font-medium text-slate-700 bg-emerald-50 px-3 py-2 rounded-xl">
                    <CheckCircle2 className="w-4 h-4 mr-2 text-emerald-500" />
                    {reason}
                  </div>
                ))}
              </div>
            </div>

            {trial.description && (
              <div className="space-y-2">
                <h3 className="text-lg font-bold text-slate-900">About the Trial</h3>
                <p className="text-slate-600 leading-relaxed text-sm">
                  {trial.description}
                </p>
              </div>
            )}

            {trial.process && (
              <div className="space-y-3">
                <h3 className="text-lg font-bold text-slate-900">Selection Process</h3>
                <div className="flex flex-wrap gap-2">
                  {trial.process.map((step, idx) => (
                    <div key={idx} className="flex items-center">
                      <span className="bg-primary-light text-primary text-xs font-bold px-3 py-1 rounded-lg border border-primary-border">
                        {idx + 1}. {step}
                      </span>
                      {idx < (trial.process?.length || 0) - 1 && (
                        <div className="w-4 h-px bg-slate-200 mx-1 hidden sm:block"></div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Action */}
          <div className="p-8 pt-4 border-t border-slate-100 bg-slate-50/50 flex gap-4">
            <a 
              href={trial.website}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-grow bg-primary hover:bg-primary-dark text-white font-black py-4 rounded-2xl transition-colors shadow-lg shadow-primary/20 flex items-center justify-center gap-2"
            >
              GO TO OFFICIAL WEBSITE
              <ExternalLink className="w-5 h-5" />
            </a>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default TrialDetailModal;
