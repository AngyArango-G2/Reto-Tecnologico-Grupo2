import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";
import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { useModeSplit } from "@/hooks/useDashboardData";

export const ModeSplit = () => {
  const { data, isLoading } = useModeSplit();
  const items = data ?? [];

  return (
    <Card className="border-border/60 bg-gradient-surface p-6 shadow-card">
      <div className="mb-2">
        <h3 className="font-display text-lg font-semibold">Reparto modal</h3>
        <p className="text-sm text-muted-foreground">Distribución de viajes por modo</p>
      </div>
      {isLoading ? (
        <Skeleton className="h-[220px] w-full" />
      ) : (
        <ResponsiveContainer width="100%" height={220}>
          <PieChart>
            <Pie data={items} dataKey="value" innerRadius={55} outerRadius={85} paddingAngle={3} stroke="none">
              {items.map((d) => (
                <Cell key={d.id} fill={d.color} />
              ))}
            </Pie>
            <Tooltip
              contentStyle={{
                background: "hsl(var(--card))",
                border: "1px solid hsl(var(--border))",
                borderRadius: 12,
                fontSize: 12,
              }}
              formatter={(v: number) => `${v}%`}
            />
          </PieChart>
        </ResponsiveContainer>
      )}
      <div className="mt-2 grid grid-cols-2 gap-2 text-xs">
        {items.map((d) => (
          <div key={d.id} className="flex items-center justify-between rounded-md bg-card/60 px-2 py-1.5">
            <span className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-full" style={{ background: d.color }} />
              {d.name}
            </span>
            <span className="font-medium">{d.value}%</span>
          </div>
        ))}
      </div>
    </Card>
  );
};
