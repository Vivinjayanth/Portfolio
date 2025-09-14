const analyticsConfig = {
  google: {
    measurementId: process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID || 'GA_MEASUREMENT_ID_PLACEHOLDER',
    enabled: process.env.NODE_ENV === 'production' && process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID,
    trackingEvents: {
      pageView: true,
      downloads: true,
      contactForm: true,
      projectClicks: true,
      socialLinks: true,
      resumeDownload: true
    },
    customDimensions: {
      userType: 'custom_dimension_1',
      deviceType: 'custom_dimension_2',
      trafficSource: 'custom_dimension_3'
    }
  },
  
  vercel: {
    enabled: process.env.NODE_ENV === 'production',
    collectAutomatically: true
  },
  
  hotjar: {
    hjid: process.env.NEXT_PUBLIC_HOTJAR_ID || 'HOTJAR_ID_PLACEHOLDER',
    enabled: process.env.NODE_ENV === 'production' && process.env.NEXT_PUBLIC_HOTJAR_ID,
    hjsv: 6
  },
  
  umami: {
    websiteId: process.env.NEXT_PUBLIC_UMAMI_WEBSITE_ID || 'UMAMI_WEBSITE_ID_PLACEHOLDER',
    enabled: process.env.NODE_ENV === 'production' && process.env.NEXT_PUBLIC_UMAMI_WEBSITE_ID,
    scriptUrl: 'https://analytics.umami.is/script.js',
    autoTrack: true
  },
  
  plausible: {
    domain: process.env.NEXT_PUBLIC_PLAUSIBLE_DOMAIN || 'your-domain.com',
    enabled: process.env.NODE_ENV === 'production' && process.env.NEXT_PUBLIC_PLAUSIBLE_DOMAIN,
    apiHost: 'https://plausible.io'
  },
  
  privacy: {
    respectDNT: true,
    cookieConsent: true,
    anonymizeIPs: true,
    dataRetentionMonths: 14
  },
  
  events: {
    portfolio: {
      PROJECT_VIEW: 'project_view',
      PROJECT_DEMO: 'project_demo',
      RESUME_DOWNLOAD: 'resume_download',
      CONTACT_CLICK: 'contact_click',
      SOCIAL_CLICK: 'social_click',
      SKILL_HOVER: 'skill_hover',
      SECTION_VIEW: 'section_view'
    },
    engagement: {
      SCROLL_DEPTH: 'scroll_depth',
      TIME_ON_PAGE: 'time_on_page',
      EXTERNAL_LINK: 'external_link',
      INTERNAL_NAVIGATION: 'internal_navigation'
    }
  },
  
  goals: {
    CONTACT_GOAL: {
      name: 'Contact Form Submission',
      value: 10
    },
    RESUME_GOAL: {
      name: 'Resume Download',
      value: 5
    },
    PROJECT_GOAL: {
      name: 'Project Interest',
      value: 3
    }
  }
}

export const trackEvent = (eventName, properties = {}) => {
  if (typeof window === 'undefined') return
  
  try {
    if (analyticsConfig.google.enabled && window.gtag) {
      window.gtag('event', eventName, {
        event_category: properties.category || 'engagement',
        event_label: properties.label,
        value: properties.value,
        ...properties
      })
    }
    
    if (analyticsConfig.umami.enabled && window.umami) {
      window.umami.track(eventName, properties)
    }
    
    if (analyticsConfig.plausible.enabled && window.plausible) {
      window.plausible(eventName, { props: properties })
    }
    
    console.log(`📊 Analytics Event: ${eventName}`, properties)
  } catch (error) {
    console.warn('Analytics tracking error:', error)
  }
}

export const trackPageView = (url, title) => {
  if (typeof window === 'undefined') return
  
  try {
    if (analyticsConfig.google.enabled && window.gtag) {
      window.gtag('config', analyticsConfig.google.measurementId, {
        page_title: title,
        page_location: url
      })
    }
    
    if (analyticsConfig.umami.enabled) {
      window.umami.track(url)
    }
    
    if (analyticsConfig.plausible.enabled) {
      window.plausible('pageview', { u: url })
    }
  } catch (error) {
    console.warn('Page view tracking error:', error)
  }
}

export const initializeAnalytics = () => {
  if (typeof window === 'undefined') return
  
  if (analyticsConfig.google.enabled) {
    const script = document.createElement('script')
    script.src = `https://www.googletagmanager.com/gtag/js?id=${analyticsConfig.google.measurementId}`
    script.async = true
    document.head.appendChild(script)
    
    window.dataLayer = window.dataLayer || []
    function gtag() {
      window.dataLayer.push(arguments)
    }
    window.gtag = gtag
    gtag('js', new Date())
    gtag('config', analyticsConfig.google.measurementId, {
      anonymize_ip: analyticsConfig.privacy.anonymizeIPs,
      respect_dnt: analyticsConfig.privacy.respectDNT
    })
  }
  
  if (analyticsConfig.hotjar.enabled) {
    (function(h,o,t,j,a,r){
      h.hj=h.hj||function(){(h.hj.q=h.hj.q||[]).push(arguments)};
      h._hjSettings={hjid:analyticsConfig.hotjar.hjid,hjsv:analyticsConfig.hotjar.hjsv};
      a=o.getElementsByTagName('head')[0];
      r=o.createElement('script');r.async=1;
      r.src=t+h._hjSettings.hjid+j+h._hjSettings.hjsv;
      a.appendChild(r);
    })(window,document,'https://static.hotjar.com/c/hotjar-','.js?sv=');
  }
  
  if (analyticsConfig.umami.enabled) {
    const script = document.createElement('script')
    script.src = analyticsConfig.umami.scriptUrl
    script.setAttribute('data-website-id', analyticsConfig.umami.websiteId)
    script.async = true
    document.head.appendChild(script)
  }
  
  if (analyticsConfig.plausible.enabled) {
    const script = document.createElement('script')
    script.src = `${analyticsConfig.plausible.apiHost}/js/plausible.js`
    script.setAttribute('data-domain', analyticsConfig.plausible.domain)
    script.async = true
    document.head.appendChild(script)
  }
}

export default analyticsConfig
