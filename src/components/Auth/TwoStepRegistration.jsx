import React, { useState } from 'react'
import { Button } from '../ui/button'
import { Input } from '../ui/input'
import { Label } from '../ui/label'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select'
import { Checkbox } from '../ui/checkbox'
import { Eye, EyeOff, User, Mail, Lock, Building, Phone, MapPin, CheckCircle } from 'lucide-react'
import FullLogo from '../../assets/Logo-socialmediakampagnen-voll.png'

const TwoStepRegistration = ({ onRegister, onSwitchToLogin }) => {
  const [currentStep, setCurrentStep] = useState(1)
  const [isLoading, setIsLoading] = useState(false)
  const [errors, setErrors] = useState({})
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)

  // Step 1: Basic user data
  const [basicData, setBasicData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    acceptTerms: false
  })

  // Step 2: Company data
  const [companyData, setCompanyData] = useState({
    companyName: '',
    industry: '',
    website: '',
    phone: '',
    address: '',
    city: '',
    postalCode: '',
    country: 'Deutschland'
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

  const validateStep1 = () => {
    const newErrors = {}

    if (!basicData.firstName.trim()) {
      newErrors.firstName = 'Vorname ist erforderlich'
    }

    if (!basicData.lastName.trim()) {
      newErrors.lastName = 'Nachname ist erforderlich'
    }

    if (!basicData.email.trim()) {
      newErrors.email = 'E-Mail-Adresse ist erforderlich'
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(basicData.email)) {
      newErrors.email = 'Bitte geben Sie eine gültige E-Mail-Adresse ein'
    }

    if (!basicData.password) {
      newErrors.password = 'Passwort ist erforderlich'
    } else if (basicData.password.length < 6) {
      newErrors.password = 'Passwort muss mindestens 6 Zeichen lang sein'
    }

    if (!basicData.confirmPassword) {
      newErrors.confirmPassword = 'Passwort-Bestätigung ist erforderlich'
    } else if (basicData.password !== basicData.confirmPassword) {
      newErrors.confirmPassword = 'Passwörter stimmen nicht überein'
    }

    if (!basicData.acceptTerms) {
      newErrors.acceptTerms = 'Sie müssen den AGB und der Datenschutzerklärung zustimmen'
    }

    return newErrors
  }

  const validateStep2 = () => {
    const newErrors = {}

    if (!companyData.companyName.trim()) {
      newErrors.companyName = 'Firmenname ist erforderlich'
    }

    if (!companyData.industry) {
      newErrors.industry = 'Branche ist erforderlich'
    }

    if (!companyData.phone.trim()) {
      newErrors.phone = 'Telefon ist erforderlich'
    }

    if (!companyData.address.trim()) {
      newErrors.address = 'Adresse ist erforderlich'
    }

    if (!companyData.postalCode.trim()) {
      newErrors.postalCode = 'PLZ ist erforderlich'
    }

    if (!companyData.city.trim()) {
      newErrors.city = 'Stadt ist erforderlich'
    }

    return newErrors
  }

  const handleStep1Submit = (e) => {
    e.preventDefault()
    
    const validationErrors = validateStep1()
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors)
      return
    }

    setErrors({})
    setCurrentStep(2)
  }

  const handleStep2Submit = async (e) => {
    e.preventDefault()
    
    const validationErrors = validateStep2()
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors)
      return
    }

    setIsLoading(true)
    setErrors({})

    try {
      // Combine all data
      const completeUserData = {
        email: basicData.email.toLowerCase(),
        name: `${basicData.firstName} ${basicData.lastName}`,
        firstName: basicData.firstName,
        lastName: basicData.lastName,
        password: basicData.password,
        role: 'user',
        id: Math.random().toString(36).substr(2, 9),
        registrationStep: 'completed',
        isActive: true,
        plan: 'starter',
        company: {
          name: companyData.companyName,
          industry: companyData.industry,
          website: companyData.website,
          phone: companyData.phone,
          address: {
            street: companyData.address,
            city: companyData.city,
            postalCode: companyData.postalCode,
            country: companyData.country
          }
        },
        createdAt: new Date().toISOString()
      }

      // Save to localStorage
      const existingUsers = JSON.parse(localStorage.getItem('registeredUsers') || '[]')
      
      // Check if user already exists
      const userExists = existingUsers.find(u => u.email.toLowerCase() === completeUserData.email.toLowerCase())
      if (userExists) {
        throw new Error('Ein Benutzer mit dieser E-Mail-Adresse existiert bereits.')
      }
      
      existingUsers.push(completeUserData)
      localStorage.setItem('registeredUsers', JSON.stringify(existingUsers))

      // Simulate API call
      setTimeout(() => {
        setIsLoading(false)
        onRegister(completeUserData)
      }, 1500)
      
    } catch (error) {
      setIsLoading(false)
      setErrors({ 
        general: error.message || 'Registrierung fehlgeschlagen. Bitte versuchen Sie es erneut.' 
      })
    }
  }

  const handleBasicDataChange = (e) => {
    const { name, value, type, checked } = e.target
    setBasicData({
      ...basicData,
      [name]: type === 'checkbox' ? checked : value
    })
    
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: ''
      })
    }
  }

  const handleCompanyDataChange = (e) => {
    const { name, value } = e.target
    setCompanyData({
      ...companyData,
      [name]: value
    })
    
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: ''
      })
    }
  }

  const handleIndustryChange = (value) => {
    setCompanyData({
      ...companyData,
      industry: value
    })
    
    if (errors.industry) {
      setErrors({
        ...errors,
        industry: ''
      })
    }
  }

  return (
    <section className="hero-section relative overflow-hidden px-4 sm:px-6 py-12 sm:py-16 lg:py-20 min-h-screen flex items-center justify-center">
      <div className="w-full max-w-md">
        <Card className="shadow-2xl border-0 bg-white/95 backdrop-blur-sm">
          <CardHeader className="text-center pb-6">
            <div className="w-20 h-20 mx-auto mb-4">
              <img 
                src={FullLogo} 
                alt="Social Media Kampagnen Logo" 
                className="w-full h-full object-contain"
              />
            </div>
            
            <CardTitle className="text-2xl font-bold text-gray-900">
              Konto erstellen
            </CardTitle>
            <CardDescription className="text-gray-600">
              Schritt {currentStep} von 2: {currentStep === 1 ? 'Grundlegende Informationen' : 'Firmeninformationen'}
            </CardDescription>
            
            {/* Progress indicator */}
            <div className="flex justify-center space-x-2 mt-4">
              <div className={`w-8 h-2 rounded-full ${currentStep >= 1 ? 'bg-blue-500' : 'bg-gray-200'}`}></div>
              <div className={`w-8 h-2 rounded-full ${currentStep >= 2 ? 'bg-blue-500' : 'bg-gray-200'}`}></div>
            </div>
          </CardHeader>
          
          <CardContent>
            {errors.general && (
              <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
                {errors.general}
              </div>
            )}

            {currentStep === 1 && (
              <form onSubmit={handleStep1Submit} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="firstName">Vorname *</Label>
                    <Input
                      id="firstName"
                      name="firstName"
                      type="text"
                      placeholder="Max"
                      value={basicData.firstName}
                      onChange={handleBasicDataChange}
                      className={errors.firstName ? 'border-red-500' : ''}
                    />
                    {errors.firstName && <p className="text-red-500 text-xs mt-1">{errors.firstName}</p>}
                  </div>
                  
                  <div>
                    <Label htmlFor="lastName">Nachname *</Label>
                    <Input
                      id="lastName"
                      name="lastName"
                      type="text"
                      placeholder="Mustermann"
                      value={basicData.lastName}
                      onChange={handleBasicDataChange}
                      className={errors.lastName ? 'border-red-500' : ''}
                    />
                    {errors.lastName && <p className="text-red-500 text-xs mt-1">{errors.lastName}</p>}
                  </div>
                </div>

                <div>
                  <Label htmlFor="email">E-Mail-Adresse *</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="max@unternehmen.de"
                    value={basicData.email}
                    onChange={handleBasicDataChange}
                    className={errors.email ? 'border-red-500' : ''}
                  />
                  {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
                </div>

                <div>
                  <Label htmlFor="password">Passwort *</Label>
                  <div className="relative">
                    <Input
                      id="password"
                      name="password"
                      type={showPassword ? 'text' : 'password'}
                      placeholder="Mindestens 6 Zeichen"
                      value={basicData.password}
                      onChange={handleBasicDataChange}
                      className={errors.password ? 'border-red-500 pr-10' : 'pr-10'}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                    >
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                  {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password}</p>}
                </div>

                <div>
                  <Label htmlFor="confirmPassword">Passwort bestätigen *</Label>
                  <div className="relative">
                    <Input
                      id="confirmPassword"
                      name="confirmPassword"
                      type={showConfirmPassword ? 'text' : 'password'}
                      placeholder="Passwort wiederholen"
                      value={basicData.confirmPassword}
                      onChange={handleBasicDataChange}
                      className={errors.confirmPassword ? 'border-red-500 pr-10' : 'pr-10'}
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                    >
                      {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                  {errors.confirmPassword && <p className="text-red-500 text-xs mt-1">{errors.confirmPassword}</p>}
                </div>

                <div className="flex items-start space-x-2">
                  <Checkbox
                    id="acceptTerms"
                    name="acceptTerms"
                    checked={basicData.acceptTerms}
                    onCheckedChange={(checked) => handleBasicDataChange({ target: { name: 'acceptTerms', type: 'checkbox', checked } })}
                    className={errors.acceptTerms ? 'border-red-500' : ''}
                  />
                  <Label htmlFor="acceptTerms" className="text-sm leading-5">
                    Ich akzeptiere die{' '}
                    <a href="#" className="text-blue-600 hover:underline">AGB</a>
                    {' '}und{' '}
                    <a href="#" className="text-blue-600 hover:underline">Datenschutzerklärung</a> *
                  </Label>
                </div>
                {errors.acceptTerms && <p className="text-red-500 text-xs">{errors.acceptTerms}</p>}

                <Button 
                  type="submit" 
                  className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white"
                >
                  Weiter zu Firmeninformationen
                </Button>

                <div className="text-center">
                  <span className="text-sm text-gray-600">Bereits ein Konto? </span>
                  <button
                    type="button"
                    onClick={onSwitchToLogin}
                    className="text-sm text-blue-600 hover:underline font-medium"
                  >
                    Jetzt anmelden
                  </button>
                </div>
              </form>
            )}

            {currentStep === 2 && (
              <form onSubmit={handleStep2Submit} className="space-y-4">
                <div>
                  <Label htmlFor="companyName">Firmenname *</Label>
                  <Input
                    id="companyName"
                    name="companyName"
                    type="text"
                    placeholder="Ihr Unternehmen GmbH"
                    value={companyData.companyName}
                    onChange={handleCompanyDataChange}
                    className={errors.companyName ? 'border-red-500' : ''}
                  />
                  {errors.companyName && <p className="text-red-500 text-xs mt-1">{errors.companyName}</p>}
                </div>

                <div>
                  <Label htmlFor="industry">Branche *</Label>
                  <Select value={companyData.industry} onValueChange={handleIndustryChange}>
                    <SelectTrigger className={errors.industry ? 'border-red-500' : ''}>
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
                  {errors.industry && <p className="text-red-500 text-xs mt-1">{errors.industry}</p>}
                </div>

                <div>
                  <Label htmlFor="website">Website</Label>
                  <Input
                    id="website"
                    name="website"
                    type="url"
                    placeholder="https://www.ihr-unternehmen.de"
                    value={companyData.website}
                    onChange={handleCompanyDataChange}
                  />
                </div>

                <div>
                  <Label htmlFor="phone">Telefon *</Label>
                  <Input
                    id="phone"
                    name="phone"
                    type="tel"
                    placeholder="+49 123 456789"
                    value={companyData.phone}
                    onChange={handleCompanyDataChange}
                    className={errors.phone ? 'border-red-500' : ''}
                  />
                  {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone}</p>}
                </div>

                <div>
                  <Label htmlFor="address">Adresse *</Label>
                  <Input
                    id="address"
                    name="address"
                    type="text"
                    placeholder="Musterstraße 123"
                    value={companyData.address}
                    onChange={handleCompanyDataChange}
                    className={errors.address ? 'border-red-500' : ''}
                  />
                  {errors.address && <p className="text-red-500 text-xs mt-1">{errors.address}</p>}
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="postalCode">PLZ *</Label>
                    <Input
                      id="postalCode"
                      name="postalCode"
                      type="text"
                      placeholder="12345"
                      value={companyData.postalCode}
                      onChange={handleCompanyDataChange}
                      className={errors.postalCode ? 'border-red-500' : ''}
                    />
                    {errors.postalCode && <p className="text-red-500 text-xs mt-1">{errors.postalCode}</p>}
                  </div>
                  
                  <div>
                    <Label htmlFor="city">Stadt *</Label>
                    <Input
                      id="city"
                      name="city"
                      type="text"
                      placeholder="Berlin"
                      value={companyData.city}
                      onChange={handleCompanyDataChange}
                      className={errors.city ? 'border-red-500' : ''}
                    />
                    {errors.city && <p className="text-red-500 text-xs mt-1">{errors.city}</p>}
                  </div>
                </div>

                <div className="flex space-x-3">
                  <Button 
                    type="button"
                    variant="outline"
                    onClick={() => setCurrentStep(1)}
                    className="flex-1"
                  >
                    Zurück
                  </Button>
                  
                  <Button 
                    type="submit" 
                    disabled={isLoading}
                    className="flex-1 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white"
                  >
                    {isLoading ? 'Wird erstellt...' : 'Registrierung abschließen'}
                  </Button>
                </div>
              </form>
            )}
          </CardContent>
        </Card>
      </div>
    </section>
  )
}

export default TwoStepRegistration
