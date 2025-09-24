import React, { useState } from 'react'
import { Button } from '../ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card'
import { Input } from '../ui/input'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs'
import { Label } from '../ui/label'
import { Textarea } from '../ui/textarea'
import { 
  User, 
  Building, 
  Mail, 
  Phone, 
  Globe, 
  MapPin, 
  CreditCard, 
  Shield,
  LogOut
} from 'lucide-react'

const AccountManagement = ({ currentUser, onUpdateUser }) => {
  const [activeTab, setActiveTab] = useState('profile')
  const [formData, setFormData] = useState({
    name: currentUser?.name || '',
    email: currentUser?.email || '',
    phone: currentUser?.phone || '',
    company: currentUser?.company?.name || '',
    website: currentUser?.company?.website || '',
    address: currentUser?.company?.address || '',
    description: currentUser?.company?.description || '',
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    
    // Update user data
    const updatedUser = {
      ...currentUser,
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      company: {
        ...(currentUser?.company || {}),
        name: formData.company,
        website: formData.website,
        address: formData.address,
        description: formData.description,
      }
    }
    
    // Call the update function
    onUpdateUser(updatedUser)
    
    // Save to localStorage
    localStorage.setItem('currentUser', JSON.stringify(updatedUser))
    
    // Show success message (in a real app)
    alert('Profil erfolgreich aktualisiert')
  }

  return (
    <section className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 py-8 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">
              Mein Account
            </h1>
            <p className="text-gray-600">
              Verwalten Sie Ihre persönlichen Daten und Einstellungen
            </p>
          </div>
          
          {/* ADDED: Logout Button */}
          <Button
            onClick={() => {
              // Clear localStorage
              localStorage.removeItem('currentUser')
              localStorage.removeItem('isAuthenticated')
              localStorage.removeItem('currentView')
              
              // Reload page to log out
              window.location.reload()
            }}
            className="bg-red-500 hover:bg-red-600 text-white"
          >
            <LogOut className="w-4 h-4 mr-2" />
            Abmelden
          </Button>
        </div>

        <Tabs defaultValue={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid grid-cols-3 mb-8">
            <TabsTrigger value="profile" className="text-sm sm:text-base">
              <User className="w-4 h-4 mr-2" />
              Profil
            </TabsTrigger>
            <TabsTrigger value="company" className="text-sm sm:text-base">
              <Building className="w-4 h-4 mr-2" />
              Unternehmen
            </TabsTrigger>
            <TabsTrigger value="subscription" className="text-sm sm:text-base">
              <CreditCard className="w-4 h-4 mr-2" />
              Abonnement
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="profile">
            <Card>
              <CardHeader>
                <CardTitle>Persönliche Informationen</CardTitle>
                <CardDescription>
                  Aktualisieren Sie Ihre persönlichen Daten und Kontaktinformationen
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="name">Name</Label>
                      <div className="relative">
                        <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 w-4 h-4" />
                        <Input 
                          id="name" 
                          name="name" 
                          value={formData.name} 
                          onChange={handleChange}
                          className="pl-10"
                        />
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="email">E-Mail</Label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 w-4 h-4" />
                        <Input 
                          id="email" 
                          name="email" 
                          type="email" 
                          value={formData.email} 
                          onChange={handleChange}
                          className="pl-10"
                        />
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="phone">Telefon</Label>
                      <div className="relative">
                        <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 w-4 h-4" />
                        <Input 
                          id="phone" 
                          name="phone" 
                          value={formData.phone} 
                          onChange={handleChange}
                          className="pl-10"
                        />
                      </div>
                    </div>
                    
                    {currentUser?.role === 'ADMIN' || currentUser?.role === 'SUPER_ADMIN' ? (
                      <div className="space-y-2">
                        <Label htmlFor="role">Rolle</Label>
                        <div className="relative">
                          <Shield className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 w-4 h-4" />
                          <Input 
                            id="role" 
                            value={currentUser?.role || 'USER'} 
                            disabled
                            className="pl-10 bg-gray-50"
                          />
                        </div>
                      </div>
                    ) : null}
                  </div>
                  
                  <div className="flex justify-end">
                    <Button type="submit" className="bg-purple-600 hover:bg-purple-700 text-white">
                      Änderungen speichern
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="company">
            <Card>
              <CardHeader>
                <CardTitle>Unternehmensinformationen</CardTitle>
                <CardDescription>
                  Aktualisieren Sie die Informationen zu Ihrem Unternehmen
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="company">Unternehmensname</Label>
                      <div className="relative">
                        <Building className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 w-4 h-4" />
                        <Input 
                          id="company" 
                          name="company" 
                          value={formData.company} 
                          onChange={handleChange}
                          className="pl-10"
                        />
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="website">Website</Label>
                      <div className="relative">
                        <Globe className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 w-4 h-4" />
                        <Input 
                          id="website" 
                          name="website" 
                          value={formData.website} 
                          onChange={handleChange}
                          className="pl-10"
                        />
                      </div>
                    </div>
                    
                    <div className="space-y-2 md:col-span-2">
                      <Label htmlFor="address">Adresse</Label>
                      <div className="relative">
                        <MapPin className="absolute left-3 top-3 text-gray-500 w-4 h-4" />
                        <Textarea 
                          id="address" 
                          name="address" 
                          value={formData.address} 
                          onChange={handleChange}
                          className="pl-10 min-h-[80px]"
                        />
                      </div>
                    </div>
                    
                    <div className="space-y-2 md:col-span-2">
                      <Label htmlFor="description">Unternehmensbeschreibung</Label>
                      <Textarea 
                        id="description" 
                        name="description" 
                        value={formData.description} 
                        onChange={handleChange}
                        className="min-h-[120px]"
                      />
                    </div>
                  </div>
                  
                  <div className="flex justify-end">
                    <Button type="submit" className="bg-purple-600 hover:bg-purple-700 text-white">
                      Änderungen speichern
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="subscription">
            <Card>
              <CardHeader>
                <CardTitle>Abonnement & Zahlungen</CardTitle>
                <CardDescription>
                  Verwalten Sie Ihr Abonnement und Zahlungsinformationen
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="bg-gray-50 border border-gray-200 rounded-lg p-6">
                    <h3 className="text-lg font-medium text-gray-900 mb-4">Aktueller Plan</h3>
                    
                    {currentUser?.plan ? (
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="font-medium text-gray-900">{currentUser.plan.name}</p>
                            <p className="text-sm text-gray-500">{currentUser.plan.price}€ / Monat</p>
                          </div>
                          <Badge className="bg-green-100 text-green-800 border-green-200">
                            Aktiv
                          </Badge>
                        </div>
                        
                        <div className="pt-4 border-t border-gray-200">
                          <Button className="bg-purple-600 hover:bg-purple-700 text-white">
                            Plan ändern
                          </Button>
                        </div>
                      </div>
                    ) : (
                      <div className="text-center py-8">
                        <CreditCard className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                        <p className="text-gray-500 mb-4">Sie haben noch keinen Plan ausgewählt</p>
                        <Button className="bg-purple-600 hover:bg-purple-700 text-white">
                          Plan auswählen
                        </Button>
                      </div>
                    )}
                  </div>
                  
                  <div className="bg-gray-50 border border-gray-200 rounded-lg p-6">
                    <h3 className="text-lg font-medium text-gray-900 mb-4">Zahlungsmethoden</h3>
                    
                    <div className="text-center py-8">
                      <CreditCard className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                      <p className="text-gray-500 mb-4">Keine Zahlungsmethoden hinterlegt</p>
                      <Button className="bg-gray-800 hover:bg-gray-900 text-white">
                        Zahlungsmethode hinzufügen
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </section>
  )
}

export default AccountManagement
