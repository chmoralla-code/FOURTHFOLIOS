'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Menu, X } from 'lucide-react'

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  return (
    <div className="flex h-screen bg-white">
      {/* Sidebar */}
      <div
        className={`${
          sidebarOpen ? 'block' : 'hidden'
        } md:block md:w-64 bg-gray-50 border-r border-gray-200`}
      >
        <div className="p-6 border-b border-gray-200">
          <h1 className="text-xl font-light">Admin Panel</h1>
        </div>
        <nav className="p-6 space-y-4">
          <Link
            href="/admin"
            className="block px-4 py-2 hover:bg-gray-100 rounded"
          >
            Dashboard
          </Link>
          <Link
            href="/admin/projects"
            className="block px-4 py-2 hover:bg-gray-100 rounded"
          >
            Projects
          </Link>
          <Link
            href="/admin/settings"
            className="block px-4 py-2 hover:bg-gray-100 rounded"
          >
            Settings
          </Link>
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-auto">
        {/* Header */}
        <div className="bg-white border-b border-gray-200 p-6 flex justify-between items-center sticky top-0 z-10">
          <h2 className="text-2xl font-light">Dashboard</h2>
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="md:hidden p-2"
          >
            {sidebarOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Content */}
        <div className="p-6">{children}</div>
      </div>
    </div>
  )
}
