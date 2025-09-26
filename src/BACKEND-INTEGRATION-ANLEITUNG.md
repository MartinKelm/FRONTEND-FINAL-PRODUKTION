# 🚀 BACKEND-INTEGRATION ANLEITUNG

## 📋 ÜBERSICHT

Diese Anleitung erklärt, wie Sie das erweiterte Backend deployen und das Frontend korrekt mit der API verbinden.

## 🔧 BACKEND-DEPLOYMENT

### **1. Backend-Dateien aktualisieren**

Die folgenden Dateien wurden erweitert und müssen in Ihr Railway-Backend eingespielt werden:

#### **Prisma Schema aktualisieren:**
```bash
# Ersetzen Sie prisma/schema.prisma mit der erweiterten Version
cp prisma/schema-updated.prisma prisma/schema.prisma
```

#### **Validierung aktualisieren:**
```bash
# Ersetzen Sie lib/validation.js mit der erweiterten Version
cp lib/validation-updated.js lib/validation.js
```

#### **Auth-Routes aktualisieren:**
```bash
# Ersetzen Sie routes/auth.js mit der erweiterten Version
cp routes/auth-updated.js routes/auth.js
```

### **2. Datenbank-Migration**

Nach dem Update der Schema-Datei:

```bash
# Prisma-Migration erstellen und ausführen
npx prisma migrate dev --name add_company_fields
npx prisma generate
```

### **3. Railway-Deployment**

```bash
# Code zu Railway pushen
git add .
git commit -m "Add company information fields to registration"
git push origin main
```

## 🌐 FRONTEND-INTEGRATION

### **1. Environment-Variablen konfigurieren**

Erstellen Sie eine `.env` Datei im Frontend-Root:

```bash
# .env
REACT_APP_API_URL=https://IHR-BACKEND-URL.railway.app/api
```

**Beispiel:**
```bash
REACT_APP_API_URL=https://socialmedia-backend-production.railway.app/api
```

### **2. Registrierung auf API umstellen**

Ersetzen Sie in `src/App.jsx` die localStorage-basierte Registrierung:

```javascript
// Alte Komponente ersetzen
import TwoStepRegistration from './components/Auth/TwoStepRegistration'
// Mit neuer API-Komponente
import TwoStepRegistrationAPI from './components/Auth/TwoStepRegistrationAPI'
```

### **3. Login auf API umstellen**

Aktualisieren Sie die Login-Logik in `src/App.jsx`:

```javascript
import apiService from './services/api'

// Login-Handler aktualisieren
const handleLogin = async (credentials) => {
  try {
    const response = await apiService.login(credentials)
    if (response.success) {
      setCurrentUser(response.data.user)
      setIsAuthenticated(true)
      // ... weitere Login-Logik
    }
  } catch (error) {
    // Fehlerbehandlung
  }
}
```

## 🔐 ADMIN-FUNKTIONALITÄT

### **Backend-Admin-Routes erweitern**

Fügen Sie in `routes/users.js` Admin-Funktionen hinzu:

```javascript
// Alle Benutzer abrufen (nur für Admins)
router.get('/', authenticateToken, requireAdmin, async (req, res) => {
  const users = await prisma.user.findMany({
    select: {
      id: true,
      firstName: true,
      lastName: true,
      email: true,
      companyName: true,
      industry: true,
      phone: true,
      address: true,
      postalCode: true,
      city: true,
      role: true,
      isActive: true,
      createdAt: true
    }
  })
  res.json({ success: true, data: users })
})
```

### **Frontend-Admin-Integration**

Aktualisieren Sie `src/components/Admin/UserManagement.jsx`:

```javascript
import apiService from '../../services/api'

// Benutzer von API laden
const loadUsers = async () => {
  try {
    const response = await apiService.getAllUsers()
    setUsers(response.data)
  } catch (error) {
    console.error('Error loading users:', error)
  }
}
```

## ✅ TESTING-CHECKLISTE

### **Backend-Tests:**
- [ ] Health-Check: `GET /api/health`
- [ ] Registrierung: `POST /api/auth/register`
- [ ] Login: `POST /api/auth/login`
- [ ] Benutzer abrufen: `GET /api/auth/me`

### **Frontend-Tests:**
- [ ] Registrierung mit allen Pflichtfeldern
- [ ] Login mit registriertem Benutzer
- [ ] Admin-Login und Benutzerverwaltung
- [ ] Fehlerbehandlung bei API-Fehlern

## 🚨 WICHTIGE HINWEISE

### **Umgebungsvariablen:**
Stellen Sie sicher, dass folgende Variablen in Railway gesetzt sind:
- `DATABASE_URL` (Neon-Datenbank)
- `JWT_SECRET` (für Token-Generierung)
- `NODE_ENV=production`

### **CORS-Konfiguration:**
Das Backend ist bereits für Cross-Origin-Requests konfiguriert.

### **Datenbank-Backup:**
Erstellen Sie vor der Migration ein Backup Ihrer Neon-Datenbank.

## 📞 SUPPORT

Bei Problemen:
1. Überprüfen Sie die Railway-Logs
2. Testen Sie die API-Endpoints mit Postman
3. Überprüfen Sie die Browser-Konsole für Frontend-Fehler

**Nach erfolgreicher Integration haben Sie eine vollständig funktionale Anwendung mit echter Datenbank-Anbindung!**
