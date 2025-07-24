'use client';

import { useEffect } from 'react';
import Image from 'next/image';
import { type Card } from '@/lib/cards';
import { type DrawnCard, type Position } from '@/types/reading';

interface CardRevealModalProps {
  card: Card;
  drawnCard: DrawnCard;
  position: Position;
  onClose: () => void;
}

// Generate Fringe-style names and drifter prompts based on card
const getCardInterpretation = (card: Card, isReversed: boolean, position: Position) => {
  // Generate Fringe-style name by transforming the original name
  const fringeName = `The ${card.name.replace(/^The /, '').replace(/of /, 'of the ').replace(/\b\w/g, l => l.toUpperCase())} Breach`;
  
  // Get meaning - use reversed if applicable
  const meanings = isReversed ? card.meanings.reversed : card.meanings.upright;
  const meaning = Array.isArray(meanings) ? meanings[0] : meanings;
  
  // Generate system warning style meaning
  const systemMeaning = isReversed 
    ? `System Alert: ${meaning}. Inverse protocols detected.`
    : `Status: ${meaning}. Systems nominal.`;
  
  // Generate drifter prompt based on card and position
  const drifterPrompts: Record<string, string> = {
    // Major Arcana
    'The Fool': 'What unknown frontier are you facing, and are you truly prepared for what\'s on the other side?',
    'The Magician': 'What tools do you possess that you haven\'t fully utilized? How can you channel your potential into reality?',
    'The High Priestess': 'What hidden knowledge is trying to surface in your consciousness? Are you listening to your intuition?',
    'The Empress': 'In what areas of your life are you being called to nurture and create? What wants to be born through you?',
    'The Emperor': 'Where do you need to establish better structure and authority in your life? What requires your leadership?',
    
    // Vials (Resources/Emotions)
    'Two of Vials': 'What partnership or alliance could bring mutual benefit to your current situation?',
    'Three of Vials': 'How can you better celebrate shared successes with your community?',
    'Four of Vials': 'What opportunities are you contemplating that might require careful evaluation?',
    'Five of Vials': 'What loss of resources or relationships are you still processing?',
    
    // Tools (Action/Engineering)
    'Ace of Tools': 'What creative project or new construction is calling for your energy and skills?',
    'Two of Tools': 'What long-term strategic vision are you developing for your territory or domain?',
    'Three of Tools': 'What expansion or growth opportunities are you observing on the horizon?',
    'Four of Tools': 'What achievement or successful completion deserves recognition and celebration?',
    
    // Comms (Information/Strategy)
    'Ace of Comms': 'What breakthrough in understanding or communication clarity do you need to embrace?',
    'Two of Comms': 'What conflicting information sources require you to rely on your inner wisdom?',
    'Three of Comms': 'What painful truth or betrayal through information do you need to process?',
    'Four of Comms': 'Where in your life do you need to create space for silence from information overload?',
    
    // Gear (Material/Security)
    'Ace of Gear': 'What new equipment, tool, or material opportunity is presenting itself to you?',
    'Two of Gear': 'How can you better balance and maintain the essential resources you depend on?',
    'Three of Gear': 'What collaborative construction or infrastructure project requires your expertise?',
    'Four of Gear': 'What are you holding onto too tightly that might be limiting your security or growth?'
  };
  
  const drifterPrompt = drifterPrompts[card.name] || `How does the energy of ${card.name} relate to your current situation in ${position.name.toLowerCase()}?`;
  
  return {
    fringeName,
    systemMeaning,
    drifterPrompt
  };
};

export default function CardRevealModal({ card, drawnCard, position, onClose }: CardRevealModalProps) {
  const interpretation = getCardInterpretation(card, drawnCard.is_reversed, position);

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
      <div className="bg-surface border-2 border-accent max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="border-b border-border p-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold text-accent mb-2">{interpretation.fringeName}</h2>
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

        <div className="grid md:grid-cols-2 gap-8 p-6">
          {/* Card Image */}
          <div className="space-y-4">
            <div className={`relative mx-auto w-64 h-96 border-2 border-accent shadow-lg shadow-accent/20 ${
              drawnCard.is_reversed ? 'rotate-180' : ''
            }`}>
              <Image
                src={card.image}
                alt={card.name}
                fill
                className="object-cover"
              />
            </div>
            
            <div className="text-center space-y-2">
              <div className="text-foreground font-bold text-lg">{card.name}</div>
              <div className="text-text-dim font-mono text-sm">{card.description}</div>
              {drawnCard.is_reversed && (
                <div className="text-accent font-mono text-sm font-bold">⟲ REVERSED ORIENTATION</div>
              )}
            </div>
          </div>

          {/* Card Details */}
          <div className="space-y-6">
            {/* Position Context */}
            <div className="bg-surface-secondary/50 border border-border p-4">
              <h3 className="text-accent font-mono text-sm uppercase tracking-wider mb-2">
                Position Context
              </h3>
              <div className="text-foreground font-bold mb-2">{position.name}</div>
              <div className="text-text-dim text-sm">{position.description}</div>
            </div>

            {/* System Reading */}
            <div className="bg-surface-secondary/50 border border-border p-4">
              <h3 className="text-accent font-mono text-sm uppercase tracking-wider mb-2">
                System Reading
              </h3>
              <div className="text-foreground text-sm leading-relaxed">
                {interpretation.systemMeaning}
              </div>
            </div>

            {/* Keywords */}
            <div className="bg-surface-secondary/50 border border-border p-4">
              <h3 className="text-accent font-mono text-sm uppercase tracking-wider mb-2">
                Core Frequencies
              </h3>
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

            {/* Drifter's Prompt */}
            <div className="bg-accent/10 border border-accent p-4">
              <h3 className="text-accent font-mono text-sm uppercase tracking-wider mb-2">
                The Drifter's Prompt
              </h3>
              <div className="text-foreground italic leading-relaxed">
                "{interpretation.drifterPrompt}"
              </div>
            </div>

            {/* Card Prompt (Full Description) */}
            <div className="bg-surface-secondary/50 border border-border p-4">
              <h3 className="text-accent font-mono text-sm uppercase tracking-wider mb-2">
                Neural Imprint
              </h3>
              <div className="text-text-dim text-sm leading-relaxed">
                {card.prompt}
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="border-t border-border p-6 text-center">
          <button
            onClick={onClose}
            className="bg-accent hover:bg-accent-muted border border-border text-foreground font-mono font-bold py-3 px-8 text-sm uppercase tracking-wider transition-all duration-300"
          >
            ← CONTINUE READING
          </button>
        </div>
      </div>
    </div>
  );
}
