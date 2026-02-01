#!/bin/bash

# Deployment script for GitHub Pages, Vercel, and puter.com

set -e

echo "Starting deployment process..."

# Build the project
echo "Building the project..."
npm run build

# Deploy to GitHub Pages
echo "Deploying to GitHub Pages..."
if [ ! -d ".github" ]; then
  mkdir .github
fi

if [ ! -d ".github/workflows" ]; then
  mkdir .github/workflows
fi

cat > .github/workflows/deploy.yml << 'EOF'
name: Deploy to GitHub Pages

on:
  push:
    branches: [ main ]
  pull_request:
    branches: [ main ]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
    - uses: actions/checkout@v4
      with:
        fetch-depth: 0

    - name: Setup Node.js
      uses: actions/setup-node@v4
      with:
        node-version: '22'

    - name: Install dependencies
      run: npm ci

    - name: Build
      run: npm run build

    - name: Deploy to GitHub Pages
      uses: peaceiris/actions-gh-pages@v3
      if: github.ref == 'refs/heads/main'
      with:
        github_token: ${{ secrets.GITHUB_TOKEN }}
        publish_dir: ./dist
EOF

echo "GitHub Pages deployment configured!"

# Deploy to Vercel
echo "Deploying to Vercel..."
cat > vercel.json << 'EOF'
{
  "buildCommand": "npm run build",
  "outputDirectory": "dist",
  "framework": "vite"
}
EOF

echo "Vercel deployment configured!"

# Deploy to puter.com
echo "Deploying to puter.com..."
cat > puter.json << 'EOF'
{
  "build": "npm run build",
  "output": "dist",
  "install": "npm ci"
}
EOF

echo "puter.com deployment configured!"

echo "All deployments configured successfully!"
echo "To deploy:"
echo "- GitHub Pages: Push to main branch"
echo "- Vercel: Run 'vercel --prod' or connect to Vercel dashboard"
echo "- puter.com: Run 'puter deploy'"