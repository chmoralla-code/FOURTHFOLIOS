import { Suspense } from 'react'
import Link from 'next/link'
import { getProjects, getSiteSettings } from '@/lib/db'

async function Hero() {
  try {
    const settings = await getSiteSettings()
    return (
      <section className="h-screen flex items-center justify-center px-6">
        <div className="max-w-4xl text-center space-y-8">
          <h1 className="text-6xl md:text-7xl font-light leading-tight">
            {settings.hero_title || 'I build spaces that inspire'}
          </h1>
          <p className="text-xl text-gray-600">
            {settings.hero_subtitle || 'Architectural design and creative spaces'}
          </p>
        </div>
      </section>
    )
  } catch (error) {
    return (
      <section className="h-screen flex items-center justify-center px-6">
        <div className="max-w-4xl text-center space-y-8">
          <h1 className="text-6xl md:text-7xl font-light leading-tight">
            I build spaces that inspire
          </h1>
          <p className="text-xl text-gray-600">
            Architectural design and creative spaces
          </p>
        </div>
      </section>
    )
  }
}

async function Projects() {
  try {
    const projects = await getProjects()

    return (
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-light mb-16">Projects</h2>
          <div className="grid md:grid-cols-2 gap-12">
            {projects.length > 0 ? (
              projects.map((project) => (
                <Link
                  key={project.id}
                  href={`/projects/${project.id}`}
                  className="group cursor-pointer"
                >
                  <div className="aspect-square bg-gray-100 mb-4 overflow-hidden">
                    <div className="w-full h-full bg-gradient-to-br from-gray-200 to-gray-300 flex items-center justify-center">
                      <span className="text-gray-500">Project Image</span>
                    </div>
                  </div>
                  <h3 className="text-2xl font-light mb-2 group-hover:underline">
                    {project.title}
                  </h3>
                  <p className="text-gray-600">{project.location}</p>
                  <p className="text-sm text-gray-500 mt-2">{project.year}</p>
                </Link>
              ))
            ) : (
              <div className="col-span-2 text-center py-20 text-gray-500">
                No projects yet. Visit the admin dashboard to add some!
              </div>
            )}
          </div>
        </div>
      </section>
    )
  } catch (error) {
    return (
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-light mb-16">Projects</h2>
          <div className="text-center py-20 text-gray-500">
            Projects will appear here once connected to Supabase.
          </div>
        </div>
      </section>
    )
  }
}

export default function Home() {
  return (
    <main>
      <Suspense fallback={<div className="h-screen" />}>
        <Hero />
      </Suspense>
      <Suspense fallback={<div className="py-20" />}>
        <Projects />
      </Suspense>
    </main>
  )
}
