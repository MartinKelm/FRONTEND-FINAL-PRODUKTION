import React, { useState, useEffect } from 'react'
import { Menu, X, User, Settings, LogOut, Plus, BarChart3, Target, TrendingUp } from 'lucide-react'
import LoginForm from './components/Auth/LoginForm'
import RegisterFormSimple from './components/Auth/RegisterFormSimple'
import CompanyProfileModal from './components/Auth/CompanyProfileModal'
import PackageSelectionModal from './components/Auth/PackageSelectionModal'
import AccountManagement from './components/Account/AccountManagement'
import Footer from './components/Footer'
import CampaignWizard from './components/Campaign/CampaignWizard'
import CampaignDashboard from './components/Campaign/CampaignDashboard'
import CampaignDetailView from './components/Campaign/CampaignDetailView'

function App() {
  const [currentView, setCurrentView] = useState('home')
  const [showLogin, setShowLogin] = useState(false)
  const [showRegister, setShowRegister] = useState(false)
  const [showCompanyProfile, setShowCompanyProfile] = useState(false)
  const [showPackageSelection, setShowPackageSelection] = useState(false)
  const [showCampaignWizard, setShowCampaignWizard] = useState(false)
  const [showUserMenu, setShowUserMenu] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [selectedCampaignId, setSelectedCampaignId] = useState(null)
  
  const [user, setUser] = useState(null)
  const [registrationData, setRegistrationData] = useState({})

  // Load session from localStorage on app start
  useEffect(() => {
    const savedUser = localStorage.getItem('user')
    const savedView = localStorage.getItem('currentView')
    
    if (savedUser) {
      try {
        const userData = JSON.parse(savedUser)
        setUser(userData)
        if (savedView) {
          setCurrentView(savedView)
        } else {
          setCurrentView('dashboard')
        }
      } catch (error) {
        console.error('Error loading saved session:', error)
        localStorage.removeItem('user')
        localStorage.removeItem('currentView')
      }
    }
  }, [])

  const navigateToView = (view) => {
    setCurrentView(view)
    localStorage.setItem('currentView', view)
    setIsMobileMenuOpen(false)
  }

  const handleLogin = (userData) => {
    setUser(userData)
    localStorage.setItem('user', JSON.stringify(userData))
    setCurrentView('dashboard')
    localStorage.setItem('currentView', 'dashboard')
    setShowLogin(false)
  }

  const handleLogout = () => {
    setUser(null)
    localStorage.removeItem('user')
    localStorage.removeItem('currentView')
    setCurrentView('home')
    setShowUserMenu(false)
  }

  const handleRegisterStart = (data) => {
    setRegistrationData(data)
    setShowRegister(false)
    setShowCompanyProfile(true)
  }

  const handleCompanyProfileComplete = (companyData) => {
    setRegistrationData(prev => ({ ...prev, ...companyData }))
    setShowCompanyProfile(false)
    setShowPackageSelection(true)
  }

  const handlePackageSelection = (packageData) => {
    const finalUserData = {
      ...registrationData,
      ...packageData,
      id: Date.now().toString(),
      createdAt: new Date().toISOString()
    }
    
    setUser(finalUserData)
    localStorage.setItem('user', JSON.stringify(finalUserData))
    setCurrentView('dashboard')
    localStorage.setItem('currentView', 'dashboard')
    setShowPackageSelection(false)
    setRegistrationData({})
  }

  const handleCreateCampaign = () => {
    // For demo users, allow direct access to campaign wizard
    if (user && (user.email === 'demo@example.com' || user.selectedPackage)) {
      setShowCampaignWizard(true)
    } else {
      setShowPackageSelection(true)
    }
  }

  const handleCampaignCreated = (campaign) => {
    // Refresh campaigns view or show success message
    console.log('Campaign created:', campaign)
    // Optionally navigate to campaigns view
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

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation */}
      <nav className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <div className="flex items-center">
              <button
                onClick={() => navigateToView('home')}
                className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent"
              >
                SocialMediaKampagnen
              </button>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              {!user ? (
                <>
                  <button
                    onClick={() => navigateToView('home')}
                    className={`text-gray-700 hover:text-purple-600 px-3 py-2 text-sm font-medium ${
                      currentView === 'home' ? 'text-purple-600 border-b-2 border-purple-600' : ''
                    }`}
                  >
                    Home
                  </button>
                  <button
                    onClick={() => navigateToView('features')}
                    className={`text-gray-700 hover:text-purple-600 px-3 py-2 text-sm font-medium ${
                      currentView === 'features' ? 'text-purple-600 border-b-2 border-purple-600' : ''
                    }`}
                  >
                    Features
                  </button>
                  <button
                    onClick={() => navigateToView('pricing')}
                    className={`text-gray-700 hover:text-purple-600 px-3 py-2 text-sm font-medium ${
                      currentView === 'pricing' ? 'text-purple-600 border-b-2 border-purple-600' : ''
                    }`}
                  >
                    Preise
                  </button>
                  <button
                    onClick={() => setShowLogin(true)}
                    className="text-gray-700 hover:text-purple-600 px-3 py-2 text-sm font-medium"
                  >
                    Anmelden
                  </button>
                  <button
                    onClick={() => setShowRegister(true)}
                    className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:from-purple-700 hover:to-pink-700 transition-all"
                  >
                    Registrieren
                  </button>
                </>
              ) : (
                <>
                  <button
                    onClick={() => navigateToView('dashboard')}
                    className={`text-gray-700 hover:text-purple-600 px-3 py-2 text-sm font-medium ${
                      currentView === 'dashboard' ? 'text-purple-600 border-b-2 border-purple-600' : ''
                    }`}
                  >
                    Dashboard
                  </button>
                  <button
                    onClick={() => navigateToView('campaigns')}
                    className={`text-gray-700 hover:text-purple-600 px-3 py-2 text-sm font-medium ${
                      currentView === 'campaigns' ? 'text-purple-600 border-b-2 border-purple-600' : ''
                    }`}
                  >
                    Kampagnen
                  </button>
                  <button
                    onClick={() => navigateToView('analytics')}
                    className={`text-gray-700 hover:text-purple-600 px-3 py-2 text-sm font-medium ${
                      currentView === 'analytics' ? 'text-purple-600 border-b-2 border-purple-600' : ''
                    }`}
                  >
                    Analytics
                  </button>
                  
                  {/* User Menu */}
                  <div className="relative">
                    <button
                      onClick={() => setShowUserMenu(!showUserMenu)}
                      className="flex items-center space-x-2 text-gray-700 hover:text-purple-600 px-3 py-2 text-sm font-medium"
                    >
                      <User className="w-4 h-4" />
                      <span>{user.firstName || user.email}</span>
                    </button>
                    
                    {showUserMenu && (
                      <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border py-1 z-50">
                        <button
                          onClick={() => {
                            navigateToView('account')
                            setShowUserMenu(false)
                          }}
                          className="flex items-center space-x-2 w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        >
                          <Settings className="w-4 h-4" />
                          <span>Account verwalten</span>
                        </button>
                        <button
                          onClick={handleLogout}
                          className="flex items-center space-x-2 w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        >
                          <LogOut className="w-4 h-4" />
                          <span>Abmelden</span>
                        </button>
                      </div>
                    )}
                  </div>
                </>
              )}
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="text-gray-700 hover:text-purple-600 p-2"
              >
                {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="md:hidden bg-white border-t">
            <div className="px-2 pt-2 pb-3 space-y-1">
              {!user ? (
                <>
                  <button
                    onClick={() => navigateToView('home')}
                    className="block w-full text-left px-3 py-2 text-base font-medium text-gray-700 hover:text-purple-600 hover:bg-gray-50"
                  >
                    Home
                  </button>
                  <button
                    onClick={() => navigateToView('features')}
                    className="block w-full text-left px-3 py-2 text-base font-medium text-gray-700 hover:text-purple-600 hover:bg-gray-50"
                  >
                    Features
                  </button>
                  <button
                    onClick={() => navigateToView('pricing')}
                    className="block w-full text-left px-3 py-2 text-base font-medium text-gray-700 hover:text-purple-600 hover:bg-gray-50"
                  >
                    Preise
                  </button>
                  <button
                    onClick={() => setShowLogin(true)}
                    className="block w-full text-left px-3 py-2 text-base font-medium text-gray-700 hover:text-purple-600 hover:bg-gray-50"
                  >
                    Anmelden
                  </button>
                  <button
                    onClick={() => setShowRegister(true)}
                    className="block w-full text-left px-3 py-2 text-base font-medium bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg mx-3 mt-2"
                  >
                    Registrieren
                  </button>
                </>
              ) : (
                <>
                  <button
                    onClick={() => navigateToView('dashboard')}
                    className="block w-full text-left px-3 py-2 text-base font-medium text-gray-700 hover:text-purple-600 hover:bg-gray-50"
                  >
                    Dashboard
                  </button>
                  <button
                    onClick={() => navigateToView('campaigns')}
                    className="block w-full text-left px-3 py-2 text-base font-medium text-gray-700 hover:text-purple-600 hover:bg-gray-50"
                  >
                    Kampagnen
                  </button>
                  <button
                    onClick={() => navigateToView('analytics')}
                    className="block w-full text-left px-3 py-2 text-base font-medium text-gray-700 hover:text-purple-600 hover:bg-gray-50"
                  >
                    Analytics
                  </button>
                  <button
                    onClick={() => navigateToView('account')}
                    className="block w-full text-left px-3 py-2 text-base font-medium text-gray-700 hover:text-purple-600 hover:bg-gray-50"
                  >
                    Account verwalten
                  </button>
                  <button
                    onClick={handleLogout}
                    className="block w-full text-left px-3 py-2 text-base font-medium text-gray-700 hover:text-purple-600 hover:bg-gray-50"
                  >
                    Abmelden
                  </button>
                </>
              )}
            </div>
          </div>
        )}
      </nav>

      {/* Main Content */}
      <main className="flex-1">
        {/* Home Page */}
        {currentView === 'home' && (
          <div>
            {/* Hero Section */}
            <div className="bg-gradient-to-br from-purple-600 via-purple-700 to-pink-600 text-white">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
                <div className="text-center">
                  <h1 className="text-4xl md:text-6xl font-bold mb-6">
                    Alle Werbeanzeigen in einem Editor
                  </h1>
                  <p className="text-xl md:text-2xl mb-8 text-purple-100">
                    Erstellen Sie professionelle Social Media Kampagnen für alle Plattformen gleichzeitig
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <button
                      onClick={() => setShowRegister(true)}
                      className="bg-white text-purple-600 px-8 py-4 rounded-lg text-lg font-semibold hover:bg-gray-100 transition-colors"
                    >
                      Kostenlos starten
                    </button>
                    <button
                      onClick={() => setShowLogin(true)}
                      className="border-2 border-white text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-white hover:text-purple-600 transition-colors"
                    >
                      Demo ansehen
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Platform Icons */}
            <div className="bg-white py-16">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-12">
                  <h2 className="text-3xl font-bold text-gray-900 mb-4">
                    Unterstützte Plattformen
                  </h2>
                  <p className="text-xl text-gray-600">
                    Erstellen Sie Kampagnen für alle wichtigen Social Media Kanäle
                  </p>
                </div>
                
                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-8">
                  {[
                    { name: 'Facebook', color: 'bg-blue-600', icon: 'f' },
                    { name: 'Instagram', color: 'bg-pink-600', icon: 'IG' },
                    { name: 'Google', color: 'bg-red-600', icon: 'G' },
                    { name: 'TikTok', color: 'bg-black', icon: 'TT' },
                    { name: 'Snapchat', color: 'bg-yellow-400', icon: 'SC' },
                    { name: 'Reddit', color: 'bg-orange-600', icon: 'R' },
                    { name: 'LinkedIn', color: 'bg-blue-700', icon: 'LI' },
                    { name: 'Spotify', color: 'bg-green-600', icon: 'SP' }
                  ].map((platform) => (
                    <div key={platform.name} className="text-center">
                      <div className={`w-16 h-16 ${platform.color} rounded-2xl flex items-center justify-center mb-3 mx-auto`}>
                        <span className="text-white font-bold text-lg">{platform.icon}</span>
                      </div>
                      <p className="text-sm font-medium text-gray-700">{platform.name}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Dashboard Preview */}
            <div className="bg-gray-50 py-16">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-12">
                  <h2 className="text-3xl font-bold text-gray-900 mb-4">
                    Professionelles Dashboard
                  </h2>
                  <p className="text-xl text-gray-600">
                    Verwalten Sie alle Ihre Kampagnen an einem Ort
                  </p>
                </div>
                
                <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
                  <div className="bg-gradient-to-r from-purple-600 to-pink-600 p-6">
                    <h3 className="text-2xl font-bold text-white">Social Media Campaign Dashboard</h3>
                  </div>
                  <div className="p-8">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                      <div className="bg-blue-50 p-6 rounded-xl">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-blue-600 text-sm font-medium">Aktive Kampagnen</p>
                            <p className="text-3xl font-bold text-blue-900">12</p>
                          </div>
                          <Target className="w-8 h-8 text-blue-600" />
                        </div>
                      </div>
                      <div className="bg-green-50 p-6 rounded-xl">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-green-600 text-sm font-medium">Gesamtreichweite</p>
                            <p className="text-3xl font-bold text-green-900">2.4M</p>
                          </div>
                          <TrendingUp className="w-8 h-8 text-green-600" />
                        </div>
                      </div>
                      <div className="bg-purple-50 p-6 rounded-xl">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-purple-600 text-sm font-medium">Klickrate</p>
                            <p className="text-3xl font-bold text-purple-900">3.2%</p>
                          </div>
                          <BarChart3 className="w-8 h-8 text-purple-600" />
                        </div>
                      </div>
                      <div className="bg-orange-50 p-6 rounded-xl">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-orange-600 text-sm font-medium">Budget verwendet</p>
                            <p className="text-3xl font-bold text-orange-900">€8.2K</p>
                          </div>
                          <Plus className="w-8 h-8 text-orange-600" />
                        </div>
                      </div>
                    </div>
                    
                    <div className="text-center">
                      <button
                        onClick={() => setShowRegister(true)}
                        className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:from-purple-700 hover:to-pink-700 transition-all"
                      >
                        Jetzt kostenlos starten
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Dashboard */}
        {currentView === 'dashboard' && user && (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-gray-900">
                Willkommen zurück, {user.firstName || user.email.split('@')[0]}!
              </h1>
              <p className="text-gray-600 mt-2">Hier ist eine Übersicht Ihrer aktuellen Kampagnen</p>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
              <div className="bg-white p-6 rounded-xl shadow-sm border">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-600 text-sm font-medium">Aktive Kampagnen</p>
                    <p className="text-3xl font-bold text-gray-900">3</p>
                  </div>
                  <Target className="w-8 h-8 text-purple-600" />
                </div>
              </div>
              <div className="bg-white p-6 rounded-xl shadow-sm border">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-600 text-sm font-medium">Gesamtreichweite</p>
                    <p className="text-3xl font-bold text-gray-900">12.5K</p>
                  </div>
                  <TrendingUp className="w-8 h-8 text-green-600" />
                </div>
              </div>
              <div className="bg-white p-6 rounded-xl shadow-sm border">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-600 text-sm font-medium">Klickrate</p>
                    <p className="text-3xl font-bold text-gray-900">2.4%</p>
                  </div>
                  <BarChart3 className="w-8 h-8 text-blue-600" />
                </div>
              </div>
              <div className="bg-white p-6 rounded-xl shadow-sm border">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-600 text-sm font-medium">Budget verwendet</p>
                    <p className="text-3xl font-bold text-gray-900">€450</p>
                  </div>
                  <Plus className="w-8 h-8 text-orange-600" />
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="bg-gradient-to-br from-purple-600 to-pink-600 p-6 rounded-xl text-white">
                <h3 className="text-xl font-bold mb-2">Neue Kampagne erstellen</h3>
                <p className="text-purple-100 mb-4">Starten Sie eine neue Social Media Kampagne</p>
                <button
                  onClick={handleCreateCampaign}
                  className="bg-white text-purple-600 px-4 py-2 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
                >
                  Kampagne erstellen
                </button>
              </div>
              
              <div className="bg-white p-6 rounded-xl shadow-sm border">
                <h3 className="text-xl font-bold mb-2 text-gray-900">Analytics</h3>
                <p className="text-gray-600 mb-4">Analysieren Sie Ihre Kampagnen-Performance</p>
                <button
                  onClick={() => navigateToView('analytics')}
                  className="bg-gray-100 text-gray-700 px-4 py-2 rounded-lg font-semibold hover:bg-gray-200 transition-colors"
                >
                  Analytics öffnen
                </button>
              </div>
              
              <div className="bg-white p-6 rounded-xl shadow-sm border">
                <h3 className="text-xl font-bold mb-2 text-gray-900">Optimierung</h3>
                <p className="text-gray-600 mb-4">Verbessern Sie Ihre Kampagnen-Ergebnisse</p>
                <button className="bg-gray-100 text-gray-700 px-4 py-2 rounded-lg font-semibold hover:bg-gray-200 transition-colors">
                  Optimieren
                </button>
              </div>
            </div>

            {/* Recent Campaigns */}
            <div className="bg-white rounded-xl shadow-sm border">
              <div className="p-6 border-b">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-bold text-gray-900">Aktuelle Kampagnen</h2>
                  <button
                    onClick={() => navigateToView('campaigns')}
                    className="text-purple-600 hover:text-purple-700 font-medium"
                  >
                    Alle anzeigen
                  </button>
                </div>
              </div>
              <div className="p-6">
                <div className="space-y-4">
                  {[
                    { name: 'Sommer Sale 2024', platform: 'Facebook, Instagram', status: 'Aktiv', budget: '€200', performance: '+12%' },
                    { name: 'Produktlaunch Kampagne', platform: 'Google Ads', status: 'Aktiv', budget: '€150', performance: '+8%' },
                    { name: 'Brand Awareness', platform: 'TikTok, Snapchat', status: 'Pausiert', budget: '€100', performance: '+5%' }
                  ].map((campaign, index) => (
                    <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                      <div>
                        <h3 className="font-semibold text-gray-900">{campaign.name}</h3>
                        <p className="text-sm text-gray-600">{campaign.platform}</p>
                      </div>
                      <div className="flex items-center space-x-4">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          campaign.status === 'Aktiv' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                        }`}>
                          {campaign.status}
                        </span>
                        <span className="text-sm font-medium text-gray-900">{campaign.budget}</span>
                        <span className="text-sm font-medium text-green-600">{campaign.performance}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Campaigns View */}
        {currentView === 'campaigns' && user && (
          <CampaignDashboard
            userId={user.id}
            onCreateCampaign={handleCreateCampaign}
            onViewCampaign={handleViewCampaign}
          />
        )}

        {/* Campaign Detail View */}
        {currentView === 'campaign-detail' && user && selectedCampaignId && (
          <CampaignDetailView
            campaignId={selectedCampaignId}
            onBack={handleBackToCampaigns}
          />
        )}

        {/* Analytics View */}
        {currentView === 'analytics' && user && (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-8">Analytics</h1>
            <div className="bg-white rounded-xl shadow-sm border p-8 text-center">
              <BarChart3 className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h2 className="text-xl font-semibold text-gray-900 mb-2">Analytics Dashboard</h2>
              <p className="text-gray-600">Detaillierte Analytics werden hier angezeigt</p>
            </div>
          </div>
        )}

        {/* Account Management */}
        {currentView === 'account' && user && (
          <AccountManagement user={user} onUserUpdate={setUser} />
        )}

        {/* Features Page */}
        {currentView === 'features' && (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
            <div className="text-center mb-16">
              <h1 className="text-4xl font-bold text-gray-900 mb-4">Powerful Features</h1>
              <p className="text-xl text-gray-600">Everything you need to create successful social media campaigns</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Target className="w-8 h-8 text-purple-600" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Multi-Platform</h3>
                <p className="text-gray-600">Create campaigns for all major social media platforms simultaneously</p>
              </div>
              
              <div className="text-center">
                <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <BarChart3 className="w-8 h-8 text-green-600" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Analytics</h3>
                <p className="text-gray-600">Track performance with detailed analytics and insights</p>
              </div>
              
              <div className="text-center">
                <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <TrendingUp className="w-8 h-8 text-blue-600" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Optimization</h3>
                <p className="text-gray-600">AI-powered optimization for better campaign performance</p>
              </div>
            </div>
          </div>
        )}

        {/* Pricing Page */}
        {currentView === 'pricing' && (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
            <div className="text-center mb-16">
              <h1 className="text-4xl font-bold text-gray-900 mb-4">Simple Pricing</h1>
              <p className="text-xl text-gray-600">Choose the plan that works best for you</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-white p-8 rounded-xl shadow-sm border">
                <h3 className="text-2xl font-bold mb-4">Starter</h3>
                <p className="text-4xl font-bold mb-6">€29<span className="text-lg text-gray-600">/month</span></p>
                <ul className="space-y-3 mb-8">
                  <li className="flex items-center">
                    <span className="text-green-500 mr-2">✓</span>
                    Up to 5 campaigns
                  </li>
                  <li className="flex items-center">
                    <span className="text-green-500 mr-2">✓</span>
                    3 social platforms
                  </li>
                  <li className="flex items-center">
                    <span className="text-green-500 mr-2">✓</span>
                    Basic analytics
                  </li>
                </ul>
                <button className="w-full bg-gray-100 text-gray-700 py-3 rounded-lg font-semibold hover:bg-gray-200 transition-colors">
                  Get Started
                </button>
              </div>
              
              <div className="bg-gradient-to-br from-purple-600 to-pink-600 p-8 rounded-xl text-white relative">
                <div className="absolute top-4 right-4 bg-white text-purple-600 px-3 py-1 rounded-full text-sm font-semibold">
                  Popular
                </div>
                <h3 className="text-2xl font-bold mb-4">Professional</h3>
                <p className="text-4xl font-bold mb-6">€79<span className="text-lg text-purple-200">/month</span></p>
                <ul className="space-y-3 mb-8">
                  <li className="flex items-center">
                    <span className="text-green-400 mr-2">✓</span>
                    Unlimited campaigns
                  </li>
                  <li className="flex items-center">
                    <span className="text-green-400 mr-2">✓</span>
                    All social platforms
                  </li>
                  <li className="flex items-center">
                    <span className="text-green-400 mr-2">✓</span>
                    Advanced analytics
                  </li>
                  <li className="flex items-center">
                    <span className="text-green-400 mr-2">✓</span>
                    AI optimization
                  </li>
                </ul>
                <button className="w-full bg-white text-purple-600 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
                  Get Started
                </button>
              </div>
              
              <div className="bg-white p-8 rounded-xl shadow-sm border">
                <h3 className="text-2xl font-bold mb-4">Enterprise</h3>
                <p className="text-4xl font-bold mb-6">€199<span className="text-lg text-gray-600">/month</span></p>
                <ul className="space-y-3 mb-8">
                  <li className="flex items-center">
                    <span className="text-green-500 mr-2">✓</span>
                    Everything in Professional
                  </li>
                  <li className="flex items-center">
                    <span className="text-green-500 mr-2">✓</span>
                    Priority support
                  </li>
                  <li className="flex items-center">
                    <span className="text-green-500 mr-2">✓</span>
                    Custom integrations
                  </li>
                  <li className="flex items-center">
                    <span className="text-green-500 mr-2">✓</span>
                    Dedicated manager
                  </li>
                </ul>
                <button className="w-full bg-gray-100 text-gray-700 py-3 rounded-lg font-semibold hover:bg-gray-200 transition-colors">
                  Contact Sales
                </button>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Footer */}
      <Footer />

      {/* Modals */}
      {showLogin && (
        <LoginForm
          isOpen={showLogin}
          onClose={() => setShowLogin(false)}
          onLogin={handleLogin}
        />
      )}

      {showRegister && (
        <RegisterFormSimple
          isOpen={showRegister}
          onClose={() => setShowRegister(false)}
          onRegister={handleRegisterStart}
        />
      )}

      {showCompanyProfile && (
        <CompanyProfileModal
          isOpen={showCompanyProfile}
          onClose={() => setShowCompanyProfile(false)}
          onComplete={handleCompanyProfileComplete}
          userData={registrationData}
        />
      )}

      {showPackageSelection && (
        <PackageSelectionModal
          isOpen={showPackageSelection}
          onClose={() => setShowPackageSelection(false)}
          onSelect={handlePackageSelection}
          userData={registrationData}
        />
      )}

      {showCampaignWizard && (
        <CampaignWizard
          isOpen={showCampaignWizard}
          onClose={() => setShowCampaignWizard(false)}
          userId={user?.id}
          onCampaignCreated={handleCampaignCreated}
        />
      )}
    </div>
  )
}

export default App
