import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useFilters } from "@/contexts/FiltersContext";

export interface RoadIncident {
  id: string;
  lat: number;
  lng: number;
  comuna: string;
  year: number;
  transport_mode: string;
  crash_type: string;
  severity: string;
  fatalities: number;
}

export const useRoadIncidents = () => {
  const { filters } = useFilters();
  return useQuery({
    queryKey: ["road_incidents", filters],
    queryFn: async () => {
      let q = supabase.from("road_incidents").select("*");
      if (filters.comuna !== "all") q = q.eq("comuna", filters.comuna);
      if (filters.year !== "all") q = q.eq("year", Number(filters.year));
      if (filters.mode !== "all") q = q.eq("transport_mode", filters.mode);
      const { data, error } = await q;
      if (error) throw error;
      return (data ?? []) as RoadIncident[];
    },
  });
};

export const useComunas = () =>
  useQuery({
    queryKey: ["comunas"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("road_incidents")
        .select("comuna")
        .order("comuna");
      if (error) throw error;
      return Array.from(new Set((data ?? []).map((r) => r.comuna))).sort();
    },
  });

export const useYears = () =>
  useQuery({
    queryKey: ["years"],
    queryFn: async () => {
      const { data, error } = await supabase.from("road_incidents").select("year");
      if (error) throw error;
      return Array.from(new Set((data ?? []).map((r) => r.year))).sort((a, b) => b - a);
    },
  });
