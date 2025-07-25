'use client';

import { useState } from 'react';
import Image from 'next/image';
import { type Spread, type DrawnCard, type Position } from '@/types/reading';
import { type Card } from '@/lib/cards';
import CardRevealModal from './CardRevealModal';

interface CardInterpretation {
  positionId: string;
  interpretation: string;
  isLoading: boolean;
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

  // Component for rendering individual cards
  const CardComponent = ({ position, className = '', isMobile = false }: { position: Position; className?: string; isMobile?: boolean }) => {
    const cardData = getCardForPosition(position.id);
    const isRevealed = cardData?.drawnCard.is_revealed || false;
    
    return (
      <div className={`flex flex-col items-center ${className}`}>
        {/* Position label */}
        <div className="text-center mb-3">
          <div className="text-accent font-mono text-sm uppercase tracking-wider">
            {position.name}
          </div>
        </div>
        
        {/* Card */}
        <div
          className={`relative cursor-pointer transition-all duration-300 ${
            isMobile 
              ? 'w-full max-w-sm mx-auto aspect-[2/3]' 
              : 'w-32 h-48'
          } ${
            isRevealed 
              ? 'hover:scale-105 hover:shadow-lg hover:shadow-accent/20' 
              : 'hover:shadow-lg hover:shadow-accent/30 animate-pulse'
          }`}
          onClick={() => isRevealed ? handleRevealedCardClick(position.id) : handleCardClick(position.id)}
        >
          {!isRevealed ? (
            // Face-down card
            <div className="w-full h-full bg-surface-secondary border-2 border-accent/50 shadow-lg rounded-sm">
              <div className="w-full h-full bg-gradient-to-br from-accent/20 to-accent/5 flex items-center justify-center rounded-sm">
                <div className="text-accent font-mono text-sm transform rotate-45">
                  ?
                </div>
              </div>
            </div>
          ) : (
            // Revealed card
            <div className={`w-full h-full border-2 border-accent shadow-lg transition-transform duration-300 rounded-sm ${
              cardData?.drawnCard.is_reversed ? 'rotate-180' : ''
            }`}>
              <Image
                src={cardData!.card.image}
                alt={cardData!.card.name}
                width={128}
                height={192}
                className="w-full h-full object-cover rounded-sm"
              />
            </div>
          )}
        </div>
        
        {/* Card name (only shown when revealed) */}
        {isRevealed && cardData && (
          <div className="text-center mt-3 max-w-32">
            <div className="text-foreground font-mono text-sm uppercase leading-tight">
              {cardData.card.name}
            </div>
            {cardData.drawnCard.is_reversed && (
              <div className="text-accent font-mono text-xs opacity-70 mt-1">
                REVERSED
              </div>
            )}
          </div>
        )}
      </div>
    );
  };

  // Mobile layout - vertical scrolling for all spreads
  const renderMobileLayout = () => {
    return (
      <div className="flex flex-col gap-6 py-4">
        {spread.positions.map((position) => (
          <CardComponent key={position.id} position={position} className="w-full" isMobile={true} />
        ))}
      </div>
    );
  };

  // Desktop layouts based on spread type
  const renderDesktopLayout = () => {
    switch (spread.id) {
      case 'supply_run':
        return (
          <div className="flex justify-center items-center gap-8 py-8">
            <CardComponent position={spread.positions.find(p => p.id === 'past')!} />
            <CardComponent position={spread.positions.find(p => p.id === 'present')!} />
            <CardComponent position={spread.positions.find(p => p.id === 'future')!} />
          </div>
        );
      
      case 'system_scan':
        return (
          <div className="flex flex-col items-center gap-6 py-8">
            {/* Top card */}
            <div className="flex justify-center">
              <CardComponent position={spread.positions.find(p => p.id === 'situation')!} />
            </div>
            
            {/* Middle row - 3 cards */}
            <div className="flex justify-center items-center gap-8">
              <CardComponent position={spread.positions.find(p => p.id === 'obstacle')!} />
              <CardComponent position={spread.positions.find(p => p.id === 'outcome')!} />
              <CardComponent position={spread.positions.find(p => p.id === 'advice')!} />
            </div>
            
            {/* Bottom card */}
            <div className="flex justify-center">
              <CardComponent position={spread.positions.find(p => p.id === 'person')!} />
            </div>
          </div>
        );
      
      case 'deep_space_anomaly':
        return (
          <div className="flex gap-16 py-8 justify-center">
            {/* Left cross formation */}
            <div className="flex flex-col items-center">
              {/* Top */}
              <div className="mb-6">
                <CardComponent position={spread.positions.find(p => p.id === 'possible_outcome')!} />
              </div>
              
              {/* Middle row with crossed cards */}
              <div className="flex items-center gap-6 mb-6">
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
              </div>
              
              {/* Bottom */}
              <div>
                <CardComponent position={spread.positions.find(p => p.id === 'distant_past')!} />
              </div>
            </div>
            
            {/* Right column */}
            <div className="flex flex-col gap-4">
              <CardComponent position={spread.positions.find(p => p.id === 'final_outcome')!} />
              <CardComponent position={spread.positions.find(p => p.id === 'hopes_fears')!} />
              <CardComponent position={spread.positions.find(p => p.id === 'external_influences')!} />
              <CardComponent position={spread.positions.find(p => p.id === 'your_approach')!} />
            </div>
          </div>
        );
      
      default:
        // Fallback to simple row layout for unknown spreads
        return (
          <div className="flex justify-center items-center gap-8 py-8 flex-wrap">
            {spread.positions.map((position) => (
              <CardComponent key={position.id} position={position} />
            ))}
          </div>
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
            Click on face-down constructs to reveal them and begin your reading
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
