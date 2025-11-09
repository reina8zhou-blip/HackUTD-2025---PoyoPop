import { useState } from 'react';
import { X, MapPin, Clock, UtensilsCrossed, FileText } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from './ui/dialog';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import { Button } from './ui/button';
import { toast } from 'sonner@2.0.3';

interface CreatePopupFormProps {
  isOpen: boolean;
  onClose: () => void;
}

export function CreatePopupForm({ isOpen, onClose }: CreatePopupFormProps) {
  const [formData, setFormData] = useState({
    name: '',
    location: '',
    time: '',
    menuItems: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate form
    if (!formData.name || !formData.location || !formData.time || !formData.menuItems) {
      toast.error('Please fill in all fields');
      return;
    }

    // Success message
    toast.success('Your popup has been posted! 🎉');
    
    // Reset form and close
    setFormData({
      name: '',
      location: '',
      time: '',
      menuItems: '',
    });
    onClose();
  };

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl border-4 border-[#1a1a1a] rounded-3xl bg-white p-0 overflow-hidden">
        {/* Header with Poyo character */}
        <div className="bg-gradient-to-br from-[#88a37e] to-[#6d8a64] px-6 py-6 border-b-4 border-[#1a1a1a]">
          <DialogHeader>
            <div className="flex items-center gap-3 mb-2">
              {/* Poyo character icon */}
              <div className="bg-[#1a1a1a] rounded-2xl p-3 border-3 border-white shadow-lg">
                <svg
                  width="36"
                  height="36"
                  viewBox="0 0 32 32"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M16 4C12 4 9 6 8 9C7 12 7 14 8 16C9 18 10 20 11 22C12 24 13 26 14 27C14.5 27.5 15.2 28 16 28C16.8 28 17.5 27.5 18 27C19 26 20 24 21 22C22 20 23 18 24 16C25 14 25 12 24 9C23 6 20 4 16 4Z"
                    fill="white"
                    stroke="white"
                    strokeWidth="2"
                  />
                  <circle cx="13" cy="12" r="1.5" fill="#1a1a1a" />
                  <circle cx="19" cy="12" r="1.5" fill="#1a1a1a" />
                  <path
                    d="M12 16C12 16 13.5 18 16 18C18.5 18 20 16 20 16"
                    stroke="#1a1a1a"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    fill="none"
                  />
                  <circle cx="10" cy="8" r="1" fill="#d4c5b0" />
                  <circle cx="22" cy="10" r="0.8" fill="#d4c5b0" />
                </svg>
              </div>
              <div>
                <DialogTitle 
                  className="text-3xl text-white"
                  style={{ fontFamily: 'var(--font-display)', fontWeight: 700, textShadow: '2px 2px 0px rgba(26, 26, 26, 0.3)' }}
                >
                  Create Your Popup!
                </DialogTitle>
                <DialogDescription className="text-white/90 mt-1" style={{ fontFamily: 'var(--font-primary)' }}>
                  Share your delicious food popup with the community
                </DialogDescription>
              </div>
            </div>
          </DialogHeader>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="px-6 py-6 space-y-5">
          {/* Popup Name */}
          <div className="space-y-2">
            <Label 
              htmlFor="name" 
              className="flex items-center gap-2 text-[#1a1a1a]"
              style={{ fontFamily: 'var(--font-display)', fontWeight: 600 }}
            >
              <FileText className="w-4 h-4" />
              Popup Name
            </Label>
            <Input
              id="name"
              type="text"
              placeholder="e.g., Taco Tornado, Burger Bliss..."
              value={formData.name}
              onChange={(e) => handleChange('name', e.target.value)}
              className="border-2 border-[#1a1a1a]/20 focus:border-[#88a37e] rounded-xl h-12 text-[#1a1a1a]"
              style={{ fontFamily: 'var(--font-primary)' }}
            />
          </div>

          {/* Location */}
          <div className="space-y-2">
            <Label 
              htmlFor="location" 
              className="flex items-center gap-2 text-[#1a1a1a]"
              style={{ fontFamily: 'var(--font-display)', fontWeight: 600 }}
            >
              <MapPin className="w-4 h-4" />
              Location
            </Label>
            <Input
              id="location"
              type="text"
              placeholder="e.g., 123 Main St, San Francisco, CA"
              value={formData.location}
              onChange={(e) => handleChange('location', e.target.value)}
              className="border-2 border-[#1a1a1a]/20 focus:border-[#88a37e] rounded-xl h-12 text-[#1a1a1a]"
              style={{ fontFamily: 'var(--font-primary)' }}
            />
          </div>

          {/* Time */}
          <div className="space-y-2">
            <Label 
              htmlFor="time" 
              className="flex items-center gap-2 text-[#1a1a1a]"
              style={{ fontFamily: 'var(--font-display)', fontWeight: 600 }}
            >
              <Clock className="w-4 h-4" />
              Time & Schedule
            </Label>
            <Input
              id="time"
              type="text"
              placeholder="e.g., Mon-Fri: 11am-8pm, Weekend: 12pm-9pm"
              value={formData.time}
              onChange={(e) => handleChange('time', e.target.value)}
              className="border-2 border-[#1a1a1a]/20 focus:border-[#88a37e] rounded-xl h-12 text-[#1a1a1a]"
              style={{ fontFamily: 'var(--font-primary)' }}
            />
          </div>

          {/* Menu Items */}
          <div className="space-y-2">
            <Label 
              htmlFor="menuItems" 
              className="flex items-center gap-2 text-[#1a1a1a]"
              style={{ fontFamily: 'var(--font-display)', fontWeight: 600 }}
            >
              <UtensilsCrossed className="w-4 h-4" />
              Menu Items
            </Label>
            <Textarea
              id="menuItems"
              placeholder="Tell us about your menu! What delicious items are you selling?&#10;&#10;e.g., Authentic street tacos, fresh guacamole, homemade salsas..."
              value={formData.menuItems}
              onChange={(e) => handleChange('menuItems', e.target.value)}
              className="border-2 border-[#1a1a1a]/20 focus:border-[#88a37e] rounded-xl min-h-[120px] text-[#1a1a1a] resize-none"
              style={{ fontFamily: 'var(--font-primary)' }}
            />
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3 pt-4">
            <Button
              type="button"
              onClick={onClose}
              variant="outline"
              className="flex-1 h-12 rounded-xl border-2 border-[#1a1a1a]/30 hover:bg-[#f5f6f4] text-[#1a1a1a]"
              style={{ fontFamily: 'var(--font-display)', fontWeight: 600 }}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              className="flex-1 h-12 rounded-xl bg-gradient-to-br from-[#88a37e] to-[#6d8a64] hover:from-[#7a9470] hover:to-[#5f7c58] text-white border-2 border-[#1a1a1a] shadow-lg"
              style={{ fontFamily: 'var(--font-display)', fontWeight: 700 }}
            >
              Post Popup! 🎉
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
