import { useMemo } from "react";
import { Card } from "@/components/ui/card";
import { Activity, AlertTriangle, Clock, Gauge } from "lucide-react";
import { cn } from "@/lib/utils";
import { useRoadIncidents } from "@/hooks/useRoadIncidents";
import { useCorridorMonitoring, useCorridorSpeeds } from "@/hooks/useCorridors";
import { Skeleton } from "@/components/ui/skeleton";

type Status = "normal" | "moderado" | "critico";

const statusStyles: Record<Status, { badge: string; ring: string; dot: string; text: string }> = {
  normal: {
    badge: "bg-primary/15 text-primary border-primary/30",
    ring: "ring-primary/20",
    dot: "bg-primary",
    text: "Normal",
  },
  moderado: {
    badge: "bg-[hsl(45_95%_55%/0.15)] text-[hsl(45_95%_55%)] border-[hsl(45_95%_55%/0.35)]",
    ring: "ring-[hsl(45_95%_55%/0.25)]",
    dot: "bg-[hsl(45_95%_55%)]",
    text: "Moderado",
  },
  critico: {
    badge: "bg-destructive/15 text-destructive border-destructive/30",
    ring: "ring-destructive/20",
    dot: "bg-destructive",
    text: "Crítico",
  },
};

const congestionStatus = (r: number): Status => (r < 0.5 ? "critico" : r < 0.75 ? "moderado" : "normal");
const incidentsStatus = (n: number): Status => (n >= 30 ? "critico" : n >= 10 ? "moderado" : "normal");
const intervalStatus = (m: number): Status => (m > 10 ? "critico" : m > 7 ? "moderado" : "normal");
const speedStatus = (gap: number): Status => (gap >= 20 ? "critico" : gap >= 10 ? "moderado" : "normal");

export const KpiCards = () => {
  const { data, isLoading } = useRoadIncidents();
  const { data: monitoring, isLoading: monLoading } = useCorridorMonitoring();
  const { data: speeds, isLoading: spLoading } = useCorridorSpeeds();

  const kpis = useMemo(() => {
    const total = data?.length ?? 0;

    // KPI A: Índice de Congestión Vial = velocidad promedio observada / velocidad de flujo libre
    const congestion = (() => {
      if (!monitoring || monitoring.length === 0) return 0.62;
      const ratios = monitoring.map((m) => Number(m.velocidad_promedio) / Number(m.flujo_libre || 60));
      return ratios.reduce((a, b) => a + b, 0) / ratios.length;
    })();

    // KPI D: Velocidad pico vs valle (promedio km/h)
    const { peakSpeed, offPeakSpeed } = (() => {
      if (!speeds || speeds.length === 0) return { peakSpeed: 28, offPeakSpeed: 46 };
      const peak = speeds.reduce((s, r) => s + Number(r.velocidad_pico), 0) / speeds.length;
      const valle = speeds.reduce((s, r) => s + Number(r.velocidad_valle), 0) / speeds.length;
      return { peakSpeed: peak, offPeakSpeed: valle };
    })();
    const gap = +(offPeakSpeed - peakSpeed).toFixed(0);

    const interval = +(4 + total * 0.08).toFixed(1);

    return [
      {
        code: "KPI A",
        label: "Índice de Congestión Vial",
        description: "Velocidad observada / flujo libre",
        value: congestion.toFixed(2),
        unit: "ratio",
        status: congestionStatus(congestion),
        icon: Gauge,
      },
      {
        code: "KPI 2",
        label: "Accidentalidad Georreferenciada",
        description: "Incidentes en el periodo filtrado",
        value: String(total),
        unit: "incidentes",
        status: incidentsStatus(total),
        icon: AlertTriangle,
      },
      {
        code: "KPI 3",
        label: "Intervalo de Operación",
        description: "Min entre servicios de transporte",
        value: interval.toFixed(1),
        unit: "min",
        status: intervalStatus(interval),
        icon: Clock,
      },
      {
        code: "KPI D",
        label: "Velocidad Pico vs Valle",
        description: "Promedio hora pico vs hora valle",
        value: `${peakSpeed.toFixed(0)} / ${offPeakSpeed.toFixed(0)}`,
        unit: "km/h",
        status: speedStatus(gap),
        icon: Activity,
      },
    ];
  }, [data, monitoring, speeds]);

  if (isLoading || monLoading || spLoading) {
    return (
      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {Array.from({ length: 4 }).map((_, i) => <Skeleton key={i} className="h-36 w-full" />)}
      </section>
    );
  }

  return (
    <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
      {kpis.map((k) => {
        const s = statusStyles[k.status];
        const Icon = k.icon;
        return (
          <Card
            key={k.code}
            className={cn(
              "relative overflow-hidden border-border/60 bg-gradient-surface p-5 shadow-card ring-1 transition-all hover:border-primary/40",
              s.ring
            )}
          >
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-2">
                <div className="rounded-xl bg-primary/10 p-2 text-primary">
                  <Icon className="h-4 w-4" />
                </div>
                <span className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
                  {k.code}
                </span>
              </div>
              <div className={cn("flex items-center gap-1.5 rounded-full border px-2 py-0.5 text-[11px] font-medium", s.badge)}>
                <span className={cn("h-1.5 w-1.5 rounded-full", s.dot)} />
                {s.text}
              </div>
            </div>
            <div className="mt-4">
              <p className="text-sm font-medium text-foreground">{k.label}</p>
              <p className="mt-0.5 text-xs text-muted-foreground">{k.description}</p>
              <div className="mt-3 flex items-baseline gap-1.5">
                <span className="font-display text-3xl font-bold tracking-tight">{k.value}</span>
                <span className="text-xs text-muted-foreground">{k.unit}</span>
              </div>
            </div>
          </Card>
        );
      })}
    </section>
  );
};
