import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  console.log(request.nextUrl.pathname);
  if (request.nextUrl.pathname.startsWith("/img")) {
    return NextResponse.rewrite(
      "https://db-imagee.arinji.com/api/files/wj5zb3eupeq5t2l/5fqxcd2p9a8cxbd/wat_G6Rz9CscFj.png"
    );
  }
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    "/((?!api|_next/static|_next/image|favicon.ico).*)",
  ],
};
