import { promises as fs } from 'fs';
import path from 'path';
import { parse } from 'papaparse';
import DiamondGallery from '@/components/DiamondGallery';
import StatsOverview from '@/components/StatsOverview';
import DiamondVisualizations from '@/components/DiamondVisualizations';
import DiamondCalculator from '@/components/DiamondCalculator';
import AboutUs from '@/components/AboutUs';

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
  const filePath = path.join(process.cwd(), 'data', 'diamonds.csv');
  const fileContent = await fs.readFile(filePath, 'utf-8');
  
  const { data } = parse(fileContent, {
    header: true,
    dynamicTyping: true,
  });
  
  // Add IDs to the diamonds
  return (data as Diamond[]).map((diamond, index) => ({
    ...diamond,
    id: index + 1
  }));
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
