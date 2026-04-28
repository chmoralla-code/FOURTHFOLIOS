# Architectural Portfolio Website

A modern, minimalist architectural portfolio website with a full-featured admin dashboard. Built with Next.js, Supabase, and Tailwind CSS.

## Features

### Public Website
- Minimalist hero section with customizable tagline
- Projects gallery with full-page project details
- Responsive design
- Fast page loads with Next.js App Router

### Admin Dashboard
- **Projects Management**: Create, edit, and delete projects
- **Image Upload**: Upload project images directly from your computer
- **Site Settings**: Edit hero title, subtitle, company name, and contact email
- **Dashboard Stats**: View overview of projects and settings

## Tech Stack

- **Frontend**: Next.js 16 with React 19
- **Styling**: Tailwind CSS 3
- **Database**: Supabase (PostgreSQL)
- **Storage**: Supabase Storage for images
- **Deployment**: Vercel (recommended)

## Quick Start

### Prerequisites
- Node.js 18+
- npm or pnpm
- Supabase account (free tier works)

### 1. Setup Supabase

Create a new Supabase project at https://supabase.com

Run the SQL schema in your Supabase dashboard:

```sql
-- Projects table
CREATE TABLE projects (
  id uuid DEFAULT uuid_generate_v4() PRIMARY KEY,
  title text NOT NULL,
  description text NOT NULL,
  location text NOT NULL,
  year integer NOT NULL,
  category text NOT NULL,
  featured boolean DEFAULT false,
  created_at timestamp DEFAULT now()
);

-- Project images table
CREATE TABLE project_images (
  id uuid DEFAULT uuid_generate_v4() PRIMARY KEY,
  project_id uuid REFERENCES projects(id) ON DELETE CASCADE,
  image_url text NOT NULL,
  order integer NOT NULL,
  uploaded_at timestamp DEFAULT now()
);

-- Site settings table
CREATE TABLE site_settings (
  key text PRIMARY KEY,
  value text NOT NULL,
  updated_at timestamp DEFAULT now()
);

-- Create storage bucket for project images
-- In Supabase console: Storage > New Bucket > project-images (make it public)
```

### 2. Install Dependencies

```bash
npm install
# or
pnpm install
```

### 3. Configure Environment Variables

Copy `.env.example` to `.env.local`:

```bash
cp .env.example .env.local
```

Fill in your Supabase credentials:
- `NEXT_PUBLIC_SUPABASE_URL`: Your Supabase project URL
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`: Your public anon key
- `SUPABASE_SERVICE_ROLE_KEY`: Your service role key (for admin operations)

### 4. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### 5. Access Admin Dashboard

Navigate to [http://localhost:3000/admin](http://localhost:3000/admin)

## Project Structure

```
app/
├── layout.tsx              # Root layout
├── page.tsx                # Home page with hero & projects
├── globals.css             # Global styles
├── projects/[id]/page.tsx  # Project detail page
└── admin/
    ├── layout.tsx          # Admin sidebar layout
    ├── page.tsx            # Admin dashboard
    ├── projects/
    │   ├── page.tsx        # Manage projects
    │   ├── new/page.tsx    # Create project
    │   └── [id]/page.tsx   # Edit project
    └── settings/page.tsx   # Site settings

lib/
├── supabase.ts             # Supabase client setup
└── db.ts                   # Database functions

components/                 # Reusable UI components
public/                     # Static files
```

## Admin Features

### Create Project
1. Go to Admin > Projects > New Project
2. Fill in project details (title, description, location, year, category)
3. Click "Create Project"

### Upload Images
1. Click "Edit" on a project
2. Scroll to "Project Images" section
3. Click file input to upload from your computer
4. Images are automatically resized and optimized

### Edit Site Settings
1. Go to Admin > Settings
2. Update hero title, subtitle, company name, and contact email
3. Changes appear immediately on the home page

## Deployment to Vercel

### 1. Push to GitHub

```bash
git init
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/yourusername/arch-portfolio.git
git push -u origin main
```

### 2. Deploy on Vercel

1. Go to [https://vercel.com](https://vercel.com) and sign in
2. Click "New Project" and select your GitHub repository
3. Add environment variables:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `SUPABASE_SERVICE_ROLE_KEY`
4. Click "Deploy"

Your site is now live! 🎉

## Building for Production

```bash
npm run build
npm run start
```

## Tips & Best Practices

### Image Optimization
- Upload images in landscape format (16:9 or wider)
- Recommended file size: 1-5 MB
- Supported formats: JPEG, PNG, WebP

### SEO
- Edit site metadata in `app/layout.tsx`
- Update hero title and description in Settings
- Add project descriptions for better SEO

### Performance
- Images are served from Supabase CDN
- Next.js automatically optimizes pages
- Consider adding caching headers

## Customization

### Styling
- Edit Tailwind config in `tailwind.config.js`
- Modify colors, fonts, spacing in theme
- Add custom CSS in `app/globals.css`

### Layout
- Modify hero section in `app/page.tsx`
- Update admin layout in `app/admin/layout.tsx`
- Customize project detail view in `app/projects/[id]/page.tsx`

## API Routes

The app uses server-side queries via Supabase client. No traditional REST API needed, but you can add API routes as needed:

```typescript
// app/api/projects/route.ts
export async function GET() {
  // Custom API logic
}
```

## Troubleshooting

### "Failed to fetch projects"
- Check Supabase URL and keys in `.env.local`
- Verify database tables exist
- Check Supabase RLS policies

### "Image upload failed"
- Ensure `project-images` bucket exists and is public
- Check bucket RLS policies in Supabase
- Verify file size is under Supabase limit

### "Admin pages not loading"
- Clear Next.js cache: `rm -rf .next`
- Rebuild: `npm run build`
- Check browser console for errors

## License

MIT - Feel free to use this for your projects

## Support

For issues or questions:
1. Check Supabase documentation
2. Review Next.js docs at https://nextjs.org
3. File issues on GitHub

---

Built with ❤️ using Next.js and Supabase
