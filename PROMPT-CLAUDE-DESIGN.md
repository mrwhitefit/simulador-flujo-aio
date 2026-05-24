# PROMPT CLAUDE DESIGN — Simulador "El flujo AIO"

Pega este prompt completo en Claude Design. Adjunta también la captura de Instagram que mencionas en la sección de assets. Devolverá un HTML único con los 7 estados visuales del simulador en estética premium. Después se porta a React + Framer Motion para animarlo.

---

## CONTEXTO

Necesito el diseño visual premium de una mini-aplicación interactiva tipo "videojuego serio" que muestra cómo funciona el negocio de un agente inmobiliario online en 7 pasos. Va a usarse EN DIRECTO durante un evento online el martes 26 de mayo de 2026 (Zoom, 19:00h España). El presentador comparte pantalla y va pulsando botones; el público ve cómo se despliega el flujo completo en tiempo real con animaciones suaves.

La marca es Agente Inmobiliario Online (AIO). Audiencia mixta: agentes inmobiliarios tradicionales, personas con un trabajo (abogados, arquitectos, comerciales, closers) que quieren un extra. Lo que tienen en común: no entienden de marketing, no quieren tecnicismos, quieren ver el flujo simple.

El concepto narrativo del simulador es:

1. Activas tu **marca** (tu contenido en Instagram)
2. Activas tus **anuncios** con 5€/día
3. Marca + anuncios alimentan tu **embudo** → entra gente → algunos te dejan sus datos como clientes potenciales
4. Uno de esos clientes potenciales firma una **exclusiva** (te llama por teléfono)
5. Activas la **RIC** (Red Inmobiliaria Colaborativa de AIO) y un compañero de la red activa tu inmueble desde su zona
6. **Venta cerrada** → comisión repartida

Cálculo final: inmueble 300.000€ × 4% honorarios = 12.000€ comisión total → 6.000€ para ti, 6.000€ para tu compañero RIC.

---

## ASSETS QUE TE PASO COMO REFERENCIA

Adjunto a este prompt **una captura de pantalla de un perfil de Instagram real** que quiero que uses como referencia visual para la marca dentro del móvil del simulador.

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
- **Ámbar lead**: `#fbbf24` (clientes potenciales que salen del embudo)
- **Azul cool** opcional: `#60a5fa` para "personas que entran al embudo" (diferenciar visualmente de los clientes potenciales que SALEN)

### Tipografía

- **Familia**: Montserrat (display + body)
- **Pesos**: 300 / 400 / 500 / 600 / 700 / 800 / 900
- **Display XXL** (cifras grandes): 900, tabular-nums
- **Display** (títulos): 800
- **Body**: 500
- **Caption / label**: 600 mayúsculas, tracking 0.2em

### Estética general

Pensar en el simulador como un **terminal Bloomberg + dashboard de Apple Vision Pro + videojuego AAA limpio**. Premium, oscuro, denso pero respirable. Sin gradientes saturados de feria. Sin emojis grandes. Sin sombras pesadas. Glassmorphism MUY sutil si encaja.

**SÍ usar**: bordes finos (1px white/5% opacidad), glow rojo/verde/ámbar sutil en elementos activos, micro-shadows, blur sutil en backgrounds, monospace en cifras.

**NO usar**: emojis grandes (sí pequeños 16px máximo y monocromos), gradientes coloridos, iconos genéricos de Flaticon, bordes redondeados excesivos (max 16px en cards), drop-shadows agresivos.

---

## LAYOUT FIJO · pantalla 1920x1080 sin scroll

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
│  │  PANEL     │ │  PANEL CENTRAL   │ │  PANEL           │     │
│  │  MÓVIL     │ │  (muta según     │ │  MÉTRICAS        │     │
│  │  (380px)   │ │   fase: embudo   │ │  (360px)         │     │
│  │            │ │   o mapa)        │ │                  │     │
│  │            │ │   (flex-1)       │ │                  │     │
│  └────────────┘ └──────────────────┘ └──────────────────┘     │
│                                                                │
├────────────────────────────────────────────────────────────────┤
│  FOOTER · BARRA DE BOTONES (100px)                             │
│  7 botones (0-6) en grid horizontal · gap 12px                 │
└────────────────────────────────────────────────────────────────┘
```

**Importante sobre el panel central**:

- **Estados 0, 1, 2, 3**: el panel central muestra el **EMBUDO** con sus dos fuentes (contenido + anuncios) alimentándolo. Esto representa la fase de captación.
- **Estados 4, 5, 6**: el panel central muestra el **MAPA** (ciudad → España). El embudo ya cumplió su función. Ahora se ve el resultado en territorio (exclusiva firmada, RIC activada, venta cerrada).

La transición entre modos sucede del estado 3 al 4. Eso lo animaré yo después en React con un fade-out / fade-in. Tú entrega los dos modos diseñados premium.

Cada panel tiene su título pequeño arriba en mayúsculas (10px, tracking 0.2em, color blanco/40%): "TU MÓVIL", "TU EMBUDO" o "TU ZONA · ALICANTE" o "ESPAÑA · RIC ACTIVA", "TUS NÚMEROS".

Cada panel tiene un fondo oscuro ligeramente distinto al fondo general (`#0f0f0f` con borde `1px solid rgba(255,255,255,0.05)` y radius 16px).

---

## COMPONENTES PERMANENTES

### 1. Header

- Altura: 60px
- Fondo: `#1a1a1a` con borde inferior 1px white/5%
- Izquierda: logo "AIO" en rojo bold 800 + separador vertical 1px + "El flujo · cómo se vende un inmueble online" en gris claro 500
- Derecha: botón "RESET" en gris hover-rojo + texto "Paso X/6" en gris muted

### 2. Barra de botones (footer)

- Altura: 100px
- Grid de 7 botones iguales (grid-cols-7 con gap 12px)
- Cada botón tiene **4 estados visuales distintos**:
  - **Pendiente lejano**: fondo `white/2%`, borde `white/10%`, texto blanco/40%
  - **Pendiente próximo** (el siguiente paso): fondo `white/3%`, borde rojo/40% (glow rojo sutil), texto blanco/80%
  - **Activo** (paso actual): fondo rojo sólido `#fa5659`, texto blanco bold, ring exterior con offset
  - **Completado** (paso pasado): fondo `white/5%`, borde `white/10%`, texto blanco/40%, opacidad 60%
- Cada botón muestra: círculo pequeño con número (0-6) + nombre corto en mayúsculas, 600, tracking 0.1em
- Nombres: "INICIO", "MARCA", "ANUNCIOS", "CLIENTES", "EXCLUSIVA", "RIC", "VENTA"

### 3. Panel Móvil

Frame de iPhone moderno (Pro o equivalente):

- Ancho: 300px
- Alto: 600px
- Cuerpo en `#0a0a0a` con borde `6px solid #1f1f1f`
- Border-radius: 44px exteriores, 38px interiores
- Notch central arriba (24px alto, 96px ancho)
- Reloj "19:00" arriba izquierda en blanco/70% bold
- Indicadores de batería/wifi a la derecha
- Pantalla interna `#1a1a1a` con padding mínimo

El contenido del móvil muta según paso (ver sección de estados).

### 4. Panel central — MODO EMBUDO (estados 0-3)

Este es el componente más importante visualmente. Es el corazón de la metáfora.

Estructura del embudo:

```
       ┌────────────┐         ┌────────────┐
       │ CONTENIDO  │         │  ANUNCIOS  │
       │ (feed IG   │         │  (5€/día)  │
       │  mini-grid)│         │            │
       └─────┬──────┘         └──────┬─────┘
             │                       │
             │     ↓ flujo personas  │
             └─────────┬─────────────┘
                       ↓
              ╔══════════════════╗
              ║                  ║
              ║   TU EMBUDO      ║   ← contenedor visual
              ║                  ║      trapezoidal invertido
              ║    (personas     ║
              ║     bajando)     ║
              ║                  ║
              ║   ╲          ╱   ║
              ║    ╲        ╱    ║
              ║     ╲      ╱     ║
              ║      ╲────╱      ║
              ╚════════╪═════════╝
                       ↓
              CLIENTES POTENCIALES
                  (contador)
```

**Componentes del panel embudo**:

a) **Dos fuentes en la parte superior** (lateral izquierda y derecha del embudo):

- **Fuente izquierda — CONTENIDO**:
  - Card pequeña 140x140px aprox.
  - Etiqueta arriba en cápsula: "TU CONTENIDO" en gris uppercase 9px (cambia a rojo cuando se activa)
  - Dentro: mini-preview del feed Instagram 3x3 (versión miniatura del feed del móvil, mismos posts)
  - Línea o flecha sutil descendente hacia el embudo
  - **Estado apagado** (paso 0): toda la card en gris muted, opacidad 40%
  - **Estado activo** (paso 1+): card iluminada, borde rojo sutil, color completo

- **Fuente derecha — ANUNCIOS**:
  - Card pequeña 140x140px aprox.
  - Etiqueta arriba: "TUS ANUNCIOS"
  - Dentro: representación de un anuncio Meta (mini mockup con avatar AIO, una imagen abstracta de inmueble, botón "VALORACIÓN GRATIS")
  - **Contador de inversión** debajo: "5€/día" en rojo cuando activo
  - Pequeño icono play o pulse animado (lo animo yo después)
  - Línea/flecha descendente hacia el embudo
  - **Estado apagado** (paso 0, 1): card en gris muted
  - **Estado activo** (paso 2+): card iluminada, borde rojo

b) **El embudo central** (forma trapezoidal):

- Forma: trapezoide invertido (boca ancha arriba, estrecho abajo)
- Ancho boca superior: ~80% del ancho del panel
- Ancho boca inferior: ~20% del ancho del panel
- Altura: ~50-55% de la altura del panel central
- Estilo visual: paredes laterales con líneas finas blanco/30%, posiblemente con un ligero degradado interior radial (oscuro centro → más oscuro bordes) para dar profundidad
- Dentro del embudo: **iconos de personas** (pequeños, abstractos, tipo silueta circular o emoji minimalista) bajando como si "fluyeran" desde la boca ancha hacia la estrecha
  - Estado 0: embudo vacío
  - Estado 1: 1-2 iconos descendiendo (orgánico lento)
  - Estado 2: 5-8 iconos descendiendo (anuncios encendidos pero poco tiempo)
  - Estado 3: 15-20 iconos descendiendo, simulando flujo lleno
- Color de los iconos personas: azul cool `#60a5fa` con opacidad 70% para diferenciarlos del rojo (TÚ) y del ámbar (los clientes potenciales que ya salieron)

c) **Salida del embudo** (parte inferior del panel):

- Caja contadora destacada debajo de la boca estrecha
- Etiqueta: "CLIENTES POTENCIALES" uppercase 10px tracking blanco/60%
- Cifra grande: 0 / 28 según paso (cuando hay 28, se ven también algunos puntos ámbar pequeños rodeando el contador, representando los que ya salieron)
- Estado 0, 1: contador 0
- Estado 2: contador empieza a moverse (digamos 6)
- Estado 3: contador en 28

d) **Líneas de conexión**:

- Líneas finas desde cada fuente (contenido y anuncios) hasta la boca del embudo
- Cuando la fuente está activa, la línea está "iluminada" (rojo o blanco)
- Cuando apagada: gris muted

e) **Etiqueta del panel**: arriba "TU EMBUDO" en uppercase 10px tracking 0.2em blanco/40%

### 5. Panel central — MODO MAPA (estados 4-6)

Cuando llega el estado 4, el panel central cambia a vista de mapa.

**Estado 4 — vista ciudad (Alicante)**:

- Grid sutil de calles abstracto al fondo (no Google Maps real, estilizado)
- Tu punto rojo central con etiqueta "TÚ" debajo
- Los 28 puntos ámbar de los clientes potenciales todavía visibles (algunos atenuados a 30% para mostrar que "siguen ahí" pero el foco se mueve)
- **Pin nuevo verde de exclusiva**: cápsula verde "EXCLUSIVA" + triángulo descendente + icono casa SVG outline limpio (NO emoji) + cifra "300.000€ · 4% honorarios" debajo en gris

**Estados 5 y 6 — vista España (RIC)**:

Mapa **estilizado premium de España**. Inspiración: estilo "dark map premium" tipo Mapbox dark theme, dashboards Apple/Linear, o el mapa de la RIC de AIO. Limpio, sobrio, con peso visual. NO un SVG plano y feo. NO carreteras ni calles reales. NO un Google Maps.

Especificaciones:

- **Silueta de España bien proporcionada** (península + Baleares + opcionalmente Canarias). Forma reconocible, no genérica.
- Relleno: gradiente sutil de `rgba(255,255,255,0.04)` arriba a `rgba(255,255,255,0.02)` abajo
- Borde: 1px `rgba(255,255,255,0.18)` con ligero glow interior blanco para sensación "iluminada"
- Retícula muy tenue de fondo (white/3%) tipo dashboard premium opcional
- Sin nombres de regiones, sin carreteras, sin etiquetas geográficas
- Fondo del panel detrás del mapa: gradiente oscuro coherente con resto

Puntos sobre el mapa (estados 5 y 6):

- 8 puntos verdes esmeralda `#10b981` en ciudades principales: Madrid, Barcelona, Valencia, Sevilla, Bilbao, Málaga, Zaragoza, Murcia
- Cada uno con glow verde sutil (box-shadow `0 0 10px rgba(16,185,129,0.5)`)
- 8-10px de diámetro
- **Tu pin** en Alicante (x:65%, y:62%) destacado
- **Murcia matched**: punto rojo en lugar de verde, etiqueta "MURCIA" en cápsula roja
- **Línea trazada roja punteada** Alicante → Murcia en `#fa5659` 2px stroke-dasharray
- Leyenda abajo izquierda con dots minúsculos: "Agentes RIC" (verde) y "Conexión" (rojo) — texto blanco/40% 9px

Estados visuales del pin "TÚ":

- Estado 4: pin rojo "EXCLUSIVA"
- Estado 5: pin rojo "EXCLUSIVA" + línea de match
- Estado 6: pin pasa a verde "VENDIDA"

**Referencias para inspirarte**: dark map de Stripe Atlas · mapas estilizados de Linear, Vercel, Notion · mapas fintech tipo Wise · mapa RIC de AIO.

Premium pero simple. Elegante. Si parece "mapa PowerPoint 2010", es fallo.

### 6. Panel Métricas

5 cards apiladas verticalmente con gap 10px:

- Fondo `white/3%`, borde 1px white/5%, radius 12px, padding 12px
- Label arriba: 9px mayúsculas tracking 0.15em, blanco/40%
- Valor: 24px bold 900, tabular-nums
- Hint debajo: 10px, blanco/40%

Cards (en este orden):

1. **Inversión esta semana** — 0€ / 5€ / 35€ según paso
2. **Personas que ven tu anuncio** — 0 / 4.500
3. **Clientes potenciales** — 0 / 28
4. **Exclusivas firmadas** — 0 / 1
5. **Cobrado** — 0€ / 6.000€ (CARD DESTACADA en estado 6: fondo gradient red/20% a red/5%, borde rojo/40%, cifra rojo)

---

## LOS 7 ESTADOS

### ESTADO 0 · INICIO

**Móvil**: pantalla negra con texto centrado en blanco/20%: *"Tu perfil sin marca. Nadie te encuentra."*

**Panel central (EMBUDO)**:
- Fuente CONTENIDO: apagada (gris muted)
- Fuente ANUNCIOS: apagada (gris muted)
- Embudo vacío
- Contador clientes potenciales: 0
- Líneas de conexión grises

**Métricas**: todas a 0. Hints "—" o "Sin actividad".

**Botones**: 0 activo, 1 próximo.

---

### ESTADO 1 · ACTIVAR MARCA

**Móvil**: feed Instagram completamente rellenado (adaptado de la captura que adjunto). Header de perfil con avatar gradient, "@tu.zona.aio", stats "9 Posts · 127 Sigues · 83 Te siguen", grid 3x3 de posts con iconos monocromos blancos.

**Panel central (EMBUDO)**:
- Fuente CONTENIDO: **encendida** (iluminada, borde rojo, mini-grid 3x3 visible y vivo)
- Fuente ANUNCIOS: apagada todavía
- Embudo con 1-2 personas descendiendo lentamente (representa el orgánico)
- Contador clientes potenciales: 0 todavía (el orgánico solo no genera leads suficientes)
- Línea contenido→embudo iluminada, línea anuncios→embudo apagada

**Métricas**: igual que estado 0 menos lo cosmético.

**Botones**: 1 activo, 2 próximo, 0 completado.

---

### ESTADO 2 · ANUNCIOS 5€/DÍA

**Móvil**: feed sigue visible, y aparece overlay del anuncio al pie ocupando los últimos 40% del móvil:
- Gradiente desde negro opaco a semi-transparente
- Borde superior rojo/40%
- Avatar AIO + "@tu.zona.aio" + badge "ANUNCIO"
- Copy: *"¿Pensando en vender tu piso? Te hago la valoración gratis en 24h."*
- Botón rojo ancho: "SOLICITAR VALORACIÓN"

**Panel central (EMBUDO)**:
- Fuente CONTENIDO: encendida
- Fuente ANUNCIOS: **encendida** (iluminada, borde rojo, contador "5€/día" visible)
- Embudo con 5-8 personas descendiendo activamente
- Contador clientes potenciales: 6 (empezando)
- Ambas líneas de conexión iluminadas

**Métricas**: Inversión 5€ con hint "5€/día rodando", resto 0.

**Botones**: 2 activo, 3 próximo, 0-1 completados.

---

### ESTADO 3 · PASA EL TIEMPO · CLIENTES POTENCIALES

**Móvil**: feed + anuncio (igual que estado 2), pero ahora con **notificaciones que se asoman desde arriba**:
- Banner notificación deslizándose: avatar verde WhatsApp + "María Sánchez" + texto preview "Vi tu anuncio, ¿puedes valorarme..."
- Otro banner debajo (puede estar parcialmente oculto): "Carlos Ruiz · Necesito vender mi piso..."
- Pequeño badge rojo con "3" en la esquina del icono WhatsApp imaginario
- Estos banners dan sensación de "están llegando mensajes"

**Panel central (EMBUDO)**:
- Ambas fuentes encendidas
- Embudo **lleno de personas descendiendo** (15-20 iconos visibles bajando)
- Contador clientes potenciales: **28**
- Alrededor del contador: pequeños puntitos ámbar `#fbbf24` representando los leads que ya salieron del embudo
- Línea anuncios: contador actualizado "35€ esta semana"

**Métricas**:
- Inversión: 35€
- Personas que ven tu anuncio: 4.500
- Clientes potenciales: 28
- Exclusivas: 0
- Cobrado: 0€

**Botones**: 3 activo, 4 próximo, 0-2 completados.

---

### ESTADO 4 · FIRMA EXCLUSIVA

**Móvil**: pantalla de **llamada entrante estilo iOS**:
- Fondo: gradiente vertical verde esmeralda oscuro `#064e3b` arriba → `#1a1a1a` abajo
- Centro: avatar circular grande (96x96) blanco/10% con icono teléfono minimalista
- "LLAMADA ENTRANTE" en blanco/70% uppercase tracking pequeño
- **"María, propietaria"** en blanco bold 18px
- Subtexto en verde claro `#a7f3d0`: *"Quiero firmar la exclusiva"*
- Abajo: 2 botones circulares (rojo "✕" + verde "✓") tipo iOS, 48x48

**Panel central** — CAMBIO A MODO MAPA (vista ciudad Alicante):
- Grid sutil de calles abstracto al fondo
- Tu punto rojo central con etiqueta "TÚ"
- Los 28 puntos ámbar todavía visibles (algunos atenuados al 30%)
- **Pin nuevo verde "EXCLUSIVA"** ligeramente offset del centro: cápsula verde + triángulo descendente + icono casa SVG outline + "300.000€ · 4% honorarios" debajo

**Métricas**:
- Inversión: 35€
- Personas: 4.500
- Clientes potenciales: 28
- **Exclusivas firmadas: 1** (con hint "Inmueble en tu cartera")
- Cobrado: 0€

**Botones**: 4 activo, 5 próximo, 0-3 completados.

---

### ESTADO 5 · ACTIVAR RIC

**Móvil**: pantalla "en reposo" — fondo `#1a1a1a` casi vacío. Quizás solo la status bar arriba con la hora. Da sensación de "ya está el trabajo del embudo hecho, ahora el negocio sucede en la red".

**Panel central (MAPA España)**:
- Mapa España premium (especificaciones de la sección 5)
- 8 puntos verdes esmeralda en ciudades principales
- Tu pin de Alicante destacado en rojo "TU EXCLUSIVA"
- Murcia matched con punto rojo y etiqueta "MURCIA"
- Línea trazada roja Alicante → Murcia

**Métricas**: igual que estado 4.

**Botones**: 5 activo, 6 próximo, 0-4 completados.

---

### ESTADO 6 · VENTA CERRADA

**Móvil**: similar al estado 5 (en reposo). Opcional: pequeño checkmark verde central muy discreto.

**Panel central (MAPA España)**:
- Mapa igual al estado 5
- **Diferencia**: tu pin Alicante cambia de "TU EXCLUSIVA" (rojo) a **"VENDIDA"** (verde `#10b981`)
- La línea de conexión sigue trazada

**Métricas**:
- Inversión: 35€
- Personas: 4.500
- Clientes potenciales: 28
- Exclusivas: 1
- **Cobrado: 6.000€** (CARD DESTACADA: fondo gradient red/20% → red/5%, borde rojo/40%, cifra rojo bold display XXL, hint en rojo bold: *"Comisión total 12.000€ — repartida 50/50 con tu compañero RIC"*)

**Botones**: 6 activo, 0-5 completados.

**Confetti**: NO lo dibujes, lo añado yo con JS. Espacio mental: el énfasis es la card "Cobrado".

---

## DETALLES VISUALES IMPORTANTES

### Tu punto rojo (el "TÚ") en el mapa
- Círculo `#fa5659` 12x12
- Glow exterior rojo `box-shadow: 0 0 12px rgba(250, 86, 89, 0.6)`
- En vista ciudad: etiqueta "TÚ" debajo en rojo bold 10px

### Puntos de clientes potenciales (28 dots ámbar)
- Círculo `#fbbf24` 8x8
- Glow suave ámbar
- Posicionados de forma orgánica, no en grid

### Personas dentro del embudo
- Iconos pequeños tipo silueta circular abstracta (NO emoji)
- Color azul cool `#60a5fa` con opacidad 70%
- Tamaño: 14-18px
- Distribuidas dentro del trapezoide del embudo de forma natural (escalonadas, no en columna recta)

### Pin de exclusiva (vista ciudad o mapa)
- Cápsula verde `#10b981` con texto bold uppercase
- Pequeño triángulo descendente (estilo Google Maps)
- Icono casa SVG outline limpio
- Cifra debajo en gris/60%

### Línea RIC
- Stroke rojo `#fa5659` 2px
- Stroke-dasharray (línea discontinua tipo "2,1")
- Desde Alicante hasta Murcia

### Card "Cobrado" destacada (estado 6)
- Fondo: gradiente lineal `rgba(250,86,89,0.2)` arriba → `rgba(250,86,89,0.05)` abajo
- Borde 1px `rgba(250,86,89,0.4)`
- Cifra "6.000€" en rojo, display XXL, bold 900
- Hint en rojo `#fa5659` peso 600 (no muted)

### Fuentes del embudo (CONTENIDO y ANUNCIOS)
- Card 140x140px aprox
- **Apagada**: fondo `rgba(255,255,255,0.02)`, borde white/10%, opacidad 40%, texto blanco/30%
- **Encendida**: fondo `rgba(255,255,255,0.04)`, borde rojo/40%, ligero glow rojo exterior, opacidad 100%, texto blanco
- Transición sutil entre estados (lo animo yo después)

### Notificaciones del móvil (estado 3)
- Banners deslizando desde arriba
- Fondo: `rgba(20,20,20,0.95)` con backdrop-blur
- Borde: 1px white/10%, radius 12px
- Avatar circular pequeño (verde WhatsApp icon)
- Nombre del remitente en blanco bold 11px
- Preview del mensaje en blanco/60% 10px (truncado)
- Hora pequeña a la derecha "ahora" en blanco/40%

---

## CÓMO ENTREGAR EL HTML

Una sola página HTML que muestre los 7 estados apilados verticalmente, cada uno como un bloque 1920x1080. El usuario hace scroll para ver cada estado.

Entre estados, separador discreto con etiqueta "ESTADO N · NOMBRE".

Clases CSS semánticas que pueda mapear directo a componentes React:

- `.simulator-screen` — wrapper de cada estado
- `.panel--phone`, `.panel--center`, `.panel--metrics` — los 3 paneles
- `.panel--center.mode-funnel`, `.panel--center.mode-map` — modos del panel central
- `.phone-frame`, `.phone-screen`, `.feed-grid`, `.feed-post`, `.ad-overlay`, `.call-screen`, `.notification-banner`
- `.funnel`, `.funnel-source`, `.funnel-source--content`, `.funnel-source--ads`, `.funnel-source--off`, `.funnel-source--on`, `.funnel-shape`, `.funnel-person`, `.funnel-output`, `.funnel-counter`, `.funnel-line`
- `.map-city`, `.map-spain`, `.map-pin`, `.map-pin--you`, `.map-pin--lead`, `.map-pin--exclusiva`, `.map-pin--ric-agent`, `.map-line--ric`, `.map-silhouette`
- `.metric-card`, `.metric-card--highlight`
- `.button-bar`, `.button-step`, `.button-step--active`, `.button-step--done`, `.button-step--next`

No uses Tailwind. CSS clásico con BEM o similar. Variables CSS para colores en `:root`.

---

## REFERENCIAS DE ESTILO

**Inspiraciones**:
- Bloomberg Terminal (densidad + clarity)
- Linear app (paleta oscura premium, tipografía)
- Apple Vision Pro UI (sutileza, glass)
- iA Writer (minimal, tipográfico)
- Stripe Dashboard (cards con métricas)
- Mapbox dark theme (mapas)

**Anti-referencias**:
- Dashboards de Hotmart, ClickFunnels
- Plantillas Canva genéricas
- UI de videojuego arcade (queremos premium, no gamer)
- Marketing tools con emojis grandes y colores chillones
- Diagramas de embudo de PowerPoint tradicional (triángulo con etiquetas TOFU/MOFU/BOFU — eso NO)

---

## TONO FINAL

Frío, premium, sobrio, denso. La gente debe sentir que está viendo una herramienta seria de profesional, no un juguete. Cada cifra debe tener peso visual. Cada panel debe respirar.

El embudo es el corazón visual del simulador. Debe sentirse vivo cuando está activo. Las dos fuentes (contenido + anuncios) deben quedar claramente diferenciadas pero coherentes entre sí. Cuando se enciende algo, debe notarse el cambio claramente.

Si dudas entre añadir o quitar, quita.

---

## OUTPUT ESPERADO

Un archivo HTML completo, ~2000-3000 líneas, con:
- `<head>` con Montserrat de Google Fonts
- `:root` con variables de color
- CSS limpio con clases semánticas BEM
- 7 secciones `.simulator-screen` apiladas
- Sin JavaScript

Si tienes dudas sobre algún estado o componente, pregunta antes de improvisar.
