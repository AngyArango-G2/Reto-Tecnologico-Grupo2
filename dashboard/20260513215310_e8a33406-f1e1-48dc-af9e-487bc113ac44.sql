-- Catálogo de corredores
CREATE TABLE public.corredores (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL UNIQUE,
  sort_order int NOT NULL DEFAULT 0,
  created_at timestamptz NOT NULL DEFAULT now()
);
ALTER TABLE public.corredores ENABLE ROW LEVEL SECURITY;
CREATE POLICY "public read corredores" ON public.corredores FOR SELECT USING (true);

-- Cámaras CCTV
CREATE TABLE public.cctv_cameras (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  corredor text NOT NULL,
  lat double precision NOT NULL,
  lng double precision NOT NULL,
  status text NOT NULL DEFAULT 'activa',
  created_at timestamptz NOT NULL DEFAULT now()
);
ALTER TABLE public.cctv_cameras ENABLE ROW LEVEL SECURITY;
CREATE POLICY "public read cctv_cameras" ON public.cctv_cameras FOR SELECT USING (true);

-- Velocidad y tiempo de viaje (pico vs valle) por corredor
CREATE TABLE public.velocidad_tiempo_viaje (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  corredor text NOT NULL,
  velocidad_pico numeric NOT NULL,
  velocidad_valle numeric NOT NULL,
  tiempo_viaje_pico numeric,
  tiempo_viaje_valle numeric,
  sort_order int NOT NULL DEFAULT 0,
  updated_at timestamptz NOT NULL DEFAULT now()
);
ALTER TABLE public.velocidad_tiempo_viaje ENABLE ROW LEVEL SECURITY;
CREATE POLICY "public read velocidad_tiempo_viaje" ON public.velocidad_tiempo_viaje FOR SELECT USING (true);

-- Velocidad e intensidad vehicular (tiempo real / monitoreo)
CREATE TABLE public.velocidad_intensidad_vehicular (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  corredor text NOT NULL,
  velocidad_promedio numeric NOT NULL,
  intensidad_vehicular int NOT NULL,
  nivel_servicio text NOT NULL DEFAULT 'Libre',
  flujo_libre numeric NOT NULL DEFAULT 60,
  sort_order int NOT NULL DEFAULT 0,
  updated_at timestamptz NOT NULL DEFAULT now()
);
ALTER TABLE public.velocidad_intensidad_vehicular ENABLE ROW LEVEL SECURITY;
CREATE POLICY "public read velocidad_intensidad_vehicular" ON public.velocidad_intensidad_vehicular FOR SELECT USING (true);