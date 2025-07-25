'use client';

import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

interface MysticalShuffleProps {
  isActive: boolean;
}

export default function MysticalShuffle({ isActive }: MysticalShuffleProps) {
  const [cards, setCards] = useState<Array<{ id: number; x: number; y: number; rotation: number; scale: number; opacity: number }>>([]);

  useEffect(() => {
    if (!isActive) {
      setCards([]);
      return;
    }

    // Generate floating cards
    const generateCards = () => {
      const newCards = Array.from({ length: 12 }, (_, i) => ({
        id: i,
        x: Math.random() * 600 - 300, // Random x between -300 and 300
        y: Math.random() * 400 - 200, // Random y between -200 and 200
        rotation: Math.random() * 360,
        scale: 0.6 + Math.random() * 0.8, // Scale between 0.6 and 1.4
        opacity: 0.3 + Math.random() * 0.7, // Opacity between 0.3 and 1.0
      }));
      setCards(newCards);
    };

    generateCards();

    // Continuously regenerate cards for dynamic effect
    const interval = setInterval(generateCards, 800);

    return () => clearInterval(interval);
  }, [isActive]);

  if (!isActive) return null;

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden flex items-center justify-center">
      {/* Central mystical glow */}
      <motion.div
        className="absolute w-96 h-96 rounded-full bg-gradient-radial from-accent/20 via-accent/5 to-transparent"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.6, 0.3],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />

      {/* Swirling energy rings */}
      {[0, 1, 2].map((ring) => (
        <motion.div
          key={`ring-${ring}`}
          className="absolute border border-accent/20 rounded-full"
          style={{
            width: 150 + ring * 100,
            height: 150 + ring * 100,
          }}
          animate={{
            rotate: ring % 2 === 0 ? [0, 360] : [360, 0],
            scale: [1, 1.1, 1],
            opacity: [0.2, 0.4, 0.2],
          }}
          transition={{
            duration: 3 + ring * 0.5,
            repeat: Infinity,
            ease: "linear"
          }}
        />
      ))}

      {/* Floating mystical cards */}
      {cards.map((card) => (
        <motion.div
          key={card.id}
          className="absolute w-20 h-32 bg-surface-secondary border border-accent/40 shadow-lg shadow-accent/20"
          style={{
            filter: "blur(0.5px)",
          }}
          initial={{
            x: 0,
            y: 0,
            rotate: 0,
            scale: 0,
            opacity: 0,
          }}
          animate={{
            x: [0, card.x, -card.x, card.x * 0.5, 0],
            y: [0, card.y, -card.y, card.y * 0.5, 0],
            rotate: [0, card.rotation, card.rotation + 180, card.rotation + 360, 720],
            scale: [0, card.scale, card.scale * 1.2, card.scale, 0],
            opacity: [0, card.opacity, card.opacity * 0.8, card.opacity * 0.4, 0],
            rotateY: [0, 180, 360, 180, 0],
            z: [0, 50, -50, 25, 0],
          }}
          transition={{
            duration: 4,
            times: [0, 0.25, 0.5, 0.75, 1],
            ease: [0.25, 0.46, 0.45, 0.94],
            repeat: Infinity,
            delay: card.id * 0.2,
          }}
        >
          {/* Card content with mystical symbols */}
          <div className="w-full h-full bg-gradient-to-br from-accent/10 to-accent/5 flex items-center justify-center relative overflow-hidden">
            {/* Mystical pattern overlay */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-br from-transparent via-accent/10 to-transparent"
              animate={{
                opacity: [0.2, 0.6, 0.2],
                rotate: [0, 180, 360],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
                delay: card.id * 0.1,
              }}
            />
            
            {/* Mystical symbol */}
            <motion.div
              className="text-accent font-mono text-xs transform"
              animate={{
                rotate: [0, 360],
                scale: [0.8, 1.2, 0.8],
                opacity: [0.4, 1, 0.4],
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                ease: "easeInOut",
                delay: card.id * 0.15,
              }}
            >
              {['◈', '◊', '◇', '◉', '◎', '⬟', '⬢', '⬡'][card.id % 8]}
            </motion.div>

            {/* Floating particles */}
            <motion.div
              className="absolute w-1 h-1 bg-accent/60 rounded-full"
              style={{
                left: '20%',
                top: '30%',
              }}
              animate={{
                y: [-10, 10, -10],
                x: [-5, 5, -5],
                opacity: [0.3, 1, 0.3],
                scale: [0.5, 1.5, 0.5],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
                delay: card.id * 0.1,
              }}
            />

            <motion.div
              className="absolute w-1 h-1 bg-accent/60 rounded-full"
              style={{
                right: '20%',
                bottom: '30%',
              }}
              animate={{
                y: [10, -10, 10],
                x: [5, -5, 5],
                opacity: [0.3, 1, 0.3],
                scale: [0.5, 1.5, 0.5],
              }}
              transition={{
                duration: 2.5,
                repeat: Infinity,
                ease: "easeInOut",
                delay: card.id * 0.12,
              }}
            />
          </div>
        </motion.div>
      ))}

      {/* Central spiritual vortex effect */}
      <motion.div
        className="absolute w-32 h-48 border-2 border-accent/60 shadow-xl shadow-accent/40"
        animate={{
          rotateY: [0, 360],
          scale: [1, 1.1, 1],
          boxShadow: [
            "0 0 20px rgba(85, 98, 112, 0.4)",
            "0 0 40px rgba(85, 98, 112, 0.8)",
            "0 0 20px rgba(85, 98, 112, 0.4)"
          ],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      >
        <div className="w-full h-full bg-gradient-to-br from-accent/30 to-accent/10 flex items-center justify-center relative overflow-hidden">
          {/* Swirling energy inside central card */}
          <motion.div
            className="absolute inset-0"
            style={{
              background: `conic-gradient(from 0deg, transparent, rgba(85, 98, 112, 0.3), transparent)`,
            }}
            animate={{ rotate: [0, 360] }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "linear"
            }}
          />
          
          <motion.div
            className="text-accent font-mono text-sm transform z-10"
            animate={{
              rotate: [45, 405],
              scale: [1, 1.3, 1],
              textShadow: [
                "0 0 5px rgba(85, 98, 112, 0.5)",
                "0 0 15px rgba(85, 98, 112, 1)",
                "0 0 5px rgba(85, 98, 112, 0.5)"
              ],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            SYNC
          </motion.div>
        </div>
      </motion.div>

      {/* Mystical particle field */}
      {Array.from({ length: 20 }).map((_, i) => (
        <motion.div
          key={`particle-${i}`}
          className="absolute w-0.5 h-0.5 bg-accent/40 rounded-full"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{
            y: [0, -100, 0],
            x: [0, Math.random() * 50 - 25, 0],
            opacity: [0, 1, 0],
            scale: [0, 2, 0],
          }}
          transition={{
            duration: 3 + Math.random() * 2,
            repeat: Infinity,
            ease: "easeInOut",
            delay: i * 0.2,
          }}
        />
      ))}
    </div>
  );
}
