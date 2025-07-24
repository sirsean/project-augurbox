'use client';

import { useState } from 'react';
import Image from 'next/image';
import { type Spread, type DrawnCard, type Position } from '@/types/reading';
import { type Card } from '@/lib/cards';
import CardRevealModal from './CardRevealModal';

interface SpreadLayoutProps {
  spread: Spread;
  drawnCards: DrawnCard[];
  allCards: Card[];
  onCardReveal: (positionId: string) => void;
  readingState: 'revealing' | 'complete';
}

export default function SpreadLayout({ 
  spread, 
  drawnCards, 
  allCards, 
  onCardReveal, 
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

  return (
    <div className="relative">
      {/* Spread Area */}
      <div className="relative mx-auto" style={{ minHeight: '600px', maxWidth: '1000px' }}>
        {/* Background surface */}
        <div className="absolute inset-0 bg-surface-secondary/30 border border-border/50"></div>
        
        {/* Position labels and cards */}
        {spread.positions.map((position) => {
          const cardData = getCardForPosition(position.id);
          const isRevealed = cardData?.drawnCard.is_revealed || false;
          
          return (
            <div
              key={position.id}
              className="absolute transform -translate-x-1/2 -translate-y-1/2"
              style={{
                left: `${position.x}%`,
                top: `${position.y}%`
              }}
            >
              {/* Position label */}
              <div className="text-center mb-2">
                <div className="text-accent font-mono text-xs uppercase tracking-wider">
                  {position.name}
                </div>
                <div className="text-text-dim font-mono text-xs opacity-70">
                  {position.description}
                </div>
              </div>
              
              {/* Card */}
              <div
                className={`relative w-24 h-36 cursor-pointer transition-all duration-300 ${
                  isRevealed 
                    ? 'hover:scale-105 hover:shadow-lg hover:shadow-accent/20' 
                    : 'hover:shadow-lg hover:shadow-accent/30 animate-pulse'
                }`}
                onClick={() => isRevealed ? handleRevealedCardClick(position.id) : handleCardClick(position.id)}
              >
                {!isRevealed ? (
                  // Face-down card
                  <div className="w-full h-full bg-surface-secondary border-2 border-accent/50 shadow-lg">
                    <div className="w-full h-full bg-gradient-to-br from-accent/20 to-accent/5 flex items-center justify-center">
                      <div className="text-accent font-mono text-xs transform rotate-45">
                        ?
                      </div>
                    </div>
                  </div>
                ) : (
                  // Revealed card
                  <div className={`w-full h-full border-2 border-accent shadow-lg transition-transform duration-300 ${
                    cardData?.drawnCard.is_reversed ? 'rotate-180' : ''
                  }`}>
                    <Image
                      src={cardData!.card.image}
                      alt={cardData!.card.name}
                      width={96}
                      height={144}
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}
              </div>
              
              {/* Card name (only shown when revealed) */}
              {isRevealed && cardData && (
                <div className="text-center mt-2 max-w-24">
                  <div className="text-foreground font-mono text-xs uppercase truncate">
                    {cardData.card.name}
                  </div>
                  {cardData.drawnCard.is_reversed && (
                    <div className="text-accent font-mono text-xs opacity-70">
                      REVERSED
                    </div>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Instructions */}
      <div className="text-center mt-8">
        {readingState === 'revealing' && (
          <p className="text-text-dim font-mono text-sm">
            Click on face-down cards to reveal them and begin your reading
          </p>
        )}
      </div>

      {/* Card Detail Modal */}
      {selectedCard && (
        <CardRevealModal
          card={selectedCard.card}
          drawnCard={selectedCard.drawnCard}
          position={selectedCard.position}
          onClose={() => setSelectedCard(null)}
        />
      )}
    </div>
  );
}
