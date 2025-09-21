import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card'
import { Badge } from '../ui/badge'
import { Shield, Eye, Lock, Database, UserCheck, AlertCircle } from 'lucide-react'

const PrivacyPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 py-12 px-4 sm:px-6">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-6">
            <Shield className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            Datenschutzerklärung
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Informationen zur Verarbeitung Ihrer personenbezogenen Daten gemäß DSGVO
          </p>
          <Badge className="bg-purple-100 text-purple-800 mt-4">
            Letzte Aktualisierung: 21. September 2025
          </Badge>
        </div>

        {/* Introduction */}
        <Card className="shadow-lg border-0 bg-white mb-8">
          <CardHeader>
            <CardTitle className="flex items-center text-xl text-gray-900">
              <Eye className="w-6 h-6 mr-3 text-purple-600" />
              Einleitung
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-700 leading-relaxed">
              Der Schutz Ihrer persönlichen Daten ist uns wichtig. Diese Datenschutzerklärung 
              informiert Sie über die Art, den Umfang und den Zweck der Verarbeitung 
              personenbezogener Daten auf unserer Website socialmediakampagnen.com und 
              in unserer Plattform. Diese Datenschutzerklärung entspricht den Anforderungen 
              der Datenschutz-Grundverordnung (DSGVO) und dem Bundesdatenschutzgesetz (BDSG).
            </p>
          </CardContent>
        </Card>

        {/* Controller Information */}
        <Card className="shadow-lg border-0 bg-white mb-8">
          <CardHeader>
            <CardTitle className="flex items-center text-xl text-gray-900">
              <UserCheck className="w-6 h-6 mr-3 text-blue-600" />
              1. Verantwortlicher
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h3 className="font-semibold text-gray-900 mb-2">Verantwortlicher im Sinne der DSGVO</h3>
              <p className="text-gray-700">
                SocialMediaKampagnen GmbH<br />
                Musterstraße 123<br />
                10115 Berlin<br />
                Deutschland
              </p>
              <p className="text-gray-700 mt-2">
                E-Mail: <a href="mailto:privacy@socialmediakampagnen.com" className="text-blue-600 hover:underline">privacy@socialmediakampagnen.com</a><br />
                Telefon: +49 (0) 30 12345678
              </p>
            </div>
            
            <div>
              <h3 className="font-semibold text-gray-900 mb-2">Datenschutzbeauftragter</h3>
              <p className="text-gray-700">
                Bei Fragen zum Datenschutz können Sie sich an unseren Datenschutzbeauftragten wenden:<br />
                E-Mail: <a href="mailto:dpo@socialmediakampagnen.com" className="text-blue-600 hover:underline">dpo@socialmediakampagnen.com</a>
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Data Collection */}
        <Card className="shadow-lg border-0 bg-white mb-8">
          <CardHeader>
            <CardTitle className="flex items-center text-xl text-gray-900">
              <Database className="w-6 h-6 mr-3 text-green-600" />
              2. Erhebung und Verarbeitung personenbezogener Daten
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <h3 className="font-semibold text-gray-900 mb-3">2.1 Registrierung und Nutzerkonto</h3>
              <div className="bg-gray-50 p-4 rounded-lg">
                <h4 className="font-medium text-gray-900 mb-2">Erhobene Daten:</h4>
                <ul className="text-gray-700 space-y-1 ml-4">
                  <li>• Vor- und Nachname</li>
                  <li>• E-Mail-Adresse</li>
                  <li>• Passwort (verschlüsselt gespeichert)</li>
                  <li>• Firmenname und Branche</li>
                  <li>• Telefonnummer (optional)</li>
                  <li>• Firmenadresse (optional)</li>
                </ul>
                <p className="text-gray-700 mt-3">
                  <strong>Rechtsgrundlage:</strong> Art. 6 Abs. 1 lit. b DSGVO (Vertragserfüllung)<br />
                  <strong>Zweck:</strong> Bereitstellung der Plattform-Services, Kundensupport
                </p>
              </div>
            </div>

            <div>
              <h3 className="font-semibold text-gray-900 mb-3">2.2 Kampagnendaten</h3>
              <div className="bg-gray-50 p-4 rounded-lg">
                <h4 className="font-medium text-gray-900 mb-2">Erhobene Daten:</h4>
                <ul className="text-gray-700 space-y-1 ml-4">
                  <li>• Kampagneninhalte und -einstellungen</li>
                  <li>• Zielgruppen-Definitionen</li>
                  <li>• Budget- und Zeitplan-Informationen</li>
                  <li>• Performance-Metriken</li>
                </ul>
                <p className="text-gray-700 mt-3">
                  <strong>Rechtsgrundlage:</strong> Art. 6 Abs. 1 lit. b DSGVO (Vertragserfüllung)<br />
                  <strong>Zweck:</strong> Kampagnenerstellung und -optimierung
                </p>
              </div>
            </div>

            <div>
              <h3 className="font-semibold text-gray-900 mb-3">2.3 Technische Daten</h3>
              <div className="bg-gray-50 p-4 rounded-lg">
                <h4 className="font-medium text-gray-900 mb-2">Automatisch erhobene Daten:</h4>
                <ul className="text-gray-700 space-y-1 ml-4">
                  <li>• IP-Adresse</li>
                  <li>• Browser-Typ und -Version</li>
                  <li>• Betriebssystem</li>
                  <li>• Zugriffszeitpunkt</li>
                  <li>• Referrer-URL</li>
                </ul>
                <p className="text-gray-700 mt-3">
                  <strong>Rechtsgrundlage:</strong> Art. 6 Abs. 1 lit. f DSGVO (berechtigtes Interesse)<br />
                  <strong>Zweck:</strong> Sicherheit, Fehleranalyse, Systemoptimierung
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Cookies */}
        <Card className="shadow-lg border-0 bg-white mb-8">
          <CardHeader>
            <CardTitle className="flex items-center text-xl text-gray-900">
              <Lock className="w-6 h-6 mr-3 text-orange-600" />
              3. Cookies und Tracking
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h3 className="font-semibold text-gray-900 mb-2">3.1 Notwendige Cookies</h3>
              <p className="text-gray-700">
                Wir verwenden technisch notwendige Cookies für die Funktionsfähigkeit der Plattform, 
                wie Session-Management und Sicherheitsfeatures. Diese Cookies können nicht deaktiviert werden.
              </p>
            </div>
            
            <div>
              <h3 className="font-semibold text-gray-900 mb-2">3.2 Analytics Cookies</h3>
              <p className="text-gray-700">
                Mit Ihrer Einwilligung verwenden wir Analytics-Tools zur Verbesserung unserer Services. 
                Sie können diese Cookies in den Einstellungen deaktivieren.
              </p>
            </div>

            <div>
              <h3 className="font-semibold text-gray-900 mb-2">3.3 Cookie-Einstellungen</h3>
              <p className="text-gray-700">
                Sie können Ihre Cookie-Präferenzen jederzeit in den Kontoeinstellungen ändern oder 
                über den Cookie-Banner auf unserer Website verwalten.
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Data Sharing */}
        <Card className="shadow-lg border-0 bg-white mb-8">
          <CardHeader>
            <CardTitle className="flex items-center text-xl text-gray-900">
              <AlertCircle className="w-6 h-6 mr-3 text-red-600" />
              4. Weitergabe von Daten
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h3 className="font-semibold text-gray-900 mb-2">4.1 Social Media Plattformen</h3>
              <p className="text-gray-700">
                Zur Ausführung Ihrer Kampagnen übertragen wir notwendige Daten an die jeweiligen 
                Social Media Plattformen (Facebook, Instagram, TikTok, etc.). Dies erfolgt nur 
                mit Ihrer ausdrücklichen Einwilligung und im Rahmen der Vertragserfüllung.
              </p>
            </div>
            
            <div>
              <h3 className="font-semibold text-gray-900 mb-2">4.2 Dienstleister</h3>
              <p className="text-gray-700">
                Wir arbeiten mit sorgfältig ausgewählten Dienstleistern zusammen (Hosting, 
                Payment, Support). Diese sind vertraglich zur Einhaltung des Datenschutzes 
                verpflichtet und verarbeiten Daten nur in unserem Auftrag.
              </p>
            </div>

            <div>
              <h3 className="font-semibold text-gray-900 mb-2">4.3 Rechtliche Verpflichtungen</h3>
              <p className="text-gray-700">
                In besonderen Fällen können wir zur Weitergabe von Daten verpflichtet sein, 
                etwa bei behördlichen Anfragen oder zur Rechtsdurchsetzung.
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Data Security */}
        <Card className="shadow-lg border-0 bg-white mb-8">
          <CardHeader>
            <CardTitle className="flex items-center text-xl text-gray-900">
              <Shield className="w-6 h-6 mr-3 text-green-600" />
              5. Datensicherheit
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h3 className="font-semibold text-gray-900 mb-2">5.1 Technische Maßnahmen</h3>
              <ul className="text-gray-700 space-y-2 ml-4">
                <li>• SSL/TLS-Verschlüsselung für alle Datenübertragungen</li>
                <li>• Verschlüsselte Speicherung sensibler Daten</li>
                <li>• Regelmäßige Sicherheitsupdates und Patches</li>
                <li>• Firewalls und Intrusion Detection Systeme</li>
                <li>• Regelmäßige Backups mit Verschlüsselung</li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-semibold text-gray-900 mb-2">5.2 Organisatorische Maßnahmen</h3>
              <ul className="text-gray-700 space-y-2 ml-4">
                <li>• Zugriffskontrolle und Berechtigungsmanagement</li>
                <li>• Schulung der Mitarbeiter im Datenschutz</li>
                <li>• Regelmäßige Sicherheitsaudits</li>
                <li>• Incident Response Verfahren</li>
              </ul>
            </div>
          </CardContent>
        </Card>

        {/* User Rights */}
        <Card className="shadow-lg border-0 bg-white mb-8">
          <CardHeader>
            <CardTitle className="flex items-center text-xl text-gray-900">
              <UserCheck className="w-6 h-6 mr-3 text-blue-600" />
              6. Ihre Rechte
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h3 className="font-semibold text-gray-900 mb-2">Sie haben folgende Rechte bezüglich Ihrer Daten:</h3>
              <ul className="text-gray-700 space-y-2 ml-4">
                <li>• <strong>Auskunftsrecht (Art. 15 DSGVO):</strong> Information über verarbeitete Daten</li>
                <li>• <strong>Berichtigungsrecht (Art. 16 DSGVO):</strong> Korrektur unrichtiger Daten</li>
                <li>• <strong>Löschungsrecht (Art. 17 DSGVO):</strong> Löschung Ihrer Daten unter bestimmten Voraussetzungen</li>
                <li>• <strong>Einschränkungsrecht (Art. 18 DSGVO):</strong> Einschränkung der Verarbeitung</li>
                <li>• <strong>Datenübertragbarkeit (Art. 20 DSGVO):</strong> Übertragung Ihrer Daten in strukturiertem Format</li>
                <li>• <strong>Widerspruchsrecht (Art. 21 DSGVO):</strong> Widerspruch gegen die Verarbeitung</li>
                <li>• <strong>Widerruf der Einwilligung:</strong> Jederzeit möglich für einwilligungsbasierte Verarbeitungen</li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-semibold text-gray-900 mb-2">Ausübung Ihrer Rechte</h3>
              <p className="text-gray-700">
                Zur Ausübung Ihrer Rechte wenden Sie sich bitte an:{' '}
                <a href="mailto:privacy@socialmediakampagnen.com" className="text-blue-600 hover:underline">
                  privacy@socialmediakampagnen.com
                </a>
              </p>
              <p className="text-gray-700 mt-2">
                Sie haben außerdem das Recht, sich bei einer Datenschutz-Aufsichtsbehörde zu beschweren.
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Data Retention */}
        <Card className="shadow-lg border-0 bg-white mb-8">
          <CardHeader>
            <CardTitle className="flex items-center text-xl text-gray-900">
              <Database className="w-6 h-6 mr-3 text-purple-600" />
              7. Speicherdauer
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h3 className="font-semibold text-gray-900 mb-2">7.1 Allgemeine Grundsätze</h3>
              <p className="text-gray-700">
                Wir speichern Ihre Daten nur so lange, wie es für die jeweiligen Zwecke 
                erforderlich ist oder gesetzliche Aufbewahrungsfristen bestehen.
              </p>
            </div>
            
            <div>
              <h3 className="font-semibold text-gray-900 mb-2">7.2 Spezifische Fristen</h3>
              <ul className="text-gray-700 space-y-2 ml-4">
                <li>• <strong>Kontodaten:</strong> Bis zur Löschung des Kontos + 30 Tage</li>
                <li>• <strong>Kampagnendaten:</strong> Bis zur Löschung durch den Nutzer oder Kontoschließung</li>
                <li>• <strong>Rechnungsdaten:</strong> 10 Jahre (steuerrechtliche Aufbewahrungspflicht)</li>
                <li>• <strong>Log-Dateien:</strong> 90 Tage</li>
                <li>• <strong>Support-Kommunikation:</strong> 3 Jahre</li>
              </ul>
            </div>
          </CardContent>
        </Card>

        {/* Changes */}
        <Card className="shadow-lg border-0 bg-white mb-8">
          <CardHeader>
            <CardTitle className="flex items-center text-xl text-gray-900">
              <AlertCircle className="w-6 h-6 mr-3 text-yellow-600" />
              8. Änderungen der Datenschutzerklärung
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-700">
              Wir behalten uns vor, diese Datenschutzerklärung zu aktualisieren, um sie an 
              geänderte Rechtslage oder Änderungen unserer Services anzupassen. Die aktuelle 
              Version finden Sie stets auf unserer Website. Bei wesentlichen Änderungen 
              informieren wir Sie per E-Mail.
            </p>
          </CardContent>
        </Card>

        {/* Contact Information */}
        <div className="text-center">
          <p className="text-sm text-gray-500 mb-2">
            Bei Fragen zum Datenschutz wenden Sie sich bitte an:
          </p>
          <p className="text-sm text-gray-600">
            <a href="mailto:privacy@socialmediakampagnen.com" className="text-blue-600 hover:underline">
              privacy@socialmediakampagnen.com
            </a>
          </p>
        </div>
      </div>
    </div>
  )
}

export default PrivacyPage
