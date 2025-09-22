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
  Shield
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

  // Restore session on page load
  useEffect(() => {
    const savedUser = localStorage.getItem('currentUser')
    const savedView = localStorage.getItem('currentView')
    const savedAuth = localStorage.getItem('isAuthenticated')
    
    if (savedUser && savedAuth === 'true') {
      try {
        const userData = JSON.parse(savedUser)
        setCurrentUser(userData)
        setIsAuthenticated(true)
        
        // Restore the view user was on
        if (savedView && savedView !== 'home') {
          setCurrentView(savedView)
        } else {
          // Default to dashboard for authenticated users
          if (userData.role === 'ADMIN' || userData.role === 'SUPER_ADMIN') {
            setCurrentView('admin')
          } else {
            setCurrentView('dashboard')
          }
        }
      } catch (error) {
        console.error('Error restoring session:', error)
        // Clear corrupted session data
        localStorage.removeItem('currentUser')
        localStorage.removeItem('currentView')
        localStorage.removeItem('isAuthenticated')
      }
    }
  }, [])

  // Central navigation function that saves to localStorage
  const navigateToView = (view) => {
    setCurrentView(view)
    if (isAuthenticated) {
      localStorage.setItem('currentView', view)
    }
  }
  
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

  const handleLogin = (userData) => {
    setCurrentUser(userData)
    setIsAuthenticated(true)
    setAuthView(null) // Close login form
    
    // Save session to localStorage
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
    setCurrentUser(userData)
    setIsAuthenticated(true)
    setAuthView(null) // Close register form
    setCurrentView('dashboard')
    
    // Save session to localStorage
    localStorage.setItem('currentUser', JSON.stringify(userData))
    localStorage.setItem('isAuthenticated', 'true')
    localStorage.setItem('currentView', 'dashboard')
  }

  // Multi-step registration handlers
  const handleShowCompanyProfile = (userData) => {
    setRegistrationUserData(userData)
    setAuthView(null) // Close simple registration form
    setShowCompanyProfileModal(true)
  }

  const handleCompanyProfileComplete = (completeUserData) => {
    setRegistrationUserData(completeUserData)
    setShowCompanyProfileModal(false)
    setShowPackageSelectionModal(true)
  }

  const handleCompanyProfileSkip = () => {
    setShowCompanyProfileModal(false)
    setShowPackageSelectionModal(true)
  }

  const handlePackageSelectionComplete = (finalUserData) => {
    setCurrentUser(finalUserData)
    setIsAuthenticated(true)
    setShowPackageSelectionModal(false)
    setRegistrationUserData(null)
    setCurrentView('dashboard')
    
    // Save session to localStorage
    localStorage.setItem('currentUser', JSON.stringify(finalUserData))
    localStorage.setItem('isAuthenticated', 'true')
    localStorage.setItem('currentView', 'dashboard')
  }

  const handlePackageSelectionSkip = () => {
    // Complete registration without package selection
    const userData = {
      ...registrationUserData,
      plan: null,
      registrationStep: 'completed'
    }
    setCurrentUser(userData)
    setIsAuthenticated(true)
    setShowPackageSelectionModal(false)
    setRegistrationUserData(null)
    setCurrentView('dashboard')
    
    // Save session to localStorage
    localStorage.setItem('currentUser', JSON.stringify(userData))
    localStorage.setItem('isAuthenticated', 'true')
    localStorage.setItem('currentView', 'dashboard')
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
    
    // Reset registration states
    setShowCompanyProfileModal(false)
    setShowPackageSelectionModal(false)
    setRegistrationUserData(null)
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
                      onClick={() => navigateToView('dashboard')}
                      className={`text-gray-700 hover:text-purple-600 transition-colors text-sm font-medium ${currentView === 'dashboard' ? 'text-purple-600' : ''}`}
                    >
                      Dashboard
                    </button>
                    <button 
                      onClick={() => navigateToView('features')}
                      className={`text-gray-700 hover:text-purple-600 transition-colors text-sm font-medium ${currentView === 'features' ? 'text-purple-600' : ''}`}
                    >
                      Features
                    </button>
                    <button 
                      onClick={() => navigateToView('pricing')}
                      className={`text-gray-700 hover:text-purple-600 transition-colors text-sm font-medium ${currentView === 'pricing' ? 'text-purple-600' : ''}`}
                    >
                      Preise
                    </button>
                    <Button 
                      onClick={() => navigateToView('account')}
                      variant={currentView === 'account' ? 'default' : 'outline'}
                      size="sm"
                      className="text-sm"
                    >
                      Mein Account
                    </Button>
                  </>
                )}
                {(currentUser?.role === 'ADMIN' || currentUser?.role === 'SUPER_ADMIN') && (
                  <button 
                    onClick={() => navigateToView('admin')}
                    className={`text-gray-700 hover:text-red-600 transition-colors text-sm font-medium ${currentView === 'admin' ? 'text-red-600' : ''}`}
                  >
                    Admin Dashboard
                  </button>
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
          <div className="lg:hidden absolute top-full left-0 right-0 mt-1 pb-4 pt-4 bg-white shadow-lg border-t z-50">
            <div className="px-4 space-y-3">
              {isAuthenticated ? (
                <>
                  {currentUser?.role !== 'admin' && (
                    <>
                      <button 
                        onClick={() => {
                          navigateToView('dashboard')
                          setIsMobileMenuOpen(false)
                        }}
                        className={`block w-full text-left py-2 px-3 rounded-lg text-sm font-medium transition-colors ${
                          currentView === 'dashboard' ? 'bg-purple-100 text-purple-600' : 'text-gray-700 hover:bg-gray-100'
                        }`}
                      >
                        Dashboard
                      </button>
                      <button 
                        onClick={() => {
                          navigateToView('features')
                          setIsMobileMenuOpen(false)
                        }}
                        className={`block w-full text-left py-2 px-3 rounded-lg text-sm font-medium transition-colors ${
                          currentView === 'features' ? 'bg-purple-100 text-purple-600' : 'text-gray-700 hover:bg-gray-100'
                        }`}
                      >
                        Features
                      </button>
                      <button 
                        onClick={() => {
                          navigateToView('pricing')
                          setIsMobileMenuOpen(false)
                        }}
                        className={`block w-full text-left py-2 px-3 rounded-lg text-sm font-medium transition-colors ${
                          currentView === 'pricing' ? 'bg-purple-100 text-purple-600' : 'text-gray-700 hover:bg-gray-100'
                        }`}
                      >
                        Preise
                      </button>
                      <button 
                        onClick={() => {
                          navigateToView('account')
                          setIsMobileMenuOpen(false)
                        }}
                        className={`block w-full text-left py-2 px-3 rounded-lg text-sm font-medium transition-colors ${
                          currentView === 'account' ? 'bg-purple-100 text-purple-600' : 'text-gray-700 hover:bg-gray-100'
                        }`}
                      >
                        Mein Account
                      </button>
                    </>
                  )}
                  {(currentUser?.role === 'ADMIN' || currentUser?.role === 'SUPER_ADMIN') && (
                    <button 
                      onClick={() => {
                        navigateToView('admin')
                        setIsMobileMenuOpen(false)
                      }}
                      className={`block w-full text-left py-2 px-3 rounded-lg text-sm font-medium transition-colors ${
                        currentView === 'admin' ? 'bg-red-100 text-red-600' : 'text-gray-700 hover:bg-gray-100'
                      }`}
                    >
                      Admin Dashboard
                    </button>
                  )}
                  <div className="border-t pt-3 mt-3">
                    <div className="flex items-center space-x-3 px-3 py-2">
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
                        <div className="font-medium text-gray-900">
                          {currentUser?.name}
                          {currentUser?.isDemoAccount && <span className="text-green-600 ml-1">(Demo)</span>}
                        </div>
                        <div className="text-gray-500 text-xs">
                          {(currentUser?.role === 'ADMIN' || currentUser?.role === 'SUPER_ADMIN') 
                            ? 'Administrator' 
                            : currentUser?.isDemoAccount 
                            ? 'Demo-Benutzer' 
                            : 'Benutzer'}
                        </div>
                      </div>
                    </div>
                    <Button
                      onClick={() => {
                        handleLogout()
                        setIsMobileMenuOpen(false)
                      }}
                      className="w-full mt-2 bg-red-500 hover:bg-red-600 text-white"
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
                    className={`block w-full text-left py-2 px-3 rounded-lg text-sm font-medium transition-colors ${
                      currentView === 'home' ? 'bg-purple-100 text-purple-600' : 'text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    Home
                  </button>
                  <button 
                    onClick={() => {
                      setCurrentView('features')
                      setAuthView(null)
                      setIsMobileMenuOpen(false)
                    }}
                    className={`block w-full text-left py-2 px-3 rounded-lg text-sm font-medium transition-colors ${
                      currentView === 'features' ? 'bg-purple-100 text-purple-600' : 'text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    Features
                  </button>
                  <button 
                    onClick={() => {
                      setCurrentView('pricing')
                      setAuthView(null)
                      setIsMobileMenuOpen(false)
                    }}
                    className={`block w-full text-left py-2 px-3 rounded-lg text-sm font-medium transition-colors ${
                      currentView === 'pricing' ? 'bg-purple-100 text-purple-600' : 'text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    Preise
                  </button>
                  <button 
                    onClick={() => {
                      setCurrentView('about')
                      setAuthView(null)
                      setIsMobileMenuOpen(false)
                    }}
                    className={`block w-full text-left py-2 px-3 rounded-lg text-sm font-medium transition-colors ${
                      currentView === 'about' ? 'bg-purple-100 text-purple-600' : 'text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    Über uns
                  </button>
                  <button 
                    onClick={() => {
                      setCurrentView('contact')
                      setAuthView(null)
                      setIsMobileMenuOpen(false)
                    }}
                    className={`block w-full text-left py-2 px-3 rounded-lg text-sm font-medium transition-colors ${
                      currentView === 'contact' ? 'bg-purple-100 text-purple-600' : 'text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    Kontakt
                  </button>
                  <button 
                    onClick={() => {
                      setCurrentView('faq')
                      setAuthView(null)
                      setIsMobileMenuOpen(false)
                    }}
                    className={`block w-full text-left py-2 px-3 rounded-lg text-sm font-medium transition-colors ${
                      currentView === 'faq' ? 'bg-purple-100 text-purple-600' : 'text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    FAQ
                  </button>
                  <div className="border-t pt-3 mt-3 space-y-2">
                    <Button 
                      onClick={() => {
                        setAuthView('login')
                        setIsMobileMenuOpen(false)
                      }}
                      className="w-full bg-gradient-to-r from-green-600 to-emerald-600 text-white hover:from-green-700 hover:to-emerald-700"
                    >
                      Login
                    </Button>
                    <Button 
                      onClick={() => {
                        setAuthView('register-simple')
                        setIsMobileMenuOpen(false)
                      }}
                      className="w-full brand-gradient text-white hover:opacity-90"
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

  // Render different views based on current state
  const renderContent = () => {
    // Show auth forms if authView is set
    if (authView === 'login') {
      return <LoginForm onLogin={handleLogin} onClose={() => setAuthView(null)} />
    }
    
    if (authView === 'register') {
      return <RegisterForm onRegister={handleRegister} onClose={() => setAuthView(null)} />
    }
    
    if (authView === 'register-simple') {
      return (
        <RegisterFormSimple 
          onRegister={handleRegister}
          onShowCompanyProfile={handleShowCompanyProfile}
          onClose={() => setAuthView(null)} 
        />
      )
    }

    // Show modals
    if (showCompanyProfileModal) {
      return (
        <CompanyProfileModal
          userData={registrationUserData}
          onComplete={handleCompanyProfileComplete}
          onSkip={handleCompanyProfileSkip}
          onClose={() => setShowCompanyProfileModal(false)}
        />
      )
    }

    if (showPackageSelectionModal) {
      return (
        <PackageSelectionModal
          userData={registrationUserData}
          onComplete={handlePackageSelectionComplete}
          onSkip={handlePackageSelectionSkip}
          onClose={() => setShowPackageSelectionModal(false)}
        />
      )
    }

    // Show main content based on currentView
    switch (currentView) {
      case 'dashboard':
        return <Dashboard />
      case 'admin':
        return <AdminDashboard currentUser={currentUser} />
      case 'account':
        return <AccountManagement currentUser={currentUser} onUserUpdate={setCurrentUser} />
      case 'features':
        return <FeaturesPage />
      case 'pricing':
        return <PricingPage />
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
        return <HomePage />
    }
  }

  // Dashboard Component
  const Dashboard = () => {
    const dashboardData = getDashboardData(currentUser)
    
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Welcome Section */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Willkommen zurück, {currentUser?.name}!
            </h1>
            <p className="text-gray-600">
              Hier ist eine Übersicht Ihrer aktuellen Kampagnen und Performance.
            </p>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center">
                  <div className="p-2 bg-blue-100 rounded-lg">
                    <Target className="w-6 h-6 text-blue-600" />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">Aktive Kampagnen</p>
                    <p className="text-2xl font-bold text-gray-900">{dashboardData.activeCampaigns}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center">
                  <div className="p-2 bg-green-100 rounded-lg">
                    <Users className="w-6 h-6 text-green-600" />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">Gesamtreichweite</p>
                    <p className="text-2xl font-bold text-gray-900">{dashboardData.totalReach}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center">
                  <div className="p-2 bg-purple-100 rounded-lg">
                    <TrendingUp className="w-6 h-6 text-purple-600" />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">Klickrate</p>
                    <p className="text-2xl font-bold text-gray-900">{dashboardData.clickRate}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center">
                  <div className="p-2 bg-orange-100 rounded-lg">
                    <BarChart3 className="w-6 h-6 text-orange-600" />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">Budget verwendet</p>
                    <p className="text-2xl font-bold text-gray-900">{dashboardData.budgetUsed}</p>
                    <p className="text-xs text-gray-500">von {dashboardData.budgetTotal}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Action Buttons */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <Card className="cursor-pointer hover:shadow-lg transition-shadow" onClick={() => setShowCampaignWizard(true)}>
              <CardContent className="p-6 text-center">
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Target className="w-6 h-6 text-purple-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Neue Kampagne</h3>
                <p className="text-gray-600 text-sm">Erstellen Sie eine neue Social Media Kampagne</p>
              </CardContent>
            </Card>

            <Card className="cursor-pointer hover:shadow-lg transition-shadow">
              <CardContent className="p-6 text-center">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <BarChart3 className="w-6 h-6 text-blue-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Analytics</h3>
                <p className="text-gray-600 text-sm">Analysieren Sie Ihre Kampagnen-Performance</p>
              </CardContent>
            </Card>

            <Card className="cursor-pointer hover:shadow-lg transition-shadow">
              <CardContent className="p-6 text-center">
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Zap className="w-6 h-6 text-green-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Optimierung</h3>
                <p className="text-gray-600 text-sm">Verbessern Sie bestehende Kampagnen</p>
              </CardContent>
            </Card>
          </div>

          {/* Recent Campaigns */}
          <Card>
            <CardHeader>
              <CardTitle>Aktuelle Kampagnen</CardTitle>
              <CardDescription>Übersicht Ihrer letzten Kampagnen-Aktivitäten</CardDescription>
            </CardHeader>
            <CardContent>
              {dashboardData.campaigns.length > 0 ? (
                <div className="space-y-4">
                  {dashboardData.campaigns.map((campaign, index) => (
                    <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center space-x-4">
                        <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
                          {campaign.platform === 'Facebook' && <Facebook className="w-5 h-5 text-blue-600" />}
                          {campaign.platform === 'Instagram' && <Instagram className="w-5 h-5 text-pink-600" />}
                          {campaign.platform === 'Google' && <div className="w-5 h-5 bg-red-500 rounded-full" />}
                          {campaign.platform === 'TikTok' && <Play className="w-5 h-5 text-black" />}
                        </div>
                        <div>
                          <h4 className="font-medium text-gray-900">{campaign.name}</h4>
                          <p className="text-sm text-gray-600">{campaign.platform}</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-4">
                        <Badge variant={campaign.status === 'Aktiv' ? 'default' : 'secondary'}>
                          {campaign.status}
                        </Badge>
                        <Badge variant={
                          campaign.performance === 'Exzellent' ? 'default' : 
                          campaign.performance === 'Gut' ? 'secondary' : 'outline'
                        }>
                          {campaign.performance}
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
                  <Target className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">Noch keine Kampagnen</h3>
                  <p className="text-gray-600 mb-4">Erstellen Sie Ihre erste Kampagne, um loszulegen.</p>
                  <Button onClick={() => setShowCampaignWizard(true)} className="brand-gradient text-white">
                    Erste Kampagne erstellen
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  // Homepage Component
  const HomePage = () => (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-pink-50">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-32">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="space-y-4">
                <Badge className="bg-purple-100 text-purple-700 hover:bg-purple-200">
                  🚀 Neu: KI-gestützte Kampagnen-Optimierung
                </Badge>
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
                  Social Media Marketing{' '}
                  <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                    einfach gemacht
                  </span>
                </h1>
                <p className="text-xl text-gray-600 leading-relaxed">
                  Erstellen, verwalten und optimieren Sie Ihre Social Media Kampagnen 
                  auf allen wichtigen Plattformen - alles aus einer Hand.
                </p>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <Button 
                  size="lg" 
                  className="brand-gradient text-white hover:opacity-90 text-lg px-8 py-4"
                  onClick={() => setAuthView('register-simple')}
                >
                  Kostenlos starten
                </Button>
                <Button 
                  size="lg" 
                  variant="outline" 
                  className="text-lg px-8 py-4 border-2"
                  onClick={() => setCurrentView('features')}
                >
                  <Play className="w-5 h-5 mr-2" />
                  Demo ansehen
                </Button>
              </div>

              <div className="flex items-center space-x-8 text-sm text-gray-600">
                <div className="flex items-center space-x-2">
                  <CheckCircle className="w-5 h-5 text-green-500" />
                  <span>Keine Kreditkarte erforderlich</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle className="w-5 h-5 text-green-500" />
                  <span>14 Tage kostenlos testen</span>
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="relative z-10">
                <img 
                  src={heroDashboard} 
                  alt="Dashboard Preview" 
                  className="rounded-2xl shadow-2xl"
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-r from-purple-400 to-pink-400 rounded-2xl blur-3xl opacity-20 transform scale-105"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Preview */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              Alles was Sie für erfolgreiches Social Media Marketing brauchen
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Von der Kampagnen-Erstellung bis zur Performance-Analyse - 
              unsere Plattform bietet alle Tools für Ihren Erfolg.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="text-center p-8 hover:shadow-lg transition-shadow">
              <div className="w-16 h-16 bg-purple-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <Target className="w-8 h-8 text-purple-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Kampagnen-Wizard</h3>
              <p className="text-gray-600">
                Erstellen Sie professionelle Kampagnen in wenigen Minuten mit unserem 
                intuitiven Schritt-für-Schritt Wizard.
              </p>
            </Card>

            <Card className="text-center p-8 hover:shadow-lg transition-shadow">
              <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <BarChart3 className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Echtzeit Analytics</h3>
              <p className="text-gray-600">
                Verfolgen Sie die Performance Ihrer Kampagnen in Echtzeit und 
                optimieren Sie basierend auf Daten.
              </p>
            </Card>

            <Card className="text-center p-8 hover:shadow-lg transition-shadow">
              <div className="w-16 h-16 bg-green-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <Zap className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">KI-Optimierung</h3>
              <p className="text-gray-600">
                Nutzen Sie künstliche Intelligenz für automatische Optimierung 
                und bessere Kampagnen-Performance.
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* Social Proof */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Vertrauen von über 10.000+ Unternehmen
            </h2>
            <p className="text-gray-600">
              Von Startups bis zu Fortune 500 Unternehmen - alle vertrauen auf unsere Plattform
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 items-center opacity-60">
            <div className="flex items-center justify-center">
              <Facebook className="w-12 h-12 text-blue-600" />
            </div>
            <div className="flex items-center justify-center">
              <Instagram className="w-12 h-12 text-pink-600" />
            </div>
            <div className="flex items-center justify-center">
              <Linkedin className="w-12 h-12 text-blue-700" />
            </div>
            <div className="flex items-center justify-center">
              <Youtube className="w-12 h-12 text-red-600" />
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-purple-600 to-pink-600">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6">
            Bereit für erfolgreiches Social Media Marketing?
          </h2>
          <p className="text-xl text-purple-100 mb-8">
            Starten Sie noch heute und erleben Sie, wie einfach professionelles 
            Social Media Marketing sein kann.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg" 
              className="bg-white text-purple-600 hover:bg-gray-100 text-lg px-8 py-4"
              onClick={() => setAuthView('register-simple')}
            >
              Jetzt kostenlos starten
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              className="border-white text-white hover:bg-white hover:text-purple-600 text-lg px-8 py-4"
              onClick={() => setCurrentView('contact')}
            >
              Kontakt aufnehmen
            </Button>
          </div>
        </div>
      </section>
    </div>
  )

  // Pricing Page Component
  const PricingPage = () => (
    <div className="min-h-screen bg-gray-50 py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Einfache, transparente Preise
          </h1>
          <p className="text-xl text-gray-600">
            Wählen Sie den Plan, der am besten zu Ihrem Unternehmen passt
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Starter Plan */}
          <Card className="relative">
            <CardHeader className="text-center pb-8">
              <CardTitle className="text-2xl">Starter</CardTitle>
              <div className="mt-4">
                <span className="text-4xl font-bold">€29</span>
                <span className="text-gray-600">/Monat</span>
              </div>
              <CardDescription className="mt-4">
                Perfekt für kleine Unternehmen und Startups
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center space-x-3">
                <CheckCircle className="w-5 h-5 text-green-500" />
                <span>Bis zu 3 aktive Kampagnen</span>
              </div>
              <div className="flex items-center space-x-3">
                <CheckCircle className="w-5 h-5 text-green-500" />
                <span>5 Social Media Kanäle</span>
              </div>
              <div className="flex items-center space-x-3">
                <CheckCircle className="w-5 h-5 text-green-500" />
                <span>Basis Analytics</span>
              </div>
              <div className="flex items-center space-x-3">
                <CheckCircle className="w-5 h-5 text-green-500" />
                <span>Email Support</span>
              </div>
              <Button className="w-full mt-8" variant="outline">
                Plan wählen
              </Button>
            </CardContent>
          </Card>

          {/* Professional Plan */}
          <Card className="relative border-purple-500 border-2">
            <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
              <Badge className="bg-purple-500 text-white px-4 py-1">Beliebt</Badge>
            </div>
            <CardHeader className="text-center pb-8">
              <CardTitle className="text-2xl">Professional</CardTitle>
              <div className="mt-4">
                <span className="text-4xl font-bold">€79</span>
                <span className="text-gray-600">/Monat</span>
              </div>
              <CardDescription className="mt-4">
                Ideal für wachsende Unternehmen
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center space-x-3">
                <CheckCircle className="w-5 h-5 text-green-500" />
                <span>Bis zu 10 aktive Kampagnen</span>
              </div>
              <div className="flex items-center space-x-3">
                <CheckCircle className="w-5 h-5 text-green-500" />
                <span>Alle Social Media Kanäle</span>
              </div>
              <div className="flex items-center space-x-3">
                <CheckCircle className="w-5 h-5 text-green-500" />
                <span>Erweiterte Analytics</span>
              </div>
              <div className="flex items-center space-x-3">
                <CheckCircle className="w-5 h-5 text-green-500" />
                <span>KI-Optimierung</span>
              </div>
              <div className="flex items-center space-x-3">
                <CheckCircle className="w-5 h-5 text-green-500" />
                <span>Priority Support</span>
              </div>
              <Button className="w-full mt-8 brand-gradient text-white">
                Plan wählen
              </Button>
            </CardContent>
          </Card>

          {/* Enterprise Plan */}
          <Card className="relative">
            <CardHeader className="text-center pb-8">
              <CardTitle className="text-2xl">Enterprise</CardTitle>
              <div className="mt-4">
                <span className="text-4xl font-bold">€199</span>
                <span className="text-gray-600">/Monat</span>
              </div>
              <CardDescription className="mt-4">
                Für große Unternehmen und Agenturen
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center space-x-3">
                <CheckCircle className="w-5 h-5 text-green-500" />
                <span>Unbegrenzte Kampagnen</span>
              </div>
              <div className="flex items-center space-x-3">
                <CheckCircle className="w-5 h-5 text-green-500" />
                <span>Alle Features</span>
              </div>
              <div className="flex items-center space-x-3">
                <CheckCircle className="w-5 h-5 text-green-500" />
                <span>White-Label Lösung</span>
              </div>
              <div className="flex items-center space-x-3">
                <CheckCircle className="w-5 h-5 text-green-500" />
                <span>Dedicated Account Manager</span>
              </div>
              <div className="flex items-center space-x-3">
                <CheckCircle className="w-5 h-5 text-green-500" />
                <span>24/7 Phone Support</span>
              </div>
              <Button className="w-full mt-8" variant="outline">
                Kontakt aufnehmen
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )

  return (
    <div className="min-h-screen bg-white">
      {/* Message Display */}
      {message.text && (
        <div className={`fixed top-4 right-4 z-50 p-4 rounded-lg shadow-lg ${
          message.type === 'success' ? 'bg-green-500 text-white' : 'bg-red-500 text-white'
        }`}>
          {message.text}
        </div>
      )}

      <Navigation />
      
      <main>
        {renderContent()}
      </main>

      <Footer onNavigate={(page) => setCurrentView(page)} />

      {/* Campaign Wizard Modal */}
      {showCampaignWizard && (
        <CampaignWizard onClose={() => setShowCampaignWizard(false)} />
      )}
    </div>
  )
}

export default App
