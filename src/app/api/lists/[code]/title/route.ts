import { NextRequest, NextResponse } from 'next/server';
import { getShoppingListByCode, updateShoppingListTitle } from '@/lib/database';

export async function PUT(
  request: NextRequest,
  { params }: { params: { code: string } }
) {
  try {
    const { code } = params;
    const { title } = await request.json();
    
    if (!code) {
      return NextResponse.json({ error: 'List code is required' }, { status: 400 });
    }

    if (!title || typeof title !== 'string' || title.trim().length === 0) {
      return NextResponse.json({ error: 'Title is required' }, { status: 400 });
    }

    const list = getShoppingListByCode(code);
    if (!list) {
      return NextResponse.json({ error: 'Shopping list not found' }, { status: 404 });
    }

    updateShoppingListTitle(list.id, title.trim());
    
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error updating shopping list title:', error);
    return NextResponse.json({ error: 'Failed to update shopping list title' }, { status: 500 });
  }
} 