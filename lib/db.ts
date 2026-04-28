import { supabase } from './supabase'

export interface Project {
  id: string
  title: string
  description: string
  location: string
  year: number
  category: string
  featured: boolean
  created_at: string
}

export interface ProjectImage {
  id: string
  project_id: string
  image_url: string
  order: number
  uploaded_at: string
}

export interface SiteSettings {
  key: string
  value: string
}

// Projects
export async function getProjects() {
  const { data, error } = await supabase
    .from('projects')
    .select('*')
    .order('year', { ascending: false })

  if (error) throw error
  return data as Project[]
}

export async function getProject(id: string) {
  const { data: project, error: projectError } = await supabase
    .from('projects')
    .select('*')
    .eq('id', id)
    .single()

  if (projectError) throw projectError

  const { data: images, error: imagesError } = await supabase
    .from('project_images')
    .select('*')
    .eq('project_id', id)
    .order('order', { ascending: true })

  if (imagesError) throw imagesError

  return { ...project, images: images || [] }
}

export async function createProject(data: Omit<Project, 'id' | 'created_at'>) {
  const { data: project, error } = await supabase
    .from('projects')
    .insert([data])
    .select()
    .single()

  if (error) throw error
  return project as Project
}

export async function updateProject(id: string, data: Partial<Project>) {
  const { data: project, error } = await supabase
    .from('projects')
    .update(data)
    .eq('id', id)
    .select()
    .single()

  if (error) throw error
  return project as Project
}

export async function deleteProject(id: string) {
  const { error } = await supabase.from('projects').delete().eq('id', id)
  if (error) throw error
}

// Project Images
export async function uploadProjectImage(
  projectId: string,
  file: File,
  order: number
) {
  const fileName = `${Date.now()}-${file.name}`
  const filePath = `projects/${projectId}/${fileName}`

  const { error: uploadError } = await supabase.storage
    .from('project-images')
    .upload(filePath, file)

  if (uploadError) throw uploadError

  const { data: urlData } = supabase.storage
    .from('project-images')
    .getPublicUrl(filePath)

  const { data: image, error: dbError } = await supabase
    .from('project_images')
    .insert([
      {
        project_id: projectId,
        image_url: urlData.publicUrl,
        order,
      },
    ])
    .select()
    .single()

  if (dbError) throw dbError
  return image as ProjectImage
}

export async function deleteProjectImage(id: string) {
  const { error } = await supabase.from('project_images').delete().eq('id', id)
  if (error) throw error
}

// Site Settings
export async function getSiteSettings() {
  const { data, error } = await supabase.from('site_settings').select('*')
  if (error) throw error

  const settings: Record<string, string> = {}
  data?.forEach((item) => {
    settings[item.key] = item.value
  })
  return settings
}

export async function updateSiteSetting(key: string, value: string) {
  const { error } = await supabase
    .from('site_settings')
    .upsert([{ key, value }], { onConflict: 'key' })

  if (error) throw error
}
