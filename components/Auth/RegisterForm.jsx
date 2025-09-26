import React, { useState } from 'react'
import { Button } from '../ui/button'
import { Input } from '../ui/input'
import { Label } from '../ui/label'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card'
import { Badge } from '../ui/badge'
import { Checkbox } from '../ui/checkbox'
import { Eye, EyeOff, Mail, Lock, User, Building, Phone } from 'lucide-react'
import { saveUser } from '../../utils/userStorage'

const RegisterForm = ({ onRegister, onSwitchToLogin }) => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    company: '',
    phone: '',
    acceptTerms: false,
    acceptMarketing: false
  })
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [errors, setErrors] = useState({})

  const validateForm = () => {
    const newErrors = {}

    if (!formData.firstName.trim()) newErrors.firstName = 'Vorname ist erforderlich'
    if (!formData.lastName.trim()) newErrors.lastName = 'Nachname ist erforderlich'
    if (!formData.email.trim()) newErrors.email = 'E-Mail ist erforderlich'
    if (!formData.email.includes('@')) newErrors.email = 'Gültige E-Mail erforderlich'
    if (!formData.password) newErrors.password = 'Passwort ist erforderlich'
    if (formData.password.length < 6) newErrors.password = 'Passwort muss mindestens 6 Zeichen haben'
    if (formData.password !== formData.confirmPassword) newErrors.confirmPassword = 'Passwörter stimmen nicht überein'
    if (!formData.company.trim()) newErrors.company = 'Firmenname ist erforderlich'
    if (!formData.acceptTerms) newErrors.acceptTerms = 'AGB müssen akzeptiert werden'

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (!validateForm()) return

    setIsLoading(true)
    
    try {
      // Create user object with all form data
      const userData = {
        firstName: formData.firstName,
        lastName: formData.lastName,
        name: `${formData.firstName} ${formData.lastName}`,
        email: formData.email,
        password: formData.password,
        company: formData.company,
        phone: formData.phone || '',
        plan: null, // Plan will be selected after first login
        role: 'user',
        acceptMarketing: formData.acceptMarketing,
        registrationStep: 'plan_selection', // Mark that user needs to select a plan
        createdAt: new Date().toISOString(),
        needsPlanSelection: true // Flag to indicate plan selection is needed
      }
      
      // Save user to localStorage
      const result = await saveUser(userData)
      
      if (result.success) {
        // Return user data to parent component (without password)
        const { password, ...userDataWithoutPassword } = result.user
        onRegister(userDataWithoutPassword)
      } else {
        // Handle error (e.g., email already exists)
        if (result.error.includes('already exists')) {
          setErrors({
            ...errors,
            email: 'Diese E-Mail-Adresse wird bereits verwendet'
          })
        } else {
          setErrors({
            ...errors,
            general: 'Registrierung fehlgeschlagen. Bitte versuchen Sie es erneut.'
          })
        }
        setIsLoading(false)
      }
    } catch (error) {
      console.error('Registration error:', error)
      setErrors({
        ...errors,
        general: 'Ein unerwarteter Fehler ist aufgetreten. Bitte versuchen Sie es erneut.'
      })
      setIsLoading(false)
    }
  }

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    })
    
    // Entferne Fehler wenn Feld ausgefüllt wird
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: ''
      })
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-600 via-purple-500 to-pink-400 flex items-center justify-center p-4">
      <div className="w-full max-w-2xl">
        <Card className="shadow-2xl border-0 bg-white/95 backdrop-blur-sm">
          <CardHeader className="text-center pb-4">
            <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <User className="w-8 h-8 text-white" />
            </div>
            <CardTitle className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Konto erstellen
            </CardTitle>
            <CardDescription className="text-gray-600">
              Starten Sie noch heute mit Ihren Social Media Kampagnen
            </CardDescription>
            <div className="flex flex-wrap gap-2 justify-center mt-4">
              <Badge className="bg-blue-100 text-blue-800">🚀 Sofort starten</Badge>
              <Badge className="bg-purple-100 text-purple-800">💎 Keine Einrichtungsgebühr</Badge>
            </div>
          </CardHeader>
          
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              {errors.general && (
                <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
                  {errors.general}
                </div>
              )}
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="firstName" className="text-sm font-medium text-gray-700">
                    Vorname *
                  </Label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <Input
                      id="firstName"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleChange}
                      className={`pl-10 h-12 ${errors.firstName ? 'border-red-500' : 'border-gray-300'} focus:border-blue-500 focus:ring-blue-500`}
                      placeholder="Max"
                    />
                  </div>
                  {errors.firstName && <p className="text-xs text-red-500">{errors.firstName}</p>}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="lastName" className="text-sm font-medium text-gray-700">
                    Nachname *
                  </Label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <Input
                      id="lastName"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleChange}
                      className={`pl-10 h-12 ${errors.lastName ? 'border-red-500' : 'border-gray-300'} focus:border-blue-500 focus:ring-blue-500`}
                      placeholder="Mustermann"
                    />
                  </div>
                  {errors.lastName && <p className="text-xs text-red-500">{errors.lastName}</p>}
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="email" className="text-sm font-medium text-gray-700">
                  E-Mail-Adresse *
                </Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    className={`pl-10 h-12 ${errors.email ? 'border-red-500' : 'border-gray-300'} focus:border-blue-500 focus:ring-blue-500`}
                    placeholder="max@unternehmen.de"
                  />
                </div>
                {errors.email && <p className="text-xs text-red-500">{errors.email}</p>}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="password" className="text-sm font-medium text-gray-700">
                    Passwort *
                  </Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <Input
                      id="password"
                      name="password"
                      type={showPassword ? 'text' : 'password'}
                      value={formData.password}
                      onChange={handleChange}
                      className={`pl-10 pr-10 h-12 ${errors.password ? 'border-red-500' : 'border-gray-300'} focus:border-blue-500 focus:ring-blue-500`}
                      placeholder="Mindestens 6 Zeichen"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                    >
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                  {errors.password && <p className="text-xs text-red-500">{errors.password}</p>}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="confirmPassword" className="text-sm font-medium text-gray-700">
                    Passwort bestätigen *
                  </Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <Input
                      id="confirmPassword"
                      name="confirmPassword"
                      type={showConfirmPassword ? 'text' : 'password'}
                      value={formData.confirmPassword}
                      onChange={handleChange}
                      className={`pl-10 pr-10 h-12 ${errors.confirmPassword ? 'border-red-500' : 'border-gray-300'} focus:border-blue-500 focus:ring-blue-500`}
                      placeholder="Passwort wiederholen"
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                    >
                      {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                  {errors.confirmPassword && <p className="text-xs text-red-500">{errors.confirmPassword}</p>}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="company" className="text-sm font-medium text-gray-700">
                    Firmenname *
                  </Label>
                  <div className="relative">
                    <Building className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <Input
                      id="company"
                      name="company"
                      value={formData.company}
                      onChange={handleChange}
                      className={`pl-10 h-12 ${errors.company ? 'border-red-500' : 'border-gray-300'} focus:border-blue-500 focus:ring-blue-500`}
                      placeholder="Ihr Unternehmen GmbH"
                    />
                  </div>
                  {errors.company && <p className="text-xs text-red-500">{errors.company}</p>}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phone" className="text-sm font-medium text-gray-700">
                    Telefon (optional)
                  </Label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <Input
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className="pl-10 h-12 border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                      placeholder="+49 123 456789"
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex items-start space-x-2">
                  <Checkbox
                    id="acceptTerms"
                    name="acceptTerms"
                    checked={formData.acceptTerms}
                    onCheckedChange={(checked) => handleChange({ target: { name: 'acceptTerms', type: 'checkbox', checked } })}
                    className={errors.acceptTerms ? 'border-red-500' : ''}
                  />
                  <Label htmlFor="acceptTerms" className="text-sm text-gray-700 leading-relaxed">
                    Ich akzeptiere die <a href="#" className="text-blue-600 hover:underline">AGB</a> und <a href="#" className="text-blue-600 hover:underline">Datenschutzerklärung</a> *
                  </Label>
                </div>
                {errors.acceptTerms && <p className="text-xs text-red-500 ml-6">{errors.acceptTerms}</p>}

                <div className="flex items-start space-x-2">
                  <Checkbox
                    id="acceptMarketing"
                    name="acceptMarketing"
                    checked={formData.acceptMarketing}
                    onCheckedChange={(checked) => handleChange({ target: { name: 'acceptMarketing', type: 'checkbox', checked } })}
                  />
                  <Label htmlFor="acceptMarketing" className="text-sm text-gray-700 leading-relaxed">
                    Ich möchte Updates und Marketing-Informationen erhalten (optional)
                  </Label>
                </div>
              </div>

              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 text-sm text-blue-700">
                <p className="font-medium">Nach der Registrierung:</p>
                <p>Sie können nach dem ersten Login Ihren gewünschten Plan auswählen.</p>
              </div>

              <Button
                type="submit"
                disabled={isLoading}
                className="w-full h-12 bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white font-semibold text-base"
              >
                {isLoading ? (
                  <div className="flex items-center justify-center space-x-2">
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    <span>Konto wird erstellt...</span>
                  </div>
                ) : (
                  'Konto erstellen'
                )}
              </Button>
            </form>

            <div className="mt-6 text-center">
              <button
                onClick={onSwitchToLogin}
                className="text-sm text-blue-600 hover:text-blue-700 font-medium"
              >
                Bereits ein Konto? Jetzt anmelden
              </button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default RegisterForm
