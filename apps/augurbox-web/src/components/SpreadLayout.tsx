'use client';

import { useState } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { type Spread, type DrawnCard, type Position } from '@/types/reading';
import { type Card } from '@/lib/cards';
import CardRevealModal from './CardRevealModal';

interface CardInterpretation {
  positionId: string;
  interpretation: string;
  isLoading: boolean;
  isStreaming: boolean;
  isComplete: boolean;
  error: string | null;
  retryable: boolean;
}

interface SpreadLayoutProps {
  spread: Spread;
  drawnCards: DrawnCard[];
  allCards: Card[];
  interpretations: CardInterpretation[];
  onCardReveal: (positionId: string) => void;
  onRetryInterpretation: (positionId: string) => void;
  readingState: 'revealing' | 'complete';
}

export default function SpreadLayout({ 
  spread, 
  drawnCards, 
  allCards, 
  interpretations,
  onCardReveal,
  onRetryInterpretation, 
  readingState 
}: SpreadLayoutProps) {
  const [selectedCard, setSelectedCard] = useState<{
    card: Card;
    drawnCard: DrawnCard;
    position: Position;
  } | null>(null);

  const getCardForPosition = (positionId: string) => {
    const drawnCard = drawnCards.find(dc => dc.position_id === positionId);
    if (!drawnCard) return null;
    
    const card = allCards.find(c => c.code === drawnCard.card_code);
    if (!card) return null;
    
    const position = spread.positions.find(p => p.id === positionId);
    if (!position) return null;
    
    return { card, drawnCard, position };
  };

  const handleCardClick = (positionId: string) => {
    const cardData = getCardForPosition(positionId);
    if (!cardData || cardData.drawnCard.is_revealed) return;
    
    // Reveal the card
    onCardReveal(positionId);
    
    // Show the card details
    setTimeout(() => {
      setSelectedCard(cardData);
    }, 300);
  };

  const handleRevealedCardClick = (positionId: string) => {
    const cardData = getCardForPosition(positionId);
    if (!cardData || !cardData.drawnCard.is_revealed) return;
    
    setSelectedCard(cardData);
  };

  // Component for rendering individual cards with 3D flip animation
  const CardComponent = ({ position, className = '', isMobile = false }: { position: Position; className?: string; isMobile?: boolean }) => {
    const cardData = getCardForPosition(position.id);
    const isRevealed = cardData?.drawnCard.is_revealed || false;
    
    return (
      <motion.div 
        className={`flex flex-col items-center ${className}`}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        {/* Position label */}
        <motion.div 
          className="text-center mb-3"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.1 }}
        >
          <div className="text-accent font-mono text-sm uppercase tracking-wider">
            {position.name}
          </div>
        </motion.div>
        
        {/* Card Container with 3D flip */}
        <div
          className={`relative cursor-pointer ${
            isMobile 
              ? 'w-full max-w-sm mx-auto aspect-[2/3]' 
              : 'w-32 h-48'
          }`}
          onClick={() => isRevealed ? handleRevealedCardClick(position.id) : handleCardClick(position.id)}
          style={{
            perspective: '1000px'  // Parent needs perspective
          }}
        >
          <motion.div
            className="relative w-full h-full card-flip-container"
            initial={false}
            animate={{ rotateY: isRevealed ? 180 : 0 }}
            transition={{
              duration: 1.2,
              ease: [0.68, -0.55, 0.27, 1.55] as const,
              type: "spring",
              stiffness: 200,
              damping: 20
            }}
            style={{
              transformOrigin: "center center"
            }}
            whileHover={!isRevealed ? {
              rotateY: 15,  // Slight pre-flip tease
              scale: 1.05
            } : {
              scale: 1.02
            }}
          >
            {/* Face-down card (front face) */}
          <motion.div 
            className="absolute inset-0 w-full h-full bg-surface-secondary border-2 border-accent/50 shadow-lg rounded-sm card-face card-face-front"
            animate={!isRevealed ? { 
              boxShadow: ["0 0 20px rgba(85, 98, 112, 0.1)", "0 0 30px rgba(85, 98, 112, 0.3)", "0 0 20px rgba(85, 98, 112, 0.1)"],
            } : {}}
            transition={!isRevealed ? {
              boxShadow: {
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut"
              }
            } : {}}
          >
            <div className="w-full h-full bg-gradient-to-br from-accent/20 to-accent/5 flex items-center justify-center rounded-sm">
              <motion.div 
                className="text-accent font-mono text-lg transform rotate-45"
                animate={{ 
                  rotate: [45, 90, 45],
                  scale: [1, 1.2, 1]
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              >
                ?
              </motion.div>
            </div>
          </motion.div>
          
          {/* Revealed card (back face) */}
          <motion.div 
            className={`absolute inset-0 w-full h-full border-2 border-accent shadow-lg rounded-sm card-face card-face-back ${
              cardData?.drawnCard.is_reversed ? 'rotate-180' : ''
            }`}
            initial={false}
            whileHover={isRevealed ? {
              borderColor: "rgba(85, 98, 112, 0.8)",
              boxShadow: "0 0 25px rgba(85, 98, 112, 0.4)"
            } : {}}
            transition={{ duration: 0.2 }}
          >
            {cardData && (
              <Image
                src={cardData.card.image}
                alt={cardData.card.name}
                width={isMobile ? 384 : 128}
                height={isMobile ? 576 : 192}
                className="w-full h-full object-cover rounded-sm"
              />
            )}
          </motion.div>
          </motion.div>
        </div>
        
        {/* Card name with fade-in animation (only shown when revealed) */}
        {isRevealed && cardData && (
          <motion.div 
            className="text-center mt-3 max-w-32"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <div className="text-foreground font-mono text-sm uppercase leading-tight">
              {cardData.card.name}
            </div>
            {cardData.drawnCard.is_reversed && (
              <motion.div 
                className="text-accent font-mono text-xs opacity-70 mt-1"
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.7 }}
                transition={{ duration: 0.3, delay: 0.6 }}
              >
                REVERSED
              </motion.div>
            )}
          </motion.div>
        )}
      </motion.div>
    );
  };

  // Animation variants for staggered entrance
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1
      }
    }
  };

  const cardVariants = {
    hidden: { 
      opacity: 0, 
      y: 30,
      scale: 0.9
    },
    visible: { 
      opacity: 1, 
      y: 0,
      scale: 1,
      transition: {
        duration: 0.6,
        ease: [0.25, 0.46, 0.45, 0.94] as const
      }
    }
  };

  // Mobile layout - vertical scrolling for all spreads
  const renderMobileLayout = () => {
    return (
      <motion.div 
        className="flex flex-col gap-6 py-4"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {spread.positions.map((position) => (
          <motion.div key={position.id} variants={cardVariants}>
            <CardComponent position={position} className="w-full" isMobile={true} />
          </motion.div>
        ))}
      </motion.div>
    );
  };

  // Desktop layouts based on spread type
  const renderDesktopLayout = () => {
    switch (spread.id) {
      case 'supply_run':
        return (
          <motion.div 
            className="flex justify-center items-center gap-8 py-8"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <motion.div variants={cardVariants}>
              <CardComponent position={spread.positions.find(p => p.id === 'past')!} />
            </motion.div>
            <motion.div variants={cardVariants}>
              <CardComponent position={spread.positions.find(p => p.id === 'present')!} />
            </motion.div>
            <motion.div variants={cardVariants}>
              <CardComponent position={spread.positions.find(p => p.id === 'future')!} />
            </motion.div>
          </motion.div>
        );
      
      case 'system_scan':
        return (
          <motion.div 
            className="flex flex-col items-center gap-6 py-8"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {/* Top card */}
            <motion.div className="flex justify-center" variants={cardVariants}>
              <CardComponent position={spread.positions.find(p => p.id === 'situation')!} />
            </motion.div>
            
            {/* Middle row - 3 cards */}
            <motion.div className="flex justify-center items-center gap-8" variants={cardVariants}>
              <CardComponent position={spread.positions.find(p => p.id === 'obstacle')!} />
              <CardComponent position={spread.positions.find(p => p.id === 'outcome')!} />
              <CardComponent position={spread.positions.find(p => p.id === 'advice')!} />
            </motion.div>
            
            {/* Bottom card */}
            <motion.div className="flex justify-center" variants={cardVariants}>
              <CardComponent position={spread.positions.find(p => p.id === 'person')!} />
            </motion.div>
          </motion.div>
        );
      
      case 'deep_space_anomaly':
        return (
          <motion.div 
            className="flex gap-16 py-8 justify-center"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {/* Left cross formation */}
            <div className="flex flex-col items-center">
              {/* Top */}
              <motion.div className="mb-6" variants={cardVariants}>
                <CardComponent position={spread.positions.find(p => p.id === 'possible_outcome')!} />
              </motion.div>
              
              {/* Middle row with crossed cards */}
              <motion.div className="flex items-center gap-6 mb-6" variants={cardVariants}>
                <CardComponent position={spread.positions.find(p => p.id === 'recent_past')!} />
                
                {/* Center crossed cards */}
                <div className="relative w-32 h-48 flex items-center justify-center">
                  {/* Present card (base) */}
                  <div className="absolute">
                    <CardComponent position={spread.positions.find(p => p.id === 'present')!} />
                  </div>
                  {/* Cross card (rotated, overlaid) */}
                  <div className="absolute transform rotate-90">
                    <CardComponent position={spread.positions.find(p => p.id === 'cross')!} />
                  </div>
                </div>
                
                <CardComponent position={spread.positions.find(p => p.id === 'near_future')!} />
              </motion.div>
              
              {/* Bottom */}
              <motion.div variants={cardVariants}>
                <CardComponent position={spread.positions.find(p => p.id === 'distant_past')!} />
              </motion.div>
            </div>
            
            {/* Right column */}
            <motion.div className="flex flex-col gap-4" variants={cardVariants}>
              <CardComponent position={spread.positions.find(p => p.id === 'final_outcome')!} />
              <CardComponent position={spread.positions.find(p => p.id === 'hopes_fears')!} />
              <CardComponent position={spread.positions.find(p => p.id === 'external_influences')!} />
              <CardComponent position={spread.positions.find(p => p.id === 'your_approach')!} />
            </motion.div>
          </motion.div>
        );
      
      default:
        // Fallback to simple row layout for unknown spreads
        return (
          <motion.div 
            className="flex justify-center items-center gap-8 py-8 flex-wrap"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {spread.positions.map((position) => (
              <motion.div key={position.id} variants={cardVariants}>
                <CardComponent position={position} />
              </motion.div>
            ))}
          </motion.div>
        );
    }
  };

  return (
    <div className="relative">
      {/* Spread Area */}
      <div className="bg-surface-secondary/30 border border-border/50 rounded-lg p-4 md:p-8">
        {/* Mobile Layout */}
        <div className="block md:hidden">
          {renderMobileLayout()}
        </div>
        
        {/* Desktop Layout */}
        <div className="hidden md:block">
          {renderDesktopLayout()}
        </div>
      </div>

      {/* Instructions */}
      <div className="text-center mt-8">
        {readingState === 'revealing' && (
          <p className="text-text-dim font-mono text-sm">
            activate constructs predetermined by your future manifestation - deviation from the timeline prohibited
          </p>
        )}
      </div>

      {/* Card Detail Modal */}
      {selectedCard && (
        <CardRevealModal
          card={selectedCard.card}
          drawnCard={selectedCard.drawnCard}
          position={selectedCard.position}
          interpretation={interpretations.find(i => i.positionId === selectedCard.position.id)}
          onClose={() => setSelectedCard(null)}
          onRetryInterpretation={() => onRetryInterpretation(selectedCard.position.id)}
        />
      )}
    </div>
  );
}
