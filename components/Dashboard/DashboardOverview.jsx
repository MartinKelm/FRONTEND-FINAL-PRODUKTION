import { 
  TrendingUp, 
  TrendingDown, 
  Eye, 
  MousePointer, 
  DollarSign, 
  Users,
  Target,
  BarChart3,
  Calendar,
  Plus,
  MoreHorizontal
} from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card.jsx'
import { Button } from '@/components/ui/button.jsx'
import { Badge } from '@/components/ui/badge.jsx'
import { Progress } from '@/components/ui/progress.jsx'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts'

const DashboardOverview = () => {
  // Produktions-Daten (werden von API geladen)
  const performanceData = []

  const campaignData = []

  const recentCampaigns = []

  const getStatusBadge = (status) => {
    const statusConfig = {
      active: { label: 'Aktiv', className: 'bg-green-100 text-green-800' },
      paused: { label: 'Pausiert', className: 'bg-yellow-100 text-yellow-800' },
      draft: { label: 'Entwurf', className: 'bg-gray-100 text-gray-800' },
      completed: { label: 'Beendet', className: 'bg-blue-100 text-blue-800' }
    }
    
    const config = statusConfig[status] || statusConfig.draft
    return <Badge className={config.className}>{config.label}</Badge>
  }

  return (
    <div className="px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
        <p className="mt-1 text-sm text-gray-500">
          Überblick über Ihre Kampagnen-Performance
        </p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 mb-8">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Gesamtausgaben</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">€7,215</div>
            <p className="text-xs text-muted-foreground">
              <TrendingUp className="inline w-3 h-3 mr-1 text-green-500" />
              +12.5% seit letztem Monat
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Impressionen</CardTitle>
            <Eye className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">95.8K</div>
            <p className="text-xs text-muted-foreground">
              <TrendingUp className="inline w-3 h-3 mr-1 text-green-500" />
              +8.2% seit letztem Monat
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Klicks</CardTitle>
            <MousePointer className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">7,482</div>
            <p className="text-xs text-muted-foreground">
              <TrendingDown className="inline w-3 h-3 mr-1 text-red-500" />
              -2.1% seit letztem Monat
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Konversionen</CardTitle>
            <Target className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">175</div>
            <p className="text-xs text-muted-foreground">
              <TrendingUp className="inline w-3 h-3 mr-1 text-green-500" />
              +15.3% seit letztem Monat
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <Card>
          <CardHeader>
            <CardTitle>Performance Übersicht</CardTitle>
            <CardDescription>Impressionen, Klicks und Konversionen der letzten 6 Monate</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={performanceData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="impressions" stroke="#8167f8" strokeWidth={2} />
                <Line type="monotone" dataKey="clicks" stroke="#bb9bff" strokeWidth={2} />
                <Line type="monotone" dataKey="conversions" stroke="#10b981" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Ausgaben nach Plattform</CardTitle>
            <CardDescription>Verteilung der Werbeausgaben</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={campaignData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="spend" fill="#8167f8" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Recent Campaigns */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle>Aktuelle Kampagnen</CardTitle>
            <CardDescription>Übersicht Ihrer laufenden und geplanten Kampagnen</CardDescription>
          </div>
          <Button className="brand-gradient text-white">
            <Plus className="w-4 h-4 mr-2" />
            Neue Kampagne
          </Button>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recentCampaigns.map((campaign) => (
              <div key={campaign.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                <div className="flex items-center space-x-4">
                  <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                    <Target className="w-5 h-5 text-purple-600" />
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900">{campaign.name}</h4>
                    <p className="text-sm text-gray-500">{campaign.platform}</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-6">
                  <div className="text-center">
                    <p className="text-sm font-medium text-gray-900">{campaign.budget}</p>
                    <p className="text-xs text-gray-500">Budget</p>
                  </div>
                  <div className="text-center">
                    <p className="text-sm font-medium text-gray-900">{campaign.spent}</p>
                    <p className="text-xs text-gray-500">Ausgegeben</p>
                  </div>
                  <div className="text-center">
                    <p className="text-sm font-medium text-gray-900">{campaign.impressions}</p>
                    <p className="text-xs text-gray-500">Impressionen</p>
                  </div>
                  <div className="text-center">
                    <p className="text-sm font-medium text-gray-900">{campaign.clicks}</p>
                    <p className="text-xs text-gray-500">Klicks</p>
                  </div>
                  <div className="text-center">
                    <p className="text-sm font-medium text-gray-900">{campaign.conversions}</p>
                    <p className="text-xs text-gray-500">Konversionen</p>
                  </div>
                  <div className="flex items-center space-x-2">
                    {getStatusBadge(campaign.status)}
                    <Button variant="ghost" size="sm">
                      <MoreHorizontal className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default DashboardOverview

