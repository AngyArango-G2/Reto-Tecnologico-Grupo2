# Datos Cargados en Supabase

En esta carpeta se consolidan los archivos CSV y estructurados finales con un universo de 1.393.059 registros limpios y validados. 

Estos archivos representan la base de datos oficial cargada en el servidor bajo la supervisión de la Project Manager Angy Arango, asegurando el 0% de duplicados y la compatibilidad absoluta con los KPIs de Juan para el dashboard en Lovable.
### 📢 NOTA DE CONTROL DE CALIDAD Y ALMACENAMIENTO DE ALTA DENSIDAD

Por motivos de infraestructura, peso y restricciones estrictas de la interfaz web de GitHub (>25 MB por archivo) y de Supabase (>500.000 filas para exportación masiva), los datasets de **incidentes_viales**, **intensidad** y **velocidad_trafico** se custodian y consumen de la siguiente manera:

* **Estructura y Tipos de Datos:** Se encuentran indexados y validados directamente en el servidor de producción de **Supabase** bajo tipos nativos (`bigint`, `double precision`, `jsonb`).
* **Respaldo Local Seguro:** Los archivos CSV corregidos finales (con el tratamiento "NONE" y remoción de registros espejo) se encuentran respaldados de forma privada en el almacenamiento local de la mánager de proyecto y en los entornos de **Google Colab** para auditorías.
* **Consumo Directo:** El equipo analítico (María Alejandra, Carol, Juan y Luz) consumirá estos datos directamente conectando **Lovable** al string de conexión de Supabase, evitando la necesidad de descargar archivos planos.
