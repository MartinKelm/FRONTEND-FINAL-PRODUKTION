import React, { useState, useEffect } from 'react'
import { Button } from './components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './components/ui/card'
import { Badge } from './components/ui/badge'
import { 
  Clock, 
  Zap, 
  BarChart3, 
  CheckCircle, 
  Play, 
  Target, 
  TrendingUp, 
  Users, 
  Calendar,
  MoreHorizontal,
  Facebook,
  Instagram,
  Linkedin,
  Youtube,
  Menu,
  X,
  ChevronDown,
  LogOut,
  User,
  Shield,
  Plus,
  Eye
} from 'lucide-react'
import './App.css'

// Import components
import AccountManagement from './components/Account/AccountManagement'

// Import images
import FullLogo from './assets/Logo-socialmediakampagnen-voll.png'
import heroDashboard from './assets/hero-dashboard.png'
import heroCampaign from './assets/hero-campaign.png'
import heroWizard from './assets/hero-wizard.png'

// Import components
import CampaignWizard from './components/Campaign/CampaignWizard'
import CampaignDashboard from './components/Campaign/CampaignDashboard'
import CampaignDetailView from './components/Campaign/CampaignDetailView'
import LoginForm from './components/Auth/LoginForm'
import RegisterForm from './components/Auth/RegisterForm'
import RegisterFormSimple from './components/Auth/RegisterFormSimple'
import CompanyProfileModal from './components/Auth/CompanyProfileModal'
import PackageSelectionModal from './components/Auth/PackageSelectionModal'
import AdminDashboard from './components/Admin/AdminDashboard'
import AboutPage from './components/Pages/AboutPage'
import ContactPage from './components/Pages/ContactPage'
import FAQPage from './components/Pages/FAQPage'
import FeaturesPage from './components/Pages/FeaturesPage'
import ImpressumPage from './components/Legal/ImpressumPage'
import TermsPage from './components/Legal/TermsPage'
import PrivacyPage from './components/Legal/PrivacyPage'
import Footer from './components/Footer'


function App() {
  const [currentView, setCurrentView] = useState('home')
  const [showCampaignWizard, setShowCampaignWizard] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  
  // Auth states
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [currentUser, setCurrentUser] = useState(null)
  const [authView, setAuthView] = useState(null) // null = Homepage, 'login', 'register', 'register-simple'

  // Campaign Management states
  const [selectedCampaignId, setSelectedCampaignId] = useState(null)

  // Load session from localStorage on app start
  useEffect(() => {
    const savedUser = localStorage.getItem('currentUser')
    const savedView = localStorage.getItem('currentView')
    const savedAuth = localStorage.getItem('isAuthenticated')
    
    if (savedUser && savedAuth === 'true') {
      try {
        const userData = JSON.parse(savedUser)
        setCurrentUser(userData)
        setIsAuthenticated(true)
        setCurrentView(savedView || 'dashboard')
        console.log('Session restored:', userData)
      } catch (error) {
        console.error('Error parsing saved user data:', error)
        // Clear corrupted data
        localStorage.removeItem('currentUser')
        localStorage.removeItem('currentView')
        localStorage.removeItem('isAuthenticated')
      }
    }
  }, [])
  
  // Multi-step registration states
  const [showCompanyProfileModal, setShowCompanyProfileModal] = useState(false)
  const [showPackageSelectionModal, setShowPackageSelectionModal] = useState(false)
  const [registrationUserData, setRegistrationUserData] = useState(null)
  
  // Message state
  const [message, setMessage] = useState({ type: '', text: '' })

  const showMessage = (type, text) => {
    setMessage({ type, text })
    setTimeout(() => setMessage({ type: '', text: '' }), 5000)
  }

  const navigateToView = (view) => {
    setCurrentView(view)
    localStorage.setItem('currentView', view)
    setIsMobileMenuOpen(false)
  }

  const handleLogin = (userData) => {
    setCurrentUser(userData)
    setIsAuthenticated(true)
    setAuthView(null)
    
    // Save to localStorage
    localStorage.setItem('currentUser', JSON.stringify(userData))
    localStorage.setItem('isAuthenticated', 'true')
    localStorage.setItem('currentView', 'dashboard')
    
    navigateToView('dashboard')
    showMessage('success', `Willkommen zurück, ${userData.name}!`)
  }

  const handleLogout = () => {
    setCurrentUser(null)
    setIsAuthenticated(false)
    setAuthView(null)
    
    // Clear localStorage
    localStorage.removeItem('currentUser')
    localStorage.removeItem('isAuthenticated')
    localStorage.removeItem('currentView')
    
    navigateToView('home')
    showMessage('info', 'Sie wurden erfolgreich abgemeldet.')
  }

  const handleRegister = (userData) => {
    setRegistrationUserData(userData)
    setShowCompanyProfileModal(true)
  }

  const handleCompanyProfileComplete = (companyData) => {
    const updatedUserData = { ...registrationUserData, ...companyData }
    setRegistrationUserData(updatedUserData)
    setShowCompanyProfileModal(false)
    setShowPackageSelectionModal(true)
  }

  const handlePackageSelectionComplete = (packageData) => {
    const finalUserData = { 
      ...registrationUserData, 
      ...packageData,
      id: Date.now().toString(),
      createdAt: new Date().toISOString()
    }
    
    setCurrentUser(finalUserData)
    setIsAuthenticated(true)
    setAuthView(null)
    setShowPackageSelectionModal(false)
    setRegistrationUserData(null)
    
    // Save to localStorage
    localStorage.setItem('currentUser', JSON.stringify(finalUserData))
    localStorage.setItem('isAuthenticated', 'true')
    localStorage.setItem('currentView', 'dashboard')
    
    navigateToView('dashboard')
    showMessage('success', `Willkommen bei Social Media Kampagnen, ${finalUserData.name}!`)
  }

  // Campaign Management handlers
  const handleCreateCampaign = () => {
    setShowCampaignWizard(true)
  }

  const handleCampaignCreated = (campaign) => {
    console.log('Campaign created:', campaign)
    setShowCampaignWizard(false)
    showMessage('success', 'Kampagne erfolgreich erstellt!')
    navigateToView('campaigns')
  }

  const handleViewCampaign = (campaignId) => {
    setSelectedCampaignId(campaignId)
    navigateToView('campaign-detail')
  }

  const handleBackToCampaigns = () => {
    setSelectedCampaignId(null)
    navigateToView('campaigns')
  }

  const renderNavigation = () => (
    <nav className="bg-white shadow-sm border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <button 
              onClick={() => navigateToView('home')}
              className="flex items-center space-x-2"
            >
              <img src={FullLogo} alt="Social Media Kampagnen" className="h-8" />
            </button>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <button 
              onClick={() => navigateToView('home')}
              className={`px-3 py-2 text-sm font-medium ${currentView === 'home' ? 'text-purple-600' : 'text-gray-700 hover:text-purple-600'}`}
            >
              Home
            </button>
            <button 
              onClick={() => navigateToView('features')}
              className={`px-3 py-2 text-sm font-medium ${currentView === 'features' ? 'text-purple-600' : 'text-gray-700 hover:text-purple-600'}`}
            >
              Features
            </button>
            <button 
              onClick={() => navigateToView('pricing')}
              className={`px-3 py-2 text-sm font-medium ${currentView === 'pricing' ? 'text-purple-600' : 'text-gray-700 hover:text-purple-600'}`}
            >
              Preise
            </button>

            {isAuthenticated ? (
              <div className="relative">
                <button
                  onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                  className="flex items-center space-x-2 text-gray-700 hover:text-purple-600"
                >
                  <User className="w-5 h-5" />
                  <span>{currentUser?.name}</span>
                  <ChevronDown className="w-4 h-4" />
                </button>
                
                {isMobileMenuOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50">
                    <button
                      onClick={() => navigateToView('dashboard')}
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                    >
                      Dashboard
                    </button>
                    <button
                      onClick={() => navigateToView('campaigns')}
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                    >
                      Meine Kampagnen
                    </button>
                    <button
                      onClick={() => navigateToView('account')}
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                    >
                      Account verwalten
                    </button>
                    <hr className="my-1" />
                    <button
                      onClick={handleLogout}
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                    >
                      <LogOut className="w-4 h-4 inline mr-2" />
                      Abmelden
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex items-center space-x-4">
                <Button 
                  variant="ghost" 
                  onClick={() => setAuthView('login')}
                >
                  Anmelden
                </Button>
                <Button 
                  onClick={() => setAuthView('register')}
                  className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
                >
                  Registrieren
                </Button>
              </div>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-gray-700 hover:text-purple-600"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              <button 
                onClick={() => navigateToView('home')}
                className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-purple-600"
              >
                Home
              </button>
              <button 
                onClick={() => navigateToView('features')}
                className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-purple-600"
              >
                Features
              </button>
              <button 
                onClick={() => navigateToView('pricing')}
                className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-purple-600"
              >
                Preise
              </button>
              
              {isAuthenticated ? (
                <>
                  <button
                    onClick={() => navigateToView('dashboard')}
                    className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-purple-600"
                  >
                    Dashboard
                  </button>
                  <button
                    onClick={() => navigateToView('campaigns')}
                    className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-purple-600"
                  >
                    Meine Kampagnen
                  </button>
                  <button
                    onClick={() => navigateToView('account')}
                    className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-purple-600"
                  >
                    Account verwalten
                  </button>
                  <button
                    onClick={handleLogout}
                    className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-purple-600"
                  >
                    Abmelden
                  </button>
                </>
              ) : (
                <>
                  <button 
                    onClick={() => setAuthView('login')}
                    className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-purple-600"
                  >
                    Anmelden
                  </button>
                  <button 
                    onClick={() => setAuthView('register')}
                    className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-purple-600"
                  >
                    Registrieren
                  </button>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  )

  const renderHomepage = () => (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-pink-50">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <div className="relative z-10 pb-8 bg-transparent sm:pb-16 md:pb-20 lg:max-w-2xl lg:w-full lg:pb-28 xl:pb-32">
            <main className="mt-10 mx-auto max-w-7xl px-4 sm:mt-12 sm:px-6 md:mt-16 lg:mt-20 lg:px-8 xl:mt-28">
              <div className="sm:text-center lg:text-left">
                <h1 className="text-4xl tracking-tight font-extrabold text-gray-900 sm:text-5xl md:text-6xl">
                  <span className="block xl:inline">Alle Werbeanzeigen</span>{' '}
                  <span className="block text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600 xl:inline">
                    in einem Editor
                  </span>
                </h1>
                <p className="mt-3 text-base text-gray-500 sm:mt-5 sm:text-lg sm:max-w-xl sm:mx-auto md:mt-5 md:text-xl lg:mx-0">
                  Erstellen Sie professionelle Social Media Kampagnen für alle Plattformen gleichzeitig
                </p>
                <div className="mt-5 sm:mt-8 sm:flex sm:justify-center lg:justify-start">
                  <div className="rounded-md shadow">
                    <Button 
                      onClick={() => setAuthView('register')}
                      className="w-full flex items-center justify-center px-8 py-3 text-base font-medium bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
                    >
                      Kostenlos starten
                    </Button>
                  </div>
                  <div className="mt-3 sm:mt-0 sm:ml-3">
                    <Button 
                      variant="outline"
                      onClick={() => setAuthView('login')}
                      className="w-full flex items-center justify-center px-8 py-3 text-base font-medium"
                    >
                      Demo ansehen
                    </Button>
                  </div>
                </div>
              </div>
            </main>
          </div>
        </div>
        <div className="lg:absolute lg:inset-y-0 lg:right-0 lg:w-1/2">
          <img
            className="h-56 w-full object-cover sm:h-72 md:h-96 lg:w-full lg:h-full"
            src={heroDashboard}
            alt="Dashboard Preview"
          />
        </div>
      </div>

      {/* Supported Platforms */}
      <div className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:text-center">
            <h2 className="text-base text-purple-600 font-semibold tracking-wide uppercase">Unterstützte Plattformen</h2>
            <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
              Erstellen Sie Kampagnen für alle wichtigen Social Media Kanäle
            </p>
          </div>

          <div className="mt-10">
            <div className="grid grid-cols-2 gap-8 md:grid-cols-4 lg:grid-cols-8">
              {[
                { name: 'Facebook', icon: 'f', color: 'bg-blue-600' },
                { name: 'Instagram', icon: 'IG', color: 'bg-pink-600' },
                { name: 'Google', icon: 'G', color: 'bg-red-600' },
                { name: 'TikTok', icon: 'TT', color: 'bg-black' },
                { name: 'Snapchat', icon: 'SC', color: 'bg-yellow-400' },
                { name: 'Reddit', icon: 'R', color: 'bg-orange-600' },
                { name: 'LinkedIn', icon: 'LI', color: 'bg-blue-700' },
                { name: 'Spotify', icon: 'SP', color: 'bg-green-600' }
              ].map((platform) => (
                <div key={platform.name} className="col-span-1 flex justify-center items-center">
                  <div className="flex flex-col items-center">
                    <div className={`w-12 h-12 ${platform.color} rounded-lg flex items-center justify-center text-white font-bold text-sm mb-2`}>
                      {platform.icon}
                    </div>
                    <span className="text-sm text-gray-600">{platform.name}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Professional Dashboard Preview */}
      <div className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:text-center">
            <h2 className="text-base text-purple-600 font-semibold tracking-wide uppercase">Professionelles Dashboard</h2>
            <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
              Verwalten Sie alle Ihre Kampagnen an einem Ort
            </p>
          </div>

          <div className="mt-10">
            <img
              className="mx-auto rounded-lg shadow-xl"
              src={heroCampaign}
              alt="Campaign Dashboard"
            />
          </div>
        </div>
      </div>
    </div>
  )

  const renderDashboard = () => (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="px-4 py-6 sm:px-0">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                Willkommen zurück, {currentUser?.name}!
              </h1>
              <p className="mt-1 text-sm text-gray-600">
                Hier ist eine Übersicht Ihrer aktuellen Kampagnen und Performance
              </p>
            </div>
            <Button 
              onClick={handleCreateCampaign}
              className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
            >
              <Plus className="w-4 h-4 mr-2" />
              Neue Kampagne
            </Button>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Aktive Kampagnen</CardTitle>
              <Target className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">3</div>
              <p className="text-xs text-muted-foreground">+1 seit letztem Monat</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Gesamtreichweite</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">12.5K</div>
              <p className="text-xs text-muted-foreground">+15% seit letzter Woche</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Klickrate</CardTitle>
              <BarChart3 className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">2.4%</div>
              <p className="text-xs text-muted-foreground">+0.3% seit gestern</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Budget verwendet</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">€450</div>
              <p className="text-xs text-muted-foreground">von €1,000 Budget</p>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <div className="mt-8">
          <h2 className="text-lg font-medium text-gray-900 mb-4">Schnellaktionen</h2>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            <Card className="cursor-pointer hover:shadow-md transition-shadow" onClick={handleCreateCampaign}>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Plus className="w-5 h-5 mr-2 text-purple-600" />
                  Neue Kampagne
                </CardTitle>
                <CardDescription>
                  Erstellen Sie eine neue Social Media Kampagne
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="cursor-pointer hover:shadow-md transition-shadow" onClick={() => navigateToView('campaigns')}>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Eye className="w-5 h-5 mr-2 text-blue-600" />
                  Kampagnen verwalten
                </CardTitle>
                <CardDescription>
                  Verwalten und optimieren Sie bestehende Kampagnen
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="cursor-pointer hover:shadow-md transition-shadow">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <BarChart3 className="w-5 h-5 mr-2 text-green-600" />
                  Analytics
                </CardTitle>
                <CardDescription>
                  Detaillierte Performance-Analysen ansehen
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>

        {/* Recent Campaigns */}
        <div className="mt-8">
          <h2 className="text-lg font-medium text-gray-900 mb-4">Aktuelle Kampagnen</h2>
          <div className="bg-white shadow overflow-hidden sm:rounded-md">
            <ul className="divide-y divide-gray-200">
              {[
                { name: 'Sommer Sale 2024', platform: 'Facebook, Instagram', status: 'Aktiv', performance: '+12%' },
                { name: 'Produktlaunch Kampagne', platform: 'Google Ads', status: 'Aktiv', performance: '+8%' },
                { name: 'Brand Awareness', platform: 'TikTok, Instagram', status: 'Pausiert', performance: '+5%' }
              ].map((campaign, index) => (
                <li key={index}>
                  <div className="px-4 py-4 flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="flex-shrink-0">
                        <div className="h-10 w-10 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 flex items-center justify-center">
                          <Target className="h-5 w-5 text-white" />
                        </div>
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">{campaign.name}</div>
                        <div className="text-sm text-gray-500">{campaign.platform}</div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-4">
                      <Badge variant={campaign.status === 'Aktiv' ? 'default' : 'secondary'}>
                        {campaign.status}
                      </Badge>
                      <div className="text-sm text-green-600 font-medium">{campaign.performance}</div>
                      <Button variant="ghost" size="sm">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Performance Overview */}
        <div className="mt-8">
          <Card>
            <CardHeader>
              <CardTitle>Performance Übersicht</CardTitle>
              <CardDescription>
                Ihre Kampagnen-Performance der letzten 30 Tage
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-600">45.2K</div>
                  <div className="text-sm text-gray-500">Impressionen</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-600">1.8K</div>
                  <div className="text-sm text-gray-500">Klicks</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-purple-600">127</div>
                  <div className="text-sm text-gray-500">Konversionen</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )

  const renderContent = () => {
    if (authView === 'login') {
      return (
        <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
          <LoginForm 
            onLogin={handleLogin}
            onSwitchToRegister={() => setAuthView('register')}
            onCancel={() => setAuthView(null)}
          />
        </div>
      )
    }

    if (authView === 'register') {
      return (
        <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
          <RegisterForm 
            onRegister={handleRegister}
            onSwitchToLogin={() => setAuthView('login')}
            onCancel={() => setAuthView(null)}
          />
        </div>
      )
    }

    if (authView === 'register-simple') {
      return (
        <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
          <RegisterFormSimple 
            onRegister={handleLogin}
            onSwitchToLogin={() => setAuthView('login')}
            onCancel={() => setAuthView(null)}
          />
        </div>
      )
    }

    if (!isAuthenticated) {
      return renderHomepage()
    }

    // Authenticated views
    switch (currentView) {
      case 'dashboard':
        return renderDashboard()
      
      case 'campaigns':
        return (
          <div className="min-h-screen bg-gray-50">
            <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
              <CampaignDashboard
                userId={currentUser?.id}
                onCreateCampaign={handleCreateCampaign}
                onViewCampaign={handleViewCampaign}
              />
            </div>
          </div>
        )
      
      case 'campaign-detail':
        return (
          <div className="min-h-screen bg-gray-50">
            <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
              <CampaignDetailView
                campaignId={selectedCampaignId}
                userId={currentUser?.id}
                onBack={handleBackToCampaigns}
              />
            </div>
          </div>
        )
      
      case 'account':
        return (
          <div className="min-h-screen bg-gray-50">
            <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
              <AccountManagement 
                user={currentUser}
                onUserUpdate={(updatedUser) => {
                  setCurrentUser(updatedUser)
                  localStorage.setItem('currentUser', JSON.stringify(updatedUser))
                }}
              />
            </div>
          </div>
        )
      
      case 'admin':
        return <AdminDashboard />
      
      case 'features':
        return <FeaturesPage />
      
      case 'pricing':
        return <div className="min-h-screen bg-gray-50 flex items-center justify-center"><h1 className="text-2xl">Preise - Coming Soon</h1></div>
      
      case 'about':
        return <AboutPage />
      
      case 'contact':
        return <ContactPage />
      
      case 'faq':
        return <FAQPage />
      
      case 'impressum':
        return <ImpressumPage />
      
      case 'terms':
        return <TermsPage />
      
      case 'privacy':
        return <PrivacyPage />
      
      default:
        return renderDashboard()
    }
  }

  return (
    <div className="min-h-screen bg-white">
      {renderNavigation()}
      
      {/* Message Display */}
      {message.text && (
        <div className={`fixed top-20 right-4 z-50 p-4 rounded-md shadow-lg ${
          message.type === 'success' ? 'bg-green-100 text-green-800' :
          message.type === 'error' ? 'bg-red-100 text-red-800' :
          'bg-blue-100 text-blue-800'
        }`}>
          {message.text}
        </div>
      )}

      {renderContent()}

      {/* Campaign Wizard Modal */}
      {showCampaignWizard && (
        <CampaignWizard
          userId={currentUser?.id}
          onClose={() => setShowCampaignWizard(false)}
          onCampaignCreated={handleCampaignCreated}
        />
      )}

      {/* Company Profile Modal */}
      {showCompanyProfileModal && (
        <CompanyProfileModal
          userData={registrationUserData}
          onComplete={handleCompanyProfileComplete}
          onCancel={() => {
            setShowCompanyProfileModal(false)
            setRegistrationUserData(null)
          }}
        />
      )}

      {/* Package Selection Modal */}
      {showPackageSelectionModal && (
        <PackageSelectionModal
          userData={registrationUserData}
          onComplete={handlePackageSelectionComplete}
          onCancel={() => {
            setShowPackageSelectionModal(false)
            setRegistrationUserData(null)
          }}
        />
      )}

      <Footer />
    </div>
  )
}

export default App
