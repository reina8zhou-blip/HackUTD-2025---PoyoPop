import { useState } from 'react';
import { Search, X } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from './ui/dialog';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { toast } from 'sonner@2.0.3';

interface SearchDialogProps {
  isOpen: boolean;
  onClose: () => void;
}

export function SearchDialog({ isOpen, onClose }: SearchDialogProps) {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!searchQuery.trim()) {
      toast.error('Please enter a search query');
      return;
    }

    // Success message with the search query
    toast.success(`Searching for: "${searchQuery}"`);
    
    // Reset and close
    setSearchQuery('');
    onClose();
  };

  const handleClear = () => {
    setSearchQuery('');
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl border-4 border-[#1a1a1a] rounded-3xl bg-white p-0 overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-br from-[#88a37e] to-[#6d8a64] px-6 py-6 border-b-4 border-[#1a1a1a]">
          <DialogHeader>
            <div className="flex items-center gap-3">
              {/* Search icon */}
              <div className="bg-[#1a1a1a] rounded-2xl p-3 border-3 border-white shadow-lg">
                <Search className="w-9 h-9 text-white" />
              </div>
              <div>
                <DialogTitle 
                  className="text-3xl text-white"
                  style={{ fontFamily: 'var(--font-display)', fontWeight: 700, textShadow: '2px 2px 0px rgba(26, 26, 26, 0.3)' }}
                >
                  Search Popups 🔍
                </DialogTitle>
                <DialogDescription className="text-white/90 mt-1" style={{ fontFamily: 'var(--font-primary)' }}>
                  Find your next favorite food popup
                </DialogDescription>
              </div>
            </div>
          </DialogHeader>
        </div>

        {/* Search Form */}
        <form onSubmit={handleSubmit} className="px-6 py-6">
          <div className="space-y-5">
            {/* Search Input */}
            <div className="relative">
              <Input
                type="text"
                placeholder="Search by name, cuisine, location..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="border-3 border-[#1a1a1a] focus:border-[#88a37e] rounded-2xl h-16 pl-14 pr-12 text-lg text-[#1a1a1a]"
                style={{ fontFamily: 'var(--font-primary)' }}
                autoFocus
              />
              <Search className="absolute left-5 top-1/2 -translate-y-1/2 w-6 h-6 text-[#6b5744]" />
              {searchQuery && (
                <button
                  type="button"
                  onClick={handleClear}
                  className="absolute right-4 top-1/2 -translate-y-1/2 p-2 hover:bg-gray-100 rounded-full transition-colors"
                  aria-label="Clear search"
                >
                  <X className="w-5 h-5 text-[#6b5744]" />
                </button>
              )}
            </div>

            {/* Search Suggestions */}
            <div className="bg-[#f5f6f4] rounded-2xl p-4 border-2 border-[#1a1a1a]/10">
              <p 
                className="text-sm text-[#1a1a1a] mb-3"
                style={{ fontFamily: 'var(--font-display)', fontWeight: 600 }}
              >
                Try searching for:
              </p>
              <div className="flex flex-wrap gap-2">
                {['Tacos', 'Burgers', 'Ramen', 'Pizza', 'Desserts', 'Vietnamese'].map((suggestion) => (
                  <button
                    key={suggestion}
                    type="button"
                    onClick={() => setSearchQuery(suggestion)}
                    className="px-4 py-2 bg-white rounded-xl border-2 border-[#88a37e] hover:bg-[#88a37e] hover:text-white transition-all text-sm text-[#1a1a1a]"
                    style={{ fontFamily: 'var(--font-primary)', fontWeight: 500 }}
                  >
                    {suggestion}
                  </button>
                ))}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3 pt-2">
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
                Search 🔍
              </Button>
            </div>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
