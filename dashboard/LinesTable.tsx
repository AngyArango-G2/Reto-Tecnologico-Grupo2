import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";
import { useLines } from "@/hooks/useDashboardData";

export const LinesTable = () => {
  const { data, isLoading } = useLines();

  return (
    <Card className="border-border/60 bg-gradient-surface p-6 shadow-card">
      <div className="mb-5">
        <h3 className="font-display text-lg font-semibold">Líneas del sistema</h3>
        <p className="text-sm text-muted-foreground">Pasajeros y nivel de ocupación hoy</p>
      </div>
      <div className="space-y-3">
        {isLoading
          ? Array.from({ length: 6 }).map((_, i) => <Skeleton key={i} className="h-16 w-full" />)
          : (data ?? []).map((l) => (
              <div key={l.id} className="rounded-xl border border-border/40 bg-card/60 p-3.5">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className={cn("h-3 w-3 rounded-full", l.color)} />
                    <div>
                      <p className="text-sm font-medium">{l.name}</p>
                      <p className="text-xs text-muted-foreground">{l.riders} pasajeros</p>
                    </div>
                  </div>
                  <span
                    className={cn(
                      "rounded-full px-2.5 py-0.5 text-[11px] font-medium",
                      l.load > 80
                        ? "bg-destructive/15 text-destructive"
                        : l.load > 55
                        ? "bg-accent/15 text-accent"
                        : "bg-primary/15 text-primary"
                    )}
                  >
                    {l.status}
                  </span>
                </div>
                <div className="mt-3 h-1.5 w-full overflow-hidden rounded-full bg-secondary">
                  <div
                    className={cn(
                      "h-full rounded-full",
                      l.load > 80 ? "bg-destructive" : l.load > 55 ? "bg-accent" : "bg-primary"
                    )}
                    style={{ width: `${l.load}%` }}
                  />
                </div>
              </div>
            ))}
      </div>
    </Card>
  );
};
