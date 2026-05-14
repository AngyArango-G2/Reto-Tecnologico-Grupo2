import { Bell } from "lucide-react";
import { useStats } from "@/hooks/useDashboardData";
import { Skeleton } from "@/components/ui/skeleton";
import { Sidebar } from "@/components/dashboard/Sidebar";
import { KpiCards } from "@/components/dashboard/KpiCards";
import { StatCard } from "@/components/dashboard/StatCard";
import { RidershipChart } from "@/components/dashboard/RidershipChart";
import { HourlyChart } from "@/components/dashboard/HourlyChart";
import { LinesTable } from "@/components/dashboard/LinesTable";
import { ModeSplit } from "@/components/dashboard/ModeSplit";
import { Incidents } from "@/components/dashboard/Incidents";
import { CrashTypesChart } from "@/components/dashboard/CrashTypesChart";
import { FatalitiesTrendChart } from "@/components/dashboard/FatalitiesTrendChart";
import { FilterBar } from "@/components/dashboard/FilterBar";
import { AccidentMap } from "@/components/dashboard/AccidentMap";
import { CorridorMonitoring } from "@/components/dashboard/CorridorMonitoring";
import { CorridorSpeedChart } from "@/components/dashboard/CorridorSpeedChart";
import { CCTVMap } from "@/components/dashboard/CCTVMap";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useState } from "react";

const Index = () => {
  const { data: stats, isLoading: statsLoading, isFetching, isError } = useStats();
  const [period, setPeriod] = useState("today");

  const status = isError
    ? { label: "Sin conexión", color: "bg-destructive" }
    : isFetching
    ? { label: "Sincronizando…", color: "bg-accent" }
    : { label: "Datos en vivo", color: "bg-primary" };

  return (
    <div className="flex min-h-screen bg-background bg-gradient-glow">
      <Sidebar />

      <main className="flex-1 overflow-x-hidden">
        {/* Header */}
        <header className="sticky top-0 z-10 flex flex-col gap-3 border-b border-border/60 bg-background/80 px-6 py-4 backdrop-blur-xl md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="font-display text-xl font-bold tracking-tight sm:text-2xl">
              <span className="text-gradient">SINITT G2</span>
              <span className="text-muted-foreground"> — Movilidad Medellín</span>
            </h1>
            <p className="text-xs text-muted-foreground">
              Sistema integrado de información de tránsito y transporte
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <div className="flex items-center gap-2 rounded-full border border-border/60 bg-card/60 px-3 py-1.5">
              <span className="relative flex h-2 w-2">
                <span className={`absolute inline-flex h-full w-full animate-ping rounded-full opacity-75 ${status.color}`} />
                <span className={`relative inline-flex h-2 w-2 rounded-full ${status.color}`} />
              </span>
              <span className="text-xs font-medium">{status.label}</span>
            </div>
            <Select value={period} onValueChange={setPeriod}>
              <SelectTrigger className="w-40 bg-card/60 border-border/60">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="today">Hoy</SelectItem>
                <SelectItem value="week">Última semana</SelectItem>
                <SelectItem value="month">Último mes</SelectItem>
                <SelectItem value="quarter">Último trimestre</SelectItem>
                <SelectItem value="year">Último año</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline" size="icon" className="border-border/60">
              <Bell className="h-4 w-4" />
            </Button>
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-primary font-semibold text-primary-foreground">
              SG
            </div>
          </div>
        </header>

        {/* Content */}
        <div className="space-y-6 p-6">
          {/* Filtros interactivos */}
          <FilterBar />

          {/* KPIs operativos */}
          <KpiCards />

          {/* Stats */}
          <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {statsLoading
              ? Array.from({ length: 4 }).map((_, i) => <Skeleton key={i} className="h-32 w-full" />)
              : (stats ?? []).map((s) => (
                  <StatCard
                    key={s.id}
                    label={s.label}
                    value={s.value}
                    delta={Number(s.delta)}
                    icon={s.icon}
                    accent={s.accent}
                  />
                ))}
          </section>

          {/* Charts row */}
          <section className="grid gap-6 xl:grid-cols-3">
            <div className="xl:col-span-2">
              <RidershipChart />
            </div>
            <ModeSplit />
          </section>

          {/* Bottom row */}
          <section className="grid gap-6 lg:grid-cols-2 xl:grid-cols-3">
            <LinesTable />
            <HourlyChart />
            <Incidents />
          </section>

          {/* Siniestralidad */}
          <section className="grid gap-6 xl:grid-cols-2">
            <CrashTypesChart />
            <FatalitiesTrendChart />
          </section>

          {/* Mapa de hotspots */}
          <AccidentMap />

          {/* Monitoreo en tiempo real de corredores viales */}
          <CorridorMonitoring />

          <section className="grid gap-6 xl:grid-cols-2">
            <CorridorSpeedChart />
            <CCTVMap />
          </section>

          <footer className="pt-2 text-center text-xs text-muted-foreground">
            Datos de demostración · Conecta tu backend para datos reales en tiempo real
          </footer>
        </div>
      </main>
    </div>
  );
};

export default Index;
