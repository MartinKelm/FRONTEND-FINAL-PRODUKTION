import React, { useState } from 'react'
import { Button } from '../ui/button'
import { Input } from '../ui/input'
import { Label } from '../ui/label'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card'
import { Eye, EyeOff, ArrowLeft, ArrowRight, CheckCircle, AlertCircle } from 'lucide-react'
import apiService from '../../services/api'

const TwoStepRegistrationAPI = ({ onSuccess, onCancel }) => {
  const [currentStep, setCurrentStep] = useState(1)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)

  // Form data for both steps
  const [formData, setFormData] = useState({
    // Step 1: Basic information
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    acceptTerms: false,
    
    // Step 2: Company information
    companyName: '',
    industry: '',
    website: '',
    phone: '',
    address: '',
    postalCode: '',
    city: ''
  })

  // Industry options
  const industries = [
    'Technologie & Software',
    'E-Commerce & Handel',
    'Marketing & Werbung',
    'Gesundheitswesen',
    'Bildung & Training',
    'Finanzdienstleistungen',
    'Immobilien',
    'Gastronomie & Tourismus',
    'Automotive',
    'Beratung & Services',
    'Produktion & Fertigung',
    'Sonstiges'
  ]

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }))
    setError('')
  }

  const validateStep1 = () => {
    const errors = []
    
    if (!formData.firstName.trim()) errors.push('Vorname ist erforderlich')
    if (!formData.lastName.trim()) errors.push('Nachname ist erforderlich')
    if (!formData.email.trim()) errors.push('E-Mail ist erforderlich')
    if (!formData.password) errors.push('Passwort ist erforderlich')
    if (!formData.confirmPassword) errors.push('Passwort-Bestätigung ist erforderlich')
    if (formData.password !== formData.confirmPassword) errors.push('Passwörter stimmen nicht überein')
    if (!formData.acceptTerms) errors.push('AGB müssen akzeptiert werden')
    
    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (formData.email && !emailRegex.test(formData.email)) {
      errors.push('Ungültige E-Mail-Adresse')
    }
    
    // Password validation
    if (formData.password && formData.password.length < 8) {
      errors.push('Passwort muss mindestens 8 Zeichen lang sein')
    }
    
    return errors
  }

  const validateStep2 = () => {
    const errors = []
    
    if (!formData.companyName.trim()) errors.push('Firmenname ist erforderlich')
    if (!formData.industry) errors.push('Branche ist erforderlich')
    if (!formData.phone.trim()) errors.push('Telefon ist erforderlich')
    if (!formData.address.trim()) errors.push('Adresse ist erforderlich')
    if (!formData.postalCode.trim()) errors.push('PLZ ist erforderlich')
    if (!formData.city.trim()) errors.push('Stadt ist erforderlich')
    
    // Phone validation
    const phoneRegex = /^[\+]?[0-9\s\-\(\)]{7,20}$/
    if (formData.phone && !phoneRegex.test(formData.phone)) {
      errors.push('Ungültiges Telefonnummer-Format')
    }
    
    // Postal code validation (German format)
    const postalCodeRegex = /^[0-9]{5}$/
    if (formData.postalCode && !postalCodeRegex.test(formData.postalCode)) {
      errors.push('PLZ muss 5 Ziffern enthalten')
    }
    
    return errors
  }

  const handleNextStep = () => {
    const errors = validateStep1()
    if (errors.length > 0) {
      setError(errors.join(', '))
      return
    }
    
    setCurrentStep(2)
    setError('')
  }

  const handlePreviousStep = () => {
    setCurrentStep(1)
    setError('')
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    const errors = validateStep2()
    if (errors.length > 0) {
      setError(errors.join(', '))
      return
    }

    setIsLoading(true)
    setError('')

    try {
      // Prepare data for API
      const registrationData = {
        firstName: formData.firstName.trim(),
        lastName: formData.lastName.trim(),
        email: formData.email.trim().toLowerCase(),
        password: formData.password,
        companyName: formData.companyName.trim(),
        industry: formData.industry,
        website: formData.website.trim() || undefined,
        phone: formData.phone.trim(),
        address: formData.address.trim(),
        postalCode: formData.postalCode.trim(),
        city: formData.city.trim()
      }

      // Call API
      const response = await apiService.register(registrationData)

      if (response.success) {
        // Registration successful
        onSuccess({
          message: 'Registrierung erfolgreich abgeschlossen! Sie können sich jetzt anmelden.',
          user: response.data.user
        })
      } else {
        setError(response.message || 'Registrierung fehlgeschlagen')
      }

    } catch (error) {
      console.error('Registration error:', error)
      setError(error.message || 'Ein Fehler ist bei der Registrierung aufgetreten')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-600 via-purple-700 to-pink-600 flex items-center justify-center p-4">
      <Card className="w-full max-w-md bg-white/95 backdrop-blur-sm shadow-2xl">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold text-gray-900">
            Registrierung
          </CardTitle>
          <CardDescription className="text-gray-600">
            Schritt {currentStep} von 2: {currentStep === 1 ? 'Grundlegende Informationen' : 'Firmeninformationen'}
          </CardDescription>
          
          {/* Progress Bar */}
          <div className="w-full bg-gray-200 rounded-full h-2 mt-4">
            <div 
              className="bg-gradient-to-r from-purple-600 to-pink-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${(currentStep / 2) * 100}%` }}
            ></div>
          </div>
        </CardHeader>

        <CardContent>
          <form onSubmit={currentStep === 1 ? (e) => { e.preventDefault(); handleNextStep(); } : handleSubmit} className="space-y-4">
            
            {/* Step 1: Basic Information */}
            {currentStep === 1 && (
              <>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="firstName">Vorname *</Label>
                    <Input
                      id="firstName"
                      type="text"
                      placeholder="Max"
                      value={formData.firstName}
                      onChange={(e) => handleInputChange('firstName', e.target.value)}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lastName">Nachname *</Label>
                    <Input
                      id="lastName"
                      type="text"
                      placeholder="Mustermann"
                      value={formData.lastName}
                      onChange={(e) => handleInputChange('lastName', e.target.value)}
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">E-Mail-Adresse *</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="max@unternehmen.de"
                    value={formData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="password">Passwort *</Label>
                  <div className="relative">
                    <Input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="Mindestens 8 Zeichen"
                      value={formData.password}
                      onChange={(e) => handleInputChange('password', e.target.value)}
                      required
                    />
                    <button
                      type="button"
                      className="absolute inset-y-0 right-0 pr-3 flex items-center"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? (
                        <EyeOff className="h-4 w-4 text-gray-400" />
                      ) : (
                        <Eye className="h-4 w-4 text-gray-400" />
                      )}
                    </button>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="confirmPassword">Passwort bestätigen *</Label>
                  <div className="relative">
                    <Input
                      id="confirmPassword"
                      type={showConfirmPassword ? "text" : "password"}
                      placeholder="Passwort wiederholen"
                      value={formData.confirmPassword}
                      onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
                      required
                    />
                    <button
                      type="button"
                      className="absolute inset-y-0 right-0 pr-3 flex items-center"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    >
                      {showConfirmPassword ? (
                        <EyeOff className="h-4 w-4 text-gray-400" />
                      ) : (
                        <Eye className="h-4 w-4 text-gray-400" />
                      )}
                    </button>
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id="acceptTerms"
                    checked={formData.acceptTerms}
                    onChange={(e) => handleInputChange('acceptTerms', e.target.checked)}
                    className="rounded border-gray-300"
                    required
                  />
                  <Label htmlFor="acceptTerms" className="text-sm">
                    Ich akzeptiere die <a href="/agb" className="text-purple-600 hover:underline">AGB</a> und <a href="/datenschutz" className="text-purple-600 hover:underline">Datenschutzerklärung</a> *
                  </Label>
                </div>
              </>
            )}

            {/* Step 2: Company Information */}
            {currentStep === 2 && (
              <>
                <div className="space-y-2">
                  <Label htmlFor="companyName">Firmenname *</Label>
                  <Input
                    id="companyName"
                    type="text"
                    placeholder="Mustermann GmbH"
                    value={formData.companyName}
                    onChange={(e) => handleInputChange('companyName', e.target.value)}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="industry">Branche *</Label>
                  <select
                    id="industry"
                    value={formData.industry}
                    onChange={(e) => handleInputChange('industry', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                    required
                  >
                    <option value="">Branche auswählen</option>
                    {industries.map((industry) => (
                      <option key={industry} value={industry}>
                        {industry}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="website">Website</Label>
                  <Input
                    id="website"
                    type="url"
                    placeholder="https://www.unternehmen.de"
                    value={formData.website}
                    onChange={(e) => handleInputChange('website', e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phone">Telefon *</Label>
                  <Input
                    id="phone"
                    type="tel"
                    placeholder="+49 30 12345678"
                    value={formData.phone}
                    onChange={(e) => handleInputChange('phone', e.target.value)}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="address">Adresse *</Label>
                  <Input
                    id="address"
                    type="text"
                    placeholder="Musterstraße 123"
                    value={formData.address}
                    onChange={(e) => handleInputChange('address', e.target.value)}
                    required
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="postalCode">PLZ *</Label>
                    <Input
                      id="postalCode"
                      type="text"
                      placeholder="12345"
                      value={formData.postalCode}
                      onChange={(e) => handleInputChange('postalCode', e.target.value)}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="city">Stadt *</Label>
                    <Input
                      id="city"
                      type="text"
                      placeholder="Berlin"
                      value={formData.city}
                      onChange={(e) => handleInputChange('city', e.target.value)}
                      required
                    />
                  </div>
                </div>
              </>
            )}

            {/* Error Message */}
            {error && (
              <div className="flex items-center space-x-2 text-red-600 bg-red-50 p-3 rounded-md">
                <AlertCircle className="h-4 w-4" />
                <span className="text-sm">{error}</span>
              </div>
            )}

            {/* Navigation Buttons */}
            <div className="flex justify-between pt-4">
              {currentStep === 1 ? (
                <Button
                  type="button"
                  variant="outline"
                  onClick={onCancel}
                  className="flex items-center space-x-2"
                >
                  <span>Abbrechen</span>
                </Button>
              ) : (
                <Button
                  type="button"
                  variant="outline"
                  onClick={handlePreviousStep}
                  className="flex items-center space-x-2"
                >
                  <ArrowLeft className="h-4 w-4" />
                  <span>Zurück</span>
                </Button>
              )}

              {currentStep === 1 ? (
                <Button
                  type="submit"
                  className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 flex items-center space-x-2"
                >
                  <span>Weiter zu Firmeninformationen</span>
                  <ArrowRight className="h-4 w-4" />
                </Button>
              ) : (
                <Button
                  type="submit"
                  disabled={isLoading}
                  className="bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 flex items-center space-x-2"
                >
                  {isLoading ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                      <span>Registrierung läuft...</span>
                    </>
                  ) : (
                    <>
                      <CheckCircle className="h-4 w-4" />
                      <span>Registrierung abschließen</span>
                    </>
                  )}
                </Button>
              )}
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}

export default TwoStepRegistrationAPI
