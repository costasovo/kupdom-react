import { NextRequest, NextResponse } from 'next/server';
import { verifyAdminCredentials } from '@/lib/database';

export async function POST(request: NextRequest) {
  try {
    const { username, password } = await request.json();
    
    if (!username || !password) {
      return NextResponse.json({ error: 'Username and password are required' }, { status: 400 });
    }

    const isValid = verifyAdminCredentials(username, password);
    
    if (!isValid) {
      return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
    }

    // In a real app, you'd set up proper session management
    // For now, we'll just return success
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error during login:', error);
    return NextResponse.json({ error: 'Login failed' }, { status: 500 });
  }
} 