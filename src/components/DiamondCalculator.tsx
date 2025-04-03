'use client';

import { useState, useEffect } from 'react';

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

interface DiamondCalculatorProps {
  diamonds: Diamond[];
}

export default function DiamondCalculator({ diamonds }: DiamondCalculatorProps) {
  const [carat, setCarat] = useState(0.5);
  const [color, setColor] = useState('D');
  const [clarity, setClarity] = useState('IF');
  const [yearsOfRelationship, setYearsOfRelationship] = useState(1);
  const [isEngagement, setIsEngagement] = useState(true);
  const [calculatedPrice, setCalculatedPrice] = useState(0);

  // Get unique colors and clarities from the dataset
  const uniqueColors = Array.from(new Set(diamonds.map(d => d.color))).sort();
  const uniqueClarities = Array.from(new Set(diamonds.map(d => d.clarity))).sort();

  // Calculate min and max carat from the dataset with validation
  const validDiamonds = diamonds.filter(d => !isNaN(d.carat) && d.carat > 0);
  const minCarat = validDiamonds.length > 0 ? Math.min(...validDiamonds.map(d => d.carat)) : 0.1;
  const maxCarat = validDiamonds.length > 0 ? Math.max(...validDiamonds.map(d => d.carat)) : 5.0;

  // Calculate the price based on the selected parameters
  useEffect(() => {
    // Filter diamonds based on the selected parameters
    const filteredDiamonds = diamonds.filter(d => 
      d.color === color && 
      d.clarity === clarity
    );

    // Calculate the average price per carat for the filtered diamonds
    let avgPricePerCarat = 0;
    if (filteredDiamonds.length > 0) {
      const totalPrice = filteredDiamonds.reduce((sum, d) => sum + d.price, 0);
      const totalCarat = filteredDiamonds.reduce((sum, d) => sum + d.carat, 0);
      avgPricePerCarat = totalPrice / totalCarat;
    } else {
      // If no exact matches, use the overall average price per carat
      const totalPrice = diamonds.reduce((sum, d) => sum + d.price, 0);
      const totalCarat = diamonds.reduce((sum, d) => sum + d.carat, 0);
      avgPricePerCarat = totalPrice / totalCarat;
    }

    // Calculate the base price
    const basePrice = avgPricePerCarat * carat;

    // Apply relationship multiplier
    let relationshipMultiplier = 1;
    if (isEngagement) {
      // For engagement rings, add a premium based on years of relationship
      relationshipMultiplier = 1 + (yearsOfRelationship * 0.05);
    } else {
      // For marriage rings, add a different premium
      relationshipMultiplier = 1 + (yearsOfRelationship * 0.03);
    }

    // Calculate the final price
    const finalPrice = basePrice * relationshipMultiplier;
    setCalculatedPrice(finalPrice);
  }, [carat, color, clarity, yearsOfRelationship, isEngagement, diamonds]);

  return (
    <div className="bg-white rounded-xl p-6 shadow-md border border-blue-100">
      <h2 className="text-2xl font-bold mb-4 text-slate-800">💍 Diamond Ring Calculator</h2>
      <p className="text-slate-600 mb-6">
        Estimate the price of a diamond based on its characteristics and your relationship status.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-6">
          {/* Carat Slider */}
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Carat Weight: {carat.toFixed(2)} ct
            </label>
            <div className="relative">
              <input
                type="range"
                min={minCarat.toString()}
                max={maxCarat.toString()}
                step={0.01}
                value={carat}
                onChange={(e) => setCarat(parseFloat(e.target.value))}
                className="w-full h-2 bg-blue-100 rounded-lg appearance-none cursor-grab active:cursor-grabbing [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-6 [&::-webkit-slider-thumb]:h-6 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-transparent [&::-webkit-slider-thumb]:cursor-grab [&::-webkit-slider-thumb]:active:cursor-grabbing [&::-moz-range-thumb]:appearance-none [&::-moz-range-thumb]:w-6 [&::-moz-range-thumb]:h-6 [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:bg-transparent [&::-moz-range-thumb]:cursor-grab [&::-moz-range-thumb]:active:cursor-grabbing"
              />
              <div 
                className="absolute top-0 left-0 flex items-center justify-center pointer-events-none"
                style={{ 
                  left: `calc(${((carat - minCarat) / (maxCarat - minCarat)) * 100}% - 12px)`,
                  top: '50%',
                  transform: 'translateY(-50%)',
                  fontSize: '1.25rem',
                  width: '24px',
                  height: '24px'
                }}
              >
                💎
              </div>
            </div>
            <div className="flex justify-between text-xs text-slate-500 mt-1">
              <span>{minCarat.toFixed(2)} ct</span>
              <span>{maxCarat.toFixed(2)} ct</span>
            </div>
          </div>

          {/* Color Selection */}
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Diamond Color: <span className="font-semibold">{color}</span>
            </label>
            
            <div className="flex flex-wrap gap-2">
              {uniqueColors.map((c, index) => (
                <button
                  key={`color-${c}-${index}`}
                  onClick={() => setColor(c)}
                  className={`w-8 h-8 rounded-full flex items-center justify-center transition-all cursor-pointer ${
                    color === c
                      ? 'ring-2 ring-blue-500 ring-offset-2 scale-110'
                      : 'hover:scale-105'
                  } ${
                    c === 'D' ? 'bg-white border border-gray-200' :
                    c === 'E' ? 'bg-gray-50 border border-gray-200' :
                    c === 'F' ? 'bg-gray-100 border border-gray-200' :
                    c === 'G' ? 'bg-blue-50' :
                    c === 'H' ? 'bg-blue-100' :
                    c === 'I' ? 'bg-blue-200' :
                    c === 'J' ? 'bg-blue-300' :
                    c === 'K' ? 'bg-yellow-100' :
                    c === 'L' ? 'bg-yellow-200' :
                    c === 'M' ? 'bg-yellow-300' : ''
                  }`}
                  title={`Color ${c} - ${
                    ['D', 'E', 'F'].includes(c) ? 'Colorless' :
                    ['G', 'H', 'I', 'J'].includes(c) ? 'Near Colorless' :
                    ['K', 'L', 'M'].includes(c) ? 'Faint' : ''
                  }`}
                >
                  <span className="text-xs font-medium text-slate-700">{c}</span>
                </button>
              ))}
            </div>
            <div className="flex justify-between text-xs text-slate-500 mt-1">
              <span>Colorless (D-F)</span>
              <span>Near Colorless (G-J)</span>
              <span>Faint (K-M)</span>
            </div>
          </div>

          {/* Clarity Selection */}
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Diamond Clarity: <span className="font-semibold">{clarity}</span>
            </label>
            
            <div className="flex flex-wrap gap-2">
              {uniqueClarities.map((c, index) => (
                <button
                  key={`clarity-${c}-${index}`}
                  onClick={() => setClarity(c)}
                  className={`w-8 h-8 rounded-full flex items-center justify-center transition-all cursor-pointer ${
                    clarity === c
                      ? 'ring-2 ring-blue-500 ring-offset-2 scale-110'
                      : 'hover:scale-105'
                  } ${
                    ['IF', 'VVS1', 'VVS2'].includes(c) ? 'bg-purple-100' :
                    ['VS1', 'VS2'].includes(c) ? 'bg-purple-200' :
                    ['SI1', 'SI2'].includes(c) ? 'bg-purple-300' :
                    ['I1', 'I2'].includes(c) ? 'bg-purple-400' : ''
                  }`}
                  title={`Clarity ${c} - ${
                    ['IF', 'VVS1', 'VVS2'].includes(c) ? 'Flawless' :
                    ['VS1', 'VS2'].includes(c) ? 'Very Slightly Included' :
                    ['SI1', 'SI2'].includes(c) ? 'Slightly Included' :
                    ['I1', 'I2'].includes(c) ? 'Included' : ''
                  }`}
                >
                  <span className="text-xs font-medium text-slate-700">{c}</span>
                </button>
              ))}
            </div>
            <div className="flex justify-between text-xs text-slate-500 mt-1">
              <span>Flawless (IF-VVS)</span>
              <span>Very Slightly Included (VS)</span>
              <span>Slightly Included (SI)</span>
              <span>Included (I)</span>
            </div>
          </div>

          {/* Years of Relationship */}
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Years of Relationship: <span className="font-semibold">{yearsOfRelationship}</span>
            </label>
            <div className="relative">
              <input
                type="range"
                min="1"
                max="20"
                value={yearsOfRelationship}
                onChange={(e) => setYearsOfRelationship(parseInt(e.target.value))}
                className="w-full h-2 bg-blue-100 rounded-lg appearance-none cursor-grab active:cursor-grabbing [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-6 [&::-webkit-slider-thumb]:h-6 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-transparent [&::-webkit-slider-thumb]:cursor-grab [&::-webkit-slider-thumb]:active:cursor-grabbing [&::-moz-range-thumb]:appearance-none [&::-moz-range-thumb]:w-6 [&::-moz-range-thumb]:h-6 [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:bg-transparent [&::-moz-range-thumb]:cursor-grab [&::-moz-range-thumb]:active:cursor-grabbing"
              />
              <div 
                className="absolute top-0 left-0 flex items-center justify-center pointer-events-none"
                style={{ 
                  left: `calc(${((yearsOfRelationship - 1) / 19) * 100}% - 12px)`,
                  top: '50%',
                  transform: 'translateY(-50%)',
                  fontSize: '1.25rem',
                  width: '24px',
                  height: '24px'
                }}
              >
                💎
              </div>
            </div>
            <div className="flex justify-between text-xs text-slate-500 mt-1">
              <span>1 year</span>
              <span>20 years</span>
            </div>
          </div>

          {/* Ring Type */}
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Ring Type
            </label>
            <div className="grid grid-cols-2 gap-3">
              <button
                onClick={() => setIsEngagement(true)}
                className={`flex flex-col items-center justify-center p-4 rounded-lg border-2 transition-all cursor-pointer ${
                  isEngagement 
                    ? 'border-blue-500 bg-blue-50 shadow-md scale-105' 
                    : 'border-gray-200 hover:border-blue-300 hover:bg-blue-50'
                }`}
              >
                <span className="text-3xl mb-2">💍</span>
                <span className="font-medium text-slate-700">Engagement Ring</span>
                <span className="text-xs text-slate-500 mt-1">The beginning of forever</span>
              </button>
              <button
                onClick={() => setIsEngagement(false)}
                className={`flex flex-col items-center justify-center p-4 rounded-lg border-2 transition-all cursor-pointer ${
                  !isEngagement 
                    ? 'border-blue-500 bg-blue-50 shadow-md scale-105' 
                    : 'border-gray-200 hover:border-blue-300 hover:bg-blue-50'
                }`}
              >
                <span className="text-3xl mb-2">💑</span>
                <span className="font-medium text-slate-700">Marriage Ring</span>
                <span className="text-xs text-slate-500 mt-1">A lifetime of love</span>
              </button>
            </div>
          </div>
        </div>

        {/* Price Display */}
        <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg p-6 flex flex-col justify-center items-center">
          <h3 className="text-xl font-semibold text-slate-700 mb-2">Estimated Price</h3>
          <div className="text-4xl font-bold text-blue-600 mb-4">
            ${calculatedPrice.toLocaleString(undefined, { maximumFractionDigits: 0 })}
          </div>
          <p className="text-slate-600 text-center">
            This price is based on {diamonds.length.toLocaleString()} diamonds in our database
            and adjusted for your relationship status.
          </p>
          <div className="mt-6 w-full">
            <div className="bg-white rounded-lg p-4 border border-blue-200">
              <h4 className="font-medium text-slate-700 mb-2">Price Breakdown</h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-slate-600">Base Price:</span>
                  <span className="font-medium">${calculatedPrice.toLocaleString(undefined, { maximumFractionDigits: 0 })}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-600">Relationship Factor:</span>
                  <span className="font-medium">{isEngagement ? 'Engagement' : 'Marriage'} ({yearsOfRelationship} years)</span>
                </div>
                <div className="border-t border-blue-200 pt-2 mt-2 flex justify-between font-bold">
                  <span className="text-slate-700">Total:</span>
                  <span className="text-blue-600">${calculatedPrice.toLocaleString(undefined, { maximumFractionDigits: 0 })}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 