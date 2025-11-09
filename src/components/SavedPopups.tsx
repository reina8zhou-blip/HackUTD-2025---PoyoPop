import { Calendar, Clock, Users, MapPin, Heart } from 'lucide-react';
import { SavedPopup } from '../types/savedPopup';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface SavedPopupsProps {
  savedPopups: SavedPopup[];
}

export function SavedPopups({ savedPopups }: SavedPopupsProps) {
  return (
    <div className="min-h-screen pb-8">
      {/* Header Section */}
      <div className="bg-gradient-to-br from-[#88a37e] to-[#6d8a64] px-6 py-8 border-b-4 border-[#1a1a1a] mb-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-3 mb-2">
            <div className="bg-[#1a1a1a] rounded-2xl p-3 border-3 border-white shadow-lg">
              <Heart className="w-8 h-8 text-white fill-white" />
            </div>
            <h1 
              className="text-4xl text-white"
              style={{ 
                fontFamily: 'var(--font-display)', 
                fontWeight: 700,
                textShadow: '2px 2px 0px rgba(26, 26, 26, 0.3)' 
              }}
            >
              Saved Popups
            </h1>
          </div>
          <p 
            className="text-white/90 ml-16"
            style={{ fontFamily: 'var(--font-primary)' }}
          >
            Your favorite food popups in one place ❤️
          </p>
        </div>
      </div>

      {/* Saved Popups List */}
      <div className="max-w-7xl mx-auto px-6">
        {savedPopups.length === 0 ? (
          <div className="text-center py-16">
            <Heart className="w-16 h-16 text-[#6b5744]/30 mx-auto mb-4" />
            <p 
              className="text-xl text-[#6b5744]"
              style={{ fontFamily: 'var(--font-display)' }}
            >
              No saved popups yet
            </p>
            <p 
              className="text-[#6b5744] mt-2"
              style={{ fontFamily: 'var(--font-primary)' }}
            >
              Start saving your favorites to see them here!
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {savedPopups.map((popup) => (
              <Card
                key={popup.id}
                className="overflow-hidden border-4 border-[#1a1a1a] rounded-2xl shadow-lg hover:shadow-xl transition-all cursor-pointer hover:scale-[1.01]"
              >
                <div className="flex flex-col md:flex-row">
                  {/* Image */}
                  <div className="md:w-1/3 h-48 md:h-auto relative">
                    <ImageWithFallback
                      src={popup.imageUrl}
                      alt={popup.name}
                      className="w-full h-full object-cover"
                    />
                    {/* "Happening Now" badge */}
                    {popup.time === 'Happening Now!' && (
                      <div className="absolute top-3 left-3">
                        <Badge className="bg-[#1a1a1a] text-white border-2 border-white rounded-full px-3 py-1 shadow-lg">
                          🔥 Live Now
                        </Badge>
                      </div>
                    )}
                  </div>

                  {/* Content */}
                  <div className="md:w-2/3 p-6 bg-white space-y-4">
                    {/* Title and Heart */}
                    <div className="flex items-start justify-between gap-4">
                      <h2 
                        className="text-2xl text-[#3d3327]"
                        style={{ fontFamily: 'var(--font-display)', fontWeight: 700 }}
                      >
                        {popup.name}
                      </h2>
                      <button 
                        className="p-2 hover:bg-[#f5f6f4] rounded-full transition-all"
                        aria-label="Remove from saved"
                      >
                        <Heart className="w-6 h-6 text-[#88a37e] fill-[#88a37e]" />
                      </button>
                    </div>

                    {/* Date and Time Info */}
                    <div className="flex flex-wrap gap-4">
                      <div className="flex items-center gap-2 text-[#6b5744]">
                        <Calendar className="w-5 h-5 text-[#88a37e]" />
                        <span style={{ fontFamily: 'var(--font-primary)' }}>
                          {popup.date}
                        </span>
                      </div>
                      <div className="flex items-center gap-2 text-[#6b5744]">
                        <Clock className="w-5 h-5 text-[#88a37e]" />
                        <span 
                          className={popup.time === 'Happening Now!' ? 'text-[#1a1a1a] font-semibold' : ''}
                          style={{ fontFamily: 'var(--font-primary)' }}
                        >
                          {popup.time}
                        </span>
                      </div>
                    </div>

                    {/* Attendees and Location */}
                    <div className="flex flex-wrap gap-4">
                      <div className="flex items-center gap-2 text-[#6b5744]">
                        <Users className="w-5 h-5 text-[#88a37e]" />
                        <span style={{ fontFamily: 'var(--font-primary)' }}>
                          {popup.attendees} attending
                        </span>
                      </div>
                      <div className="flex items-center gap-2 text-[#6b5744]">
                        <MapPin className="w-5 h-5 text-[#88a37e]" />
                        <span style={{ fontFamily: 'var(--font-primary)' }}>
                          {popup.location}
                        </span>
                      </div>
                    </div>

                    {/* Description */}
                    <p 
                      className="text-[#6b5744]"
                      style={{ fontFamily: 'var(--font-primary)' }}
                    >
                      {popup.description}
                    </p>

                    {/* Action Buttons */}
                    <div className="flex gap-3 pt-2">
                      <button 
                        className="flex-1 py-3 bg-gradient-to-br from-[#88a37e] to-[#6d8a64] text-white rounded-xl hover:from-[#7a9470] hover:to-[#5f7c58] transition-all hover:shadow-lg border-2 border-[#1a1a1a]"
                        style={{ fontFamily: 'var(--font-display)', fontWeight: 700 }}
                      >
                        View Details
                      </button>
                      <button 
                        className="px-6 py-3 bg-white text-[#1a1a1a] rounded-xl hover:bg-[#f5f6f4] transition-all border-2 border-[#1a1a1a]"
                        style={{ fontFamily: 'var(--font-display)', fontWeight: 700 }}
                      >
                        Directions
                      </button>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
