'use client';

import { useEffect, useRef, useState } from 'react';
import * as d3 from 'd3';

interface Diamond {
  carat: number;
  cut: string;
  color: string;
  clarity: string;
  price: number;
}

interface DiamondVisualizationsProps {
  diamonds: Diamond[];
}

export default function DiamondVisualizations({ diamonds }: DiamondVisualizationsProps) {
  const priceByCaratRef = useRef<SVGSVGElement>(null);
  const [hoveredDiamond, setHoveredDiamond] = useState<Diamond | null>(null);

  useEffect(() => {
    if (!priceByCaratRef.current) return;

    // Clear previous visualization
    d3.select(priceByCaratRef.current).selectAll('*').remove();

    // Filter out any invalid data
    const validDiamonds = diamonds.filter(d => 
      !isNaN(d.price) && !isNaN(d.carat) && d.price > 0 && d.carat > 0
    );

    // Set up dimensions
    const width = 800;
    const height = 400;
    const margin = { top: 20, right: 20, bottom: 40, left: 60 };

    // Create SVG
    const svg = d3.select(priceByCaratRef.current)
      .attr('width', width)
      .attr('height', height);

    // Create scales
    const x = d3.scaleLinear()
      .domain([0, d3.max(validDiamonds, d => d.carat) || 0])
      .range([margin.left, width - margin.right]);

    const y = d3.scaleLinear()
      .domain([0, d3.max(validDiamonds, d => d.price) || 0])
      .range([height - margin.bottom, margin.top]);

    // Add grid lines
    svg.append('g')
      .attr('transform', `translate(0,${height - margin.bottom})`)
      .call(d3.axisBottom(x)
        .tickSize(-(height - margin.top - margin.bottom))
        .tickFormat(() => '')
      )
      .attr('stroke-opacity', 0.1)
      .attr('stroke', '#0f172a');

    svg.append('g')
      .attr('transform', `translate(${margin.left},0)`)
      .call(d3.axisLeft(y)
        .tickSize(-(width - margin.left - margin.right))
        .tickFormat(() => '')
      )
      .attr('stroke-opacity', 0.1)
      .attr('stroke', '#0f172a');

    // Add axes
    svg.append('g')
      .attr('transform', `translate(0,${height - margin.bottom})`)
      .call(d3.axisBottom(x))
      .append('text')
      .attr('x', width / 2)
      .attr('y', 35)
      .attr('fill', '#475569')
      .attr('font-weight', 'bold')
      .text('Carat');

    svg.append('g')
      .attr('transform', `translate(${margin.left},0)`)
      .call(d3.axisLeft(y))
      .append('text')
      .attr('transform', 'rotate(-90)')
      .attr('y', -45)
      .attr('x', -height / 2)
      .attr('fill', '#475569')
      .attr('font-weight', 'bold')
      .text('Price ($)');

    // Add tooltip
    const tooltip = d3.select(priceByCaratRef.current.parentNode as HTMLElement)
      .append('div')
      .attr('class', 'tooltip')
      .style('position', 'absolute')
      .style('visibility', 'hidden')
      .style('background-color', 'white')
      .style('border', '1px solid #e2e8f0')
      .style('border-radius', '0.5rem')
      .style('padding', '0.75rem')
      .style('box-shadow', '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)')
      .style('pointer-events', 'none')
      .style('z-index', '10');

    // Add scatter plot points
    svg.selectAll('circle')
      .data(validDiamonds)
      .enter()
      .append('circle')
      .attr('cx', d => x(d.carat))
      .attr('cy', d => y(d.price))
      .attr('r', 4)
      .attr('fill', 'rgba(37, 99, 235, 0.6)')
      .attr('stroke', '#1e40af')
      .attr('stroke-width', 1)
      .on('mouseover', (event, d) => {
        d3.select(event.currentTarget)
          .attr('r', 6)
          .attr('fill', 'rgba(37, 99, 235, 0.8)');
        
        tooltip
          .style('visibility', 'visible')
          .html(`
            <div class="font-bold text-blue-700">${d.cut} Diamond</div>
            <div>Carat: ${d.carat}</div>
            <div>Color: ${d.color}</div>
            <div>Clarity: ${d.clarity}</div>
            <div class="font-bold mt-1">$${d.price.toLocaleString()}</div>
          `);
        
        setHoveredDiamond(d);
      })
      .on('mousemove', (event) => {
        tooltip
          .style('top', `${event.pageY - 10}px`)
          .style('left', `${event.pageX + 10}px`);
      })
      .on('mouseout', (event) => {
        d3.select(event.currentTarget)
          .attr('r', 4)
          .attr('fill', 'rgba(37, 99, 235, 0.6)');
        
        tooltip.style('visibility', 'hidden');
        setHoveredDiamond(null);
      });

    // Add trend line
    const xMean = d3.mean(validDiamonds, d => d.carat) || 0;
    const yMean = d3.mean(validDiamonds, d => d.price) || 0;
    
    const ssxx = d3.sum(validDiamonds, d => Math.pow(d.carat - xMean, 2));
    const ssxy = d3.sum(validDiamonds, d => (d.carat - xMean) * (d.price - yMean));
    
    const slope = ssxy / ssxx;
    const intercept = yMean - slope * xMean;
    
    const lineData = [
      { carat: 0, price: intercept },
      { carat: d3.max(validDiamonds, d => d.carat) || 0, price: slope * (d3.max(validDiamonds, d => d.carat) || 0) + intercept }
    ];
    
    svg.append('line')
      .datum(lineData)
      .attr('x1', d => x(d[0].carat))
      .attr('y1', d => y(d[0].price))
      .attr('x2', d => x(d[1].carat))
      .attr('y2', d => y(d[1].price))
      .attr('stroke', '#1e40af')
      .attr('stroke-width', 2)
      .attr('stroke-dasharray', '5,5');

    // Add correlation coefficient
    const correlation = ssxy / Math.sqrt(ssxx * d3.sum(validDiamonds, d => Math.pow(d.price - yMean, 2)));
    
    svg.append('text')
      .attr('x', width - margin.right - 10)
      .attr('y', margin.top + 20)
      .attr('text-anchor', 'end')
      .attr('fill', '#475569')
      .attr('font-size', '12px')
      .text(`Correlation: ${correlation.toFixed(2)}`);

  }, [diamonds]);

  return (
    <div className="bg-white rounded-xl p-6 shadow-md border border-blue-100">
      <h2 className="text-2xl font-bold mb-4 text-slate-800">Price by Carat</h2>
      <p className="text-slate-600 mb-4">Explore the relationship between diamond carat weight and price</p>
      <div className="overflow-x-auto">
        <svg ref={priceByCaratRef}></svg>
      </div>
      {hoveredDiamond && (
        <div className="mt-4 p-4 bg-blue-50 rounded-lg border border-blue-100">
          <h3 className="font-bold text-blue-700">{hoveredDiamond.cut} Diamond</h3>
          <div className="grid grid-cols-2 gap-2 mt-2">
            <div>
              <span className="text-slate-600">Carat:</span>
              <span className="ml-2 font-medium">{hoveredDiamond.carat}</span>
            </div>
            <div>
              <span className="text-slate-600">Color:</span>
              <span className="ml-2 font-medium">{hoveredDiamond.color}</span>
            </div>
            <div>
              <span className="text-slate-600">Clarity:</span>
              <span className="ml-2 font-medium">{hoveredDiamond.clarity}</span>
            </div>
            <div>
              <span className="text-slate-600">Price:</span>
              <span className="ml-2 font-medium text-blue-600">${hoveredDiamond.price.toLocaleString()}</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
} 