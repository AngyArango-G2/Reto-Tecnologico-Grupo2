import { useMemo } from "react";
import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { useRoadIncidents } from "@/hooks/useRoadIncidents";

const COLORS = [
  "hsl(var(--primary))",
  "hsl(var(--chart-2))",
  "hsl(var(--chart-3))",
  "hsl(var(--chart-4))",
  "hsl(var(--chart-5))",
];

export const CrashTypesChart = () => {
  const { data, isLoading } = useRoadIncidents();

  const chartData = useMemo(() => {
    if (!data || data.length === 0) return [];
    const counts = new Map<string, number>();
    data.forEach((d) => counts.set(d.crash_type, (counts.get(d.crash_type) ?? 0) + 1));
    const total = data.length;
    return Array.from(counts.entries())
      .map(([type, n]) => ({ type, value: +((n / total) * 100).toFixed(1) }))
      .sort((a, b) => b.value - a.value);
  }, [data]);

  return (
    <Card className="border-border/60 bg-gradient-surface p-5 shadow-card">
      <div className="mb-4">
        <h3 className="font-display text-lg font-semibold">Tipos de siniestro</h3>
        <p className="text-xs text-muted-foreground">Distribución porcentual (filtrada)</p>
      </div>
      <div className="h-72">
        {isLoading ? (
          <Skeleton className="h-full w-full" />
        ) : chartData.length === 0 ? (
          <EmptyState />
        ) : (
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData} layout="vertical" margin={{ left: 20, right: 30 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" horizontal={false} />
              <XAxis type="number" stroke="hsl(var(--muted-foreground))" fontSize={11} tickFormatter={(v) => `${v}%`} />
              <YAxis type="category" dataKey="type" stroke="hsl(var(--muted-foreground))" fontSize={11} width={130} />
              <Tooltip
                contentStyle={{ background: "hsl(var(--card))", border: "1px solid hsl(var(--border))", borderRadius: 8, fontSize: 12 }}
                formatter={(v: number) => [`${v}%`, "Participación"]}
              />
              <Bar dataKey="value" radius={[0, 6, 6, 0]}>
                {chartData.map((_, i) => (
                  <Cell key={i} fill={COLORS[i % COLORS.length]} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        )}
      </div>
    </Card>
  );
};

const EmptyState = () => (
  <div className="flex h-full items-center justify-center text-sm text-muted-foreground">
    Sin datos para los filtros seleccionados
  </div>
);
