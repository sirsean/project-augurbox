import Image from 'next/image';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import { getCardsByType, getSuitDisplayName, getSuitDescription } from '@/lib/cards';
import type { Card, CardSuit } from '@/types/card';

function CardGrid({ cards, title }: { cards: Card[], title: string }) {
  return (
    <div className="mb-16">
      <h2 className="text-2xl font-bold text-foreground mb-8 font-mono tracking-wider uppercase">{title}</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
        {cards.map((card) => (
          <Link key={card.code} href={`/cards/${card.code}`} className="group">
            <div className="relative aspect-[2/3] overflow-hidden rounded-none bg-surface border border-border hover:border-accent transition-all duration-500 hover:shadow-lg hover:shadow-accent/20">
              <Image
                src={card.image}
                alt={card.name}
                fill
                sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, (max-width: 1024px) 25vw, 16vw"
                className="object-cover opacity-90 group-hover:opacity-100 transition-opacity duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-surface/95 via-transparent to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-2 border-t border-border/50">
                <h3 className="text-foreground font-mono text-xs text-center leading-tight tracking-wide uppercase">
                  {card.name}
                </h3>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

function SuitSection({ suit, cards }: { suit: CardSuit, cards: Card[] }) {
  return (
    <div className="mb-16">
      <div className="mb-8 border-b border-border pb-4">
        <h2 className="text-xl font-bold text-foreground mb-2 font-mono tracking-wider uppercase">{getSuitDisplayName(suit)}</h2>
        <p className="text-text-dim text-sm font-mono leading-relaxed">{getSuitDescription(suit)}</p>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-3">
        {cards.map((card) => (
          <Link key={card.code} href={`/cards/${card.code}`} className="group">
            <div className="relative aspect-[2/3] overflow-hidden rounded-none bg-surface border border-border hover:border-accent transition-all duration-500 hover:shadow-lg hover:shadow-accent/20">
              <Image
                src={card.image}
                alt={card.name}
                fill
                sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, (max-width: 1024px) 25vw, 14vw"
                className="object-cover opacity-90 group-hover:opacity-100 transition-opacity duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-surface/95 via-transparent to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-2 border-t border-border/50">
                <h3 className="text-foreground font-mono text-xs text-center leading-tight tracking-wide uppercase">
                  {card.name}
                </h3>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default function CardsPage() {
  const cardsByType = getCardsByType();

  return (
    <div className="min-h-screen bg-surface grain" style={{background: 'linear-gradient(135deg, #0d0f12 0%, #151821 50%, #1a1d26 100%)'}}>
      <Navbar />
      
      <main className="max-w-7xl mx-auto px-4 py-8 relative z-10">
        <div className="text-center mb-16 border-b border-border pb-8">
          <h1 className="text-3xl md:text-5xl font-bold text-accent mb-4 font-fringe tracking-widest uppercase" style={{textShadow: '0 0 20px rgba(85, 98, 112, 0.3)'}}>
            ARCHIVE ACCESS
          </h1>
          <p className="text-lg text-text-dim max-w-2xl mx-auto font-mono leading-relaxed">
            Complete collection of neural-generated constructs, each with unique synthesis protocols and traditional operational parameters.
          </p>
        </div>

        {/* Major Arcana */}
        <CardGrid 
          cards={cardsByType.major} 
          title="MAJOR ARCANA // 22 CONSTRUCTS"
        />

        {/* Minor Arcana */}
        <div className="mb-12 text-center border-b border-border pb-6">
          <h1 className="text-2xl font-bold text-foreground mb-4 font-mono tracking-widest uppercase">MINOR ARCANA // 56 CONSTRUCTS</h1>
        </div>

        <SuitSection suit="tools" cards={cardsByType.minor.tools} />
        <SuitSection suit="vials" cards={cardsByType.minor.vials} />
        <SuitSection suit="comms" cards={cardsByType.minor.comms} />
        <SuitSection suit="gear" cards={cardsByType.minor.gear} />
      </main>
    </div>
  );
}
