@echo off
echo 🗄️  Supabase Database Setup Script for Ceylanray
echo ==================================================

REM Check if we're in the right directory
if not exist "prisma\schema.prisma" (
    echo ❌ Error: Please run this script from the project root directory
    echo 💡 Make sure you're in: ceylanray-root\ceylanray-main
    pause
    exit /b 1
)

echo ✅ Project directory confirmed
echo.

REM Check if .env.local exists
if not exist ".env.local" (
    echo ⚠️  .env.local file not found
    echo 💡 Creating .env.local template...
    
    (
        echo # Supabase Database Configuration
        echo DATABASE_URL="postgresql://postgres:[YOUR-PASSWORD]@db.[YOUR-PROJECT-REF].supabase.co:5432/postgres"
        echo.
        echo # NextAuth Configuration
        echo NEXTAUTH_SECRET="your-random-secret-key-here"
        echo NEXTAUTH_URL="http://localhost:3000"
        echo.
        echo # Environment
        echo NODE_ENV="development"
    ) > .env.local
    
    echo ✅ .env.local template created
    echo ⚠️  Please update DATABASE_URL with your Supabase connection string
    echo.
)

REM Check if DATABASE_URL is set
findstr /C:"[YOUR-PASSWORD]" .env.local >nul
if %errorlevel% equ 0 (
    echo ⚠️  DATABASE_URL not configured yet
    echo 💡 Please update .env.local with your Supabase connection string
    echo 💡 Then run this script again
    echo.
    echo 🔗 Get your connection string from:
    echo    Supabase Dashboard → Settings → Database → Connection string (URI)
    pause
    exit /b 1
)

echo ✅ Environment variables configured
echo.

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

REM Test database connection
echo 🔗 Testing database connection...
npx prisma db pull --print

if %errorlevel% equ 0 (
    echo ✅ Database connection successful
) else (
    echo ❌ Database connection failed
    echo 💡 Please check your DATABASE_URL in .env.local
    echo 💡 Make sure your Supabase project is active
    pause
    exit /b 1
)

REM Push database schema
echo 🚀 Creating database tables...
npx prisma db push

if %errorlevel% equ 0 (
    echo ✅ Database tables created successfully
) else (
    echo ❌ Failed to create database tables
    pause
    exit /b 1
)

REM Show created tables
echo 📊 Database tables created:
npx prisma db pull --print | findstr "model"

echo.
echo 🎉 Supabase setup complete!
echo.
echo 💡 Next steps:
echo 1. Test your app locally: npm run dev
echo 2. Visit: http://localhost:3000
echo 3. Check API endpoints: http://localhost:3000/api/packages
echo 4. Deploy to Vercel when ready
echo.
echo 🔗 Useful links:
echo - Supabase Dashboard: https://supabase.com/dashboard
echo - Vercel Dashboard: https://vercel.com/dashboard
echo - Prisma Studio: npx prisma studio

pause
