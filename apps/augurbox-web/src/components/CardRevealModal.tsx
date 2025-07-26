'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { type Card } from '@/lib/cards';
import { type DrawnCard, type Position } from '@/types/reading';
import StreamingText from '@/components/StreamingText';

interface CardInterpretation {
  positionId: string;
  interpretation: string;
  isLoading: boolean;
  isStreaming: boolean;
  isComplete: boolean;
  error: string | null;
  retryable: boolean;
}

interface CardRevealModalProps {
  card: Card;
  drawnCard: DrawnCard;
  position: Position;
  interpretation?: CardInterpretation;
  onClose: () => void;
  onRetryInterpretation?: () => void;
}


export default function CardRevealModal({ card, drawnCard, position, interpretation, onClose, onRetryInterpretation }: CardRevealModalProps) {
  const [animationComplete, setAnimationComplete] = useState(false);

  // Close modal on escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    
    if (typeof window !== 'undefined') {
      document.addEventListener('keydown', handleEscape);
      return () => document.removeEventListener('keydown', handleEscape);
    }
  }, [onClose]);


  // Animation variants
  const backdropVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: {
        duration: 0.4,
        ease: "easeOut" as const
      }
    },
    exit: {
      opacity: 0,
      transition: {
        duration: 0.3,
        ease: "easeIn" as const
      }
    }
  };

  const modalVariants = {
    hidden: {
      opacity: 0,
      scale: 0.9,
      y: 30,
      rotateY: -5,
    },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      rotateY: 0,
      transition: {
        duration: 0.6,
        ease: [0.25, 0.46, 0.45, 0.94] as const,
        staggerChildren: 0.15,
        delayChildren: 0.2
      }
    },
    exit: {
      opacity: 0,
      scale: 0.95,
      y: 20,
      transition: {
        duration: 0.3,
        ease: "easeIn" as const
      }
    }
  };

  const contentVariants = {
    hidden: {
      opacity: 0,
      y: 20,
      filter: "blur(4px)"
    },
    visible: {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: {
        duration: 0.5,
        ease: "easeOut" as const
      }
    }
  };

  const imageVariants = {
    hidden: {
      opacity: 0,
      scale: 0.8,
      rotateY: 10,
      filter: "brightness(0.3) blur(2px)"
    },
    visible: {
      opacity: 1,
      scale: 1,
      rotateY: 0,
      filter: "brightness(1) blur(0px)",
      transition: {
        duration: 0.8,
        ease: [0.25, 0.46, 0.45, 0.94] as const,
        delay: 0.3
      }
    }
  };

  const cardInfoVariants = {
    hidden: {
      opacity: 0,
      x: -20,
      filter: "blur(2px)"
    },
    visible: {
      opacity: 1,
      x: 0,
      filter: "blur(0px)",
      transition: {
        duration: 0.6,
        ease: "easeOut" as const
      }
    }
  };

  const interpretationVariants = {
    hidden: {
      opacity: 0,
      y: 30,
      scale: 0.98
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.7,
        ease: "easeOut" as const,
        delay: 0.1
      }
    }
  };

  return (
    <AnimatePresence mode="wait">
      <motion.div 
        className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4"
        variants={backdropVariants}
        initial="hidden"
        animate="visible"
        exit="exit"
        onClick={(e) => e.target === e.currentTarget && onClose()}
      >
        <motion.div 
          className="bg-surface border-2 border-accent max-w-5xl w-full max-h-[90vh] overflow-y-auto"
          variants={modalVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          onAnimationComplete={() => setAnimationComplete(true)}
          style={{
            boxShadow: "0 0 60px rgba(85, 98, 112, 0.3), inset 0 0 30px rgba(85, 98, 112, 0.1)",
            overflowY: animationComplete ? 'auto' : 'hidden'
          }}
        >
          {/* Header */}
          <motion.div 
            className="border-b border-border p-6"
            variants={contentVariants}
          >
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold text-accent mb-2">{card.name}</h2>
                <div className="flex items-center space-x-4 text-sm font-mono text-text-dim">
                  <span>POSITION: {position.name.toUpperCase()}</span>
                  <span>•</span>
                  <span>ORIENTATION: {drawnCard.is_reversed ? 'REVERSED' : 'UPRIGHT'}</span>
                  <span>•</span>
                  <span>CODE: {card.code}</span>
                </div>
              </div>
              <motion.button
                onClick={onClose}
                className="text-text-dim hover:text-accent font-mono text-2xl transition-colors"
                whileHover={{ scale: 1.1, rotateZ: 90 }}
                whileTap={{ scale: 0.9 }}
              >
                ×
              </motion.button>
            </div>
          </motion.div>

          <motion.div className="p-8" variants={contentVariants}>
            {/* Large Card Image - Centered and Prominent */}
            <motion.div className="text-center mb-8" variants={imageVariants}>
              <motion.div 
                className={`relative mx-auto w-80 h-[480px] border-2 border-accent shadow-xl shadow-accent/30 ${
                  drawnCard.is_reversed ? 'rotate-180' : ''
                }`}
                whileHover={{ 
                  scale: 1.02,
                  boxShadow: "0 0 40px rgba(85, 98, 112, 0.5)",
                  borderColor: "rgba(85, 98, 112, 1)"
                }}
                transition={{ duration: 0.3 }}
              >
                <Image
                  src={card.image}
                  alt={card.name}
                  fill
                  className="object-cover"
                  priority
                />
              </motion.div>
            </motion.div>

            {/* Card Information Grid */}
            <motion.div 
              className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto"
              variants={{
                hidden: {},
                visible: {
                  transition: {
                    staggerChildren: 0.1
                  }
                }
              }}
            >
              {/* Position Context */}
              <motion.div 
                className="bg-surface-secondary/50 border border-border p-4"
                variants={cardInfoVariants}
                whileHover={{ 
                  borderColor: "rgba(85, 98, 112, 0.6)",
                  backgroundColor: "rgba(26, 29, 38, 0.8)"
                }}
              >
                <h3 className="text-accent font-mono text-sm uppercase tracking-wider mb-3">
                  Position Context
                </h3>
                <div className="text-foreground font-bold mb-2">{position.name}</div>
                <div className="text-text-dim text-sm leading-relaxed">{position.description}</div>
              </motion.div>

              {/* Combined System Reading & Core Frequencies */}
              <motion.div 
                className="bg-surface-secondary/50 border border-border p-4"
                variants={cardInfoVariants}
                whileHover={{ 
                  borderColor: "rgba(85, 98, 112, 0.6)",
                  backgroundColor: "rgba(26, 29, 38, 0.8)"
                }}
              >
                <h3 className="text-accent font-mono text-sm uppercase tracking-wider mb-3">
                  Core Frequencies
                </h3>
                <div className="text-foreground text-sm leading-relaxed mb-3">
                  {drawnCard.is_reversed ? 'Inverse protocols detected.' : 'Systems nominal.'}
                </div>
                <div className="flex flex-wrap gap-2">
                  {card.keywords.map((keyword, index) => (
                    <motion.span
                      key={index}
                      className="px-2 py-1 bg-accent/20 border border-accent/40 text-accent font-mono text-xs uppercase"
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: index * 0.1 + 0.5 }}
                      whileHover={{ scale: 1.05, backgroundColor: "rgba(85, 98, 112, 0.3)" }}
                    >
                      {keyword}
                    </motion.span>
                  ))}
                </div>
              </motion.div>
            </motion.div>

            {/* AI Interpretation - Full Width */}
            <motion.div 
              className="mt-6 max-w-4xl mx-auto"
              variants={interpretationVariants}
            >
              <motion.div 
                className="bg-accent/10 border border-accent p-6"
                whileHover={{ 
                  borderColor: "rgba(85, 98, 112, 0.8)",
                  backgroundColor: "rgba(85, 98, 112, 0.15)"
                }}
              >
              <h3 className="text-accent font-mono text-sm uppercase tracking-wider mb-3">
                Augurbox Neural Analysis
              </h3>
              {interpretation?.isLoading && !interpretation?.interpretation ? (
                <div className="flex items-center space-x-3">
                  <div className="w-3 h-3 bg-accent rounded-full animate-pulse"></div>
                  <span className="text-accent font-mono text-sm animate-pulse">
                    NEURAL ANALYSIS IN PROGRESS...
                  </span>
                </div>
              ) : interpretation?.error ? (
                <div className="space-y-4">
                  <div className="flex items-center space-x-2 mb-3">
                    <div className="w-2 h-2 bg-red-400 rounded-full"></div>
                    <span className="text-red-400 font-mono text-sm font-bold">
                      ⚠ NEURAL MATRIX DISRUPTION
                    </span>
                  </div>
                  <div className="text-red-300 text-sm leading-relaxed mb-4">
                    {interpretation.error}
                  </div>
                  
                  {interpretation.retryable && onRetryInterpretation ? (
                    <div className="space-y-3">
                      <div className="text-text-dim font-mono text-xs">
                        temporal static interfering - neural pathway requires realignment
                      </div>
                      <button
                        onClick={onRetryInterpretation}
                        className="bg-accent hover:bg-accent-muted border border-border text-foreground font-mono font-bold py-2 px-4 text-xs uppercase tracking-wider transition-all duration-300 hover:shadow-md hover:shadow-accent/20"
                      >
                        🔄 RETRY NEURAL ANALYSIS
                      </button>
                    </div>
                  ) : (
                    <div className="text-text-dim font-mono text-xs">
                      irreversible temporal anomaly - construct manifestation corrupted
                    </div>
                  )}
                </div>
              ) : interpretation?.interpretation ? (
                <StreamingText
                  text={interpretation.interpretation}
                  isLoading={interpretation.isLoading}
                  isStreaming={interpretation.isStreaming}
                  isComplete={interpretation.isComplete}
                  error={interpretation.error}
                  className="text-foreground leading-relaxed"
                />
              ) : (
                <div className="text-text-dim italic leading-relaxed">
                  temporal link establishing... augurbox transmissions will manifest upon construct activation
                </div>
              )}
            </motion.div>
          </motion.div>
        </motion.div>

          {/* Footer */}
          <motion.div 
            className="border-t border-border p-6 text-center"
            variants={contentVariants}
          >
            <motion.button
              onClick={onClose}
              className="bg-accent hover:bg-accent-muted border border-border text-foreground font-mono font-bold py-3 px-8 text-sm uppercase tracking-wider transition-all duration-300"
              whileHover={{ 
                scale: 1.05,
                boxShadow: "0 0 20px rgba(85, 98, 112, 0.4)",
                backgroundColor: "rgba(85, 98, 112, 0.8)"
              }}
              whileTap={{ scale: 0.95 }}
            >
              ← CONTINUE TEMPORAL SEQUENCE
            </motion.button>
          </motion.div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
