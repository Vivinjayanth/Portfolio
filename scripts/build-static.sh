#!/bin/bash

set -e

echo "🚀 Starting static build process..."

if [ ! -f "package.json" ]; then
    echo "❌ Error: package.json not found. Run this script from the project root."
    exit 1
fi

echo "📦 Installing dependencies..."
npm ci

echo "🧹 Cleaning previous build..."
rm -rf .next/
rm -rf out/

echo "🔍 Running linter..."
npm run lint

echo "🧪 Running tests..."
npm test -- --watchAll=false --coverage

if [ $? -ne 0 ]; then
    echo "❌ Tests failed. Aborting build."
    exit 1
fi

echo "🏗️ Building Next.js application..."
npm run build

if [ ! -d ".next" ]; then
    echo "❌ Build failed - .next directory not found"
    exit 1
fi

echo "📊 Analyzing bundle size..."
npm run build 2>&1 | grep -E "(Total Size|First Load JS)" || echo "Bundle analysis complete"

echo "📸 Optimizing images..."
if [ -f "scripts/optimize_images.js" ]; then
    node scripts/optimize_images.js
else
    echo "⚠️ Image optimization script not found, skipping..."
fi

echo "🔧 Configuring for static export..."
cat > next.config.temp.js << 'EOF'
const nextConfig = {
  output: 'export',
  trailingSlash: true,
  images: {
    unoptimized: true
  },
  assetPrefix: process.env.NODE_ENV === 'production' ? '' : undefined,
}

module.exports = nextConfig
EOF

mv next.config.js next.config.backup.js
mv next.config.temp.js next.config.js

echo "📤 Exporting static files..."
npm run build

if [ -d "out" ]; then
    echo "✅ Static export successful!"
    echo "📁 Static files are in the 'out' directory"
    
    echo "📊 Build statistics:"
    echo "   Total files: $(find out -type f | wc -l)"
    echo "   Total size: $(du -sh out | cut -f1)"
    echo "   HTML files: $(find out -name '*.html' | wc -l)"
    echo "   CSS files: $(find out -name '*.css' | wc -l)"
    echo "   JS files: $(find out -name '*.js' | wc -l)"
    echo "   Image files: $(find out \( -name '*.png' -o -name '*.jpg' -o -name '*.jpeg' -o -name '*.gif' -o -name '*.svg' \) | wc -l)"
    
    echo "🔍 Validating critical files..."
    
    critical_files=("out/index.html" "out/404.html" "out/sitemap.xml" "out/robots.txt")
    
    for file in "${critical_files[@]}"; do
        if [ -f "$file" ]; then
            echo "   ✅ $file exists"
        else
            echo "   ⚠️ $file missing"
        fi
    done
    
    echo "🌐 Testing static files..."
    
    if command -v python3 &> /dev/null; then
        echo "🏃 Starting local server for testing..."
        cd out
        python3 -m http.server 3001 &
        SERVER_PID=$!
        cd ..
        
        sleep 2
        
        if curl -s http://localhost:3001 > /dev/null; then
            echo "✅ Static server test passed"
            kill $SERVER_PID 2>/dev/null || true
        else
            echo "⚠️ Static server test failed"
            kill $SERVER_PID 2>/dev/null || true
        fi
    else
        echo "⚠️ Python3 not found, skipping server test"
    fi
    
    echo "📦 Creating deployment archive..."
    
    if command -v tar &> /dev/null; then
        tar -czf portfolio-static-$(date +%Y%m%d-%H%M%S).tar.gz -C out .
        echo "✅ Archive created: portfolio-static-$(date +%Y%m%d-%H%M%S).tar.gz"
    fi
    
    echo ""
    echo "🎉 Static build completed successfully!"
    echo ""
    echo "📋 Next steps:"
    echo "   1. Upload the 'out' directory to your static hosting provider"
    echo "   2. Configure your domain and SSL certificate"
    echo "   3. Set up CDN for optimal performance"
    echo ""
    echo "🌍 Deployment options:"
    echo "   • Netlify: drag and drop the 'out' folder"
    echo "   • GitHub Pages: push contents of 'out' to gh-pages branch"
    echo "   • AWS S3: sync 'out' directory to S3 bucket"
    echo "   • Firebase Hosting: firebase deploy with 'out' as public directory"
    echo ""
    
else
    echo "❌ Static export failed - 'out' directory not found"
    exit 1
fi

mv next.config.backup.js next.config.js

echo "🧹 Cleaning up temporary files..."
rm -f next.config.temp.js

echo "✨ Build process completed!"

if [ "$1" = "--deploy" ]; then
    echo "🚀 Auto-deploy flag detected..."
    
    if [ -n "$NETLIFY_AUTH_TOKEN" ] && [ -n "$NETLIFY_SITE_ID" ]; then
        echo "📤 Deploying to Netlify..."
        npx netlify-cli deploy --prod --dir=out --auth=$NETLIFY_AUTH_TOKEN --site=$NETLIFY_SITE_ID
        echo "✅ Deployed to Netlify!"
    elif [ -n "$GITHUB_TOKEN" ] && [ -n "$GITHUB_REPOSITORY" ]; then
        echo "📤 Deploying to GitHub Pages..."
        cd out
        git init
        git add .
        git commit -m "Deploy static build $(date)"
        git branch -M gh-pages
        git remote add origin https://x-access-token:$GITHUB_TOKEN@github.com/$GITHUB_REPOSITORY.git
        git push -f origin gh-pages
        cd ..
        echo "✅ Deployed to GitHub Pages!"
    else
        echo "⚠️ No deployment credentials found. Skipping auto-deploy."
    fi
fi
