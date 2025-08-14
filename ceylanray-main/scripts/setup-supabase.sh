#!/bin/bash

echo "🗄️  Supabase Database Setup Script for Ceylanray"
echo "=================================================="

# Check if we're in the right directory
if [ ! -f "prisma/schema.prisma" ]; then
    echo "❌ Error: Please run this script from the project root directory"
    echo "💡 Make sure you're in: ceylanray-root/ceylanray-main"
    exit 1
fi

echo "✅ Project directory confirmed"
echo ""

# Check if .env.local exists
if [ ! -f ".env.local" ]; then
    echo "⚠️  .env.local file not found"
    echo "💡 Creating .env.local template..."
    
    cat > .env.local << EOF
# Supabase Database Configuration
DATABASE_URL="postgresql://postgres:[YOUR-PASSWORD]@db.[YOUR-PROJECT-REF].supabase.co:5432/postgres"

# NextAuth Configuration
NEXTAUTH_SECRET="your-random-secret-key-here"
NEXTAUTH_URL="http://localhost:3000"

# Environment
NODE_ENV="development"
EOF
    
    echo "✅ .env.local template created"
    echo "⚠️  Please update DATABASE_URL with your Supabase connection string"
    echo ""
fi

# Check if DATABASE_URL is set
if grep -q "\[YOUR-PASSWORD\]" .env.local; then
    echo "⚠️  DATABASE_URL not configured yet"
    echo "💡 Please update .env.local with your Supabase connection string"
    echo "💡 Then run this script again"
    echo ""
    echo "🔗 Get your connection string from:"
    echo "   Supabase Dashboard → Settings → Database → Connection string (URI)"
    exit 1
fi

echo "✅ Environment variables configured"
echo ""

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

# Test database connection
echo "🔗 Testing database connection..."
npx prisma db pull --print

if [ $? -eq 0 ]; then
    echo "✅ Database connection successful"
else
    echo "❌ Database connection failed"
    echo "💡 Please check your DATABASE_URL in .env.local"
    echo "💡 Make sure your Supabase project is active"
    exit 1
fi

# Push database schema
echo "🚀 Creating database tables..."
npx prisma db push

if [ $? -eq 0 ]; then
    echo "✅ Database tables created successfully"
else
    echo "❌ Failed to create database tables"
    exit 1
fi

# Show created tables
echo "📊 Database tables created:"
npx prisma db pull --print | grep "model" | sed 's/model //' | sed 's/ {/'

echo ""
echo "🎉 Supabase setup complete!"
echo ""
echo "💡 Next steps:"
echo "1. Test your app locally: npm run dev"
echo "2. Visit: http://localhost:3000"
echo "3. Check API endpoints: http://localhost:3000/api/packages"
echo "4. Deploy to Vercel when ready"
echo ""
echo "🔗 Useful links:"
echo "- Supabase Dashboard: https://supabase.com/dashboard"
echo "- Vercel Dashboard: https://vercel.com/dashboard"
echo "- Prisma Studio: npx prisma studio"
