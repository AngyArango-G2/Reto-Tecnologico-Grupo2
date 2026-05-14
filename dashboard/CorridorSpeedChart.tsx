import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { useCorridorSpeeds } from "@/hooks/useCorridors";

export const CorridorSpeedChart = () => {
  const { data, isLoading } = useCorridorSpeeds();

  const chartData = (data ?? []).map((d) => ({
    corredor: d.corredor.replace("Av. ", ""),
    Pico: Number(d.velocidad_pico),
    Valle: Number(d.velocidad_valle),
  }));

  return (
    <Card className="border-border/60 bg-gradient-surface p-5 shadow-card">
      <div className="mb-4">
        <h3 className="font-display text-lg font-semibold">Velocidad pico vs valle por corredor</h3>
        <p className="text-xs text-muted-foreground">Comparativo de velocidades promedio (km/h)</p>
      </div>
      {isLoading ? (
        <Skeleton className="h-72 w-full" />
      ) : (
        <ResponsiveContainer width="100%" height={288}>
          <LineChart data={chartData} margin={{ top: 8, right: 16, left: -8, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
            <XAxis dataKey="corredor" stroke="hsl(var(--muted-foreground))" fontSize={11} />
            <YAxis stroke="hsl(var(--muted-foreground))" fontSize={11} unit=" km/h" />
            <Tooltip
              contentStyle={{
                background: "hsl(var(--card))",
                border: "1px solid hsl(var(--border))",
                borderRadius: 8,
                fontSize: 12,
              }}
            />
            <Legend wrapperStyle={{ fontSize: 12 }} />
            <Line
              type="monotone"
              dataKey="Pico"
              stroke="hsl(var(--destructive))"
              strokeWidth={2.5}
              dot={{ r: 4 }}
              activeDot={{ r: 6 }}
            />
            <Line
              type="monotone"
              dataKey="Valle"
              stroke="hsl(var(--primary))"
              strokeWidth={2.5}
              dot={{ r: 4 }}
              activeDot={{ r: 6 }}
            />
          </LineChart>
        </ResponsiveContainer>
      )}
    </Card>
  );
};
