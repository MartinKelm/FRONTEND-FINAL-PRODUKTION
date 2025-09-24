/**
 * User Storage Utility
 * 
 * Provides functions for managing user data in localStorage
 */

// Get all registered users
export const getUsers = () => {
  try {
    const users = localStorage.getItem('registeredUsers')
    return users ? JSON.parse(users) : []
  } catch (error) {
    console.error('Error reading users from storage:', error)
    return []
  }
}

// Get a specific user by ID
export const getUserById = (userId) => {
  try {
    const users = getUsers()
    return users.find(user => user.id === userId) || null
  } catch (error) {
    console.error('Error getting user by ID:', error)
    return null
  }
}

// Get a specific user by email
export const getUserByEmail = (email) => {
  try {
    const users = getUsers()
    return users.find(user => user.email.toLowerCase() === email.toLowerCase()) || null
  } catch (error) {
    console.error('Error getting user by email:', error)
    return null
  }
}

// Save a new user
export const saveUser = (userData) => {
  try {
    // Ensure required fields
    if (!userData.email || !userData.password) {
      throw new Error('Email and password are required')
    }
    
    // Check if user already exists
    const existingUsers = getUsers()
    const userExists = existingUsers.some(user => 
      user.email.toLowerCase() === userData.email.toLowerCase()
    )
    
    if (userExists) {
      throw new Error('User with this email already exists')
    }
    
    // Add additional fields
    const newUser = {
      ...userData,
      id: userData.id || generateUserId(),
      role: userData.role || 'user',
      createdAt: userData.createdAt || new Date().toISOString(),
      name: userData.name || `${userData.firstName || ''} ${userData.lastName || ''}`.trim()
    }
    
    // Save to storage
    const updatedUsers = [...existingUsers, newUser]
    localStorage.setItem('registeredUsers', JSON.stringify(updatedUsers))
    
    return { success: true, user: newUser }
  } catch (error) {
    console.error('Error saving user:', error)
    return { success: false, error: error.message }
  }
}

// Update an existing user
export const updateUser = (userId, userData) => {
  try {
    const existingUsers = getUsers()
    const userIndex = existingUsers.findIndex(user => user.id === userId)
    
    if (userIndex === -1) {
      throw new Error('User not found')
    }
    
    // Update user data
    const updatedUser = {
      ...existingUsers[userIndex],
      ...userData,
      updatedAt: new Date().toISOString()
    }
    
    // If name components are updated, update the full name
    if (userData.firstName || userData.lastName) {
      updatedUser.name = `${userData.firstName || existingUsers[userIndex].firstName || ''} ${userData.lastName || existingUsers[userIndex].lastName || ''}`.trim()
    }
    
    // Save to storage
    existingUsers[userIndex] = updatedUser
    localStorage.setItem('registeredUsers', JSON.stringify(existingUsers))
    
    return { success: true, user: updatedUser }
  } catch (error) {
    console.error('Error updating user:', error)
    return { success: false, error: error.message }
  }
}

// Delete a user
export const deleteUser = (userId) => {
  try {
    const existingUsers = getUsers()
    const updatedUsers = existingUsers.filter(user => user.id !== userId)
    
    if (existingUsers.length === updatedUsers.length) {
      throw new Error('User not found')
    }
    
    localStorage.setItem('registeredUsers', JSON.stringify(updatedUsers))
    return { success: true }
  } catch (error) {
    console.error('Error deleting user:', error)
    return { success: false, error: error.message }
  }
}

// Validate user credentials
export const validateCredentials = (email, password) => {
  try {
    const users = getUsers()
    const user = users.find(u => 
      u.email.toLowerCase() === email.toLowerCase() && 
      u.password === password
    )
    
    return user || null
  } catch (error) {
    console.error('Error validating credentials:', error)
    return null
  }
}

// Generate a unique user ID
const generateUserId = () => {
  return 'user-' + Math.random().toString(36).substr(2, 9) + Date.now().toString(36)
}

// Initialize default users if they don't exist
export const initializeDefaultUsers = () => {
  try {
    const existingUsers = getUsers()
    
    // Check if admin user exists
    const adminExists = existingUsers.find(u => u.email === 'admin@socialmediakampagnen.com')
    const demoExists = existingUsers.find(u => u.email === 'demo@socialmediakampagnen.com')
    
    let usersToAdd = []
    
    // Add admin user if not exists
    if (!adminExists) {
      usersToAdd.push({
        id: 'admin-001',
        email: 'admin@socialmediakampagnen.com',
        password: 'admin123',
        firstName: 'Admin',
        lastName: 'User',
        name: 'Admin User',
        role: 'SUPER_ADMIN',
        registrationStep: 'completed',
        createdAt: new Date().toISOString(),
        isDefaultUser: true
      })
    }
    
    // Add demo user if not exists
    if (!demoExists) {
      usersToAdd.push({
        id: 'demo-001',
        email: 'demo@socialmediakampagnen.com',
        password: 'demo123',
        firstName: 'Demo',
        lastName: 'User',
        name: 'Demo User',
        role: 'user',
        registrationStep: 'completed',
        createdAt: new Date().toISOString(),
        isDefaultUser: true,
        isDemoAccount: true
      })
    }
    
    if (usersToAdd.length > 0) {
      const updatedUsers = [...existingUsers, ...usersToAdd]
      localStorage.setItem('registeredUsers', JSON.stringify(updatedUsers))
      return { success: true, addedUsers: usersToAdd.length }
    }
    
    return { success: true, addedUsers: 0 }
  } catch (error) {
    console.error('Error initializing default users:', error)
    return { success: false, error: error.message }
  }
}
