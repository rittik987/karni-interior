import { NextResponse, NextRequest } from 'next/server';
import { jwtVerify } from 'jose';

const JWT_KEY = new TextEncoder().encode(process.env.JWT_KEY); // Convert key to Uint8Array

export async function middleware(request: NextRequest) {
  console.log("Middleware executed for URL:", request.url);

  // Extract token from cookies
  const token = request.cookies.get('token')?.value;
  console.log("Token from cookies:", token);

  // If the user is trying to access the login page
  if (request.nextUrl.pathname === '/admin-login') {
    if (token) {
      try {
        const { payload } = await jwtVerify(token, JWT_KEY);
        console.log("User is already logged in. Decoded payload:", payload);
        // Redirect to admin-dashboard if logged in
        return NextResponse.redirect(new URL('/admin-dashboard', request.url));
      } catch (error:any) {
        console.error("Token verification failed:", error.message);
        // Allow access to the login page if token is invalid
        return NextResponse.next();
      }
    }
    return NextResponse.next(); // Allow access to the login page if no token
  }

  // For other protected routes (like admin-dashboard)
  if (request.nextUrl.pathname.startsWith('/admin-dashboard')) {
    if (!token) {
      console.log("No token found, redirecting to /admin-login.");
      return NextResponse.redirect(new URL('/admin-login', request.url));
    }

    try {
      const { payload } = await jwtVerify(token, JWT_KEY);
      console.log("Token is valid. Decoded payload:", payload);
      return NextResponse.next(); // Allow access to the protected route
    } catch (error:any) {
      console.error("Token verification failed:", error.message);
      return NextResponse.redirect(new URL('/admin-login', request.url));
    }
  }

  return NextResponse.next(); // Allow access to other routes
}

export const config = {
  matcher: ['/admin-dashboard/:path*', '/admin-login'], // Apply to admin-dashboard and login routes
};
