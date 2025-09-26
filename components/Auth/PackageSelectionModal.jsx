import React, { useState } from 'react'
import { Button } from '../ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card'
import { Badge } from '../ui/badge'
import { Checkbox } from '../ui/checkbox'
import { Label } from '../ui/label'
import { 
  Crown, 
  Check, 
  Star, 
  Zap, 
  BarChart3, 
  Users, 
  Shield, 
  Headphones,
  X,
  Sparkles
} from 'lucide-react'

const PackageSelectionModal = ({ userData, onComplete, onSkip, isOpen }) => {
  const [selectedPlan, setSelectedPlan] = useState('')
  const [acceptTerms, setAcceptTerms] = useState(false)
  const [acceptMarketing, setAcceptMarketing] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [errors, setErrors] = useState({})

  const plans = [
    {
      id: 'standard',
      name: 'Standard',
      price: '588',
      originalPrice: '49',
      period: '12 Monate',
      description: 'Perfekt für kleine und mittlere Unternehmen',
      badge: 'FÜR STARTER',
      badgeColor: 'bg-cyan-100 text-cyan-800',
      gradient: 'from-cyan-500 to-blue-600',
      icon: Zap,
      features: [
        'Bis zu 10 Kampagnen pro Monat',
        'Alle Social Media Plattformen',
        'Live-Vorschau der Anzeigen',
        'Grundlegende Analytics',
        'E-Mail Support',
        'Kampagnen-Templates',
        'Automatische Optimierung'
      ],
      popular: false
    },
    {
      id: 'pro',
      name: 'Pro',
      price: '1.188',
      originalPrice: '99',
      period: '12 Monate',
      description: 'Für wachsende Unternehmen mit höheren Anforderungen',
      badge: 'BELIEBT',
      badgeColor: 'bg-yellow-100 text-yellow-800',
      gradient: 'from-purple-500 to-pink-600',
      icon: Crown,
      features: [
        'Unbegrenzte Kampagnen',
        'Alle Social Media Plattformen',
        'A/B Testing',
        'Erweiterte Analytics & Reports',
        'Prioritäts-Support',
        'Custom Branding',
        'API-Zugang',
        'Erweiterte Zielgruppen-Tools',
        'Automatische Budgetoptimierung'
      ],
      popular: true
    }
  ]

  const validateForm = () => {
    const newErrors = {}

    console.log('Validating form...')
    console.log('Selected plan:', selectedPlan)
    console.log('Accept terms:', acceptTerms)

    if (!selectedPlan) {
      newErrors.plan = 'Bitte wählen Sie einen Plan aus'
      console.log('Error: No plan selected')
    }

    if (!acceptTerms) {
      newErrors.terms = 'Bitte akzeptieren Sie die AGB und Datenschutzerklärung'
      console.log('Error: Terms not accepted')
    }

    console.log('Validation errors:', newErrors)
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    console.log('PackageSelectionModal: handleSubmit called')
    console.log('Selected plan:', selectedPlan)
    console.log('Accept terms:', acceptTerms)
    console.log('User data:', userData)
    
    if (!validateForm()) {
      console.log('Validation failed:', errors)
      return
    }

    setIsLoading(true)
    
    try {
      const selectedPlanData = plans.find(plan => plan.id === selectedPlan)
      console.log('Selected plan data:', selectedPlanData)
      
      // Complete user registration with selected plan
      const completeUserData = {
        ...userData,
        plan: {
          id: selectedPlan,
          name: selectedPlanData?.name || 'Standard',
          price: selectedPlanData?.price || '588',
          period: selectedPlanData?.period || '12 Monate',
          originalPrice: selectedPlanData?.originalPrice || '49'
        },
        preferences: {
          marketing: acceptMarketing
        },
        registrationStep: 'completed',
        registrationDate: new Date().toISOString(),
        planActive: true,
        planStartDate: new Date().toISOString(),
        planEndDate: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString() // 1 year from now
      }

      console.log('Complete user data:', completeUserData)

      // Save final user data to localStorage
      const existingUsers = JSON.parse(localStorage.getItem('registeredUsers') || '[]')
      const userIndex = existingUsers.findIndex(u => u.email === userData.email)
      
      if (userIndex !== -1) {
        existingUsers[userIndex] = completeUserData
      } else {
        existingUsers.push(completeUserData)
      }
      
      localStorage.setItem('registeredUsers', JSON.stringify(existingUsers))
      console.log('User data saved to localStorage')

      // Simulate API call for final registration
      setTimeout(() => {
        console.log('Registration completed, calling onComplete')
        setIsLoading(false)
        onComplete(completeUserData)
      }, 1500)
      
    } catch (error) {
      console.error('Registration error:', error)
      setIsLoading(false)
      setErrors({ general: 'Registrierung fehlgeschlagen. Bitte versuchen Sie es erneut.' })
    }
  }

  const handlePlanSelect = (planId) => {
    console.log('Plan selected:', planId)
    setSelectedPlan(planId)
    setErrors({ ...errors, plan: '' }) // Clear plan error
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto">
        <Card className="border-0 shadow-none">
          <CardHeader className="bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-t-xl">
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-2xl font-bold mb-2">
                  Schritt 3 von 3: Plan auswählen
                </CardTitle>
                <CardDescription className="text-purple-100">
                  Wählen Sie den passenden Plan für Ihr Unternehmen
                </CardDescription>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={onSkip}
                className="text-white hover:bg-white/20"
                disabled={isLoading}
              >
                <X className="w-5 h-5" />
              </Button>
            </div>
          </CardHeader>
          
          <CardContent className="p-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Error Message */}
              {errors.general && (
                <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                  <p className="text-red-600 text-sm">{errors.general}</p>
                </div>
              )}

              {/* Plan Selection */}
              <div className="space-y-6">
                <div className="text-center">
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    Wählen Sie Ihren Plan
                  </h3>
                  <p className="text-gray-600">
                    Alle Pläne beinhalten eine 30-tägige Geld-zurück-Garantie
                  </p>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {plans.map((plan) => {
                    const IconComponent = plan.icon
                    const isSelected = selectedPlan === plan.id
                    
                    return (
                      <div
                        key={plan.id}
                        className={`relative cursor-pointer transition-all duration-300 ${
                          isSelected 
                            ? 'transform scale-105 shadow-2xl' 
                            : 'hover:transform hover:scale-102'
                        }`}
                        onClick={() => handlePlanSelect(plan.id)}
                      >
                        <Card className={`h-full bg-gradient-to-br ${plan.gradient} text-white border-0 shadow-xl hover:shadow-2xl transition-all duration-300 ${
                          plan.popular ? 'ring-4 ring-yellow-300' : ''
                        }`}>
                          {plan.popular && (
                            <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                              <Badge className="bg-yellow-400 text-yellow-900 border-yellow-500 text-sm font-bold px-4 py-2 animate-pulse">
                                <Star className="w-4 h-4 mr-1" />
                                {plan.badge}
                              </Badge>
                            </div>
                          )}
                          
                          <CardHeader className="text-center pb-4 pt-8">
                            <div className="flex justify-center mb-4">
                              <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                                <IconComponent className="w-6 h-6 text-white" />
                              </div>
                            </div>
                            <CardTitle className="text-2xl font-bold mb-2">{plan.name}</CardTitle>
                            <div className="text-4xl font-bold text-yellow-300 mb-2">
                              €{plan.originalPrice}
                            </div>
                            <p className="text-white/80 text-sm">pro Monat</p>
                            <div className="bg-white/20 rounded-lg p-3 mt-3">
                              <p className="text-white text-sm font-semibold">
                                Jahresabrechnung: €{plan.price}
                              </p>
                              <p className="text-white/80 text-xs">
                                zzgl. 19% MwSt. • 12 Monate Laufzeit
                              </p>
                              <p className="text-white/80 text-xs">
                                Gesamtsumme: €{Math.round(parseFloat(plan.price.replace('.', '')) * 1.19)} inkl. MwSt.
                              </p>
                            </div>
                            <p className="text-white/90 text-sm mt-2">{plan.description}</p>
                          </CardHeader>
                          
                          <CardContent className="space-y-4">
                            <div className="space-y-3">
                              {plan.features.map((feature, index) => (
                                <div key={index} className="flex items-center space-x-3">
                                  <div className="w-5 h-5 bg-white/20 rounded-full flex items-center justify-center flex-shrink-0">
                                    <Check className="w-3 h-3 text-white" />
                                  </div>
                                  <span className="text-white/90 text-sm">{feature}</span>
                                </div>
                              ))}
                            </div>
                            
                            <div className="pt-4">
                              <div className={`w-full h-12 rounded-lg border-2 transition-all duration-300 flex items-center justify-center ${
                                isSelected 
                                  ? 'border-white bg-white text-purple-600 font-semibold' 
                                  : 'border-white/30 bg-white/10 text-white hover:bg-white/20'
                              }`}>
                                {isSelected ? (
                                  <div className="flex items-center space-x-2">
                                    <Check className="w-5 h-5" />
                                    <span>Ausgewählt</span>
                                  </div>
                                ) : (
                                  <span>Plan auswählen</span>
                                )}
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      </div>
                    )
                  })}
                </div>
                
                {errors.plan && (
                  <p className="text-sm text-red-500 text-center">{errors.plan}</p>
                )}
              </div>

              {/* Terms and Conditions */}
              <div className="space-y-4 bg-gray-50 p-6 rounded-lg">
                <h3 className="text-lg font-semibold text-gray-900 flex items-center">
                  <Shield className="w-5 h-5 mr-2 text-purple-600" />
                  Rechtliche Bestimmungen
                </h3>
                
                <div className="space-y-3">
                  <div className="flex items-start space-x-3">
                    <Checkbox
                      id="acceptTerms"
                      checked={acceptTerms}
                      onCheckedChange={(checked) => {
                        console.log('Terms checkbox changed:', checked)
                        setAcceptTerms(checked)
                        setErrors({ ...errors, terms: '' }) // Clear terms error
                      }}
                      className={errors.terms ? 'border-red-500' : ''}
                      disabled={isLoading}
                    />
                    <Label htmlFor="acceptTerms" className="text-sm text-gray-700 leading-relaxed">
                      Ich akzeptiere die{' '}
                      <a href="#" className="text-purple-600 hover:underline font-medium">
                        Allgemeinen Geschäftsbedingungen
                      </a>{' '}
                      und die{' '}
                      <a href="#" className="text-purple-600 hover:underline font-medium">
                        Datenschutzerklärung
                      </a>
                      . Mir ist bewusst, dass der gewählte Plan für 12 Monate im Voraus berechnet wird.
                    </Label>
                  </div>
                  
                  {errors.terms && (
                    <p className="text-sm text-red-500 ml-6">{errors.terms}</p>
                  )}

                  <div className="flex items-start space-x-3">
                    <Checkbox
                      id="acceptMarketing"
                      checked={acceptMarketing}
                      onCheckedChange={setAcceptMarketing}
                      disabled={isLoading}
                    />
                    <Label htmlFor="acceptMarketing" className="text-sm text-gray-700 leading-relaxed">
                      Ich möchte über neue Features, Tipps und Angebote per E-Mail informiert werden (optional)
                    </Label>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4">
                <Button
                  type="submit"
                  disabled={isLoading}
                  className="flex-1 h-12 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-semibold text-base"
                >
                  {isLoading ? (
                    <div className="flex items-center space-x-2">
                      <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                      <span>Konto wird erstellt...</span>
                    </div>
                  ) : (
                    <div className="flex items-center space-x-2">
                      <Sparkles className="w-5 h-5" />
                      <span>Registrierung abschließen</span>
                    </div>
                  )}
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  onClick={onSkip}
                  disabled={isLoading}
                  className="h-12 px-6 border-gray-300 text-gray-700 hover:bg-gray-50"
                >
                  Plan später wählen
                </Button>
              </div>
            </form>

            {/* Additional Information */}
            <div className="mt-6 text-center space-y-2">
              <p className="text-xs text-gray-500">
                Sie können Ihren Plan jederzeit in den Kontoeinstellungen ändern.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Badge className="bg-green-100 text-green-800 text-xs">
                  <Check className="w-3 h-3 mr-1" />
                  30 Tage Geld-zurück-Garantie
                </Badge>
                <Badge className="bg-blue-100 text-blue-800 text-xs">
                  <Shield className="w-3 h-3 mr-1" />
                  DSGVO-konform
                </Badge>
                <Badge className="bg-purple-100 text-purple-800 text-xs">
                  <Headphones className="w-3 h-3 mr-1" />
                  Deutscher Support
                </Badge>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default PackageSelectionModal
