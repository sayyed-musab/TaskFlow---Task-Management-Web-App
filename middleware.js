import { NextResponse } from 'next/server';
import { jwtVerify } from 'jose'; 

export async function middleware(req) {
  // Retrieve the token from cookies
  const token = req.cookies.get('token');
  
  if (token) {
    try {
      // Verify the token using jose
      const secret = new TextEncoder().encode(process.env.JWT_SECRET);
      await jwtVerify(token.value, secret);

      return NextResponse.next();
    } catch (error) {
      // Token verification failed, redirect to login
      return NextResponse.redirect(new URL('/login', req.url));
    }
  } else {
    // No token, redirect to login
    return NextResponse.redirect(new URL('/login', req.url));
  }
}

// Define the paths the middleware should run on
export const config = {
  matcher: ['/dashboard/:path*'],
};
