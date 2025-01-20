import { clerkMiddleware } from "@clerk/nextjs/server";

export default clerkMiddleware({
  afterAuth(auth, req, evt) {
    // Check if the user is authenticated
    if (auth.isSignedIn) {
      // Redirect authenticated users to "/"
      const url = new URL(req.nextUrl.origin);
      url.pathname = "/";
      return Response.redirect(url.toString());
    }
  },
});

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // Always run for API routes
    '/(api|trpc)(.*)',
  ],
};
