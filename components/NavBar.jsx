import { useState, useEffect } from 'react'
import Link from 'next/link'
import data from '../public/data.json'

export default function NavBar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [theme, setTheme] = useState('dark')

  useEffect(() => {
    const savedTheme = localStorage.getItem('site-theme') || 'dark'
    setTheme(savedTheme)
    document.documentElement.setAttribute('data-theme', savedTheme)
  }, [])

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const toggleTheme = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark'
    setTheme(newTheme)
    localStorage.setItem('site-theme', newTheme)
    document.documentElement.setAttribute('data-theme', newTheme)
  }

  const navLinks = [
    { href: '#about', label: 'About' },
    { href: '#education', label: 'Education' },
    { href: '#projects', label: 'Projects' },
    { href: '#contact', label: 'Contact' }
  ]

  return (
    <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${
      isScrolled ? 'glassmorphism shadow-lg' : 'bg-transparent'
    }`} aria-label="Main navigation">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          <Link href="/" className="text-2xl font-bold gradient-text">
            {data.profile.fullName}
          </Link>

          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map(({ href, label }) => (
              <a
                key={href}
                href={href}
                className="transition-colors duration-200 hover:scale-105 transform"
                style={{
                  color: 'rgb(var(--text-secondary))'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.color = 'rgb(var(--text-primary))'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color = 'rgb(var(--text-secondary))'
                }}
              >
                {label}
              </a>
            ))}
            
            <button
              onClick={toggleTheme}
              className="px-4 py-2 rounded-lg transition-all duration-200 hover:scale-105 transform focus:outline-none focus:ring-2"
              style={{
                backgroundColor: 'var(--card-bg)',
                color: 'rgb(var(--text-primary))',
                border: '1px solid var(--card-border)',
                boxShadow: `0 0 0 0px rgb(var(--accent-color))`
              }}
              onFocus={(e) => {
                e.currentTarget.style.boxShadow = `0 0 0 2px rgb(var(--accent-color))`
              }}
              onBlur={(e) => {
                e.currentTarget.style.boxShadow = `0 0 0 0px rgb(var(--accent-color))`
              }}
              aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} theme`}
            >
              {theme === 'dark' ? 'Light' : 'Dark'}
            </button>
          </div>

          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden focus:outline-none focus:ring-2 rounded p-1"
            style={{
              color: 'rgb(var(--text-primary))',
              boxShadow: `0 0 0 0px rgb(var(--accent-color))`
            }}
            onFocus={(e) => {
              e.currentTarget.style.boxShadow = `0 0 0 2px rgb(var(--accent-color))`
            }}
            onBlur={(e) => {
              e.currentTarget.style.boxShadow = `0 0 0 0px rgb(var(--accent-color))`
            }}
            aria-label="Toggle mobile menu"
            aria-expanded={isMobileMenuOpen}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {isMobileMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {isMobileMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 glassmorphism rounded-lg mb-4">
              {navLinks.map(({ href, label }) => (
                <a
                  key={href}
                  href={href}
                  className="block px-3 py-2 text-gray-300 hover:text-white transition-colors duration-200"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {label}
                </a>
              ))}
              <button
                onClick={toggleTheme}
                className="block w-full text-left px-3 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-lg transition-all duration-200"
                aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} theme`}
              >
                {theme === 'dark' ? 'Light Mode' : 'Dark Mode'}
              </button>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}
