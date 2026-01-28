export type ObjectiveType = "SMART" | "OKR" | "KPI";

export type Milestone = {
  label: string;
  date: string;
};

export type Objective = {
  id: string;
  title: string;
  type: ObjectiveType;
  description: string;
  metric: string;
  target: string;
  dueDate: string;
  progress: number;
  strategies: string[];
  milestones: Milestone[];
};
