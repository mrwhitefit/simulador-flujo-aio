# PROMPT CLAUDE DESIGN — Simulador "El flujo AIO"

Pega este prompt completo en Claude Design. Devolverá un HTML único con los 7 estados visuales del simulador en estética premium. Después se porta a React + Framer Motion para animarlo.

---

## CONTEXTO

Necesito el diseño visual premium de una mini-aplicación interactiva tipo "videojuego serio" que muestra cómo funciona el negocio de un agente inmobiliario online en 7 pasos. Va a usarse EN DIRECTO durante un evento online el martes 26 de mayo de 2026 (Zoom, 19:00h España). El presentador comparte pantalla y va pulsando botones; el público ve cómo se despliega el flujo completo en tiempo real con animaciones suaves.

La marca es Agente Inmobiliario Online (AIO). Audiencia mixta: agentes inmobiliarios tradicionales, personas con un trabajo (abogados, arquitectos, comerciales, closers) que quieren un extra. Lo que tienen en común: no entienden de marketing, no quieren tecnicismos, quieren ver el flujo simple.

El concepto narrativo del simulador es: activas tu marca → activas anuncios con 5€/día → empiezan a llegarte clientes potenciales → firmas una exclusiva → activas la red colaborativa AIO (RIC) → otro agente la vende → te llevas tu mitad de la comisión.

El cálculo final es: inmueble 300.000€ × 4% honorarios = 12.000€ comisión total → 6.000€ para ti, 6.000€ para tu compañero RIC.

---

## ASSETS QUE TE PASO COMO REFERENCIA

Junto a este prompt te voy a adjuntar **una captura de pantalla de un perfil de Instagram real** que quiero que uses como referencia visual para la marca dentro del móvil del simulador.

Adapta esa captura al diseño general del simulador (tipografía Montserrat, paleta oscura AIO, márgenes, sombras), pero respeta la sensación visual del feed: estructura del grid 3x3, jerarquía visual del header de perfil, estética de los posts.

NO copies píxel a píxel la captura. Toma su estilo, su densidad de información y su sensación premium, y aplícalo a la marca ficticia "tu.zona.aio" en el contexto del simulador.

---

## QUÉ NECESITO QUE ENTREGUES

Un **HTML único** con los **7 estados completos** del simulador apilados verticalmente, cada uno como una "vista" completa de la pantalla 1920x1080. Yo después porto el código a React y le añado las animaciones con Framer Motion.

Cada estado debe mostrar la PANTALLA COMPLETA del simulador en ese momento del flujo, no fragmentos sueltos. Es decir: necesito ver "cómo se ve todo a la vez" en cada paso.

NO necesito que el HTML sea interactivo — basta con que cada estado esté representado como un mockup estático bien diseñado. Yo le añadiré la lógica después.

NO uses JavaScript ni librerías. Solo HTML semántico + CSS. Si quieres añadir transiciones CSS para que se vea fluido al hacer scroll, OK, pero sin más.

Quiero clases CSS limpias y semánticas (no Tailwind, no inline styles), porque después tengo que extraer y portar a React.

---

## REGLAS GLOBALES DE DISEÑO

### Branding AIO

- **Negro principal**: `#1a1a1a` (fondo dominante)
- **Negro secundario**: `#0f0f0f` (paneles internos)
- **Rojo corporativo**: `#fa5659` (acentos, cifras clave, estados activos)
- **Blanco**: `#ffffff` (textos primarios)
- **Gris texto**: `#9ca3af`, `#6b6b6b` (textos secundarios)
- **Verde éxito**: `#10b981` (estados "firmado", "vendido", agentes RIC)
- **Ámbar lead**: `#fbbf24` (clientes potenciales en mapa)

### Tipografía

- **Familia**: Montserrat (display + body)
- **Pesos a usar**: 300 / 400 / 500 / 600 / 700 / 800 / 900
- **Display XXL** (cifras grandes): 900, tabular-nums
- **Display** (títulos): 800
- **Body**: 500
- **Caption / label**: 600 mayúsculas, tracking amplio (0.2em)

### Estética general

Pensar en el simulador como un **terminal Bloomberg + dashboard de Apple Vision Pro + videojuego AAA limpio**. Premium, oscuro, denso pero respirable. Sin gradientes saturados de feria. Sin emojis grandes. Sin sombras pesadas. Glassmorphism MUY sutil (max 10% opacidad) si encaja.

**SÍ usar**: bordes finos (1px white/5% opacidad), glow rojo sutil en elementos activos, micro-shadows, blur sutil en backgrounds, monospace en cifras.

**NO usar**: emojis grandes (sí pequeños 16px máximo y monocromos), gradientes coloridos, iconos genéricos de Flaticon, bordes redondeados excesivos (max 16px en cards), drop-shadows agresivos.

---

## LAYOUT FIJO · pantalla 1920x1080 sin scroll

Toda la pantalla está dividida en 3 zonas verticales:

```
┌────────────────────────────────────────────────────────────────┐
│  HEADER (60px)                                                 │
│  Logo AIO · título "El flujo · cómo se vende un inmueble       │
│  online" · reset button · contador "Paso X/6"                  │
├────────────────────────────────────────────────────────────────┤
│                                                                │
│  MAIN GRID (3 paneles, gap 24px, padding 24px)                 │
│  ┌────────────┐ ┌──────────────────┐ ┌──────────────────┐     │
│  │            │ │                  │ │                  │     │
│  │  PANEL     │ │  PANEL           │ │  PANEL           │     │
│  │  MÓVIL     │ │  MAPA            │ │  MÉTRICAS        │     │
│  │  (380px)   │ │  (flex-1)        │ │  (360px)         │     │
│  │            │ │                  │ │                  │     │
│  └────────────┘ └──────────────────┘ └──────────────────┘     │
│                                                                │
├────────────────────────────────────────────────────────────────┤
│  FOOTER · BARRA DE BOTONES (100px)                             │
│  7 botones (0-6) en grid horizontal · gap 12px                 │
└────────────────────────────────────────────────────────────────┘
```

Cada panel tiene su título pequeño arriba en mayúsculas (10px, tracking 0.2em, color blanco/40%): "TU MÓVIL", "TU ZONA" o "ESPAÑA · RIC ACTIVA", "TUS NÚMEROS".

Cada panel tiene un fondo oscuro ligeramente distinto al fondo general para separar visualmente (ej. `#0f0f0f` con borde `1px solid rgba(255,255,255,0.05)` y radius 16px).

---

## COMPONENTES PERMANENTES

### 1. Header

- Altura: 60px
- Fondo: `#1a1a1a` con borde inferior 1px white/5%
- Izquierda: logo "AIO" en rojo bold 800 + separador vertical 1px + "El flujo · cómo se vende un inmueble online" en gris claro 500
- Derecha: botón "RESET" en gris hover-rojo + texto "Paso X/6" en gris muted

### 2. Barra de botones (footer)

- Altura: 100px
- Fondo: `#1a1a1a` con borde superior 1px white/5%
- Grid de 7 botones iguales (grid-cols-7 con gap 12px)
- Cada botón tiene **4 estados visuales distintos**:
  - **Pendiente lejano** (paso futuro, no el siguiente): fondo `white/2%`, borde `white/10%`, texto blanco/40%
  - **Pendiente próximo** (el siguiente paso): fondo `white/3%`, borde rojo/40% (ligero glow rojo sutil), texto blanco/80%, animación pulse muy suave (esto se hará después en React, tú solo dale el aspecto visual de "este es el siguiente")
  - **Activo** (paso actual): fondo rojo sólido `#fa5659`, texto blanco bold, ring-2 con offset
  - **Completado** (paso anterior pasado): fondo `white/5%`, borde `white/10%`, texto blanco/40%, opacidad reducida

- Cada botón muestra:
  - Un círculo pequeño con el número (0-6)
  - El nombre corto del paso en mayúsculas, 600, tracking 0.1em
- Nombres: "INICIO", "MARCA", "ANUNCIOS", "CLIENTES", "EXCLUSIVA", "RIC", "VENTA"

### 3. Panel Móvil

Frame de iPhone moderno (Pro o equivalente):
- Ancho: 300px
- Alto: 600px
- Cuerpo en `#0a0a0a` con borde `6px solid #1f1f1f`
- Border-radius: 44px exteriores, 38px interiores
- Notch central arriba (24px alto, 96px ancho, fondo `#0a0a0a`)
- Botones laterales sutiles (1-2px de detalle si encaja)
- Reloj "19:00" arriba a la izquierda en blanco/70% bold
- Indicadores de batería/wifi a la derecha en blanco/70%
- Pantalla interna `#1a1a1a` con padding mínimo

### 4. Panel Mapa

Frame contenedor:
- Padding 24px
- Background: gradiente sutil de `#0f0f0f` a `#1a1a1a`
- Border 1px white/5%
- Radius 16px
- Esquina superior izquierda: label en blanco/40% "TU ZONA · ALICANTE" o "ESPAÑA · RIC ACTIVA" según estado
- Esquina inferior izquierda: leyenda pequeña con dots de color

### 5. Panel Métricas

5 cards apiladas verticalmente con gap 10px:
- Cada card: fondo `white/3%`, borde 1px white/5%, radius 12px, padding 12px
- Label arriba: 9px mayúsculas tracking 0.15em, blanco/40%
- Valor en grande: 24px bold 900, tabular-nums (blanco si no destacada, rojo si destacada)
- Hint debajo: 10px, blanco/40%

Cards (en este orden):
1. **Inversión esta semana** — 0€ / 5€ / 35€ según paso
2. **Personas que ven tu anuncio** — 0 / 4.500
3. **Clientes potenciales** — 0 / 28
4. **Exclusivas firmadas** — 0 / 1
5. **Cobrado** — 0€ / 6.000€ (esta es la card destacada cuando se llega al paso 6: fondo gradient red/20% a red/5%, borde rojo/40%, cifra rojo)

---

## LOS 7 ESTADOS

### ESTADO 0 · INICIO (Paso 0)

**Móvil**: pantalla negra con texto centrado en blanco/20%: "Tu perfil sin marca. Nadie te encuentra."

**Mapa**: vista de ciudad (Alicante). Grid sutil de calles. Solo aparece tu punto rojo en el centro con etiqueta "TÚ" (pulse animation muy sutil que tú diseñes estáticamente como glow).

**Métricas**: todas a 0. Hints en gris "—" o "Sin actividad".

**Botones**: paso 0 activo (rojo), paso 1 próximo (borde rojo sutil), 2-6 pendientes.

---

### ESTADO 1 · ACTIVAR MARCA (Paso 1)

**Móvil**: feed de Instagram completamente rellenado:
- Header del perfil con avatar gradient (círculo rojo→naranja con texto "AIO" dentro), nombre "@tu.zona.aio", subtítulo "Inmuebles · 9 publicaciones"
- Fila de stats: "9 Posts · 127 Sigues · 83 Te siguen"
- Grid 3x3 de 9 posts cuadrados con:
  - Fondos alternados gris oscuro
  - Iconos pequeños (16-20px) monocromos representando temas
  - Tag pequeño en esquina inferior izquierda: "ZONA", "INFO", "YO"
- Sin overlay todavía

**Mapa**: igual al estado 0 (tu punto rojo en Alicante).

**Métricas**: todas a 0 menos lo que se acaba de activar (no cambia nada todavía en números, solo el feed).

**Botones**: paso 1 activo, paso 2 próximo, 0 completado, 3-6 pendientes.

**Detalle de los 9 posts del feed** (en orden, izquierda-derecha, arriba-abajo):
1. ZONA — icono ubicación
2. INFO — icono gráfica
3. YO — icono persona
4. ZONA — icono casa
5. INFO — icono euro
6. YO — icono diana/objetivo
7. ZONA — icono pin
8. INFO — icono trending up
9. YO — icono estrella/sparkle

Los iconos deben ser **monocromos blancos** o blancos/70%, NO emojis multicolor.

---

### ESTADO 2 · ANUNCIOS 5€/DÍA (Paso 2)

**Móvil**: el feed sigue visible (con sus 9 posts) pero ahora aparece un **anuncio promocional al pie del móvil**, ocupando los últimos 40% de la pantalla:
- Fondo: gradiente desde `#1a1a1a` opaco hasta semi-transparente arriba (para que se vea que se monta encima del feed)
- Borde superior: 1px rojo/40%
- Avatar circular rojo "AIO" 28x28px + nombre "@tu.zona.aio" + badge gris "ANUNCIO" con texto 9px bold uppercase
- Copy del anuncio en blanco 12px: *"¿Pensando en vender tu piso? Te hago la valoración gratis en 24h."*
- Botón rojo `#fa5659` ancho completo: "SOLICITAR VALORACIÓN" en blanco bold 11px

**Mapa**: igual al estado 0/1 (solo tu punto).

**Métricas**:
- Inversión esta semana: **5€** (con hint "5€/día rodando")
- Resto a 0.

**Botones**: paso 2 activo, paso 3 próximo, 0-1 completados, 4-6 pendientes.

---

### ESTADO 3 · PASA EL TIEMPO · CLIENTES POTENCIALES (Paso 3)

**Móvil**: igual al estado 2 (feed + anuncio).

**Mapa**: vista de ciudad. Además de tu punto rojo central, ahora aparecen **28 puntos amarillos pequeños** (color `#fbbf24`) dispersos por la ciudad de manera natural (no en grid). Cada punto con un pequeño glow ámbar.

**Métricas**:
- Inversión esta semana: **35€** (con hint "5€/día rodando")
- Personas que ven tu anuncio: **4.500** (con hint "En tu zona")
- Clientes potenciales: **28** (con hint "Te han dejado sus datos")
- Resto a 0.

**Botones**: paso 3 activo, paso 4 próximo, 0-2 completados, 5-6 pendientes.

---

### ESTADO 4 · FIRMA EXCLUSIVA (Paso 4)

**Móvil**: ya no se ve el feed. La pantalla del móvil pasa a una **pantalla de llamada entrante** estilo iOS:
- Fondo: gradiente vertical de verde esmeralda oscuro (`#064e3b`) en la parte superior a `#1a1a1a` en la inferior
- Centro: avatar circular grande (96x96) con fondo blanco/10% y un icono de teléfono 📞 minimalista en blanco
- Debajo del avatar: texto pequeño "LLAMADA ENTRANTE" en blanco/70% uppercase tracking
- Nombre grande: **"María, propietaria"** en blanco bold 18px
- Subtexto en verde claro `#a7f3d0`: *"Quiero firmar la exclusiva"*
- Abajo: 2 botones circulares (rojo "✕" + verde "✓") tipo iOS, ambos 48x48

**Mapa**: vista de ciudad. Tu punto rojo sigue ahí. Los 28 puntos amarillos siguen (algunos podrían quedar atenuados a opacidad 30% para mostrar que el resto sigue ahí). **Y aparece un pin nuevo verde grande** ligeramente offset del centro con:
- Etiqueta arriba "EXCLUSIVA" en cápsula verde `#10b981` con texto blanco bold 9px uppercase
- Pequeño triángulo verde apuntando hacia abajo
- Icono casa minimalista (NO emoji, mejor SVG outline limpio) debajo
- Texto pequeño debajo del icono: "300.000€ · 4% honorarios" en blanco/60%

**Métricas**:
- Inversión esta semana: **35€**
- Personas: **4.500**
- Clientes potenciales: **28**
- Exclusivas firmadas: **1** (con hint "Inmueble en tu cartera")
- Cobrado: **0€**

**Botones**: paso 4 activo, paso 5 próximo, 0-3 completados, 6 pendiente.

---

### ESTADO 5 · ACTIVAR RIC (Paso 5)

**Móvil**: pantalla "en reposo" del móvil — fondo `#1a1a1a` casi vacío, quizás con un pequeño icono outline central muy sutil que indique "negocio activo" o simplemente la status bar arriba con la hora.

**Mapa**: **CAMBIO TOTAL DE VISTA**. Ya no es la ciudad. Ahora es un **mapa estilizado premium de España**.

Inspiración visual: estilo "dark map premium" tipo Mapbox dark theme o estilo de mapas de dashboards Apple/Linear. Limpio, sobrio, con peso visual. NO un SVG plano y feo. NO un mapa real con calles y carreteras (queremos algo más estilizado y abstracto). NO un mapa de Google Maps tradicional.

Especificaciones del mapa:
- **Silueta de España bien proporcionada** (península + Baleares + opcionalmente Canarias). Forma reconocible, no genérica.
- Relleno: gradiente sutil de `rgba(255,255,255,0.04)` arriba a `rgba(255,255,255,0.02)` abajo
- Borde de la silueta: 1px `rgba(255,255,255,0.18)` con un ligerísimo glow blanco interior para que se sienta "iluminada"
- Opcional: líneas sutiles de "latitud/longitud" muy tenues (white/3%) por detrás como fondo, tipo retícula de dashboard premium
- Opcional: pequeño efecto de profundidad — sombra interna oscura suave para dar sensación de relieve
- **Sin nombres de regiones, sin carreteras, sin etiquetas geográficas innecesarias.** Solo silueta + puntos de agentes + tu pin
- Fondo del panel detrás del mapa: el mismo gradiente oscuro que el resto de paneles

Puntos sobre el mapa:
- 8 puntos verdes esmeralda `#10b981` distribuidos por las ciudades principales: Madrid, Barcelona, Valencia, Sevilla, Bilbao, Málaga, Zaragoza, Murcia
- Cada uno con un pequeño glow verde sutil (box-shadow `0 0 10px rgba(16,185,129,0.5)`)
- Punto del tamaño 8-10px de diámetro
- **Tu pin de exclusiva** queda en Alicante (costa este, coordenadas aprox. x:65%, y:62%)
- Murcia (cercana a Alicante) tiene un punto rojo más destacado en lugar de verde, con etiqueta "MURCIA" en cápsula roja bold
- **Una línea trazada roja punteada** conecta tu pin (Alicante) con el punto rojo de Murcia — esta línea es el "match" RIC, en `#fa5659` 2px con stroke-dasharray
- Leyenda abajo izquierda con dos dots minúsculos: "Agentes RIC" (verde) y "Conexión" (rojo) — texto en blanco/40%, 9px

Estilo de referencia para inspirarte:
- El "dark map" de Stripe Atlas
- Los mapas estilizados de las landings de Linear, Vercel o Notion
- Los mapas premium de fintech tipo Wise o Revolut en sus reports
- El mapa de la RIC (Red Inmobiliaria Colaborativa) de AIO: simple, oscuro, con puntos brillantes, sin saturar de información

Premium pero simple. La silueta de España debe ser elegante. Si parece un "mapa de PowerPoint del 2010", es un fallo.

**Métricas**: igual al estado 4 (con exclusivas: 1, cobrado: 0).

**Botones**: paso 5 activo, paso 6 próximo, 0-4 completados.

---

### ESTADO 6 · VENTA CERRADA (Paso 6)

**Móvil**: similar al estado 5 (en reposo) o, opcionalmente, un pequeño checkmark verde centrado discreto.

**Mapa**: vista España RIC sigue ahí. **Diferencia**: tu pin de Alicante ahora tiene la etiqueta cambiada de "TU EXCLUSIVA" (roja) a **"VENDIDA"** (verde `#10b981`). La línea de conexión sigue trazada.

**Métricas**:
- Inversión esta semana: **35€**
- Personas: **4.500**
- Clientes potenciales: **28**
- Exclusivas firmadas: **1**
- **Cobrado: 6.000€** (CARD DESTACADA en rojo, fondo gradient red/20%, cifra rojo bold display, hint en rojo/100% bold: *"Comisión total 12.000€ — repartida 50/50 con tu compañero RIC"*)

**Botones**: paso 6 activo, 0-5 completados. Todos los demás botones tienen aspect "done".

**Confetti**: NO lo dibujes (lo añado yo con JS después). Pero deja "espacio mental" — el énfasis es la card de Cobrado.

---

## DETALLES VISUALES IMPORTANTES

### Tu punto rojo en el mapa (el "TÚ")
- Círculo `#fa5659` 12x12
- Glow exterior rojo (box-shadow `0 0 12px rgba(250, 86, 89, 0.6)`)
- En estados de ciudad: etiqueta "TÚ" debajo en rojo bold 10px

### Puntos de clientes potenciales (28 dots)
- Círculo `#fbbf24` 8x8
- Glow suave ámbar
- Posicionados de forma orgánica, no en grid

### Pin de exclusiva
- Etiqueta cápsula verde con texto bold uppercase
- Pequeño triángulo descendente (estilo Google Maps)
- Icono casa SVG outline (NO emoji 🏠), limpio y minimalista
- Cifra debajo en gris

### Línea RIC
- Stroke rojo `#fa5659`
- Stroke-width 2px
- Stroke-dasharray (línea discontinua)
- Comienza en tu pin Alicante, termina en Murcia

### Card "Cobrado" destacada (estado 6)
- Fondo: gradiente lineal de `rgba(250,86,89,0.2)` arriba a `rgba(250,86,89,0.05)` abajo
- Borde 1px `rgba(250,86,89,0.4)`
- Cifra "6.000€" en rojo `#fa5659`, display XXL, bold 900
- "€" más pequeño al lado de la cifra
- Hint en rojo `#fa5659` peso 600 (no muted)

---

## CÓMO ENTREGAR EL HTML

Una sola página HTML que muestre los 7 estados apilados verticalmente, cada uno como un bloque de pantalla completa (1920x1080 cada uno). El usuario hace scroll para ir viendo cada estado.

Entre estados puedes meter un separador discreto con etiqueta "ESTADO N · NOMBRE".

Quiero clases CSS semánticas que yo pueda mapear directo a componentes React. Ejemplo:
- `.simulator-screen` — el wrapper de cada estado
- `.panel--phone`, `.panel--map`, `.panel--metrics` — los 3 paneles
- `.phone-frame`, `.phone-screen`, `.feed-grid`, `.feed-post`, `.ad-overlay`, `.call-screen`
- `.map-city`, `.map-spain`, `.map-pin`, `.map-pin--you`, `.map-pin--lead`, `.map-pin--exclusiva`, `.map-pin--ric-agent`, `.map-line--ric`
- `.metric-card`, `.metric-card--highlight`
- `.button-bar`, `.button-step`, `.button-step--active`, `.button-step--done`, `.button-step--next`

No uses Tailwind. CSS clásico con BEM o similar. Variables CSS para los colores en `:root`.

---

## REFERENCIAS DE ESTILO

**Inspiraciones**:
- Bloomberg Terminal (densidad de información + clarity)
- Linear app (paleta oscura premium, tipografía)
- Apple Vision Pro UI (sutileza, glass)
- iA Writer (minimal, tipográfico)
- Stripe Dashboard (cards con métricas)

**Anti-referencias** (NO inspirarse en):
- Dashboards de Hotmart, ClickFunnels
- Plantillas de Canva genéricas
- UI de videojuego arcade (queremos premium, no gamer)
- Marketing tools con emojis grandes y colores chillones

---

## TONO FINAL

Frío, premium, sobrio, denso. La gente debe sentir que está viendo una herramienta seria de profesional, no un juguete. Cada cifra debe tener peso visual. Cada panel debe respirar. Si dudas entre añadir algo o quitarlo, quítalo.

El simulador es la pieza más visible del directo. Si se ve premium, AIO se ve premium.

---

## OUTPUT ESPERADO

Un archivo HTML completo, ~1500-2500 líneas, con:
- `<head>` con Montserrat de Google Fonts
- `:root` con variables de color
- CSS limpio con clases semánticas
- 7 secciones `.simulator-screen` apiladas
- Sin JavaScript

Si tienes dudas sobre algún estado concreto, pregunta antes de improvisar. Prefiero menos estados resueltos perfectamente que los 7 con relleno.
