import { NextRequest, NextResponse } from 'next/server';
import { getAllShoppingLists } from '@/lib/database';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '10');

    if (page < 1 || limit < 1 || limit > 100) {
      return NextResponse.json({ error: 'Invalid pagination parameters' }, { status: 400 });
    }

    const result = getAllShoppingLists(page, limit);
    
    return NextResponse.json({
      success: true,
      ...result
    });
  } catch (error) {
    console.error('Error fetching shopping lists:', error);
    return NextResponse.json({ error: 'Failed to fetch shopping lists' }, { status: 500 });
  }
} 