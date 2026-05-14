import { useMemo } from "react";
import { MapContainer, TileLayer, CircleMarker, Popup, LayersControl, LayerGroup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { useCCTVCameras } from "@/hooks/useCorridors";
import { useRoadIncidents } from "@/hooks/useRoadIncidents";

const MEDELLIN_CENTER: [number, number] = [6.2476, -75.5658];

const gridKey = (lat: number, lng: number) => `${lat.toFixed(2)}_${lng.toFixed(2)}`;

const hotspotColor = (count: number) => {
  if (count >= 4) return { fill: "#ef4444", stroke: "#b91c1c" };
  if (count >= 2) return { fill: "#f97316", stroke: "#c2410c" };
  return { fill: "#eab308", stroke: "#a16207" };
};

export const CCTVMap = () => {
  const { data: cameras, isLoading: camsLoading } = useCCTVCameras();
  const { data: incidents, isLoading: incLoading } = useRoadIncidents();

  const hotspots = useMemo(() => {
    if (!incidents) return [];
    const counts = new Map<string, number>();
    incidents.forEach((d) => {
      const k = gridKey(d.lat, d.lng);
      counts.set(k, (counts.get(k) ?? 0) + 1);
    });
    return incidents.map((d) => ({
      ...d,
      concentration: counts.get(gridKey(d.lat, d.lng)) ?? 1,
    }));
  }, [incidents]);

  const isLoading = camsLoading || incLoading;

  return (
    <Card className="border-border/60 bg-gradient-surface p-5 shadow-card">
      <div className="mb-4 flex flex-wrap items-start justify-between gap-2">
        <div>
          <h3 className="font-display text-lg font-semibold">Cámaras CCTV + Hotspots</h3>
          <p className="text-xs text-muted-foreground">
            {cameras?.length ?? 0} cámaras activas · {incidents?.length ?? 0} siniestros
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-3 text-xs">
          <Legend color="#3b82f6" label="CCTV" />
          <Legend color="#ef4444" label="Hotspot alto" />
          <Legend color="#f97316" label="Hotspot medio" />
          <Legend color="#eab308" label="Hotspot bajo" />
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
              attribution='&copy; OpenStreetMap'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <LayersControl position="topright">
              <LayersControl.Overlay checked name="Hotspots de accidentalidad">
                <LayerGroup>
                  {hotspots.map((p) => {
                    const c = hotspotColor(p.concentration);
                    return (
                      <CircleMarker
                        key={`hs-${p.id}`}
                        center={[p.lat, p.lng]}
                        radius={6 + Math.min(p.concentration * 2, 12)}
                        pathOptions={{
                          color: c.stroke,
                          fillColor: c.fill,
                          fillOpacity: 0.55,
                          weight: 1.2,
                        }}
                      >
                        <Popup>
                          <div className="text-xs">
                            <div className="font-semibold">{p.comuna}</div>
                            <div>{p.crash_type} · {p.transport_mode}</div>
                            <div>Año: {p.year}</div>
                          </div>
                        </Popup>
                      </CircleMarker>
                    );
                  })}
                </LayerGroup>
              </LayersControl.Overlay>
              <LayersControl.Overlay checked name="Cámaras CCTV">
                <LayerGroup>
                  {(cameras ?? []).map((c) => (
                    <CircleMarker
                      key={`cam-${c.id}`}
                      center={[c.lat, c.lng]}
                      radius={6}
                      pathOptions={{
                        color: "#1e40af",
                        fillColor: "#3b82f6",
                        fillOpacity: 0.9,
                        weight: 1.5,
                      }}
                    >
                      <Popup>
                        <div className="text-xs">
                          <div className="font-semibold">{c.name}</div>
                          <div>{c.corredor}</div>
                          <div className="text-muted-foreground">Estado: {c.status}</div>
                        </div>
                      </Popup>
                    </CircleMarker>
                  ))}
                </LayerGroup>
              </LayersControl.Overlay>
            </LayersControl>
          </MapContainer>
        </div>
      )}
    </Card>
  );
};


const Legend = ({ color, label }: { color: string; label: string }) => (
  <div className="flex items-center gap-1.5">
    <span className="h-3 w-3 rounded-full border" style={{ background: color, borderColor: color }} />
    <span className="text-muted-foreground">{label}</span>
  </div>
);
