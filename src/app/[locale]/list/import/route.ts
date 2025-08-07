import { NextRequest, NextResponse } from 'next/server';
import { createShoppingList, addItem } from '@/lib/database';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ locale: string }> }
) {
  try {
    const { locale } = await params;

    const searchParams = request.nextUrl.searchParams;
    const itemsParam = searchParams.get('items') || '';
    const titleParam = searchParams.get('title');

    const items = itemsParam
      .split(',')
      .map((s) => s.trim())
      .filter((s) => s.length > 0);

    if (items.length === 0) {
      return NextResponse.redirect(new URL(`/${locale}`, request.url));
    }

    const title = titleParam && titleParam.trim().length > 0 ? titleParam.trim() : 'My Shopping List';

    const { id, code } = createShoppingList(title);

    for (const name of items) {
      addItem(id, name);
    }

    return NextResponse.redirect(new URL(`/${locale}/list/${code}`, request.url));
  } catch (error) {
    console.error('Error creating list from query:', error);
    return NextResponse.json({ error: 'Failed to create list from query' }, { status: 500 });
  }
} 