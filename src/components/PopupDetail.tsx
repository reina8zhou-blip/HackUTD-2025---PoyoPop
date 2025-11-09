import { X, MapPin, Clock, Star, Phone, Users, Check } from 'lucide-react';
import { Popup } from '../types/popup';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { useState } from 'react';

interface PopupDetailProps {
  popup: Popup;
  onClose: () => void;
}

export function PopupDetail({ popup, onClose }: PopupDetailProps) {
  const [isGoing, setIsGoing] = useState(false);

  return (
    <Card className="overflow-hidden border-4 border-[#1a1a1a] rounded-2xl shadow-xl">
      {/* Image */}
      <div className="relative h-64 w-full">
        <ImageWithFallback
          src={popup.imageUrl}
          alt={popup.name}
          className="w-full h-full object-cover"
        />
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-3 bg-white rounded-full shadow-lg hover:bg-[#f5f6f4] transition-all hover:scale-110 border-3 border-[#1a1a1a]"
          aria-label="Close details"
        >
          <X className="w-5 h-5 text-[#1a1a1a]" />
        </button>
      </div>

      {/* Content */}
      <div className="p-6 space-y-4 bg-white">
        <div className="space-y-2">
          <div className="flex items-start justify-between gap-4">
            <h2 className="text-[#3d3327]">{popup.name}</h2>
            <Badge className="bg-[#d4c5b0] text-[#3d3327] hover:bg-[#c4b5a0] border-none rounded-full">
              {popup.cuisine}
            </Badge>
          </div>

          <div className="flex items-center gap-4">
            {popup.rating && (
              <div className="flex items-center gap-1">
                <Star className="w-5 h-5 fill-[#d4c5b0] text-[#d4c5b0]" />
                <span className="text-[#3d3327]">{popup.rating}</span>
                <span className="text-[#6b5744] text-sm ml-1">rating</span>
              </div>
            )}
            <div className="flex items-center gap-1">
              <Users className="w-5 h-5 text-[#88a37e]" />
              <span className="text-[#3d3327]">{popup.attendees}</span>
              <span className="text-[#6b5744] text-sm ml-1">attending</span>
            </div>
          </div>
        </div>

        {/* Quick Info */}
        <div className="flex flex-wrap gap-4 text-sm text-[#6b5744]">
          <div className="flex items-center gap-2">
            <MapPin className="w-4 h-4 text-[#88a37e]" />
            <span>{popup.distance} mi away • {popup.driveTime} drive</span>
          </div>
          {popup.hours && (
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-[#88a37e]" />
              <span>{popup.hours}</span>
            </div>
          )}
          {popup.contact && (
            <div className="flex items-center gap-2">
              <Phone className="w-4 h-4 text-[#88a37e]" />
              <span>{popup.contact}</span>
            </div>
          )}
        </div>

        {/* Description */}
        <div className="space-y-2">
          <h3 className="text-[#3d3327]">About</h3>
          <p className="text-[#6b5744]">
            {popup.fullDescription}
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3">
          <button 
            onClick={(e) => {
              e.stopPropagation();
              setIsGoing(!isGoing);
            }}
            className={`flex-1 py-4 rounded-xl transition-all hover:shadow-lg hover:scale-[1.02] border-2 flex items-center justify-center gap-2 ${
              isGoing 
                ? 'bg-[#88a37e] text-white border-[#88a37e]' 
                : 'bg-white text-[#88a37e] border-[#88a37e] hover:bg-[#88a37e]/10'
            }`}
          >
            {isGoing && <Check className="w-5 h-5" />}
            <span style={{ fontFamily: 'var(--font-display)' }}>
              {isGoing ? 'Going!' : 'Going'}
            </span>
          </button>
          <button className="flex-1 py-4 bg-[#88a37e] text-white rounded-xl hover:bg-[#6d8a64] transition-all hover:shadow-lg hover:scale-[1.02] border-2 border-[#88a37e] flex items-center justify-center" style={{ fontFamily: 'var(--font-display)' }}>
            Get Directions
          </button>
        </div>
      </div>
    </Card>
  );
}
