'use client'

import { useEffect, useState } from 'react'
import SEO from '../components/SEO'
import NavBar from '../components/NavBar'
import Hero from '../components/Hero'
import ProjectCard from '../components/ProjectCard'
import ModelCard from '../components/ModelCard'
import Footer from '../components/Footer'
import type { PortfolioData } from '../types/portfolio'

export default function Home() {
  const [data, setData] = useState<PortfolioData | null>(null)
  const [loading, setLoading] = useState<boolean>(true)

  useEffect(() => {
    fetch('/data.json')
      .then(response => response.json())
      .then(data => {
        setData(data)
        setLoading(false)
      })
      .catch(error => {
        console.error('Error loading data:', error)
        setLoading(false)
      })
  }, [])

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    )
  }

  if (!data) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-white mb-4">Error Loading Portfolio</h2>
          <p className="text-gray-400">Please refresh the page or try again later.</p>
        </div>
      </div>
    )
  }

  return (
    <>
      <SEO />
      <NavBar />
      
      <main className="scroll-smooth">
        <Hero profile={data.profile} />
        
        <section id="about" className="py-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold gradient-text mb-6">About Me</h2>
              <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                {data.profile.shortBio}
              </p>
            </div>
            
            <div className="mb-16">
              <h3 className="text-2xl font-bold text-white mb-8 text-center">Skills & Technologies</h3>
              <div className="flex flex-wrap justify-center gap-3 max-w-4xl mx-auto">
                {data.profile.skills.map((skill, index) => (
                  <span
                    key={index}
                    className="px-4 py-2 bg-gray-800 text-blue-300 rounded-full border border-gray-600 hover:border-blue-500 hover:bg-blue-900/30 transition-all duration-300 transform hover:scale-105"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </section>
        
        <section id="projects" className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-900/30">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold gradient-text mb-6">Featured Projects</h2>
              <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                Explore my latest work in AI, machine learning, and data-driven solutions.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {data.projects.map((project) => (
                <ProjectCard key={project.id} project={project} />
              ))}
            </div>
          </div>
        </section>
        
        <section id="education" className="py-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold gradient-text mb-6">Education & Certifications</h2>
              <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                My academic journey and professional certifications in AI, ML, and cloud technologies.
              </p>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
              <div>
                <h3 className="text-2xl font-bold text-white mb-6">Education</h3>
                <div className="space-y-4">
                  {data.education.map((edu, index) => (
                    <ModelCard key={index} item={edu} type="education" />
                  ))}
                </div>
              </div>
              
              <div>
                <h3 className="text-2xl font-bold text-white mb-6">Certifications</h3>
                <div className="space-y-4">
                  {data.certifications.map((cert, index) => (
                    <ModelCard key={index} item={cert} type="certification" />
                  ))}
                </div>
              </div>
            </div>
            
            {data.publications && data.publications.length > 0 && (
              <div>
                <h3 className="text-2xl font-bold text-white mb-6 text-center">Publications & Presentations</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {data.publications.map((pub, index) => (
                    <div key={index} className="bg-gray-800/30 backdrop-blur-sm rounded-lg p-6 border border-gray-700 hover:border-gray-500 transition-all duration-300">
                      <h4 className="text-lg font-semibold text-white mb-2">{pub.title}</h4>
                      <p className="text-blue-400 text-sm mb-2">{pub.publisher}</p>
                      <p className="text-gray-400 text-sm mb-3">{pub.date}</p>
                      {pub.link && (
                        <a
                          href={pub.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-400 hover:text-blue-300 text-sm font-medium transition-colors duration-200"
                        >
                          Read Publication →
                        </a>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </section>
        
        <section id="contact" className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-900/30">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl font-bold gradient-text mb-6">Let's Connect</h2>
            <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
              I'm always interested in discussing new opportunities, innovative projects, or collaboration ideas.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
              <a
                href={`mailto:${data.contact.email}`}
                className="group bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-4 rounded-xl text-lg font-semibold transition-all duration-300 transform hover:scale-105 hover:shadow-lg flex items-center gap-2"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                Send Message
              </a>
              
              <a
                href="/resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="group border-2 border-gray-400 hover:border-white text-gray-300 hover:text-white px-8 py-4 rounded-xl text-lg font-semibold transition-all duration-300 transform hover:scale-105 flex items-center gap-2"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                Download Resume
              </a>
            </div>
            
            <div className="flex justify-center space-x-6">
              <a
                href={data.profile.social.github}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white transition-colors duration-200 transform hover:scale-110"
              >
                <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                </svg>
              </a>
              <a
                href={data.profile.social.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white transition-colors duration-200 transform hover:scale-110"
              >
                <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
              </a>
            </div>
          </div>
        </section>
      </main>
      
      <Footer profile={data.profile} contact={data.contact} />
    </>
  )
}
