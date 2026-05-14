import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { useRidership } from "@/hooks/useDashboardData";

export const RidershipChart = () => {
  const { data, isLoading } = useRidership();

  return (
    <Card className="border-border/60 bg-gradient-surface p-6 shadow-card">
      <div className="mb-6 flex items-end justify-between">
        <div>
          <h3 className="font-display text-lg font-semibold">Pasajeros movilizados</h3>
          <p className="text-sm text-muted-foreground">Última semana — Metro vs Metroplús</p>
        </div>
        <div className="flex gap-4 text-xs">
          <span className="flex items-center gap-1.5">
            <span className="h-2.5 w-2.5 rounded-full bg-primary" /> Metro
          </span>
          <span className="flex items-center gap-1.5">
            <span className="h-2.5 w-2.5 rounded-full bg-[hsl(var(--chart-2))]" /> Metroplús
          </span>
        </div>
      </div>
      {isLoading ? (
        <Skeleton className="h-[280px] w-full" />
      ) : (
        <ResponsiveContainer width="100%" height={280}>
          <AreaChart data={data ?? []} margin={{ top: 5, right: 5, left: -10, bottom: 0 }}>
            <defs>
              <linearGradient id="metroGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="hsl(var(--chart-1))" stopOpacity={0.5} />
                <stop offset="100%" stopColor="hsl(var(--chart-1))" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="mpGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="hsl(var(--chart-2))" stopOpacity={0.4} />
                <stop offset="100%" stopColor="hsl(var(--chart-2))" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid stroke="hsl(var(--border))" strokeDasharray="3 3" vertical={false} />
            <XAxis dataKey="day" stroke="hsl(var(--muted-foreground))" fontSize={12} tickLine={false} axisLine={false} />
            <YAxis
              stroke="hsl(var(--muted-foreground))"
              fontSize={12}
              tickLine={false}
              axisLine={false}
              tickFormatter={(v) => `${(v / 1000).toFixed(0)}k`}
            />
            <Tooltip
              contentStyle={{
                background: "hsl(var(--card))",
                border: "1px solid hsl(var(--border))",
                borderRadius: 12,
                fontSize: 12,
              }}
              formatter={(v: number) => v.toLocaleString("es-CO")}
            />
            <Area type="monotone" dataKey="metro" stroke="hsl(var(--chart-1))" strokeWidth={2.5} fill="url(#metroGrad)" />
            <Area type="monotone" dataKey="metroplus" stroke="hsl(var(--chart-2))" strokeWidth={2.5} fill="url(#mpGrad)" />
          </AreaChart>
        </ResponsiveContainer>
      )}
    </Card>
  );
};
