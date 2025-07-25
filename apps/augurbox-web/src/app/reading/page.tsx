'use client';

import Link from 'next/link';
import Navbar from '@/components/Navbar';
import { SPREADS } from '@/types/reading';

export default function ReadingPage() {
  return (
    <div className="min-h-screen bg-surface grain" style={{background: 'linear-gradient(135deg, #0d0f12 0%, #151821 50%, #1a1d26 100%)'}}>
      <Navbar />
      
      <main className="max-w-6xl mx-auto px-4 py-16 relative z-10">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 text-accent font-fringe" style={{textShadow: '0 0 20px rgba(85, 98, 112, 0.3)'}}>
            CHOOSE YOUR PATH
          </h1>
          <p className="text-xl text-foreground mb-4">
            Select a divination protocol to interface with the AUGURBOX
          </p>
          <p className="text-text-dim font-mono text-sm max-w-2xl mx-auto">
            Each spread accesses different neural pathways of the augury system, 
            revealing varying depths of temporal and dimensional analysis.
          </p>
        </div>

        <div className="grid md:grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
          {SPREADS.map((spread, index) => (
            <div 
              key={spread.id}
              className="bg-surface-secondary/60 border border-border hover:bg-surface-secondary/80 transition-all duration-500 hover:shadow-lg hover:shadow-accent/10 group"
            >
              <div className="p-8">
                <div className="flex items-center justify-between mb-6">
                  <div className="text-2xl text-accent font-mono">
                    [{String(index + 1).padStart(2, '0')}]
                  </div>
                  <div className="text-accent text-lg">
                    {spread.positions.length} CARDS
                  </div>
                </div>
                
                <h2 className="text-2xl font-bold mb-2 text-foreground tracking-wide group-hover:text-accent transition-colors">
                  {spread.lore_name.toUpperCase()}
                </h2>
                
                <p className="text-text-dim text-sm font-mono mb-6 opacity-70">
                  {spread.name}
                </p>
                
                <p className="text-foreground mb-8 leading-relaxed">
                  {spread.description}
                </p>

                {/* Simple visual representation of the spread */}
                <div className="relative h-24 mb-8 bg-surface/40 border border-border/30">
                  {spread.positions.map((position) => (
                    <div
                      key={position.id}
                      className="absolute w-3 h-4 bg-accent/60 border border-accent/80 transform -translate-x-1/2 -translate-y-1/2"
                      style={{
                        left: `${position.x}%`,
                        top: `${position.y}%`
                      }}
                      title={position.name}
                    />
                  ))}
                </div>

                <Link
                  href={`/reading/${spread.id}`}
                  className="block w-full bg-accent hover:bg-accent-muted border border-border text-foreground font-mono font-bold py-3 px-6 text-center text-sm uppercase tracking-wider transition-all duration-300 hover:shadow-md hover:shadow-accent/20"
                >
                  ▶ INITIALIZE PROTOCOL
                </Link>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center">
          <Link
            href="/"
            className="inline-block text-text-dim hover:text-foreground font-mono text-sm uppercase tracking-wider transition-colors border-b border-transparent hover:border-text-dim"
          >
            ← RETURN TO AUGURBOX
          </Link>
        </div>
      </main>
    </div>
  );
}
