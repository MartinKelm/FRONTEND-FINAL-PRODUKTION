import React, { useState, useEffect } from 'react'
import { Button } from '../ui/button'
import { Input } from '../ui/input'
import { Label } from '../ui/label'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card'
import { Eye, EyeOff, Mail, Lock, User, AlertCircle, Info } from 'lucide-react'

const LoginForm = ({ onLogin, onSwitchToRegister }) => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  })
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')

  // Initialize default users (Admin and Demo)
  useEffect(() => {
    initializeDefaultUsers()
  }, [])

  const initializeDefaultUsers = () => {
    try {
      const existingUsers = JSON.parse(localStorage.getItem('registeredUsers') || '[]')
      
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
      }
    } catch (error) {
      console.error('Error initializing default users:', error)
    }
  }

  // Get registered users from localStorage
  const getRegisteredUsers = () => {
    try {
      const users = localStorage.getItem('registeredUsers')
      return users ? JSON.parse(users) : []
    } catch (error) {
      console.error('Error reading registered users:', error)
      return []
    }
  }

  // Validate login credentials
  const validateLogin = (email, password) => {
    const registeredUsers = getRegisteredUsers()
    
    // Find user with matching email and password
    const user = registeredUsers.find(u => 
      u.email.toLowerCase() === email.toLowerCase() && 
      u.password === password
    )
    
    return user || null
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsLoading(true)
    setError('')
    
    // Validate required fields
    if (!formData.email || !formData.password) {
      setError('Bitte füllen Sie alle Felder aus.')
      setIsLoading(false)
      return
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(formData.email)) {
      setError('Bitte geben Sie eine gültige E-Mail-Adresse ein.')
      setIsLoading(false)
      return
    }

    // Simulate API call delay
    setTimeout(() => {
      const user = validateLogin(formData.email, formData.password)
      
      if (user) {
        // Successful login - create session with unique session ID for multi-device support
        const sessionId = Math.random().toString(36).substr(2, 9) + Date.now().toString(36)
        
        onLogin({
          id: user.id,
          email: user.email,
          name: user.name,
          firstName: user.firstName,
          lastName: user.lastName,
          role: user.role || 'user',
          company: user.company,
          plan: user.plan,
          registrationStep: user.registrationStep || 'completed',
          sessionId: sessionId,
          isDefaultUser: user.isDefaultUser || false,
          isDemoAccount: user.isDemoAccount || false
        })
      } else {
        // Failed login
        setError('E-Mail-Adresse oder Passwort ist falsch. Bitte versuchen Sie es erneut oder registrieren Sie sich.')
      }
      
      setIsLoading(false)
    }, 1500)
  }

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
    // Clear error when user starts typing
    if (error) {
      setError('')
    }
  }

  const handleDemoLogin = () => {
    setFormData({
      email: 'demo@socialmediakampagnen.com',
      password: 'demo123'
    })
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-600 via-pink-500 to-orange-400 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <Card className="shadow-2xl border-0 bg-white/95 backdrop-blur-sm">
          <CardHeader className="text-center pb-4">
            <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <User className="w-8 h-8 text-white" />
            </div>
            <CardTitle className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              Anmelden
            </CardTitle>
            <CardDescription className="text-gray-600">
              Melden Sie sich in Ihrem Konto an
            </CardDescription>
          </CardHeader>
          
          <CardContent>


            <form onSubmit={handleSubmit} className="space-y-4">
              {error && (
                <div className="flex items-center space-x-2 p-3 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
                  <AlertCircle className="w-4 h-4 flex-shrink-0" />
                  <span>{error}</span>
                </div>
              )}
              
              <div className="space-y-2">
                <Label htmlFor="email" className="text-sm font-medium text-gray-700">
                  E-Mail-Adresse *
                </Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="max@unternehmen.de"
                    className="pl-10 border-gray-300 focus:border-purple-500 focus:ring-purple-500"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="password" className="text-sm font-medium text-gray-700">
                  Passwort *
                </Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <Input
                    id="password"
                    name="password"
                    type={showPassword ? 'text' : 'password'}
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="Ihr Passwort"
                    className="pl-10 pr-10 border-gray-300 focus:border-purple-500 focus:ring-purple-500"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <Button
                type="submit"
                disabled={isLoading}
                className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-semibold py-3 text-base shadow-lg hover:shadow-xl transition-all duration-200"
              >
                {isLoading ? (
                  <div className="flex items-center space-x-2">
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    <span>Anmelden...</span>
                  </div>
                ) : (
                  'Anmelden'
                )}
              </Button>
            </form>

            <div className="mt-6 text-center">
              <p className="text-sm text-gray-600">
                Noch kein Konto?{' '}
                <button
                  onClick={onSwitchToRegister}
                  className="text-purple-600 hover:text-purple-700 font-medium hover:underline transition-colors"
                >
                  Jetzt registrieren
                </button>
              </p>
            </div>

            {/* Demo Account Button */}
            <div className="mt-4">
              <Button
                type="button"
                onClick={handleDemoLogin}
                className="w-full bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white font-semibold py-3 text-base shadow-lg hover:shadow-xl transition-all duration-200"
              >
                Demo-Account testen
              </Button>
              <p className="text-xs text-gray-500 text-center mt-2">
                Kostenlos testen ohne Registrierung
              </p>
            </div>

            <div className="mt-4 text-center">
              <p className="text-xs text-gray-500">
                Hinweis: Sie können sich nur mit einem zuvor registrierten Konto anmelden.
              </p>
            </div>


          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default LoginForm
