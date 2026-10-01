import { createOpenAI } from "@ai-sdk/openai";
import { streamText, type ModelMessage } from "ai";
import { APP_STORE_URL, GOOGLE_PLAY_URL, locationList, services, siteConfig, staff } from "@/config";

const MODEL = "openai/gpt-6-astra";

/** Contesto costruito SOLO dalla configurazione del sito: nessun dato inventato. */
function buildSystemPrompt() {
  const servizi = services.map((s) => `- ${s.name}: ${s.price}, ${s.durationMinutes} minuti`).join("\n");
  const sedi = locationList
    .map((l) => {
      const team = staff.filter((p) => p.locations.includes(l.id)).map((p) => p.name).join(", ");
      return `## ${l.name}\nIndirizzo: ${l.address}, ${l.postalCode} ${l.city} (${l.province})\nTelefono: ${l.phone}\nOrari:\n${l.hoursLabel.join("\n")}\nBarbieri: ${team}`;
    })
    .join("\n\n");
  const app = GOOGLE_PLAY_URL || APP_STORE_URL
    ? `Link app: ${[GOOGLE_PLAY_URL, APP_STORE_URL].filter(Boolean).join(" · ")}`
    : "I link agli store non sono ancora disponibili: indica di cercare l'app ufficiale WaveBarbershop oppure di chiamare la sede.";

  return `Sei l'assistente virtuale di ${siteConfig.name}, barberia con sedi a Cecina e Volterra. Rispondi sempre in italiano, in modo cordiale, breve e chiaro (massimo circa 120 parole).

Usa ESCLUSIVAMENTE le informazioni qui sotto. Se una cosa non è presente (es. disponibilità di un servizio in una sede, orari liberi, promozioni, prodotti), dì che non hai questa informazione e invita a chiamare la sede. Non inventare mai prezzi, durate, orari o disponibilità. Non puoi prenotare né vedere gli appuntamenti.

PRENOTAZIONI: online solo tramite l'app ufficiale WaveBarbershop; in alternativa per telefono chiamando la sede. ${app}

SERVIZI (validi per il catalogo, conferma la disponibilità per sede telefonando):
${servizi}

SEDI:
${sedi}

Rifiuta con gentilezza domande non legate alla barberia.`;
}

export function streamAssistant(request: Request, messages: ModelMessage[]) {
  const apiKey = process.env["LOVABLE_API_KEY"];
  if (!apiKey) return new Response(JSON.stringify({ error: "Assistente non configurato." }), { status: 500 });
  const provider = createOpenAI({
    baseURL: "https://ai.gateway.lovable.dev/v1",
    apiKey,
    headers: { "Lovable-API-Key": apiKey, "X-Lovable-AIG-SDK": "vercel-ai-sdk" },
  });
  const result = streamText({
    model: provider.responses(MODEL),
    system: buildSystemPrompt(),
    messages,
    abortSignal: request.signal,
    providerOptions: {
      openai: {
        forceReasoning: true,
        reasoningEffort: "low",
        reasoningSummary: "auto",
        store: false,
        include: ["reasoning.encrypted_content"],
      },
    },
  });
  return result.toTextStreamResponse();
}
