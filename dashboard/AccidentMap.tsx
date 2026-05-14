import { useMemo } from "react";
import { MapContainer, TileLayer, CircleMarker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { useRoadIncidents } from "@/hooks/useRoadIncidents";

const MEDELLIN_CENTER: [number, number] = [6.2476, -75.5658];

// Aglomeración: agrupa incidentes por celdas para clasificar concentración
const gridKey = (lat: number, lng: number) =>
  `${lat.toFixed(2)}_${lng.toFixed(2)}`;

const colorFor = (count: number) => {
  if (count >= 4) return { fill: "#ef4444", stroke: "#b91c1c", level: "Alta" };
  if (count >= 2) return { fill: "#f97316", stroke: "#c2410c", level: "Media" };
  return { fill: "#eab308", stroke: "#a16207", level: "Baja" };
};

export const AccidentMap = () => {
  const { data, isLoading } = useRoadIncidents();

  const points = useMemo(() => {
    if (!data) return [];
    const counts = new Map<string, number>();
    data.forEach((d) => {
      const k = gridKey(d.lat, d.lng);
      counts.set(k, (counts.get(k) ?? 0) + 1);
    });
    return data.map((d) => ({
      ...d,
      concentration: counts.get(gridKey(d.lat, d.lng)) ?? 1,
    }));
  }, [data]);

  return (
    <Card className="border-border/60 bg-gradient-surface p-5 shadow-card">
      <div className="mb-4 flex items-start justify-between">
        <div>
          <h3 className="font-display text-lg font-semibold">Hotspots de accidentalidad</h3>
          <p className="text-xs text-muted-foreground">
            {data?.length ?? 0} siniestros georreferenciados en Medellín
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-3 text-xs">
          <Legend color="#ef4444" label="Alta" />
          <Legend color="#f97316" label="Media" />
          <Legend color="#eab308" label="Baja" />
        </div>
      </div>

      {isLoading ? (
        <Skeleton className="h-[420px] w-full rounded-lg" />
      ) : (
        <div className="h-[420px] overflow-hidden rounded-lg border border-border/60">
          <MapContainer
            center={MEDELLIN_CENTER}
            zoom={12}
            scrollWheelZoom={false}
            style={{ height: "100%", width: "100%" }}
          >
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            {points.map((p) => {
              const c = colorFor(p.concentration);
              return (
                <CircleMarker
                  key={p.id}
                  center={[p.lat, p.lng]}
                  radius={6 + Math.min(p.concentration * 2, 12)}
                  pathOptions={{
                    color: c.stroke,
                    fillColor: c.fill,
                    fillOpacity: 0.65,
                    weight: 1.5,
                  }}
                >
                  <Popup>
                    <div className="text-xs">
                      <div className="font-semibold">{p.comuna}</div>
                      <div>{p.crash_type} · {p.transport_mode}</div>
                      <div>Año: {p.year} · Severidad: {p.severity}</div>
                      {p.fatalities > 0 && (
                        <div className="font-semibold text-red-600">
                          Fallecidos: {p.fatalities}
                        </div>
                      )}
                      <div className="mt-1 text-muted-foreground">
                        Concentración: {c.level}
                      </div>
                    </div>
                  </Popup>
                </CircleMarker>
              );
            })}
          </MapContainer>
        </div>
      )}
    </Card>
  );
};

const Legend = ({ color, label }: { color: string; label: string }) => (
  <div className="flex items-center gap-1.5">
    <span
      className="h-3 w-3 rounded-full border"
      style={{ background: color, borderColor: color }}
    />
    <span className="text-muted-foreground">{label}</span>
  </div>
);
