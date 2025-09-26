import React, { createContext, useContext, useState, useEffect } from 'react'
import apiClient, { ApiError } from '../lib/api'

const AuthContext = createContext()

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  // Initialize auth state
  useEffect(() => {
    initializeAuth()
  }, [])

  async function initializeAuth() {
    try {
      const token = localStorage.getItem('authToken')
      if (token) {
        apiClient.setToken(token)
        const response = await apiClient.getProfile()
        setUser(response.user)
      }
    } catch (error) {
      console.error('Auth initialization failed:', error)
      // Clear invalid token
      localStorage.removeItem('authToken')
      apiClient.setToken(null)
    } finally {
      setLoading(false)
    }
  }

  async function login(email, password) {
    try {
      setError(null)
      setLoading(true)
      
      const response = await apiClient.login({ email, password })
      setUser(response.user)
      
      return { success: true, user: response.user }
    } catch (error) {
      setError(error.message)
      return { success: false, error: error.message }
    } finally {
      setLoading(false)
    }
  }

  async function register(userData) {
    try {
      setError(null)
      setLoading(true)
      
      const response = await apiClient.register(userData)
      setUser(response.user)
      
      return { success: true, user: response.user }
    } catch (error) {
      setError(error.message)
      return { success: false, error: error.message }
    } finally {
      setLoading(false)
    }
  }

  function logout() {
    apiClient.logout()
    setUser(null)
    setError(null)
  }

  async function updateProfile(profileData) {
    try {
      setError(null)
      const response = await apiClient.updateProfile(profileData)
      setUser(response.user)
      return { success: true, user: response.user }
    } catch (error) {
      setError(error.message)
      return { success: false, error: error.message }
    }
  }

  async function refreshProfile() {
    try {
      const response = await apiClient.getProfile()
      setUser(response.user)
      return response.user
    } catch (error) {
      console.error('Failed to refresh profile:', error)
      if (error.isAuthError()) {
        logout()
      }
      throw error
    }
  }

  // Check if user has specific subscription plan
  function hasSubscription(plan = null) {
    if (!user?.subscription) return false
    if (!plan) return user.subscription.status === 'ACTIVE'
    return user.subscription.status === 'ACTIVE' && user.subscription.plan === plan
  }

  // Check if user is admin
  function isAdmin() {
    return user?.role === 'ADMIN' || user?.role === 'SUPER_ADMIN'
  }

  // Check if user can create campaigns
  function canCreateCampaigns() {
    return hasSubscription('STANDARD') || hasSubscription('PRO')
  }

  // Check if user can use AI features
  function canUseAI() {
    return hasSubscription('PRO')
  }

  // Get campaign limit for current plan
  function getCampaignLimit() {
    if (!user?.subscription) return 0
    if (user.subscription.plan === 'STANDARD') return 10
    if (user.subscription.plan === 'PRO') return Infinity
    return 0
  }

  const value = {
    // State
    user,
    loading,
    error,
    
    // Actions
    login,
    register,
    logout,
    updateProfile,
    refreshProfile,
    
    // Computed properties
    isAuthenticated: !!user,
    hasSubscription,
    isAdmin,
    canCreateCampaigns,
    canUseAI,
    getCampaignLimit,
    
    // Clear error
    clearError: () => setError(null)
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}
