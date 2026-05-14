import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";
import { Radio } from "lucide-react";
import { useCorridorMonitoring } from "@/hooks/useCorridors";

const levelStyles: Record<string, { dot: string; label: string; badge: string }> = {
  Libre: { dot: "bg-primary", label: "Libre", badge: "bg-primary/15 text-primary border-primary/30" },
  Interrumpido: {
    dot: "bg-[hsl(45_95%_55%)]",
    label: "Interrumpido",
    badge: "bg-[hsl(45_95%_55%/0.15)] text-[hsl(45_95%_55%)] border-[hsl(45_95%_55%/0.35)]",
  },
  Saturado: { dot: "bg-destructive", label: "Saturado", badge: "bg-destructive/15 text-destructive border-destructive/30" },
};

export const CorridorMonitoring = () => {
  const { data, isLoading } = useCorridorMonitoring();

  return (
    <Card className="border-border/60 bg-gradient-surface p-5 shadow-card">
      <div className="mb-4 flex items-center justify-between">
        <div>
          <div className="flex items-center gap-2">
            <div className="rounded-lg bg-primary/10 p-1.5 text-primary">
              <Radio className="h-4 w-4" />
            </div>
            <h3 className="font-display text-lg font-semibold">
              Monitoreo en tiempo real — Corredores viales
            </h3>
          </div>
          <p className="mt-1 text-xs text-muted-foreground">
            Velocidad promedio, intensidad vehicular y nivel de servicio
          </p>
        </div>
      </div>

      {isLoading ? (
        <div className="space-y-2">
          {Array.from({ length: 5 }).map((_, i) => <Skeleton key={i} className="h-12 w-full" />)}
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border/60 text-left text-xs uppercase tracking-wider text-muted-foreground">
                <th className="py-2 font-medium">Corredor</th>
                <th className="py-2 font-medium">Velocidad prom.</th>
                <th className="py-2 font-medium">Intensidad</th>
                <th className="py-2 font-medium">Nivel de servicio</th>
              </tr>
            </thead>
            <tbody>
              {(data ?? []).map((row) => {
                const s = levelStyles[row.nivel_servicio] ?? levelStyles.Libre;
                return (
                  <tr key={row.id} className="border-b border-border/30 last:border-0">
                    <td className="py-3 font-medium">{row.corredor}</td>
                    <td className="py-3 tabular-nums">
                      {Number(row.velocidad_promedio).toFixed(0)} <span className="text-xs text-muted-foreground">km/h</span>
                    </td>
                    <td className="py-3 tabular-nums">
                      {Number(row.intensidad_vehicular).toLocaleString()} <span className="text-xs text-muted-foreground">veh/h</span>
                    </td>
                    <td className="py-3">
                      <span
                        className={cn(
                          "inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-[11px] font-medium",
                          s.badge
                        )}
                      >
                        <span className={cn("h-2 w-2 rounded-full", s.dot)} />
                        {s.label}
                      </span>
                    </td>
                  </tr>
                );
              })}
              {(data ?? []).length === 0 && (
                <tr>
                  <td colSpan={4} className="py-6 text-center text-xs text-muted-foreground">
                    Sin datos para los filtros actuales
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </Card>
  );
};
