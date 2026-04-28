'use client'

import { useEffect, useState } from 'react'
import { getProjects, deleteProject } from '@/lib/db'
import Link from 'next/link'
import { Trash2, Edit2, Plus } from 'lucide-react'

export default function ProjectsAdmin() {
  const [projects, setProjects] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadProjects()
  }, [])

  const loadProjects = async () => {
    try {
      const data = await getProjects()
      setProjects(data)
    } catch (error) {
      console.error('Error loading projects:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (id: string) => {
    if (!window.confirm('Are you sure?')) return

    try {
      await deleteProject(id)
      setProjects(projects.filter((p) => p.id !== id))
    } catch (error) {
      console.error('Error deleting project:', error)
      alert('Error deleting project')
    }
  }

  if (loading) {
    return <div className="text-center py-12">Loading...</div>
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-light">Manage Projects</h2>
        <Link
          href="/admin/projects/new"
          className="flex items-center gap-2 bg-black text-white px-4 py-2 rounded hover:bg-gray-800"
        >
          <Plus size={20} />
          New Project
        </Link>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className="border-b border-gray-200">
              <th className="text-left py-3 px-4 font-light">Title</th>
              <th className="text-left py-3 px-4 font-light">Location</th>
              <th className="text-left py-3 px-4 font-light">Year</th>
              <th className="text-left py-3 px-4 font-light">Category</th>
              <th className="text-left py-3 px-4 font-light">Actions</th>
            </tr>
          </thead>
          <tbody>
            {projects.map((project) => (
              <tr key={project.id} className="border-b border-gray-100 hover:bg-gray-50">
                <td className="py-3 px-4">{project.title}</td>
                <td className="py-3 px-4">{project.location}</td>
                <td className="py-3 px-4">{project.year}</td>
                <td className="py-3 px-4">{project.category}</td>
                <td className="py-3 px-4 space-x-2">
                  <Link
                    href={`/admin/projects/${project.id}`}
                    className="inline-block p-2 hover:bg-gray-200 rounded"
                  >
                    <Edit2 size={18} />
                  </Link>
                  <button
                    onClick={() => handleDelete(project.id)}
                    className="inline-block p-2 hover:bg-red-100 rounded text-red-600"
                  >
                    <Trash2 size={18} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {projects.length === 0 && (
        <div className="text-center py-12 text-gray-500">
          No projects yet. Create your first one!
        </div>
      )}
    </div>
  )
}
