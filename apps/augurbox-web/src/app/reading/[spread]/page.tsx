'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import { SPREADS, type Spread, type DrawnCard } from '@/types/reading';
import { getAllCards, type Card } from '@/lib/cards';
import SpreadLayout from '@/components/SpreadLayout';

type ReadingState = 'selecting' | 'shuffling' | 'drawing' | 'revealing' | 'complete';

export default function SpreadReadingPage() {
  const params = useParams();
  const router = useRouter();
  const spreadId = params.spread as string;
  
  const [spread, setSpread] = useState<Spread | null>(null);
  const [allCards, setAllCards] = useState<Card[]>([]);
  const [readingState, setReadingState] = useState<ReadingState>('selecting');
  const [drawnCards, setDrawnCards] = useState<DrawnCard[]>([]);
  const [shuffledCards, setShuffledCards] = useState<Card[]>([]);
  const [isShuffling, setIsShuffling] = useState(false);

  // Find the selected spread
  useEffect(() => {
    const foundSpread = SPREADS.find(s => s.id === spreadId);
    if (!foundSpread) {
      router.push('/reading');
      return;
    }
    setSpread(foundSpread);
    
    // Load all cards
    const cards = getAllCards();
    setAllCards(cards);
    
    // Initialize shuffled deck
    const shuffled = [...cards].sort(() => Math.random() - 0.5);
    setShuffledCards(shuffled);
  }, [spreadId, router]);

  const shuffleDeck = () => {
    if (isShuffling) return;
    
    setIsShuffling(true);
    setReadingState('shuffling');
    
    // Animate shuffling for 2 seconds
    const shuffleInterval = setInterval(() => {
      setShuffledCards(prev => [...prev].sort(() => Math.random() - 0.5));
    }, 100);
    
    setTimeout(() => {
      clearInterval(shuffleInterval);
      setIsShuffling(false);
      setReadingState('drawing');
    }, 2000);
  };

  const drawCards = () => {
    if (!spread || readingState !== 'drawing') return;
    
    const drawn: DrawnCard[] = [];
    for (let i = 0; i < spread.positions.length; i++) {
      const card = shuffledCards[i];
      drawn.push({
        card_code: card.code,
        position_id: spread.positions[i].id,
        is_reversed: Math.random() < 0.3, // 30% chance of reversed
        is_revealed: false
      });
    }
    
    setDrawnCards(drawn);
    setReadingState('revealing');
  };

  const revealCard = (positionId: string) => {
    setDrawnCards(prev => prev.map(card => 
      card.position_id === positionId 
        ? { ...card, is_revealed: true }
        : card
    ));
    
    // Check if all cards are revealed
    const allRevealed = drawnCards.every(card => 
      card.position_id === positionId || card.is_revealed
    );
    
    if (allRevealed) {
      setTimeout(() => setReadingState('complete'), 500);
    }
  };


  if (!spread) {
    return (
      <div className="min-h-screen bg-surface grain flex items-center justify-center">
        <div className="text-accent font-mono">INITIALIZING PROTOCOL...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-surface grain" style={{background: 'linear-gradient(135deg, #0d0f12 0%, #151821 50%, #1a1d26 100%)'}}>
      <Navbar />
      
      <main className="max-w-7xl mx-auto px-4 py-8 relative z-10">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-5xl font-bold mb-4 text-accent" style={{textShadow: '0 0 20px rgba(85, 98, 112, 0.3)'}}>
            {spread.lore_name.toUpperCase()}
          </h1>
          <p className="text-foreground mb-2">{spread.description}</p>
          <p className="text-text-dim font-mono text-sm">
            STATUS: {readingState.toUpperCase().replace('_', ' ')}
          </p>
        </div>

        {/* Deck and Controls */}
        {readingState === 'selecting' && (
          <div className="text-center mb-16">
            <div className="mb-8">
              <div className="inline-block relative">
                <div className="w-32 h-48 bg-surface-secondary border-2 border-accent/50 shadow-lg shadow-accent/20">
                  <div className="w-full h-full bg-gradient-to-br from-accent/20 to-accent/5 flex items-center justify-center">
                    <div className="text-accent font-mono text-xs transform rotate-45">AUGUR</div>
                  </div>
                </div>
                <div className="absolute -top-1 -right-1 w-32 h-48 bg-surface-secondary/80 border border-accent/30 -z-10"></div>
                <div className="absolute -top-2 -right-2 w-32 h-48 bg-surface-secondary/60 border border-accent/20 -z-20"></div>
              </div>
            </div>
            
            <button
              onClick={shuffleDeck}
              className="bg-accent hover:bg-accent-muted border border-border text-foreground font-mono font-bold py-4 px-8 text-sm uppercase tracking-wider transition-all duration-300 hover:shadow-md hover:shadow-accent/20"
            >
              ▶ SHUFFLE DECK
            </button>
            
            <p className="text-text-dim font-mono text-xs mt-4">
              Click to initialize the neural deck interface
            </p>
          </div>
        )}

        {readingState === 'shuffling' && (
          <div className="text-center mb-16">
            <div className="mb-8">
              <div className="inline-block relative animate-pulse">
                <div className="w-32 h-48 bg-surface-secondary border-2 border-accent shadow-lg shadow-accent/40">
                  <div className="w-full h-full bg-gradient-to-br from-accent/40 to-accent/10 flex items-center justify-center">
                    <div className="text-accent font-mono text-xs transform rotate-45 animate-spin">SYNC</div>
                  </div>
                </div>
              </div>
            </div>
            
            <p className="text-accent font-mono text-sm animate-pulse">
              SYNCHRONIZING NEURAL PATHWAYS...
            </p>
          </div>
        )}

        {readingState === 'drawing' && (
          <div className="text-center mb-16">
            <div className="mb-8">
              <div className="inline-block relative">
                <div className="w-32 h-48 bg-surface-secondary border-2 border-accent/70 shadow-lg shadow-accent/30 cursor-pointer hover:shadow-accent/50 transition-shadow"
                     onClick={drawCards}>
                  <div className="w-full h-full bg-gradient-to-br from-accent/30 to-accent/10 flex items-center justify-center">
                    <div className="text-accent font-mono text-xs transform rotate-45">DRAW</div>
                  </div>
                </div>
              </div>
            </div>
            
            <button
              onClick={drawCards}
              className="bg-accent hover:bg-accent-muted border border-border text-foreground font-mono font-bold py-4 px-8 text-sm uppercase tracking-wider transition-all duration-300 hover:shadow-md hover:shadow-accent/20"
            >
              ▶ DRAW {spread.positions.length} CARDS
            </button>
            
            <p className="text-text-dim font-mono text-xs mt-4">
              The deck is ready. Draw your cards to begin the reading.
            </p>
          </div>
        )}

        {/* Spread Layout */}
        {(readingState === 'revealing' || readingState === 'complete') && (
          <SpreadLayout
            spread={spread}
            drawnCards={drawnCards}
            allCards={allCards}
            onCardReveal={revealCard}
            readingState={readingState}
          />
        )}

        {/* Navigation */}
        <div className="text-center mt-16">
          <Link
            href="/reading"
            className="inline-block text-text-dim hover:text-foreground font-mono text-sm uppercase tracking-wider transition-colors border-b border-transparent hover:border-text-dim"
          >
            ← CHOOSE DIFFERENT PROTOCOL
          </Link>
        </div>
      </main>
    </div>
  );
}

