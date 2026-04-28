# Deployment Guide

Complete step-by-step guide to deploy your Architectural Portfolio to Vercel and Supabase.

## Part 1: Set Up Supabase (Backend)

### Step 1: Create Supabase Project

1. Go to [https://supabase.com](https://supabase.com)
2. Sign up or log in
3. Click "New Project"
4. Enter project name: `arch-portfolio`
5. Create a strong password
6. Select your region (closest to you)
7. Click "Create new project"

### Step 2: Get Your API Keys

1. Go to Project Settings > API
2. Copy:
   - **Project URL** → `NEXT_PUBLIC_SUPABASE_URL`
   - **anon (public)** → `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - **service_role (secret)** → `SUPABASE_SERVICE_ROLE_KEY`

Keep these keys safe! You'll need them for both local development and Vercel.

### Step 3: Create Database Schema

1. Go to SQL Editor
2. Copy and paste the contents of `supabase.sql`
3. Click "RUN"
4. Wait for success message

You should now have these tables:
- `projects`
- `project_images`
- `site_settings`

### Step 4: Set Up Storage Bucket

1. Go to Storage > Buckets
2. Click "New Bucket"
3. Name: `project-images`
4. Make it **Public** (enable "Public bucket")
5. Click "Create Bucket"

### Step 5: Configure Security (RLS)

The SQL file already sets up Row-Level Security (RLS) policies. Verify:

1. Go to Authentication > Policies
2. Check that policies exist for:
   - Projects (SELECT/INSERT/UPDATE/DELETE)
   - Project images (SELECT/INSERT/DELETE)
   - Site settings (SELECT/INSERT/UPDATE)

All public SELECT policies should already be configured.

---

## Part 2: Deploy to Vercel (Frontend)

### Step 1: Push to GitHub

First, create a GitHub repository and push your code:

```bash
cd /path/to/arch-portfolio

# Initialize git (if not already done)
git init

# Add all files
git add .

# Create initial commit
git commit -m "Initial architectural portfolio commit"

# Add remote repository
git remote add origin https://github.com/YOUR_USERNAME/arch-portfolio.git

# Push to GitHub
git branch -M main
git push -u origin main
```

### Step 2: Deploy on Vercel

1. Go to [https://vercel.com](https://vercel.com)
2. Click "Sign Up" or "Log In"
3. Choose "Continue with GitHub"
4. Authorize Vercel to access your GitHub
5. Click "New Project"
6. Select your `arch-portfolio` repository
7. Click "Import"

### Step 3: Configure Environment Variables

1. In the "Configure Project" page, scroll to "Environment Variables"
2. Add these variables with the keys you copied from Supabase:

```
NEXT_PUBLIC_SUPABASE_URL = https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY = eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
SUPABASE_SERVICE_ROLE_KEY = eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

3. Click "Deploy"

Vercel will now:
- Clone your repository
- Install dependencies
- Build your project
- Deploy to a live URL

### Step 4: Your Site is Live! 🎉

Vercel will assign you a URL like:
```
https://arch-portfolio-xyz.vercel.app
```

You can now:
- Visit your portfolio at the provided URL
- Access admin dashboard at `/admin`
- Go to Vercel dashboard to set a custom domain

---

## Part 3: Connect Everything

### Test the Connection

1. Visit your live site
2. Go to `/admin`
3. Try creating a new project
4. Upload an image
5. Edit site settings

All changes should be reflected immediately on your public site.

### Custom Domain (Optional)

To use your own domain:

1. In Vercel Project Settings > Domains
2. Click "Add Domain"
3. Enter your domain (e.g., `myarchitectureportfolio.com`)
4. Follow instructions to update DNS settings with your domain registrar
5. Wait for DNS to propagate (5-30 minutes)

---

## Environment Variables Reference

### Local Development (.env.local)
```
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
```

### Vercel Production
Set the same variables in:
- Project Settings > Environment Variables
- Select Production environment

---

## Troubleshooting Deployment

### Build Failed
- Check that all environment variables are set correctly
- Ensure `.env.local` is in `.gitignore` (don't commit secrets!)
- Check Vercel build logs for specific errors

### Database Connection Error
- Verify Supabase URL is correct (check for typos)
- Confirm API keys haven't changed
- Check that database tables exist in Supabase
- Verify RLS policies are configured

### Storage/Image Upload Not Working
- Ensure `project-images` bucket exists in Supabase Storage
- Verify bucket is set to "Public"
- Check that RLS policies allow authenticated users

### Admin Dashboard 403/Forbidden
- This is expected if using Supabase free tier without auth
- Current setup allows anyone to access admin
- For production, add authentication layer (optional)

---

## Post-Deployment Checklist

- [ ] Site loads at Vercel URL
- [ ] Home page displays correctly
- [ ] Admin dashboard is accessible
- [ ] Can create new projects
- [ ] Image upload works
- [ ] Can edit site settings
- [ ] Changes appear on public site
- [ ] Mobile responsive design works
- [ ] Custom domain configured (if applicable)

---

## Next Steps

### Enhance Your Site

1. **Add Authentication** (optional)
   - Supabase Auth + Login page
   - Restrict admin to authorized users

2. **Add Contact Form**
   - Email integration (SendGrid, Postmark)
   - Form submission storage

3. **Improve Performance**
   - Image optimization
   - Caching strategies
   - Analytics

4. **SEO Optimization**
   - Meta tags per project
   - Sitemap
   - Schema markup

### Monitor & Maintain

- Check Vercel analytics dashboard monthly
- Monitor Supabase database usage
- Update dependencies regularly
- Backup database data periodically

---

## Support Resources

- **Vercel Docs**: https://vercel.com/docs
- **Supabase Docs**: https://supabase.com/docs
- **Next.js Docs**: https://nextjs.org/docs
- **Tailwind CSS**: https://tailwindcss.com/docs

---

You're all set! Your architectural portfolio is now live on the internet. 🚀
