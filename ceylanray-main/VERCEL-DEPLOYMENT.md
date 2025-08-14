# 🚀 Deploy Ceylanray to Vercel + Supabase

This guide will walk you through deploying your Ceylanray Next.js application to Vercel with a free Supabase PostgreSQL database.

## 📋 Prerequisites

- [GitHub account](https://github.com)
- [Vercel account](https://vercel.com) (free)
- [Supabase account](https://supabase.com) (free)
- Your code pushed to a GitHub repository

## 🎯 Quick Start (10 minutes)

### Step 1: Set Up Supabase Database

1. **Create Supabase Account**
   - Go to [supabase.com](https://supabase.com)
   - Sign up with GitHub or Google
   - Click "New Project"

2. **Create New Project**
   - **Name**: `ceylanray-db`
   - **Database Password**: Create a strong password (save it!)
   - **Region**: Choose closest to your users
   - Click "Create new project"

3. **Get Database Connection String**
   - Go to **Settings** → **Database**
   - Copy the **Connection string** (URI format)
   - It looks like: `postgresql://postgres:[password]@db.[ref].supabase.co:5432/postgres`

### Step 2: Deploy to Vercel

1. **Sign up/Login to Vercel**
   - Visit [vercel.com](https://vercel.com)
   - Sign up with GitHub

2. **Import Your Project**
   - Click "New Project"
   - Select your `ceylanray-main` repository
   - Vercel will auto-detect Next.js

3. **Configure Project**
   - **Project Name**: `ceylanray` (or your preference)
   - **Framework Preset**: Next.js (auto-detected)
   - **Root Directory**: `./` (leave default)
   - Click "Deploy"

### Step 3: Set Environment Variables

1. **Go to Project Settings**
   - In your Vercel project, click **Settings**
   - Click **Environment Variables**

2. **Add Required Variables**
   ```
   DATABASE_URL=your_supabase_connection_string
   NEXTAUTH_SECRET=your_random_secret_key
   NEXTAUTH_URL=https://your-project.vercel.app
   NODE_ENV=production
   ```

3. **Redeploy**
   - After adding variables, click **Redeploy**

### Step 4: Setup Database

1. **Access Vercel Functions**
   - Go to **Functions** tab in Vercel
   - Find your API routes

2. **Run Prisma Commands** (via Vercel CLI)
   ```bash
   # Install Vercel CLI
   npm i -g vercel
   
   # Login and link project
   vercel login
   vercel link
   
   # Pull environment variables
   vercel env pull .env.local
   
   # Generate Prisma client
   npx prisma generate
   
   # Push database schema
   npx prisma db push
   ```

## 🔧 Configuration Files

### vercel.json
```json
{
  "buildCommand": "npm run build",
  "outputDirectory": ".next",
  "framework": "nextjs",
  "installCommand": "npm install",
  "devCommand": "npm run dev",
  "regions": ["iad1"],
  "functions": {
    "app/api/**/*.ts": {
      "maxDuration": 30
    }
  }
}
```

### Environment Variables
Required in Vercel dashboard:
- `DATABASE_URL`: Supabase PostgreSQL connection string
- `NEXTAUTH_SECRET`: Random secret for authentication
- `NEXTAUTH_URL`: Your Vercel app URL
- `NODE_ENV`: Set to "production"

## 🗄️ Supabase Database Setup

### Free Tier Limits
- **Database Size**: 500MB
- **Rows per month**: 50,000
- **Bandwidth**: 2GB/month
- **Real-time subscriptions**: Included

### Database Schema
Your Prisma schema will create:
- **Packages**: Travel packages
- **Hotels**: Hotel information
- **Bookings**: Customer bookings
- **Destinations**: Travel destinations
- **Users**: Admin users

## 🚨 Troubleshooting

### Common Issues

1. **Build Failures**
   - Check if all dependencies are in `package.json`
   - Ensure Node.js version compatibility (Vercel uses Node 18+)
   - Check build logs in Vercel dashboard

2. **Database Connection Issues**
   - Verify `DATABASE_URL` is correct
   - Check Supabase project is active
   - Ensure database password is correct

3. **Environment Variables**
   - Ensure all required variables are set
   - Check for typos in variable names
   - Redeploy after adding variables

4. **Prisma Issues**
   - Run `npx prisma generate` locally
   - Use `npx prisma db push` for schema changes
   - Check Prisma logs in Vercel functions

### Getting Help

- Check Vercel build logs
- Use Vercel CLI for debugging
- Check Supabase dashboard for database issues
- Verify environment variables are set correctly

## 💰 Pricing

- **Vercel Hosting**: Free forever
- **Supabase Database**: Free (500MB, 50K rows)
- **Custom Domains**: Free (you pay domain registrar)
- **Total Cost**: **$0/month**

## 🔄 Continuous Deployment

Vercel automatically redeploys when you:
- Push changes to your GitHub repository
- Make changes through Vercel dashboard
- Trigger manual deployments

## 🌐 Custom Domains

After deployment, you can:
1. Buy domain from registrar (Namecheap, Cloudflare, etc.)
2. Add custom domain in Vercel dashboard
3. Configure DNS records (Vercel guides you)
4. SSL certificates are automatic

## 📊 Monitoring

Vercel provides:
- Real-time build logs
- Performance analytics
- Function execution logs
- Error tracking
- Uptime monitoring

## 🎉 Next Steps

After successful deployment:
1. Test all functionality
2. Set up custom domain
3. Configure monitoring and alerts
4. Set up database backups in Supabase
5. Monitor usage and performance

## 📚 Additional Resources

- [Vercel Documentation](https://vercel.com/docs)
- [Supabase Documentation](https://supabase.com/docs)
- [Next.js Deployment Guide](https://nextjs.org/docs/deployment)
- [Prisma Documentation](https://www.prisma.io/docs)

---

**Need help?** Check Vercel build logs, Supabase dashboard, or use Vercel CLI for debugging!
