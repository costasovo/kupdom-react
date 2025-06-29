import { NextRequest, NextResponse } from 'next/server';
import { getShoppingListByCode, getItemsByListId } from '@/lib/database';

export async function GET(
  request: NextRequest,
  { params }: { params: { code: string } }
) {
  try {
    const { code } = params;
    
    if (!code) {
      return NextResponse.json({ error: 'List code is required' }, { status: 400 });
    }

    const list = getShoppingListByCode(code);
    if (!list) {
      return NextResponse.json({ error: 'Shopping list not found' }, { status: 404 });
    }

    const items = getItemsByListId(list.id);
    
    return NextResponse.json({
      success: true,
      list: {
        ...list,
        items
      }
    });
  } catch (error) {
    console.error('Error fetching shopping list:', error);
    return NextResponse.json({ error: 'Failed to fetch shopping list' }, { status: 500 });
  }
} 