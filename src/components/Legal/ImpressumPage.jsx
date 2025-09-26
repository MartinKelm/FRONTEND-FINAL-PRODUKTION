import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card'
import { Building, Mail, AlertCircle, Shield, FileText } from 'lucide-react'

const ImpressumPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 pt-24 pb-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <div className="flex justify-center mb-6">
            <div className="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center">
              <Building className="w-8 h-8 text-white" />
            </div>
          </div>
          <h1 className="text-4xl font-bold text-white mb-4">
            Impressum
          </h1>
          <p className="text-xl text-white/80">
            Angaben gemäß § 5 TMG
          </p>
        </div>

        <Card className="bg-white/95 backdrop-blur-sm shadow-2xl">
          <CardContent className="p-8 space-y-8">
            
            {/* Anbieter */}
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                <Building className="w-6 h-6 mr-3 text-purple-600" />
                Anbieter
              </h2>
              
              <div className="bg-gray-50 p-6 rounded-lg">
                <div className="space-y-2">
                  <p className="text-xl font-semibold text-gray-900">Martin Kelm</p>
                  <p className="text-gray-700">Im Weidenblech 25</p>
                  <p className="text-gray-700">51371 Leverkusen</p>
                  <p className="text-gray-700">Deutschland</p>
                </div>
              </div>
            </section>

            {/* Kontakt */}
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                <Mail className="w-6 h-6 mr-3 text-blue-600" />
                Kontakt
              </h2>
              
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <Mail className="w-5 h-5 text-blue-600" />
                  <span className="text-gray-700">
                    <strong>E-Mail:</strong> info@socialmediakampagnen.com
                  </span>
                </div>
                
                <div className="bg-blue-50 p-4 rounded-lg border-l-4 border-blue-500">
                  <p className="text-blue-800">
                    <strong>Hinweis:</strong> Es wird keine Telefonnummer angegeben. 
                    Bitte kontaktieren Sie uns per E-Mail.
                  </p>
                </div>
              </div>
            </section>

            {/* Verantwortlich für den Inhalt */}
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                <Shield className="w-6 h-6 mr-3 text-green-600" />
                Verantwortlich für den Inhalt nach § 55 Abs. 2 RStV
              </h2>
              
              <div className="bg-gray-50 p-6 rounded-lg">
                <div className="space-y-2">
                  <p className="text-lg font-semibold text-gray-900">Martin Kelm</p>
                  <p className="text-gray-700">Im Weidenblech 25</p>
                  <p className="text-gray-700">51371 Leverkusen</p>
                </div>
              </div>
            </section>

            {/* Haftungsausschluss */}
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                <AlertCircle className="w-6 h-6 mr-3 text-orange-600" />
                Haftungsausschluss
              </h2>
              
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-3">Haftung für Inhalte</h3>
                  <p className="text-gray-700 leading-relaxed">
                    Die Inhalte unserer Seiten wurden mit größter Sorgfalt erstellt. Für die Richtigkeit, 
                    Vollständigkeit und Aktualität der Inhalte können wir jedoch keine Gewähr übernehmen. 
                    Als Diensteanbieter sind wir gemäß § 7 Abs.1 TMG für eigene Inhalte auf diesen Seiten 
                    nach den allgemeinen Gesetzen verantwortlich. Nach §§ 8 bis 10 TMG sind wir als 
                    Diensteanbieter jedoch nicht verpflichtet, übermittelte oder gespeicherte fremde 
                    Informationen zu überwachen oder nach Umständen zu forschen, die auf eine rechtswidrige 
                    Tätigkeit hinweisen.
                  </p>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-3">Haftung für Links</h3>
                  <p className="text-gray-700 leading-relaxed">
                    Unser Angebot enthält Links zu externen Websites Dritter, auf deren Inhalte wir keinen 
                    Einfluss haben. Deshalb können wir für diese fremden Inhalte auch keine Gewähr übernehmen. 
                    Für die Inhalte der verlinkten Seiten ist stets der jeweilige Anbieter oder Betreiber der 
                    Seiten verantwortlich. Die verlinkten Seiten wurden zum Zeitpunkt der Verlinkung auf 
                    mögliche Rechtsverstöße überprüft. Rechtswidrige Inhalte waren zum Zeitpunkt der 
                    Verlinkung nicht erkennbar.
                  </p>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-3">Urheberrecht</h3>
                  <p className="text-gray-700 leading-relaxed">
                    Die durch die Seitenbetreiber erstellten Inhalte und Werke auf diesen Seiten unterliegen 
                    dem deutschen Urheberrecht. Die Vervielfältigung, Bearbeitung, Verbreitung und jede Art 
                    der Verwertung außerhalb der Grenzen des Urheberrechtes bedürfen der schriftlichen 
                    Zustimmung des jeweiligen Autors bzw. Erstellers. Downloads und Kopien dieser Seite sind 
                    nur für den privaten, nicht kommerziellen Gebrauch gestattet.
                  </p>
                </div>
              </div>
            </section>

            {/* EU-Streitschlichtung */}
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                <FileText className="w-6 h-6 mr-3 text-purple-600" />
                EU-Streitschlichtung
              </h2>
              
              <div className="bg-purple-50 p-6 rounded-lg border-l-4 border-purple-500">
                <p className="text-purple-800 leading-relaxed">
                  Die Europäische Kommission stellt eine Plattform zur Online-Streitbeilegung (OS) bereit: 
                  <a 
                    href="https://ec.europa.eu/consumers/odr/" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-purple-600 hover:underline ml-1"
                  >
                    https://ec.europa.eu/consumers/odr/
                  </a>
                </p>
                <p className="text-purple-800 mt-3">
                  Wir sind nicht bereit oder verpflichtet, an Streitbeilegungsverfahren vor einer 
                  Verbraucherschlichtungsstelle teilzunehmen.
                </p>
              </div>
            </section>

            {/* Geschäftstätigkeit */}
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                Geschäftstätigkeit
              </h2>
              
              <div className="bg-gray-50 p-6 rounded-lg">
                <p className="text-gray-700 leading-relaxed">
                  Der Inhaber stellt socialmediakampagnen.com zur Nutzung durch Geschäftskunden bereit. 
                  Die Plattform richtet sich ausschließlich an Unternehmen, Gewerbetreibende und 
                  Freiberufler (B2B-Bereich).
                </p>
              </div>
            </section>

            {/* Stand */}
            <div className="text-center pt-8 border-t border-gray-200">
              <p className="text-gray-500 text-sm">
                Stand: Dezember 2024
              </p>
            </div>

          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default ImpressumPage
