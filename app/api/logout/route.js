import { NextResponse } from 'next/server';

export async function POST() {
  // Create a response object
  const response = NextResponse.json({ message: 'Logout successful!' });
  
  // Clear the token by setting it with an expired Max-Age
  response.cookies.set('token', '', { maxAge: 0, path: '/' }); // Clear the token

  return response;
}
