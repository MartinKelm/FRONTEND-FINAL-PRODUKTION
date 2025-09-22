import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card'
import { Shield, Database, Share2, Lock, AlertCircle, Eye, FileText } from 'lucide-react'

const PrivacyPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 pt-24 pb-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <div className="flex justify-center mb-6">
            <div className="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center">
              <Shield className="w-8 h-8 text-white" />
            </div>
          </div>
          <h1 className="text-4xl font-bold text-white mb-4">
            Datenschutzerklärung
          </h1>
          <p className="text-xl text-white/80">
            socialmediakampagnen.com
          </p>
          <p className="text-white/60 mt-2">Stand: Dezember 2024</p>
        </div>

        <Card className="bg-white/95 backdrop-blur-sm shadow-2xl">
          <CardContent className="p-8 space-y-8">
            
            {/* 1. Verantwortlicher */}
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
                <Shield className="w-6 h-6 mr-3 text-purple-600" />
                1. Verantwortlicher
              </h2>
              
              <p className="text-gray-700 mb-4">
                Verantwortlicher im Sinne der Datenschutz-Grundverordnung (DSGVO) ist:
              </p>
              
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="font-semibold">Martin Kelm</p>
                <p>Im Weidenblech 25</p>
                <p>51371 Leverkusen</p>
                <p>E-Mail: info@socialmediakampagnen.com</p>
              </div>
            </section>

            {/* 2. Allgemeine Hinweise */}
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                2. Allgemeine Hinweise
              </h2>
              
              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">2.1 Geltungsbereich</h3>
                  <p className="text-gray-700">
                    Diese Datenschutzerklärung gilt für die Verarbeitung personenbezogener Daten im Rahmen der Nutzung unserer Plattform socialmediakampagnen.com.
                  </p>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">2.2 Rechtsgrundlagen</h3>
                  <p className="text-gray-700 mb-2">Die Verarbeitung personenbezogener Daten erfolgt auf Grundlage der DSGVO, insbesondere:</p>
                  <ul className="list-disc list-inside text-gray-700 space-y-1 ml-4">
                    <li>Art. 6 Abs. 1 lit. b DSGVO (Vertragserfüllung)</li>
                    <li>Art. 6 Abs. 1 lit. f DSGVO (berechtigte Interessen)</li>
                    <li>Art. 6 Abs. 1 lit. a DSGVO (Einwilligung)</li>
                  </ul>
                </div>
              </div>
            </section>

            {/* 3. Datenerhebung */}
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
                <Database className="w-6 h-6 mr-3 text-blue-600" />
                3. Datenerhebung und -verarbeitung
              </h2>
              
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-3">3.1 Registrierungsdaten</h3>
                  <p className="text-gray-700 mb-2">Bei der Registrierung erheben wir folgende Daten:</p>
                  <ul className="list-disc list-inside text-gray-700 space-y-1 ml-4">
                    <li><strong>Persönliche Daten:</strong> Vor- und Nachname, E-Mail-Adresse</li>
                    <li><strong>Unternehmensdaten:</strong> Firmenname, Branche, Adresse, Website, Telefonnummer</li>
                    <li><strong>Technische Daten:</strong> IP-Adresse, Browser-Informationen, Zeitstempel</li>
                  </ul>
                  <div className="bg-blue-50 p-3 rounded-lg mt-3">
                    <p className="text-blue-800 text-sm">
                      <strong>Zweck:</strong> Bereitstellung der Plattform, Vertragserfüllung, Kommunikation<br />
                      <strong>Rechtsgrundlage:</strong> Art. 6 Abs. 1 lit. b DSGVO
                    </p>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-3">3.2 Nutzungsdaten</h3>
                  <p className="text-gray-700 mb-2">Während der Plattformnutzung verarbeiten wir:</p>
                  <ul className="list-disc list-inside text-gray-700 space-y-1 ml-4">
                    <li><strong>Kampagnendaten:</strong> Erstellte Inhalte, Zielgruppen, Budgets, Einstellungen</li>
                    <li><strong>Performance-Daten:</strong> Klicks, Impressionen, Conversions, Reichweite</li>
                    <li><strong>Verhaltensdaten:</strong> Nutzungszeiten, Funktionsnutzung, Präferenzen</li>
                    <li><strong>Log-Daten:</strong> Zugriffe, Fehler, Systemereignisse</li>
                  </ul>
                  <div className="bg-blue-50 p-3 rounded-lg mt-3">
                    <p className="text-blue-800 text-sm">
                      <strong>Zweck:</strong> Plattformfunktionalität, Kampagnenoptimierung, Support<br />
                      <strong>Rechtsgrundlage:</strong> Art. 6 Abs. 1 lit. b DSGVO, Art. 6 Abs. 1 lit. f DSGVO
                    </p>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-3">3.3 Zahlungsdaten</h3>
                  <p className="text-gray-700 mb-2">Für die Abrechnung verarbeiten wir:</p>
                  <ul className="list-disc list-inside text-gray-700 space-y-1 ml-4">
                    <li><strong>Rechnungsdaten:</strong> Rechnungsadresse, Steuernummer, Zahlungsart</li>
                    <li><strong>Transaktionsdaten:</strong> Rechnungsbeträge, Zahlungseingänge, Mahnungen</li>
                  </ul>
                  <div className="bg-blue-50 p-3 rounded-lg mt-3">
                    <p className="text-blue-800 text-sm">
                      <strong>Zweck:</strong> Vertragsabwicklung, Buchhaltung, Steuerrecht<br />
                      <strong>Rechtsgrundlage:</strong> Art. 6 Abs. 1 lit. b DSGVO, Art. 6 Abs. 1 lit. c DSGVO
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* 4. Datenweitergabe */}
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
                <Share2 className="w-6 h-6 mr-3 text-orange-600" />
                4. Datenweitergabe an Dritte
              </h2>
              
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-3">4.1 Social Media Plattformen</h3>
                  <p className="text-gray-700 mb-3">
                    <strong>Umfang der Weitergabe:</strong><br />
                    Zur Durchführung von Werbekampagnen übertragen wir Daten an folgende Plattformen:
                  </p>
                  
                  <div className="space-y-4">
                    <div className="bg-blue-50 p-4 rounded-lg">
                      <h4 className="font-semibold text-blue-900 mb-2">Facebook/Meta (Facebook, Instagram, WhatsApp)</h4>
                      <ul className="text-blue-800 text-sm space-y-1">
                        <li><strong>Übertragene Daten:</strong> Kampagneninhalte, Zielgruppendefinitionen, Budgets, Werbetexte, Bilder/Videos</li>
                        <li><strong>Zweck:</strong> Schaltung und Verwaltung von Werbekampagnen</li>
                        <li><strong>Rechtsgrundlage:</strong> Art. 6 Abs. 1 lit. b DSGVO (Vertragserfüllung)</li>
                        <li><strong>Datenschutz:</strong> https://www.facebook.com/privacy/policy</li>
                      </ul>
                    </div>

                    <div className="bg-green-50 p-4 rounded-lg">
                      <h4 className="font-semibold text-green-900 mb-2">Google (YouTube, Google Ads)</h4>
                      <ul className="text-green-800 text-sm space-y-1">
                        <li><strong>Übertragene Daten:</strong> Kampagneninhalte, Keywords, Zielgruppen, Anzeigentexte, Medien</li>
                        <li><strong>Zweck:</strong> Schaltung von Suchanzeigen und YouTube-Werbung</li>
                        <li><strong>Rechtsgrundlage:</strong> Art. 6 Abs. 1 lit. b DSGVO (Vertragserfüllung)</li>
                        <li><strong>Datenschutz:</strong> https://policies.google.com/privacy</li>
                      </ul>
                    </div>

                    <div className="bg-purple-50 p-4 rounded-lg">
                      <h4 className="font-semibold text-purple-900 mb-2">LinkedIn</h4>
                      <ul className="text-purple-800 text-sm space-y-1">
                        <li><strong>Übertragene Daten:</strong> B2B-Kampagneninhalte, Unternehmenszielgruppen, Sponsored Content</li>
                        <li><strong>Zweck:</strong> Business-to-Business Werbung</li>
                        <li><strong>Rechtsgrundlage:</strong> Art. 6 Abs. 1 lit. b DSGVO (Vertragserfüllung)</li>
                        <li><strong>Datenschutz:</strong> https://www.linkedin.com/legal/privacy-policy</li>
                      </ul>
                    </div>

                    <div className="bg-pink-50 p-4 rounded-lg">
                      <h4 className="font-semibold text-pink-900 mb-2">TikTok</h4>
                      <ul className="text-pink-800 text-sm space-y-1">
                        <li><strong>Übertragene Daten:</strong> Video-Inhalte, Zielgruppendaten, Kampagneneinstellungen</li>
                        <li><strong>Zweck:</strong> Schaltung von TikTok-Werbeanzeigen</li>
                        <li><strong>Rechtsgrundlage:</strong> Art. 6 Abs. 1 lit. b DSGVO (Vertragserfüllung)</li>
                        <li><strong>Datenschutz:</strong> https://www.tiktok.com/legal/privacy-policy</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-3">4.2 Datenrückübertragung</h3>
                  <p className="text-gray-700 mb-2">
                    <strong>Kampagnen-Performance-Daten:</strong><br />
                    Von den Social Media Plattformen erhalten wir zurück:
                  </p>
                  <ul className="list-disc list-inside text-gray-700 space-y-1 ml-4">
                    <li><strong>Leistungskennzahlen:</strong> Impressionen, Klicks, Conversions, Kosten</li>
                    <li><strong>Zielgruppendaten:</strong> Demografische Auswertungen (anonymisiert)</li>
                    <li><strong>Optimierungsempfehlungen:</strong> Algorithmus-basierte Verbesserungsvorschläge</li>
                  </ul>
                  <div className="bg-blue-50 p-3 rounded-lg mt-3">
                    <p className="text-blue-800 text-sm">
                      <strong>Zweck:</strong> Kampagnenoptimierung, Reporting, Erfolgsmessung<br />
                      <strong>Rechtsgrundlage:</strong> Art. 6 Abs. 1 lit. b DSGVO
                    </p>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-3">4.3 Technische Dienstleister</h3>
                  <p className="text-gray-700 mb-2">Wir setzen sorgfältig ausgewählte Auftragsverarbeiter ein:</p>
                  <ul className="list-disc list-inside text-gray-700 space-y-1 ml-4">
                    <li><strong>Hosting-Provider:</strong> Vercel Inc., USA (Frontend) / Railway Corp., USA (Backend)</li>
                    <li><strong>Datenbank:</strong> Neon Database, USA (PostgreSQL-Hosting)</li>
                    <li><strong>Payment-Provider:</strong> Stripe Inc., USA / PayPal Holdings Inc., USA</li>
                    <li><strong>E-Mail-Service:</strong> SendGrid Inc., USA (Transaktions-E-Mails)</li>
                  </ul>
                  <div className="bg-gray-50 p-3 rounded-lg mt-3">
                    <p className="text-gray-700 text-sm">
                      <strong>Rechtsgrundlage:</strong> Art. 6 Abs. 1 lit. b DSGVO (Vertragserfüllung), Art. 6 Abs. 1 lit. f DSGVO (berechtigtes Interesse)
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* 5. API-Schnittstellen */}
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
                <Lock className="w-6 h-6 mr-3 text-green-600" />
                5. API-Schnittstellen und Datenübertragung
              </h2>
              
              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">5.1 Automatisierte Datenübertragung</h3>
                  <p className="text-gray-700 mb-2">Unsere Plattform nutzt offizielle APIs der Social Media Anbieter:</p>
                  <ul className="list-disc list-inside text-gray-700 space-y-1 ml-4">
                    <li><strong>Verschlüsselung:</strong> Alle Datenübertragungen erfolgen über HTTPS/TLS</li>
                    <li><strong>Authentifizierung:</strong> OAuth 2.0 und API-Keys</li>
                    <li><strong>Datenminimierung:</strong> Nur kampagnenrelevante Daten werden übertragen</li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">5.2 Echtzeit-Synchronisation</h3>
                  <ul className="list-disc list-inside text-gray-700 space-y-1 ml-4">
                    <li><strong>Kampagnenstatus:</strong> Live-Updates über API-Verbindungen</li>
                    <li><strong>Performance-Metriken:</strong> Stündliche/tägliche Datenabfrage</li>
                    <li><strong>Budgetüberwachung:</strong> Automatische Benachrichtigungen bei Limits</li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">5.3 Datenintegrität</h3>
                  <ul className="list-disc list-inside text-gray-700 space-y-1 ml-4">
                    <li><strong>Validierung:</strong> Automatische Prüfung übertragener Daten</li>
                    <li><strong>Fehlerbehandlung:</strong> Retry-Mechanismen bei Übertragungsfehlern</li>
                    <li><strong>Logging:</strong> Protokollierung aller API-Zugriffe</li>
                  </ul>
                </div>
              </div>
            </section>

            {/* 6. Internationale Datenübertragung */}
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                6. Internationale Datenübertragung
              </h2>
              
              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">6.1 Drittländer</h3>
                  <p className="text-gray-700 mb-2">Einige unserer Partner haben Sitze außerhalb der EU:</p>
                  <ul className="list-disc list-inside text-gray-700 space-y-1 ml-4">
                    <li><strong>USA:</strong> Meta, Google, LinkedIn, Vercel, Railway, Neon (Angemessenheitsbeschluss)</li>
                    <li><strong>Singapur:</strong> TikTok (Standard-Datenschutzklauseln)</li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">6.2 Schutzmaßnahmen</h3>
                  <ul className="list-disc list-inside text-gray-700 space-y-1 ml-4">
                    <li><strong>Angemessenheitsbeschluss:</strong> EU-US Data Privacy Framework für US-Anbieter</li>
                    <li><strong>Standard-Datenschutzklauseln:</strong> EU-Kommission genehmigte Vertragsklauseln</li>
                    <li><strong>Zusätzliche Garantien:</strong> Technische und organisatorische Maßnahmen</li>
                  </ul>
                </div>
              </div>
            </section>

            {/* 7. Speicherdauer */}
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                7. Speicherdauer
              </h2>
              
              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">7.1 Kundendaten</h3>
                  <ul className="list-disc list-inside text-gray-700 space-y-1 ml-4">
                    <li><strong>Vertragslaufzeit:</strong> Für die Dauer des Vertragsverhältnisses</li>
                    <li><strong>Nach Kündigung:</strong> 30 Tage für Datenexport, dann Löschung</li>
                    <li><strong>Gesetzliche Aufbewahrung:</strong> Rechnungsdaten 10 Jahre (HGB, AO)</li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">7.2 Kampagnendaten</h3>
                  <ul className="list-disc list-inside text-gray-700 space-y-1 ml-4">
                    <li><strong>Aktive Kampagnen:</strong> Während der Kampagnenlaufzeit</li>
                    <li><strong>Archivierte Kampagnen:</strong> 2 Jahre für Reporting-Zwecke</li>
                    <li><strong>Performance-Daten:</strong> 3 Jahre für Optimierungsanalysen</li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">7.3 Log-Daten</h3>
                  <ul className="list-disc list-inside text-gray-700 space-y-1 ml-4">
                    <li><strong>System-Logs:</strong> 6 Monate</li>
                    <li><strong>Sicherheits-Logs:</strong> 12 Monate</li>
                    <li><strong>Zugriffs-Logs:</strong> 3 Monate</li>
                  </ul>
                </div>
              </div>
            </section>

            {/* 8. Ihre Rechte */}
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
                <Eye className="w-6 h-6 mr-3 text-purple-600" />
                8. Ihre Rechte
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-purple-50 p-4 rounded-lg">
                  <h3 className="font-semibold text-purple-900 mb-2">Auskunftsrecht (Art. 15 DSGVO)</h3>
                  <p className="text-purple-800 text-sm">Sie haben das Recht auf Auskunft über die Sie betreffenden personenbezogenen Daten.</p>
                </div>

                <div className="bg-blue-50 p-4 rounded-lg">
                  <h3 className="font-semibold text-blue-900 mb-2">Berichtigungsrecht (Art. 16 DSGVO)</h3>
                  <p className="text-blue-800 text-sm">Sie können die Berichtigung unrichtiger Daten verlangen.</p>
                </div>

                <div className="bg-red-50 p-4 rounded-lg">
                  <h3 className="font-semibold text-red-900 mb-2">Löschungsrecht (Art. 17 DSGVO)</h3>
                  <p className="text-red-800 text-sm">Sie können die Löschung Ihrer Daten verlangen, soweit keine gesetzlichen Aufbewahrungspflichten bestehen.</p>
                </div>

                <div className="bg-orange-50 p-4 rounded-lg">
                  <h3 className="font-semibold text-orange-900 mb-2">Einschränkungsrecht (Art. 18 DSGVO)</h3>
                  <p className="text-orange-800 text-sm">Sie können die Einschränkung der Verarbeitung verlangen.</p>
                </div>

                <div className="bg-green-50 p-4 rounded-lg">
                  <h3 className="font-semibold text-green-900 mb-2">Datenübertragbarkeit (Art. 20 DSGVO)</h3>
                  <p className="text-green-800 text-sm">Sie können Ihre Daten in einem strukturierten, gängigen Format erhalten.</p>
                </div>

                <div className="bg-yellow-50 p-4 rounded-lg">
                  <h3 className="font-semibold text-yellow-900 mb-2">Widerspruchsrecht (Art. 21 DSGVO)</h3>
                  <p className="text-yellow-800 text-sm">Sie können der Verarbeitung auf Grundlage berechtigter Interessen widersprechen.</p>
                </div>
              </div>
            </section>

            {/* 9. Cookies */}
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                9. Cookies und Tracking
              </h2>
              
              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">9.1 Notwendige Cookies</h3>
                  <ul className="list-disc list-inside text-gray-700 space-y-1 ml-4">
                    <li><strong>Session-Cookies:</strong> Für Anmeldung und Funktionalität</li>
                    <li><strong>Sicherheits-Cookies:</strong> CSRF-Schutz, Authentifizierung</li>
                    <li><strong>LocalStorage:</strong> Benutzereinstellungen und Kampagnendaten</li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">9.2 Analyse- und Marketing-Cookies</h3>
                  <p className="text-gray-700 mb-2">Nur mit Ihrer Einwilligung verwenden wir:</p>
                  <ul className="list-disc list-inside text-gray-700 space-y-1 ml-4">
                    <li><strong>Google Analytics 4:</strong> Nutzungsstatistiken (IP-Anonymisierung)</li>
                    <li><strong>Meta Pixel:</strong> Conversion-Tracking für Werbekampagnen</li>
                    <li><strong>LinkedIn Insight Tag:</strong> B2B-Kampagnenanalyse</li>
                    <li><strong>TikTok Pixel:</strong> Analyse von TikTok-Kampagnen</li>
                  </ul>
                  <div className="bg-green-50 p-3 rounded-lg mt-3">
                    <p className="text-green-800 text-sm">
                      <strong>Rechtsgrundlage:</strong> Art. 6 Abs. 1 lit. a DSGVO (Einwilligung)<br />
                      <strong>Widerruf:</strong> Jederzeit über Cookie-Einstellungen möglich
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* 10. Kontakt */}
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
                <FileText className="w-6 h-6 mr-3 text-blue-600" />
                10. Kontakt und Beschwerden
              </h2>
              
              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">10.1 Datenschutz-Kontakt</h3>
                  <p className="text-gray-700">
                    <strong>E-Mail:</strong> datenschutz@socialmediakampagnen.com
                  </p>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">10.2 Aufsichtsbehörde</h3>
                  <p className="text-gray-700 mb-2">Sie haben das Recht, sich bei einer Datenschutz-Aufsichtsbehörde zu beschweren:</p>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <p className="font-semibold">Landesbeauftragte für Datenschutz und Informationsfreiheit Nordrhein-Westfalen</p>
                    <p>Kavalleriestraße 2-4</p>
                    <p>40213 Düsseldorf</p>
                    <p>Telefon: 0211/38424-0</p>
                    <p>E-Mail: poststelle@ldi.nrw.de</p>
                  </div>
                </div>
              </div>
            </section>

            {/* Kontakt */}
            <div className="bg-purple-50 p-6 rounded-lg border-l-4 border-purple-500">
              <div className="flex items-start">
                <AlertCircle className="w-6 h-6 text-purple-600 mr-3 mt-1 flex-shrink-0" />
                <div>
                  <h3 className="text-lg font-semibold text-purple-900 mb-2">Kontakt</h3>
                  <div className="text-purple-800">
                    <p className="font-semibold">Martin Kelm</p>
                    <p>Im Weidenblech 25</p>
                    <p>51371 Leverkusen</p>
                    <p className="mt-2">Stand: Dezember 2024</p>
                  </div>
                </div>
              </div>
            </div>

          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default PrivacyPage
