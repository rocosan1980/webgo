# WebGo

Plataforma de servicios web ágiles para landing pages profesionales de alta conversión.

**Sitio:** [webgo.lat](https://webgo.lat)

## Stack

- Next.js (App Router)
- TypeScript
- Tailwind CSS

## Desarrollo

```bash
npm install
npm run dev
```

Abre [http://localhost:3000](http://localhost:3000).

## Scripts

| Comando | Descripción |
| --- | --- |
| `npm run dev` | Servidor de desarrollo |
| `npm run build` | Build de producción |
| `npm run start` | Servir build de producción |
| `npm run lint` | ESLint |

## Estructura

```
src/
  app/                 # Rutas App Router + API
  components/          # Secciones de la landing
  lib/                 # Validaciones y utilidades
```

El endpoint `POST /api/contact` valida y recibe leads del formulario de contacto, listo para conectar con CRM, email o WhatsApp.
