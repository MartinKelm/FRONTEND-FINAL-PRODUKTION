import React, { useState, useEffect } from 'react'
import { 
  CheckCircle, 
  Clock, 
  Eye, 
  Edit, 
  Trash2, 
  User, 
  Calendar, 
  Euro, 
  Target,
  Globe,
  MessageCircle,
  Image,
  Play,
  AlertCircle,
  Check,
  X
} from 'lucide-react'
import { getAllCampaigns, approveCampaign, updateCampaignStatus } from '../../utils/campaignStorage'

const CampaignAdminDashboard = () => {
  const [campaigns, setCampaigns] = useState([])
  const [selectedCampaign, setSelectedCampaign] = useState(null)
  const [filter, setFilter] = useState('all') // all, pending, approved, draft
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadCampaigns()
  }, [])

  const loadCampaigns = () => {
    try {
      const allCampaigns = getAllCampaigns()
      setCampaigns(allCampaigns)
      setLoading(false)
    } catch (error) {
      console.error('Error loading campaigns:', error)
      setLoading(false)
    }
  }

  const handleApproveCampaign = async (campaignId) => {
    try {
      const adminId = 'admin_user' // In real app, get from auth context
      await approveCampaign(campaignId, adminId)
      await updateCampaignStatus(campaignId, 'active', campaigns.find(c => c.id === campaignId)?.userId)
      loadCampaigns()
      alert('Kampagne erfolgreich genehmigt und aktiviert!')
    } catch (error) {
      console.error('Error approving campaign:', error)
      alert('Fehler beim Genehmigen der Kampagne.')
    }
  }

  const handleRejectCampaign = async (campaignId) => {
    try {
      await updateCampaignStatus(campaignId, 'draft', campaigns.find(c => c.id === campaignId)?.userId)
      loadCampaigns()
      alert('Kampagne zur Überarbeitung zurückgesendet.')
    } catch (error) {
      console.error('Error rejecting campaign:', error)
      alert('Fehler beim Ablehnen der Kampagne.')
    }
  }

  const filteredCampaigns = campaigns.filter(campaign => {
    switch (filter) {
      case 'pending':
        return campaign.status === 'draft' && !campaign.approvals?.adminApproved
      case 'approved':
        return campaign.approvals?.adminApproved
      case 'active':
        return campaign.status === 'active'
      default:
        return true
    }
  })

  const getStatusBadge = (campaign) => {
    if (campaign.approvals?.adminApproved) {
      return <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs font-medium">Genehmigt</span>
    }
    if (campaign.status === 'draft') {
      return <span className="px-2 py-1 bg-yellow-100 text-yellow-800 rounded-full text-xs font-medium">Prüfung ausstehend</span>
    }
    if (campaign.status === 'active') {
      return <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs font-medium">Aktiv</span>
    }
    return <span className="px-2 py-1 bg-gray-100 text-gray-800 rounded-full text-xs font-medium">{campaign.status}</span>
  }

  const getGoalTitle = (goalId) => {
    const goals = {
      'brand-awareness': 'Markenbekanntheit',
      'website-traffic': 'Website-Traffic',
      'lead-generation': 'Lead-Generierung',
      'sales': 'Verkäufe steigern',
      'app-downloads': 'App-Downloads'
    }
    return goals[goalId] || goalId
  }

  const getChannelNames = (channels) => {
    const channelNames = {
      facebook: 'Facebook',
      instagram: 'Instagram',
      google: 'Google Ads',
      tiktok: 'TikTok',
      snapchat: 'Snapchat',
      reddit: 'Reddit',
      linkedin: 'LinkedIn',
      spotify: 'Spotify'
    }
    return channels.map(id => channelNames[id] || id).join(', ')
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Lade Kampagnen...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-7xl mx-auto p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Kampagnen-Verwaltung</h1>
        <p className="text-gray-600">Kampagnen prüfen und genehmigen</p>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <div className="p-2 bg-blue-100 rounded-lg">
              <Target className="w-6 h-6 text-blue-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Gesamt Kampagnen</p>
              <p className="text-2xl font-bold text-gray-900">{campaigns.length}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <div className="p-2 bg-yellow-100 rounded-lg">
              <Clock className="w-6 h-6 text-yellow-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Prüfung ausstehend</p>
              <p className="text-2xl font-bold text-gray-900">
                {campaigns.filter(c => c.status === 'draft' && !c.approvals?.adminApproved).length}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <div className="p-2 bg-green-100 rounded-lg">
              <CheckCircle className="w-6 h-6 text-green-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Genehmigt</p>
              <p className="text-2xl font-bold text-gray-900">
                {campaigns.filter(c => c.approvals?.adminApproved).length}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <div className="p-2 bg-purple-100 rounded-lg">
              <Euro className="w-6 h-6 text-purple-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Gesamtbudget</p>
              <p className="text-2xl font-bold text-gray-900">
                €{campaigns.reduce((sum, c) => sum + (c.budget?.totalBudget || 0), 0).toLocaleString()}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="bg-white rounded-lg shadow mb-6">
        <div className="border-b border-gray-200">
          <nav className="-mb-px flex space-x-8 px-6">
            {[
              { id: 'all', label: 'Alle Kampagnen', count: campaigns.length },
              { id: 'pending', label: 'Prüfung ausstehend', count: campaigns.filter(c => c.status === 'draft' && !c.approvals?.adminApproved).length },
              { id: 'approved', label: 'Genehmigt', count: campaigns.filter(c => c.approvals?.adminApproved).length },
              { id: 'active', label: 'Aktiv', count: campaigns.filter(c => c.status === 'active').length }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setFilter(tab.id)}
                className={`py-4 px-1 border-b-2 font-medium text-sm ${
                  filter === tab.id
                    ? 'border-purple-500 text-purple-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                {tab.label} ({tab.count})
              </button>
            ))}
          </nav>
        </div>
      </div>

      {/* Campaigns List */}
      <div className="bg-white rounded-lg shadow">
        <div className="px-6 py-4 border-b border-gray-200">
          <h2 className="text-lg font-medium text-gray-900">
            {filter === 'all' ? 'Alle Kampagnen' :
             filter === 'pending' ? 'Kampagnen zur Prüfung' :
             filter === 'approved' ? 'Genehmigte Kampagnen' :
             'Aktive Kampagnen'}
          </h2>
        </div>

        {filteredCampaigns.length === 0 ? (
          <div className="text-center py-12">
            <AlertCircle className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-500">Keine Kampagnen gefunden.</p>
          </div>
        ) : (
          <div className="divide-y divide-gray-200">
            {filteredCampaigns.map((campaign) => (
              <div key={campaign.id} className="p-6 hover:bg-gray-50">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-4 mb-2">
                      <h3 className="text-lg font-medium text-gray-900">
                        {campaign.content?.headline || 'Unbenannte Kampagne'}
                      </h3>
                      {getStatusBadge(campaign)}
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-sm text-gray-600">
                      <div className="flex items-center space-x-2">
                        <User className="w-4 h-4" />
                        <span>Benutzer: {campaign.userId}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Target className="w-4 h-4" />
                        <span>{getGoalTitle(campaign.goal)}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Globe className="w-4 h-4" />
                        <span>{getChannelNames(campaign.channels || [])}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Euro className="w-4 h-4" />
                        <span>€{campaign.budget?.totalBudget || 0}</span>
                      </div>
                    </div>

                    <div className="mt-2 text-sm text-gray-500">
                      <div className="flex items-center space-x-4">
                        <div className="flex items-center space-x-1">
                          <Calendar className="w-4 h-4" />
                          <span>Erstellt: {new Date(campaign.createdAt).toLocaleDateString('de-DE')}</span>
                        </div>
                        {campaign.content?.images?.length > 0 && (
                          <div className="flex items-center space-x-1">
                            <Image className="w-4 h-4" />
                            <span>{campaign.content.images.length} Bilder</span>
                          </div>
                        )}
                        {campaign.content?.videos?.length > 0 && (
                          <div className="flex items-center space-x-1">
                            <Play className="w-4 h-4" />
                            <span>{campaign.content.videos.length} Videos</span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center space-x-2 ml-4">
                    <button
                      onClick={() => setSelectedCampaign(campaign)}
                      className="px-3 py-1 text-sm bg-gray-100 text-gray-700 rounded hover:bg-gray-200 flex items-center space-x-1"
                    >
                      <Eye className="w-4 h-4" />
                      <span>Details</span>
                    </button>

                    {campaign.status === 'draft' && !campaign.approvals?.adminApproved && (
                      <>
                        <button
                          onClick={() => handleApproveCampaign(campaign.id)}
                          className="px-3 py-1 text-sm bg-green-100 text-green-700 rounded hover:bg-green-200 flex items-center space-x-1"
                        >
                          <Check className="w-4 h-4" />
                          <span>Genehmigen</span>
                        </button>
                        <button
                          onClick={() => handleRejectCampaign(campaign.id)}
                          className="px-3 py-1 text-sm bg-red-100 text-red-700 rounded hover:bg-red-200 flex items-center space-x-1"
                        >
                          <X className="w-4 h-4" />
                          <span>Ablehnen</span>
                        </button>
                      </>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Campaign Detail Modal */}
      {selectedCampaign && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-4xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between p-6 border-b">
              <h2 className="text-xl font-bold text-gray-900">Kampagnen-Details</h2>
              <button
                onClick={() => setSelectedCampaign(null)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="p-6 space-y-6">
              {/* Basic Info */}
              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-4">Grundinformationen</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Überschrift</label>
                    <p className="mt-1 text-sm text-gray-900">{selectedCampaign.content?.headline}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Ziel</label>
                    <p className="mt-1 text-sm text-gray-900">{getGoalTitle(selectedCampaign.goal)}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Kanäle</label>
                    <p className="mt-1 text-sm text-gray-900">{getChannelNames(selectedCampaign.channels || [])}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Budget</label>
                    <p className="mt-1 text-sm text-gray-900">€{selectedCampaign.budget?.totalBudget || 0}</p>
                  </div>
                </div>
              </div>

              {/* Content */}
              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-4">Inhalte</h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Beschreibung</label>
                    <p className="mt-1 text-sm text-gray-900">{selectedCampaign.content?.description}</p>
                  </div>
                  {selectedCampaign.content?.callToAction && (
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Call-to-Action</label>
                      <p className="mt-1 text-sm text-gray-900">{selectedCampaign.content.callToAction}</p>
                    </div>
                  )}
                </div>
              </div>

              {/* Media */}
              {(selectedCampaign.content?.images?.length > 0 || selectedCampaign.content?.videos?.length > 0) && (
                <div>
                  <h3 className="text-lg font-medium text-gray-900 mb-4">Medien</h3>
                  <div className="grid grid-cols-3 gap-4">
                    {selectedCampaign.content?.images?.map((image, index) => (
                      <div key={index} className="border rounded-lg p-2">
                        <img src={image.url} alt={image.name} className="w-full h-32 object-cover rounded" />
                        <p className="text-xs text-gray-600 mt-1">{image.name}</p>
                      </div>
                    ))}
                    {selectedCampaign.content?.videos?.map((video, index) => (
                      <div key={index} className="border rounded-lg p-2">
                        <video src={video.url} className="w-full h-32 object-cover rounded" controls />
                        <p className="text-xs text-gray-600 mt-1">{video.name}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Admin Actions */}
              {selectedCampaign.status === 'draft' && !selectedCampaign.approvals?.adminApproved && (
                <div className="flex space-x-4 pt-4 border-t">
                  <button
                    onClick={() => {
                      handleApproveCampaign(selectedCampaign.id)
                      setSelectedCampaign(null)
                    }}
                    className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 flex items-center space-x-2"
                  >
                    <Check className="w-4 h-4" />
                    <span>Kampagne genehmigen</span>
                  </button>
                  <button
                    onClick={() => {
                      handleRejectCampaign(selectedCampaign.id)
                      setSelectedCampaign(null)
                    }}
                    className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 flex items-center space-x-2"
                  >
                    <X className="w-4 h-4" />
                    <span>Zur Überarbeitung zurücksenden</span>
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default CampaignAdminDashboard
