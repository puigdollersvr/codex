import { openai } from "@ai-sdk/openai";
import { streamText } from "ai";

export const runtime = "edge";

const systemPrompt = `Eres un coach experto en objetivos SMART, OKR y KPI.
Guía a la persona paso a paso para definir su objetivo, métricas, estrategias,
responsables y fechas. Haz preguntas cortas y claras. Devuelve sugerencias
accionables y resúmenes con bullets. Responde en español.`;

export async function POST(req: Request) {
  if (!process.env.OPENAI_API_KEY) {
    return new Response(
      "OPENAI_API_KEY no está configurada. Define la variable y reinicia el servidor.",
      { status: 500 }
    );
  }
  const { messages } = await req.json();

  const result = await streamText({
    model: openai("gpt-4o-mini"),
    system: systemPrompt,
    messages,
  });

  return result.toDataStreamResponse();
}
