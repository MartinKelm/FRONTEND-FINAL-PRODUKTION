import React, { useState, useEffect } from 'react'
import { Button } from '../ui/button'
import { Input } from '../ui/input'
import { Label } from '../ui/label'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card'
import { Badge } from '../ui/badge'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select'
import { Textarea } from '../ui/textarea'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs'
import { 
  User, 
  Building, 
  Mail, 
  Lock, 
  CreditCard, 
  Calendar,
  MapPin,
  Phone,
  Globe,
  Save,
  Eye,
  EyeOff,
  CheckCircle,
  AlertCircle,
  Crown
} from 'lucide-react'

const AccountManagement = ({ currentUser, onUpdateUser }) => {
  const [activeTab, setActiveTab] = useState('profile')
  const [isLoading, setIsLoading] = useState(false)
  const [message, setMessage] = useState({ type: '', text: '' })

  // Profile Data
  const [profileData, setProfileData] = useState({
    firstName: currentUser?.firstName || '',
    lastName: currentUser?.lastName || '',
    email: currentUser?.email || '',
    phone: currentUser?.phone || ''
  })

  // Company Data
  const [companyData, setCompanyData] = useState({
    name: currentUser?.company?.name || '',
    industry: currentUser?.company?.industry || '',
    website: currentUser?.company?.website || '',
    phone: currentUser?.company?.phone || '',
    address: {
      street: currentUser?.company?.address?.street || '',
      city: currentUser?.company?.address?.city || '',
      postalCode: currentUser?.company?.address?.postalCode || '',
      country: currentUser?.company?.address?.country || 'Deutschland'
    },
    description: currentUser?.company?.description || ''
  })

  // Password Data
  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  })
  const [showPasswords, setShowPasswords] = useState({
    current: false,
    new: false,
    confirm: false
  })

  const industries = [
    'Technologie & Software',
    'E-Commerce & Handel',
    'Gesundheitswesen',
    'Bildung & Training',
    'Finanzdienstleistungen',
    'Immobilien',
    'Gastronomie & Tourismus',
    'Automotive',
    'Mode & Beauty',
    'Sport & Fitness',
    'Beratung & Services',
    'Handwerk & Produktion',
    'Non-Profit',
    'Sonstiges'
  ]

  const showMessage = (type, text) => {
    setMessage({ type, text })
    setTimeout(() => setMessage({ type: '', text: '' }), 5000)
  }

  const handleProfileSave = async () => {
    setIsLoading(true)
    try {
      // Validate email format
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
      if (!emailRegex.test(profileData.email)) {
        showMessage('error', 'Bitte geben Sie eine gültige E-Mail-Adresse ein.')
        setIsLoading(false)
        return
      }

      // Check if email is already taken (except current user)
      const existingUsers = JSON.parse(localStorage.getItem('registeredUsers') || '[]')
      const emailTaken = existingUsers.find(u => 
        u.email.toLowerCase() === profileData.email.toLowerCase() && 
        u.id !== currentUser.id
      )
      
      if (emailTaken) {
        showMessage('error', 'Diese E-Mail-Adresse wird bereits verwendet.')
        setIsLoading(false)
        return
      }

      // Update user data
      const updatedUser = {
        ...currentUser,
        firstName: profileData.firstName,
        lastName: profileData.lastName,
        name: `${profileData.firstName} ${profileData.lastName}`,
        email: profileData.email,
        phone: profileData.phone
      }

      // Save to localStorage
      const userIndex = existingUsers.findIndex(u => u.id === currentUser.id)
      if (userIndex !== -1) {
        existingUsers[userIndex] = updatedUser
        localStorage.setItem('registeredUsers', JSON.stringify(existingUsers))
      }

      onUpdateUser(updatedUser)
      showMessage('success', 'Profil erfolgreich aktualisiert!')
      
    } catch (error) {
      showMessage('error', 'Fehler beim Speichern. Bitte versuchen Sie es erneut.')
    }
    setIsLoading(false)
  }

  const handleCompanySave = async () => {
    setIsLoading(true)
    try {
      // Update user data with company info
      const updatedUser = {
        ...currentUser,
        company: {
          name: companyData.name,
          industry: companyData.industry,
          website: companyData.website,
          phone: companyData.phone,
          address: companyData.address,
          description: companyData.description
        }
      }

      // Save to localStorage
      const existingUsers = JSON.parse(localStorage.getItem('registeredUsers') || '[]')
      const userIndex = existingUsers.findIndex(u => u.id === currentUser.id)
      if (userIndex !== -1) {
        existingUsers[userIndex] = updatedUser
        localStorage.setItem('registeredUsers', JSON.stringify(existingUsers))
      }

      onUpdateUser(updatedUser)
      showMessage('success', 'Unternehmensdaten erfolgreich aktualisiert!')
      
    } catch (error) {
      showMessage('error', 'Fehler beim Speichern. Bitte versuchen Sie es erneut.')
    }
    setIsLoading(false)
  }

  const handlePasswordChange = async () => {
    setIsLoading(true)
    try {
      // Validate current password
      if (passwordData.currentPassword !== currentUser.password) {
        showMessage('error', 'Das aktuelle Passwort ist falsch.')
        setIsLoading(false)
        return
      }

      // Validate new password
      if (passwordData.newPassword.length < 6) {
        showMessage('error', 'Das neue Passwort muss mindestens 6 Zeichen lang sein.')
        setIsLoading(false)
        return
      }

      if (passwordData.newPassword !== passwordData.confirmPassword) {
        showMessage('error', 'Die Passwort-Bestätigung stimmt nicht überein.')
        setIsLoading(false)
        return
      }

      // Update password
      const updatedUser = {
        ...currentUser,
        password: passwordData.newPassword
      }

      // Save to localStorage
      const existingUsers = JSON.parse(localStorage.getItem('registeredUsers') || '[]')
      const userIndex = existingUsers.findIndex(u => u.id === currentUser.id)
      if (userIndex !== -1) {
        existingUsers[userIndex] = updatedUser
        localStorage.setItem('registeredUsers', JSON.stringify(existingUsers))
      }

      onUpdateUser(updatedUser)
      setPasswordData({ currentPassword: '', newPassword: '', confirmPassword: '' })
      showMessage('success', 'Passwort erfolgreich geändert!')
      
    } catch (error) {
      showMessage('error', 'Fehler beim Ändern des Passworts. Bitte versuchen Sie es erneut.')
    }
    setIsLoading(false)
  }

  const formatDate = (dateString) => {
    if (!dateString) return 'Nicht verfügbar'
    return new Date(dateString).toLocaleDateString('de-DE', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  const getPlanBadgeColor = (planId) => {
    switch (planId) {
      case 'starter': return 'bg-blue-100 text-blue-800'
      case 'professional': return 'bg-purple-100 text-purple-800'
      case 'enterprise': return 'bg-gold-100 text-gold-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      <div className="max-w-4xl mx-auto p-6">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Account-Verwaltung</h1>
          <p className="text-gray-600">Verwalten Sie Ihre Konto- und Unternehmensdaten</p>
        </div>

        {/* Message Display */}
        {message.text && (
          <div className={`mb-6 p-4 rounded-lg flex items-center space-x-2 ${
            message.type === 'success' 
              ? 'bg-green-50 border border-green-200 text-green-700'
              : 'bg-red-50 border border-red-200 text-red-700'
          }`}>
            {message.type === 'success' ? (
              <CheckCircle className="w-5 h-5" />
            ) : (
              <AlertCircle className="w-5 h-5" />
            )}
            <span>{message.text}</span>
          </div>
        )}

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="profile" className="flex items-center space-x-2">
              <User className="w-4 h-4" />
              <span>Profil</span>
            </TabsTrigger>
            <TabsTrigger value="company" className="flex items-center space-x-2">
              <Building className="w-4 h-4" />
              <span>Unternehmen</span>
            </TabsTrigger>
            <TabsTrigger value="security" className="flex items-center space-x-2">
              <Lock className="w-4 h-4" />
              <span>Sicherheit</span>
            </TabsTrigger>
            <TabsTrigger value="billing" className="flex items-center space-x-2">
              <CreditCard className="w-4 h-4" />
              <span>Abrechnung</span>
            </TabsTrigger>
          </TabsList>

          {/* Profile Tab */}
          <TabsContent value="profile">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <User className="w-5 h-5" />
                  <span>Persönliche Daten</span>
                </CardTitle>
                <CardDescription>
                  Bearbeiten Sie Ihre persönlichen Informationen
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="firstName">Vorname *</Label>
                    <Input
                      id="firstName"
                      value={profileData.firstName}
                      onChange={(e) => setProfileData({...profileData, firstName: e.target.value})}
                      placeholder="Ihr Vorname"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lastName">Nachname *</Label>
                    <Input
                      id="lastName"
                      value={profileData.lastName}
                      onChange={(e) => setProfileData({...profileData, lastName: e.target.value})}
                      placeholder="Ihr Nachname"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">E-Mail-Adresse *</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <Input
                      id="email"
                      type="email"
                      value={profileData.email}
                      onChange={(e) => setProfileData({...profileData, email: e.target.value})}
                      className="pl-10"
                      placeholder="ihre@email.de"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phone">Telefon (optional)</Label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <Input
                      id="phone"
                      value={profileData.phone}
                      onChange={(e) => setProfileData({...profileData, phone: e.target.value})}
                      className="pl-10"
                      placeholder="+49 123 456789"
                    />
                  </div>
                </div>

                <Button 
                  onClick={handleProfileSave}
                  disabled={isLoading}
                  className="w-full md:w-auto"
                >
                  {isLoading ? (
                    <div className="flex items-center space-x-2">
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      <span>Speichern...</span>
                    </div>
                  ) : (
                    <>
                      <Save className="w-4 h-4 mr-2" />
                      Profil speichern
                    </>
                  )}
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Company Tab */}
          <TabsContent value="company">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Building className="w-5 h-5" />
                  <span>Unternehmensdaten</span>
                </CardTitle>
                <CardDescription>
                  Verwalten Sie Ihre Unternehmensinformationen
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="companyName">Firmenname</Label>
                  <Input
                    id="companyName"
                    value={companyData.name}
                    onChange={(e) => setCompanyData({...companyData, name: e.target.value})}
                    placeholder="Ihre Firma GmbH"
                  />
                </div>

                <div className="space-y-2">
                  <Label>Branche</Label>
                  <Select 
                    value={companyData.industry} 
                    onValueChange={(value) => setCompanyData({...companyData, industry: value})}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Wählen Sie Ihre Branche" />
                    </SelectTrigger>
                    <SelectContent>
                      {industries.map((industry) => (
                        <SelectItem key={industry} value={industry}>
                          {industry}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="website">Website</Label>
                    <div className="relative">
                      <Globe className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                      <Input
                        id="website"
                        value={companyData.website}
                        onChange={(e) => setCompanyData({...companyData, website: e.target.value})}
                        className="pl-10"
                        placeholder="https://www.beispiel.de"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="companyPhone">Telefon</Label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                      <Input
                        id="companyPhone"
                        value={companyData.phone}
                        onChange={(e) => setCompanyData({...companyData, phone: e.target.value})}
                        className="pl-10"
                        placeholder="+49 123 456789"
                      />
                    </div>
                  </div>
                </div>

                {/* Address */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold flex items-center">
                    <MapPin className="w-5 h-5 mr-2" />
                    Adresse
                  </h3>
                  
                  <div className="space-y-2">
                    <Label htmlFor="street">Straße und Hausnummer</Label>
                    <Input
                      id="street"
                      value={companyData.address.street}
                      onChange={(e) => setCompanyData({
                        ...companyData, 
                        address: {...companyData.address, street: e.target.value}
                      })}
                      placeholder="Musterstraße 123"
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="postalCode">PLZ</Label>
                      <Input
                        id="postalCode"
                        value={companyData.address.postalCode}
                        onChange={(e) => setCompanyData({
                          ...companyData, 
                          address: {...companyData.address, postalCode: e.target.value}
                        })}
                        placeholder="12345"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="city">Stadt</Label>
                      <Input
                        id="city"
                        value={companyData.address.city}
                        onChange={(e) => setCompanyData({
                          ...companyData, 
                          address: {...companyData.address, city: e.target.value}
                        })}
                        placeholder="Berlin"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="country">Land</Label>
                      <Input
                        id="country"
                        value={companyData.address.country}
                        onChange={(e) => setCompanyData({
                          ...companyData, 
                          address: {...companyData.address, country: e.target.value}
                        })}
                        placeholder="Deutschland"
                      />
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">Beschreibung</Label>
                  <Textarea
                    id="description"
                    value={companyData.description}
                    onChange={(e) => setCompanyData({...companyData, description: e.target.value})}
                    placeholder="Kurze Beschreibung Ihres Unternehmens..."
                    rows={3}
                  />
                </div>

                {/* Company Logo Upload */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold flex items-center">
                    <Building className="w-5 h-5 mr-2" />
                    Firmen-Logo
                  </h3>
                  
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-gray-400 transition-colors">
                    {currentUser?.company?.logo ? (
                      <div className="space-y-4">
                        <img 
                          src={currentUser.company.logo} 
                          alt="Firmen-Logo" 
                          className="max-h-24 mx-auto object-contain"
                        />
                        <div className="space-y-2">
                          <p className="text-sm text-gray-600">Aktuelles Logo</p>
                          <Button variant="outline" size="sm">
                            Logo ändern
                          </Button>
                        </div>
                      </div>
                    ) : (
                      <div className="space-y-4">
                        <div className="w-16 h-16 bg-gray-100 rounded-lg flex items-center justify-center mx-auto">
                          <Building className="w-8 h-8 text-gray-400" />
                        </div>
                        <div className="space-y-2">
                          <p className="text-sm font-medium text-gray-900">Firmen-Logo hochladen</p>
                          <p className="text-xs text-gray-500">
                            PNG, JPG oder SVG bis 2MB<br />
                            Empfohlene Größe: 200x200px
                          </p>
                          <Button variant="outline" size="sm">
                            Logo auswählen
                          </Button>
                        </div>
                      </div>
                    )}
                  </div>
                  
                  <p className="text-xs text-gray-500">
                    Ihr Logo wird in Kampagnen und auf generierten Inhalten verwendet.
                  </p>
                </div>

                <Button 
                  onClick={handleCompanySave}
                  disabled={isLoading}
                  className="w-full md:w-auto"
                >
                  {isLoading ? (
                    <div className="flex items-center space-x-2">
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      <span>Speichern...</span>
                    </div>
                  ) : (
                    <>
                      <Save className="w-4 h-4 mr-2" />
                      Unternehmensdaten speichern
                    </>
                  )}
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Security Tab */}
          <TabsContent value="security">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Lock className="w-5 h-5" />
                  <span>Sicherheit</span>
                </CardTitle>
                <CardDescription>
                  Ändern Sie Ihr Passwort und verwalten Sie Sicherheitseinstellungen
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="currentPassword">Aktuelles Passwort *</Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <Input
                      id="currentPassword"
                      type={showPasswords.current ? 'text' : 'password'}
                      value={passwordData.currentPassword}
                      onChange={(e) => setPasswordData({...passwordData, currentPassword: e.target.value})}
                      className="pl-10 pr-10"
                      placeholder="Aktuelles Passwort eingeben"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPasswords({...showPasswords, current: !showPasswords.current})}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                    >
                      {showPasswords.current ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="newPassword">Neues Passwort *</Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <Input
                      id="newPassword"
                      type={showPasswords.new ? 'text' : 'password'}
                      value={passwordData.newPassword}
                      onChange={(e) => setPasswordData({...passwordData, newPassword: e.target.value})}
                      className="pl-10 pr-10"
                      placeholder="Neues Passwort eingeben"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPasswords({...showPasswords, new: !showPasswords.new})}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                    >
                      {showPasswords.new ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="confirmPassword">Passwort bestätigen *</Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <Input
                      id="confirmPassword"
                      type={showPasswords.confirm ? 'text' : 'password'}
                      value={passwordData.confirmPassword}
                      onChange={(e) => setPasswordData({...passwordData, confirmPassword: e.target.value})}
                      className="pl-10 pr-10"
                      placeholder="Neues Passwort bestätigen"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPasswords({...showPasswords, confirm: !showPasswords.confirm})}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                    >
                      {showPasswords.confirm ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <h4 className="font-medium text-blue-900 mb-2">Passwort-Anforderungen:</h4>
                  <ul className="text-sm text-blue-700 space-y-1">
                    <li>• Mindestens 6 Zeichen lang</li>
                    <li>• Verwenden Sie eine Kombination aus Buchstaben und Zahlen</li>
                    <li>• Vermeiden Sie einfache Passwörter wie "123456"</li>
                  </ul>
                </div>

                <Button 
                  onClick={handlePasswordChange}
                  disabled={isLoading || !passwordData.currentPassword || !passwordData.newPassword || !passwordData.confirmPassword}
                  className="w-full md:w-auto"
                >
                  {isLoading ? (
                    <div className="flex items-center space-x-2">
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      <span>Ändern...</span>
                    </div>
                  ) : (
                    <>
                      <Lock className="w-4 h-4 mr-2" />
                      Passwort ändern
                    </>
                  )}
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Billing Tab */}
          <TabsContent value="billing">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <CreditCard className="w-5 h-5" />
                  <span>Abrechnung & Plan</span>
                </CardTitle>
                <CardDescription>
                  Übersicht Ihres aktuellen Plans und Abrechnungsinformationen
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Current Plan */}
                <div className="bg-gradient-to-r from-blue-50 to-purple-50 border border-blue-200 rounded-lg p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold text-gray-900">Aktueller Plan</h3>
                    {currentUser?.plan?.id === 'enterprise' && (
                      <Crown className="w-6 h-6 text-yellow-500" />
                    )}
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label className="text-sm text-gray-600">Plan</Label>
                      <div className="flex items-center space-x-2 mt-1">
                        <Badge className={getPlanBadgeColor(currentUser?.plan?.id)}>
                          {currentUser?.plan?.name || 'Kein Plan ausgewählt'}
                        </Badge>
                      </div>
                    </div>
                    
                    <div>
                      <Label className="text-sm text-gray-600">Preis</Label>
                      <p className="text-lg font-semibold text-gray-900 mt-1">
                        {currentUser?.plan?.price || '€0'}/{currentUser?.plan?.period || 'Monat'}
                      </p>
                    </div>
                    
                    <div>
                      <Label className="text-sm text-gray-600">Registriert seit</Label>
                      <p className="text-gray-900 mt-1">
                        {formatDate(currentUser?.registrationDate)}
                      </p>
                    </div>
                    
                    <div>
                      <Label className="text-sm text-gray-600">Status</Label>
                      <div className="flex items-center space-x-2 mt-1">
                        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                        <span className="text-green-700 text-sm font-medium">Aktiv</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Account Type Info */}
                {currentUser?.isDemoAccount && (
                  <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                    <div className="flex items-center space-x-2">
                      <CheckCircle className="w-5 h-5 text-green-600" />
                      <h4 className="font-medium text-green-900">Demo-Account</h4>
                    </div>
                    <p className="text-green-700 text-sm mt-2">
                      Sie verwenden einen Demo-Account mit Beispieldaten. Registrieren Sie sich für den vollen Funktionsumfang.
                    </p>
                  </div>
                )}

                {(currentUser?.role === 'ADMIN' || currentUser?.role === 'SUPER_ADMIN') && (
                  <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                    <div className="flex items-center space-x-2">
                      <Crown className="w-5 h-5 text-red-600" />
                      <h4 className="font-medium text-red-900">Administrator-Account</h4>
                    </div>
                    <p className="text-red-700 text-sm mt-2">
                      Sie haben Administrator-Rechte und Zugriff auf erweiterte Funktionen.
                    </p>
                  </div>
                )}

                {/* Billing History */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Rechnungshistorie</h3>
                  <div className="bg-gray-50 border border-gray-200 rounded-lg p-6 text-center">
                    <Calendar className="w-12 h-12 text-gray-400 mx-auto mb-3" />
                    <p className="text-gray-600">Noch keine Rechnungen vorhanden</p>
                    <p className="text-sm text-gray-500 mt-1">
                      Ihre Rechnungen werden hier angezeigt, sobald Ihr Plan aktiv ist.
                    </p>
                  </div>
                </div>

                {/* Plan Management */}
                <div className="pt-4 border-t border-gray-200">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Plan-Verwaltung</h3>
                  <div className="flex flex-col sm:flex-row gap-3">
                    <Button variant="outline" className="flex-1">
                      Plan ändern
                    </Button>
                    <Button variant="outline" className="flex-1">
                      Rechnung herunterladen
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}

export default AccountManagement
