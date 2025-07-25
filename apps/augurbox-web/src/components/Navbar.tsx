import Link from 'next/link';
import Image from 'next/image';

export default function Navbar() {
  return (
    <nav className="bg-surface border-b border-border shadow-xl relative z-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link href="/" className="flex items-center space-x-3">
              <div className="w-8 h-8 border border-border rounded-none flex items-center justify-center overflow-hidden">
                <Image
                  src="/android-chrome-512x512.png"
                  alt="Augurbox Logo"
                  width={32}
                  height={32}
                  className="object-contain"
                />
              </div>
              <span className="text-foreground font-fringe font-bold text-lg tracking-wider hidden sm:inline">PROJECT: AUGURBOX</span>
              <span className="text-foreground font-fringe font-bold text-sm tracking-wider sm:hidden">AUGURBOX</span>
            </Link>
          </div>
          
          <div className="flex items-center space-x-1">
            <Link 
              href="/" 
              className="text-text-dim hover:text-foreground px-2 sm:px-4 py-2 border border-transparent hover:border-border rounded-none text-xs font-mono uppercase tracking-wider transition-all duration-300"
            >
              HOME
            </Link>
            <Link 
              href="/reading" 
              className="text-text-dim hover:text-foreground px-2 sm:px-4 py-2 border border-transparent hover:border-border rounded-none text-xs font-mono uppercase tracking-wider transition-all duration-300"
            >
              <span className="hidden sm:inline">READING</span>
              <span className="sm:hidden">READ</span>
            </Link>
            <Link 
              href="/cards" 
              className="text-text-dim hover:text-foreground px-2 sm:px-4 py-2 border border-transparent hover:border-border rounded-none text-xs font-mono uppercase tracking-wider transition-all duration-300"
            >
              <span className="hidden sm:inline">ARCHIVE</span>
              <span className="sm:hidden">arch</span>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
