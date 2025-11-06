export const runtime = "edge";

// Handle OPTIONS for CORS preflight
export async function OPTIONS(request) {
  return new Response(null, {
    status: 200,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
      "Access-Control-Allow-Headers": "Authorization, Content-Type",
    },
  });
}

// Handle GET requests (for /v1/models endpoint)
export async function GET(request) {
  return new Response(
    JSON.stringify({
      object: "list",
      data: [
        {
          id: "glm-4.6",
          object: "model",
          created: 1677610602,
          owned_by: "zhipuai",
        },
      ],
    }),
    {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
    }
  );
}

// Handle POST requests (existing logic)
export async function POST(request) {
  try {
    const body = await request.json();
    const authHeader = request.headers.get("Authorization");

    // Validate that Authorization header exists
    if (!authHeader) {
      return new Response(
        JSON.stringify({ error: "Missing Authorization header" }),
        {
          status: 401,
          headers: { 
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*"
          },
        }
      );
    }

    // Forward request to Z.AI with client's API key
    const response = await fetch(
      "https://api.z.ai/api/paas/v4/chat/completions",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: authHeader, // Pass through client's key
          "Accept-Language": "en-US,en", // Required by Z.AI
        },
        body: JSON.stringify(body),
      }
    );

    // Forward Z.AI's response back to client
    return new Response(response.body, {
      status: response.status,
      headers: {
        "Content-Type":
          response.headers.get("Content-Type") || "application/json",
        "Cache-Control": "no-cache",
        "Access-Control-Allow-Origin": "*",
      },
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { 
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*"
      },
    });
  }
}
