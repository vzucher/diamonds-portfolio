import { promises as fs } from 'fs';
import path from 'path';
import { parse } from 'papaparse';
import { NextResponse } from 'next/server';

interface Diamond {
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

export async function GET() {
  try {
    const filePath = path.join(process.cwd(), 'data', 'diamonds.csv');
    const fileContent = await fs.readFile(filePath, 'utf-8');
    
    const { data } = parse(fileContent, {
      header: true,
      dynamicTyping: true,
    });
    
    // Add IDs to the diamonds
    const diamonds = (data as Diamond[]).map((diamond, index) => ({
      ...diamond,
      id: index + 1
    }));
    
    return NextResponse.json(diamonds);
  } catch (error) {
    console.error('Error reading diamond data:', error);
    return NextResponse.json({ error: 'Failed to load diamond data' }, { status: 500 });
  }
} 