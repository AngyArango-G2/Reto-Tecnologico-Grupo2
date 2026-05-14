-- Tabla de siniestros viales georreferenciados
CREATE TABLE public.road_incidents (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  lat DOUBLE PRECISION NOT NULL,
  lng DOUBLE PRECISION NOT NULL,
  comuna TEXT NOT NULL,
  year INTEGER NOT NULL,
  transport_mode TEXT NOT NULL,
  crash_type TEXT NOT NULL,
  severity TEXT NOT NULL DEFAULT 'leve',
  fatalities INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.road_incidents ENABLE ROW LEVEL SECURITY;

CREATE POLICY "public read road_incidents"
ON public.road_incidents FOR SELECT
USING (true);

CREATE INDEX idx_road_incidents_filters
  ON public.road_incidents (comuna, year, transport_mode);

-- Seed data: hotspots reales aproximados de Medellín (16 comunas)
INSERT INTO public.road_incidents (lat, lng, comuna, year, transport_mode, crash_type, severity, fatalities) VALUES
(6.2442, -75.5812, 'La Candelaria', 2023, 'Moto', 'Choque', 'grave', 2),
(6.2447, -75.5750, 'La Candelaria', 2023, 'Peatón', 'Atropello', 'fatal', 1),
(6.2410, -75.5790, 'La Candelaria', 2022, 'Auto', 'Choque', 'leve', 0),
(6.2520, -75.5680, 'Aranjuez', 2023, 'Moto', 'Choque', 'grave', 1),
(6.2580, -75.5720, 'Aranjuez', 2022, 'Bicicleta', 'Caída de Ocupante', 'leve', 0),
(6.2680, -75.5650, 'Castilla', 2023, 'Moto', 'Choque', 'grave', 0),
(6.2710, -75.5620, 'Castilla', 2021, 'Auto', 'Volcamiento', 'grave', 1),
(6.2370, -75.5900, 'Belén', 2023, 'Peatón', 'Atropello', 'fatal', 1),
(6.2330, -75.5950, 'Belén', 2022, 'Moto', 'Choque', 'leve', 0),
(6.2300, -75.5870, 'Belén', 2023, 'Auto', 'Choque', 'leve', 0),
(6.2090, -75.5680, 'El Poblado', 2023, 'Moto', 'Choque', 'grave', 0),
(6.2110, -75.5650, 'El Poblado', 2023, 'Peatón', 'Atropello', 'grave', 0),
(6.2050, -75.5710, 'El Poblado', 2022, 'Auto', 'Choque', 'leve', 0),
(6.2780, -75.5550, 'Santa Cruz', 2023, 'Moto', 'Choque', 'fatal', 1),
(6.2820, -75.5520, 'Santa Cruz', 2022, 'Bicicleta', 'Caída de Ocupante', 'leve', 0),
(6.2880, -75.5480, 'Popular', 2023, 'Peatón', 'Atropello', 'grave', 1),
(6.2920, -75.5450, 'Popular', 2022, 'Moto', 'Choque', 'leve', 0),
(6.2630, -75.6010, 'Robledo', 2023, 'Moto', 'Choque', 'grave', 1),
(6.2670, -75.6050, 'Robledo', 2022, 'Auto', 'Volcamiento', 'leve', 0),
(6.2480, -75.6080, 'San Javier', 2023, 'Peatón', 'Atropello', 'fatal', 1),
(6.2510, -75.6120, 'San Javier', 2023, 'Moto', 'Choque', 'grave', 0),
(6.2390, -75.6180, 'San Javier', 2022, 'Bicicleta', 'Caída de Ocupante', 'leve', 0),
(6.2210, -75.5810, 'Laureles-Estadio', 2023, 'Moto', 'Choque', 'leve', 0),
(6.2240, -75.5860, 'Laureles-Estadio', 2023, 'Auto', 'Choque', 'grave', 0),
(6.2180, -75.5830, 'Laureles-Estadio', 2022, 'Peatón', 'Atropello', 'grave', 0),
(6.2160, -75.5780, 'La América', 2023, 'Moto', 'Choque', 'leve', 0),
(6.2140, -75.5750, 'La América', 2022, 'Auto', 'Volcamiento', 'leve', 0),
(6.2960, -75.5500, 'Manrique', 2023, 'Moto', 'Choque', 'grave', 1),
(6.2900, -75.5530, 'Manrique', 2022, 'Peatón', 'Atropello', 'grave', 0),
(6.2010, -75.5760, 'Guayabal', 2023, 'Moto', 'Choque', 'fatal', 1),
(6.1970, -75.5790, 'Guayabal', 2022, 'Auto', 'Choque', 'leve', 0),
(6.1900, -75.5830, 'Guayabal', 2023, 'Bicicleta', 'Caída de Ocupante', 'leve', 0),
(6.2790, -75.5780, 'Doce de Octubre', 2023, 'Moto', 'Choque', 'grave', 0),
(6.2750, -75.5810, 'Doce de Octubre', 2022, 'Peatón', 'Atropello', 'grave', 1),
(6.2300, -75.6230, 'San Cristóbal', 2023, 'Auto', 'Volcamiento', 'grave', 1),
(6.1700, -75.6100, 'Altavista', 2023, 'Moto', 'Choque', 'leve', 0),
(6.1450, -75.6300, 'San Antonio de Prado', 2023, 'Auto', 'Choque', 'grave', 0),
(6.3100, -75.5300, 'Santa Elena', 2023, 'Moto', 'Choque', 'fatal', 1),
(6.2460, -75.5790, 'La Candelaria', 2021, 'Moto', 'Choque', 'grave', 0),
(6.2160, -75.5680, 'El Poblado', 2021, 'Peatón', 'Atropello', 'fatal', 1),
(6.2120, -75.5690, 'El Poblado', 2020, 'Moto', 'Choque', 'leve', 0),
(6.2400, -75.5800, 'La Candelaria', 2020, 'Auto', 'Choque', 'grave', 0),
(6.2500, -75.5700, 'Aranjuez', 2021, 'Moto', 'Choque', 'leve', 0),
(6.2700, -75.5640, 'Castilla', 2020, 'Peatón', 'Atropello', 'grave', 0),
(6.2350, -75.5920, 'Belén', 2021, 'Moto', 'Choque', 'grave', 1),
(6.2080, -75.5700, 'El Poblado', 2022, 'Bicicleta', 'Caída de Ocupante', 'leve', 0),
(6.2470, -75.5760, 'La Candelaria', 2022, 'Peatón', 'Atropello', 'grave', 0),
(6.2540, -75.5670, 'Aranjuez', 2020, 'Auto', 'Choque', 'leve', 0);