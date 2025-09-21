import { useState } from 'react'
import { 
  LayoutDashboard, 
  Target, 
  BarChart3, 
  Settings, 
  CreditCard, 
  Users, 
  HelpCircle,
  LogOut,
  Menu,
  X,
  Bell,
  Search,
  Plus
} from 'lucide-react'
import { Button } from '@/components/ui/button.jsx'
import { Input } from '@/components/ui/input.jsx'
import { Badge } from '@/components/ui/badge.jsx'
import FullLogo from '../../assets/Logo-socialmediakampagnen-voll.png'

const DashboardLayout = ({ children, currentPage = 'dashboard' }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  const navigation = [
    { name: 'Dashboard', href: 'dashboard', icon: LayoutDashboard, current: currentPage === 'dashboard' },
    { name: 'Kampagnen', href: 'campaigns', icon: Target, current: currentPage === 'campaigns' },
    { name: 'Analytics', href: 'analytics', icon: BarChart3, current: currentPage === 'analytics' },
    { name: 'Abonnement', href: 'billing', icon: CreditCard, current: currentPage === 'billing' },
    { name: 'Team', href: 'team', icon: Users, current: currentPage === 'team' },
    { name: 'Einstellungen', href: 'settings', icon: Settings, current: currentPage === 'settings' },
  ]

  const userNavigation = [
    { name: 'Profil', href: '#' },
    { name: 'Einstellungen', href: '#' },
    { name: 'Abmelden', href: '#' },
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Mobile sidebar */}
      <div className={`fixed inset-0 flex z-40 lg:hidden ${sidebarOpen ? '' : 'pointer-events-none'}`}>
        <div className={`fixed inset-0 bg-gray-600 bg-opacity-75 transition-opacity ${sidebarOpen ? 'opacity-100' : 'opacity-0'}`} onClick={() => setSidebarOpen(false)} />
        
        <div className={`relative flex-1 flex flex-col max-w-xs w-full bg-white transform transition-transform ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
          <div className="absolute top-0 right-0 -mr-12 pt-2">
            <button
              type="button"
              className="ml-1 flex items-center justify-center h-10 w-10 rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
              onClick={() => setSidebarOpen(false)}
            >
              <X className="h-6 w-6 text-white" />
            </button>
          </div>
          
          <div className="flex-1 h-0 pt-5 pb-4 overflow-y-auto">
            <div className="flex-shrink-0 flex items-center px-4">
              <img src={FullLogo} alt="socialmediakampagnen.com Logo" className="h-8 w-auto" />
            </div>
            <nav className="mt-5 px-2 space-y-1">
              {navigation.map((item) => (
                <a
                  key={item.name}
                  href={`#${item.href}`}
                  className={`group flex items-center px-2 py-2 text-base font-medium rounded-md transition-colors ${
                    item.current
                      ? 'bg-purple-100 text-purple-900'
                      : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                  }`}
                >
                  <item.icon className={`mr-4 h-6 w-6 ${item.current ? 'text-purple-500' : 'text-gray-400 group-hover:text-gray-500'}`} />
                  {item.name}
                </a>
              ))}
            </nav>
          </div>
          
          <div className="flex-shrink-0 flex border-t border-gray-200 p-4">
            <div className="flex items-center">
              <div className="w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center">
                <span className="text-sm font-medium text-white">JD</span>
              </div>
              <div className="ml-3">
                <p className="text-sm font-medium text-gray-700">John Doe</p>
                <p className="text-xs text-gray-500">Pro Plan</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Static sidebar for desktop */}
      <div className="hidden lg:flex lg:w-64 lg:flex-col lg:fixed lg:inset-y-0">
        <div className="flex-1 flex flex-col min-h-0 border-r border-gray-200 bg-white">
          <div className="flex-1 flex flex-col pt-5 pb-4 overflow-y-auto">
            <div className="flex items-center flex-shrink-0 px-4">
              <img src={FullLogo} alt="socialmediakampagnen.com Logo" className="h-8 w-auto" />
            </div>
            <nav className="mt-5 flex-1 px-2 space-y-1">
              {navigation.map((item) => (
                <a
                  key={item.name}
                  href={`#${item.href}`}
                  className={`group flex items-center px-2 py-2 text-sm font-medium rounded-md transition-colors ${
                    item.current
                      ? 'bg-purple-100 text-purple-900'
                      : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                  }`}
                >
                  <item.icon className={`mr-3 h-5 w-5 ${item.current ? 'text-purple-500' : 'text-gray-400 group-hover:text-gray-500'}`} />
                  {item.name}
                </a>
              ))}
            </nav>
          </div>
          
          <div className="flex-shrink-0 flex border-t border-gray-200 p-4">
            <div className="flex items-center w-full">
              <div className="w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center">
                <span className="text-sm font-medium text-white">JD</span>
              </div>
              <div className="ml-3 flex-1">
                <p className="text-sm font-medium text-gray-700">John Doe</p>
                <p className="text-xs text-gray-500">Pro Plan</p>
              </div>
              <Button variant="ghost" size="sm">
                <LogOut className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="lg:pl-64 flex flex-col flex-1">
        {/* Top navigation */}
        <div className="sticky top-0 z-10 lg:hidden pl-1 pt-1 sm:pl-3 sm:pt-3 bg-white border-b border-gray-200">
          <button
            type="button"
            className="-ml-0.5 -mt-0.5 h-12 w-12 inline-flex items-center justify-center rounded-md text-gray-500 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-purple-500"
            onClick={() => setSidebarOpen(true)}
          >
            <Menu className="h-6 w-6" />
          </button>
        </div>

        {/* Desktop top bar */}
        <div className="hidden lg:flex lg:items-center lg:justify-between lg:px-6 lg:py-4 bg-white border-b border-gray-200">
          <div className="flex-1 flex items-center">
            <div className="max-w-lg w-full lg:max-w-xs">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Search className="h-5 w-5 text-gray-400" />
                </div>
                <Input
                  className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-purple-500 focus:border-purple-500"
                  placeholder="Kampagnen suchen..."
                  type="search"
                />
              </div>
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            <Button className="brand-gradient text-white">
              <Plus className="w-4 h-4 mr-2" />
              Neue Kampagne
            </Button>
            
            <button className="p-2 text-gray-400 hover:text-gray-500 relative">
              <Bell className="h-6 w-6" />
              <Badge className="absolute -top-1 -right-1 w-5 h-5 text-xs bg-red-500 text-white rounded-full flex items-center justify-center">
                3
              </Badge>
            </button>
            
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center">
                <span className="text-sm font-medium text-white">JD</span>
              </div>
              <div className="hidden md:block">
                <p className="text-sm font-medium text-gray-700">John Doe</p>
                <p className="text-xs text-gray-500">Pro Plan</p>
              </div>
            </div>
          </div>
        </div>

        {/* Page content */}
        <main className="flex-1 pb-8">
          {children}
        </main>
      </div>
    </div>
  )
}

export default DashboardLayout

