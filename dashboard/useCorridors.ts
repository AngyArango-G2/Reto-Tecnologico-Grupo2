import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useFilters } from "@/contexts/FiltersContext";

export interface CorridorMonitoring {
  id: string;
  corredor: string;
  velocidad_promedio: number;
  intensidad_vehicular: number;
  nivel_servicio: string;
  flujo_libre: number;
}

export interface CorridorSpeed {
  id: string;
  corredor: string;
  velocidad_pico: number;
  velocidad_valle: number;
}

export interface CCTVCamera {
  id: string;
  name: string;
  corredor: string;
  lat: number;
  lng: number;
  status: string;
}

export const useCorridorList = () =>
  useQuery({
    queryKey: ["corredores"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("corredores")
        .select("name")
        .order("sort_order");
      if (error) throw error;
      return (data ?? []).map((r) => r.name as string);
    },
  });

export const useCorridorMonitoring = () => {
  const { filters } = useFilters();
  return useQuery({
    queryKey: ["velocidad_intensidad_vehicular", filters.corredor],
    queryFn: async () => {
      let q = supabase.from("velocidad_intensidad_vehicular").select("*").order("sort_order");
      if (filters.corredor !== "all") q = q.eq("corredor", filters.corredor);
      const { data, error } = await q;
      if (error) throw error;
      return (data ?? []) as unknown as CorridorMonitoring[];
    },
  });
};

export const useCorridorSpeeds = () => {
  const { filters } = useFilters();
  return useQuery({
    queryKey: ["velocidad_tiempo_viaje", filters.corredor],
    queryFn: async () => {
      let q = supabase.from("velocidad_tiempo_viaje").select("*").order("sort_order");
      if (filters.corredor !== "all") q = q.eq("corredor", filters.corredor);
      const { data, error } = await q;
      if (error) throw error;
      return (data ?? []) as unknown as CorridorSpeed[];
    },
  });
};

export const useCCTVCameras = () => {
  const { filters } = useFilters();
  return useQuery({
    queryKey: ["cctv_cameras", filters.corredor],
    queryFn: async () => {
      let q = supabase.from("cctv_cameras").select("*");
      if (filters.corredor !== "all") q = q.eq("corredor", filters.corredor);
      const { data, error } = await q;
      if (error) throw error;
      return (data ?? []) as CCTVCamera[];
    },
  });
};
