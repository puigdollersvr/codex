import Dashboard from "@/components/Dashboard";

export default function DashboardPage() {
  return (
    <div>
      <section className="header">
        <span className="badge">Dashboard</span>
        <h1>Tu progreso en un solo lugar</h1>
        <p>
          Revisa objetivos, estrategias y calendario con una vista clara y
          ordenada.
        </p>
      </section>

      <section>
        <Dashboard />
      </section>
    </div>
  );
}
