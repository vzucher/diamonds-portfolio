'use client';

import { useMemo } from 'react';

interface Diamond {
  carat: number;
  cut: string;
  color: string;
  clarity: string;
  price: number;
}

interface StatsOverviewProps {
  diamonds: Diamond[];
}

export default function StatsOverview({ diamonds }: StatsOverviewProps) {
  const stats = useMemo(() => {
    // Filter out any invalid data
    const validDiamonds = diamonds.filter(d => 
      !isNaN(d.price) && !isNaN(d.carat) && d.cut && d.price > 0 && d.carat > 0
    );
    
    if (validDiamonds.length === 0) {
      return { avgPrice: 0, avgCarat: 0, mostCommonCut: 'N/A' };
    }
    
    const avgPrice = validDiamonds.reduce((sum, d) => sum + d.price, 0) / validDiamonds.length;
    const avgCarat = validDiamonds.reduce((sum, d) => sum + d.carat, 0) / validDiamonds.length;
    
    // Count occurrences of each cut
    const cutCounts = validDiamonds.reduce((acc, d) => {
      acc[d.cut] = (acc[d.cut] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);
    
    // Find the most common cut
    const mostCommonCut = Object.entries(cutCounts)
      .sort((a, b) => b[1] - a[1])[0][0];

    return { avgPrice, avgCarat, mostCommonCut };
  }, [diamonds]);

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <div className="bg-white rounded-xl p-6 shadow-md border border-blue-100 hover:shadow-lg transition-shadow">
        <h3 className="text-lg font-semibold text-slate-700 mb-2">Average Price</h3>
        <p className="text-3xl font-bold text-blue-600">
          ${Math.round(stats.avgPrice).toLocaleString()}
        </p>
        <p className="text-sm text-slate-500 mt-1">Based on {diamonds.length} diamonds</p>
      </div>
      <div className="bg-white rounded-xl p-6 shadow-md border border-blue-100 hover:shadow-lg transition-shadow">
        <h3 className="text-lg font-semibold text-slate-700 mb-2">Average Carat</h3>
        <p className="text-3xl font-bold text-blue-600">
          {stats.avgCarat.toFixed(2)}
        </p>
        <p className="text-sm text-slate-500 mt-1">Weight in carats</p>
      </div>
      <div className="bg-white rounded-xl p-6 shadow-md border border-blue-100 hover:shadow-lg transition-shadow">
        <h3 className="text-lg font-semibold text-slate-700 mb-2">Most Common Cut</h3>
        <p className="text-3xl font-bold text-blue-600">
          {stats.mostCommonCut}
        </p>
        <p className="text-sm text-slate-500 mt-1">Popular diamond shape</p>
      </div>
    </div>
  );
} 