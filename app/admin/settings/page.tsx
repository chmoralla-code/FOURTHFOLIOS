'use client'

import { useEffect, useState } from 'react'
import { getSiteSettings, updateSiteSetting } from '@/lib/db'

export default function SettingsPage() {
  const [loading, setLoading] = useState(true)
  const [submitting, setSubmitting] = useState(false)
  const [settings, setSettings] = useState({
    hero_title: 'I build spaces that inspire',
    hero_subtitle: 'Architectural design and creative spaces',
    contact_email: '',
    company_name: '',
  })

  useEffect(() => {
    loadSettings()
  }, [])

  const loadSettings = async () => {
    try {
      const data = await getSiteSettings()
      setSettings({
        hero_title: data.hero_title || settings.hero_title,
        hero_subtitle: data.hero_subtitle || settings.hero_subtitle,
        contact_email: data.contact_email || '',
        company_name: data.company_name || '',
      })
    } catch (error) {
      console.error('Error loading settings:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitting(true)
    try {
      await Promise.all([
        updateSiteSetting('hero_title', settings.hero_title),
        updateSiteSetting('hero_subtitle', settings.hero_subtitle),
        updateSiteSetting('contact_email', settings.contact_email),
        updateSiteSetting('company_name', settings.company_name),
      ])
      alert('Settings updated successfully!')
    } catch (error) {
      console.error('Error updating settings:', error)
      alert('Error updating settings')
    } finally {
      setSubmitting(false)
    }
  }

  if (loading) {
    return <div className="text-center py-12">Loading...</div>
  }

  return (
    <div className="max-w-2xl space-y-8">
      <h2 className="text-3xl font-light">Site Settings</h2>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-medium mb-2">Hero Title</label>
          <input
            type="text"
            value={settings.hero_title}
            onChange={(e) =>
              setSettings({ ...settings, hero_title: e.target.value })
            }
            className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-black"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Hero Subtitle</label>
          <input
            type="text"
            value={settings.hero_subtitle}
            onChange={(e) =>
              setSettings({ ...settings, hero_subtitle: e.target.value })
            }
            className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-black"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Company Name</label>
          <input
            type="text"
            value={settings.company_name}
            onChange={(e) =>
              setSettings({ ...settings, company_name: e.target.value })
            }
            className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-black"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Contact Email</label>
          <input
            type="email"
            value={settings.contact_email}
            onChange={(e) =>
              setSettings({ ...settings, contact_email: e.target.value })
            }
            className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-black"
          />
        </div>

        <button
          type="submit"
          disabled={submitting}
          className="bg-black text-white px-6 py-2 rounded hover:bg-gray-800 disabled:opacity-50"
        >
          {submitting ? 'Saving...' : 'Save Settings'}
        </button>
      </form>
    </div>
  )
}
