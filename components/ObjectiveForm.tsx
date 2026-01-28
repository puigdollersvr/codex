"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { Objective, ObjectiveType } from "@/lib/types";
import { loadObjectives, saveObjectives } from "@/lib/storage";
import { saveObjective } from "@/lib/objectiveRepository";
import { supabaseConfigured } from "@/lib/supabaseClient";

const defaultObjective = (): Objective => ({
  id: crypto.randomUUID(),
  title: "",
  type: "SMART",
  description: "",
  metric: "",
  target: "",
  dueDate: "",
  progress: 0,
  strategies: [""],
  milestones: [{ label: "", date: "" }],
});

export default function ObjectiveForm() {
  const searchParams = useSearchParams();
  const [objective, setObjective] = useState<Objective>(defaultObjective());
  const [status, setStatus] = useState<string | null>(null);

  useEffect(() => {
    const rawDraft = searchParams.get("prefill");
    if (!rawDraft) {
      setObjective((prev) => ({ ...prev, id: crypto.randomUUID() }));
      return;
    }

    try {
      const decoded = JSON.parse(decodeURIComponent(rawDraft)) as Partial<Objective>;
      setObjective((prev) => ({
        ...prev,
        ...decoded,
        type: (decoded.type as ObjectiveType) ?? prev.type,
        id: crypto.randomUUID(),
      }));
    } catch {
      setObjective((prev) => ({ ...prev, id: crypto.randomUUID() }));
    }
  }, [searchParams]);

  const updateField = (field: keyof Objective, value: string | number) => {
    setObjective((prev) => ({ ...prev, [field]: value }));
  };

  const updateStrategy = (index: number, value: string) => {
    const next = [...objective.strategies];
    next[index] = value;
    setObjective((prev) => ({ ...prev, strategies: next }));
  };

  const addStrategy = () => {
    setObjective((prev) => ({ ...prev, strategies: [...prev.strategies, ""] }));
  };

  const updateMilestone = (index: number, field: "label" | "date", value: string) => {
    const next = objective.milestones.map((milestone, idx) =>
      idx === index ? { ...milestone, [field]: value } : milestone
    );
    setObjective((prev) => ({ ...prev, milestones: next }));
  };

  const addMilestone = () => {
    setObjective((prev) => ({
      ...prev,
      milestones: [...prev.milestones, { label: "", date: "" }],
    }));
  };

  const onSave = async () => {
    const stored = loadObjectives();
    const nextObjective = { ...objective, id: crypto.randomUUID() };
    saveObjectives([nextObjective, ...stored]);
    const result = await saveObjective(nextObjective);
    if (result.error) {
      setStatus(`Guardado local listo. ${result.error}`);
    } else {
      setStatus("¡Objetivo guardado! Ya aparece en tu dashboard.");
    }
    setObjective(defaultObjective());
  };

  return (
    <div className="form-grid">
      <div style={{ gridColumn: "1 / -1" }}>
        <h2>Guardar objetivo guiado</h2>
        <p style={{ color: "var(--muted)", marginTop: "0.5rem" }}>
          Convierte el resultado del chat en un objetivo accionable.
        </p>
        {!supabaseConfigured && (
          <p style={{ marginTop: "0.75rem", color: "var(--warning)" }}>
            Supabase no está configurado. Este objetivo se guardará solo en tu
            navegador.
          </p>
        )}
      </div>

      <div>
        <label>Tipo</label>
        <select
          value={objective.type}
          onChange={(event) => updateField("type", event.target.value as ObjectiveType)}
        >
          <option value="SMART">SMART</option>
          <option value="OKR">OKR</option>
          <option value="KPI">KPI</option>
        </select>
      </div>

      <div>
        <label>Nombre del objetivo</label>
        <input
          className="input"
          value={objective.title}
          onChange={(event) => updateField("title", event.target.value)}
          placeholder="Ej: Incrementar ventas en 20%"
        />
      </div>

      <div style={{ gridColumn: "1 / -1" }}>
        <label>Descripción</label>
        <textarea
          rows={3}
          value={objective.description}
          onChange={(event) => updateField("description", event.target.value)}
        />
      </div>

      <div>
        <label>Métrica clave</label>
        <input
          className="input"
          value={objective.metric}
          onChange={(event) => updateField("metric", event.target.value)}
          placeholder="Ej: Conversión, churn, CAC"
        />
      </div>

      <div>
        <label>Meta</label>
        <input
          className="input"
          value={objective.target}
          onChange={(event) => updateField("target", event.target.value)}
          placeholder="Ej: 20%"
        />
      </div>

      <div>
        <label>Fecha objetivo</label>
        <input
          className="input"
          type="date"
          value={objective.dueDate}
          onChange={(event) => updateField("dueDate", event.target.value)}
        />
      </div>

      <div>
        <label>Progreso (%)</label>
        <input
          className="input"
          type="number"
          min={0}
          max={100}
          value={objective.progress}
          onChange={(event) => updateField("progress", Number(event.target.value))}
        />
      </div>

      <div style={{ gridColumn: "1 / -1" }}>
        <label>Estrategias</label>
        {objective.strategies.map((strategy, index) => (
          <input
            key={`strategy-${index}`}
            className="input"
            style={{ marginTop: "0.5rem" }}
            value={strategy}
            onChange={(event) => updateStrategy(index, event.target.value)}
            placeholder="Ej: Automatizar campañas de email"
          />
        ))}
        <button className="button secondary" type="button" onClick={addStrategy}>
          + Añadir estrategia
        </button>
      </div>

      <div style={{ gridColumn: "1 / -1" }}>
        <label>Hitos / calendario</label>
        {objective.milestones.map((milestone, index) => (
          <div key={`milestone-${index}`} style={{ display: "flex", gap: "0.5rem", marginTop: "0.5rem" }}>
            <input
              className="input"
              value={milestone.label}
              onChange={(event) => updateMilestone(index, "label", event.target.value)}
              placeholder="Ej: Lanzar campaña"
            />
            <input
              className="input"
              type="date"
              value={milestone.date}
              onChange={(event) => updateMilestone(index, "date", event.target.value)}
            />
          </div>
        ))}
        <button className="button secondary" type="button" onClick={addMilestone}>
          + Añadir hito
        </button>
      </div>

      <div style={{ gridColumn: "1 / -1" }}>
        <button className="button" type="button" onClick={onSave}>
          Guardar objetivo
        </button>
        {status && (
          <p style={{ marginTop: "0.75rem", color: "var(--success)" }}>{status}</p>
        )}
      </div>
    </div>
  );
}
