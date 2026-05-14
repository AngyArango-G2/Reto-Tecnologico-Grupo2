import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Filter, RotateCcw } from "lucide-react";
import { cn } from "@/lib/utils";
import { useFilters } from "@/contexts/FiltersContext";
import { useComunas, useYears } from "@/hooks/useRoadIncidents";
import { useCorridorList } from "@/hooks/useCorridors";

const MODES = ["all", "Moto", "Auto", "Peatón", "Bicicleta"];

export const FilterBar = () => {
  const { filters, setComuna, setYear, setMode, setCorredor, reset } = useFilters();
  const { data: comunas } = useComunas();
  const { data: years } = useYears();
  const { data: corredores } = useCorridorList();

  return (
    <Card className="border-border/60 bg-gradient-surface p-4 shadow-card">
      <div className="flex flex-wrap items-center gap-3">
        <div className="flex items-center gap-2 text-sm font-semibold text-muted-foreground">
          <Filter className="h-4 w-4 text-primary" />
          Filtros
        </div>

        <Select value={filters.comuna} onValueChange={setComuna}>
          <SelectTrigger className="w-48 bg-background/60 border-border/60">
            <SelectValue placeholder="Comuna" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Todas las comunas</SelectItem>
            {(comunas ?? []).map((c) => (
              <SelectItem key={c} value={c}>{c}</SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select value={filters.year} onValueChange={setYear}>
          <SelectTrigger className="w-32 bg-background/60 border-border/60">
            <SelectValue placeholder="Año" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Todos los años</SelectItem>
            {(years ?? []).map((y) => (
              <SelectItem key={y} value={String(y)}>{y}</SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select value={filters.corredor} onValueChange={setCorredor}>
          <SelectTrigger className="w-52 bg-background/60 border-border/60">
            <SelectValue placeholder="Corredor" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Todos los corredores</SelectItem>
            {(corredores ?? []).map((c) => (
              <SelectItem key={c} value={c}>{c}</SelectItem>
            ))}
          </SelectContent>
        </Select>

        <div className="flex flex-wrap items-center gap-1.5">
          {MODES.map((m) => (
            <button
              key={m}
              onClick={() => setMode(m)}
              className={cn(
                "rounded-full border px-3 py-1 text-xs font-medium transition-colors",
                filters.mode === m
                  ? "border-primary bg-primary text-primary-foreground"
                  : "border-border/60 bg-background/40 text-muted-foreground hover:text-foreground hover:border-primary/50"
              )}
            >
              {m === "all" ? "Todos los modos" : m}
            </button>
          ))}
        </div>

        <Button
          variant="outline"
          size="sm"
          onClick={reset}
          className="ml-auto border-border/60 text-xs"
        >
          <RotateCcw className="mr-1.5 h-3 w-3" />
          Restablecer
        </Button>
      </div>
    </Card>
  );
};
