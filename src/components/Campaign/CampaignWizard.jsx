import { useState } from 'react'
import { 
  Target, 
  Globe, 
  ShoppingCart, 
  Smartphone, 
  Eye,
  Facebook,
  Instagram,
  Youtube,
  Linkedin,
  CheckCircle,
  ArrowRight,
  ArrowLeft,
  Upload,
  Calendar,
  Euro
} from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card.jsx'
import { Button } from '@/components/ui/button.jsx'
import { Badge } from '@/components/ui/badge.jsx'
import { Input } from '@/components/ui/input.jsx'
import { Textarea } from '@/components/ui/textarea.jsx'
import { Label } from '@/components/ui/label.jsx'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group.jsx'
import { Checkbox } from '@/components/ui/checkbox.jsx'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select.jsx'
import PlatformPreviews from '../PlatformPreviews'

const CampaignWizard = ({ onClose }) => {
  const [currentStep, setCurrentStep] = useState(1)
  const [uploadedImages, setUploadedImages] = useState([])
  const [campaignData, setCampaignData] = useState({
    goal: '',
    channels: [],
    content: {
      headline: '',
      description: '',
      callToAction: '',
      targetAudience: '',
      images: []
    },
    budget: {
      type: 'daily',
      amount: '',
      duration: '',
      startDate: '',
      endDate: ''
    }
  })

  const handleFormatImageUpload = (event, format) => {
    const file = event.target.files[0]
    if (file && file.type.startsWith('image/') && file.size <= 10 * 1024 * 1024) {
      const reader = new FileReader()
      reader.onload = (e) => {
        const newImage = {
          id: Date.now() + Math.random(),
          file: file,
          url: e.target.result,
          name: file.name,
          format: format // 'square', 'story', 'landscape'
        }
        
        // Update uploadedImages state
        setUploadedImages(prev => {
          const filtered = prev.filter(img => img.format !== format)
          return [...filtered, newImage]
        })
        
        // Update campaignData
        setCampaignData(prev => ({
          ...prev,
          content: {
            ...prev.content,
            images: {
              ...prev.content.images,
              [format]: newImage
            }
          }
        }))
      }
      reader.readAsDataURL(file)
    }
  }

  const removeImage = (imageId) => {
    setUploadedImages(prev => prev.filter(img => img.id !== imageId))
    setCampaignData(prev => ({
      ...prev,
      content: {
        ...prev.content,
        images: prev.content.images.filter(img => img.id !== imageId)
      }
    }))
  }

  const removeFormatImage = (format) => {
    setUploadedImages(prev => prev.filter(img => img.format !== format))
    setCampaignData(prev => ({
      ...prev,
      content: {
        ...prev.content,
        images: {
          ...prev.content.images,
          [format]: null
        }
      }
    }))
  }

  const steps = [
    { id: 1, name: 'Ziel auswählen', description: 'Was ist das Ziel der Kampagne?' },
    { id: 2, name: 'Kanäle wählen', description: 'Auf welchen Plattformen soll die Kampagne laufen?' },
    { id: 3, name: 'Inhalte erstellen', description: 'Erstellen Sie die Kampagneninhalte' },
    { id: 4, name: 'Budget festlegen', description: 'Legen Sie Budget und Laufzeit fest' }
  ]

  const goals = [
    {
      id: 'website-traffic',
      name: 'Website-Traffic',
      description: 'Mehr Besucher auf Ihre Website lenken',
      icon: Globe
    },
    {
      id: 'product-sales',
      name: 'Produkt- und Markenkauf',
      description: 'Verkäufe und Conversions steigern',
      icon: ShoppingCart
    },
    {
      id: 'app-installation',
      name: 'App-Installation',
      description: 'App-Downloads fördern',
      icon: Smartphone
    },
    {
      id: 'brand-awareness',
      name: 'Markenbekanntheit',
      description: 'Reichweite und Bekanntheit erhöhen',
      icon: Eye
    }
  ]

  const channels = [
    {
      id: 'facebook',
      name: 'Facebook',
      icon: Facebook,
      color: 'text-blue-600',
      description: 'Erreichen Sie Ihre Zielgruppe auf Facebook'
    },
    {
      id: 'instagram',
      name: 'Instagram',
      icon: Instagram,
      color: 'text-pink-600',
      description: 'Visuelle Inhalte für Instagram'
    },
    {
      id: 'tiktok',
      name: 'TikTok',
      icon: Youtube,
      color: 'text-black',
      description: 'Kurze Videos für TikTok'
    },
    {
      id: 'google',
      name: 'Google Ads',
      icon: Target,
      color: 'text-green-600',
      description: 'Suchanzeigen bei Google'
    },
    {
      id: 'linkedin',
      name: 'LinkedIn',
      icon: Linkedin,
      color: 'text-blue-700',
      description: 'B2B Marketing auf LinkedIn'
    },
    {
      id: 'youtube',
      name: 'YouTube',
      icon: Youtube,
      color: 'text-red-600',
      description: 'Video-Marketing auf YouTube'
    },
    {
      id: 'snapchat',
      name: 'Snapchat',
      icon: Smartphone,
      color: 'text-yellow-500',
      description: 'Junge Zielgruppe auf Snapchat'
    },
    {
      id: 'reddit',
      name: 'Reddit',
      icon: Globe,
      color: 'text-orange-600',
      description: 'Community-Marketing auf Reddit'
    }
  ]

  const handleGoalSelect = (goalId) => {
    setCampaignData({ ...campaignData, goal: goalId })
  }

  const handleChannelToggle = (channelId) => {
    const updatedChannels = campaignData.channels.includes(channelId)
      ? campaignData.channels.filter(id => id !== channelId)
      : [...campaignData.channels, channelId]
    
    setCampaignData({ ...campaignData, channels: updatedChannels })
  }

  const handleContentChange = (field, value) => {
    setCampaignData({
      ...campaignData,
      content: { ...campaignData.content, [field]: value }
    })
  }

  const handleBudgetChange = (field, value) => {
    setCampaignData({
      ...campaignData,
      budget: { ...campaignData.budget, [field]: value }
    })
  }

  const nextStep = () => {
    if (currentStep < 4) {
      setCurrentStep(currentStep + 1)
    }
  }

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  const canProceed = () => {
    switch (currentStep) {
      case 1:
        return campaignData.goal !== ''
      case 2:
        return campaignData.channels.length > 0
      case 3:
        return campaignData.content.headline && campaignData.content.description
      case 4:
        return campaignData.budget.amount && campaignData.budget.duration
      default:
        return false
    }
  }

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">Ziel auswählen</h3>
              <p className="text-sm text-gray-500 mb-6">Was ist das Ziel der Kampagne?</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {goals.map((goal) => (
                <Card
                  key={goal.id}
                  className={`cursor-pointer transition-all hover:shadow-md ${
                    campaignData.goal === goal.id ? 'ring-2 ring-purple-500 bg-purple-50' : ''
                  }`}
                  onClick={() => handleGoalSelect(goal.id)}
                >
                  <CardContent className="p-6">
                    <div className="flex items-start space-x-4">
                      <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                        <goal.icon className="w-5 h-5 text-purple-600" />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-medium text-gray-900">{goal.name}</h4>
                        <p className="text-sm text-gray-500 mt-1">{goal.description}</p>
                      </div>
                      {campaignData.goal === goal.id && (
                        <CheckCircle className="w-5 h-5 text-purple-600" />
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )

      case 2:
        return (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">Kanäle wählen</h3>
              <p className="text-sm text-gray-500 mb-6">Auf welchen Plattformen soll die Kampagne laufen?</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {channels.map((channel) => (
                <Card
                  key={channel.id}
                  className={`cursor-pointer transition-all hover:shadow-md ${
                    campaignData.channels.includes(channel.id) ? 'ring-2 ring-purple-500 bg-purple-50' : ''
                  }`}
                  onClick={() => handleChannelToggle(channel.id)}
                >
                  <CardContent className="p-6">
                    <div className="flex items-start space-x-4">
                      <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
                        <channel.icon className={`w-5 h-5 ${channel.color}`} />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-medium text-gray-900">{channel.name}</h4>
                        <p className="text-sm text-gray-500 mt-1">{channel.description}</p>
                      </div>
                      {campaignData.channels.includes(channel.id) && (
                        <CheckCircle className="w-5 h-5 text-purple-600" />
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
            
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <p className="text-sm text-blue-800">
                <strong>Tipp:</strong> Wählen Sie mehrere Kanäle für maximale Reichweite. 
                Die Inhalte werden automatisch für jede Plattform optimiert.
              </p>
            </div>
          </div>
        )

      case 3:
        return (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">Inhalte erstellen</h3>
              <p className="text-sm text-gray-500 mb-6">Erstellen Sie die Kampagneninhalte</p>
            </div>
            
            {/* Eingabefelder in kompaktem Grid-Layout */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
              <div>
                <Label htmlFor="headline">Überschrift *</Label>
                <Input
                  id="headline"
                  placeholder="Eingängige Überschrift für Ihre Anzeige"
                  value={campaignData.content.headline}
                  onChange={(e) => handleContentChange('headline', e.target.value)}
                  className="mt-1"
                />
              </div>
              
              <div>
                <Label htmlFor="cta">Call-to-Action</Label>
                <Select onValueChange={(value) => handleContentChange('callToAction', value)}>
                  <SelectTrigger className="mt-1">
                    <SelectValue placeholder="Wählen Sie eine Aktion" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="learn-more">Mehr erfahren</SelectItem>
                    <SelectItem value="shop-now">Jetzt kaufen</SelectItem>
                    <SelectItem value="sign-up">Anmelden</SelectItem>
                    <SelectItem value="download">Herunterladen</SelectItem>
                    <SelectItem value="contact">Kontakt</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label>Kampagnenbilder (3 Formate)</Label>
                <div className="mt-1 space-y-3">
                  {/* Quadratisches Format */}
                  <div>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => handleFormatImageUpload(e, 'square')}
                      className="hidden"
                      id="square-upload"
                    />
                    <label
                      htmlFor="square-upload"
                      className="border-2 border-dashed border-gray-300 rounded-lg p-3 text-center hover:border-purple-400 transition-colors cursor-pointer block"
                    >
                      <div className="flex items-center justify-center space-x-2">
                        <div className="w-4 h-4 bg-gray-300 rounded"></div>
                        <span className="text-xs text-gray-600">Quadrat (1000×1000px)</span>
                      </div>
                      <p className="text-xs text-gray-500 mt-1">Facebook, Instagram Feed, LinkedIn</p>
                    </label>
                  </div>

                  {/* Story Format */}
                  <div>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => handleFormatImageUpload(e, 'story')}
                      className="hidden"
                      id="story-upload"
                    />
                    <label
                      htmlFor="story-upload"
                      className="border-2 border-dashed border-gray-300 rounded-lg p-3 text-center hover:border-purple-400 transition-colors cursor-pointer block"
                    >
                      <div className="flex items-center justify-center space-x-2">
                        <div className="w-2 h-4 bg-gray-300 rounded"></div>
                        <span className="text-xs text-gray-600">Story (1080×1920px)</span>
                      </div>
                      <p className="text-xs text-gray-500 mt-1">TikTok, Instagram Stories, Snapchat</p>
                    </label>
                  </div>

                  {/* Querformat */}
                  <div>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => handleFormatImageUpload(e, 'landscape')}
                      className="hidden"
                      id="landscape-upload"
                    />
                    <label
                      htmlFor="landscape-upload"
                      className="border-2 border-dashed border-gray-300 rounded-lg p-3 text-center hover:border-purple-400 transition-colors cursor-pointer block"
                    >
                      <div className="flex items-center justify-center space-x-2">
                        <div className="w-6 h-3 bg-gray-300 rounded"></div>
                        <span className="text-xs text-gray-600">Querformat (1200×630px)</span>
                      </div>
                      <p className="text-xs text-gray-500 mt-1">YouTube, Google Ads, Reddit</p>
                    </label>
                  </div>
                </div>
              </div>
            </div>

            {/* Beschreibung und Zielgruppe in voller Breite */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
              <div>
                <Label htmlFor="description">Beschreibung *</Label>
                <Textarea
                  id="description"
                  placeholder="Beschreiben Sie Ihr Angebot oder Ihre Botschaft"
                  value={campaignData.content.description}
                  onChange={(e) => handleContentChange('description', e.target.value)}
                  className="mt-1"
                  rows={3}
                />
              </div>
              
              <div>
                <Label htmlFor="audience">Zielgruppe</Label>
                <Textarea
                  id="audience"
                  placeholder="Beschreiben Sie Ihre Zielgruppe (Alter, Interessen, etc.)"
                  value={campaignData.content.targetAudience}
                  onChange={(e) => handleContentChange('targetAudience', e.target.value)}
                  className="mt-1"
                  rows={3}
                />
              </div>
            </div>

            {/* Hochgeladene Bilder anzeigen */}
            {uploadedImages.length > 0 && (
              <div className="mb-8">
                <Label>Hochgeladene Kampagnenbilder</Label>
                <div className="mt-2 grid grid-cols-1 md:grid-cols-3 gap-6">
                  {/* Quadratisches Bild */}
                  {uploadedImages.find(img => img.format === 'square') && (
                    <div className="text-center">
                      <div className="relative group inline-block">
                        <img
                          src={uploadedImages.find(img => img.format === 'square').url}
                          alt="Quadratisches Format"
                          className="w-24 h-24 object-cover rounded-lg border-2 border-purple-200"
                        />
                        <button
                          onClick={() => removeFormatImage('square')}
                          className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                          ×
                        </button>
                      </div>
                      <p className="text-xs text-gray-600 mt-2">Quadrat (1:1)</p>
                      <p className="text-xs text-gray-500">Facebook, Instagram, LinkedIn</p>
                    </div>
                  )}

                  {/* Story Bild */}
                  {uploadedImages.find(img => img.format === 'story') && (
                    <div className="text-center">
                      <div className="relative group inline-block">
                        <img
                          src={uploadedImages.find(img => img.format === 'story').url}
                          alt="Story Format"
                          className="w-12 h-24 object-cover rounded-lg border-2 border-purple-200"
                        />
                        <button
                          onClick={() => removeFormatImage('story')}
                          className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                          ×
                        </button>
                      </div>
                      <p className="text-xs text-gray-600 mt-2">Story (9:16)</p>
                      <p className="text-xs text-gray-500">TikTok, Instagram Stories</p>
                    </div>
                  )}

                  {/* Querformat Bild */}
                  {uploadedImages.find(img => img.format === 'landscape') && (
                    <div className="text-center">
                      <div className="relative group inline-block">
                        <img
                          src={uploadedImages.find(img => img.format === 'landscape').url}
                          alt="Querformat"
                          className="w-32 h-16 object-cover rounded-lg border-2 border-purple-200"
                        />
                        <button
                          onClick={() => removeFormatImage('landscape')}
                          className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                          ×
                        </button>
                      </div>
                      <p className="text-xs text-gray-600 mt-2">Querformat (16:9)</p>
                      <p className="text-xs text-gray-500">YouTube, Google Ads</p>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Live-Vorschau über die gesamte Breite */}
            <div className="bg-gray-50 rounded-lg p-6">
              <h4 className="font-medium text-gray-900 mb-6 text-center">Live-Vorschau Ihrer Kampagne</h4>
              {campaignData.channels.length > 0 ? (
                <div className="w-full">
                  <PlatformPreviews 
                    campaignData={campaignData} 
                    uploadedImages={uploadedImages}
                  />
                </div>
              ) : (
                <div className="text-center py-12 text-gray-500">
                  <Eye className="w-16 h-16 mx-auto mb-4 text-gray-300" />
                  <p className="text-lg font-medium">Wählen Sie Kanäle aus, um die Live-Vorschau zu sehen</p>
                  <p className="text-sm mt-2">Gehen Sie zurück zu Schritt 2, um Plattformen auszuwählen</p>
                </div>
              )}
            </div>
          </div>
        )

      case 4:
        return (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">Budget festlegen</h3>
              <p className="text-sm text-gray-500 mb-6">Legen Sie Budget und Laufzeit fest</p>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="space-y-6">
                <div>
                  <Label>Budget-Typ</Label>
                  <RadioGroup
                    value={campaignData.budget.type}
                    onValueChange={(value) => handleBudgetChange('type', value)}
                    className="mt-2"
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="daily" id="daily" />
                      <Label htmlFor="daily">Tagesbudget</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="total" id="total" />
                      <Label htmlFor="total">Gesamtbudget</Label>
                    </div>
                  </RadioGroup>
                </div>
                
                <div>
                  <Label htmlFor="amount">Budget-Betrag *</Label>
                  <div className="relative mt-1">
                    <Euro className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <Input
                      id="amount"
                      type="number"
                      placeholder="100"
                      value={campaignData.budget.amount}
                      onChange={(e) => handleBudgetChange('amount', e.target.value)}
                      className="pl-10"
                    />
                  </div>
                  <p className="text-xs text-gray-500 mt-1">
                    {campaignData.budget.type === 'daily' ? 'Euro pro Tag' : 'Euro gesamt'}
                  </p>
                </div>
                
                <div>
                  <Label htmlFor="duration">Laufzeit *</Label>
                  <Select onValueChange={(value) => handleBudgetChange('duration', value)}>
                    <SelectTrigger className="mt-1">
                      <SelectValue placeholder="Wählen Sie die Laufzeit" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1-week">1 Woche</SelectItem>
                      <SelectItem value="2-weeks">2 Wochen</SelectItem>
                      <SelectItem value="1-month">1 Monat</SelectItem>
                      <SelectItem value="3-months">3 Monate</SelectItem>
                      <SelectItem value="custom">Benutzerdefiniert</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="start-date">Startdatum</Label>
                    <Input
                      id="start-date"
                      type="date"
                      value={campaignData.budget.startDate}
                      onChange={(e) => handleBudgetChange('startDate', e.target.value)}
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label htmlFor="end-date">Enddatum</Label>
                    <Input
                      id="end-date"
                      type="date"
                      value={campaignData.budget.endDate}
                      onChange={(e) => handleBudgetChange('endDate', e.target.value)}
                      className="mt-1"
                    />
                  </div>
                </div>
              </div>
              
              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Budget-Übersicht</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-600">Budget-Typ:</span>
                        <span className="text-sm font-medium">
                          {campaignData.budget.type === 'daily' ? 'Täglich' : 'Gesamt'}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-600">Betrag:</span>
                        <span className="text-sm font-medium">
                          €{campaignData.budget.amount || '0'}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-600">Kanäle:</span>
                        <span className="text-sm font-medium">
                          {campaignData.channels.length} ausgewählt
                        </span>
                      </div>
                      <div className="border-t pt-4">
                        <div className="flex justify-between">
                          <span className="font-medium">Geschätzte Reichweite:</span>
                          <span className="font-medium text-purple-600">
                            {campaignData.budget.amount ? `${Math.round(campaignData.budget.amount * 100)}+` : '0'} Personen
                          </span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                
                <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                  <p className="text-sm text-green-800">
                    <strong>Empfehlung:</strong> Für optimale Ergebnisse empfehlen wir ein Mindestbudget 
                    von €50 pro Tag bei {campaignData.channels.length} Kanälen.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )

      default:
        return null
    }
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-7xl h-[80vh] overflow-hidden">
        {/* Header */}
        <div className="px-6 py-4 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold text-gray-900">Neue Kampagne erstellen</h2>
            <Button variant="ghost" onClick={onClose}>
              ×
            </Button>
          </div>
          
          {/* Progress Steps */}
          <div className="mt-4">
            <div className="flex items-center">
              {steps.map((step, index) => (
                <div key={step.id} className="flex items-center">
                  <div className={`flex items-center justify-center w-8 h-8 rounded-full text-sm font-medium ${
                    currentStep >= step.id 
                      ? 'bg-purple-600 text-white' 
                      : 'bg-gray-200 text-gray-600'
                  }`}>
                    {currentStep > step.id ? <CheckCircle className="w-4 h-4" /> : step.id}
                  </div>
                  <div className="ml-2 mr-4">
                    <p className={`text-sm font-medium ${
                      currentStep >= step.id ? 'text-purple-600' : 'text-gray-500'
                    }`}>
                      {step.name}
                    </p>
                  </div>
                  {index < steps.length - 1 && (
                    <div className={`w-8 h-0.5 mx-2 ${
                      currentStep > step.id ? 'bg-purple-600' : 'bg-gray-200'
                    }`} />
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="px-6 py-6 overflow-y-auto" style={{ maxHeight: 'calc(95vh - 200px)' }}>
          {renderStep()}
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-gray-200 flex justify-between">
          <Button
            variant="outline"
            onClick={prevStep}
            disabled={currentStep === 1}
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Zurück
          </Button>
          
          <div className="flex space-x-3">
            <Button variant="outline" onClick={onClose}>
              Abbrechen
            </Button>
            {currentStep < 4 ? (
              <Button
                className="brand-gradient text-white"
                onClick={nextStep}
                disabled={!canProceed()}
              >
                Weiter
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            ) : (
              <Button
                className="brand-gradient text-white"
                disabled={!canProceed()}
              >
                Kampagne erstellen
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default CampaignWizard

