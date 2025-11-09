import { Home, MapIcon, Search, Heart } from 'lucide-react';

interface FooterProps {
  currentView: 'home' | 'map' | 'post' | 'search' | 'saved';
  onNavigate: (view: 'home' | 'map' | 'post' | 'search' | 'saved') => void;
}

// Poyo character SVG - white tooth sprite
function PoyoIcon({ isActive }: { isActive: boolean }) {
  return (
    <svg
      width="32"
      height="32"
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={isActive ? 'scale-110' : ''}
    >
      {/* Tooth body */}
      <path
        d="M16 4C12 4 9 6 8 9C7 12 7 14 8 16C9 18 10 20 11 22C12 24 13 26 14 27C14.5 27.5 15.2 28 16 28C16.8 28 17.5 27.5 18 27C19 26 20 24 21 22C22 20 23 18 24 16C25 14 25 12 24 9C23 6 20 4 16 4Z"
        fill={isActive ? '#1a1a1a' : 'white'}
        stroke={isActive ? 'white' : '#1a1a1a'}
        strokeWidth="2"
      />
      {/* Eyes */}
      <circle cx="13" cy="12" r="1.5" fill={isActive ? 'white' : '#1a1a1a'} />
      <circle cx="19" cy="12" r="1.5" fill={isActive ? 'white' : '#1a1a1a'} />
      {/* Smile */}
      <path
        d="M12 16C12 16 13.5 18 16 18C18.5 18 20 16 20 16"
        stroke={isActive ? 'white' : '#1a1a1a'}
        strokeWidth="1.5"
        strokeLinecap="round"
        fill="none"
      />
      {/* Sparkle */}
      <circle cx="10" cy="8" r="1" fill={isActive ? 'white' : '#d4c5b0'} />
      <circle cx="22" cy="10" r="0.8" fill={isActive ? 'white' : '#d4c5b0'} />
    </svg>
  );
}

export function Footer({ currentView, onNavigate }: FooterProps) {
  const navItems = [
    { id: 'home' as const, icon: Home, label: 'Home' },
    { id: 'map' as const, icon: MapIcon, label: 'Map' },
    { id: 'post' as const, icon: null, label: 'Pop!', isPoyo: true },
    { id: 'search' as const, icon: Search, label: 'Search' },
    { id: 'saved' as const, icon: Heart, label: 'Saved' },
  ];

  return (
    <footer className="fixed bottom-0 left-0 right-0 bg-white border-t-4 border-[#1a1a1a] shadow-2xl z-50">
      <div className="max-w-7xl mx-auto px-4">
        <nav className="flex items-center justify-around py-3">
          {navItems.map((item) => {
            const isActive = currentView === item.id;
            const Icon = item.icon;

            return (
              <button
                key={item.id}
                onClick={() => onNavigate(item.id)}
                className={`flex flex-col items-center gap-1 transition-all ${
                  isActive ? 'scale-110' : 'scale-100'
                }`}
              >
                {item.isPoyo ? (
                  <div className={`p-2 rounded-2xl transition-all ${
                    isActive 
                      ? 'bg-[#88a37e] shadow-lg' 
                      : 'bg-gradient-to-br from-[#88a37e] to-[#6d8a64] hover:shadow-md'
                  }`}>
                    <PoyoIcon isActive={isActive} />
                  </div>
                ) : (
                  Icon && (
                    <Icon
                      className={`w-7 h-7 transition-colors ${
                        isActive ? 'text-[#1a1a1a] fill-[#1a1a1a]' : 'text-[#6b5744]'
                      } ${item.id === 'saved' && isActive ? 'fill-[#1a1a1a]' : ''}`}
                    />
                  )
                )}
                <span
                  className={`text-xs transition-all ${
                    isActive 
                      ? 'text-[#1a1a1a] font-semibold' 
                      : 'text-[#6b5744] font-medium'
                  }`}
                  style={{ fontFamily: 'var(--font-display)' }}
                >
                  {item.label}
                </span>
              </button>
            );
          })}
        </nav>
      </div>
    </footer>
  );
}
