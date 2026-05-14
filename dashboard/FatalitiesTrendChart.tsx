import { useMemo } from "react";
import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { useRoadIncidents } from "@/hooks/useRoadIncidents";

const groupOf = (mode: string) => {
  if (mode === "Peatón") return "peatones";
  if (mode === "Moto") return "motociclistas";
  return "otros";
};

export const FatalitiesTrendChart = () => {
  const { data, isLoading } = useRoadIncidents();

  const chartData = useMemo(() => {
    if (!data) return [];
    const map = new Map<number, { year: number; peatones: number; motociclistas: number; otros: number }>();
    data.forEach((d) => {
      const row = map.get(d.year) ?? { year: d.year, peatones: 0, motociclistas: 0, otros: 0 };
      row[groupOf(d.transport_mode) as "peatones" | "motociclistas" | "otros"] += d.fatalities;
      map.set(d.year, row);
    });
    return Array.from(map.values()).sort((a, b) => a.year - b.year);
  }, [data]);

  return (
    <Card className="border-border/60 bg-gradient-surface p-5 shadow-card">
      <div className="mb-4">
        <h3 className="font-display text-lg font-semibold">Fallecidos por año</h3>
        <p className="text-xs text-muted-foreground">Tendencia según filtros activos</p>
      </div>
      <div className="h-72">
        {isLoading ? (
          <Skeleton className="h-full w-full" />
        ) : chartData.length === 0 ? (
          <div className="flex h-full items-center justify-center text-sm text-muted-foreground">
            Sin datos para los filtros seleccionados
          </div>
        ) : (
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData} margin={{ left: -10, right: 10 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis dataKey="year" stroke="hsl(var(--muted-foreground))" fontSize={11} />
              <YAxis stroke="hsl(var(--muted-foreground))" fontSize={11} allowDecimals={false} />
              <Tooltip contentStyle={{ background: "hsl(var(--card))", border: "1px solid hsl(var(--border))", borderRadius: 8, fontSize: 12 }} />
              <Legend wrapperStyle={{ fontSize: 12 }} />
              <Bar dataKey="peatones" name="Peatones" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
              <Bar dataKey="motociclistas" name="Motociclistas" fill="hsl(var(--chart-3))" radius={[4, 4, 0, 0]} />
              <Bar dataKey="otros" name="Otros actores" fill="hsl(var(--chart-4))" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        )}
      </div>
    </Card>
  );
};
