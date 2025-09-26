import React, { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card'
import { Badge } from '../ui/badge'
import { Button } from '../ui/button'
import { Input } from '../ui/input'
import { Label } from '../ui/label'
import { Textarea } from '../ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select'
import { 
  Mail, 
  Phone, 
  MapPin, 
  Clock,
  Send,
  MessageCircle,
  Headphones,
  Globe,
  CheckCircle,
  User,
  Building,
  HelpCircle
} from 'lucide-react'

const ContactPage = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    company: '',
    phone: '',
    subject: '',
    message: '',
    priority: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    // Simuliere Formular-Übermittlung
    setTimeout(() => {
      setIsSubmitting(false)
      setIsSubmitted(true)
    }, 2000)
  }

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSelectChange = (value, field) => {
    setFormData({
      ...formData,
      [field]: value
    })
  }

  const contactMethods = [
    {
      icon: <Mail className="w-8 h-8" />,
      title: 'E-Mail Support',
      description: 'Schreiben Sie uns eine E-Mail und wir antworten innerhalb von 24 Stunden.',
      contact: 'support@smk.de',
      action: 'E-Mail senden',
      color: 'from-blue-500 to-cyan-500',
      available: '24/7 verfügbar'
    },
    {
      icon: <Phone className="w-8 h-8" />,
      title: 'Telefon Support',
      description: 'Rufen Sie uns an für sofortige Hilfe bei dringenden Fragen.',
      contact: '+49 30 12345678',
      action: 'Anrufen',
      color: 'from-green-500 to-emerald-500',
      available: 'Mo-Fr 9:00-18:00'
    },
    {
      icon: <MessageCircle className="w-8 h-8" />,
      title: 'Live Chat',
      description: 'Chatten Sie direkt mit unserem Support-Team für schnelle Antworten.',
      contact: 'Chat starten',
      action: 'Chat öffnen',
      color: 'from-purple-500 to-pink-500',
      available: 'Mo-Fr 9:00-17:00'
    },
    {
      icon: <Headphones className="w-8 h-8" />,
      title: 'Video Call',
      description: 'Buchen Sie einen persönlichen Video-Termin für ausführliche Beratung.',
      contact: 'Termin buchen',
      action: 'Termin vereinbaren',
      color: 'from-orange-500 to-red-500',
      available: 'Nach Vereinbarung'
    }
  ]

  const officeInfo = [
    {
      title: 'Hauptsitz Berlin',
      address: 'Unter den Linden 1\n10117 Berlin\nDeutschland',
      phone: '+49 30 12345678',
      email: 'berlin@smk.de'
    },
    {
      title: 'Büro München',
      address: 'Marienplatz 8\n80331 München\nDeutschland',
      phone: '+49 89 87654321',
      email: 'muenchen@smk.de'
    }
  ]

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-600 via-emerald-500 to-teal-400 flex items-center justify-center p-4">
        <Card className="max-w-md w-full shadow-2xl border-0 bg-white/95 backdrop-blur-sm">
          <CardContent className="p-8 text-center">
            <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="w-8 h-8 text-white" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Nachricht gesendet!
            </h2>
            <p className="text-gray-600 mb-6 leading-relaxed">
              Vielen Dank für Ihre Nachricht. Wir haben Ihre Anfrage erhalten und werden uns 
              innerhalb von 24 Stunden bei Ihnen melden.
            </p>
            <Button 
              onClick={() => setIsSubmitted(false)}
              className="bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white"
            >
              Weitere Nachricht senden
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      {/* Hero Section */}
      <section className="py-16 sm:py-20 px-4 sm:px-6 bg-gradient-to-br from-blue-600 via-purple-500 to-pink-400">
        <div className="max-w-7xl mx-auto text-center">
          <div className="flex flex-wrap justify-center gap-2 sm:gap-3 mb-6 sm:mb-8">
            <Badge className="bg-white/20 text-white border-white/30 text-xs sm:text-sm px-3 py-1 font-medium">
              📞 SUPPORT
            </Badge>
            <Badge className="bg-white/20 text-white border-white/30 text-xs sm:text-sm px-3 py-1 font-medium">
              💬 BERATUNG
            </Badge>
            <Badge className="bg-white/20 text-white border-white/30 text-xs sm:text-sm px-3 py-1 font-medium">
              🚀 HILFE
            </Badge>
          </div>
          
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
            Kontaktieren Sie <span className="text-yellow-300">uns</span>
          </h1>
          
          <p className="text-xl sm:text-2xl text-white/90 mb-8 max-w-4xl mx-auto leading-relaxed">
            Haben Sie Fragen zu socialmediakampagnen.com? Unser Team steht Ihnen gerne zur Verfügung 
            und hilft Ihnen bei allen Anliegen weiter.
          </p>
          
          <div className="flex flex-wrap justify-center gap-4 sm:gap-6">
            <Badge className="bg-white/10 text-white border-white/20 text-sm px-4 py-2">
              ⚡ Schnelle Antworten
            </Badge>
            <Badge className="bg-white/10 text-white border-white/20 text-sm px-4 py-2">
              🎯 Persönliche Beratung
            </Badge>
            <Badge className="bg-white/10 text-white border-white/20 text-sm px-4 py-2">
              🔒 Vertraulich
            </Badge>
          </div>
        </div>
      </section>

      {/* Contact Methods */}
      <section className="py-16 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <Badge className="bg-purple-100 text-purple-800 border-purple-200 text-sm px-4 py-2 mb-4">
              KONTAKT-OPTIONEN
            </Badge>
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-6">
              Wie möchten Sie uns <span className="text-purple-600">erreichen</span>?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Wählen Sie die für Sie passende Kontaktmöglichkeit. Wir sind für Sie da!
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {contactMethods.map((method, index) => (
              <Card key={index} className="bg-white shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 border-0">
                <CardContent className="p-6 text-center">
                  <div className={`w-16 h-16 bg-gradient-to-br ${method.color} rounded-xl flex items-center justify-center text-white mx-auto mb-4`}>
                    {method.icon}
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 mb-2">{method.title}</h3>
                  <p className="text-gray-600 text-sm mb-4 leading-relaxed">{method.description}</p>
                  <div className="mb-4">
                    <p className="font-medium text-gray-900 mb-1">{method.contact}</p>
                    <Badge className="bg-gray-100 text-gray-700 text-xs">
                      <Clock className="w-3 h-3 mr-1" />
                      {method.available}
                    </Badge>
                  </div>
                  <Button className={`w-full bg-gradient-to-r ${method.color} hover:opacity-90 text-white`}>
                    {method.action}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form */}
      <section className="py-16 px-4 sm:px-6 bg-white">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <Badge className="bg-blue-100 text-blue-800 border-blue-200 text-sm px-4 py-2 mb-4">
              NACHRICHT SENDEN
            </Badge>
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-6">
              Schreiben Sie uns eine <span className="text-blue-600">Nachricht</span>
            </h2>
            <p className="text-xl text-gray-600">
              Füllen Sie das Formular aus und wir melden uns innerhalb von 24 Stunden bei Ihnen.
            </p>
          </div>
          
          <Card className="shadow-2xl border-0 bg-gradient-to-br from-blue-50 to-purple-50">
            <CardContent className="p-8">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="firstName" className="text-sm font-medium text-gray-700">
                      Vorname *
                    </Label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                      <Input
                        id="firstName"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleChange}
                        className="pl-10 h-12 border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                        placeholder="Max"
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="lastName" className="text-sm font-medium text-gray-700">
                      Nachname *
                    </Label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                      <Input
                        id="lastName"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleChange}
                        className="pl-10 h-12 border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                        placeholder="Mustermann"
                        required
                      />
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-sm font-medium text-gray-700">
                      E-Mail-Adresse *
                    </Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                        className="pl-10 h-12 border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                        placeholder="max@unternehmen.de"
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="phone" className="text-sm font-medium text-gray-700">
                      Telefon (optional)
                    </Label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                      <Input
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        className="pl-10 h-12 border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                        placeholder="+49 123 456789"
                      />
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="company" className="text-sm font-medium text-gray-700">
                      Unternehmen (optional)
                    </Label>
                    <div className="relative">
                      <Building className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                      <Input
                        id="company"
                        name="company"
                        value={formData.company}
                        onChange={handleChange}
                        className="pl-10 h-12 border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                        placeholder="Ihr Unternehmen GmbH"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label className="text-sm font-medium text-gray-700">
                      Priorität
                    </Label>
                    <Select onValueChange={(value) => handleSelectChange(value, 'priority')}>
                      <SelectTrigger className="h-12 border-gray-300">
                        <SelectValue placeholder="Priorität wählen" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="low">
                          <div className="flex items-center space-x-2">
                            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                            <span>Niedrig - Allgemeine Frage</span>
                          </div>
                        </SelectItem>
                        <SelectItem value="medium">
                          <div className="flex items-center space-x-2">
                            <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                            <span>Mittel - Support benötigt</span>
                          </div>
                        </SelectItem>
                        <SelectItem value="high">
                          <div className="flex items-center space-x-2">
                            <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                            <span>Hoch - Dringend</span>
                          </div>
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="subject" className="text-sm font-medium text-gray-700">
                    Betreff *
                  </Label>
                  <div className="relative">
                    <HelpCircle className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <Input
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      className="pl-10 h-12 border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                      placeholder="Worum geht es in Ihrer Nachricht?"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="message" className="text-sm font-medium text-gray-700">
                    Nachricht *
                  </Label>
                  <Textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    className="min-h-32 border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                    placeholder="Beschreiben Sie Ihr Anliegen ausführlich..."
                    required
                  />
                </div>

                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <div className="flex items-start space-x-3">
                    <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <CheckCircle className="w-4 h-4 text-white" />
                    </div>
                    <div className="text-sm text-blue-800">
                      <p className="font-medium mb-1">Ihre Daten sind sicher</p>
                      <p>Wir behandeln Ihre Informationen vertraulich und geben sie nicht an Dritte weiter. Weitere Informationen finden Sie in unserer Datenschutzerklärung.</p>
                    </div>
                  </div>
                </div>

                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full h-14 bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white font-semibold text-lg"
                >
                  {isSubmitting ? (
                    <>
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                      Wird gesendet...
                    </>
                  ) : (
                    <>
                      <Send className="w-5 h-5 mr-2" />
                      Nachricht senden
                    </>
                  )}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Office Information */}
      <section className="py-16 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <Badge className="bg-green-100 text-green-800 border-green-200 text-sm px-4 py-2 mb-4">
              UNSERE STANDORTE
            </Badge>
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-6">
              Besuchen Sie uns <span className="text-green-600">vor Ort</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Wir haben Büros in den wichtigsten deutschen Städten. Vereinbaren Sie gerne einen persönlichen Termin.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {officeInfo.map((office, index) => (
              <Card key={index} className="bg-white shadow-lg hover:shadow-xl transition-all duration-300 border-0">
                <CardContent className="p-8">
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-500 rounded-xl flex items-center justify-center text-white flex-shrink-0">
                      <MapPin className="w-6 h-6" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-gray-900 mb-3">{office.title}</h3>
                      <div className="space-y-2 text-gray-600">
                        <div className="flex items-start space-x-2">
                          <MapPin className="w-4 h-4 mt-1 text-gray-400" />
                          <div className="whitespace-pre-line">{office.address}</div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Phone className="w-4 h-4 text-gray-400" />
                          <span>{office.phone}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Mail className="w-4 h-4 text-gray-400" />
                          <span>{office.email}</span>
                        </div>
                      </div>
                      <Button className="mt-4 bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white">
                        Termin vereinbaren
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Quick Links */}
      <section className="py-16 px-4 sm:px-6 bg-gradient-to-r from-purple-600 to-pink-600">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6">
            Häufige Fragen bereits beantwortet?
          </h2>
          <p className="text-xl text-white/90 mb-8">
            Schauen Sie in unsere FAQ-Sektion - vielleicht finden Sie dort bereits die Antwort auf Ihre Frage.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button className="bg-white text-purple-600 hover:bg-gray-100 text-lg px-8 py-4 rounded-xl font-semibold">
              <HelpCircle className="w-5 h-5 mr-2" />
              FAQ durchsuchen
            </Button>
            <Button variant="outline" className="border-2 border-white text-white hover:bg-white hover:text-purple-600 text-lg px-8 py-4 rounded-xl font-semibold">
              <Globe className="w-5 h-5 mr-2" />
              Hilfe-Center
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}

export default ContactPage

