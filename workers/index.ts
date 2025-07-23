// Cloudflare Worker for serving Next.js static exports
export interface Env {
  ASSETS: Fetcher;
}

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const url = new URL(request.url);
    
    // Handle API routes or server-side logic here if needed
    if (url.pathname.startsWith('/api/')) {
      return new Response('API endpoint - implement your server logic here', { 
        status: 200,
        headers: { 'Content-Type': 'application/json' }
      });
    }
    
    // Handle static assets from Next.js export
    try {
      return await env.ASSETS.fetch(request);
    } catch (error) {
      // If asset not found, return 404
      return new Response('Not Found', { status: 404 });
    }
  },
} satisfies ExportedHandler<Env>;
