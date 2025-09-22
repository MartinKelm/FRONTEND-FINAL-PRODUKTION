import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card'
import { ScrollText, Shield, AlertCircle } from 'lucide-react'

const TermsPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 pt-24 pb-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <div className="flex justify-center mb-6">
            <div className="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center">
              <ScrollText className="w-8 h-8 text-white" />
            </div>
          </div>
          <h1 className="text-4xl font-bold text-white mb-4">
            Allgemeine Geschäftsbedingungen
          </h1>
          <p className="text-xl text-white/80">
            socialmediakampagnen.com
          </p>
          <p className="text-white/60 mt-2">Stand: Dezember 2024</p>
        </div>

        <Card className="bg-white/95 backdrop-blur-sm shadow-2xl">
          <CardContent className="p-8 space-y-8">
            
            {/* § 1 Geltungsbereich */}
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
                <Shield className="w-6 h-6 mr-3 text-purple-600" />
                § 1 Geltungsbereich und Vertragspartner
              </h2>
              
              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">1.1 Anbieter</h3>
                  <p className="text-gray-700 mb-2">Anbieter der Plattform socialmediakampagnen.com ist:</p>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <p className="font-semibold">Martin Kelm</p>
                    <p>Im Weidenblech 25</p>
                    <p>51371 Leverkusen</p>
                    <p>E-Mail: info@socialmediakampagnen.com</p>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">1.2 Geltungsbereich</h3>
                  <p className="text-gray-700">
                    Diese Allgemeinen Geschäftsbedingungen (AGB) gelten für alle Verträge zwischen dem Anbieter und Geschäftskunden über die Nutzung der Plattform socialmediakampagnen.com. Die Plattform richtet sich ausschließlich an Unternehmen, Gewerbetreibende und Freiberufler (B2B).
                  </p>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">1.3 Vertragssprache</h3>
                  <p className="text-gray-700">
                    Die Vertragssprache ist Deutsch. Maßgeblich ist die deutsche Fassung dieser AGB.
                  </p>
                </div>
              </div>
            </section>

            {/* § 2 Vertragsgegenstand */}
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                § 2 Vertragsgegenstand und Leistungen
              </h2>
              
              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">2.1 Plattformleistungen</h3>
                  <p className="text-gray-700 mb-2">Der Anbieter stellt eine webbasierte Software-as-a-Service (SaaS) Plattform zur Verfügung, die es Geschäftskunden ermöglicht:</p>
                  <ul className="list-disc list-inside text-gray-700 space-y-1 ml-4">
                    <li>Social Media Kampagnen zu erstellen und zu verwalten</li>
                    <li>Werbeanzeigen für verschiedene Plattformen zu generieren</li>
                    <li>Kampagnen-Performance zu analysieren</li>
                    <li>Zielgruppen zu definieren und zu verwalten</li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">2.2 Verfügbarkeit</h3>
                  <p className="text-gray-700">
                    Der Anbieter bemüht sich um eine Verfügbarkeit der Plattform von 99% im Jahresmittel. Wartungsarbeiten und technische Störungen können zu temporären Ausfällen führen.
                  </p>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">2.3 Funktionsumfang</h3>
                  <p className="text-gray-700">
                    Der konkrete Funktionsumfang richtet sich nach dem gewählten Tarif. Änderungen und Erweiterungen der Funktionen bleiben vorbehalten.
                  </p>
                </div>
              </div>
            </section>

            {/* § 3 Vertragsschluss */}
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                § 3 Vertragsschluss und Registrierung
              </h2>
              
              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">3.1 Registrierung</h3>
                  <p className="text-gray-700">
                    Die Nutzung der Plattform erfordert eine Registrierung. Der Kunde muss vollständige und wahrheitsgemäße Angaben machen.
                  </p>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">3.2 Vertragsschluss</h3>
                  <p className="text-gray-700">
                    Der Vertrag kommt durch die Bestätigung der Registrierung und Auswahl eines Tarifs zustande. Der Anbieter behält sich vor, Registrierungen ohne Angabe von Gründen abzulehnen.
                  </p>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">3.3 Geschäftskunden</h3>
                  <p className="text-gray-700">
                    Die Plattform steht ausschließlich Unternehmen, Gewerbetreibenden und Freiberuflern zur Verfügung. Verbraucher sind von der Nutzung ausgeschlossen.
                  </p>
                </div>
              </div>
            </section>

            {/* § 4 Preise */}
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                § 4 Preise und Zahlungsbedingungen
              </h2>
              
              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">4.1 Preise</h3>
                  <p className="text-gray-700">
                    Die aktuellen Preise sind auf der Website ersichtlich. Alle Preise verstehen sich zzgl. der gesetzlichen Mehrwertsteuer.
                  </p>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">4.2 Laufzeit und Abrechnung</h3>
                  <ul className="list-disc list-inside text-gray-700 space-y-1 ml-4">
                    <li>Alle Tarife haben eine Mindestlaufzeit von 12 Monaten</li>
                    <li>Die Abrechnung erfolgt jährlich im Voraus</li>
                    <li>Preisänderungen werden mit einer Frist von 4 Wochen angekündigt</li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">4.3 Zahlungsbedingungen</h3>
                  <ul className="list-disc list-inside text-gray-700 space-y-1 ml-4">
                    <li>Rechnungen sind innerhalb von 14 Tagen nach Rechnungsstellung fällig</li>
                    <li>Bei Zahlungsverzug werden Verzugszinsen in Höhe von 9 Prozentpunkten über dem Basiszinssatz berechnet</li>
                    <li>Bei Zahlungsverzug kann der Zugang gesperrt werden</li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">4.4 Mediabudget</h3>
                  <p className="text-gray-700">
                    Zusätzlich zu den Plattformkosten fallen separate Kosten für Werbebudgets bei den jeweiligen Social Media Plattformen an. Diese werden gesondert abgerechnet.
                  </p>
                </div>
              </div>
            </section>

            {/* § 5 Nutzungsrechte */}
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                § 5 Nutzungsrechte und Pflichten
              </h2>
              
              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">5.1 Nutzungsrecht</h3>
                  <p className="text-gray-700">
                    Der Kunde erhält ein nicht-exklusives, nicht-übertragbares Recht zur Nutzung der Plattform für die Vertragslaufzeit.
                  </p>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">5.2 Nutzungsbeschränkungen</h3>
                  <p className="text-gray-700 mb-2">Der Kunde verpflichtet sich:</p>
                  <ul className="list-disc list-inside text-gray-700 space-y-1 ml-4">
                    <li>Die Plattform nur für rechtmäßige Zwecke zu nutzen</li>
                    <li>Keine rechtswidrigen, beleidigenden oder diskriminierenden Inhalte zu erstellen</li>
                    <li>Keine Urheberrechte oder Markenrechte Dritter zu verletzen</li>
                    <li>Die Plattform nicht für Spam oder unerwünschte Werbung zu nutzen</li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">5.3 Inhalte des Kunden</h3>
                  <p className="text-gray-700">
                    Der Kunde ist allein verantwortlich für die von ihm erstellten Inhalte und Kampagnen. Er stellt den Anbieter von allen Ansprüchen Dritter frei.
                  </p>
                </div>
              </div>
            </section>

            {/* § 6 Datenschutz */}
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                § 6 Datenschutz und Datensicherheit
              </h2>
              
              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">6.1 Datenschutz</h3>
                  <p className="text-gray-700">
                    Der Anbieter verarbeitet personenbezogene Daten gemäß der Datenschutzerklärung und den gesetzlichen Bestimmungen.
                  </p>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">6.2 Datensicherheit</h3>
                  <p className="text-gray-700">
                    Der Anbieter trifft angemessene technische und organisatorische Maßnahmen zum Schutz der Kundendaten.
                  </p>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">6.3 Datenportabilität</h3>
                  <p className="text-gray-700">
                    Der Kunde kann seine Daten jederzeit in einem gängigen Format exportieren.
                  </p>
                </div>
              </div>
            </section>

            {/* § 7 Haftung */}
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                § 7 Haftung und Gewährleistung
              </h2>
              
              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">7.1 Gewährleistung</h3>
                  <p className="text-gray-700">
                    Der Anbieter gewährleistet die vertragsgemäße Bereitstellung der Plattform. Für Mängel gelten die gesetzlichen Gewährleistungsrechte.
                  </p>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">7.2 Haftungsbeschränkung</h3>
                  <p className="text-gray-700 mb-2">Die Haftung des Anbieters ist beschränkt auf:</p>
                  <ul className="list-disc list-inside text-gray-700 space-y-1 ml-4">
                    <li>Vorsatz und grobe Fahrlässigkeit</li>
                    <li>Verletzung wesentlicher Vertragspflichten</li>
                    <li>Schäden aus der Verletzung des Lebens, des Körpers oder der Gesundheit</li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">7.3 Haftungsausschluss</h3>
                  <p className="text-gray-700 mb-2">Der Anbieter haftet nicht für:</p>
                  <ul className="list-disc list-inside text-gray-700 space-y-1 ml-4">
                    <li>Schäden durch Kampagnen oder Werbeinhalte des Kunden</li>
                    <li>Verluste durch Ausfälle von Drittanbietern (Social Media Plattformen)</li>
                    <li>Mittelbare Schäden oder entgangenen Gewinn</li>
                  </ul>
                </div>
              </div>
            </section>

            {/* § 8 Kündigung */}
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                § 8 Kündigung
              </h2>
              
              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">8.1 Ordentliche Kündigung</h3>
                  <p className="text-gray-700">
                    Der Vertrag kann von beiden Seiten mit einer Frist von 3 Monaten zum Ende der Laufzeit gekündigt werden.
                  </p>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">8.2 Außerordentliche Kündigung</h3>
                  <p className="text-gray-700 mb-2">Beide Parteien können den Vertrag aus wichtigem Grund fristlos kündigen, insbesondere bei:</p>
                  <ul className="list-disc list-inside text-gray-700 space-y-1 ml-4">
                    <li>Zahlungsverzug trotz Mahnung</li>
                    <li>Schwerwiegenden Verstößen gegen diese AGB</li>
                    <li>Insolvenz einer Vertragspartei</li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">8.3 Folgen der Kündigung</h3>
                  <p className="text-gray-700">
                    Nach Vertragsende wird der Zugang zur Plattform gesperrt. Kundendaten werden nach 30 Tagen gelöscht.
                  </p>
                </div>
              </div>
            </section>

            {/* § 9 Änderungen */}
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                § 9 Änderungen der AGB
              </h2>
              
              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">9.1 Änderungsrecht</h3>
                  <p className="text-gray-700">
                    Der Anbieter kann diese AGB mit einer Frist von 6 Wochen ändern. Änderungen werden per E-Mail mitgeteilt.
                  </p>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">9.2 Widerspruchsrecht</h3>
                  <p className="text-gray-700">
                    Der Kunde kann Änderungen innerhalb von 4 Wochen widersprechen. Bei Widerspruch endet der Vertrag zum nächstmöglichen Termin.
                  </p>
                </div>
              </div>
            </section>

            {/* § 10 Schlussbestimmungen */}
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                § 10 Schlussbestimmungen
              </h2>
              
              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">10.1 Anwendbares Recht</h3>
                  <p className="text-gray-700">
                    Es gilt deutsches Recht unter Ausschluss des UN-Kaufrechts.
                  </p>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">10.2 Gerichtsstand</h3>
                  <p className="text-gray-700">
                    Gerichtsstand für alle Streitigkeiten ist Leverkusen, sofern der Kunde Kaufmann ist.
                  </p>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">10.3 Salvatorische Klausel</h3>
                  <p className="text-gray-700">
                    Sollten einzelne Bestimmungen unwirksam sein, bleibt die Wirksamkeit der übrigen Bestimmungen unberührt.
                  </p>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">10.4 Vertragssprache</h3>
                  <p className="text-gray-700">
                    Diese AGB sind in deutscher Sprache verfasst. Bei Übersetzungen ist die deutsche Fassung maßgeblich.
                  </p>
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

export default TermsPage
