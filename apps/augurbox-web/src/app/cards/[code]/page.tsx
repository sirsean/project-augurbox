import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import { getCardByCode, getSuitDisplayName } from '@/lib/cards';

interface Props {
  params: Promise<{
    code: string;
  }>;
}

export default async function CardPage({ params }: Props) {
  const { code } = await params;
  const card = getCardByCode(code);

  if (!card) {
    notFound();
  }

  const cardTypeDisplay = card.type === 'major' 
    ? 'Major Arcana' 
    : `Minor Arcana - ${getSuitDisplayName(card.suit as any)}`;

  return (
    <div className="min-h-screen bg-surface grain" style={{background: 'linear-gradient(135deg, #0d0f12 0%, #151821 50%, #1a1d26 100%)'}}>
      <Navbar />
      
      <main className="max-w-6xl mx-auto px-4 py-8 relative z-10">
        {/* Back button */}
        <div className="mb-8">
          <Link 
            href="/cards"
            className="inline-flex items-center text-accent hover:text-foreground transition-colors font-mono text-sm uppercase tracking-wider border-b border-transparent hover:border-accent pb-1"
          >
            ◀ RETURN TO ARCHIVE
          </Link>
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-start">
          {/* Card Image */}
          <div className="sticky top-8">
            <div className="relative aspect-[2/3] max-w-md mx-auto overflow-hidden rounded-none border border-border shadow-2xl shadow-accent/10">
              <Image
                src={card.image}
                alt={card.name}
                fill
                priority
                sizes="(max-width: 768px) 90vw, 50vw"
                className="object-cover"
              />
            </div>
          </div>

          {/* Card Details */}
          <div className="text-foreground space-y-8">
            <div>
              <div className="text-xs text-accent mb-2 uppercase tracking-widest font-mono border-b border-border pb-2">
                {cardTypeDisplay.toUpperCase()}
              </div>
              <h1 className="text-3xl md:text-4xl font-bold mb-4 text-accent font-mono tracking-wider" style={{textShadow: '0 0 20px rgba(85, 98, 112, 0.3)'}}>
                {card.name.toUpperCase()}
              </h1>
              <p className="text-lg text-text-dim font-mono leading-relaxed">
                {card.description}
              </p>
            </div>

            {/* Keywords */}
            <div>
              <h2 className="text-lg font-bold mb-4 text-foreground font-mono tracking-wider uppercase border-b border-border pb-2">OPERATIONAL TAGS</h2>
              <div className="flex flex-wrap gap-2">
                {card.keywords.map((keyword, index) => (
                  <span
                    key={index}
                    className="bg-surface-secondary border border-border px-3 py-1 rounded-none text-xs font-mono text-text-dim uppercase tracking-wide"
                  >
                    {keyword}
                  </span>
                ))}
              </div>
            </div>

            {/* Full Description */}
            <div>
              <h2 className="text-lg font-bold mb-4 text-foreground font-mono tracking-wider uppercase border-b border-border pb-2">SYNTHESIS PROTOCOL</h2>
              <p className="text-text-dim leading-relaxed font-mono text-sm">
                {card.prompt}
              </p>
            </div>

            {/* Card Meanings */}
            <div>
              <h2 className="text-lg font-bold mb-4 text-foreground font-mono tracking-wider uppercase border-b border-border pb-2">OPERATIONAL PARAMETERS</h2>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-surface-secondary/60 border border-border rounded-none p-6">
                  <h3 className="text-sm font-bold mb-3 text-accent font-mono uppercase tracking-wider">STANDARD CONFIG</h3>
                  <ul className="space-y-2">
                    {card.meanings.upright.map((meaning, index) => (
                      <li key={index} className="text-text-dim text-sm font-mono leading-relaxed">
                        ▸ {meaning}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="bg-surface-secondary/60 border border-border rounded-none p-6">
                  <h3 className="text-sm font-bold mb-3 text-warning font-mono uppercase tracking-wider">INVERTED CONFIG</h3>
                  <ul className="space-y-2">
                    {card.meanings.reversed.map((meaning, index) => (
                      <li key={index} className="text-text-dim text-sm font-mono leading-relaxed">
                        ▸ {meaning}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            {/* Card Info */}
            <div className="bg-surface-secondary/60 border border-border rounded-none p-6">
              <h2 className="text-lg font-bold mb-4 text-foreground font-mono tracking-wider uppercase border-b border-border pb-2">CONSTRUCT METADATA</h2>
              <div className="grid grid-cols-2 gap-4 text-xs font-mono">
                <div>
                  <span className="text-text-dim uppercase tracking-wider">ID:</span>
                  <span className="ml-2 text-accent">{card.code}</span>
                </div>
                <div>
                  <span className="text-text-dim uppercase tracking-wider">CLASS:</span>
                  <span className="ml-2 text-foreground">{card.type === 'major' ? 'MAJOR' : 'MINOR'}</span>
                </div>
                {card.suit && (
                  <div>
                    <span className="text-text-dim uppercase tracking-wider">SUITE:</span>
                    <span className="ml-2 text-foreground uppercase">{card.suit}</span>
                  </div>
                )}
                <div>
                  <span className="text-text-dim uppercase tracking-wider">INDEX:</span>
                  <span className="ml-2 text-foreground">{card.number}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

// Generate static params for all cards
export async function generateStaticParams() {
  // We'll import the cards data to get all codes
  const { getAllCards } = await import('@/lib/cards');
  const cards = getAllCards();
  
  return cards.map((card) => ({
    code: card.code,
  }));
}
