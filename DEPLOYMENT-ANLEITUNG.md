# Deployment Anleitung

## 🚀 Schnellstart

### 1. Repository Setup
```bash
# Projekt klonen oder ZIP entpacken
cd smk-final

# Dependencies installieren
npm install
```

### 2. Lokale Entwicklung
```bash
# Development Server starten
npm run dev

# Öffne http://localhost:5173
```

### 3. Production Build
```bash
# Production Build erstellen
npm run build

# Build testen
npm run preview
```

## 📁 Projektstruktur

```
smk-final/
├── src/
│   ├── components/
│   │   ├── Auth/
│   │   │   ├── CleanRegistration.jsx     # Hauptregistrierung
│   │   │   ├── LoginForm.jsx
│   │   │   └── ...
│   │   ├── ui/                           # UI Komponenten
│   │   └── ...
│   ├── App.jsx                           # Hauptanwendung
│   ├── App.css                           # Styles
│   └── main.jsx
├── public/
├── package.json
└── vite.config.js
```

## 🔧 Konfiguration

### Vite Konfiguration
Die `vite.config.js` ist bereits für Production optimiert.

### Environment Variables
Keine speziellen Environment Variables erforderlich.

### Tailwind CSS
Tailwind CSS ist bereits konfiguriert und einsatzbereit.

## 🌐 Deployment Optionen

### Vercel (Empfohlen)
```bash
# Vercel CLI installieren
npm i -g vercel

# Deployen
vercel
```

### Netlify
1. ZIP-Datei auf Netlify hochladen
2. Build Command: `npm run build`
3. Publish Directory: `dist`

### Traditioneller Webserver
```bash
# Build erstellen
npm run build

# dist/ Ordner auf Server hochladen
```

## ✅ Checkliste vor Deployment

- [ ] `npm install` erfolgreich
- [ ] `npm run dev` funktioniert
- [ ] Registrierung getestet
- [ ] `npm run build` ohne Fehler
- [ ] `npm run preview` funktioniert
- [ ] Alle Links funktional

## 🐛 Troubleshooting

### Build Fehler
```bash
# Cache löschen
rm -rf node_modules package-lock.json
npm install
```

### Styling Probleme
- Tailwind CSS ist konfiguriert
- Alle Styles sind in den Komponenten definiert

### Routing Probleme
- React Router ist konfiguriert
- Alle Routen sind in App.jsx definiert

## 📞 Support

Bei Problemen:
1. Konsole auf Fehler prüfen
2. Network Tab im Browser prüfen
3. Build-Logs überprüfen
