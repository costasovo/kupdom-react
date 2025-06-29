import { NextRequest, NextResponse } from 'next/server';
import { createShoppingList } from '@/lib/database';

export async function POST(request: NextRequest) {
  try {
    const { title } = await request.json();
    
    if (!title || typeof title !== 'string' || title.trim().length === 0) {
      return NextResponse.json({ error: 'Title is required' }, { status: 400 });
    }

    const result = createShoppingList(title.trim());
    
    return NextResponse.json({ 
      success: true, 
      code: result.code,
      id: result.id 
    });
  } catch (error) {
    console.error('Error creating shopping list:', error);
    return NextResponse.json({ error: 'Failed to create shopping list' }, { status: 500 });
  }
} 