import { createFileRoute } from "@tanstack/react-router";
import { z } from "zod";
import { streamAssistant } from "@/lib/assistant.server";

const bodySchema = z.object({
  messages: z
    .array(z.object({ role: z.enum(["user", "assistant"]), content: z.string().trim().min(1).max(1000) }))
    .min(1)
    .max(20),
});

export const Route = createFileRoute("/api/assistente")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        const parsed = bodySchema.safeParse(await request.json().catch(() => null));
        if (!parsed.success) return Response.json({ error: "Domanda non valida." }, { status: 400 });
        try {
          return streamAssistant(request, parsed.data.messages);
        } catch (e) {
          console.error(e);
          return Response.json({ error: "Assistente momentaneamente non disponibile." }, { status: 502 });
        }
      },
    },
  },
});
