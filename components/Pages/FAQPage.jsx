import React, { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card'
import { Badge } from '../ui/badge'
import { Button } from '../ui/button'
import { Input } from '../ui/input'
import { 
  ChevronDown, 
  ChevronUp, 
  Search,
  HelpCircle,
  MessageCircle,
  Phone,
  Mail,
  Star,
  CheckCircle,
  Clock,
  Shield,
  CreditCard,
  Settings,
  Users,
  BarChart3,
  Zap
} from 'lucide-react'

const FAQPage = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const [activeCategory, setActiveCategory] = useState('all')
  const [openItems, setOpenItems] = useState({})

  const toggleItem = (id) => {
    setOpenItems(prev => ({
      ...prev,
      [id]: !prev[id]
    }))
  }

  const categories = [
    { id: 'all', name: 'Alle Fragen', icon: <HelpCircle className="w-4 h-4" />, color: 'bg-gray-100 text-gray-800' },
    { id: 'general', name: 'Allgemein', icon: <Star className="w-4 h-4" />, color: 'bg-blue-100 text-blue-800' },
    { id: 'pricing', name: 'Preise', icon: <CreditCard className="w-4 h-4" />, color: 'bg-green-100 text-green-800' },
    { id: 'features', name: 'Features', icon: <Settings className="w-4 h-4" />, color: 'bg-purple-100 text-purple-800' },
    { id: 'account', name: 'Account', icon: <Users className="w-4 h-4" />, color: 'bg-orange-100 text-orange-800' },
    { id: 'technical', name: 'Technisch', icon: <Zap className="w-4 h-4" />, color: 'bg-red-100 text-red-800' },
    { id: 'security', name: 'Sicherheit', icon: <Shield className="w-4 h-4" />, color: 'bg-teal-100 text-teal-800' }
  ]

  const faqData = [
    {
      id: 1,
      category: 'general',
      question: 'Was ist socialmediakampagnen.com und wie funktioniert es?',
      answer: 'socialmediakampagnen.com ist eine All-in-One Social Media Marketing Plattform, die es Unternehmen ermöglicht, professionelle Werbekampagnen auf verschiedenen Plattformen wie Facebook, Instagram, TikTok und LinkedIn zu erstellen und zu verwalten. Unsere intuitive Benutzeroberfläche macht es auch für Anfänger einfach, erfolgreiche Kampagnen zu starten.',
      helpful: 156,
      tags: ['Grundlagen', 'Plattform', 'Marketing']
    },
    {
      id: 2,
      category: 'general',
      question: 'Für wen ist socialmediakampagnen.com geeignet?',
      answer: 'socialmediakampagnen.com ist perfekt für kleine und mittlere Unternehmen, Freelancer, Marketing-Agenturen und alle, die ihre Social Media Präsenz professionalisieren möchten. Egal ob Sie Anfänger oder Experte sind - unsere Plattform passt sich Ihrem Kenntnisstand an.',
      helpful: 142,
      tags: ['Zielgruppe', 'Unternehmen', 'Anfänger']
    },
    {
      id: 3,
      category: 'pricing',
      question: 'Welche Preispläne gibt es bei socialmediakampagnen.com?',
      answer: 'Wir bieten zwei Hauptpläne an: Standard (49€/Monat) für kleinere Unternehmen mit grundlegenden Features und Pro (99€/Monat) für größere Unternehmen mit erweiterten Funktionen wie erweiterte Analytics, Priority Support und unbegrenzte Kampagnen. Beide Pläne können monatlich gekündigt werden.',
      helpful: 203,
      tags: ['Preise', 'Pläne', 'Kosten']
    },
    {
      id: 4,
      category: 'pricing',
      question: 'Gibt es eine kostenlose Testversion?',
      answer: 'Ja! Wir bieten eine 14-tägige kostenlose Testversion an, in der Sie alle Features des Pro-Plans testen können. Keine Kreditkarte erforderlich. Nach der Testphase können Sie entscheiden, welcher Plan am besten zu Ihnen passt.',
      helpful: 189,
      tags: ['Kostenlos', 'Test', 'Trial']
    },
    {
      id: 5,
      category: 'pricing',
      question: 'Kann ich meinen Plan jederzeit ändern?',
      answer: 'Absolut! Sie können Ihren Plan jederzeit upgraden oder downgraden. Upgrades werden sofort wirksam, bei Downgrades gilt die Änderung ab dem nächsten Abrechnungszyklus. Es gibt keine versteckten Kosten oder Gebühren für Planänderungen.',
      helpful: 167,
      tags: ['Planwechsel', 'Upgrade', 'Flexibilität']
    },
    {
      id: 6,
      category: 'features',
      question: 'Welche Social Media Plattformen werden unterstützt?',
      answer: 'socialmediakampagnen.com unterstützt alle wichtigen Plattformen: Facebook, Instagram, TikTok, LinkedIn, Twitter, YouTube, Pinterest und Snapchat. Wir fügen regelmäßig neue Plattformen hinzu, basierend auf den Wünschen unserer Nutzer.',
      helpful: 234,
      tags: ['Plattformen', 'Facebook', 'Instagram', 'TikTok']
    },
    {
      id: 7,
      category: 'features',
      question: 'Kann ich meine Kampagnen im Voraus planen?',
      answer: 'Ja! Mit unserem Kampagnen-Scheduler können Sie Ihre Kampagnen bis zu 6 Monate im Voraus planen. Sie können Start- und Endzeiten festlegen, Budgets automatisch anpassen und sogar saisonale Kampagnen vorbereiten.',
      helpful: 178,
      tags: ['Planung', 'Scheduler', 'Automatisierung']
    },
    {
      id: 8,
      category: 'features',
      question: 'Wie funktioniert die Live-Vorschau?',
      answer: 'Unsere Live-Vorschau zeigt Ihnen in Echtzeit, wie Ihre Anzeigen auf verschiedenen Plattformen aussehen werden. Sie können zwischen Desktop- und Mobile-Ansicht wechseln und verschiedene Platzierungen (Feed, Stories, etc.) testen, bevor Sie die Kampagne starten.',
      helpful: 195,
      tags: ['Vorschau', 'Live', 'Design']
    },
    {
      id: 9,
      category: 'account',
      question: 'Wie erstelle ich ein socialmediakampagnen.com-Konto?',
      answer: 'Die Registrierung ist einfach: Klicken Sie auf "Registrieren", geben Sie Ihre E-Mail-Adresse und Unternehmensdaten ein, wählen Sie einen Plan und bestätigen Sie Ihre E-Mail. Danach können Sie sofort mit der Erstellung Ihrer ersten Kampagne beginnen.',
      helpful: 156,
      tags: ['Registrierung', 'Konto', 'Anmeldung']
    },
    {
      id: 10,
      category: 'account',
      question: 'Kann ich mehrere Benutzer zu meinem Account hinzufügen?',
      answer: 'Im Pro-Plan können Sie bis zu 10 Teammitglieder hinzufügen. Jeder Benutzer kann individuelle Berechtigungen erhalten (Viewer, Editor, Admin). Im Standard-Plan ist ein zusätzlicher Benutzer inklusive.',
      helpful: 143,
      tags: ['Team', 'Benutzer', 'Berechtigungen']
    },
    {
      id: 11,
      category: 'technical',
      question: 'Welche Browser werden unterstützt?',
      answer: 'socialmediakampagnen.com funktioniert optimal in allen modernen Browsern: Chrome, Firefox, Safari, Edge. Wir empfehlen die neueste Version Ihres Browsers für die beste Performance. Mobile Browser werden ebenfalls vollständig unterstützt.',
      helpful: 98,
      tags: ['Browser', 'Kompatibilität', 'Technisch']
    },
    {
      id: 12,
      category: 'technical',
      question: 'Gibt es eine mobile App?',
      answer: 'Aktuell ist socialmediakampagnen.com als responsive Web-App verfügbar, die auf allen mobilen Geräten perfekt funktioniert. Eine native mobile App für iOS und Android ist für 2024 geplant und wird alle wichtigen Features enthalten.',
      helpful: 167,
      tags: ['Mobile', 'App', 'Responsive']
    },
    {
      id: 13,
      category: 'security',
      question: 'Wie sicher sind meine Daten bei socialmediakampagnen.com?',
      answer: 'Datensicherheit hat höchste Priorität. Wir verwenden SSL-Verschlüsselung, speichern Daten in deutschen Rechenzentren (DSGVO-konform), führen regelmäßige Sicherheitsaudits durch und haben ein SOC 2 Type II Zertifikat.',
      helpful: 201,
      tags: ['Sicherheit', 'DSGVO', 'Verschlüsselung']
    },
    {
      id: 14,
      category: 'security',
      question: 'Werden meine Kampagnendaten mit anderen geteilt?',
      answer: 'Nein, niemals! Ihre Kampagnendaten, Zielgruppen und Strategien bleiben vollständig privat. Wir verkaufen keine Daten und teilen sie nicht mit Dritten. Sie behalten die volle Kontrolle über Ihre Informationen.',
      helpful: 188,
      tags: ['Privatsphäre', 'Daten', 'Vertraulichkeit']
    },
    {
      id: 15,
      category: 'general',
      question: 'Wie kann ich socialmediakampagnen.com kündigen?',
      answer: 'Sie können Ihr Abonnement jederzeit in den Kontoeinstellungen kündigen. Die Kündigung wird zum Ende des aktuellen Abrechnungszeitraums wirksam. Ihre Daten bleiben weitere 30 Tage verfügbar, falls Sie sich umentscheiden.',
      helpful: 134,
      tags: ['Kündigung', 'Abonnement', 'Vertrag']
    }
  ]

  const filteredFAQs = faqData.filter(faq => {
    const matchesCategory = activeCategory === 'all' || faq.category === activeCategory
    const matchesSearch = faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         faq.answer.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         faq.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
    return matchesCategory && matchesSearch
  })

  const quickActions = [
    {
      title: 'Live Chat starten',
      description: 'Sofortige Hilfe von unserem Support-Team',
      icon: <MessageCircle className="w-6 h-6" />,
      color: 'from-blue-500 to-cyan-500',
      action: 'Chat öffnen'
    },
    {
      title: 'Telefon Support',
      description: 'Rufen Sie uns an: +49 30 12345678',
      icon: <Phone className="w-6 h-6" />,
      color: 'from-green-500 to-emerald-500',
      action: 'Anrufen'
    },
    {
      title: 'E-Mail Support',
      description: 'Schreiben Sie uns: support@smk.de',
      icon: <Mail className="w-6 h-6" />,
      color: 'from-purple-500 to-pink-500',
      action: 'E-Mail senden'
    }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      {/* Hero Section */}
      <section className="py-16 sm:py-20 px-4 sm:px-6 bg-gradient-to-br from-indigo-600 via-purple-500 to-pink-400">
        <div className="max-w-7xl mx-auto text-center">
          <div className="flex flex-wrap justify-center gap-2 sm:gap-3 mb-6 sm:mb-8">
            <Badge className="bg-white/20 text-white border-white/30 text-xs sm:text-sm px-3 py-1 font-medium">
              ❓ FAQ
            </Badge>
            <Badge className="bg-white/20 text-white border-white/30 text-xs sm:text-sm px-3 py-1 font-medium">
              💡 HILFE
            </Badge>
            <Badge className="bg-white/20 text-white border-white/30 text-xs sm:text-sm px-3 py-1 font-medium">
              🚀 ANTWORTEN
            </Badge>
          </div>
          
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
            Häufig gestellte <span className="text-yellow-300">Fragen</span>
          </h1>
          
          <p className="text-xl sm:text-2xl text-white/90 mb-8 max-w-4xl mx-auto leading-relaxed">
            Finden Sie schnell Antworten auf die wichtigsten Fragen zu socialmediakampagnen.com. 
            Unser Hilfe-Center ist rund um die Uhr für Sie da.
          </p>
          
          {/* Search Bar */}
          <div className="max-w-2xl mx-auto">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <Input
                type="text"
                placeholder="Durchsuchen Sie unsere FAQ..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-12 pr-4 py-4 text-lg bg-white/95 backdrop-blur-sm border-0 rounded-xl shadow-lg focus:ring-2 focus:ring-white/50"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Category Filter */}
      <section className="py-8 px-4 sm:px-6 bg-white border-b">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-wrap gap-3 justify-center">
            {categories.map((category) => (
              <Button
                key={category.id}
                variant={activeCategory === category.id ? "default" : "outline"}
                onClick={() => setActiveCategory(category.id)}
                className={`${
                  activeCategory === category.id 
                    ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white' 
                    : 'hover:bg-gray-50'
                } flex items-center space-x-2 px-4 py-2 rounded-lg transition-all duration-200`}
              >
                {category.icon}
                <span>{category.name}</span>
                {activeCategory === category.id && (
                  <Badge className="bg-white/20 text-white text-xs ml-2">
                    {filteredFAQs.length}
                  </Badge>
                )}
              </Button>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Content */}
      <section className="py-16 px-4 sm:px-6">
        <div className="max-w-4xl mx-auto">
          {searchTerm && (
            <div className="mb-8">
              <p className="text-gray-600">
                <span className="font-medium">{filteredFAQs.length}</span> Ergebnisse für 
                <span className="font-medium text-purple-600"> "{searchTerm}"</span>
              </p>
            </div>
          )}

          <div className="space-y-4">
            {filteredFAQs.map((faq) => (
              <Card key={faq.id} className="bg-white shadow-md hover:shadow-lg transition-all duration-200 border-0">
                <CardContent className="p-0">
                  <button
                    onClick={() => toggleItem(faq.id)}
                    className="w-full p-6 text-left hover:bg-gray-50 transition-colors duration-200"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <h3 className="text-lg font-semibold text-gray-900 mb-2">
                          {faq.question}
                        </h3>
                        <div className="flex flex-wrap gap-2">
                          {faq.tags.map((tag, index) => (
                            <Badge key={index} className="bg-gray-100 text-gray-700 text-xs">
                              {tag}
                            </Badge>
                          ))}
                        </div>
                      </div>
                      <div className="ml-4 flex items-center space-x-3">
                        <div className="flex items-center space-x-1 text-sm text-gray-500">
                          <CheckCircle className="w-4 h-4 text-green-500" />
                          <span>{faq.helpful}</span>
                        </div>
                        {openItems[faq.id] ? (
                          <ChevronUp className="w-5 h-5 text-gray-400" />
                        ) : (
                          <ChevronDown className="w-5 h-5 text-gray-400" />
                        )}
                      </div>
                    </div>
                  </button>
                  
                  {openItems[faq.id] && (
                    <div className="px-6 pb-6 border-t border-gray-100">
                      <div className="pt-4">
                        <p className="text-gray-700 leading-relaxed mb-4">
                          {faq.answer}
                        </p>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-4">
                            <span className="text-sm text-gray-500">War diese Antwort hilfreich?</span>
                            <div className="flex space-x-2">
                              <Button variant="outline" size="sm" className="text-green-600 border-green-200 hover:bg-green-50">
                                👍 Ja
                              </Button>
                              <Button variant="outline" size="sm" className="text-red-600 border-red-200 hover:bg-red-50">
                                👎 Nein
                              </Button>
                            </div>
                          </div>
                          <Badge className="bg-green-100 text-green-800 text-xs">
                            ✓ {faq.helpful} fanden das hilfreich
                          </Badge>
                        </div>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>

          {filteredFAQs.length === 0 && (
            <div className="text-center py-12">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Search className="w-8 h-8 text-gray-400" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Keine Ergebnisse gefunden
              </h3>
              <p className="text-gray-600 mb-6">
                Versuchen Sie andere Suchbegriffe oder kontaktieren Sie unser Support-Team.
              </p>
              <Button 
                onClick={() => setSearchTerm('')}
                className="bg-gradient-to-r from-purple-500 to-pink-500 text-white"
              >
                Suche zurücksetzen
              </Button>
            </div>
          )}
        </div>
      </section>

      {/* Quick Actions */}
      <section className="py-16 px-4 sm:px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <Badge className="bg-blue-100 text-blue-800 border-blue-200 text-sm px-4 py-2 mb-4">
              WEITERE HILFE
            </Badge>
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-6">
              Antwort nicht gefunden? <span className="text-blue-600">Wir helfen!</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Unser Support-Team steht Ihnen gerne zur Verfügung und beantwortet alle Ihre Fragen.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {quickActions.map((action, index) => (
              <Card key={index} className="bg-white shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 border-0">
                <CardContent className="p-8 text-center">
                  <div className={`w-16 h-16 bg-gradient-to-br ${action.color} rounded-xl flex items-center justify-center text-white mx-auto mb-6`}>
                    {action.icon}
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">{action.title}</h3>
                  <p className="text-gray-600 mb-6 leading-relaxed">{action.description}</p>
                  <Button className={`w-full bg-gradient-to-r ${action.color} hover:opacity-90 text-white`}>
                    {action.action}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Popular Articles */}
      <section className="py-16 px-4 sm:px-6 bg-gradient-to-r from-purple-600 to-pink-600">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6">
            Beliebte Hilfe-Artikel
          </h2>
          <p className="text-xl text-white/90 mb-8">
            Diese Artikel werden am häufigsten gelesen und könnten auch für Sie interessant sein.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Button variant="outline" className="border-2 border-white text-white hover:bg-white hover:text-purple-600 p-4 h-auto">
              <div className="text-left">
                <div className="font-semibold">Erste Schritte mit socialmediakampagnen.com</div>
                <div className="text-sm opacity-80">Kompletter Einsteiger-Guide</div>
              </div>
            </Button>
            <Button variant="outline" className="border-2 border-white text-white hover:bg-white hover:text-purple-600 p-4 h-auto">
              <div className="text-left">
                <div className="font-semibold">Kampagnen optimieren</div>
                <div className="text-sm opacity-80">Tipps für bessere Performance</div>
              </div>
            </Button>
            <Button variant="outline" className="border-2 border-white text-white hover:bg-white hover:text-purple-600 p-4 h-auto">
              <div className="text-left">
                <div className="font-semibold">Zielgruppen definieren</div>
                <div className="text-sm opacity-80">Erreichen Sie die richtigen Kunden</div>
              </div>
            </Button>
            <Button variant="outline" className="border-2 border-white text-white hover:bg-white hover:text-purple-600 p-4 h-auto">
              <div className="text-left">
                <div className="font-semibold">Budget richtig einsetzen</div>
                <div className="text-sm opacity-80">Maximaler ROI für Ihre Kampagnen</div>
              </div>
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}

export default FAQPage

