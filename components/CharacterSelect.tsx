import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CHARACTERS } from '../constants';
import { Character } from '../types';
import { ArrowLeft } from 'lucide-react';

interface CharacterSelectProps {
  onBack: () => void;
}

const CharacterSelect: React.FC<CharacterSelectProps> = ({ onBack }) => {
  const [selectedChar, setSelectedChar] = useState<Character | null>(null);

  return (
    <motion.div 
      className="absolute inset-0 z-40 flex flex-col items-center justify-center p-4 md:p-10"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1, delay: 0.5 }}
    >
      {/* Header */}
      <motion.div 
        className="absolute top-8 left-8 z-50 cursor-pointer text-[#00ffaa] hover:text-white transition-colors"
        onClick={onBack}
        whileHover={{ scale: 1.1 }}
      >
        <ArrowLeft size={32} />
      </motion.div>

      <motion.h2 
        className="text-white text-3xl md:text-5xl uppercase tracking-[0.2em] mb-12 text-center font-['Unica_One']"
        style={{ textShadow: "0 0 15px rgba(0,163,255, 0.8)" }}
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, delay: 1 }}
      >
        Choose Your Avatar
      </motion.h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 w-full max-w-7xl h-[60vh] items-center">
        {CHARACTERS.map((char, index) => (
          <CharacterCard 
            key={char.id} 
            character={char} 
            index={index} 
            onClick={() => setSelectedChar(char)}
          />
        ))}
      </div>

      {/* Detail Modal Overlay */}
      <AnimatePresence>
        {selectedChar && (
          <motion.div 
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-md p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedChar(null)}
          >
            <motion.div 
              className="bg-[#0a0c12] border border-[#00ffaa] p-8 rounded-2xl max-w-lg w-full relative overflow-hidden"
              initial={{ scale: 0.8, y: 50 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.8, y: 50 }}
              onClick={(e) => e.stopPropagation()}
              style={{ boxShadow: "0 0 50px rgba(0,255,170,0.2)" }}
            >
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#00ffaa] to-[#00a3ff]"></div>
              
              <div className="flex flex-col items-center text-center">
                 <div className="w-40 h-40 rounded-full border-2 border-[#00ffaa] p-1 mb-6 shadow-[0_0_30px_rgba(0,255,170,0.4)] relative overflow-hidden">
                   <ImageWithFallback 
                     src={selectedChar.imageUrl} 
                     alt={selectedChar.name} 
                     className="w-full h-full object-cover rounded-full" 
                   />
                 </div>
                 <h3 className="text-4xl text-white uppercase tracking-widest mb-2 font-bold font-['Unica_One']">{selectedChar.name}</h3>
                 <p className="text-[#00a3ff] text-xl mb-6 tracking-wider font-['Unica_One']">{selectedChar.role}</p>
                 <p className="text-gray-300 leading-relaxed font-sans text-lg">{selectedChar.description}</p>
                 
                 <button 
                  onClick={() => setSelectedChar(null)}
                  className="mt-8 px-8 py-2 border border-white/20 hover:bg-white/10 text-white rounded uppercase tracking-widest transition-all font-['Unica_One']"
                 >
                   Close
                 </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

// Component to handle image loading errors gracefully
const ImageWithFallback: React.FC<{ src: string; alt: string; className?: string }> = ({ src, alt, className }) => {
  const [error, setError] = useState(false);

  if (error) {
    return (
      <div className={`flex flex-col items-center justify-center bg-zinc-900 ${className}`}>
        <span className="text-[#00ffaa] text-xs uppercase tracking-widest opacity-50">No Signal</span>
        <div className="w-8 h-8 border border-[#00ffaa]/30 mt-2 rotate-45"></div>
      </div>
    );
  }

  return (
    <img 
      src={src} 
      alt={alt} 
      className={className} 
      onError={() => setError(true)}
    />
  );
};

const CharacterCard: React.FC<{ character: Character; index: number; onClick: () => void }> = ({ character, index, onClick }) => {
  return (
    <motion.div
      className="relative group cursor-pointer perspective-1000 h-full max-h-[500px]"
      initial={{ opacity: 0, y: 100 }}
      animate={{ 
        opacity: 1, 
        y: 0,
      }}
      transition={{ 
        duration: 0.8, 
        delay: index * 0.1 
      }}
      onClick={onClick}
    >
      {/* Floating Container */}
      <motion.div
        className="w-full h-full relative"
        animate={{ 
          y: [-10, 10, -10],
        }}
        transition={{ 
          duration: 4 + index, // Varied duration for organic feel
          repeat: Infinity, 
          ease: "easeInOut",
        }}
      >
        <div className="relative h-full w-full rounded-xl overflow-hidden border border-white/10 group-hover:border-[#00ffaa] transition-all duration-500 bg-black/40 backdrop-blur-sm group-hover:shadow-[0_0_30px_rgba(0,255,170,0.2)]">
          
          {/* Image Layer */}
          <div className="absolute inset-0 z-0">
             <ImageWithFallback 
                src={character.imageUrl} 
                alt={character.name} 
                className="w-full h-full object-cover opacity-70 group-hover:opacity-100 transition-all duration-700 group-hover:scale-110 grayscale group-hover:grayscale-0"
             />
          </div>
          
          {/* Gradient Overlay for Text Readability */}
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent opacity-90 group-hover:opacity-70 transition-opacity duration-500 z-10"></div>

          {/* Content */}
          <div className="absolute bottom-0 left-0 w-full p-6 z-20 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
             <h3 className="text-white text-2xl md:text-3xl uppercase tracking-widest drop-shadow-[0_2px_10px_rgba(0,0,0,1)] font-['Unica_One'] text-center group-hover:text-[#00ffaa] transition-colors">
               {character.name}
             </h3>
             <div className="h-[1px] w-12 mx-auto bg-[#00ffaa] my-3 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
             <p className="text-[#00a3ff] text-sm text-center tracking-[0.2em] uppercase opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-y-4 group-hover:translate-y-0">
               {character.role}
             </p>
          </div>

          {/* Selection Indicator Overlay */}
          <div className="absolute inset-0 border-2 border-[#00ffaa] opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-xl pointer-events-none"></div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default CharacterSelect;