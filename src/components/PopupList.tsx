import { ChevronLeft, ChevronRight, MapPin, Clock, Users, Check } from 'lucide-react';
import { Popup } from '../types/popup';
import { Badge } from './ui/badge';
import { Card } from './ui/card';
import { useState } from 'react';

interface PopupListProps {
  popups: Popup[];
  currentPage: number;
  totalPages: number;
  onNextPage: () => void;
  onPrevPage: () => void;
  onPopupClick: (popup: Popup) => void;
}

export function PopupList({ 
  popups, 
  currentPage, 
  totalPages, 
  onNextPage, 
  onPrevPage,
  onPopupClick 
}: PopupListProps) {
  const [goingPopups, setGoingPopups] = useState<Set<string>>(new Set());

  const toggleGoing = (popupId: string) => {
    setGoingPopups(prev => {
      const newSet = new Set(prev);
      if (newSet.has(popupId)) {
        newSet.delete(popupId);
      } else {
        newSet.add(popupId);
      }
      return newSet;
    });
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-[#3d3327]">Nearby Popups</h2>
        <span className="text-sm text-[#6b5744]">
          Page {currentPage + 1} of {totalPages}
        </span>
      </div>

      <div className="space-y-3">
        {popups.map((popup) => (
          <Card
            key={popup.id}
            className="p-5 hover:shadow-xl transition-all cursor-pointer bg-white border-2 border-[#1a1a1a]/10 hover:border-[#1a1a1a] rounded-2xl"
            onClick={() => onPopupClick(popup)}
          >
            <div className="flex justify-between items-start gap-4">
              <div className="flex-1 space-y-2">
                <div className="flex items-start justify-between">
                  <h3 className="text-[#3d3327]">{popup.name}</h3>
                  <Badge className="ml-2 bg-[#d4c5b0] text-[#3d3327] hover:bg-[#c4b5a0] border-none rounded-full">
                    {popup.cuisine}
                  </Badge>
                </div>
                
                <div className="flex items-center gap-4 text-sm text-[#6b5744]">
                  <div className="flex items-center gap-1">
                    <MapPin className="w-4 h-4 text-[#88a37e]" />
                    <span>{popup.distance} mi</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="w-4 h-4 text-[#88a37e]" />
                    <span>{popup.driveTime}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Users className="w-4 h-4 text-[#88a37e]" />
                    <span>{popup.attendees} attending</span>
                  </div>
                </div>
                
                <p className="text-sm text-[#6b5744]">
                  {popup.shortDescription}
                </p>

                {/* Going Button */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleGoing(popup.id);
                  }}
                  className={`mt-3 px-4 py-2 rounded-xl transition-all border-2 flex items-center justify-center gap-2 w-full ${
                    goingPopups.has(popup.id)
                      ? 'bg-[#88a37e] text-white border-[#88a37e]'
                      : 'bg-white text-[#88a37e] border-[#88a37e] hover:bg-[#88a37e]/10'
                  }`}
                >
                  {goingPopups.has(popup.id) && <Check className="w-4 h-4" />}
                  <span style={{ fontFamily: 'var(--font-display)' }}>
                    {goingPopups.has(popup.id) ? 'Going!' : 'Going'}
                  </span>
                </button>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-center gap-4 pt-4">
        <button
          onClick={onPrevPage}
          disabled={currentPage === 0}
          className="p-3 rounded-xl border-2 border-[#88a37e] hover:bg-[#88a37e] hover:text-white disabled:opacity-50 disabled:cursor-not-allowed transition-all text-[#88a37e]"
          aria-label="Previous page"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>
        
        <span className="text-sm text-[#6b5744]">
          {currentPage + 1} / {totalPages}
        </span>
        
        <button
          onClick={onNextPage}
          disabled={currentPage === totalPages - 1}
          className="p-3 rounded-xl border-2 border-[#88a37e] hover:bg-[#88a37e] hover:text-white disabled:opacity-50 disabled:cursor-not-allowed transition-all text-[#88a37e]"
          aria-label="Next page"
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
}
