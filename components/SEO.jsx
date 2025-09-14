import Head from 'next/head'

export default function SEO({ 
  title = "Vivin Jayanth A M - AI & ML Engineering Student", 
  description = "AI & ML engineering student skilled in Python, cloud platforms (AWS, GCP), and building real-world ML solutions. Passionate about scalable, data-driven systems and impactful innovation.",
  url = "https://vivin-portfolio.vercel.app",
  image = "/assets/og-image.jpg"
}) {
  const fullTitle = title.includes('Vivin') ? title : `${title} | Vivin Jayanth A M`
  
  return (
    <Head>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <meta name="robots" content="index, follow" />
      <meta name="author" content="Vivin Jayanth A M" />
      <meta name="keywords" content="AI, Machine Learning, Python, AWS, GCP, Cloud Computing, Data Science, Portfolio" />
      
      <meta property="og:type" content="website" />
      <meta property="og:url" content={url} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:site_name" content="Vivin Jayanth Portfolio" />
      
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:url" content={url} />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />
      
      <link rel="canonical" href={url} />
      <link rel="icon" href="/favicon.ico" />
      <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
      
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Person",
            "name": "Vivin Jayanth A M",
            "jobTitle": "AI & ML Engineering Student",
            "description": description,
            "url": url,
            "sameAs": [
              "https://github.com/Vivinjayanth",
              "https://www.linkedin.com/in/vivin-jayanth-a-m"
            ],
            "address": {
              "@type": "PostalAddress",
              "addressLocality": "Bengaluru",
              "addressCountry": "India"
            }
          })
        }}
      />
    </Head>
  )
}
