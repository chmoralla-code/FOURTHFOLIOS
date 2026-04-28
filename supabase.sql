-- Architectural Portfolio Database Schema
-- Run this SQL in your Supabase SQL Editor

-- Projects table
CREATE TABLE IF NOT EXISTS projects (
  id uuid DEFAULT uuid_generate_v4() PRIMARY KEY,
  title text NOT NULL,
  description text NOT NULL,
  location text NOT NULL,
  year integer NOT NULL,
  category text NOT NULL,
  featured boolean DEFAULT false,
  created_at timestamp with time zone DEFAULT timezone('utc'::text, now())
);

-- Project images table
CREATE TABLE IF NOT EXISTS project_images (
  id uuid DEFAULT uuid_generate_v4() PRIMARY KEY,
  project_id uuid NOT NULL REFERENCES projects(id) ON DELETE CASCADE,
  image_url text NOT NULL,
  "order" integer NOT NULL,
  uploaded_at timestamp with time zone DEFAULT timezone('utc'::text, now())
);

-- Site settings table (key-value store)
CREATE TABLE IF NOT EXISTS site_settings (
  key text PRIMARY KEY,
  value text NOT NULL,
  updated_at timestamp with time zone DEFAULT timezone('utc'::text, now())
);

-- Create indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_project_images_project_id ON project_images(project_id);
CREATE INDEX IF NOT EXISTS idx_projects_year ON projects(year DESC);
CREATE INDEX IF NOT EXISTS idx_projects_featured ON projects(featured);

-- Set up Row Level Security (RLS)
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE project_images ENABLE ROW LEVEL SECURITY;
ALTER TABLE site_settings ENABLE ROW LEVEL SECURITY;

-- Public read access for projects
CREATE POLICY "Public can view projects" ON projects
  FOR SELECT TO public
  USING (true);

-- Public read access for project images
CREATE POLICY "Public can view project images" ON project_images
  FOR SELECT TO public
  USING (true);

-- Public read access for site settings
CREATE POLICY "Public can view site settings" ON site_settings
  FOR SELECT TO public
  USING (true);

-- Allow authenticated users to manage projects
CREATE POLICY "Authenticated can insert projects" ON projects
  FOR INSERT TO authenticated
  WITH CHECK (true);

CREATE POLICY "Authenticated can update projects" ON projects
  FOR UPDATE TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Authenticated can delete projects" ON projects
  FOR DELETE TO authenticated
  USING (true);

-- Allow authenticated users to manage project images
CREATE POLICY "Authenticated can insert project images" ON project_images
  FOR INSERT TO authenticated
  WITH CHECK (true);

CREATE POLICY "Authenticated can delete project images" ON project_images
  FOR DELETE TO authenticated
  USING (true);

-- Allow authenticated users to manage settings
CREATE POLICY "Authenticated can insert settings" ON site_settings
  FOR INSERT TO authenticated
  WITH CHECK (true);

CREATE POLICY "Authenticated can update settings" ON site_settings
  FOR UPDATE TO authenticated
  USING (true)
  WITH CHECK (true);

-- Grant permissions
GRANT SELECT ON projects TO anon;
GRANT SELECT ON project_images TO anon;
GRANT SELECT ON site_settings TO anon;

GRANT ALL ON projects TO authenticated;
GRANT ALL ON project_images TO authenticated;
GRANT ALL ON site_settings TO authenticated;
