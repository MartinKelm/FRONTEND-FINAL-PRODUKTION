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
// NEW: Import PlanSelection component
import PlanSelection from './components/Plans/PlanSelection'

// Import campaign utilities
import { getCampaigns, getCampaignStats } from './utils/campaignStorage'
// NEW: Import userStorage utilities
import { initializeDefaultUsers } from './utils/userStorage'

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
  // NEW: Add state for plan selection
  const [showPlanSelection, setShowPlanSelection] = useState(false)

  // Load session from localStorage on app start
  useEffect(() => {
    // NEW: Initialize default users
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

  // UPDATED: handleLogin function
  const handleLogin = (userData) => {
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
  }

  // NEW: Handler for plan selection
  const handlePlanSelected = (updatedUser) => {
    setCurrentUser(updatedUser)
    setShowPlanSelection(false)
    
    if (updatedUser.role === 'ADMIN' || updatedUser.role === 'SUPER_ADMIN') {
      setCurrentView('admin')
      localStorage.setItem('currentView', 'admin')
    } else {
      setCurrentView('dashboard')
      localStorage.setItem('currentView', 'dashboard')
    }
  }

  // NEW: Handler for closing plan selection
  const handleClosePlanSelection = () => {
    setShowPlanSelection(false)
    setCurrentView('dashboard')
    localStorage.setItem('currentView', 'dashboard')
  }

  const handleRegister = (userData) => {
    setCurrentUser(userData)
    setIsAuthenticated(true)
    setAuthView(null) // Close register form
    
    // Check if user needs to select a plan
    if (userData.needsPlanSelection) {
      setShowPlanSelection(true)
    } else {
      setCurrentView('dashboard')
    }
    
    // Save to localStorage
    localStorage.setItem('currentUser', JSON.stringify(userData))
    localStorage.setItem('isAuthenticated', 'true')
  }

  // Multi-step registration handlers
  const handleShowCompanyProfile = (userData) => {
    setRegistrationUserData(userData)
    setAuthView(null) // Close simple registration form
    setShowCompanyProfileModal(true)
  }

  // UPDATED: handleCompanyProfileComplete function
  const handleCompanyProfileComplete = (completeUserData) => {
    // NEW: Add needsPlanSelection flag
    const userData = {
      ...completeUserData,
      needsPlanSelection: true
    }
    
    setCurrentUser(userData)
    setIsAuthenticated(true)
    setShowCompanyProfileModal(false)
    setShowPlanSelection(true) // NEW: Show plan selection instead of package selection
    
    // Save to localStorage
    localStorage.setItem('currentUser', JSON.stringify(userData))
    localStorage.setItem('isAuthenticated', 'true')
  }

  // UPDATED: handleCompanyProfileSkip function
  const handleCompanyProfileSkip = () => {
    // NEW: Add needsPlanSelection flag
    const userData = {
      ...registrationUserData,
      needsPlanSelection: true
    }
    
    setCurrentUser(userData)
    setIsAuthenticated(true)
    setShowCompanyProfileModal(false)
    setShowPlanSelection(true) // NEW: Show plan selection instead of package selection
    
    // Save to localStorage
    localStorage.setItem('currentUser', JSON.stringify(userData))
    localStorage.setItem('isAuthenticated', 'true')
  }

  const handlePackageSelectionComplete = (finalUserData) => {
    setCurrentUser(finalUserData)
    setIsAuthenticated(true)
    setShowPackageSelectionModal(false)
    setRegistrationUserData(null)
    setCurrentView('dashboard')
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
  }

  // UPDATED: handleLogout function
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
    
    // Reset campaign states
    setShowCampaignDashboard(false)
    setShowCampaignDetail(false)
    setSelectedCampaignId(null)
    
    // NEW: Reset plan selection state
    setShowPlanSelection(false)
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

  // UPDATED: handleCreateCampaign function
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

        {/* Mobile menu */}
        {isMobileMenuOpen && (
          <div className="lg:hidden mt-4 pb-4 border-t border-gray-200 pt-4">
            {isAuthenticated ? (
              <>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-2">
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
                    <div>
                      <div className="font-medium">
                        {currentUser?.name}
                        {currentUser?.isDemoAccount && <span className="text-green-500 ml-1">(Demo)</span>}
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
                    onClick={handleLogout}
                    size="sm"
                    className="bg-red-500 hover:bg-red-600 text-white"
                  >
                    <LogOut className="w-4 h-4 mr-1" />
                    Abmelden
                  </Button>
                </div>
                
                <div className="space-y-2">
                  {currentUser?.role !== 'admin' && (
                    <>
                      <button 
                        onClick={() => {
                          setCurrentView('dashboard')
                          setIsMobileMenuOpen(false)
                        }}
                        className={`block w-full text-left px-3 py-2 rounded-md ${
                          currentView === 'dashboard' 
                            ? 'bg-purple-100 text-purple-700' 
                            : 'text-gray-700 hover:bg-gray-100'
                        }`}
                      >
                        Dashboard
                      </button>
                      <button 
                        onClick={() => {
                          setCurrentView('features')
                          setIsMobileMenuOpen(false)
                        }}
                        className={`block w-full text-left px-3 py-2 rounded-md ${
                          currentView === 'features' 
                            ? 'bg-purple-100 text-purple-700' 
                            : 'text-gray-700 hover:bg-gray-100'
                        }`}
                      >
                        Features
                      </button>
                      <button 
                        onClick={() => {
                          setCurrentView('pricing')
                          setIsMobileMenuOpen(false)
                        }}
                        className={`block w-full text-left px-3 py-2 rounded-md ${
                          currentView === 'pricing' 
                            ? 'bg-purple-100 text-purple-700' 
                            : 'text-gray-700 hover:bg-gray-100'
                        }`}
                      >
                        Preise
                      </button>
                      <button 
                        onClick={() => {
                          setCurrentView('account')
                          setIsMobileMenuOpen(false)
                        }}
                        className={`block w-full text-left px-3 py-2 rounded-md ${
                          currentView === 'account' 
                            ? 'bg-purple-100 text-purple-700' 
                            : 'text-gray-700 hover:bg-gray-100'
                        }`}
                      >
                        Mein Account
                      </button>
                    </>
                  )}
                  
                  {(currentUser?.role === 'ADMIN' || currentUser?.role === 'SUPER_ADMIN') && (
                    <>
                      <button 
                        onClick={() => {
                          setCurrentView('admin')
                          setIsMobileMenuOpen(false)
                        }}
                        className={`block w-full text-left px-3 py-2 rounded-md ${
                          currentView === 'admin' 
                            ? 'bg-red-100 text-red-700' 
                            : 'text-gray-700 hover:bg-gray-100'
                        }`}
                      >
                        Admin Dashboard
                      </button>
                      <button 
                        onClick={() => {
                          setCurrentView('campaign-admin')
                          setIsMobileMenuOpen(false)
                        }}
                        className={`block w-full text-left px-3 py-2 rounded-md ${
                          currentView === 'campaign-admin' 
                            ? 'bg-red-100 text-red-700' 
                            : 'text-gray-700 hover:bg-gray-100'
                        }`}
                      >
                        Kampagnen-Verwaltung
                      </button>
                    </>
                  )}
                </div>
              </>
            ) : (
              <div className="space-y-2">
                <button 
                  onClick={() => {
                    setCurrentView('home')
                    setAuthView(null)
                    setIsMobileMenuOpen(false)
                  }}
                  className={`block w-full text-left px-3 py-2 rounded-md ${
                    currentView === 'home' && !authView
                      ? 'bg-purple-100 text-purple-700' 
                      : 'text-gray-700 hover:bg-gray-100'
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
                  className={`block w-full text-left px-3 py-2 rounded-md ${
                    currentView === 'features' && !authView
                      ? 'bg-purple-100 text-purple-700' 
                      : 'text-gray-700 hover:bg-gray-100'
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
                  className={`block w-full text-left px-3 py-2 rounded-md ${
                    currentView === 'pricing' && !authView
                      ? 'bg-purple-100 text-purple-700' 
                      : 'text-gray-700 hover:bg-gray-100'
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
                  className={`block w-full text-left px-3 py-2 rounded-md ${
                    currentView === 'about' && !authView
                      ? 'bg-purple-100 text-purple-700' 
                      : 'text-gray-700 hover:bg-gray-100'
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
                  className={`block w-full text-left px-3 py-2 rounded-md ${
                    currentView === 'contact' && !authView
                      ? 'bg-purple-100 text-purple-700' 
                      : 'text-gray-700 hover:bg-gray-100'
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
                  className={`block w-full text-left px-3 py-2 rounded-md ${
                    currentView === 'faq' && !authView
                      ? 'bg-purple-100 text-purple-700' 
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  FAQ
                </button>
                
                <div className="pt-4 mt-4 border-t border-gray-200 flex flex-col space-y-2">
                  <Button 
                    onClick={() => {
                      setAuthView('login')
                      setIsMobileMenuOpen(false)
                    }}
                    variant="outline"
                    className="w-full justify-center"
                  >
                    Login
                  </Button>
                  <Button 
                    onClick={() => {
                      setAuthView('register-simple')
                      setIsMobileMenuOpen(false)
                    }}
                    className="brand-gradient text-white hover:opacity-90 w-full justify-center"
                  >
                    Registrieren
                  </Button>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </nav>
  )

  // NEW: Show plan selection if needed
  if (isAuthenticated && showPlanSelection) {
    return (
      <PlanSelection 
        user={currentUser} 
        onPlanSelected={handlePlanSelected} 
        onClose={handleClosePlanSelection} 
      />
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

  // Campaign Wizard
  if (showCampaignWizard) {
    return (
      <CampaignWizard 
        onClose={() => {
          setShowCampaignWizard(false)
          // Return to the view that opened the wizard
          if (wizardOpenedFrom === 'campaignDashboard') {
            setShowCampaignDashboard(true)
          }
          setWizardOpenedFrom(null)
        }}
        currentUser={currentUser}
      />
    )
  }

  // Campaign Detail View
  if (showCampaignDetail && selectedCampaignId) {
    return (
      <CampaignDetailView 
        campaignId={selectedCampaignId}
        onBack={handleCloseCampaignDetail}
        currentUser={currentUser}
      />
    )
  }

  // Campaign Dashboard
  if (showCampaignDashboard) {
    return (
      <CampaignDashboard 
        onBack={() => setShowCampaignDashboard(false)}
        onCreateCampaign={handleCreateCampaign}
        onViewCampaign={handleViewCampaign}
        currentUser={currentUser}
      />
    )
  }

  // Admin Dashboard
  if (isAuthenticated && (currentUser?.role === 'ADMIN' || currentUser?.role === 'SUPER_ADMIN') && currentView === 'admin') {
    return (
      <div>
        <Navigation />
        <AdminDashboard currentUser={currentUser} />
        <Footer onNavigate={setCurrentView} setAuthView={setAuthView} />
      </div>
    )
  }

  // Campaign Admin Dashboard
  if (isAuthenticated && (currentUser?.role === 'ADMIN' || currentUser?.role === 'SUPER_ADMIN') && currentView === 'campaign-admin') {
    return (
      <div>
        <Navigation />
        <CampaignAdminDashboard currentUser={currentUser} />
        <Footer onNavigate={setCurrentView} setAuthView={setAuthView} />
      </div>
    )
  }

  // Account Management
  if (isAuthenticated && currentView === 'account') {
    return (
      <div>
        <Navigation />
        <AccountManagement currentUser={currentUser} setCurrentUser={setCurrentUser} />
        <Footer onNavigate={setCurrentView} setAuthView={setAuthView} />
      </div>
    )
  }

  // About Page
  if (currentView === 'about') {
    return (
      <div>
        <Navigation />
        <AboutPage />
        <Footer onNavigate={setCurrentView} setAuthView={setAuthView} />
      </div>
    )
  }

  // Contact Page
  if (currentView === 'contact') {
    return (
      <div>
        <Navigation />
        <ContactPage />
        <Footer onNavigate={setCurrentView} setAuthView={setAuthView} />
      </div>
    )
  }

  // FAQ Page
  if (currentView === 'faq') {
    return (
      <div>
        <Navigation />
        <FAQPage />
        <Footer onNavigate={setCurrentView} setAuthView={setAuthView} />
      </div>
    )
  }

  // Features Page
  if (currentView === 'features') {
    return (
      <div>
        <Navigation />
        <FeaturesPage />
        <Footer onNavigate={setCurrentView} setAuthView={setAuthView} />
      </div>
    )
  }

  // Pricing Page
  if (currentView === 'pricing') {
    return (
      <div>
        <Navigation />
        <div className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h1 className="text-3xl font-bold text-gray-900 sm:text-4xl">Transparente Preise für Ihr Business</h1>
            <p className="mt-4 text-lg text-gray-600 max-w-3xl mx-auto">
              Wählen Sie das passende Paket für Ihre Anforderungen. Alle Preise sind monatlich und werden jährlich abgerechnet.
            </p>
          </div>
          
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
            {/* Starter Plan */}
            <div className="bg-white rounded-lg shadow-lg overflow-hidden border-t-4 border-green-500">
              <div className="px-6 py-8">
                <h3 className="text-2xl font-bold text-gray-900 text-center">Starter</h3>
                <div className="mt-4 flex justify-center">
                  <span className="text-5xl font-extrabold text-gray-900">€99</span>
                  <span className="ml-2 text-xl font-medium text-gray-500 self-end">/Monat</span>
                </div>
                <p className="mt-1 text-sm text-gray-500 text-center">Bei jährlicher Zahlung</p>
              </div>
              <div className="border-t border-gray-200 bg-gray-50 px-6 py-8">
                <ul className="space-y-4">
                  <li className="flex items-start">
                    <div className="flex-shrink-0">
                      <CheckCircle className="h-5 w-5 text-green-500" />
                    </div>
                    <p className="ml-3 text-sm text-gray-700">Bis zu 5 Kampagnen</p>
                  </li>
                  <li className="flex items-start">
                    <div className="flex-shrink-0">
                      <CheckCircle className="h-5 w-5 text-green-500" />
                    </div>
                    <p className="ml-3 text-sm text-gray-700">3 Plattformen</p>
                  </li>
                  <li className="flex items-start">
                    <div className="flex-shrink-0">
                      <CheckCircle className="h-5 w-5 text-green-500" />
                    </div>
                    <p className="ml-3 text-sm text-gray-700">Basis-Analytics</p>
                  </li>
                  <li className="flex items-start">
                    <div className="flex-shrink-0">
                      <CheckCircle className="h-5 w-5 text-green-500" />
                    </div>
                    <p className="ml-3 text-sm text-gray-700">E-Mail Support</p>
                  </li>
                </ul>
                <div className="mt-8">
                  <Button 
                    onClick={() => {
                      if (isAuthenticated) {
                        // Show plan selection
                        setShowPlanSelection(true)
                      } else {
                        // Redirect to registration
                        setAuthView('register-simple')
                      }
                    }}
                    className="w-full bg-green-600 hover:bg-green-700 text-white"
                  >
                    Starter wählen
                  </Button>
                </div>
              </div>
            </div>
            
            {/* Professional Plan */}
            <div className="bg-white rounded-lg shadow-lg overflow-hidden border-t-4 border-purple-500 transform scale-105 z-10">
              <div className="absolute top-0 right-0 bg-purple-500 text-white text-xs font-semibold px-3 py-1 rounded-bl-lg">
                BELIEBT
              </div>
              <div className="px-6 py-8">
                <h3 className="text-2xl font-bold text-gray-900 text-center">Professional</h3>
                <div className="mt-4 flex justify-center">
                  <span className="text-5xl font-extrabold text-gray-900">€199</span>
                  <span className="ml-2 text-xl font-medium text-gray-500 self-end">/Monat</span>
                </div>
                <p className="mt-1 text-sm text-gray-500 text-center">Bei jährlicher Zahlung</p>
              </div>
              <div className="border-t border-gray-200 bg-gray-50 px-6 py-8">
                <ul className="space-y-4">
                  <li className="flex items-start">
                    <div className="flex-shrink-0">
                      <CheckCircle className="h-5 w-5 text-purple-500" />
                    </div>
                    <p className="ml-3 text-sm text-gray-700">Unbegrenzte Kampagnen</p>
                  </li>
                  <li className="flex items-start">
                    <div className="flex-shrink-0">
                      <CheckCircle className="h-5 w-5 text-purple-500" />
                    </div>
                    <p className="ml-3 text-sm text-gray-700">Alle Plattformen</p>
                  </li>
                  <li className="flex items-start">
                    <div className="flex-shrink-0">
                      <CheckCircle className="h-5 w-5 text-purple-500" />
                    </div>
                    <p className="ml-3 text-sm text-gray-700">Erweiterte Analytics</p>
                  </li>
                  <li className="flex items-start">
                    <div className="flex-shrink-0">
                      <CheckCircle className="h-5 w-5 text-purple-500" />
                    </div>
                    <p className="ml-3 text-sm text-gray-700">KI-Textgenerierung</p>
                  </li>
                  <li className="flex items-start">
                    <div className="flex-shrink-0">
                      <CheckCircle className="h-5 w-5 text-purple-500" />
                    </div>
                    <p className="ml-3 text-sm text-gray-700">Priority Support</p>
                  </li>
                </ul>
                <div className="mt-8">
                  <Button 
                    onClick={() => {
                      if (isAuthenticated) {
                        // Show plan selection
                        setShowPlanSelection(true)
                      } else {
                        // Redirect to registration
                        setAuthView('register-simple')
                      }
                    }}
                    className="w-full bg-purple-600 hover:bg-purple-700 text-white"
                  >
                    Professional wählen
                  </Button>
                </div>
              </div>
            </div>
            
            {/* Enterprise Plan */}
            <div className="bg-white rounded-lg shadow-lg overflow-hidden border-t-4 border-orange-500">
              <div className="px-6 py-8">
                <h3 className="text-2xl font-bold text-gray-900 text-center">Enterprise</h3>
                <div className="mt-4 flex justify-center">
                  <span className="text-5xl font-extrabold text-gray-900">€499</span>
                  <span className="ml-2 text-xl font-medium text-gray-500 self-end">/Monat</span>
                </div>
                <p className="mt-1 text-sm text-gray-500 text-center">Bei jährlicher Zahlung</p>
              </div>
              <div className="border-t border-gray-200 bg-gray-50 px-6 py-8">
                <ul className="space-y-4">
                  <li className="flex items-start">
                    <div className="flex-shrink-0">
                      <CheckCircle className="h-5 w-5 text-orange-500" />
                    </div>
                    <p className="ml-3 text-sm text-gray-700">Alles aus Professional</p>
                  </li>
                  <li className="flex items-start">
                    <div className="flex-shrink-0">
                      <CheckCircle className="h-5 w-5 text-orange-500" />
                    </div>
                    <p className="ml-3 text-sm text-gray-700">Multi-User Management</p>
                  </li>
                  <li className="flex items-start">
                    <div className="flex-shrink-0">
                      <CheckCircle className="h-5 w-5 text-orange-500" />
                    </div>
                    <p className="ml-3 text-sm text-gray-700">API-Zugang</p>
                  </li>
                  <li className="flex items-start">
                    <div className="flex-shrink-0">
                      <CheckCircle className="h-5 w-5 text-orange-500" />
                    </div>
                    <p className="ml-3 text-sm text-gray-700">Dedicated Account Manager</p>
                  </li>
                  <li className="flex items-start">
                    <div className="flex-shrink-0">
                      <CheckCircle className="h-5 w-5 text-orange-500" />
                    </div>
                    <p className="ml-3 text-sm text-gray-700">24/7 Phone Support</p>
                  </li>
                </ul>
                <div className="mt-8">
                  <Button 
                    onClick={() => {
                      if (isAuthenticated) {
                        // Show plan selection
                        setShowPlanSelection(true)
                      } else {
                        // Redirect to registration
                        setAuthView('register-simple')
                      }
                    }}
                    className="w-full bg-orange-600 hover:bg-orange-700 text-white"
                  >
                    Enterprise wählen
                  </Button>
                </div>
              </div>
            </div>
          </div>
          
          <div className="mt-12 text-center">
            <p className="text-gray-600">Alle Preise zzgl. MwSt. Jährliche Abrechnung.</p>
            <p className="mt-2 text-gray-600">Benötigen Sie ein individuelles Angebot? <a href="#" className="text-purple-600 font-medium hover:text-purple-500">Kontaktieren Sie uns</a>.</p>
          </div>
        </div>
        <Footer onNavigate={setCurrentView} setAuthView={setAuthView} />
      </div>
    )
  }

  // Legal Pages
  if (currentView === 'impressum') {
    return (
      <div>
        <Navigation />
        <ImpressumPage />
        <Footer onNavigate={setCurrentView} setAuthView={setAuthView} />
      </div>
    )
  }

  if (currentView === 'terms') {
    return (
      <div>
        <Navigation />
        <TermsPage />
        <Footer onNavigate={setCurrentView} setAuthView={setAuthView} />
      </div>
    )
  }

  if (currentView === 'privacy') {
    return (
      <div>
        <Navigation />
        <PrivacyPage />
        <Footer onNavigate={setCurrentView} setAuthView={setAuthView} />
      </div>
    )
  }

  // Dashboard for authenticated users
  if (isAuthenticated && currentView === 'dashboard') {
    const dashboardData = getDashboardData(currentUser)
    const campaignTileData = getCampaignTileData(currentUser)
    
    return (
      <div>
        <Navigation />
        
        {/* Dashboard Header */}
        <header className="bg-gradient-to-r from-purple-700 to-indigo-800 text-white">
          <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
              <div>
                <h1 className="text-2xl font-bold">Willkommen, {currentUser?.name || 'Benutzer'}!</h1>
                <p className="mt-1 text-white/80">
                  {currentUser?.isDemoAccount 
                    ? 'Sie nutzen einen Demo-Account mit Beispieldaten.' 
                    : 'Hier ist eine Übersicht Ihrer Kampagnen und Aktivitäten.'}
                </p>
              </div>
              <div className="mt-4 md:mt-0">
                <Button 
                  onClick={handleCreateCampaign}
                  className="bg-white text-purple-700 hover:bg-white/90"
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Neue Kampagne erstellen
                </Button>
              </div>
            </div>
          </div>
        </header>
        
        {/* Dashboard Content */}
        <main className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
          {/* Stats Overview */}
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4 mb-8">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-gray-500">Aktive Kampagnen</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center">
                  <Zap className="w-8 h-8 text-purple-500 mr-3" />
                  <div>
                    <div className="text-2xl font-bold">{dashboardData.activeCampaigns}</div>
                    <p className="text-xs text-gray-500">Laufende Kampagnen</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-gray-500">Gesamte Reichweite</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center">
                  <Users className="w-8 h-8 text-blue-500 mr-3" />
                  <div>
                    <div className="text-2xl font-bold">{dashboardData.totalReach}</div>
                    <p className="text-xs text-gray-500">Erreichte Personen</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-gray-500">Klickrate</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center">
                  <MousePointer className="w-8 h-8 text-green-500 mr-3" />
                  <div>
                    <div className="text-2xl font-bold">{dashboardData.clickRate}</div>
                    <p className="text-xs text-gray-500">Durchschnittliche CTR</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-gray-500">Budget</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center">
                  <Euro className="w-8 h-8 text-amber-500 mr-3" />
                  <div>
                    <div className="text-2xl font-bold">{dashboardData.budgetUsed}</div>
                    <p className="text-xs text-gray-500">von {dashboardData.budgetTotal} ausgegeben</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
          
          {/* Main Dashboard Tiles */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Campaign Management Tile */}
            <Card className="lg:col-span-2">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <div>
                  <CardTitle className="text-xl font-bold">Kampagnen-Management</CardTitle>
                  <CardDescription>Verwalten Sie Ihre Werbekampagnen</CardDescription>
                </div>
                <Button 
                  onClick={handleOpenCampaignDashboard}
                  variant="outline"
                  size="sm"
                  className="text-xs"
                >
                  Alle anzeigen
                </Button>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
                  <div className="bg-purple-50 rounded-lg p-3 text-center">
                    <div className="text-2xl font-bold text-purple-700">{campaignTileData.total}</div>
                    <div className="text-xs text-gray-500">Gesamt</div>
                  </div>
                  <div className="bg-green-50 rounded-lg p-3 text-center">
                    <div className="text-2xl font-bold text-green-700">{campaignTileData.active}</div>
                    <div className="text-xs text-gray-500">Aktiv</div>
                  </div>
                  <div className="bg-blue-50 rounded-lg p-3 text-center">
                    <div className="text-2xl font-bold text-blue-700">{campaignTileData.draft}</div>
                    <div className="text-xs text-gray-500">Entwurf</div>
                  </div>
                  <div className="bg-amber-50 rounded-lg p-3 text-center">
                    <div className="text-2xl font-bold text-amber-700">{campaignTileData.paused}</div>
                    <div className="text-xs text-gray-500">Pausiert</div>
                  </div>
                </div>
                
                {dashboardData.campaigns.length > 0 ? (
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="text-xs text-gray-500 border-b">
                          <th className="pb-2 font-medium text-left">Name</th>
                          <th className="pb-2 font-medium text-left">Plattform</th>
                          <th className="pb-2 font-medium text-left">Status</th>
                          <th className="pb-2 font-medium text-left">Performance</th>
                          <th className="pb-2 font-medium text-right"></th>
                        </tr>
                      </thead>
                      <tbody>
                        {dashboardData.campaigns.map((campaign, index) => (
                          <tr key={index} className="border-b last:border-0">
                            <td className="py-3 text-sm">{campaign.name}</td>
                            <td className="py-3 text-sm">{campaign.platform}</td>
                            <td className="py-3 text-sm">
                              <Badge variant={campaign.status === 'Aktiv' ? 'success' : 'warning'}>
                                {campaign.status}
                              </Badge>
                            </td>
                            <td className="py-3 text-sm">
                              <Badge variant={
                                campaign.performance === 'Exzellent' ? 'success' : 
                                campaign.performance === 'Gut' ? 'info' : 'default'
                              }>
                                {campaign.performance}
                              </Badge>
                            </td>
                            <td className="py-3 text-sm text-right">
                              <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                                <MoreHorizontal className="h-4 w-4" />
                              </Button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <Megaphone className="h-12 w-12 text-gray-300 mx-auto mb-3" />
                    <h3 className="text-lg font-medium text-gray-900 mb-1">Keine Kampagnen</h3>
                    <p className="text-gray-500 mb-4">Sie haben noch keine Kampagnen erstellt.</p>
                    <Button 
                      onClick={handleCreateCampaign}
                      className="bg-purple-600 hover:bg-purple-700 text-white"
                    >
                      Erste Kampagne erstellen
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
            
            {/* Quick Actions Tile */}
            <Card>
              <CardHeader>
                <CardTitle className="text-xl font-bold">Schnellzugriff</CardTitle>
                <CardDescription>Häufig verwendete Aktionen</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <Button 
                  onClick={handleCreateCampaign}
                  className="w-full justify-start bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700"
                >
                  <Plus className="mr-2 h-4 w-4" />
                  Neue Kampagne erstellen
                </Button>
                
                <Button 
                  onClick={handleOpenCampaignDashboard}
                  variant="outline"
                  className="w-full justify-start"
                >
                  <BarChart3 className="mr-2 h-4 w-4" />
                  Kampagnen-Dashboard öffnen
                </Button>
                
                <Button 
                  onClick={() => setCurrentView('account')}
                  variant="outline"
                  className="w-full justify-start"
                >
                  <User className="mr-2 h-4 w-4" />
                  Account-Einstellungen
                </Button>
                
                {currentUser?.plan?.id ? (
                  <div className="bg-gray-50 rounded-lg p-4 mt-6">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-medium">Ihr aktueller Plan</h3>
                      <Badge variant="outline" className="font-normal">
                        {currentUser.plan.name}
                      </Badge>
                    </div>
                    <div className="text-sm text-gray-500 mb-3">
                      {currentUser.plan.price}€/Monat bei jährlicher Zahlung
                    </div>
                    <Button 
                      onClick={() => setShowPlanSelection(true)}
                      variant="outline" 
                      size="sm"
                      className="w-full text-xs"
                    >
                      Plan ändern
                    </Button>
                  </div>
                ) : (
                  <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 mt-6">
                    <div className="flex items-center mb-2">
                      <h3 className="font-medium text-amber-800">Kein Plan ausgewählt</h3>
                    </div>
                    <div className="text-sm text-amber-700 mb-3">
                      Wählen Sie einen Plan, um alle Funktionen zu nutzen.
                    </div>
                    <Button 
                      onClick={() => setShowPlanSelection(true)}
                      className="w-full text-xs bg-amber-600 hover:bg-amber-700 text-white"
                    >
                      Plan auswählen
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </main>
        
        <Footer onNavigate={setCurrentView} setAuthView={setAuthView} />
      </div>
    )
  }

  // Homepage (default view)
  return (
    <div>
      <Navigation />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-purple-700 to-indigo-800 text-white">
        <div className="max-w-7xl mx-auto px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-16 items-center">
            <div>
              <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl">
                Social Media Kampagnen leicht gemacht
              </h1>
              <p className="mt-6 text-xl max-w-3xl">
                Erstellen, verwalten und optimieren Sie Ihre Social Media Kampagnen mit unserer intuitiven Plattform. Sparen Sie Zeit und maximieren Sie Ihre Ergebnisse.
              </p>
              <div className="mt-8 flex flex-col sm:flex-row gap-4">
                <Button 
                  onClick={() => setAuthView('register-simple')}
                  className="bg-white text-purple-700 hover:bg-gray-100 text-lg px-8 py-3 h-auto"
                >
                  Jetzt starten
                </Button>
                <Button 
                  onClick={() => setCurrentView('features')}
                  variant="outline"
                  className="border-white text-white hover:bg-white/10 text-lg px-8 py-3 h-auto"
                >
                  Features entdecken
                </Button>
              </div>
            </div>
            <div className="hidden lg:block">
              <img 
                src={heroDashboard} 
                alt="Dashboard Preview" 
                className="rounded-lg shadow-2xl transform rotate-2 hover:rotate-0 transition-transform duration-500"
              />
            </div>
          </div>
        </div>
      </section>
      
      {/* Features Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900">Alles was Sie für erfolgreiche Kampagnen brauchen</h2>
            <p className="mt-4 text-lg text-gray-600 max-w-3xl mx-auto">
              Unsere Plattform bietet alle Tools, die Sie für die Erstellung und Verwaltung erfolgreicher Social Media Kampagnen benötigen.
            </p>
          </div>
          
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            <Card>
              <CardHeader>
                <div className="w-12 h-12 rounded-lg bg-purple-100 flex items-center justify-center mb-4">
                  <Target className="h-6 w-6 text-purple-600" />
                </div>
                <CardTitle>Zielgenaue Kampagnen</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Erstellen Sie Kampagnen, die genau auf Ihre Zielgruppe zugeschnitten sind. Maximieren Sie Ihre Reichweite und Conversion-Rate.
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <div className="w-12 h-12 rounded-lg bg-blue-100 flex items-center justify-center mb-4">
                  <BarChart3 className="h-6 w-6 text-blue-600" />
                </div>
                <CardTitle>Detaillierte Analytics</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Verfolgen Sie den Erfolg Ihrer Kampagnen in Echtzeit. Erhalten Sie wertvolle Einblicke und optimieren Sie Ihre Strategie.
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <div className="w-12 h-12 rounded-lg bg-green-100 flex items-center justify-center mb-4">
                  <Clock className="h-6 w-6 text-green-600" />
                </div>
                <CardTitle>Zeitersparnis</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Automatisieren Sie wiederkehrende Aufgaben und sparen Sie wertvolle Zeit. Konzentrieren Sie sich auf das, was wirklich wichtig ist.
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <div className="w-12 h-12 rounded-lg bg-amber-100 flex items-center justify-center mb-4">
                  <TrendingUp className="h-6 w-6 text-amber-600" />
                </div>
                <CardTitle>Performance-Optimierung</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Verbessern Sie kontinuierlich die Performance Ihrer Kampagnen mit datengestützten Empfehlungen und A/B-Tests.
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <div className="w-12 h-12 rounded-lg bg-red-100 flex items-center justify-center mb-4">
                  <Calendar className="h-6 w-6 text-red-600" />
                </div>
                <CardTitle>Content-Planung</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Planen Sie Ihre Inhalte im Voraus und behalten Sie den Überblick über Ihre Content-Strategie mit unserem intuitiven Kalender.
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <div className="w-12 h-12 rounded-lg bg-indigo-100 flex items-center justify-center mb-4">
                  <Users className="h-6 w-6 text-indigo-600" />
                </div>
                <CardTitle>Team-Kollaboration</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Arbeiten Sie nahtlos mit Ihrem Team zusammen. Teilen Sie Kampagnen, geben Sie Feedback und verwalten Sie Berechtigungen.
                </p>
              </CardContent>
            </Card>
          </div>
          
          <div className="mt-12 text-center">
            <Button 
              onClick={() => setCurrentView('features')}
              className="bg-purple-600 hover:bg-purple-700 text-white"
            >
              Alle Features entdecken
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>
      </section>
      
      {/* How It Works Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900">So funktioniert's</h2>
            <p className="mt-4 text-lg text-gray-600 max-w-3xl mx-auto">
              In nur wenigen Schritten zu Ihrer erfolgreichen Social Media Kampagne.
            </p>
          </div>
          
          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            <div className="text-center">
              <div className="w-16 h-16 rounded-full bg-purple-100 flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-purple-600">1</span>
              </div>
              <h3 className="text-xl font-bold mb-2">Kampagne erstellen</h3>
              <p className="text-gray-600">
                Wählen Sie Ihre Ziele, Zielgruppe und Plattformen. Unser Wizard führt Sie Schritt für Schritt durch den Prozess.
              </p>
              <img 
                src={heroWizard} 
                alt="Campaign Wizard" 
                className="mt-6 rounded-lg shadow-lg mx-auto"
              />
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 rounded-full bg-purple-100 flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-purple-600">2</span>
              </div>
              <h3 className="text-xl font-bold mb-2">Inhalte gestalten</h3>
              <p className="text-gray-600">
                Erstellen Sie ansprechende Inhalte mit unserem Editor. Nutzen Sie Vorlagen oder gestalten Sie Ihre eigenen Designs.
              </p>
              <img 
                src={heroCampaign} 
                alt="Content Creation" 
                className="mt-6 rounded-lg shadow-lg mx-auto"
              />
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 rounded-full bg-purple-100 flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-purple-600">3</span>
              </div>
              <h3 className="text-xl font-bold mb-2">Erfolg messen</h3>
              <p className="text-gray-600">
                Verfolgen Sie die Performance Ihrer Kampagnen in Echtzeit und optimieren Sie basierend auf datengestützten Erkenntnissen.
              </p>
              <img 
                src={heroDashboard} 
                alt="Analytics Dashboard" 
                className="mt-6 rounded-lg shadow-lg mx-auto"
              />
            </div>
          </div>
          
          <div className="mt-12 text-center">
            <Button 
              onClick={() => setAuthView('register-simple')}
              className="bg-purple-600 hover:bg-purple-700 text-white"
            >
              Jetzt kostenlos testen
            </Button>
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="bg-gradient-to-br from-purple-700 to-indigo-800 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">Bereit, Ihre Social Media Strategie zu revolutionieren?</h2>
          <p className="text-xl mb-8 max-w-3xl mx-auto">
            Starten Sie noch heute und erleben Sie, wie einfach erfolgreiche Social Media Kampagnen sein können.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button 
              onClick={() => setAuthView('register-simple')}
              className="bg-white text-purple-700 hover:bg-gray-100 text-lg px-8 py-3 h-auto"
            >
              Kostenlos starten
            </Button>
            <Button 
              onClick={() => setAuthView('login')}
              variant="outline"
              className="border-white text-white hover:bg-white/10 text-lg px-8 py-3 h-auto"
            >
              Anmelden
            </Button>
          </div>
        </div>
      </section>
      
      <Footer onNavigate={setCurrentView} setAuthView={setAuthView} />
    </div>
  )
}

export default App
