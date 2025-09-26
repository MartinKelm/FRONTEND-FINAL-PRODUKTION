import React, { useState, useEffect } from 'react'
import { 
  ArrowLeft,
  Edit,
  Play,
  Pause,
  BarChart3,
  TrendingUp,
  TrendingDown,
  Users,
  MousePointer,
  Target,
  Euro,
  Calendar,
  Clock,
  CheckCircle,
  AlertCircle,
  XCircle,
  Eye,
  Share,
  Heart,
  MessageCircle,
  MoreHorizontal,
  ExternalLink,
  Download,
  Settings,
  Smartphone,
  Monitor,
  Tablet,
  ChevronLeft,
  ChevronRight,
  RefreshCw
} from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card'
import { Button } from '../ui/button'
import { Badge } from '../ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs'
import { Progress } from '../ui/progress'
import { 
  getCampaignById, 
  updateCampaignMetrics, 
  updateCampaignStatus 
} from '../../utils/campaignStorage.js'

const CampaignDetailView = ({ campaignId, userId, onBack, onEdit }) => {
  const [campaign, setCampaign] = useState(null)
  const [loading, setLoading] = useState(true)
  const [currentMockupIndex, setCurrentMockupIndex] = useState(0)
  const [activeTab, setActiveTab] = useState('overview')

  // Load campaign data
  useEffect(() => {
    loadCampaign()
  }, [campaignId, userId])

  const loadCampaign = async () => {
    try {
      setLoading(true)
      const campaignData = getCampaignById(campaignId, userId)
      setCampaign(campaignData)
    } catch (error) {
      console.error('Error loading campaign:', error)
    } finally {
      setLoading(false)
    }
  }

  // Handle status change
  const handleStatusChange = async (newStatus) => {
    try {
      await updateCampaignStatus(campaignId, newStatus, userId)
      loadCampaign()
    } catch (error) {
      console.error('Error updating campaign status:', error)
      alert('Fehler beim Aktualisieren des Status')
    }
  }

  // Channel configuration
  const channelConfig = {
    facebook: { 
      name: 'Facebook', 
      color: 'bg-blue-600', 
      icon: 'f',
      format: '1080x1080',
      mockupBg: 'bg-blue-50'
    },
    instagram: { 
      name: 'Instagram', 
      color: 'bg-pink-600', 
      icon: 'IG',
      format: '1080x1080',
      mockupBg: 'bg-pink-50'
    },
    google: { 
      name: 'Google Ads', 
      color: 'bg-red-600', 
      icon: 'G',
      format: '1080x1080',
      mockupBg: 'bg-red-50'
    },
    tiktok: { 
      name: 'TikTok', 
      color: 'bg-black', 
      icon: 'TT',
      format: '1080x1920',
      mockupBg: 'bg-gray-50'
    },
    snapchat: { 
      name: 'Snapchat', 
      color: 'bg-yellow-400', 
      icon: 'SC',
      format: '1080x1920',
      mockupBg: 'bg-yellow-50'
    },
    reddit: { 
      name: 'Reddit', 
      color: 'bg-orange-600', 
      icon: 'R',
      format: '1200x630',
      mockupBg: 'bg-orange-50'
    },
    linkedin: { 
      name: 'LinkedIn', 
      color: 'bg-blue-700', 
      icon: 'LI',
      format: '1080x1080',
      mockupBg: 'bg-blue-50'
    },
    spotify: { 
      name: 'Spotify', 
      color: 'bg-green-600', 
      icon: 'SP',
      format: '1080x1080',
      mockupBg: 'bg-green-50'
    }
  }

  // Get status badge
  const getStatusBadge = (status) => {
    const statusConfig = {
      draft: { color: 'bg-gray-100 text-gray-800', icon: Edit, label: 'Entwurf' },
      active: { color: 'bg-green-100 text-green-800', icon: Play, label: 'Aktiv' },
      paused: { color: 'bg-yellow-100 text-yellow-800', icon: Pause, label: 'Pausiert' },
      completed: { color: 'bg-blue-100 text-blue-800', icon: CheckCircle, label: 'Abgeschlossen' }
    }
    
    const config = statusConfig[status] || statusConfig.draft
    const IconComponent = config.icon
    
    return (
      <Badge className={`${config.color} flex items-center space-x-1`}>
        <IconComponent className="w-3 h-3" />
        <span>{config.label}</span>
      </Badge>
    )
  }

  // Format currency
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('de-DE', {
      style: 'currency',
      currency: 'EUR'
    }).format(amount || 0)
  }

  // Format number
  const formatNumber = (num) => {
    return new Intl.NumberFormat('de-DE').format(num || 0)
  }

  // Calculate performance metrics
  const calculateMetrics = () => {
    if (!campaign) return {}
    
    const { metrics } = campaign
    return {
      ctr: metrics.impressions > 0 ? ((metrics.clicks / metrics.impressions) * 100).toFixed(2) : 0,
      cpc: metrics.clicks > 0 ? (metrics.spent / metrics.clicks).toFixed(2) : 0,
      cpm: metrics.impressions > 0 ? ((metrics.spent / metrics.impressions) * 1000).toFixed(2) : 0,
      conversionRate: metrics.clicks > 0 ? ((metrics.conversions / metrics.clicks) * 100).toFixed(2) : 0,
      budgetUsed: campaign.budget.totalBudget > 0 ? ((metrics.spent / campaign.budget.totalBudget) * 100).toFixed(1) : 0
    }
  }

  // Render mobile mockup
  const renderMobileMockup = (channelId, index) => {
    const config = channelConfig[channelId]
    if (!config) return null

    const isStoryFormat = config.format === '1080x1920'
    const isLandscapeFormat = config.format === '1200x630'

    return (
      <div key={`${channelId}-${index}`} className={`${config.mockupBg} p-6 rounded-2xl`}>
        {/* Mobile Frame */}
        <div className="mx-auto" style={{ width: isStoryFormat ? '280px' : '320px' }}>
          {/* Phone Frame */}
          <div className="bg-black rounded-[2.5rem] p-2 shadow-2xl">
            <div className="bg-white rounded-[2rem] overflow-hidden" style={{ 
              height: isStoryFormat ? '600px' : '640px' 
            }}>
              {/* Status Bar */}
              <div className="bg-white px-6 py-2 flex justify-between items-center text-xs font-medium">
                <span>9:41</span>
                <div className="flex space-x-1">
                  <div className="w-4 h-2 bg-black rounded-sm"></div>
                  <div className="w-6 h-2 bg-black rounded-sm"></div>
                  <div className="w-6 h-2 bg-green-500 rounded-sm"></div>
                </div>
              </div>

              {/* App Content */}
              <div className="flex-1 overflow-hidden">
                {channelId === 'facebook' && (
                  <div className="bg-gray-100 h-full">
                    {/* Facebook Header */}
                    <div className="bg-blue-600 px-4 py-3 flex items-center justify-between">
                      <h1 className="text-white font-bold text-lg">facebook</h1>
                      <div className="flex space-x-3">
                        <div className="w-6 h-6 bg-white bg-opacity-20 rounded-full"></div>
                        <div className="w-6 h-6 bg-white bg-opacity-20 rounded-full"></div>
                      </div>
                    </div>
                    
                    {/* News Feed */}
                    <div className="p-4 space-y-4">
                      {/* Ad Post */}
                      <div className="bg-white rounded-lg shadow-sm">
                        <div className="p-3 border-b">
                          <div className="flex items-center space-x-2">
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
                        </div>
                        
                        <div className="p-3">
                          <p className="text-sm font-medium mb-2 whitespace-pre-line">
                            {campaign.content.headline}
                          </p>
                          <p className="text-sm text-gray-600 mb-3 whitespace-pre-line">
                            {campaign.content.description}
                          </p>
                          
                          {/* Image */}
                          {campaign.content.images['1080x1080'] && (
                            <div className="mb-3 -mx-3">
                              <img
                                src={campaign.content.images['1080x1080']}
                                alt="Ad"
                                className="w-full h-48 object-cover"
                              />
                            </div>
                          )}
                          
                          {campaign.content.callToAction && (
                            <Button size="sm" className="bg-blue-600 hover:bg-blue-700 text-white w-full">
                              {campaign.content.callToAction}
                            </Button>
                          )}
                        </div>
                        
                        <div className="px-3 py-2 border-t flex items-center justify-between text-gray-500">
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
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {channelId === 'instagram' && (
                  <div className="bg-white h-full">
                    {/* Instagram Header */}
                    <div className="px-4 py-3 border-b flex items-center justify-between">
                      <h1 className="text-xl font-bold">Instagram</h1>
                      <div className="flex space-x-3">
                        <Heart className="w-6 h-6" />
                        <MessageCircle className="w-6 h-6" />
                      </div>
                    </div>
                    
                    {/* Feed */}
                    <div className="space-y-0">
                      {/* Ad Post */}
                      <div className="border-b">
                        <div className="p-3 flex items-center justify-between">
                          <div className="flex items-center space-x-2">
                            <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
                              <span className="text-white text-xs font-bold">IU</span>
                            </div>
                            <div>
                              <p className="font-semibold text-sm">ihr_unternehmen</p>
                              <p className="text-xs text-gray-500">Gesponsert</p>
                            </div>
                          </div>
                          <MoreHorizontal className="w-5 h-5" />
                        </div>
                        
                        {/* Image */}
                        {campaign.content.images['1080x1080'] && (
                          <div className="aspect-square">
                            <img
                              src={campaign.content.images['1080x1080']}
                              alt="Ad"
                              className="w-full h-full object-cover"
                            />
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
                          
                          <p className="text-sm">
                            <span className="font-semibold">ihr_unternehmen</span>{' '}
                            <span className="whitespace-pre-line">
                              {campaign.content.headline} {campaign.content.description}
                            </span>
                          </p>
                          
                          {campaign.content.callToAction && (
                            <Button size="sm" className="bg-blue-500 hover:bg-blue-600 text-white mt-2 w-full">
                              {campaign.content.callToAction}
                            </Button>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {channelId === 'tiktok' && (
                  <div className="bg-black h-full text-white relative">
                    {/* TikTok Header */}
                    <div className="absolute top-0 left-0 right-0 z-10 p-4 flex items-center justify-between">
                      <div className="text-white">
                        <p className="text-sm">Für dich</p>
                      </div>
                      <div className="flex space-x-4">
                        <Search className="w-6 h-6 text-white" />
                      </div>
                    </div>
                    
                    {/* Video Content */}
                    <div className="relative h-full flex items-center justify-center">
                      {campaign.content.images['1080x1920'] ? (
                        <img
                          src={campaign.content.images['1080x1920']}
                          alt="Ad"
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full bg-gradient-to-br from-purple-600 to-pink-600 flex items-center justify-center">
                          <div className="text-center">
                            <div className="w-16 h-16 bg-white bg-opacity-20 rounded-full flex items-center justify-center mb-4 mx-auto">
                              <Play className="w-8 h-8 text-white" />
                            </div>
                            <p className="text-white text-lg font-bold mb-2">{campaign.content.headline}</p>
                            <p className="text-white text-sm opacity-80">{campaign.content.description}</p>
                          </div>
                        </div>
                      )}
                      
                      {/* Right Side Actions */}
                      <div className="absolute right-4 bottom-20 space-y-6">
                        <div className="text-center">
                          <div className="w-12 h-12 bg-white bg-opacity-20 rounded-full flex items-center justify-center mb-1">
                            <Heart className="w-6 h-6 text-white" />
                          </div>
                          <span className="text-xs text-white">1.2K</span>
                        </div>
                        <div className="text-center">
                          <div className="w-12 h-12 bg-white bg-opacity-20 rounded-full flex items-center justify-center mb-1">
                            <MessageCircle className="w-6 h-6 text-white" />
                          </div>
                          <span className="text-xs text-white">89</span>
                        </div>
                        <div className="text-center">
                          <div className="w-12 h-12 bg-white bg-opacity-20 rounded-full flex items-center justify-center mb-1">
                            <Share className="w-6 h-6 text-white" />
                          </div>
                          <span className="text-xs text-white">12</span>
                        </div>
                      </div>
                      
                      {/* Bottom Content */}
                      <div className="absolute bottom-4 left-4 right-16">
                        <div className="flex items-center space-x-2 mb-2">
                          <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
                            <span className="text-white text-xs font-bold">IU</span>
                          </div>
                          <span className="text-white font-semibold">@ihr_unternehmen</span>
                          <Badge className="bg-red-600 text-white text-xs px-2 py-0">Anzeige</Badge>
                        </div>
                        <p className="text-white text-sm whitespace-pre-line mb-2">
                          {campaign.content.headline}
                        </p>
                        {campaign.content.callToAction && (
                          <Button size="sm" className="bg-white text-black hover:bg-gray-100">
                            {campaign.content.callToAction}
                          </Button>
                        )}
                      </div>
                    </div>
                  </div>
                )}

                {/* Add more channel mockups as needed */}
                {!['facebook', 'instagram', 'tiktok'].includes(channelId) && (
                  <div className={`h-full flex items-center justify-center ${config.mockupBg}`}>
                    <div className="text-center p-6">
                      <div className={`w-16 h-16 ${config.color} rounded-full flex items-center justify-center mb-4 mx-auto`}>
                        <span className="text-white font-bold text-lg">{config.icon}</span>
                      </div>
                      <h3 className="text-lg font-bold mb-2">{config.name}</h3>
                      <p className="text-sm text-gray-600 mb-4 whitespace-pre-line">
                        {campaign.content.headline}
                      </p>
                      <p className="text-xs text-gray-500 mb-4 whitespace-pre-line">
                        {campaign.content.description}
                      </p>
                      {campaign.content.callToAction && (
                        <Button size="sm" className={`${config.color} text-white`}>
                          {campaign.content.callToAction}
                        </Button>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
          
          {/* Channel Label */}
          <div className="text-center mt-4">
            <Badge className={`${config.color} text-white`}>
              {config.name} ({config.format}px)
            </Badge>
          </div>
        </div>
      </div>
    )
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-600"></div>
      </div>
    )
  }

  if (!campaign) {
    return (
      <div className="text-center py-12">
        <AlertCircle className="w-16 h-16 mx-auto mb-4 text-red-500" />
        <h2 className="text-xl font-semibold mb-2">Kampagne nicht gefunden</h2>
        <p className="text-gray-600 mb-4">Die angeforderte Kampagne konnte nicht geladen werden.</p>
        <Button onClick={onBack} variant="outline">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Zurück zur Übersicht
        </Button>
      </div>
    )
  }

  const metrics = calculateMetrics()
  const selectedChannels = campaign.channels.map(channelId => ({
    id: channelId,
    ...channelConfig[channelId]
  })).filter(Boolean)

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Button variant="outline" onClick={onBack}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            Zurück
          </Button>
          <div>
            <h1 className="text-3xl font-bold text-gray-900">
              {campaign.content.headline || 'Unbenannte Kampagne'}
            </h1>
            <div className="flex items-center space-x-4 mt-1">
              {getStatusBadge(campaign.status)}
              <span className="text-sm text-gray-500">
                ID: {campaign.id}
              </span>
              <span className="text-sm text-gray-500">
                Erstellt: {new Date(campaign.createdAt).toLocaleDateString('de-DE')}
              </span>
            </div>
          </div>
        </div>
        
        <div className="flex items-center space-x-2">
          {campaign.status === 'draft' && (
            <Button
              onClick={() => handleStatusChange('active')}
              className="bg-green-600 hover:bg-green-700 text-white"
            >
              <Play className="w-4 h-4 mr-2" />
              Kampagne starten
            </Button>
          )}
          
          {campaign.status === 'active' && (
            <Button
              onClick={() => handleStatusChange('paused')}
              variant="outline"
              className="text-yellow-600 border-yellow-600 hover:bg-yellow-50"
            >
              <Pause className="w-4 h-4 mr-2" />
              Pausieren
            </Button>
          )}
          
          {campaign.status === 'paused' && (
            <Button
              onClick={() => handleStatusChange('active')}
              className="bg-green-600 hover:bg-green-700 text-white"
            >
              <Play className="w-4 h-4 mr-2" />
              Fortsetzen
            </Button>
          )}
          
          <Button variant="outline" onClick={() => onEdit(campaign.id)}>
            <Edit className="w-4 h-4 mr-2" />
            Bearbeiten
          </Button>
        </div>
      </div>

      {/* Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview">Übersicht</TabsTrigger>
          <TabsTrigger value="mockups">Vorschauen</TabsTrigger>
          <TabsTrigger value="performance">Performance</TabsTrigger>
          <TabsTrigger value="settings">Einstellungen</TabsTrigger>
        </TabsList>

        {/* Overview Tab */}
        <TabsContent value="overview" className="space-y-6">
          {/* Performance Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Impressionen</CardTitle>
                <Eye className="h-4 w-4 text-purple-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-purple-600">
                  {formatNumber(campaign.metrics.impressions)}
                </div>
                <p className="text-xs text-gray-600">
                  CPM: {formatCurrency(metrics.cpm)}
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Klicks</CardTitle>
                <MousePointer className="h-4 w-4 text-blue-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-blue-600">
                  {formatNumber(campaign.metrics.clicks)}
                </div>
                <p className="text-xs text-gray-600">
                  CTR: {metrics.ctr}% | CPC: {formatCurrency(metrics.cpc)}
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Konversionen</CardTitle>
                <Target className="h-4 w-4 text-green-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-green-600">
                  {formatNumber(campaign.metrics.conversions)}
                </div>
                <p className="text-xs text-gray-600">
                  Rate: {metrics.conversionRate}%
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Budget</CardTitle>
                <Euro className="h-4 w-4 text-orange-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-orange-600">
                  {formatCurrency(campaign.metrics.spent)}
                </div>
                <p className="text-xs text-gray-600">
                  von {formatCurrency(campaign.budget.totalBudget)} ({metrics.budgetUsed}%)
                </p>
                <Progress value={parseFloat(metrics.budgetUsed)} className="mt-2" />
              </CardContent>
            </Card>
          </div>

          {/* Campaign Details */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Kampagnen-Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h4 className="font-medium text-gray-900 mb-1">Ziel</h4>
                  <p className="text-sm text-gray-600">{campaign.goal}</p>
                </div>
                
                <div>
                  <h4 className="font-medium text-gray-900 mb-1">Überschrift</h4>
                  <p className="text-sm text-gray-600 whitespace-pre-line">{campaign.content.headline}</p>
                </div>
                
                <div>
                  <h4 className="font-medium text-gray-900 mb-1">Beschreibung</h4>
                  <p className="text-sm text-gray-600 whitespace-pre-line">{campaign.content.description}</p>
                </div>
                
                {campaign.content.callToAction && (
                  <div>
                    <h4 className="font-medium text-gray-900 mb-1">Call-to-Action</h4>
                    <p className="text-sm text-gray-600">{campaign.content.callToAction}</p>
                  </div>
                )}
                
                <div>
                  <h4 className="font-medium text-gray-900 mb-2">Kanäle</h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedChannels.map(channel => (
                      <Badge key={channel.id} className={`${channel.color} text-white`}>
                        {channel.name}
                      </Badge>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Budget & Laufzeit</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h4 className="font-medium text-gray-900 mb-1">Budget-Typ</h4>
                  <p className="text-sm text-gray-600">
                    {campaign.budget.type === 'daily' ? 'Tagesbudget' : 'Gesamtbudget'}
                  </p>
                </div>
                
                <div>
                  <h4 className="font-medium text-gray-900 mb-1">Budget</h4>
                  <p className="text-sm text-gray-600">
                    {formatCurrency(campaign.budget.amount)}
                    {campaign.budget.type === 'daily' && campaign.budget.duration && 
                      ` × ${campaign.budget.duration} Tage = ${formatCurrency(campaign.budget.totalBudget)}`
                    }
                  </p>
                </div>
                
                {campaign.budget.startDate && (
                  <div>
                    <h4 className="font-medium text-gray-900 mb-1">Startdatum</h4>
                    <p className="text-sm text-gray-600">
                      {new Date(campaign.budget.startDate).toLocaleDateString('de-DE')}
                    </p>
                  </div>
                )}
                
                {campaign.budget.endDate && (
                  <div>
                    <h4 className="font-medium text-gray-900 mb-1">Enddatum</h4>
                    <p className="text-sm text-gray-600">
                      {new Date(campaign.budget.endDate).toLocaleDateString('de-DE')}
                    </p>
                  </div>
                )}
                
                <div>
                  <h4 className="font-medium text-gray-900 mb-1">Budget-Nutzung</h4>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Ausgegeben:</span>
                      <span>{formatCurrency(campaign.metrics.spent)}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Verbleibt:</span>
                      <span>{formatCurrency(campaign.budget.totalBudget - campaign.metrics.spent)}</span>
                    </div>
                    <Progress value={parseFloat(metrics.budgetUsed)} className="mt-2" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Mockups Tab */}
        <TabsContent value="mockups" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Smartphone className="w-5 h-5" />
                <span>Kampagnen-Vorschauen</span>
              </CardTitle>
              <CardDescription>
                So werden Ihre Anzeigen auf den verschiedenen Plattformen aussehen
              </CardDescription>
            </CardHeader>
            <CardContent>
              {selectedChannels.length > 0 ? (
                <div className="space-y-8">
                  {/* Navigation */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setCurrentMockupIndex(Math.max(0, currentMockupIndex - 2))}
                        disabled={currentMockupIndex === 0}
                      >
                        <ChevronLeft className="w-4 h-4 mr-1" />
                        Zurück
                      </Button>
                      <span className="text-sm text-gray-600">
                        {Math.floor(currentMockupIndex / 2) + 1} von {Math.ceil(selectedChannels.length / 2)}
                      </span>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setCurrentMockupIndex(Math.min(selectedChannels.length - 2, currentMockupIndex + 2))}
                        disabled={currentMockupIndex >= selectedChannels.length - 2}
                      >
                        Weiter
                        <ChevronRight className="w-4 h-4 ml-1" />
                      </Button>
                    </div>
                    
                    <div className="text-sm text-gray-500">
                      {selectedChannels.length} {selectedChannels.length === 1 ? 'Kanal' : 'Kanäle'} ausgewählt
                    </div>
                  </div>

                  {/* Mockups Grid */}
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 justify-items-center">
                    {selectedChannels.slice(currentMockupIndex, currentMockupIndex + 2).map((channel, index) => 
                      renderMobileMockup(channel.id, currentMockupIndex + index)
                    )}
                  </div>

                  {/* Channel Navigation */}
                  <div className="flex justify-center space-x-2">
                    {Array.from({ length: Math.ceil(selectedChannels.length / 2) }, (_, index) => (
                      <button
                        key={index}
                        onClick={() => setCurrentMockupIndex(index * 2)}
                        className={`flex items-center justify-center w-10 h-10 rounded-lg border-2 transition-all ${
                          Math.floor(currentMockupIndex / 2) === index
                            ? 'bg-purple-600 border-purple-600 text-white shadow-md' 
                            : 'bg-white border-gray-300 text-gray-600 hover:border-purple-300 hover:text-purple-600'
                        }`}
                      >
                        {index < Math.floor(currentMockupIndex / 2) ? (
                          <ChevronLeft className="w-5 h-5" />
                        ) : index > Math.floor(currentMockupIndex / 2) ? (
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
                  <Smartphone className="w-16 h-16 mx-auto mb-4 text-gray-300" />
                  <p>Keine Kanäle ausgewählt</p>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Performance Tab */}
        <TabsContent value="performance" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <BarChart3 className="w-5 h-5" />
                <span>Performance-Analyse</span>
              </CardTitle>
              <CardDescription>
                Detaillierte Leistungsmetriken Ihrer Kampagne
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {/* Channel Performance */}
                <div>
                  <h3 className="text-lg font-semibold mb-4">Performance nach Kanal</h3>
                  <div className="space-y-4">
                    {selectedChannels.map(channel => {
                      const channelMetrics = campaign.metrics.channelMetrics[channel.id] || {}
                      return (
                        <div key={channel.id} className="border rounded-lg p-4">
                          <div className="flex items-center justify-between mb-3">
                            <div className="flex items-center space-x-2">
                              <div className={`w-4 h-4 ${channel.color} rounded`}></div>
                              <span className="font-medium">{channel.name}</span>
                            </div>
                            <Badge variant="outline">{channel.format}px</Badge>
                          </div>
                          
                          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                            <div>
                              <div className="text-gray-600">Impressionen</div>
                              <div className="font-semibold">{formatNumber(channelMetrics.impressions || 0)}</div>
                            </div>
                            <div>
                              <div className="text-gray-600">Klicks</div>
                              <div className="font-semibold">{formatNumber(channelMetrics.clicks || 0)}</div>
                            </div>
                            <div>
                              <div className="text-gray-600">CTR</div>
                              <div className="font-semibold">
                                {channelMetrics.impressions > 0 
                                  ? ((channelMetrics.clicks / channelMetrics.impressions) * 100).toFixed(2)
                                  : 0
                                }%
                              </div>
                            </div>
                            <div>
                              <div className="text-gray-600">Ausgaben</div>
                              <div className="font-semibold">{formatCurrency(channelMetrics.spent || 0)}</div>
                            </div>
                          </div>
                        </div>
                      )
                    })}
                  </div>
                </div>

                {/* Performance Trends */}
                <div>
                  <h3 className="text-lg font-semibold mb-4">Leistungstrends</h3>
                  <div className="bg-gray-50 rounded-lg p-6 text-center">
                    <BarChart3 className="w-16 h-16 mx-auto mb-4 text-gray-300" />
                    <p className="text-gray-600">
                      Detaillierte Trend-Analyse wird verfügbar sein, sobald mehr Daten gesammelt wurden.
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Settings Tab */}
        <TabsContent value="settings" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Settings className="w-5 h-5" />
                <span>Kampagnen-Einstellungen</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold mb-4">Freigabe-Status</h3>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <span>Budget bestätigt</span>
                      {campaign.approvals.budgetConfirmed ? (
                        <CheckCircle className="w-5 h-5 text-green-600" />
                      ) : (
                        <XCircle className="w-5 h-5 text-red-600" />
                      )}
                    </div>
                    <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <span>Finale Freigabe</span>
                      {campaign.approvals.finalApproval ? (
                        <CheckCircle className="w-5 h-5 text-green-600" />
                      ) : (
                        <XCircle className="w-5 h-5 text-red-600" />
                      )}
                    </div>
                    <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <span>Admin-Freigabe</span>
                      {campaign.approvals.adminApproved ? (
                        <div className="flex items-center space-x-2">
                          <CheckCircle className="w-5 h-5 text-green-600" />
                          <span className="text-sm text-gray-600">
                            {new Date(campaign.approvals.adminApprovedAt).toLocaleDateString('de-DE')}
                          </span>
                        </div>
                      ) : (
                        <AlertCircle className="w-5 h-5 text-yellow-600" />
                      )}
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold mb-4">API-Integration</h3>
                  <div className="space-y-3">
                    {selectedChannels.map(channel => (
                      <div key={channel.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <div className="flex items-center space-x-2">
                          <div className={`w-4 h-4 ${channel.color} rounded`}></div>
                          <span>{channel.name}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          {campaign.externalIds[channel.id] ? (
                            <>
                              <Badge variant="outline" className="text-green-600 border-green-600">
                                Verbunden
                              </Badge>
                              <span className="text-xs text-gray-500">
                                ID: {campaign.externalIds[channel.id]}
                              </span>
                            </>
                          ) : (
                            <Badge variant="outline" className="text-gray-600">
                              Nicht verbunden
                            </Badge>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold mb-4">Kampagnen-Aktionen</h3>
                  <div className="flex flex-wrap gap-3">
                    <Button variant="outline" onClick={() => onEdit(campaign.id)}>
                      <Edit className="w-4 h-4 mr-2" />
                      Bearbeiten
                    </Button>
                    <Button variant="outline">
                      <Download className="w-4 h-4 mr-2" />
                      Daten exportieren
                    </Button>
                    <Button variant="outline">
                      <RefreshCw className="w-4 h-4 mr-2" />
                      Metriken aktualisieren
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

export default CampaignDetailView
