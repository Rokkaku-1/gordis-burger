# Gordis Burger — propuesta de rediseño

Sitio estático independiente en `dist/`. La aplicación Betlog y el diseño China Fu quedan separados de esta propuesta.

## Diseño

Identidad retro a partir del logo, la mascota y las fotografías originales: rojo, crema, amarillo y celeste. Incluye portada, carta con categorías e ingredientes en un diálogo accesible, historia, ubicación y preguntas frecuentes. Navegación móvil, enlaces reales a Maps e Instagram y respeto de movimiento reducido.

## Contenido

## Ajustes del feedback

Profundidad y textura sutil en el hero, parallax y giro suave vinculados al scroll en escritorio, asteriscos rotatorios y pulso discreto del CTA. Cards con elevación, brillo puntual al pasar el cursor, fondos por categoría y botón explícito para ver ingredientes. Indicador móvil y transiciones de categorías que mantienen la selección correcta incluso con clics rápidos.

Entradas al scroll, números de sección animados, iconos SVG propios de brioche y squeeze y foto original de papas. FAQ con expansión y cierre animados, respuestas con jerarquía y listas. Footer en rojo oscuro, hover de Instagram y navegación móvil animada. La mascota conserva su ilustración original y responde al hover con un movimiento suave.

Las animaciones respetan `prefers-reduced-motion`; también se pueden pausar desde el footer. La preferencia se guarda únicamente en este navegador. El parallax se desactiva en móvil y las decoraciones se pausan cuando el hero sale de vista o la pestaña queda oculta.

## Contenido y recursos

La carta y dirección provienen de https://gordisburger.com/, consultado el 5 de octubre de 2026. Se omiten precios y horarios no confirmados; los horarios se consultan en el perfil oficial. No se simula un pedido, pago o servicio de delivery. El texto de comunicación es una propuesta editorial.

Los archivos de `dist/assets/` se recuperaron de la web oficial y su proveedor kiwimatic.com.ar. La tipografía Dreamboat publicada por esa web lleva `demo` en su nombre: para una publicación comercial, confirmar su licencia web o sustituirla por una fuente licenciada. Esta entrega es una propuesta privada de diseño.

## Vista local

Desde este directorio: `python -m http.server 4174 --bind 127.0.0.1 --directory dist`.

La página se encuentra en http://127.0.0.1:4174/.


## Correcciones de legibilidad y movimiento

Rojo #cf1e18, deep-red #a8190f y secundario #6b5748. Nota y caption fuera de la foto; margen reservado para rotación y parallax limitado a 24px. Fotos cálidas con multiply y zoom por producto. Iconos propios de brioche y squeeze. Entrada única del hero, cinta de 30s pausada fuera de vista, header compacto, presión de botones, diálogo animado con Escape y foco restaurado, reveal del póster, iconos, etiqueta de mapa y mascota. Se eliminó el pulso del CTA y el giro continuo de estrellas.

La tabla de contraste y evidencia responsive están en qa/VERIFICACION.md. Lobster se obtuvo del repositorio oficial google/fonts; OFL-Lobster.txt acompaña el archivo.

## Ajuste puntual de portada — 2026-10-05

Mascota junto al wordmark en cabecera; eliminada la firma familiar bajo los botones. Caption en Lobster, sentence case y sin tracking. Destellos SVG de ocho radios; float suave de la hamburguesa cuando la portada está visible. Pausa y prefers-reduced-motion detienen ambos efectos. Verificados en navegador: 1440, 390 y 360 px; sin desborde horizontal, filtro Pollo y diálogo/Escape operativos. Capturas: portada-ajustada-1440.jpg, portada-ajustada-390.jpg y portada-ajustada-360.jpg. Contraste y cobertura de acentos del verificador anterior pasan.

## Navegación y restauración del recorte — 2026-10-05

Los enlaces Las burgas, Somos Gordis y El local usan Lobster, rojo oscuro, espaciado y un fondo suave al interactuar. Mismo tratamiento en el menú móvil. Imagen de portada restaurada con imagegen a partir de hamb1.png (1374x1145 frente a 580x482), manteniendo la hamburguesa como referencia; alpha transparente verificado. WebP de 527174 bytes, PNG de trabajo conservado en source-assets fuera de dist. La foto original permanece disponible. Sombra CSS: desplazamiento 12px, blur 10px y opacidad 14%, sin sombra incrustada en la imagen. Animación y pausa existentes conservadas.

Verificación visual en navegador a 1440, 768, 390 y 360px: sin desborde horizontal. Menú móvil y enlace Somos Gordis comprobados. Capturas navegacion-burger-*.jpg. Los pares de contraste de navegación reutilizan rojo oscuro/crema (6,89:1) y tinta/ocre al interactuar. Verificador de contraste y cobertura de acentos pasa. El menú de productos y sus fotos no cambiaron.

## Marca compacta y entrada única — 2026-10-05

Mascota y wordmark más juntos: gap 0 y compensación de margen transparente del archivo. Entrada de mascota de 520 ms y del wordmark de 420 ms con 120 ms de desfase, una sola vez al cargar. Clase de entrada retirada a los 750 ms. No se repite al navegar, desplazar o activar animaciones. Pausa y prefers-reduced-motion evitan la entrada. Source Sans 3 autoalojada, OFL incluida, solo para texto de apoyo del hero: 18px escritorio y 17px móvil; Lobster en titulares.

Verificado en navegador: entrada activa inmediatamente tras recargar, logo sin animación después y sin entrada al recargar con pausa persistente. Marca compacta y sin desborde a 390px; portada y cabecera revisadas en escritorio. Capturas marca-compacta.jpg y marca-compacta-390.jpg. node --check dist/app.js pasa.
