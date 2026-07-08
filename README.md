# Fisio Valee — Sitio web de Valeria Ponce

Sitio de una página para fisioterapia, con scroll suave (Lenis + GSAP),
animaciones de entrada, fondo animado y reserva de citas con Calendly.

## Cómo verlo

```bash
python3 -m http.server 8000
# Abre http://localhost:8000
```

## Estructura

```
fisio-valee/
├── index.html      Página principal (hero, sobre mí, servicios, proceso, agenda, contacto)
├── styles.css      Estilos (paleta verde salvia/teal + crema)
├── script.js       Scroll mantequilla, reveals y fondo animado
├── libs/           gsap, ScrollTrigger, lenis (locales, sin CDN)
└── img/            Coloca aquí tus fotos
```

## Configurar Calendly (reserva de citas)

1. Crea tu cuenta gratis en https://calendly.com
2. Crea un tipo de evento (ej. "Consulta de valoración · 60 min")
3. Copia la liga del evento, por ejemplo: `https://calendly.com/fisiovalee/consulta`
4. En `index.html`, busca `CALENDLY` y reemplaza en `data-url`:

```html
<div class="calendly-inline-widget"
     data-url="https://calendly.com/fisiovalee/consulta?hide_gdpr_banner=1&primary_color=4a8f80"
     ...>
```

El color `4a8f80` es el teal del sitio, para que el widget combine.

## Personalizar

- **Foto del hero:** dentro de `.portrait-ring` reemplaza el div placeholder por
  `<img src="img/valeria.jpg" alt="Valeria Ponce">`
- **Foto de Sobre mí:** dentro de `.about-card` reemplaza el placeholder por
  `<img src="img/consultorio.jpg" alt="Consultorio">`
- **Colores:** todos en `:root` de `styles.css` (`--teal`, `--sage`, `--rose`...)
- **WhatsApp:** puedes agregar un enlace `https://wa.me/52XXXXXXXXXX` donde gustes

## Redes ya enlazadas

- Instagram profesional: https://www.instagram.com/fisio.valee
- Facebook: https://www.facebook.com/fisiovalee/
- Instagram personal: https://www.instagram.com/vale.ch11

## Publicar gratis

- **GitHub Pages:** sube la carpeta a un repo → Settings → Pages → rama main
- **Netlify:** arrastra la carpeta en https://app.netlify.com/drop
