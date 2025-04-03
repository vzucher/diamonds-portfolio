import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

// Force this API route to render on every request (dynamic)
export const dynamic = 'force-dynamic';

export async function GET() {
  console.log("=== Test API Request Started ===");
  try {
    // Log database test query
    const testResult = await prisma.$queryRaw`SELECT 1 as test`;
    console.log('Database test result:', testResult);
    
    const tableExists = await prisma.$queryRaw<{ exists: boolean }[]>`
      SELECT EXISTS (
        SELECT FROM information_schema.tables 
        WHERE table_schema = 'public' 
        AND table_name = 'Diamond'
      ) as exists;
    `;
    console.log('Diamond table exists:', tableExists);
    
    const count = await prisma.diamond.count();
    console.log('Diamond count:', count);
    
    return NextResponse.json({
      databaseConnected: true,
      tableExists: tableExists[0]?.exists,
      diamondCount: count
    });
  } catch (error) {
    console.error('Test endpoint error:', error);
    return NextResponse.json(
      { 
        error: 'Database test failed',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}
