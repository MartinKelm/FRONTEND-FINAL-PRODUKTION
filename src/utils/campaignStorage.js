// Campaign Storage System
// Handles saving, loading, and managing campaigns with unique IDs

// Generate unique campaign ID
export const generateCampaignId = () => {
  return 'campaign_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9)
}

// Campaign data structure
export const createCampaignData = (campaignData, userId) => {
  const now = new Date().toISOString()
  
  return {
    id: generateCampaignId(),
    userId: userId,
    status: 'draft', // draft, active, paused, completed
    createdAt: now,
    updatedAt: now,
    
    // Campaign Configuration
    goal: campaignData.goal,
    channels: campaignData.channels,
    
    // Content Data
    content: {
      headline: campaignData.content.headline,
      description: campaignData.content.description,
      callToAction: campaignData.content.callToAction,
      images: campaignData.content.images, // Base64 encoded images
      videos: campaignData.content.videos || []
    },
    
    // Budget Information
    budget: {
      type: campaignData.budget.type, // 'daily' or 'total'
      amount: parseFloat(campaignData.budget.amount),
      duration: campaignData.budget.duration ? parseInt(campaignData.budget.duration) : null,
      startDate: campaignData.budget.startDate,
      endDate: campaignData.budget.endDate,
      totalBudget: campaignData.budget.type === 'daily' && campaignData.budget.duration 
        ? parseFloat(campaignData.budget.amount) * parseInt(campaignData.budget.duration)
        : parseFloat(campaignData.budget.amount)
    },
    
    // Performance Metrics (prepared for API integration)
    metrics: {
      impressions: 0,
      clicks: 0,
      conversions: 0,
      spent: 0,
      cpm: 0,
      cpc: 0,
      ctr: 0,
      conversionRate: 0,
      lastUpdated: null,
      
      // Channel-specific metrics
      channelMetrics: campaignData.channels.reduce((acc, channelId) => {
        acc[channelId] = {
          impressions: 0,
          clicks: 0,
          conversions: 0,
          spent: 0,
          cpm: 0,
          cpc: 0,
          ctr: 0
        }
        return acc
      }, {})
    },
    
    // API Integration Data
    externalIds: {
      // Will store external campaign IDs from different platforms
      facebook: null,
      instagram: null,
      google: null,
      tiktok: null,
      snapchat: null,
      reddit: null,
      linkedin: null,
      spotify: null
    },
    
    // Admin Notes
    adminNotes: [],
    
    // Approval Status
    approvals: {
      budgetConfirmed: campaignData.budgetConfirmed || false,
      finalApproval: campaignData.finalApproval || false,
      adminApproved: false,
      adminApprovedBy: null,
      adminApprovedAt: null
    }
  }
}

// Save campaign to localStorage (will be replaced with API calls later)
export const saveCampaign = (campaignData, userId) => {
  try {
    const campaign = createCampaignData(campaignData, userId)
    
    // Get existing campaigns
    const existingCampaigns = getCampaigns(userId)
    
    // Add new campaign
    const updatedCampaigns = [...existingCampaigns, campaign]
    
    // Save to localStorage
    localStorage.setItem(`campaigns_${userId}`, JSON.stringify(updatedCampaigns))
    
    // Also save to global campaigns list for admin access
    const allCampaigns = JSON.parse(localStorage.getItem('all_campaigns') || '[]')
    allCampaigns.push(campaign)
    localStorage.setItem('all_campaigns', JSON.stringify(allCampaigns))
    
    console.log('Campaign saved successfully:', campaign.id)
    return campaign
  } catch (error) {
    console.error('Error saving campaign:', error)
    throw new Error('Failed to save campaign')
  }
}

// Get all campaigns for a user
export const getCampaigns = (userId) => {
  try {
    const campaigns = localStorage.getItem(`campaigns_${userId}`)
    return campaigns ? JSON.parse(campaigns) : []
  } catch (error) {
    console.error('Error loading campaigns:', error)
    return []
  }
}

// Get single campaign by ID
export const getCampaignById = (campaignId, userId) => {
  try {
    const campaigns = getCampaigns(userId)
    return campaigns.find(campaign => campaign.id === campaignId) || null
  } catch (error) {
    console.error('Error loading campaign:', error)
    return null
  }
}

// Update campaign
export const updateCampaign = (campaignId, updates, userId) => {
  try {
    const campaigns = getCampaigns(userId)
    const campaignIndex = campaigns.findIndex(campaign => campaign.id === campaignId)
    
    if (campaignIndex === -1) {
      throw new Error('Campaign not found')
    }
    
    // Update campaign
    campaigns[campaignIndex] = {
      ...campaigns[campaignIndex],
      ...updates,
      updatedAt: new Date().toISOString()
    }
    
    // Save updated campaigns
    localStorage.setItem(`campaigns_${userId}`, JSON.stringify(campaigns))
    
    // Update global campaigns list
    const allCampaigns = JSON.parse(localStorage.getItem('all_campaigns') || '[]')
    const globalIndex = allCampaigns.findIndex(campaign => campaign.id === campaignId)
    if (globalIndex !== -1) {
      allCampaigns[globalIndex] = campaigns[campaignIndex]
      localStorage.setItem('all_campaigns', JSON.stringify(allCampaigns))
    }
    
    console.log('Campaign updated successfully:', campaignId)
    return campaigns[campaignIndex]
  } catch (error) {
    console.error('Error updating campaign:', error)
    throw error
  }
}

// Update campaign metrics (for API integration)
export const updateCampaignMetrics = (campaignId, metrics, userId) => {
  try {
    const updates = {
      metrics: {
        ...metrics,
        lastUpdated: new Date().toISOString()
      }
    }
    
    return updateCampaign(campaignId, updates, userId)
  } catch (error) {
    console.error('Error updating campaign metrics:', error)
    throw error
  }
}

// Update campaign status
export const updateCampaignStatus = (campaignId, status, userId) => {
  try {
    const validStatuses = ['draft', 'active', 'paused', 'completed']
    if (!validStatuses.includes(status)) {
      throw new Error('Invalid campaign status')
    }
    
    return updateCampaign(campaignId, { status }, userId)
  } catch (error) {
    console.error('Error updating campaign status:', error)
    throw error
  }
}

// Delete campaign
export const deleteCampaign = (campaignId, userId) => {
  try {
    const campaigns = getCampaigns(userId)
    const filteredCampaigns = campaigns.filter(campaign => campaign.id !== campaignId)
    
    // Save updated campaigns
    localStorage.setItem(`campaigns_${userId}`, JSON.stringify(filteredCampaigns))
    
    // Remove from global campaigns list
    const allCampaigns = JSON.parse(localStorage.getItem('all_campaigns') || '[]')
    const filteredAllCampaigns = allCampaigns.filter(campaign => campaign.id !== campaignId)
    localStorage.setItem('all_campaigns', JSON.stringify(filteredAllCampaigns))
    
    console.log('Campaign deleted successfully:', campaignId)
    return true
  } catch (error) {
    console.error('Error deleting campaign:', error)
    throw error
  }
}

// Get campaign statistics
export const getCampaignStats = (userId) => {
  try {
    const campaigns = getCampaigns(userId)
    
    return {
      total: campaigns.length,
      active: campaigns.filter(c => c.status === 'active').length,
      draft: campaigns.filter(c => c.status === 'draft').length,
      paused: campaigns.filter(c => c.status === 'paused').length,
      completed: campaigns.filter(c => c.status === 'completed').length,
      totalBudget: campaigns.reduce((sum, c) => sum + (c.budget.totalBudget || 0), 0),
      totalSpent: campaigns.reduce((sum, c) => sum + (c.metrics.spent || 0), 0),
      totalImpressions: campaigns.reduce((sum, c) => sum + (c.metrics.impressions || 0), 0),
      totalClicks: campaigns.reduce((sum, c) => sum + (c.metrics.clicks || 0), 0),
      totalConversions: campaigns.reduce((sum, c) => sum + (c.metrics.conversions || 0), 0)
    }
  } catch (error) {
    console.error('Error calculating campaign stats:', error)
    return {
      total: 0,
      active: 0,
      draft: 0,
      paused: 0,
      completed: 0,
      totalBudget: 0,
      totalSpent: 0,
      totalImpressions: 0,
      totalClicks: 0,
      totalConversions: 0
    }
  }
}

// Admin functions (for later use)
export const getAllCampaigns = () => {
  try {
    return JSON.parse(localStorage.getItem('all_campaigns') || '[]')
  } catch (error) {
    console.error('Error loading all campaigns:', error)
    return []
  }
}

export const approveCampaign = (campaignId, adminId) => {
  try {
    const allCampaigns = getAllCampaigns()
    const campaignIndex = allCampaigns.findIndex(campaign => campaign.id === campaignId)
    
    if (campaignIndex === -1) {
      throw new Error('Campaign not found')
    }
    
    // Update approval status
    allCampaigns[campaignIndex].approvals.adminApproved = true
    allCampaigns[campaignIndex].approvals.adminApprovedBy = adminId
    allCampaigns[campaignIndex].approvals.adminApprovedAt = new Date().toISOString()
    allCampaigns[campaignIndex].updatedAt = new Date().toISOString()
    
    // Save updated campaigns
    localStorage.setItem('all_campaigns', JSON.stringify(allCampaigns))
    
    // Update user's campaign list
    const campaign = allCampaigns[campaignIndex]
    const userCampaigns = getCampaigns(campaign.userId)
    const userCampaignIndex = userCampaigns.findIndex(c => c.id === campaignId)
    if (userCampaignIndex !== -1) {
      userCampaigns[userCampaignIndex] = campaign
      localStorage.setItem(`campaigns_${campaign.userId}`, JSON.stringify(userCampaigns))
    }
    
    console.log('Campaign approved successfully:', campaignId)
    return campaign
  } catch (error) {
    console.error('Error approving campaign:', error)
    throw error
  }
}

// Export default object with all functions
export default {
  generateCampaignId,
  createCampaignData,
  saveCampaign,
  getCampaigns,
  getCampaignById,
  updateCampaign,
  updateCampaignMetrics,
  updateCampaignStatus,
  deleteCampaign,
  getCampaignStats,
  getAllCampaigns,
  approveCampaign
}
