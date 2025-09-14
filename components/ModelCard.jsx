export default function ModelCard({ item, type }) {
  const isEducation = type === 'education'
  const isCertification = type === 'certification'
  
  return (
    <div className="group bg-gray-800/30 backdrop-blur-sm rounded-lg p-6 border border-gray-700 hover:border-gray-500 transition-all duration-300 hover:shadow-lg transform hover:scale-105">
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-white mb-2 group-hover:text-blue-400 transition-colors duration-300">
            {isEducation ? item.degree : item.title}
          </h3>
          <p className="text-blue-400 text-sm font-medium mb-1">
            {isEducation ? item.institute : item.issuer}
          </p>
          <p className="text-gray-400 text-sm">
            {item.year}
          </p>
        </div>
        
        <div className="flex-shrink-0 ml-4">
          {isEducation ? (
            <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center">
              <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
              </svg>
            </div>
          ) : (
            <div className="w-10 h-10 bg-gradient-to-r from-green-600 to-blue-600 rounded-full flex items-center justify-center">
              <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
          )}
        </div>
      </div>
      
      {item.details && (
        <p className="text-gray-300 text-sm leading-relaxed mb-3">
          {item.details}
        </p>
      )}
      
      {item.skills && (
        <div className="flex flex-wrap gap-2">
          {item.skills.map((skill, index) => (
            <span
              key={index}
              className="px-2 py-1 text-xs bg-gray-700 text-blue-300 rounded border border-gray-600 group-hover:border-blue-500 transition-colors duration-300"
            >
              {skill}
            </span>
          ))}
        </div>
      )}
      
      <div className="mt-4 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse" />
          <span className="text-xs text-gray-400">
            {isEducation ? 'Academic' : 'Certified'}
          </span>
        </div>
        
        {item.link && (
          <a
            href={item.link}
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-400 hover:text-blue-400 transition-colors duration-200 group/link"
          >
            <svg className="w-4 h-4 group-hover/link:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
          </a>
        )}
      </div>
    </div>
  )
}
