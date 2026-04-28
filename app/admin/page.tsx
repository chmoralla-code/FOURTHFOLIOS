'use client'

import { useEffect, useState } from 'react'
import { getProjects, getSiteSettings } from '@/lib/db'
import { BarChart3, FileText, Settings } from 'lucide-react'

export default function AdminDashboard() {
  const [stats, setStats] = useState({ projects: 0, settings: 0 })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadStats = async () => {
      try {
        const [projects, settings] = await Promise.all([
          getProjects(),
          getSiteSettings(),
        ])
        setStats({
          projects: projects.length,
          settings: Object.keys(settings).length,
        })
      } catch (error) {
        console.error('Error loading stats:', error)
      } finally {
        setLoading(false)
      }
    }

    loadStats()
  }, [])

  if (loading) {
    return <div className="text-center py-12">Loading...</div>
  }

  return (
    <div className="grid md:grid-cols-3 gap-6">
      <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-gray-600 text-sm">Total Projects</p>
            <p className="text-3xl font-light mt-2">{stats.projects}</p>
          </div>
          <FileText className="text-gray-400" size={32} />
        </div>
      </div>

      <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-gray-600 text-sm">Site Settings</p>
            <p className="text-3xl font-light mt-2">{stats.settings}</p>
          </div>
          <Settings className="text-gray-400" size={32} />
        </div>
      </div>

      <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-gray-600 text-sm">Status</p>
            <p className="text-3xl font-light mt-2">Active</p>
          </div>
          <BarChart3 className="text-gray-400" size={32} />
        </div>
      </div>
    </div>
  )
}
