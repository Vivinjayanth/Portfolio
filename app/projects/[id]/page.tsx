'use client'

import { useEffect, useState } from 'react'
import { useParams, notFound } from 'next/navigation'
import Link from 'next/link'
import SEO from '../../../components/SEO'
import NavBar from '../../../components/NavBar'
import Footer from '../../../components/Footer'

export default function ProjectDetail() {
  const params = useParams()
  const [data, setData] = useState(null)
  const [project, setProject] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('/data.json')
      .then(response => response.json())
      .then(data => {
        setData(data)
        const foundProject = data.projects.find((p: any) => p.id === params.id)
        if (!foundProject) {
          notFound()
        }
        setProject(foundProject)
        setLoading(false)
      })
      .catch(error => {
        console.error('Error loading project:', error)
        setLoading(false)
      })
  }, [params.id])

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    )
  }

  if (!project || !data) {
    notFound()
  }

  return (
    <>
      <SEO 
        title={`${project.title} - Project Details`}
        description={project.summary}
      />
      <NavBar />
      
      <main className="pt-24 pb-12">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8">
            <Link 
              href="/#projects"
              className="inline-flex items-center text-blue-400 hover:text-blue-300 transition-colors duration-200 mb-6"
            >
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m0 7h18" />
              </svg>
              Back to Projects
            </Link>
            
            <div className="mb-6">
              <span className="text-blue-400 text-sm font-medium uppercase tracking-wide">
                {project.type}
              </span>
            </div>
            
            <h1 className="text-4xl md:text-5xl font-bold gradient-text mb-4">
              {project.title}
            </h1>
            
            <p className="text-xl text-gray-300 max-w-3xl">
              {project.summary}
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
            <div className="lg:col-span-2">
              <div className="glassmorphism rounded-xl overflow-hidden mb-8">
                <div className="aspect-video bg-gradient-to-br from-blue-900/50 to-purple-900/50 flex items-center justify-center">
                  <div className="text-center">
                    <div className="w-24 h-24 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                      <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                      </svg>
                    </div>
                    <p className="text-gray-300 text-lg">Project Preview</p>
                  </div>
                </div>
              </div>

              <div className="space-y-6">
                <section>
                  <h2 className="text-2xl font-bold text-white mb-4">Project Overview</h2>
                  <div className="prose prose-invert max-w-none">
                    <p className="text-gray-300 leading-relaxed">
                      {project.summary}
                    </p>
                    <p className="text-gray-300 leading-relaxed mt-4">
                      This project demonstrates advanced implementation of modern technologies and best practices in {project.type.toLowerCase()}. The solution addresses real-world challenges through innovative approaches and scalable architecture.
                    </p>
                  </div>
                </section>

                <section>
                  <h2 className="text-2xl font-bold text-white mb-4">Key Features</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {[
                      'Real-time data processing',
                      'Scalable architecture',
                      'User-friendly interface', 
                      'Performance optimization',
                      'Comprehensive testing',
                      'Documentation & deployment'
                    ].map((feature, index) => (
                      <div key={index} className="flex items-center bg-gray-800/30 rounded-lg p-3">
                        <svg className="w-5 h-5 text-green-400 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        <span className="text-gray-300">{feature}</span>
                      </div>
                    ))}
                  </div>
                </section>

                <section>
                  <h2 className="text-2xl font-bold text-white mb-4">Technical Implementation</h2>
                  <div className="bg-gray-800/30 rounded-lg p-6">
                    <p className="text-gray-300 leading-relaxed mb-4">
                      The project leverages cutting-edge technologies to deliver optimal performance and user experience. Key technical highlights include:
                    </p>
                    <ul className="space-y-2 text-gray-300">
                      <li className="flex items-start">
                        <span className="text-blue-400 mr-2">•</span>
                        Advanced algorithms for data processing and analysis
                      </li>
                      <li className="flex items-start">
                        <span className="text-blue-400 mr-2">•</span>
                        Cloud-native architecture for scalability
                      </li>
                      <li className="flex items-start">
                        <span className="text-blue-400 mr-2">•</span>
                        Responsive design with modern UI/UX principles
                      </li>
                      <li className="flex items-start">
                        <span className="text-blue-400 mr-2">•</span>
                        Comprehensive error handling and validation
                      </li>
                    </ul>
                  </div>
                </section>
              </div>
            </div>

            <div className="space-y-6">
              <div className="glassmorphism rounded-xl p-6">
                <h3 className="text-xl font-bold text-white mb-4">Project Details</h3>
                <div className="space-y-4">
                  <div>
                    <span className="text-gray-400 text-sm">Status</span>
                    <div className="flex items-center mt-1">
                      <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                      <span className="text-white">Completed</span>
                    </div>
                  </div>
                  
                  <div>
                    <span className="text-gray-400 text-sm">Technologies</span>
                    <div className="flex flex-wrap gap-2 mt-2">
                      {project.tech.map((tech, index) => (
                        <span 
                          key={index}
                          className="px-3 py-1 text-xs bg-gray-700 text-blue-300 rounded-full border border-gray-600"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div>
                    <span className="text-gray-400 text-sm">Category</span>
                    <p className="text-white mt-1">{project.type}</p>
                  </div>
                </div>
              </div>

              <div className="glassmorphism rounded-xl p-6">
                <h3 className="text-xl font-bold text-white mb-4">Actions</h3>
                <div className="space-y-3">
                  {project.repo && (
                    <a
                      href={project.repo}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full flex items-center justify-center bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-4 py-3 rounded-lg transition-all duration-300 transform hover:scale-105"
                    >
                      <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                      </svg>
                      {project.repo.includes('github') ? 'View Code' : 'Read Paper'}
                    </a>
                  )}

                  {project.demo && (
                    <a
                      href={project.demo}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full flex items-center justify-center border-2 border-gray-600 hover:border-blue-500 text-gray-300 hover:text-white px-4 py-3 rounded-lg transition-all duration-300"
                    >
                      <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                      </svg>
                      Live Demo
                    </a>
                  )}

                  <button className="w-full flex items-center justify-center border-2 border-gray-600 hover:border-green-500 text-gray-300 hover:text-white px-4 py-3 rounded-lg transition-all duration-300">
                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z" />
                    </svg>
                    Share Project
                  </button>
                </div>
              </div>

              <div className="glassmorphism rounded-xl p-6">
                <h3 className="text-xl font-bold text-white mb-4">Related Projects</h3>
                <div className="space-y-3">
                  {data.projects.filter(p => p.id !== project.id).slice(0, 2).map((relatedProject) => (
                    <Link
                      key={relatedProject.id}
                      href={`/projects/${relatedProject.id}`}
                      className="block p-3 bg-gray-800/30 rounded-lg hover:bg-gray-700/50 transition-colors duration-200"
                    >
                      <h4 className="text-white text-sm font-medium mb-1">{relatedProject.title}</h4>
                      <p className="text-gray-400 text-xs">{relatedProject.type}</p>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      {data && <Footer profile={data.profile} contact={data.contact} />}
    </>
  )
}
