"use client";

import { useEffect, useMemo, useState } from "react";
import { Objective } from "@/lib/types";
import { loadObjectives } from "@/lib/storage";

export default function Dashboard() {
  const [objectives, setObjectives] = useState<Objective[]>([]);

  useEffect(() => {
    const stored = loadObjectives();
    setObjectives(stored);
  }, []);

  const upcomingMilestones = useMemo(() => {
    return objectives
      .flatMap((objective) =>
        objective.milestones.map((milestone) => ({
          ...milestone,
          objective: objective.title,
        }))
      )
      .filter((milestone) => milestone.date)
      .sort((a, b) => a.date.localeCompare(b.date))
      .slice(0, 4);
  }, [objectives]);

  return (
    <div>
      <div className="header" style={{ marginBottom: "1.5rem" }}>
        <h2>Dashboard estratégico</h2>
        <p>
          Visualiza objetivos, métricas, estrategias y un calendario de avance.
        </p>
      </div>

      <div className="dashboard-grid">
        {objectives.map((objective) => (
          <div key={objective.id} className="card">
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <span className="badge">{objective.type}</span>
              <span style={{ fontSize: "0.85rem", color: "var(--muted)" }}>
                {objective.dueDate || "Sin fecha"}
              </span>
            </div>
            <h3 style={{ marginTop: "0.75rem" }}>{objective.title}</h3>
            <p style={{ color: "var(--muted)", marginTop: "0.35rem" }}>
              {objective.description}
            </p>
            <p style={{ marginTop: "0.75rem", fontWeight: 600 }}>
              {objective.metric}: {objective.target}
            </p>
            <div style={{ marginTop: "0.75rem" }}>
              <div className="progress">
                <span style={{ width: `${objective.progress}%` }} />
              </div>
              <p style={{ fontSize: "0.85rem", marginTop: "0.35rem" }}>
                Progreso: {objective.progress}%
              </p>
            </div>
            <div style={{ marginTop: "0.75rem" }}>
              <p style={{ fontWeight: 600 }}>Estrategias clave</p>
              <ul style={{ marginLeft: "1rem", color: "var(--muted)" }}>
                {objective.strategies.map((strategy, index) => (
                  <li key={`${objective.id}-strategy-${index}`}>{strategy}</li>
                ))}
              </ul>
            </div>
          </div>
        ))}
        {!objectives.length && (
          <div className="card">
            <h3>No hay objetivos guardados</h3>
            <p style={{ color: "var(--muted)", marginTop: "0.5rem" }}>
              Aún no tienes datos. Crea un objetivo desde el chat y guárdalo
              para ver tu dashboard.
            </p>
          </div>
        )}
      </div>

      <div className="card" style={{ marginTop: "1.5rem" }}>
        <h3>Calendario inteligente</h3>
        <p style={{ color: "var(--muted)", marginTop: "0.5rem" }}>
          Próximas fechas críticas y recordatorios.
        </p>
        <div className="timeline" style={{ marginTop: "1rem" }}>
          {upcomingMilestones.map((milestone) => (
            <div key={`${milestone.objective}-${milestone.label}`} className="timeline-item">
              <span />
              <div>
                <p style={{ fontWeight: 600 }}>{milestone.label}</p>
                <p style={{ fontSize: "0.85rem", color: "var(--muted)" }}>
                  {milestone.date} · {milestone.objective}
                </p>
              </div>
            </div>
          ))}
          {!upcomingMilestones.length && (
            <p style={{ color: "var(--muted)" }}>
              Agrega hitos para ver tu calendario.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
