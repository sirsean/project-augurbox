'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { useStreamingText } from '@/hooks/useStreamingText';
import StreamingText from '@/components/StreamingText';
import Navbar from '@/components/Navbar';
import { SPREADS, type Spread, type DrawnCard } from '@/types/reading';
import { getAllCards, type Card } from '@/lib/cards';
import SpreadLayout from '@/components/SpreadLayout';
import MysticalShuffle from '@/components/MysticalShuffle';

type ReadingState = 'selecting' | 'shuffling' | 'drawing' | 'revealing' | 'complete';

interface CardInterpretation {
  positionId: string;
  interpretation: string;
  isLoading: boolean;
  isStreaming: boolean;
  isComplete: boolean;
  error: string | null;
  retryable: boolean;
}

interface ReadingSynthesis {
  synthesis: string;
  isLoading: boolean;
  isStreaming: boolean;
  hasGenerated: boolean;
  error: string | null;
  retryable: boolean;
}

export default function SpreadReadingPage() {
  const params = useParams();
  const router = useRouter();
  const spreadId = params.spread as string;
  
  // Use streaming hook for synthesis
  const synthesisStreaming = useStreamingText();

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
    isStreaming: false,
    hasGenerated: false,
    error: null,
    retryable: false
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

  const getAIInterpretation = async (positionId: string, useStreaming: boolean = true) => {
    if (!spread) return;
    
    const revealedCard = drawnCards.find(card => card.position_id === positionId);
    const card = allCards.find(c => c.code === revealedCard?.card_code);
    
    if (!revealedCard || !card) return;
    
    // Set loading state in interpretations
    setInterpretations(prev => [
      ...prev.filter(i => i.positionId !== positionId),
      { 
        positionId, 
        interpretation: '', 
        isLoading: true, 
        isStreaming: false,
        isComplete: false,
        error: null, 
        retryable: false 
      }
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
        .map(c => c.position_id);
      
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
            position: positionId
          },
          stream: useStreaming
        })
      });
      
      // Process streaming directly to avoid shared state issues
      const contentType = response.headers.get('content-type');
      const transferEncoding = response.headers.get('transfer-encoding'); 
      const isStreamingResponse = useStreaming && response.body && 
        (contentType?.includes('text/plain') || transferEncoding === 'chunked');
      
      if (isStreamingResponse) {
        // Handle streaming response directly
        const reader = response.body.getReader();
        const decoder = new TextDecoder('utf-8');
        let accumulatedText = '';
        let buffer = '';
        
        // Set streaming state
        setInterpretations(prev => prev.map(i => 
          i.positionId === positionId ? { ...i, isStreaming: true, isLoading: false } : i
        ));
        
        const processStream = async (): Promise<void> => {
          const { done, value } = await reader.read();
          
          if (done) {
            // Stream complete
            setInterpretations(prev => prev.map(i => 
              i.positionId === positionId ? {
                ...i,
                interpretation: accumulatedText,
                isLoading: false,
                isStreaming: false,
                isComplete: true
              } : i
            ));
            return;
          }
          
          // Decode the chunk and add to buffer
          const chunk = decoder.decode(value, { stream: true });
          buffer += chunk;
          
          // Parse SSE format: look for "data: {json}" lines
          const lines = buffer.split('\n');
          buffer = lines.pop() || ''; // Keep incomplete line in buffer
          
          for (const line of lines) {
            if (line.startsWith('data: ') && line !== 'data: [DONE]') {
              try {
                const jsonStr = line.substring(6); // Remove "data: " prefix
                const data = JSON.parse(jsonStr);
                
                if (data.response) {
                  accumulatedText += data.response;
                  
                  // Update state with new text
                  setInterpretations(prev => prev.map(i => 
                    i.positionId === positionId ? {
                      ...i,
                      interpretation: accumulatedText,
                      isLoading: false,
                      isStreaming: true
                    } : i
                  ));
                  
                  // Small delay to make streaming visible
                  await new Promise(resolve => setTimeout(resolve, 50));
                }
              } catch (e) {
                console.warn('Failed to parse SSE data:', line, e);
              }
            }
          }
          
          // Continue processing
          await processStream();
        };
        
        await processStream();
      } else {
        // Handle regular JSON response
        const data = await response.json();
        
        if (data.success) {
          setInterpretations(prev => [
            ...prev.filter(i => i.positionId !== positionId),
            { 
              positionId, 
              interpretation: data.interpretation,
              isLoading: false, 
              isStreaming: false,
              isComplete: true,
              error: null, 
              retryable: false
            }
          ]);
        } else {
          setInterpretations(prev => [
            ...prev.filter(i => i.positionId !== positionId),
            { 
              positionId, 
              interpretation: '',
              isLoading: false, 
              isStreaming: false,
              isComplete: false,
              error: data.error || 'AI interpretation failed', 
              retryable: data.retryable || false
            }
          ]);
        }
      }

    } catch (error) {
      console.error('Failed to get AI interpretation:', error);
      setInterpretations(prev => [
        ...prev.filter(i => i.positionId !== positionId),
        { 
          positionId, 
          interpretation: '', 
          isLoading: false, 
          isStreaming: false,
          isComplete: false,
          error: 'Connection to the augurbox interrupted... data stream corrupted.',
          retryable: false
        }
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

  const generateSynthesis = async (useStreaming: boolean = true) => {
    if (!spread || synthesis.isLoading) return;
    
    setSynthesis(prev => ({ 
      ...prev, 
      isLoading: true, 
      isStreaming: false,
      error: null, 
      retryable: false,
      synthesis: ''
    }));
    
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
          interpretations: interpretations.filter(i => !i.isLoading),
          stream: useStreaming
        })
      });
      
      // Use the streaming hook to process the response
      await synthesisStreaming.processStreamingResponse(response);
      
      // Update synthesis with final result
      setSynthesis({
        synthesis: synthesisStreaming.text,
        isLoading: synthesisStreaming.isLoading,
        isStreaming: synthesisStreaming.isStreaming,
        hasGenerated: synthesisStreaming.isComplete,
        error: synthesisStreaming.error,
        retryable: synthesisStreaming.retryable
      });

    } catch (error) {
      console.error('Failed to generate synthesis:', error);
      setSynthesis({
        synthesis: '',
        isLoading: false,
        isStreaming: false,
        hasGenerated: false,
        error: 'Connection to augurbox main processor interrupted... synthesis transmission failed.',
        retryable: false
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

        {/* Deck states - selecting, shuffling, drawing */}
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
              initiate temporal scan sequence - construct matrix awaiting synchronization
            </p>
          </div>
        )}

        {readingState === 'shuffling' && (
          <div className="relative h-96 mb-16">
            <MysticalShuffle isActive={readingState === 'shuffling'} />
            
            <div className="absolute bottom-0 left-0 right-0 text-center z-20">
              <p className="text-accent font-mono text-sm animate-pulse mb-2">
                SYNCHRONIZING NEURAL PATHWAYS...
              </p>
              <div className="text-text-dim font-mono text-xs">
                quantum probability matrices converging... temporal vortex stabilizing...
              </div>
            </div>
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
              ▶ MANIFEST {spread.positions.length} CONSTRUCTS
            </button>
            
            <p className="text-text-dim font-mono text-xs mt-4">
            temporal nexus stabilized - manifest the constructs determined by your future self
            </p>
          </div>
        )}

        {/* Spread Layout and Reading Interface */}
        {(readingState === 'revealing' || readingState === 'complete') && (
          <div className="space-y-8">
            {/* Main spread area */}
            <div className="w-full">
              <SpreadLayout
                spread={spread}
                drawnCards={drawnCards}
                allCards={allCards}
                interpretations={interpretations}
                onCardReveal={revealCard}
                onRetryInterpretation={getAIInterpretation}
                readingState={readingState}
              />
            </div>
            
            {/* Interpretations section */}
            <div className="w-full">
              {/* Show synthesis when complete */}
              {readingState === 'complete' && interpretations.filter(i => !i.isLoading).length === spread.positions.length && (
                <>
                  {/* Generate Synthesis Button */}
                  {!synthesisStreaming.isComplete && !synthesisStreaming.isLoading && !synthesisStreaming.isStreaming && !synthesisStreaming.text && (
                    <div className="text-center mb-8">
                      <button
                        onClick={() => generateSynthesis()}
                        className="bg-accent hover:bg-accent-muted border border-border text-foreground font-mono font-bold py-4 px-8 text-sm uppercase tracking-wider transition-all duration-300 hover:shadow-md hover:shadow-accent/20"
                      >
                        ⚡ GENERATE SYNTHESIS
                      </button>
                      <p className="text-text-dim font-mono text-xs mt-4">
                        converge all temporal threads into final probability matrix
                      </p>
                    </div>
                  )}
                  
                  {/* Synthesis Display */}
                  {(synthesisStreaming.isComplete || synthesisStreaming.isLoading || synthesisStreaming.isStreaming || synthesisStreaming.text) && (
                    <div className="mb-8">
                      <h3 className="text-accent font-mono text-xl uppercase tracking-wider mb-6 text-center border-b border-accent/50 pb-4">
                        ⟨ FINAL SYNTHESIS ⟩
                      </h3>
                      
                        <div className="bg-accent/10 border-2 border-accent/30 p-8 shadow-lg shadow-accent/10">
                          <StreamingText
                            text={synthesisStreaming.text}
                            isLoading={synthesisStreaming.isLoading}
                            isStreaming={synthesisStreaming.isStreaming}
                            isComplete={synthesisStreaming.isComplete}
                            error={synthesisStreaming.error}
                            className="text-foreground text-lg leading-relaxed"
                            showCursor={true}
                            loadingMessage="establishing quantum entanglement with probability matrices"
                          />
                        </div>
                    </div>
                  )}
                </>
              )}

              {/* Interpretations List */}
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
                               className={`border p-6 transition-all duration-300 ${
                                 interpretation.error ? 'bg-red-900/10 border-red-500/30' : 'bg-surface-secondary border-border hover:border-accent/30'
                               }`}>
                            {/* Header */}
                            <div className="flex items-center justify-between mb-4">
                              <div className="flex items-center space-x-3">
                                <div className={`w-2 h-2 rounded-full ${
                                  interpretation.error ? 'bg-red-400' : 'bg-accent'
                                }`}></div>
                                <div className={`font-mono text-sm font-bold ${
                                  interpretation.error ? 'text-red-400' : 'text-accent'
                                }`}>
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
                            
                            {/* Interpretation Content */}
                            <StreamingText
                              text={interpretation.interpretation}
                              isLoading={interpretation.isLoading}
                              isStreaming={interpretation.isStreaming}
                              isComplete={interpretation.isComplete}
                              error={null}
                              className="text-foreground text-base leading-relaxed"
                            />
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
