// Force this page to render on every request
export const dynamic = 'force-dynamic';

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

interface DiamondResponse {
  diamonds: Diamond[];
  totalCount: number;
  currentPage: number;
  pageSize: number;
  totalPages: number;
}

async function getDiamondData(page: number = 1, pageSize: number = 12): Promise<DiamondResponse> {
  try {
    const headersList = headers();
    const protocol = headersList.get('x-forwarded-proto') || 'http';
    const host = headersList.get('host') || 'localhost:3000';
    const apiUrl = `${protocol}://${host}/api/diamonds?page=${page}&pageSize=${pageSize}`;

    console.log('Fetching diamonds from:', apiUrl);
    
    const res = await fetch(apiUrl, {
      cache: 'no-store'
    });
    
    if (!res.ok) {
      const errorText = await res.text();
      console.error('API Error:', {
        status: res.status,
        statusText: res.statusText,
        body: errorText
      });
      throw new Error(`Failed to fetch diamond data: ${res.status} ${res.statusText}`);
    }
    
    const data = await res.json();
    console.log('Raw API response:', data);
    console.log('Received diamond data:', {
      count: data.diamonds?.length,
      totalCount: data.totalCount,
      currentPage: data.currentPage,
      totalPages: data.totalPages
    });
    
    return data;
  } catch (error) {
    console.error('Error in getDiamondData:', error);
    throw error;
  }
}

export default async function Home({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined }
}) {
  try {
    const page = Number(searchParams.page) || 1;
    const pageSize = Number(searchParams.pageSize) || 12;
    
    const data = await getDiamondData(page, pageSize);
    const { diamonds, totalCount, currentPage, totalPages } = data;

    return (
      <main className="min-h-screen bg-gradient-to-b from-slate-50 to-blue-50 text-slate-800">
        {/* Hero Section */}
        <section className="container mx-auto px-4 py-16">
          <h1 className="text-5xl font-bold mb-4 text-center bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-blue-400">
            💎 Almazy&apos;s Diamonds
          </h1>
          <p className="text-xl text-center text-slate-600 mb-8">
            Explore our collection of {totalCount ? totalCount.toLocaleString() : 'many'} unique diamonds
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
          <DiamondGallery 
            diamonds={diamonds} 
            currentPage={currentPage}
            totalPages={totalPages}
            totalCount={totalCount}
          />
        </section>

        <AboutUs />
      </main>
    );
  } catch (error) {
    console.error('Error in Home component:', error);
    return (
      <main className="min-h-screen bg-gradient-to-b from-slate-50 to-blue-50 text-slate-800">
        <div className="container mx-auto px-4 py-16">
          <h1 className="text-5xl font-bold mb-4 text-center text-red-600">
            Error Loading Data
          </h1>
          <p className="text-xl text-center text-slate-600">
            We&apos;re having trouble loading the diamond data. Please try again later.
          </p>
        </div>
      </main>
    );
  }
}
