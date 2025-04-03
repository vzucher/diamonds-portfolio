import { promises as fs } from 'fs';
import path from 'path';
import { parse } from 'papaparse';
import Link from 'next/link';
import { notFound } from 'next/navigation';

interface Diamond {
  id: number;
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

async function getDiamondById(id: string): Promise<Diamond | null> {
  const diamonds = await getDiamondData();
  const diamond = diamonds.find(d => d.id === parseInt(id));
  return diamond || null;
}

// Use the correct type for Next.js App Router pages
export default async function DiamondDetail({
  params,
}: {
  params: { id: string };
}) {
  const diamond = await getDiamondById(params.id);
  
  if (!diamond) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-50 to-blue-50 text-slate-800">
      <div className="container mx-auto px-4 py-8">
        <Link 
          href="/" 
          className="inline-flex items-center text-blue-600 hover:text-blue-800 mb-6"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
          </svg>
          Back to Gallery
        </Link>

        <div className="bg-white rounded-xl p-6 shadow-md border border-blue-100">
          <div className="flex flex-col md:flex-row gap-8">
            <div className="md:w-1/3">
              <div className="bg-blue-50 rounded-lg p-8 flex items-center justify-center h-64">
                <div className="text-center">
                  <div className="text-6xl mb-4">💎</div>
                  <h2 className="text-2xl font-bold text-blue-700">{diamond.cut} Diamond</h2>
                </div>
              </div>
            </div>
            
            <div className="md:w-2/3">
              <h1 className="text-3xl font-bold mb-4 text-slate-800">Diamond Details</h1>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                <div className="bg-slate-50 p-4 rounded-lg">
                  <h3 className="text-lg font-semibold text-slate-700 mb-2">Basic Information</h3>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-slate-600">Cut:</span>
                      <span className="font-medium">{diamond.cut}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-600">Color:</span>
                      <span className="font-medium">{diamond.color}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-600">Clarity:</span>
                      <span className="font-medium">{diamond.clarity}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-600">Carat:</span>
                      <span className="font-medium">{diamond.carat}</span>
                    </div>
                  </div>
                </div>
                
                <div className="bg-slate-50 p-4 rounded-lg">
                  <h3 className="text-lg font-semibold text-slate-700 mb-2">Dimensions</h3>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-slate-600">Depth:</span>
                      <span className="font-medium">{diamond.depth}%</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-600">Table:</span>
                      <span className="font-medium">{diamond.table}%</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-600">Length (x):</span>
                      <span className="font-medium">{diamond.x}mm</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-600">Width (y):</span>
                      <span className="font-medium">{diamond.y}mm</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-600">Height (z):</span>
                      <span className="font-medium">{diamond.z}mm</span>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="bg-blue-50 p-6 rounded-lg border border-blue-100">
                <h3 className="text-xl font-bold text-blue-700 mb-2">Price</h3>
                <p className="text-3xl font-bold">${diamond.price.toLocaleString()}</p>
                <p className="text-slate-600 mt-2">Price per carat: ${(diamond.price / diamond.carat).toFixed(2)}</p>
              </div>
            </div>
          </div>
        </div>
        
        <div className="mt-8 flex justify-between">
          <Link 
            href={`/diamonds/${Math.max(1, diamond.id - 1)}`}
            className={`px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors ${diamond.id === 1 ? 'opacity-50 cursor-not-allowed' : ''}`}
            aria-disabled={diamond.id === 1}
          >
            Previous Diamond
          </Link>
          
          <Link 
            href={`/diamonds/${diamond.id + 1}`}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Next Diamond
          </Link>
        </div>
      </div>
    </main>
  );
} 