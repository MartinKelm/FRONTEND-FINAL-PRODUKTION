import React, { useState } from 'react'
import { Button } from '../ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '../ui/card'
import { Badge } from '../ui/badge'
import { Check, CreditCard, Shield, Clock, Users, BarChart, Zap, MessageCircle, Phone } from 'lucide-react'
import { updateUser } from '../../utils/userStorage-Fixed'

const PlanSelection = ({ user, onPlanSelected, onClose }) => {
  const [selectedPlan, setSelectedPlan] = useState(null)
  const [isLoading, setIsLoading] = useState(false)

  const plans = [
    {
      id: 'starter',
      name: 'Starter',
      price: 99,
      color: 'from-green-500 to-emerald-500',
      badgeColor: 'bg-green-100 text-green-800',
      buttonColor: 'bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600',
      features: [
        'Bis zu 5 Kampagnen',
        '3 Plattformen',
        'Basis-Analytics',
        'E-Mail Support'
      ]
    },
    {
      id: 'professional',
      name: 'Professional',
      price: 199,
      color: 'from-purple-500 to-indigo-500',
      badgeColor: 'bg-purple-100 text-purple-800',
      buttonColor: 'bg-gradient-to-r from-purple-500 to-indigo-500 hover:from-purple-600 hover:to-indigo-600',
      popular: true,
      features: [
        'Unbegrenzte Kampagnen',
        'Alle Plattformen',
        'Erweiterte Analytics',
        'KI-Textgenerierung',
        'Priority Support'
      ]
    },
    {
      id: 'enterprise',
      name: 'Enterprise',
      price: 499,
      color: 'from-orange-500 to-amber-500',
      badgeColor: 'bg-orange-100 text-orange-800',
      buttonColor: 'bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600',
      features: [
        'Alles aus Professional',
        'Multi-User Management',
        'API-Zugang',
        'Dedicated Account Manager',
        '24/7 Phone Support'
      ]
    }
  ]

  const handleSelectPlan = async (plan) => {
    setSelectedPlan(plan.id)
    setIsLoading(true)

    try {
      // Update user with selected plan
      const result = await updateUser(user.id, {
        plan: plan.id,
        planName: plan.name,
        planPrice: plan.price,
        planSelectedAt: new Date().toISOString(),
        planExpiresAt: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString(), // 12 months from now
        needsPlanSelection: false,
        registrationStep: 'completed'
      })

      if (result.success) {
        // Wait a bit to show the loading state
        setTimeout(() => {
          setIsLoading(false)
          if (onPlanSelected) {
            onPlanSelected({
              ...user,
              plan: plan.id,
              planName: plan.name,
              planPrice: plan.price
            })
          }
        }, 1000)
      } else {
        console.error('Failed to update user plan:', result.error)
        setIsLoading(false)
        alert('Es gab ein Problem bei der Auswahl des Plans. Bitte versuchen Sie es erneut.')
      }
    } catch (error) {
      console.error('Error selecting plan:', error)
      setIsLoading(false)
      alert('Es gab ein Problem bei der Auswahl des Plans. Bitte versuchen Sie es erneut.')
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-purple-800 to-indigo-900 flex items-center justify-center p-4 py-16">
      <div className="w-full max-w-6xl">
        <div className="text-center mb-10">
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Wählen Sie Ihren Plan
          </h1>
          <p className="text-lg text-purple-100 max-w-3xl mx-auto">
            Keine versteckten Kosten, keine Überraschungen. Wählen Sie den Plan, der zu Ihrem Unternehmen passt.
          </p>
          
          <div className="flex flex-wrap justify-center gap-3 mt-6">
            <Badge className="bg-yellow-400 text-yellow-900 px-4 py-1 text-sm font-medium">
              TRANSPARENT
            </Badge>
            <Badge className="bg-green-400 text-green-900 px-4 py-1 text-sm font-medium">
              FAIR
            </Badge>
            <Badge className="bg-blue-400 text-blue-900 px-4 py-1 text-sm font-medium">
              FLEXIBEL
            </Badge>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {plans.map((plan) => (
            <Card 
              key={plan.id} 
              className={`relative overflow-hidden border-0 shadow-xl ${
                plan.popular ? 'ring-2 ring-purple-400 transform md:-translate-y-2' : ''
              }`}
            >
              {plan.popular && (
                <div className="absolute top-0 right-0 bg-purple-500 text-white px-3 py-1 text-xs font-bold uppercase tracking-wider transform translate-x-2 -translate-y-0 rotate-45 origin-bottom-left">
                  Beliebt
                </div>
              )}
              <CardHeader className={`bg-gradient-to-r ${plan.color} text-white`}>
                <CardTitle className="text-2xl font-bold">{plan.name}</CardTitle>
                <div className="mt-2">
                  <span className="text-4xl font-bold">€{plan.price}</span>
                  <span className="text-sm ml-1 opacity-90">pro Monat</span>
                </div>
                <CardDescription className="text-white text-opacity-90 mt-2">
                  Jährliche Abrechnung • 12 Monate Laufzeit
                </CardDescription>
              </CardHeader>
              <CardContent className="pt-6">
                <ul className="space-y-3">
                  {plan.features.map((feature, index) => (
                    <li key={index} className="flex items-start">
                      <div className={`mr-2 mt-1 rounded-full p-1 ${plan.badgeColor}`}>
                        <Check className="w-3 h-3" />
                      </div>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
              <CardFooter>
                <Button
                  className={`w-full py-6 ${plan.buttonColor} text-white font-semibold`}
                  onClick={() => handleSelectPlan(plan)}
                  disabled={isLoading && selectedPlan === plan.id}
                >
                  {isLoading && selectedPlan === plan.id ? (
                    <div className="flex items-center justify-center space-x-2">
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      <span>Wird ausgewählt...</span>
                    </div>
                  ) : (
                    `${plan.name} wählen`
                  )}
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>

        <div className="mt-12 text-center">
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 max-w-3xl mx-auto">
            <h3 className="text-xl font-semibold text-white mb-4">Alle Pläne beinhalten:</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 text-left">
              <div className="flex items-center space-x-2 text-purple-100">
                <Clock className="w-5 h-5 text-purple-300" />
                <span>12 Monate Laufzeit</span>
              </div>
              <div className="flex items-center space-x-2 text-purple-100">
                <Shield className="w-5 h-5 text-purple-300" />
                <span>DSGVO-konform</span>
              </div>
              <div className="flex items-center space-x-2 text-purple-100">
                <CreditCard className="w-5 h-5 text-purple-300" />
                <span>Keine Einrichtungsgebühr</span>
              </div>
              <div className="flex items-center space-x-2 text-purple-100">
                <MessageCircle className="w-5 h-5 text-purple-300" />
                <span>Support inklusive</span>
              </div>
              <div className="flex items-center space-x-2 text-purple-100">
                <Zap className="w-5 h-5 text-purple-300" />
                <span>Sofortige Aktivierung</span>
              </div>
              <div className="flex items-center space-x-2 text-purple-100">
                <BarChart className="w-5 h-5 text-purple-300" />
                <span>Kampagnen-Reporting</span>
              </div>
            </div>
          </div>
          
          <p className="text-purple-200 mt-8">
            Alle Preise zzgl. MwSt. • Jährliche Abrechnung • Automatische Verlängerung
          </p>
          
          <Button 
            variant="ghost" 
            className="mt-4 text-white hover:bg-white/10"
            onClick={onClose}
          >
            Später auswählen
          </Button>
        </div>
      </div>
    </div>
  )
}

export default PlanSelection
