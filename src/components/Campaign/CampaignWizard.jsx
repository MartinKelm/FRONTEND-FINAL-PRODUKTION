import React, { useState, useEffect } from 'react'
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
  Euro,
  Music,
  MessageCircle,
  Camera,
  Search,
  X,
  Play,
  Heart,
  Share,
  MoreHorizontal,
  ChevronLeft,
  ChevronRight,
  Phone
} from 'lucide-react'
import { saveCampaign } from '../../utils/campaignStorage'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card'
import { Button } from '../ui/button'
import { Badge } from '../ui/badge'
import { Input } from '../ui/input'
import { Label } from '../ui/label'
import { Textarea } from '../ui/textarea'
import { RadioGroup, RadioGroupItem } from '../ui/radio-group'
import { Checkbox } from '../ui/checkbox'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select'

const CampaignWizard = ({ onClose, currentUser }) => {
  const [currentStep, setCurrentStep] = useState(1)
  const [uploadedImages, setUploadedImages] = useState([])
  const [uploadedVideos, setUploadedVideos] = useState([])
  const [currentPreviewIndex, setCurrentPreviewIndex] = useState(0)
  const [campaignData, setCampaignData] = useState({
    goal: '',
    channels: [],
    content: {
      headline: '',
      description: '',
      callToAction: '',
      images: [],
      videos: []
    },
    budget: {
      type: 'daily', // 'daily' or 'total'
      amount: '',
      duration: '',
      startDate: ''
    },
    budgetConfirmed: false,
    finalApproval: false
  })

  const handleImageUpload = (event) => {
    const file = event.target.files[0]
    if (file && file.type.startsWith('image/')) {
      const img = new Image()
      img.onload = () => {
        const format = campaignData.channels.length > 0 
          ? channels.find(c => c.id === campaignData.channels[0])?.format || '1080x1080'
          : '1080x1080'
        
        const [width, height] = format.split('x').map(Number)
        
        if (img.width === width && img.height === height) {
          const reader = new FileReader()
          reader.onload = (e) => {
            setUploadedImages(prev => [...prev, {
              id: Date.now(),
              name: file.name,
              url: e.target.result,
              format: format
            }])
          }
          reader.readAsDataURL(file)
        } else {
          alert(`Bitte laden Sie ein Bild mit den korrekten Abmessungen hoch: ${format}px`)
        }
      }
      img.src = URL.createObjectURL(file)
    }
  }

  const handleVideoUpload = (event) => {
    const file = event.target.files[0]
    if (file && file.type.startsWith('video/')) {
      const reader = new FileReader()
      reader.onload = (e) => {
        setUploadedVideos(prev => [...prev, {
          id: Date.now(),
          name: file.name,
          url: e.target.result,
          type: file.type
        }])
      }
      reader.readAsDataURL(file)
    }
  }

  const handleGoalSelect = (goalId) => {
    setCampaignData(prev => ({ ...prev, goal: goalId }))
  }

  const handleChannelToggle = (channelId) => {
    setCampaignData(prev => {
      const newChannels = prev.channels.includes(channelId)
        ? prev.channels.filter(id => id !== channelId)
        : [...prev.channels, channelId]
      return { ...prev, channels: newChannels }
    })
  }

  const handleContentChange = (field, value) => {
    setCampaignData(prev => ({
      ...prev,
      content: { ...prev.content, [field]: value }
    }))
  }

  const canProceedToStep2 = () => {
    return campaignData.goal && campaignData.channels.length > 0
  }

  const canProceedToStep3 = () => {
    return campaignData.content.headline && campaignData.content.description
  }

  const canProceedToStep4 = () => {
    return true // Preview step doesn't require validation
  }

  const canCreateCampaign = () => {
    return campaignData.budget.amount && 
           campaignData.budget.duration && 
           campaignData.budget.startDate
  }

  const handleCreateCampaign = async () => {
    if (!canCreateCampaign()) {
      alert('Bitte füllen Sie alle erforderlichen Felder aus.')
      return
    }

    try {
      const campaign = {
        id: Date.now().toString(),
        userId: currentUser?.id || 'demo',
        ...campaignData,
        status: 'active',
        createdAt: new Date().toISOString(),
        metrics: {
          impressions: 0,
          clicks: 0,
          conversions: 0,
          spent: 0
        }
      }

      await saveCampaign(campaign)
      alert('Kampagne erfolgreich erstellt!')
      onClose()
    } catch (error) {
      console.error('Fehler beim Erstellen der Kampagne:', error)
      alert('Fehler beim Erstellen der Kampagne. Bitte versuchen Sie es erneut.')
    }
  }

  const goals = [
    {
      id: 'brand-awareness',
      title: 'Markenbekanntheit',
      description: 'Erhöhen Sie die Sichtbarkeit Ihrer Marke',
      icon: <Eye className="w-5 h-5" />,
      color: 'bg-blue-600'
    },
    {
      id: 'website-traffic',
      title: 'Website-Traffic',
      description: 'Mehr Besucher auf Ihre Website leiten',
      icon: <Globe className="w-5 h-5" />,
      color: 'bg-green-600'
    },
    {
      id: 'lead-generation',
      title: 'Lead-Generierung',
      description: 'Potentielle Kunden gewinnen',
      icon: <Target className="w-5 h-5" />,
      color: 'bg-purple-600'
    },
    {
      id: 'sales',
      title: 'Verkäufe steigern',
      description: 'Direkte Verkäufe fördern',
      icon: <ShoppingCart className="w-5 h-5" />,
      color: 'bg-orange-600'
    },
    {
      id: 'app-downloads',
      title: 'App-Downloads',
      description: 'Mobile App Installationen erhöhen',
      icon: <Smartphone className="w-5 h-5" />,
      color: 'bg-pink-600'
    }
  ]

  const channels = [
    {
      id: 'facebook',
      name: 'Facebook',
      icon: <div className="w-5 h-5 bg-white rounded text-blue-600 flex items-center justify-center text-xs font-bold">f</div>,
      format: '1080x1080',
      dimensions: '1080x1080px',
      color: 'bg-blue-600'
    },
    {
      id: 'instagram',
      name: 'Instagram',
      icon: <div className="w-5 h-5 bg-white rounded text-pink-600 flex items-center justify-center text-xs font-bold">IG</div>,
      format: '1080x1080',
      dimensions: '1080x1080px',
      color: 'bg-pink-600'
    },
    {
      id: 'google',
      name: 'Google Ads',
      icon: <div className="w-5 h-5 bg-white rounded text-red-600 flex items-center justify-center text-xs font-bold">G</div>,
      format: '1080x1080',
      dimensions: '1080x1080px',
      color: 'bg-red-600'
    },
    {
      id: 'tiktok',
      name: 'TikTok',
      icon: <div className="w-5 h-5 bg-white rounded text-black flex items-center justify-center text-xs font-bold">TT</div>,
      format: '1080x1920',
      dimensions: '1080x1920px',
      color: 'bg-black'
    },
    {
      id: 'snapchat',
      name: 'Snapchat',
      icon: <div className="w-5 h-5 bg-white rounded text-yellow-600 flex items-center justify-center text-xs font-bold">SC</div>,
      format: '1080x1920',
      dimensions: '1080x1920px',
      color: 'bg-yellow-400'
    },
    {
      id: 'reddit',
      name: 'Reddit',
      icon: <div className="w-5 h-5 bg-white rounded text-orange-600 flex items-center justify-center text-xs font-bold">R</div>,
      format: '1200x630',
      dimensions: '1200x630px',
      color: 'bg-orange-600'
    },
    {
      id: 'linkedin',
      name: 'LinkedIn',
      icon: <div className="w-5 h-5 bg-white rounded text-blue-700 flex items-center justify-center text-xs font-bold">LI</div>,
      format: '1080x1080',
      dimensions: '1080x1080px',
      color: 'bg-blue-700'
    },
    {
      id: 'spotify',
      name: 'Spotify',
      icon: <div className="w-5 h-5 bg-white rounded text-green-600 flex items-center justify-center text-xs font-bold">SP</div>,
      format: '1080x1080',
      dimensions: '1080x1080px',
      color: 'bg-green-600'
    }
  ]

  const getSelectedChannels = () => {
    return channels.filter(channel => campaignData.channels.includes(channel.id))
  }

  const renderStep1 = () => (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Ziel & Kanäle</h2>
        <p className="text-gray-600">Legen Sie Ihr Kampagnenziel fest und wählen Sie die passenden Kanäle</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Left Column: Campaign Goals */}
        <div className="space-y-4">
          <div className="flex items-center space-x-2 mb-4">
            <Target className="w-5 h-5 text-purple-600" />
            <h3 className="text-lg font-semibold text-gray-900">Kampagnenziel auswählen</h3>
          </div>
          <p className="text-sm text-gray-600 mb-4">Was möchten Sie mit Ihrer Kampagne erreichen?</p>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2 gap-3">
            {goals.map((goal) => (
              <div
                key={goal.id}
                className={`relative p-3 rounded-lg border-2 cursor-pointer transition-all duration-200 hover:shadow-md ${
                  campaignData.goal === goal.id
                    ? 'border-purple-500 bg-purple-50 shadow-md'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
                onClick={() => handleGoalSelect(goal.id)}
              >
                {campaignData.goal === goal.id && (
                  <CheckCircle className="absolute top-2 right-2 w-5 h-5 text-purple-600" />
                )}
                <div className="flex items-start space-x-3">
                  <div className={`${goal.color} p-2 rounded-lg text-white flex-shrink-0`}>
                    {goal.icon}
                  </div>
                  <div className="min-w-0">
                    <h4 className="text-sm font-semibold text-gray-900">{goal.title}</h4>
                    <p className="text-xs text-gray-600 mt-1">{goal.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Column: Channel Selection */}
        <div className="space-y-4">
          <div className="flex items-center space-x-2 mb-4">
            <Globe className="w-5 h-5 text-purple-600" />
            <h3 className="text-lg font-semibold text-gray-900">Kanäle auswählen</h3>
          </div>
          <p className="text-sm text-gray-600 mb-4">Wählen Sie die Plattformen für Ihre Kampagne</p>
          
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-2 xl:grid-cols-3 gap-3">
            {channels.map((channel) => {
              const logoSrc = `/logos/${channel.id}.png`
              
              return (
                <div
                  key={channel.id}
                  className={`relative p-3 rounded-lg border-2 cursor-pointer transition-all duration-200 hover:shadow-md ${
                    campaignData.channels.includes(channel.id)
                      ? 'border-purple-500 bg-purple-50 shadow-md'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                  onClick={() => handleChannelToggle(channel.id)}
                >
                  {campaignData.channels.includes(channel.id) && (
                    <CheckCircle className="absolute top-2 right-2 w-4 h-4 text-purple-600" />
                  )}
                  <div className="flex flex-col items-center text-center space-y-2">
                    <div className="w-12 h-12 flex items-center justify-center">
                      <img 
                        src={logoSrc}
                        alt={`${channel.name} logo`}
                        className="w-12 h-12 object-contain"
                        onError={(e) => {
                          e.target.style.display = 'none'
                          e.target.nextElementSibling.style.display = 'flex'
                        }}
                      />
                      <div className={`w-12 h-12 ${channel.color} rounded-lg flex items-center justify-center`} style={{display: 'none'}}>
                        {channel.icon}
                      </div>
                    </div>
                    <span className="text-sm font-medium text-gray-900">{channel.name}</span>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )

  const renderStep2 = () => (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Inhalte & Medien</h2>
        <p className="text-gray-600">Erstellen Sie ansprechende Inhalte für Ihre Kampagne</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Left Column: Content Creation */}
        <div className="space-y-6">
          <div className="flex items-center space-x-2 mb-4">
            <MessageCircle className="w-5 h-5 text-purple-600" />
            <h3 className="text-lg font-semibold text-gray-900">Inhalte erstellen</h3>
          </div>
          <p className="text-sm text-gray-600 mb-4">Erstellen Sie ansprechende Inhalte für Ihre Kampagne</p>

          <div className="space-y-4">
            <div>
              <Label htmlFor="headline" className="text-sm font-medium text-gray-700">Überschrift *</Label>
              <Input
                id="headline"
                placeholder="Ihre aussagekräftige Überschrift..."
                value={campaignData.content.headline}
                onChange={(e) => handleContentChange('headline', e.target.value)}
                className="mt-1"
              />
            </div>

            <div>
              <Label htmlFor="description" className="text-sm font-medium text-gray-700">Beschreibung *</Label>
              <Textarea
                id="description"
                placeholder="Beschreiben Sie Ihr Angebot..."
                value={campaignData.content.description}
                onChange={(e) => handleContentChange('description', e.target.value)}
                className="mt-1 min-h-[100px]"
              />
            </div>

            <div>
              <Label htmlFor="cta" className="text-sm font-medium text-gray-700">Call-to-Action</Label>
              <Input
                id="cta"
                placeholder="z.B. Jetzt kaufen, Mehr erfahren..."
                value={campaignData.content.callToAction}
                onChange={(e) => handleContentChange('callToAction', e.target.value)}
                className="mt-1"
              />
            </div>
          </div>
        </div>

        {/* Right Column: Media Upload */}
        <div className="space-y-6">
          <div className="flex items-center space-x-2 mb-4">
            <Upload className="w-5 h-5 text-purple-600" />
            <h3 className="text-lg font-semibold text-gray-900">Medien hochladen</h3>
          </div>
          <p className="text-sm text-gray-600 mb-4">Laden Sie Bilder und Videos für Ihre Kampagne hoch</p>

          {/* Image Upload */}
          <div className="space-y-4">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-purple-600">1080x1080px Format</span>
                <span className="text-xs text-gray-500">1080x1080px</span>
              </div>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center hover:border-purple-400 transition-colors">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                  id="image-upload"
                />
                <label htmlFor="image-upload" className="cursor-pointer">
                  <Camera className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                  <p className="text-sm text-gray-600">Klicken Sie hier oder ziehen Sie Bilder hierher</p>
                  <p className="text-xs text-gray-500 mt-1">Für: Facebook</p>
                </label>
              </div>
            </div>

            {/* Video Upload */}
            <div>
              <div className="flex items-center space-x-2 mb-2">
                <Play className="w-4 h-4 text-purple-600" />
                <span className="text-sm font-medium text-purple-600">Video hochladen (optional)</span>
              </div>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center hover:border-purple-400 transition-colors">
                <input
                  type="file"
                  accept="video/*"
                  onChange={handleVideoUpload}
                  className="hidden"
                  id="video-upload"
                />
                <label htmlFor="video-upload" className="cursor-pointer">
                  <Play className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                  <p className="text-sm text-gray-600">Video hochladen</p>
                  <p className="text-xs text-gray-500 mt-1">Unterstützte Formate: MP4, MOV, AVI</p>
                </label>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )

  const renderStep3 = () => (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Vorschau</h2>
        <p className="text-gray-600">So sehen Ihre Anzeigen auf den mobilen Geräten aus</p>
      </div>

      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-6">
          <h3 className="text-xl font-semibold text-gray-900 mb-4">Kampagnen-Vorschau in Handy-Mockups</h3>
          <p className="text-gray-600">So sehen Ihre Anzeigen auf den mobilen Geräten aus</p>
        </div>

        {/* Preview Navigation */}
        <div className="flex items-center justify-center space-x-4 mb-6">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setCurrentPreviewIndex(Math.max(0, currentPreviewIndex - 1))}
            disabled={currentPreviewIndex === 0}
            className="flex items-center space-x-2"
          >
            <ChevronLeft className="w-4 h-4" />
            <span>Vorherige</span>
          </Button>
          
          <span className="text-sm text-gray-600">
            {currentPreviewIndex + 1} von {getSelectedChannels().length} Seiten
          </span>
          
          <Button
            variant="outline"
            size="sm"
            onClick={() => setCurrentPreviewIndex(Math.min(getSelectedChannels().length - 1, currentPreviewIndex + 1))}
            disabled={currentPreviewIndex === getSelectedChannels().length - 1}
            className="flex items-center space-x-2"
          >
            <span>Nächste</span>
            <ChevronRight className="w-4 h-4" />
          </Button>
        </div>

        {/* Mobile Preview */}
        {getSelectedChannels().length > 0 && (
          <div className="flex justify-center">
            {(() => {
              const channel = getSelectedChannels()[currentPreviewIndex]
              const logoSrc = `/logos/${channel.id}.png`
              
              return (
                <div className="relative">
                  <div className={`${channel.color} p-1 rounded-lg flex items-center space-x-2 mb-4`}>
                    <img 
                      src={logoSrc}
                      alt={`${channel.name} logo`}
                      className="w-6 h-6 object-contain"
                      onError={(e) => {
                        e.target.style.display = 'none'
                        e.target.nextElementSibling.style.display = 'flex'
                      }}
                    />
                    <div className="w-6 h-6 bg-white rounded flex items-center justify-center text-xs font-bold" style={{display: 'none'}}>
                      {channel.icon}
                    </div>
                    <span className="text-white font-semibold">{channel.name}</span>
                    <span className="text-white text-sm">{channel.dimensions}</span>
                  </div>
                  
                  {/* Mobile Mockup */}
                  <div className="relative mx-auto" style={{width: '300px', height: '600px'}}>
                    {/* Phone Frame */}
                    <div className="absolute inset-0 bg-black rounded-[2.5rem] p-2">
                      <div className="w-full h-full bg-white rounded-[2rem] overflow-hidden">
                        {/* Status Bar */}
                        <div className="bg-white px-6 py-2 flex items-center justify-between text-black text-sm">
                          <span className="font-medium">9:41</span>
                          <div className="flex items-center space-x-1">
                            <div className="w-4 h-2 bg-black rounded-sm"></div>
                            <div className="w-6 h-3 border border-black rounded-sm">
                              <div className="w-4 h-1 bg-black rounded-sm m-0.5"></div>
                            </div>
                          </div>
                        </div>
                        
                        {/* App Header */}
                        <div className={`${channel.color} px-4 py-3 flex items-center space-x-3`}>
                          <img 
                            src={logoSrc}
                            alt={`${channel.name} logo`}
                            className="w-8 h-8 object-contain bg-white rounded p-1"
                            onError={(e) => {
                              e.target.style.display = 'none'
                              e.target.nextElementSibling.style.display = 'flex'
                            }}
                          />
                          <div className="w-8 h-8 bg-white rounded flex items-center justify-center text-xs font-bold" style={{display: 'none'}}>
                            {channel.icon}
                          </div>
                          <span className="text-white font-semibold text-lg">{channel.name}</span>
                        </div>
                        
                        {/* Post Content */}
                        <div className="p-4 bg-white">
                          <div className="flex items-center space-x-3 mb-3">
                            <div className="w-10 h-10 bg-purple-600 rounded-full flex items-center justify-center text-white font-bold text-sm">
                              IU
                            </div>
                            <div>
                              <p className="font-semibold text-sm text-gray-900">Ihr Unternehmen</p>
                              <p className="text-xs text-gray-500">Gesponsert · 2 Min</p>
                            </div>
                          </div>
                          
                          <div className="space-y-3">
                            <h4 className="font-semibold text-gray-900 text-sm">
                              {campaignData.content.headline || 'Ihre Überschrift'}
                            </h4>
                            <p className="text-gray-700 text-sm">
                              {campaignData.content.description || 'Ihre Beschreibung'}
                            </p>
                            
                            {/* Engagement */}
                            <div className="flex items-center space-x-4 pt-2 border-t border-gray-100">
                              <div className="flex items-center space-x-1">
                                <Heart className="w-4 h-4 text-red-500" />
                                <span className="text-xs text-gray-600">42</span>
                              </div>
                              <div className="flex items-center space-x-1">
                                <MessageCircle className="w-4 h-4 text-gray-500" />
                                <span className="text-xs text-gray-600">8 Kommentare</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )
            })()}
          </div>
        )}
      </div>
    </div>
  )

  const renderStep4 = () => (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Budget & Finale Freigabe</h2>
        <p className="text-gray-600">Legen Sie Ihr Budget fest und geben Sie Ihre Kampagne frei</p>
      </div>

      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column: Budget & Runtime */}
          <div className="space-y-6">
            <div className="flex items-center space-x-2 mb-4">
              <Euro className="w-5 h-5 text-purple-600" />
              <h3 className="text-lg font-semibold text-gray-900">Budget & Laufzeit</h3>
            </div>
            <p className="text-sm text-gray-600 mb-4">Bestimmen Sie Ihr Werbebudget</p>

            <div className="space-y-4">
              {/* Budget Type */}
              <div>
                <Label className="text-sm font-medium text-gray-700 mb-3 block">Budget-Typ</Label>
                <RadioGroup
                  value={campaignData.budget.type}
                  onValueChange={(value) => setCampaignData(prev => ({
                    ...prev,
                    budget: { ...prev.budget, type: value }
                  }))}
                  className="space-y-2"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="daily" id="daily" />
                    <Label htmlFor="daily" className="text-sm">
                      <span className="font-medium">Tagesbudget</span>
                      <span className="text-gray-500 ml-2">Festes Budget pro Tag</span>
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="total" id="total" />
                    <Label htmlFor="total" className="text-sm">
                      <span className="font-medium">Gesamtbudget</span>
                      <span className="text-gray-500 ml-2">Einmaliges Gesamtbudget</span>
                    </Label>
                  </div>
                </RadioGroup>
              </div>

              {/* Budget Amount */}
              <div>
                <Label htmlFor="budget" className="text-sm font-medium text-gray-700">
                  {campaignData.budget.type === 'daily' ? 'Tagesbudget (€)' : 'Gesamtbudget (€)'} *
                </Label>
                <Input
                  id="budget"
                  type="number"
                  placeholder="z.B. 50"
                  value={campaignData.budget.amount}
                  onChange={(e) => setCampaignData(prev => ({
                    ...prev,
                    budget: { ...prev.budget, amount: e.target.value }
                  }))}
                  className="mt-1"
                />
              </div>

              {/* Duration */}
              <div>
                <Label htmlFor="duration" className="text-sm font-medium text-gray-700">Laufzeit (Tage)</Label>
                <Input
                  id="duration"
                  type="number"
                  placeholder="z.B. 7"
                  value={campaignData.budget.duration}
                  onChange={(e) => setCampaignData(prev => ({
                    ...prev,
                    budget: { ...prev.budget, duration: e.target.value }
                  }))}
                  className="mt-1"
                />
              </div>

              {/* Start Date */}
              <div>
                <Label htmlFor="startDate" className="text-sm font-medium text-gray-700">Startdatum</Label>
                <Input
                  id="startDate"
                  type="date"
                  value={campaignData.budget.startDate}
                  onChange={(e) => setCampaignData(prev => ({
                    ...prev,
                    budget: { ...prev.budget, startDate: e.target.value }
                  }))}
                  className="mt-1"
                />
              </div>
            </div>
          </div>

          {/* Middle Column: Campaign Summary */}
          <div className="space-y-6">
            <div className="flex items-center space-x-2 mb-4">
              <CheckCircle className="w-5 h-5 text-purple-600" />
              <h3 className="text-lg font-semibold text-gray-900">Kampagnen-Zusammenfassung</h3>
            </div>
            <p className="text-sm text-gray-600 mb-4">Überprüfen Sie Ihre Einstellungen</p>

            <div className="space-y-4">
              {/* Goal */}
              <div>
                <h4 className="text-sm font-medium text-gray-900 mb-2">Ziel</h4>
                <div className="text-purple-600 font-medium">
                  {goals.find(g => g.id === campaignData.goal)?.title || 'Nicht ausgewählt'}
                </div>
              </div>

              {/* Channels */}
              <div>
                <h4 className="text-sm font-medium text-gray-900 mb-2">Kanäle ({campaignData.channels.length})</h4>
                <div className="space-y-1">
                  {getSelectedChannels().map(channel => (
                    <div key={channel.id} className="flex items-center space-x-2">
                      <div className="w-4 h-4 bg-blue-600 rounded-full flex items-center justify-center">
                        <span className="text-white text-xs">•</span>
                      </div>
                      <span className="text-sm text-gray-700">{channel.name}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Content */}
              <div>
                <h4 className="text-sm font-medium text-gray-900 mb-2">Inhalte</h4>
                <div className="space-y-2 text-sm">
                  <div>
                    <span className="text-gray-600">Überschrift:</span>
                    <span className="ml-2 text-green-600 font-medium">
                      {campaignData.content.headline ? 'Gesetzt' : 'Nicht gesetzt'}
                    </span>
                  </div>
                  <div>
                    <span className="text-gray-600">Beschreibung:</span>
                    <span className="ml-2 text-green-600 font-medium">
                      {campaignData.content.description ? 'Gesetzt' : 'Nicht gesetzt'}
                    </span>
                  </div>
                  <div>
                    <span className="text-gray-600">Medien:</span>
                    <span className="ml-2 text-green-600 font-medium">
                      {uploadedImages.length} Bilder
                    </span>
                  </div>
                </div>
              </div>

              {/* Budget Summary */}
              {campaignData.budget.amount && (
                <div>
                  <h4 className="text-sm font-medium text-gray-900 mb-2">Budget</h4>
                  <div className="space-y-1 text-sm">
                    <div>
                      <span className="text-gray-600">
                        {campaignData.budget.type === 'daily' ? 'Tagesbudget:' : 'Gesamtbudget:'}
                      </span>
                      <span className="ml-2 font-medium">{campaignData.budget.amount}€</span>
                    </div>
                    {campaignData.budget.duration && (
                      <div>
                        <span className="text-gray-600">Laufzeit:</span>
                        <span className="ml-2 font-medium">{campaignData.budget.duration} Tage</span>
                      </div>
                    )}
                    {campaignData.budget.type === 'daily' && campaignData.budget.duration && (
                      <div>
                        <span className="text-gray-600">Geschätztes Gesamtbudget:</span>
                        <span className="ml-2 font-medium">
                          {(parseFloat(campaignData.budget.amount) * parseFloat(campaignData.budget.duration)).toFixed(2)}€
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Right Column: Important Notice & Confirmations */}
          <div className="space-y-6">
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
              <div className="flex items-start space-x-2">
                <div className="w-5 h-5 text-yellow-600 mt-0.5">⚠️</div>
                <div>
                  <h4 className="text-sm font-medium text-yellow-800 mb-2">Wichtiger Hinweis zum Mediabudget</h4>
                  <p className="text-sm text-yellow-700">
                    Das von Ihnen festgelegte Budget wird als Mediabudget für Ihre Kampagne verwendet 
                    und entsprechend abgerechnet. Dieses Budget wird direkt an die Werbeplattformen 
                    weitergeleitet.
                  </p>
                </div>
              </div>
            </div>

            {/* Confirmations */}
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <Checkbox
                  id="budget-confirmation"
                  checked={campaignData.budgetConfirmed}
                  onCheckedChange={(checked) => setCampaignData(prev => ({
                    ...prev,
                    budgetConfirmed: checked
                  }))}
                  className="mt-1"
                />
                <Label htmlFor="budget-confirmation" className="text-sm text-gray-700 leading-relaxed">
                  Ich bestätige, dass ich verstehe, dass das festgelegte Budget von €{campaignData.budget.amount || '0'} pro Tag als 
                  Mediabudget für meine Kampagne verwendet und entsprechend berechnet wird.
                </Label>
              </div>

              <div className="flex items-start space-x-3">
                <Checkbox
                  id="final-approval"
                  checked={campaignData.finalApproval}
                  onCheckedChange={(checked) => setCampaignData(prev => ({
                    ...prev,
                    finalApproval: checked
                  }))}
                  className="mt-1"
                />
                <Label htmlFor="final-approval" className="text-sm text-gray-700 leading-relaxed">
                  Ich gebe meine finale Freigabe für diese Kampagne und möchte sie jetzt starten. Alle 
                  Angaben sind korrekt und ich bin mit der Umsetzung einverstanden.
                </Label>
              </div>
            </div>
          </div>
        </div>

        {/* Campaign Review Notice */}
        <div className="mt-8 bg-blue-50 border border-blue-200 rounded-lg p-6">
          <div className="flex items-start space-x-3">
            <div className="w-6 h-6 text-blue-600 mt-0.5">ℹ️</div>
            <div>
              <h4 className="text-lg font-medium text-blue-800 mb-2">Hinweis zur Kampagnenprüfung</h4>
              <p className="text-blue-700 mb-2">
                Die Kampagnenprüfung nach Werberichtlinien kann bis zu <strong>24 Stunden</strong> dauern. 
                Sind alle vorgegebenen Richtlinien eingehalten, startet die Kampagne innerhalb von <strong>12 Stunden</strong>.
              </p>
              <p className="text-blue-700 text-sm">
                Sie erhalten eine E-Mail-Benachrichtigung, sobald Ihre Kampagne live geschaltet wurde.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[9999] p-4">
      <div className="bg-white rounded-[10px] shadow-xl w-full max-w-7xl max-h-[95vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b bg-gradient-to-r from-purple-600 to-pink-600">
          <div>
            <h1 className="text-2xl font-bold text-white">Kampagne erstellen</h1>
            <p className="text-white/80 text-sm">
              Schritt {currentStep} von 4: {
                currentStep === 1 ? 'Ziel & Kanäle' :
                currentStep === 2 ? 'Inhalte & Medien' :
                currentStep === 3 ? 'Vorschau' :
                'Budget & Freigabe'
              }
            </p>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={onClose}
            className="text-white hover:bg-white/10"
          >
            <X className="w-5 h-5" />
          </Button>
        </div>

        {/* Progress Bar */}
        <div className="px-6 py-4 border-b bg-gray-50">
          <div className="flex items-center justify-between text-sm text-gray-600 mb-2">
            <span>Start</span>
            <span>{Math.round((currentStep / 4) * 100)}% abgeschlossen</span>
            <span>Fertig</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className="bg-gradient-to-r from-purple-600 to-pink-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${(currentStep / 4) * 100}%` }}
            />
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 p-6 overflow-y-auto">
          {currentStep === 1 && renderStep1()}
          {currentStep === 2 && renderStep2()}
          {currentStep === 3 && renderStep3()}
          {currentStep === 4 && renderStep4()}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between p-6 border-t">
          <Button
            variant="outline"
            onClick={() => setCurrentStep(Math.max(1, currentStep - 1))}
            disabled={currentStep === 1}
            className="flex items-center space-x-2"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Zurück</span>
          </Button>

          <div className="text-sm text-gray-500">
            Schritt {currentStep} von 4
          </div>

          {currentStep < 4 ? (
            <Button
              onClick={() => setCurrentStep(currentStep + 1)}
              disabled={
                (currentStep === 1 && !canProceedToStep2()) ||
                (currentStep === 2 && !canProceedToStep3()) ||
                (currentStep === 3 && !canProceedToStep4())
              }
              className="flex items-center space-x-2 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
            >
              <span>Weiter</span>
              <ArrowRight className="w-4 h-4" />
            </Button>
          ) : (
            <Button
              onClick={handleCreateCampaign}
              disabled={!canCreateCampaign()}
              className="flex items-center space-x-2 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700"
            >
              <span>Kampagne starten</span>
              <ArrowRight className="w-4 h-4" />
            </Button>
          )}
        </div>
      </div>
    </div>
  )
}

export default CampaignWizard
