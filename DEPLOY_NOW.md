# 🚀 DEPLOY ON VERCEL + SUPABASE (Step-by-Step)

This guide walks you through deploying your architectural portfolio on Vercel and Supabase.

---

## PART 1: SUPABASE SETUP (Backend Database)

### Step 1: Create Supabase Project

1. Go to https://supabase.com
2. Click "Sign Up" or "Log In"
3. Click "New Project"
4. Fill in:
   - **Project name:** `arch-portfolio` (or your choice)
   - **Password:** Create a strong password
   - **Region:** Select closest to you
5. Click "Create new project"
6. Wait for project to be created (~2 minutes)

### Step 2: Get Your API Keys

1. In Supabase dashboard, go to **Settings** (gear icon)
2. Click **API** on the left menu
3. You'll see:
   - **Project URL** → Copy this for `NEXT_PUBLIC_SUPABASE_URL`
   - **anon public** → Copy this for `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - **service_role secret** → Copy this for `SUPABASE_SERVICE_ROLE_KEY`

**Save these keys!** You'll need them soon.

### Step 3: Create Database Schema

1. In Supabase, go to **SQL Editor**
2. Click "New Query"
3. Copy the entire content from `supabase.sql` in your project folder
4. Paste it into the SQL Editor
5. Click **RUN**
6. Wait for success message

You should now have tables:
- `projects`
- `project_images`
- `site_settings`

### Step 4: Create Storage Bucket

1. In Supabase, go to **Storage**
2. Click "New Bucket"
3. Name it: `project-images`
4. **IMPORTANT:** Toggle "Public bucket" to ON
5. Click "Create"

✅ **Supabase is now ready!**

---

## PART 2: VERCEL DEPLOYMENT (Frontend)

### Step 1: Update Environment Variables Locally

1. Open `.env.local` in your project
2. Update with your Supabase keys:

```
NEXT_PUBLIC_SUPABASE_URL=https://your-project-id.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key-here
```

3. Save the file

### Step 2: Test Locally

```bash
cd /workspaces/arch-portfolio
npm run dev
```

Visit:
- http://localhost:3000 (public site)
- http://localhost:3000/admin (admin dashboard)

**Test it works!**

### Step 3: Push to GitHub

If not already on GitHub:

```bash
cd /workspaces/arch-portfolio

# Initialize git (if needed)
git init

# Add all files
git add .

# Commit
git commit -m "Architecture portfolio ready for deployment"

# Create GitHub repository:
# 1. Go to https://github.com/new
# 2. Create repo named "arch-portfolio"
# 3. Copy the remote URL

# Add remote and push
git remote add origin https://github.com/YOUR_USERNAME/arch-portfolio.git
git branch -M main
git push -u origin main
```

### Step 4: Deploy on Vercel

1. Go to https://vercel.com
2. Click "Sign Up" or "Log In"
3. Click "New Project"
4. Click "Import Git Repository"
5. Select your GitHub repository (`arch-portfolio`)
6. Click "Import"

### Step 5: Add Environment Variables

On the "Configure Project" page:

1. Scroll to "Environment Variables"
2. Add these variables:

```
Name: NEXT_PUBLIC_SUPABASE_URL
Value: https://your-project-id.supabase.co

Name: NEXT_PUBLIC_SUPABASE_ANON_KEY
Value: your-anon-key

Name: SUPABASE_SERVICE_ROLE_KEY
Value: your-service-role-key
```

3. Click "Add" for each variable
4. Click "Deploy"

Vercel will now:
- Clone your repo
- Install dependencies
- Build your project
- Deploy to the internet

**Wait for deployment to finish (~2-3 minutes)**

### Step 6: Your Site is Live!

Vercel will show you a URL like:
```
https://arch-portfolio-xyz123.vercel.app
```

**Visit this URL!** Your portfolio is now live on the internet! 🎉

---

## PART 3: OPTIONAL - CUSTOM DOMAIN

### Add Your Own Domain (Optional)

1. In Vercel, go to your project
2. Click "Settings" → "Domains"
3. Click "Add Domain"
4. Enter your domain (e.g., `myarchitecture.com`)
5. Follow instructions to update DNS settings
6. Wait for DNS to propagate (5-30 minutes)

---

## PART 4: VERIFY EVERYTHING WORKS

Visit your live site and check:

- [ ] Home page loads
- [ ] Hero title and subtitle display
- [ ] Projects gallery shows (once you add projects)
- [ ] Project detail pages work
- [ ] Admin dashboard is accessible at `/admin`
- [ ] Can create new project
- [ ] Can upload images
- [ ] Can edit settings
- [ ] Changes appear on public site

---

## TROUBLESHOOTING

### "Build failed on Vercel"
- Check environment variables are set correctly
- Verify `.env.local` is in `.gitignore` (don't commit secrets!)
- Check build logs in Vercel for specific error

### "Can't connect to database"
- Verify Supabase API keys are correct
- Check `NEXT_PUBLIC_SUPABASE_URL` doesn't have trailing slash
- Ensure tables exist in Supabase (run `supabase.sql`)

### "Images not uploading"
- Verify `project-images` bucket exists in Supabase Storage
- Check bucket is set to "Public"
- Verify RLS policies allow authenticated users

### "Admin dashboard not working"
- Clear browser cache and reload
- Check browser console for errors (F12)
- Verify Supabase connection works

### "Vercel keeps redeploying"
- This is normal - it redeploys on every GitHub push
- Each deploy gets a unique URL

---

## NEXT STEPS

1. **Create Your First Project**
   - Go to `/admin/projects`
   - Click "New Project"
   - Fill in details
   - Upload images

2. **Customize Your Site**
   - Edit homepage text in `/admin/settings`
   - Add more projects
   - Upload project images

3. **Share Your Portfolio**
   - Send the Vercel URL to people
   - Share on social media
   - Add to your resume

4. **Optional Enhancements**
   - Add contact form
   - Add testimonials
   - Add team members
   - Add blog section

---

## WHAT HAPPENS NOW

### On Vercel
- Your site is live on the internet
- Automatic deploys on every GitHub push
- Global CDN for fast delivery
- Auto-scaling for traffic spikes
- Free SSL certificate

### On Supabase
- Database is backed up automatically
- Images are served from CDN
- Secure row-level access control
- Scalable to unlimited projects
- Always online

### Your Portfolio
- Live at your Vercel URL
- Accessible 24/7
- Fast page loads
- Mobile responsive
- Professional quality

---

## SUMMARY

✅ Supabase setup complete
✅ Vercel deployed
✅ Environment variables configured
✅ Database ready
✅ Images storage working
✅ Site is LIVE!

Your architectural portfolio is now on the internet! 🎉

---

## SUPPORT

Got issues? Check these files:

1. **README.md** - Full documentation
2. **BUILD_SUMMARY.md** - Technical details
3. **00_READ_ME_FIRST.md** - Quick reference

Or:
- Vercel Docs: https://vercel.com/docs
- Supabase Docs: https://supabase.com/docs

---

**Congratulations! Your portfolio is live!** 🚀

Now go add your amazing architectural projects! 🎨

