import { useState, useCallback } from 'react'
import apiClient, { ApiError } from '../lib/api'
import { useAuth } from '../contexts/AuthContext'

// Generic hook for API operations
export function useApi() {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const { logout } = useAuth()

  const execute = useCallback(async (apiCall) => {
    try {
      setLoading(true)
      setError(null)
      
      const result = await apiCall()
      return { success: true, data: result }
    } catch (error) {
      console.error('API call failed:', error)
      
      // Handle authentication errors
      if (error.isAuthError()) {
        logout()
      }
      
      setError(error.message)
      return { success: false, error: error.message, apiError: error }
    } finally {
      setLoading(false)
    }
  }, [logout])

  const clearError = useCallback(() => {
    setError(null)
  }, [])

  return {
    loading,
    error,
    execute,
    clearError
  }
}

// Hook for campaign operations
export function useCampaigns() {
  const { loading, error, execute, clearError } = useApi()

  const getCampaigns = useCallback((params) => {
    return execute(() => apiClient.getCampaigns(params))
  }, [execute])

  const getCampaign = useCallback((id) => {
    return execute(() => apiClient.getCampaign(id))
  }, [execute])

  const createCampaign = useCallback((campaignData) => {
    return execute(() => apiClient.createCampaign(campaignData))
  }, [execute])

  const updateCampaign = useCallback((id, campaignData) => {
    return execute(() => apiClient.updateCampaign(id, campaignData))
  }, [execute])

  const deleteCampaign = useCallback((id) => {
    return execute(() => apiClient.deleteCampaign(id))
  }, [execute])

  const submitCampaign = useCallback((campaignId) => {
    return execute(() => apiClient.submitCampaign(campaignId))
  }, [execute])

  return {
    loading,
    error,
    clearError,
    getCampaigns,
    getCampaign,
    createCampaign,
    updateCampaign,
    deleteCampaign,
    submitCampaign
  }
}

// Hook for AI operations
export function useAI() {
  const { loading, error, execute, clearError } = useApi()

  const generateCampaign = useCallback((promptData) => {
    return execute(() => apiClient.generateCampaign(promptData))
  }, [execute])

  const optimizeCampaign = useCallback((campaignId, performanceData) => {
    return execute(() => apiClient.optimizeCampaign(campaignId, performanceData))
  }, [execute])

  const generateVariations = useCallback((campaignId, options) => {
    return execute(() => apiClient.generateVariations(campaignId, options))
  }, [execute])

  const generateImagePrompts = useCallback((campaignId, options) => {
    return execute(() => apiClient.generateImagePrompts(campaignId, options))
  }, [execute])

  return {
    loading,
    error,
    clearError,
    generateCampaign,
    optimizeCampaign,
    generateVariations,
    generateImagePrompts
  }
}

// Hook for payment operations
export function usePayments() {
  const { loading, error, execute, clearError } = useApi()

  const getPlans = useCallback(() => {
    return execute(() => apiClient.getPlans())
  }, [execute])

  const createSubscription = useCallback((plan) => {
    return execute(() => apiClient.createSubscription(plan))
  }, [execute])

  const createPayment = useCallback((paymentData) => {
    return execute(() => apiClient.createPayment(paymentData))
  }, [execute])

  const getBilling = useCallback(() => {
    return execute(() => apiClient.getBilling())
  }, [execute])

  const createBillingPortal = useCallback((returnUrl) => {
    return execute(() => apiClient.createBillingPortal(returnUrl))
  }, [execute])

  const cancelSubscription = useCallback(() => {
    return execute(() => apiClient.cancelSubscription())
  }, [execute])

  return {
    loading,
    error,
    clearError,
    getPlans,
    createSubscription,
    createPayment,
    getBilling,
    createBillingPortal,
    cancelSubscription
  }
}

// Hook for admin operations
export function useAdmin() {
  const { loading, error, execute, clearError } = useApi()

  const getDashboard = useCallback(() => {
    return execute(() => apiClient.getAdminDashboard())
  }, [execute])

  const getUsers = useCallback((params) => {
    return execute(() => apiClient.getUsers(params))
  }, [execute])

  const updateUser = useCallback((userId, action, data) => {
    return execute(() => apiClient.updateUser(userId, action, data))
  }, [execute])

  const approveCampaign = useCallback((campaignId, action, reason) => {
    return execute(() => apiClient.approveCampaign(campaignId, action, reason))
  }, [execute])

  return {
    loading,
    error,
    clearError,
    getDashboard,
    getUsers,
    updateUser,
    approveCampaign
  }
}

// Hook for company operations
export function useCompany() {
  const { loading, error, execute, clearError } = useApi()

  const getCompany = useCallback(() => {
    return execute(() => apiClient.getCompany())
  }, [execute])

  const updateCompany = useCallback((companyData) => {
    return execute(() => apiClient.updateCompany(companyData))
  }, [execute])

  return {
    loading,
    error,
    clearError,
    getCompany,
    updateCompany
  }
}
