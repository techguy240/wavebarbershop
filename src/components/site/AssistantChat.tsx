import { useRef, useState, type FormEvent } from "react";
import ReactMarkdown from "react-markdown";
import { Loader2, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

type Msg = { role: "user" | "assistant"; content: string };

const suggestions = ["Quanto costa barba e capelli?", "Come posso prenotare?", "Che orari ha la sede di Volterra?"];

export function AssistantChat() {
  const [messages, setMessages] = useState<Msg[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const endRef = useRef<HTMLDivElement>(null);

  const ask = async (text: string) => {
    const q = text.trim();
    if (!q || loading) return;
    const history: Msg[] = [...messages, { role: "user", content: q.slice(0, 1000) }];
    setMessages([...history, { role: "assistant", content: "" }]);
    setInput("");
    setError(null);
    setLoading(true);
    try {
      const res = await fetch("/api/assistente", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ messages: history.slice(-20) }),
      });
      if (!res.ok || !res.body) {
        const data = (await res.json().catch(() => null)) as { error?: string } | null;
        throw new Error(
          res.status === 429 ? "Troppe richieste, riprova tra poco." : res.status === 402 ? "Assistente temporaneamente non disponibile." : data?.error ?? "Risposta non disponibile.",
        );
      }
      const reader = res.body.getReader();
      const dec = new TextDecoder();
      let acc = "";
      for (;;) {
        const { done, value } = await reader.read();
        if (done) break;
        acc += dec.decode(value, { stream: true });
        setMessages([...history, { role: "assistant", content: acc }]);
        endRef.current?.scrollIntoView({ block: "nearest" });
      }
      if (!acc.trim()) throw new Error("Nessuna risposta ricevuta. Prova a chiamare la sede.");
    } catch (e) {
      setMessages(history);
      setError(e instanceof Error ? e.message : "Errore imprevisto.");
    } finally {
      setLoading(false);
    }
  };

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    void ask(input);
  };

  return (
    <div className="card-premium flex flex-col gap-4 p-4 sm:p-6">
      <div className="max-h-[60vh] min-h-40 space-y-3 overflow-y-auto" aria-live="polite">
        {messages.length === 0 && (
          <div className="space-y-3">
            <p className="text-sm text-muted-foreground">Fai una domanda su servizi, prezzi, orari o prenotazioni.</p>
            <div className="flex flex-wrap gap-2">
              {suggestions.map((s) => (
                <Button key={s} type="button" variant="outline" size="sm" onClick={() => void ask(s)}>
                  {s}
                </Button>
              ))}
            </div>
          </div>
        )}
        {messages.map((m, i) => (
          <div key={i} className={m.role === "user" ? "ml-auto max-w-[85%] rounded-2xl bg-primary px-4 py-2 text-sm text-primary-foreground" : "max-w-[90%] rounded-2xl bg-surface px-4 py-2 text-sm"}>
            {m.role === "assistant" ? (
              m.content ? <div className="prose prose-sm prose-invert max-w-none"><ReactMarkdown>{m.content}</ReactMarkdown></div> : <Loader2 className="size-4 animate-spin text-gold" aria-label="Sto scrivendo" />
            ) : (
              m.content
            )}
          </div>
        ))}
        <div ref={endRef} />
      </div>
      {error && <p role="alert" className="text-sm text-destructive">{error}</p>}
      <form onSubmit={onSubmit} className="flex items-end gap-2">
        <Textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault();
              void ask(input);
            }
          }}
          maxLength={1000}
          rows={2}
          placeholder="Scrivi la tua domanda..."
          aria-label="La tua domanda"
          className="min-h-12 resize-none"
        />
        <Button type="submit" variant="gold" size="icon" disabled={loading || !input.trim()} aria-label="Invia domanda">
          {loading ? <Loader2 className="animate-spin" /> : <Send />}
        </Button>
      </form>
      <p className="text-xs text-muted-foreground">Risposte generate automaticamente sulla base delle informazioni del sito. Per conferme chiama la sede.</p>
    </div>
  );
}
