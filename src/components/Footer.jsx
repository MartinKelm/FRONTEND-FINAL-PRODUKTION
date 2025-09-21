import React from 'react'
import { Facebook, Instagram, Youtube, Twitter } from 'lucide-react'

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-12 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <img src="/src/assets/Logo-socialmediakampagnen-voll.png" alt="socialmediakampagnen.com" className="h-8 w-auto" />
            <p className="text-gray-400 text-sm">
              Ihre professionelle Lösung für Social Media Marketing. 
              Erstellen Sie erfolgreiche Kampagnen ohne technisches Know-how.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-blue-500 transition-colors">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-pink-500 transition-colors">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-red-500 transition-colors">
                <Youtube className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-blue-400 transition-colors">
                <Twitter className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Product */}
          <div className="space-y-4">
            <h4 className="text-base font-semibold text-white">Produkt</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Features</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Preise</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Integrationen</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">API</a></li>
            </ul>
          </div>

          {/* Support */}
          <div className="space-y-4">
            <h4 className="text-base font-semibold text-white">Support</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Hilfe Center</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">FAQ</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Kontakt</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Status</a></li>
            </ul>
          </div>

          {/* Legal */}
          <div className="space-y-4">
            <h4 className="text-base font-semibold text-white">Rechtliches</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Datenschutz</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Impressum</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">AGB</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Cookies</a></li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 mt-8 pt-8 flex flex-col sm:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm">
            © 2024 socialmediakampagnen.com. Alle Rechte vorbehalten.
          </p>
          <div className="flex space-x-6 mt-4 sm:mt-0">
            <span className="text-gray-400 text-sm">🇩🇪 Deutschland</span>
            <span className="text-gray-400 text-sm">DSGVO-konform</span>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer

