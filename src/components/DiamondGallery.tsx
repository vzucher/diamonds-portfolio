'use client';

import { useState } from 'react';
import Link from 'next/link';

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
}

export default function DiamondGallery({ diamonds }: DiamondGalleryProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const [filter, setFilter] = useState({
    cut: '',
    color: '',
    clarity: '',
  });

  // Add IDs to diamonds if they don't have them
  const diamondsWithIds = diamonds.map((diamond, index) => ({
    ...diamond,
    id: diamond.id || index + 1
  }));

  const itemsPerPage = 12;
  const filteredDiamonds = diamondsWithIds.filter(d => 
    (!filter.cut || d.cut === filter.cut) &&
    (!filter.color || d.color === filter.color) &&
    (!filter.clarity || d.clarity === filter.clarity)
  );

  const pageCount = Math.ceil(filteredDiamonds.length / itemsPerPage);
  const displayedDiamonds = filteredDiamonds.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className="bg-white rounded-xl p-6 shadow-md border border-blue-100">
      <h2 className="text-2xl font-bold mb-4 text-slate-800">Diamond Gallery</h2>
      
      {/* Filters */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <select
          className="bg-slate-50 text-slate-700 rounded-lg p-2 border border-blue-100 focus:outline-none focus:ring-2 focus:ring-blue-300"
          value={filter.cut}
          onChange={(e) => setFilter({ ...filter, cut: e.target.value })}
        >
          <option key="all-cuts" value="">All Cuts</option>
          {Array.from(new Set(diamonds.map(d => d.cut))).map((cut, index) => (
            <option key={`cut-${cut}-${index}`} value={cut}>{cut}</option>
          ))}
        </select>
        
        <select
          className="bg-slate-50 text-slate-700 rounded-lg p-2 border border-blue-100 focus:outline-none focus:ring-2 focus:ring-blue-300"
          value={filter.color}
          onChange={(e) => setFilter({ ...filter, color: e.target.value })}
        >
          <option key="all-colors" value="">All Colors</option>
          {Array.from(new Set(diamonds.map(d => d.color))).map((color, index) => (
            <option key={`color-${color}-${index}`} value={color}>{color}</option>
          ))}
        </select>
        
        <select
          className="bg-slate-50 text-slate-700 rounded-lg p-2 border border-blue-100 focus:outline-none focus:ring-2 focus:ring-blue-300"
          value={filter.clarity}
          onChange={(e) => setFilter({ ...filter, clarity: e.target.value })}
        >
          <option key="all-clarities" value="">All Clarities</option>
          {Array.from(new Set(diamonds.map(d => d.clarity))).map((clarity, index) => (
            <option key={`clarity-${clarity}-${index}`} value={clarity}>{clarity}</option>
          ))}
        </select>
      </div>

      {/* Diamond Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {displayedDiamonds.map((diamond) => (
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
          disabled={currentPage === 1}
          onClick={() => setCurrentPage(p => p - 1)}
        >
          Previous
        </button>
        <span className="px-4 py-2 text-slate-700">
          Page {currentPage} of {pageCount}
        </span>
        <button
          className="px-4 py-2 bg-blue-600 text-white rounded-lg disabled:bg-slate-300 hover:bg-blue-700 transition-colors"
          disabled={currentPage === pageCount}
          onClick={() => setCurrentPage(p => p + 1)}
        >
          Next
        </button>
      </div>
    </div>
  );
} 