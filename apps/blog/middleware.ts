import { NextResponse, type NextRequest } from 'next/server';

// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
  console.log(request.geo?.city);
  console.log(request.ip);
  console.log('REQUEST');
  return NextResponse.next();
}
