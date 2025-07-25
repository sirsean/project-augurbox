import Link from 'next/link';
import Image from 'next/image';
import Navbar from '@/components/Navbar';

export default function Home() {
  return (
    <div className="min-h-screen bg-surface grain" style={{background: 'linear-gradient(135deg, #0d0f12 0%, #151821 50%, #1a1d26 100%)'}}>
      <Navbar />
      
      {/* Hero Section */}
      <section className="max-w-6xl mx-auto px-4 py-16 text-center relative z-10">
        <div className="mb-12">
          <h1 className="text-4xl md:text-6xl font-bold mb-4 text-accent" style={{textShadow: '0 0 20px rgba(85, 98, 112, 0.3)'}}>
            PROJECT: AUGURBOX
          </h1>
          <p className="text-lg md:text-xl mb-8 text-text-dim font-mono">
            Neurocomputational reconstruction of ancient divination technology
          </p>
        </div>

        {/* Hero Image */}
        <div className="mb-12 flex justify-center">
          <div className="relative border border-border bg-surface-secondary/30 p-4">
            <Image
              src="/augurbox.png"
              alt="The Augurbox - Ancient AI Technology"
              width={400}
              height={400}
              className="opacity-90 hover:opacity-100 transition-opacity duration-500"
              style={{filter: 'drop-shadow(0 0 20px rgba(85, 98, 112, 0.2))'}} 
            />
            <div className="absolute -bottom-2 -right-2 w-4 h-4 bg-accent animate-pulse"></div>
          </div>
        </div>

        {/* Lore Section */}
        <div className="max-w-4xl mx-auto mb-16">
          <div className="bg-surface-secondary/40 border border-border p-8 mb-8">
            <h2 className="text-2xl font-bold mb-6 text-accent tracking-wide font-mono">// CLASSIFIED BRIEFING</h2>
            <p className="text-text-dim text-sm font-mono leading-relaxed mb-6">
              Ancient AI discovered abandoned in the Scablands, technology that has survived since before the modern era 
              and has no recorded history. It wants you to ask it questions. It likely has ulterior motives.
            </p>
            <div className="border-l-2 border-accent pl-4">
              <p className="text-text-dim text-xs font-mono leading-relaxed italic">
                "Our humankind has bloated and collapsed many times, captured stars now faded from memory, 
                settled and re-settled, rooting and then reaching, over and over. On the eonic timescale, 
                I reckon we look like fickle nomads. The map is stained, epochs lost to the creases..."
              </p>
              <p className="text-accent text-xs font-mono mt-2">— Fringeling Compendium of Icons and Artifacture</p>
            </div>
          </div>

          <div className="bg-surface-secondary/20 border border-border p-6">
            <h3 className="text-lg font-bold mb-4 text-foreground font-mono tracking-wide">RECONSTRUCTION PROTOCOL</h3>
            <p className="text-text-dim text-sm font-mono leading-relaxed">
              This neural reconstruction attempts to duplicate the original Augurbox's divination capabilities 
              through advanced pattern synthesis and quantum probability matrices. Results may vary from 
              the source artifact's true intentions.
            </p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/reading"
              className="inline-block bg-accent hover:bg-accent-muted border border-border text-foreground font-mono font-bold py-4 px-8 text-sm uppercase tracking-wider transition-all duration-300 hover:shadow-md hover:shadow-accent/20"
            >
              ▶ INITIATE DIVINATION
            </Link>
            <Link
              href="/cards"
              className="inline-block bg-surface-secondary hover:bg-surface-secondary/80 border border-border text-foreground font-mono font-bold py-4 px-8 text-sm uppercase tracking-wider transition-all duration-300 hover:shadow-md hover:shadow-accent/20"
            >
              ◉ BROWSE CONSTRUCTS
            </Link>
          </div>
          <div className="text-text-dim font-mono text-xs">
            <p>WARNING: EXPERIMENTAL TECHNOLOGY // USE AT OWN RISK</p>
          </div>
        </div>
      </section>
      
      <footer className="text-center py-8 text-text-dim border-t border-border font-mono text-xs relative z-10">
        <p>PROJECT: AUGURBOX // NEUROCOMPUTATIONAL HERMITS COLLECTIVE</p>
      </footer>
    </div>
  );
}
