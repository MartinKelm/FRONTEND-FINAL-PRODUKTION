import React, { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card'
import { Badge } from '../ui/badge'
import { Button } from '../ui/button'
import { Input } from '../ui/input'
import { 
  Users, 
  CreditCard, 
  TrendingUp, 
  Activity, 
  Search, 
  Filter,
  MoreHorizontal,
  Shield,
  Eye,
  Edit,
  Trash2,
  Download,
  UserCheck,
  UserX,
  DollarSign,
  Calendar,
  BarChart3
} from 'lucide-react'

const AdminDashboard = ({ user }) => {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedFilter, setSelectedFilter] = useState('all')

  // Produktions-Daten (werden von API geladen)
  const stats = {
    totalUsers: 0,
    activeUsers: 0,
    totalRevenue: 0,
    monthlyGrowth: 0,
    activeCampaigns: 0,
    totalCampaigns: 0
  }

  const recentUsers = []

  const recentCampaigns = []

  const getStatusBadge = (status) => {
    const statusConfig = {
      active: { color: 'bg-green-100 text-green-800 border-green-200', label: 'Aktiv' },
      inactive: { color: 'bg-red-100 text-red-800 border-red-200', label: 'Inaktiv' },
      trial: { color: 'bg-yellow-100 text-yellow-800 border-yellow-200', label: 'Testphase' },
      paused: { color: 'bg-gray-100 text-gray-800 border-gray-200', label: 'Pausiert' }
    }
    const config = statusConfig[status] || statusConfig.inactive
    return <Badge className={config.color}>{config.label}</Badge>
  }

  const getPlanBadge = (plan) => {
    const planConfig = {
      Standard: { color: 'bg-blue-100 text-blue-800 border-blue-200' },
      Pro: { color: 'bg-purple-100 text-purple-800 border-purple-200' }
    }
    const config = planConfig[plan] || planConfig.Standard
    return <Badge className={config.color}>{plan}</Badge>
  }

  const getPerformanceBadge = (performance) => {
    const perfConfig = {
      excellent: { color: 'bg-green-100 text-green-800', label: 'Exzellent' },
      good: { color: 'bg-blue-100 text-blue-800', label: 'Gut' },
      average: { color: 'bg-yellow-100 text-yellow-800', label: 'Durchschnitt' },
      poor: { color: 'bg-red-100 text-red-800', label: 'Schlecht' }
    }
    const config = perfConfig[performance] || perfConfig.average
    return <Badge className={config.color}>{config.label}</Badge>
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 p-4 sm:p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center space-x-3 mb-2">
            <div className="w-10 h-10 bg-gradient-to-br from-red-500 to-pink-500 rounded-lg flex items-center justify-center">
              <Shield className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
                Admin Dashboard
              </h1>
              <p className="text-gray-600">Willkommen zurück, {user.name}</p>
            </div>
          </div>
          <div className="flex flex-wrap gap-2">
            <Badge className="bg-red-100 text-red-800 border-red-200">
              <Shield className="w-3 h-3 mr-1" />
              Administrator
            </Badge>
            <Badge className="bg-green-100 text-green-800 border-green-200">
              Vollzugriff
            </Badge>
            <Badge className="bg-blue-100 text-blue-800 border-blue-200">
              Alle Bereiche
            </Badge>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          <Card className="bg-gradient-to-br from-blue-500 to-blue-600 text-white">
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <CardTitle className="text-sm font-medium text-blue-100">
                  Gesamte Benutzer
                </CardTitle>
                <Users className="w-4 h-4 text-blue-200" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.totalUsers.toLocaleString()}</div>
              <div className="flex items-center space-x-2 mt-2">
                <Badge className="bg-white/20 text-white text-xs">
                  {stats.activeUsers} aktiv
                </Badge>
                <span className="text-xs text-blue-200">
                  +{stats.monthlyGrowth}% diesen Monat
                </span>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-green-500 to-green-600 text-white">
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <CardTitle className="text-sm font-medium text-green-100">
                  Gesamtumsatz
                </CardTitle>
                <DollarSign className="w-4 h-4 text-green-200" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">€{stats.totalRevenue.toLocaleString()}</div>
              <div className="flex items-center space-x-2 mt-2">
                <TrendingUp className="w-3 h-3 text-green-200" />
                <span className="text-xs text-green-200">
                  +{stats.monthlyGrowth}% vs. letzter Monat
                </span>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-purple-500 to-purple-600 text-white">
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <CardTitle className="text-sm font-medium text-purple-100">
                  Aktive Kampagnen
                </CardTitle>
                <Activity className="w-4 h-4 text-purple-200" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.activeCampaigns.toLocaleString()}</div>
              <div className="flex items-center space-x-2 mt-2">
                <Badge className="bg-white/20 text-white text-xs">
                  {stats.totalCampaigns} gesamt
                </Badge>
                <span className="text-xs text-purple-200">
                  Alle Plattformen
                </span>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Users Management */}
        <Card className="mb-8">
          <CardHeader>
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div>
                <CardTitle className="text-xl font-bold text-gray-900">
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
                <Button variant="outline" size="sm">
                  <Filter className="w-4 h-4 mr-2" />
                  Filter
                </Button>
                <Button variant="outline" size="sm">
                  <Download className="w-4 h-4 mr-2" />
                  Export
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left py-3 px-4 font-medium text-gray-700">Benutzer</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-700">Plan</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-700">Status</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-700">Umsatz</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-700">Letzter Login</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-700">Aktionen</th>
                  </tr>
                </thead>
                <tbody>
                  {recentUsers.map((user) => (
                    <tr key={user.id} className="border-b border-gray-100 hover:bg-gray-50">
                      <td className="py-4 px-4">
                        <div>
                          <div className="font-medium text-gray-900">{user.name}</div>
                          <div className="text-sm text-gray-500">{user.email}</div>
                          <div className="text-xs text-gray-400">{user.company}</div>
                        </div>
                      </td>
                      <td className="py-4 px-4">
                        {getPlanBadge(user.plan)}
                      </td>
                      <td className="py-4 px-4">
                        {getStatusBadge(user.status)}
                      </td>
                      <td className="py-4 px-4">
                        <span className="font-medium text-gray-900">
                          €{user.revenue}/Monat
                        </span>
                      </td>
                      <td className="py-4 px-4">
                        <span className="text-sm text-gray-600">{user.lastLogin}</span>
                      </td>
                      <td className="py-4 px-4">
                        <div className="flex items-center space-x-2">
                          <Button variant="ghost" size="sm">
                            <Eye className="w-4 h-4" />
                          </Button>
                          <Button variant="ghost" size="sm">
                            <Edit className="w-4 h-4" />
                          </Button>
                          <Button variant="ghost" size="sm">
                            <MoreHorizontal className="w-4 h-4" />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>

        {/* Campaign Overview */}
        <Card>
          <CardHeader>
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div>
                <CardTitle className="text-xl font-bold text-gray-900">
                  Kampagnen-Übersicht
                </CardTitle>
                <CardDescription>
                  Alle laufenden Kampagnen aller Benutzer
                </CardDescription>
              </div>
              <Button variant="outline" size="sm">
                <BarChart3 className="w-4 h-4 mr-2" />
                Detailanalyse
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentCampaigns.map((campaign) => (
                <div key={campaign.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50">
                  <div className="flex items-center space-x-4">
                    <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
                      <Activity className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-900">{campaign.name}</h4>
                      <p className="text-sm text-gray-500">von {campaign.user}</p>
                      <div className="flex flex-wrap gap-1 mt-1">
                        {campaign.platforms.map((platform, index) => (
                          <Badge key={index} className="bg-gray-100 text-gray-700 text-xs">
                            {platform}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-6">
                    <div className="text-center">
                      <p className="text-sm font-medium text-gray-900">€{campaign.budget.toLocaleString()}</p>
                      <p className="text-xs text-gray-500">Budget</p>
                    </div>
                    <div className="text-center">
                      <p className="text-sm font-medium text-gray-900">€{campaign.spent.toLocaleString()}</p>
                      <p className="text-xs text-gray-500">Ausgegeben</p>
                    </div>
                    <div className="text-center">
                      {getStatusBadge(campaign.status)}
                    </div>
                    <div className="text-center">
                      {getPerformanceBadge(campaign.performance)}
                    </div>
                    <Button variant="ghost" size="sm">
                      <MoreHorizontal className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default AdminDashboard

