export default function Home() {
  return (
    <div>
      <section className="header">
        <span className="badge">PWA · Mobile first · IA</span>
        <h1>Define tus objetivos sin complicaciones</h1>
        <p>
          Habla con el asistente para transformar tus ideas en objetivos SMART,
          OKR y KPI. Guarda todo en un dashboard visual con estrategias,
          calendario y progreso.
        </p>
        <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap" }}>
          <a className="button" href="/chat">
            Empezar conversación
          </a>
          <a className="button secondary" href="/dashboard">
            Ver dashboard
          </a>
        </div>
      </section>

      <div className="grid">
        <section>
          <h2>Guía paso a paso</h2>
          <p style={{ color: "var(--muted)", marginTop: "0.5rem" }}>
            El chatbot te pregunta lo justo y necesario para aterrizar metas
            SMART, OKR y KPI sin estrés.
          </p>
          <ul style={{ marginTop: "1rem", marginLeft: "1rem", color: "var(--muted)" }}>
            <li>Diagnóstico rápido de tu contexto.</li>
            <li>Definición de métricas y responsables.</li>
            <li>Estrategias y cronograma sugerido.</li>
          </ul>
        </section>

        <section>
          <h2>Dashboard visual</h2>
          <p style={{ color: "var(--muted)", marginTop: "0.5rem" }}>
            Revisa el progreso, los hitos clave y las estrategias en un solo
            lugar con datos fáciles de leer.
          </p>
          <div style={{ marginTop: "1rem", display: "flex", gap: "0.75rem" }}>
            <a className="button secondary" href="/objetivos/nuevo">
              Guardar objetivo
            </a>
            <a className="button" href="/dashboard">
              Abrir tablero
            </a>
          </div>
        </section>
      </div>

      <section>
        <h2>Cómo funciona</h2>
        <div className="grid" style={{ marginTop: "1rem" }}>
          <div className="card">
            <h3>1. Conversa</h3>
            <p style={{ color: "var(--muted)", marginTop: "0.5rem" }}>
              Describe lo que quieres lograr y deja que el coach ordene tus
              ideas.
            </p>
          </div>
          <div className="card">
            <h3>2. Guarda</h3>
            <p style={{ color: "var(--muted)", marginTop: "0.5rem" }}>
              Convierte el resumen en un objetivo con métricas, estrategia y
              fechas claras.
            </p>
          </div>
          <div className="card">
            <h3>3. Controla</h3>
            <p style={{ color: "var(--muted)", marginTop: "0.5rem" }}>
              Visualiza avances, hitos y tareas para mantener el foco.
            </p>
          </div>
        </div>
      </section>

      <footer className="footer">
        Diseñado para ayudarte a enfocar tu estrategia y medir resultados.
      </footer>
    </div>
  );
}
