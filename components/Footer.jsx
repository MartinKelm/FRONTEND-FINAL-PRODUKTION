import React from 'react'
import { Facebook, Instagram, Youtube, Twitter } from 'lucide-react'
import FullLogo from '../assets/Logo-socialmediakampagnen-voll.png'

const Footer = ({ onNavigate, setAuthView }) => {
  const handleLegalClick = (page) => {
    setAuthView && setAuthView(null) // Clear auth view if it exists
    onNavigate(page)
  }

  return (
    <footer className="bg-gray-900 text-white py-12 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <img src={FullLogo} alt="socialmediakampagnen.com" className="h-8 w-auto" />
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
              <li><button onClick={() => handleLegalClick('features')} className="text-gray-400 hover:text-white transition-colors text-left">Features</button></li>
              <li><button onClick={() => handleLegalClick('pricing')} className="text-gray-400 hover:text-white transition-colors text-left">Preise</button></li>
              <li><button onClick={() => handleLegalClick('features')} className="text-gray-400 hover:text-white transition-colors text-left">Integrationen</button></li>
              <li><button onClick={() => handleLegalClick('contact')} className="text-gray-400 hover:text-white transition-colors text-left">API</button></li>
            </ul>
          </div>

          {/* Support */}
          <div className="space-y-4">
            <h4 className="text-base font-semibold text-white">Support</h4>
            <ul className="space-y-2 text-sm">
              <li><button onClick={() => handleLegalClick('faq')} className="text-gray-400 hover:text-white transition-colors text-left">Hilfe Center</button></li>
              <li><button onClick={() => handleLegalClick('faq')} className="text-gray-400 hover:text-white transition-colors text-left">FAQ</button></li>
              <li><button onClick={() => handleLegalClick('contact')} className="text-gray-400 hover:text-white transition-colors text-left">Kontakt</button></li>
              <li><button onClick={() => handleLegalClick('about')} className="text-gray-400 hover:text-white transition-colors text-left">Status</button></li>
            </ul>
          </div>

          {/* Legal */}
          <div className="space-y-4">
            <h4 className="text-base font-semibold text-white">Rechtliches</h4>
            <ul className="space-y-2 text-sm">
              <li><button onClick={() => handleLegalClick('privacy')} className="text-gray-400 hover:text-white transition-colors text-left">Datenschutz</button></li>
              <li><button onClick={() => handleLegalClick('impressum')} className="text-gray-400 hover:text-white transition-colors text-left">Impressum</button></li>
              <li><button onClick={() => handleLegalClick('terms')} className="text-gray-400 hover:text-white transition-colors text-left">AGB</button></li>
              <li><button onClick={() => handleLegalClick('privacy')} className="text-gray-400 hover:text-white transition-colors text-left">Cookies</button></li>
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

