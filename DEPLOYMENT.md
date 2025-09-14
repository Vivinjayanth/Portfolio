# Deployment Guide

This guide covers deploying your Next.js portfolio to various platforms. Choose the platform that best fits your needs.

## 🚀 Quick Deployment Options

### 1. Vercel (Recommended)
**Best for**: Next.js projects, automatic deployments, preview deployments

#### One-Click Deploy
[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/yourusername/portfolio)

#### Manual Deploy
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel

# Production deployment
vercel --prod
```

**Configuration:**
- Vercel automatically detects Next.js
- Environment variables via Vercel dashboard
- Automatic HTTPS and CDN
- Preview deployments for PRs

### 2. Netlify
**Best for**: Static sites, form handling, edge functions

```bash
# Install Netlify CLI
npm install -g netlify-cli

# Build and deploy
npm run build
netlify deploy --prod --dir=out
```

**Configuration:**
```toml
# netlify.toml
[build]
  publish = "out"
  command = "npm run build && npm run export"

[build.environment]
  NODE_VERSION = "18"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
```

### 3. GitHub Pages
**Best for**: Free hosting, simple setup, GitHub integration

```yaml
# .github/workflows/deploy-gh-pages.yml
name: Deploy to GitHub Pages

on:
  push:
    branches: [ main ]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      
      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '18'
          cache: 'npm'
      
      - name: Install dependencies
        run: npm ci
      
      - name: Build
        run: npm run build
      
      - name: Export
        run: npm run export
      
      - name: Deploy
        uses: peaceiris/actions-gh-pages@v3
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: ./out
```

### 4. AWS S3 + CloudFront
**Best for**: Custom domains, AWS ecosystem, advanced caching

```bash
# Build static export
npm run build
npm run export

# AWS CLI deployment
aws s3 sync out/ s3://your-bucket-name --delete
aws cloudfront create-invalidation --distribution-id YOUR_DISTRIBUTION_ID --paths "/*"
```

### 5. Docker Deployment
**Best for**: Self-hosting, containerized environments

```dockerfile
# Dockerfile
FROM node:18-alpine AS base

# Dependencies
FROM base AS deps
RUN apk add --no-cache libc6-compat
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production

# Builder
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN npm run build

# Runner
FROM base AS runner
WORKDIR /app
ENV NODE_ENV production
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs
EXPOSE 3000
ENV PORT 3000
CMD ["node", "server.js"]
```

```bash
# Build and run
docker build -t portfolio .
docker run -p 3000:3000 portfolio
```

## 🔧 Platform-Specific Configuration

### Environment Variables

#### Development (.env.local)
```bash
NEXT_PUBLIC_APP_URL=http://localhost:3000
NEXT_PUBLIC_GA_TRACKING_ID=G-XXXXXXXXXX
```

#### Production
Set these in your deployment platform:

**Vercel:**
- Dashboard → Settings → Environment Variables

**Netlify:**
- Dashboard → Site settings → Environment variables

**GitHub Pages:**
- Repository → Settings → Secrets and variables

### Build Settings

#### Package.json Scripts
```json
{
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "export": "next export",
    "deploy:vercel": "vercel --prod",
    "deploy:netlify": "netlify deploy --prod --dir=out",
    "deploy:gh-pages": "npm run build && npm run export && gh-pages -d out"
  }
}
```

#### Next.js Configuration
```javascript
// next.config.js
/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export', // For static export
  trailingSlash: true,
  images: {
    unoptimized: true // For static hosting
  },
  assetPrefix: process.env.NODE_ENV === 'production' ? '/portfolio' : '',
  basePath: process.env.NODE_ENV === 'production' ? '/portfolio' : ''
}

module.exports = nextConfig
```

## 🔍 Performance Optimization

### Pre-deployment Checklist
- [ ] Run production build locally
- [ ] Test all routes and functionality
- [ ] Optimize images and assets
- [ ] Enable compression
- [ ] Configure caching headers
- [ ] Test mobile responsiveness
- [ ] Validate SEO meta tags
- [ ] Check accessibility compliance
- [ ] Verify analytics tracking

### Build Optimization
```bash
# Analyze bundle size
npm run build
npx @next/bundle-analyzer

# Check for unused dependencies
npx depcheck

# Optimize images
npm install -g imagemin-cli
find public -name "*.{jpg,png}" | xargs imagemin --out-dir=public/optimized
```

## 🚦 CI/CD Pipeline

### Automated Deployment Workflow
```yaml
# .github/workflows/deploy.yml
name: Deploy Portfolio

on:
  push:
    branches: [main]
  pull_request:
    branches: [main]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: '18'
          cache: 'npm'
      
      - name: Install dependencies
        run: npm ci
      
      - name: Run tests
        run: npm test
      
      - name: Run linter
        run: npm run lint
      
      - name: Type check
        run: npm run type-check
  
  build:
    needs: test
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: '18'
          cache: 'npm'
      
      - name: Install dependencies
        run: npm ci
      
      - name: Build application
        run: npm run build
        env:
          NEXT_PUBLIC_GA_TRACKING_ID: ${{ secrets.GA_TRACKING_ID }}
  
  deploy:
    needs: [test, build]
    runs-on: ubuntu-latest
    if: github.ref == 'refs/heads/main'
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: '18'
          cache: 'npm'
      
      - name: Install dependencies
        run: npm ci
      
      - name: Build and deploy
        run: npm run deploy:vercel
        env:
          VERCEL_TOKEN: ${{ secrets.VERCEL_TOKEN }}
```

## 🌐 Custom Domain Setup

### DNS Configuration
```
Type    Name    Value
A       @       76.76.19.61
CNAME   www     your-app.vercel.app
```

### SSL Certificate
Most platforms provide automatic HTTPS:
- **Vercel**: Automatic SSL via Let's Encrypt
- **Netlify**: Free SSL certificates
- **CloudFront**: AWS Certificate Manager
- **GitHub Pages**: GitHub's SSL certificate

## 📊 Monitoring and Analytics

### Performance Monitoring
```javascript
// lib/monitoring.js
export function reportWebVitals(metric) {
  // Google Analytics
  if (window.gtag) {
    window.gtag('event', metric.name, {
      event_category: 'Web Vitals',
      event_label: metric.id,
      value: Math.round(metric.name === 'CLS' ? metric.value * 1000 : metric.value),
      non_interaction: true,
    });
  }
}
```

### Error Tracking
```javascript
// lib/error-tracking.js
export function setupErrorTracking() {
  window.addEventListener('error', (event) => {
    // Send to error tracking service
    console.error('Global error:', event.error);
  });
  
  window.addEventListener('unhandledrejection', (event) => {
    // Send to error tracking service
    console.error('Unhandled promise rejection:', event.reason);
  });
}
```

## 🔒 Security Configuration

### Security Headers
```javascript
// next.config.js
const securityHeaders = [
  {
    key: 'X-DNS-Prefetch-Control',
    value: 'on'
  },
  {
    key: 'Strict-Transport-Security',
    value: 'max-age=63072000; includeSubDomains; preload'
  },
  {
    key: 'X-XSS-Protection',
    value: '1; mode=block'
  },
  {
    key: 'X-Frame-Options',
    value: 'SAMEORIGIN'
  },
  {
    key: 'X-Content-Type-Options',
    value: 'nosniff'
  },
  {
    key: 'Referrer-Policy',
    value: 'origin-when-cross-origin'
  }
];

module.exports = {
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: securityHeaders,
      },
    ];
  },
};
```

## 🔄 Rollback Strategy

### Version Control
```bash
# Tag releases
git tag -a v1.0.0 -m "Release version 1.0.0"
git push origin v1.0.0

# Rollback to previous version
git revert HEAD
git push origin main

# Or rollback to specific version
git reset --hard v1.0.0
git push --force origin main
```

### Platform Rollback
- **Vercel**: Rollback via dashboard or CLI
- **Netlify**: Deploy previous build
- **GitHub Pages**: Revert commit and redeploy

## 📋 Deployment Checklist

### Pre-deployment
- [ ] Code review completed
- [ ] Tests passing
- [ ] Build successful locally
- [ ] Environment variables configured
- [ ] Performance optimized
- [ ] Security headers configured
- [ ] Analytics configured
- [ ] Error tracking setup

### Post-deployment
- [ ] Site accessibility verified
- [ ] All pages loading correctly
- [ ] Forms working (if applicable)
- [ ] Analytics tracking verified
- [ ] Mobile responsiveness confirmed
- [ ] Performance metrics acceptable
- [ ] SEO meta tags present
- [ ] Social media previews working

## 🆘 Troubleshooting

### Common Issues

**Build Errors:**
```bash
# Clear cache and rebuild
rm -rf .next node_modules package-lock.json
npm install
npm run build
```

**Deployment Failures:**
- Check build logs for specific errors
- Verify environment variables
- Ensure all dependencies are listed
- Check Node.js version compatibility

**Performance Issues:**
- Analyze bundle size
- Optimize images
- Enable caching
- Use CDN for static assets

### Support Resources
- [Next.js Deployment Documentation](https://nextjs.org/docs/deployment)
- [Vercel Documentation](https://vercel.com/docs)
- [Netlify Documentation](https://docs.netlify.com/)
- Platform-specific support channels

---

**Need help?** Open an issue or check the troubleshooting section above.
**Last Updated**: December 2024
