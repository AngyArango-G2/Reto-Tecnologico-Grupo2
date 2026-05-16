<h1 style="color: #1a365d; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Helvetica, Arial, sans-serif; border-bottom: 1px solid #e2e8f0; padding-bottom: 8px;">INFORME TÉCNICO DE CONTROL DE CALIDAD Y CARGA DE DATOS EN SUPABASE</h1>

<p style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Helvetica, Arial, sans-serif; font-size: 14px; line-height: 1.6;">
    <strong>Autor y Líder de Proyecto:</strong> Angy Xiomara Arango Ortiz – Project Manager<br>
    <strong>Proyecto:</strong> Análisis de Movilidad e Infraestructura de Tráfico - Medellín<br>
    <strong>Fase:</strong> Carga, Homologación y Validación de Base de Datos
</p>

<h2 style="color: #1a365d; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Helvetica, Arial, sans-serif; border-bottom: 1px solid #e2e8f0; padding-bottom: 5px; margin-top: 24px;">1. Introducción y Estado de la Carga</h2>

<p style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Helvetica, Arial, sans-serif; font-size: 14px; line-height: 1.6;">En mi rol como Project Manager, coordiné de principio a fin la migración de datos hacia el servidor de <strong>Supabase (PostgreSQL)</strong>, supervisando las entregas del equipo y consolidando un universo total de <strong>1.393.059 registros puros</strong>.</p>

<p style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Helvetica, Arial, sans-serif; font-size: 14px; line-height: 1.6;">Tras aplicar y ejecutar scripts de auditoría interna directamente en el motor de la base de datos para validar el estado de los archivos entregados, certifiqué que <strong>el porcentaje de duplicados de fila completa es del 0%</strong> en todas las tablas. Esto nos garantiza una infraestructura limpia, robusta y optimizada para los análisis y el despliegue del dashboard en <strong>Lovable</strong>.</p>

<h2 style="color: #1a365d; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Helvetica, Arial, sans-serif; border-bottom: 1px solid #e2e8f0; padding-bottom: 5px; margin-top: 24px;">2. Diagnóstico, Tratamiento y Diccionario Técnico por Tabla</h2>

<h3 style="color: #2b6cb0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Helvetica, Arial, sans-serif; margin-top: 20px;">TABLA: incidentes_viales</h3>
<ul style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Helvetica, Arial, sans-serif; font-size: 14px; line-height: 1.6;">
    <li><strong>Total Registros Logrados:</strong> 270.693</li>
    <li><strong>Número de Columnas Cargadas:</strong> 13</li>
    <li><strong>Mi Tratamiento y Decisiones de Carga:</strong> Durante la fase previa donde el equipo me reportó el estado de los archivos fuentes (con María Alejandra en la extracción y Carol verificando los archivos), identifiqué que el dataset original parecía estancarse en cerca de 250.000 registros debido a la gran cantidad de celdas vacías de origen. El planteamiento inicial del equipo sugería la eliminación masiva de las filas incompletas; sin embargo, determiné que esto nos costaría la pérdida crítica de más de 20.000 datos históricos de accidentalidad de Medellín.</li>
</ul>

<p style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Helvetica, Arial, sans-serif; font-size: 14px; line-height: 1.6;">Para proteger esta información, tomé la decisión estratégica de <strong>no eliminar ningún registro por campos vacíos</strong> e instruí aplicar una técnica de homologación en Python (Google Colab): cada celda de texto sin información fue rescatada e imputada bajo la etiqueta estándar de <strong>"NONE"</strong>.</p>

<p style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Helvetica, Arial, sans-serif; font-size: 14px; line-height: 1.6;">Corriendo auditorías directas en el SQL Editor de Supabase, validé el impacto real de mi decisión de control, identificando el volumen exacto de datos que fueron protegidos de la depuración destructiva:</p>

<table border="1" cellpadding="8" style="border-collapse: collapse; border-color: #cccccc; width: 100%; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Helvetica, Arial, sans-serif; font-size: 13px; margin-top: 10px; margin-bottom: 15px;">
    <thead>
        <tr style="background-color: #1a365d; color: #ffffff;">
            <th align="left">Métrica de Control en incidentes_viales</th>
            <th align="center" style="width: 30%;">Registros Salvados con Etiqueta "NONE"</th>
            <th align="left">Estado de la Columna en Servidor</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td><strong>Rescatados en Barrio</strong></td>
            <td align="center">19.001</td>
            <td>100% Estandarizada sin baches</td>
        </tr>
        <tr style="background-color: #f7fafc;">
            <td><strong>Rescatados en Comuna</strong></td>
            <td align="center">12.794</td>
            <td>100% Estandarizada sin baches</td>
        </tr>
        <tr>
            <td><strong>Rescatados en Diseño</strong></td>
            <td align="center">1.090</td>
            <td>100% Estandarizada sin baches</td>
        </tr>
        <tr style="background-color: #f7fafc;">
            <td><strong>Rescatados en Clase</strong></td>
            <td align="center">6</td>
            <td>100% Estandarizada sin baches</td>
        </tr>
    </tbody>
</table>

<p style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Helvetica, Arial, sans-serif; font-size: 14px; line-height: 1.6; margin-bottom: 5px;"><strong>Estructura y Tipos de Datos en el Servidor:</strong></p>
<ul style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Helvetica, Arial, sans-serif; font-size: 14px; line-height: 1.6;">
    <li><strong>id</strong> (bigint): Llave Primaria. Entero largo indexado.</li>
    <li><strong>fecha_accidentes</strong> (timestamp without time zone): Fecha y hora exacta registrada para el siniestro.</li>
    <li><strong>año / mes / numcomuna</strong> (integer): Desgloses numéricos creados para acelerar filtros temporales y de zonas.</li>
    <li><strong>clase_accidente / gravedad_accidente / comuna / barrio / diseño</strong> (text): Cadenas de caracteres categóricas. (Campos tratados con "NONE" en celdas vacías).</li>
    <li><strong>latitud / longitud</strong> (double precision): Coordenadas numéricas de precisión decimal flotante.</li>
    <li><strong>location</strong> (jsonb): Objeto JSON binario seguro para compatibilidad con mapas geográficos (GIS).</li>
</ul>

<h3 style="color: #2b6cb0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Helvetica, Arial, sans-serif; margin-top: 25px;">TABLA: paradas</h3>
<ul style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Helvetica, Arial, sans-serif; font-size: 14px; line-height: 1.6;">
    <li><strong>Total Registros Logrados:</strong> 10.043</li>
    <li><strong>Número de Columnas Cargadas:</strong> 14</li>
    <li><strong>Mi Tratamiento y Decisiones de Carga:</strong> Esta tabla representó el reto técnico más crítico durante la revisión del proceso de carga. Juan informó inicialmente que no se trabajaría con la columna objectid (Identificador de Objeto) y que debía omitirse. Al realizar las pruebas de carga en el servidor, descubrí que si eliminábamos esa columna, el motor de Supabase interpretaba erróneamente múltiples filas de rutas como duplicados espaciales, lo que encogía la base de datos catastróficamente a tan solo 3.590 registros.</li>
</ul>

<p style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Helvetica, Arial, sans-serif; font-size: 14px; line-height: 1.6;">Evaluando el impacto, impuse mi criterio de <strong>mantener obligatoriamente esta columna y fijarla como la Llave Primaria oficial de la tabla</strong>, puesto que audité que este Identificador Único era el único campo nativo donde los datos no se repetían bajo ninguna circunstancia. Con esta decisión de gerencia, salvé 6.453 registros de infraestructura, consolidando el inventario real y completo de 10.043 paradas de transporte de Medellín.</p>

<p style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Helvetica, Arial, sans-serif; font-size: 14px; line-height: 1.6; margin-bottom: 5px;"><strong>Estructura y Tipos de Datos en el Servidor:</strong></p>
<ul style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Helvetica, Arial, sans-serif; font-size: 14px; line-height: 1.6;">
    <li><strong>objectid</strong> (integer): Llave Primaria. Identificador de Objeto entero que rescató el volumen de la tabla.</li>
    <li><strong>id_paradero / id_parada / id_ruta / nro_parada</strong> (integer): Identificadores numéricos del sistema de control de transporte.</li>
    <li><strong>nombre_ruta / codigo_ruta / tipo_ruta / empresa / recorrido / sistema_ruta / tipo_parada</strong> (text): Variables de texto descriptivas de las operaciones de buses y cuencas.</li>
    <li><strong>longitud / latitud</strong> (double precision): Coordenadas decimales exactas de ubicación espacial.</li>
</ul>

<h3 style="color: #2b6cb0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Helvetica, Arial, sans-serif; margin-top: 25px;">TABLA: velocidad_trafico</h3>
<ul style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Helvetica, Arial, sans-serif; font-size: 14px; line-height: 1.6;">
    <li><strong>Total Registros Logrados:</strong> 681.302</li>
    <li><strong>Número de Columnas Cargadas:</strong> 19</li>
    <li><strong>Tratamiento de Carga:</strong> Al ser el volumen más denso del proyecto, supervisé que se estructurara de manera indexada usando la columna id como texto para agilizar el consumo de datos. Se ejecutaron limpiezas automáticas para descartar lecturas corruptas causadas por desfases lógicos de tiempo en los sensores de la ciudad.</li>
</ul>

<p style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Helvetica, Arial, sans-serif; font-size: 14px; line-height: 1.6; margin-bottom: 5px;"><strong>Estructura y Tipos de Datos en el Servidor:</strong></p>
<ul style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Helvetica, Arial, sans-serif; font-size: 14px; line-height: 1.6;">
    <li><strong>id</strong> (text): Llave Primaria. Cadena de caracteres identificadora de registro.</li>
    <li><strong>fecha_hora</strong> (timestamp without time zone): Registro de fecha y hora nativo.</li>
    <li><strong>fecha</strong> (date): Formato de fecha limpia (YYYY-MM-DD).</li>
    <li><strong>tv_s / corredor / dia / mes / año / hora / diasem</strong> (integer): Variables analíticas de tiempo en segundos, códigos de tramos y desgloses de calendario.</li>
    <li><strong>nombre_corredor / flujo_tipo / sentido / inicio / fin / nombre_dia</strong> (text): Cadenas de texto operativas de la malla vial.</li>
    <li><strong>longitud_km / tv_minutos / velocidad_km_h / tv_min_km</strong> (double precision): Métricas decimales para el cálculo de velocidades comerciales.</li>
</ul>

<h3 style="color: #2b6cb0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Helvetica, Arial, sans-serif; margin-top: 25px;">TABLA: intensidad</h3>
<ul style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Helvetica, Arial, sans-serif; font-size: 14px; line-height: 1.6;">
    <li><strong>Total Registros Logrados:</strong> 431.490</li>
    <li><strong>Número de Columnas Cargadas:</strong> 21</li>
    <li><strong>Tratamiento de Carga:</strong> Durante el control de la carga en Supabase, se auditaron y limpiaron los "registros espejo" duplicados, los cuales eran generados por sensores bidireccionales que duplicaban la volumetría de tráfico en tramos compartidos.</li>
</ul>

<p style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Helvetica, Arial, sans-serif; font-size: 14px; line-height: 1.6; margin-bottom: 5px;"><strong>Estructura y Tipos de Datos en el Servidor:</strong></p>
<ul style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Helvetica, Arial, sans-serif; font-size: 14px; line-height: 1.6;">
    <li><strong>id</strong> (bigint): Llave Primaria. Soporte numérico para alta densidad de registros.</li>
    <li><strong>fecha_trafico</strong> (timestamp with time zone): Fecha y hora parametrizada con la zona horaria de Colombia.</li>
    <li><strong>fecha</strong> (date): Fecha limpia para análisis cronológicos rápidos.</li>
    <li><strong>hora / dia_num / mes_num / ano / intensidad / categoria_1 / categoria_3 / ocupacion</strong> (integer) y <strong>categoria_2</strong> (bigint): Contadores numéricos de volumen vehicular desglosado por categorías de transporte.</li>
    <li><strong>dia / corredor / sentido / operacion / tipo_subsistema / comuna / nombre_comuna / mes</strong> (text): Datos geográficos y clasificadores de texto.</li>
    <li><strong>velocidad_km_h / longitud / latitud</strong> (double precision): Atributos decimales del comportamiento del flujo y su georreferenciación.</li>
</ul>

<h3 style="color: #2b6cb0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Helvetica, Arial, sans-serif; margin-top: 25px;">TABLA: rutas</h3>
<ul style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Helvetica, Arial, sans-serif; font-size: 14px; line-height: 1.6;">
    <li><strong>Total Registros Logrados:</strong> 248</li>
    <li><strong>Número de Columnas Cargadas:</strong> 9</li>
    <li><strong>Tratamiento de Carga:</strong> Se consolidaron trazos limpios unificando códigos duplicados que se generaban originalmente por ligeras variaciones de trayecto entre las rutas de ida y vuelta.</li>
</ul>

<p style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Helvetica, Arial, sans-serif; font-size: 14px; line-height: 1.6; margin-bottom: 5px;"><strong>Estructura y Tipos de Datos en el Servidor:</strong></p>
<ul style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Helvetica, Arial, sans-serif; font-size: 14px; line-height: 1.6;">
    <li><strong>id_ruta</strong> (integer): Llave Primaria. Identificador numérico del trazo.</li>
    <li><strong>fecha</strong> (timestamp without time zone): Registro de actualización temporal.</li>
    <li><strong>nombre / codigo / sistema / tipo / empresa / recorrido</strong> (text): Textos de control de operadores y líneas de servicio público (Metro, buses, colectivos).</li>
    <li><strong>longitud</strong> (double precision): Longitud decimal del trayecto en kilómetros.</li>
</ul>

<h3 style="color: #2b6cb0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Helvetica, Arial, sans-serif; margin-top: 25px;">TABLA: camaras</h3>
<ul style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Helvetica, Arial, sans-serif; font-size: 14px; line-height: 1.6;">
    <li><strong>Total Registros Logrados:</strong> 73</li>
    <li><strong>Número de Columnas Cargadas:</strong> 7</li>
    <li><strong>Tratamiento de Carga:</strong> Realicé una validación manual registro por registro. Mantuve las columnas que contienen los enlaces de verificación de infraestructura urbana y el objectid (Identificador de Objeto) para asegurar el correcto cruce espacial con los incidentes.</li>
</ul>

<p style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Helvetica, Arial, sans-serif; font-size: 14px; line-height: 1.6; margin-bottom: 5px;"><strong>Estructura y Tipos de Datos en el Servidor:</strong></p>
<ul style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Helvetica, Arial, sans-serif; font-size: 14px; line-height: 1.6;">
    <li><strong>objectid</strong> (integer): Llave Primaria. Identificador de Objeto numérico único de la cámara de fotodetección.</li>
    <li><strong>direccion / localizacion / link_foto / link_detalle</strong> (text): Cadenas de texto con ubicaciones físicas y enlaces web de gestión.</li>
    <li><strong>longitud / latitud</strong> (double precision): Coordenadas geográficas decimales exactas para el mapeo espacial.</li>
</ul>

<h2 style="color: #1a365d; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Helvetica, Arial, sans-serif; border-bottom: 1px solid #e2e8f0; padding-bottom: 5px; margin-top: 30px;">3. Soporte Técnico y Metodología de Validación</h2>

<p style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Helvetica, Arial, sans-serif; font-size: 14px; line-height: 1.6;">Para llevar a cabo con éxito todo el proceso de auditoría y validación estructural de estas seis bases de datos, implementé un ecosistema avanzado de herramientas de ingeniería como soporte técnico:</p>
<ul style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Helvetica, Arial, sans-serif; font-size: 14px; line-height: 1.6;">
    <li><strong>Inteligencia Artificial:</strong> Utilizada como copiloto estratégico personal para optimizar la lógica de las consultas, acelerar la detección de baches y estructurar técnicamente este reporte ejecutivo.</li>
    <li><strong>Python en Google Colab:</strong> Entorno donde se ejecutaron los scripts avanzados de manipulación de datos mediante diccionarios y el análisis exploratorio previo (origen de las marcas de control "NONE").</li>
    <li><strong>Códigos Nativos en Supabase:</strong> Creación y ejecución de consultas SQL directas en el editor del servidor para interrogar el esquema global (information_schema), medir duplicados exactos y verificar la asignación correcta de las llaves primarias.</li>
</ul>

<h2 style="color: #1a365d; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Helvetica, Arial, sans-serif; border-bottom: 1px solid #e2e8f0; padding-bottom: 5px; margin-top: 30px;">4. Conclusión del Proceso y Siguientes Pasos</h2>

<p style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Helvetica, Arial, sans-serif; font-size: 14px; line-height: 1.6;">Asegurar técnicamente las bases de datos mediante la aplicación de tipos nativos de alta precisión (como double precision, bigint y jsonb) y defender el volumen de datos en incidentes_viales (rescatando con éxito los registros "NONE") y en paradas (salvando el objectid) nos entrega un ecosistema robusto, confiable y blindado.</p>

<p style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Helvetica, Arial, sans-serif; font-size: 14px; line-height: 1.6;">Con esta carga finalizada en Supabase bajo mi supervisión, libero el estado de las tablas para que el equipo integrado por María Alejandra, Carol, Juan y Luz proceda a avanzar con el modelado avanzado de KPIs y el despliegue de la aplicación interactiva sin riesgos de inconsistencias.</p>
