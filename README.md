# Portafolio - Roycer Cervantes

Portafolio web para ofrecer páginas y aplicaciones a negocios en Santa Marta.

## Estructura

```
portafolio/
├── index.html          Página principal
├── css/
│   └── styles.css      Estilos
├── js/
│   └── main.js         Interacciones y datos de los proyectos
└── img/
    ├── favicon.svg
    └── shots/          Capturas reales de cada proyecto
        ├── <proyecto>-desk.jpg   Página completa en computador
        ├── <proyecto>-mob.jpg    Página completa en celular
        └── <proyecto>-card.jpg   Vista para las tarjetas del inicio
```

## Secciones

1. Inicio con tarjetas de los proyectos
2. Proyectos: visor interactivo (computador / celular, deslizable)
3. Servicios por tipo de negocio
4. Arma tu página: arma la idea y la envía por WhatsApp
5. Proceso y sobre mí
6. Contacto

## Cómo editar

- Textos: `index.html`
- Proyectos (nombre, descripción, enlaces): objeto `PROJECTS` al inicio de `js/main.js`
- Colores y fuentes: variables al inicio de `css/styles.css` (`--accent` es el naranja)
- Capturas: reemplazar los archivos de `img/shots/` con el mismo nombre
- Número de WhatsApp: buscar `573154930657` en `index.html` y `js/main.js`

## Publicar

Es un sitio estático (sin servidor ni base de datos). Se puede subir tal cual:

- **Hosting con administrador de archivos:** subir el contenido de la carpeta a `public_html`.
- **Vercel o GitHub Pages:** subir la carpeta a un repositorio y conectarlo; no necesita build.
