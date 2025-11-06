export const runtime = 'edge';

export async function POST(request) {
  try {
    const body = await request.json();
    const authHeader = request.headers.get('Authorization');

    // Validate that Authorization header exists
    if (!authHeader) {
      return new Response(JSON.stringify({ error: 'Missing Authorization header' }), {
        status: 401,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    // Forward request to Z.AI with client's API key
    const response = await fetch('https://api.z.ai/api/coding/paas/v4/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': authHeader,  // Pass through client's key
        'Accept-Language': 'en-US,en'  // Required by Z.AI
      },
      body: JSON.stringify(body)
    });

    // Forward Z.AI's response back to client
    return new Response(response.body, {
      status: response.status,
      headers: {
        'Content-Type': response.headers.get('Content-Type') || 'application/json',
        'Cache-Control': 'no-cache'
      }
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}
