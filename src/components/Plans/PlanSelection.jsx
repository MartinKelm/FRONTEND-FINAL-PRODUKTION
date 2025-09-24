import React, { useState } from 'react'
import { Button } from '../../components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../components/ui/card'
import { CheckCircle, Euro } from 'lucide-react'

const PlanSelection = ({ user, onPlanSelected, onClose }) => {
  const [selectedPlan, setSelectedPlan] = useState(null)
  const [isLoading, setIsLoading] = useState(false)

  const plans = [
    {
      id: 'starter',
      name: 'Starter',
      price: 99,
      color: 'green',
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
      color: 'purple',
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
      color: 'orange',
      features: [
        'Alles aus Professional',
        'Multi-User Management',
        'API-Zugang',
        'Dedicated Account Manager',
        '24/7 Phone Support'
      ]
    }
  ]

  const handleSelectPlan = (plan) => {
    setSelectedPlan(plan)
  }

  const handleConfirmPlan = () => {
    if (!selectedPlan) return
    
    setIsLoading(true)
    
    // Update user with selected plan
    const updatedUser = {
      ...user,
      plan: {
        id: selectedPlan.id,
        name: selectedPlan.name,
        price: selectedPlan.price,
        startDate: new Date().toISOString(),
        endDate: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString() // 12 months
      },
      needsPlanSelection: false
    }
    
    // Simulate API call
    setTimeout(() => {
      // Save to localStorage
      localStorage.setItem('currentUser', JSON.stringify(updatedUser))
      
      // Call the callback
      onPlanSelected(updatedUser)
      setIsLoading(false)
    }, 1000)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 to-indigo-900 flex flex-col">
      {/* Header */}
      <header className="py-6 px-4 sm:px-6 flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-white">Paketauswahl</h1>
          <p className="text-white/70">Wählen Sie das passende Paket für Ihre Anforderungen</p>
        </div>
        <div className="flex items-center space-x-2">
          <span className="text-white/70 text-sm">Angemeldet als {user?.name}</span>
        </div>
      </header>
      
      {/* Main content */}
      <div className="flex-1 flex flex-col items-center justify-center px-4 py-12">
        <div className="max-w-5xl w-full mx-auto text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">Einfache, <span className="text-yellow-300">transparente</span> Preise</h2>
          <p className="text-white/80 text-lg max-w-3xl mx-auto">
            Keine versteckten Kosten, keine Überraschungen. Wählen Sie den Plan, der zu Ihrem Unternehmen passt.
          </p>
          
          <div className="flex justify-center gap-3 mt-6">
            <span className="bg-yellow-400 text-yellow-900 px-3 py-1 rounded-full text-sm font-medium">TRANSPARENT</span>
            <span className="bg-green-400 text-green-900 px-3 py-1 rounded-full text-sm font-medium">FAIR</span>
            <span className="bg-blue-400 text-blue-900 px-3 py-1 rounded-full text-sm font-medium">FLEXIBEL</span>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-5xl">
          {plans.map((plan) => (
            <Card 
              key={plan.id}
              className={`relative overflow-hidden border-2 transition-all ${
                selectedPlan?.id === plan.id 
                  ? `border-${plan.color}-500 shadow-lg shadow-${plan.color}-500/20` 
                  : 'border-gray-200'
              }`}
            >
              {plan.popular && (
                <div className="absolute top-0 right-0 bg-purple-600 text-white text-xs font-bold px-3 py-1 rounded-bl-lg">
                  BELIEBT
                </div>
              )}
              <CardHeader className={`pb-2 ${plan.color === 'green' ? 'bg-green-50' : plan.color === 'purple' ? 'bg-purple-50' : 'bg-orange-50'}`}>
                <CardTitle className={`text-xl font-bold ${
                  plan.color === 'green' ? 'text-green-600' : 
                  plan.color === 'purple' ? 'text-purple-600' : 'text-orange-600'
                }`}>
                  {plan.name}
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-4">
                <div className="flex items-baseline mb-4">
                  <span className="text-3xl font-bold">€{plan.price}</span>
                  <span className="text-gray-500 ml-1">/Monat</span>
                </div>
                <p className="text-sm text-gray-500 mb-6">pro Monat bei 12 Monaten Laufzeit</p>
                
                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature, index) => (
                    <li key={index} className="flex items-start">
                      <CheckCircle className={`w-5 h-5 mr-2 flex-shrink-0 ${
                        plan.color === 'green' ? 'text-green-500' : 
                        plan.color === 'purple' ? 'text-purple-500' : 'text-orange-500'
                      }`} />
                      <span className="text-gray-700">{feature}</span>
                    </li>
                  ))}
                </ul>
                
                <Button
                  onClick={() => handleSelectPlan(plan)}
                  className={`w-full ${
                    plan.color === 'green' 
                      ? 'bg-green-600 hover:bg-green-700' : 
                    plan.color === 'purple' 
                      ? 'bg-purple-600 hover:bg-purple-700' : 
                      'bg-orange-600 hover:bg-orange-700'
                  } text-white`}
                  variant="default"
                >
                  {selectedPlan?.id === plan.id ? 'Ausgewählt' : `${plan.name} wählen`}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
        
        <div className="mt-12 text-center">
          <p className="text-white/70 mb-6">Alle Pläne sind Jahresmitgliedschaften mit sofortiger Aktivierung</p>
          
          <div className="flex flex-wrap justify-center gap-6 mb-8">
            <div className="flex items-center text-white/80">
              <span className="w-5 h-5 rounded-full bg-white/20 flex items-center justify-center text-xs mr-2">✓</span>
              <span>Keine Einrichtungsgebühr</span>
            </div>
            <div className="flex items-center text-white/80">
              <span className="w-5 h-5 rounded-full bg-white/20 flex items-center justify-center text-xs mr-2">✓</span>
              <span>Einheitliche Abrechnung</span>
            </div>
            <div className="flex items-center text-white/80">
              <span className="w-5 h-5 rounded-full bg-white/20 flex items-center justify-center text-xs mr-2">✓</span>
              <span>DSGVO-konform</span>
            </div>
          </div>
          
          <div className="flex justify-center space-x-4">
            <Button 
              onClick={onClose}
              variant="outline" 
              className="border-white/30 text-white hover:bg-white/10"
            >
              Später entscheiden
            </Button>
            <Button 
              onClick={handleConfirmPlan}
              disabled={!selectedPlan || isLoading}
              className="bg-gradient-to-r from-purple-600 to-pink-600 text-white hover:from-purple-700 hover:to-pink-700 min-w-[200px]"
            >
              {isLoading ? 'Wird verarbeitet...' : selectedPlan ? `${selectedPlan.name} Plan aktivieren` : 'Plan auswählen'}
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PlanSelection
