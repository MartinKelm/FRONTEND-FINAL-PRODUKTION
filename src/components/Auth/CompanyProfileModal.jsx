import React, { useState } from 'react'
import { Button } from '../ui/button'
import { Input } from '../ui/input'
import { Label } from '../ui/label'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card'
import { Badge } from '../ui/badge'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select'
import { Textarea } from '../ui/textarea'
import { Building, Phone, MapPin, Globe, Users, Briefcase, X } from 'lucide-react'

const CompanyProfileModal = ({ userData, onComplete, onSkip, isOpen }) => {
  const [formData, setFormData] = useState({
    companyName: '',
    industry: '',
    website: '',
    phone: '',
    address: '',
    city: '',
    postalCode: '',
    country: 'Deutschland',
    description: ''
  })
  const [isLoading, setIsLoading] = useState(false)
  const [errors, setErrors] = useState({})

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

  const companySizes = [
    '1-10 Mitarbeiter',
    '11-50 Mitarbeiter',
    '51-200 Mitarbeiter',
    '201-500 Mitarbeiter',
    '501-1000 Mitarbeiter',
    '1000+ Mitarbeiter'
  ]

  const validateForm = () => {
    const newErrors = {}

    if (!formData.companyName.trim()) {
      newErrors.companyName = 'Firmenname ist erforderlich'
    }

    if (!formData.industry) {
      newErrors.industry = 'Branche ist erforderlich'
    }

    // Address fields are now required for billing
    if (!formData.address.trim()) {
      newErrors.address = 'Adresse ist für die Rechnungsstellung erforderlich'
    }

    if (!formData.city.trim()) {
      newErrors.city = 'Stadt ist für die Rechnungsstellung erforderlich'
    }

    if (!formData.postalCode.trim()) {
      newErrors.postalCode = 'PLZ ist für die Rechnungsstellung erforderlich'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }it = async (e) => {
    e.preventDefault()
    
    if (!validateForm()) return

    setIsLoading(true)
    
    try {
      // Combine user data with company profile
      const completeUserData = {
        ...userData,
        company: {
          name: formData.companyName,
          industry: formData.industry,
          website: formData.website,
          phone: formData.phone,
          address: {
            street: formData.address,
            city: formData.city,
            postalCode: formData.postalCode,
            country: formData.country
          },
          description: formData.description
        },
        registrationStep: 'package_selection'
      }

      // Save updated user data to localStorage
      const existingUsers = JSON.parse(localStorage.getItem('registeredUsers') || '[]')
      const userIndex = existingUsers.findIndex(u => u.email === userData.email)
      
      if (userIndex !== -1) {
        existingUsers[userIndex] = completeUserData
        localStorage.setItem('registeredUsers', JSON.stringify(existingUsers))
      }

      // Simulate API call
      setTimeout(() => {
        setIsLoading(false)
        onComplete(completeUserData)
      }, 1500)
      
    } catch (error) {
      setIsLoading(false)
      setErrors({ general: 'Speichern fehlgeschlagen. Bitte versuchen Sie es erneut.' })
    }
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value
    })
    
    // Remove error when field is filled
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: ''
      })
    }
  }

  const handleSelectChange = (name, value) => {
    setFormData({
      ...formData,
      [name]: value
    })
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: ''
      })
    }
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <div className="w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <Card className="shadow-2xl border-0 bg-white">
          <CardHeader className="text-center pb-4 relative">
            <button
              onClick={onSkip}
              className="absolute right-4 top-4 text-gray-400 hover:text-gray-600 transition-colors"
              disabled={isLoading}
            >
              <X className="w-5 h-5" />
            </button>
            <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <Building className="w-8 h-8 text-white" />
            </div>
            <CardTitle className="text-2xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
              Firmenprofil vervollständigen
            </CardTitle>
            <CardDescription className="text-gray-600">
              Schritt 2 von 3: Firmeninformationen für bessere Kampagnen
            </CardDescription>
            <div className="flex justify-center mt-4">
              <div className="flex space-x-2">
                <div className="w-8 h-2 bg-green-500 rounded-full"></div>
                <div className="w-8 h-2 bg-green-500 rounded-full"></div>
                <div className="w-8 h-2 bg-gray-200 rounded-full"></div>
              </div>
            </div>
            <div className="flex flex-wrap gap-2 justify-center mt-4">
              <Badge className="bg-green-100 text-green-800">🎯 Bessere Zielgruppen</Badge>
              <Badge className="bg-blue-100 text-blue-800">📊 Optimierte Kampagnen</Badge>
            </div>
          </CardHeader>
          
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              {errors.general && (
                <div className="p-3 bg-red-50 border border-red-200 rounded-md">
                  <p className="text-sm text-red-600">{errors.general}</p>
                </div>
              )}

              {/* Basic Company Information */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-900 flex items-center">
                  <Building className="w-5 h-5 mr-2 text-green-600" />
                  Grundlegende Informationen
                </h3>
                
                <div className="space-y-2">
                  <Label htmlFor="companyName" className="text-sm font-medium text-gray-700">
                    Firmenname *
                  </Label>
                  <Input
                    id="companyName"
                    name="companyName"
                    value={formData.companyName}
                    onChange={handleChange}
                    className={`h-12 ${errors.companyName ? 'border-red-500' : 'border-gray-300'} focus:border-green-500 focus:ring-green-500`}
                    placeholder="Ihr Unternehmen GmbH"
                    disabled={isLoading}
                  />
                  {errors.companyName && <p className="text-xs text-red-500">{errors.companyName}</p>}
                </div>

                <div className="space-y-2">
                  <Label className="text-sm font-medium text-gray-700">
                    Branche *
                  </Label>
                  <Select onValueChange={(value) => handleSelectChange('industry', value)} disabled={isLoading}>
                    <SelectTrigger className={`h-12 ${errors.industry ? 'border-red-500' : 'border-gray-300'}`}>
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
                  {errors.industry && <p className="text-xs text-red-500">{errors.industry}</p>}
                </div>
              </div>

              {/* Contact Information */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-900 flex items-center">
                  <Phone className="w-5 h-5 mr-2 text-green-600" />
                  Kontaktinformationen
                </h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="website" className="text-sm font-medium text-gray-700">
                      Website (optional)
                    </Label>
                    <div className="relative">
                      <Globe className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                      <Input
                        id="website"
                        name="website"
                        value={formData.website}
                        onChange={handleChange}
                        className="pl-10 h-12 border-gray-300 focus:border-green-500 focus:ring-green-500"
                        placeholder="https://www.beispiel.de"
                        disabled={isLoading}
                      />
                    </div>
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
                        className="pl-10 h-12 border-gray-300 focus:border-green-500 focus:ring-green-500"
                        placeholder="+49 123 456789"
                        disabled={isLoading}
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Address Information */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-900 flex items-center">
                  <MapPin className="w-5 h-5 mr-2 text-green-600" />
                  Rechnungsadresse *
                </h3>
                <p className="text-sm text-gray-600">
                  Erforderlich für die Rechnungsstellung
                </p>
                
                <div className="space-y-2">
                  <Label htmlFor="address" className="text-sm font-medium text-gray-700">
                    Straße und Hausnummer *
                  </Label>
                  <Input
                    id="address"
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    className={`h-12 border-gray-300 focus:border-green-500 focus:ring-green-500 ${errors.address ? 'border-red-500' : ''}`}
                    placeholder="Musterstraße 123"
                    disabled={isLoading}
                    required
                  />
                  {errors.address && (
                    <p className="text-red-500 text-sm">{errors.address}</p>
                  )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="postalCode" className="text-sm font-medium text-gray-700">
                      PLZ *
                    </Label>
                    <Input
                      id="postalCode"
                      name="postalCode"
                      value={formData.postalCode}
                      onChange={handleChange}
                      className={`h-12 border-gray-300 focus:border-green-500 focus:ring-green-500 ${errors.postalCode ? 'border-red-500' : ''}`}
                      placeholder="12345"
                      disabled={isLoading}
                      required
                    />
                    {errors.postalCode && (
                      <p className="text-red-500 text-sm">{errors.postalCode}</p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="city" className="text-sm font-medium text-gray-700">
                      Stadt *
                    </Label>
                    <Input
                      id="city"
                      name="city"
                      value={formData.city}
                      onChange={handleChange}
                      className={`h-12 border-gray-300 focus:border-green-500 focus:ring-green-500 ${errors.city ? 'border-red-500' : ''}`}
                      placeholder="Berlin"
                      disabled={isLoading}
                      required
                    />
                    {errors.city && (
                      <p className="text-red-500 text-sm">{errors.city}</p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="country" className="text-sm font-medium text-gray-700">
                      Land
                    </Label>
                    <Input
                      id="country"
                      name="country"
                      value={formData.country}
                      onChange={handleChange}
                      className="h-12 border-gray-300 focus:border-green-500 focus:ring-green-500"
                      disabled={isLoading}
                    />
                  </div>
                </div>
              </div>

              {/* Company Description */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-900 flex items-center">
                  <Briefcase className="w-5 h-5 mr-2 text-green-600" />
                  Unternehmensbeschreibung (optional)
                </h3>
                
                <div className="space-y-2">
                  <Label htmlFor="description" className="text-sm font-medium text-gray-700">
                    Beschreiben Sie Ihr Unternehmen
                  </Label>
                  <Textarea
                    id="description"
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    className="min-h-[100px] border-gray-300 focus:border-green-500 focus:ring-green-500"
                    placeholder="Was macht Ihr Unternehmen? Welche Produkte oder Dienstleistungen bieten Sie an?"
                    disabled={isLoading}
                  />
                  <p className="text-xs text-gray-500">
                    Diese Informationen helfen uns, bessere Kampagnenvorschläge zu erstellen.
                  </p>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 pt-4">
                <Button
                  type="submit"
                  disabled={isLoading}
                  className="flex-1 h-12 bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white font-semibold text-base"
                >
                  {isLoading ? 'Wird gespeichert...' : 'Weiter zur Planauswahl'}
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  onClick={onSkip}
                  disabled={isLoading}
                  className="h-12 px-6 border-gray-300 text-gray-700 hover:bg-gray-50"
                >
                  Später vervollständigen
                </Button>
              </div>
            </form>

            <div className="mt-4 text-center">
              <p className="text-xs text-gray-500">
                Sie können diese Informationen jederzeit in Ihren Kontoeinstellungen ändern.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default CompanyProfileModal
