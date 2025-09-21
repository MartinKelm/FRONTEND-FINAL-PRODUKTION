// API Client for Frontend Integration
// Centralized API communication with authentication and error handling

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'https://backend.socialmediakampagnen.com/api'

class ApiClient {
  constructor() {
    this.token = localStorage.getItem('authToken')
  }

  // Set authentication token
  setToken(token) {
    this.token = token
    if (token) {
      localStorage.setItem('authToken', token)
    } else {
      localStorage.removeItem('authToken')
    }
  }

  // Get authentication headers
  getHeaders() {
    const headers = {
      'Content-Type': 'application/json'
    }

    if (this.token) {
      headers.Authorization = `Bearer ${this.token}`
    }

    return headers
  }

  // Generic request method
  async request(endpoint, options = {}) {
    const url = `${API_BASE_URL}${endpoint}`
    
    const config = {
      headers: this.getHeaders(),
      ...options
    }

    try {
      const response = await fetch(url, config)
      
      // Handle non-JSON responses (like redirects)
      const contentType = response.headers.get('content-type')
      if (!contentType || !contentType.includes('application/json')) {
        if (!response.ok) {
          throw new Error(`HTTP ${response.status}: ${response.statusText}`)
        }
        return { success: true }
      }

      const data = await response.json()

      if (!response.ok) {
        throw new ApiError(data.error || 'Request failed', response.status, data.code)
      }

      return data
    } catch (error) {
      if (error instanceof ApiError) {
        throw error
      }
      
      // Network or other errors
      console.error('API Request failed:', error)
      throw new ApiError('Network error or server unavailable', 0)
    }
  }

  // GET request
  async get(endpoint) {
    return this.request(endpoint, { method: 'GET' })
  }

  // POST request
  async post(endpoint, data) {
    return this.request(endpoint, {
      method: 'POST',
      body: JSON.stringify(data)
    })
  }

  // PUT request
  async put(endpoint, data) {
    return this.request(endpoint, {
      method: 'PUT',
      body: JSON.stringify(data)
    })
  }

  // DELETE request
  async delete(endpoint) {
    return this.request(endpoint, { method: 'DELETE' })
  }

  // Authentication methods
  async register(userData) {
    const response = await this.post('/auth/register', userData)
    if (response.token) {
      this.setToken(response.token)
    }
    return response
  }

  async login(credentials) {
    const response = await this.post('/auth/login', credentials)
    if (response.token) {
      this.setToken(response.token)
    }
    return response
  }

  logout() {
    this.setToken(null)
  }

  // User methods
  async getProfile() {
    return this.get('/users/me')
  }

  async updateProfile(data) {
    return this.put('/users/me', data)
  }

  async getCompany() {
    return this.get('/users/company')
  }

  async updateCompany(data) {
    return this.post('/users/company', data)
  }

  // Payment methods
  async getPlans() {
    return this.get('/payments/plans')
  }

  async createSubscription(plan) {
    return this.post('/payments/create-subscription', { plan })
  }

  async createPayment(paymentData) {
    return this.post('/payments/create-payment', paymentData)
  }

  async getBilling() {
    return this.get('/payments/billing')
  }

  async createBillingPortal(returnUrl) {
    return this.post('/payments/billing', { 
      action: 'portal', 
      returnUrl 
    })
  }

  async cancelSubscription() {
    return this.post('/payments/billing', { action: 'cancel' })
  }

  // Campaign methods
  async getCampaigns(params = {}) {
    const queryString = new URLSearchParams(params).toString()
    return this.get(`/campaigns${queryString ? `?${queryString}` : ''}`)
  }

  async getCampaign(id) {
    return this.get(`/campaigns/${id}`)
  }

  async createCampaign(campaignData) {
    return this.post('/campaigns', campaignData)
  }

  async updateCampaign(id, campaignData) {
    return this.put(`/campaigns/${id}`, campaignData)
  }

  async deleteCampaign(id) {
    return this.delete(`/campaigns/${id}`)
  }

  async submitCampaign(campaignId) {
    return this.post('/campaigns/submit', { campaignId })
  }

  // AI methods
  async generateCampaign(promptData) {
    return this.post('/ai/generate-campaign', promptData)
  }

  async optimizeCampaign(campaignId, performanceData) {
    return this.post('/ai/optimize-campaign', { 
      campaignId, 
      performanceData 
    })
  }

  async generateVariations(campaignId, options = {}) {
    return this.post('/ai/generate-variations', {
      campaignId,
      ...options
    })
  }

  async generateImagePrompts(campaignId, options = {}) {
    return this.post('/ai/generate-images', {
      campaignId,
      ...options
    })
  }

  // Admin methods
  async getAdminDashboard() {
    return this.get('/admin/dashboard')
  }

  async getUsers(params = {}) {
    const queryString = new URLSearchParams(params).toString()
    return this.get(`/admin/users${queryString ? `?${queryString}` : ''}`)
  }

  async updateUser(userId, action, data = {}) {
    return this.put('/admin/users', { userId, action, data })
  }

  async approveCampaign(campaignId, action, reason = null) {
    return this.post('/admin/campaigns/approve', {
      campaignId,
      action,
      reason
    })
  }
}

// Custom error class for API errors
class ApiError extends Error {
  constructor(message, status, code = null) {
    super(message)
    this.name = 'ApiError'
    this.status = status
    this.code = code
  }

  // Check if error requires authentication
  isAuthError() {
    return this.status === 401
  }

  // Check if error is due to insufficient permissions
  isPermissionError() {
    return this.status === 403
  }

  // Check if error is due to subscription requirement
  isSubscriptionError() {
    return this.code === 'SUBSCRIPTION_REQUIRED' || this.code === 'PRO_REQUIRED'
  }

  // Check if error is due to campaign limit
  isCampaignLimitError() {
    return this.code === 'CAMPAIGN_LIMIT_REACHED'
  }

  // Check if error is a validation error
  isValidationError() {
    return this.status === 400
  }

  // Check if error is server error
  isServerError() {
    return this.status >= 500
  }
}

// Create singleton instance
const apiClient = new ApiClient()

// Export both the instance and the class
export default apiClient
export { ApiClient, ApiError }
