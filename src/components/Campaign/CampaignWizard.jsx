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
  MoreHorizontal
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

const CampaignWizard = ({ onClose }) => {
  const [currentStep, setCurrentStep] = useState(1)
  const [uploadedImages, setUploadedImages] = useState([])
  const [uploadedVideos, setUploadedVideos] = useState([])
  const [campaignData, setCampaignData] = useState({
    goal: '',
    channels: [],
    content: {
      headline: '',
      description: '',
      callToAction: '',
      targetAudience: '',
      images: {},
      videos: {}
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
          format: format
        }
        
        setUploadedImages(prev => {
          const filtered = prev.filter(img => img.format !== format)
          return [...filtered, newImage]
        })
        
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

  const handleVideoUpload = (event, format) => {
    const file = event.target.files[0]
    if (file && file.type.startsWith('video/') && file.size <= 100 * 1024 * 1024) { // 100MB limit for videos
      const reader = new FileReader()
      reader.onload = (e) => {
        const newVideo = {
          id: Date.now() + Math.random(),
          file: file,
          url: e.target.result,
          name: file.name,
          format: format
        }
        
        setUploadedVideos(prev => {
          const filtered = prev.filter(vid => vid.format !== format)
          return [...filtered, newVideo]
        })
        
        setCampaignData(prev => ({
          ...prev,
          content: {
            ...prev.content,
            videos: {
              ...prev.content.videos,
              [format]: newVideo
            }
          }
        }))
      }
      reader.readAsDataURL(file)
    }
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
      icon: Globe,
      color: 'bg-blue-500'
    },
    {
      id: 'product-sales',
      name: 'Produkt- und Markenkauf',
      description: 'Verkäufe und Conversions steigern',
      icon: ShoppingCart,
      color: 'bg-green-500'
    },
    {
      id: 'app-installation',
      name: 'App-Installation',
      description: 'App-Downloads fördern',
      icon: Smartphone,
      color: 'bg-purple-500'
    },
    {
      id: 'brand-awareness',
      name: 'Markenbekanntheit',
      description: 'Reichweite und Bekanntheit erhöhen',
      icon: Eye,
      color: 'bg-orange-500'
    }
  ]

  const channels = [
    {
      id: 'facebook',
      name: 'Facebook',
      icon: Facebook,
      color: 'bg-blue-600',
      description: 'Erreichen Sie Ihre Zielgruppe auf Facebook',
      users: '2.9B Nutzer weltweit'
    },
    {
      id: 'instagram',
      name: 'Instagram',
      icon: Instagram,
      color: 'bg-gradient-to-r from-purple-500 to-pink-500',
      description: 'Visuelle Inhalte für Instagram',
      users: '2.0B Nutzer weltweit'
    },
    {
      id: 'google',
      name: 'Google Ads',
      icon: Search,
      color: 'bg-green-600',
      description: 'Suchanzeigen bei Google',
      users: '8.5B Suchanfragen täglich'
    },
    {
      id: 'tiktok',
      name: 'TikTok',
      icon: Play,
      color: 'bg-black',
      description: 'Kurze Videos für TikTok',
      users: '1.0B Nutzer weltweit'
    },
    {
      id: 'snapchat',
      name: 'Snapchat',
      icon: Camera,
      color: 'bg-yellow-400',
      description: 'Junge Zielgruppe auf Snapchat',
      users: '750M Nutzer weltweit'
    },
    {
      id: 'reddit',
      name: 'Reddit',
      icon: MessageCircle,
      color: 'bg-orange-600',
      description: 'Community-Marketing auf Reddit',
      users: '430M Nutzer weltweit'
    },
    {
      id: 'linkedin',
      name: 'LinkedIn',
      icon: Linkedin,
      color: 'bg-blue-700',
      description: 'B2B Marketing auf LinkedIn',
      users: '900M Nutzer weltweit'
    },
    {
      id: 'spotify',
      name: 'Spotify',
      icon: Music,
      color: 'bg-green-500',
      description: 'Audio-Werbung auf Spotify',
      users: '500M Nutzer weltweit'
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

  // Enhanced Preview Components
  const FacebookPreview = ({ content, image }) => (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden max-w-md mx-auto">
      <div className="p-4 border-b">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center">
            <span className="text-white font-bold text-sm">FB</span>
          </div>
          <div>
            <p className="font-semibold text-gray-900">Ihr Unternehmen</p>
            <p className="text-xs text-gray-500">Gesponsert</p>
          </div>
        </div>
      </div>
      {image && (
        <div className="aspect-video bg-gray-100">
          <img src={image.url} alt="Preview" className="w-full h-full object-cover" />
        </div>
      )}
      <div className="p-4">
        <h3 className="font-semibold text-gray-900 mb-2">{content.headline || 'Ihre Überschrift'}</h3>
        <p className="text-gray-700 text-sm mb-3">{content.description || 'Ihre Beschreibung'}</p>
        <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white">
          {content.callToAction || 'Mehr erfahren'}
        </Button>
      </div>
      <div className="px-4 pb-4 flex items-center justify-between text-gray-500">
        <div className="flex items-center space-x-4">
          <button className="flex items-center space-x-1 hover:text-blue-600">
            <Heart className="w-4 h-4" />
            <span className="text-sm">Gefällt mir</span>
          </button>
          <button className="flex items-center space-x-1 hover:text-blue-600">
            <MessageCircle className="w-4 h-4" />
            <span className="text-sm">Kommentieren</span>
          </button>
          <button className="flex items-center space-x-1 hover:text-blue-600">
            <Share className="w-4 h-4" />
            <span className="text-sm">Teilen</span>
          </button>
        </div>
      </div>
    </div>
  )

  const InstagramPreview = ({ content, image }) => (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden max-w-md mx-auto">
      <div className="p-3 border-b flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
            <span className="text-white font-bold text-xs">IG</span>
          </div>
          <span className="font-semibold text-sm">ihr_unternehmen</span>
        </div>
        <MoreHorizontal className="w-5 h-5 text-gray-600" />
      </div>
      {image && (
        <div className="aspect-square bg-gray-100">
          <img src={image.url} alt="Preview" className="w-full h-full object-cover" />
        </div>
      )}
      <div className="p-3">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center space-x-4">
            <Heart className="w-6 h-6 text-gray-700" />
            <MessageCircle className="w-6 h-6 text-gray-700" />
            <Share className="w-6 h-6 text-gray-700" />
          </div>
        </div>
        <p className="text-sm">
          <span className="font-semibold">ihr_unternehmen</span>{' '}
          {content.headline && <span className="font-semibold">{content.headline}</span>}
          {content.description && <span> {content.description}</span>}
        </p>
        {content.callToAction && (
          <p className="text-blue-600 text-sm mt-2 font-medium">{content.callToAction}</p>
        )}
      </div>
    </div>
  )

  const GooglePreview = ({ content }) => (
    <div className="bg-white rounded-lg shadow-lg p-4 max-w-md mx-auto border">
      <div className="mb-2">
        <div className="flex items-center space-x-2 mb-1">
          <div className="w-4 h-4 bg-green-600 rounded-full"></div>
          <span className="text-green-700 text-sm">Anzeige</span>
        </div>
        <h3 className="text-blue-600 text-lg font-medium hover:underline cursor-pointer">
          {content.headline || 'Ihre Überschrift - Ihr Unternehmen'}
        </h3>
        <p className="text-green-700 text-sm">www.ihr-unternehmen.de</p>
      </div>
      <p className="text-gray-700 text-sm leading-relaxed">
        {content.description || 'Ihre Beschreibung erscheint hier. Überzeugen Sie potenzielle Kunden mit einer klaren Botschaft.'}
      </p>
      {content.callToAction && (
        <div className="mt-3">
          <Button size="sm" className="bg-blue-600 hover:bg-blue-700 text-white">
            {content.callToAction}
          </Button>
        </div>
      )}
    </div>
  )

  const TikTokPreview = ({ content, image }) => (
    <div className="bg-black rounded-lg shadow-lg overflow-hidden max-w-md mx-auto aspect-[9/16] relative">
      {image && (
        <img src={image.url} alt="Preview" className="w-full h-full object-cover" />
      )}
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
      <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
        <div className="flex items-end justify-between">
          <div className="flex-1">
            <p className="font-semibold mb-1">@ihr_unternehmen</p>
            <p className="text-sm mb-2">{content.headline || 'Ihre TikTok Überschrift'}</p>
            <p className="text-xs opacity-90">{content.description || 'Ihre Beschreibung'}</p>
            {content.callToAction && (
              <Button size="sm" className="mt-2 bg-white text-black hover:bg-gray-100">
                {content.callToAction}
              </Button>
            )}
          </div>
          <div className="flex flex-col items-center space-y-4 ml-4">
            <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center">
              <Heart className="w-6 h-6 text-red-500" />
            </div>
            <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center">
              <MessageCircle className="w-6 h-6 text-black" />
            </div>
            <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center">
              <Share className="w-6 h-6 text-black" />
            </div>
          </div>
        </div>
      </div>
    </div>
  )

  const LinkedInPreview = ({ content, image }) => (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden max-w-md mx-auto border">
      <div className="p-4 border-b">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-blue-700 rounded-full flex items-center justify-center">
            <span className="text-white font-bold text-sm">LI</span>
          </div>
          <div>
            <p className="font-semibold text-gray-900">Ihr Unternehmen</p>
            <p className="text-xs text-gray-500">Gesponsert</p>
          </div>
        </div>
      </div>
      {image && (
        <div className="aspect-video bg-gray-100">
          <img src={image.url} alt="Preview" className="w-full h-full object-cover" />
        </div>
      )}
      <div className="p-4">
        <h3 className="font-semibold text-gray-900 mb-2">{content.headline || 'Ihre LinkedIn Überschrift'}</h3>
        <p className="text-gray-700 text-sm mb-3">{content.description || 'Ihre professionelle Beschreibung'}</p>
        <Button className="w-full bg-blue-700 hover:bg-blue-800 text-white">
          {content.callToAction || 'Mehr erfahren'}
        </Button>
      </div>
    </div>
  )

  const SpotifyPreview = ({ content }) => (
    <div className="bg-black rounded-lg shadow-lg p-4 max-w-md mx-auto text-white">
      <div className="flex items-center space-x-3 mb-4">
        <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center">
          <Music className="w-5 h-5 text-black" />
        </div>
        <div>
          <p className="font-semibold">Spotify Audio Ad</p>
          <p className="text-xs text-gray-400">Gesponsert</p>
        </div>
      </div>
      <div className="bg-gray-800 rounded-lg p-4">
        <h3 className="font-semibold mb-2">{content.headline || 'Ihre Audio-Werbung'}</h3>
        <p className="text-sm text-gray-300 mb-3">{content.description || 'Ihre Audio-Beschreibung'}</p>
        <div className="flex items-center justify-between">
          <Button size="sm" className="bg-green-500 hover:bg-green-600 text-black">
            {content.callToAction || 'Jetzt anhören'}
          </Button>
          <div className="flex items-center space-x-2 text-gray-400">
            <Play className="w-4 h-4" />
            <span className="text-xs">30s</span>
          </div>
        </div>
      </div>
    </div>
  )

  const SnapchatPreview = ({ content, image }) => (
    <div className="bg-yellow-400 rounded-lg shadow-lg overflow-hidden max-w-md mx-auto aspect-[9/16] relative">
      {image && (
        <img src={image.url} alt="Preview" className="w-full h-full object-cover" />
      )}
      <div className="absolute top-4 left-4 right-4">
        <div className="bg-black/50 rounded-full px-3 py-1">
          <p className="text-white text-sm font-medium">{content.headline || 'Ihre Snapchat Anzeige'}</p>
        </div>
      </div>
      <div className="absolute bottom-4 left-4 right-4">
        <div className="bg-white rounded-lg p-3">
          <p className="text-sm text-gray-800 mb-2">{content.description || 'Ihre Beschreibung'}</p>
          <Button size="sm" className="w-full bg-yellow-400 hover:bg-yellow-500 text-black">
            {content.callToAction || 'Swipe Up'}
          </Button>
        </div>
      </div>
    </div>
  )

  const RedditPreview = ({ content }) => (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden max-w-md mx-auto border">
      <div className="p-4">
        <div className="flex items-center space-x-2 mb-3">
          <div className="w-6 h-6 bg-orange-600 rounded-full flex items-center justify-center">
            <span className="text-white font-bold text-xs">r/</span>
          </div>
          <span className="text-xs text-gray-500">Promoted</span>
        </div>
        <h3 className="font-semibold text-gray-900 mb-2">{content.headline || 'Ihre Reddit Überschrift'}</h3>
        <p className="text-gray-700 text-sm mb-3">{content.description || 'Ihre Reddit Beschreibung'}</p>
        <div className="flex items-center space-x-4 text-gray-500 text-xs">
          <button className="flex items-center space-x-1 hover:text-orange-600">
            <span>↑</span>
            <span>Upvote</span>
          </button>
          <button className="flex items-center space-x-1 hover:text-orange-600">
            <MessageCircle className="w-3 h-3" />
            <span>Kommentare</span>
          </button>
          <button className="flex items-center space-x-1 hover:text-orange-600">
            <Share className="w-3 h-3" />
            <span>Teilen</span>
          </button>
        </div>
        {content.callToAction && (
          <Button size="sm" className="mt-3 w-full bg-orange-600 hover:bg-orange-700 text-white">
            {content.callToAction}
          </Button>
        )}
      </div>
    </div>
  )

  const renderPreview = (channelId) => {
    const content = campaignData.content
    const image = content.images?.landscape || content.images?.square || content.images?.story

    switch (channelId) {
      case 'facebook':
        return <FacebookPreview content={content} image={image} />
      case 'instagram':
        return <InstagramPreview content={content} image={image} />
      case 'google':
        return <GooglePreview content={content} />
      case 'tiktok':
        return <TikTokPreview content={content} image={image} />
      case 'linkedin':
        return <LinkedInPreview content={content} image={image} />
      case 'spotify':
        return <SpotifyPreview content={content} />
      case 'snapchat':
        return <SnapchatPreview content={content} image={image} />
      case 'reddit':
        return <RedditPreview content={content} />
      default:
        return null
    }
  }

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6">
            <div className="text-center">
              <h3 className="text-2xl font-bold text-gray-900 mb-2">Kampagnenziel auswählen</h3>
              <p className="text-gray-600">Was möchten Sie mit Ihrer Kampagne erreichen?</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {goals.map((goal) => (
                <Card
                  key={goal.id}
                  className={`cursor-pointer transition-all duration-200 hover:shadow-lg hover:scale-105 ${
                    campaignData.goal === goal.id 
                      ? 'ring-2 ring-purple-500 bg-purple-50 shadow-lg' 
                      : 'hover:shadow-md'
                  }`}
                  onClick={() => handleGoalSelect(goal.id)}
                >
                  <CardContent className="p-6">
                    <div className="flex items-start space-x-4">
                      <div className={`w-12 h-12 ${goal.color} rounded-xl flex items-center justify-center`}>
                        <goal.icon className="w-6 h-6 text-white" />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-semibold text-gray-900 mb-1">{goal.name}</h4>
                        <p className="text-sm text-gray-600">{goal.description}</p>
                      </div>
                      {campaignData.goal === goal.id && (
                        <CheckCircle className="w-6 h-6 text-purple-600" />
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
            <div className="text-center">
              <h3 className="text-2xl font-bold text-gray-900 mb-2">Kanäle auswählen</h3>
              <p className="text-gray-600">Auf welchen Plattformen soll Ihre Kampagne laufen?</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {channels.map((channel) => (
                <Card
                  key={channel.id}
                  className={`cursor-pointer transition-all duration-200 hover:shadow-lg ${
                    campaignData.channels.includes(channel.id)
                      ? 'ring-2 ring-purple-500 bg-purple-50 shadow-lg'
                      : 'hover:shadow-md'
                  }`}
                  onClick={() => handleChannelToggle(channel.id)}
                >
                  <CardContent className="p-4">
                    <div className="flex items-center space-x-4">
                      <div className={`w-12 h-12 ${channel.color} rounded-xl flex items-center justify-center`}>
                        <channel.icon className="w-6 h-6 text-white" />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-semibold text-gray-900">{channel.name}</h4>
                        <p className="text-sm text-gray-600 mb-1">{channel.description}</p>
                        <p className="text-xs text-gray-500">{channel.users}</p>
                      </div>
                      {campaignData.channels.includes(channel.id) && (
                        <CheckCircle className="w-6 h-6 text-purple-600" />
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
            
            {campaignData.channels.length > 0 && (
              <div className="bg-purple-50 rounded-lg p-4">
                <h4 className="font-medium text-purple-900 mb-2">Ausgewählte Kanäle:</h4>
                <div className="flex flex-wrap gap-2">
                  {campaignData.channels.map(channelId => {
                    const channel = channels.find(c => c.id === channelId)
                    return (
                      <Badge key={channelId} className="bg-purple-100 text-purple-800">
                        {channel?.name}
                      </Badge>
                    )
                  })}
                </div>
              </div>
            )}
          </div>
        )

      case 3:
        return (
          <div className="space-y-6">
            <div className="text-center">
              <h3 className="text-2xl font-bold text-gray-900 mb-2">Kampagneninhalte erstellen</h3>
              <p className="text-gray-600">Erstellen Sie überzeugende Inhalte für Ihre Kampagne</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Content Form */}
              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Texte und Inhalte</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <Label htmlFor="headline">Überschrift *</Label>
                      <Input
                        id="headline"
                        placeholder="Ihre aussagekräftige Überschrift"
                        value={campaignData.content.headline}
                        onChange={(e) => handleContentChange('headline', e.target.value)}
                        className="mt-1"
                      />
                    </div>

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
                      <Label htmlFor="callToAction">Call-to-Action</Label>
                      <Input
                        id="callToAction"
                        placeholder="z.B. Jetzt kaufen, Mehr erfahren"
                        value={campaignData.content.callToAction}
                        onChange={(e) => handleContentChange('callToAction', e.target.value)}
                        className="mt-1"
                      />
                    </div>

                    <div>
                      <Label htmlFor="targetAudience">Zielgruppe</Label>
                      <Input
                        id="targetAudience"
                        placeholder="z.B. Frauen 25-45, Interesse an Fitness"
                        value={campaignData.content.targetAudience}
                        onChange={(e) => handleContentChange('targetAudience', e.target.value)}
                        className="mt-1"
                      />
                    </div>
                  </CardContent>
                </Card>

                {/* Image Upload */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Bilder hochladen</CardTitle>
                    <CardDescription>
                      Laden Sie Bilder für verschiedene Formate hoch
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {['square', 'landscape', 'story'].map((format) => (
                      <div key={format} className="border-2 border-dashed border-gray-300 rounded-lg p-4">
                        <div className="text-center">
                          <h4 className="font-medium text-gray-900 mb-2">
                            {format === 'square' && 'Quadratisch (1:1)'}
                            {format === 'landscape' && 'Querformat (16:9)'}
                            {format === 'story' && 'Story (9:16)'}
                          </h4>
                          
                          {campaignData.content.images?.[format] ? (
                            <div className="relative">
                              <img
                                src={campaignData.content.images[format].url}
                                alt={`${format} preview`}
                                className="mx-auto max-h-32 rounded"
                              />
                              <Button
                                size="sm"
                                variant="destructive"
                                className="absolute top-0 right-0 transform translate-x-2 -translate-y-2"
                                onClick={() => removeFormatImage(format)}
                              >
                                <X className="w-4 h-4" />
                              </Button>
                            </div>
                          ) : (
                            <div>
                              <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                              <label className="cursor-pointer">
                                <span className="text-sm text-purple-600 hover:text-purple-700 font-medium">
                                  Bild hochladen
                                </span>
                                <input
                                  type="file"
                                  accept="image/*"
                                  className="hidden"
                                  onChange={(e) => handleFormatImageUpload(e, format)}
                                />
                              </label>
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              </div>

              {/* Live Previews */}
              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Live-Vorschau</CardTitle>
                    <CardDescription>
                      So wird Ihre Kampagne auf den ausgewählten Kanälen aussehen
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    {campaignData.channels.length > 0 ? (
                      <div className="space-y-8">
                        {campaignData.channels.slice(0, 2).map((channelId) => {
                          const channel = channels.find(c => c.id === channelId)
                          return (
                            <div key={channelId} className="space-y-3">
                              <div className="flex items-center space-x-2">
                                <div className={`w-6 h-6 ${channel?.color} rounded flex items-center justify-center`}>
                                  <channel.icon className="w-4 h-4 text-white" />
                                </div>
                                <h4 className="font-medium text-gray-900">{channel?.name}</h4>
                              </div>
                              {renderPreview(channelId)}
                            </div>
                          )
                        })}
                        
                        {campaignData.channels.length > 2 && (
                          <div className="space-y-8">
                            {campaignData.channels.slice(2, 4).map((channelId) => {
                              const channel = channels.find(c => c.id === channelId)
                              return (
                                <div key={channelId} className="space-y-3">
                                  <div className="flex items-center space-x-2">
                                    <div className={`w-6 h-6 ${channel?.color} rounded flex items-center justify-center`}>
                                      <channel.icon className="w-4 h-4 text-white" />
                                    </div>
                                    <h4 className="font-medium text-gray-900">{channel?.name}</h4>
                                  </div>
                                  {renderPreview(channelId)}
                                </div>
                              )
                            })}
                          </div>
                        )}

                        {campaignData.channels.length > 4 && (
                          <div className="text-center">
                            <p className="text-sm text-gray-600">
                              +{campaignData.channels.length - 4} weitere Kanäle
                            </p>
                          </div>
                        )}
                      </div>
                    ) : (
                      <div className="text-center py-8">
                        <p className="text-gray-500">Wählen Sie zuerst Kanäle aus, um Vorschauen zu sehen</p>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        )

      case 4:
        return (
          <div className="space-y-6">
            <div className="text-center">
              <h3 className="text-2xl font-bold text-gray-900 mb-2">Budget und Laufzeit</h3>
              <p className="text-gray-600">Legen Sie Ihr Werbebudget und die Kampagnenlaufzeit fest</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Budget-Einstellungen</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
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
                    <Label htmlFor="amount">
                      {campaignData.budget.type === 'daily' ? 'Tagesbudget' : 'Gesamtbudget'} (€) *
                    </Label>
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
                  </div>

                  <div>
                    <Label htmlFor="duration">Laufzeit (Tage) *</Label>
                    <Input
                      id="duration"
                      type="number"
                      placeholder="7"
                      value={campaignData.budget.duration}
                      onChange={(e) => handleBudgetChange('duration', e.target.value)}
                      className="mt-1"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="startDate">Startdatum</Label>
                      <Input
                        id="startDate"
                        type="date"
                        value={campaignData.budget.startDate}
                        onChange={(e) => handleBudgetChange('startDate', e.target.value)}
                        className="mt-1"
                      />
                    </div>
                    <div>
                      <Label htmlFor="endDate">Enddatum</Label>
                      <Input
                        id="endDate"
                        type="date"
                        value={campaignData.budget.endDate}
                        onChange={(e) => handleBudgetChange('endDate', e.target.value)}
                        className="mt-1"
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Budget-Übersicht</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="bg-gray-50 rounded-lg p-4">
                      <h4 className="font-medium text-gray-900 mb-3">Geschätzte Reichweite</h4>
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span className="text-sm text-gray-600">Tägliche Reichweite:</span>
                          <span className="font-medium">
                            {campaignData.budget.amount ? 
                              `${Math.round(campaignData.budget.amount * 100 * campaignData.channels.length).toLocaleString()}` : 
                              '0'
                            } Personen
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm text-gray-600">Gesamtreichweite:</span>
                          <span className="font-medium">
                            {campaignData.budget.amount && campaignData.budget.duration ? 
                              `${Math.round(campaignData.budget.amount * 100 * campaignData.budget.duration * campaignData.channels.length).toLocaleString()}` : 
                              '0'
                            } Personen
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="bg-purple-50 rounded-lg p-4">
                      <h4 className="font-medium text-purple-900 mb-3">Kosten-Übersicht</h4>
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span className="text-sm text-purple-700">Werbebudget:</span>
                          <span className="font-medium text-purple-900">
                            €{campaignData.budget.amount || '0'}
                            {campaignData.budget.type === 'daily' && campaignData.budget.duration && 
                              ` × ${campaignData.budget.duration} Tage = €${(campaignData.budget.amount * campaignData.budget.duration) || '0'}`
                            }
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm text-purple-700">Plattform-Gebühr:</span>
                          <span className="font-medium text-purple-900">Bereits in Ihrem Plan enthalten</span>
                        </div>
                      </div>
                    </div>

                    {campaignData.channels.length > 0 && (
                      <div className="bg-blue-50 rounded-lg p-4">
                        <h4 className="font-medium text-blue-900 mb-3">Ausgewählte Kanäle</h4>
                        <div className="space-y-1">
                          {campaignData.channels.map(channelId => {
                            const channel = channels.find(c => c.id === channelId)
                            return (
                              <div key={channelId} className="flex items-center space-x-2">
                                <div className={`w-4 h-4 ${channel?.color} rounded`}></div>
                                <span className="text-sm text-blue-800">{channel?.name}</span>
                              </div>
                            )
                          })}
                        </div>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        )

      default:
        return null
    }
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-6xl max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-purple-600 to-blue-600 text-white p-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold">Neue Kampagne erstellen</h2>
              <p className="text-purple-100 mt-1">
                Schritt {currentStep} von {steps.length}: {steps[currentStep - 1]?.name}
              </p>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={onClose}
              className="text-white hover:bg-white/20"
            >
              <X className="w-5 h-5" />
            </Button>
          </div>
          
          {/* Progress Bar */}
          <div className="mt-4">
            <div className="flex items-center space-x-2">
              {steps.map((step, index) => (
                <React.Fragment key={step.id}>
                  <div className={`flex items-center space-x-2 ${
                    index + 1 <= currentStep ? 'text-white' : 'text-purple-300'
                  }`}>
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                      index + 1 < currentStep 
                        ? 'bg-white text-purple-600' 
                        : index + 1 === currentStep 
                        ? 'bg-purple-400 text-white' 
                        : 'bg-purple-500/50 text-purple-200'
                    }`}>
                      {index + 1 < currentStep ? <CheckCircle className="w-5 h-5" /> : index + 1}
                    </div>
                    <span className="text-sm font-medium hidden sm:block">{step.name}</span>
                  </div>
                  {index < steps.length - 1 && (
                    <div className={`flex-1 h-1 rounded ${
                      index + 1 < currentStep ? 'bg-white' : 'bg-purple-500/50'
                    }`} />
                  )}
                </React.Fragment>
              ))}
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto max-h-[calc(90vh-200px)]">
          {renderStep()}
        </div>

        {/* Footer */}
        <div className="bg-gray-50 px-6 py-4 flex items-center justify-between border-t">
          <Button
            variant="outline"
            onClick={prevStep}
            disabled={currentStep === 1}
            className="flex items-center space-x-2"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Zurück</span>
          </Button>

          <div className="flex items-center space-x-3">
            {currentStep < 4 ? (
              <Button
                onClick={nextStep}
                disabled={!canProceed()}
                className="flex items-center space-x-2 bg-purple-600 hover:bg-purple-700"
              >
                <span>Weiter</span>
                <ArrowRight className="w-4 h-4" />
              </Button>
            ) : (
              <Button
                onClick={() => {
                  // Handle campaign creation
                  console.log('Campaign data:', campaignData)
                  onClose()
                }}
                disabled={!canProceed()}
                className="flex items-center space-x-2 bg-green-600 hover:bg-green-700"
              >
                <CheckCircle className="w-4 h-4" />
                <span>Kampagne erstellen</span>
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default CampaignWizard
