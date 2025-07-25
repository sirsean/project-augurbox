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

// Generate detailed lore descriptions for cards based on Fringe universe context
function getCardLoreDescription(card: { type: string; code: string; suit?: string; description: string; name: string }): string {
  const majorArcanaLore: Record<string, string> = {
    'MAJ_00': 'The Greenhorn represents the archetypal newcomer to the Fringe—those brave or foolish enough to venture beyond the safety of established territories. Every Drifter begins as a Greenhorn, carrying nothing but hope and determination into the vast unknown. In the harsh reality of the Scablands, this energy can lead to either spectacular discovery or devastating failure.',
    'MAJ_01': 'The Engineer embodies the technical mastery that keeps civilization alive in the Fringe. Members of the Engineers Guild are revered for their ability to coax life from broken machinery and create solutions from salvaged parts. This construct represents focused willpower and the transformation of raw materials into functional tools.',
    'MAJ_02': 'The Void Drifter walks the spaces between worlds, attuned to cosmic anomalies and the whispers of ancient technologies. These solitary figures understand that true knowledge comes not from data cores or archives, but from listening to the universe itself. They represent intuition and connection to forces beyond normal perception.',
    'MAJ_03': 'The Scablands stretch endlessly across alien worlds, harsh but abundant with resources for those who know how to harvest them. This construct represents the raw creative potential of untamed nature, the birthplace of new life and the graveyard of old civilizations.',
    'MAJ_04': 'The Guild Magnate represents consolidated power and authority in the Fringe. These individuals have built empires from trade routes and resource claims, establishing the structures that allow civilization to persist in the wilderness. They embody leadership through organization and control.',
    'MAJ_05': 'Duzi, The Orator serves as the keeper of Fringe legends and the voice of cultural memory. In a society where history is easily lost to time and disaster, the Orator preserves the stories that define who the Drifters are and where they come from. This represents tradition, wisdom, and the power of narrative.',
    'MAJ_06': 'The Union of Merchants represents the delicate alliances that form the backbone of Fringe commerce. These partnerships are born of necessity—survival often depends on cooperation between groups that might otherwise be rivals. This construct embodies choice, alliance, and the balance of mutual benefit.',
    'MAJ_07': 'The Longhauler pilots massive cargo vessels through the dangers of deep space and hostile terrain. These skilled operators represent determination and control, pushing forward despite overwhelming obstacles. Their vessels become symbols of progress through willpower and expertise.',
    'MAJ_08': 'The Tamer represents those who have learned to work with the dangerous wildlife of the Fringe rather than simply destroying it. Through patience and understanding, they turn potential threats into allies. This construct embodies inner strength expressed through compassion and wisdom.',
    'MAJ_09': 'The Prospector works alone in the furthest reaches of known space, seeking resources and opportunities others have missed. They represent the value of solitude and introspection, finding wealth through careful observation and independent thinking.',
    'MAJ_10': 'The Breach represents the sudden cosmic events that reshape reality in the Fringe—wormholes, temporal anomalies, and dimensional rifts that change everything in an instant. This construct embodies the cycles of destruction and renewal that govern life on the frontier.',
    'MAJ_11': 'The Contract represents the binding agreements that create order in a lawless frontier. In the Fringe, your word is often the only currency that matters, and broken contracts can mean death. This construct embodies justice, accountability, and the consequences of choice.',
    'MAJ_12': 'The Salvager works suspended in zero gravity, recovering valuable materials from derelict vessels and abandoned stations. This precarious position offers a unique perspective on the nature of loss and recovery. The construct represents sacrifice that leads to new understanding.',
    'MAJ_13': 'Signal Lost represents the final transmission—the moment when communication ceases and a Drifter passes beyond the reach of civilization. In the Fringe, death often comes quietly, marked only by silence where once there was contact. This construct embodies transformation through endings.',
    'MAJ_14': 'The Gastro-Alchemist of the Borsh Conservatory transforms raw materials into stable, life-sustaining compounds. Their work requires precise balance and patience, creating harmony from disparate elements. This construct represents moderation, balance, and the art of synthesis.',
    'MAJ_15': 'The Loot Eater is a cautionary figure—a Drifter consumed by greed for artifacts and wealth. Their obsession with material gain blinds them to the true treasures of the Fringe: knowledge, community, and freedom. This construct represents the dangers of unchecked desire.',
    'MAJ_16': 'The Lykenrot Breach was a catastrophic event where a massive creature eruption devastated an entire sector. It serves as a reminder that the Fringe contains forces beyond human comprehension or control. This construct represents sudden upheaval and the collapse of seemingly stable systems.',
    'MAJ_17': 'The Lighthouse Sept provides a beacon of hope for lost travelers, guiding ships safely through dangerous space. These installations represent renewal, hope, and the promise that even in the darkest reaches of the Fringe, there are those who work to help others find their way.',
    'MAJ_18': 'The Mesmegraph is an ancient piece of technology that projects realistic hallucinations directly into the observer\'s mind. It represents the thin line between reality and illusion, the power of perception to shape experience, and the dangers of living in denial.',
    'MAJ_19': 'The Aurelian Bloom is a rare alien plant that brings life and vitality wherever it grows. Its appearance marks locations of exceptional fertility and growth potential. This construct represents joy, success, and the triumph of life over the harsh conditions of the Fringe.',
    'MAJ_20': 'The Augurbox itself—an ancient AI that judges and questions those who seek its wisdom. It represents moments of final reckoning, spiritual awakening, and the call to account for one\'s choices. The Augurbox sees beyond surface appearances to the truth beneath.',
    'MAJ_21': 'The Free Fringe represents the ultimate ideal of Drifter society—a space where individuals can pursue their own destiny without interference from corporate overlords or government bureaucrats. This construct embodies completion, integration, and the fulfillment of the frontier dream.'
  };

  const suitLore: Record<string, string> = {
    'tools': 'Tools represent the fire of action and creation in Fringe society. These constructs embody the engineering spirit that transforms raw materials into functional technology, the ambition that drives Drifters to build something lasting in the wilderness.',
    'vials': 'Vials represent the life-sustaining resources that flow through Fringe civilization like water. These constructs embody the emotional and material wealth that connects communities, the bonds of mutual support that allow survival in hostile territory.',
    'comms': 'Comms represent the flow of information that serves as the air of Fringe society. These constructs embody communication, strategy, and the truth that must be carefully distinguished from deception in a world where reliable information can mean the difference between life and death.',
    'gear': 'Gear represents the material foundation that provides earth-like stability in the chaos of the Fringe. These constructs embody equipment, territory, and the security that comes from proper preparation and resource management.'
  };

  // Return specific lore for Major Arcana or general suit lore for Minor Arcana
  if (card.type === 'major' && majorArcanaLore[card.code]) {
    return majorArcanaLore[card.code];
  } else if (card.suit && suitLore[card.suit]) {
    return `${suitLore[card.suit]} This particular construct represents ${card.description.toLowerCase()}, manifesting these elemental forces through ${card.name.toLowerCase().replace(/^(the |ace of |two of |three of |four of |five of |six of |seven of |eight of |nine of |ten of |page of |knight of |queen of |king of )/, '')}.`;
  }
  
  return card.description;
}

export default async function CardPage({ params }: Props) {
  const { code } = await params;
  const card = getCardByCode(code);

  if (!card) {
    notFound();
  }

  const cardTypeDisplay = card.type === 'major' 
    ? 'Major Arcana' 
    : `Minor Arcana${card.suit ? ` - ${getSuitDisplayName(card.suit)}` : ''}`;
  
  const loreDescription = getCardLoreDescription(card);

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

        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Card Image - Mobile responsive */}
          <div className="order-1 lg:order-1">
            <div className="lg:sticky lg:top-8">
              <div className="relative aspect-[2/3] max-w-sm mx-auto lg:max-w-md overflow-hidden border border-border shadow-2xl shadow-accent/10">
                <Image
                  src={card.image}
                  alt={card.name}
                  fill
                  priority
                  sizes="(max-width: 640px) 80vw, (max-width: 1024px) 50vw, 40vw"
                  className="object-cover"
                />
              </div>
            </div>
          </div>

          {/* Card Details */}
          <div className="order-2 lg:order-2 space-y-6 lg:space-y-8">
            {/* Header */}
            <div>
              <div className="text-xs text-accent mb-2 uppercase tracking-widest font-mono border-b border-border pb-2">
                {cardTypeDisplay.toUpperCase()}
              </div>
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-4 text-accent font-mono tracking-wider" style={{textShadow: '0 0 20px rgba(85, 98, 112, 0.3)'}}>
                {card.name.toUpperCase()}
              </h1>
            </div>

            {/* Core Frequencies - Single section with tag-style keywords */}
            <div>
              <h2 className="text-accent font-mono text-sm uppercase tracking-wider mb-3">
                Core Frequencies
              </h2>
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

            {/* Construct Analysis - Detailed lore description */}
            <div>
              <h2 className="text-lg font-bold mb-4 text-foreground font-mono tracking-wider uppercase border-b border-border pb-2">
                Construct Analysis
              </h2>
              <div className="text-text-dim leading-relaxed text-sm sm:text-base space-y-4">
                <p>{loreDescription}</p>
              </div>
            </div>


            {/* Construct Metadata - Consolidated info */}
            <div className="bg-surface-secondary/60 border border-border p-4 lg:p-6">
              <h2 className="text-lg font-bold mb-4 text-foreground font-mono tracking-wider uppercase border-b border-border pb-2">
                Construct Metadata
              </h2>
              <div className="grid grid-cols-2 gap-4 text-xs font-mono">
                <div>
                  <span className="text-text-dim uppercase tracking-wider">ID:</span>
                  <span className="ml-2 text-accent">{card.code}</span>
                </div>
                <div>
                  <span className="text-text-dim uppercase tracking-wider">Class:</span>
                  <span className="ml-2 text-foreground">{card.type === 'major' ? 'Major' : 'Minor'}</span>
                </div>
                {card.suit && (
                  <div>
                    <span className="text-text-dim uppercase tracking-wider">Suite:</span>
                    <span className="ml-2 text-foreground uppercase">{card.suit}</span>
                  </div>
                )}
                <div>
                  <span className="text-text-dim uppercase tracking-wider">Index:</span>
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
