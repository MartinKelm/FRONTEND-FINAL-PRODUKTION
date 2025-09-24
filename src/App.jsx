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
  Settings,
  Eye,
  Edit,
  Plus,
  ArrowRight,
  Megaphone,
  MousePointer,
  Euro
} from 'lucide-react'
import './App.css'

// Import components
import AccountManagement from './components/Account/AccountManagement'
import CampaignDashboard from './components/Campaign/CampaignDashboard'
import CampaignDetailView from './components/Campaign/CampaignDetailView'

// Import images
import FullLogo from './assets/Logo-socialmediakampagnen-voll.png'
import heroDashboard from './assets/hero-dashboard.png'
import heroCampaign from './assets/hero-campaign.png'
import heroWizard from './assets/hero-wizard.png'

// Import components
import CampaignWizard from './components/Campaign/CampaignWizard'
import LoginForm from './components/Auth/LoginForm'
import RegisterForm from './components/Auth/RegisterForm'
import RegisterFormSimple from './components/Auth/RegisterFormSimple'
import AdminDashboard from './components/Admin/AdminDashboard'
import CampaignAdminDashboard from './components/Admin/CampaignAdminDashboard'
import AboutPage from './components/Pages/AboutPage'
import ContactPage from './components/Pages/ContactPage'
import FAQPage from './components/Pages/FAQPage'
import FeaturesPage from './components/Pages/FeaturesPage'
import ImpressumPage from './components/Legal/ImpressumPage'
import TermsPage from './components/Legal/TermsPage'
import PrivacyPage from './components/Legal/PrivacyPage'
import Footer from './components/Footer'

// Import campaign utilities
import { getCampaigns, getCampaignStats } from './utils/campaignStorage'

function App() {
  const [currentView, setCurrentView] = useState('home')
  const [showCampaignWizard, setShowCampaignWizard] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  
  // Campaign management states
  const [showCampaignDashboard, setShowCampaignDashboard] = useState(false)
  const [showCampaignDetail, setShowCampaignDetail] = useState(false)
  const [selectedCampaignId, setSelectedCampaignId] = useState(null)
  const [wizardOpenedFrom, setWizardOpenedFrom] = useState(null) // Track where wizard was opened from
  
  // Auth states
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [currentUser, setCurrentUser] = useState(null)
  const [authView, setAuthView] = useState(null) // null = Homepage, 'login', 'register', 'register-simple'

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
  

  
  // Message state
  const [message, setMessage] = useState({ type: '', text: '' })

  const showMessage = (type, text) => {
    setMessage({ type, text })
    setTimeout(() => setMessage({ type: '', text: '' }), 5000)
  }

  const handleLogin = (userData) => {
    setCurrentUser(userData)
    setIsAuthenticated(true)
    setAuthView(null) // Close login form
    
    // Save to localStorage
    localStorage.setItem('currentUser', JSON.stringify(userData))
    localStorage.setItem('isAuthenticated', 'true')
    
    if (userData.role === 'ADMIN' || userData.role === 'SUPER_ADMIN') {
      setCurrentView('admin')
      localStorage.setItem('currentView', 'admin')
    } else {
      setCurrentView('dashboard')
      localStorage.setItem('currentView', 'dashboard')
    }
  }

  const handleRegister = (userData) => {
    // Show success message
    showMessage('success', 'Registrierung erfolgreich! Bitte melden Sie sich jetzt an.')
    
    // Redirect to login form
    setAuthView('login')
  }



  const handleLogout = () => {
    setCurrentUser(null)
    setIsAuthenticated(false)
    setAuthView(null) // Back to homepage
    setCurrentView('home')
    
    // Clear localStorage
    localStorage.removeItem('currentUser')
    localStorage.removeItem('isAuthenticated')
    localStorage.removeItem('currentView')
    

    
    // Reset campaign states
    setShowCampaignDashboard(false)
    setShowCampaignDetail(false)
    setSelectedCampaignId(null)
  }

  // Campaign management handlers
  const handleOpenCampaignDashboard = () => {
    setShowCampaignDashboard(true)
    setShowCampaignDetail(false)
    setSelectedCampaignId(null)
  }

  const handleCloseCampaignDashboard = () => {
    setShowCampaignDashboard(false)
  }

  const handleCreateCampaign = () => {
    // Track where wizard was opened from
    setWizardOpenedFrom(showCampaignDashboard ? 'campaignDashboard' : 'mainDashboard')
    // Close campaign dashboard when opening wizard
    setShowCampaignDashboard(false)
    setShowCampaignWizard(true)
  }

  const handleViewCampaign = (campaignId) => {
    setSelectedCampaignId(campaignId)
    setShowCampaignDetail(true)
    setShowCampaignDashboard(false)
  }

  const handleCloseCampaignDetail = () => {
    setShowCampaignDetail(false)
    setSelectedCampaignId(null)
    setShowCampaignDashboard(true)
  }

  // Get dashboard data based on user type
  const getDashboardData = (user) => {
    // Demo account gets sample data
    if (user?.isDemoAccount) {
      return {
        activeCampaigns: 3,
        totalReach: '12.5K',
        clickRate: '2.4%',
        budgetUsed: '€450',
        budgetTotal: '€1,000',
        campaigns: [
          { name: 'Demo Kampagne 1', platform: 'Facebook', status: 'Aktiv', performance: 'Gut' },
          { name: 'Test Anzeige', platform: 'Instagram', status: 'Aktiv', performance: 'Exzellent' },
          { name: 'Beispiel Werbung', platform: 'Google', status: 'Pausiert', performance: 'Durchschnitt' }
        ]
      }
    }
    
    // Admin gets full sample data
    if (user?.role === 'ADMIN' || user?.role === 'SUPER_ADMIN') {
      return {
        activeCampaigns: 25,
        totalReach: '156K',
        clickRate: '4.2%',
        budgetUsed: '€8,750',
        budgetTotal: '€12,000',
        campaigns: [
          { name: 'Admin Test Kampagne', platform: 'Facebook', status: 'Aktiv', performance: 'Exzellent' },
          { name: 'System Monitor', platform: 'Instagram', status: 'Aktiv', performance: 'Gut' },
          { name: 'Performance Test', platform: 'TikTok', status: 'Aktiv', performance: 'Exzellent' }
        ]
      }
    }
    
    // New users get clean data (all zeros)
    return {
      activeCampaigns: 0,
      totalReach: '0',
      clickRate: '0%',
      budgetUsed: '€0',
      budgetTotal: '€0',
      campaigns: []
    }
  }

  // Get campaign stats for the campaign management tile
  const getCampaignTileData = (user) => {
    if (!user) return { total: 0, active: 0, draft: 0, paused: 0 }
    
    try {
      const campaigns = getCampaigns(user.id)
      const stats = getCampaignStats(user.id)
      
      return {
        total: campaigns.length,
        active: campaigns.filter(c => c.status === 'active').length,
        draft: campaigns.filter(c => c.status === 'draft').length,
        paused: campaigns.filter(c => c.status === 'paused').length,
        ...stats
      }
    } catch (error) {
      console.error('Error loading campaign tile data:', error)
      return { total: 0, active: 0, draft: 0, paused: 0 }
    }
  }

  const UserMenu = () => (
    <div className="flex items-center space-x-4">
      <div className="hidden md:flex items-center space-x-2">
        <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
          (currentUser?.role === 'ADMIN' || currentUser?.role === 'SUPER_ADMIN')
            ? 'bg-gradient-to-br from-red-500 to-pink-500' 
            : currentUser?.isDemoAccount
            ? 'bg-gradient-to-br from-green-500 to-emerald-500'
            : 'bg-gradient-to-br from-blue-500 to-purple-500'
        }`}>
          {(currentUser?.role === 'ADMIN' || currentUser?.role === 'SUPER_ADMIN') ? (
            <Shield className="w-4 h-4 text-white" />
          ) : (
            <User className="w-4 h-4 text-white" />
          )}
        </div>
        <div className="text-sm">
          <div className="font-medium text-white">
            {currentUser?.name}
            {currentUser?.isDemoAccount && <span className="text-green-300 ml-1">(Demo)</span>}
          </div>
          <div className="text-white/70 text-xs">
            {(currentUser?.role === 'ADMIN' || currentUser?.role === 'SUPER_ADMIN') 
              ? 'Administrator' 
              : currentUser?.isDemoAccount 
              ? 'Demo-Benutzer' 
              : 'Benutzer'}
          </div>
        </div>
      </div>
      <Button
        onClick={handleLogout}
        size="sm"
        className="bg-red-500 hover:bg-red-600 text-white w-8 h-8 rounded-full p-0 flex items-center justify-center shadow-lg"
        title="Abmelden"
      >
        <LogOut className="w-4 h-4" />
      </Button>
    </div>
  )

  const Navigation = () => (
    <nav className="bg-white shadow-sm sticky top-0 z-40 px-3 sm:px-4 py-3 sm:py-4">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <img src={FullLogo} alt="socialmediakampagnen.com Logo" className="h-8 sm:h-10 w-auto" />
          </div>

          <div className="hidden lg:flex items-center space-x-6 xl:space-x-8">
            {isAuthenticated ? (
              <>
                {currentUser?.role !== 'admin' && (
                  <>
                    <button 
                      onClick={() => setCurrentView('dashboard')}
                      className={`text-gray-700 hover:text-purple-600 transition-colors text-sm font-medium ${currentView === 'dashboard' ? 'text-purple-600' : ''}`}
                    >
                      Dashboard
                    </button>
                    <button 
                      onClick={() => setCurrentView('features')}
                      className={`text-gray-700 hover:text-purple-600 transition-colors text-sm font-medium ${currentView === 'features' ? 'text-purple-600' : ''}`}
                    >
                      Features
                    </button>
                    <button 
                      onClick={() => setCurrentView('pricing')}
                      className={`text-gray-700 hover:text-purple-600 transition-colors text-sm font-medium ${currentView === 'pricing' ? 'text-purple-600' : ''}`}
                    >
                      Preise
                    </button>
                    <Button 
                      onClick={() => setCurrentView('account')}
                      variant={currentView === 'account' ? 'default' : 'outline'}
                      size="sm"
                      className="text-sm"
                    >
                      Mein Account
                    </Button>
                  </>
                )}
                {(currentUser?.role === 'ADMIN' || currentUser?.role === 'SUPER_ADMIN') && (
                  <>
                    <button 
                      onClick={() => setCurrentView('admin')}
                      className={`text-gray-700 hover:text-red-600 transition-colors text-sm font-medium ${currentView === 'admin' ? 'text-red-600' : ''}`}
                    >
                      Admin Dashboard
                    </button>
                    <button 
                      onClick={() => setCurrentView('campaign-admin')}
                      className={`text-gray-700 hover:text-red-600 transition-colors text-sm font-medium ${currentView === 'campaign-admin' ? 'text-red-600' : ''}`}
                    >
                      Kampagnen-Verwaltung
                    </button>
                  </>
                )}
              </>
            ) : (
              <>
                <button 
                  onClick={() => {
                    setCurrentView('home')
                    setAuthView(null)
                  }}
                  className={`text-gray-700 hover:text-purple-600 transition-colors text-sm font-medium ${currentView === 'home' ? 'text-purple-600' : ''}`}
                >
                  Home
                </button>
                <button 
                  onClick={() => {
                    setCurrentView('features')
                    setAuthView(null)
                  }}
                  className={`text-gray-700 hover:text-purple-600 transition-colors text-sm font-medium ${currentView === 'features' ? 'text-purple-600' : ''}`}
                >
                  Features
                </button>
                <button 
                  onClick={() => {
                    setCurrentView('pricing')
                    setAuthView(null)
                  }}
                  className={`text-gray-700 hover:text-purple-600 transition-colors text-sm font-medium ${currentView === 'pricing' ? 'text-purple-600' : ''}`}
                >
                  Preise
                </button>
                <button 
                  onClick={() => {
                    setCurrentView('about')
                    setAuthView(null)
                  }}
                  className={`text-gray-700 hover:text-purple-600 transition-colors text-sm font-medium ${currentView === 'about' ? 'text-purple-600' : ''}`}
                >
                  Über uns
                </button>
                <button 
                  onClick={() => {
                    setCurrentView('contact')
                    setAuthView(null)
                  }}
                  className={`text-gray-700 hover:text-purple-600 transition-colors text-sm font-medium ${currentView === 'contact' ? 'text-purple-600' : ''}`}
                >
                  Kontakt
                </button>
                <button 
                  onClick={() => {
                    setCurrentView('faq')
                    setAuthView(null)
                  }}
                  className={`text-gray-700 hover:text-purple-600 transition-colors text-sm font-medium ${currentView === 'faq' ? 'text-purple-600' : ''}`}
                >
                  FAQ
                </button>
              </>
            )}
          </div>

          <div className="hidden md:flex items-center space-x-4">
            {isAuthenticated ? (
              <UserMenu />
            ) : (
              <>
                <Button 
                  onClick={() => setAuthView('login')}
                  className="bg-gradient-to-r from-green-600 to-emerald-600 text-white hover:from-green-700 hover:to-emerald-700 text-sm px-6 py-2 touch-manipulation font-semibold shadow-lg hover:shadow-xl transition-all duration-200"
                >
                  Login
                </Button>
                <Button 
                  onClick={() => setAuthView('register-simple')}
                  className="brand-gradient text-white hover:opacity-90 text-sm px-4 py-2 touch-manipulation"
                >
                  Registrieren
                </Button>
              </>
            )}
          </div>

          <div className="lg:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-gray-700 p-2 touch-manipulation"
            >
              {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {isMobileMenuOpen && (
          <div className="lg:hidden absolute top-full left-0 right-0 mt-1 pb-4 pt-4 bg-gray-900 shadow-xl z-50 px-4">
            <div className="flex flex-col space-y-3">
              {isAuthenticated ? (
                <>
                  {currentUser?.role !== 'admin' && (
                    <>
                      <button 
                        onClick={() => {
                          setCurrentView('dashboard')
                          setIsMobileMenuOpen(false)
                        }}
                        className="text-white hover:text-purple-300 hover:bg-gray-800 text-left py-3 px-2 text-sm font-medium touch-manipulation rounded-md transition-colors w-full"
                      >
                        Dashboard
                      </button>
                      <button 
                        onClick={() => {
                          setCurrentView('features')
                          setIsMobileMenuOpen(false)
                        }}
                        className="text-white hover:text-purple-300 hover:bg-gray-800 text-left py-3 px-2 text-sm font-medium touch-manipulation rounded-md transition-colors w-full"
                      >
                        Features
                      </button>
                      <button 
                        onClick={() => {
                          setCurrentView('pricing')
                          setIsMobileMenuOpen(false)
                        }}
                        className="text-white hover:text-purple-300 hover:bg-gray-800 text-left py-3 px-2 text-sm font-medium touch-manipulation rounded-md transition-colors w-full"
                      >
                        Preise
                      </button>
                      <Button 
                        onClick={() => {
                          setCurrentView('account')
                          setIsMobileMenuOpen(false)
                        }}
                        variant="outline"
                        size="sm"
                        className="text-white border-white hover:bg-white hover:text-gray-900 w-full text-sm touch-manipulation"
                      >
                        Mein Account
                      </Button>
                    </>
                  )}
                  {(currentUser?.role === 'ADMIN' || currentUser?.role === 'SUPER_ADMIN') && (
                    <>
                      <button 
                        onClick={() => {
                          setCurrentView('admin')
                          setIsMobileMenuOpen(false)
                        }}
                        className="text-white hover:text-red-300 hover:bg-gray-800 text-left py-3 px-2 text-sm font-medium touch-manipulation rounded-md transition-colors w-full"
                      >
                        Admin Dashboard
                      </button>
                      <button 
                        onClick={() => {
                          setCurrentView('campaign-admin')
                          setIsMobileMenuOpen(false)
                        }}
                        className="text-white hover:text-red-300 hover:bg-gray-800 text-left py-3 px-2 text-sm font-medium touch-manipulation rounded-md transition-colors w-full"
                      >
                        Kampagnen-Verwaltung
                      </button>
                    </>
                  )}
                  <div className="pt-2 border-t border-gray-600">
                    <Button
                      onClick={() => {
                        handleLogout()
                        setIsMobileMenuOpen(false)
                      }}
                      variant="outline"
                      size="sm"
                      className="text-red-400 border-red-400 hover:bg-red-400 hover:text-white w-full text-sm touch-manipulation"
                    >
                      <LogOut className="w-4 h-4 mr-2" />
                      Abmelden
                    </Button>
                  </div>
                </>
              ) : (
                <>
                  <button 
                    onClick={() => {
                      setCurrentView('home')
                      setAuthView(null)
                      setIsMobileMenuOpen(false)
                    }}
                    className="text-white hover:text-purple-300 hover:bg-gray-800 text-left py-3 px-2 text-sm font-medium touch-manipulation rounded-md transition-colors w-full"
                  >
                    Home
                  </button>
                  <button 
                    onClick={() => {
                      setCurrentView('features')
                      setAuthView(null)
                      setIsMobileMenuOpen(false)
                    }}
                    className="text-white hover:text-purple-300 hover:bg-gray-800 text-left py-3 px-2 text-sm font-medium touch-manipulation rounded-md transition-colors w-full"
                  >
                    Features
                  </button>
                  <button 
                    onClick={() => {
                      setCurrentView('pricing')
                      setAuthView(null)
                      setIsMobileMenuOpen(false)
                    }}
                    className="text-white hover:text-purple-300 hover:bg-gray-800 text-left py-3 px-2 text-sm font-medium touch-manipulation rounded-md transition-colors w-full"
                  >
                    Preise
                  </button>
                  <button 
                    onClick={() => {
                      setCurrentView('about')
                      setAuthView(null)
                      setIsMobileMenuOpen(false)
                    }}
                    className="text-white hover:text-purple-300 hover:bg-gray-800 text-left py-3 px-2 text-sm font-medium touch-manipulation rounded-md transition-colors w-full"
                  >
                    Über uns
                  </button>
                  <button 
                    onClick={() => {
                      setCurrentView('contact')
                      setAuthView(null)
                      setIsMobileMenuOpen(false)
                    }}
                    className="text-white hover:text-purple-300 hover:bg-gray-800 text-left py-3 px-2 text-sm font-medium touch-manipulation rounded-md transition-colors w-full"
                  >
                    Kontakt
                  </button>
                  <button 
                    onClick={() => {
                      setCurrentView('faq')
                      setAuthView(null)
                      setIsMobileMenuOpen(false)
                    }}
                    className="text-white hover:text-purple-300 hover:bg-gray-800 text-left py-3 px-2 text-sm font-medium touch-manipulation rounded-md transition-colors w-full"
                  >
                    FAQ
                  </button>
                  <div className="pt-2 border-t border-gray-600 space-y-2">
                    <Button 
                      onClick={() => {
                        setAuthView('login')
                        setIsMobileMenuOpen(false)
                      }}
                      className="bg-gradient-to-r from-green-600 to-emerald-600 text-white hover:from-green-700 hover:to-emerald-700 w-full text-sm touch-manipulation font-semibold shadow-lg"
                    >
                      Login
                    </Button>
                    <Button 
                      onClick={() => {
                        setAuthView('register-simple')
                        setIsMobileMenuOpen(false)
                      }}
                      className="brand-gradient text-white hover:opacity-90 w-full text-sm touch-manipulation"
                    >
                      Registrieren
                    </Button>
                  </div>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  )

  // Auth Views - now with Navigation and Footer
  if (!isAuthenticated && (authView === 'login' || authView === 'register' || authView === 'register-simple')) {
    return (
      <div>
        <Navigation />
        
        {authView === 'login' && (
          <>
            <LoginForm 
              onLogin={handleLogin}
              onSwitchToRegister={() => setAuthView('register-simple')}
            />
            <Footer onNavigate={setCurrentView} setAuthView={setAuthView} />
          </>
        )}
        {authView === 'register' && (
          <>
            <RegisterForm 
              onRegister={handleRegister}
              onSwitchToLogin={() => setAuthView('login')}
            />
            <Footer onNavigate={setCurrentView} setAuthView={setAuthView} />
          </>
        )}
        {authView === 'register-simple' && (
          <>
            <RegisterFormSimple 
              onRegister={handleRegister}
              onSwitchToLogin={() => setAuthView('login')}
            />
            <Footer onNavigate={setCurrentView} setAuthView={setAuthView} />
          </>
        )}
        

      </div>
    )
  }

  // Admin Dashboard
  if (isAuthenticated && (currentUser?.role === 'ADMIN' || currentUser?.role === 'SUPER_ADMIN') && currentView === 'admin') {
    return (
      <div>
        <Navigation />
        <AdminDashboard user={currentUser} />
      </div>
    )
  }

  // Campaign Management Views - Enhanced with full-width layout
  if (showCampaignDashboard) {
    return (
      <div>
        <Navigation />
        <section className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 py-8 px-4 sm:px-6">
          <div className="max-w-7xl mx-auto">
            <CampaignDashboard 
              userId={currentUser?.id}
              onCreateCampaign={handleCreateCampaign}
              onViewCampaign={handleViewCampaign}
              onClose={handleCloseCampaignDashboard}
            />
          </div>
        </section>
        <Footer onNavigate={setCurrentView} setAuthView={setAuthView} />
      </div>
    )
  }

  if (showCampaignDetail && selectedCampaignId) {
    return (
      <div>
        <Navigation />
        <section className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 py-8 px-4 sm:px-6">
          <div className="max-w-7xl mx-auto">
            <CampaignDetailView 
              campaignId={selectedCampaignId}
              userId={currentUser?.id}
              onClose={handleCloseCampaignDetail}
              onEdit={() => {
                // Handle edit campaign
                setShowCampaignWizard(true)
              }}
            />
          </div>
        </section>
        <Footer onNavigate={setCurrentView} setAuthView={setAuthView} />
      </div>
    )
  }

  // Campaign Wizard Modal
  if (showCampaignWizard) {
    return (
      <div>
        <CampaignWizard onClose={() => setShowCampaignWizard(false)} />
      </div>
    )
  }

  // Hero Section - ORIGINAL DESIGN PRESERVED (Wording aktualisiert)
  const HeroSection = () => (
    <section className="hero-section relative overflow-hidden px-4 sm:px-6 py-12 sm:py-16 lg:py-20">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-8 sm:mb-12">
          <div className="flex flex-wrap justify-center gap-2 sm:gap-3 mb-6 sm:mb-8">
            <Badge className="bg-yellow-400 text-yellow-900 border-yellow-500 text-xs sm:text-sm px-2 sm:px-3 py-1 font-medium">
              🆕 NEU
            </Badge>
            <Badge className="bg-green-400 text-green-900 border-green-500 text-xs sm:text-sm px-2 sm:px-3 py-1 font-medium">
              🔥 BELIEBT
            </Badge>
            <Badge className="bg-blue-400 text-blue-900 border-blue-500 text-xs sm:text-sm px-2 sm:px-3 py-1 font-medium">
              🇩🇪 DEUTSCHLAND
            </Badge>
          </div>
          
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 sm:mb-6 leading-tight">
            <span className="text-yellow-300">Alle Werbeanzeigen</span> in einem Editor –{' '}
            <span className="text-green-300">einfach</span>,{' '}
            <span className="text-blue-300">schnell</span>,{' '}
            <span className="text-pink-300">effektiv</span>
          </h1>
          
          <p className="text-lg sm:text-xl md:text-2xl text-white/90 mb-8 sm:mb-10 max-w-4xl mx-auto leading-relaxed">
            Eine Plattform für alle Kanäle. Erstelle Anzeigen für Meta, Google, TikTok, Spotify & mehr –
            ohne Ads-Manager, ohne Agentur, ohne Umwege.
          </p>
          <p className="text-base sm:text-lg text-white/80 mb-8 sm:mb-10 max-w-3xl mx-auto leading-relaxed">
            Ob Recruiting, E-Commerce oder lokale Werbung: Socialmediakampagnen.com bündelt alles,
            was du brauchst, um in Minuten live zu sein und messbar neue Kunden & Bewerber zu erreichen.
          </p>
        </div>

        <div className="relative">
          <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 via-pink-500/20 to-orange-500/20 rounded-3xl blur-3xl"></div>
          <div className="relative bg-white/10 backdrop-blur-sm rounded-2xl sm:rounded-3xl p-4 sm:p-6 lg:p-8 border border-white/20">
            <img 
              src={heroDashboard} 
              alt="socialmediakampagnen.com Dashboard Preview" 
              className="w-full h-auto rounded-xl sm:rounded-2xl shadow-2xl"
            />
          </div>
        </div>
      </div>
    </section>
  )

  // Features Section - ORIGINAL DESIGN PRESERVED (Wording aktualisiert)
  const FeaturesSection = () => (
    <section className="py-12 sm:py-16 lg:py-20 px-4 sm:px-6 bg-gradient-to-br from-gray-50 to-blue-50">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12 sm:mb-16">
          <div className="flex flex-wrap justify-center gap-2 sm:gap-3 mb-6">
            <Badge className="bg-red-500 text-white border-red-600 text-xs sm:text-sm px-2 sm:px-3 py-1 font-medium">
              ZEITERSPARNIS
            </Badge>
            <Badge className="bg-orange-500 text-white border-orange-600 text-xs sm:text-sm px-2 sm:px-3 py-1 font-medium">
              EINFACH
            </Badge>
            <Badge className="bg-green-500 text-white border-green-600 text-xs sm:text-sm px-2 sm:px-3 py-1 font-medium">
              EFFEKTIV
            </Badge>
            <Badge className="bg-blue-500 text-white border-blue-600 text-xs sm:text-sm px-2 sm:px-3 py-1 font-medium">
              PROFESSIONELL
            </Badge>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4 sm:mb-6">
            Warum <span className="text-purple-600">socialmediakampagnen.com</span>?
          </h2>
          <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto">
            Die zentrale Plattform für Unternehmen, Recruiter und Werbetreibende – alle Anzeigen in einem Editor erstellen, überall ausspielen und zentral auswerten.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 mb-12 sm:mb-16">
          <Card className="bg-gradient-to-br from-red-500 to-pink-500 text-white border-0 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105 group">
            <CardHeader className="pb-4">
              <div className="flex items-center justify-between mb-4">
                <Badge className="bg-white/20 text-white border-white/30 text-xs font-medium">
                  EFFIZIENZ
                </Badge>
                <Clock className="w-8 h-8 text-white/80 group-hover:text-white transition-colors" />
              </div>
              <CardTitle className="text-xl sm:text-2xl font-bold text-purple-100">
                90% Zeitersparnis
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-white/90 text-sm sm:text-base leading-relaxed">
                Einmal erstellen, überall ausspielen. Schluss mit fünf Ads-Managern, zig Formaten und Copy-Paste.
              </p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-green-500 to-emerald-500 text-white border-0 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105 group">
            <CardHeader className="pb-4">
              <div className="flex items-center justify-between mb-4">
                <Badge className="bg-white/20 text-white border-white/30 text-xs font-medium">
                  EINFACH
                </Badge>
                <Zap className="w-8 h-8 text-white/80 group-hover:text-white transition-colors" />
              </div>
              <CardTitle className="text-xl sm:text-2xl font-bold text-blue-100">
                Keine Kenntnisse nötig
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-white/90 text-sm sm:text-base leading-relaxed">
                Intuitiv wie ein Formular – jeder im Team kann Kampagnen live schalten. Optional mit KI-Texten & Vorlagen.
              </p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-orange-500 to-red-500 text-white border-0 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105 group">
            <CardHeader className="pb-4">
              <div className="flex items-center justify-between mb-4">
                <Badge className="bg-white/20 text-white border-white/30 text-xs font-medium">
                  INNOVATION
                </Badge>
                <BarChart3 className="w-8 h-8 text-white/80 group-hover:text-white transition-colors" />
              </div>
              <CardTitle className="text-xl sm:text-2xl font-bold text-orange-100">
                Live-Vorschau & Kontrolle
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-white/90 text-sm sm:text-base leading-relaxed">
                Sofort sehen, wie deine Anzeigen auf Meta, Google, TikTok & Co. wirken – inklusive zentraler Abrechnung.
              </p>
            </CardContent>
          </Card>
        </div>

        <div className="bg-gradient-to-r from-yellow-400 via-pink-500 to-purple-600 rounded-3xl p-8 sm:p-12 text-center text-white">
          <h3 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-4 sm:mb-6">
            Unterstützte Plattformen
          </h3>
          <p className="text-lg sm:text-xl mb-8 sm:mb-10 text-white/90">
            Erstelle Anzeigen für alle relevanten Kanäle – zentral gesteuert in einem Editor.
          </p>
          
          <div className="flex flex-wrap justify-center gap-4 sm:gap-6">
            <Badge className="bg-blue-600 text-white border-blue-700 text-sm sm:text-base px-4 sm:px-6 py-2 sm:py-3 font-medium">
              <Facebook className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
              Facebook
            </Badge>
            <Badge className="bg-pink-500 text-white border-pink-600 text-sm sm:text-base px-4 sm:px-6 py-2 sm:py-3 font-medium">
              <Instagram className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
              Instagram
            </Badge>
            <Badge className="bg-red-500 text-white border-red-600 text-sm sm:text-base px-4 sm:px-6 py-2 sm:py-3 font-medium">
              <Youtube className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
              YouTube
            </Badge>
            <Badge className="bg-green-600 text-white border-green-700 text-sm sm:text-base px-4 sm:px-6 py-2 sm:py-3 font-medium">
              🔍 Google
            </Badge>
            <Badge className="bg-black text-white border-gray-800 text-sm sm:text-base px-4 sm:px-6 py-2 sm:py-3 font-medium">
              🎵 TikTok
            </Badge>
            <Badge className="bg-yellow-400 text-black border-yellow-500 text-sm sm:text-base px-4 sm:px-6 py-2 sm:py-3 font-medium">
              👻 Snapchat
            </Badge>
            <Badge className="bg-orange-600 text-white border-orange-700 text-sm sm:text-base px-4 sm:px-6 py-2 sm:py-3 font-medium">
              🤖 Reddit
            </Badge>
          </div>
        </div>
      </div>
    </section>
  )

  // Pricing Section (Wording aktualisiert)
  const PricingSection = () => (
    <section className="py-12 sm:py-16 lg:py-20 px-4 sm:px-6 bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12 sm:mb-16">
          <div className="flex flex-wrap justify-center gap-2 sm:gap-3 mb-6">
            <Badge className="bg-yellow-400 text-yellow-900 border-yellow-500 text-xs sm:text-sm px-2 sm:px-3 py-1 font-medium">
              TRANSPARENT
            </Badge>
            <Badge className="bg-green-400 text-green-900 border-green-500 text-xs sm:text-sm px-2 sm:px-3 py-1 font-medium">
              FAIR
            </Badge>
            <Badge className="bg-blue-400 text-blue-900 border-blue-500 text-xs sm:text-sm px-2 sm:px-3 py-1 font-medium">
              FLEXIBEL
            </Badge>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4 sm:mb-6">
            Einfache, <span className="text-yellow-300">transparente</span> Preise
          </h2>
          <p className="text-lg sm:text-xl text-white/90 max-w-3xl mx-auto">
            Keine versteckten Kosten, keine Überraschungen. Wählen Sie den Plan, der zu Ihrem Unternehmen passt.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 sm:gap-12">
          <Card className="bg-white/10 backdrop-blur-sm border border-white/20 text-white relative overflow-hidden">
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-green-400 to-blue-400"></div>
            <CardHeader className="text-center pb-4">
              <CardTitle className="text-2xl font-bold text-green-300 mb-2">Starter</CardTitle>
              <div className="text-4xl font-bold mb-2">€49</div>
              <p className="text-white/70 text-sm">pro Monat</p>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div className="flex items-center space-x-2">
                  <CheckCircle className="w-5 h-5 text-green-400" />
                  <span className="text-sm">Bis zu 5 Kampagnen</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle className="w-5 h-5 text-green-400" />
                  <span className="text-sm">3 Plattformen</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle className="w-5 h-5 text-green-400" />
                  <span className="text-sm">Basis-Analytics</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle className="w-5 h-5 text-green-400" />
                  <span className="text-sm">E-Mail Support</span>
                </div>
              </div>
              <Button className="w-full bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 text-white mt-6">
                Starter wählen
              </Button>
            </CardContent>
          </Card>

          <Card className="bg-white/10 backdrop-blur-sm border border-white/20 text-white relative overflow-hidden transform scale-105">
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-purple-400 to-pink-400"></div>
            <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
              <Badge className="bg-gradient-to-r from-purple-500 to-pink-500 text-white border-0 px-4 py-1 text-xs font-medium">
                BELIEBT
              </Badge>
            </div>
            <CardHeader className="text-center pb-4 pt-6">
              <CardTitle className="text-2xl font-bold text-purple-300 mb-2">Professional</CardTitle>
              <div className="text-4xl font-bold mb-2">€149</div>
              <p className="text-white/70 text-sm">pro Monat</p>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div className="flex items-center space-x-2">
                  <CheckCircle className="w-5 h-5 text-purple-400" />
                  <span className="text-sm">Unbegrenzte Kampagnen</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle className="w-5 h-5 text-purple-400" />
                  <span className="text-sm">Alle Plattformen</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle className="w-5 h-5 text-purple-400" />
                  <span className="text-sm">Erweiterte Analytics</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle className="w-5 h-5 text-purple-400" />
                  <span className="text-sm">KI-Textgenerierung</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle className="w-5 h-5 text-purple-400" />
                  <span className="text-sm">Priority Support</span>
                </div>
              </div>
              <Button className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white mt-6">
                Professional wählen
              </Button>
            </CardContent>
          </Card>

          <Card className="bg-white/10 backdrop-blur-sm border border-white/20 text-white relative overflow-hidden">
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-orange-400 to-red-400"></div>
            <CardHeader className="text-center pb-4">
              <CardTitle className="text-2xl font-bold text-orange-300 mb-2">Enterprise</CardTitle>
              <div className="text-4xl font-bold mb-2">€499</div>
              <p className="text-white/70 text-sm">pro Monat</p>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div className="flex items-center space-x-2">
                  <CheckCircle className="w-5 h-5 text-orange-400" />
                  <span className="text-sm">Alles aus Professional</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle className="w-5 h-5 text-orange-400" />
                  <span className="text-sm">Multi-User Management</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle className="w-5 h-5 text-orange-400" />
                  <span className="text-sm">API-Zugang</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle className="w-5 h-5 text-orange-400" />
                  <span className="text-sm">Dedicated Account Manager</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle className="w-5 h-5 text-orange-400" />
                  <span className="text-sm">24/7 Phone Support</span>
                </div>
              </div>
              <Button className="w-full bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white mt-6">
                Enterprise wählen
              </Button>
            </CardContent>
          </Card>
        </div>

        <div className="text-center mt-12 sm:mt-16">
          <p className="text-white/80 text-sm sm:text-base mb-4">
            Alle Pläne sind Jahresmitgliedschaften mit sofortiger Aktivierung
          </p>
          <div className="flex flex-wrap justify-center gap-4 sm:gap-6">
            <Badge className="bg-white/10 text-white border-white/20 text-xs sm:text-sm px-3 py-2">
              ✅ Keine Einrichtungsgebühr
            </Badge>
            <Badge className="bg-white/10 text-white border-white/20 text-xs sm:text-sm px-3 py-2">
              ✅ Einheitliche Abrechnung
            </Badge>
            <Badge className="bg-white/10 text-white border-white/20 text-xs sm:text-sm px-3 py-2">
              ✅ DSGVO-konform
            </Badge>
          </div>
        </div>
      </div>
    </section>
  )

  // Dashboard Section (for authenticated users) - WITH HOVER EFFECTS ON ALL CARDS
  const DashboardSection = () => {
    const dashboardData = getDashboardData(currentUser)
    const campaignTileData = getCampaignTileData(currentUser)
    
    return (
      <section className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 py-8 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto">
          <div className="mb-8">
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">
              Willkommen zurück, {currentUser?.name}!
              {currentUser?.isDemoAccount && (
                <span className="text-green-600 text-lg ml-2">(Demo-Account)</span>
              )}
            </h1>
            <p className="text-gray-600">
              {currentUser?.isDemoAccount 
                ? "Dies ist ein Demo-Account mit Beispieldaten. Registrieren Sie sich für Ihren eigenen Account."
                : "Hier ist eine Übersicht Ihrer aktuellen Kampagnen und Performance"
              }
            </p>
            {currentUser?.registrationStep !== 'completed' && !currentUser?.isDemoAccount && (
              <div className="mt-4 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                <p className="text-yellow-800 text-sm">
                  <strong>Hinweis:</strong> Vervollständigen Sie Ihr Profil für bessere Kampagnenvorschläge.


                </p>
              </div>
            )}
          </div>

          {/* Enhanced Dashboard Cards with Hover Effects */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <Card className="bg-gradient-to-br from-blue-500 to-blue-600 text-white hover:shadow-2xl transition-all duration-300 transform hover:scale-105 group">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-blue-100">
                  Aktive Kampagnen
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{dashboardData.activeCampaigns}</div>
                <p className="text-xs text-blue-200">
                  {dashboardData.activeCampaigns > 0 ? '+2 diese Woche' : 'Erstellen Sie Ihre erste Kampagne'}
                </p>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-green-500 to-green-600 text-white hover:shadow-2xl transition-all duration-300 transform hover:scale-105 group">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-green-100">
                  Gesamtreichweite
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{dashboardData.totalReach}</div>
                <p className="text-xs text-green-200">
                  {dashboardData.totalReach !== '0' ? '+15% vs. letzter Monat' : 'Starten Sie Ihre erste Kampagne'}
                </p>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-purple-500 to-purple-600 text-white hover:shadow-2xl transition-all duration-300 transform hover:scale-105 group">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-purple-100">
                  Klickrate
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{dashboardData.clickRate}</div>
                <p className="text-xs text-purple-200">
                  {dashboardData.clickRate !== '0%' ? 'Über dem Durchschnitt' : 'Wird nach ersten Kampagnen angezeigt'}
                </p>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-orange-500 to-orange-600 text-white hover:shadow-2xl transition-all duration-300 transform hover:scale-105 group">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-orange-100">
                  Budget verwendet
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{dashboardData.budgetUsed}</div>
                <p className="text-xs text-orange-200">
                  {dashboardData.budgetTotal !== '€0' ? `von ${dashboardData.budgetTotal}` : 'Kein Budget festgelegt'}
                </p>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Campaign Management Tile - Enhanced with Hover Effects */}
            <Card className="bg-gradient-to-br from-indigo-500 to-purple-600 text-white border-0 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105 group cursor-pointer"
                  onClick={handleOpenCampaignDashboard}>
              <CardHeader className="pb-4">
                <div className="flex items-center justify-between mb-4">
                  <Badge className="bg-white/20 text-white border-white/30 text-xs font-medium">
                    KAMPAGNEN
                  </Badge>
                  <Megaphone className="w-8 h-8 text-white/80 group-hover:text-white transition-colors" />
                </div>
                <CardTitle className="text-xl font-bold text-white mb-2">
                  Kampagnen verwalten
                </CardTitle>
                <CardDescription className="text-white/80 text-sm">
                  Erstellen, bearbeiten und überwachen Sie alle Ihre Werbekampagnen
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-white">{campaignTileData.total || 0}</div>
                      <div className="text-xs text-white/70">Gesamt</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-green-300">{campaignTileData.active || 0}</div>
                      <div className="text-xs text-white/70">Aktiv</div>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between pt-4 border-t border-white/20">
                    <div className="flex items-center space-x-2">
                      <Plus className="w-4 h-4" />
                      <span className="text-sm">Neue Kampagne</span>
                    </div>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Existing Campaign Card - Enhanced with Hover Effects */}
            <Card className="hover:shadow-2xl transition-all duration-300 transform hover:scale-105 group">
              <CardHeader>
                <CardTitle>
                  {dashboardData.campaigns.length > 0 ? 'Aktuelle Kampagnen' : 'Ihre Kampagnen'}
                </CardTitle>
                <CardDescription>
                  {dashboardData.campaigns.length > 0 
                    ? 'Ihre laufenden Werbekampagnen' 
                    : 'Sie haben noch keine Kampagnen erstellt'
                  }
                </CardDescription>
              </CardHeader>
              <CardContent>
                {dashboardData.campaigns.length > 0 ? (
                  <div className="space-y-4">
                    {dashboardData.campaigns.map((campaign, index) => (
                      <div key={index} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                        <div>
                          <h4 className="font-medium text-gray-900">{campaign.name}</h4>
                          <p className="text-sm text-gray-500">{campaign.platform}</p>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Badge className={
                            campaign.status === 'Aktiv' 
                              ? 'bg-green-100 text-green-800' 
                              : 'bg-yellow-100 text-yellow-800'
                          }>
                            {campaign.status}
                          </Badge>
                          <Button variant="ghost" size="sm">
                            <MoreHorizontal className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <div className="text-gray-400 mb-4">
                      <Target className="w-12 h-12 mx-auto" />
                    </div>
                    <p className="text-gray-500 mb-4">
                      Erstellen Sie Ihre erste Kampagne und erreichen Sie Ihre Zielgruppe.
                    </p>
                  </div>
                )}
                <Button 
                  onClick={handleCreateCampaign}
                  className="w-full mt-4 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
                >
                  {dashboardData.campaigns.length > 0 ? 'Neue Kampagne erstellen' : 'Erste Kampagne erstellen'}
                </Button>
              </CardContent>
            </Card>

            {/* Performance Overview Card - Enhanced with Hover Effects */}
            <Card className="hover:shadow-2xl transition-all duration-300 transform hover:scale-105 group">
              <CardHeader>
                <CardTitle>Performance Übersicht</CardTitle>
                <CardDescription>
                  {dashboardData.activeCampaigns > 0 
                    ? 'Ihre wichtigsten Metriken' 
                    : 'Metriken werden nach ersten Kampagnen angezeigt'
                  }
                </CardDescription>
              </CardHeader>
              <CardContent>
                {dashboardData.activeCampaigns > 0 ? (
                  <div className="space-y-6">
                    <div>
                      <div className="flex justify-between text-sm mb-2">
                        <span>Impressions</span>
                        <span>89%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div className="bg-blue-500 h-2 rounded-full" style={{ width: '89%' }}></div>
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between text-sm mb-2">
                        <span>Klicks</span>
                        <span>76%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div className="bg-green-500 h-2 rounded-full" style={{ width: '76%' }}></div>
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between text-sm mb-2">
                        <span>Conversions</span>
                        <span>62%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div className="bg-purple-500 h-2 rounded-full" style={{ width: '62%' }}></div>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <div className="text-gray-400 mb-4">
                      <BarChart3 className="w-12 h-12 mx-auto" />
                    </div>
                    <p className="text-gray-500 mb-4">
                      Performance-Daten werden angezeigt, sobald Sie Kampagnen erstellt haben.
                    </p>
                    <div className="space-y-4">
                      <div className="flex justify-between text-sm">
                        <span>Impressions</span>
                        <span>0%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div className="bg-gray-300 h-2 rounded-full" style={{ width: '0%' }}></div>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>Klicks</span>
                        <span>0%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div className="bg-gray-300 h-2 rounded-full" style={{ width: '0%' }}></div>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>Conversions</span>
                        <span>0%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div className="bg-gray-300 h-2 rounded-full" style={{ width: '0%' }}></div>
                      </div>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    )
  }

  // Main render logic
  return (
    <div>
      <Navigation />
      
      {/* Message Display */}
      {message.text && (
        <div className={`fixed top-20 left-1/2 transform -translate-x-1/2 z-50 p-4 rounded-lg shadow-lg max-w-md w-full mx-4 ${
          message.type === 'success' 
            ? 'bg-green-500 text-white'
            : message.type === 'error'
            ? 'bg-red-500 text-white'
            : 'bg-blue-500 text-white'
        }`}>
          <p className="text-center font-medium">{message.text}</p>
        </div>
      )}
      

      
      {/* Campaign Wizard */}
      {showCampaignWizard && (
        <CampaignWizard 
          currentUser={currentUser}
          onClose={() => {
            setShowCampaignWizard(false)
            // Return to the view where wizard was opened from
            if (wizardOpenedFrom === 'campaignDashboard') {
              setShowCampaignDashboard(true)
            }
            // Reset the tracking state
            setWizardOpenedFrom(null)
          }} 
        />
      )}
      
      {/* Main Content Views */}
      {currentView === 'home' && !authView && (
        <>
          <HeroSection />
          <FeaturesSection />
          <PricingSection />
          <Footer onNavigate={setCurrentView} setAuthView={setAuthView} />
        </>
      )}
      
      {currentView === 'features' && !authView && (
        <>
          <FeaturesPage />
          <Footer onNavigate={setCurrentView} setAuthView={setAuthView} />
        </>
      )}
      
      {currentView === 'pricing' && !authView && (
        <>
          <PricingSection />
          <Footer onNavigate={setCurrentView} setAuthView={setAuthView} />
        </>
      )}
      
      {currentView === 'about' && !authView && (
        <>
          <AboutPage />
          <Footer onNavigate={setCurrentView} setAuthView={setAuthView} />
        </>
      )}
      
      {currentView === 'contact' && !authView && (
        <>
          <ContactPage />
          <Footer onNavigate={setCurrentView} setAuthView={setAuthView} />
        </>
      )}
      
      {currentView === 'faq' && !authView && (
        <>
          <FAQPage />
          <Footer onNavigate={setCurrentView} setAuthView={setAuthView} />
        </>
      )}
      
      {/* Legal Pages */}
      {currentView === 'impressum' && (
        <>
          <ImpressumPage />
          <Footer onNavigate={setCurrentView} setAuthView={setAuthView} />
        </>
      )}
      
      {currentView === 'terms' && (
        <>
          <TermsPage />
          <Footer onNavigate={setCurrentView} setAuthView={setAuthView} />
        </>
      )}
      
      {currentView === 'privacy' && (
        <>
          <PrivacyPage />
          <Footer onNavigate={setCurrentView} setAuthView={setAuthView} />
        </>
      )}
      
      {/* Authenticated Views */}
      {currentView === 'dashboard' && isAuthenticated && (
        <>
          <DashboardSection />
          <Footer onNavigate={setCurrentView} setAuthView={setAuthView} />
        </>
      )}
      
      {currentView === 'account' && isAuthenticated && (
        <>
          <AccountManagement 
            currentUser={currentUser} 
            onUpdateUser={setCurrentUser}
          />
          <Footer onNavigate={setCurrentView} setAuthView={setAuthView} />
        </>
      )}
      
      {currentView === 'admin' && isAuthenticated && (currentUser?.role === 'ADMIN' || currentUser?.role === 'SUPER_ADMIN') && (
        <>
          <AdminDashboard />
          <Footer onNavigate={setCurrentView} setAuthView={setAuthView} />
        </>
      )}
      
      {currentView === 'campaign-admin' && isAuthenticated && (currentUser?.role === 'ADMIN' || currentUser?.role === 'SUPER_ADMIN') && (
        <>
          <CampaignAdminDashboard />
          <Footer onNavigate={setCurrentView} setAuthView={setAuthView} />
        </>
      )}
    </div>
  )
}

export default App
