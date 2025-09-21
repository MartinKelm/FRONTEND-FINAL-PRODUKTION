import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card'
import { Badge } from '../ui/badge'
import { FileText, CheckCircle, AlertTriangle, CreditCard, Shield } from 'lucide-react'

const TermsPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 py-12 px-4 sm:px-6">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-6">
            <FileText className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            Allgemeine Geschäftsbedingungen
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Nutzungsbedingungen für die Plattform socialmediakampagnen.com
          </p>
          <Badge className="bg-green-100 text-green-800 mt-4">
            Gültig ab: 21. September 2025
          </Badge>
        </div>

        {/* Introduction */}
        <Card className="shadow-lg border-0 bg-white mb-8">
          <CardHeader>
            <CardTitle className="flex items-center text-xl text-gray-900">
              <CheckCircle className="w-6 h-6 mr-3 text-green-600" />
              Präambel
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-700 leading-relaxed">
              Diese Allgemeinen Geschäftsbedingungen (AGB) regeln die Nutzung der Plattform 
              socialmediakampagnen.com, die von der SocialMediaKampagnen GmbH betrieben wird. 
              Mit der Registrierung und Nutzung unserer Dienste erklären Sie sich mit diesen 
              Bedingungen einverstanden.
            </p>
          </CardContent>
        </Card>

        {/* Service Description */}
        <Card className="shadow-lg border-0 bg-white mb-8">
          <CardHeader>
            <CardTitle className="flex items-center text-xl text-gray-900">
              <Shield className="w-6 h-6 mr-3 text-blue-600" />
              § 1 Leistungsbeschreibung
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h3 className="font-semibold text-gray-900 mb-2">1.1 Plattform-Services</h3>
              <p className="text-gray-700">
                SocialMediaKampagnen.com ist eine Software-as-a-Service (SaaS) Plattform zur 
                Erstellung, Verwaltung und Optimierung von Social Media Werbekampagnen. 
                Die Plattform bietet Tools für die automatisierte Kampagnenerstellung, 
                Live-Vorschau von Anzeigen und Performance-Analytics.
              </p>
            </div>
            
            <div>
              <h3 className="font-semibold text-gray-900 mb-2">1.2 Verfügbarkeit</h3>
              <p className="text-gray-700">
                Wir bemühen uns um eine Verfügbarkeit der Plattform von 99,5% im Jahresdurchschnitt. 
                Geplante Wartungsarbeiten werden mindestens 24 Stunden im Voraus angekündigt.
              </p>
            </div>

            <div>
              <h3 className="font-semibold text-gray-900 mb-2">1.3 Unterstützte Plattformen</h3>
              <p className="text-gray-700">
                Unsere Services unterstützen die Erstellung von Kampagnen für Facebook, Instagram, 
                TikTok, YouTube, Google Ads, Snapchat und weitere Social Media Plattformen. 
                Die Verfügbarkeit einzelner Plattformen kann sich ändern.
              </p>
            </div>
          </CardContent>
        </Card>

        {/* User Obligations */}
        <Card className="shadow-lg border-0 bg-white mb-8">
          <CardHeader>
            <CardTitle className="flex items-center text-xl text-gray-900">
              <AlertTriangle className="w-6 h-6 mr-3 text-orange-600" />
              § 2 Nutzerpflichten
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h3 className="font-semibold text-gray-900 mb-2">2.1 Registrierung und Konto</h3>
              <ul className="text-gray-700 space-y-2 ml-4">
                <li>• Sie müssen wahrheitsgemäße und vollständige Angaben bei der Registrierung machen</li>
                <li>• Ihr Konto ist nicht übertragbar und darf nur von Ihnen genutzt werden</li>
                <li>• Sie sind für die Sicherheit Ihrer Zugangsdaten verantwortlich</li>
                <li>• Verdächtige Aktivitäten sind unverzüglich zu melden</li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-semibold text-gray-900 mb-2">2.2 Zulässige Nutzung</h3>
              <ul className="text-gray-700 space-y-2 ml-4">
                <li>• Die Plattform darf nur für legale Zwecke verwendet werden</li>
                <li>• Kampagnen müssen den Richtlinien der jeweiligen Social Media Plattformen entsprechen</li>
                <li>• Spam, betrügerische oder irreführende Inhalte sind untersagt</li>
                <li>• Die Verbreitung von Hassrede oder diskriminierenden Inhalten ist verboten</li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold text-gray-900 mb-2">2.3 Verbotene Aktivitäten</h3>
              <ul className="text-gray-700 space-y-2 ml-4">
                <li>• Reverse Engineering oder Dekompilierung der Software</li>
                <li>• Automatisierte Zugriffe ohne ausdrückliche Genehmigung</li>
                <li>• Überlastung der Server durch exzessive Nutzung</li>
                <li>• Umgehung von Sicherheitsmaßnahmen</li>
              </ul>
            </div>
          </CardContent>
        </Card>

        {/* Pricing and Payment */}
        <Card className="shadow-lg border-0 bg-white mb-8">
          <CardHeader>
            <CardTitle className="flex items-center text-xl text-gray-900">
              <CreditCard className="w-6 h-6 mr-3 text-purple-600" />
              § 3 Preise und Zahlung
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h3 className="font-semibold text-gray-900 mb-2">3.1 Preismodell</h3>
              <p className="text-gray-700">
                Unsere Dienste werden auf Abonnementbasis angeboten. Die aktuellen Preise 
                finden Sie auf unserer Website. Alle Preise verstehen sich inklusive der 
                gesetzlichen Mehrwertsteuer.
              </p>
            </div>
            
            <div>
              <h3 className="font-semibold text-gray-900 mb-2">3.2 Zahlungsbedingungen</h3>
              <ul className="text-gray-700 space-y-2 ml-4">
                <li>• Abonnements werden jährlich im Voraus berechnet</li>
                <li>• Die Zahlung erfolgt per Kreditkarte, SEPA-Lastschrift oder Überweisung</li>
                <li>• Bei Zahlungsverzug können wir den Zugang temporär sperren</li>
                <li>• Rückerstattungen erfolgen nur gemäß unserer Rückgaberichtlinie</li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold text-gray-900 mb-2">3.3 Preisänderungen</h3>
              <p className="text-gray-700">
                Preisänderungen werden mindestens 30 Tage im Voraus angekündigt. 
                Bei Preiserhöhungen haben Sie ein außerordentliches Kündigungsrecht.
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Liability and Warranty */}
        <Card className="shadow-lg border-0 bg-white mb-8">
          <CardHeader>
            <CardTitle className="flex items-center text-xl text-gray-900">
              <Shield className="w-6 h-6 mr-3 text-red-600" />
              § 4 Haftung und Gewährleistung
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h3 className="font-semibold text-gray-900 mb-2">4.1 Haftungsbeschränkung</h3>
              <p className="text-gray-700">
                Wir haften nur für Schäden, die auf vorsätzlichem oder grob fahrlässigem 
                Verhalten beruhen. Die Haftung für leichte Fahrlässigkeit ist ausgeschlossen, 
                soweit nicht wesentliche Vertragspflichten betroffen sind.
              </p>
            </div>
            
            <div>
              <h3 className="font-semibold text-gray-900 mb-2">4.2 Gewährleistung</h3>
              <p className="text-gray-700">
                Wir gewährleisten die vertragsgemäße Bereitstellung unserer Dienste. 
                Bei Mängeln werden wir diese unverzüglich beheben. Eine Gewährleistung 
                für die Erfolgsgarantie von Werbekampagnen übernehmen wir nicht.
              </p>
            </div>

            <div>
              <h3 className="font-semibold text-gray-900 mb-2">4.3 Datenverlust</h3>
              <p className="text-gray-700">
                Wir erstellen regelmäßige Backups Ihrer Daten. Eine Haftung für 
                Datenverlust besteht nur bei vorsätzlichem oder grob fahrlässigem Verhalten.
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Termination */}
        <Card className="shadow-lg border-0 bg-white mb-8">
          <CardHeader>
            <CardTitle className="flex items-center text-xl text-gray-900">
              <AlertTriangle className="w-6 h-6 mr-3 text-yellow-600" />
              § 5 Kündigung
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h3 className="font-semibold text-gray-900 mb-2">5.1 Ordentliche Kündigung</h3>
              <p className="text-gray-700">
                Beide Parteien können das Abonnement mit einer Frist von 30 Tagen zum 
                Ende der Laufzeit kündigen. Die Kündigung muss schriftlich oder per 
                E-Mail erfolgen.
              </p>
            </div>
            
            <div>
              <h3 className="font-semibold text-gray-900 mb-2">5.2 Außerordentliche Kündigung</h3>
              <p className="text-gray-700">
                Bei schwerwiegenden Verstößen gegen diese AGB können wir das Vertragsverhältnis 
                fristlos kündigen. Dies umfasst insbesondere die Nutzung für illegale Zwecke 
                oder wiederholte Verstöße gegen die Nutzungsrichtlinien.
              </p>
            </div>

            <div>
              <h3 className="font-semibold text-gray-900 mb-2">5.3 Datenexport</h3>
              <p className="text-gray-700">
                Nach Kündigung haben Sie 30 Tage Zeit, Ihre Daten zu exportieren. 
                Danach werden alle Daten unwiderruflich gelöscht.
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Final Provisions */}
        <Card className="shadow-lg border-0 bg-white mb-8">
          <CardHeader>
            <CardTitle className="flex items-center text-xl text-gray-900">
              <FileText className="w-6 h-6 mr-3 text-gray-600" />
              § 6 Schlussbestimmungen
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h3 className="font-semibold text-gray-900 mb-2">6.1 Anwendbares Recht</h3>
              <p className="text-gray-700">
                Es gilt deutsches Recht unter Ausschluss des UN-Kaufrechts. 
                Gerichtsstand ist Berlin.
              </p>
            </div>
            
            <div>
              <h3 className="font-semibold text-gray-900 mb-2">6.2 Änderungen der AGB</h3>
              <p className="text-gray-700">
                Änderungen dieser AGB werden Ihnen mindestens 30 Tage vor Inkrafttreten 
                per E-Mail mitgeteilt. Widersprechen Sie nicht innerhalb von 30 Tagen, 
                gelten die Änderungen als angenommen.
              </p>
            </div>

            <div>
              <h3 className="font-semibold text-gray-900 mb-2">6.3 Salvatorische Klausel</h3>
              <p className="text-gray-700">
                Sollten einzelne Bestimmungen dieser AGB unwirksam sein, bleibt die 
                Wirksamkeit der übrigen Bestimmungen unberührt.
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Contact Information */}
        <div className="text-center">
          <p className="text-sm text-gray-500 mb-2">
            Bei Fragen zu diesen AGB wenden Sie sich bitte an:
          </p>
          <p className="text-sm text-gray-600">
            <a href="mailto:legal@socialmediakampagnen.com" className="text-blue-600 hover:underline">
              legal@socialmediakampagnen.com
            </a>
          </p>
        </div>
      </div>
    </div>
  )
}

export default TermsPage
