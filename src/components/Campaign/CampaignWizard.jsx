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
  const [currentStep, setCurrentStep] = useState(1) // 1: 3-Column Setup, 2: Budget & Booking
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
    
    // Only allow the 3 defined formats
    const allowedFormats = ['square', 'story', 'landscape']
    if (!allowedFormats.includes(format)) {
      console.error('Invalid format:', format)
      return
    }
    
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
              [format]: e.target.result
            }
          }
        }))
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
              [format]: e.target.result
            }
          }
        }))
      }
      reader.readAsDataURL(file)
    }
  }

  const goals = [
    {
      id: 'awareness',
      title: 'Markenbekanntheit',
      description: 'Ihre Marke bekannter machen',
      icon: Eye,
      color: 'bg-blue-500'
    },
    {
      id: 'traffic',
      title: 'Website-Traffic',
      description: 'Mehr Besucher auf Ihre Website',
      icon: Globe,
      color: 'bg-green-500'
    },
    {
      id: 'leads',
      title: 'Lead-Generierung',
      description: 'Potentielle Kunden gewinnen',
      icon: Target,
      color: 'bg-purple-500'
    },
    {
      id: 'sales',
      title: 'Verkäufe',
      description: 'Produkte und Services verkaufen',
      icon: ShoppingCart,
      color: 'bg-orange-500'
    },
    {
      id: 'app',
      title: 'App-Downloads',
      description: 'Mobile App bewerben',
      icon: Smartphone,
      color: 'bg-pink-500'
    }
  ]

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
      color: 'bg-pink-500',
      description: 'Visuelle Inhalte und Stories',
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
      description: 'Audio-Werbung für Musik-Liebhaber',
      users: '500M Nutzer weltweit',
      format: 'square',
      dimensions: '1080x1080px'
    }
  ]

  const imageFormats = [
    {
      id: 'square',
      name: '1:1 Format',
      dimensions: '1080x1080px',
      description: 'Für Facebook, Instagram, Google, Spotify, LinkedIn',
      channels: ['facebook', 'instagram', 'google', 'spotify', 'linkedin']
    },
    {
      id: 'story',
      name: 'Story Format',
      dimensions: '1080x1920px',
      description: 'Für TikTok, Snapchat',
      channels: ['tiktok', 'snapchat']
    },
    {
      id: 'landscape',
      name: 'Querformat',
      dimensions: '1200x630px',
      description: 'Für Reddit',
      channels: ['reddit']
    }
  ]

  const formatTextWithLineBreaks = (text) => {
    if (!text) return ''
    return text.split('\n').map((line, index) => (
      <React.Fragment key={index}>
        {line}
        {index < text.split('\n').length - 1 && <br />}
      </React.Fragment>
    ))
  }

  const getSelectedChannels = () => {
    return channels.filter(channel => campaignData.channels.includes(channel.id))
  }

  const nextStep = () => {
    if (currentStep < steps.length) {
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
        return campaignData.channels.length > 0 && campaignData.content.headline && campaignData.content.description
      case 3:
        return uploadedImages.length > 0
      case 4:
        return campaignData.budget.amount && campaignData.budgetConfirmed
      default:
        return false
    }
  }

  const renderPreview = (channel) => {
    const image = campaignData.content.images[channel.format]
    const video = campaignData.content.videos[channel.format]
    
    switch (channel.id) {
      case 'facebook':
        return (
          <div className="bg-white rounded-lg shadow-lg overflow-hidden max-w-md mx-auto">
            <div className="p-3 border-b flex items-center space-x-3">
              <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-sm">FB</span>
              </div>
              <div>
                <div className="font-semibold text-sm">Ihr Unternehmen</div>
                <div className="text-xs text-gray-500">Gesponsert</div>
              </div>
            </div>
            <div className="p-3">
              <p className="text-sm mb-3">{formatTextWithLineBreaks(campaignData.content.headline || 'Ihre Überschrift hier...')}</p>
            </div>
            {(image || video) && (
              <div className="relative">
                {video ? (
                  <video className="w-full h-64 object-cover" controls>
                    <source src={video} type="video/mp4" />
                  </video>
                ) : (
                  <img src={image} alt="Campaign" className="w-full h-64 object-cover" />
                )}
              </div>
            )}
            <div className="p-3 bg-gray-50">
              <p className="text-xs text-gray-600 mb-2">{formatTextWithLineBreaks(campaignData.content.description || 'Ihre Beschreibung hier...')}</p>
              <Button size="sm" className="bg-blue-600 hover:bg-blue-700 text-white text-xs">
                {campaignData.content.callToAction || 'Mehr erfahren'}
              </Button>
            </div>
            <div className="p-3 border-t flex items-center justify-between text-xs text-gray-500">
              <div className="flex items-center space-x-4">
                <span className="flex items-center space-x-1">
                  <Heart className="w-4 h-4" />
                  <span>Gefällt mir</span>
                </span>
                <span className="flex items-center space-x-1">
                  <MessageCircle className="w-4 h-4" />
                  <span>Kommentieren</span>
                </span>
                <span className="flex items-center space-x-1">
                  <Share className="w-4 h-4" />
                  <span>Teilen</span>
                </span>
              </div>
            </div>
          </div>
        )

      case 'instagram':
        return (
          <div className="bg-white rounded-lg shadow-lg overflow-hidden max-w-md mx-auto">
            <div className="p-3 border-b flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
                  <span className="text-white font-bold text-xs">IG</span>
                </div>
                <div>
                  <div className="font-semibold text-sm">ihr_unternehmen</div>
                  <div className="text-xs text-gray-500">Gesponsert</div>
                </div>
              </div>
              <MoreHorizontal className="w-5 h-5 text-gray-400" />
            </div>
            {(image || video) && (
              <div className="relative">
                {video ? (
                  <video className="w-full h-64 object-cover" controls>
                    <source src={video} type="video/mp4" />
                  </video>
                ) : (
                  <img src={image} alt="Campaign" className="w-full h-64 object-cover" />
                )}
              </div>
            )}
            <div className="p-3">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center space-x-4">
                  <Heart className="w-6 h-6" />
                  <MessageCircle className="w-6 h-6" />
                  <Share className="w-6 h-6" />
                </div>
              </div>
              <div className="text-sm">
                <span className="font-semibold">ihr_unternehmen</span>{' '}
                {formatTextWithLineBreaks(campaignData.content.description || 'Ihre Instagram Caption hier...')}
              </div>
              {campaignData.content.callToAction && (
                <div className="mt-2">
                  <Button size="sm" className="bg-blue-500 hover:bg-blue-600 text-white text-xs">
                    {campaignData.content.callToAction}
                  </Button>
                </div>
              )}
            </div>
          </div>
        )

      case 'google':
        return (
          <div className="bg-white rounded-lg shadow-lg overflow-hidden max-w-md mx-auto p-4">
            <div className="flex items-start space-x-3">
              <div className="flex-1">
                <div className="flex items-center space-x-2 mb-1">
                  <Badge variant="outline" className="text-green-600 border-green-600 text-xs">Anzeige</Badge>
                  <span className="text-green-600 text-sm">www.ihr-unternehmen.de</span>
                </div>
                <h3 className="text-blue-600 text-lg font-medium hover:underline cursor-pointer mb-1">
                  {formatTextWithLineBreaks(campaignData.content.headline || 'Ihre Google Ads Überschrift')}
                </h3>
                <p className="text-gray-600 text-sm">
                  {formatTextWithLineBreaks(campaignData.content.description || 'Ihre Google Ads Beschreibung hier. Erreichen Sie Ihre Zielgruppe genau dann, wenn sie nach Ihren Produkten sucht.')}
                </p>
                {campaignData.content.callToAction && (
                  <div className="mt-2">
                    <span className="text-blue-600 text-sm hover:underline cursor-pointer">
                      {campaignData.content.callToAction}
                    </span>
                  </div>
                )}
              </div>
              {(image || video) && (
                <div className="w-20 h-20 flex-shrink-0">
                  {video ? (
                    <video className="w-full h-full object-cover rounded" controls>
                      <source src={video} type="video/mp4" />
                    </video>
                  ) : (
                    <img src={image} alt="Campaign" className="w-full h-full object-cover rounded" />
                  )}
                </div>
              )}
            </div>
          </div>
        )

      case 'tiktok':
        return (
          <div className="bg-black rounded-lg overflow-hidden max-w-sm mx-auto relative" style={{ aspectRatio: '9/16', height: '400px' }}>
            {(image || video) && (
              <div className="absolute inset-0">
                {video ? (
                  <video className="w-full h-full object-cover" controls>
                    <source src={video} type="video/mp4" />
                  </video>
                ) : (
                  <img src={image} alt="Campaign" className="w-full h-full object-cover" />
                )}
              </div>
            )}
            <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent">
              <div className="text-white">
                <h3 className="font-bold text-lg mb-2">
                  {formatTextWithLineBreaks(campaignData.content.headline || 'Ihre TikTok Überschrift')}
                </h3>
                <p className="text-sm opacity-90 mb-3">
                  {formatTextWithLineBreaks(campaignData.content.description || 'Ihre TikTok Beschreibung...')}
                </p>
                {campaignData.content.callToAction && (
                  <Button size="sm" className="bg-white text-black hover:bg-gray-100 text-xs">
                    {campaignData.content.callToAction}
                  </Button>
                )}
              </div>
            </div>
            <div className="absolute right-4 bottom-20 flex flex-col space-y-4">
              <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                <Heart className="w-6 h-6 text-white" />
              </div>
              <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                <MessageCircle className="w-6 h-6 text-white" />
              </div>
              <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                <Share className="w-6 h-6 text-white" />
              </div>
            </div>
          </div>
        )

      case 'linkedin':
        return (
          <div className="bg-white rounded-lg shadow-lg overflow-hidden max-w-md mx-auto">
            <div className="p-4 border-b flex items-center space-x-3">
              <div className="w-12 h-12 bg-blue-700 rounded-full flex items-center justify-center">
                <span className="text-white font-bold">UN</span>
              </div>
              <div className="flex-1">
                <div className="font-semibold">Ihr Unternehmen</div>
                <div className="text-sm text-gray-500">Gesponsert</div>
              </div>
            </div>
            <div className="p-4">
              <h3 className="font-semibold text-lg mb-2">
                {formatTextWithLineBreaks(campaignData.content.headline || 'Ihre LinkedIn Überschrift')}
              </h3>
              <p className="text-gray-600 mb-3">
                {formatTextWithLineBreaks(campaignData.content.description || 'Ihre professionelle LinkedIn Beschreibung hier...')}
              </p>
            </div>
            {(image || video) && (
              <div className="relative">
                {video ? (
                  <video className="w-full h-64 object-cover" controls>
                    <source src={video} type="video/mp4" />
                  </video>
                ) : (
                  <img src={image} alt="Campaign" className="w-full h-64 object-cover" />
                )}
              </div>
            )}
            <div className="p-4">
              {campaignData.content.callToAction && (
                <Button className="bg-blue-700 hover:bg-blue-800 text-white w-full">
                  {campaignData.content.callToAction}
                </Button>
              )}
            </div>
          </div>
        )

      default:
        return (
          <div className="bg-white rounded-lg shadow-lg p-6 max-w-md mx-auto">
            <div className="text-center">
              <div className={`w-16 h-16 ${channel.color} rounded-full flex items-center justify-center mx-auto mb-4`}>
                <channel.icon className="w-8 h-8 text-white" />
              </div>
              <h3 className="font-bold text-lg mb-2">{channel.name}</h3>
              <p className="text-gray-600 text-sm mb-4">{channel.description}</p>
              {(image || video) && (
                <div className="mb-4">
                  {video ? (
                    <video className="w-full h-32 object-cover rounded" controls>
                      <source src={video} type="video/mp4" />
                    </video>
                  ) : (
                    <img src={image} alt="Campaign" className="w-full h-32 object-cover rounded" />
                  )}
                </div>
              )}
              <div className="text-sm text-gray-600">
                <p className="font-semibold">{formatTextWithLineBreaks(campaignData.content.headline || 'Ihre Überschrift')}</p>
                <p className="mt-2">{formatTextWithLineBreaks(campaignData.content.description || 'Ihre Beschreibung')}</p>
              </div>
            </div>
          </div>
        )
    }
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-7xl h-[90vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-t-xl">
          <div>
            <h2 className="text-2xl font-bold">Kampagne erstellen</h2>
            <p className="text-purple-100">
              Schritt {currentStep} von 2: {
                currentStep === 1 ? 'Kampagne erstellen' : 'Budget & Buchung'
              }
            </p>
          </div>
          <Button
            onClick={onClose}
            variant="ghost"
            size="sm"
            className="text-white hover:bg-white/20"
          >
            <X className="w-5 h-5" />
          </Button>
        </div>

        {/* Progress Bar */}
        <div className="bg-gray-200 h-2">
          <div 
            className="bg-gradient-to-r from-purple-600 to-pink-600 h-full transition-all duration-300"
            style={{ width: `${(currentStep / 2) * 100}%` }}
          />
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto">
          {currentStep === 1 && (
            <div className="h-full flex">
              {/* Left Column: Goals & Channels */}
              <div className="w-1/3 p-6 border-r overflow-y-auto max-h-[70vh]">
                {currentStep === 1 && (
                  <div>
                    <h3 className="text-xl font-bold mb-4">Kampagnenziel auswählen</h3>
                    <div className="space-y-3">
                      {goals.map((goal) => (
                        <Card 
                          key={goal.id}
                          className={`cursor-pointer transition-all hover:shadow-md ${
                            campaignData.goal === goal.id ? 'ring-2 ring-purple-500 bg-purple-50' : ''
                          }`}
                          onClick={() => setCampaignData(prev => ({ ...prev, goal: goal.id }))}
                        >
                          <CardContent className="p-4">
                            <div className="flex items-center space-x-3">
                              <div className={`w-10 h-10 ${goal.color} rounded-lg flex items-center justify-center`}>
                                <goal.icon className="w-5 h-5 text-white" />
                              </div>
                              <div>
                                <h4 className="font-semibold">{goal.title}</h4>
                                <p className="text-sm text-gray-600">{goal.description}</p>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                    
                    {/* Channel Selection */}
                    <div className="mt-6">
                      <h4 className="font-semibold mb-3">Kanäle auswählen</h4>
                      <div className="grid grid-cols-2 gap-2">
                        {channels.map((channel) => (
                          <div
                            key={channel.id}
                            className={`p-3 border rounded-lg cursor-pointer transition-all hover:shadow-sm ${
                              campaignData.channels.includes(channel.id)
                                ? 'border-purple-500 bg-purple-50'
                                : 'border-gray-200'
                            }`}
                            onClick={() => {
                              setCampaignData(prev => ({
                                ...prev,
                                channels: prev.channels.includes(channel.id)
                                  ? prev.channels.filter(id => id !== channel.id)
                                  : [...prev.channels, channel.id]
                              }))
                            }}
                          >
                            <div className="flex items-center space-x-2">
                              <div className={`w-6 h-6 ${channel.color} rounded flex items-center justify-center`}>
                                <channel.icon className="w-3 h-3 text-white" />
                              </div>
                              <span className="text-sm font-medium">{channel.name}</span>
                            </div>
                            <p className="text-xs text-gray-500 mt-1">{channel.dimensions}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

              </div>

              {/* Middle Column: Content Creation */}
              <div className="w-1/3 p-6 border-r overflow-y-auto max-h-[70vh]">
                <h3 className="text-xl font-bold mb-4">Inhalte erstellen</h3>
                
                {/* Content Creation */}
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="headline">Überschrift</Label>
                    <Input
                      id="headline"
                      value={campaignData.content.headline}
                      onChange={(e) => setCampaignData(prev => ({
                        ...prev,
                        content: { ...prev.content, headline: e.target.value }
                      }))}
                      placeholder="Ihre Kampagnen-Überschrift"
                    />
                  </div>
                  <div>
                    <Label htmlFor="description">Beschreibung</Label>
                    <Textarea
                      id="description"
                      value={campaignData.content.description}
                      onChange={(e) => setCampaignData(prev => ({
                        ...prev,
                        content: { ...prev.content, description: e.target.value }
                      }))}
                      placeholder="Beschreiben Sie Ihre Kampagne..."
                      rows={4}
                    />
                  </div>
                  <div>
                    <Label htmlFor="cta">Call-to-Action</Label>
                    <Input
                      id="cta"
                      value={campaignData.content.callToAction}
                      onChange={(e) => setCampaignData(prev => ({
                        ...prev,
                        content: { ...prev.content, callToAction: e.target.value }
                      }))}
                      placeholder="Mehr erfahren"
                    />
                  </div>
                  
                  {/* Media Upload */}
                  <div className="mt-6">
                    <Label>Medien hochladen</Label>
                    <div className="mt-2 border-2 border-dashed border-gray-300 rounded-lg p-4 text-center">
                      <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                      <p className="text-sm text-gray-600">Bilder oder Videos hochladen</p>
                      <p className="text-xs text-gray-500">PNG, JPG, MP4 bis 10MB</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Column: Live Preview */}
              <div className="w-1/3 p-6 overflow-y-auto max-h-[70vh]">
                <h3 className="text-xl font-bold mb-4">Live-Vorschau</h3>
                
                {campaignData.channels.length > 0 ? (
                  <div className="space-y-4">
                    {campaignData.channels.map((channelId) => {
                      const channel = channels.find(c => c.id === channelId)
                      if (!channel) return null
                      
                      return (
                        <div key={channelId} className="border rounded-lg p-4 bg-gray-50">
                          <div className="flex items-center space-x-2 mb-3">
                            <div className={`w-6 h-6 ${channel.color} rounded flex items-center justify-center`}>
                              <channel.icon className="w-3 h-3 text-white" />
                            </div>
                            <span className="font-medium text-sm">{channel.name}</span>
                          </div>
                          
                          {/* Mock Preview */}
                          <div className="bg-white rounded-lg p-3 shadow-sm">
                            <div className="flex items-center space-x-2 mb-2">
                              <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                                <span className="text-white text-xs font-bold">IU</span>
                              </div>
                              <div>
                                <p className="text-sm font-medium">Ihr Unternehmen</p>
                                <p className="text-xs text-gray-500">Gesponsert</p>
                              </div>
                            </div>
                            
                            <div className="space-y-2">
                              <p className="text-sm font-medium">
                                {campaignData.content.headline || 'Ihre Überschrift erscheint hier...'}
                              </p>
                              <p className="text-sm text-gray-600">
                                {campaignData.content.description || 'Ihre Beschreibung erscheint hier...'}
                              </p>
                              
                              {/* Mock Image Placeholder */}
                              <div className="bg-gray-200 rounded h-32 flex items-center justify-center">
                                <span className="text-gray-500 text-sm">Bild-Vorschau</span>
                              </div>
                              
                              {campaignData.content.callToAction && (
                                <Button size="sm" className="w-full mt-2">
                                  {campaignData.content.callToAction}
                                </Button>
                              )}
                            </div>
                          </div>
                        </div>
                      )
                    })}
                  </div>
                ) : (
                  <div className="text-center text-gray-500 py-8">
                    <Target className="w-12 h-12 mx-auto mb-3 text-gray-400" />
                    <p>Wählen Sie Kanäle für die Vorschau</p>
                  </div>
                )}
              </div>
            </div>
          )}

          {currentStep === 2 && (
            <div className="max-w-4xl mx-auto p-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Budget Settings */}
                <Card>
                  <CardHeader>
                    <CardTitle>Budget & Laufzeit</CardTitle>
                    <CardDescription>Legen Sie Ihr Werbebudget und die Kampagnenlaufzeit fest</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    {/* Budget Type */}
                    <div>
                      <Label className="text-base font-medium">Budget-Typ</Label>
                      <RadioGroup
                        value={campaignData.budget.type}
                        onValueChange={(value) => setCampaignData(prev => ({
                          ...prev,
                          budget: { ...prev.budget, type: value }
                        }))}
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

                    {/* Budget Amount */}
                    <div>
                      <Label htmlFor="budget-amount">
                        {campaignData.budget.type === 'daily' ? 'Tagesbudget (€)' : 'Gesamtbudget (€)'} *
                      </Label>
                      <Input
                        id="budget-amount"
                        type="number"
                        value={campaignData.budget.amount}
                        onChange={(e) => setCampaignData(prev => ({
                          ...prev,
                          budget: { ...prev.budget, amount: e.target.value }
                        }))}
                        placeholder="100"
                        min="1"
                      />
                    </div>

                    {/* Duration */}
                    <div>
                      <Label htmlFor="duration">Laufzeit (Tage) *</Label>
                      <Input
                        id="duration"
                        type="number"
                        value={campaignData.budget.duration}
                        onChange={(e) => setCampaignData(prev => ({
                          ...prev,
                          budget: { ...prev.budget, duration: e.target.value }
                        }))}
                        placeholder="7"
                        min="1"
                      />
                    </div>

                    {/* Date Range */}
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="start-date">Startdatum</Label>
                        <Input
                          id="start-date"
                          type="date"
                          value={campaignData.budget.startDate}
                          onChange={(e) => setCampaignData(prev => ({
                            ...prev,
                            budget: { ...prev.budget, startDate: e.target.value }
                          }))}
                        />
                      </div>
                      <div>
                        <Label htmlFor="end-date">Enddatum</Label>
                        <Input
                          id="end-date"
                          type="date"
                          value={campaignData.budget.endDate}
                          onChange={(e) => setCampaignData(prev => ({
                            ...prev,
                            budget: { ...prev.budget, endDate: e.target.value }
                          }))}
                        />
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Campaign Summary */}
                <Card>
                  <CardHeader>
                    <CardTitle>Kampagnen-Zusammenfassung</CardTitle>
                    <CardDescription>Überprüfen Sie Ihre Kampagnen-Einstellungen</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <p className="font-medium text-gray-900">Ziel:</p>
                        <p className="text-gray-600">
                          {goals.find(g => g.id === campaignData.goal)?.title || 'Nicht ausgewählt'}
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
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="border-t border-gray-200 p-6 flex items-center justify-between bg-gray-50">
          <Button
            onClick={onClose}
            variant="outline"
            className="flex items-center space-x-2"
          >
            <X className="w-4 h-4" />
            <span>Abbrechen</span>
          </Button>
          
          <div className="flex items-center space-x-3">
            {currentStep > 1 && (
              <Button
                onClick={() => setCurrentStep(currentStep - 1)}
                variant="outline"
                className="flex items-center space-x-2"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Zurück</span>
              </Button>
            )}
            
            {currentStep < 2 ? (
              <Button
                onClick={() => setCurrentStep(currentStep + 1)}
                disabled={!canProceedToNextStep()}
                className="bg-gradient-to-r from-purple-600 to-pink-600 text-white flex items-center space-x-2"
              >
                <span>Weiter</span>
                <ArrowRight className="w-4 h-4" />
              </Button>
            ) : (
              <Button
                onClick={handleCreateCampaign}
                disabled={!canCreateCampaign()}
                className="bg-gradient-to-r from-green-600 to-emerald-600 text-white flex items-center space-x-2"
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

  // Helper functions
  const canProceedToNextStep = () => {
    if (currentStep === 1) {
      return campaignData.goal && campaignData.channels.length > 0
    }
    return true
  }

  const canCreateCampaign = () => {
    return campaignData.goal && 
           campaignData.channels.length > 0 && 
           campaignData.budget.amount && 
           campaignData.budget.duration
  }

  const handleCreateCampaign = () => {
    // Here you would typically send the campaign data to your backend
    console.log('Creating campaign:', campaignData)
    onClose()
  }
}

export default CampaignWizard
