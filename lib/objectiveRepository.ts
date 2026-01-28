import { Objective } from "./types";
import { supabase } from "./supabaseClient";

export const saveObjective = async (objective: Objective) => {
  if (!supabase) {
    return { data: null, error: "Supabase no está configurado." };
  }

  const { data, error } = await supabase
    .from("objectives")
    .insert(objective)
    .select()
    .single();

  return { data, error };
};
