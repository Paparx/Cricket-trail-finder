import React, { useState } from 'react';
import { PlayerProfile } from '../types';
import { User, Calendar, MapPin, Briefcase, Award, ChevronRight } from 'lucide-react';

interface ProfileFormProps {
  onSubmit: (profile: PlayerProfile) => void;
  initialData?: PlayerProfile | null;
}

const ProfileForm: React.FC<ProfileFormProps> = ({ onSubmit, initialData }) => {
  const [formData, setFormData] = useState<Partial<PlayerProfile>>(
    initialData || {
      fullName: '',
      dob: '',
      gender: 'Male',
      playingRole: 'All-rounder',
      bowlingType: 'None',
      experienceLevel: 'None',
      city: '',
      state: '',
      willingToTravel: true,
    }
  );

  const isBowlingRequired = formData.playingRole === 'Bowler' || formData.playingRole === 'All-rounder';

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (isBowlingRequired && (!formData.bowlingType || formData.bowlingType === 'None')) {
      alert('Please select a specific Bowling Type for your role.');
      return;
    }

    onSubmit({
      ...formData,
      id: initialData?.id || Math.random().toString(36).substr(2, 9),
    } as PlayerProfile);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value,
    }));
  };

  return (
    <div className="max-w-2xl mx-auto bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100">
      <div className="bg-primary px-8 py-6 text-white">
        <h2 className="text-2xl font-bold">Player Profile</h2>
        <p className="text-primary-light mt-1 opacity-90">Tell us about your cricket journey to find the best trials.</p>
      </div>

      <form onSubmit={handleSubmit} className="p-8 space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Full Name */}
          <div className="space-y-2">
            <label className="flex items-center text-sm font-semibold text-gray-700">
              <User className="w-4 h-4 mr-2 text-primary" />
              Full Name
            </label>
            <input
              required
              type="text"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all"
              placeholder="Virat Kohli"
            />
          </div>

          {/* Date of Birth */}
          <div className="space-y-2">
            <label className="flex items-center text-sm font-semibold text-gray-700">
              <Calendar className="w-4 h-4 mr-2 text-primary" />
              Date of Birth
            </label>
            <input
              required
              type="date"
              name="dob"
              value={formData.dob}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all"
            />
          </div>

          {/* Gender */}
          <div className="space-y-2">
            <label className="flex items-center text-sm font-semibold text-gray-700">
              Gender
            </label>
            <select
              name="gender"
              value={formData.gender}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all"
            >
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
          </div>

          {/* Playing Role */}
          <div className="space-y-2">
            <label className="flex items-center text-sm font-semibold text-gray-700">
              <Briefcase className="w-4 h-4 mr-2 text-primary" />
              Playing Role
            </label>
            <select
              name="playingRole"
              value={formData.playingRole}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all"
            >
              <option value="Batsman">Batsman</option>
              <option value="Bowler">Bowler</option>
              <option value="All-rounder">All-rounder</option>
              <option value="Wicketkeeper">Wicketkeeper</option>
            </select>
          </div>

          {/* Bowling Type */}
          <div className="space-y-2">
            <label className="flex items-center text-sm font-semibold text-gray-700">
              Bowling Type {isBowlingRequired && <span className="text-rose-500 ml-1">*</span>}
            </label>
            <select
              name="bowlingType"
              required={isBowlingRequired}
              value={formData.bowlingType}
              onChange={handleChange}
              className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all ${
                isBowlingRequired && (!formData.bowlingType || formData.bowlingType === 'None') 
                ? 'border-amber-400 bg-amber-50' 
                : 'border-gray-300'
              }`}
            >
              <option value="None">None</option>
              <option value="Medium Pace">Medium Pace</option>
              <option value="Fast Bowler">Fast Bowler</option>
              <option value="Off Spinner">Off Spinner</option>
              <option value="Leg Spinner">Leg Spinner</option>
              <option value="Chinaman">Chinaman</option>
              <option value="Left Arm Spinner">Left Arm Spinner</option>
            </select>
            {isBowlingRequired && (!formData.bowlingType || formData.bowlingType === 'None') && (
              <p className="text-[10px] text-amber-600 font-bold uppercase italic">Specific bowling type required for your role</p>
            )}
          </div>

          {/* Experience Level */}
          <div className="space-y-2">
            <label className="flex items-center text-sm font-semibold text-gray-700">
              <Award className="w-4 h-4 mr-2 text-primary" />
              Experience Level
            </label>
            <select
              name="experienceLevel"
              value={formData.experienceLevel}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all"
            >
              <option value="None">None</option>
              <option value="School">School</option>
              <option value="District">District</option>
              <option value="Club">Club</option>
              <option value="Professional">Professional</option>
            </select>
          </div>

          {/* City */}
          <div className="space-y-2">
            <label className="flex items-center text-sm font-semibold text-gray-700">
              <MapPin className="w-4 h-4 mr-2 text-primary" />
              City
            </label>
            <input
              required
              type="text"
              name="city"
              value={formData.city}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all"
              placeholder="Mumbai"
            />
          </div>

          {/* State */}
          <div className="space-y-2">
            <label className="flex items-center text-sm font-semibold text-gray-700">
              State
            </label>
            <input
              required
              type="text"
              name="state"
              value={formData.state}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all"
              placeholder="Maharashtra"
            />
          </div>
        </div>

        {/* Willingness to Travel */}
        <div className="flex items-center space-x-3 p-4 bg-gray-50 rounded-lg border border-gray-200">
          <input
            type="checkbox"
            id="willingToTravel"
            name="willingToTravel"
            checked={formData.willingToTravel}
            onChange={handleChange}
            className="w-5 h-5 text-primary border-gray-300 rounded focus:ring-primary cursor-pointer"
          />
          <label htmlFor="willingToTravel" className="text-sm font-medium text-gray-700 cursor-pointer">
            I am willing to travel to other states for trials
          </label>
        </div>

        <button
          type="submit"
          className="w-full bg-primary text-white py-3 rounded-xl font-bold text-lg hover:bg-primary-dark transition-colors flex items-center justify-center group"
        >
          {initialData ? 'Update Profile' : 'Find Matching Trials'}
          <ChevronRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
        </button>
      </form>
    </div>
  );
};

export default ProfileForm;
