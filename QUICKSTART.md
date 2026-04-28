# Quick Start Guide

Get your architectural portfolio running in 5 minutes!

## Prerequisites
- Node.js 18+ installed
- A Supabase account (free tier)

## Local Development (5 minutes)

### 1. Clone and Install
```bash
git clone https://github.com/YOUR_USERNAME/arch-portfolio.git
cd arch-portfolio
npm install
```

### 2. Get Supabase Keys
1. Go to https://supabase.com
2. Create new project or use existing
3. Go to Settings > API
4. Copy your Project URL and anon key

### 3. Create .env.local
```bash
cat > .env.local << EOF
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
EOF
```

### 4. Set Up Database
1. In Supabase SQL Editor, run: `supabase.sql`
2. Create storage bucket: `project-images` (public)

### 5. Run Locally
```bash
npm run dev
```

Visit:
- Public site: http://localhost:3000
- Admin: http://localhost:3000/admin

## Deploy to Vercel (1 minute)

1. Push to GitHub
2. Go to vercel.com
3. Click "New Project"
4. Select your GitHub repository
5. Add environment variables (Supabase keys)
6. Click "Deploy"

Done! Your site is live! 🎉

## Create Your First Project

1. Visit `/admin/projects`
2. Click "New Project"
3. Fill in project details:
   - Title: "Modern Office Building"
   - Description: Write about the project
   - Location: "New York, NY"
   - Year: 2024
   - Category: "Commercial"
4. Click "Create Project"
5. Click "Edit" to upload images

## Common Tasks

### Add Project Images
1. Go to admin
2. Click project to edit
3. Scroll to "Project Images"
4. Click file input
5. Select images from computer

### Update Site Text
1. Admin > Settings
2. Edit "Hero Title" and "Hero Subtitle"
3. Click "Save Settings"

### Delete Project
1. Admin > Projects
2. Click trash icon
3. Confirm deletion

## Need Help?

Check detailed docs:
- **Setup**: See `README.md`
- **Deployment**: See `DEPLOYMENT.md`
- **Troubleshooting**: See README FAQ section

## Project Structure
```
├── app/
│   ├── page.tsx           # Home page
│   ├── projects/[id]/     # Project detail
│   └── admin/             # Admin dashboard
├── lib/
│   ├── db.ts              # Database functions
│   └── supabase.ts        # Supabase client
└── README.md
```

---

Ready to go! 🚀
