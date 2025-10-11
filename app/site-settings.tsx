'use client'

import { useEffect } from 'react'

interface SiteSettings {
  siteName: string
  siteTitle: string
  siteDescription: string
  siteUrl: string
  faviconUrl: string
  logoUrl: string
  seo: {
    metaTitle: string
    metaDescription: string
    keywords: string
    ogImage: string
  }
}

export default function SiteSettings() {
  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const response = await fetch('/api/settings')
        const settings: SiteSettings = await response.json()
        
        // Update document title
        if (settings.seo?.metaTitle) {
          document.title = settings.seo.metaTitle
        } else if (settings.siteTitle) {
          document.title = settings.siteTitle
        }
        
        // Update meta description
        const metaDescription = document.querySelector('meta[name="description"]')
        if (metaDescription) {
          metaDescription.setAttribute('content', settings.seo?.metaDescription || settings.siteDescription || '')
        }
        
        // Update meta keywords
        const metaKeywords = document.querySelector('meta[name="keywords"]')
        if (metaKeywords) {
          metaKeywords.setAttribute('content', settings.seo?.keywords || '')
        }
        
        // Update OG title
        const ogTitle = document.querySelector('meta[property="og:title"]')
        if (ogTitle) {
          ogTitle.setAttribute('content', settings.seo?.metaTitle || settings.siteTitle || '')
        }
        
        // Update OG description
        const ogDescription = document.querySelector('meta[property="og:description"]')
        if (ogDescription) {
          ogDescription.setAttribute('content', settings.seo?.metaDescription || settings.siteDescription || '')
        }
        
        // Update OG image
        const ogImage = document.querySelector('meta[property="og:image"]')
        if (ogImage) {
          ogImage.setAttribute('content', settings.seo?.ogImage || '/og-image.png')
        }
        
        // Update Twitter title
        const twitterTitle = document.querySelector('meta[name="twitter:title"]')
        if (twitterTitle) {
          twitterTitle.setAttribute('content', settings.seo?.metaTitle || settings.siteTitle || '')
        }
        
        // Update Twitter description
        const twitterDescription = document.querySelector('meta[name="twitter:description"]')
        if (twitterDescription) {
          twitterDescription.setAttribute('content', settings.seo?.metaDescription || settings.siteDescription || '')
        }
        
        // Update favicon (handle multiple formats)
        if (settings.faviconUrl) {
          // Remove existing favicons
          const existingFavicons = document.querySelectorAll('link[rel*="icon"]')
          existingFavicons.forEach(favicon => favicon.remove())
          
          // Add cache-busting timestamp
          const timestamp = Date.now()
          const faviconUrlWithCache = `${settings.faviconUrl}?t=${timestamp}`
          
          // Create new favicon link
          const favicon = document.createElement('link')
          favicon.rel = 'icon'
          favicon.type = settings.faviconUrl.endsWith('.ico') ? 'image/x-icon' : 'image/png'
          favicon.href = faviconUrlWithCache
          
          // Add to head
          document.head.appendChild(favicon)
          
          // Also add apple-touch-icon for iOS
          const appleTouchIcon = document.createElement('link')
          appleTouchIcon.rel = 'apple-touch-icon'
          appleTouchIcon.href = faviconUrlWithCache
          document.head.appendChild(appleTouchIcon)
          
          // Force browser to refresh favicon
          setTimeout(() => {
            const tempFavicon = document.createElement('link')
            tempFavicon.rel = 'shortcut icon'
            tempFavicon.href = faviconUrlWithCache
            document.head.appendChild(tempFavicon)
            setTimeout(() => tempFavicon.remove(), 100)
          }, 100)
          
          console.log('Favicon updated to:', faviconUrlWithCache)
        }
        
        // Update canonical URL
        const canonical = document.querySelector('link[rel="canonical"]') as HTMLLinkElement
        if (canonical && settings.siteUrl) {
          canonical.href = settings.siteUrl
        }
        
      } catch (error) {
        console.error('Error fetching site settings:', error)
      }
    }
    
    fetchSettings()
  }, [])
  
  return null // This component doesn't render anything
}
