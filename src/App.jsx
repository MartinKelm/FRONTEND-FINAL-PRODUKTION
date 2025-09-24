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
import CompanyProfileModal from './components/Auth/CompanyProfileModal'
import PackageSelectionModal from './components/Auth/PackageSelectionModal'
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

// Import NEW PlanSelection component
import PlanSelection from './components/Plans/PlanSelection'

// Import campaign utilities
import { getCampaigns, getCampaignStats } from './utils/campaignStorage'
import { initializeDefaultUsers } from './utils/userStorage'

function App() {
  // Notfall-Fix: Zurücksetzen des Status, falls er Probleme verursacht
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.get('reset') === 'true') {
      localStorage.removeItem('currentUser');
      localStorage.removeItem('isAuthenticated');
      localStorage.removeItem('currentView');
      window.location.href = window.location.pathname;
    }
  }, []);

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

  // NEW: Plan selection state
  const [showPlanSelection, setShowPlanSelection] = useState(false)

  // Load session from localStorage on app start
  useEffect(() => {
    try {
      // Initialize default users
      initializeDefaultUsers()
      
      const savedUser = localStorage.getItem('currentUser')
      const savedView = localStorage.getItem('currentView')
      const savedAuth = localStorage.getItem('isAuthenticated')
      
      if (savedUser && savedAuth === 'true') {
        try {
          const userData = JSON.parse(savedUser)
          setCurrentUser(userData)
          setIsAuthenticated(true)
          
          // NEW: Check if user needs to select a plan
          if (userData.needsPlanSelection) {
            setShowPlanSelection(true)
          } else {
            setCurrentView(savedView || 'dashboard')
          }
          
          console.log('Session restored:', userData)
        } catch (error) {
          console.error('Error parsing saved user data:', error)
          // Clear corrupted data
          localStorage.removeItem('currentUser')
          localStorage.removeItem('currentView')
          localStorage.removeItem('isAuthenticated')
        }
      }
    } catch (error) {
      console.error('Error in initialization:', error)
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

  const handleLogin = (userData) => {
    try {
      setCurrentUser(userData)
      setIsAuthenticated(true)
      setAuthView(null) // Close login form
      
      // Save to localStorage
      localStorage.setItem('currentUser', JSON.stringify(userData))
      localStorage.setItem('isAuthenticated', 'true')
      
      // NEW: Check if user needs to select a plan
      if (userData.needsPlanSelection) {
        setShowPlanSelection(true)
      } else if (userData.role === 'ADMIN' || userData.role === 'SUPER_ADMIN') {
        setCurrentView('admin')
        localStorage.setItem('currentView', 'admin')
      } else {
        setCurrentView('dashboard')
        localStorage.setItem('currentView', 'dashboard')
      }
    } catch (error) {
      console.error('Error in handleLogin:', error)
    }
  }

  // NEW: Handle plan selection completion
  const handlePlanSelected = (updatedUser) => {
    try {
      setCurrentUser(updatedUser)
      localStorage.setItem('currentUser', JSON.stringify(updatedUser))
      setShowPlanSelection(false)
      
      if (updatedUser.role === 'ADMIN' || updatedUser.role === 'SUPER_ADMIN') {
        setCurrentView('admin')
        localStorage.setItem('currentView', 'admin')
      } else {
        setCurrentView('dashboard')
        localStorage.setItem('currentView', 'dashboard')
      }
    } catch (error) {
      console.error('Error in handlePlanSelected:', error)
    }
  }

  // NEW: Handle closing plan selection
  const handleClosePlanSelection = () => {
    try {
      setShowPlanSelection(false)
      setCurrentView('dashboard')
      localStorage.setItem('currentView', 'dashboard')
    } catch (error) {
      console.error('Error in handleClosePlanSelection:', error)
    }
  }

  const handleRegister = (userData) => {
    try {
      setCurrentUser(userData)
      setIsAuthenticated(true)
      setAuthView(null) // Close register form
      
      // NEW: Check if user needs to select a plan
      if (userData.needsPlanSelection) {
        setShowPlanSelection(true)
      } else {
        setCurrentView('dashboard')
      }
      
      // Save to localStorage
      localStorage.setItem('currentUser', JSON.stringify(userData))
      localStorage.setItem('isAuthenticated', 'true')
    } catch (error) {
      console.error('Error in handleRegister:', error)
    }
  }

  // Multi-step registration handlers
  const handleShowCompanyProfile = (userData) => {
    try {
      setRegistrationUserData(userData)
      setAuthView(null) // Close simple registration form
      setShowCompanyProfileModal(true)
    } catch (error) {
      console.error('Error in handleShowCompanyProfile:', error)
    }
  }

  const handleCompanyProfileComplete = (completeUserData) => {
    try {
      setRegistrationUserData(completeUserData)
      setShowCompanyProfileModal(false)
      
      // NEW: Skip package selection modal and go directly to PlanSelection component
      setCurrentUser(completeUserData)
      setIsAuthenticated(true)
      setShowPlanSelection(true)
      
      // Save to localStorage
      localStorage.setItem('currentUser', JSON.stringify(completeUserData))
      localStorage.setItem('isAuthenticated', 'true')
    } catch (error) {
      console.error('Error in handleCompanyProfileComplete:', error)
    }
  }

  const handleCompanyProfileSkip = () => {
    try {
      // NEW: Skip package selection modal and go directly to PlanSelection component
      const userData = {
        ...registrationUserData,
        needsPlanSelection: true
      }
      
      setCurrentUser(userData)
      setIsAuthenticated(true)
      setShowCompanyProfileModal(false)
      setShowPlanSelection(true)
      
      // Save to localStorage
      localStorage.setItem('currentUser', JSON.stringify(userData))
      localStorage.setItem('isAuthenticated', 'true')
    } catch (error) {
      console.error('Error in handleCompanyProfileSkip:', error)
    }
  }

  const handlePackageSelectionComplete = (finalUserData) => {
    try {
      setCurrentUser(finalUserData)
      setIsAuthenticated(true)
      setShowPackageSelectionModal(false)
      setRegistrationUserData(null)
      setCurrentView('dashboard')
    } catch (error) {
      console.error('Error in handlePackageSelectionComplete:', error)
    }
  }

  const handlePackageSelectionSkip = () => {
    try {
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
    } catch (error) {
      console.error('Error in handlePackageSelectionSkip:', error)
    }
  }

  const handleLogout = () => {
    try {
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
      
      // Reset campaign states
      setShowCampaignDashboard(false)
      setShowCampaignDetail(false)
      setSelectedCampaignId(null)
      
      // Reset plan selection state
      setShowPlanSelection(false)
    } catch (error) {
      console.error('Error in handleLogout:', error)
    }
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
    // Demo users can access campaign wizard directly
    if (currentUser?.isDemoAccount) {
      // Track where wizard was opened from
      setWizardOpenedFrom(showCampaignDashboard ? 'campaignDashboard' : 'mainDashboard')
      // Close campaign dashboard when opening wizard
      setShowCampaignDashboard(false)
      setShowCampaignWizard(true)
    } else {
      // Check if user has a valid plan
      if (!currentUser?.plan?.id || currentUser?.plan?.id === 'none') {
        // No plan selected - redirect to plan selection
        setShowPlanSelection(true)
        showMessage('info', 'Bitte wählen Sie zuerst einen Plan aus, um Kampagnen zu erstellen.')
      } else {
        // Plan exists - allow campaign creation
        // Track where wizard was opened from
        setWizardOpenedFrom(showCampaignDashboard ? 'campaignDashboard' : 'mainDashboard')
        // Close campaign dashboard when opening wizard
        setShowCampaignDashboard(false)
        setShowCampaignWizard(true)
      }
    }
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

          <div className="hidden lg:flex items-center space-x-4">
            {isAuthenticated ? (
              <UserMenu />
            ) : (
              <>
                <Button 
                  onClick={() => setAuthView('login')}
                  variant="outline"
                  size="sm"
                  className="text-sm"
                >
                  Login
                </Button>
                <Button 
                  onClick={() => setAuthView('register-simple')}
                  className="brand-gradient text-white hover:opacity-90 text-sm"
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

        {/* Mobile menu - keep as is */}
      </div>
    </nav>
  )

  try {
    // NEW: Show plan selection if needed
    if (isAuthenticated && currentUser && showPlanSelection) {
      return (
        <div className="plan-selection-wrapper">
          <PlanSelection 
            user={currentUser} 
            onPlanSelected={handlePlanSelected} 
            onClose={handleClosePlanSelection} 
          />
        </div>
      );
    }

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
                onShowCompanyProfile={handleShowCompanyProfile}
                onSwitchToLogin={() => setAuthView('login')}
              />
              <Footer onNavigate={setCurrentView} setAuthView={setAuthView} />
            </>
          )}
          
          {/* Multi-step Registration Modals */}
          <CompanyProfileModal 
            userData={registrationUserData}
            onComplete={handleCompanyProfileComplete}
            onSkip={handleCompanyProfileSkip}
            isOpen={showCompanyProfileModal}
          />
          
          <PackageSelectionModal 
            userData={registrationUserData}
            onComplete={handlePackageSelectionComplete}
            onSkip={handlePackageSelectionSkip}
            isOpen={showPackageSelectionModal}
          />
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

    // Campaign Admin Dashboard
    if (isAuthenticated && (currentUser?.role === 'ADMIN' || currentUser?.role === 'SUPER_ADMIN') && currentView === 'campaign-admin') {
      return (
        <div>
          <Navigation />
          <CampaignAdminDashboard user={currentUser} />
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
          <CampaignWizard 
            onClose={() => setShowCampaignWizard(false)} 
            currentUser={currentUser}
          />
        </div>
      )
    }

    // Account Management View
    if (isAuthenticated && currentView === 'account') {
      return (
        <div>
          <Navigation />
          <section className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 py-8 px-4 sm:px-6">
            <div className="max-w-7xl mx-auto">
              <AccountManagement 
                user={currentUser}
                onUpdateUser={(updatedUser) => {
                  setCurrentUser(updatedUser)
                  localStorage.setItem('currentUser', JSON.stringify(updatedUser))
                }}
              />
            </div>
          </section>
          <Footer onNavigate={setCurrentView} setAuthView={setAuthView} />
        </div>
      )
    }

    // Fallback render for the case that no other condition matches
    return (
      <div>
        <Navigation />
        <div className="max-w-7xl mx-auto px-4 py-12">
          <h1 className="text-2xl font-bold mb-4">Willkommen bei socialmediakampagnen.com</h1>
          <p className="mb-4">Es scheint ein Problem mit der Anzeige zu geben.</p>
          <Button 
            onClick={() => window.location.href = '/?reset=true'} 
            className="bg-blue-500 hover:bg-blue-600 text-white"
          >
            Zurücksetzen und neu laden
          </Button>
        </div>
        <Footer onNavigate={setCurrentView} setAuthView={setAuthView} />
      </div>
    );
  } catch (error) {
    console.error("Critical rendering error:", error);
    return (
      <div className="p-8">
        <h1 className="text-xl font-bold">Es ist ein Fehler aufgetreten</h1>
        <p>Bitte laden Sie die Seite neu oder kontaktieren Sie den Support.</p>
        <p className="text-red-500 text-sm mt-2">Fehler: {error.message}</p>
        <button 
          onClick={() => window.location.href = '/?reset=true'} 
          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded"
        >
          Zurücksetzen und neu laden
        </button>
      </div>
    );
  }
}

export default App
