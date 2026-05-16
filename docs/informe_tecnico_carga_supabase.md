# <span style="color: #1A365D;">INFORME TÉCNICO DE CONTROL DE CALIDAD Y CARGA DE DATOS EN SUPABASE</span>

**Autor y Líder de Proyecto:** Angy Xiomara Arango Ortiz – Project Manager  
**Proyecto:** Análisis de Movilidad e Infraestructura de Tráfico - Medellín  
**Fase:** Carga, Homologación y Validación de Base de Datos  

---

## <span style="color: #1A365D;">1. Introducción y Estado de la Carga</span>

En mi rol como Project Manager, coordiné de principio a fin la migración de datos hacia el servidor de Supabase (PostgreSQL), supervisando las entregas del equipo y consolidando un universo total de 1.393.059 registros puros.

Tras aplicar y ejecutar scripts de auditoría interna directamente en el motor de la base de datos para validar el estado de los archivos entregados, certifiqué que el porcentaje de duplicados de fila completa es del 0% en todas las tablas. Esto nos garantiza una infraestructura limpia, robusta y optimizada para los análisis y el despliegue del dashboard en Lovable.

---

## <span style="color: #1A365D;">2. Diagnóstico, Tratamiento y Diccionario Técnico por Tabla</span>

### <span style="color: #2B6CB0;">TABLA: incidentes_viales</span>

* **Total Registros Logrados:** 270.693
* **Número de Columnas Cargadas:** 13
* **Mi Tratamiento y Decisiones de Carga:** Durante la fase previa donde el equipo me reportó el estado de los archivos fuentes (con María Alejandra en la extracción y Carol verificando los archivos), identifiqué que el dataset original parecía estancarse en cerca de 250.000 registros debido a la gran cantidad de celdas vacías de origen. El planteamiento inicial del equipo sugería la eliminación masiva de las filas incompletas; sin embargo, determiné que esto nos costaría la pérdida crítica de más de 20.000 datos históricos de accidentalidad de Medellín.

Para proteger esta información, tomé la decisión estratégica de no eliminar ningún registro por campos vacíos e instruí aplicar una técnica de homologación en Python (Google Colab): cada celda de texto sin información fue rescatada e imputada bajo la etiqueta estándar de "NONE".

Corriendo auditorías directas en el SQL Editor de Supabase, validé el impacto real de mi decisión de control, identificando el volumen exacto de datos que fueron protegidos de la depuración destructiva:

<table>
  <thead>
    <tr style="background-color: #1A365D; color: #FFFFFF;">
      <th align="left">Métrica de Control en incidentes_viales</th>
      <th align="center">Registros Salvados con Etiqueta "NONE"</th>
      <th align="left">Estado de la Columna en Servidor</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><b>Rescatados en Barrio</b></td>
      <td align="center">19.001</td>
      <td>100% Estandarizada sin baches</td>
    </tr>
    <tr style="background-color: #F7FAFC;">
      <td><b>Rescatados en Comuna</b></td>
      <td align="center">12.794</td>
      <td>100% Estandarizada sin baches</td>
    </tr>
    <tr>
      <td><b>Rescatados en Diseño</b></td>
      <td align="center">1.090</td>
      <td>100% Estandarizada sin baches</td>
    </tr>
    <tr style="background-color: #F7FAFC;">
      <td><b>Rescatados en Clase</b></td>
      <td align="center">6</td>
      <td>100% Estandarizada sin baches</td>
    </tr>
  </tbody>
</table>

<br>

**Estructura y Tipos de Datos en el Servidor:**
* **id** (bigint): Llave Primaria. Entero largo indexado.
* **fecha_accidentes** (timestamp without time zone): Fecha y hora exacta registrada para el siniestro.
* **año / mes / numcomuna** (integer): Desgloses numéricos creados para acelerar filtros temporales y de zonas.
* **clase_accidente / gravedad_accidente / comuna / barrio / diseño** (text): Cadenas de caracteres categóricas. (Campos tratados con "NONE" en celdas vacías).
* **latitud / longitud** (double precision): Coordenadas numéricas de precisión decimal flotante.
* **location** (jsonb): Objeto JSON binario seguro para compatibilidad con mapas geográficos (GIS).

---

### <span style="color: #2B6CB0;">TABLA: paradas</span>

* **Total Registros Logrados:** 10.043
* **Número de Columnas Cargadas:** 14
* **Mi Tratamiento y Decisiones de Carga:** Esta tabla representó el reto técnico más crítico durante la revisión del proceso de carga. Juan informó inicialmente que no se trabajaría con la columna objectid (Identificador de Objeto) y que debía omitirse. Al realizar las pruebas de carga en el servidor, descubrí que si eliminábamos esa columna, el motor de Supabase interpretaba erróneamente múltiples filas de rutas como duplicados espaciales, lo que encogía la base de datos catastróficamente a tan solo 3.590 registros.

Evaluando el impacto, impuse mi criterio de mantener obligatoriamente esta columna y fijarla como la Llave Primaria oficial de la tabla, puesto que audité que este Identificador Único era el único campo nativo donde los datos no se repetían bajo ninguna circunstancia. Con esta decisión de gerencia, salvé 6.453 registros de infraestructura, consolidando el inventario real y completo de 10.043 paradas de transporte de Medellín.

**Estructura y Tipos de Datos en el Servidor:**
* **objectid** (integer): Llave Primaria. Identificador de Objeto entero que rescató el volumen de la tabla.
* **id_paradero / id_parada / id_ruta / nro_parada** (integer): Identificadores numéricos del sistema de control de transporte.
* **nombre_ruta / codigo_ruta / tipo_ruta / empresa / recorrido / sistema_ruta / tipo_parada** (text): Variables de texto descriptivas de las operaciones de buses y cuencas.
* **longitud / latitud** (double precision): Coordenadas decimales exactas de ubicación espacial.

---

### <span style="color: #2B6CB0;">TABLA: velocidad_trafico</span>

* **Total Registros Logrados:** 681.302
* **Número de Columnas Cargadas:** 19
* **Tratamiento de Carga:** Al ser el volumen más denso del proyecto, supervisé que se estructurara de manera indexada usando la columna id como texto para agilizar el consumo de datos. Se ejecutaron limpiezas automáticas para descartar lecturas corruptas causadas por desfases lógicos de tiempo en los sensores de la ciudad.

**Estructura y Tipos de Datos en el Servidor:**
* **id** (text): Llave Primaria. Cadena de caracteres identificadora de registro.
* **fecha_hora** (timestamp without time zone): Registro de fecha y hora nativo.
* **fecha** (date): Formato de fecha limpia (YYYY-MM-DD).
* **tv_s / corredor / dia / mes / año / hora / diasem** (integer): Variables analíticas de tiempo en segundos, códigos de tramos y desgloses de calendario.
* **nombre_corredor / flujo_tipo / sentido / inicio / fin / nombre_dia** (text): Cadenas de texto operativas de la malla vial.
* **longitud_km / tv_minutos / velocidad_km_h / tv_min_km** (double precision): Médricas decimales para el cálculo de velocidades comerciales.

---

### <span style="color: #2B6CB0;">TABLA: intensidad</span>

* **Total Registros Logrados:** 431.490
* **Número de Columnas Cargadas:** 21
* **Tratamiento de Carga:** Durante el control de la carga en Supabase, se auditaron y limpiaron los "registros espejo" duplicados, los cuales eran generados por sensores bidireccionales que duplicaban la volumetría de tráfico en tramos compartidos.

**Estructura y Tipos de Datos en el Servidor:**
* **id** (bigint): Llave Primaria. Soporte numérico para alta densidad de registros.
* **fecha_trafico** (timestamp with time zone): Fecha y hora parametrizada con la zona horaria de Colombia.
* **fecha** (date): Fecha limpia para análisis cronológicos rápidos.
* **hora / dia_num / mes_num / ano / intensidad / categoria_1 / categoria_3 / ocupacion** (integer) y **categoria_2** (bigint): Contadores numéricos de volumen vehicular desglosado por categorías de transporte.
* **dia / corredor / sentido / operacion / tipo_subsistema / comuna / nombre_comuna / mes** (text): Datos geográficos y clasificadores de texto.
* **velocidad_km_h / longitud / latitud** (double precision): Atributos decimales del comportamiento del flujo y su georreferenciación.

---

### <span style="color: #2B6CB0;">TABLA: rutas</span>

* **Total Registros Logrados:** 248
* **Número de Columnas Cargadas:** 9
* **Tratamiento de Carga:** Se consolidaron trazos limpios unificando códigos duplicados que se generaban originalmente por ligeras variaciones de trayecto entre las rutas de ida y vuelta.

**Estructura y Tipos de Datos en el Servidor:**
* **id_ruta** (integer): Llave Primaria. Identificador numérico del trazo.
* **fecha** (timestamp without time zone): Registro de actualización temporal.
* **nombre / codigo / sistema / tipo / empresa / recorrido** (text): Textos de control de operadores y líneas de servicio público (Metro, buses, colectivos).
* **longitud** (double precision): Longitud decimal del trayecto en kilómetros.

---

### <span style="color: #2B6CB0;">TABLA: camaras</span>

* **Total Registros Logrados:** 73
* **Número de Columnas Cargadas:** 7
* **Tratamiento de Carga:** Realicé una validación manual registro por registro. Mantuve las columnas que contienen los enlaces de verificación de infraestructura urbana y el objectid (Identificador de Objeto) para asegurar el correcto cruce espacial con los incidentes.

**Estructura y Tipos de Datos en el Servidor:**
* **objectid** (integer): Llave Primaria. Identificador de Objeto numérico único de la cámara de fotodetección.
* **direccion / localizacion / link_foto / link_detalle** (text): Cadenas de texto con ubicaciones físicas y enlaces web de gestión.
* **longitud / latitud** (double precision): Coordenadas geográficas decimales exactas para el mapeo espacial.

---

## <span style="color: #1A365D;">3. Soporte Técnico y Metodología de Validación</span>

Para llevar a cabo con éxito todo el proceso de auditoría y validación estructural de estas seis bases de datos, implementé un ecosistema avanzado de herramientas de ingeniería como soporte técnico:
* **Inteligencia Artificial:** Utilizada como copiloto estratégico personal para optimizar la lógica de las consultas, acelerar la detección de baches y estructurar técnicamente este reporte ejecutivo.
* **Python en Google Colab:** Entorno donde se ejecutaron los scripts avanzados de manipulación de datos mediante diccionarios y el análisis exploratorio previo (origen de las marcas de control "NONE").
* **Códigos Nativos en Supabase:** Creación y ejecución de consultas SQL directas en el editor del servidor para interrogar el esquema global (information_schema), medir duplicados exactos y verificar la asignación correcta de las llaves primarias.

---

## <span style="color: #1A365D;">4. Conclusión del Proceso y Siguientes Pasos</span>

Asegurar técnicamente las bases de datos mediante la aplicación de tipos nativos de alta precisión (como double precision, bigint y jsonb) y defender el volumen de datos en incidentes_viales (rescatando con éxito los registros "NONE") y en paradas (salvando el objectid) nos entrega un ecosistema robusto, confiable y blindado.

Con esta carga finalizada en Supabase bajo mi supervisión, libero el estado de las tablas para que el equipo integrado por María Alejandra, Carol, Juan y Luz proceda a avanzar con el modelado avanzado de KPIs y el despliegue de la aplicación interactiva sin riesgos de inconsistencias.
