'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { getProject, updateProject, uploadProjectImage, deleteProjectImage } from '@/lib/db'
import { Trash2 } from 'lucide-react'

export default function EditProjectPage({
  params,
}: {
  params: { id: string }
}) {
  const router = useRouter()
  const [loading, setLoading] = useState(true)
  const [submitting, setSubmitting] = useState(false)
  const [project, setProject] = useState<any>(null)
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    location: '',
    year: new Date().getFullYear(),
    category: '',
  })

  useEffect(() => {
    loadProject()
  }, [])

  const loadProject = async () => {
    try {
      const data = await getProject(params.id)
      setProject(data)
      setFormData({
        title: data.title,
        description: data.description,
        location: data.location,
        year: data.year,
        category: data.category,
      })
    } catch (error) {
      console.error('Error loading project:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitting(true)
    try {
      await updateProject(params.id, formData)
      alert('Project updated successfully!')
      router.push('/admin/projects')
    } catch (error) {
      console.error('Error updating project:', error)
      alert('Error updating project')
    } finally {
      setSubmitting(false)
    }
  }

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    try {
      const order = (project.images?.length || 0) + 1
      await uploadProjectImage(params.id, file, order)
      await loadProject()
    } catch (error) {
      console.error('Error uploading image:', error)
      alert('Error uploading image')
    }
  }

  const handleImageDelete = async (imageId: string) => {
    if (!window.confirm('Delete this image?')) return

    try {
      await deleteProjectImage(imageId)
      await loadProject()
    } catch (error) {
      console.error('Error deleting image:', error)
      alert('Error deleting image')
    }
  }

  if (loading) {
    return <div className="text-center py-12">Loading...</div>
  }

  if (!project) {
    return <div className="text-center py-12 text-red-600">Project not found</div>
  }

  return (
    <div className="max-w-4xl space-y-8">
      <h2 className="text-3xl font-light">Edit Project</h2>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-medium mb-2">Title</label>
          <input
            type="text"
            value={formData.title}
            onChange={(e) =>
              setFormData({ ...formData, title: e.target.value })
            }
            className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-black"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Description</label>
          <textarea
            value={formData.description}
            onChange={(e) =>
              setFormData({ ...formData, description: e.target.value })
            }
            rows={5}
            className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-black"
            required
          />
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-2">Location</label>
            <input
              type="text"
              value={formData.location}
              onChange={(e) =>
                setFormData({ ...formData, location: e.target.value })
              }
              className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-black"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Year</label>
            <input
              type="number"
              value={formData.year}
              onChange={(e) =>
                setFormData({ ...formData, year: parseInt(e.target.value) })
              }
              className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-black"
              required
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Category</label>
          <input
            type="text"
            value={formData.category}
            onChange={(e) =>
              setFormData({ ...formData, category: e.target.value })
            }
            className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-black"
            required
          />
        </div>

        <button
          type="submit"
          disabled={submitting}
          className="bg-black text-white px-6 py-2 rounded hover:bg-gray-800 disabled:opacity-50"
        >
          {submitting ? 'Saving...' : 'Save Changes'}
        </button>
      </form>

      {/* Images Section */}
      <div className="border-t pt-8">
        <h3 className="text-2xl font-light mb-6">Project Images</h3>

        <div className="mb-6">
          <label className="block text-sm font-medium mb-2">Add Images</label>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            className="w-full px-4 py-2 border border-gray-300 rounded"
          />
        </div>

        {project.images && project.images.length > 0 ? (
          <div className="grid md:grid-cols-2 gap-6">
            {project.images.map((img: any) => (
              <div key={img.id} className="relative group">
                <img
                  src={img.image_url}
                  alt="Project"
                  className="w-full h-48 object-cover rounded"
                />
                <button
                  onClick={() => handleImageDelete(img.id)}
                  className="absolute top-2 right-2 bg-red-600 text-white p-2 rounded opacity-0 group-hover:opacity-100 transition"
                >
                  <Trash2 size={18} />
                </button>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12 text-gray-500 border border-dashed rounded">
            No images yet. Upload some above!
          </div>
        )}
      </div>
    </div>
  )
}
