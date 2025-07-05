import { NextRequest, NextResponse } from 'next/server';
import { getShoppingListByCode, addItem } from '@/lib/database';
import db from '@/lib/database';
import type { ShoppingItem } from '@/types/database';

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ code: string }> }
) {
  try {
    const { code } = await params;
    const { name } = await request.json();
    
    if (!code) {
      return NextResponse.json({ error: 'List code is required' }, { status: 400 });
    }

    if (!name || typeof name !== 'string' || name.trim().length === 0) {
      return NextResponse.json({ error: 'Item name is required' }, { status: 400 });
    }

    const list = getShoppingListByCode(code);
    if (!list) {
      return NextResponse.json({ error: 'Shopping list not found' }, { status: 404 });
    }

    const result = addItem(list.id, name.trim());
    
    // Fetch the complete item data after insertion
    const newItem = db.prepare(`
      SELECT id, name, status, position, created_at, list_id
      FROM items 
      WHERE id = ?
    `).get(result.lastInsertRowid) as ShoppingItem;
    
    return NextResponse.json(newItem);
  } catch (error) {
    console.error('Error adding item:', error);
    return NextResponse.json({ error: 'Failed to add item' }, { status: 500 });
  }
} 