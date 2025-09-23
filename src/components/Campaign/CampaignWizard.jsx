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
    return (
      campaignData.goal &&
      campaignData.channels.length > 0 &&
      campaignData.content.headline &&
      campaignData.content.description &&
      campaignData.budget.amount &&
      campaignData.budget.startDate
    )
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

  const handleCreateCampaign = async () => {
    if (!canCreateCampaign()) {
      alert('Bitte füllen Sie alle erforderlichen Felder aus.')
      return
    }

    try {
      const userId = currentUser?.id || 'demo'
      
      // Prepare campaign data with uploaded media
      const campaignDataWithMedia = {
        ...campaignData,
        content: {
          ...campaignData.content,
          images: campaignData.content.images,
          videos: uploadedVideos
        },
        status: 'draft' // Start as draft for admin review
      }

      const savedCampaign = await saveCampaign(campaignDataWithMedia, userId)
      alert('Kampagne erfolgreich erstellt und zur Prüfung eingereicht!')
      console.log('Campaign saved with ID:', savedCampaign.id)
      onClose()
    } catch (error) {
      console.error('Fehler beim Erstellen der Kampagne:', error)
      alert('Fehler beim Erstellen der Kampagne. Bitte versuchen Sie es erneut.')
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
      icon: <img src="/logos/facebook.png" alt="Facebook" className="w-5 h-5 object-contain" />,
      format: '1080x1080',
      dimensions: '1080x1080px',
      color: 'bg-blue-600'
    },
    {
      id: 'instagram',
      name: 'Instagram',
      icon: <img src="/logos/instagram.png" alt="Instagram" className="w-5 h-5 object-contain" />,
      format: '1080x1080',
      dimensions: '1080x1080px',
      color: 'bg-pink-600'
    },
    {
      id: 'google',
      name: 'Google Ads',
      icon: <img src="/logos/google.png" alt="Google Ads" className="w-5 h-5 object-contain" />,
      format: '1080x1080',
      dimensions: '1080x1080px',
      color: 'bg-red-600'
    },
    {
      id: 'tiktok',
      name: 'TikTok',
      icon: <img src="/logos/tiktok.png" alt="TikTok" className="w-5 h-5 object-contain" />,
      format: '1080x1920',
      dimensions: '1080x1920px',
      color: 'bg-black'
    },
    {
      id: 'snapchat',
      name: 'Snapchat',
      icon: <img src="/logos/snapchat.png" alt="Snapchat" className="w-5 h-5 object-contain" />,
      format: '1080x1920',
      dimensions: '1080x1920px',
      color: 'bg-yellow-400'
    },
    {
      id: 'reddit',
      name: 'Reddit',
      icon: <img src="/logos/reddit.png" alt="Reddit" className="w-5 h-5 object-contain" />,
      format: '1200x630',
      dimensions: '1200x630px',
      color: 'bg-orange-600'
    },
    {
      id: 'linkedin',
      name: 'LinkedIn',
      icon: <img src="/logos/linkedin.png" alt="LinkedIn" className="w-5 h-5 object-contain" />,
      format: '1080x1080',
      dimensions: '1080x1080px',
      color: 'bg-blue-700'
    },
    {
      id: 'spotify',
      name: 'Spotify',
      icon: <img src="/logos/spotify.png" alt="Spotify" className="w-5 h-5 object-contain" />,
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
            <span className="text-xs">Share</span>
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
        <div className="w-8 h-8 bg-white rounded flex items-center justify-center">
          <span className="text-blue-600 font-bold text-lg">G</span>
        </div>
        <span className="font-semibold">Google</span>
      </div>
      
      {/* Search Result */}
      <div className="p-4">
        <div className="mb-2">
          <span className="text-xs text-green-600 font-medium">Anzeige</span>
        </div>
        
        {content.headline && (
          <h3 className="text-blue-600 text-lg font-medium mb-1 underline">{content.headline}</h3>
        )}
        
        <p className="text-green-700 text-sm mb-2">www.ihr-unternehmen.de</p>
        
        {content.description && (
          <p className="text-gray-700 text-sm leading-relaxed mb-3 whitespace-pre-line">{content.description}</p>
        )}
        
        {image && (
          <img src={image} alt="Ad" className="w-full rounded mb-3" style={{ maxHeight: '200px', objectFit: 'cover' }} />
        )}
        
        {content.callToAction && (
          <button className="bg-blue-600 text-white px-4 py-2 rounded text-sm font-medium">
            {content.callToAction}
          </button>
        )}
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
            <p className="text-xs text-gray-500">Gesponsert · 2 Min</p>
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
            <span>42 Gefällt mir</span>
            <span>8 Kommentare</span>
          </div>
        </div>
      </div>
    </div>
  )

  // Spotify Mockup
  const SpotifyMockup = ({ content, image }) => (
    <div className="bg-black h-full text-white">
      {/* Spotify Header */}
      <div className="bg-green-500 p-3 flex items-center space-x-2">
        <div className="w-8 h-8 bg-black rounded-full flex items-center justify-center">
          <Music className="w-4 h-4 text-green-500" />
        </div>
        <span className="text-white font-semibold">Spotify</span>
      </div>
      
      {/* Ad Content */}
      <div className="p-4">
        <div className="mb-3">
          <span className="text-xs text-green-500 font-medium">WERBUNG</span>
        </div>
        
        {image && (
          <img src={image} alt="Ad" className="w-full rounded mb-3" style={{ maxHeight: '200px', objectFit: 'cover' }} />
        )}
        
        {content.headline && (
          <h3 className="text-white text-lg font-medium mb-2 whitespace-pre-line">{content.headline}</h3>
        )}
        
        {content.description && (
          <p className="text-gray-300 text-sm mb-4 whitespace-pre-line">{content.description}</p>
        )}
        
        {content.callToAction && (
          <button className="bg-green-500 text-black px-4 py-2 rounded-full text-sm font-medium w-full">
            {content.callToAction}
          </button>
        )}
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
      <div className="p-3">
        <div className="flex items-center space-x-2 mb-2">
          <span className="text-xs text-blue-500 font-medium">Promoted</span>
          <span className="text-xs text-gray-500">• r/business • 2h</span>
        </div>
        
        {content.headline && (
          <h3 className="font-medium mb-2 text-base whitespace-pre-line">{content.headline}</h3>
        )}
        
        {content.description && (
          <p className="text-sm text-gray-700 mb-3 whitespace-pre-line">{content.description}</p>
        )}
        
        {image && (
          <img src={image} alt="Ad" className="w-full rounded mb-3" style={{ maxHeight: '200px', objectFit: 'cover' }} />
        )}
        
        {content.callToAction && (
          <button className="bg-orange-600 text-white px-4 py-2 rounded text-sm font-medium">
            {content.callToAction}
          </button>
        )}
        
        {/* Engagement */}
        <div className="flex items-center space-x-4 mt-3 pt-3 border-t text-gray-500">
          <div className="flex items-center space-x-1 text-xs">
            <ArrowRight className="w-3 h-3" />
            <span>42</span>
          </div>
          <span className="text-xs">8 Kommentare</span>
          <span className="text-xs">Teilen</span>
        </div>
      </div>
    </div>
  )

  // Snapchat Mockup
  const SnapchatMockup = ({ content, image }) => (
    <div className="bg-yellow-400 h-full relative">
      {/* Snapchat Header */}
      <div className="absolute top-0 left-0 right-0 z-10 p-3 flex items-center justify-center">
        <span className="font-bold text-lg text-white">Snapchat</span>
      </div>
      
      {/* Snap Content */}
      <div className="relative h-full flex items-center justify-center">
        {image ? (
          <img src={image} alt="Ad" className="w-full h-full object-cover" />
        ) : (
          <div className="w-full h-full bg-yellow-500 flex items-center justify-center">
            <Camera className="w-16 h-16 text-white opacity-50" />
          </div>
        )}
        
        {/* Overlay Content */}
        <div className="absolute bottom-20 left-4 right-4 text-center">
          {content.headline && (
            <p className="font-bold mb-2 text-white text-lg drop-shadow-lg whitespace-pre-line">{content.headline}</p>
          )}
          
          {content.description && (
            <p className="text-white text-sm drop-shadow-lg mb-4 whitespace-pre-line">{content.description}</p>
          )}
          
          {content.callToAction && (
            <button className="bg-white text-black px-6 py-2 rounded-full text-sm font-medium">
              {content.callToAction}
            </button>
          )}
        </div>
      </div>
    </div>
  )

  const renderMockup = (channel) => {
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
      case 'spotify':
        return <SpotifyMockup content={content} image={image} />
      case 'reddit':
        return <RedditMockup content={content} image={image} />
      case 'snapchat':
        return <SnapchatMockup content={content} image={image} />
      default:
        return <div className="bg-gray-100 h-full flex items-center justify-center">
          <p className="text-gray-500">Vorschau nicht verfügbar</p>
        </div>
    }
  }

  const renderStep1 = () => (
    <div className="space-y-8">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Ziel & Kanäle</h2>
        <p className="text-gray-600">Legen Sie Ihr Kampagnenziel fest und wählen Sie die passenden Kanäle</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Left Column: Campaign Goals */}
        <div className="space-y-4">
          <div className="flex items-center space-x-2 mb-4">
            <Target className="w-5 h-5 text-purple-600" />
            <h3 className="text-lg font-semibold text-gray-900">Kampagnenziel wählen</h3>
          </div>
          
          <div className="grid gap-3">
            {goals.map((goal) => (
              <Card
                key={goal.id}
                className={`cursor-pointer transition-all duration-200 hover:shadow-md ${
                  campaignData.goal === goal.id
                    ? 'ring-2 ring-purple-500 bg-purple-50'
                    : 'hover:bg-gray-50'
                }`}
                onClick={() => handleGoalSelect(goal.id)}
              >
                <CardContent className="p-4">
                  <div className="flex items-center space-x-3">
                    <div className={`p-2 rounded-lg ${goal.color} text-white`}>
                      {goal.icon}
                    </div>
                    <div className="flex-1">
                      <h4 className="font-medium text-gray-900">{goal.title}</h4>
                      <p className="text-sm text-gray-600">{goal.description}</p>
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

        {/* Right Column: Channel Selection */}
        <div className="space-y-4">
          <div className="flex items-center space-x-2 mb-4">
            <Globe className="w-5 h-5 text-purple-600" />
            <h3 className="text-lg font-semibold text-gray-900">Kanäle auswählen</h3>
          </div>
          
          <div className="grid grid-cols-2 gap-3">
            {channels.map((channel) => (
              <Card
                key={channel.id}
                className={`cursor-pointer transition-all duration-200 hover:shadow-md ${
                  campaignData.channels.includes(channel.id)
                    ? 'ring-2 ring-purple-500 bg-purple-50'
                    : 'hover:bg-gray-50'
                }`}
                onClick={() => handleChannelToggle(channel.id)}
              >
                <CardContent className="p-4">
                  <div className="flex flex-col items-center text-center space-y-2">
                    <div className={`p-3 rounded-lg ${channel.color} text-white`}>
                      {channel.icon}
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-900 text-sm">{channel.name}</h4>
                      <p className="text-xs text-gray-500">{channel.dimensions}</p>
                    </div>
                    {campaignData.channels.includes(channel.id) && (
                      <CheckCircle className="w-4 h-4 text-purple-600" />
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
          
          {campaignData.channels.length > 0 && (
            <div className="mt-4 p-4 bg-blue-50 rounded-lg">
              <p className="text-sm text-blue-800">
                <strong>Ausgewählt:</strong> {campaignData.channels.length} Kanal{campaignData.channels.length !== 1 ? 'e' : ''}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  )

  const renderStep2 = () => (
    <div className="space-y-8">
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
          
          <p className="text-sm text-gray-600">Erstellen Sie ansprechende Inhalte für Ihre Kampagne</p>

          <div className="space-y-4">
            <div>
              <Label htmlFor="headline" className="text-sm font-medium text-gray-700 mb-2 block">
                Überschrift *
              </Label>
              <Input
                id="headline"
                placeholder="Ihre aussagekräftige Überschrift..."
                value={campaignData.content.headline}
                onChange={(e) => handleContentChange('headline', e.target.value)}
                className="w-full"
              />
            </div>

            <div>
              <Label htmlFor="description" className="text-sm font-medium text-gray-700 mb-2 block">
                Beschreibung *
              </Label>
              <Textarea
                id="description"
                placeholder="Beschreiben Sie Ihr Angebot detailliert..."
                value={campaignData.content.description}
                onChange={(e) => handleContentChange('description', e.target.value)}
                rows={4}
                className="w-full"
              />
            </div>

            <div>
              <Label htmlFor="cta" className="text-sm font-medium text-gray-700 mb-2 block">
                Call-to-Action
              </Label>
              <Input
                id="cta"
                placeholder="z.B. Jetzt kaufen, Mehr erfahren..."
                value={campaignData.content.callToAction}
                onChange={(e) => handleContentChange('callToAction', e.target.value)}
                className="w-full"
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
          
          <p className="text-sm text-gray-600">Laden Sie Bilder und Videos für Ihre Kampagne hoch</p>

          {/* Image Upload for each required format */}
          {getRequiredFormats().map((format) => (
            <div key={format} className="space-y-2">
              <Label className="text-sm font-medium text-gray-700">
                {format} Format
              </Label>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-purple-400 transition-colors">
                {campaignData.content.images[format] ? (
                  <div className="space-y-2">
                    <img
                      src={campaignData.content.images[format]}
                      alt={`Preview ${format}`}
                      className="mx-auto max-h-32 rounded"
                    />
                    <p className="text-sm text-green-600">✓ Bild hochgeladen</p>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        const input = document.createElement('input')
                        input.type = 'file'
                        input.accept = 'image/*'
                        input.onchange = (e) => handleImageUpload(e, format)
                        input.click()
                      }}
                    >
                      Bild ändern
                    </Button>
                  </div>
                ) : (
                  <div className="space-y-2">
                    <Upload className="w-8 h-8 text-gray-400 mx-auto" />
                    <p className="text-sm text-gray-600">
                      Klicken Sie hier oder ziehen Sie Bilder hierher
                    </p>
                    <p className="text-xs text-gray-500">
                      Für {getSelectedChannels().filter(c => c.format === format).map(c => c.name).join(', ')}
                    </p>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        const input = document.createElement('input')
                        input.type = 'file'
                        input.accept = 'image/*'
                        input.onchange = (e) => handleImageUpload(e, format)
                        input.click()
                      }}
                    >
                      Bild auswählen
                    </Button>
                  </div>
                )}
              </div>
            </div>
          ))}

          {/* Video Upload */}
          <div className="space-y-2">
            <Label className="text-sm font-medium text-gray-700 flex items-center space-x-2">
              <Play className="w-4 h-4" />
              <span>Video hochladen (optional)</span>
            </Label>
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-purple-400 transition-colors">
              <div className="space-y-2">
                <Play className="w-8 h-8 text-gray-400 mx-auto" />
                <p className="text-sm text-gray-600">Video hochladen</p>
                <p className="text-xs text-gray-500">Unterstützte Formate: MP4, MOV, AVI</p>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    const input = document.createElement('input')
                    input.type = 'file'
                    input.accept = 'video/*'
                    input.onchange = handleVideoUpload
                    input.click()
                  }}
                >
                  Video auswählen
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )

  const renderStep3 = () => {
    const selectedChannels = getSelectedChannels()
    
    return (
      <div className="space-y-8">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Vorschau</h2>
          <p className="text-gray-600">So sehen Ihre Anzeigen auf den mobilen Geräten aus</p>
        </div>

        <div className="space-y-6">
          <div className="text-center">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Kampagnen-Vorschau in Handy-Mockups</h3>
            <p className="text-gray-600 mb-6">So sehen Ihre Anzeigen auf den mobilen Geräten aus</p>
            
            {selectedChannels.length > 1 && (
              <div className="flex items-center justify-center space-x-4 mb-6">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setCurrentPreviewIndex(Math.max(0, currentPreviewIndex - 1))}
                  disabled={currentPreviewIndex === 0}
                >
                  <ChevronLeft className="w-4 h-4 mr-1" />
                  Vorherige
                </Button>
                <span className="text-sm text-gray-600">
                  {currentPreviewIndex + 1} von {selectedChannels.length} Seiten
                </span>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setCurrentPreviewIndex(Math.min(selectedChannels.length - 1, currentPreviewIndex + 1))}
                  disabled={currentPreviewIndex === selectedChannels.length - 1}
                >
                  Nächste
                  <ChevronRight className="w-4 h-4 ml-1" />
                </Button>
              </div>
            )}
          </div>

          {selectedChannels.length > 0 && (
            <div className="flex justify-center">
              <div className="text-center">
                <div className={`inline-flex items-center space-x-2 px-3 py-1 rounded-full text-sm font-medium mb-4 ${selectedChannels[currentPreviewIndex]?.color} text-white`}>
                  {selectedChannels[currentPreviewIndex]?.icon}
                  <span>{selectedChannels[currentPreviewIndex]?.name}</span>
                  <span className="text-xs opacity-75">{selectedChannels[currentPreviewIndex]?.dimensions}</span>
                </div>
                
                <MobileMockup channel={selectedChannels[currentPreviewIndex]}>
                  {renderMockup(selectedChannels[currentPreviewIndex])}
                </MobileMockup>
              </div>
            </div>
          )}
        </div>
      </div>
    )
  }

  const renderStep4 = () => (
    <div className="space-y-8">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Budget & Finale Freigabe</h2>
        <p className="text-gray-600">Legen Sie Ihr Budget fest und geben Sie Ihre Kampagne frei</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Left Column: Budget Settings */}
        <div className="space-y-6">
          <div className="flex items-center space-x-2 mb-4">
            <Euro className="w-5 h-5 text-purple-600" />
            <h3 className="text-lg font-semibold text-gray-900">Budget & Laufzeit</h3>
          </div>
          
          <p className="text-sm text-gray-600">Bestimmen Sie Ihr Werbebudget</p>

          <div className="space-y-4">
            <div>
              <Label className="text-sm font-medium text-gray-700 mb-3 block">Budget-Typ</Label>
              <RadioGroup
                value={campaignData.budget.type}
                onValueChange={(value) => setCampaignData(prev => ({
                  ...prev,
                  budget: { ...prev.budget, type: value }
                }))}
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="daily" id="daily" />
                  <Label htmlFor="daily" className="text-sm">
                    <span className="font-medium">Tagesbudget</span>
                    <span className="text-gray-500 block text-xs">Festes Budget pro Tag</span>
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="total" id="total" />
                  <Label htmlFor="total" className="text-sm">
                    <span className="font-medium">Gesamtbudget</span>
                    <span className="text-gray-500 block text-xs">Einmaliges Gesamtbudget</span>
                  </Label>
                </div>
              </RadioGroup>
            </div>

            <div>
              <Label htmlFor="amount" className="text-sm font-medium text-gray-700 mb-2 block">
                {campaignData.budget.type === 'daily' ? 'Tagesbudget (€)' : 'Gesamtbudget (€)'} *
              </Label>
              <Input
                id="amount"
                type="number"
                placeholder="z.B. 50"
                value={campaignData.budget.amount}
                onChange={(e) => setCampaignData(prev => ({
                  ...prev,
                  budget: { ...prev.budget, amount: e.target.value }
                }))}
                className="w-full"
              />
            </div>

            {campaignData.budget.type === 'daily' && (
              <div>
                <Label htmlFor="duration" className="text-sm font-medium text-gray-700 mb-2 block">
                  Laufzeit (Tage)
                </Label>
                <Input
                  id="duration"
                  type="number"
                  placeholder="z.B. 7"
                  value={campaignData.budget.duration}
                  onChange={(e) => setCampaignData(prev => ({
                    ...prev,
                    budget: { ...prev.budget, duration: e.target.value }
                  }))}
                  className="w-full"
                />
              </div>
            )}

            <div>
              <Label htmlFor="startDate" className="text-sm font-medium text-gray-700 mb-2 block">
                Startdatum
              </Label>
              <Input
                id="startDate"
                type="date"
                value={campaignData.budget.startDate}
                onChange={(e) => setCampaignData(prev => ({
                  ...prev,
                  budget: { ...prev.budget, startDate: e.target.value }
                }))}
                className="w-full"
              />
            </div>
          </div>
        </div>

        {/* Right Column: Campaign Summary */}
        <div className="space-y-6">
          <div className="flex items-center space-x-2 mb-4">
            <CheckCircle className="w-5 h-5 text-purple-600" />
            <h3 className="text-lg font-semibold text-gray-900">Kampagnen-Zusammenfassung</h3>
          </div>
          
          <p className="text-sm text-gray-600">Überprüfen Sie Ihre Einstellungen</p>

          <div className="space-y-4">
            <div>
              <Label className="text-sm font-medium text-gray-700">Ziel</Label>
              <p className="text-purple-600 font-medium">
                {goals.find(g => g.id === campaignData.goal)?.title || 'Nicht ausgewählt'}
              </p>
            </div>

            <div>
              <Label className="text-sm font-medium text-gray-700">Kanäle ({campaignData.channels.length})</Label>
              <div className="flex flex-wrap gap-2 mt-1">
                {getSelectedChannels().map(channel => (
                  <Badge key={channel.id} variant="secondary" className="flex items-center space-x-1">
                    {channel.icon}
                    <span>{channel.name}</span>
                  </Badge>
                ))}
              </div>
            </div>

            <div>
              <Label className="text-sm font-medium text-gray-700">Inhalte</Label>
              <div className="space-y-1 text-sm">
                <p><span className="font-medium">Überschrift:</span> {campaignData.content.headline || 'Nicht gesetzt'}</p>
                <p><span className="font-medium">Beschreibung:</span> {campaignData.content.description || 'Nicht gesetzt'}</p>
                <p><span className="font-medium">Medien:</span> {Object.keys(campaignData.content.images).length} Bilder</p>
              </div>
            </div>

            {campaignData.budget.amount && (
              <div>
                <Label className="text-sm font-medium text-gray-700">Budget</Label>
                <div className="space-y-1 text-sm">
                  <p><span className="font-medium">{campaignData.budget.type === 'daily' ? 'Tagesbudget:' : 'Gesamtbudget:'}</span> {campaignData.budget.amount}€</p>
                  {campaignData.budget.type === 'daily' && campaignData.budget.duration && (
                    <>
                      <p><span className="font-medium">Laufzeit:</span> {campaignData.budget.duration} Tage</p>
                      <p><span className="font-medium">Geschätztes Gesamtbudget:</span> {campaignData.budget.amount * campaignData.budget.duration}€</p>
                    </>
                  )}
                </div>
              </div>
            )}
          </div>

          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
            <div className="flex items-start space-x-2">
              <div className="w-5 h-5 text-yellow-600 mt-0.5">⚠️</div>
              <div>
                <h4 className="font-medium text-yellow-800 mb-1">Wichtiger Hinweis zum Mediabudget</h4>
                <p className="text-sm text-yellow-700">
                  Das von Ihnen festgelegte Budget wird als Mediabudget für Ihre Kampagne verwendet und entsprechend abgerechnet. Dieses Budget wird direkt an die Werbeplattformen weitergeleitet.
                </p>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex items-start space-x-2">
              <Checkbox
                id="budgetConfirm"
                checked={campaignData.budgetConfirmed}
                onCheckedChange={(checked) => setCampaignData(prev => ({
                  ...prev,
                  budgetConfirmed: checked
                }))}
              />
              <Label htmlFor="budgetConfirm" className="text-sm text-gray-700">
                Ich bestätige, dass ich verstehe, dass das festgelegte Budget von {campaignData.budget.amount || '0'}€ pro Tag als Mediabudget für meine Kampagne verwendet und entsprechend berechnet wird.
              </Label>
            </div>

            <div className="flex items-start space-x-2">
              <Checkbox
                id="finalApproval"
                checked={campaignData.finalApproval}
                onCheckedChange={(checked) => setCampaignData(prev => ({
                  ...prev,
                  finalApproval: checked
                }))}
              />
              <Label htmlFor="finalApproval" className="text-sm text-gray-700">
                Ich gebe meine finale Freigabe für diese Kampagne und möchte sie jetzt starten. Alle Angaben sind korrekt und ich bin mit der Umsetzung einverstanden.
              </Label>
            </div>
          </div>

          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <div className="flex items-start space-x-2">
              <div className="w-5 h-5 text-blue-600 mt-0.5">ℹ️</div>
              <div>
                <h4 className="font-medium text-blue-800 mb-1">Hinweis zur Kampagnenprüfung</h4>
                <p className="text-sm text-blue-700">
                  Die Kampagnenprüfung nach Werberichtlinien kann bis zu <strong>24 Stunden</strong> dauern. Sind alle vorgegebenen Richtlinien eingehalten, startet die Kampagne innerhalb von <strong>12 Stunden</strong>.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-6xl max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-purple-600 to-pink-600 text-white p-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold">Kampagne erstellen</h1>
              <p className="text-purple-100 mt-1">
                Schritt {currentStep} von {steps.length}: {steps.find(s => s.id === currentStep)?.title}
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
            <div className="flex items-center justify-between text-sm mb-2">
              <span>Start</span>
              <span>{Math.round((currentStep / steps.length) * 100)}% abgeschlossen</span>
              <span>Fertig</span>
            </div>
            <div className="w-full bg-purple-400 rounded-full h-2">
              <div 
                className="bg-white h-2 rounded-full transition-all duration-300"
                style={{ width: `${(currentStep / steps.length) * 100}%` }}
              ></div>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto" style={{ maxHeight: 'calc(90vh - 200px)' }}>
          {currentStep === 1 && renderStep1()}
          {currentStep === 2 && renderStep2()}
          {currentStep === 3 && renderStep3()}
          {currentStep === 4 && renderStep4()}
        </div>

        {/* Footer */}
        <div className="border-t bg-gray-50 p-4 flex items-center justify-between">
          <div className="text-sm text-gray-600">
            Schritt {currentStep} von {steps.length}
          </div>
          
          <div className="flex space-x-3">
            {currentStep > 1 && (
              <Button
                variant="outline"
                onClick={prevStep}
                className="flex items-center space-x-2"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Zurück</span>
              </Button>
            )}
            
            {currentStep < steps.length ? (
              <Button
                onClick={nextStep}
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
                disabled={!canCreateCampaign() || !campaignData.budgetConfirmed || !campaignData.finalApproval}
                className="flex items-center space-x-2 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700"
              >
                <CheckCircle className="w-4 h-4" />
                <span>Kampagne starten</span>
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default CampaignWizard
