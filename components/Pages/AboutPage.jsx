import React from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card'
import { Badge } from '../ui/badge'
import { Button } from '../ui/button'
import { 
  Users, 
  Target, 
  Award, 
  Heart,
  Linkedin,
  Mail,
  MapPin,
  Phone,
  Globe,
  Zap,
  Shield,
  TrendingUp
} from 'lucide-react'

const AboutPage = () => {
  const teamMembers = [
    {
      name: 'Martin Kelm',
      role: 'CEO & Gründer',
      description: 'Experte für digitales Marketing mit über 10 Jahren Erfahrung in der Branche.',
      image: '👨‍💼',
      linkedin: '#',
      email: 'martin@socialmediakampagnen.com'
    },
    {
      name: 'Sarah Schmidt',
      role: 'CTO',
      description: 'Technische Leiterin mit Fokus auf innovative Lösungen und Plattform-Entwicklung.',
      image: '👩‍💻',
      linkedin: '#',
      email: 'sarah@socialmediakampagnen.com'
    },
    {
      name: 'Alex Weber',
      role: 'Head of Marketing',
      description: 'Spezialist für Social Media Strategien und Performance Marketing.',
      image: '👨‍🎨',
      linkedin: '#',
      email: 'alex@socialmediakampagnen.com'
    },
    {
      name: 'Lisa Müller',
      role: 'Customer Success',
      description: 'Sorgt dafür, dass unsere Kunden maximalen Erfolg mit unserer Plattform haben.',
      image: '👩‍🎓',
      linkedin: '#',
      email: 'lisa@socialmediakampagnen.com'
    }
  ]

  const values = [
    {
      icon: <Target className="w-8 h-8" />,
      title: 'Zielorientiert',
      description: 'Wir fokussieren uns auf messbare Ergebnisse und den Erfolg unserer Kunden.',
      color: 'from-blue-500 to-cyan-500'
    },
    {
      icon: <Heart className="w-8 h-8" />,
      title: 'Kundenorientiert',
      description: 'Unsere Kunden stehen im Mittelpunkt. Ihr Erfolg ist unser Erfolg.',
      color: 'from-pink-500 to-rose-500'
    },
    {
      icon: <Zap className="w-8 h-8" />,
      title: 'Innovativ',
      description: 'Wir entwickeln ständig neue Features und verbessern unsere Plattform.',
      color: 'from-yellow-500 to-orange-500'
    },
    {
      icon: <Shield className="w-8 h-8" />,
      title: 'Vertrauenswürdig',
      description: 'Datenschutz und Sicherheit haben bei uns höchste Priorität.',
      color: 'from-green-500 to-emerald-500'
    }
  ]

  const stats = [
    { number: '1000+', label: 'Zufriedene Kunden', icon: <Users className="w-6 h-6" /> },
    { number: '50K+', label: 'Erfolgreiche Kampagnen', icon: <Target className="w-6 h-6" /> },
    { number: '98%', label: 'Kundenzufriedenheit', icon: <Award className="w-6 h-6" /> },
    { number: '24/7', label: 'Support verfügbar', icon: <Heart className="w-6 h-6" /> }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      {/* Hero Section */}
      <section className="py-16 sm:py-20 px-4 sm:px-6 bg-gradient-to-br from-purple-600 via-pink-500 to-orange-400">
        <div className="max-w-7xl mx-auto text-center">
          <div className="flex flex-wrap justify-center gap-2 sm:gap-3 mb-6 sm:mb-8">
            <Badge className="bg-white/20 text-white border-white/30 text-xs sm:text-sm px-3 py-1 font-medium">
              🚀 MISSION
            </Badge>
            <Badge className="bg-white/20 text-white border-white/30 text-xs sm:text-sm px-3 py-1 font-medium">
              💡 VISION
            </Badge>
            <Badge className="bg-white/20 text-white border-white/30 text-xs sm:text-sm px-3 py-1 font-medium">
              ❤️ WERTE
            </Badge>
          </div>
          
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
            Über <span className="text-yellow-300">socialmediakampagnen.com</span>
          </h1>
          
          <p className="text-xl sm:text-2xl text-white/90 mb-8 max-w-4xl mx-auto leading-relaxed">
            Wir machen Social Media Marketing für jeden zugänglich - 
            ohne technisches Know-how, ohne Komplexität, mit maximalen Ergebnissen.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button className="bg-white text-purple-600 hover:bg-gray-100 text-lg px-8 py-4 rounded-xl font-semibold">
              <Mail className="w-5 h-5 mr-2" />
              Kontakt aufnehmen
            </Button>
            <Button variant="outline" className="border-2 border-white text-white hover:bg-white hover:text-purple-600 text-lg px-8 py-4 rounded-xl font-semibold">
              <Globe className="w-5 h-5 mr-2" />
              Mehr erfahren
            </Button>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map((stat, index) => (
              <Card key={index} className="text-center bg-white shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
                <CardContent className="pt-6">
                  <div className="flex justify-center mb-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white">
                      {stat.icon}
                    </div>
                  </div>
                  <div className="text-3xl sm:text-4xl font-bold text-gray-900 mb-2">{stat.number}</div>
                  <p className="text-gray-600 text-sm sm:text-base">{stat.label}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-16 px-4 sm:px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <Badge className="bg-purple-100 text-purple-800 border-purple-200 text-sm px-4 py-2 mb-4">
              UNSERE MISSION
            </Badge>
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-6">
              Warum gibt es <span className="text-purple-600">socialmediakampagnen.com</span>?
            </h2>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-6">
                Social Media Marketing war noch nie so <span className="text-green-600">einfach</span>
              </h3>
              <div className="space-y-4 text-gray-600 text-lg leading-relaxed">
                <p>
                  Wir haben socialmediakampagnen.com gegründet, weil wir gesehen haben, wie schwer es für kleine und mittlere 
                  Unternehmen ist, erfolgreiches Social Media Marketing zu betreiben.
                </p>
                <p>
                  Komplizierte Tools, teure Agenturen und technische Hürden haben viele Unternehmen 
                  davon abgehalten, das volle Potenzial von Social Media zu nutzen.
                </p>
                <p>
                  <strong className="text-purple-600">Unsere Mission:</strong> Wir demokratisieren Social Media Marketing 
                  und machen es für jeden zugänglich - unabhängig von technischen Kenntnissen oder Budget.
                </p>
              </div>
            </div>
            
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-3xl blur-3xl"></div>
              <Card className="relative bg-gradient-to-br from-purple-50 to-pink-50 border-0 shadow-xl">
                <CardContent className="p-8">
                  <div className="text-center">
                    <div className="text-6xl mb-4">🎯</div>
                    <h4 className="text-xl font-bold text-gray-900 mb-4">Unser Ziel</h4>
                    <p className="text-gray-600 leading-relaxed">
                      Bis 2025 wollen wir 10.000 Unternehmen dabei geholfen haben, 
                      ihre Social Media Präsenz zu professionalisieren und ihre Umsätze zu steigern.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-16 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <Badge className="bg-blue-100 text-blue-800 border-blue-200 text-sm px-4 py-2 mb-4">
              UNSERE WERTE
            </Badge>
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-6">
              Wofür wir <span className="text-blue-600">stehen</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Diese Werte leiten uns in allem, was wir tun - von der Produktentwicklung bis zum Kundensupport.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {values.map((value, index) => (
              <Card key={index} className="bg-white shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 border-0">
                <CardContent className="p-8">
                  <div className="flex items-start space-x-4">
                    <div className={`w-16 h-16 bg-gradient-to-br ${value.color} rounded-xl flex items-center justify-center text-white flex-shrink-0`}>
                      {value.icon}
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-gray-900 mb-3">{value.title}</h3>
                      <p className="text-gray-600 leading-relaxed">{value.description}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16 px-4 sm:px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <Badge className="bg-green-100 text-green-800 border-green-200 text-sm px-4 py-2 mb-4">
              UNSER TEAM
            </Badge>
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-6">
              Die Menschen hinter <span className="text-green-600">socialmediakampagnen.com</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Lernen Sie das Team kennen, das täglich daran arbeitet, Ihr Social Media Marketing zu verbessern.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {teamMembers.map((member, index) => (
              <Card key={index} className="bg-white shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 border-0">
                <CardContent className="p-6 text-center">
                  <div className="text-6xl mb-4">{member.image}</div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{member.name}</h3>
                  <Badge className="bg-purple-100 text-purple-800 border-purple-200 text-sm mb-4">
                    {member.role}
                  </Badge>
                  <p className="text-gray-600 text-sm leading-relaxed mb-6">{member.description}</p>
                  <div className="flex justify-center space-x-3">
                    <Button variant="ghost" size="sm" className="text-blue-600 hover:bg-blue-50">
                      <Linkedin className="w-4 h-4" />
                    </Button>
                    <Button variant="ghost" size="sm" className="text-gray-600 hover:bg-gray-50">
                      <Mail className="w-4 h-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Contact CTA */}
      <section className="py-16 px-4 sm:px-6 bg-gradient-to-r from-purple-600 to-pink-600">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6">
            Haben Sie Fragen? Sprechen Sie mit uns!
          </h2>
          <p className="text-xl text-white/90 mb-8">
            Unser Team steht Ihnen gerne zur Verfügung und beantwortet alle Ihre Fragen zu socialmediakampagnen.com.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button className="bg-white text-purple-600 hover:bg-gray-100 text-lg px-8 py-4 rounded-xl font-semibold">
              <Mail className="w-5 h-5 mr-2" />
              E-Mail schreiben
            </Button>
            <Button variant="outline" className="border-2 border-white text-white hover:bg-white hover:text-purple-600 text-lg px-8 py-4 rounded-xl font-semibold">
              <Phone className="w-5 h-5 mr-2" />
              Anrufen
            </Button>
          </div>
          
          <div className="mt-8 pt-8 border-t border-white/20">
            <div className="flex flex-wrap justify-center gap-6 text-white/80">
              <div className="flex items-center space-x-2">
                <MapPin className="w-4 h-4" />
                <span>Berlin, Deutschland</span>
              </div>
              <div className="flex items-center space-x-2">
                <Mail className="w-4 h-4" />
                <span>hello@socialmediakampagnen.com</span>
              </div>
              <div className="flex items-center space-x-2">
                <Phone className="w-4 h-4" />
                <span>+49 30 12345678</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default AboutPage

