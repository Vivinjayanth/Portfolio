export interface Profile {
  fullName: string
  headline: string
  location: string
  email: string
  phone: string
  shortBio: string
  avatar: string
  resumeFile: string
  social: {
    github: string
    linkedin: string
  }
  skills: string[]
}

export interface Project {
  id: string
  title: string
  type: string
  summary: string
  tech: string[]
  image: string
  repo?: string
  demo?: string
}

export interface Education {
  degree: string
  institute: string
  year: string
  details: string
}

export interface Certification {
  title: string
  issuer: string
  year: string
}

export interface Publication {
  title: string
  publisher: string
  date: string
  link?: string
}

export interface Extracurricular {
  role: string
  activity: string
  details: string
}

export interface Contact {
  email: string
  messageRecipient: string
}

export interface PortfolioData {
  profile: Profile
  projects: Project[]
  education: Education[]
  certifications: Certification[]
  publications: Publication[]
  extracurriculars: Extracurricular[]
  contact: Contact
}
