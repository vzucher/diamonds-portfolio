import { NextResponse } from 'next/server';
import diamonds from '@/data/diamonds.json';

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

const typedDiamonds = diamonds as Diamond[];

export async function GET() {
  try {
    console.log('Serving diamond data...');
    console.log('Number of diamonds:', typedDiamonds.length);
    return NextResponse.json(typedDiamonds);
  } catch (error) {
    console.error('Error serving diamond data:', error);
    return NextResponse.json(
      { 
        error: 'Failed to load diamond data',
        details: error instanceof Error ? error.message : 'Unknown error'
      }, 
      { status: 500 }
    );
  }
} 