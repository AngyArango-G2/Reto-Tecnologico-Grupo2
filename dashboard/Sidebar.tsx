import { LayoutDashboard, TrainFront, Bus, Map, Users, AlertTriangle, Settings } from "lucide-react";
import { cn } from "@/lib/utils";

const items = [
  { icon: LayoutDashboard, label: "Resumen", active: true },
  { icon: TrainFront, label: "Metro" },
  { icon: Bus, label: "Buses & Metroplús" },
  { icon: Map, label: "Rutas & Estaciones" },
  { icon: Users, label: "Pasajeros" },
  { icon: AlertTriangle, label: "Incidentes" },
  { icon: Settings, label: "Ajustes" },
];

export const Sidebar = () => {
  return (
    <aside className="hidden w-60 shrink-0 border-r border-border/60 bg-sidebar px-4 py-6 lg:flex lg:flex-col">
      <div className="flex items-center gap-2 px-2">
        <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-primary shadow-elegant">
          <TrainFront className="h-5 w-5 text-primary-foreground" />
        </div>
        <div>
          <p className="font-display text-sm font-bold leading-tight">SINITT G2</p>
          <p className="text-[10px] uppercase tracking-widest text-muted-foreground">Movilidad MDE</p>
        </div>
      </div>

      <nav className="mt-10 flex flex-col gap-1">
        {items.map((item) => (
          <button
            key={item.label}
            className={cn(
              "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm transition-colors",
              item.active
                ? "bg-primary/10 text-primary"
                : "text-sidebar-foreground hover:bg-sidebar-accent hover:text-foreground"
            )}
          >
            <item.icon className="h-4 w-4" />
            {item.label}
          </button>
        ))}
      </nav>

      <div className="mt-auto rounded-xl border border-border/60 bg-card p-4">
        <p className="text-xs text-muted-foreground">Estado del sistema</p>
        <div className="mt-2 flex items-center gap-2">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-75" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-primary" />
          </span>
          <p className="text-sm font-medium">Operación normal</p>
        </div>
      </div>
    </aside>
  );
};
