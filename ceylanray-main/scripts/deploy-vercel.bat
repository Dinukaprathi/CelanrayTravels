@echo off
echo 🚀 Vercel Deployment Script for Ceylanray
echo ==========================================

REM Check if Vercel CLI is installed
vercel --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ❌ Vercel CLI not found. Installing...
    npm install -g vercel
) else (
    echo ✅ Vercel CLI found
)

REM Check if user is logged in
vercel whoami >nul 2>&1
if %errorlevel% neq 0 (
    echo 🔐 Please login to Vercel...
    vercel login
) else (
    echo ✅ Already logged in to Vercel
)

REM Check if project is linked
if not exist ".vercel" (
    echo 🔗 Linking project to Vercel...
    vercel link
) else (
    echo ✅ Project already linked to Vercel
)

REM Pull environment variables
echo 📥 Pulling environment variables...
vercel env pull .env.local

if %errorlevel% equ 0 (
    echo ✅ Environment variables pulled successfully
) else (
    echo ⚠️  No environment variables found or error occurred
    echo 💡 Make sure to set environment variables in Vercel dashboard first
)

REM Install dependencies
echo 📦 Installing dependencies...
npm install

if %errorlevel% equ 0 (
    echo ✅ Dependencies installed successfully
) else (
    echo ❌ Failed to install dependencies
    pause
    exit /b 1
)

REM Generate Prisma client
echo 🔧 Generating Prisma client...
npx prisma generate

if %errorlevel% equ 0 (
    echo ✅ Prisma client generated successfully
) else (
    echo ❌ Failed to generate Prisma client
    pause
    exit /b 1
)

REM Build the project
echo 🏗️  Building project...
npm run build

if %errorlevel% equ 0 (
    echo ✅ Build successful
) else (
    echo ❌ Build failed
    pause
    exit /b 1
)

REM Deploy to Vercel
echo 🚀 Deploying to Vercel...
vercel --prod

if %errorlevel% equ 0 (
    echo ✅ Deployment successful!
    echo 🌐 Your app should be available at the Vercel URL
    echo 📊 Check Vercel dashboard for status and logs
    echo.
    echo 💡 Next steps:
    echo 1. Set up your database in Supabase
    echo 2. Run 'npx prisma db push' to create tables
    echo 3. Test your API endpoints
    echo 4. Set up custom domain (optional)
) else (
    echo ❌ Deployment failed
    pause
    exit /b 1
)

echo 🎉 Deployment complete!
echo.
echo 🔗 Useful links:
echo - Vercel Dashboard: https://vercel.com/dashboard
echo - Supabase Dashboard: https://supabase.com/dashboard
echo - Prisma Documentation: https://www.prisma.io/docs

pause
