'use client';

import { useEffect } from 'react';
import Image from 'next/image';
import { type Card } from '@/lib/cards';
import { type DrawnCard, type Position } from '@/types/reading';

interface CardInterpretation {
  positionId: string;
  interpretation: string;
  isLoading: boolean;
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

  return (
    <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
      <div className="bg-surface border-2 border-accent max-w-5xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="border-b border-border p-6">
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
            <button
              onClick={onClose}
              className="text-text-dim hover:text-accent font-mono text-2xl transition-colors"
            >
              ×
            </button>
          </div>
        </div>

        <div className="p-8">
          {/* Large Card Image - Centered and Prominent */}
          <div className="text-center mb-8">
            <div className={`relative mx-auto w-80 h-[480px] border-2 border-accent shadow-xl shadow-accent/30 ${
              drawnCard.is_reversed ? 'rotate-180' : ''
            }`}>
              <Image
                src={card.image}
                alt={card.name}
                fill
                className="object-cover"
                priority
              />
            </div>
          </div>

          {/* Card Information Grid */}
          <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {/* Position Context */}
            <div className="bg-surface-secondary/50 border border-border p-4">
              <h3 className="text-accent font-mono text-sm uppercase tracking-wider mb-3">
                Position Context
              </h3>
              <div className="text-foreground font-bold mb-2">{position.name}</div>
              <div className="text-text-dim text-sm leading-relaxed">{position.description}</div>
            </div>

            {/* Combined System Reading & Core Frequencies */}
            <div className="bg-surface-secondary/50 border border-border p-4">
              <h3 className="text-accent font-mono text-sm uppercase tracking-wider mb-3">
                Core Frequencies
              </h3>
              <div className="text-foreground text-sm leading-relaxed mb-3">
                {drawnCard.is_reversed ? 'Inverse protocols detected.' : 'Systems nominal.'}
              </div>
              <div className="flex flex-wrap gap-2">
                {card.keywords.map((keyword, index) => (
                  <span
                    key={index}
                    className="px-2 py-1 bg-accent/20 border border-accent/40 text-accent font-mono text-xs uppercase"
                  >
                    {keyword}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* AI Interpretation - Full Width */}
          <div className="mt-6 max-w-4xl mx-auto">
            <div className="bg-accent/10 border border-accent p-6">
              <h3 className="text-accent font-mono text-sm uppercase tracking-wider mb-3">
                Augurbox Neural Analysis
              </h3>
              {interpretation?.isLoading ? (
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
                <div className="text-foreground leading-relaxed">
                  {interpretation.interpretation}
                </div>
              ) : (
                <div className="text-text-dim italic leading-relaxed">
                  temporal link establishing... augurbox transmissions will manifest upon construct activation
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="border-t border-border p-6 text-center">
          <button
            onClick={onClose}
            className="bg-accent hover:bg-accent-muted border border-border text-foreground font-mono font-bold py-3 px-8 text-sm uppercase tracking-wider transition-all duration-300"
          >
            ← CONTINUE TEMPORAL SEQUENCE
          </button>
        </div>
      </div>
    </div>
  );
}
