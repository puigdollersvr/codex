"use client";

import { useChat } from "ai/react";
import { FormEvent, useMemo } from "react";

const quickPrompts = [
  "Quiero aumentar mis ventas en 3 meses",
  "Necesito mejorar la retención de clientes",
  "Ayúdame a definir un OKR para marketing",
  "Quiero medir mi productividad semanal",
];

export default function ChatCoach() {
  const aiEnabled = process.env.NEXT_PUBLIC_AI_ENABLED === "true";
  const { messages, input, handleInputChange, handleSubmit, setInput, isLoading } =
    useChat({
      api: "/api/chat",
    });

  const hasMessages = messages.length > 0;

  const lastAssistantMessage = useMemo(() => {
    return [...messages].reverse().find((message) => message.role === "assistant");
  }, [messages]);

  const lastUserMessage = useMemo(() => {
    return [...messages].reverse().find((message) => message.role === "user");
  }, [messages]);

  const draftLink = useMemo(() => {
    if (!lastAssistantMessage && !lastUserMessage) {
      return null;
    }
    const draft = {
      title: lastUserMessage?.content ?? "",
      description: lastAssistantMessage?.content ?? "",
      type: "SMART",
    };
    return `/objetivos/nuevo?prefill=${encodeURIComponent(
      JSON.stringify(draft)
    )}`;
  }, [lastAssistantMessage, lastUserMessage]);

  const onQuickPrompt = (prompt: string) => {
    setInput(prompt);
  };

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    if (!aiEnabled) {
      event.preventDefault();
      return;
    }
    handleSubmit(event);
  };

  return (
    <div className="chat">
      <div>
        <h2>Coach de objetivos</h2>
        <p style={{ color: "var(--muted)", marginTop: "0.5rem" }}>
          Conversa con el chatbot para descubrir metas SMART, OKR y KPI.
        </p>
      </div>

      <div className="chat-window" aria-live="polite">
        {!hasMessages && (
          <div className="message">
            Hola, soy tu coach. Cuéntame qué quieres lograr y te ayudaré a
            convertirlo en un objetivo SMART con métricas, estrategias y fechas.
          </div>
        )}
        {messages.map((message) => (
          <div
            key={message.id}
            className={`message ${message.role === "user" ? "user" : ""}`}
          >
            {message.content}
          </div>
        ))}
        {isLoading && (
          <div className="message">Estoy analizando tu objetivo...</div>
        )}
      </div>

      <div className="quick-actions">
        {quickPrompts.map((prompt) => (
          <button key={prompt} type="button" onClick={() => onQuickPrompt(prompt)}>
            {prompt}
          </button>
        ))}
      </div>

      <form onSubmit={onSubmit}>
        <label htmlFor="chat-input">Tu mensaje</label>
        <div style={{ display: "flex", gap: "0.75rem", marginTop: "0.5rem" }}>
          <input
            id="chat-input"
            className="input"
            value={input}
            onChange={handleInputChange}
            placeholder="Escribe tu objetivo aquí..."
            disabled={!aiEnabled}
          />
          <button className="button" type="submit" disabled={!aiEnabled}>
            Enviar
          </button>
        </div>
        {!aiEnabled && (
          <p style={{ marginTop: "0.75rem", color: "var(--warning)" }}>
            La IA no está configurada. Define OPENAI_API_KEY y habilita
            NEXT_PUBLIC_AI_ENABLED=true.
          </p>
        )}
      </form>

      <div className="card">
        <h3>Resumen rápido</h3>
        <p style={{ color: "var(--muted)", marginTop: "0.5rem" }}>
          {lastAssistantMessage?.content ??
            "Las conclusiones del coach aparecerán aquí para que puedas guardarlas en el dashboard."}
        </p>
        {draftLink && (
          <a className="button" style={{ marginTop: "0.75rem" }} href={draftLink}>
            Guardar este objetivo
          </a>
        )}
      </div>
    </div>
  );
}
