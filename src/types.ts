export type PlayingRole = 'Batsman' | 'Bowler' | 'All-rounder' | 'Wicketkeeper';

export type BowlingType = 'Medium Pace' | 'Fast Bowler' | 'Off Spinner' | 'Leg Spinner' | 'Chinaman' | 'Left Arm Spinner' | 'None';

export type ExperienceLevel = 'None' | 'School' | 'District' | 'Club' | 'Professional';

export interface PlayerProfile {
  id: string;
  fullName: string;
  dob: string;
  gender: 'Male' | 'Female' | 'Other';
  playingRole: PlayingRole;
  bowlingType: BowlingType;
  experienceLevel: ExperienceLevel;
  city: string;
  state: string;
  willingToTravel: boolean;
}

export interface CricketTrial {
  id: string;
  name: string;
  organizer: string;
  minAge: number;
  maxAge: number;
  gender: 'Male' | 'Female' | 'All';
  city: string;
  state: string;
  isAllIndia: boolean;
  travelAllowed: boolean;
  rolesAllowed: PlayingRole[] | 'All';
  deadline: string;
  fees: string;
  isVerified: boolean;
  website: string;
  description?: string;
  process?: string[];
  requirements?: string[];
}

export type FitType = 'Perfect' | 'Good' | 'Partial' | 'Ineligible';

export interface RankedTrial extends CricketTrial {
  fit: FitType;
  matchScore: number;
  reasons: string[];
}
