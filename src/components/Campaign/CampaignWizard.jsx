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
  ChevronRight,
  Phone
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
    budgetConfirmed: false,
    finalApproval: false
  })

  const steps = [
    { id: 1, title: 'Ziel & Kanäle', description: 'Kampagnenziel und Plattformen auswählen' },
    { id: 2, title: 'Inhalte & Medien', description: 'Texte erstellen und Bilder hochladen' },
    { id: 3, title: 'Vorschau', description: 'Kampagnen in Handy-Mockups betrachten' },
    { id: 4, title: 'Budget & Freigabe', description: 'Budget festlegen und Kampagne freigeben' }
  ]

  const handleImageUpload = (event, format) => {
    const file = event.target.files[0]
    if (file) {
      // Validate image dimensions
      const img = new Image()
      img.onload = () => {
        let isValid = false
        if (format === '1080x1080' && img.width === 1080 && img.height === 1080) isValid = true
        if (format === '1080x1920' && img.width === 1080 && img.height === 1920) isValid = true
        if (format === '1200x630' && img.width === 1200 && img.height === 630) isValid = true

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
    return true // Step 3 is just preview, always allow to proceed
  }

  const canCreateCampaign = () => {
    return campaignData.budget.amount && campaignData.budgetConfirmed && campaignData.finalApproval
  }

  const nextStep = () => {
    if (currentStep === 1 && canProceedToStep2()) {
      setCurrentStep(2)
    } else if (currentStep === 2 && canProceedToStep3()) {
      setCurrentStep(3)
    } else if (currentStep === 3 && canProceedToStep4()) {
      setCurrentStep(4)
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

  const getRequiredFormats = () => {
    const selectedChannels = getSelectedChannels()
    const formats = new Set()
    selectedChannels.forEach(channel => {
      formats.add(channel.format)
    })
    return Array.from(formats)
  }

  // Mobile Mockup Component
  const MobileMockup = ({ channel, children }) => (
    <div className="relative mx-auto" style={{ width: '280px', height: '560px' }}>
      {/* Phone Frame */}
      <div className="absolute inset-0 bg-gray-900 rounded-[2.5rem] p-2 shadow-2xl">
        <div className="w-full h-full bg-black rounded-[2rem] overflow-hidden relative">
          {/* Status Bar */}
          <div className="absolute top-0 left-0 right-0 h-8 bg-black z-10 flex items-center justify-between px-6 text-white text-xs">
            <span>9:41</span>
            <div className="flex items-center space-x-1">
              <div className="w-4 h-2 border border-white rounded-sm">
                <div className="w-3 h-1 bg-white rounded-sm m-0.5"></div>
              </div>
            </div>
          </div>
          {/* App Content */}
          <div className="pt-8 h-full overflow-hidden">
            {children}
          </div>
        </div>
      </div>
    </div>
  )

  // Facebook Mockup
  const FacebookMockup = ({ content, image }) => (
    <div className="bg-white h-full">
      {/* Facebook Header */}
      <div className="bg-blue-600 p-3 flex items-center space-x-2">
        <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center">
          <span className="text-blue-600 font-bold text-sm">f</span>
        </div>
        <span className="text-white font-semibold">Facebook</span>
      </div>
      
      {/* Post */}
      <div className="p-3 border-b border-gray-200">
        <div className="flex items-center space-x-2 mb-3">
          <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
            <span className="text-white text-xs font-bold">IU</span>
          </div>
          <div>
            <p className="font-semibold text-sm">Ihr Unternehmen</p>
            <p className="text-xs text-gray-500 flex items-center">
              <span className="w-2 h-2 bg-blue-500 rounded-full mr-1"></span>
              Gesponsert · 2 Min
            </p>
          </div>
        </div>
        
        {content.headline && (
          <p className="font-medium mb-2 text-sm whitespace-pre-line">{content.headline}</p>
        )}
        
        {content.description && (
          <p className="text-sm text-gray-700 mb-3 whitespace-pre-line">{content.description}</p>
        )}
        
        {image && (
          <img src={image} alt="Ad" className="w-full rounded-lg mb-3" style={{ maxHeight: '200px', objectFit: 'cover' }} />
        )}
        
        {content.callToAction && (
          <button className="bg-blue-600 text-white px-4 py-2 rounded text-sm font-medium w-full">
            {content.callToAction}
          </button>
        )}
        
        {/* Engagement */}
        <div className="flex items-center justify-between mt-3 pt-3 border-t text-gray-500">
          <div className="flex items-center space-x-4 text-xs">
            <span className="flex items-center space-x-1">
              <Heart className="w-3 h-3 text-red-500" />
              <span>42</span>
            </span>
            <span>8 Kommentare</span>
          </div>
        </div>
      </div>
    </div>
  )

  // Instagram Mockup
  const InstagramMockup = ({ content, image }) => (
    <div className="bg-white h-full">
      {/* Instagram Header */}
      <div className="bg-white p-3 flex items-center justify-between border-b border-gray-200">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-gradient-to-tr from-yellow-400 via-red-500 to-purple-500 rounded-full flex items-center justify-center">
            <Camera className="w-4 h-4 text-white" />
          </div>
          <span className="font-semibold">Instagram</span>
        </div>
        <Heart className="w-6 h-6" />
      </div>
      
      {/* Post */}
      <div>
        <div className="flex items-center space-x-2 p-3">
          <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
            <span className="text-white text-xs font-bold">IU</span>
          </div>
          <div className="flex-1">
            <p className="font-semibold text-sm">ihr_unternehmen</p>
            <p className="text-xs text-gray-500">Gesponsert</p>
          </div>
          <MoreHorizontal className="w-5 h-5" />
        </div>
        
        {image && (
          <img src={image} alt="Ad" className="w-full" style={{ height: '280px', objectFit: 'cover' }} />
        )}
        
        <div className="p-3">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center space-x-4">
              <Heart className="w-6 h-6" />
              <MessageCircle className="w-6 h-6" />
              <Share className="w-6 h-6" />
            </div>
          </div>
          
          <p className="text-sm mb-1"><span className="font-semibold">42 Gefällt mir-Angaben</span></p>
          
          {content.headline && (
            <p className="text-sm">
              <span className="font-semibold">ihr_unternehmen</span> {content.headline}
            </p>
          )}
          
          {content.description && (
            <p className="text-sm text-gray-700 mt-1 whitespace-pre-line">{content.description}</p>
          )}
          
          {content.callToAction && (
            <button className="bg-blue-500 text-white px-4 py-1 rounded text-sm font-medium mt-2">
              {content.callToAction}
            </button>
          )}
        </div>
      </div>
    </div>
  )

  // TikTok Mockup
  const TikTokMockup = ({ content, image }) => (
    <div className="bg-black h-full relative text-white">
      {/* TikTok Header */}
      <div className="absolute top-0 left-0 right-0 z-10 p-3 flex items-center justify-center">
        <span className="font-bold text-lg">TikTok</span>
      </div>
      
      {/* Video Content */}
      <div className="relative h-full flex items-center justify-center">
        {image ? (
          <img src={image} alt="Ad" className="w-full h-full object-cover" />
        ) : (
          <div className="w-full h-full bg-gray-800 flex items-center justify-center">
            <Play className="w-16 h-16 text-white opacity-50" />
          </div>
        )}
        
        {/* Overlay Content */}
        <div className="absolute bottom-20 left-4 right-16">
          <div className="flex items-center space-x-2 mb-2">
            <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
              <span className="text-white text-xs font-bold">IU</span>
            </div>
            <span className="font-semibold">@ihr_unternehmen</span>
            <span className="bg-red-500 px-2 py-1 text-xs rounded">Folgen</span>
          </div>
          
          {content.headline && (
            <p className="font-medium mb-1 text-sm whitespace-pre-line">{content.headline}</p>
          )}
          
          {content.description && (
            <p className="text-sm opacity-90 whitespace-pre-line">{content.description}</p>
          )}
          
          {content.callToAction && (
            <button className="bg-white text-black px-3 py-1 rounded-full text-sm font-medium mt-2">
              {content.callToAction}
            </button>
          )}
        </div>
        
        {/* Side Actions */}
        <div className="absolute bottom-20 right-4 flex flex-col space-y-4">
          <div className="text-center">
            <Heart className="w-8 h-8 mx-auto mb-1" />
            <span className="text-xs">42</span>
          </div>
          <div className="text-center">
            <MessageCircle className="w-8 h-8 mx-auto mb-1" />
            <span className="text-xs">8</span>
          </div>
          <div className="text-center">
            <Share className="w-8 h-8 mx-auto mb-1" />
            <span className="text-xs">3</span>
          </div>
        </div>
      </div>
    </div>
  )

  // Google Ads Mockup
  const GoogleAdsMockup = ({ content, image }) => (
    <div className="bg-white h-full">
      {/* Google Header */}
      <div className="bg-white p-3 flex items-center space-x-2 border-b border-gray-200">
        <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center">
          <span className="text-red-600 font-bold text-sm">G</span>
        </div>
        <span className="font-semibold">Google</span>
      </div>
      
      {/* Search Results */}
      <div className="p-3">
        <div className="mb-4">
          <div className="bg-gray-100 rounded-full p-2 flex items-center">
            <Search className="w-4 h-4 text-gray-500 mr-2" />
            <span className="text-sm text-gray-600">Ihre Suchbegriffe...</span>
          </div>
        </div>
        
        {/* Ad Result */}
        <div className="border border-gray-200 rounded-lg p-3 mb-3">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs text-gray-500 bg-yellow-100 px-2 py-1 rounded">Anzeige</span>
            <span className="text-xs text-gray-500">gesponsert</span>
          </div>
          
          {content.headline && (
            <h3 className="text-blue-600 font-medium text-sm mb-1 whitespace-pre-line">{content.headline}</h3>
          )}
          
          <p className="text-xs text-green-600 mb-2">www.ihr-unternehmen.de</p>
          
          {content.description && (
            <p className="text-sm text-gray-700 mb-2 whitespace-pre-line">{content.description}</p>
          )}
          
          {image && (
            <img src={image} alt="Ad" className="w-full rounded mb-2" style={{ maxHeight: '120px', objectFit: 'cover' }} />
          )}
          
          {content.callToAction && (
            <button className="bg-blue-600 text-white px-3 py-1 rounded text-xs font-medium">
              {content.callToAction}
            </button>
          )}
        </div>
      </div>
    </div>
  )

  // LinkedIn Mockup
  const LinkedInMockup = ({ content, image }) => (
    <div className="bg-white h-full">
      {/* LinkedIn Header */}
      <div className="bg-blue-700 p-3 flex items-center space-x-2">
        <div className="w-8 h-8 bg-white rounded flex items-center justify-center">
          <span className="text-blue-700 font-bold text-sm">in</span>
        </div>
        <span className="text-white font-semibold">LinkedIn</span>
      </div>
      
      {/* Post */}
      <div className="p-3 border-b border-gray-200">
        <div className="flex items-center space-x-2 mb-3">
          <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
            <span className="text-white text-xs font-bold">IU</span>
          </div>
          <div>
            <p className="font-semibold text-sm">Ihr Unternehmen</p>
            <p className="text-xs text-gray-500">Gesponsert · 2h</p>
          </div>
        </div>
        
        {content.headline && (
          <p className="font-medium mb-2 text-sm whitespace-pre-line">{content.headline}</p>
        )}
        
        {content.description && (
          <p className="text-sm text-gray-700 mb-3 whitespace-pre-line">{content.description}</p>
        )}
        
        {image && (
          <img src={image} alt="Ad" className="w-full rounded mb-3" style={{ maxHeight: '200px', objectFit: 'cover' }} />
        )}
        
        {content.callToAction && (
          <button className="bg-blue-700 text-white px-4 py-2 rounded text-sm font-medium w-full">
            {content.callToAction}
          </button>
        )}
        
        {/* Engagement */}
        <div className="flex items-center justify-between mt-3 pt-3 border-t text-gray-500">
          <div className="flex items-center space-x-4 text-xs">
            <span>42 Reaktionen</span>
            <span>8 Kommentare</span>
          </div>
        </div>
      </div>
    </div>
  )

  // Reddit Mockup
  const RedditMockup = ({ content, image }) => (
    <div className="bg-white h-full">
      {/* Reddit Header */}
      <div className="bg-orange-600 p-3 flex items-center space-x-2">
        <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center">
          <span className="text-orange-600 font-bold text-sm">r/</span>
        </div>
        <span className="text-white font-semibold">Reddit</span>
      </div>
      
      {/* Post */}
      <div className="p-3 border-b border-gray-200">
        <div className="flex items-start space-x-2">
          <div className="flex flex-col items-center">
            <button className="text-gray-400 hover:text-orange-500">▲</button>
            <span className="text-xs font-bold">42</span>
            <button className="text-gray-400 hover:text-blue-500">▼</button>
          </div>
          
          <div className="flex-1">
            <div className="flex items-center space-x-1 mb-2">
              <span className="text-xs text-gray-500">r/werbung</span>
              <span className="text-xs text-gray-400">•</span>
              <span className="text-xs text-gray-500">Gesponsert</span>
            </div>
            
            {content.headline && (
              <h3 className="font-medium mb-2 text-sm whitespace-pre-line">{content.headline}</h3>
            )}
            
            {content.description && (
              <p className="text-sm text-gray-700 mb-3 whitespace-pre-line">{content.description}</p>
            )}
            
            {image && (
              <img src={image} alt="Ad" className="w-full rounded mb-3" style={{ maxHeight: '200px', objectFit: 'cover' }} />
            )}
            
            {content.callToAction && (
              <button className="bg-orange-600 text-white px-3 py-1 rounded text-sm font-medium">
                {content.callToAction}
              </button>
            )}
            
            <div className="flex items-center space-x-4 mt-3 text-xs text-gray-500">
              <span>💬 8 Kommentare</span>
              <span>🔗 Teilen</span>
              <span>💾 Speichern</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )

  // Snapchat Mockup
  const SnapchatMockup = ({ content, image }) => (
    <div className="bg-black h-full relative text-white">
      {/* Snapchat Header */}
      <div className="absolute top-0 left-0 right-0 z-10 p-3 flex items-center justify-between">
        <span className="font-bold text-lg">👻 Snapchat</span>
        <div className="flex space-x-2">
          <div className="w-6 h-6 bg-yellow-400 rounded-full"></div>
        </div>
      </div>
      
      {/* Story Content */}
      <div className="relative h-full">
        {image ? (
          <img src={image} alt="Ad" className="w-full h-full object-cover" />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
            <Camera className="w-16 h-16 text-white opacity-50" />
          </div>
        )}
        
        {/* Overlay Content */}
        <div className="absolute bottom-20 left-4 right-4">
          <div className="bg-black bg-opacity-50 rounded-lg p-3">
            {content.headline && (
              <p className="font-medium mb-1 text-sm whitespace-pre-line">{content.headline}</p>
            )}
            
            {content.description && (
              <p className="text-sm opacity-90 whitespace-pre-line">{content.description}</p>
            )}
            
            {content.callToAction && (
              <button className="bg-yellow-400 text-black px-3 py-1 rounded-full text-sm font-medium mt-2 w-full">
                {content.callToAction}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  )

  // Spotify Mockup
  const SpotifyMockup = ({ content, image }) => (
    <div className="bg-black h-full text-white">
      {/* Spotify Header */}
      <div className="bg-green-600 p-3 flex items-center space-x-2">
        <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center">
          <span className="text-green-600 font-bold text-sm">♫</span>
        </div>
        <span className="text-white font-semibold">Spotify</span>
      </div>
      
      {/* Ad Content */}
      <div className="p-4">
        <div className="bg-gray-900 rounded-lg p-4 mb-4">
          <div className="flex items-center space-x-2 mb-3">
            <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
              <span className="text-white text-xs font-bold">IU</span>
            </div>
            <div>
              <p className="font-semibold text-sm">Ihr Unternehmen</p>
              <p className="text-xs text-gray-400">Gesponsert</p>
            </div>
          </div>
          
          {image && (
            <img src={image} alt="Ad" className="w-full rounded mb-3" style={{ maxHeight: '200px', objectFit: 'cover' }} />
          )}
          
          {content.headline && (
            <p className="font-medium mb-2 text-sm whitespace-pre-line">{content.headline}</p>
          )}
          
          {content.description && (
            <p className="text-sm text-gray-300 mb-3 whitespace-pre-line">{content.description}</p>
          )}
          
          {content.callToAction && (
            <button className="bg-green-600 text-white px-4 py-2 rounded-full text-sm font-medium w-full">
              {content.callToAction}
            </button>
          )}
        </div>
      </div>
    </div>
  )

  const renderMockupForChannel = (channel) => {
    const content = campaignData.content
    const image = campaignData.content.images[channel.format]

    switch (channel.id) {
      case 'facebook':
        return <FacebookMockup content={content} image={image} />
      case 'instagram':
        return <InstagramMockup content={content} image={image} />
      case 'tiktok':
        return <TikTokMockup content={content} image={image} />
      case 'google':
        return <GoogleAdsMockup content={content} image={image} />
      case 'linkedin':
        return <LinkedInMockup content={content} image={image} />
      case 'reddit':
        return <RedditMockup content={content} image={image} />
      case 'snapchat':
        return <SnapchatMockup content={content} image={image} />
      case 'spotify':
        return <SpotifyMockup content={content} image={image} />
      default:
        return <FacebookMockup content={content} image={image} />
    }
  }

  // Step 1: Goal & Channels Selection (2 columns)
  const renderStep1 = () => (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 h-full">
      {/* Left Column: Campaign Goals */}
      <div className="space-y-6 max-h-[70vh] overflow-y-auto">
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
      </div>

      {/* Right Column: Channel Selection */}
      <div className="space-y-6 max-h-[70vh] overflow-y-auto">
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
                    {channel.format}px Format<br />
                    {channel.dimensions}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )

  // Step 2: Content & Media (2 columns)
  const renderStep2 = () => (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 h-full">
      {/* Left Column: Content Creation */}
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
                rows={4}
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
          </CardContent>
        </Card>
      </div>

      {/* Right Column: Media Upload */}
      <div className="space-y-6 max-h-[70vh] overflow-y-auto">
        {getSelectedChannels().length > 0 && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Upload className="w-5 h-5 text-purple-600" />
                <span>Medien hochladen</span>
              </CardTitle>
              <CardDescription>Laden Sie Bilder und Videos für Ihre Kampagne hoch</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Image Upload by Format */}
              {getRequiredFormats().map((format) => (
                <div key={format} className="border rounded-lg p-4 bg-gray-50">
                  <div className="flex items-center justify-between mb-3">
                    <span className="font-medium text-purple-700">{format}px Format</span>
                    <Badge variant="outline" className="bg-white">
                      {format}px
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
            </CardContent>
          </Card>
        )}

        {/* Placeholder when no channels selected */}
        {getSelectedChannels().length === 0 && (
          <Card>
            <CardContent className="text-center py-12 text-gray-500">
              <Upload className="w-16 h-16 mx-auto mb-4 text-gray-300" />
              <p className="text-lg">Keine Kanäle ausgewählt</p>
              <p className="text-sm">Gehen Sie zurück und wählen Sie Kanäle aus, um Medien hochzuladen</p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )

  // Step 3: Mobile Mockup Previews (2 columns)
  const renderStep3 = () => {
    const selectedChannels = getSelectedChannels()
    const totalPairs = Math.ceil(selectedChannels.length / 2)
    const currentPair = Math.floor(currentPreviewIndex / 2)
    const leftChannelIndex = currentPair * 2
    const rightChannelIndex = leftChannelIndex + 1

    return (
      <div className="space-y-6">
        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold mb-2 text-gray-800">
            Kampagnen-Vorschau in Handy-Mockups
          </h2>
          <p className="text-gray-600">So sehen Ihre Anzeigen auf den mobilen Geräten aus</p>
        </div>

        {selectedChannels.length > 0 ? (
          <div className="space-y-6">
            {/* Navigation */}
            <div className="flex items-center justify-between">
              <Button
                variant="outline"
                onClick={() => setCurrentPreviewIndex(Math.max(0, currentPreviewIndex - 2))}
                disabled={currentPreviewIndex === 0}
                className="flex items-center space-x-2"
              >
                <ChevronLeft className="w-4 h-4 text-purple-600" />
                <span>Vorherige</span>
              </Button>
              
              <Badge variant="secondary" className="bg-purple-100 text-purple-700">
                {currentPair + 1} von {totalPairs} Seiten
              </Badge>
              
              <Button
                variant="outline"
                onClick={() => setCurrentPreviewIndex(Math.min(selectedChannels.length - 1, currentPreviewIndex + 2))}
                disabled={rightChannelIndex >= selectedChannels.length}
                className="flex items-center space-x-2"
              >
                <span>Nächste</span>
                <ChevronRight className="w-4 h-4 text-purple-600" />
              </Button>
            </div>

            {/* Mobile Mockups */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 justify-items-center">
              {/* Left Mockup */}
              {selectedChannels[leftChannelIndex] && (
                <div className="space-y-4">
                  <div className="text-center">
                    <div className="flex items-center justify-center space-x-2 mb-2">
                      <div className={`p-2 rounded ${selectedChannels[leftChannelIndex].color}`}>
                        {selectedChannels[leftChannelIndex].icon}
                      </div>
                      <h3 className="text-lg font-semibold text-gray-800">
                        {selectedChannels[leftChannelIndex].name}
                      </h3>
                    </div>
                    <Badge variant="outline" className="bg-gray-100">
                      {selectedChannels[leftChannelIndex].dimensions}
                    </Badge>
                  </div>
                  
                  <MobileMockup channel={selectedChannels[leftChannelIndex]}>
                    {renderMockupForChannel(selectedChannels[leftChannelIndex])}
                  </MobileMockup>
                </div>
              )}

              {/* Right Mockup */}
              {selectedChannels[rightChannelIndex] && (
                <div className="space-y-4">
                  <div className="text-center">
                    <div className="flex items-center justify-center space-x-2 mb-2">
                      <div className={`p-2 rounded ${selectedChannels[rightChannelIndex].color}`}>
                        {selectedChannels[rightChannelIndex].icon}
                      </div>
                      <h3 className="text-lg font-semibold text-gray-800">
                        {selectedChannels[rightChannelIndex].name}
                      </h3>
                    </div>
                    <Badge variant="outline" className="bg-gray-100">
                      {selectedChannels[rightChannelIndex].dimensions}
                    </Badge>
                  </div>
                  
                  <MobileMockup channel={selectedChannels[rightChannelIndex]}>
                    {renderMockupForChannel(selectedChannels[rightChannelIndex])}
                  </MobileMockup>
                </div>
              )}
            </div>

            {/* Navigation Arrows */}
            <div className="flex justify-center space-x-4 mt-6">
              {Array.from({ length: totalPairs }, (_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentPreviewIndex(index * 2)}
                  className={`flex items-center justify-center w-10 h-10 rounded-lg border-2 transition-all ${
                    index === currentPair 
                      ? 'bg-purple-600 border-purple-600 text-white shadow-md' 
                      : 'bg-white border-gray-300 text-gray-600 hover:border-purple-300 hover:text-purple-600'
                  }`}
                >
                  {index < currentPair ? (
                    <ChevronLeft className="w-5 h-5" />
                  ) : index > currentPair ? (
                    <ChevronRight className="w-5 h-5" />
                  ) : (
                    <div className="w-2 h-2 bg-current rounded-full"></div>
                  )}
                </button>
              ))}
            </div>
          </div>
        ) : (
          <div className="text-center py-12 text-gray-500">
            <Phone className="w-16 h-16 mx-auto mb-4 text-gray-300" />
            <p className="text-lg">Keine Kanäle ausgewählt</p>
            <p className="text-sm">Gehen Sie zurück und wählen Sie Kanäle aus, um Vorschauen zu sehen</p>
          </div>
        )}
      </div>
    )
  }

  // Step 4: Budget & Final Approval
  const renderStep4 = () => (
    <div className="max-w-4xl mx-auto space-y-6 max-h-[70vh] overflow-y-auto">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold mb-2 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
          Budget & Finale Freigabe
        </h2>
        <p className="text-gray-600">Legen Sie Ihr Budget fest und geben Sie Ihre Kampagne frei</p>
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
              <h4 className="font-semibold mb-2 text-green-800">Inhalte</h4>
              <p className="text-sm text-green-600">
                Überschrift: {campaignData.content.headline || 'Nicht gesetzt'}<br />
                Beschreibung: {campaignData.content.description ? 'Gesetzt' : 'Nicht gesetzt'}<br />
                Medien: {Object.keys(campaignData.content.images).length} Bilder
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
              <Label htmlFor="budget-confirmation" className="text-sm leading-relaxed">
                Ich bestätige, dass ich verstehe, dass das festgelegte Budget von €{campaignData.budget.amount || '0'} 
                {campaignData.budget.type === 'daily' ? ' pro Tag' : ' insgesamt'} als Mediabudget für meine Kampagne 
                verwendet und entsprechend berechnet wird.
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
              <Label htmlFor="final-approval" className="text-sm leading-relaxed font-semibold text-purple-800">
                Ich gebe meine finale Freigabe für diese Kampagne und möchte sie jetzt starten. Alle Angaben sind korrekt und ich bin mit der Umsetzung einverstanden.
              </Label>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[9999] p-4">
      <div className="bg-white rounded-[10px] shadow-xl w-full max-w-7xl max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b bg-gradient-to-r from-purple-600 to-pink-600 rounded-t-[10px]">
          <div>
            <h1 className="text-2xl font-bold text-white">
              Kampagne erstellen
            </h1>
            <p className="text-purple-100">Schritt {currentStep} von {steps.length}: {steps[currentStep - 1]?.title}</p>
          </div>
          <Button variant="ghost" size="sm" onClick={onClose} className="hover:bg-white hover:bg-opacity-20 text-white hover:text-white">
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
          {currentStep === 3 && renderStep3()}
          {currentStep === 4 && renderStep4()}
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
              disabled={
                (currentStep === 1 && !canProceedToStep2()) ||
                (currentStep === 2 && !canProceedToStep3()) ||
                (currentStep === 3 && !canProceedToStep4())
              }
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
              <span>Kampagne starten</span>
              <CheckCircle className="w-4 h-4" />
            </Button>
          )}
        </div>
      </div>
    </div>
  )
}

export default CampaignWizard
