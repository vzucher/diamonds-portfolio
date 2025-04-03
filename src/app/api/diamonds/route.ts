import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get('page') || '1');
    const pageSize = parseInt(searchParams.get('pageSize') || '12');
    const cut = searchParams.get('cut');
    const color = searchParams.get('color');
    const clarity = searchParams.get('clarity');
    
    console.log('=== Starting diamond fetch ===');
    console.log('Page:', page, 'Page Size:', pageSize);
    console.log('Filters:', { cut, color, clarity });
    
    // Calculate skip value for pagination
    const skip = (page - 1) * pageSize;
    
    // Build where clause for filters
    const where = {
      ...(cut && { cut }),
      ...(color && { color }),
      ...(clarity && { clarity })
    };
    
    console.log('Database query parameters:', {
      where,
      skip,
      take: pageSize
    });
    
    // Get the total count and paginated diamonds in parallel
    const [totalCount, diamonds] = await Promise.all([
      prisma.diamond.count({ where }),
      prisma.diamond.findMany({
        where,
        orderBy: {
          id: 'asc'
        },
        take: pageSize,
        skip: skip
      })
    ]);
    
    // Calculate total pages
    const totalPages = Math.ceil(totalCount / pageSize);
    
    console.log('=== Diamond Fetch Results ===');
    console.log('Total diamonds in database:', totalCount);
    console.log('Current page:', page);
    console.log('Page size:', pageSize);
    console.log('Total pages:', totalPages);
    console.log('Actual count fetched:', diamonds.length);
    console.log('First diamond ID:', diamonds[0]?.id);
    console.log('Last diamond ID:', diamonds[diamonds.length - 1]?.id);
    console.log('=== End Results ===');
    
    const responseData = {
      diamonds: diamonds || [],
      totalCount,
      currentPage: page,
      pageSize,
      totalPages
    };
    
    const response = NextResponse.json(responseData);
    response.headers.set('Cache-Control', 'no-store, must-revalidate');
    response.headers.set('Pragma', 'no-cache');
    response.headers.set('Expires', '0');
    
    return response;
  } catch (error) {
    console.error('Error fetching diamonds:', error);
    return NextResponse.json(
      { 
        error: 'Failed to load diamond data',
        details: error instanceof Error ? error.message : 'Unknown error'
      }, 
      { status: 500 }
    );
  }
} 