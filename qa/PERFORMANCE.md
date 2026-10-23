# Auditoría y optimización de carga

Sitio privado Gordis Burger, 5 octubre 2026.

Las cifras de peso exactas están en PERFORMANCE-PESOS.json. Son tamaños de archivos,
no tiempos de descarga ni bytes transferidos durante una visita.

Cambios realizados:
- Fotos de producto: WebP de 400, 800 y 1200 px, srcset y decoding async.
- Portada: compresión de sus variantes; prioridad alta conservada.
- Lobster: misma fuente, WOFF2 con caracteres latinos y acentos; preload y swap.
- Doce hojas CSS se sirven juntas en site.css, conservando el orden de cascada.
- Activos sin referencias trasladados a source/performance-originals, fuera de dist.
- Carga diferida de carta y mapa conservada; el mapa sigue accesible.

Validación: sintaxis JavaScript, referencias estáticas sin archivos faltantes,
portada en escritorio y móvil, carga WebP en carta, carrusel y diálogo de ingredientes.

Limitaciones de medición: no hay Lighthouse/DevTools de rendimiento disponible.
La evaluación del navegador no expone Performance API. Las herramientas HTTP externas
reciben 401 por la privacidad del sitio; esa respuesta no se interpreta como tiempo
de carga de la web. LCP, FCP, CLS, INP, TBT, TTFB del contenido autenticado y pruebas
con conexión 4G simulada quedan sin medir. No se afirma un puntaje ni carga instantánea.

Mantenimiento: editar las hojas CSS originales en dist y ejecutar
`python qa/build-styles.py` antes de publicar para regenerar site.css.
