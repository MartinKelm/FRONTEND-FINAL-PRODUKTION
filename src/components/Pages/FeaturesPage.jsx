import React, { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card'
import { Badge } from '../ui/badge'
import { Button } from '../ui/button'
import { 
  Zap, 
  Target, 
  BarChart3, 
  Users, 
  Calendar,
  Eye,
  Shield,
  Smartphone,
  Globe,
  TrendingUp,
  Clock,
  CheckCircle,
  Star,
  Play,
  Pause,
  Settings,
  Download,
  Upload,
  MessageSquare,
  Heart,
  Share2,
  Filter,
  PieChart,
  LineChart,
  DollarSign,
  Megaphone,
  Lightbulb,
  Rocket,
  Award,
  Headphones
} from 'lucide-react'

const FeaturesPage = () => {
  const [activeTab, setActiveTab] = useState('overview')

  const featureCategories = [
    { id: 'overview', name: 'Übersicht', icon: <Star className="w-4 h-4" /> },
    { id: 'campaigns', name: 'Kampagnen', icon: <Megaphone className="w-4 h-4" /> },
    { id: 'analytics', name: 'Analytics', icon: <BarChart3 className="w-4 h-4" /> },
    { id: 'automation', name: 'Automatisierung', icon: <Zap className="w-4 h-4" /> },
    { id: 'collaboration', name: 'Zusammenarbeit', icon: <Users className="w-4 h-4" /> }
  ]

  const mainFeatures = [
    {
      icon: <Zap className="w-12 h-12" />,
      title: 'Kampagnen-Wizard',
      description: 'Erstellen Sie professionelle Kampagnen in nur 4 einfachen Schritten',
      details: [
        'Intuitive Benutzerführung',
        'Vorgefertigte Templates',
        'Automatische Optimierungsvorschläge',
        'Echtzeit-Vorschau'
      ],
      color: 'from-blue-500 to-cyan-500',
    },
    {
      icon: <Eye className="w-12 h-12" />,
      title: 'Live-Vorschau',
      description: 'Sehen Sie in Echtzeit, wie Ihre Anzeigen auf allen Plattformen aussehen',
      details: [
        'Desktop & Mobile Ansicht',
        'Alle Platzierungen (Feed, Stories, etc.)',
        'Verschiedene Bildschirmgrößen',
        'Interaktive Vorschau'
      ],
      color: 'from-green-500 to-emerald-500',
    },
    {
      icon: <BarChart3 className="w-12 h-12" />,
      title: 'Erweiterte Analytics',
      description: 'Detaillierte Einblicke in die Performance Ihrer Kampagnen',
      details: [
        'Echtzeit-Metriken',
        'ROI-Tracking',
        'Zielgruppen-Insights',
        'Automatische Berichte'
      ],
      color: 'from-purple-500 to-pink-500',
    },
    {
      icon: <Target className="w-12 h-12" />,
      title: 'Smart Targeting',
      description: 'KI-gestützte Zielgruppen-Optimierung für maximale Reichweite',
      details: [
        'Automatische Zielgruppen-Erstellung',
        'Lookalike Audiences',
        'Behavioral Targeting',
        'Geo-Targeting'
      ],
      color: 'from-orange-500 to-red-500',
    },
    {
      icon: <Calendar className="w-12 h-12" />,
      title: 'Kampagnen-Planer',
      description: 'Planen und automatisieren Sie Ihre Kampagnen im Voraus',
      details: [
        'Bis zu 6 Monate im Voraus',
        'Automatische Budgetanpassung',
        'Saisonale Kampagnen',
        'Wiederkehrende Kampagnen'
      ],
      color: 'from-teal-500 to-blue-500',
    },
    {
      icon: <Users className="w-12 h-12" />,
      title: 'Team-Kollaboration',
      description: 'Arbeiten Sie effizient im Team mit Rollen und Berechtigungen',
      details: [
        'Unbegrenzte Teammitglieder (Pro)',
        'Granulare Berechtigungen',
        'Kommentar-System',
        'Approval-Workflows'
      ],
      color: 'from-indigo-500 to-purple-500',
    }
  ]

  const platformFeatures = [
    {
      platform: 'Facebook & Instagram',
      icon: '📘',
      features: [
        'Feed-Anzeigen',
        'Stories-Anzeigen',
        'Reels-Anzeigen',
        'Messenger-Anzeigen',
        'Audience Network',
        'Shopping-Anzeigen'
      ],
      color: 'from-blue-600 to-blue-400'
    },
    {
      platform: 'TikTok',
      icon: '🎵',
      features: [
        'In-Feed-Anzeigen',
        'Brand Takeover',
        'TopView-Anzeigen',
        'Branded Effects',
        'Spark Ads',
        'Collection Ads'
      ],
      color: 'from-pink-600 to-pink-400'
    },
    {
      platform: 'LinkedIn',
      icon: '💼',
      features: [
        'Sponsored Content',
        'Message Ads',
        'Dynamic Ads',
        'Text Ads',
        'Lead Gen Forms',
        'Event Ads'
      ],
      color: 'from-blue-700 to-blue-500'
    },
    {
      platform: 'Google Ads',
      icon: '🔍',
      features: [
        'Search Ads',
        'Display Ads',
        'YouTube Ads',
        'Shopping Ads',
        'App Ads',
        'Discovery Ads'
      ],
      color: 'from-green-600 to-green-400'
    },
    {
      platform: 'Twitter',
      icon: '🐦',
      features: [
        'Promoted Tweets',
        'Promoted Accounts',
        'Promoted Trends',
        'Website Cards',
        'App Cards',
        'Conversation Ads'
      ],
      color: 'from-sky-600 to-sky-400'
    },
    {
      platform: 'Snapchat',
      icon: '👻',
      features: [
        'Snap Ads',
        'Story Ads',
        'Collection Ads',
        'AR Lenses',
        'Filters',
        'Commercials'
      ],
      color: 'from-yellow-500 to-yellow-300'
    }
  ]

  const automationFeatures = [
    {
      title: 'Auto-Optimierung',
      description: 'KI optimiert Ihre Kampagnen automatisch für bessere Performance',
      icon: <TrendingUp className="w-8 h-8" />,
      benefits: ['+35% bessere CTR', '+28% niedrigere CPC', '+42% höhere Conversions']
    },
    {
      title: 'Smart Bidding',
      description: 'Automatische Gebotsstrategien basierend auf Ihren Zielen',
      icon: <DollarSign className="w-8 h-8" />,
      benefits: ['Maximaler ROI', 'Automatische Anpassung', 'Echtzeit-Optimierung']
    },
    {
      title: 'Budget-Management',
      description: 'Intelligente Budgetverteilung über alle Kampagnen hinweg',
      icon: <PieChart className="w-8 h-8" />,
      benefits: ['Automatische Umverteilung', 'Performance-basiert', 'Kosteneffizienz']
    },
    {
      title: 'A/B-Testing',
      description: 'Automatische Tests verschiedener Anzeigenvarianten',
      icon: <Filter className="w-8 h-8" />,
      benefits: ['Statistische Signifikanz', 'Automatische Gewinner', 'Kontinuierliche Tests']
    }
  ]

  const analyticsFeatures = [
    {
      metric: 'Performance-Tracking',
      description: 'Verfolgen Sie alle wichtigen KPIs in Echtzeit',
      icon: <LineChart className="w-6 h-6" />,
      includes: ['CTR', 'CPC', 'ROAS', 'Conversions', 'Reach', 'Frequency']
    },
    {
      metric: 'Custom Dashboards',
      description: 'Erstellen Sie personalisierte Dashboards für Ihre Bedürfnisse',
      icon: <Settings className="w-6 h-6" />,
      includes: ['Drag & Drop', 'Widgets', 'Echtzeit-Daten', 'Export-Funktionen']
    },
    {
      metric: 'Automatische Berichte',
      description: 'Erhalten Sie regelmäßige Performance-Berichte per E-Mail',
      icon: <Download className="w-6 h-6" />,
      includes: ['Täglich', 'Wöchentlich', 'Monatlich', 'Custom Intervalle']
    },
    {
      metric: 'Competitor Analysis',
      description: 'Analysieren Sie die Strategien Ihrer Konkurrenten',
      icon: <Eye className="w-6 h-6" />,
      includes: ['Ad Monitoring', 'Spend Estimates', 'Creative Analysis', 'Trends']
    }
  ]

  const renderTabContent = () => {
    switch (activeTab) {
      case 'overview':
        return (
          <div className="space-y-16">
            {/* Main Features Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {mainFeatures.map((feature, index) => (
                <Card key={index} className="bg-white shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 border-0">
                  <CardContent className="p-8">
                    <div className={`w-20 h-20 bg-gradient-to-br ${feature.color} rounded-2xl flex items-center justify-center text-white mb-6`}>
                      {feature.icon}
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-3">{feature.title}</h3>
                    <p className="text-gray-600 mb-4 leading-relaxed">{feature.description}</p>
                    <ul className="space-y-2 mb-6">
                      {feature.details.map((detail, idx) => (
                        <li key={idx} className="flex items-center text-sm text-gray-600">
                          <CheckCircle className="w-4 h-4 text-green-500 mr-2 flex-shrink-0" />
                          {detail}
                        </li>
                      ))}
                    </ul>

                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )
      
      case 'campaigns':
        return (
          <div className="space-y-12">
            <div className="text-center">
              <h3 className="text-3xl font-bold text-gray-900 mb-4">
                Unterstützte <span className="text-purple-600">Plattformen</span>
              </h3>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Erstellen Sie Kampagnen für alle wichtigen Social Media Plattformen von einer zentralen Stelle aus.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {platformFeatures.map((platform, index) => (
                <Card key={index} className="bg-white shadow-lg hover:shadow-xl transition-all duration-300 border-0">
                  <CardContent className="p-6">
                    <div className="flex items-center mb-4">
                      <div className="text-3xl mr-3">{platform.icon}</div>
                      <h4 className="text-lg font-bold text-gray-900">{platform.platform}</h4>
                    </div>
                    <div className="space-y-2">
                      {platform.features.map((feature, idx) => (
                        <div key={idx} className="flex items-center text-sm text-gray-600">
                          <CheckCircle className="w-4 h-4 text-green-500 mr-2 flex-shrink-0" />
                          {feature}
                        </div>
                      ))}
                    </div>
                    <Button className={`w-full mt-4 bg-gradient-to-r ${platform.color} text-white`}>
                      Kampagne erstellen
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )
      
      case 'analytics':
        return (
          <div className="space-y-12">
            <div className="text-center">
              <h3 className="text-3xl font-bold text-gray-900 mb-4">
                Erweiterte <span className="text-blue-600">Analytics</span>
              </h3>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Erhalten Sie detaillierte Einblicke in die Performance Ihrer Kampagnen mit unseren fortschrittlichen Analytics-Tools.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {analyticsFeatures.map((feature, index) => (
                <Card key={index} className="bg-white shadow-lg hover:shadow-xl transition-all duration-300 border-0">
                  <CardContent className="p-8">
                    <div className="flex items-center mb-4">
                      <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-500 rounded-xl flex items-center justify-center text-white mr-4">
                        {feature.icon}
                      </div>
                      <h4 className="text-xl font-bold text-gray-900">{feature.metric}</h4>
                    </div>
                    <p className="text-gray-600 mb-4 leading-relaxed">{feature.description}</p>
                    <div className="space-y-2">
                      <p className="text-sm font-medium text-gray-700 mb-2">Enthalten:</p>
                      <div className="flex flex-wrap gap-2">
                        {feature.includes.map((item, idx) => (
                          <Badge key={idx} className="bg-blue-100 text-blue-800 text-xs">
                            {item}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )
      
      case 'automation':
        return (
          <div className="space-y-12">
            <div className="text-center">
              <h3 className="text-3xl font-bold text-gray-900 mb-4">
                KI-gestützte <span className="text-green-600">Automatisierung</span>
              </h3>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Lassen Sie unsere KI Ihre Kampagnen optimieren, während Sie sich auf Ihr Geschäft konzentrieren.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {automationFeatures.map((feature, index) => (
                <Card key={index} className="bg-white shadow-lg hover:shadow-xl transition-all duration-300 border-0">
                  <CardContent className="p-8">
                    <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-500 rounded-2xl flex items-center justify-center text-white mb-6">
                      {feature.icon}
                    </div>
                    <h4 className="text-xl font-bold text-gray-900 mb-3">{feature.title}</h4>
                    <p className="text-gray-600 mb-4 leading-relaxed">{feature.description}</p>
                    <div className="space-y-2">
                      <p className="text-sm font-medium text-gray-700 mb-2">Vorteile:</p>
                      {feature.benefits.map((benefit, idx) => (
                        <div key={idx} className="flex items-center text-sm text-gray-600">
                          <Star className="w-4 h-4 text-yellow-500 mr-2 flex-shrink-0" />
                          {benefit}
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )
      
      case 'collaboration':
        return (
          <div className="space-y-12">
            <div className="text-center">
              <h3 className="text-3xl font-bold text-gray-900 mb-4">
                Team <span className="text-purple-600">Kollaboration</span>
              </h3>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Arbeiten Sie effizient im Team mit fortschrittlichen Kollaborations-Features.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <Card className="bg-white shadow-lg border-0">
                <CardContent className="p-8 text-center">
                  <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-2xl flex items-center justify-center text-white mx-auto mb-6">
                    <Users className="w-8 h-8" />
                  </div>
                  <h4 className="text-xl font-bold text-gray-900 mb-3">Team-Management</h4>
                  <p className="text-gray-600 mb-4">Verwalten Sie Teammitglieder und deren Berechtigungen zentral.</p>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• Unbegrenzte Mitglieder (Pro)</li>
                    <li>• Rollen & Berechtigungen</li>
                    <li>• Aktivitäts-Tracking</li>
                  </ul>
                </CardContent>
              </Card>
              
              <Card className="bg-white shadow-lg border-0">
                <CardContent className="p-8 text-center">
                  <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-500 rounded-2xl flex items-center justify-center text-white mx-auto mb-6">
                    <MessageSquare className="w-8 h-8" />
                  </div>
                  <h4 className="text-xl font-bold text-gray-900 mb-3">Kommentare & Reviews</h4>
                  <p className="text-gray-600 mb-4">Kommunizieren Sie direkt in den Kampagnen mit Ihrem Team.</p>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• Inline-Kommentare</li>
                    <li>• @-Mentions</li>
                    <li>• Review-Workflows</li>
                  </ul>
                </CardContent>
              </Card>
              
              <Card className="bg-white shadow-lg border-0">
                <CardContent className="p-8 text-center">
                  <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center text-white mx-auto mb-6">
                    <Shield className="w-8 h-8" />
                  </div>
                  <h4 className="text-xl font-bold text-gray-900 mb-3">Approval-Workflows</h4>
                  <p className="text-gray-600 mb-4">Definieren Sie Freigabe-Prozesse für Ihre Kampagnen.</p>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• Mehrstufige Freigaben</li>
                    <li>• Automatische Benachrichtigungen</li>
                    <li>• Audit-Trail</li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        )
      
      default:
        return null
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      {/* Hero Section */}
      <section className="py-16 sm:py-20 px-4 sm:px-6 bg-gradient-to-br from-purple-600 via-blue-500 to-cyan-400">
        <div className="max-w-7xl mx-auto text-center">
          <div className="flex flex-wrap justify-center gap-2 sm:gap-3 mb-6 sm:mb-8">
            <Badge className="bg-white/20 text-white border-white/30 text-xs sm:text-sm px-3 py-1 font-medium">
              ⚡ FEATURES
            </Badge>
            <Badge className="bg-white/20 text-white border-white/30 text-xs sm:text-sm px-3 py-1 font-medium">
              🚀 FUNKTIONEN
            </Badge>
            <Badge className="bg-white/20 text-white border-white/30 text-xs sm:text-sm px-3 py-1 font-medium">
              💡 INNOVATION
            </Badge>
          </div>
          
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
            Alle <span className="text-yellow-300">Features</span> im Überblick
          </h1>
          
          <p className="text-xl sm:text-2xl text-white/90 mb-8 max-w-4xl mx-auto leading-relaxed">
            Entdecken Sie die mächtigen Tools und Funktionen, die SMK zur 
            führenden Social Media Marketing Plattform machen.
          </p>
          
          <div className="flex flex-wrap justify-center gap-4 sm:gap-6">
            <Badge className="bg-white/10 text-white border-white/20 text-sm px-4 py-2">
              🎯 KI-gestützt
            </Badge>
            <Badge className="bg-white/10 text-white border-white/20 text-sm px-4 py-2">
              📊 Datengetrieben
            </Badge>
            <Badge className="bg-white/10 text-white border-white/20 text-sm px-4 py-2">
              🔄 Automatisiert
            </Badge>
            <Badge className="bg-white/10 text-white border-white/20 text-sm px-4 py-2">
              👥 Kollaborativ
            </Badge>
          </div>
        </div>
      </section>

      {/* Feature Categories Navigation */}
      <section className="py-8 px-4 sm:px-6 bg-white border-b">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-wrap gap-3 justify-center">
            {featureCategories.map((category) => (
              <Button
                key={category.id}
                variant={activeTab === category.id ? "default" : "outline"}
                onClick={() => setActiveTab(category.id)}
                className={`${
                  activeTab === category.id 
                    ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white' 
                    : 'hover:bg-gray-50'
                } flex items-center space-x-2 px-6 py-3 rounded-lg transition-all duration-200`}
              >
                {category.icon}
                <span>{category.name}</span>
              </Button>
            ))}
          </div>
        </div>
      </section>

      {/* Feature Content */}
      <section className="py-16 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto">
          {renderTabContent()}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 sm:px-6 bg-gradient-to-r from-indigo-600 to-purple-600">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6">
            Bereit, alle Features zu testen?
          </h2>
          <p className="text-xl text-white/90 mb-8">
            Starten Sie Ihre 14-tägige kostenlose Testversion und entdecken Sie, 
            wie SMK Ihr Social Media Marketing revolutioniert.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button className="bg-white text-purple-600 hover:bg-gray-100 text-lg px-8 py-4 rounded-xl font-semibold">
              <Rocket className="w-5 h-5 mr-2" />
              Kostenlos testen
            </Button>
            <Button variant="outline" className="border-2 border-white text-white hover:bg-white hover:text-purple-600 text-lg px-8 py-4 rounded-xl font-semibold">
              <Play className="w-5 h-5 mr-2" />
              Demo ansehen
            </Button>
          </div>
          
          <div className="mt-8 pt-8 border-t border-white/20">
            <div className="flex flex-wrap justify-center gap-6 text-white/80 text-sm">
              <div className="flex items-center space-x-2">
                <CheckCircle className="w-4 h-4" />
                <span>Keine Kreditkarte erforderlich</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle className="w-4 h-4" />
                <span>14 Tage kostenlos</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle className="w-4 h-4" />
                <span>Jederzeit kündbar</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default FeaturesPage

