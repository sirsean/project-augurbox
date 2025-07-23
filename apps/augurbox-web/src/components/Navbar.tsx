import Link from 'next/link';

export default function Navbar() {
  return (
    <nav className="bg-surface border-b border-border shadow-xl relative z-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link href="/" className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-accent border border-border rounded-none flex items-center justify-center">
                <span className="text-foreground font-bold text-sm font-mono">◉</span>
              </div>
              <span className="text-foreground font-mono font-bold text-lg tracking-wider">AUGURBOX</span>
            </Link>
          </div>
          
          <div className="flex items-center space-x-1">
            <Link 
              href="/" 
              className="text-text-dim hover:text-foreground px-4 py-2 border border-transparent hover:border-border rounded-none text-xs font-mono uppercase tracking-wider transition-all duration-300"
            >
              HOME
            </Link>
            <Link 
              href="/reading" 
              className="text-text-dim hover:text-foreground px-4 py-2 border border-transparent hover:border-border rounded-none text-xs font-mono uppercase tracking-wider transition-all duration-300"
            >
              READING
            </Link>
            <Link 
              href="/cards" 
              className="text-text-dim hover:text-foreground px-4 py-2 border border-transparent hover:border-border rounded-none text-xs font-mono uppercase tracking-wider transition-all duration-300"
            >
              ARCHIVE
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
