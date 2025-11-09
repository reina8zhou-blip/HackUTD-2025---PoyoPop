import { Search, Settings, User } from 'lucide-react';
import poyoLogo from 'figma:asset/3dfdb79dbf2574942de2e83fe2049ec7e88a6bd2.png';

interface HeaderProps {
  onSearchClick: () => void;
  onSettingsClick: () => void;
  onProfileClick: () => void;
}

export function Header({ onSearchClick, onSettingsClick, onProfileClick }: HeaderProps) {
  return (
    <header className="bg-primary shadow-lg border-b-4 border-[#1a1a1a]">
      <div className="flex items-center justify-between px-4 py-4">
        <div className="flex items-center gap-3 flex-1">
          {/* Logo */}
          <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center shadow-lg border-2 border-[#1a1a1a] p-1">
            <img src={poyoLogo} alt="Poyo Pop Logo" className="w-full h-full object-contain" />
          </div>
          {/* Name - Large and Fun */}
          <h1 
            className="text-5xl text-white tracking-wide"
            style={{ 
              fontFamily: 'var(--font-display)',
              fontWeight: 700,
              textShadow: '3px 3px 0px rgba(26, 26, 26, 0.4)'
            }}
          >
            Poyo Pop
          </h1>
        </div>
        
        {/* Icons */}
        <div className="flex items-center gap-2">
          <button 
            onClick={onSearchClick}
            className="p-2.5 hover:bg-[#1a1a1a]/30 rounded-xl transition-all hover:scale-105 border-2 border-transparent hover:border-white/50"
            aria-label="Search popups"
          >
            <Search className="w-6 h-6 text-white" />
          </button>
          <button 
            onClick={onSettingsClick}
            className="p-2.5 hover:bg-[#1a1a1a]/30 rounded-xl transition-all hover:scale-105 border-2 border-transparent hover:border-white/50"
            aria-label="Settings"
          >
            <Settings className="w-6 h-6 text-white" />
          </button>
          <button 
            onClick={onProfileClick}
            className="p-2.5 hover:bg-[#1a1a1a]/30 rounded-xl transition-all hover:scale-105 border-2 border-transparent hover:border-white/50"
            aria-label="Profile"
          >
            <User className="w-6 h-6 text-white" />
          </button>
        </div>
      </div>
    </header>
  );
}
