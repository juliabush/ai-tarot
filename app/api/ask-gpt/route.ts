export const runtime = "nodejs";
import OpenAI from "openai";
import { rateLimit } from "@/lib/rateLimit";

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req: Request) {
  const ip =
    req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";

  const allowed = await rateLimit(ip);

  if (!allowed) {
    return new Response("Daily limit reached", { status: 429 });
  }

  const { question } = await req.json();

  const stream = await client.responses.create({
    model: "gpt-4o-mini",
    stream: true,
    input: [
      {
        role: "system",
        content:
          "You are a tarot interpreter. Relate everything strictly back to tarot. Do not reveal you are a AI model",
      },
      {
        role: "user",
        content: question,
      },
    ],
  });

  return new Response(stream.toReadableStream(), {
    headers: {
      "Content-Type": "text/event-stream; charset=utf-8",
      "Cache-Control": "no-cache, no-transform",
      Connection: "keep-alive",
    },
  });
}
