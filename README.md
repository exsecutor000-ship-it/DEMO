# DataCAF — Portal de Datos Abiertos

Portal web estático de datos abiertos inspirado en [data.gov.sg](https://data.gov.sg/), construido para CAF - Banco de Desarrollo de América Latina y el Caribe.

## Tecnologías
- HTML5 + CSS3 vanilla (sin frameworks)
- JavaScript ES6+ vanilla
- Google Fonts (Inter + Outfit)
- GitHub Pages (deploy automático)

## Estructura
```
/
├── index.html          # Homepage
├── datasets.html       # Catálogo con búsqueda y filtros
├── about.html          # Acerca del portal
├── assets/
│   ├── css/            # Design system, componentes, animaciones
│   ├── js/             # Lógica principal, datos, animaciones
│   └── img/            # Logo SVG, favicon
├── datasets/
│   └── data.json       # Metadatos del catálogo
└── .github/
    └── workflows/
        └── deploy.yml  # Auto-deploy a GitHub Pages
```

## Deploy en GitHub Pages

1. Crea un repositorio público en GitHub
2. Sube el código: `git push origin main`
3. Ve a **Settings → Pages → Source** → selecciona rama `gh-pages`
4. Tu sitio estará disponible en `https://<usuario>.github.io/<repo>/`

## Preview local
```bash
python -m http.server 8080
# Abre http://localhost:8080
```

## Licencia
Datos publicados bajo Licencia de Datos Abiertos CAF. Código bajo MIT License.
