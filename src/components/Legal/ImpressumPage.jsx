import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card'
import { Badge } from '../ui/badge'
import { Building, Mail, Phone, MapPin, Scale } from 'lucide-react'

const ImpressumPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 py-12 px-4 sm:px-6">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center mx-auto mb-6">
            <Scale className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            Impressum
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Rechtliche Angaben gemäß § 5 TMG (Telemediengesetz)
          </p>
          <Badge className="bg-blue-100 text-blue-800 mt-4">
            Letzte Aktualisierung: September 2025
          </Badge>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Company Information */}
          <Card className="shadow-lg border-0 bg-white">
            <CardHeader>
              <CardTitle className="flex items-center text-xl text-gray-900">
                <Building className="w-6 h-6 mr-3 text-blue-600" />
                Unternehmensinformationen
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">Firmenname</h3>
                <p className="text-gray-700">
                  SocialMediaKampagnen GmbH
                </p>
              </div>
              
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">Geschäftsführer</h3>
                <p className="text-gray-700">
                  Max Mustermann
                </p>
              </div>
              
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">Handelsregister</h3>
                <p className="text-gray-700">
                  HRB 12345 B<br />
                  Amtsgericht Berlin
                </p>
              </div>
              
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">Umsatzsteuer-ID</h3>
                <p className="text-gray-700">
                  DE123456789
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Contact Information */}
          <Card className="shadow-lg border-0 bg-white">
            <CardHeader>
              <CardTitle className="flex items-center text-xl text-gray-900">
                <Mail className="w-6 h-6 mr-3 text-green-600" />
                Kontaktdaten
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-start space-x-3">
                <MapPin className="w-5 h-5 text-gray-400 mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">Anschrift</h3>
                  <p className="text-gray-700">
                    Musterstraße 123<br />
                    10115 Berlin<br />
                    Deutschland
                  </p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3">
                <Phone className="w-5 h-5 text-gray-400 mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">Telefon</h3>
                  <p className="text-gray-700">
                    +49 (0) 30 12345678
                  </p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3">
                <Mail className="w-5 h-5 text-gray-400 mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">E-Mail</h3>
                  <p className="text-gray-700">
                    <a href="mailto:info@socialmediakampagnen.com" className="text-blue-600 hover:underline">
                      info@socialmediakampagnen.com
                    </a>
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Legal Information */}
        <Card className="shadow-lg border-0 bg-white mt-8">
          <CardHeader>
            <CardTitle className="flex items-center text-xl text-gray-900">
              <Scale className="w-6 h-6 mr-3 text-purple-600" />
              Rechtliche Hinweise
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <h3 className="font-semibold text-gray-900 mb-3">Verantwortlich für den Inhalt nach § 55 Abs. 2 RStV</h3>
              <p className="text-gray-700">
                Max Mustermann<br />
                Musterstraße 123<br />
                10115 Berlin
              </p>
            </div>

            <div>
              <h3 className="font-semibold text-gray-900 mb-3">Haftungsausschluss</h3>
              <div className="space-y-4 text-gray-700">
                <div>
                  <h4 className="font-medium text-gray-900 mb-2">Haftung für Inhalte</h4>
                  <p>
                    Als Diensteanbieter sind wir gemäß § 7 Abs.1 TMG für eigene Inhalte auf diesen Seiten nach den 
                    allgemeinen Gesetzen verantwortlich. Nach §§ 8 bis 10 TMG sind wir als Diensteanbieter jedoch nicht 
                    unter der Verpflichtung, übermittelte oder gespeicherte fremde Informationen zu überwachen oder nach 
                    Umständen zu forschen, die auf eine rechtswidrige Tätigkeit hinweisen.
                  </p>
                </div>

                <div>
                  <h4 className="font-medium text-gray-900 mb-2">Haftung für Links</h4>
                  <p>
                    Unser Angebot enthält Links zu externen Websites Dritter, auf deren Inhalte wir keinen Einfluss haben. 
                    Deshalb können wir für diese fremden Inhalte auch keine Gewähr übernehmen. Für die Inhalte der 
                    verlinkten Seiten ist stets der jeweilige Anbieter oder Betreiber der Seiten verantwortlich.
                  </p>
                </div>

                <div>
                  <h4 className="font-medium text-gray-900 mb-2">Urheberrecht</h4>
                  <p>
                    Die durch die Seitenbetreiber erstellten Inhalte und Werke auf diesen Seiten unterliegen dem deutschen 
                    Urheberrecht. Die Vervielfältigung, Bearbeitung, Verbreitung und jede Art der Verwertung außerhalb der 
                    Grenzen des Urheberrechtes bedürfen der schriftlichen Zustimmung des jeweiligen Autors bzw. Erstellers.
                  </p>
                </div>
              </div>
            </div>

            <div>
              <h3 className="font-semibold text-gray-900 mb-3">Streitschlichtung</h3>
              <p className="text-gray-700">
                Die Europäische Kommission stellt eine Plattform zur Online-Streitbeilegung (OS) bereit: 
                <a href="https://ec.europa.eu/consumers/odr/" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline ml-1">
                  https://ec.europa.eu/consumers/odr/
                </a>
                <br />
                Unsere E-Mail-Adresse finden Sie oben im Impressum.
              </p>
              <p className="text-gray-700 mt-2">
                Wir sind nicht bereit oder verpflichtet, an Streitbeilegungsverfahren vor einer 
                Verbraucherschlichtungsstelle teilzunehmen.
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Footer Note */}
        <div className="text-center mt-12">
          <p className="text-sm text-gray-500">
            Bei Fragen zum Impressum wenden Sie sich bitte an:{' '}
            <a href="mailto:legal@socialmediakampagnen.com" className="text-blue-600 hover:underline">
              legal@socialmediakampagnen.com
            </a>
          </p>
        </div>
      </div>
    </div>
  )
}

export default ImpressumPage
