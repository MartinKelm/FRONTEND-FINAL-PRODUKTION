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
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card.jsx'
import { Button } from '@/components/ui/button.jsx'
import { Badge } from '@/components/ui/badge.jsx'
import { Input } from '@/components/ui/input.jsx'
import { Label } from '@/components/ui/label.jsx'
import { Textarea } from '@/components/ui/textarea.jsx'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group.jsx'
import { Checkbox } from '@/components/ui/checkbox.jsx'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select.jsx'

const CampaignWizard = ({ onClose }) => {
  const [currentStep, setCurrentStep] = useState(1) // 1: Setup, 2: Content & Media, 3: Budget & Confirmation
  const [uploadedImages, setUploadedImages] = useState([])
  const [uploadedVideos, setUploadedVideos] = useState([])
  const [currentPreviewIndex, setCurrentPreviewIndex] = useState(0)
  const [budgetConfirmed, setBudgetConfirmed] = useState(false)
  
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
    }
  })

  const handleImageUpload = (event, format) => {
    const file = event.target.files[0]
    
    // Only allow the 3 defined formats
    const allowedFormats = ['square', 'story', 'landscape']
    if (!allowedFormats.includes(format)) {
      console.error('Invalid format:', format)
      return
    }
    
    if (file && file.type.startsWith('image/') && file.size <= 10 * 1024 * 1024) {
      // Validate image dimensions based on format
      const img = new Image()
      img.onload = () => {
        const { width, height } = img
        let isValidDimension = false
        
        switch (format) {
          case 'square':
            isValidDimension = width === 1080 && height === 1080
            break
          case 'story':
            isValidDimension = width === 1080 && height === 1920
            break
          case 'landscape':
            isValidDimension = width === 1200 && height === 630
            break
        }
        
        if (!isValidDimension) {
          alert(`Bild hat falsche Abmessungen. Erforderlich für ${format}: ${imageFormats[format].dimensions}`)
          return
        }
        
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
      
      const reader = new FileReader()
      reader.onload = (e) => {
        img.src = e.target.result
      }
      reader.readAsDataURL(file)
    }
  }

  const handleVideoUpload = (event, format) => {
    const file = event.target.files[0]
    
    const allowedFormats = ['square', 'story', 'landscape']
    if (!allowedFormats.includes(format)) {
      console.error('Invalid format:', format)
      return
    }
    
    if (file && file.type.startsWith('video/') && file.size <= 100 * 1024 * 1024) {
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

  // Campaign goals
  const campaignGoals = [
    {
      id: 'awareness',
      title: 'Markenbekanntheit',
      description: 'Erhöhen Sie die Sichtbarkeit Ihrer Marke',
      icon: Eye,
      color: 'bg-blue-500'
    },
    {
      id: 'traffic',
      title: 'Website-Traffic',
      description: 'Mehr Besucher auf Ihre Website leiten',
      icon: Globe,
      color: 'bg-green-500'
    },
    {
      id: 'leads',
      title: 'Lead-Generierung',
      description: 'Potenzielle Kunden gewinnen',
      icon: Target,
      color: 'bg-purple-500'
    },
    {
      id: 'sales',
      title: 'Verkäufe steigern',
      description: 'Direkte Umsatzsteigerung',
      icon: ShoppingCart,
      color: 'bg-orange-500'
    },
    {
      id: 'app',
      title: 'App-Downloads',
      description: 'Mobile App-Installationen fördern',
      icon: Smartphone,
      color: 'bg-pink-500'
    }
  ]

  // Social media channels
  const channels = [
    {
      id: 'facebook',
      name: 'Facebook',
      icon: Facebook,
      color: 'bg-blue-600',
      description: 'Größte Social Media Plattform',
      users: '2.9B Nutzer weltweit',
      format: 'square',
      dimensions: '1080x1080px'
    },
    {
      id: 'instagram',
      name: 'Instagram',
      icon: Instagram,
      color: 'bg-gradient-to-r from-purple-500 to-pink-500',
      description: 'Visual Content für junge Zielgruppen',
      users: '2.0B Nutzer weltweit',
      format: 'square',
      dimensions: '1080x1080px'
    },
    {
      id: 'google',
      name: 'Google Ads',
      icon: Search,
      color: 'bg-red-500',
      description: 'Suchanzeigen und Display-Werbung',
      users: '8.5B Suchanfragen täglich',
      format: 'square',
      dimensions: '1080x1080px'
    },
    {
      id: 'tiktok',
      name: 'TikTok',
      icon: Play,
      color: 'bg-black',
      description: 'Kurze Videos für TikTok',
      users: '1.0B Nutzer weltweit',
      format: 'story',
      dimensions: '1080x1920px'
    },
    {
      id: 'snapchat',
      name: 'Snapchat',
      icon: Camera,
      color: 'bg-yellow-400',
      description: 'Junge Zielgruppe auf Snapchat',
      users: '750M Nutzer weltweit',
      format: 'story',
      dimensions: '1080x1920px'
    },
    {
      id: 'reddit',
      name: 'Reddit',
      icon: MessageCircle,
      color: 'bg-orange-600',
      description: 'Community-basierte Werbung',
      users: '430M Nutzer weltweit',
      format: 'landscape',
      dimensions: '1200x630px'
    },
    {
      id: 'linkedin',
      name: 'LinkedIn',
      icon: Linkedin,
      color: 'bg-blue-700',
      description: 'B2B und professionelle Zielgruppen',
      users: '900M Nutzer weltweit',
      format: 'square',
      dimensions: '1080x1080px'
    },
    {
      id: 'spotify',
      name: 'Spotify',
      icon: Music,
      color: 'bg-green-600',
      description: 'Audio-Werbung für Musik-Hörer',
      users: '500M Nutzer weltweit',
      format: 'square',
      dimensions: '1080x1080px'
    }
  ]

  // Image format definitions
  const imageFormats = {
    square: {
      name: '1:1 Format',
      dimensions: '1080x1080px',
      description: 'Für Facebook, Instagram, Google, Spotify, LinkedIn',
      channels: ['facebook', 'instagram', 'google', 'spotify', 'linkedin']
    },
    story: {
      name: 'Story Format',
      dimensions: '1080x1920px', 
      description: 'Für TikTok, Snapchat',
      channels: ['tiktok', 'snapchat']
    },
    landscape: {
      name: 'Querformat',
      dimensions: '1200x630px',
      description: 'Für Reddit',
      channels: ['reddit']
    }
  }

  const handleGoalSelect = (goalId) => {
    setCampaignData({ ...campaignData, goal: goalId })
  }

  const handleChannelToggle = (channelId) => {
    console.log('Channel toggle clicked:', channelId)
    setCampaignData(prev => {
      const newChannels = prev.channels.includes(channelId)
        ? prev.channels.filter(id => id !== channelId)
        : [...prev.channels, channelId]
      console.log('New channels:', newChannels)
      return {
        ...prev,
        channels: newChannels
      }
    })
    // Reset preview index when channels change
    setCurrentPreviewIndex(0)
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

  // Helper function to preserve line breaks in text
  const formatTextWithLineBreaks = (text) => {
    if (!text) return text
    return text.split('\n').map((line, index) => (
      <React.Fragment key={index}>
        {line}
        {index < text.split('\n').length - 1 && <br />}
      </React.Fragment>
    ))
  }

  // Enhanced Preview Components
  const FacebookPreview = ({ content, image }) => (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden max-w-sm mx-auto">
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
        <div className="aspect-square bg-gray-100">
          <img src={image.url} alt="Preview" className="w-full h-full object-cover" />
        </div>
      )}
      <div className="p-4">
        <h3 className="font-semibold text-gray-900 mb-2">
          {formatTextWithLineBreaks(content.headline) || 'Ihre Überschrift'}
        </h3>
        <p className="text-gray-700 text-sm mb-3">
          {formatTextWithLineBreaks(content.description) || 'Ihre Beschreibung'}
        </p>
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
    <div className="bg-white rounded-lg shadow-lg overflow-hidden max-w-sm mx-auto">
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
          {content.headline && <span className="font-semibold">{formatTextWithLineBreaks(content.headline)}</span>}
          {content.description && <span> {formatTextWithLineBreaks(content.description)}</span>}
        </p>
        {content.callToAction && (
          <p className="text-blue-600 text-sm mt-2 font-medium">{content.callToAction}</p>
        )}
      </div>
    </div>
  )

  const GooglePreview = ({ content }) => (
    <div className="bg-white rounded-lg shadow-lg p-4 max-w-sm mx-auto border">
      <div className="mb-2">
        <div className="flex items-center space-x-2 mb-1">
          <div className="w-4 h-4 bg-green-600 rounded-full"></div>
          <span className="text-green-700 text-sm">Anzeige</span>
        </div>
        <h3 className="text-blue-600 text-lg font-medium hover:underline cursor-pointer">
          {formatTextWithLineBreaks(content.headline) || 'Ihre Überschrift - Ihr Unternehmen'}
        </h3>
        <p className="text-green-700 text-sm">www.ihr-unternehmen.de</p>
      </div>
      <p className="text-gray-700 text-sm leading-relaxed">
        {formatTextWithLineBreaks(content.description) || 'Ihre Beschreibung erscheint hier. Überzeugen Sie potenzielle Kunden mit einer klaren Botschaft.'}
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
    <div className="bg-black rounded-lg shadow-lg overflow-hidden max-w-sm mx-auto aspect-[9/16] relative">
      {image && (
        <img src={image.url} alt="Preview" className="w-full h-full object-cover" />
      )}
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
      <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
        <div className="flex items-end justify-between">
          <div className="flex-1">
            <p className="font-semibold mb-1">@ihr_unternehmen</p>
            <p className="text-sm mb-2">{formatTextWithLineBreaks(content.headline) || 'Ihre TikTok Überschrift'}</p>
            <p className="text-xs opacity-90">{formatTextWithLineBreaks(content.description) || 'Ihre Beschreibung'}</p>
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

  const SnapchatPreview = ({ content, image }) => (
    <div className="bg-yellow-400 rounded-lg shadow-lg overflow-hidden max-w-sm mx-auto aspect-[9/16] relative">
      {image && (
        <img src={image.url} alt="Preview" className="w-full h-full object-cover" />
      )}
      <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
      <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
        <p className="text-sm mb-2">{formatTextWithLineBreaks(content.headline) || 'Ihre Snapchat Story'}</p>
        <p className="text-xs opacity-90">{formatTextWithLineBreaks(content.description) || 'Swipe up für mehr'}</p>
        {content.callToAction && (
          <div className="mt-2 bg-white text-black px-3 py-1 rounded-full text-xs font-medium inline-block">
            {content.callToAction}
          </div>
        )}
      </div>
    </div>
  )

  const RedditPreview = ({ content, image }) => (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden max-w-sm mx-auto border">
      <div className="p-3 border-b">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-orange-600 rounded-full flex items-center justify-center">
            <span className="text-white font-bold text-xs">r/</span>
          </div>
          <div>
            <p className="text-sm font-medium">r/IhrBereich</p>
            <p className="text-xs text-gray-500">Gesponsert • vor 2h</p>
          </div>
        </div>
      </div>
      {image && (
        <div className="aspect-video bg-gray-100">
          <img src={image.url} alt="Preview" className="w-full h-full object-cover" />
        </div>
      )}
      <div className="p-3">
        <h3 className="font-semibold text-gray-900 mb-2">
          {formatTextWithLineBreaks(content.headline) || 'Ihre Reddit Überschrift'}
        </h3>
        <p className="text-gray-700 text-sm mb-3">
          {formatTextWithLineBreaks(content.description) || 'Ihre Reddit Beschreibung'}
        </p>
        <div className="flex items-center space-x-4 text-gray-500">
          <div className="flex items-center space-x-1">
            <ArrowRight className="w-4 h-4 rotate-90" />
            <span className="text-sm">Upvote</span>
          </div>
          <div className="flex items-center space-x-1">
            <MessageCircle className="w-4 h-4" />
            <span className="text-sm">Kommentare</span>
          </div>
        </div>
      </div>
    </div>
  )

  const LinkedInPreview = ({ content, image }) => (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden max-w-sm mx-auto border">
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
        <div className="aspect-square bg-gray-100">
          <img src={image.url} alt="Preview" className="w-full h-full object-cover" />
        </div>
      )}
      <div className="p-4">
        <h3 className="font-semibold text-gray-900 mb-2">{formatTextWithLineBreaks(content.headline) || 'Ihre LinkedIn Überschrift'}</h3>
        <p className="text-gray-700 text-sm mb-3">{formatTextWithLineBreaks(content.description) || 'Ihre professionelle Beschreibung'}</p>
        <Button className="w-full bg-blue-700 hover:bg-blue-800 text-white">
          {content.callToAction || 'Mehr erfahren'}
        </Button>
      </div>
    </div>
  )

  const SpotifyPreview = ({ content, image }) => (
    <div className="bg-black rounded-lg shadow-lg overflow-hidden max-w-sm mx-auto">
      <div className="p-4 border-b border-gray-800">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-green-600 rounded-full flex items-center justify-center">
            <Music className="w-6 h-6 text-white" />
          </div>
          <div>
            <p className="font-semibold text-white">Spotify Audio Ad</p>
            <p className="text-xs text-gray-400">Gesponsert</p>
          </div>
        </div>
      </div>
      {image && (
        <div className="aspect-square bg-gray-900">
          <img src={image.url} alt="Preview" className="w-full h-full object-cover" />
        </div>
      )}
      <div className="p-4 bg-gray-900">
        <h3 className="font-semibold text-white mb-2">{formatTextWithLineBreaks(content.headline) || 'Ihre Audio-Werbung'}</h3>
        <p className="text-gray-300 text-sm mb-3">{formatTextWithLineBreaks(content.description) || 'Ihre Audio-Beschreibung'}</p>
        <div className="flex items-center space-x-3">
          <Button size="sm" className="bg-green-600 hover:bg-green-700 text-white flex items-center space-x-2">
            <Play className="w-4 h-4" />
            <span>Anhören</span>
          </Button>
          {content.callToAction && (
            <Button size="sm" variant="outline" className="text-white border-gray-600">
              {content.callToAction}
            </Button>
          )}
        </div>
      </div>
    </div>
  )

  const renderPreview = (channelId) => {
    const channel = channels.find(c => c.id === channelId)
    if (!channel) return null

    const image = campaignData.content.images[channel.format]
    const video = campaignData.content.videos[channel.format]

    switch (channelId) {
      case 'facebook':
        return <FacebookPreview content={campaignData.content} image={image} video={video} />
      case 'instagram':
        return <InstagramPreview content={campaignData.content} image={image} video={video} />
      case 'google':
        return <GooglePreview content={campaignData.content} image={image} video={video} />
      case 'tiktok':
        return <TikTokPreview content={campaignData.content} image={image} video={video} />
      case 'snapchat':
        return <SnapchatPreview content={campaignData.content} image={image} video={video} />
      case 'reddit':
        return <RedditPreview content={campaignData.content} image={image} video={video} />
      case 'linkedin':
        return <LinkedInPreview content={campaignData.content} image={image} video={video} />
      case 'spotify':
        return <SpotifyPreview content={campaignData.content} image={image} video={video} />
      default:
        return null
    }
  }

  const nextStep = () => {
    console.log('Next step clicked, current step:', currentStep)
    if (currentStep < 3) {
      setCurrentStep(prev => {
        const newStep = prev + 1
        console.log('Moving to step:', newStep)
        return newStep
      })
    }
  }

  const prevStep = () => {
    console.log('Previous step clicked, current step:', currentStep)
    if (currentStep > 1) {
      setCurrentStep(prev => {
        const newStep = prev - 1
        console.log('Moving to step:', newStep)
        return newStep
      })
    }
  }

  const canProceedToStep2 = () => {
    const canProceed = campaignData.goal && campaignData.channels.length > 0
    console.log('Can proceed to step 2:', canProceed, 'Goal:', campaignData.goal, 'Channels:', campaignData.channels)
    return canProceed
  }

  const canProceedToStep3 = () => {
    return campaignData.content.headline && campaignData.content.description
  }

  const canCreateCampaign = () => {
    return campaignData.budget.amount && campaignData.budget.duration && budgetConfirmed
  }

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6">
            {/* Campaign Goal */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Kampagnenziel</CardTitle>
                <CardDescription>Was möchten Sie mit Ihrer Kampagne erreichen?</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {campaignGoals.map((goal) => (
                    <div
                      key={goal.id}
                      className={`p-3 rounded-lg border-2 cursor-pointer transition-all ${
                        campaignData.goal === goal.id
                          ? 'border-purple-500 bg-purple-50'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                      onClick={() => handleGoalSelect(goal.id)}
                    >
                      <div className="flex items-center space-x-3">
                        <div className={`w-8 h-8 ${goal.color} rounded-lg flex items-center justify-center`}>
                          <goal.icon className="w-4 h-4 text-white" />
                        </div>
                        <div>
                          <h4 className="font-medium text-gray-900">{goal.title}</h4>
                          <p className="text-sm text-gray-600">{goal.description}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Channel Selection */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Kanäle auswählen</CardTitle>
                <CardDescription>Wählen Sie die Social Media Kanäle für Ihre Kampagne</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-3">
                  {channels.map((channel) => (
                    <div
                      key={channel.id}
                      className={`p-3 rounded-lg border-2 cursor-pointer transition-all ${
                        campaignData.channels.includes(channel.id)
                          ? 'border-purple-500 bg-purple-50'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                      onClick={(e) => {
                        e.preventDefault()
                        e.stopPropagation()
                        console.log('Channel card clicked:', channel.id)
                        handleChannelToggle(channel.id)
                      }}
                    >
                      <div className="text-center">
                        <div className={`w-8 h-8 ${channel.color} rounded-lg flex items-center justify-center mx-auto mb-2`}>
                          <channel.icon className="w-4 h-4 text-white" />
                        </div>
                        <h4 className="font-medium text-gray-900 text-sm">{channel.name}</h4>
                        <p className="text-xs text-gray-600">{channel.dimensions}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        )

      case 2:
        return (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 h-full">
            {/* Left Column - Content & Media */}
            <div className="space-y-6 overflow-y-auto max-h-[calc(100vh-300px)]">
              {/* Content Creation */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Kampagnen-Inhalte</CardTitle>
                  <CardDescription>Erstellen Sie überzeugende Texte für Ihre Kampagne</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label htmlFor="headline">Überschrift *</Label>
                    <Input
                      id="headline"
                      placeholder="Ihre überzeugende Überschrift"
                      value={campaignData.content.headline}
                      onChange={(e) => handleContentChange('headline', e.target.value)}
                      className="mt-1"
                    />
                  </div>

                  <div>
                    <Label htmlFor="description">Beschreibung *</Label>
                    <Textarea
                      id="description"
                      placeholder="Beschreiben Sie Ihr Angebot detailliert..."
                      value={campaignData.content.description}
                      onChange={(e) => handleContentChange('description', e.target.value)}
                      rows={4}
                      className="mt-1"
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
                </CardContent>
              </Card>

              {/* Media Upload */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Medien-Upload</CardTitle>
                  <CardDescription>Laden Sie Bilder und Videos für Ihre Kampagne hoch</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  {Object.entries(imageFormats).map(([formatKey, format]) => (
                    <div key={formatKey} className="space-y-4">
                      <div className="border-b pb-2">
                        <h4 className="font-medium text-gray-900">{format.name}</h4>
                        <p className="text-sm text-gray-600">{format.dimensions}</p>
                        <p className="text-xs text-gray-500">{format.description}</p>
                      </div>

                      {/* Image Upload */}
                      <div>
                        <Label className="text-sm font-medium">Bild hochladen</Label>
                        <div className="mt-2 border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-gray-400 transition-colors">
                          {campaignData.content.images[formatKey] ? (
                            <div className="space-y-2">
                              <img
                                src={campaignData.content.images[formatKey].url}
                                alt="Preview"
                                className="max-h-32 mx-auto rounded"
                              />
                              <p className="text-sm text-gray-600">{campaignData.content.images[formatKey].name}</p>
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => {
                                  setCampaignData(prev => ({
                                    ...prev,
                                    content: {
                                      ...prev.content,
                                      images: {
                                        ...prev.content.images,
                                        [formatKey]: null
                                      }
                                    }
                                  }))
                                  setUploadedImages(prev => prev.filter(img => img.format !== formatKey))
                                }}
                              >
                                Entfernen
                              </Button>
                            </div>
                          ) : (
                            <div>
                              <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                              <p className="text-sm text-gray-600 mb-2">
                                Bild hochladen ({format.dimensions})
                              </p>
                              <input
                                type="file"
                                accept="image/*"
                                onChange={(e) => handleImageUpload(e, formatKey)}
                                className="hidden"
                                id={`image-${formatKey}`}
                              />
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => document.getElementById(`image-${formatKey}`).click()}
                              >
                                Datei auswählen
                              </Button>
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Video Upload */}
                      <div>
                        <Label className="text-sm font-medium">Video hochladen (optional)</Label>
                        <div className="mt-2 border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-gray-400 transition-colors">
                          {campaignData.content.videos[formatKey] ? (
                            <div className="space-y-2">
                              <video
                                src={campaignData.content.videos[formatKey].url}
                                className="max-h-32 mx-auto rounded"
                                controls
                              />
                              <p className="text-sm text-gray-600">{campaignData.content.videos[formatKey].name}</p>
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => {
                                  setCampaignData(prev => ({
                                    ...prev,
                                    content: {
                                      ...prev.content,
                                      videos: {
                                        ...prev.content.videos,
                                        [formatKey]: null
                                      }
                                    }
                                  }))
                                  setUploadedVideos(prev => prev.filter(vid => vid.format !== formatKey))
                                }}
                              >
                                Entfernen
                              </Button>
                            </div>
                          ) : (
                            <div>
                              <Play className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                              <p className="text-sm text-gray-600 mb-2">
                                Video hochladen (MP4, max. 100MB)
                              </p>
                              <input
                                type="file"
                                accept="video/*"
                                onChange={(e) => handleVideoUpload(e, formatKey)}
                                className="hidden"
                                id={`video-${formatKey}`}
                              />
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => document.getElementById(`video-${formatKey}`).click()}
                              >
                                Datei auswählen
                              </Button>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>

            {/* Right Column - Preview */}
            <div className="bg-gray-50 rounded-lg p-6 overflow-y-auto max-h-[calc(100vh-300px)]">
              <div className="sticky top-0 bg-gray-50 pb-4 mb-4 border-b">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Vorschau</h3>
                {campaignData.channels.length > 0 && (
                  <div className="flex items-center justify-between">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setCurrentPreviewIndex(Math.max(0, currentPreviewIndex - 1))}
                      disabled={currentPreviewIndex === 0}
                      className="flex items-center space-x-2"
                    >
                      <ChevronLeft className="w-4 h-4 text-purple-600" />
                      <span>Zurück</span>
                    </Button>
                    <span className="text-sm text-gray-600">
                      {currentPreviewIndex + 1} von {campaignData.channels.length}
                    </span>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setCurrentPreviewIndex(Math.min(campaignData.channels.length - 1, currentPreviewIndex + 1))}
                      disabled={currentPreviewIndex === campaignData.channels.length - 1}
                      className="flex items-center space-x-2"
                    >
                      <span>Weiter</span>
                      <ChevronRight className="w-4 h-4 text-purple-600" />
                    </Button>
                  </div>
                )}
              </div>

              <div className="space-y-4">
                {campaignData.channels.length > 0 ? (
                  <div className="space-y-4">
                    <div className="text-center">
                      <Badge className="mb-4">
                        {channels.find(c => c.id === campaignData.channels[currentPreviewIndex])?.name}
                      </Badge>
                    </div>
                    {renderPreview(campaignData.channels[currentPreviewIndex])}
                    
                    {/* Channel Navigation Dots */}
                    <div className="flex justify-center space-x-2 mt-4">
                      {campaignData.channels.map((_, index) => (
                        <button
                          key={index}
                          className={`w-3 h-3 rounded-full transition-colors ${
                            index === currentPreviewIndex ? 'bg-purple-600' : 'bg-gray-300'
                          }`}
                          onClick={() => setCurrentPreviewIndex(index)}
                        />
                      ))}
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <p className="text-gray-500">Wählen Sie zuerst Kanäle aus, um Vorschauen zu sehen</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        )

      case 3:
        return (
          <div className="max-w-2xl mx-auto space-y-6">
            {/* Budget Settings */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Budget & Laufzeit</CardTitle>
                <CardDescription>Legen Sie Ihr Werbebudget und die Kampagnenlaufzeit fest</CardDescription>
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
                  <Input
                    id="amount"
                    type="number"
                    placeholder="100"
                    value={campaignData.budget.amount}
                    onChange={(e) => handleBudgetChange('amount', e.target.value)}
                    className="mt-1"
                  />
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

            {/* Campaign Summary */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Kampagnen-Zusammenfassung</CardTitle>
                <CardDescription>Überprüfen Sie Ihre Kampagnen-Einstellungen</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="font-medium text-gray-900">Ziel:</p>
                    <p className="text-gray-600">
                      {campaignGoals.find(g => g.id === campaignData.goal)?.title || 'Nicht ausgewählt'}
                    </p>
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">Kanäle:</p>
                    <p className="text-gray-600">
                      {campaignData.channels.length} ausgewählt
                    </p>
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">Budget:</p>
                    <p className="text-gray-600">
                      €{campaignData.budget.amount} ({campaignData.budget.type === 'daily' ? 'täglich' : 'gesamt'})
                    </p>
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">Laufzeit:</p>
                    <p className="text-gray-600">
                      {campaignData.budget.duration} Tage
                    </p>
                  </div>
                </div>

                {campaignData.budget.amount && campaignData.budget.duration && (
                  <div className="bg-blue-50 p-4 rounded-lg">
                    <p className="text-sm font-medium text-blue-900">Geschätzte Gesamtkosten:</p>
                    <p className="text-lg font-bold text-blue-900">
                      €{campaignData.budget.type === 'daily' 
                        ? (parseFloat(campaignData.budget.amount) * parseInt(campaignData.budget.duration)).toFixed(2)
                        : campaignData.budget.amount}
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Confirmation */}
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="budget-confirm"
                    checked={budgetConfirmed}
                    onCheckedChange={setBudgetConfirmed}
                  />
                  <Label htmlFor="budget-confirm" className="text-sm">
                    Ich bestätige, dass ich mit dem angegebenen Budget einverstanden bin und die Kampagne erstellen möchte.
                  </Label>
                </div>
              </CardContent>
            </Card>
          </div>
        )

      default:
        return null
    }
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-7xl h-[90vh] overflow-hidden flex flex-col">
        {/* Header */}
        <div className="bg-gradient-to-r from-purple-600 to-pink-600 text-white p-6 flex items-center justify-between flex-shrink-0">
          <div>
            <h2 className="text-2xl font-bold">Kampagne erstellen</h2>
            <p className="text-purple-100">
              Schritt {currentStep} von 3: {
                currentStep === 1 ? 'Ziel & Kanäle' :
                currentStep === 2 ? 'Inhalte & Medien' :
                'Budget & Bestätigung'
              }
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
        <div className="bg-gray-200 h-2 flex-shrink-0">
          <div 
            className="bg-gradient-to-r from-purple-600 to-pink-600 h-full transition-all duration-300"
            style={{ width: `${(currentStep / 3) * 100}%` }}
          />
        </div>

        {/* Content */}
        <div className="flex-1 overflow-hidden p-6">
          {renderStepContent()}
        </div>

        {/* Footer */}
        <div className="border-t border-gray-200 p-6 flex items-center justify-between bg-gray-50 flex-shrink-0">
          <div className="flex items-center space-x-2 text-sm text-gray-600">
            <CheckCircle className="w-4 h-4 text-green-500" />
            <span>Änderungen werden automatisch gespeichert</span>
          </div>
          <div className="flex items-center space-x-3">
            {currentStep > 1 && (
              <Button variant="outline" onClick={prevStep}>
                <ArrowLeft className="w-4 h-4 mr-2" />
                Zurück
              </Button>
            )}
            <Button variant="outline" onClick={onClose}>
              Abbrechen
            </Button>
            {currentStep < 3 ? (
              <Button 
                className="bg-purple-600 hover:bg-purple-700 text-white"
                onClick={nextStep}
                disabled={currentStep === 1 ? !canProceedToStep2() : !canProceedToStep3()}
              >
                Weiter
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            ) : (
              <Button 
                className="bg-purple-600 hover:bg-purple-700 text-white"
                disabled={!canCreateCampaign()}
                onClick={() => {
                  // Handle campaign creation
                  console.log('Creating campaign:', campaignData)
                  onClose()
                }}
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
