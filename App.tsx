import React, { useState } from 'react';
import PortalCard from './components/PortalCard';
import TunnelEffect from './components/TunnelEffect';
import CharacterSelect from './components/CharacterSelect';
import { ViewState } from './types';

const App: React.FC = () => {
  const [view, setView] = useState<ViewState>('portal');

  const handleEnterPortal = () => {
    setView('tunnel');
    // The tunnel animation plays. The Tunnel component will visually accelerate.
    // We use a timeout to simulate the travel time before showing the selection screen.
    setTimeout(() => {
      setView('selection');
    }, 2500); // 2.5 seconds tunnel travel
  };

  const handleBack = () => {
    // Immediate reset
    setView('portal');
  };

  return (
    <div className="relative w-screen h-screen overflow-hidden bg-black flex items-center justify-center">
      {/* Background Tunnel - Always rendered but changes intensity */}
      <TunnelEffect 
        isActive={view === 'tunnel'} 
      />

      {/* Main Content Layers */}
      
      {/* Layer 1: Portal Card (Intro) */}
      {view === 'portal' || view === 'tunnel' ? (
        <PortalCard 
          onEnter={handleEnterPortal} 
          isHidden={view === 'tunnel'} 
        />
      ) : null}

      {/* Layer 2: Character Selection (Destination) */}
      {view === 'selection' && (
        <CharacterSelect onBack={handleBack} />
      )}
      
      {/* Overlay Vignette for atmosphere */}
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.8)_100%)] z-10"></div>
    </div>
  );
};

export default App;
