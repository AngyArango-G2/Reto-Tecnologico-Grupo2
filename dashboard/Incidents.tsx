import * as Icons from "lucide-react";
import { LucideIcon } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { useIncidents } from "@/hooks/useDashboardData";

const styles: Record<string, string> = {
  warn: "bg-accent/10 text-accent",
  info: "bg-[hsl(var(--chart-2)/0.12)] text-[hsl(var(--chart-2))]",
};

export const Incidents = () => {
  const { data, isLoading } = useIncidents();
  const items = data ?? [];

  return (
    <Card className="border-border/60 bg-gradient-surface p-6 shadow-card">
      <div className="mb-5 flex items-center justify-between">
        <div>
          <h3 className="font-display text-lg font-semibold">Incidentes en vivo</h3>
          <p className="text-sm text-muted-foreground">Eventos relevantes hoy</p>
        </div>
        <span className="rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-medium text-primary">
          {items.length} activos
        </span>
      </div>
      <div className="space-y-3">
        {isLoading
          ? Array.from({ length: 4 }).map((_, i) => <Skeleton key={i} className="h-14 w-full" />)
          : items.map((i) => {
              const Icon =
                ((Icons as unknown) as Record<string, LucideIcon>)[i.icon] ?? Icons.AlertCircle;
              return (
                <div
                  key={i.id}
                  className="flex items-start gap-3 rounded-xl border border-border/40 bg-card/60 p-3"
                >
                  <div className={`rounded-lg p-2 ${styles[i.level] ?? styles.info}`}>
                    <Icon className="h-4 w-4" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium">{i.title}</p>
                    <p className="text-xs text-muted-foreground">{i.location}</p>
                  </div>
                  <span className="text-[11px] text-muted-foreground">{i.time_label}</span>
                </div>
              );
            })}
      </div>
    </Card>
  );
};
