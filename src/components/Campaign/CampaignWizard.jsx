import React, { useState } from 'react'
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
  ChevronRight
} from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card'
import { Button } from '../ui/button'
import { Badge } from '../ui/badge'
import { Input } from '../ui/input'
import { Label } from '../ui/label'
import { Textarea } from '../ui/textarea'
import { RadioGroup, RadioGroupItem } from '../ui/radio-group'
import { Checkbox } from '../ui/checkbox'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select'

const CampaignWizard = ({ onClose }) => {
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
      images: {},
      videos: {}
    },
    budget: {
      type: 'daily',
      amount: '',
      duration: '',
      startDate: '',
      endDate: ''
    },
    budgetConfirmed: false
  })

  const steps = [
    { id: 1, title: 'Kampagne erstellen', description: '3-Spalten Ansicht: Ziel, Kanäle, Inhalte & Vorschau' },
    { id: 2, title: 'Budget & Buchung', description: 'Budget festlegen und Kampagne buchen' }
  ]

  const handleImageUpload = (event, format) => {
    const file = event.target.files[0]
    if (file) {
      // Validate image dimensions
      const img = new Image()
      img.onload = () => {
        let isValid = false
        if (format === '1:1' && img.width === 1080 && img.height === 1080) isValid = true
        if (format === 'Story' && img.width === 1080 && img.height === 1920) isValid = true
        if (format === 'Landscape' && img.width === 1200 && img.height === 630) isValid = true

        if (isValid) {
          const reader = new FileReader()
          reader.onload = (e) => {
            setCampaignData(prev => ({
              ...prev,
              content: {
                ...prev.content,
                images: {
                  ...prev.content.images,
                  [format]: e.target.result
                }
              }
            }))
          }
          reader.readAsDataURL(file)
        } else {
          alert(`Bitte laden Sie ein Bild mit den korrekten Abmessungen hoch: ${format === '1:1' ? '1080x1080px' : format === 'Story' ? '1080x1920px' : '1200x630px'}`)
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

  const canCreateCampaign = () => {
    return campaignData.budget.amount && campaignData.budgetConfirmed
  }

  const nextStep = () => {
    if (currentStep < steps.length && canProceedToStep2()) {
      setCurrentStep(currentStep + 1)
    }
  }

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  const goals = [
    {
      id: 'awareness',
      title: 'Markenbekanntheit',
      description: 'Erhöhen Sie die Sichtbarkeit Ihrer Marke',
      icon: <Eye className="w-6 h-6" />,
      color: 'bg-blue-500'
    },
    {
      id: 'traffic',
      title: 'Website-Traffic',
      description: 'Mehr Besucher auf Ihre Website leiten',
      icon: <Globe className="w-6 h-6" />,
      color: 'bg-green-500'
    },
    {
      id: 'leads',
      title: 'Lead-Generierung',
      description: 'Potentielle Kunden gewinnen',
      icon: <Target className="w-6 h-6" />,
      color: 'bg-purple-500'
    },
    {
      id: 'sales',
      title: 'Verkäufe steigern',
      description: 'Direkte Verkäufe fördern',
      icon: <ShoppingCart className="w-6 h-6" />,
      color: 'bg-orange-500'
    },
    {
      id: 'app',
      title: 'App-Downloads',
      description: 'Mobile App Installationen erhöhen',
      icon: <Smartphone className="w-6 h-6" />,
      color: 'bg-pink-500'
    }
  ]

  const channels = [
    {
      id: 'facebook',
      name: 'Facebook',
      icon: <Facebook className="w-5 h-5" />,
      format: '1:1',
      dimensions: '1080x1080px',
      color: 'bg-blue-600'
    },
    {
      id: 'instagram',
      name: 'Instagram',
      icon: <Instagram className="w-5 h-5" />,
      format: '1:1',
      dimensions: '1080x1080px',
      color: 'bg-pink-600'
    },
    {
      id: 'google',
      name: 'Google Ads',
      icon: <Search className="w-5 h-5" />,
      format: '1:1',
      dimensions: '1080x1080px',
      color: 'bg-red-600'
    },
    {
      id: 'tiktok',
      name: 'TikTok',
      icon: <Music className="w-5 h-5" />,
      format: 'Story',
      dimensions: '1080x1920px',
      color: 'bg-black'
    },
    {
      id: 'snapchat',
      name: 'Snapchat',
      icon: <Camera className="w-5 h-5" />,
      format: 'Story',
      dimensions: '1080x1920px',
      color: 'bg-yellow-400'
    },
    {
      id: 'reddit',
      name: 'Reddit',
      icon: <MessageCircle className="w-5 h-5" />,
      format: 'Landscape',
      dimensions: '1200x630px',
      color: 'bg-orange-600'
    },
    {
      id: 'linkedin',
      name: 'LinkedIn',
      icon: <Linkedin className="w-5 h-5" />,
      format: '1:1',
      dimensions: '1080x1080px',
      color: 'bg-blue-700'
    },
    {
      id: 'spotify',
      name: 'Spotify',
      icon: <Music className="w-5 h-5" />,
      format: '1:1',
      dimensions: '1080x1080px',
      color: 'bg-green-600'
    }
  ]

  const getSelectedChannels = () => {
    return channels.filter(channel => campaignData.channels.includes(channel.id))
  }

  const getRequiredFormats = () => {
    const selectedChannels = getSelectedChannels()
    const formats = new Set()
    selectedChannels.forEach(channel => {
      formats.add(channel.format)
    })
    return Array.from(formats)
  }

  const renderStep1 = () => (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-full">
      {/* Left Column: Goals & Channels */}
      <div className="space-y-6 max-h-[70vh] overflow-y-auto">
        {/* Campaign Goals */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Target className="w-5 h-5 text-purple-600" />
              <span>Kampagnenziel auswählen</span>
            </CardTitle>
            <CardDescription>Was möchten Sie mit Ihrer Kampagne erreichen?</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {goals.map((goal) => (
              <div
                key={goal.id}
                onClick={() => handleGoalSelect(goal.id)}
                className={`p-4 border rounded-lg cursor-pointer transition-all hover:shadow-md ${
                  campaignData.goal === goal.id
                    ? 'border-purple-500 bg-purple-50 shadow-md'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <div className="flex items-center space-x-3">
                  <div className={`p-2 rounded-lg text-white ${goal.color}`}>
                    {goal.icon}
                  </div>
                  <div>
                    <h3 className="font-semibold">{goal.title}</h3>
                    <p className="text-sm text-gray-600">{goal.description}</p>
                  </div>
                  {campaignData.goal === goal.id && (
                    <CheckCircle className="w-5 h-5 text-purple-600 ml-auto" />
                  )}
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Channel Selection */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Globe className="w-5 h-5 text-purple-600" />
              <span>Kanäle auswählen</span>
            </CardTitle>
            <CardDescription>Wählen Sie die Plattformen für Ihre Kampagne</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-3">
              {channels.map((channel) => (
                <div
                  key={channel.id}
                  onClick={() => handleChannelToggle(channel.id)}
                  className={`p-3 border rounded-lg cursor-pointer transition-all hover:shadow-md ${
                    campaignData.channels.includes(channel.id)
                      ? 'border-purple-500 bg-purple-50 shadow-md'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <div className="flex items-center space-x-2 mb-2">
                    <div className={`p-1 rounded text-white ${channel.color}`}>
                      {channel.icon}
                    </div>
                    <span className="font-medium text-sm">{channel.name}</span>
                    {campaignData.channels.includes(channel.id) && (
                      <CheckCircle className="w-4 h-4 text-purple-600 ml-auto" />
                    )}
                  </div>
                  <div className="text-xs text-gray-500">
                    {channel.format} Format<br />
                    {channel.dimensions}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Middle Column: Content Creation */}
      <div className="space-y-6 max-h-[70vh] overflow-y-auto">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <MessageCircle className="w-5 h-5 text-purple-600" />
              <span>Inhalte erstellen</span>
            </CardTitle>
            <CardDescription>Erstellen Sie ansprechende Inhalte für Ihre Kampagne</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="headline">Überschrift *</Label>
              <Input
                id="headline"
                placeholder="Ihre aussagekräftige Überschrift..."
                value={campaignData.content.headline}
                onChange={(e) => handleContentChange('headline', e.target.value)}
                className="mt-1"
              />
            </div>

            <div>
              <Label htmlFor="description">Beschreibung *</Label>
              <Textarea
                id="description"
                placeholder="Beschreiben Sie Ihr Angebot..."
                value={campaignData.content.description}
                onChange={(e) => handleContentChange('description', e.target.value)}
                className="mt-1"
                rows={3}
              />
            </div>

            <div>
              <Label htmlFor="cta">Call-to-Action</Label>
              <Input
                id="cta"
                placeholder="z.B. Jetzt kaufen, Mehr erfahren..."
                value={campaignData.content.callToAction}
                onChange={(e) => handleContentChange('callToAction', e.target.value)}
                className="mt-1"
              />
            </div>

            {/* Media Upload */}
            {getSelectedChannels().length > 0 && (
              <div className="space-y-4">
                <div className="flex items-center space-x-2">
                  <Upload className="w-5 h-5 text-purple-600" />
                  <h4 className="font-semibold">Medien hochladen</h4>
                </div>
                
                {/* Image Upload by Format */}
                {getRequiredFormats().map((format) => (
                  <div key={format} className="border rounded-lg p-4 bg-gray-50">
                    <div className="flex items-center justify-between mb-3">
                      <span className="font-medium text-purple-700">{format} Format</span>
                      <Badge variant="outline" className="bg-white">
                        {format === '1:1' ? '1080x1080px' : format === 'Story' ? '1080x1920px' : '1200x630px'}
                      </Badge>
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center space-x-2">
                        <Input
                          type="file"
                          accept="image/*"
                          onChange={(e) => handleImageUpload(e, format)}
                          className="flex-1"
                        />
                        {campaignData.content.images[format] && (
                          <CheckCircle className="w-5 h-5 text-green-500" />
                        )}
                      </div>
                      <p className="text-xs text-gray-600">
                        Für: {getSelectedChannels().filter(ch => ch.format === format).map(ch => ch.name).join(', ')}
                      </p>
                      {campaignData.content.images[format] && (
                        <div className="mt-2">
                          <img
                            src={campaignData.content.images[format]}
                            alt={`${format} Preview`}
                            className="w-20 h-20 object-cover rounded border"
                          />
                        </div>
                      )}
                    </div>
                  </div>
                ))}

                {/* Video Upload */}
                <div className="border rounded-lg p-4 bg-gray-50">
                  <div className="flex items-center space-x-2 mb-3">
                    <Play className="w-5 h-5 text-purple-600" />
                    <span className="font-medium text-purple-700">Video hochladen (optional)</span>
                  </div>
                  <Input
                    type="file"
                    accept="video/mp4,video/mov,video/avi"
                    onChange={handleVideoUpload}
                    className="mb-2"
                  />
                  <p className="text-xs text-gray-600">Unterstützte Formate: MP4, MOV, AVI</p>
                  {uploadedVideos.length > 0 && (
                    <div className="mt-2 space-y-1">
                      {uploadedVideos.map((video) => (
                        <div key={video.id} className="flex items-center space-x-2 text-sm text-green-600">
                          <CheckCircle className="w-4 h-4" />
                          <span>{video.name}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Right Column: Live Preview */}
      <div className="space-y-6 max-h-[70vh] overflow-y-auto">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Eye className="w-5 h-5 text-purple-600" />
              <span>Live-Vorschau</span>
            </CardTitle>
            <CardDescription>So wird Ihre Anzeige aussehen</CardDescription>
          </CardHeader>
          <CardContent>
            {getSelectedChannels().length > 0 ? (
              <div className="space-y-4">
                {/* Channel Navigation */}
                <div className="flex items-center justify-between">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setCurrentPreviewIndex(Math.max(0, currentPreviewIndex - 1))}
                    disabled={currentPreviewIndex === 0}
                    className="flex items-center space-x-1"
                  >
                    <ChevronLeft className="w-4 h-4 text-purple-600" />
                    <span>Zurück</span>
                  </Button>
                  <Badge variant="secondary" className="bg-purple-100 text-purple-700">
                    {getSelectedChannels()[currentPreviewIndex]?.name} ({currentPreviewIndex + 1} von {getSelectedChannels().length})
                  </Badge>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setCurrentPreviewIndex(Math.min(getSelectedChannels().length - 1, currentPreviewIndex + 1))}
                    disabled={currentPreviewIndex === getSelectedChannels().length - 1}
                    className="flex items-center space-x-1"
                  >
                    <span>Weiter</span>
                    <ChevronRight className="w-4 h-4 text-purple-600" />
                  </Button>
                </div>

                {/* Preview Content */}
                <div className="border rounded-lg p-4 bg-gradient-to-br from-gray-50 to-gray-100">
                  <div className="bg-white rounded-lg p-4 shadow-sm">
                    <div className="flex items-center space-x-2 mb-3">
                      <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
                        <span className="text-white text-xs font-bold">IU</span>
                      </div>
                      <div>
                        <p className="font-semibold text-sm">Ihr Unternehmen</p>
                        <p className="text-xs text-gray-500 flex items-center">
                          <span className="w-2 h-2 bg-blue-500 rounded-full mr-1"></span>
                          Gesponsert
                        </p>
                      </div>
                    </div>
                    
                    {campaignData.content.headline && (
                      <h3 className="font-semibold mb-2 text-gray-800">{campaignData.content.headline}</h3>
                    )}
                    
                    {campaignData.content.description && (
                      <p className="text-sm text-gray-600 mb-3">{campaignData.content.description}</p>
                    )}
                    
                    {/* Image Preview */}
                    {getSelectedChannels()[currentPreviewIndex] && campaignData.content.images[getSelectedChannels()[currentPreviewIndex].format] && (
                      <div className="mb-3">
                        <img
                          src={campaignData.content.images[getSelectedChannels()[currentPreviewIndex].format]}
                          alt="Preview"
                          className="w-full rounded-lg shadow-sm"
                          style={{ maxHeight: '200px', objectFit: 'cover' }}
                        />
                      </div>
                    )}
                    
                    {campaignData.content.callToAction && (
                      <Button size="sm" className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white shadow-md">
                        {campaignData.content.callToAction}
                      </Button>
                    )}

                    {/* Engagement Preview */}
                    <div className="flex items-center justify-between mt-4 pt-3 border-t text-gray-500">
                      <div className="flex items-center space-x-4 text-xs">
                        <span className="flex items-center space-x-1">
                          <Heart className="w-3 h-3" />
                          <span>42</span>
                        </span>
                        <span className="flex items-center space-x-1">
                          <MessageCircle className="w-3 h-3" />
                          <span>8</span>
                        </span>
                        <span className="flex items-center space-x-1">
                          <Share className="w-3 h-3" />
                          <span>3</span>
                        </span>
                      </div>
                      <MoreHorizontal className="w-4 h-4" />
                    </div>
                  </div>
                </div>

                {/* Navigation Dots */}
                <div className="flex justify-center space-x-2">
                  {getSelectedChannels().map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentPreviewIndex(index)}
                      className={`w-2 h-2 rounded-full transition-all ${
                        index === currentPreviewIndex ? 'bg-purple-600' : 'bg-gray-300'
                      }`}
                    />
                  ))}
                </div>
              </div>
            ) : (
              <div className="text-center py-8 text-gray-500">
                <Eye className="w-12 h-12 mx-auto mb-3 text-gray-300" />
                <p>Wählen Sie Kanäle aus, um eine Vorschau zu sehen</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )

  const renderStep2 = () => (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold mb-2 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
          Budget & Buchung
        </h2>
        <p className="text-gray-600">Legen Sie Ihr Mediabudget fest und buchen Sie Ihre Kampagne</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Budget Settings */}
        <Card className="border-purple-200">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Euro className="w-5 h-5 text-purple-600" />
              <span>Budget & Laufzeit</span>
            </CardTitle>
            <CardDescription>Bestimmen Sie Ihr Werbebudget</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label className="text-sm font-medium mb-3 block">Budget-Typ</Label>
              <RadioGroup
                value={campaignData.budget.type}
                onValueChange={(value) => setCampaignData(prev => ({
                  ...prev,
                  budget: { ...prev.budget, type: value }
                }))}
                className="space-y-3"
              >
                <div className="flex items-center space-x-3 p-3 border rounded-lg hover:bg-purple-50 transition-colors">
                  <RadioGroupItem value="daily" id="daily" className="text-purple-600" />
                  <Label htmlFor="daily" className="flex-1 cursor-pointer">
                    <div className="font-medium">Tagesbudget</div>
                    <div className="text-xs text-gray-500">Festes Budget pro Tag</div>
                  </Label>
                </div>
                <div className="flex items-center space-x-3 p-3 border rounded-lg hover:bg-purple-50 transition-colors">
                  <RadioGroupItem value="total" id="total" className="text-purple-600" />
                  <Label htmlFor="total" className="flex-1 cursor-pointer">
                    <div className="font-medium">Gesamtbudget</div>
                    <div className="text-xs text-gray-500">Einmaliges Gesamtbudget</div>
                  </Label>
                </div>
              </RadioGroup>
            </div>

            <div>
              <Label htmlFor="budget-amount" className="flex items-center space-x-2">
                <Euro className="w-4 h-4 text-purple-600" />
                <span>{campaignData.budget.type === 'daily' ? 'Tagesbudget' : 'Gesamtbudget'} (€) *</span>
              </Label>
              <Input
                id="budget-amount"
                type="number"
                min="1"
                placeholder="z.B. 50"
                value={campaignData.budget.amount}
                onChange={(e) => setCampaignData(prev => ({
                  ...prev,
                  budget: { ...prev.budget, amount: e.target.value }
                }))}
                className="mt-2 border-purple-200 focus:border-purple-500"
              />
            </div>

            {campaignData.budget.type === 'daily' && (
              <div>
                <Label htmlFor="duration" className="flex items-center space-x-2">
                  <Calendar className="w-4 h-4 text-purple-600" />
                  <span>Laufzeit (Tage)</span>
                </Label>
                <Input
                  id="duration"
                  type="number"
                  min="1"
                  placeholder="z.B. 7"
                  value={campaignData.budget.duration}
                  onChange={(e) => setCampaignData(prev => ({
                    ...prev,
                    budget: { ...prev.budget, duration: e.target.value }
                  }))}
                  className="mt-2 border-purple-200 focus:border-purple-500"
                />
              </div>
            )}

            <div>
              <Label htmlFor="start-date" className="flex items-center space-x-2">
                <Calendar className="w-4 h-4 text-purple-600" />
                <span>Startdatum</span>
              </Label>
              <Input
                id="start-date"
                type="date"
                value={campaignData.budget.startDate}
                onChange={(e) => setCampaignData(prev => ({
                  ...prev,
                  budget: { ...prev.budget, startDate: e.target.value }
                }))}
                className="mt-2 border-purple-200 focus:border-purple-500"
              />
            </div>
          </CardContent>
        </Card>

        {/* Campaign Summary */}
        <Card className="border-purple-200">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <CheckCircle className="w-5 h-5 text-purple-600" />
              <span>Kampagnen-Zusammenfassung</span>
            </CardTitle>
            <CardDescription>Überprüfen Sie Ihre Einstellungen</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="p-3 bg-purple-50 rounded-lg">
              <h4 className="font-semibold mb-2 text-purple-800">Ziel</h4>
              <p className="text-sm text-purple-600">
                {goals.find(g => g.id === campaignData.goal)?.title || 'Nicht ausgewählt'}
              </p>
            </div>

            <div className="p-3 bg-blue-50 rounded-lg">
              <h4 className="font-semibold mb-2 text-blue-800">Kanäle ({campaignData.channels.length})</h4>
              <div className="flex flex-wrap gap-2">
                {getSelectedChannels().map((channel) => (
                  <Badge key={channel.id} variant="secondary" className="text-xs bg-white border-blue-200">
                    <div className={`w-2 h-2 rounded-full mr-1 ${channel.color}`}></div>
                    {channel.name}
                  </Badge>
                ))}
              </div>
            </div>

            <div className="p-3 bg-green-50 rounded-lg">
              <h4 className="font-semibold mb-2 text-green-800">Medien</h4>
              <p className="text-sm text-green-600">
                {Object.keys(campaignData.content.images).length} Bilder hochgeladen
                {uploadedVideos.length > 0 && `, ${uploadedVideos.length} Videos`}
              </p>
            </div>

            {campaignData.budget.amount && (
              <div className="p-3 bg-orange-50 rounded-lg">
                <h4 className="font-semibold mb-2 text-orange-800">Budget</h4>
                <p className="text-sm text-orange-600">
                  {campaignData.budget.type === 'daily' ? 'Täglich' : 'Gesamt'}: €{campaignData.budget.amount}
                  {campaignData.budget.duration && ` für ${campaignData.budget.duration} Tage`}
                </p>
                {campaignData.budget.type === 'daily' && campaignData.budget.duration && (
                  <p className="text-sm font-semibold text-orange-700 mt-1">
                    Geschätztes Gesamtbudget: €{campaignData.budget.amount * campaignData.budget.duration}
                  </p>
                )}
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Budget Confirmation */}
      <Card className="border-yellow-200 bg-yellow-50">
        <CardContent className="p-6">
          <div className="bg-yellow-100 border border-yellow-300 rounded-lg p-4 mb-4">
            <div className="flex items-start space-x-3">
              <div className="w-6 h-6 bg-yellow-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                <span className="text-white text-sm font-bold">!</span>
              </div>
              <div>
                <h4 className="font-semibold text-yellow-800 mb-2">Wichtiger Hinweis zum Mediabudget</h4>
                <p className="text-sm text-yellow-700">
                  Das von Ihnen festgelegte Budget wird als Mediabudget für Ihre Kampagne verwendet und 
                  entsprechend abgerechnet. Dieses Budget wird direkt an die Werbeplattformen weitergeleitet.
                </p>
              </div>
            </div>
          </div>

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
            <Label htmlFor="budget-confirmation" className="text-sm leading-relaxed">
              Ich bestätige, dass ich verstehe, dass das festgelegte Budget von €{campaignData.budget.amount || '0'} 
              {campaignData.budget.type === 'daily' ? ' pro Tag' : ' insgesamt'} als Mediabudget für meine Kampagne 
              verwendet und entsprechend berechnet wird. Ich bin mit der Abrechnung dieses Betrags einverstanden.
            </Label>
          </div>
        </CardContent>
      </Card>
    </div>
  )

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-7xl max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b bg-gradient-to-r from-purple-50 to-pink-50">
          <div>
            <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              Kampagne erstellen
            </h1>
            <p className="text-gray-600">Schritt {currentStep} von {steps.length}: {steps[currentStep - 1]?.title}</p>
          </div>
          <Button variant="ghost" size="sm" onClick={onClose} className="hover:bg-red-50 hover:text-red-600">
            <X className="w-5 h-5" />
          </Button>
        </div>

        {/* Progress Bar */}
        <div className="px-6 py-4 border-b bg-gray-50">
          <div className="w-full bg-gray-200 rounded-full h-3">
            <div 
              className="bg-gradient-to-r from-purple-600 to-pink-600 h-3 rounded-full transition-all duration-500 shadow-sm"
              style={{ width: `${(currentStep / steps.length) * 100}%` }}
            ></div>
          </div>
          <div className="flex justify-between mt-2 text-xs text-gray-500">
            <span>Start</span>
            <span>{Math.round((currentStep / steps.length) * 100)}% abgeschlossen</span>
            <span>Fertig</span>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 p-6 overflow-hidden">
          {currentStep === 1 && renderStep1()}
          {currentStep === 2 && renderStep2()}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between p-6 border-t bg-gray-50">
          <Button
            onClick={prevStep}
            disabled={currentStep === 1}
            variant="outline"
            className="flex items-center space-x-2 hover:bg-gray-100"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Zurück</span>
          </Button>

          <div className="text-sm text-gray-500 bg-white px-3 py-1 rounded-full border">
            Schritt {currentStep} von {steps.length}
          </div>

          {currentStep < steps.length ? (
            <Button
              onClick={nextStep}
              disabled={!canProceedToStep2()}
              className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white flex items-center space-x-2 shadow-md"
            >
              <span>Weiter</span>
              <ArrowRight className="w-4 h-4" />
            </Button>
          ) : (
            <Button
              onClick={() => {
                console.log('Campaign created:', campaignData)
                onClose()
              }}
              disabled={!canCreateCampaign()}
              className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white flex items-center space-x-2 shadow-md"
            >
              <span>Kampagne erstellen</span>
              <CheckCircle className="w-4 h-4" />
            </Button>
          )}
        </div>
      </div>
    </div>
  )
}

export default CampaignWizard
