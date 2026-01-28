import { Objective } from "./types";

const STORAGE_KEY = "objetivos-inteligentes";

export const loadObjectives = (): Objective[] => {
  if (typeof window === "undefined") {
    return [];
  }
  const raw = window.localStorage.getItem(STORAGE_KEY);
  if (!raw) {
    return [];
  }
  try {
    return JSON.parse(raw) as Objective[];
  } catch {
    return [];
  }
};

export const saveObjectives = (objectives: Objective[]) => {
  if (typeof window === "undefined") {
    return;
  }
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(objectives));
};
