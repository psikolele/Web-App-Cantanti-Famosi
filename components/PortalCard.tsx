import React from 'react';
import { motion } from 'framer-motion';

interface PortalCardProps {
  onEnter: () => void;
  isHidden: boolean;
}

const PortalCard: React.FC<PortalCardProps> = ({ onEnter, isHidden }) => {
  return (
    <>
      <style>{`
        .gooey-effect {
          filter: blur(8px) contrast(15);
          background: #000;
        }
        .gooey-blob {
          position: absolute;
          border-radius: 50%;
          filter: blur(8px);
          opacity: 0.8;
          animation: float-blob 10s infinite ease-in-out;
        }
        @keyframes float-blob {
          0%, 100% { transform: translate(0, 0) scale(1); }
          33% { transform: translate(30px, -20px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
        }
      `}</style>

      <motion.div
        className="relative z-30"
        initial={{ scale: 0.9, opacity: 0 }}
        animate={
          isHidden 
            ? { scale: 10, opacity: 0, transition: { duration: 1.5, ease: "easeIn" } } 
            : { scale: 1, opacity: 1, transition: { duration: 1 } }
        }
      >
        <div 
          className="relative w-[320px] h-[400px] rounded-[20px] overflow-hidden border border-[#00ffaa]/50 flex flex-col items-center justify-center text-center"
          style={{
            background: 'rgba(10, 12, 18, 0.6)',
            boxShadow: '0 0 30px rgba(0, 255, 170, 0.3), inset 0 0 20px rgba(0, 255, 170, 0.1)',
            backdropFilter: 'blur(10px)',
          }}
        >
          {/* Gooey Background Layer */}
          <div className="absolute inset-0 gooey-effect z-0 overflow-hidden mix-blend-screen">
            <div className="gooey-blob w-[200px] h-[200px] bg-[#00ffaa] -top-10 -left-10 animate-blob" style={{ animationDelay: '0s' }}></div>
            <div className="gooey-blob w-[180px] h-[180px] bg-[#00a3ff] top-20 -right-10 animate-blob" style={{ animationDelay: '-2s' }}></div>
            <div className="gooey-blob w-[220px] h-[220px] bg-[#00ffaa] -bottom-20 left-10 animate-blob" style={{ animationDelay: '-4s' }}></div>
          </div>

          {/* Card Content */}
          <div className="relative z-10 flex flex-col items-center gap-8 p-6">
             <motion.h1 
               className="text-5xl text-white font-light tracking-[4px] uppercase leading-none drop-shadow-[0_0_15px_rgba(0,255,170,0.8)]"
               animate={{ textShadow: ["0 0 10px rgba(0,255,170,0.5)", "0 0 20px rgba(0,255,170,0.9)", "0 0 10px rgba(0,255,170,0.5)"] }}
               transition={{ duration: 3, repeat: Infinity }}
             >
               Enter<br/>The Portal
             </motion.h1>

             <motion.button
               onClick={onEnter}
               whileHover={{ scale: 1.05, boxShadow: "0 0 20px rgba(0,255,170,0.6)" }}
               whileTap={{ scale: 0.95 }}
               className="px-10 py-3 bg-black/30 border-2 border-[#00ffaa] rounded-full text-white text-2xl tracking-widest relative overflow-hidden group transition-all duration-300"
               style={{ textShadow: "0 0 5px rgba(0,255,255,0.5)" }}
             >
               <span className="relative z-10">GO</span>
               <div className="absolute inset-0 bg-gradient-to-r from-[#00ffaa]/20 to-[#00a3ff]/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
             </motion.button>
          </div>

          {/* Border Glow Gradient */}
          <div className="absolute inset-0 rounded-[20px] p-[1px] bg-gradient-to-br from-[#00ffaa] to-[#00a3ff] opacity-50 pointer-events-none"></div>
        </div>
      </motion.div>
    </>
  );
};

export default PortalCard;
