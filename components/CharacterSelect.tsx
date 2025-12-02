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
        className="text-white text-3xl md:text-5xl uppercase tracking-[0.2em] mb-12 text-center"
        style={{ textShadow: "0 0 15px rgba(0,163,255, 0.8)" }}
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, delay: 1 }}
      >
        Choose Your Avatar
      </motion.h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 w-full max-w-7xl">
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
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-4"
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
                 <div className="w-40 h-40 rounded-full border-2 border-[#00ffaa] p-1 mb-6 shadow-[0_0_30px_rgba(0,255,170,0.4)]">
                   <img src={selectedChar.imageUrl} alt={selectedChar.name} className="w-full h-full object-cover rounded-full" />
                 </div>
                 <h3 className="text-4xl text-white uppercase tracking-widest mb-2 font-bold">{selectedChar.name}</h3>
                 <p className="text-[#00a3ff] text-xl mb-6 tracking-wider">{selectedChar.role}</p>
                 <p className="text-gray-300 leading-relaxed font-sans text-lg">{selectedChar.description}</p>
                 
                 <button 
                  onClick={() => setSelectedChar(null)}
                  className="mt-8 px-8 py-2 border border-white/20 hover:bg-white/10 text-white rounded uppercase tracking-widest transition-all"
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

const CharacterCard: React.FC<{ character: Character; index: number; onClick: () => void }> = ({ character, index, onClick }) => {
  return (
    <motion.div
      className="relative group cursor-pointer perspective-1000"
      initial={{ opacity: 0, y: 50 }}
      animate={{ 
        opacity: 1, 
        y: [0, -15, 0], // Floating effect
      }}
      transition={{ 
        opacity: { duration: 0.5, delay: 1.2 + (index * 0.2) },
        y: { 
          duration: 4 + Math.random() * 2, // Random float duration
          repeat: Infinity, 
          ease: "easeInOut",
          delay: index * 0.5 
        }
      }}
      whileHover={{ scale: 1.05, zIndex: 10 }}
      onClick={onClick}
    >
      <div className="relative h-[400px] w-full rounded-xl overflow-hidden border border-transparent hover:border-[#00ffaa] transition-colors duration-500 bg-black/40 backdrop-blur-sm">
        {/* Image */}
        <img 
          src={character.imageUrl} 
          alt={character.name} 
          className="absolute inset-0 w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity duration-500 group-hover:scale-110 transform" 
        />
        
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent opacity-80"></div>

        {/* Content */}
        <div className="absolute bottom-0 left-0 w-full p-6 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
           <h3 className="text-white text-2xl uppercase tracking-widest drop-shadow-md">{character.name}</h3>
           <div className="h-[2px] w-0 group-hover:w-full bg-[#00ffaa] transition-all duration-500 mt-2 mb-2"></div>
           <p className="text-[#00a3ff] text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">{character.role}</p>
        </div>

        {/* Glow Hover */}
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none shadow-[inset_0_0_50px_rgba(0,255,170,0.3)]"></div>
      </div>
    </motion.div>
  );
};

export default CharacterSelect;
