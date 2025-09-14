# Portfolio - Vivin Jayanth A M

Modern portfolio website built with Next.js 14, Tailwind CSS, and TypeScript.

## Features

- Dark theme optimized design
- Responsive layout for all devices
- PDF resume parsing and analysis
- Modern glassmorphism UI effects
- Type-safe development with TypeScript
- Comprehensive testing setup

## Tech Stack

- **Framework**: Next.js 14 with App Router
- **Styling**: Tailwind CSS
- **Language**: TypeScript
- **Testing**: Jest + React Testing Library
- **PDF Processing**: pdfplumber, PyMuPDF
- **Deployment**: Vercel (recommended)

## Quick Start

### Prerequisites
- Node.js 18+ 
- npm or yarn
- Python 3.8+ (for PDF parsing)

### Installation

1. Clone the repository:
```bash
git clone https://github.com/Vivinjayanth/portfolio.git
cd portfolio
```

2. Install Node.js dependencies:
```bash
npm install
```

3. Install Python dependencies (for PDF parsing):
```bash
pip install -r requirements.txt
```

### Development

Start the development server:
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build

Create production build:
```bash
npm run build
```

Test production build locally:
```bash
npm run start
```

### Testing

Run tests:
```bash
npm test
```

Run tests in watch mode:
```bash
npm run test:watch
```

## Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Import your repository on [Vercel](https://vercel.com)
3. Deploy with default settings

### Manual Deployment

1. Build the application:
```bash
npm run build
```

2. Deploy the `.next` folder to your hosting provider

### Environment Variables

For production deployment, consider setting:
```env
NEXT_PUBLIC_SITE_URL=https://your-domain.com
```

## PDF Resume Parsing

The `parse_resume.py` utility analyzes PDF resumes and extracts key information.

### Usage

```bash
python parse_resume.py public/resume.pdf
```

### Features

- Text extraction from PDF
- Contact information detection
- Technical skills identification  
- Word and character count analysis
- PDF to image conversion
- Multiple PDF library support (pdfplumber, PyMuPDF)

### Requirements

Install Python dependencies:
```bash
pip install -r requirements.txt
```

### Example Output

```
Analyzing resume: public/resume.pdf
--------------------------------------------------
Text extraction successful!
Word count: 245
Character count: 1580
Lines: 28

Potential emails found: ['vivinjayantham@gmail.com']
Potential phone numbers found: ['+91-8147943631']
Technical skills detected: ['Python', 'AWS', 'Machine Learning', 'AI']
Converted 1 pages to images in resume_images/
```

## Project Structure

```
portfolio/
├── app/                    # Next.js app directory
│   ├── globals.css        # Global styles
│   ├── layout.tsx         # Root layout
│   └── page.tsx          # Home page
├── public/               # Static assets
│   └── resume.pdf       # Resume file
├── README_ASSETS/       # Documentation images
├── data.json           # Portfolio content data
├── parse_resume.py     # PDF parsing utility
├── requirements.txt    # Python dependencies
├── package.json       # Node.js dependencies
├── tailwind.config.js # Tailwind configuration
├── next.config.js     # Next.js configuration
└── postcss.config.js  # PostCSS configuration
```

## Content Management

Portfolio content is stored in `data.json` including:
- Personal profile information
- Project showcase
- Education history
- Certifications
- Publications
- Skills and contact details

## Customization

1. **Personal Data**: Update `data.json` with your information
2. **Resume**: Replace `public/resume.pdf` with your resume
3. **Styling**: Modify `app/globals.css` and Tailwind classes
4. **Assets**: Add images to `public/` directory

## Short URL Setup

For easy sharing, consider setting up a short URL:

1. **Custom Domain**: Configure a short custom domain (e.g., `vivin.dev`)
2. **URL Shortener**: Use services like bit.ly or tinyurl
3. **QR Code**: Generate QR codes for business cards

Recommended short URLs:
- `vivin.dev` → Main portfolio
- `vivin.dev/resume` → Direct resume download
- `vivin.dev/contact` → Contact page

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is open source and available under the [MIT License](LICENSE).

---

Built with ❤️ by [Vivin Jayanth A M](https://github.com/Vivinjayanth)
