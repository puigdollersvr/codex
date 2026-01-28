import ObjectiveForm from "@/components/ObjectiveForm";

export default function NewObjectivePage() {
  return (
    <div>
      <section className="header">
        <span className="badge">Guardar objetivo</span>
        <h1>Convierte la conversación en un plan accionable</h1>
        <p>
          Completa los datos clave para estructurar tu objetivo con métricas,
          estrategias y calendario.
        </p>
      </section>

      <section>
        <ObjectiveForm />
      </section>
    </div>
  );
}
