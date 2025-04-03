import DiamondGallery from '@/components/DiamondGallery';
import StatsOverview from '@/components/StatsOverview';
import DiamondVisualizations from '@/components/DiamondVisualizations';
import DiamondCalculator from '@/components/DiamondCalculator';
import AboutUs from '@/components/AboutUs';
import { headers } from 'next/headers';

interface Diamond {
  id?: number;
  carat: number;
  cut: string;
  color: string;
  clarity: string;
  depth: number;
  table: number;
  price: number;
  x: number;
  y: number;
  z: number;
}

async function getDiamondData(): Promise<Diamond[]> {
  const headersList = headers();
  const protocol = headersList.get('x-forwarded-proto') || 'http';
  const host = headersList.get('host') || 'localhost:3000';
  const apiUrl = `${protocol}://${host}/api/diamonds`;

  const res = await fetch(apiUrl, {
    next: { revalidate: 3600 } // Revalidate every hour
  });
  
  if (!res.ok) {
    throw new Error('Failed to fetch diamond data');
  }
  
  return res.json();
}

export default async function Home() {
  const diamonds = await getDiamondData();

  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-50 to-blue-50 text-slate-800">
      {/* Hero Section */}
      <section className="container mx-auto px-4 py-16">
        <h1 className="text-5xl font-bold mb-4 text-center bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-blue-400">
          💎 Almazi&apos;s Diamonds
        </h1>
        <p className="text-xl text-center text-slate-600 mb-8">
          Explore our collection of {diamonds.length.toLocaleString()} unique diamonds
        </p>
      </section>

      {/* Stats Overview */}
      <section className="container mx-auto px-4 py-8">
        <StatsOverview diamonds={diamonds} />
      </section>

      {/* Diamond Calculator */}
      <section className="container mx-auto px-4 py-8">
        <DiamondCalculator diamonds={diamonds} />
      </section>

      {/* Visualizations */}
      <section className="container mx-auto px-4 py-8">
        <DiamondVisualizations diamonds={diamonds} />
      </section>

      {/* Diamond Gallery */}
      <section className="container mx-auto px-4 py-8">
        <DiamondGallery diamonds={diamonds} />
      </section>

      <AboutUs />
    </main>
  );
}
