import { useState, useEffect } from 'react'
import Image from 'next/image'
import data from '../public/data.json'

export default function Hero(): JSX.Element {
  const [currentPhraseIndex, setCurrentPhraseIndex] = useState<number>(0)
  const [currentText, setCurrentText] = useState<string>('')
  const [isTyping, setIsTyping] = useState<boolean>(true)
  const [showCaret, setShowCaret] = useState<boolean>(true)

  const phrases: string[] = data.profile.animatedPhrases
  
  useEffect(() => {
    const caretTimer: NodeJS.Timeout = setInterval(() => {
      setShowCaret(prev => !prev)
    }, 530)

    return () => clearInterval(caretTimer)
  }, [])

  useEffect(() => {
    let timer: NodeJS.Timeout

    if (isTyping) {
      const targetPhrase = phrases[currentPhraseIndex]
      if (currentText.length < targetPhrase.length) {
        timer = setTimeout(() => {
          setCurrentText(targetPhrase.slice(0, currentText.length + 1))
        }, 100)
      } else {
        timer = setTimeout(() => {
          setIsTyping(false)
        }, 2000)
      }
    } else {
      if (currentText.length > 0) {
        timer = setTimeout(() => {
          setCurrentText(currentText.slice(0, -1))
        }, 50)
      } else {
        setCurrentPhraseIndex((prev) => (prev + 1) % phrases.length)
        setIsTyping(true)
      }
    }

    return () => clearTimeout(timer)
  }, [currentText, isTyping, currentPhraseIndex, phrases])

  return (
    <section className="min-h-screen flex items-center justify-center relative overflow-hidden neural-bg" aria-label="Hero section">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
          <div className="flex-1 text-center lg:text-left">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              <span className="gradient-text">{data.profile.fullName}</span>
            </h1>
            
            <div className="text-xl md:text-2xl lg:text-3xl mb-6 min-h-[2em] flex items-center justify-center lg:justify-start" style={{color: 'rgb(var(--text-secondary))'}}>
              <span>
                {currentText}
                <span 
                  className="ml-1 inline-block w-0.5 h-6 md:h-8"
                  style={{
                    backgroundColor: 'rgb(var(--accent-color))',
                    opacity: showCaret ? 1 : 0,
                    transition: 'opacity 0.1s ease-in-out'
                  }}
                />
              </span>
            </div>
            
            <p className="text-lg mb-8 max-w-2xl mx-auto lg:mx-0" style={{color: 'rgb(var(--text-muted))'}}>
              {data.profile.shortBio}
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <a
                href={data.profile.resumeFile}
                download
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-4 rounded-xl text-lg font-semibold transition-all duration-300 transform hover:scale-105 hover:shadow-lg"
                aria-label="Download resume PDF"
              >
                Download Resume
              </a>
              
              <a
                href="#projects"
                className="border-2 px-8 py-4 rounded-xl text-lg font-semibold transition-all duration-300 transform hover:scale-105"
                style={{
                  borderColor: 'var(--card-border)',
                  color: 'rgb(var(--text-secondary))'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = 'rgb(var(--text-primary))'
                  e.currentTarget.style.color = 'rgb(var(--text-primary))'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = 'var(--card-border)'
                  e.currentTarget.style.color = 'rgb(var(--text-secondary))'
                }}
                aria-label="View projects section"
              >
                View Projects
              </a>
            </div>
          </div>
          
          <div className="flex-shrink-0 order-first lg:order-last">
            <div className="w-56 h-56 lg:w-64 lg:h-64 relative">
              <div className="absolute inset-0 professional-avatar-bg opacity-90" />
              <div className="absolute inset-4 rounded-2xl overflow-hidden shadow-2xl" style={{backgroundColor: 'var(--card-bg)', border: '2px solid var(--card-border)'}}>
                <Image
                  src={data.profile.avatar}
                  alt={`${data.profile.fullName} profile picture`}
                  fill
                  className="object-cover"
                  priority
                />
              </div>
              <div className="absolute -top-2 -right-2 w-6 h-6 bg-gradient-to-r from-green-400 to-blue-500 rounded-full animate-pulse" title="Available for opportunities" />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}