import React from 'react'
import { useTranslation } from 'react-i18next'
import { Globe } from 'lucide-react'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select.jsx'

const LanguageSwitcher = () => {
  const { i18n } = useTranslation()

  const languages = [
    { code: 'de', name: 'Deutsch', flag: '🇩🇪' },
    { code: 'en', name: 'English', flag: '🇬🇧' },
    { code: 'es', name: 'Español', flag: '🇪🇸' },
    { code: 'pt', name: 'Português', flag: '🇵🇹' },
    { code: 'fr', name: 'Français', flag: '🇫🇷' }
  ]

  const currentLanguage = languages.find(lang => lang.code === i18n.language) || languages[0]

  const changeLanguage = (languageCode) => {
    i18n.changeLanguage(languageCode)
  }

  return (
    <Select value={i18n.language} onValueChange={changeLanguage}>
      <SelectTrigger className="w-auto min-w-[120px] bg-white border-gray-200 hover:bg-gray-50">
        <div className="flex items-center space-x-2">
          <Globe className="w-4 h-4 text-gray-600" />
          <span className="text-sm font-medium text-gray-700">
            {currentLanguage.flag} {currentLanguage.name}
          </span>
        </div>
      </SelectTrigger>
      <SelectContent>
        {languages.map((language) => (
          <SelectItem key={language.code} value={language.code}>
            <div className="flex items-center space-x-2">
              <span>{language.flag}</span>
              <span>{language.name}</span>
            </div>
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}

export default LanguageSwitcher

