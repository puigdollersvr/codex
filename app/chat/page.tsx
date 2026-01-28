import ChatCoach from "@/components/ChatCoach";

export default function ChatPage() {
  return (
    <div>
      <section className="header">
        <span className="badge">Chat inteligente</span>
        <h1>Conversa con tu coach de objetivos</h1>
        <p>
          El asistente te guía para definir metas SMART, OKR y KPI con preguntas
          concretas y recomendaciones accionables.
        </p>
      </section>

      <section>
        <ChatCoach />
      </section>
    </div>
  );
}
