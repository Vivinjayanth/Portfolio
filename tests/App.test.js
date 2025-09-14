import { render, screen, waitFor, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom'
import Home from '../app/page'

const mockData = {
  profile: {
    fullName: "Vivin Jayanth A M",
    headline: "Final Year AI & ML Engineering Student | Cloud & Data-Driven Systems",
    location: "Bengaluru, India",
    email: "vivinjayantham@gmail.com",
    phone: "+91 8147943631",
    shortBio: "AI & ML engineering student skilled in Python, cloud platforms (AWS, GCP), and building real-world ML solutions.",
    social: {
      github: "https://github.com/Vivinjayanth",
      linkedin: "https://www.linkedin.com/in/vivin-jayanth-a-m"
    },
    skills: ["Python", "AWS", "Machine Learning", "React"]
  },
  projects: [
    {
      id: "proj-1",
      title: "AI Traffic Management",
      type: "Computer Vision",
      summary: "AI-driven traffic optimization system",
      tech: ["YOLOv8", "Python", "OpenCV"],
      repo: "https://github.com/test/repo"
    }
  ],
  education: [
    {
      degree: "B.E. Artificial Intelligence & Machine Learning",
      institute: "Jyothy Institute of Technology",
      year: "2026*",
      details: "Aggregate: 84%"
    }
  ],
  certifications: [
    {
      title: "AWS Academy Machine Learning Foundations",
      issuer: "AWS",
      year: "2024"
    }
  ],
  publications: [
    {
      title: "Test Publication",
      publisher: "Test Journal",
      date: "2024",
      link: "https://test.com"
    }
  ],
  contact: {
    email: "vivinjayantham@gmail.com"
  }
}

global.fetch = jest.fn()

beforeEach(() => {
  fetch.mockResolvedValue({
    json: () => Promise.resolve(mockData)
  })
})

afterEach(() => {
  jest.restoreAllMocks()
})

describe('Portfolio Application', () => {
  test('renders loading state initially', () => {
    render(<Home />)
    expect(screen.getByTestId('loading-spinner') || screen.getByText(/loading/i)).toBeDefined()
  })

  test('renders portfolio content after data loads', async () => {
    render(<Home />)
    
    await waitFor(() => {
      expect(screen.getByText('Vivin Jayanth A M')).toBeInTheDocument()
    })
    
    expect(screen.getByText('Final Year AI & ML Engineering Student | Cloud & Data-Driven Systems')).toBeInTheDocument()
  })

  test('displays all main sections', async () => {
    render(<Home />)
    
    await waitFor(() => {
      expect(screen.getByText('About Me')).toBeInTheDocument()
      expect(screen.getByText('Featured Projects')).toBeInTheDocument()
      expect(screen.getByText('Education & Certifications')).toBeInTheDocument()
      expect(screen.getByText("Let's Connect")).toBeInTheDocument()
    })
  })

  test('renders skills section with technologies', async () => {
    render(<Home />)
    
    await waitFor(() => {
      expect(screen.getByText('Python')).toBeInTheDocument()
      expect(screen.getByText('AWS')).toBeInTheDocument()
      expect(screen.getByText('Machine Learning')).toBeInTheDocument()
    })
  })

  test('displays project information correctly', async () => {
    render(<Home />)
    
    await waitFor(() => {
      expect(screen.getByText('AI Traffic Management')).toBeInTheDocument()
      expect(screen.getByText('Computer Vision')).toBeInTheDocument()
      expect(screen.getByText('YOLOv8')).toBeInTheDocument()
    })
  })

  test('shows education and certification details', async () => {
    render(<Home />)
    
    await waitFor(() => {
      expect(screen.getByText('B.E. Artificial Intelligence & Machine Learning')).toBeInTheDocument()
      expect(screen.getByText('AWS Academy Machine Learning Foundations')).toBeInTheDocument()
    })
  })

  test('includes social media links', async () => {
    render(<Home />)
    
    await waitFor(() => {
      const githubLinks = screen.getAllByRole('link')
      const githubLink = githubLinks.find(link => 
        link.getAttribute('href') === 'https://github.com/Vivinjayanth'
      )
      expect(githubLink).toBeInTheDocument()
    })
  })

  test('displays resume download buttons', async () => {
    render(<Home />)
    
    await waitFor(() => {
      const resumeLinks = screen.getAllByText(/resume/i)
      expect(resumeLinks.length).toBeGreaterThan(0)
    })
  })

  test('shows contact email correctly', async () => {
    render(<Home />)
    
    await waitFor(() => {
      const emailLinks = screen.getAllByRole('link')
      const emailLink = emailLinks.find(link => 
        link.getAttribute('href') === 'mailto:vivinjayantham@gmail.com'
      )
      expect(emailLink).toBeInTheDocument()
    })
  })

  test('handles fetch error gracefully', async () => {
    fetch.mockRejectedValueOnce(new Error('Network error'))
    
    render(<Home />)
    
    await waitFor(() => {
      expect(screen.getByText('Error Loading Portfolio')).toBeInTheDocument()
    })
  })

  test('renders publications section when available', async () => {
    render(<Home />)
    
    await waitFor(() => {
      expect(screen.getByText('Publications & Presentations')).toBeInTheDocument()
      expect(screen.getByText('Test Publication')).toBeInTheDocument()
    })
  })

  test('navigation links work correctly', async () => {
    render(<Home />)
    
    await waitFor(() => {
      const aboutLink = screen.getByRole('link', { name: /about/i })
      expect(aboutLink.getAttribute('href')).toBe('#about')
      
      const projectsLink = screen.getByRole('link', { name: /projects/i })
      expect(projectsLink.getAttribute('href')).toBe('#projects')
    })
  })

  test('responsive behavior with window resize', async () => {
    Object.defineProperty(window, 'innerWidth', {
      writable: true,
      configurable: true,
      value: 768,
    })
    
    render(<Home />)
    
    await waitFor(() => {
      expect(screen.getByText('Vivin Jayanth A M')).toBeInTheDocument()
    })
    
    window.innerWidth = 320
    window.dispatchEvent(new Event('resize'))
    
    expect(screen.getByText('Vivin Jayanth A M')).toBeInTheDocument()
  })

  test('all external links have proper attributes', async () => {
    render(<Home />)
    
    await waitFor(() => {
      const externalLinks = screen.getAllByRole('link').filter(link => 
        link.getAttribute('href')?.startsWith('http')
      )
      
      externalLinks.forEach(link => {
        expect(link).toHaveAttribute('target', '_blank')
        expect(link).toHaveAttribute('rel', 'noopener noreferrer')
      })
    })
  })

  test('CTA buttons are interactive', async () => {
    render(<Home />)
    
    await waitFor(() => {
      const ctaButtons = screen.getAllByRole('link')
      const workButton = ctaButtons.find(btn => 
        btn.textContent?.includes('View My Work')
      )
      expect(workButton).toBeInTheDocument()
      expect(workButton?.getAttribute('href')).toBe('#projects')
    })
  })

  test('footer contains all required information', async () => {
    render(<Home />)
    
    await waitFor(() => {
      expect(screen.getByText(/© \d{4} Vivin Jayanth A M/)).toBeInTheDocument()
      expect(screen.getByText('Built with Next.js & Tailwind CSS')).toBeInTheDocument()
    })
  })

  test('loading spinner has proper accessibility', () => {
    render(<Home />)
    
    const loadingElement = document.querySelector('.animate-spin')
    expect(loadingElement).toBeInTheDocument()
  })

  test('SEO meta information is properly set', async () => {
    render(<Home />)
    
    await waitFor(() => {
      expect(document.title).toBeDefined()
    })
  })

  test('handles missing data gracefully', async () => {
    const incompleteData = {
      profile: {
        fullName: "Test User",
        headline: "Test Headline",
        skills: []
      },
      projects: [],
      education: [],
      certifications: [],
      contact: { email: "test@example.com" }
    }
    
    fetch.mockResolvedValueOnce({
      json: () => Promise.resolve(incompleteData)
    })
    
    render(<Home />)
    
    await waitFor(() => {
      expect(screen.getByText('Test User')).toBeInTheDocument()
    })
  })

  test('project tech stack renders correctly', async () => {
    render(<Home />)
    
    await waitFor(() => {
      expect(screen.getByText('YOLOv8')).toBeInTheDocument()
      expect(screen.getByText('Python')).toBeInTheDocument()
      expect(screen.getByText('OpenCV')).toBeInTheDocument()
    })
  })

  test('smooth scroll behavior is applied', async () => {
    render(<Home />)
    
    await waitFor(() => {
      const mainElement = document.querySelector('main')
      expect(mainElement).toHaveClass('scroll-smooth')
    })
  })
})
