import * as Icons from "lucide-react";
import { TrendingUp, TrendingDown, LucideIcon } from "lucide-react";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface StatCardProps {
  label: string;
  value: string;
  delta: number;
  icon: string;
  accent?: string;
}

export const StatCard = ({ label, value, delta, icon, accent = "primary" }: StatCardProps) => {
  const positive = delta >= 0;
  const Icon = ((Icons as unknown) as Record<string, LucideIcon>)[icon] ?? Icons.Activity;
  const accentMap: Record<string, string> = {
    primary: "text-primary bg-primary/10",
    accent: "text-accent bg-accent/10",
    "chart-2": "text-[hsl(var(--chart-2))] bg-[hsl(var(--chart-2)/0.1)]",
    "chart-4": "text-[hsl(var(--chart-4))] bg-[hsl(var(--chart-4)/0.1)]",
  };

  return (
    <Card className="relative overflow-hidden border-border/60 bg-gradient-surface p-5 shadow-card transition-all hover:border-primary/40">
      <div className="flex items-start justify-between">
        <div className={cn("rounded-xl p-2.5", accentMap[accent] ?? accentMap.primary)}>
          <Icon className="h-5 w-5" />
        </div>
        <div
          className={cn(
            "flex items-center gap-1 rounded-full px-2 py-0.5 text-xs font-medium",
            positive ? "bg-primary/10 text-primary" : "bg-destructive/10 text-destructive"
          )}
        >
          {positive ? <TrendingUp className="h-3 w-3" /> : <TrendingDown className="h-3 w-3" />}
          {positive ? "+" : ""}
          {delta}%
        </div>
      </div>
      <div className="mt-5">
        <p className="text-sm text-muted-foreground">{label}</p>
        <p className="mt-1 font-display text-3xl font-bold tracking-tight">{value}</p>
      </div>
    </Card>
  );
};
