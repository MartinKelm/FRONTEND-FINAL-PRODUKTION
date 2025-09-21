import React from 'react'
import { Heart, MessageCircle, Share, Play, ThumbsUp, ArrowUp, ArrowDown, MoreHorizontal } from 'lucide-react'

const PlatformPreviews = ({ campaignData, uploadedImages }) => {
  // Formatspezifische Bilder
  const getImageForPlatform = (platform) => {
    const formatMap = {
      facebook: 'square',
      instagram: 'square', 
      linkedin: 'square',
      tiktok: 'story',
      snapchat: 'story',
      youtube: 'landscape',
      google: 'landscape',
      reddit: 'landscape'
    }
    
    const format = formatMap[platform]
    const formatImage = uploadedImages.find(img => img.format === format)
    return formatImage?.url || '/api/placeholder/400/300'
  }
  
  const FacebookPreview = () => (
    <div className="bg-white rounded-lg border border-gray-200 overflow-hidden w-80 shadow-sm">
      {/* Facebook Header */}
      <div className="p-3 border-b border-gray-100">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-blue-700 rounded-full flex items-center justify-center shadow-sm">
            <span className="text-white font-bold text-sm">SMK</span>
          </div>
          <div className="flex-1">
            <div className="font-semibold text-gray-900 text-sm">Social Media Kampagnen</div>
            <div className="text-xs text-gray-500 flex items-center">
              <span>2 Std.</span>
              <span className="mx-1">·</span>
              <span>🌍</span>
              <span className="ml-1 bg-blue-50 text-blue-600 px-2 py-0.5 rounded text-xs font-medium">Gesponsert</span>
            </div>
          </div>
          <MoreHorizontal className="w-5 h-5 text-gray-400 hover:bg-gray-100 rounded-full p-1 cursor-pointer" />
        </div>
      </div>
      
      {/* Facebook Content */}
      <div className="p-3">
        <p className="text-gray-900 text-sm mb-3 leading-relaxed">
          {campaignData.content.headline || 'Ihre überzeugende Überschrift'}
        </p>
        <p className="text-gray-600 text-sm mb-3 leading-relaxed">
          {campaignData.content.description || 'Beschreibung Ihres Angebots'}
        </p>
      </div>
      
      {/* Facebook Image */}
      <div className="relative">
        <img src={getImageForPlatform('facebook')} alt="Campaign" className="w-full h-48 object-cover" />
        <div className="absolute bottom-2 right-2 bg-black bg-opacity-60 text-white text-xs px-2 py-1 rounded">
          socialmediakampagnen.com
        </div>
      </div>
      
      {/* Facebook Engagement */}
      <div className="px-3 py-2 border-b border-gray-100">
        <div className="flex items-center justify-between text-xs text-gray-500">
          <div className="flex items-center space-x-1">
            <div className="flex -space-x-1">
              <div className="w-4 h-4 bg-blue-500 rounded-full flex items-center justify-center">
                <ThumbsUp className="w-2 h-2 text-white" />
              </div>
              <div className="w-4 h-4 bg-red-500 rounded-full flex items-center justify-center">
                <Heart className="w-2 h-2 text-white" />
              </div>
            </div>
            <span>1.234</span>
          </div>
          <div className="flex items-center space-x-3">
            <span>89 Kommentare</span>
            <span>45 Mal geteilt</span>
          </div>
        </div>
      </div>
      
      {/* Facebook Actions */}
      <div className="p-3 border-b border-gray-100">
        <div className="flex items-center justify-between text-gray-500">
          <div className="flex items-center space-x-6">
            <div className="flex items-center space-x-1 hover:text-blue-600 cursor-pointer transition-colors">
              <ThumbsUp className="w-5 h-5" />
              <span className="text-sm font-medium">Gefällt mir</span>
            </div>
            <div className="flex items-center space-x-1 hover:text-blue-600 cursor-pointer transition-colors">
              <MessageCircle className="w-5 h-5" />
              <span className="text-sm font-medium">Kommentieren</span>
            </div>
            <div className="flex items-center space-x-1 hover:text-blue-600 cursor-pointer transition-colors">
              <Share className="w-5 h-5" />
              <span className="text-sm font-medium">Teilen</span>
            </div>
          </div>
        </div>
      </div>
      
      {/* Facebook CTA Button */}
      <div className="p-3">
        <button className="w-full bg-blue-600 text-white py-2.5 px-4 rounded-md text-sm font-semibold hover:bg-blue-700 transition-colors shadow-sm">
          {campaignData.content.callToAction || 'Mehr erfahren'}
        </button>
      </div>
    </div>
  )

  const InstagramPreview = () => (
    <div className="bg-white rounded-lg border border-gray-200 overflow-hidden w-80">
      {/* Instagram Header */}
      <div className="p-3 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-gradient-to-tr from-yellow-400 via-red-500 to-purple-600 rounded-full p-0.5">
            <div className="w-full h-full bg-white rounded-full flex items-center justify-center">
              <span className="text-xs font-bold text-gray-800">SMK</span>
            </div>
          </div>
          <div>
            <div className="font-semibold text-sm">socialmediakampagnen</div>
            <div className="text-xs text-gray-500">Gesponsert</div>
          </div>
        </div>
        <MoreHorizontal className="w-6 h-6 text-gray-800" />
      </div>
      
      {/* Instagram Image */}
      <div className="relative">
        <img src={getImageForPlatform('instagram')} alt="Campaign" className="w-full h-80 object-cover" />
      </div>
      
      {/* Instagram Actions */}
      <div className="p-3">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center space-x-4">
            <Heart className="w-6 h-6 text-gray-800 hover:text-red-500 cursor-pointer" />
            <MessageCircle className="w-6 h-6 text-gray-800 cursor-pointer" />
            <Share className="w-6 h-6 text-gray-800 cursor-pointer" />
          </div>
        </div>
        
        <div className="text-sm">
          <span className="font-semibold">socialmediakampagnen</span>
          <span className="ml-2 text-gray-800">
            {campaignData.content.headline || 'Ihre überzeugende Überschrift'} 
            {campaignData.content.description && ` ${campaignData.content.description}`}
          </span>
        </div>
        
        <button className="mt-3 w-full bg-blue-500 text-white py-2 px-4 rounded-md text-sm font-medium">
          {campaignData.content.callToAction || 'Mehr erfahren'}
        </button>
      </div>
    </div>
  )

  const YouTubePreview = () => (
    <div className="bg-white rounded-lg overflow-hidden w-80">
      {/* YouTube Thumbnail */}
      <div className="relative">
        <img src={getImageForPlatform('youtube')} alt="Campaign" className="w-full h-48 object-cover" />
        <div className="absolute inset-0 bg-black bg-opacity-20 flex items-center justify-center">
          <div className="bg-red-600 rounded-full p-3 hover:bg-red-700 cursor-pointer">
            <Play className="w-6 h-6 text-white fill-current" />
          </div>
        </div>
        <div className="absolute bottom-2 right-2 bg-black bg-opacity-80 text-white text-xs px-1 rounded">
          2:34
        </div>
      </div>
      
      {/* YouTube Content */}
      <div className="p-3">
        <h3 className="font-medium text-gray-900 text-sm mb-1 line-clamp-2">
          {campaignData.content.headline || 'Ihre überzeugende Video-Überschrift'}
        </h3>
        <div className="text-xs text-gray-600 mb-2">
          Social Media Kampagnen • 1.234 Aufrufe • vor 2 Stunden
        </div>
        <div className="flex items-center space-x-3">
          <div className="w-6 h-6 bg-red-600 rounded-full flex items-center justify-center">
            <span className="text-white text-xs font-bold">S</span>
          </div>
          <span className="text-xs text-gray-600">Social Media Kampagnen</span>
        </div>
        
        <button className="mt-3 w-full bg-red-600 text-white py-2 px-4 rounded text-sm font-medium hover:bg-red-700">
          {campaignData.content.callToAction || 'Jetzt ansehen'}
        </button>
      </div>
    </div>
  )

  const GoogleAdsPreview = () => (
    <div className="bg-white rounded-lg border border-gray-200 p-4 w-80">
      <div className="flex items-start space-x-3">
        <div className="flex-1">
          <div className="flex items-center space-x-2 mb-1">
            <span className="bg-green-100 text-green-800 text-xs px-2 py-0.5 rounded">Anzeige</span>
            <span className="text-green-600 text-sm">socialmediakampagnen.com</span>
          </div>
          <h3 className="text-blue-600 text-lg hover:underline cursor-pointer mb-1">
            {campaignData.content.headline || 'Ihre überzeugende Anzeigen-Überschrift'}
          </h3>
          <p className="text-gray-600 text-sm mb-2">
            {campaignData.content.description || 'Beschreibung Ihres Angebots für Google Ads'}
          </p>
          <div className="flex items-center space-x-4 text-sm text-gray-500">
            <span>★★★★★ 4.9 (127 Bewertungen)</span>
          </div>
        </div>
        {uploadedImages.length > 0 && (
          <img src={getImageForPlatform("google")} alt="Campaign" className="w-16 h-16 object-cover rounded" />
        )}
      </div>
    </div>
  )

  const TikTokPreview = () => (
    <div className="bg-black rounded-lg overflow-hidden mx-auto" style={{ width: '180px', height: '320px', aspectRatio: '9/16' }}>
      {/* TikTok Video */}
      <div className="relative h-full">
        <img src={getImageForPlatform('tiktok')} alt="Campaign" className="w-full h-full object-cover" />
        
        {/* TikTok Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent">
          {/* TikTok Actions */}
          <div className="absolute right-3 bottom-20 flex flex-col items-center space-y-4">
            <div className="text-center">
              <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center mb-1">
                <Heart className="w-6 h-6 text-red-500" />
              </div>
              <span className="text-white text-xs">12.3K</span>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center mb-1">
                <MessageCircle className="w-6 h-6 text-gray-800" />
              </div>
              <span className="text-white text-xs">1.2K</span>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center mb-1">
                <Share className="w-6 h-6 text-gray-800" />
              </div>
              <span className="text-white text-xs">Share</span>
            </div>
          </div>
          
          {/* TikTok Content */}
          <div className="absolute bottom-4 left-3 right-16">
            <div className="flex items-center space-x-2 mb-2">
              <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center">
                <span className="text-xs font-bold">SMK</span>
              </div>
              <span className="text-white font-semibold text-sm">@smk_kampagnen</span>
              <span className="bg-red-500 text-white text-xs px-2 py-0.5 rounded">Gesponsert</span>
            </div>
            <p className="text-white text-sm mb-2">
              {campaignData.content.headline || 'Ihre TikTok Kampagne'} 
              {campaignData.content.description && ` ${campaignData.content.description}`}
            </p>
            <button className="bg-white text-black px-4 py-1 rounded-full text-sm font-medium">
              {campaignData.content.callToAction || 'Mehr erfahren'}
            </button>
          </div>
        </div>
      </div>
    </div>
  )

  const SnapchatPreview = () => (
    <div className="bg-black rounded-lg overflow-hidden w-60 mx-auto" style={{ aspectRatio: '9/16', height: '320px' }}>
      <div className="relative h-full">
        <img src={getImageForPlatform('snapchat')} alt="Campaign" className="w-full h-full object-cover" />
        
        {/* Snapchat Overlay */}
        <div className="absolute inset-0">
          {/* Snapchat Header */}
          <div className="absolute top-4 left-4 right-4 flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-yellow-400 rounded-full flex items-center justify-center">
                <span className="text-black text-xs font-bold">SMK</span>
              </div>
              <span className="text-white font-semibold text-sm drop-shadow-lg">SMK Kampagnen</span>
            </div>
            <span className="bg-yellow-400 text-black text-xs px-2 py-1 rounded-full font-medium">Gesponsert</span>
          </div>
          
          {/* Snapchat Content */}
          <div className="absolute bottom-4 left-4 right-4">
            <div className="bg-black/50 rounded-lg p-3 backdrop-blur-sm">
              <h3 className="text-white font-semibold text-sm mb-1">
                {campaignData.content.headline || 'Ihre Snapchat Kampagne'}
              </h3>
              <p className="text-white/90 text-xs mb-3">
                {campaignData.content.description || 'Beschreibung für Snapchat'}
              </p>
              <button className="w-full bg-yellow-400 text-black py-2 px-4 rounded-full text-sm font-bold">
                {campaignData.content.callToAction || 'Swipe Up'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )

  const RedditPreview = () => (
    <div className="bg-white rounded border border-gray-300 w-80">
      {/* Reddit Header */}
      <div className="p-3 border-b border-gray-200">
        <div className="flex items-center space-x-2 text-xs text-gray-600">
          <span className="font-medium">r/socialmedia</span>
          <span>•</span>
          <span>Posted by u/SMK_Kampagnen</span>
          <span>•</span>
          <span>2h ago</span>
          <span className="bg-blue-100 text-blue-800 px-2 py-0.5 rounded text-xs ml-2">Promoted</span>
        </div>
      </div>
      
      {/* Reddit Content */}
      <div className="p-3">
        <h3 className="font-medium text-gray-900 mb-2">
          {campaignData.content.headline || 'Ihre Reddit Post Überschrift'}
        </h3>
        <p className="text-gray-700 text-sm mb-3">
          {campaignData.content.description || 'Beschreibung Ihres Reddit Posts'}
        </p>
        
        {uploadedImages.length > 0 && (
          <img src={getImageForPlatform("reddit")} alt="Campaign" className="w-full h-48 object-cover rounded mb-3" />
        )}
        
        <button className="bg-orange-500 text-white px-4 py-2 rounded text-sm font-medium hover:bg-orange-600">
          {campaignData.content.callToAction || 'Learn More'}
        </button>
      </div>
      
      {/* Reddit Actions */}
      <div className="px-3 pb-3">
        <div className="flex items-center space-x-4 text-gray-500 text-sm">
          <div className="flex items-center space-x-1">
            <ArrowUp className="w-4 h-4" />
            <span>1.2k</span>
            <ArrowDown className="w-4 h-4" />
          </div>
          <div className="flex items-center space-x-1">
            <MessageCircle className="w-4 h-4" />
            <span>234 Comments</span>
          </div>
          <div className="flex items-center space-x-1">
            <Share className="w-4 h-4" />
            <span>Share</span>
          </div>
        </div>
      </div>
    </div>
  )

  const LinkedInPreview = () => (
    <div className="bg-white rounded-lg border border-gray-200 overflow-hidden w-80 shadow-sm">
      {/* LinkedIn Header */}
      <div className="p-4 border-b border-gray-100">
        <div className="flex items-center space-x-3">
          <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-blue-700 rounded-full flex items-center justify-center shadow-sm">
            <span className="text-white font-bold text-sm">SMK</span>
          </div>
          <div className="flex-1">
            <div className="font-semibold text-gray-900 text-sm">Social Media Kampagnen</div>
            <div className="text-xs text-gray-500 mb-1">Marketing & Advertising</div>
            <div className="text-xs text-gray-500 flex items-center">
              <span>2h</span>
              <span className="mx-1">•</span>
              <span>🌍</span>
              <span className="ml-1 bg-yellow-100 text-yellow-800 px-2 py-0.5 rounded text-xs font-medium">Promoted</span>
            </div>
          </div>
          <MoreHorizontal className="w-5 h-5 text-gray-400 hover:bg-gray-100 rounded-full p-1 cursor-pointer" />
        </div>
      </div>
      
      {/* LinkedIn Content */}
      <div className="p-4">
        <p className="text-gray-900 text-sm mb-3 leading-relaxed">
          {campaignData.content.headline || 'Ihre professionelle LinkedIn Überschrift'}
        </p>
        <p className="text-gray-600 text-sm mb-4 leading-relaxed">
          {campaignData.content.description || 'Beschreibung Ihres Business-Angebots für LinkedIn'}
        </p>
        
        {/* LinkedIn Link Preview */}
        <div className="border border-gray-200 rounded-lg overflow-hidden">
          <img src={getImageForPlatform("linkedin")} alt="Campaign" className="w-full h-40 object-cover" />
          <div className="p-3 bg-gray-50">
            <div className="text-xs text-gray-500 mb-1">socialmediakampagnen.com</div>
            <div className="font-medium text-gray-900 text-sm mb-1">
              {campaignData.content.headline || 'Professional Social Media Campaigns'}
            </div>
            <div className="text-xs text-gray-600">
              Create professional campaigns without technical knowledge
            </div>
          </div>
        </div>
      </div>
      
      {/* LinkedIn Engagement */}
      <div className="px-4 py-2 border-b border-gray-100">
        <div className="flex items-center justify-between text-xs text-gray-500">
          <div className="flex items-center space-x-1">
            <div className="flex -space-x-1">
              <div className="w-4 h-4 bg-blue-600 rounded-full flex items-center justify-center">
                <ThumbsUp className="w-2 h-2 text-white" />
              </div>
              <div className="w-4 h-4 bg-green-600 rounded-full flex items-center justify-center">
                <span className="text-white text-xs">💡</span>
              </div>
            </div>
            <span>234 reactions</span>
          </div>
          <div className="flex items-center space-x-3">
            <span>45 comments</span>
            <span>12 reposts</span>
          </div>
        </div>
      </div>
      
      {/* LinkedIn Actions */}
      <div className="p-4">
        <div className="flex items-center justify-between text-gray-600 mb-3">
          <div className="flex items-center space-x-6">
            <div className="flex items-center space-x-1 hover:text-blue-600 cursor-pointer transition-colors">
              <ThumbsUp className="w-5 h-5" />
              <span className="text-sm font-medium">Like</span>
            </div>
            <div className="flex items-center space-x-1 hover:text-blue-600 cursor-pointer transition-colors">
              <MessageCircle className="w-5 h-5" />
              <span className="text-sm font-medium">Comment</span>
            </div>
            <div className="flex items-center space-x-1 hover:text-blue-600 cursor-pointer transition-colors">
              <Share className="w-5 h-5" />
              <span className="text-sm font-medium">Repost</span>
            </div>
          </div>
        </div>
        
        {/* LinkedIn CTA Button */}
        <button className="w-full bg-blue-600 text-white py-2.5 px-4 rounded-full text-sm font-semibold hover:bg-blue-700 transition-colors">
          {campaignData.content.callToAction || 'Learn More'}
        </button>
      </div>
    </div>
  )

  const platforms = {
    facebook: FacebookPreview,
    instagram: InstagramPreview,
    youtube: YouTubePreview,
    linkedin: LinkedInPreview,
    google: GoogleAdsPreview,
    tiktok: TikTokPreview,
    snapchat: SnapchatPreview,
    reddit: RedditPreview
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 max-w-full">
      {campaignData.channels.map((channelId) => {
        const PreviewComponent = platforms[channelId]
        return PreviewComponent ? (
          <div key={channelId} className="flex justify-center">
            <PreviewComponent />
          </div>
        ) : null
      })}
    </div>
  )
}

export default PlatformPreviews

