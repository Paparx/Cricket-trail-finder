import { differenceInYears, parseISO } from 'date-fns';
import { PlayerProfile, CricketTrial, RankedTrial, FitType } from '../types';

export const calculateAge = (dob: string): number => {
  return differenceInYears(new Date(), parseISO(dob));
};

export const getTrialFit = (player: PlayerProfile, trial: CricketTrial): RankedTrial | null => {
  const age = calculateAge(player.dob);
  const reasons: string[] = [];
  let matchScore = 0;

  // 1. Mandatory Checks (Age & Gender)
  if (age < trial.minAge || age > trial.maxAge) return null;
  if (trial.gender !== 'All' && trial.gender !== player.gender) return null;

  // 2. Role matching
  const roleMatch = trial.rolesAllowed === 'All' || trial.rolesAllowed.includes(player.playingRole);
  if (!roleMatch) return null;

  // 3. Location & Travel Logic
  const sameState = player.state === trial.state;
  const sameCity = player.city === trial.city;
  const locationEligible = trial.isAllIndia || player.willingToTravel || sameState;

  if (!locationEligible) return null;

  // Scoring and Categorization
  if (sameCity) {
    matchScore += 40;
    reasons.push('Located in your city');
  } else if (sameState) {
    matchScore += 25;
    reasons.push('Located in your state');
  } else if (trial.isAllIndia) {
    matchScore += 15;
    reasons.push('Open for players across India');
  }

  if (roleMatch) {
    matchScore += 30;
    if (trial.rolesAllowed !== 'All') {
      reasons.push(`Specifically looking for ${player.playingRole}s`);
    }
  }

  if (trial.isVerified) {
    matchScore += 20;
    reasons.push('Verified and trusted organizer');
  }

  let fit: FitType = 'Partial';
  // Perfect Fit: Matching age + role + nearby location (same city or state)
  const isNearby = sameCity || sameState;
  const isExcellentMatch = matchScore >= 80 && isNearby;
  
  if (isExcellentMatch) fit = 'Perfect';
  else if (matchScore >= 50) fit = 'Good';

  return {
    ...trial,
    fit,
    matchScore,
    reasons
  };
};

export const rankTrials = (player: PlayerProfile, trials: CricketTrial[]): RankedTrial[] => {
  return trials
    .map(trial => getTrialFit(player, trial))
    .filter((trial): trial is RankedTrial => trial !== null)
    .sort((a, b) => b.matchScore - a.matchScore);
};
