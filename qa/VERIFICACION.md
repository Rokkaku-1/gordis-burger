# Verificación de Gordis Burger

Contraste calculado con luminancia relativa WCAG. Los valores anteriores de nota/caption son referencia sobre rojo plano: sobre la foto variaban y no garantizaban contraste. Ahora ambos textos se ubican fuera de la foto.

| Elemento | Antes | Después | Mínimo |
|---|---:|---:|---:|
| Hero / eyebrow claro | 4.20:1 | 5.03:1 | 4.5:1 |
| Nota manuscrita | 4.20:1 | 5.03:1 | 3:1 |
| Caption | 4.20:1 | 5.03:1 | 4.5:1 |
| Eyebrow sobre crema | 13.37:1 | 13.37:1 | 4.5:1 |
| Botón header | 4.20:1 | 6.89:1 | 4.5:1 |
| Párrafos sobre ocre | 4.41:1 | 5.25:1 | 4.5:1 |
| Texto pequeño / hover sobre azul | 2.72:1 | 8.66:1 | 4.5:1 |
| Texto grande rojo sobre azul | 2.72:1 | 3.26:1 | 3:1 |
| Rojo grande sobre ocre | 3.50:1 | 5.75:1 | 3:1 |

## Revisión responsive — 5 de octubre de 2026

Se conserva la versión anterior aprobada. Nueva capa responsive-balance.css: sticker de 100/104/108/132 px con letras proporcionales y espacio interior; escala compartida de h2, cuerpo legible, espaciado uniforme; controles de navegación, ingredientes, cierre y pausa de al menos 44 px; tarjetas de una columna en móvil pequeño y dos en móvil amplio; footer organizado en grilla; diálogo con desplazamiento dentro de la pantalla. Sin cambios de ingredientes, precios o datos comerciales.

| Ancho probado | Desborde horizontal | Resultado |
|---:|---|---|
| 360 px | No | Cabecera, portada, tarjetas, historia, detalles, local, FAQ, footer y diálogo revisados |
| 390 px | No | Sticker legible; títulos y espacios equilibrados |
| 768 px | No | Navegación y portada en dos columnas sin recortes |
| 1024 px | No | Composición intermedia conservada |
| 1440 px | No | Composición de escritorio conservada |

Capturas: responsive-360.jpg, responsive-390.jpg, responsive-768.jpg, responsive-1024.jpg, responsive-1440.jpg; portada responsive-hero-390.jpg; diálogo responsive-dialog-360.jpg. Capturas con pausa activada para documentar las posiciones finales. El mapa depende de Google y puede permanecer sin cargar en una captura de página completa con lazy-loading.

Comprobaciones funcionales: navegación móvil abre y cierra; las cuatro categorías muestran sus productos; Ver todas muestra cinco burgas; diálogo Big Chicken abre y cierra con Escape; primera FAQ abre por teclado. Pausa persiste tras recargar. Reglas prefers-reduced-motion existentes conservadas; no se añadió movimiento en esta iteración. node --check dist/app.js y verify-v3.py correctos. Tabla de contraste anterior recalculada por el verificador; colores preservados.

## Animación de tarjetas en pantallas táctiles
El brillo y zoom suave de escritorio ahora se reproducen una vez cuando la tarjeta aparece en móvil; la pulsación conserva la elevación. Usa la entrada existente, sin nuevos listeners ni cambios en filtros o diálogo. Las reglas de pausa y prefers-reduced-motion desactivan ambos efectos.

## Iconos de detalles
Pan, salsa y papas ahora usan ilustraciones SVG con la misma escala 32 × 32, trazo rojo y relleno amarillo. Papas sustituye el recorte fotográfico; contenido y animación existentes conservados.

## Footer — composición
Dirección agrupada bajo el logo, Instagram junto al titular, mascota lateral y copyright/controles secundarios. Pausa conservada como accesibilidad, con estilo de enlace discreto. Inspección visual a 390 y 1440 px, foco visible y sin desborde de escritorio. Capturas footer-mobile.jpg y footer-desktop.jpg.

## Header — espaciado
Padding vertical 20 px, alineación flex centrada, alturas estables de 105 px desktop y 90 px móvil mínimo. Navegación Source Sans 3 normal 16 px; separación 50 px desktop / 30 px tablet. Hover oscuro y subrayado de 300 ms sin fondo ni cambios de layout. Menú hamburguesa y offsets de anclas ajustados.

## Hero — nueva dirección
Gradiente #b52b13/#bd3217/#e84c1f, crema #f8f6f1 y amarillo #ffc107. Copy conservado, CTA dobles con radio 8 px; composición centrada móvil y lateral desktop. Altura mínima 80svh móvil, viewport restante desktop; puede crecer para no cortar contenido. Burger entra en 800 ms, líneas 600 ms con 100 ms de separación y CTA 400 ms; estrellas 8 s, badge escala/glow. Parallax solo desde 1024 px, factores 0.4 y -0.2. Pausa y reduced-motion conservados; saveData/2g desactivan movimiento. app.js 292 líneas y sintaxis correcta. WebP 480/800/1374 con srcset, JPG fallback; hero eager por ser LCP. Inspección visual móvil 390 y desktop 1440 sin desborde; otros navegadores no probados directamente. Capturas hero-direction-mobile.jpg y hero-direction-desktop.jpg.

## Guía completa header + hero
Menú hamburguesa hasta 1023 px, iconos SVG coherentes, separadores, Instagram diferenciado, horarios/teléfono Por confirmar, overlay y cierre Escape/click con salida 200 ms. Links entran cada 50 ms. Header nav semibold 16 px y subrayado 200 ms. Hero título 64 px desktop / 40 px móvil, CTA full-width móvil, minimum 100svh desktop / 80svh móvil. Parallax inverso -0.15 y fondo 0.1. Se conserva eager LCP, rojos oscuros para texto AA y archivos existentes app.js/styles.css. Sin librerías; comprobado móvil 360, menú/cierre por teclado; capturas final-hero-mobile.jpg, final-menu-mobile.jpg y final-hero-desktop.jpg. Pruebas directas Safari/Firefox/Edge pendientes.

## Footer — estructura de cierre
Titular script, copy + CTA menú/mapa, divisor, logo/mascota + dirección + Instagram, divisor y enlaces/copyright. Gradiente #c73910 → #a82d0a; texto blanco y crema. Layout tres columnas desktop y apilado móvil. Verificado a 390/1440 sin desborde, pausa funcional y foco visible. Capturas closing-footer-mobile.jpg y closing-footer-desktop.jpg. Horarios/teléfono Por confirmar.

## Footer — especificación de dos columnas
Titular 48 px desktop / 36 px móvil; mascota 120/100 px con float 4 s, badge 80/70 px. Instagram con SVG, botón 48 px y hover. Dirección con logo pequeño y dos divisores; metadata centrada desktop/apilada móvil. Entrance por IntersectionObserver, parallax acotado a 12 px para no desplazar el cierre; rAF de scroll existente reutilizado. Pausa persistente sincroniza data-animations, reduced-motion conservado. app.js 298 líneas, node --check correcto. Inspección directa 320 y 1440 sin desborde; animación activa y pausada comprobadas. Capturas footer-spec-320.jpg y footer-spec-1440.jpg. Resto de anchos y navegadores de la lista no se consideran pruebas directas realizadas en esta entrega.

## FAQ — accordion refinado
Dos columnas desde 1024; header centrado y una columna en móvil/tablet. Fondo #f8f6f1, texto #2c2c2a, secundario #625f58 para AA, rojo oscuro en links/preguntas activas. Hover desktop con borde lateral sin saltos; móvil solo fondo al abrir. Icono +/× rotado, objetivo 44 px y summary completo operable. Respuestas existentes conservadas: no se agregaron opciones de sal, tamaños o promociones sin confirmar. Altura dinámica existente animada 400 ms; múltiples preguntas pueden permanecer abiertas. Todas cuatro abiertas por Enter/Space y primera cerrada/reabierta. Inspección directa a 390/1440 sin desborde. Capturas faq-mobile.jpg y faq-desktop.jpg. Pausa y reduced-motion conservados; node --check correcto.

## Footer compacto inspirado en referencia
Se reemplazó el footer grande por cuatro columnas: marca, ubicación/Maps, Instagram y navegación. Fondo rojo oscuro e iconos amarillos; un único divisor y metadata discreta. Eliminados titular/copy decorativos, logos repetidos, float y parallax de footer. Altura desktop medida 293.6 px a 1440 px. Móvil apilado con marca horizontal. Inspección a 390/1440 sin desborde; capturas footer-compact-desktop.jpg y footer-compact-mobile.jpg. Pausa global conservada, node --check correcto.

## Alineación FAQ
Label y titular centrados encima de la lista; una columna en todos los anchos, preguntas con máximo 900 px y margen automático.

## Footer móvil corregido
Hasta 1023 px se elimina la grilla 2×2: marca, ubicación, Instagram y navegación apilados. Metadata en fila propia, controles de 44 px y espaciado uniforme; desktop de cuatro columnas conservado.

Inspección móvil a 620 y 390 px: una columna y sin desbordes. Captura footer-mobile-fixed.jpg.

## Footer móvil — composición centrada
Marca y títulos centrados, bloques con máximo 440 px, filas de contacto centradas con texto alineado al icono; navegación y metadata centradas. Se elimina el vacío lateral de la versión anterior. Foco visible y controles 44 px preservados.

Footer móvil compacto: cambios restringidos a max-width 767px. Volver arriba sobre divisor, marca centrada, ubicación e Instagram en dos columnas, navegación con separadores y copyright debajo. Escritorio conserva sus reglas.

Local móvil: título a izquierda, dirección y acciones a derecha hasta 767px; nota oculta solo en móvil. Botones mantienen 44px. Escritorio sin cambios.

Detalles móvil: icono y título comparten fila, numeración secundaria de 22px, títulos 29px y cuerpo 15px. Espacios compactados; reglas limitadas a 767px.

Carta con carrusel: todas las burgas en una fila horizontal, flechas 44px y gesto táctil, sin autoplay. Mantiene 3 tarjetas en escritorio, 2 en móviles anchos y 1 bajo 480px. Filtros reinician recorrido; diálogo de Bacon y filtro Pollo comprobados. Revisado en 360, 390, 630, 768, 1024 y 1440px. Pausa y movimiento reducido usan desplazamiento inmediato. node --check pasa en app.js y menu-carousel.js.

Portada escritorio: altura 560–700px según viewport y contenido; titular 76–96px, apoyo 20px y CTA 16px. Eliminado desplazamiento parallax independiente de la foto; entrada y flotación conservadas. Scroll probado visualmente sin cruce con leyenda. Revisado 1024, 1440 y 1920px; móvil 390px conserva reglas previas. node --check app.js pasa.

Cierre carta: eliminada introducción redundante; aviso con icono de papas, fondo amarillo y texto oscuro 16px/15px, visible solo en burgas. Cinta escritorio: dos copias iguales de 100vw, ciclo -50% sin hueco final; reglas móviles de animación intactas. Comprobados escritorio 1920px, móvil 390px y cambio de categoría. node --check app.js pasa.

Rendimiento: ver qa/PERFORMANCE.md y PERFORMANCE-PESOS.json. Imágenes responsive WebP, Lobster WOFF2, una petición CSS, originales fuera de dist. Se conserva composición y animaciones. Referencias de assets sin faltantes y sintaxis JS correctas. Métricas temporales de Lighthouse no disponibles en esta sesión.
