import React, { useState, useEffect } from 'react'
import { 
  Users, 
  Search, 
  Filter,
  MoreHorizontal,
  Eye,
  Edit,
  Trash2,
  Download,
  UserCheck,
  UserX,
  Shield,
  ShieldOff,
  RefreshCw
} from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card'
import { Badge } from '../ui/badge'
import { Button } from '../ui/button'
import { Input } from '../ui/input'
import { 
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogClose
} from '../ui/dialog'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu'
// Toast-Import entfernt, da er Probleme verursacht
import { getUsers } from '../../utils/userStorage'

const UserManagement = () => {
  const [users, setUsers] = useState([])
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedFilter, setSelectedFilter] = useState('all')
  const [isLoading, setIsLoading] = useState(true)
  const [selectedUser, setSelectedUser] = useState(null)
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  const [refreshKey, setRefreshKey] = useState(0) // Used to force refresh

  // Load users from localStorage
  useEffect(() => {
    loadUsers()
    
    // Set up an interval to check for new users every 5 seconds
    const intervalId = setInterval(() => {
      loadUsers(false) // Silent refresh (no loading indicator)
    }, 5000)
    
    // Clean up interval on component unmount
    return () => clearInterval(intervalId)
  }, [refreshKey]) // Dependency on refreshKey to allow manual refresh

  const loadUsers = (showLoading = true) => {
    if (showLoading) {
      setIsLoading(true)
    }
    
    try {
      // Use the utility function from userStorage.js
      const allUsers = getUsers()
      setUsers(allUsers)
    } catch (error) {
      console.error('Error loading users:', error)
      alert("Fehler beim Laden der Benutzer")
    } finally {
      if (showLoading) {
        setIsLoading(false)
      }
    }
  }

  // Manual refresh function
  const handleRefresh = () => {
    setRefreshKey(prevKey => prevKey + 1) // Change the key to force useEffect to run again
  }

  // Filter users based on search term and selected filter
  const filteredUsers = users.filter(user => {
    const matchesSearch = 
      user.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.company?.toLowerCase().includes(searchTerm.toLowerCase())
    
    if (selectedFilter === 'all') return matchesSearch
    if (selectedFilter === 'admin') return matchesSearch && (user.role === 'ADMIN' || user.role === 'SUPER_ADMIN')
    if (selectedFilter === 'user') return matchesSearch && user.role === 'user'
    
    return matchesSearch
  })

  const handleViewUser = (user) => {
    setSelectedUser(user)
    setIsViewDialogOpen(true)
  }

  const handleEditUser = (user) => {
    setSelectedUser(user)
    setIsEditDialogOpen(true)
  }

  const handleDeleteUser = (user) => {
    setSelectedUser(user)
    setIsDeleteDialogOpen(true)
  }

  const confirmDeleteUser = () => {
    if (!selectedUser) return
    
    try {
      const updatedUsers = users.filter(user => user.id !== selectedUser.id)
      localStorage.setItem('registeredUsers', JSON.stringify(updatedUsers))
      setUsers(updatedUsers)
      setIsDeleteDialogOpen(false)
      alert(`${selectedUser.name} wurde erfolgreich gelöscht.`)
    } catch (error) {
      console.error('Error deleting user:', error)
      alert("Der Benutzer konnte nicht gelöscht werden.")
    }
  }

  const toggleUserRole = (userId, makeAdmin) => {
    try {
      const updatedUsers = users.map(user => {
        if (user.id === userId) {
          return {
            ...user,
            role: makeAdmin ? 'ADMIN' : 'user'
          }
        }
        return user
      })
      
      localStorage.setItem('registeredUsers', JSON.stringify(updatedUsers))
      setUsers(updatedUsers)
      
      alert(makeAdmin ? "Admin-Rechte erteilt" : "Admin-Rechte entzogen")
    } catch (error) {
      console.error('Error updating user role:', error)
      alert("Die Benutzerrolle konnte nicht aktualisiert werden.")
    }
  }

  const exportUsers = () => {
    try {
      const dataStr = JSON.stringify(users, null, 2)
      const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr)
      
      const exportFileDefaultName = 'users-export.json'
      
      const linkElement = document.createElement('a')
      linkElement.setAttribute('href', dataUri)
      linkElement.setAttribute('download', exportFileDefaultName)
      linkElement.click()
      
      alert("Die Benutzerdaten wurden erfolgreich exportiert.")
    } catch (error) {
      console.error('Error exporting users:', error)
      alert("Die Benutzerdaten konnten nicht exportiert werden.")
    }
  }

  const getStatusBadge = (user) => {
    if (user.isDefaultUser) {
      return <Badge className="bg-blue-100 text-blue-800 border-blue-200">System</Badge>
    }
    if (user.isDemoAccount) {
      return <Badge className="bg-yellow-100 text-yellow-800 border-yellow-200">Demo</Badge>
    }
    return <Badge className="bg-green-100 text-green-800 border-green-200">Aktiv</Badge>
  }

  const getRoleBadge = (role) => {
    if (role === 'SUPER_ADMIN') {
      return <Badge className="bg-red-100 text-red-800 border-red-200">Super Admin</Badge>
    }
    if (role === 'ADMIN') {
      return <Badge className="bg-purple-100 text-purple-800 border-purple-200">Admin</Badge>
    }
    return <Badge className="bg-gray-100 text-gray-800 border-gray-200">Benutzer</Badge>
  }

  const formatDate = (dateString) => {
    if (!dateString) return 'Unbekannt'
    
    try {
      const date = new Date(dateString)
      return new Intl.DateTimeFormat('de-DE', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      }).format(date)
    } catch (error) {
      return 'Ungültiges Datum'
    }
  }

  return (
    <Card className="mb-8">
      <CardHeader>
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <CardTitle className="text-xl font-bold text-gray-900 flex items-center gap-2">
              <Users className="w-5 h-5 text-blue-600" />
              Benutzerverwaltung
            </CardTitle>
            <CardDescription>
              Verwalten Sie alle registrierten Benutzer und deren Konten
            </CardDescription>
          </div>
          <div className="flex flex-col sm:flex-row gap-2">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                placeholder="Benutzer suchen..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 w-full sm:w-64"
              />
            </div>
            <Button variant="outline" size="sm" onClick={() => setSelectedFilter(selectedFilter === 'all' ? 'admin' : 'all')}>
              <Filter className="w-4 h-4 mr-2" />
              {selectedFilter === 'all' ? 'Alle' : selectedFilter === 'admin' ? 'Admins' : 'Filter'}
            </Button>
            <Button variant="outline" size="sm" onClick={handleRefresh}>
              <RefreshCw className="w-4 h-4 mr-2" />
              Aktualisieren
            </Button>
            <Button variant="outline" size="sm" onClick={exportUsers}>
              <Download className="w-4 h-4 mr-2" />
              Export
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <div className="flex justify-center items-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
          </div>
        ) : (
          <div className="overflow-x-auto">
            {filteredUsers.length === 0 ? (
              <div className="text-center py-8 text-gray-500">
                {searchTerm ? 'Keine Benutzer gefunden, die Ihren Suchkriterien entsprechen.' : 'Keine Benutzer vorhanden.'}
              </div>
            ) : (
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left py-3 px-4 font-medium text-gray-700">Benutzer</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-700">Rolle</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-700">Status</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-700">Registriert am</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-700">Aktionen</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredUsers.map((user) => (
                    <tr key={user.id} className="border-b border-gray-100 hover:bg-gray-50">
                      <td className="py-4 px-4">
                        <div>
                          <div className="font-medium text-gray-900">{user.name || `${user.firstName || ''} ${user.lastName || ''}`}</div>
                          <div className="text-sm text-gray-500">{user.email}</div>
                          <div className="text-xs text-gray-400">{user.company || 'Keine Firma angegeben'}</div>
                        </div>
                      </td>
                      <td className="py-4 px-4">
                        {getRoleBadge(user.role)}
                      </td>
                      <td className="py-4 px-4">
                        {getStatusBadge(user)}
                      </td>
                      <td className="py-4 px-4">
                        <span className="text-sm text-gray-600">{formatDate(user.createdAt)}</span>
                      </td>
                      <td className="py-4 px-4">
                        <div className="flex items-center space-x-2">
                          <Button variant="ghost" size="sm" onClick={() => handleViewUser(user)}>
                            <Eye className="w-4 h-4" />
                          </Button>
                          <Button variant="ghost" size="sm" onClick={() => handleEditUser(user)}>
                            <Edit className="w-4 h-4" />
                          </Button>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="sm">
                                <MoreHorizontal className="w-4 h-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuLabel>Aktionen</DropdownMenuLabel>
                              <DropdownMenuSeparator />
                              {user.role === 'user' ? (
                                <DropdownMenuItem onClick={() => toggleUserRole(user.id, true)}>
                                  <Shield className="w-4 h-4 mr-2" />
                                  <span>Zum Admin machen</span>
                                </DropdownMenuItem>
                              ) : (
                                <DropdownMenuItem onClick={() => toggleUserRole(user.id, false)}>
                                  <ShieldOff className="w-4 h-4 mr-2" />
                                  <span>Admin-Rechte entziehen</span>
                                </DropdownMenuItem>
                              )}
                              <DropdownMenuItem onClick={() => handleDeleteUser(user)}>
                                <Trash2 className="w-4 h-4 mr-2 text-red-500" />
                                <span className="text-red-500">Löschen</span>
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        )}
      </CardContent>

      {/* View User Dialog */}
      <Dialog open={isViewDialogOpen} onOpenChange={setIsViewDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Benutzerdetails</DialogTitle>
            <DialogDescription>
              Vollständige Informationen zum Benutzer
            </DialogDescription>
          </DialogHeader>
          
          {selectedUser && (
            <div className="space-y-4">
              <div className="flex justify-center mb-4">
                <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white text-xl font-bold">
                  {selectedUser.firstName?.charAt(0) || selectedUser.name?.charAt(0) || 'U'}
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm font-medium text-gray-500">Name</p>
                  <p className="text-gray-900">{selectedUser.name || `${selectedUser.firstName || ''} ${selectedUser.lastName || ''}`}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">E-Mail</p>
                  <p className="text-gray-900">{selectedUser.email}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">Firma</p>
                  <p className="text-gray-900">{selectedUser.company || 'Nicht angegeben'}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">Telefon</p>
                  <p className="text-gray-900">{selectedUser.phone || 'Nicht angegeben'}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">Rolle</p>
                  <p className="text-gray-900">{getRoleBadge(selectedUser.role)}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">Status</p>
                  <p className="text-gray-900">{getStatusBadge(selectedUser)}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">Plan</p>
                  <p className="text-gray-900">{selectedUser.plan || 'Standard'}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">Registriert am</p>
                  <p className="text-gray-900">{formatDate(selectedUser.createdAt)}</p>
                </div>
              </div>
            </div>
          )}
          
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Schließen</Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete User Confirmation Dialog */}
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Benutzer löschen</DialogTitle>
            <DialogDescription>
              Sind Sie sicher, dass Sie diesen Benutzer löschen möchten? Diese Aktion kann nicht rückgängig gemacht werden.
            </DialogDescription>
          </DialogHeader>
          
          {selectedUser && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-4">
              <p className="font-medium text-red-800">{selectedUser.name || selectedUser.email}</p>
              <p className="text-sm text-red-700">{selectedUser.email}</p>
              {selectedUser.isDefaultUser && (
                <p className="text-sm text-red-600 mt-2 font-medium">
                  Warnung: Dies ist ein System-Benutzer. Das Löschen kann zu Problemen führen.
                </p>
              )}
            </div>
          )}
          
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Abbrechen</Button>
            </DialogClose>
            <Button variant="destructive" onClick={confirmDeleteUser}>
              Löschen bestätigen
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </Card>
  )
}

export default UserManagement
