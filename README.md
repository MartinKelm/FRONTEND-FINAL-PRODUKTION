# Social Media Kampagnen - Frontend

Dies ist das Frontend für die Social Media Kampagnen Plattform.

## Installation

```bash
npm install
```

## Entwicklung

```bash
npm run dev
```

## Build für Produktion

```bash
npm run build
```

## Konfiguration

Die API-URL wird über die Umgebungsvariable `VITE_API_BASE_URL` in der `.env` Datei konfiguriert.

## Deployment

Das Frontend kann auf Vercel, Netlify oder anderen Static-Hosting-Plattformen deployed werden.

### Vercel Deployment

1. Repository zu Vercel verbinden
2. Build Command: `npm run build`
3. Output Directory: `dist`
4. Umgebungsvariablen setzen:
   - `VITE_API_BASE_URL=https://backend.socialmediakampagnen.com/api`

## Features

- Benutzerregistrierung und -anmeldung
- Dashboard für Kampagnenmanagement
- Responsive Design
- Mehrsprachige Unterstützung (Deutsch/Englisch)
- Moderne UI mit Tailwind CSS
