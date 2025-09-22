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
    { id: 1, title: 'Kampagnenziel', description: 'Wählen Sie Ihr Ziel' },
    { id: 2, title: 'Kanäle & Content', description: 'Kanäle und Inhalte' },
    { id: 3, title: 'Medien-Upload', description: 'Bilder und Videos' },
    { id: 4, title: 'Budget & Bestätigung', description: 'Mediabudget festlegen' }
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
            <p className="text-purple-100">Schritt {currentStep} von {steps.length}: {steps[currentStep - 1]?.title}</p>
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
        <div className="px-6 py-4 border-b">
          <div className="flex items-center justify-between mb-2">
            {steps.map((step, index) => (
              <div key={step.id} className="flex items-center">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                  currentStep >= step.id 
                    ? 'bg-purple-600 text-white' 
                    : 'bg-gray-200 text-gray-600'
                }`}>
                  {currentStep > step.id ? <CheckCircle className="w-5 h-5" /> : step.id}
                </div>
                {index < steps.length - 1 && (
                  <div className={`w-24 h-1 mx-2 ${
                    currentStep > step.id ? 'bg-purple-600' : 'bg-gray-200'
                  }`} />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-hidden">
          {currentStep <= 3 ? (
            /* Steps 1-3: 3-Column Layout */
            <div className="h-full flex">
              {/* Left Column: Settings */}
              <div className="w-1/3 p-6 border-r overflow-y-auto">
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
                  </div>
                )}

                {currentStep === 2 && (
                  <div>
                    <h3 className="text-xl font-bold mb-4">Kanäle & Content</h3>
                    
                    {/* Channel Selection */}
                    <div className="mb-6">
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
                    </div>
                  </div>
                )}

                {currentStep === 3 && (
                  <div>
                    <h3 className="text-xl font-bold mb-4">Medien hochladen</h3>
                    <p className="text-gray-600 mb-6">Laden Sie Bilder und Videos für Ihre Kampagne hoch.</p>
                    
                    <div className="space-y-6">
                      {imageFormats.map((format) => (
                        <div key={format.id} className="border rounded-lg p-4">
                          <h4 className="font-semibold mb-2">{format.name}</h4>
                          <p className="text-sm text-gray-600 mb-3">{format.dimensions} - {format.description}</p>
                          
                          {/* Image Upload */}
                          <div className="mb-4">
                            <Label className="text-sm font-medium mb-2 block">Bild hochladen</Label>
                            <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center hover:border-purple-400 transition-colors">
                              <input
                                type="file"
                                accept="image/*"
                                onChange={(e) => handleImageUpload(e, format.id)}
                                className="hidden"
                                id={`image-${format.id}`}
                              />
                              <label htmlFor={`image-${format.id}`} className="cursor-pointer">
                                <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                                <p className="text-sm text-gray-600">
                                  Bild hochladen ({format.dimensions})
                                </p>
                                <p className="text-xs text-gray-500 mt-1">PNG, JPG bis 10MB</p>
                              </label>
                            </div>
                          </div>

                          {/* Video Upload */}
                          <div>
                            <Label className="text-sm font-medium mb-2 block">Video hochladen (optional)</Label>
                            <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center hover:border-purple-400 transition-colors">
                              <input
                                type="file"
                                accept="video/*"
                                onChange={(e) => handleVideoUpload(e, format.id)}
                                className="hidden"
                                id={`video-${format.id}`}
                              />
                              <label htmlFor={`video-${format.id}`} className="cursor-pointer">
                                <Play className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                                <p className="text-sm text-gray-600">
                                  Video hochladen (MP4, MOV, AVI)
                                </p>
                                <p className="text-xs text-gray-500 mt-1">Bis 100MB</p>
                              </label>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Middle Column: Media Upload (only for step 3) */}
              {currentStep === 3 && (
                <div className="w-1/3 p-6 border-r overflow-y-auto">
                  <h3 className="text-xl font-bold mb-4">Hochgeladene Medien</h3>
                  
                  {uploadedImages.length > 0 && (
                    <div className="mb-6">
                      <h4 className="font-semibold mb-3">Bilder</h4>
                      <div className="space-y-3">
                        {uploadedImages.map((image) => (
                          <div key={image.id} className="border rounded-lg p-3">
                            <img src={image.url} alt={image.name} className="w-full h-32 object-cover rounded mb-2" />
                            <p className="text-sm font-medium">{image.name}</p>
                            <p className="text-xs text-gray-500">{imageFormats.find(f => f.id === image.format)?.name}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {uploadedVideos.length > 0 && (
                    <div>
                      <h4 className="font-semibold mb-3">Videos</h4>
                      <div className="space-y-3">
                        {uploadedVideos.map((video) => (
                          <div key={video.id} className="border rounded-lg p-3">
                            <video src={video.url} className="w-full h-32 object-cover rounded mb-2" controls />
                            <p className="text-sm font-medium">{video.name}</p>
                            <p className="text-xs text-gray-500">{imageFormats.find(f => f.id === video.format)?.name}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {uploadedImages.length === 0 && uploadedVideos.length === 0 && (
                    <div className="text-center text-gray-500 py-8">
                      <Upload className="w-12 h-12 mx-auto mb-4 text-gray-300" />
                      <p>Keine Medien hochgeladen</p>
                    </div>
                  )}
                </div>
              )}

              {/* Right Column: Live Preview */}
              <div className="w-1/3 p-6 overflow-y-auto">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-bold">Live-Vorschau</h3>
                  {getSelectedChannels().length > 1 && (
                    <div className="flex items-center space-x-2">
                      <Button
                        onClick={() => setCurrentPreviewIndex(Math.max(0, currentPreviewIndex - 1))}
                        disabled={currentPreviewIndex === 0}
                        size="sm"
                        className="bg-purple-500 hover:bg-purple-600 text-white"
                      >
                        <ArrowLeft className="w-4 h-4" />
                      </Button>
                      <Button
                        onClick={() => setCurrentPreviewIndex(Math.min(getSelectedChannels().length - 1, currentPreviewIndex + 1))}
                        disabled={currentPreviewIndex >= getSelectedChannels().length - 1}
                        size="sm"
                        className="bg-purple-500 hover:bg-purple-600 text-white"
                      >
                        <ArrowRight className="w-4 h-4" />
                      </Button>
                    </div>
                  )}
                </div>

                {getSelectedChannels().length > 0 ? (
                  <>
                    <div className="mb-4">
                      {renderPreview(getSelectedChannels()[currentPreviewIndex])}
                    </div>
                    
                    {getSelectedChannels().length > 1 && (
                      <div className="flex justify-center space-x-2">
                        {getSelectedChannels().map((_, index) => (
                          <button
                            key={index}
                            onClick={() => setCurrentPreviewIndex(index)}
                            className={`w-3 h-3 rounded-full ${
                              index === currentPreviewIndex ? 'bg-purple-500' : 'bg-gray-300'
                            }`}
                          />
                        ))}
                      </div>
                    )}
                    
                    <div className="mt-4 text-center">
                      <div className="flex items-center justify-center space-x-2 mb-2">
                        <div className={`w-6 h-6 ${getSelectedChannels()[currentPreviewIndex]?.color} rounded flex items-center justify-center`}>
                          {React.createElement(getSelectedChannels()[currentPreviewIndex]?.icon, { className: "w-3 h-3 text-white" })}
                        </div>
                        <span className="font-medium">{getSelectedChannels()[currentPreviewIndex]?.name}</span>
                      </div>
                      <p className="text-sm text-gray-600">
                        {currentPreviewIndex + 1} von {getSelectedChannels().length}
                      </p>
                    </div>
                  </>
                ) : (
                  <div className="text-center text-gray-500 py-8">
                    <Eye className="w-12 h-12 mx-auto mb-4 text-gray-300" />
                    <p>Wählen Sie Kanäle für die Vorschau</p>
                  </div>
                )}
              </div>
            </div>
          ) : (
            /* Step 4: Budget & Confirmation - Full Width */
            <div className="h-full p-6 overflow-y-auto">
              <div className="max-w-4xl mx-auto">
                <h3 className="text-2xl font-bold mb-6">Budget & Bestätigung</h3>
                
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  {/* Budget Settings */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center space-x-2">
                        <Euro className="w-5 h-5" />
                        <span>Mediabudget festlegen</span>
                      </CardTitle>
                      <CardDescription>
                        Legen Sie Ihr Werbebudget fest
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div>
                        <Label>Budget-Typ</Label>
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

                      <div>
                        <Label htmlFor="budget-amount">
                          {campaignData.budget.type === 'daily' ? 'Tagesbudget (€)' : 'Gesamtbudget (€)'}
                        </Label>
                        <Input
                          id="budget-amount"
                          type="number"
                          min="1"
                          value={campaignData.budget.amount}
                          onChange={(e) => setCampaignData(prev => ({
                            ...prev,
                            budget: { ...prev.budget, amount: e.target.value }
                          }))}
                          placeholder="100"
                          className="mt-1"
                        />
                      </div>

                      <div>
                        <Label htmlFor="duration">Laufzeit (Tage)</Label>
                        <Input
                          id="duration"
                          type="number"
                          min="1"
                          value={campaignData.budget.duration}
                          onChange={(e) => setCampaignData(prev => ({
                            ...prev,
                            budget: { ...prev.budget, duration: e.target.value }
                          }))}
                          placeholder="7"
                          className="mt-1"
                        />
                      </div>

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
                          className="mt-1"
                        />
                      </div>
                    </CardContent>
                  </Card>

                  {/* Campaign Summary */}
                  <Card>
                    <CardHeader>
                      <CardTitle>Kampagnen-Übersicht</CardTitle>
                      <CardDescription>
                        Überprüfen Sie Ihre Kampagnen-Einstellungen
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div>
                        <h4 className="font-semibold mb-2">Ziel</h4>
                        <p className="text-sm text-gray-600">
                          {goals.find(g => g.id === campaignData.goal)?.title || 'Nicht ausgewählt'}
                        </p>
                      </div>

                      <div>
                        <h4 className="font-semibold mb-2">Kanäle ({campaignData.channels.length})</h4>
                        <div className="flex flex-wrap gap-2">
                          {getSelectedChannels().map((channel) => (
                            <Badge key={channel.id} variant="secondary" className="text-xs">
                              {channel.name}
                            </Badge>
                          ))}
                        </div>
                      </div>

                      <div>
                        <h4 className="font-semibold mb-2">Medien</h4>
                        <p className="text-sm text-gray-600">
                          {uploadedImages.length} Bilder, {uploadedVideos.length} Videos
                        </p>
                      </div>

                      {campaignData.budget.amount && (
                        <div>
                          <h4 className="font-semibold mb-2">Budget</h4>
                          <p className="text-sm text-gray-600">
                            {campaignData.budget.type === 'daily' ? 'Täglich' : 'Gesamt'}: €{campaignData.budget.amount}
                            {campaignData.budget.duration && ` für ${campaignData.budget.duration} Tage`}
                          </p>
                          {campaignData.budget.type === 'daily' && campaignData.budget.duration && (
                            <p className="text-sm text-gray-500">
                              Geschätztes Gesamtbudget: €{campaignData.budget.amount * campaignData.budget.duration}
                            </p>
                          )}
                        </div>
                      )}
                    </CardContent>
                  </Card>
                </div>

                {/* Budget Confirmation */}
                <Card className="mt-8">
                  <CardContent className="p-6">
                    <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-4">
                      <div className="flex items-start space-x-3">
                        <div className="w-6 h-6 bg-yellow-400 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                          <span className="text-white text-sm font-bold">!</span>
                        </div>
                        <div>
                          <h4 className="font-semibold text-yellow-800 mb-2">Wichtiger Hinweis zum Mediabudget</h4>
                          <p className="text-sm text-yellow-700">
                            Das von Ihnen festgelegte Budget wird als Mediabudget für Ihre Kampagne verwendet und 
                            entsprechend abgerechnet. Dieses Budget wird direkt an die Werbeplattformen (Facebook, Google, etc.) 
                            weitergeleitet, um Ihre Anzeigen zu schalten.
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
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between p-6 border-t bg-gray-50">
          <Button
            onClick={prevStep}
            disabled={currentStep === 1}
            variant="outline"
            className="flex items-center space-x-2"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Zurück</span>
          </Button>

          <div className="text-sm text-gray-500">
            Schritt {currentStep} von {steps.length}
          </div>

          {currentStep < steps.length ? (
            <Button
              onClick={nextStep}
              disabled={!canProceed()}
              className="bg-purple-600 hover:bg-purple-700 text-white flex items-center space-x-2"
            >
              <span>Weiter</span>
              <ArrowRight className="w-4 h-4" />
            </Button>
          ) : (
            <Button
              onClick={() => {
                // TODO: Submit campaign
                console.log('Campaign submitted:', campaignData)
                onClose()
              }}
              disabled={!canProceed()}
              className="bg-green-600 hover:bg-green-700 text-white flex items-center space-x-2"
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
