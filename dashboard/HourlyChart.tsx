import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { useHourlyDemand } from "@/hooks/useDashboardData";

export const HourlyChart = () => {
  const { data, isLoading } = useHourlyDemand();
  const chartData = (data ?? []).map((d) => ({ hour: d.hour, v: d.occupancy }));

  return (
    <Card className="border-border/60 bg-gradient-surface p-6 shadow-card">
      <div className="mb-6">
        <h3 className="font-display text-lg font-semibold">Demanda por hora</h3>
        <p className="text-sm text-muted-foreground">Ocupación promedio (%)</p>
      </div>
      {isLoading ? (
        <Skeleton className="h-[240px] w-full" />
      ) : (
        <ResponsiveContainer width="100%" height={240}>
          <BarChart data={chartData} margin={{ top: 5, right: 5, left: -20, bottom: 0 }}>
            <CartesianGrid stroke="hsl(var(--border))" strokeDasharray="3 3" vertical={false} />
            <XAxis dataKey="hour" stroke="hsl(var(--muted-foreground))" fontSize={11} tickLine={false} axisLine={false} />
            <YAxis stroke="hsl(var(--muted-foreground))" fontSize={11} tickLine={false} axisLine={false} />
            <Tooltip
              cursor={{ fill: "hsl(var(--muted) / 0.4)" }}
              contentStyle={{
                background: "hsl(var(--card))",
                border: "1px solid hsl(var(--border))",
                borderRadius: 12,
                fontSize: 12,
              }}
            />
            <Bar dataKey="v" fill="hsl(var(--chart-3))" radius={[6, 6, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      )}
    </Card>
  );
};
