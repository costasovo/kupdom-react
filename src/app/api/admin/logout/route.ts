import { NextResponse } from 'next/server';

export async function POST() {
  try {
    // Create response with success
    const response = NextResponse.json({ success: true });
    
    // Clear admin session cookie
    response.cookies.set('admin_token', '', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 0, // Expire immediately
      path: '/'
    });

    return response;
  } catch (error) {
    console.error('Error during logout:', error);
    return NextResponse.json({ error: 'Logout failed' }, { status: 500 });
  }
} 