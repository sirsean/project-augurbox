'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import { SPREADS, type Spread, type DrawnCard } from '@/types/reading';
import { getAllCards, type Card } from '@/lib/cards';
import SpreadLayout from '@/components/SpreadLayout';

type ReadingState = 'selecting' | 'shuffling' | 'drawing' | 'revealing' | 'complete';

interface CardInterpretation {
  positionId: string;
  interpretation: string;
  isLoading: boolean;
}

interface ReadingSynthesis {
  synthesis: string;
  isLoading: boolean;
  hasGenerated: boolean;
}

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
  const [interpretations, setInterpretations] = useState<CardInterpretation[]>([]);
  const [synthesis, setSynthesis] = useState<ReadingSynthesis>({
    synthesis: '',
    isLoading: false,
    hasGenerated: false
  });

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

  const getAIInterpretation = async (positionId: string) => {
    if (!spread) return;
    
    const revealedCard = drawnCards.find(card => card.position_id === positionId);
    const card = allCards.find(c => c.code === revealedCard?.card_code);
    
    if (!revealedCard || !card) return;
    
    // Set loading state
    setInterpretations(prev => [
      ...prev.filter(i => i.positionId !== positionId),
      { positionId, interpretation: '', isLoading: true }
    ]);
    
    try {
      // Get current revealed cards for context
      const revealedCards = drawnCards
        .filter(c => c.is_revealed && c.position_id !== positionId)
        .map(c => {
          const cardData = allCards.find(ac => ac.code === c.card_code);
          return {
            name: cardData?.name || 'Unknown',
            orientation: c.is_reversed ? 'Reversed' : 'Upright'
          };
        });
      
      const revealedPositions = drawnCards
        .filter(c => c.is_revealed && c.position_id !== positionId)
        .map(c => parseInt(c.position_id));
      
      const response = await fetch('/api/reading-update', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          readingType: spreadId,
          cards: revealedCards,
          positions: revealedPositions,
          recentCard: {
            card: {
              name: card.name,
              description: card.description
            },
            orientation: revealedCard.is_reversed ? 'Reversed' : 'Upright',
            position: parseInt(positionId)
          }
        })
      });
      
      const data = await response.json();
      
      if (data.success) {
        setInterpretations(prev => [
          ...prev.filter(i => i.positionId !== positionId),
          { positionId, interpretation: data.interpretation, isLoading: false }
        ]);
      } else {
        console.error('AI interpretation failed:', data.error);
        setInterpretations(prev => [
          ...prev.filter(i => i.positionId !== positionId),
          { positionId, interpretation: 'The neural pathways flicker... interpretation unavailable.', isLoading: false }
        ]);
      }
    } catch (error) {
      console.error('Failed to get AI interpretation:', error);
      setInterpretations(prev => [
        ...prev.filter(i => i.positionId !== positionId),
        { positionId, interpretation: 'Connection to the augurbox interrupted... data stream corrupted.', isLoading: false }
      ]);
    }
  };

  const revealCard = async (positionId: string) => {
    setDrawnCards(prev => prev.map(card => 
      card.position_id === positionId 
        ? { ...card, is_revealed: true }
        : card
    ));
    
    // Get AI interpretation for this card
    await getAIInterpretation(positionId);
    
    // Check if all cards are revealed
    const allRevealed = drawnCards.every(card => 
      card.position_id === positionId || card.is_revealed
    );
    
    if (allRevealed) {
      setTimeout(() => setReadingState('complete'), 500);
    }
  };

  const generateSynthesis = async () => {
    if (!spread || synthesis.isLoading || synthesis.hasGenerated) return;
    
    setSynthesis(prev => ({ ...prev, isLoading: true }));
    
    try {
      const response = await fetch('/api/reading-synthesis', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          readingType: spreadId,
          spread,
          drawnCards,
          allCards,
          interpretations: interpretations.filter(i => !i.isLoading)
        })
      });
      
      const data = await response.json();
      
      if (data.success) {
        setSynthesis({
          synthesis: data.synthesis,
          isLoading: false,
          hasGenerated: true
        });
      } else {
        console.error('AI synthesis failed:', data.error);
        setSynthesis({
          synthesis: 'The quantum matrix fluctuates... synthesis data corrupted. Neural pathways require recalibration.',
          isLoading: false,
          hasGenerated: true
        });
      }
    } catch (error) {
      console.error('Failed to generate synthesis:', error);
      setSynthesis({
        synthesis: 'Connection to augurbox main processor interrupted... synthesis transmission failed.',
        isLoading: false,
        hasGenerated: true
      });
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
          <div className="space-y-8">
            {/* Main spread area */}
            <div className="w-full">
              <SpreadLayout
                spread={spread}
                drawnCards={drawnCards}
                allCards={allCards}
                onCardReveal={revealCard}
                readingState={readingState}
              />
            </div>
            
            {/* Interpretations section */}
            <div className="w-full">
              {/* Instructions when no interpretations yet */}
              {interpretations.length === 0 && readingState === 'revealing' && (
                <div className="bg-surface-secondary/50 border border-border/30 p-6 text-center mb-8">
                  <div className="text-accent font-mono text-sm mb-2">
                    ⟨ AWAITING NEURAL LINK ⟩
                  </div>
                  <div className="text-text-dim font-mono text-xs">
                    Reveal cards to receive augurbox interpretations
                  </div>
                </div>
              )}
              
              {/* Show loading state */}
              {interpretations.some(i => i.isLoading) && (
                <div className="bg-surface-secondary border border-border p-6 mb-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-3 h-3 bg-accent rounded-full animate-pulse"></div>
                    <span className="text-accent font-mono text-sm animate-pulse">
                      NEURAL ANALYSIS IN PROGRESS...
                    </span>
                  </div>
                </div>
              )}
              
              {/* Generate Synthesis Button - only show when all cards are revealed */}
              {readingState === 'complete' && interpretations.filter(i => !i.isLoading).length === spread.positions.length && !synthesis.hasGenerated && (
                <div className="text-center mb-8">
                  <button
                    onClick={generateSynthesis}
                    disabled={synthesis.isLoading}
                    className="bg-accent hover:bg-accent-muted border border-border text-foreground font-mono font-bold py-4 px-8 text-sm uppercase tracking-wider transition-all duration-300 hover:shadow-md hover:shadow-accent/20 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {synthesis.isLoading ? (
                      <div className="flex items-center space-x-2">
                        <div className="w-3 h-3 bg-foreground rounded-full animate-pulse"></div>
                        <span>GENERATING SYNTHESIS...</span>
                      </div>
                    ) : (
                      '⚡ GENERATE SYNTHESIS'
                    )}
                  </button>
                  <p className="text-text-dim font-mono text-xs mt-4">
                    Combine all interpretations into a comprehensive analysis
                  </p>
                </div>
              )}
              
              {/* Synthesis Display */}
              {synthesis.hasGenerated && (
                <div className="mb-8">
                  <h3 className="text-accent font-mono text-xl uppercase tracking-wider mb-6 text-center border-b border-accent/50 pb-4">
                    ⟨ FINAL SYNTHESIS ⟩
                  </h3>
                  
                  <div className="bg-accent/10 border-2 border-accent/30 p-8 shadow-lg shadow-accent/10">
                    <div className="text-foreground text-lg leading-relaxed whitespace-pre-wrap">
                      {synthesis.synthesis}
                    </div>
                  </div>
                </div>
              )}
              
              {/* Synthesis Loading State */}
              {synthesis.isLoading && (
                <div className="mb-8">
                  <h3 className="text-accent font-mono text-xl uppercase tracking-wider mb-6 text-center border-b border-accent/50 pb-4">
                    ⟨ FINAL SYNTHESIS ⟩
                  </h3>
                  
                  <div className="bg-surface-secondary border border-border p-8">
                    <div className="flex items-center justify-center space-x-4">
                      <div className="w-4 h-4 bg-accent rounded-full animate-pulse"></div>
                      <span className="text-accent font-mono text-lg animate-pulse">
                        QUANTUM MATRIX SYNTHESIS IN PROGRESS...
                      </span>
                    </div>
                    <div className="text-center mt-4">
                      <div className="text-text-dim font-mono text-sm">
                        Analyzing probability convergence patterns...
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Interpretations grid - newest first */}
              {interpretations.filter(i => !i.isLoading).length > 0 && (
                <div>
                  <h3 className="text-accent font-mono text-lg uppercase tracking-wider mb-6 text-center border-b border-border/50 pb-4">
                    ⟨ AUGURBOX TRANSMISSIONS ⟩
                  </h3>
                  
                  <div className="flex flex-col gap-4">
                    {interpretations
                      .filter(i => !i.isLoading)
                      .reverse() // Newest first
                      .map((interpretation, reverseIndex) => {
                        const position = spread.positions.find(p => p.id === interpretation.positionId);
                        const drawnCard = drawnCards.find(dc => dc.position_id === interpretation.positionId);
                        const card = allCards.find(c => c.code === drawnCard?.card_code);
                        const originalIndex = interpretations.filter(i => !i.isLoading).length - reverseIndex;
                        
                        return (
                          <div key={`${interpretation.positionId}-${originalIndex}`} 
                               className="bg-surface-secondary border border-border p-6 transition-all duration-300 hover:border-accent/30">
                            {/* Header */}
                            <div className="flex items-center justify-between mb-4">
                              <div className="flex items-center space-x-3">
                                <div className="w-2 h-2 bg-accent rounded-full"></div>
                                <div className="text-accent font-mono text-sm font-bold">
                                  {position?.name || `Position ${interpretation.positionId}`}
                                </div>
                              </div>
                              <div className="text-text-dim font-mono text-xs">
                                [{String(originalIndex).padStart(2, '0')}]
                              </div>
                            </div>
                            
                            {/* Card info */}
                            <div className="text-text-dim font-mono text-sm mb-4 border-l-2 border-accent/30 pl-3">
                              {card?.name} {drawnCard?.is_reversed ? '(Reversed)' : '(Upright)'}
                            </div>
                            
                            {/* Interpretation */}
                            <div className="text-foreground text-base leading-relaxed">
                              {interpretation.interpretation}
                            </div>
                          </div>
                        );
                      })
                    }
                  </div>
                </div>
              )}
            </div>
          </div>
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

