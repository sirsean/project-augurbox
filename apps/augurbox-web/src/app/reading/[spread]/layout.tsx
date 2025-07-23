import { SPREADS } from '@/types/reading';

// Generate static params for all spreads
export async function generateStaticParams() {
  return SPREADS.map((spread) => ({
    spread: spread.id,
  }));
}

interface LayoutProps {
  children: React.ReactNode;
  params: Promise<{ spread: string }>;
}

export default function SpreadLayout({ children }: LayoutProps) {
  return children;
}
