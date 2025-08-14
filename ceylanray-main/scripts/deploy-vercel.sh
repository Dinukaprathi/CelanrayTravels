#!/bin/bash

echo "🚀 Vercel Deployment Script for Ceylanray"
echo "=========================================="

# Check if Vercel CLI is installed
if ! command -v vercel &> /dev/null; then
    echo "❌ Vercel CLI not found. Installing..."
    npm install -g vercel
else
    echo "✅ Vercel CLI found"
fi

# Check if user is logged in
if ! vercel whoami &> /dev/null; then
    echo "🔐 Please login to Vercel..."
    vercel login
else
    echo "✅ Already logged in to Vercel"
fi

# Check if project is linked
if [ ! -f ".vercel" ]; then
    echo "🔗 Linking project to Vercel..."
    vercel link
else
    echo "✅ Project already linked to Vercel"
fi

# Pull environment variables
echo "📥 Pulling environment variables..."
vercel env pull .env.local

if [ $? -eq 0 ]; then
    echo "✅ Environment variables pulled successfully"
else
    echo "⚠️  No environment variables found or error occurred"
    echo "💡 Make sure to set environment variables in Vercel dashboard first"
fi

# Install dependencies
echo "📦 Installing dependencies..."
npm install

if [ $? -eq 0 ]; then
    echo "✅ Dependencies installed successfully"
else
    echo "❌ Failed to install dependencies"
    exit 1
fi

# Generate Prisma client
echo "🔧 Generating Prisma client..."
npx prisma generate

if [ $? -eq 0 ]; then
    echo "✅ Prisma client generated successfully"
else
    echo "❌ Failed to generate Prisma client"
    exit 1
fi

# Build the project
echo "🏗️  Building project..."
npm run build

if [ $? -eq 0 ]; then
    echo "✅ Build successful"
else
    echo "❌ Build failed"
    exit 1
fi

# Deploy to Vercel
echo "🚀 Deploying to Vercel..."
vercel --prod

if [ $? -eq 0 ]; then
    echo "✅ Deployment successful!"
    echo "🌐 Your app should be available at the Vercel URL"
    echo "📊 Check Vercel dashboard for status and logs"
    echo ""
    echo "💡 Next steps:"
    echo "1. Set up your database in Supabase"
    echo "2. Run 'npx prisma db push' to create tables"
    echo "3. Test your API endpoints"
    echo "4. Set up custom domain (optional)"
else
    echo "❌ Deployment failed"
    exit 1
fi

echo "🎉 Deployment complete!"
echo ""
echo "🔗 Useful links:"
echo "- Vercel Dashboard: https://vercel.com/dashboard"
echo "- Supabase Dashboard: https://supabase.com/dashboard"
echo "- Prisma Documentation: https://www.prisma.io/docs"
