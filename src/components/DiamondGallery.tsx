'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';

interface Diamond {
  id?: number;
  carat: number;
  cut: string;
  color: string;
  clarity: string;
  price: number;
}

interface DiamondGalleryProps {
  diamonds: Diamond[];
  currentPage: number;
  totalPages: number;
  totalCount: number;
}

export default function DiamondGallery({ 
  diamonds = [], 
  currentPage,
  totalPages,
  totalCount
}: DiamondGalleryProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [filter, setFilter] = useState({
    cut: searchParams.get('cut') || '',
    color: searchParams.get('color') || '',
    clarity: searchParams.get('clarity') || '',
  });

  const handlePageChange = (newPage: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set('page', newPage.toString());
    router.push(`?${params.toString()}`);
  };

  const handleFilterChange = (type: 'cut' | 'color' | 'clarity', value: string) => {
    const newFilter = { ...filter, [type]: value };
    setFilter(newFilter);
    
    const params = new URLSearchParams(searchParams.toString());
    params.set('page', '1'); // Reset to first page when filter changes
    if (value) {
      params.set(type, value);
    } else {
      params.delete(type);
    }
    router.push(`?${params.toString()}`);
  };

  return (
    <div className="bg-white rounded-xl p-6 shadow-md border border-blue-100">
      <h2 className="text-2xl font-bold mb-4 text-slate-800">Diamond Gallery</h2>
      
      {/* Filters */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <select
          className="bg-slate-50 text-slate-700 rounded-lg p-2 border border-blue-100 focus:outline-none focus:ring-2 focus:ring-blue-300"
          value={filter.cut}
          onChange={(e) => handleFilterChange('cut', e.target.value)}
        >
          <option key="all-cuts" value="">All Cuts</option>
          {Array.from(new Set(diamonds.map(d => d.cut))).map((cut, index) => (
            <option key={`cut-${cut}-${index}`} value={cut}>{cut}</option>
          ))}
        </select>
        
        <select
          className="bg-slate-50 text-slate-700 rounded-lg p-2 border border-blue-100 focus:outline-none focus:ring-2 focus:ring-blue-300"
          value={filter.color}
          onChange={(e) => handleFilterChange('color', e.target.value)}
        >
          <option key="all-colors" value="">All Colors</option>
          {Array.from(new Set(diamonds.map(d => d.color))).map((color, index) => (
            <option key={`color-${color}-${index}`} value={color}>{color}</option>
          ))}
        </select>
        
        <select
          className="bg-slate-50 text-slate-700 rounded-lg p-2 border border-blue-100 focus:outline-none focus:ring-2 focus:ring-blue-300"
          value={filter.clarity}
          onChange={(e) => handleFilterChange('clarity', e.target.value)}
        >
          <option key="all-clarities" value="">All Clarities</option>
          {Array.from(new Set(diamonds.map(d => d.clarity))).map((clarity, index) => (
            <option key={`clarity-${clarity}-${index}`} value={clarity}>{clarity}</option>
          ))}
        </select>
      </div>

      {/* Diamond Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {diamonds.map((diamond) => (
          <Link 
            href={`/diamonds/${diamond.id}`} 
            key={diamond.id}
            className="bg-slate-50 rounded-lg p-4 border border-blue-100 hover:shadow-md transition-shadow hover:border-blue-300"
          >
            <div className="text-lg font-semibold mb-2 text-slate-800">{diamond.cut} Diamond</div>
            <div className="text-slate-600">
              <p>Carat: {diamond.carat}</p>
              <p>Color: {diamond.color}</p>
              <p>Clarity: {diamond.clarity}</p>
              <p className="text-blue-600 font-bold mt-2">
                ${diamond.price.toLocaleString()}
              </p>
            </div>
          </Link>
        ))}
      </div>

      {/* Pagination */}
      <div className="mt-6 flex justify-center gap-2">
        <button
          className="px-4 py-2 bg-blue-600 text-white rounded-lg disabled:bg-slate-300 hover:bg-blue-700 transition-colors"
          disabled={currentPage <= 1}
          onClick={() => handlePageChange(currentPage - 1)}
        >
          Previous
        </button>
        <span className="px-4 py-2 text-slate-700">
          Page {currentPage} of {totalPages} ({totalCount} total diamonds)
        </span>
        <button
          className="px-4 py-2 bg-blue-600 text-white rounded-lg disabled:bg-slate-300 hover:bg-blue-700 transition-colors"
          disabled={currentPage >= totalPages}
          onClick={() => handlePageChange(currentPage + 1)}
        >
          Next
        </button>
      </div>
    </div>
  );
} 