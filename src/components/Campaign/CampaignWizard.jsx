import React, { useState } from 'react'
import { X, ArrowLeft, ArrowRight, CheckCircle, Target, Globe, ShoppingCart, Smartphone, Eye } from 'lucide-react'

const CampaignWizard = ({ onClose }) => {
  const [currentStep, setCurrentStep] = useState(1)
  const [selectedGoal, setSelectedGoal] = useState('')
  const [selectedChannels, setSelectedChannels] = useState([])
  const [campaignData, setCampaignData] = useState({
    goal: '',
    channels: [],
    content: {
      headline: '',
      description: '',
      callToAction: ''
    },
    budget: {
      amount: '',
      type: 'daily'
    },
    budgetConfirmed: false
  })

  const goals = [
    { id: 'awareness', title: 'Markenbekanntheit', description: 'Erhöhen Sie die Sichtbarkeit Ihrer Marke', icon: '👁️' },
    { id: 'traffic', title: 'Website-Traffic', description: 'Mehr Besucher auf Ihre Website leiten', icon: '🌐' },
    { id: 'leads', title: 'Lead-Generierung', description: 'Potentielle Kunden gewinnen', icon: '🎯' },
    { id: 'sales', title: 'Verkäufe steigern', description: 'Direkte Verkäufe fördern', icon: '🛒' },
    { id: 'app', title: 'App-Downloads', description: 'Mobile App Installationen erhöhen', icon: '📱' }
  ]

  const channels = [
    { id: 'facebook', name: 'Facebook', format: '1080x1080px' },
    { id: 'instagram', name: 'Instagram', format: '1080x1080px' },
    { id: 'google', name: 'Google Ads', format: '1080x1080px' },
    { id: 'tiktok', name: 'TikTok', format: '1080x1920px' },
    { id: 'snapchat', name: 'Snapchat', format: '1080x1920px' },
    { id: 'reddit', name: 'Reddit', format: '1200x630px' },
    { id: 'linkedin', name: 'LinkedIn', format: '1080x1080px' },
    { id: 'spotify', name: 'Spotify', format: '1080x1080px' }
  ]

  const handleGoalSelect = (goalId) => {
    setSelectedGoal(goalId)
    setCampaignData(prev => ({ ...prev, goal: goalId }))
  }

  const handleChannelToggle = (channelId) => {
    const newChannels = selectedChannels.includes(channelId)
      ? selectedChannels.filter(id => id !== channelId)
      : [...selectedChannels, channelId]
    
    setSelectedChannels(newChannels)
    setCampaignData(prev => ({ ...prev, channels: newChannels }))
  }

  const canProceedToStep2 = () => {
    return selectedGoal && selectedChannels.length > 0
  }

  const canCreateCampaign = () => {
    return campaignData.budget.amount && campaignData.budgetConfirmed
  }

  const nextStep = () => {
    if (currentStep < 2 && canProceedToStep2()) {
      setCurrentStep(2)
    }
  }

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(1)
    }
  }

  const renderStep1 = () => (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-full">
      {/* Left Column: Goals & Channels */}
      <div className="space-y-6 max-h-[70vh] overflow-y-auto">
        {/* Campaign Goals */}
        <div className="bg-white border rounded-lg p-4">
          <h3 className="text-lg font-semibold mb-2">Kampagnenziel auswählen</h3>
          <p className="text-gray-600 text-sm mb-4">Was möchten Sie mit Ihrer Kampagne erreichen?</p>
          <div className="space-y-3">
            {goals.map((goal) => (
              <div
                key={goal.id}
                onClick={() => handleGoalSelect(goal.id)}
                className={`p-4 border rounded-lg cursor-pointer transition-all hover:shadow-md ${
                  selectedGoal === goal.id
                    ? 'border-purple-500 bg-purple-50 shadow-md'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <div className="flex items-center space-x-3">
                  <span className="text-2xl">{goal.icon}</span>
                  <div>
                    <h4 className="font-semibold">{goal.title}</h4>
                    <p className="text-sm text-gray-600">{goal.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Channel Selection */}
        <div className="bg-white border rounded-lg p-4">
          <h3 className="text-lg font-semibold mb-2">Kanäle auswählen</h3>
          <p className="text-gray-600 text-sm mb-4">Wählen Sie die Plattformen für Ihre Kampagne</p>
          <div className="grid grid-cols-2 gap-3">
            {channels.map((channel) => (
              <div
                key={channel.id}
                onClick={() => handleChannelToggle(channel.id)}
                className={`p-3 border rounded-lg cursor-pointer transition-all hover:shadow-md ${
                  selectedChannels.includes(channel.id)
                    ? 'border-purple-500 bg-purple-50 shadow-md'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <div className="font-medium text-sm mb-1">{channel.name}</div>
                <div className="text-xs text-gray-500">{channel.format}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Middle Column: Content Creation */}
      <div className="space-y-6 max-h-[70vh] overflow-y-auto">
        <div className="bg-white border rounded-lg p-4">
          <h3 className="text-lg font-semibold mb-2">Inhalte erstellen</h3>
          <p className="text-gray-600 text-sm mb-4">Erstellen Sie ansprechende Inhalte für Ihre Kampagne</p>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">Überschrift *</label>
              <input
                type="text"
                placeholder="Ihre aussagekräftige Überschrift..."
                value={campaignData.content.headline}
                onChange={(e) => setCampaignData(prev => ({
                  ...prev,
                  content: { ...prev.content, headline: e.target.value }
                }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Beschreibung *</label>
              <textarea
                placeholder="Beschreiben Sie Ihr Angebot..."
                value={campaignData.content.description}
                onChange={(e) => setCampaignData(prev => ({
                  ...prev,
                  content: { ...prev.content, description: e.target.value }
                }))}
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Call-to-Action</label>
              <input
                type="text"
                placeholder="z.B. Jetzt kaufen, Mehr erfahren..."
                value={campaignData.content.callToAction}
                onChange={(e) => setCampaignData(prev => ({
                  ...prev,
                  content: { ...prev.content, callToAction: e.target.value }
                }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Right Column: Live Preview */}
      <div className="space-y-6 max-h-[70vh] overflow-y-auto">
        <div className="bg-white border rounded-lg p-4">
          <h3 className="text-lg font-semibold mb-2">Live-Vorschau</h3>
          <p className="text-gray-600 text-sm mb-4">So wird Ihre Anzeige aussehen</p>
          {selectedChannels.length > 0 ? (
            <div className="border rounded-lg p-4 bg-gray-50">
              <div className="bg-white rounded-lg p-4 shadow-sm">
                <div className="flex items-center space-x-2 mb-3">
                  <div className="w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center">
                    <span className="text-white text-xs font-bold">IU</span>
                  </div>
                  <div>
                    <p className="font-semibold text-sm">Ihr Unternehmen</p>
                    <p className="text-xs text-gray-500">Gesponsert</p>
                  </div>
                </div>
                
                {campaignData.content.headline && (
                  <h4 className="font-semibold mb-2">{campaignData.content.headline}</h4>
                )}
                
                {campaignData.content.description && (
                  <p className="text-sm text-gray-600 mb-3">{campaignData.content.description}</p>
                )}
                
                {campaignData.content.callToAction && (
                  <button className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded text-sm">
                    {campaignData.content.callToAction}
                  </button>
                )}
              </div>
            </div>
          ) : (
            <div className="text-center py-8 text-gray-500">
              <p>Wählen Sie Kanäle aus, um eine Vorschau zu sehen</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )

  const renderStep2 = () => (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold mb-2">Budget & Buchung</h2>
        <p className="text-gray-600">Legen Sie Ihr Mediabudget fest und buchen Sie Ihre Kampagne</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Budget Settings */}
        <div className="bg-white border rounded-lg p-6">
          <h3 className="text-lg font-semibold mb-4">Budget & Laufzeit</h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">Budget-Typ</label>
              <div className="space-y-2">
                <label className="flex items-center">
                  <input
                    type="radio"
                    value="daily"
                    checked={campaignData.budget.type === 'daily'}
                    onChange={(e) => setCampaignData(prev => ({
                      ...prev,
                      budget: { ...prev.budget, type: e.target.value }
                    }))}
                    className="mr-2"
                  />
                  Tagesbudget
                </label>
                <label className="flex items-center">
                  <input
                    type="radio"
                    value="total"
                    checked={campaignData.budget.type === 'total'}
                    onChange={(e) => setCampaignData(prev => ({
                      ...prev,
                      budget: { ...prev.budget, type: e.target.value }
                    }))}
                    className="mr-2"
                  />
                  Gesamtbudget
                </label>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">
                {campaignData.budget.type === 'daily' ? 'Tagesbudget' : 'Gesamtbudget'} (€) *
              </label>
              <input
                type="number"
                min="1"
                placeholder="z.B. 50"
                value={campaignData.budget.amount}
                onChange={(e) => setCampaignData(prev => ({
                  ...prev,
                  budget: { ...prev.budget, amount: e.target.value }
                }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>
          </div>
        </div>

        {/* Campaign Summary */}
        <div className="bg-white border rounded-lg p-6">
          <h3 className="text-lg font-semibold mb-4">Kampagnen-Zusammenfassung</h3>
          <div className="space-y-4">
            <div>
              <h4 className="font-semibold mb-2">Ziel</h4>
              <p className="text-sm text-gray-600">
                {goals.find(g => g.id === selectedGoal)?.title || 'Nicht ausgewählt'}
              </p>
            </div>

            <div>
              <h4 className="font-semibold mb-2">Kanäle ({selectedChannels.length})</h4>
              <div className="flex flex-wrap gap-2">
                {selectedChannels.map((channelId) => {
                  const channel = channels.find(c => c.id === channelId)
                  return (
                    <span key={channelId} className="bg-gray-100 px-2 py-1 rounded text-xs">
                      {channel?.name}
                    </span>
                  )
                })}
              </div>
            </div>

            {campaignData.budget.amount && (
              <div>
                <h4 className="font-semibold mb-2">Budget</h4>
                <p className="text-sm text-gray-600">
                  {campaignData.budget.type === 'daily' ? 'Täglich' : 'Gesamt'}: €{campaignData.budget.amount}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Budget Confirmation */}
      <div className="bg-white border rounded-lg p-6">
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-4">
          <h4 className="font-semibold text-yellow-800 mb-2">Wichtiger Hinweis zum Mediabudget</h4>
          <p className="text-sm text-yellow-700">
            Das von Ihnen festgelegte Budget wird als Mediabudget für Ihre Kampagne verwendet und 
            entsprechend abgerechnet. Dieses Budget wird direkt an die Werbeplattformen weitergeleitet.
          </p>
        </div>

        <label className="flex items-start space-x-3">
          <input
            type="checkbox"
            checked={campaignData.budgetConfirmed}
            onChange={(e) => setCampaignData(prev => ({
              ...prev,
              budgetConfirmed: e.target.checked
            }))}
            className="mt-1"
          />
          <span className="text-sm leading-relaxed">
            Ich bestätige, dass ich verstehe, dass das festgelegte Budget von €{campaignData.budget.amount || '0'} 
            {campaignData.budget.type === 'daily' ? ' pro Tag' : ' insgesamt'} als Mediabudget für meine Kampagne 
            verwendet und entsprechend berechnet wird. Ich bin mit der Abrechnung dieses Betrags einverstanden.
          </span>
        </label>
      </div>
    </div>
  )

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-7xl max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b">
          <div>
            <h1 className="text-2xl font-bold">Kampagne erstellen</h1>
            <p className="text-gray-600">Schritt {currentStep} von 2: {currentStep === 1 ? 'Kampagne erstellen' : 'Budget & Buchung'}</p>
          </div>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Progress Bar */}
        <div className="px-6 py-4 border-b">
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className="bg-purple-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${(currentStep / 2) * 100}%` }}
            ></div>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 p-6 overflow-hidden">
          {currentStep === 1 && renderStep1()}
          {currentStep === 2 && renderStep2()}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between p-6 border-t bg-gray-50">
          <button
            onClick={prevStep}
            disabled={currentStep === 1}
            className={`flex items-center space-x-2 px-4 py-2 rounded ${
              currentStep === 1 
                ? 'bg-gray-100 text-gray-400 cursor-not-allowed' 
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Zurück</span>
          </button>

          <div className="text-sm text-gray-500">
            Schritt {currentStep} von 2
          </div>

          {currentStep < 2 ? (
            <button
              onClick={nextStep}
              disabled={!canProceedToStep2()}
              className={`flex items-center space-x-2 px-4 py-2 rounded ${
                canProceedToStep2()
                  ? 'bg-purple-600 hover:bg-purple-700 text-white'
                  : 'bg-gray-100 text-gray-400 cursor-not-allowed'
              }`}
            >
              <span>Weiter</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          ) : (
            <button
              onClick={() => {
                console.log('Campaign created:', campaignData)
                onClose()
              }}
              disabled={!canCreateCampaign()}
              className={`flex items-center space-x-2 px-4 py-2 rounded ${
                canCreateCampaign()
                  ? 'bg-green-600 hover:bg-green-700 text-white'
                  : 'bg-gray-100 text-gray-400 cursor-not-allowed'
              }`}
            >
              <span>Kampagne erstellen</span>
              <CheckCircle className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>
    </div>
  )
}

export default CampaignWizard
