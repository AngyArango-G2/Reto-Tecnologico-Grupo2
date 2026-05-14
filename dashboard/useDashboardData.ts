import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export const useStats = () =>
  useQuery({
    queryKey: ["stats"],
    queryFn: async () => {
      const { data, error } = await supabase.from("stats").select("*").order("sort_order");
      if (error) throw error;
      return data;
    },
  });

export const useRidership = () =>
  useQuery({
    queryKey: ["ridership"],
    queryFn: async () => {
      const { data, error } = await supabase.from("ridership").select("*").order("sort_order");
      if (error) throw error;
      return data;
    },
  });

export const useHourlyDemand = () =>
  useQuery({
    queryKey: ["hourly_demand"],
    queryFn: async () => {
      const { data, error } = await supabase.from("hourly_demand").select("*").order("sort_order");
      if (error) throw error;
      return data;
    },
  });

export const useLines = () =>
  useQuery({
    queryKey: ["lines"],
    queryFn: async () => {
      const { data, error } = await supabase.from("lines").select("*").order("sort_order");
      if (error) throw error;
      return data;
    },
  });

export const useModeSplit = () =>
  useQuery({
    queryKey: ["mode_split"],
    queryFn: async () => {
      const { data, error } = await supabase.from("mode_split").select("*").order("sort_order");
      if (error) throw error;
      return data;
    },
  });

export const useIncidents = () =>
  useQuery({
    queryKey: ["incidents"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("incidents")
        .select("*")
        .order("created_at", { ascending: false });
      if (error) throw error;
      return data;
    },
  });
