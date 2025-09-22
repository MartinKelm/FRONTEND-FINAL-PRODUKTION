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
      gradient: 'from-purple-600 to-pink-600',
      icon: Crown,
      features: [
        'Unbegrenzte Kampagnen',
        'Alle Social Media Plattformen',
        'Erweiterte Analytics & Reporting',
        'A/B Testing für Anzeigen',
        'Priority Support (24/7)',
        'White-Label Option',
        'API-Zugang',
        'Erweiterte Zielgruppen-Tools',
        'Automatische Budgetoptimierung'
      ],
      popular: true
    }
  ]

  const validateForm = () => {
    const newErrors = {}

    if (!selectedPlan) newErrors.plan = 'Bitte wählen Sie einen Plan aus'
    if (!acceptTerms) newErrors.terms = 'Sie müssen die AGB und Datenschutzerklärung akzeptieren'

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (!validateForm()) return

    setIsLoading(true)
    
    try {
      const selectedPlanData = plans.find(plan => plan.id === selectedPlan)
      
      // Complete user registration with selected plan
      const completeUserData = {
        ...userData,
        plan: {
          id: selectedPlan,
          name: selectedPlanData.name,
          price: selectedPlanData.price,
          period: selectedPlanData.period
        },
        preferences: {
          marketing: acceptMarketing
        },
        registrationStep: 'completed',
        registrationDate: new Date().toISOString()
      }

      // Save final user data to localStorage
      const existingUsers = JSON.parse(localStorage.getItem('registeredUsers') || '[]')
      const userIndex = existingUsers.findIndex(u => u.email === userData.email)
      
      if (userIndex !== -1) {
        existingUsers[userIndex] = completeUserData
        localStorage.setItem('registeredUsers', JSON.stringify(existingUsers))
      }

      // Simulate API call for final registration
      setTimeout(() => {
        setIsLoading(false)
        onComplete(completeUserData)
      }, 2000)
      
    } catch (error) {
      setIsLoading(false)
      setErrors({ general: 'Registrierung fehlgeschlagen. Bitte versuchen Sie es erneut.' })
    }
  }

  const handlePlanSelect = (planId) => {
    setSelectedPlan(planId)
    if (errors.plan) {
      setErrors({ ...errors, plan: '' })
    }
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <div className="w-full max-w-4xl max-h-[90vh] overflow-y-auto">
        <Card className="shadow-2xl border-0 bg-white">
          <CardHeader className="text-center pb-6 relative">
            <button
              onClick={onSkip}
              className="absolute right-4 top-4 text-gray-400 hover:text-gray-600 transition-colors"
              disabled={isLoading}
            >
              <X className="w-5 h-5" />
            </button>
            <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <Crown className="w-8 h-8 text-white" />
            </div>
            <CardTitle className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              Wählen Sie Ihren Plan
            </CardTitle>
            <CardDescription className="text-gray-600">
              Schritt 3 von 3: Starten Sie mit dem perfekten Plan für Ihr Unternehmen
            </CardDescription>
            <div className="flex justify-center mt-4">
              <div className="flex space-x-2">
                <div className="w-8 h-2 bg-purple-500 rounded-full"></div>
                <div className="w-8 h-2 bg-purple-500 rounded-full"></div>
                <div className="w-8 h-2 bg-purple-500 rounded-full"></div>
              </div>
            </div>
            <div className="flex flex-wrap gap-2 justify-center mt-4">
              <Badge className="bg-purple-100 text-purple-800">🎉 Willkommensbonus</Badge>
              <Badge className="bg-green-100 text-green-800">💰 Jährliche Ersparnis</Badge>
            </div>
          </CardHeader>
          
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              {errors.general && (
                <div className="p-3 bg-red-50 border border-red-200 rounded-md">
                  <p className="text-sm text-red-600">{errors.general}</p>
                </div>
              )}

              {/* Plan Selection */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-900 text-center">
                  Wählen Sie den Plan, der zu Ihnen passt
                </h3>
                
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {plans.map((plan) => {
                    const IconComponent = plan.icon
                    const isSelected = selectedPlan === plan.id
                    
                    return (
                      <div
                        key={plan.id}
                        className={`relative cursor-pointer transition-all duration-300 ${
                          isSelected 
                            ? 'transform scale-105 ring-4 ring-purple-200' 
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
                      onCheckedChange={setAcceptTerms}
                      className={errors.terms ? 'border-red-500' : ''}
                      disabled={isLoading}
                    />
                    <Label htmlFor="acceptTerms" className="text-sm text-gray-700 leading-relaxed">
                      Ich akzeptiere die{' '}
                      <a href="#" className="text-purple-600 hover:underline font-medium">
                        Allgemeinen Geschäftsbedingungen
                      </a>
                      {' '}und die{' '}
                      <a href="#" className="text-purple-600 hover:underline font-medium">
                        Datenschutzerklärung
                      </a>
                      {' '}von socialmediakampagnen.com *
                    </Label>
                  </div>
                  {errors.terms && <p className="text-xs text-red-500 ml-6">{errors.terms}</p>}

                  <div className="flex items-start space-x-3">
                    <Checkbox
                      id="acceptMarketing"
                      checked={acceptMarketing}
                      onCheckedChange={setAcceptMarketing}
                      disabled={isLoading}
                    />
                    <Label htmlFor="acceptMarketing" className="text-sm text-gray-700 leading-relaxed">
                      Ich möchte Updates, Tipps und Marketing-Informationen per E-Mail erhalten (optional)
                    </Label>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-3 pt-4">
                <Button
                  type="submit"
                  disabled={isLoading || !selectedPlan}
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
