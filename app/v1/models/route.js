export const runtime = "edge";

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

export async function OPTIONS(request) {
  return new Response(null, {
    status: 200,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, OPTIONS",
      "Access-Control-Allow-Headers": "Authorization, Content-Type",
    },
  });
}
