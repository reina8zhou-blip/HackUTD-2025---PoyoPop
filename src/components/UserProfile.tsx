import { MapPin, User, Edit } from 'lucide-react';
import { Badge } from './ui/badge';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { toast } from 'sonner@2.0.3';

interface UserProfileProps {
  onStartPopping?: () => void;
}

export function UserProfile({ onStartPopping }: UserProfileProps) {
  const userName = "Joshua K";
  const userLocation = "San Francisco, CA";
  const foodPreferences = ["Bagels", "Matcha"];
  const profileImage = "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=400";

  const handleEditProfile = () => {
    toast.info("Edit profile feature coming soon!");
  };

  const handleStartPopping = () => {
    if (onStartPopping) {
      onStartPopping();
    }
  };

  return (
    <div className="min-h-screen pb-8">
      {/* Header Section */}
      <div className="bg-gradient-to-br from-[#88a37e] to-[#6d8a64] px-6 py-8 border-b-4 border-[#1a1a1a] mb-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-3">
              <div className="bg-[#1a1a1a] rounded-2xl p-3 border-3 border-white shadow-lg">
                <User className="w-8 h-8 text-white" />
              </div>
              <h1 
                className="text-4xl text-white"
                style={{ 
                  fontFamily: 'var(--font-display)', 
                  fontWeight: 700,
                  textShadow: '2px 2px 0px rgba(26, 26, 26, 0.3)' 
                }}
              >
                My Profile
              </h1>
            </div>
            <button
              onClick={handleEditProfile}
              className="flex items-center gap-2 px-5 py-3 bg-white text-[#1a1a1a] rounded-xl hover:bg-[#f5f6f4] transition-all border-2 border-[#1a1a1a] shadow-lg hover:shadow-xl hover:scale-105"
              style={{ fontFamily: 'var(--font-display)', fontWeight: 700 }}
            >
              <Edit className="w-5 h-5" />
              Edit Profile
            </button>
          </div>
          <p 
            className="text-white/90 ml-16"
            style={{ fontFamily: 'var(--font-primary)' }}
          >
            Your Poyo Pop profile and preferences 🎉
          </p>
        </div>
      </div>

      {/* Profile Content */}
      <div className="max-w-2xl mx-auto px-6">
        <div className="bg-white border-4 border-[#1a1a1a] rounded-3xl shadow-xl overflow-hidden">
          {/* Profile Photo Section */}
          <div className="bg-gradient-to-br from-[#f5f6f4] to-[#e8eae6] p-8 border-b-4 border-[#1a1a1a]">
            <div className="flex flex-col items-center">
              <div className="relative">
                <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-[#1a1a1a] shadow-lg">
                  <ImageWithFallback
                    src={profileImage}
                    alt={userName}
                    className="w-full h-full object-cover"
                  />
                </div>
                {/* Online indicator */}
                <div className="absolute bottom-2 right-2 w-6 h-6 bg-[#88a37e] rounded-full border-3 border-white shadow-lg"></div>
              </div>
              
              {/* Name */}
              <h2 
                className="text-3xl text-[#1a1a1a] mt-4"
                style={{ fontFamily: 'var(--font-display)', fontWeight: 700 }}
              >
                {userName}
              </h2>
              
              {/* Location */}
              <div className="flex items-center gap-2 mt-2 text-[#6b5744]">
                <MapPin className="w-5 h-5 text-[#88a37e]" />
                <span style={{ fontFamily: 'var(--font-primary)' }}>
                  {userLocation}
                </span>
              </div>
            </div>
          </div>

          {/* Profile Details */}
          <div className="p-8 space-y-6">
            {/* Food Preferences */}
            <div>
              <h3 
                className="text-xl text-[#3d3327] mb-3"
                style={{ fontFamily: 'var(--font-display)', fontWeight: 700 }}
              >
                Food Preferences 🍴
              </h3>
              <div className="flex flex-wrap gap-2">
                {foodPreferences.map((preference) => (
                  <Badge 
                    key={preference}
                    className="bg-[#88a37e] text-white hover:bg-[#6d8a64] border-2 border-[#1a1a1a] rounded-full px-4 py-2 text-base shadow-md"
                    style={{ fontFamily: 'var(--font-primary)', fontWeight: 600 }}
                  >
                    {preference}
                  </Badge>
                ))}
              </div>
            </div>

            {/* Stats Section */}
            <div className="grid grid-cols-3 gap-4">
              <div className="text-center p-4 bg-[#f5f6f4] rounded-2xl border-2 border-[#1a1a1a]/10">
                <div 
                  className="text-2xl text-[#1a1a1a] mb-1"
                  style={{ fontFamily: 'var(--font-display)', fontWeight: 700 }}
                >
                  12
                </div>
                <div 
                  className="text-sm text-[#6b5744]"
                  style={{ fontFamily: 'var(--font-primary)' }}
                >
                  Visited
                </div>
              </div>
              <div className="text-center p-4 bg-[#f5f6f4] rounded-2xl border-2 border-[#1a1a1a]/10">
                <div 
                  className="text-2xl text-[#1a1a1a] mb-1"
                  style={{ fontFamily: 'var(--font-display)', fontWeight: 700 }}
                >
                  8
                </div>
                <div 
                  className="text-sm text-[#6b5744]"
                  style={{ fontFamily: 'var(--font-primary)' }}
                >
                  Reviews
                </div>
              </div>
              <div className="text-center p-4 bg-[#f5f6f4] rounded-2xl border-2 border-[#1a1a1a]/10">
                <div 
                  className="text-2xl text-[#1a1a1a] mb-1"
                  style={{ fontFamily: 'var(--font-display)', fontWeight: 700 }}
                >
                  2
                </div>
                <div 
                  className="text-sm text-[#6b5744]"
                  style={{ fontFamily: 'var(--font-primary)' }}
                >
                  Saved
                </div>
              </div>
            </div>

            {/* Call to Action */}
            <button 
              onClick={handleStartPopping}
              className="w-full py-5 bg-gradient-to-br from-[#88a37e] to-[#6d8a64] text-white rounded-2xl hover:from-[#7a9470] hover:to-[#5f7c58] transition-all hover:shadow-xl hover:scale-[1.02] border-3 border-[#1a1a1a] mt-6"
              style={{ fontFamily: 'var(--font-display)', fontWeight: 700 }}
            >
              <span className="text-2xl">Start Popping!</span>
            </button>

            {/* Additional Info */}
            <div className="text-center pt-4">
              <p 
                className="text-sm text-[#6b5744]"
                style={{ fontFamily: 'var(--font-primary)' }}
              >
                Member since November 2025
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
