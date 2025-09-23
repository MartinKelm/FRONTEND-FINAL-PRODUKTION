import React, { useState, useEffect } from 'react'
import { 
  Eye, 
  Edit, 
  Trash2, 
  Play, 
  Pause, 
  BarChart3,
  TrendingUp,
  Users,
  MousePointer,
  Target,
  Euro,
  Calendar,
  Clock,
  CheckCircle,
  AlertCircle,
  XCircle,
  Plus,
  Filter,
  Search,
  MoreVertical,
  ExternalLink,
  ArrowLeft,
  Home
} from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card'
import { Button } from '../ui/button'
import { Badge } from '../ui/badge'
import { Input } from '../ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select'
import { 
  getCampaigns, 
  getCampaignStats, 
  updateCampaignStatus, 
  deleteCampaign 
} from '../../utils/campaignStorage.js'

const CampaignDashboard = ({ userId, onCreateCampaign, onViewCampaign, onClose }) => {
  const [campaigns, setCampaigns] = useState([])
  const [stats, setStats] = useState({})
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')
  const [sortBy, setSortBy] = useState('createdAt')

  // Load campaigns and stats
  useEffect(() => {
    loadCampaigns()
  }, [userId])

  const loadCampaigns = async () => {
    try {
      setLoading(true)
      const userCampaigns = getCampaigns(userId)
      const campaignStats = getCampaignStats(userId)
      
      setCampaigns(userCampaigns)
      setStats(campaignStats)
    } catch (error) {
      console.error('Error loading campaigns:', error)
    } finally {
      setLoading(false)
    }
  }

  // Filter and sort campaigns
  const filteredCampaigns = campaigns
    .filter(campaign => {
      const matchesSearch = campaign.content.headline.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           campaign.content.description.toLowerCase().includes(searchTerm.toLowerCase())
      const matchesStatus = statusFilter === 'all' || campaign.status === statusFilter
      return matchesSearch && matchesStatus
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'createdAt':
          return new Date(b.createdAt) - new Date(a.createdAt)
        case 'budget':
          return (b.budget.totalBudget || 0) - (a.budget.totalBudget || 0)
        case 'performance':
          return (b.metrics.impressions || 0) - (a.metrics.impressions || 0)
        default:
          return 0
      }
    })

  // Handle campaign status change
  const handleStatusChange = async (campaignId, newStatus) => {
    try {
      await updateCampaignStatus(campaignId, newStatus, userId)
      loadCampaigns()
    } catch (error) {
      console.error('Error updating campaign status:', error)
      alert('Fehler beim Aktualisieren des Kampagnen-Status')
    }
  }

  // Handle campaign deletion
  const handleDeleteCampaign = async (campaignId) => {
    if (window.confirm('Sind Sie sicher, dass Sie diese Kampagne löschen möchten?')) {
      try {
        await deleteCampaign(campaignId, userId)
        loadCampaigns()
      } catch (error) {
        console.error('Error deleting campaign:', error)
        alert('Fehler beim Löschen der Kampagne')
      }
    }
  }

  // Get status badge color
  const getStatusBadge = (status) => {
    switch (status) {
      case 'active':
        return <Badge className="bg-green-100 text-green-800 border-green-200">Aktiv</Badge>
      case 'paused':
        return <Badge className="bg-yellow-100 text-yellow-800 border-yellow-200">Pausiert</Badge>
      case 'draft':
        return <Badge className="bg-gray-100 text-gray-800 border-gray-200">Entwurf</Badge>
      case 'completed':
        return <Badge className="bg-blue-100 text-blue-800 border-blue-200">Abgeschlossen</Badge>
      default:
        return <Badge className="bg-gray-100 text-gray-800 border-gray-200">{status}</Badge>
    }
  }

  // Get platform icons
  const getPlatformIcons = (channels) => {
    if (!channels || channels.length === 0) return null

    const channelConfig = {
      facebook: { name: 'Facebook', color: 'bg-blue-500' },
      instagram: { name: 'Instagram', color: 'bg-pink-500' },
      google: { name: 'Google', color: 'bg-red-500' },
      tiktok: { name: 'TikTok', color: 'bg-black' },
      youtube: { name: 'YouTube', color: 'bg-red-600' },
      linkedin: { name: 'LinkedIn', color: 'bg-blue-600' },
      twitter: { name: 'Twitter', color: 'bg-blue-400' },
      snapchat: { name: 'Snapchat', color: 'bg-yellow-400' }
    }

    return channels.map(channelId => {
      const config = channelConfig[channelId]
      if (!config) return null
      
      return (
        <div key={channelId} className={`w-2 h-2 rounded-full ${config.color}`} title={config.name}></div>
      )
    }).filter(Boolean)
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

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-600"></div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Back Button and Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Button 
            onClick={onClose}
            variant="outline"
            size="sm"
            className="flex items-center space-x-2"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Zurück zum Dashboard</span>
          </Button>
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Kampagnen-Dashboard</h1>
            <p className="text-gray-600 mt-1">Verwalten Sie Ihre Werbekampagnen</p>
          </div>
        </div>
        <Button 
          onClick={onCreateCampaign}
          className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white"
        >
          <Plus className="w-4 h-4 mr-2" />
          Neue Kampagne
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="hover:shadow-lg transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Aktive Kampagnen</CardTitle>
            <Play className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{stats.active || 0}</div>
            <p className="text-xs text-gray-600">von {stats.total || 0} gesamt</p>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Gesamtbudget</CardTitle>
            <Euro className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">{formatCurrency(stats.totalBudget)}</div>
            <p className="text-xs text-gray-600">Ausgegeben: {formatCurrency(stats.spentBudget)}</p>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Impressionen</CardTitle>
            <Eye className="h-4 w-4 text-purple-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-purple-600">{formatNumber(stats.totalImpressions)}</div>
            <p className="text-xs text-gray-600">Klicks: {formatNumber(stats.totalClicks)}</p>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Konversionen</CardTitle>
            <Target className="h-4 w-4 text-orange-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-600">{formatNumber(stats.totalConversions)}</div>
            <p className="text-xs text-gray-600">
              {stats.totalClicks > 0 ? `${((stats.totalConversions / stats.totalClicks) * 100).toFixed(1)}%` : '0%'} Rate
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Campaign Management Section */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Kampagnen verwalten</CardTitle>
              <CardDescription>
                Übersicht und Verwaltung Ihrer Werbekampagnen
              </CardDescription>
            </div>
            <Button 
              onClick={onCreateCampaign}
              variant="outline"
              size="sm"
            >
              <Plus className="w-4 h-4 mr-2" />
              Neue Kampagne
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          {/* Search and Filter Controls */}
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <div className="flex-1">
              <Input
                placeholder="Kampagnen durchsuchen..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full"
              />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-full sm:w-48">
                <SelectValue placeholder="Alle Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Alle Status</SelectItem>
                <SelectItem value="active">Aktiv</SelectItem>
                <SelectItem value="paused">Pausiert</SelectItem>
                <SelectItem value="draft">Entwurf</SelectItem>
                <SelectItem value="completed">Abgeschlossen</SelectItem>
              </SelectContent>
            </Select>
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-full sm:w-48">
                <SelectValue placeholder="Sortieren nach" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="createdAt">Erstellungsdatum</SelectItem>
                <SelectItem value="budget">Budget</SelectItem>
                <SelectItem value="performance">Performance</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Campaign List */}
          {filteredCampaigns.length === 0 ? (
            <div className="text-center py-12">
              <div className="text-gray-400 mb-4">
                <Target className="w-16 h-16 mx-auto" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                {campaigns.length === 0 ? 'Keine Kampagnen gefunden' : 'Keine passenden Kampagnen'}
              </h3>
              <p className="text-gray-500 mb-6">
                {campaigns.length === 0 
                  ? 'Erstellen Sie Ihre erste Kampagne, um loszulegen.'
                  : 'Versuchen Sie, Ihre Suchkriterien anzupassen.'
                }
              </p>
              <Button 
                onClick={onCreateCampaign}
                className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white"
              >
                <Plus className="w-4 h-4 mr-2" />
                {campaigns.length === 0 ? 'Erste Kampagne erstellen' : 'Neue Kampagne erstellen'}
              </Button>
            </div>
          ) : (
            <div className="space-y-4">
              {filteredCampaigns.map((campaign) => (
                <Card key={campaign.id} className="hover:shadow-md transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <div className="flex items-center space-x-3 mb-2">
                          <h3 className="text-lg font-semibold text-gray-900">
                            {campaign.content.headline}
                          </h3>
                          {getStatusBadge(campaign.status)}
                          <div className="flex space-x-1">
                            {getPlatformIcons(campaign.channels)}
                          </div>
                        </div>
                        <p className="text-gray-600 text-sm mb-3">
                          {campaign.content.description}
                        </p>
                        <div className="flex items-center space-x-6 text-sm text-gray-500">
                          <div className="flex items-center space-x-1">
                            <Euro className="w-4 h-4" />
                            <span>Budget: {formatCurrency(campaign.budget.totalBudget)}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <Eye className="w-4 h-4" />
                            <span>Impressionen: {formatNumber(campaign.metrics.impressions)}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <MousePointer className="w-4 h-4" />
                            <span>Klicks: {formatNumber(campaign.metrics.clicks)}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <Calendar className="w-4 h-4" />
                            <span>Erstellt: {new Date(campaign.createdAt).toLocaleDateString('de-DE')}</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2 ml-4">
                        <Button
                          onClick={() => onViewCampaign(campaign.id)}
                          variant="outline"
                          size="sm"
                        >
                          <Eye className="w-4 h-4 mr-1" />
                          Anzeigen
                        </Button>
                        <Button
                          onClick={() => {
                            // Handle edit campaign
                            console.log('Edit campaign:', campaign.id)
                          }}
                          variant="outline"
                          size="sm"
                        >
                          <Edit className="w-4 h-4 mr-1" />
                          Bearbeiten
                        </Button>
                        {campaign.status === 'active' ? (
                          <Button
                            onClick={() => handleStatusChange(campaign.id, 'paused')}
                            variant="outline"
                            size="sm"
                          >
                            <Pause className="w-4 h-4 mr-1" />
                            Pausieren
                          </Button>
                        ) : (
                          <Button
                            onClick={() => handleStatusChange(campaign.id, 'active')}
                            variant="outline"
                            size="sm"
                          >
                            <Play className="w-4 h-4 mr-1" />
                            Starten
                          </Button>
                        )}
                        <Button
                          onClick={() => handleDeleteCampaign(campaign.id)}
                          variant="outline"
                          size="sm"
                          className="text-red-600 hover:text-red-700 hover:bg-red-50"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}

export default CampaignDashboard
