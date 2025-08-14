# 🗄️ Supabase Database Setup Guide for Ceylanray

This guide will walk you through setting up your Supabase PostgreSQL database step-by-step for your travel website.

## 📋 Prerequisites

- [GitHub account](https://github.com)
- [Supabase account](https://supabase.com) (free)
- Your Ceylanray project code ready

## 🎯 Step-by-Step Setup

### **Step 1: Create Supabase Account**

1. **Go to Supabase**
   - Visit [supabase.com](https://supabase.com)
   - Click **"Start your project"** or **"Sign Up"**

2. **Choose Sign Up Method**
   - **Recommended**: Sign up with GitHub (easier integration)
   - **Alternative**: Sign up with Google or email

3. **Complete Account Setup**
   - Verify your email if using email signup
   - Complete any required profile information

### **Step 2: Create New Project**

1. **Click "New Project"**
   - You'll see a dashboard with your projects
   - Click the **"New Project"** button

2. **Choose Organization**
   - Select your personal organization (free tier)
   - Or create a new organization if needed

3. **Project Details**
   - **Name**: `ceylanray-db` (or your preferred name)
   - **Database Password**: Create a **strong password** (save this!)
   - **Region**: Choose closest to your users
     - **Asia Pacific (Singapore)** - Good for Sri Lanka
     - **US East (N. Virginia)** - Good global performance
     - **Europe (Ireland)** - Good for European users

4. **Click "Create new project"**
   - This will take 2-5 minutes to set up
   - You'll see a loading screen with progress

### **Step 3: Get Database Connection String**

1. **Wait for Project Setup**
   - You'll see "Setting up your project..."
   - Wait until you see "Project is ready!"

2. **Go to Settings**
   - Click **"Settings"** in the left sidebar
   - Click **"Database"** in the settings menu

3. **Copy Connection String**
   - Look for **"Connection string"** section
   - Click **"URI"** format
   - Copy the connection string
   - It looks like: `postgresql://postgres:[password]@db.[ref].supabase.co:5432/postgres`

4. **Save Your Credentials**
   - **Database Password**: The one you created in Step 2
   - **Connection String**: The URI you just copied
   - **Project Reference**: The `[ref]` part of your URL

### **Step 4: Test Database Connection**

1. **Open Your Project**
   - Go to **"Table Editor"** in the left sidebar
   - You should see an empty database with no tables

2. **Verify Connection**
   - The empty database confirms your connection is working
   - You're ready to create tables

## 🔧 Create Database Tables

### **Option 1: Using Prisma (Recommended)**

1. **Navigate to Your Project**
   ```bash
   cd ceylanray-root/ceylanray-main
   ```

2. **Install Dependencies**
   ```bash
   npm install
   ```

3. **Generate Prisma Client**
   ```bash
   npx prisma generate
   ```

4. **Push Database Schema**
   ```bash
   npx prisma db push
   ```

5. **Verify Tables Created**
   - Go back to Supabase dashboard
   - Check **"Table Editor"**
   - You should now see your tables:
     - `PackageWithoutOffers`
     - `PackageBooking`
     - `Destination`
     - `HotelBooking`
     - `Hotel`
     - `Room`
     - `Admin`

### **Option 2: Using Supabase Dashboard**

1. **Go to Table Editor**
   - Click **"Table Editor"** in left sidebar

2. **Create Tables Manually**
   - Click **"Create a new table"**
   - Follow your Prisma schema structure
   - **Not recommended** - Use Prisma instead

## 🔑 Environment Variables Setup

### **For Local Development**

1. **Create `.env.local` file**
   ```bash
   # In your project root
   touch .env.local
   ```

2. **Add Database URL**
   ```bash
   # .env.local
   DATABASE_URL="postgresql://postgres:[YOUR-PASSWORD]@db.[YOUR-PROJECT-REF].supabase.co:5432/postgres"
   NEXTAUTH_SECRET="your-random-secret-key-here"
   NEXTAUTH_URL="http://localhost:3000"
   NODE_ENV="development"
   ```

### **For Vercel Deployment**

1. **Go to Vercel Dashboard**
   - Project → Settings → Environment Variables

2. **Add Variables**
   ```
   DATABASE_URL=your_supabase_connection_string
   NEXTAUTH_SECRET=your_random_secret_key
   NEXTAUTH_URL=https://your-project.vercel.app
   NODE_ENV=production
   ```

## 🧪 Test Your Database

### **1. Test Connection Locally**
```bash
# In your project directory
npm run dev

# Your app should start without database errors
```

### **2. Test API Endpoints**
- Visit `http://localhost:3000/api/packages`
- Should return empty array `[]` (no data yet)
- No errors means connection is working

### **3. Check Supabase Dashboard**
- Go to **"Table Editor"**
- Verify tables exist
- Check **"Logs"** for any connection issues

## 🚨 Troubleshooting

### **Common Issues**

1. **"Connection refused" Error**
   - Check if your IP is allowed
   - Go to Supabase → Settings → Database
   - Check **"Connection pooling"** settings

2. **"Invalid password" Error**
   - Verify your database password
   - Check for extra spaces in connection string

3. **"Table not found" Error**
   - Run `npx prisma db push` again
   - Check if tables exist in Supabase dashboard

4. **"SSL connection" Error**
   - Add `?sslmode=require` to your DATABASE_URL
   - Example: `.../postgres?sslmode=require`

### **Getting Help**

- **Supabase Logs**: Dashboard → Logs
- **Database Logs**: Settings → Database → Logs
- **Community**: [Supabase Discord](https://discord.supabase.com)
- **Documentation**: [docs.supabase.com](https://docs.supabase.com)

## 📊 Database Management

### **View Data**
- **Table Editor**: Browse and edit data
- **SQL Editor**: Run custom SQL queries
- **Logs**: Monitor database activity

### **Backup & Restore**
- **Settings → Database → Backups**
- **Automatic backups** every 24 hours
- **Manual backups** available

### **Monitoring**
- **Usage**: Check database size and row counts
- **Performance**: Monitor query performance
- **Security**: Review access logs

## 🎉 Next Steps

After successful Supabase setup:

1. **✅ Database tables created**
2. **✅ Connection string obtained**
3. **✅ Local testing completed**
4. **🔄 Ready for Vercel deployment**

## 🔗 Useful Links

- [Supabase Dashboard](https://supabase.com/dashboard)
- [Supabase Documentation](https://docs.supabase.com)
- [Prisma Documentation](https://www.prisma.io/docs)
- [Supabase Discord](https://discord.supabase.com)

---

**Need help?** Check the troubleshooting section above or visit the Supabase community!
