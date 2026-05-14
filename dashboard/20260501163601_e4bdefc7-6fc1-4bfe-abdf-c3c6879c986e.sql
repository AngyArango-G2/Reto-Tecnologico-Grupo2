
-- KPIs diarios
CREATE TABLE public.stats (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  label text NOT NULL,
  value text NOT NULL,
  delta numeric NOT NULL DEFAULT 0,
  icon text NOT NULL,
  accent text NOT NULL DEFAULT 'primary',
  sort_order int NOT NULL DEFAULT 0,
  updated_at timestamptz NOT NULL DEFAULT now()
);

-- Pasajeros por día (semana)
CREATE TABLE public.ridership (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  day text NOT NULL,
  metro int NOT NULL,
  metroplus int NOT NULL,
  sort_order int NOT NULL DEFAULT 0
);

-- Demanda por hora
CREATE TABLE public.hourly_demand (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  hour text NOT NULL,
  occupancy int NOT NULL,
  sort_order int NOT NULL DEFAULT 0
);

-- Líneas del sistema
CREATE TABLE public.lines (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  color text NOT NULL,
  riders text NOT NULL,
  load int NOT NULL,
  status text NOT NULL,
  sort_order int NOT NULL DEFAULT 0
);

-- Reparto modal
CREATE TABLE public.mode_split (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  value int NOT NULL,
  color text NOT NULL,
  sort_order int NOT NULL DEFAULT 0
);

-- Incidentes
CREATE TABLE public.incidents (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  icon text NOT NULL,
  title text NOT NULL,
  location text NOT NULL,
  time_label text NOT NULL,
  level text NOT NULL DEFAULT 'info',
  created_at timestamptz NOT NULL DEFAULT now()
);

-- RLS: lectura pública
ALTER TABLE public.stats ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.ridership ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.hourly_demand ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.lines ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.mode_split ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.incidents ENABLE ROW LEVEL SECURITY;

CREATE POLICY "public read stats" ON public.stats FOR SELECT USING (true);
CREATE POLICY "public read ridership" ON public.ridership FOR SELECT USING (true);
CREATE POLICY "public read hourly_demand" ON public.hourly_demand FOR SELECT USING (true);
CREATE POLICY "public read lines" ON public.lines FOR SELECT USING (true);
CREATE POLICY "public read mode_split" ON public.mode_split FOR SELECT USING (true);
CREATE POLICY "public read incidents" ON public.incidents FOR SELECT USING (true);

-- Datos seed
INSERT INTO public.stats (label, value, delta, icon, accent, sort_order) VALUES
('Pasajeros hoy', '1,24 M', 8.4, 'Users', 'primary', 1),
('Viajes en curso', '38.412', 2.1, 'TrainFront', 'chart-2', 2),
('Tiempo medio espera', '3:42', -5.7, 'Clock', 'accent', 3),
('Ingresos del día', '$ 2.870 M', 12.3, 'DollarSign', 'chart-4', 4);

INSERT INTO public.ridership (day, metro, metroplus, sort_order) VALUES
('Lun', 612000, 184000, 1),
('Mar', 638000, 192000, 2),
('Mié', 651000, 198000, 3),
('Jue', 645000, 201000, 4),
('Vie', 702000, 215000, 5),
('Sáb', 488000, 142000, 6),
('Dom', 312000, 98000, 7);

INSERT INTO public.hourly_demand (hour, occupancy, sort_order) VALUES
('5a', 18, 1), ('6a', 52, 2), ('7a', 92, 3), ('8a', 86, 4),
('9a', 54, 5), ('10a', 38, 6), ('12p', 46, 7), ('2p', 41, 8),
('4p', 68, 9), ('5p', 95, 10), ('6p', 89, 11), ('8p', 44, 12);

INSERT INTO public.lines (name, color, riders, load, status, sort_order) VALUES
('Línea A', 'bg-blue-500', '412.500', 88, 'Alta demanda', 1),
('Línea B', 'bg-orange-500', '186.300', 64, 'Normal', 2),
('Línea K', 'bg-emerald-500', '78.900', 72, 'Normal', 3),
('Línea J', 'bg-yellow-400', '61.200', 58, 'Normal', 4),
('Línea H', 'bg-rose-500', '22.400', 41, 'Baja', 5),
('Línea T-A', 'bg-emerald-700', '35.700', 49, 'Normal', 6);

INSERT INTO public.mode_split (name, value, color, sort_order) VALUES
('Metro', 48, 'hsl(var(--chart-1))', 1),
('Metroplús', 18, 'hsl(var(--chart-2))', 2),
('Buses integrados', 22, 'hsl(var(--chart-3))', 3),
('EnCicla', 7, 'hsl(var(--chart-4))', 4),
('Tranvía', 5, 'hsl(var(--chart-5))', 5);

INSERT INTO public.incidents (icon, title, location, time_label, level) VALUES
('AlertTriangle', 'Retraso Línea A', 'Estación Poblado', 'Hace 8 min', 'warn'),
('Users', 'Alta afluencia', 'San Antonio', 'Hace 22 min', 'info'),
('Wrench', 'Mantenimiento Línea K', 'Andalucía', 'Hoy 23:00', 'info'),
('CloudRain', 'Lluvia fuerte', 'Centro / Aranjuez', 'Hace 1 h', 'warn');
